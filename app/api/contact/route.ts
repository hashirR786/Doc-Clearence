import { NextResponse } from 'next/server';
import { getService } from '@/content/services';
import { site } from '@/content/site';

export const runtime = 'nodejs';

/** Very small in-memory rate limit — enough to blunt casual abuse. */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const clean = (value: unknown, max = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // --- Spam checks -------------------------------------------------------
  // 1. Honeypot: a real person never fills the hidden "company" field.
  if (clean(body.company)) {
    // Pretend it worked so the bot does not retry.
    return NextResponse.json({ ok: true });
  }
  // 2. Time trap: humans take longer than three seconds to fill this in.
  const elapsed = Number(body.elapsedMs ?? 0);
  if (elapsed > 0 && elapsed < 3000) {
    return NextResponse.json({ ok: true });
  }

  // --- Validation --------------------------------------------------------
  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 4000);
  const serviceSlug = clean(body.service, 80);
  const locale = clean(body.locale, 5) === 'ar' ? 'ar' : 'en';

  const errors: string[] = [];
  if (!name) errors.push('name');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push('email');
  if (!phone || phone.replace(/\D/g, '').length < 7) errors.push('phone');
  if (!message) errors.push('message');
  if (body.consent !== 'yes' && body.consent !== true) errors.push('consent');

  if (errors.length > 0) {
    return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 400 });
  }

  const service = serviceSlug ? getService(serviceSlug) : undefined;
  const serviceLabel = service ? service.en.name : serviceSlug || 'Not specified';

  const subject = `Website enquiry — ${serviceLabel}`;
  const text = [
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Phone:    ${phone}`,
    `Service:  ${serviceLabel}`,
    `Language: ${locale}`,
    `IP:       ${ip}`,
    '',
    'Message:',
    message,
  ].join('\n');

  // --- Delivery ----------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from || to.startsWith('[')) {
    // No mail provider configured yet — log it so nothing is silently lost.
    console.info('[contact] Email delivery not configured. Enquiry received:\n' + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      console.error('[contact] Resend responded', res.status, await res.text());
      return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[contact] Delivery error', error);
    return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
  }
}
