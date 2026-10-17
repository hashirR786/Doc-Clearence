/**
 * Home page FAQs, placeholder testimonials, and the emirates we serve.
 */

export interface Faq {
  q: { en: string; ar: string };
  a: { en: string; ar: string };
}

export const homeFaqs: Faq[] = [
  {
    q: {
      en: 'Is Gulf Nejoom a government office?',
      ar: 'هل الخليج نجوم جهة حكومية؟',
    },
    a: {
      en: 'No. Gulf Nejoom Documents Clearance Service L.L.C is a private, UAE-licensed company. We prepare and submit applications on your behalf through official government channels. All decisions and government fees are set by the relevant authority.',
      ar: 'لا. الخليج نجوم لخدمات تخليص المستندات ذ.م.م شركة خاصة مرخّصة في الإمارات. نُعدّ الطلبات ونقدّمها نيابة عنك عبر القنوات الحكومية الرسمية، وجميع القرارات والرسوم الحكومية تحددها الجهة المختصة.',
    },
  },
  {
    q: {
      en: 'Do I have to visit your office?',
      ar: 'هل يجب أن أزور مكتبكم؟',
    },
    a: {
      en: 'For most transactions, no. Send clear scans on WhatsApp and we type, submit and track the application remotely. Only steps the authority itself requires in person — biometrics, notary signatures and the medical fitness test — need you to attend.',
      ar: 'في معظم المعاملات لا. أرسل نسخاً واضحة عبر واتساب ونتولى الطباعة والتقديم والمتابعة عن بُعد. والخطوات التي تشترطها الجهة حضورياً فقط — البصمة وتوقيع الكاتب العدل والفحص الطبي — تتطلب حضورك.',
    },
  },
  {
    q: {
      en: 'How are your fees structured?',
      ar: 'كيف تُحتسب رسومكم؟',
    },
    a: {
      en: 'Government fees are set by the authority and charged at cost, with the receipt. Our service fee is quoted separately and agreed in writing before any work begins, so you always know which part of the invoice is ours.',
      ar: 'الرسوم الحكومية تحددها الجهة وتُحصّل كما هي مع الإيصال. ورسوم خدمتنا تُسعّر منفصلة ويُتفق عليها كتابياً قبل بدء أي عمل، لتعرف دائماً أي جزء من الفاتورة يخصنا.',
    },
  },
  {
    q: {
      en: 'How quickly can you process my documents?',
      ar: 'ما مدى سرعة إنجاز مستنداتي؟',
    },
    a: {
      en: 'Most typing and submissions are completed the same working day. Approvals depend on the authority\'s own processing queue. We give you a realistic range before starting and tell you immediately if it changes.',
      ar: 'معظم أعمال الطباعة والتقديم تُنجز في يوم العمل نفسه. أما الموافقات فتعتمد على طابور المعالجة لدى الجهة المختصة. نعطيك نطاقاً واقعياً قبل البدء ونخبرك فوراً بأي تغيير.',
    },
  },
  {
    q: {
      en: 'Which emirates do you serve?',
      ar: 'أي إمارات تخدمون؟',
    },
    a: {
      en: 'We process documents across the UAE, including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain. Requirements, fees and timelines differ by emirate and we quote accordingly.',
      ar: 'نعالج المستندات في جميع أنحاء الإمارات، بما في ذلك دبي وأبوظبي والشارقة وعجمان ورأس الخيمة والفجيرة وأم القيوين. والمتطلبات والرسوم والمدد تختلف بين إمارة وأخرى ونسعّر وفقاً لذلك.',
    },
  },
  {
    q: {
      en: 'Are my documents kept confidential?',
      ar: 'هل تُحفظ مستنداتي بسرية؟',
    },
    a: {
      en: 'Yes. Documents are handled only by the team working on your file and used solely for the transaction you instruct. See our Privacy Policy for how we store and dispose of personal data.',
      ar: 'نعم. لا يطّلع على المستندات سوى الفريق العامل على ملفك، وتُستخدم حصراً للمعاملة التي كلّفتنا بها. راجع سياسة الخصوصية لمعرفة كيفية تخزين البيانات الشخصية والتخلص منها.',
    },
  },
  {
    q: {
      en: 'What happens if my application is rejected?',
      ar: 'ماذا يحدث إذا رُفض طلبي؟',
    },
    a: {
      en: 'We obtain the reason from the authority and explain it in plain language, then advise whether it can be corrected and resubmitted. Where a rejection was caused by an error on our side, we correct and resubmit at our cost.',
      ar: 'نحصل على سبب الرفض من الجهة المختصة ونشرحه بلغة واضحة، ثم نبيّن إن كان قابلاً للتصحيح وإعادة التقديم. وإن كان الرفض بسبب خطأ من جانبنا صححناه وأعدنا التقديم على حسابنا.',
    },
  },
];

/**
 * SAMPLE TESTIMONIALS — WRITTEN BY US, NOT SUPPLIED BY CLIENTS.
 *
 * The quotes, the names and the roles are all invented, and nothing on the
 * page now says so, so these must be swapped for real, attributable reviews
 * before the site goes to a commercial domain.
 *
 * `placeholder: true` marks the entries still waiting on a real one. Grep for
 * it to find them; clear the flag as each is replaced.
 */
