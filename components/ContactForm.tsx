'use client';

import { useId, useState } from 'react';
import { services } from '@/content/services';
import { site, type Locale } from '@/content/site';
import { t } from '@/content/ui';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Channel = 'whatsapp' | 'email' | 'endpoint';

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: string;
}

/** Ready-made links carrying one submitted enquiry, so either can be reopened. */
interface Composed {
  via: Channel;
  whatsapp: string;
  email: string;
}

/** Digits only — empty while site.whatsapp is still a placeholder. */
const waDigits = site.whatsapp.replace(/\D/g, '');

/**
 * A WhatsApp message can carry a long body, but the whole enquiry travels in
 * a URL, so an essay in the message field would silently truncate. Cap the
 * field instead, where the browser enforces it in front of the visitor.
 */
const MESSAGE_MAX = 1200;

/**
 * Enquiry form with inline validation, a honeypot plus time-trap for spam,
 * and delivery through whichever channel site.enquiryChannel selects.
 *
 * On WhatsApp and email the enquiry is composed into a pre-filled message in
 * the visitor's own app, which they then send: no server, no third-party form
 * service, and nothing to break on a static host. The trade-off is that the
 * visitor presses send themselves, so the confirmation screen says exactly
 * that rather than claiming the enquiry has already reached us.
 *
 * `defaultService` preselects the dropdown on a service page.
 */
