'use client';

import { useEffect, useState } from 'react';
import { WhatsAppIcon } from './icons';
import { whatsappLink, type Locale } from '@/content/site';
import { t } from '@/content/ui';

/** Floating WhatsApp button, shown on every page once the user starts scrolling. */
export default function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const d = t(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={d.cta.whatsapp}
      className={`group fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full
                  bg-[#25D366] text-white shadow-lift transition-all duration-300
                  hover:scale-105 focus-visible:scale-105
                  ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="sr-only">{d.cta.whatsapp}</span>
    </a>
  );
}
