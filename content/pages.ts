/**
 * Static page content: About, Privacy Policy, Terms of Service.
 * Blocks are bilingual so each page is authored once.
 */
import type { Block } from './blog';

export const about = {
  en: {
    metaTitle: 'About Gulf Nejoom | Document Clearance UAE',
    description:
      'Gulf Nejoom Documents Clearance Service L.L.C is a private UAE document clearance, typing and PRO services company.',
    h1: 'About Gulf Nejoom',
    lead: 'We are a private document clearance, typing and PRO services company in the UAE. Our job is to take government paperwork off your desk and return it finished.',
  },
  ar: {
    metaTitle: 'عن الخليج نجوم | تخليص المستندات في الإمارات',
    description:
      'الخليج نجوم لخدمات تخليص المستندات ذ.م.م شركة خاصة لتخليص المستندات والطباعة وخدمات العلاقات العامة في الإمارات.',
    h1: 'عن الخليج نجوم',
    lead: 'نحن شركة خاصة لتخليص المستندات والطباعة وخدمات العلاقات العامة في الإمارات. مهمتنا أن نرفع عن مكتبك عبء المعاملات الحكومية ونعيدها منجزة.',
  },
  body: [
    {
      type: 'h2',
      en: 'What we do',
      ar: 'ماذا نفعل',
    },
    {
      type: 'p',
      en: 'Gulf Nejoom Documents Clearance Service L.L.C prepares, submits and follows up government applications on behalf of individuals and businesses across the UAE. That covers immigration and residency, Tasheel labour transactions, Emirates ID, attestation and legal translation, VAT and corporate tax registration, business setup, and the day-to-day PRO work that keeps a company compliant.',
      ar: 'تُعدّ الخليج نجوم لخدمات تخليص المستندات ذ.م.م المعاملات الحكومية وتقدّمها وتتابعها نيابة عن الأفراد والشركات في جميع أنحاء الإمارات. ويشمل ذلك الهجرة والإقامة ومعاملات العمل عبر تسهيل والهوية الإماراتية والتصديق والترجمة القانونية وتسجيل ضريبة القيمة المضافة وضريبة الشركات وتأسيس الأعمال وأعمال العلاقات العامة اليومية التي تحافظ على التزام الشركة.',
    },
    {
      type: 'h2',
      en: 'How we work',
      ar: 'كيف نعمل',
    },
    {
      type: 'p',
      en: 'Every file starts with a document review, not an invoice. We check what you have against the current requirements, tell you what is missing, quote the government fee and our service fee separately, and only then begin. You deal with one named coordinator who knows your case, and you get updates on WhatsApp at every stage — including when we are waiting on the authority and there is nothing to report.',
      ar: 'كل ملف يبدأ بمراجعة المستندات لا بفاتورة. نراجع ما لديك وفق المتطلبات الحالية ونخبرك بالناقص ونسعّر الرسوم الحكومية ورسوم خدمتنا بشكل منفصل، ثم نبدأ. وتتعامل مع منسّق واحد محدد يعرف حالتك، وتصلك التحديثات عبر واتساب في كل مرحلة — حتى حين نكون في انتظار الجهة ولا جديد يُذكر.',
    },
    {
      type: 'h2',
      en: 'What we are not',
      ar: 'ما لسنا عليه',
    },
    {
      type: 'p',
      en: 'We are a private service provider licensed in the UAE under trade licence [TRADE LICENSE NO.]. We are not a government department, we are not affiliated with any government authority, and we cannot influence a decision that belongs to one. Government fees are set by the relevant authority and we charge them at cost, with the receipt. Where a matter needs a licensed advocate, a registered tax agent or a qualified accountant, we will say so and refer you rather than improvise.',
      ar: 'نحن مزوّد خدمة خاص مرخّص في الإمارات بموجب الرخصة التجارية [TRADE LICENSE NO.]. لسنا دائرة حكومية ولا تربطنا علاقة بأي جهة حكومية ولا يمكننا التأثير في قرار يعود إليها. والرسوم الحكومية تحددها الجهة المختصة ونحصّلها كما هي مع الإيصال. وحين تتطلب المسألة محامياً مرخّصاً أو وكيلاً ضريبياً مسجّلاً أو محاسباً مؤهلاً، نقول ذلك ونحيلك بدل الارتجال.',
    },
    {
      type: 'h2',
      en: 'Who we work with',
      ar: 'مع من نعمل',
    },
    {
      type: 'p',
      en: 'Our clients range from individuals renewing an Emirates ID to companies that outsource their entire PRO function to us. We work in Arabic and English throughout, and we process across the emirates — Dubai, Abu Dhabi, Sharjah and the Northern Emirates.',
      ar: 'يتنوع عملاؤنا بين أفراد يجددون هوية إماراتية وشركات تُسند إلينا وظيفة العلاقات العامة بالكامل. ونعمل بالعربية والإنجليزية في كل مرحلة وننجز المعاملات في مختلف الإمارات — دبي وأبوظبي والشارقة والإمارات الشمالية.',
    },
  ] as Block[],
};