export default function ContactForm({
  locale,
  defaultService,
}: {
  locale: Locale;
  defaultService?: string;
}) {
  const d = t(locale);
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [composed, setComposed] = useState<Composed | null>(null);
  // Spam time-trap: forms completed implausibly fast are almost always bots.
  const [startedAt] = useState(() => Date.now());

  // Fall back to email if WhatsApp is selected before a number is configured.
  const channel: Channel =
    site.enquiryChannel === 'whatsapp' && !waDigits ? 'email' : site.enquiryChannel;

  const validate = (form: HTMLFormElement): Errors => {
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name) next.name = d.form.required;
    if (!email) next.email = d.form.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = d.form.invalidEmail;
    if (!phone) next.phone = d.form.required;
    else if (phone.replace(/\D/g, '').length < 7) next.phone = d.form.invalidPhone;
    if (!message) next.message = d.form.required;
    if (!data.get('consent')) next.consent = d.form.required;

    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const serviceName =
      services.find((s) => s.slug === data.service)?.[locale].name ||
      (data.service ? d.form.serviceOther : '');

    // Labelled in the visitor's own language, so the enquiry arrives reading
    // the way they filled it in. The service is optional, so neither the
    // subject nor the body carries a stray dash when it was left unpicked.
    const subject = serviceName
      ? `${d.form.enquirySubject} — ${serviceName}`
      : d.form.enquirySubject;
    const body = [
      `${d.form.name}: ${data.name}`,
      `${d.form.phone}: ${data.phone}`,
      `${d.form.email}: ${data.email}`,
      ...(serviceName ? [`${d.form.service}: ${serviceName}`] : []),
      '',
      data.message,
    ].join('\n');

    const links: Composed = {
      via: channel,
      whatsapp: waDigits
        ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`
        : '',
      email: `mailto:${site.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`,
    };

    if (channel !== 'endpoint') {
      openChannel(channel === 'whatsapp' ? links.whatsapp : links.email);
      setComposed(links);
      setStatus('sent');
      // Deliberately not reset: if the app did not open, the fallback link on
      // the confirmation screen still carries the enquiry.
      return;
    }

    setStatus('sending');

    /**
     * Where the enquiry goes.
     *
     * On a Node host this is our own /api/contact route. On a static host
     * there is no server to run it, so NEXT_PUBLIC_FORM_ENDPOINT points at a
     * hosted form service. Both are plain JSON POSTs.
     */
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/contact';
    const isExternal = /^https?:\/\//.test(endpoint);

    const payload = {
      ...data,
      locale,
      elapsedMs: Date.now() - startedAt,
      ...(isExternal
        ? {
            // Formspree reads _gotcha as its spam honeypot and _subject as the
            // notification subject line; our own route reads `company`, so
            // send both and let each pick up what it understands.
            _gotcha: data.company || '',
            _subject: subject,
            // Readable label alongside the raw slug in the notification email.
            serviceName,
          }
        : {}),
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Without this Formspree answers with a redirect to its own thank
          // you page instead of a JSON result.
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(String(res.status));
      setComposed(links);
      setStatus('sent');
      form.reset();
    } catch {
      // The enquiry is not lost — the composed channels still carry it, so
      // offer one instead of leaving a dead end.
      setComposed(links);
      setStatus('error');
    }
  };

  if (status === 'sent' && composed) {
    // Always offer the other channel. The one that just ran may not have
    // opened at all — no WhatsApp installed, no mail client configured, a
    // number not yet registered — and the visitor cannot tell us that.
    const fallback =
      composed.via === 'whatsapp'
        ? { href: composed.email, label: d.form.fallbackEmail }
        : composed.whatsapp
          ? { href: composed.whatsapp, label: d.form.fallbackWhatsapp }
          : null;

    return (
      <div role="status" className="rounded-2xl border border-gold/30 bg-cream p-8 text-center">
        <p className="font-serif text-lg text-navy">
          {composed.via === 'whatsapp'
            ? d.form.successWhatsapp
            : composed.via === 'email'
              ? d.form.successEmail
              : d.form.success}
        </p>

        {fallback && (
          <p className="mt-3 text-[13px] text-slateblue">
            <a
              href={fallback.href}
              target={fallback.href.startsWith('http') ? '_blank' : undefined}
              rel={fallback.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-semibold text-navy underline decoration-gold/60 underline-offset-4
                         transition-colors hover:text-gold-dark"
            >
              {fallback.label}
            </a>
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            setComposed(null);
            setStatus('idle');
          }}
          className="btn-outline mt-5 px-5 py-2.5 text-[13px]"
        >
          {d.cta.enquire}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans, irresistible to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          name="name"
          label={d.form.name}
          autoComplete="name"
          error={errors.name}
          required
        />
        <Field
          id={`${uid}-phone`}
          name="phone"
          label={d.form.phone}
          type="tel"
          dir="ltr"
          autoComplete="tel"
          error={errors.phone}
          required
        />
      </div>

      <Field
        id={`${uid}-email`}
        name="email"
        label={d.form.email}
        type="email"
        dir="ltr"
        autoComplete="email"
        error={errors.email}
        required
      />

      <div>
        <label htmlFor={`${uid}-service`} className="mb-1.5 block text-[13px] font-medium text-navy">
          {d.form.service}
        </label>
        <select
          id={`${uid}-service`}
          name="service"
          defaultValue={defaultService ?? ''}
          className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy
                     focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
        >
          <option value="">{d.form.servicePlaceholder}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s[locale].name}
            </option>
          ))}
          <option value="other">{d.form.serviceOther}</option>
        </select>
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="mb-1.5 block text-[13px] font-medium text-navy">
          {d.form.message} <span className="text-gold">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          required
          maxLength={MESSAGE_MAX}
          placeholder={d.form.messagePlaceholder}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy placeholder:text-slateblue/60
                      focus:outline-none focus:ring-2 focus:ring-gold/25 ${
                        errors.message ? 'border-red-400' : 'border-navy/12 focus:border-gold'
                      }`}
        />
        {errors.message && (
          <p id={`${uid}-message-error`} className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-[13px] leading-relaxed text-slateblue">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            required
            aria-invalid={errors.consent ? 'true' : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy/25 text-gold focus:ring-gold/40"
          />
          <span>{d.form.consent}</span>
        </label>
        {errors.consent && <p className="mt-1.5 text-xs text-red-600">{errors.consent}</p>}
      </div>

      {status === 'error' && (
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>{d.form.error}</p>
          {composed && (
            <p className="mt-2">
              <a
                href={composed.whatsapp || composed.email}
                target={composed.whatsapp ? '_blank' : undefined}
                rel={composed.whatsapp ? 'noopener noreferrer' : undefined}
                className="font-semibold underline underline-offset-4"
              >
                {composed.whatsapp ? d.form.fallbackWhatsapp : d.form.fallbackEmail}
              </a>
            </p>
          )}
        </div>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-gold w-full sm:w-auto">
        {status === 'sending'
          ? d.form.sending
          : channel === 'whatsapp'
            ? d.form.submitWhatsapp
            : channel === 'email'
              ? d.form.submitEmail
              : d.form.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  error,
  required,
  type = 'text',
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-navy">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy placeholder:text-slateblue/60
                    focus:outline-none focus:ring-2 focus:ring-gold/25 ${
                      error ? 'border-red-400' : 'border-navy/12 focus:border-gold'
                    }`}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Hands a composed enquiry to the visitor's own app.
 *
 * mailto: never yields a usable tab — opening it in one leaves a blank window
 * behind — so it always navigates in place. A wa.me link opens in a new tab so
 * the site stays where it is; this runs inside the submit click, so it is not
 * a blocked popup, but if a blocker refuses it anyway, navigating is far
 * better than appearing to do nothing.
 */
function openChannel(url: string) {
  if (!url) return;
  if (url.startsWith('mailto:')) {
    window.location.href = url;
    return;
  }
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = url;
}
