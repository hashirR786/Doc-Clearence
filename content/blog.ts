/**
 * BLOG POSTS — SEO articles.
 * Body is a small block format so posts stay easy to edit without MDX tooling.
 * Add a post by appending to the array; the listing, sitemap and routes follow.
 */

export type Block =
  | { type: 'p'; en: string; ar: string }
  | { type: 'h2'; en: string; ar: string }
  | { type: 'ul'; en: string[]; ar: string[] };

export interface BlogPost {
  slug: string;
  /** ISO date, used for sitemap lastmod and Article schema. */
  date: string;
  /** Optional related service slug for internal linking. */
  service?: string;
  en: { title: string; metaTitle: string; description: string; excerpt: string; body: Block[] };
  ar: { title: string; metaTitle: string; description: string; excerpt: string; body: Block[] };
}

export const posts: BlogPost[] = [
  {
    slug: 'emirates-id-renewal-guide',
    date: '2026-09-15',
    service: 'emirates-id-services',
    en: {
      title: 'Emirates ID renewal: timing, fines and what to bring',
      metaTitle: 'Emirates ID Renewal Guide UAE | Gulf Nejoom',
      description:
        'When to renew your Emirates ID, what the late fee is, which documents to bring and how to avoid the common mistakes.',
      excerpt:
        'Renew within 30 days of expiry or a daily late fee starts. Here is the timing, the document list and the errors that cost people weeks.',
      body: [
        {
          type: 'p',
          en: 'Your Emirates ID sits underneath almost every transaction you make in the UAE — banking, tenancy, telecoms, medical care and every government counter. An expired card stops those transactions long before the late fee becomes the main problem.',
          ar: 'تقف هويتك الإماراتية خلف كل معاملة تقريباً في الإمارات — البنوك والإيجار والاتصالات والرعاية الطبية وكل منفذ حكومي. والبطاقة المنتهية تعطّل هذه المعاملات قبل أن تصبح الغرامة هي المشكلة الأساسية بوقت طويل.',
        },
        {
          type: 'h2',
          en: 'The 30-day window',
          ar: 'مهلة الثلاثين يوماً',
        },
        {
          type: 'p',
          en: 'You have 30 days from the expiry date to renew. After that a daily late fee applies up to a capped maximum. The practical advice is to start a week or two before expiry rather than counting on the grace period, because biometrics appointments are not always available on the day you want one.',
          ar: 'لديك ثلاثون يوماً من تاريخ الانتهاء للتجديد، وبعدها تُفرض غرامة يومية بحد أقصى معين. والنصيحة العملية أن تبدأ قبل الانتهاء بأسبوع أو أسبوعين بدل الاعتماد على المهلة، لأن مواعيد البصمة ليست متاحة دائماً في اليوم الذي تريده.',
        },
        {
          type: 'h2',
          en: 'What to have ready',
          ar: 'ما يجب تجهيزه',
        },
        {
          type: 'ul',
          en: [
            'Original passport and a clear copy',
            'Your current or expired Emirates ID',
            'Valid residence visa page',
            'A photograph meeting the current specification, if requested',
            'Sponsor documents, including the trade licence for company sponsorship',
          ],
          ar: [
            'جواز السفر الأصلي ونسخة واضحة',
            'هويتك الحالية أو المنتهية',
            'صفحة إقامة سارية',
            'صورة شخصية بالمواصفات المعتمدة عند الطلب',
            'مستندات الكفيل بما فيها الرخصة التجارية لكفالة الشركة',
          ],
        },
        {
          type: 'h2',
          en: 'The mistake that costs the most time',
          ar: 'الخطأ الأكثر كلفة في الوقت',
        },
        {
          type: 'p',
          en: 'A mismatch between your passport and your ID record — a name transliterated differently, or a date of birth in the wrong format — will stall the renewal and then propagate into every system that reads the card. If you know the two do not match, raise a data correction at the same time rather than renewing around the problem.',
          ar: 'التباين بين جواز سفرك وسجل هويتك — اسم مكتوب بصيغة مختلفة أو تاريخ ميلاد بصيغة خاطئة — يعطّل التجديد ثم ينتقل إلى كل نظام يقرأ البطاقة. فإن كنت تعلم بوجود اختلاف فارفع طلب تصحيح بيانات في الوقت نفسه بدل الالتفاف حول المشكلة.',
        },
        {
          type: 'p',
          en: 'If your card has already expired, the position is recoverable. Send us the expiry date and we will calculate the exact fine and process the renewal together with it.',
          ar: 'وإن كانت بطاقتك منتهية فعلاً فالوضع قابل للمعالجة. أرسل لنا تاريخ الانتهاء ونحسب الغرامة بدقة وننجز التجديد معها.',
        },
      ],
    },
    ar: {
      title: 'تجديد الهوية الإماراتية: التوقيت والغرامات وما يجب إحضاره',
      metaTitle: 'دليل تجديد الهوية الإماراتية | الخليج نجوم',
      description:
        'متى تجدد هويتك الإماراتية، وما قيمة غرامة التأخير، وما المستندات المطلوبة، وكيف تتفادى الأخطاء الشائعة.',
      excerpt:
        'جدّد خلال ثلاثين يوماً من الانتهاء وإلا بدأت غرامة يومية. إليك التوقيت وقائمة المستندات والأخطاء التي تكلّف الناس أسابيع.',
      body: [],
    },
  },
  {
    slug: 'document-attestation-uae-explained',
    date: '2026-09-28',
    service: 'attestation-translation',
    en: {
      title: 'Document attestation in the UAE, explained in order',
      metaTitle: 'Document Attestation UAE Explained | Gulf Nejoom',
      description:
        'The attestation chain for foreign documents used in the UAE — every step, in the order it has to happen, and what delays it.',
      excerpt:
        'Attestation is a sequence, and doing the steps out of order usually means starting again. Here is the chain, end to end.',
      body: [
        {
          type: 'p',
          en: 'A certificate issued in one country has no standing in another until it is attested. For documents issued abroad and used in the UAE, attestation is a fixed sequence — and the single most common expensive mistake is doing the steps out of order.',
          ar: 'الشهادة الصادرة في بلد لا قيمة لها في بلد آخر حتى تُصدَّق. وبالنسبة للمستندات الصادرة خارج الدولة والمستخدمة فيها، التصديق سلسلة ثابتة، وأكثر الأخطاء كلفة هو تنفيذ خطواتها بترتيب خاطئ.',
        },
        {
          type: 'h2',
          en: 'The chain, in order',
          ar: 'السلسلة بالترتيب',
        },
        {
          type: 'ul',
          en: [
            'Authentication by the issuing authority or a notary in the country of origin',
            'Attestation by that country\'s ministry of foreign affairs',
            'Legalisation by the UAE embassy or consulate in that country',
            'Attestation by the UAE Ministry of Foreign Affairs after the document arrives',
            'Certified Arabic translation by a Ministry of Justice licensed translator',
          ],
          ar: [
            'التوثيق من الجهة المُصدِرة أو كاتب العدل في بلد الإصدار',
            'التصديق من وزارة خارجية ذلك البلد',
            'التصديق من سفارة أو قنصلية الإمارات هناك',
            'التصديق من وزارة الخارجية الإماراتية بعد وصول المستند',
            'ترجمة عربية معتمدة من مترجم مرخّص من وزارة العدل',
          ],
        },
        {
          type: 'h2',
          en: 'Translate last, not first',
          ar: 'الترجمة أخيراً لا أولاً',
        },
        {
          type: 'p',
          en: 'The translation has to reproduce the attestation stamps that appear on the document. Translating before attestation is complete means the translation is incomplete, and you pay for it twice. Attest first, translate last.',
          ar: 'يجب أن تتضمن الترجمة أختام التصديق الظاهرة على المستند. والترجمة قبل اكتمال التصديق تعني ترجمة ناقصة ودفعاً مرتين. صدّق أولاً وترجم أخيراً.',
        },
        {
          type: 'h2',
          en: 'Where the time actually goes',
          ar: 'أين يذهب الوقت فعلاً',
        },
        {
          type: 'p',
          en: 'UAE-side steps are usually a matter of days. The steps completed abroad are the variable — some embassies turn documents around in days, others in weeks, and nobody in the UAE can accelerate them. Any provider who promises you a fixed date for an overseas step is guessing.',
          ar: 'الخطوات داخل الدولة أيام عادة. أما الخطوات خارجها فهي المتغير: بعض السفارات تنجز خلال أيام وأخرى خلال أسابيع، ولا أحد داخل الإمارات يستطيع تسريعها. وأي مزوّد يَعِدك بتاريخ ثابت لخطوة خارجية فهو يخمّن.',
        },
      ],
    },
    ar: {
      title: 'تصديق المستندات في الإمارات مشروحاً بالترتيب',
      metaTitle: 'شرح تصديق المستندات في الإمارات | الخليج نجوم',
      description:
        'سلسلة تصديق المستندات الأجنبية المستخدمة في الإمارات — كل خطوة بترتيبها الصحيح وما الذي يؤخرها.',
      excerpt: 'التصديق سلسلة مرتّبة، وتنفيذ خطواتها بترتيب خاطئ يعني البدء من جديد غالباً. إليك السلسلة كاملة.',
      body: [],
    },
  },
  {
    slug: 'corporate-tax-registration-deadline',
    date: '2026-10-05',
    service: 'corporate-tax-registration',
    en: {
      title: 'Corporate tax registration: who must register and by when',
      metaTitle: 'UAE Corporate Tax Registration Deadlines | Gulf Nejoom',
      description:
        'Which UAE entities must register for corporate tax, how deadlines are set, and what the penalty is for registering late.',
      excerpt:
        'Free zone entities are not exempt from registering. Here is who is in scope, how the deadline is calculated and what late registration costs.',
      body: [
        {
          type: 'p',
          en: 'Corporate tax registration is a legal obligation separate from paying tax. An entity within scope must register whether or not it made a profit, and whether or not it expects to pay anything.',
          ar: 'تسجيل ضريبة الشركات التزام قانوني منفصل عن سداد الضريبة. فالكيان المشمول بالنطاق يجب أن يسجّل سواء حقق ربحاً أم لا، وسواء توقّع سداد شيء أم لا.',
        },
        {
          type: 'h2',
          en: 'Who is in scope',
          ar: 'من المشمول بالنطاق',
        },
        {
          type: 'ul',
          en: [
            'Mainland companies incorporated in the UAE',
            'Free zone entities, including those that may qualify for a preferential rate',
            'Branches of foreign companies with a UAE presence',
            'Natural persons conducting business above the relevant threshold',
          ],
          ar: [
            'شركات البر الرئيسي المؤسسة في الدولة',
            'كيانات المناطق الحرة بما فيها المؤهلة لمعاملة تفضيلية',
            'فروع الشركات الأجنبية العاملة في الدولة',
            'الأشخاص الطبيعيون الممارسون لنشاط تجاري يتجاوز الحد المعني',
          ],
        },
        {
          type: 'h2',
          en: 'The free zone misunderstanding',
          ar: 'سوء الفهم المتعلق بالمناطق الحرة',
        },
        {
          type: 'p',
          en: 'Qualifying free zone persons may benefit from a preferential rate on qualifying income. That is a question about the rate, not about registration. The registration obligation applies regardless, and treating the two as the same thing is how free zone companies end up with an avoidable penalty.',
          ar: 'قد يستفيد الشخص المؤهل في المنطقة الحرة من معاملة تفضيلية على الدخل المؤهل، وهذه مسألة تتعلق بالنسبة لا بالتسجيل. فالتزام التسجيل قائم بغض النظر، والخلط بين الأمرين هو ما يوقع شركات المناطق الحرة في غرامة كان يمكن تفاديها.',
        },
        {
          type: 'h2',
          en: 'Deadlines and penalties',
          ar: 'المواعيد والغرامات',
        },
        {
          type: 'p',
          en: 'Deadlines are tied to entity type and licence issuance date, and for many categories they have already passed. The Federal Tax Authority applies a fixed administrative penalty per entity for late registration. If you are unsure of your position, send us your trade licence and we will tell you where you stand before anything else.',
          ar: 'المواعيد مرتبطة بنوع الكيان وتاريخ إصدار الرخصة، وقد انقضت بالفعل لكثير من الفئات. وتفرض الهيئة الاتحادية للضرائب غرامة إدارية ثابتة لكل كيان على التأخر في التسجيل. فإن لم تكن متأكداً من موقفك أرسل رخصتك التجارية ونوضّح لك وضعك قبل أي شيء آخر.',
        },
      ],
    },
    ar: {
      title: 'تسجيل ضريبة الشركات: من يجب عليه التسجيل ومتى',
      metaTitle: 'مواعيد تسجيل ضريبة الشركات في الإمارات | الخليج نجوم',
      description:
        'أي الكيانات في الإمارات ملزمة بتسجيل ضريبة الشركات وكيف تُحدد المواعيد وما غرامة التأخر في التسجيل.',
      excerpt:
        'كيانات المناطق الحرة ليست معفاة من التسجيل. إليك من هو المشمول وكيف يُحسب الموعد وكم يكلّف التأخر.',
      body: [],
    },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/**
 * Article bodies are authored once as bilingual blocks (each block carries both
 * `en` and `ar`), so the body lives on the English entry and both locales read
 * from it. If you ever need a structurally different Arabic article, populate
 * `ar.body` and this helper will prefer it.
 */
export const postBody = (post: BlogPost, locale: 'en' | 'ar'): Block[] =>
  locale === 'ar' && post.ar.body.length > 0 ? post.ar.body : post.en.body;
