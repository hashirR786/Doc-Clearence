/**
 * UI STRINGS — every label on the site, in English and Arabic.
 * Add a key here, then read it with `t(locale).<key>`.
 */
import type { Locale } from './site';

export const ui = {
  en: {
    dir: 'ltr' as const,
    langName: 'English',
    otherLangName: 'العربية',
    skipToContent: 'Skip to content',

    nav: {
      home: 'Home',
      services: 'Services',
      locations: 'Locations',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
    },

    cta: {
      whatsapp: 'WhatsApp Us',
      call: 'Call Now',
      consult: 'Get a Free Consultation',
      enquire: 'Send an Enquiry',
      viewService: 'View details',
      allServices: 'All services',
      getQuote: 'Request a Quote',
    },

    hero: {
      label: 'Document Clearance · PRO · Typing Centre',
      title: 'Government paperwork, handled properly.',
      subtitle:
        'Gulf Nejoom is a private document clearance and PRO services company in the UAE. We prepare, submit and follow up your applications across immigration, Tasheel, Emirates ID, attestation, tax and business setup — so you do not have to queue.',
      scroll: 'Scroll to explore',
    },

    trust: {
      label: 'Why clients stay with us',
    },

    statement: {
      label: 'Our promise',
      title: 'We do the queuing, the chasing and the paperwork.',
      body: 'Every file starts with a free document review, a written checklist and a quote that separates the government fee from ours. Then one named coordinator takes it through to approval, and tells you where it stands at every stage.',
    },

    servicesSection: {
      label: 'What we do',
      title: 'Services for individuals, families and businesses',
      subtitle:
        'Fifteen service lines, one point of contact. Tell us what you need and we will tell you exactly which documents to bring and how long it takes.',
    },

    process: {
      label: 'How it works',
      title: 'Four steps from paperwork to approval',
      steps: [
        {
          title: 'Send your documents',
          body: 'Share scans or photos on WhatsApp, email them, or bring the originals to our office. No appointment needed.',
        },
        {
          title: 'We review',
          body: 'We check every document against the current requirements and tell you upfront what is missing, what it costs and how long it takes.',
        },
        {
          title: 'We process',
          body: 'We complete the typing, submit through the correct government channel and follow up until the file moves.',
        },
        {
          title: 'Delivered or approved',
          body: 'You receive the approval, card or attested document — collected in person, couriered, or sent digitally.',
        },
      ],
    },

    why: {
      label: 'Why Gulf Nejoom',
      title: 'A straight answer, a fixed price and someone who picks up the phone',
      points: [
        {
          title: 'One coordinator per file',
          body: 'You deal with a named person who knows your case, not a queue number or a shared inbox.',
        },
        {
          title: 'Requirements checked first',
          body: 'We verify the document checklist before you pay anything, so applications are not rejected on a technicality.',
        },
        {
          title: 'Transparent pricing',
          body: 'Government fees and our service fee are quoted separately and in writing. No surprises at collection.',
        },
        {
          title: 'Bilingual team',
          body: 'Arabic and English throughout, including legal translation handled by certified translators.',
        },
        {
          title: 'Licensed and accountable',
          body: 'A private service provider licensed in the UAE — not a government entity, and clear about the difference.',
        },
        {
          title: 'Updates you do not have to chase',
          body: 'Status updates on WhatsApp at every stage, including when we are waiting on the authority.',
        },
      ],
    },

    testimonials: {
      label: 'Client feedback',
      title: 'What clients say',
      note: 'Placeholder testimonials — replace with real, verifiable client reviews before launch.',
    },

    faq: {
      label: 'Questions',
      title: 'Frequently asked questions',
    },

    finalCta: {
      title: 'Tell us what you need processed',
      body: 'Send your documents on WhatsApp for a free review. We will reply with the checklist, the cost and the timeline.',
    },

    contact: {
      label: 'Get in touch',
      title: 'Contact Gulf Nejoom',
      subtitle:
        'Message us on WhatsApp for the fastest reply, or send the form below and we will come back to you within one working day.',
      addressLabel: 'Office',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      hoursLabel: 'Opening hours',
      mapTitle: 'Gulf Nejoom office location on Google Maps',
    },

    form: {
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone / WhatsApp number',
      service: 'Service required',
      servicePlaceholder: 'Select a service',
      serviceOther: 'Something else',
      message: 'How can we help?',
      messagePlaceholder: 'Tell us what you need processed and the deadline, if any.',
      consent: 'I agree to Gulf Nejoom contacting me about this enquiry.',
      submit: 'Send enquiry',
      submitWhatsapp: 'Send on WhatsApp',
      submitEmail: 'Send by email',
      sending: 'Sending…',
      opening: 'Opening…',
      enquirySubject: 'Website enquiry',
      successWhatsapp:
        'Your enquiry is ready in WhatsApp — press send there and we will reply within one working day.',
      successEmail:
        'Your enquiry is ready in your email app — press send there and we will reply within one working day.',
      fallbackWhatsapp: 'Did not open? Send it on WhatsApp instead',
      fallbackEmail: 'Did not open? Send it by email instead',
      success: 'Thank you — your enquiry has been received. We will reply within one working day.',
      error: 'Sorry, the message could not be sent. Please WhatsApp or call us instead.',
      required: 'This field is required.',
      invalidEmail: 'Please enter a valid email address.',
      invalidPhone: 'Please enter a valid phone number.',
    },

    service: {
      documentsTitle: 'Documents you will need',
      processTitle: 'How the process works',
      faqTitle: 'Questions about this service',
      relatedTitle: 'Related services',
      ctaTitle: 'Need help with this?',
      ctaBody:
        'Send your documents for a free review. We will confirm the checklist, the government fees and the timeline before you commit.',
      turnaround: 'Typical turnaround',
      whoFor: 'Who it is for',
    },

    servicesPage: {
      searchLabel: 'Search services',
      searchPlaceholder: 'Search, e.g. Emirates ID, VAT, attestation…',
      filterAll: 'All',
      noResults: 'No services match that search. Try a different term or contact us directly.',
      resultsCount: (n: number) => `${n} service${n === 1 ? '' : 's'}`,
    },

    breadcrumb: { home: 'Home' },

    cookies: {
      text: 'We use essential cookies to run this site, and analytics cookies only if you accept. See our Privacy Policy.',
      accept: 'Accept',
      decline: 'Decline',
      policy: 'Privacy Policy',
    },

    footer: {
      about:
        'Gulf Nejoom Documents Clearance Service L.L.C is a private document clearance, typing and PRO services company serving individuals and businesses across the UAE.',
      servicesTitle: 'Services',
      companyTitle: 'Company',
      contactTitle: 'Contact',
      legalTitle: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      rights: 'All rights reserved.',
      disclaimer:
        'Gulf Nejoom is a private service provider. We are not a government department and we are not affiliated with any government authority. Government fees are set by the relevant authority and are charged at cost.',
    },

    blog: {
      title: 'Insights & guides',
      subtitle: 'Plain-English explainers on UAE document procedures, written by our team.',
      readMore: 'Read article',
      empty: 'Articles are on the way. Check back soon, or ask us your question directly.',
      backToBlog: 'Back to all articles',
      published: 'Published',
    },

    notFound: {
      title: 'Page not found',
      body: 'The page you are looking for has moved or no longer exists.',
      cta: 'Back to home',
    },
  },

  ar: {
    dir: 'rtl' as const,
    langName: 'العربية',
    otherLangName: 'English',
    skipToContent: 'تخطي إلى المحتوى',

    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      locations: 'مواقعنا',
      about: 'من نحن',
      blog: 'المدونة',
      contact: 'اتصل بنا',
    },

    cta: {
      whatsapp: 'واتساب',
      call: 'اتصل الآن',
      consult: 'استشارة مجانية',
      enquire: 'أرسل استفسارك',
      viewService: 'عرض التفاصيل',
      allServices: 'جميع الخدمات',
      getQuote: 'اطلب عرض سعر',
    },

    hero: {
      label: 'تخليص المستندات · خدمات العلاقات العامة · مركز طباعة',
      title: 'معاملاتكم الحكومية بين أيدٍ أمينة.',
      subtitle:
        'الخليج نجوم شركة خاصة لتخليص المستندات وخدمات العلاقات العامة في الإمارات. نُعدّ معاملاتكم ونقدّمها ونتابعها في الهجرة وتسهيل والهوية الإماراتية والتصديق والضرائب وتأسيس الأعمال — دون عناء الانتظار.',
      scroll: 'مرّر للأسفل',
    },

    trust: {
      label: 'لماذا يبقى عملاؤنا معنا',
    },

    statement: {
      label: 'وعدنا',
      title: 'نتولى عنك الانتظار والمتابعة والمعاملات.',
      body: 'كل ملف يبدأ بمراجعة مجانية للمستندات وقائمة مكتوبة وعرض سعر يفصل الرسوم الحكومية عن رسومنا. ثم يتولاه منسّق واحد محدد حتى الموافقة، ويخبرك بموقفه في كل مرحلة.',
    },

    servicesSection: {
      label: 'ماذا نقدّم',
      title: 'خدمات للأفراد والعائلات والشركات',
      subtitle:
        'خمس عشرة خدمة ونقطة تواصل واحدة. أخبرنا بما تحتاجه ونخبرك بالمستندات المطلوبة والمدة الزمنية بدقة.',
    },

    process: {
      label: 'كيف نعمل',
      title: 'أربع خطوات من المستند إلى الموافقة',
      steps: [
        {
          title: 'أرسل مستنداتك',
          body: 'أرسل صوراً أو نسخاً عبر واتساب أو البريد الإلكتروني، أو أحضر الأصول إلى مكتبنا. لا حاجة لموعد مسبق.',
        },
        {
          title: 'نراجع الملف',
          body: 'نتحقق من كل مستند وفق المتطلبات الحالية، ونوضّح لك مسبقاً ما هو ناقص والتكلفة والمدة.',
        },
        {
          title: 'ننجز المعاملة',
          body: 'ننجز الطباعة ونقدّم الطلب عبر القناة الحكومية الصحيحة ونتابع حتى يتقدّم الملف.',
        },
        {
          title: 'التسليم أو الموافقة',
          body: 'تستلم الموافقة أو البطاقة أو المستند المصدّق — استلاماً شخصياً أو بالشحن أو إلكترونياً.',
        },
      ],
    },

    why: {
      label: 'لماذا الخليج نجوم',
      title: 'إجابة واضحة وسعر ثابت وشخص يردّ على الهاتف',
      points: [
        {
          title: 'منسّق واحد لكل ملف',
          body: 'تتعامل مع شخص محدد يعرف معاملتك، لا مع رقم انتظار أو بريد مشترك.',
        },
        {
          title: 'مراجعة المتطلبات أولاً',
          body: 'نتحقق من قائمة المستندات قبل أي دفع، حتى لا يُرفض الطلب لسبب شكلي.',
        },
        {
          title: 'أسعار شفافة',
          body: 'نوضّح الرسوم الحكومية ورسوم خدمتنا بشكل منفصل وكتابياً. لا مفاجآت عند الاستلام.',
        },
        {
          title: 'فريق ثنائي اللغة',
          body: 'العربية والإنجليزية في كل مرحلة، مع ترجمة قانونية يقوم بها مترجمون معتمدون.',
        },
        {
          title: 'مرخّصون ومسؤولون',
          body: 'مزوّد خدمة خاص مرخّص في الإمارات — لسنا جهة حكومية، ونوضّح الفرق بوضوح.',
        },
        {
          title: 'تحديثات دون متابعة منك',
          body: 'تحديثات عبر واتساب في كل مرحلة، حتى أثناء انتظار ردّ الجهة المختصة.',
        },
      ],
    },

    testimonials: {
      label: 'آراء العملاء',
      title: 'ماذا يقول عملاؤنا',
      note: 'شهادات مبدئية — يجب استبدالها بآراء عملاء حقيقية وموثّقة قبل الإطلاق.',
    },

    faq: { label: 'أسئلة', title: 'الأسئلة الشائعة' },

    finalCta: {
      title: 'أخبرنا بالمعاملة التي تحتاجها',
      body: 'أرسل مستنداتك عبر واتساب لمراجعة مجانية. سنردّ بقائمة المستندات والتكلفة والمدة.',
    },

    contact: {
      label: 'تواصل معنا',
      title: 'اتصل بالخليج نجوم',
      subtitle: 'راسلنا على واتساب للحصول على أسرع رد، أو أرسل النموذج أدناه وسنعود إليك خلال يوم عمل واحد.',
      addressLabel: 'المكتب',
      phoneLabel: 'الهاتف',
      emailLabel: 'البريد الإلكتروني',
      hoursLabel: 'ساعات العمل',
      mapTitle: 'موقع مكتب الخليج نجوم على خرائط جوجل',
    },

    form: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف / واتساب',
      service: 'الخدمة المطلوبة',
      servicePlaceholder: 'اختر الخدمة',
      serviceOther: 'خدمة أخرى',
      message: 'كيف يمكننا مساعدتك؟',
      messagePlaceholder: 'أخبرنا بالمعاملة المطلوبة والموعد النهائي إن وُجد.',
      consent: 'أوافق على تواصل الخليج نجوم معي بخصوص هذا الاستفسار.',
      submit: 'إرسال الاستفسار',
      submitWhatsapp: 'إرسال عبر واتساب',
      submitEmail: 'إرسال بالبريد الإلكتروني',
      sending: 'جارٍ الإرسال…',
      opening: 'جارٍ الفتح…',
      enquirySubject: 'استفسار من الموقع',
      successWhatsapp:
        'استفسارك جاهز في واتساب — اضغط إرسال هناك وسنردّ خلال يوم عمل واحد.',
      successEmail:
        'استفسارك جاهز في تطبيق البريد — اضغط إرسال هناك وسنردّ خلال يوم عمل واحد.',
      fallbackWhatsapp: 'لم يُفتح؟ أرسله عبر واتساب',
      fallbackEmail: 'لم يُفتح؟ أرسله بالبريد الإلكتروني',
      success: 'شكراً لك — تم استلام استفسارك وسنردّ خلال يوم عمل واحد.',
      error: 'عذراً، تعذّر إرسال الرسالة. يرجى مراسلتنا عبر واتساب أو الاتصال بنا.',
      required: 'هذا الحقل مطلوب.',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
      invalidPhone: 'يرجى إدخال رقم هاتف صحيح.',
    },

    service: {
      documentsTitle: 'المستندات المطلوبة',
      processTitle: 'كيف تسير المعاملة',
      faqTitle: 'أسئلة حول هذه الخدمة',
      relatedTitle: 'خدمات ذات صلة',
      ctaTitle: 'تحتاج مساعدة في هذه الخدمة؟',
      ctaBody: 'أرسل مستنداتك لمراجعة مجانية. سنؤكد قائمة المستندات والرسوم الحكومية والمدة قبل البدء.',
      turnaround: 'المدة المعتادة',
      whoFor: 'لمن هذه الخدمة',
    },

    servicesPage: {
      searchLabel: 'ابحث في الخدمات',
      searchPlaceholder: 'ابحث مثلاً: الهوية الإماراتية، ضريبة القيمة المضافة، التصديق…',
      filterAll: 'الكل',
      noResults: 'لا توجد خدمات مطابقة. جرّب كلمة أخرى أو تواصل معنا مباشرة.',
      resultsCount: (n: number) => `${n} خدمة`,
    },

    breadcrumb: { home: 'الرئيسية' },

    cookies: {
      text: 'نستخدم ملفات تعريف ارتباط أساسية لتشغيل الموقع، وملفات تحليلية فقط بموافقتك. راجع سياسة الخصوصية.',
      accept: 'موافق',
      decline: 'رفض',
      policy: 'سياسة الخصوصية',
    },

    footer: {
      about:
        'الخليج نجوم لخدمات تخليص المستندات ذ.م.م شركة خاصة لتخليص المستندات والطباعة وخدمات العلاقات العامة، تخدم الأفراد والشركات في جميع أنحاء الإمارات.',
      servicesTitle: 'الخدمات',
      companyTitle: 'الشركة',
      contactTitle: 'التواصل',
      legalTitle: 'قانوني',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      rights: 'جميع الحقوق محفوظة.',
      disclaimer:
        'الخليج نجوم مزوّد خدمة خاص. لسنا جهة حكومية ولا تربطنا علاقة بأي سلطة حكومية. الرسوم الحكومية تحددها الجهة المختصة وتُحصّل كما هي.',
    },

    blog: {
      title: 'مقالات وأدلة',
      subtitle: 'شروحات مبسّطة لإجراءات المستندات في الإمارات، بقلم فريقنا.',
      readMore: 'اقرأ المقال',
      empty: 'المقالات في الطريق. عد قريباً أو اسألنا مباشرة.',
      backToBlog: 'العودة إلى المقالات',
      published: 'نُشر في',
    },

    notFound: {
      title: 'الصفحة غير موجودة',
      body: 'الصفحة التي تبحث عنها تم نقلها أو لم تعد موجودة.',
      cta: 'العودة إلى الرئيسية',
    },
  },
};

export const t = (locale: Locale) => ui[locale];
export type Dict = (typeof ui)['en'];
