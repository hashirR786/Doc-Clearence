'use client';

import { useId, useState } from 'react';
import { services } from '@/content/services';
import type { Locale } from '@/content/site';
import { t } from '@/content/ui';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: string;
}

/**
 * Enquiry form with inline validation, a honeypot plus time-trap for spam,
 * and submission to /api/contact.
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
  // Spam time-trap: forms completed implausibly fast are almost always bots.
  const [startedAt] = useState(() => Date.now());

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

    setStatus('sending');
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // On a static host (GitHub Pages) there is no /api route, so point
      // NEXT_PUBLIC_FORM_ENDPOINT at a hosted form service instead.
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '/api/contact';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale, elapsedMs: Date.now() - startedAt }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-gold/30 bg-cream p-8 text-center">
        <p className="font-serif text-lg text-navy">{d.form.success}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
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
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {d.form.error}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-gold w-full sm:w-auto">
        {status === 'sending' ? d.form.sending : d.form.submit}
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