export const testimonials = [
  {
    placeholder: true,
    quote: {
      en: 'My wife’s residence visa and Emirates ID were finished in a week. They told me exactly which documents to bring the first time, so nothing came back rejected.',
      ar: 'أُنجزت إقامة زوجتي وهويتها الإماراتية خلال أسبوع. أخبروني بالمستندات المطلوبة بدقة من أول مرة، فلم يُرفض شيء.',
    },
    author: 'Rohit Menon',
    role: { en: 'Family visa & Emirates ID', ar: 'تأشيرة عائلية وهوية إماراتية' },
  },
  {
    placeholder: true,
    quote: {
      en: 'We moved our PRO work here after missing a licence renewal. Nothing has lapsed since, and I get a message before each deadline rather than after it.',
      ar: 'نقلنا أعمال العلاقات العامة إليهم بعد أن فاتنا تجديد الرخصة. لم تنقضِ أي مهلة منذ ذلك، وتصلني رسالة قبل كل موعد لا بعده.',
    },
    author: 'Fatima Al Suwaidi',
    role: { en: 'Monthly PRO services', ar: 'خدمات علاقات عامة شهرية' },
  },
  {
    placeholder: true,
    quote: {
      en: 'Degree attestation for a job offer, done in four days with the legal translation included. The quote at the start matched the invoice at the end.',
      ar: 'تصديق الشهادة الجامعية لعرض عمل أُنجز في أربعة أيام مع الترجمة القانونية. وعرض السعر في البداية طابق الفاتورة في النهاية.',
    },
    author: 'Daniel Okafor',
    role: { en: 'Attestation & legal translation', ar: 'التصديق والترجمة القانونية' },
  },
];

export interface EmirateLocation {
  slug: string;
  /** `metaName` is used in <title> where `name` would push it past 60 chars. */
  en: { name: string; metaName?: string; blurb: string; detail: string };
  ar: { name: string; metaName?: string; blurb: string; detail: string };
}

export const locations: EmirateLocation[] = [
  {
    slug: 'dubai',
    en: {
      name: 'Dubai',
      blurb: 'Document clearance, PRO and typing services across Dubai.',
      detail:
        'Dubai is where most of our work sits — immigration and residency files, Tasheel labour transactions, economic department licensing, courts and notary work, and attestation through the Ministry of Foreign Affairs. We collect and deliver documents across the emirate.',
    },
    ar: {
      name: 'دبي',
      blurb: 'تخليص المستندات وخدمات العلاقات العامة والطباعة في دبي.',
      detail:
        'دبي هي محور معظم أعمالنا — ملفات الهجرة والإقامة ومعاملات العمل عبر تسهيل وترخيص دوائر التنمية الاقتصادية وأعمال المحاكم والكاتب العدل والتصديق عبر وزارة الخارجية. ونستلم المستندات ونسلّمها في مختلف أنحاء الإمارة.',
    },
  },
  {
    slug: 'abu-dhabi',
    en: {
      name: 'Abu Dhabi',
      blurb: 'Clearance, PRO support and attestation for Abu Dhabi entities.',
      detail:
        'Abu Dhabi has its own portals, requirements and fee structures. We process residency and labour files, licensing and attestation for Abu Dhabi entities, and advise where a requirement differs from Dubai so nothing is submitted in the wrong format.',
    },
    ar: {
      name: 'أبوظبي',
      blurb: 'التخليص ودعم العلاقات العامة والتصديق لكيانات أبوظبي.',
      detail:
        'لأبوظبي منصاتها ومتطلباتها وهياكل رسومها الخاصة. نعالج ملفات الإقامة والعمل والترخيص والتصديق لكيانات أبوظبي، ونوضّح حين يختلف المتطلب عن دبي حتى لا يُقدَّم شيء بصيغة خاطئة.',
    },
  },
  {
    slug: 'sharjah',
    en: {
      name: 'Sharjah',
      blurb: 'Typing, clearance and business services for Sharjah.',
      detail:
        'We handle Sharjah residency and labour transactions, economic department licensing, and attestation. Sharjah free zone entities have distinct requirements and we work across those portals as well as the mainland department.',
    },
    ar: {
      name: 'الشارقة',
      blurb: 'الطباعة والتخليص وخدمات الأعمال في الشارقة.',
      detail:
        'نتولى معاملات الإقامة والعمل في الشارقة وترخيص دائرة التنمية الاقتصادية والتصديق. ولكيانات المناطق الحرة في الشارقة متطلبات مختلفة ونعمل على منصاتها إلى جانب دائرة البر الرئيسي.',
    },
  },
  {
    slug: 'northern-emirates',
    en: {
      name: 'Ajman, RAK, Fujairah & UAQ',
      metaName: 'the Northern Emirates',
      blurb: 'Northern Emirates document processing and licensing.',
      detail:
        'We process documents in Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain, including free zone licensing, residency files and attestation. These emirates often offer faster or lower-cost licensing routes, and we will tell you when one genuinely suits your business better.',
    },
    ar: {
      name: 'عجمان ورأس الخيمة والفجيرة وأم القيوين',
      metaName: 'الإمارات الشمالية',
      blurb: 'إنجاز المستندات والترخيص في الإمارات الشمالية.',
      detail:
        'نعالج المستندات في عجمان ورأس الخيمة والفجيرة وأم القيوين، بما في ذلك ترخيص المناطق الحرة وملفات الإقامة والتصديق. وغالباً ما تتيح هذه الإمارات مسارات ترخيص أسرع أو أقل كلفة، وسنخبرك حين يناسب أحدها عملك فعلاً.',
    },
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
