'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before animating — use to stagger siblings. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
  y?: number;
}

/**
 * Fades and lifts content into view once, when it scrolls into the viewport.
 * Respects prefers-reduced-motion by rendering the content statically.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  y = 20,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
