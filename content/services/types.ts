/**
 * Service content model.
 * Every service page on the site is generated from one object of this shape.
 * To add a service: create the object, then register it in content/services/index.ts.
 */

export type ServiceCategory = 'individual' | 'business' | 'legal' | 'tax';

export interface ServiceSection {
  /** Rendered as an H2 on the service page. */
  h2: string;
  /** One or more paragraphs. */
  p: string[];
  /** Optional bullet list rendered under the paragraphs. */
  list?: string[];
}

export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceLocaleContent {
  /** Short name used in navigation, cards and the contact form dropdown. */
  name: string;
  /** The single H1 of the service page. */
  h1: string;
  /** <title> — keep under 60 characters. */
  title: string;
  /** <meta name="description"> — keep under 155 characters. */
  description: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Opening paragraph under the H1. */
  intro: string;
  /** Main body, 400–600 words across these sections. */
  sections: ServiceSection[];
  documents: string[];
  steps: ServiceStep[];
  faqs: ServiceFaq[];
  turnaround: string;
  whoFor: string;
}

export interface Service {
  /** URL segment: /services/<slug> */
  slug: string;
  category: ServiceCategory;
  /** Icon key — see components/ServiceIcon.tsx */
  icon: string;
  /** Slugs of related services, used for internal linking. */
  related: string[];
  /** Target search keywords, used for the keywords meta and internal search. */
  keywords: string[];
  en: ServiceLocaleContent;
  ar: ServiceLocaleContent;
}