export const privacy = {
  en: {
    metaTitle: 'Privacy Policy | Gulf Nejoom',
    description: 'How Gulf Nejoom collects, uses, stores and protects your personal data and documents.',
    h1: 'Privacy Policy',
    lead: 'This policy explains what personal data we collect, why we collect it and how we look after it.',
  },
  ar: {
    metaTitle: 'سياسة الخصوصية | الخليج نجوم',
    description: 'كيف تجمع الخليج نجوم بياناتك الشخصية ومستنداتك وتستخدمها وتخزّنها وتحميها.',
    h1: 'سياسة الخصوصية',
    lead: 'توضّح هذه السياسة البيانات الشخصية التي نجمعها وسبب جمعها وكيفية حمايتها.',
  },
  updated: '2026-10-01',
  body: [
    {
      type: 'h2',
      en: 'What we collect',
      ar: 'ما الذي نجمعه',
    },
    {
      type: 'ul',
      en: [
        'Contact details you give us: name, phone number, email address and the service you are enquiring about.',
        'Identity and supporting documents you send us so we can process a transaction, such as passport, Emirates ID, visa, certificates and company documents.',
        'Correspondence between us, including WhatsApp and email messages relating to your file.',
        'Basic website analytics, only where you have accepted analytics cookies.',
      ],
      ar: [
        'بيانات التواصل التي تزوّدنا بها: الاسم ورقم الهاتف والبريد الإلكتروني والخدمة موضوع الاستفسار.',
        'مستندات الهوية والمستندات المساندة التي ترسلها لإنجاز معاملتك، مثل جواز السفر والهوية الإماراتية والتأشيرة والشهادات ومستندات الشركة.',
        'المراسلات بيننا، بما فيها رسائل واتساب والبريد الإلكتروني المتعلقة بملفك.',
        'إحصاءات أساسية للموقع، فقط في حال قبولك لملفات التحليل.',
      ],
    },
    {
      type: 'h2',
      en: 'Why we collect it',
      ar: 'لماذا نجمعها',
    },
    {
      type: 'p',
      en: 'We use your data solely to respond to your enquiry and to prepare, submit and follow up the transaction you have instructed us to handle. We do not sell personal data, and we do not use your documents for any purpose other than the service you asked for.',
      ar: 'نستخدم بياناتك حصراً للرد على استفسارك ولإعداد المعاملة التي كلّفتنا بها وتقديمها ومتابعتها. ولا نبيع البيانات الشخصية ولا نستخدم مستنداتك لأي غرض سوى الخدمة التي طلبتها.',
    },
    {
      type: 'h2',
      en: 'Who we share it with',
      ar: 'مع من نشاركها',
    },
    {
      type: 'p',
      en: 'To complete a transaction we submit your information to the relevant UAE government authority, and where your service requires it, to certified translators, notaries, medical fitness centres, insurers or embassies. We share only what that step requires. We do not share your data with anyone else except where we are legally required to.',
      ar: 'لإنجاز المعاملة نقدّم معلوماتك إلى الجهة الحكومية المختصة في الدولة، وعند الاقتضاء إلى مترجمين معتمدين أو كتّاب عدل أو مراكز لياقة طبية أو شركات تأمين أو سفارات. ولا نشارك إلا ما تتطلبه تلك الخطوة. ولا نشارك بياناتك مع أي جهة أخرى إلا حين يلزمنا القانون بذلك.',
    },
    {
      type: 'h2',
      en: 'How long we keep it',
      ar: 'مدة الاحتفاظ بها',
    },
    {
      type: 'p',
      en: 'We keep records for as long as needed to provide the service and to meet our legal and accounting obligations, after which they are securely destroyed. Original documents are returned to you on completion. You may ask us to delete data we are not legally required to retain.',
      ar: 'نحتفظ بالسجلات للمدة اللازمة لتقديم الخدمة والوفاء بالتزاماتنا القانونية والمحاسبية، ثم تُتلف بشكل آمن. وتُعاد إليك المستندات الأصلية عند الإنجاز. ويمكنك أن تطلب حذف البيانات التي لا يلزمنا القانون بحفظها.',
    },
    {
      type: 'h2',
      en: 'Cookies',
      ar: 'ملفات تعريف الارتباط',
    },
    {
      type: 'p',
      en: 'This site uses essential cookies needed for it to function. Analytics cookies are set only if you accept them in the cookie banner, and you can decline without affecting your use of the site.',
      ar: 'يستخدم هذا الموقع ملفات أساسية لازمة لعمله. أما ملفات التحليل فلا تُفعَّل إلا بقبولك في شريط الملفات، ويمكنك الرفض دون أن يؤثر ذلك على استخدامك للموقع.',
    },
    {
      type: 'h2',
      en: 'Your rights and contact',
      ar: 'حقوقك والتواصل',
    },
    {
      type: 'p',
      en: 'You can ask us what data we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. Contact us at [EMAIL] or [PHONE], or write to us at [ADDRESS].',
      ar: 'يمكنك أن تسألنا عن البيانات التي نحتفظ بها عنك أو تطلب تصحيحها أو حذفها حين لا يلزمنا القانون بحفظها. تواصل معنا على [EMAIL] أو [PHONE] أو راسلنا على [ADDRESS].',
    },
  ] as Block[],
};

