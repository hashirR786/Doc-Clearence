import type { Service } from './types';

export const vatRegistration: Service = {
  slug: 'vat-registration',
  category: 'tax',
  icon: 'receipt',
  related: ['corporate-tax-registration', 'business-consultation', 'pro-services'],
  keywords: [
    'VAT registration UAE',
    'VAT registration Dubai',
    'FTA VAT certificate',
    'VAT deregistration UAE',
    'TRN registration UAE',
  ],
  en: {
    name: 'VAT Registration',
    h1: 'VAT Registration Services in the UAE',
    title: 'VAT Registration UAE | Gulf Nejoom',
    description:
      'VAT registration, deregistration and amendments with the Federal Tax Authority, including TRN issuance support.',
    summary: 'FTA VAT registration, TRN issuance, group registration, amendments and deregistration.',
    intro:
      'VAT registration in the UAE is handled through the Federal Tax Authority portal, and the application asks for financial detail most businesses have not assembled before. Gulf Nejoom prepares the submission, supports it with the right documents, and follows it through to your Tax Registration Number.',
    sections: [
      {
        h2: 'Who has to register',
        p: [
          'A business must register for VAT once its taxable supplies and imports exceed the mandatory registration threshold over the preceding twelve months, or where they are expected to exceed it in the next thirty days. A voluntary registration threshold sits below that, allowing smaller businesses and startups to register by choice — often worth doing where you incur recoverable input VAT before revenue begins.',
          'Thresholds and rules are set by the Federal Tax Authority and are subject to change. We check your figures against the current position before advising, and we will tell you if registration is not yet required.',
        ],
      },
      {
        h2: 'What the application needs',
        p: [
          'The portal asks for your trade licence details, ownership and signatory information, bank account particulars, business activities, customs registration if you import, and a declaration of turnover supported by evidence — typically invoices, contracts or audited statements covering the relevant period.',
          'The most common cause of rejection or delay is a turnover declaration that the supporting documents do not substantiate. We assemble the evidence before submitting rather than scrambling for it after the Authority raises a query.',
        ],
        list: [
          'New VAT registration and TRN issuance',
          'Voluntary registration for startups and smaller businesses',
          'Tax group registration for related entities',
          'Amendments to registered details',
          'Deregistration where the business ceases or falls below the threshold',
        ],
      },
      {
        h2: 'After registration',
        p: [
          'Registration is the beginning of an obligation, not the end of a task. Once you hold a TRN you must issue compliant tax invoices, keep records for the prescribed period, and file returns by the deadline in each tax period. Late filing and late payment both carry administrative penalties, and they accumulate.',
          'We will set out your filing calendar at handover and explain in plain terms what a compliant tax invoice must show. Where you need ongoing return filing or bookkeeping, we will tell you honestly whether that is a job for us or for a registered tax agent.',
        ],
      },
      {
        h2: 'Deregistration',
        p: [
          'Businesses that stop making taxable supplies, or fall below the voluntary threshold, must apply to deregister within the prescribed window. Missing that window is itself penalised. If you are closing or restructuring, raise it with us early so the deregistration is filed in time.',
        ],
      },
    ],
    documents: [
      'Valid trade licence for every entity being registered',
      'Memorandum of association and any amendments',
      'Passport and Emirates ID copies of owners, partners and the authorised signatory',
      'Proof of authorisation for the signatory',
      'Company bank account details and an IBAN letter from the bank',
      'Turnover evidence for the relevant period — invoices, contracts or audited statements',
      'Customs registration details, where the business imports or exports',
      'Contact details, registered address and Ejari or tenancy contract',
    ],
    steps: [
      { title: 'Eligibility review', body: 'We assess your turnover against the current thresholds and confirm whether registration is mandatory, voluntary or not yet needed.' },
      { title: 'Document assembly', body: 'We prepare the full supporting pack, including the turnover evidence the Authority expects to see.' },
      { title: 'Portal submission', body: 'The application is completed and submitted, and we respond directly to any clarification the Authority raises.' },
      { title: 'TRN and handover', body: 'On approval you receive your TRN and certificate, plus a plain-English note of your filing obligations and deadlines.' },
    ],
    faqs: [
      {
        q: 'When must my business register for VAT?',
        a: 'Once taxable supplies and imports exceed the mandatory threshold over the previous twelve months, or are expected to exceed it within the next thirty days. Voluntary registration is available below that level. We check your figures against the current thresholds.',
      },
      {
        q: 'How long does VAT registration take?',
        a: 'A complete application with proper turnover evidence is typically processed within a few weeks. Incomplete evidence is the usual cause of delay.',
      },
      {
        q: 'What is a TRN?',
        a: 'The Tax Registration Number issued by the Federal Tax Authority on successful registration. It must appear on your tax invoices.',
      },
      {
        q: 'Can related companies register as a group?',
        a: 'Yes, where they meet the control and establishment conditions. Group registration can simplify compliance considerably — we will assess whether your structure qualifies.',
      },
      {
        q: 'Are you a registered tax agent?',
        a: 'We are a document clearance and business services company and we prepare and submit registration applications. Where your situation needs formal tax agency representation or tax advice, we will say so and refer you to a registered tax agent.',
      },
    ],
    turnaround: 'Typically a few weeks from complete submission, subject to Authority review',
    whoFor: 'Businesses at or approaching the threshold, startups, and groups restructuring',
  },
  ar: {
    name: 'التسجيل في ضريبة القيمة المضافة',
    h1: 'خدمات التسجيل في ضريبة القيمة المضافة في الإمارات',
    title: 'تسجيل ضريبة القيمة المضافة | الخليج نجوم',
    description:
      'التسجيل في ضريبة القيمة المضافة وإلغاؤه وتعديله لدى الهيئة الاتحادية للضرائب مع دعم إصدار رقم التسجيل الضريبي.',
    summary: 'التسجيل لدى الهيئة الاتحادية للضرائب وإصدار الرقم الضريبي والتسجيل الجماعي والتعديل والإلغاء.',
    intro:
      'يتم التسجيل في ضريبة القيمة المضافة عبر منصة الهيئة الاتحادية للضرائب، ويطلب الطلب تفاصيل مالية لم تجمعها معظم الشركات من قبل. يُعدّ الخليج نجوم المعاملة ويدعمها بالمستندات الصحيحة ويتابعها حتى صدور رقم التسجيل الضريبي.',
    sections: [
      {
        h2: 'من يجب عليه التسجيل',
        p: [
          'يجب على المنشأة التسجيل متى تجاوزت توريداتها ووارداتها الخاضعة للضريبة حدّ التسجيل الإلزامي خلال الاثني عشر شهراً السابقة، أو متى توقّعت تجاوزه خلال الثلاثين يوماً القادمة. وهناك حدّ تسجيل اختياري أدنى منه يتيح للشركات الصغيرة والناشئة التسجيل طوعاً، وغالباً ما يكون مجدياً حين تتحمل ضريبة مدخلات قابلة للاسترداد قبل بدء الإيرادات.',
          'الحدود والقواعد تحددها الهيئة الاتحادية للضرائب وقابلة للتغيير. نطابق أرقامك مع الوضع الحالي قبل تقديم المشورة، ونخبرك إن كان التسجيل غير مطلوب بعد.',
        ],
      },
      {
        h2: 'ما يتطلبه الطلب',
        p: [
          'تطلب المنصة بيانات رخصتك التجارية ومعلومات الملكية والتفويض وتفاصيل الحساب البنكي والأنشطة التجارية والتسجيل الجمركي إن كنت تستورد، وإقراراً بحجم الإيرادات مدعوماً بأدلة، عادة فواتير أو عقود أو بيانات مالية مدققة تغطي الفترة المعنية.',
          'وأكثر أسباب الرفض أو التأخير شيوعاً هو إقرار إيرادات لا تدعمه المستندات المرفقة. لذلك نجمع الأدلة قبل التقديم بدل البحث عنها بعد استفسار الهيئة.',
        ],
        list: [
          'تسجيل جديد وإصدار الرقم الضريبي',
          'التسجيل الاختياري للشركات الناشئة والصغيرة',
          'التسجيل الضريبي الجماعي للكيانات المرتبطة',
          'تعديل البيانات المسجّلة',
          'إلغاء التسجيل عند توقف النشاط أو النزول دون الحد',
        ],
      },
      {
        h2: 'ما بعد التسجيل',
        p: [
          'التسجيل بداية التزام لا نهاية مهمة. فبمجرد حصولك على الرقم الضريبي عليك إصدار فواتير ضريبية مطابقة وحفظ السجلات للمدة المقررة وتقديم الإقرارات في موعدها لكل فترة ضريبية. والتأخر في التقديم أو السداد يحمل غرامات إدارية تتراكم.',
          'نوضّح لك تقويم الإقرارات عند التسليم ونشرح بلغة مبسّطة ما يجب أن تتضمنه الفاتورة الضريبية. وإن احتجت تقديم إقرارات أو مسك دفاتر بشكل مستمر نخبرك بصراحة إن كان ذلك من اختصاصنا أم يحتاج وكيلاً ضريبياً مسجّلاً.',
        ],
      },
      {
        h2: 'إلغاء التسجيل',
        p: [
          'على المنشآت التي تتوقف عن تقديم توريدات خاضعة للضريبة أو تنزل دون الحد الاختياري التقدم بطلب إلغاء خلال المهلة المقررة، وتفويت هذه المهلة يُعاقَب عليه بذاته. فإن كنت تغلق نشاطك أو تعيد هيكلته فأخبرنا مبكراً ليُقدَّم الإلغاء في وقته.',
        ],
      },
    ],
    documents: [
      'رخصة تجارية سارية لكل كيان يُراد تسجيله',
      'عقد التأسيس وأي تعديلات عليه',
      'نسخ جوازات وهويات الملاك والشركاء والمفوّض بالتوقيع',
      'ما يثبت صلاحية المفوّض بالتوقيع',
      'بيانات الحساب البنكي للشركة وخطاب الآيبان من البنك',
      'أدلة الإيرادات للفترة المعنية من فواتير أو عقود أو بيانات مدققة',
      'بيانات التسجيل الجمركي للمنشآت المستوردة أو المصدّرة',
      'بيانات التواصل والعنوان المسجّل وعقد إيجاري',
    ],
    steps: [
      { title: 'مراجعة الاستحقاق', body: 'نقيّم إيراداتك مقابل الحدود الحالية ونؤكد إن كان التسجيل إلزامياً أم اختيارياً أم غير مطلوب بعد.' },
      { title: 'تجهيز المستندات', body: 'نُعدّ الملف المساند كاملاً بما في ذلك أدلة الإيرادات التي تتوقع الهيئة رؤيتها.' },
      { title: 'التقديم عبر المنصة', body: 'يُستكمل الطلب ويُقدَّم، ونردّ مباشرة على أي استيضاح تطلبه الهيئة.' },
      { title: 'الرقم الضريبي والتسليم', body: 'عند الاعتماد تستلم رقمك الضريبي وشهادتك مع ملخص مبسّط لالتزاماتك ومواعيدها.' },
    ],
    faqs: [
      { q: 'متى يجب أن تسجّل منشأتي؟', a: 'متى تجاوزت التوريدات والواردات الخاضعة للضريبة الحد الإلزامي خلال الاثني عشر شهراً السابقة أو تُوقّع تجاوزه خلال ثلاثين يوماً. والتسجيل الاختياري متاح دون ذلك. ونطابق أرقامك مع الحدود الحالية.' },
      { q: 'كم يستغرق التسجيل؟', a: 'الطلب المكتمل بأدلة إيرادات سليمة يُعالج عادة خلال أسابيع قليلة، والنقص في الأدلة هو السبب المعتاد للتأخير.' },
      { q: 'ما هو الرقم الضريبي؟', a: 'هو رقم التسجيل الضريبي الذي تصدره الهيئة الاتحادية للضرائب عند نجاح التسجيل، ويجب أن يظهر على فواتيرك الضريبية.' },
      { q: 'هل يمكن للشركات المرتبطة التسجيل كمجموعة؟', a: 'نعم متى استوفت شروط السيطرة والتأسيس، والتسجيل الجماعي يبسّط الالتزام كثيراً. ونقيّم إن كان هيكلك مؤهلاً.' },
      { q: 'هل أنتم وكيل ضريبي مسجّل؟', a: 'نحن شركة تخليص مستندات وخدمات أعمال نُعدّ طلبات التسجيل ونقدّمها. وإن استدعت حالتك تمثيلاً رسمياً أو استشارة ضريبية نخبرك بذلك ونحيلك إلى وكيل ضريبي مسجّل.' },
    ],
    turnaround: 'عادة أسابيع قليلة من اكتمال التقديم، حسب مراجعة الهيئة',
    whoFor: 'المنشآت التي بلغت الحد أو تقترب منه والشركات الناشئة والمجموعات التي تعيد الهيكلة',
  },
};

