/**
 * SERVICE REGISTRY
 * The order of this array is the order services appear on the site.
 * To add a service: create a file in this folder exporting a `Service`,
 * import it here and add it to the array. Pages, sitemap, navigation,
 * the services grid, the search filter and the contact form dropdown
 * all read from this one list.
 */
import type { Service, ServiceCategory } from './types';
import { immigration } from './immigration';
import { visaServices, legalServices } from './visa-legal';
import { translationServices, attestation } from './translation';
import { emiratesId, tasheel } from './emirates-id-tasheel';
import { proServices, medicalServices } from './pro-medical';
import { vatRegistration, corporateTax } from './tax';
import { insuranceServices, businessConsultation } from './business';
import { typingServices, documentsClearance } from './typing-clearance';

export const services: Service[] = [
  immigration,
  visaServices,
  legalServices,
  translationServices,
  attestation,
  emiratesId,
  tasheel,
  proServices,
  medicalServices,
  vatRegistration,
  corporateTax,
  insuranceServices,
  businessConsultation,
  typingServices,
  documentsClearance,
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const serviceSlugs = services.map((s) => s.slug);

export const categories: { id: ServiceCategory; en: string; ar: string }[] = [
  { id: 'individual', en: 'Individuals & families', ar: 'الأفراد والعائلات' },
  { id: 'business', en: 'Business & PRO', ar: 'الأعمال والعلاقات العامة' },
  { id: 'legal', en: 'Legal & translation', ar: 'القانونية والترجمة' },
  { id: 'tax', en: 'Tax & compliance', ar: 'الضرائب والامتثال' },
];

export type { Service, ServiceCategory, ServiceLocaleContent } from './types';