export const terms = {
  en: {
    metaTitle: 'Terms of Service | Gulf Nejoom',
    description: 'The terms on which Gulf Nejoom provides document clearance, typing and PRO services in the UAE.',
    h1: 'Terms of Service',
    lead: 'These terms apply when you instruct Gulf Nejoom to handle a transaction on your behalf.',
  },
  ar: {
    metaTitle: 'شروط الخدمة | الخليج نجوم',
    description: 'الشروط التي تقدّم بموجبها الخليج نجوم خدمات تخليص المستندات والطباعة والعلاقات العامة في الإمارات.',
    h1: 'شروط الخدمة',
    lead: 'تنطبق هذه الشروط عند تكليف الخليج نجوم بإنجاز معاملة نيابة عنك.',
  },
  updated: '2026-10-01',
  body: [
    {
      type: 'h2',
      en: 'Our role',
      ar: 'دورنا',
    },
    {
      type: 'p',
      en: 'Gulf Nejoom Documents Clearance Service L.L.C is a private company licensed in the UAE under trade licence [TRADE LICENSE NO.]. We prepare, submit and follow up applications through official channels on your instruction. We are not a government entity, we do not make decisions on applications, and we cannot influence the outcome of a decision that belongs to a government authority.',
      ar: 'الخليج نجوم لخدمات تخليص المستندات ذ.م.م شركة خاصة مرخّصة في الإمارات بموجب الرخصة التجارية [TRADE LICENSE NO.]. نُعدّ الطلبات ونقدّمها ونتابعها عبر القنوات الرسمية بناءً على تكليفك. ولسنا جهة حكومية ولا نتخذ قرارات بشأن الطلبات ولا يمكننا التأثير في نتيجة قرار يعود إلى جهة حكومية.',
    },
    {
      type: 'h2',
      en: 'Fees',
      ar: 'الرسوم',
    },
    {
      type: 'p',
      en: 'Government fees are set by the relevant authority and are charged to you at cost, with the receipt. Our service fee is quoted separately and agreed before work begins. Government fees are generally non-refundable once paid to the authority, including where an application is rejected.',
      ar: 'الرسوم الحكومية تحددها الجهة المختصة وتُحمَّل عليك كما هي مع الإيصال. ورسوم خدمتنا تُسعّر منفصلة ويُتفق عليها قبل بدء العمل. والرسوم الحكومية غير قابلة للاسترداد عادة بعد سدادها للجهة، بما في ذلك حالات رفض الطلب.',
    },
    {
      type: 'h2',
      en: 'Your responsibilities',
      ar: 'مسؤولياتك',
    },
    {
      type: 'ul',
      en: [
        'Provide accurate, complete and genuine documents and information.',
        'Confirm the details we read back to you before we submit an application.',
        'Attend in person for any step the authority requires in person, such as biometrics, notary signing or the medical test.',
        'Tell us promptly of any change affecting your file, such as a new passport, a change of sponsor or a change of address.',
      ],
      ar: [
        'تقديم مستندات ومعلومات دقيقة وكاملة وصحيحة.',
        'تأكيد البيانات التي نعيد قراءتها عليك قبل تقديم الطلب.',
        'الحضور شخصياً لأي خطوة تشترطها الجهة حضورياً مثل البصمة أو التوقيع لدى الكاتب العدل أو الفحص الطبي.',
        'إبلاغنا فوراً بأي تغيير يؤثر على ملفك مثل جواز سفر جديد أو تغيير الكفيل أو تغيير العنوان.',
      ],
    },
    {
      type: 'h2',
      en: 'Timelines and outcomes',
      ar: 'المدد والنتائج',
    },
    {
      type: 'p',
      en: 'Any timeline we give is an estimate based on current authority processing, and we will tell you promptly if it changes. We cannot guarantee that an application will be approved. Where an application is rejected we will obtain the reason and advise on next steps. Where a rejection was caused by an error on our part, we will correct and resubmit at our cost.',
      ar: 'أي مدة نذكرها هي تقدير مبني على المعالجة الحالية لدى الجهة، ونخبرك فوراً بأي تغيير. ولا يمكننا ضمان الموافقة على أي طلب. وعند الرفض نحصل على السبب ونقدّم المشورة بشأن الخطوات التالية. وإن كان الرفض بسبب خطأ من جانبنا صححناه وأعدنا التقديم على حسابنا.',
    },
    {
      type: 'h2',
      en: 'Documents in our care',
      ar: 'المستندات في عهدتنا',
    },
    {
      type: 'p',
      en: 'We take reasonable care of original documents entrusted to us and return them on completion. Documents are handled confidentially in line with our Privacy Policy. We are not responsible for loss or delay caused by a government authority, a courier, an embassy, or circumstances outside our reasonable control.',
      ar: 'نبذل العناية المعقولة بالمستندات الأصلية المودعة لدينا ونعيدها عند الإنجاز، وتُعامل بسرية وفق سياسة الخصوصية. ولسنا مسؤولين عن فقدان أو تأخير تسببه جهة حكومية أو شركة شحن أو سفارة أو ظروف خارجة عن سيطرتنا المعقولة.',
    },
    {
      type: 'h2',
      en: 'Scope of advice',
      ar: 'نطاق المشورة',
    },
    {
      type: 'p',
      en: 'Information we provide is general and procedural. It is not legal, tax, financial or insurance advice. Where your matter requires a licensed advocate, a registered tax agent, a qualified accountant or a licensed insurance intermediary, we will tell you and refer you.',
      ar: 'المعلومات التي نقدّمها عامة وإجرائية وليست مشورة قانونية أو ضريبية أو مالية أو تأمينية. وحين تتطلب مسألتك محامياً مرخّصاً أو وكيلاً ضريبياً مسجّلاً أو محاسباً مؤهلاً أو وسيط تأمين مرخّصاً، نخبرك ونحيلك إليه.',
    },
    {
      type: 'h2',
      en: 'Governing law',
      ar: 'القانون الواجب التطبيق',
    },
    {
      type: 'p',
      en: 'These terms are governed by the laws of the United Arab Emirates, and the courts of [EMIRATE] have jurisdiction over any dispute arising from them.',
      ar: 'تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة، وتختص محاكم [EMIRATE] بأي نزاع ينشأ عنها.',
    },
  ] as Block[],
};