export const corporateTax: Service = {
  slug: 'corporate-tax-registration',
  category: 'tax',
  icon: 'calculator',
  related: ['vat-registration', 'business-consultation', 'pro-services'],
  keywords: [
    'corporate tax registration UAE',
    'corporate tax Dubai',
    'FTA corporate tax registration',
    'UAE corporate tax deadline',
    'business tax registration UAE',
  ],
  en: {
    name: 'Corporate Tax Registration',
    h1: 'Corporate Tax Registration in the UAE',
    title: 'Corporate Tax Registration UAE | Gulf Nejoom',
    description:
      'Corporate tax registration with the Federal Tax Authority for mainland and free zone companies, with deadline guidance.',
    summary: 'FTA corporate tax registration for mainland, free zone and branch entities, with deadline guidance.',
    intro:
      'Corporate tax applies to businesses across the UAE, and registration with the Federal Tax Authority is a legal obligation with a deadline attached — one that is enforced with administrative penalties. Gulf Nejoom handles the registration so your entity is on record before the deadline passes.',
    sections: [
      {
        h2: 'Who needs to register',
        p: [
          'Registration is required of juridical persons incorporated in the UAE, including mainland companies, free zone entities and branches of foreign companies with a UAE presence, as well as natural persons conducting business above the relevant threshold. Free zone entities are not exempt from registering simply because they may qualify for a preferential rate on qualifying income — the registration obligation still applies.',
          'Deadlines are tied to your licence issuance date and entity type, and they have already passed for many categories. If you are unsure whether yours has, send us your licence and we will tell you where you stand.',
        ],
      },
      {
        h2: 'What registration involves',
        p: [
          'The application is submitted through the Federal Tax Authority portal and requires licence details, ownership and management information, the authorised signatory and their proof of authority, contact and address details, and your financial year.',
          'Choosing or confirming the financial year matters more than it looks, because it determines your first tax period and therefore your first return deadline. We confirm it against your licence and accounting records rather than accepting the default.',
        ],
        list: [
          'Registration for mainland companies and branches',
          'Registration for free zone entities',
          'Registration for natural persons conducting business',
          'Tax group formation where the structure qualifies',
          'Amendments to registered details',
        ],
      },
      {
        h2: 'Penalties for late registration',
        p: [
          'The Federal Tax Authority applies an administrative penalty for failing to register by the applicable deadline. It is a fixed amount, it is applied per entity, and it is avoidable. Where a deadline has already passed, registering now limits further exposure — we will register the entity and set out the position plainly rather than leaving it unaddressed.',
        ],
      },
      {
        h2: 'What comes after registration',
        p: [
          'Once registered you must maintain accounting records, determine taxable income in accordance with the law, and file a corporate tax return within the prescribed period after each tax period ends. Returns and tax computation are specialist accounting work.',
          'We are clear about the boundary: we handle registration and the documentation around it. For tax computation, return filing and planning you need a qualified accountant or a registered tax agent, and we will refer you to one rather than improvise.',
        ],
      },
    ],
    documents: [
      'Valid trade licence for every entity to be registered',
      'Memorandum of association, articles and any amendments',
      'Passport and Emirates ID copies of owners, partners and directors',
      'Authorised signatory documents and proof of authority',
      'Registered address, contact details and Ejari or tenancy contract',
      'Financial year end and accounting period details',
      'Existing TRN, where the entity is already VAT registered',
      'Group structure details, where a tax group is contemplated',
    ],
    steps: [
      { title: 'Entity review', body: 'We identify which entities must register, confirm the applicable deadline and flag anything already overdue.' },
      { title: 'Preparation', body: 'We assemble the licence, ownership and signatory documents and confirm your financial year.' },
      { title: 'Submission', body: 'The application is filed through the Authority portal and we respond to any clarification requested.' },
      { title: 'Confirmation', body: 'You receive your corporate tax registration confirmation and a note of your first return deadline.' },
    ],
    faqs: [
      {
        q: 'Does my free zone company need to register for corporate tax?',
        a: 'Yes. Free zone entities must register even where they may qualify for a preferential rate on qualifying income. Registration and rate treatment are separate questions.',
      },
      {
        q: 'What is the deadline for registering?',
        a: 'Deadlines depend on your entity type and licence issuance date, and many have already passed. Send us your trade licence and we will confirm your specific position.',
      },
      {
        q: 'What is the penalty for late registration?',
        a: 'The Federal Tax Authority applies a fixed administrative penalty per entity for failing to register on time. Registering promptly limits further exposure.',
      },
      {
        q: 'Do I need to register if my company made no profit?',
        a: 'Registration is a separate obligation from paying tax. An entity within scope must register regardless of whether it has taxable profit in a given period.',
      },
      {
        q: 'Can you file my corporate tax return as well?',
        a: 'Return filing and tax computation are accounting work requiring a qualified accountant or registered tax agent. We handle registration and documentation, and will refer you for the rest.',
      },
    ],
    turnaround: 'Registration typically processed within a few weeks of complete submission',
    whoFor: 'Mainland companies, free zone entities, branches and business owners within scope',
  },
  ar: {
    name: 'تسجيل ضريبة الشركات',
    h1: 'تسجيل ضريبة الشركات في الإمارات',
    title: 'تسجيل ضريبة الشركات | الخليج نجوم',
    description:
      'تسجيل ضريبة الشركات لدى الهيئة الاتحادية للضرائب لشركات البر الرئيسي والمناطق الحرة مع إرشاد بالمواعيد.',
    summary: 'تسجيل ضريبة الشركات لكيانات البر الرئيسي والمناطق الحرة والفروع مع إرشاد بالمواعيد.',
    intro:
      'تسري ضريبة الشركات على المنشآت في مختلف أنحاء الإمارات، والتسجيل لدى الهيئة الاتحادية للضرائب التزام قانوني بموعد محدد تُفرض على تجاوزه غرامات إدارية. يتولى الخليج نجوم التسجيل ليكون كيانك مسجّلاً قبل فوات الموعد.',
    sections: [
      {
        h2: 'من يجب عليه التسجيل',
        p: [
          'التسجيل مطلوب من الأشخاص الاعتباريين المؤسسين في الدولة، بما في ذلك شركات البر الرئيسي وكيانات المناطق الحرة وفروع الشركات الأجنبية العاملة في الدولة، وكذلك الأشخاص الطبيعيين الذين يمارسون نشاطاً تجارياً يتجاوز الحد المعني. وكيانات المناطق الحرة ليست معفاة من التسجيل لمجرد احتمال استحقاقها معاملة تفضيلية على الدخل المؤهل، فالتزام التسجيل قائم.',
          'والمواعيد مرتبطة بتاريخ إصدار رخصتك ونوع كيانك، وقد انقضت بالفعل لكثير من الفئات. فإن لم تكن متأكداً، أرسل رخصتك ونوضّح لك موقفك.',
        ],
      },
      {
        h2: 'ماذا يتضمن التسجيل',
        p: [
          'يُقدَّم الطلب عبر منصة الهيئة الاتحادية للضرائب ويتطلب بيانات الرخصة ومعلومات الملكية والإدارة والمفوّض بالتوقيع وما يثبت صلاحيته وبيانات التواصل والعنوان والسنة المالية.',
          'واختيار السنة المالية أو تأكيدها أهم مما يبدو، لأنه يحدد فترتك الضريبية الأولى وبالتالي موعد أول إقرار لك. لذلك نؤكدها من رخصتك وسجلاتك المحاسبية بدل قبول الخيار الافتراضي.',
        ],
        list: [
          'تسجيل شركات البر الرئيسي والفروع',
          'تسجيل كيانات المناطق الحرة',
          'تسجيل الأشخاص الطبيعيين الممارسين للنشاط التجاري',
          'تكوين المجموعة الضريبية عند استيفاء الشروط',
          'تعديل البيانات المسجّلة',
        ],
      },
      {
        h2: 'غرامات التأخر في التسجيل',
        p: [
          'تفرض الهيئة الاتحادية للضرائب غرامة إدارية على التخلف عن التسجيل في الموعد المقرر، وهي مبلغ ثابت يُطبّق على كل كيان ويمكن تفاديه. وإن كان موعدك قد انقضى فالتسجيل الآن يحدّ من المخاطرة الإضافية — نسجّل الكيان ونوضّح لك الموقف بصراحة بدل تركه معلّقاً.',
        ],
      },
      {
        h2: 'ما بعد التسجيل',
        p: [
          'بعد التسجيل عليك مسك سجلات محاسبية وتحديد الدخل الخاضع للضريبة وفق القانون وتقديم إقرار ضريبة الشركات خلال المدة المقررة بعد نهاية كل فترة ضريبية. وإعداد الإقرارات واحتساب الضريبة عمل محاسبي متخصص.',
          'ونحن واضحون بشأن الحدود: نتولى التسجيل والمستندات المحيطة به. أما الاحتساب وتقديم الإقرارات والتخطيط فتحتاج فيها محاسباً مؤهلاً أو وكيلاً ضريبياً مسجّلاً، ونحيلك إليه بدل الارتجال.',
        ],
      },
    ],
    documents: [
      'رخصة تجارية سارية لكل كيان يُراد تسجيله',
      'عقد التأسيس والنظام الأساسي وأي تعديلات',
      'نسخ جوازات وهويات الملاك والشركاء وأعضاء مجلس الإدارة',
      'مستندات المفوّض بالتوقيع وما يثبت صلاحيته',
      'العنوان المسجّل وبيانات التواصل وعقد إيجاري',
      'نهاية السنة المالية وبيانات الفترة المحاسبية',
      'الرقم الضريبي الحالي إن كان الكيان مسجّلاً في ضريبة القيمة المضافة',
      'بيانات هيكل المجموعة عند التفكير في مجموعة ضريبية',
    ],
    steps: [
      { title: 'مراجعة الكيانات', body: 'نحدد الكيانات الملزمة بالتسجيل ونؤكد الموعد المنطبق ونبيّن ما هو متأخر فعلاً.' },
      { title: 'الإعداد', body: 'نجمع مستندات الرخصة والملكية والتفويض ونؤكد سنتك المالية.' },
      { title: 'التقديم', body: 'يُقدَّم الطلب عبر منصة الهيئة ونردّ على أي استيضاح مطلوب.' },
      { title: 'التأكيد', body: 'تستلم تأكيد تسجيلك في ضريبة الشركات مع بيان موعد أول إقرار.' },
    ],
    faqs: [
      { q: 'هل يجب على شركتي في المنطقة الحرة التسجيل؟', a: 'نعم. كيانات المناطق الحرة ملزمة بالتسجيل حتى مع احتمال استحقاقها معاملة تفضيلية على الدخل المؤهل، فالتسجيل والمعاملة الضريبية مسألتان منفصلتان.' },
      { q: 'ما موعد التسجيل؟', a: 'تعتمد المواعيد على نوع الكيان وتاريخ إصدار الرخصة وقد انقضى كثير منها. أرسل رخصتك التجارية ونؤكد موقفك تحديداً.' },
      { q: 'ما غرامة التأخر في التسجيل؟', a: 'تفرض الهيئة غرامة إدارية ثابتة لكل كيان على التخلف عن التسجيل في موعده، والتسجيل السريع يحدّ من المخاطرة الإضافية.' },
      { q: 'هل أسجّل إن لم تحقق شركتي أرباحاً؟', a: 'التسجيل التزام منفصل عن سداد الضريبة، والكيان المشمول بالنطاق يجب أن يسجّل بغض النظر عن تحقيقه ربحاً خاضعاً في فترة معينة.' },
      { q: 'هل تقدّمون إقرار ضريبة الشركات أيضاً؟', a: 'تقديم الإقرارات واحتساب الضريبة عمل محاسبي يتطلب محاسباً مؤهلاً أو وكيلاً ضريبياً مسجّلاً. نحن نتولى التسجيل والمستندات ونحيلك لما سواها.' },
    ],
    turnaround: 'يُعالج التسجيل عادة خلال أسابيع قليلة من اكتمال التقديم',
    whoFor: 'شركات البر الرئيسي وكيانات المناطق الحرة والفروع وأصحاب الأعمال المشمولين',
  },
};
