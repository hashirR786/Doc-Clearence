import Link from 'next/link';
import ServiceIcon from './ServiceIcon';
import { ArrowIcon } from './icons';
import type { Service } from '@/content/services';
import type { Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';

export default function ServiceCard({
  service,
  locale,
  /** Over the services video scene, cards sit on glass so the motion shows through. */
  floating = false,
}: {
  service: Service;
  locale: Locale;
  floating?: boolean;
}) {
  const c = service[locale];
  const d = t(locale);

  return (
    <article
      className={`card card-hover group relative flex h-full flex-col ${
        floating
          ? // Translucent so the footage reads through. The blur is desktop
            // only: a backdrop-filter on fifteen cards stacked over a seeking
            // video is punishing on a mobile GPU and showed as scroll jank.
            // A plain translucent background costs nothing, so phones keep
            // the transparency without it.
            'bg-white/75 md:backdrop-blur-md'
          : ''
      }`}
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-gold-dark transition-colors duration-300 group-hover:bg-gold/10">
        <ServiceIcon name={service.icon} className="h-5 w-5" />
      </span>

      <h3 className="mt-5 font-serif text-lg font-semibold leading-snug text-navy">
        <Link href={href(locale, `services/${service.slug}`)} className="before:absolute before:inset-0">
          {c.name}
        </Link>
      </h3>

      <p
        className={`mt-2.5 flex-1 text-sm leading-relaxed ${
          // Darker ink only where the card is translucent — at 75% white over
          // the video, the standard slate drops to 4.04:1 and fails AA.
          floating ? 'text-slateblue-ink' : 'text-slateblue'
        }`}
      >
        {c.summary}
      </p>

      <span
        className={`mt-5 inline-flex items-center gap-2 text-[13px] font-semibold ${
          // Gold reaches only 2.47:1 against a 75%-white card over the video,
          // so the translucent variant uses navy for the label and keeps the
          // gold on the arrow, where it is decoration rather than text.
          floating ? 'text-navy' : 'text-gold-dark'
        }`}
      >
        {d.cta.viewService}
        <ArrowIcon
          className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 ${
            floating ? 'text-gold-dark' : ''
          }`}
        />
      </span>
    </article>
  );
}
