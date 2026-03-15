document.addEventListener('DOMContentLoaded', () => {
    // NAVIGATION
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    // Valid sections for URL routing (about is the default, no path segment)
    const validSections = ['rules', 'roles', 'strategies', 'faq'];

    // Get current section from URL hash
    function getSectionFromUrl() {
        const hash = window.location.hash.replace('#', '');
        return validSections.includes(hash) ? hash : 'about';
    }

    // Update URL hash to reflect current section
    function updateUrl(sectionId) {
        const newHash = sectionId === 'about' ? '' : `#${sectionId}`;
        if (window.location.hash !== newHash) {
            history.pushState({ section: sectionId }, '', window.location.pathname + newHash);
        }
    }

    // Show a specific section
    function showSection(targetId, updateHistory = true) {
        const allSections = ['about', ...validSections];
        if (!allSections.includes(targetId)) return;

        // Update active states on nav buttons
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            }
        });

        // Switch sections
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // Update URL if needed
        if (updateHistory) {
            updateUrl(targetId);
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle nav button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            showSection(targetId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        const sectionId = e.state?.section || getSectionFromUrl();
        showSection(sectionId, false);
    });

    // Initialize: show section from URL or default to 'about'
    const initialSection = getSectionFromUrl();
    showSection(initialSection, false);

    // ROLES DATA (ARABIC TRANSLATION)
    const rolesData = {
        // Good Roles
        seer: {
            name: 'العرّاف',
            team: 'good',
            image: 'https://platoapp.com/images/a8e44450-4363-11ef-bfb7-a598d323cbfc-card_seer.webp',
            ability: 'كل ليلة، يمكن للعرّاف فحص لاعب لمعرفة الفريق الذي ينتمي إليه. أدوار مثل الذئب الألفا، المُغيّر، المهرج، والرجل الذئب تؤثر جزئياً أو كلياً على صحة المعلومات التي يوفرها هذا الدور.',
            tips: [
                'اقرأ كل ما قيل بعناية لتعرف من تفحص.',
                'لا تكشف المعلومات بدون داعٍ. تأكد من عدم وجود أدوار مثل شامان الذئب قبل كشف المعلومات.',
                'في حال وجود حشاش، زوّده بمعلوماتك في أسرع وقت ممكن.',
                'كن واثقاً واجعل صوتك مسموعاً.'
            ],
            advanced: 'يمكن للعرّاف القيام بألاعاب محفوفة بالمخاطر مثل الادعاء الكاذب/الاتهام الزائف للضغط على لاعب. إذا كشفوا عن أنفسهم فوراً عند الاتهام، فمن المهم التراجع وإعطاء المعلومات الحقيقية؛ وإلا، فقد يُعتبر العرّاف ذئباً.'
        },
        doctor: {
            name: 'الطبيب',
            team: 'good',
            image: 'https://platoapp.com/images/a897f910-4363-11ef-bfb7-a598d323cbfc-card_doctor.webp',
            ability: 'كل ليلة، يمكن للطبيب حماية لاعب أو نفسه، مما يمنعهم من الموت إذا هاجمتهم الذئاب. قد لا يكون هذا هو الحال دائماً إذا كان هناك مصاص دماء؛ فإنهم يلغون الطبيب مرة واحدة في اللعبة إذا قُتل الشخص الذي أنقذه الطبيب بالذئاب.',
            tips: [
                'اكتب حركتك مسبقاً (على سبيل المثال، "أنا الطبيب، أنقذ اللاعب X") وأرسلها في نهاية الليل. تأكد من أنك تنقذ ذلك اللاعب فعلاً؛ وإلا ستكشف عن نفسك بلا سبب وقد تكون الهدف التالي.',
                'قرر من تحمي بناءً على المعلومات المتاحة؛ احمِ نفسك في الليالي المتقدمة.',
                'كن حذراً عندما تكون هناك أدوار تلغي أو تتداخل مع قدرتك (كابوس، صفارة، مصاص دماء).',
                'كلما كانت هناك ساحرة، يجب عليك إنقاذ نفسك إذا لم يكن هناك دور أهم لإنقاذه.'
            ],
            advanced: 'تنسيق مع القرويين الآخرين لحماية الأدوار المفتاحية في لحظات حاسمة واستخدام حماية الذات بشكل استراتيجي للبقاء حتى النهاية. يمكنك أيضاً ابتكار طرق لإرباك الذئاب وجعلهم يعتقدون أنك لست الطبيب.'
        },
        knight: {
            name: 'الفارس',
            team: 'good',
            image: 'https://platoapp.com/images/a8aa2180-4363-11ef-bfb7-a598d323cbfc-card_knight.webp',
            ability: 'يمتلك درعاً ينقذه مرة واحدة في اللعبة من هجوم ذئب. لا يمكن حمايته من قبل الطبيب طالما لديه درعه.',
            tips: [
                'الفارس ينتمي إلى العائلة المالكة؛ طالما هو على قيد الحياة، لا يمكن قتل الملك بالذئاب.',
                'تصرف كطُعم لجذب هجمات الذئاب الجاهلين وحماية القرويين الآخرين.',
                'تذكر أن درعك يتنشط تلقائياً ولا يجمع مع حماية الطبيب.'
            ],
            advanced: 'خدع الذئاب بالتلميح إلى أنك دور قيّم أو ضعيف حتى يضيعوا هجماتهم، لكن خطّط لطُعمك بحيث لا يؤثّر على العائلة المالكة. اطعم بأدوار ليست في اللعبة أو تم كشفها بالفعل. إذا لزم الأمر، وضّح بعد ذلك أنك فعلت ذلك لأنك الفارس.'
        },
        princess: {
            name: 'الأميرة',
            team: 'good',
            image: 'https://platoapp.com/images/a8d61380-4363-11ef-bfb7-a598d323cbfc-card_princess.webp',
            ability: 'تنجو من الإعدام خلال النهار؛ عندما تتنشط القدرة، تُكشف بطاقتها لجميع اللاعبين.',
            tips: [
                'الأميرة تنتمي إلى العائلة المالكة؛ طالما هي على قيد الحياة، لا يمكن قتل الملك بالذئاب.',
                'عند التصويت لك، ادّعِ دوراً قوياً ليس في اللعب لاستفزاز ذئب جاهل ليدّعيه.',
                'استفدي من حصانتك ضد الإعدام للحصول على معلومات عمّن يصوتون لك.',
                'احرصي على عدم الطُعم بدون سبب ليلاً لحماية الملك.',
                'لا تدعي نفسك تُختار دون سبب؛ إذا كان بإمكانك تجنّب المحاكمة، افعلي. إعدام الأميرة يُعتبر إهداراً ليوم.'
            ],
            advanced: 'عندما تُحاكم، صرّح بدور ليس في اللعبة؛ هذه الحيلة يمكن أن تدفع ذئباً متوتراً أو جاهلاً ليدّعيه وبالتالي يفضح نفسه.'
        },
        hunter: {
            name: 'الصياد',
            team: 'good',
            image: 'https://platoapp.com/images/a8a5dbc0-4363-11ef-bfb7-a598d323cbfc-card_hunter.webp',
            ability: 'عند الموت في الليل، لديه 75% فرصة لأخذ ذئب عشوائي معه.',
            tips: [
                'تصرف كطُعم بالإعلان عن سحر أو كشوفات لإثارة الذئاب لمهاجمتك.',
                'اطلب من اللاعبين قطع الاتصال ل"كشفهم" وبالتالي خداع الذئاب.',
                'ابقَ نشطاً وتواصلياً لتحقيق أقصى تأثير لدورك المزيف على الذئاب.',
                'الطُعم ليلاً يخدم كذريعة عند الدفاع عن دورك. اشرح أنك كنت تطعم لترى إذا كانوا سيقتلونك لأنك الصياد. (الأشرار قد يستخدمون هذه الحجة أيضاً)'
            ],
            advanced: 'تظاهر بدور آخر ينبه الذئاب لجذب الهجمات، لكن كن مستعداً للتراجع إذا أصبح ذلك مضاداً للنتائج.'
        },
        necromancer: {
            name: 'النصرواني',
            team: 'good',
            image: 'https://platoapp.com/images/a8da0b20-4363-11ef-bfb7-a598d323cbfc-card_necromancer.webp',
            ability: 'يمكنه إحياء قروي ميت مرة واحدة في اللعبة خلال الليل.',
            tips: [
                'اكتب فعلك مسبقاً وأرسله قبل انتهاء الليل مباشرة حتى يكون واضحاً أنه حقاً أنت.',
                'استخدم قدرتك في أقرب وقت ممكن؛ لا تنتظر موت دور أكثر قيمة.',
                'تنسيق مع فريقك لإحياء اللاعب الذي تقدم قدرته أكبر ميزة.'
            ],
            advanced: 'في النزاعات حيث يوجد ذئب يدّعي أنه النصرواني، إذا سمحت الظروف، اقترح إحياء لاعبين مختلفين؛ من يفي بالوعد سيكون هو الحقيقي.'
        },
        king: {
            name: 'الملك',
            team: 'good',
            image: 'https://platoapp.com/images/a8e359f0-4363-11ef-bfb7-a598d323cbfc-card_king.webp',
            ability: 'طالما الفارس، الأميرة، أو المهرج على قيد الحياة، لا يمكن قتل الملك بالذئاب في الليل. إذا أُعدم، لن يتمكن القرويون من استخدام قدراتهم الليلة التالية.',
            tips: [
                'استخدم حصانتك للتصرف كطُعم في الليالي الأولى، صرفاً هجمات الذئاب.',
                'لا تكشف دورك إلا إذا لزم الأمر؛ حصانتك تُفقد إذا مات أعضاء العائلة المالكة.',
                'تجنب الإعدام بأي ثمن، حيث أن موتك يترك فريقك بلا قوى لليلة.'
            ],
            advanced: 'تظاهر بدور ينبه الذئاب لجذب انتباههم وحاول أن تُقتل، وبالتالي حماية أدوار أكثر أهمية. وضّح ما فعلته فوراً إذا اتهمك أحدهم.'
        },
        jester: {
            name: 'المهرج',
            team: 'good',
            image: 'https://platoapp.com/images/a8bd5b60-4363-11ef-bfb7-a598d323cbfc-card_jester.webp',
            ability: 'يفوز فقط إذا قُتل، إما خلال النهار أو الليل. يمكن أن يظهر بشكل عشوائي كطيب أو سيئ للعرّاف.',
            tips: [
                'لا تهدر أو "تحرق" أدوار الآخرين؛ على الرغم من أن شرط فوزك مختلف، فأنت لا تزال قروياً.',
                'تخدع لتُقتل بالذئاب، على سبيل المثال بتزييف دور غير موجود.',
                'استفد من الارتباك لاستخراج المعلومات من ردود فعل الآخرين. إذا شئت، يمكنك مساعدة فريق آخر على الفوز.',
                'العب دائماً دون إيذاء أو إفساد تجربة اللعب للآخرين.'
            ],
            advanced: 'إذا صوتوا لك في اليوم الأول، يمكنك الكشف عن نفسك كمهرج أو ذكر دور غائب من اللعبة للتضحية بحياتك ومحاولة مساعدة فريق الخير.',
            warning: 'لا تكشف الدور الحقيقي للاعب آخر فقط لتفوز — هذا يجبر بريئاً على الدفاع عن نفسه دون داعٍ ويمكن أن يدمّر تجربته. إذا أردت ادّعاء شيء، اختر دائماً دوراً غائباً عن اللعبة.'
        },
        lycan: {
            name: 'الرجل الذئب',
            team: 'good',
            image: 'https://platoapp.com/images/a8e073c0-4363-11ef-bfb7-a598d323cbfc-card_lycan.webp',
            ability: 'قروي ملعون إذا قُتل في الليل بالذئاب، يتحول إلى ذئب. يراه العرّاف كقروي قبل تحوله، وهذه المعلومة لا تتغير.',
            tips: [
                'قيّم مع أي فريق تريد اللعب؛ في البداية، أنت دائماً مجرد قروي آخر.',
                'قبل الخيانة، تأكد من أنك تستطيع الوثوق بالذئاب؛ يمكن أن يخدعوك.',
                'حافظ على ملف منخفض حتى تقرر ولاءك النهائي.'
            ],
            advanced: 'تفاوض مع الذئاب لتنسيق تحولك وتحقيق النصر، لكن كن لديك خطة بديلة في حالة الخيانة.',
            warning: 'أنت قروي حتى تتحوّل. إجبار قروي آخر على كشف دوره لمصلحتك الشخصية قد يكلّف الفريق الطيّب خسارة اللعبة — وبما أنك جزء من ذلك الفريق حتى تتحوّل، ستخسر أنت أيضاً.'
        },
        mayor: {
            name: 'العمدة',
            team: 'good',
            image: 'https://platoapp.com/images/a8c79490-4363-11ef-bfb7-a598d323cbfc-card_mayor.webp',
            ability: 'صوته يُحسب مزدوجاً في جميع مراحل التصويت.',
            tips: [
                'يجب أن تكون حذراً؛ سجلات التصويت يمكن أن تُظهر من هو العمدة.',
                'انتبه بشكل مفرط لكل ما قيل، حيث أن صوتك يغير بشكل كبير مجرى اللعبة.',
                'استخدم صوتك المزدوج لتوجيه التصويت نحو المشتبه بهم أو اللاعبين المؤكدين.',
                'يمكنك أن تعمل كطُعم ليلاً، رغم أن الفائدة محدودة.'
            ],
            advanced: 'تحقق ممن يكذب بفحص المحادثة وسجل التصويت، وواجه المزيفين بتأثير صوتك.'
        },
        assassin: {
            name: 'الحشاش',
            team: 'good',
            image: 'https://platoapp.com/images/a8e1d350-4363-11ef-bfb7-a598d323cbfc-card_assassin.webp',
            ability: 'يمكنه اغتيال لاعب مرة واحدة في اللعبة خلال الليل.',
            tips: [
                'استخدم قدرتك دائماً في الليلة الأولى للقضاء على ذئب محتمل.',
                'أعطِ الأولوية للأهداف المؤكدة من قبل العرّاف أو ذوي السلوك المشبوه.',
                'لا تقتل عشوائياً؛ الخطأ يمكن أن يضر فريقك.',
                'إذا أعلن أحدهم عن دورك، ادّعِه؛ كل دور يُدّعى والحشاش ليس استثناءً.'
            ],
            advanced: 'تأكد دائماً من كتابة من ستقتله مسبقاً حتى لا يتمكن أحد من سرقة دورك (مثال: "أنا الحشاش أقتل اللاعب X"). تنسيق مع أدوار المعلومات لتنفيذ ذئب.'
        },
        'town-crier': {
            name: 'المنادي',
            team: 'good',
            image: 'https://platoapp.com/images/a8ddb4a0-4363-11ef-bfb7-a598d323cbfc-card_towncrier.webp',
            ability: 'يختار لاعباً خلال الليل؛ إذا مات، سيتم كشف دور اللاعب المختار للجميع. اعلم أن المُغيّر يظهر بدور صالح آخر عند كشفه من قبل المنادي.',
            tips: [
                'استخدم اختيارك بعناية لإعطاء معلومات إذا مت.',
                'انتبه دائماً حتى لا تختار شخصاً كشف بالفعل عن دوره.',
                'تصرف كطُعم بإعلان أفعال وهمية لإرباك الذئاب.'
            ],
            advanced: 'إذا كنت تعتقد أنك الهدف التالي، حاول اختيار لاعب مفتاحي بحيث يكشف موتك معلومات قيمة لفريقك.'
        },
        lovers: {
            name: 'العاشقان',
            team: 'good',
            image: 'https://platoapp.com/images/a8d57740-4363-11ef-bfb7-a598d323cbfc-card_lovers.webp',
            ability: 'يُختار لاعبان ويرى كلاهما بطاقتيهما. يتشاركان التفاني، قدرة تمكّنهم من تحمّل هجوم ذئب واحد. اعلم أن المُغيّر يظهر كعاشق لكليهما.',
            tips: [
                'لا تكشف عن حبيبك الآخر إذا كان يجب عليك الإفصاح عن دورك؛ احمِه بالإبقاء عليه مخفياً.',
                'إذا كان هناك مُغيّر، تواصل مبكراً واسأل من هو الحبيب الثالث.',
                'حافظ على التواصل مع شريكك للتصويت معاً.'
            ],
            advanced: 'حلل إجابة العاشق الثالث بعناية عندما تسأل؛ قد يجيب المُغيّر بشكل صحيح أو يحاول أن يسبقك. صوّت دائماً معاً.'
        },
        druid: {
            name: 'الدرويد',
            team: 'good',
            image: 'https://platoapp.com/images/a8e8ff40-4363-11ef-bfb7-a598d323cbfc-card_druid.webp',
            ability: 'يختار لاعباً خلال الليل؛ إذا مات تلك الليلة، يموت اللاعب المختار أيضاً. اعلم أنه لا يمكنه اختيار لاعبين كُشفوا من قبل المتصوّف أو المنادي.',
            tips: [
                'اختر دائماً شخصاً ما، لا تدع نفسك تُقتل بدون أخذ أحد معك، لكن اختر بعناية من تأخذه؛ فهو دور محفوف بالمخاطر.',
                'يمكنك أن تطعم بالتلميح إلى أنك دور قيم حتى تُقتل.',
                'انتبه بشدة لرصد الذئاب المحتملين وإبقائهم محددين.'
            ],
            advanced: 'اطعم مع شخص محدد وحدده في نفس الوقت. إذا كان اللاعب الذي تطعم معه ذئباً، فسيفضلون التصويت لك على الفور، مما يمكن أن يؤدي إلى قتلك لذئب.'
        },
        mystic: {
            name: 'المتصوف',
            team: 'good',
            image: 'https://platoapp.com/images/a8b5ba40-4363-11ef-bfb7-a598d323cbfc-card_mystic.webp',
            ability: 'يختار لاعب غير متواجد (غير متصل) خلال الليل لكشف بطاقته لجميع اللاعبين.',
            tips: [
                'اكتب مسبقاً واستخدم قدرتك بنشاط؛ لا تنتظر انقطاع الآخرين.',
                'اطلب بثقة من اللاعبين قطع الاتصال لفترة وجيزة ليتم كشفهم.',
                'أرسل رسالة قبل الكشف مباشرةً حتى لا يدّعي ذئب فعلك.',
                'لا تُلحّ على لاعب واحد؛ إذا لم يقطع الاتصال الأول الذي طلبت منه أو لم يُظهِر نيّة للقيام بذلك، اطلب من آخر بسرعة.'
            ],
            advanced: 'اطلب مباشرة من عدة لاعبين المغادرة وقيم ردود فعلهم وسلوكياتهم لكشف الأكثر اشتباهاً.'
        },
        thief: {
            name: 'اللص',
            team: 'good',
            image: 'https://platoapp.com/images/a8de29d0-4363-11ef-bfb7-a598d323cbfc-card_thief.webp',
            ability: 'يمكنه سرقة صوت أي لاعب خلال الليل، مرتين في اللعبة.',
            tips: [
                'احتفظ بالقدرة للحظات الحاسمة؛ لا تسرق الأصوات عشوائياً.',
                'حلل اللعبة واختر لاعباً يمكن أن يغير صوته مجرى اللعبة.',
                'تجنّب السرقة العشوائية في الليالي الأولى. لاحقاً قد يدّعي شرير دورك وليس لديك طريقة لإثبات براءتك.'
            ],
            advanced: 'استخدم قدرتك لمنع الذئاب من الفوز بتصويت مفتاحي.'
        },
        harlot: {
            name: 'العاهرة',
            team: 'good',
            image: 'https://platoapp.com/images/a8d32d50-4363-11ef-bfb7-a598d323cbfc-card_harlot.webp',
            ability: 'تغري لاعباً خلال الليل؛ إذا كان اللاعب طيباً، تكون العاهرة محمية، لكن إذا مات ذلك اللاعب أو كان ذئباً، تموت العاهرة.',
            tips: [
                'اغري للتحقق من الأدوار واستخراج معلومات قيمة.',
                'اسأل اللاعب المغري بحذر عن دوره؛ يمكن للذئب أن يدّعي ويتم كشفه.',
                'لا تغري أبداً إذا كان موتك سيمنح الذئاب النصر. مثال: اليوم 1 يُقتل قروي، الليلة 1 لا يمكنك الإغراء لأن الأشرار سيفوزون بالأغلبية.'
            ],
            advanced: 'إذا مت بدون إغواء ولم يتبقَ أدوار إعلامية، اتهم أحدهم بأنه ذئب وتراجع فوراً إذا دافعوا عن أنفسهم بسرعة.'
        },
        bard: {
            name: 'الشاعر',
            team: 'good',
            image: 'https://platoapp.com/images/a8c6d140-4363-11ef-bfb7-a598d323cbfc-card_bard.webp',
            ability: 'يمكنه إسحار لاعب آخر مرة واحدة في اللعبة؛ سيرى كلاهما بطاقتيهما. اعلم أن المُغيّر سيظهر بدور قروي آخر.',
            tips: [
                'اكتب مسبقاً "أنا الشاعر، أسحر اللاعب X" ثوانٍ قبل انتهاء الليل.',
                'إذا كان هناك مُغيّر، بعد إسحار شخص ما، اطلب من اللاعب الإفصاح عن دوره.',
                'اختر هدفاً يمكن أن يعطي معلومات قيمة.'
            ],
            advanced: 'في لعبة مع شامان الذئب، قل أنك تسحر دون كشف اسم اللاعب؛ بهذه الطريقة إذا أسحرت ذئباً يبقى صامتاً، يمكنك قتله بدون مشاكل.'
        },
        // Evil Roles
        alpha: {
            name: 'الذئب الألفا',
            team: 'evil',
            image: 'https://platoapp.com/images/a88d4ab0-4363-11ef-bfb7-a598d323cbfc-card_alphawolf.webp',
            ability: 'يظهر كطيب في عيون العرّاف، مما يجعل الكشف صعباً.',
            tips: [
                'ابقَ حياً أطول وقت ممكن؛ لا يمكن للعرّاف اكتشافك.',
                'اعتبر العرّاف حليفاً؛ لا تسرق دوره أبداً إلا إذا كان ضرورياً للغاية.',
                'تجنب المطالبة بالأدوار على عجل إلا في ألاعاب محددة جداً.'
            ],
            advanced: 'اعتبر العرّاف حليفك وحاول أن يكون إلى جانبك؛ بهذه الطريقة، عندما يكون لحظتك للمطالبة بدور، سيكون لديك صوت العرّاف في صالحك.'
        },
        werewolf: {
            name: 'الذئب',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c96950-4363-11ef-bfb7-a598d323cbfc-card_werewolf.webp',
            ability: 'لا يمتلك قدرات خاصة. يصوت خلال الليل على أي قروي يقتله مع فريقه.',
            tips: [
                'حافظ على ملف منخفض واتبع خطة زملائك الجدد.',
                'استفد من براءتك السابقة لصرف الشكوك.',
                'لا تدّعِ شيئاً إلا إذا كان ضرورياً للغاية.'
            ],
            advanced: 'تظاهر بأنك قروي عادي وصوّت دائماً لحماية زملائك؛ ضحِّ بنفسك إذا كان ذلك سيضمن النصر لفريق الشر.'
        },
        vampire: {
            name: 'مصاص الدماء',
            team: 'evil',
            image: 'https://platoapp.com/images/a8db1c90-4363-11ef-bfb7-a598d323cbfc-card_vampire.webp',
            ability: 'يمكنه إلغاء قدرة الطبيب مرة واحدة في اللعبة باستخدام دمه. صوته يُحسب صفراً ويظهر فقط كسيئ للعرّاف.',
            tips: [
                'دائماً كمهمة أولى، حاول قتل الطبيب في الليلة الأولى.',
                'تجنب كونك آخر ذئب على قيد الحياة، حيث أن صوتك لا يُحسب.',
                'لا تقول إنك الطبيب؛ يمكن أن يُعدمك بسرعة.'
            ],
            advanced: 'إذا كنت آخر ذئب على قيد الحياة، حاول أن تمر دون أن يلاحظك واقطع الاتصال بسرعة في بداية الليل بعد اختيار شخص ما للقتل. لا تعد قبل مرحلة التصويت، هدفك هو تجنّب مواجهة 1 مقابل 1 مع اللاعب الذي تحاول الفوز عليه.'
        },
        witch: {
            name: 'الساحرة',
            team: 'evil',
            image: 'https://platoapp.com/images/a8969980-4363-11ef-bfb7-a598d323cbfc-card_witch.webp',
            ability: 'يمكنها اختيار وكشف بطاقة لاعب طيب خلال مناقشة النهار.',
            tips: [
                'استخدمي قدرتك دائماً في البداية لكشف قروي يستحق القتل.',
                'بعد الكشف، ليس للساحرة فائدة أكثر؛ يمكنك أن تكوني طُعماً.',
                'استمري في محاولة مساعدة فريقك لكن مع العلم أنك يمكن أن تُضحّى بك.'
            ],
            advanced: 'إذا كشفتِ الطبيب بينما يوجد مصاص دماء، تأكدي من قتله في أقرب وقت ممكن؛ وإلا تجنّبي قتله في الليلة الأولى. إذا كشفتِ دوراً آخر، يمكنكِ تركه حياً حتى تتمكّني من سرقة دوره في لحظة مفتاحية.'
        },
        siren: {
            name: 'الصّفّارة',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c28b80-4363-11ef-bfb7-a598d323cbfc-card_siren.webp',
            ability: 'إذا أُعدمت خلال النهار، يفقد القرويون قدراتهم الليلة التالية.',
            tips: [
                'هناك احتمال أن يبيعك زملاؤك في الفريق للتخلص من الأدوار الصعبة القتل.',
                'ادّعِ دائماً أدواراً لا يمكن لفريقك قتلها بسهولة.',
                'أعطِ الأولوية لموتك قبل أي زميل آخر. إذا كانوا يناقشون بينك وبين ذئب زميل، لا تدعم موته، افعل شيئاً حتى تكون أنت من يموت.',
                'حاول البقاء على قيد الحياة أطول وقت ممكن على الرغم من أن موتك مفيد.'
            ],
            advanced: 'في اليوم الأول، إذا ذُكرت أدوار مثل الملك، ادّعِ بسرعة حتى يتبقى القرويون بلا قوى ليلة ونهار آخر عندما يقتلوك.'
        },
        shapeshifter: {
            name: 'المُغيّر',
            team: 'evil',
            image: 'https://platoapp.com/images/a8ce7260-4363-11ef-bfb7-a598d323cbfc-card_shapeshifter.webp',
            ability: 'يظهر كقروي إذا كشفه المنادي أو أسحره الشاعر، كعاشق للعاشقين، وبشكل عشوائي كطيب أو سيئ للعرّاف.',
            tips: [
                'في لعبة مع العاشقين، يجب أن تكون أول من يسأل.',
                'إذا كشفوك، يجب أن تذكر دوراً؛ لا تنتظر أكثر من 4 ثوانٍ.',
                'حاول الدفاع عن نفسك ولا تستسلم بسرعة، أصرّ على الكذبة.'
            ],
            advanced: 'إذا تسللت بين العاشقين، تلاعب بهم حتى لا يثقوا ببعضهم بعد موت الأول، مما يقضي على قرويين متتاليين.'
        },
        nightmare: {
            name: 'الكابوس',
            team: 'evil',
            image: 'https://platoapp.com/images/a8a3b8e0-4363-11ef-bfb7-a598d323cbfc-card_nightmare.webp',
            ability: 'خلال مناقشة النهار، يختار لاعباً لينام، مما يمنعه من استخدام قدرته الليلة التالية.',
            tips: [
                'اختر الضحية بعناية، بإعطاء الأولوية لأدوار مثل الطبيب على العرّاف.',                'تأكد من عدم تنويم دور يحاول زميل سرقته، لأن ذلك يعرّضهم للخطر.',                'لا تستخدم القدرة بدون سبب؛ حلل الوضع.',
                'تنسيق مع ذئاب آخرين للاستفادة من تعطيل أفضل دور.'
            ],
            advanced: 'أنم دوراً مفتاحياً قبل استخدامه لقدرته الحاسمة، مما يفرض فشلاً ويفتح الباب لنصر في اللحظة الأخيرة.'
        },
        'wolf-shaman': {
            name: 'شامان الذئب',
            team: 'evil',
            image: 'https://platoapp.com/images/a8cc4f80-4363-11ef-bfb7-a598d323cbfc-card_wolfshaman.webp',
            ability: 'يمكنه حماية ذئب من الإعدام خلال النهار مرة واحدة في اللعبة؛ الذئب المحمي لن يموت عند إعدامه.',
            tips: [                'حافظ على التوازن بين القرويين الموتى والذئاب الأحياء لتحقيق هامش نصر أكبر.',
                'أنت الدور الذي يمكنه خيانة بقية الذئاب لضمان النصر.',                'لا تنفق حمايتك أبداً على الصّفّارة إلا إذا منحت ذلك النصر الفوري.',
                'صرف الانتباه عن نفسك لاستخدام قوتك في اللحظة الأنسب.',
                'قرر بعناية متى تحمي زميلاً أو تحتفظ بها لنفسك.'
            ],
            advanced: 'يمكنك خيانة زملائك بسرقة دور العرّاف وقول إنك فحصتهم. عندما يموت أحدهم، سيصدقك القرويون على الأرجح. من هناك، وجّه اللعبة بهدوء مع الاحتفاظ بحمايتك في الاحتياط.'
        }
    };

    // ROLES SECTION - TEAM TOGGLE & CAROUSEL
    const teamButtons = document.querySelectorAll('.team-btn');
    const roleDataItems = document.querySelectorAll('.role-data-item');
    const prevBtn = document.querySelector('.panel-prev');
    const nextBtn = document.querySelector('.panel-next');
    
    // Detail panel elements
    const detailImage = document.getElementById('detail-image');
    const detailName = document.getElementById('detail-name');
    const detailTeam = document.getElementById('detail-team');
    const detailAbility = document.getElementById('detail-ability');
    const detailTips = document.getElementById('detail-tips');
    const detailAdvanced = document.getElementById('detail-advanced');
    const detailWarningSection = document.getElementById('detail-warning-section');
    const detailWarning = document.getElementById('detail-warning');

    let currentTeam = 'good';
    let currentRole = 'seer';

    // Initialize carousel
    function initCarousel() {
        updateCarouselVisibility();
        selectRole('seer');
    }

    // Update which role data items are visible based on team
    function updateCarouselVisibility() {
        roleDataItems.forEach(item => {
            const team = item.getAttribute('data-team');
            if (team === currentTeam) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible', 'active');
            }
        });
    }

    // Select a role and update detail panel
    function selectRole(roleKey) {
        const role = rolesData[roleKey];
        if (!role) return;

        currentRole = roleKey;

        // Update active state in role data items
        roleDataItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-role') === roleKey) {
                item.classList.add('active');
            }
        });

        // Update detail panel
        detailImage.src = role.image;
        detailImage.alt = role.name;
        detailName.textContent = role.name;
        detailTeam.textContent = role.team === 'good' ? 'دور الخير' : 'دور الشر';
        detailTeam.className = `detail-team-badge ${role.team}`;
        detailAbility.textContent = role.ability;
        detailAdvanced.textContent = role.advanced;

        // Show/hide warning
        if (role.warning) {
            detailWarning.textContent = role.warning;
            detailWarningSection.style.display = '';
        } else {
            detailWarningSection.style.display = 'none';
        }

        // Update tips list
        detailTips.innerHTML = role.tips.map(tip => `<li>${tip}</li>`).join('');
    }

    // Team toggle
    teamButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const team = btn.getAttribute('data-team');
            if (team === currentTeam) return;

            currentTeam = team;
            
            // Update button states
            teamButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update carousel
            updateCarouselVisibility();

            // Select first role of the new team
            const firstRole = document.querySelector(`.role-data-item.visible`);
            if (firstRole) {
                const roleKey = firstRole.getAttribute('data-role');
                selectRole(roleKey);
            }
        });
    });

    // Carousel navigation
    prevBtn.addEventListener('click', () => {
        const visibleItems = Array.from(document.querySelectorAll('.role-data-item.visible'));
        const currentIndex = visibleItems.findIndex(item => item.getAttribute('data-role') === currentRole);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
        const prevRole = visibleItems[prevIndex].getAttribute('data-role');
        selectRole(prevRole);
    });

    nextBtn.addEventListener('click', () => {
        const visibleItems = Array.from(document.querySelectorAll('.role-data-item.visible'));
        const currentIndex = visibleItems.findIndex(item => item.getAttribute('data-role') === currentRole);
        const nextIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
        const nextRole = visibleItems[nextIndex].getAttribute('data-role');
        selectRole(nextRole);
    });

    initCarousel();

    // FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                const ans = i.querySelector('.faq-answer');
                if (ans) ans.style.maxHeight = null;
            });
            
            // Open clicked if wasn't active
            if (!isActive) {
                item.classList.add('active');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // KEYBOARD NAVIGATION
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});
