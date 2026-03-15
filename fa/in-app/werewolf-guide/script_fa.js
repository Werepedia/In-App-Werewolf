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

    // ROLES DATA (PERSIAN TRANSLATION)
    const rolesData = {
        // Good Roles
        seer: {
            name: 'پیش‌گو',
            team: 'good',
            image: 'https://platoapp.com/images/a8e44450-4363-11ef-bfb7-a598d323cbfc-card_seer.webp',
            ability: 'هر شب، پیش‌گو می‌تواند یک بازیکن را بررسی کند تا بداند به کدام تیم تعلق دارد. نقش‌هایی مانند گرگ آلفا، دگرپیکر، دلقک، و گرگ‌سان تا حدی یا کاملاً بر اعتبار اطلاعاتی که این نقش می‌تواند ارائه دهد تأثیر می‌گذارند.',
            tips: [
                'همه چیز را با دقت بخوانید تا بدانید چه کسی را بررسی کنید.',
                'اطلاعات را بدون دلیل آشکار نکنید. مطمئن شوید نقش‌هایی مانند شامان گرگ وجود ندارد قبل از آشکار کردن اطلاعات.',
                'در صورتی که آدمکش وجود دارد، اطلاعات خود را در اسرع وقت به او برسانید.',
                'اعتماد به نفس داشته باشید و صدای خود را بشنوید.'
            ],
            advanced: 'پیش‌گو می‌تواند حرکات پرمخاطره مانند ادعای جعلی/متهم کردن اشتباهی برای فشار بر یک بازیکن انجام دهد. اگر آنها فوراً پس از اتهام خود را آشکار کنند، عقب‌نشینی و دادن اطلاعات واقعی کلیدی است؛ در غیر این صورت، پیش‌گو ممکن است به عنوان گرگ در نظر گرفته شود.'
        },
        doctor: {
            name: 'دکتر',
            team: 'good',
            image: 'https://platoapp.com/images/a897f910-4363-11ef-bfb7-a598d323cbfc-card_doctor.webp',
            ability: 'هر شب، دکتر می‌تواند از یک بازیکن یا خودش محافظت کند، و از مرگ او در صورت حمله گرگ‌ها جلوگیری کند. این ممکن است همیشه اینطور نباشد اگر خون‌آشام وجود داشته باشد؛ آنها دکتر را یک بار در بازی لغو می‌کنند اگر شخص نجات‌یافته توسط دکتر توسط گرگ‌ها کشته شود.',
            tips: [
                'حرکت خود را از قبل تایپ کنید (برای مثال، "من دکتر هستم، بازیکن X را نجات می‌دهم") و آن را در پایان شب بفرستید.',
                'بر اساس اطلاعات موجود تصمیم بگیرید که چه کسی را محافظت کنید؛ در شب‌های پیشرفته از خود محافظت کنید.',
                'هنگامی که نقش‌هایی وجود دارند که قابلیت شما را لغو یا مختل می‌کنند (کابوس، صفاره، خون‌آشام) محتاط باشید.',
                'هر وقت جادوگر وجود دارد، باید از خود محافظت کنید اگر نقش مهم‌تری برای نجات وجود ندارد.'
            ],
            advanced: 'با روستاییان دیگر هماهنگ شوید تا نقش‌های کلیدی را در لحظات حساس محافظت کنید و از حفاظت از خود به طور استراتژیک برای بقا تا پایان استفاده کنید. همچنین می‌توانید راه‌هایی برای گمراه کردن گرگ‌ها ابداع کنید تا فکر کنند شما دکتر نیستید.'
        },
        knight: {
            name: 'شوالیه',
            team: 'good',
            image: 'https://platoapp.com/images/a8aa2180-4363-11ef-bfb7-a598d323cbfc-card_knight.webp',
            ability: 'دارای سپری است که او را یک بار در بازی از حمله گرگ نجات می‌دهد. نمی‌تواند توسط دکتر محافظت شود در حالی که سپر خود را دارد.',
            tips: [
                'شوالیه به خانواده سلطنتی تعلق دارد؛ تا زمانی که زنده است، پادشاه نمی‌تواند توسط گرگ‌ها کشته شود.',
                'به عنوان طعمه عمل کنید تا حملات گرگ‌های ناآگاه را جلب کنید و از روستاییان دیگر محافظت کنید.',
                'به یاد داشته باشید که سپر شما به طور خودکار فعال می‌شود و با محافظت دکتر ترکیب نمی‌شود.'
            ],
            advanced: 'گرگ‌ها را با تلویح اینکه یک نقش ارزشمند یا آسیب‌پذیر هستید فریب دهید تا حملات را هدر دهند، اما طعمه‌گذاری خود را طوری برنامه‌ریزی کنید که بر خانواده سلطنتی تأثیر نگذارد. با نقش‌هایی که در بازی نیستند یا قبلاً آشکار شده‌اند طعمه بگذارید.'
        },
        princess: {
            name: 'پرنسس',
            team: 'good',
            image: 'https://platoapp.com/images/a8d61380-4363-11ef-bfb7-a598d323cbfc-card_princess.webp',
            ability: 'از اعدام در طول روز جان سالم به در می‌برد؛ هنگامی که قابلیت فعال می‌شود، کارت او برای همه بازیکنان آشکار می‌شود.',
            tips: [
                'پرنسس به خانواده سلطنتی تعلق دارد؛ تا زمانی که زنده است، پادشاه نمی‌تواند توسط گرگ‌ها کشته شود.',
                'وقتی به او رأی داده می‌شود، یک نقش قدرتمند که در بازی نیست ادعا کنید تا یک گرگ ناآگاه را به ادعای آن وادارید.',
                'از مصونیت اعدام خود برای گرفتن اطلاعات درباره کسانی که به او رأی می‌دهند استفاده کنید.',
                'مراقب باشید که در شب بدون دلیل طعمه نگذارید تا پادشاه را محافظت کنید.',
                'اگر می‌توانید از قرار گرفتن در محاکمه اجتناب کنید، این کار را بکنید. اعدام پرنسس اتلاف یک روز محسوب می‌شود.'
            ],
            advanced: 'هنگام محاکمه، یک نقش که در بازی نیست اعلام کنید؛ این بازی می‌تواند یک گرگ عصبی یا ناآگاه را به ادعای آن وادارد و در نتیجه خود را فاش کند.'
        },
        hunter: {
            name: 'شکارچی',
            team: 'good',
            image: 'https://platoapp.com/images/a8a5dbc0-4363-11ef-bfb7-a598d323cbfc-card_hunter.webp',
            ability: 'هنگام مرگ در شب، 75% شانس دارد یک گرگ تصادفی را با خود ببرد.',
            tips: [
                'با اعلام سحرها یا کاشوف‌ها به عنوان طعمه عمل کنید تا گرگ‌ها را به حمله به شما تحریک کنید.',
                'از بازیکنان بخواهید برای "آشکار کردن" آنها قطع ارتباط کنند و در نتیجه گرگ‌ها را فریب دهید.',
                'فعال و ارتباطی بمانید تا تأثیر نقش جعلی خود را بر گرگ‌ها به حداکثر برسانید.',
                'طعمه‌گذاری در شب به عنوان بهانه‌ای برای دفاع از نقش شما عمل می‌کند. توضیح دهید که طعمه می‌گذاشتید تا ببینید آیا شما را می‌کشند زیرا شکارچی هستید. (شرورها نیز ممکن است از این استدلال استفاده کنند)'
            ],
            advanced: 'ادعای یک نقش دیگر که گرگ‌ها را به حمله وادار می‌کند را تظاهر کنید، اما آماده عقب‌نشینی باشید اگر نتیجه معکوس شود.'
        },
        necromancer: {
            name: 'احیاگر',
            team: 'good',
            image: 'https://platoapp.com/images/a8da0b20-4363-11ef-bfb7-a598d323cbfc-card_necromancer.webp',
            ability: 'می‌تواند یک روستایی مرده را یک بار در بازی در طول شب زنده کند.',
            tips: [
                'حرکت خود را از قبل تایپ کنید و درست قبل از پایان شب بفرستید تا مشخص شود واقعاً شما هستید.',
                'قابلیت خود را در اسرع وقت استفاده کنید؛ برای مرگ یک نقش ارزشمندتر صبر نکنید.',
                'با تیم خود هماهنگ شوید تا بازیکنی را زنده کنید که قابلیت او بیشترین مزیت را ارائه می‌دهد.'
            ],
            advanced: 'در اختلافاتی که یک گرگ ادعای احیاگر بودن را دارد، اگر شرایط اجازه می‌دهد، زنده کردن بازیکنان مختلف را پیشنهاد دهید؛ هر کس که به قول خود عمل کند، واقعی خواهد بود.'
        },
        king: {
            name: 'پادشاه',
            team: 'good',
            image: 'https://platoapp.com/images/a8e359f0-4363-11ef-bfb7-a598d323cbfc-card_king.webp',
            ability: 'تا زمانی که شوالیه، پرنسس، یا دلقک زنده‌اند، پادشاه نمی‌تواند در شب توسط گرگ‌ها کشته شود. اگر اعدام شود، روستاییان نمی‌توانند در شب بعدی از قابلیت‌های خود استفاده کنند.',
            tips: [
                'از مصونیت خود برای عمل به عنوان طعمه در شب‌های اول استفاده کنید، و حملات گرگ‌ها را منحرف کنید.',
                'مگر در صورت لزوم نقش خود را آشکار نکنید؛ مصونیت شما در صورت مرگ اعضای خانواده سلطنتی از دست می‌رود.',
                'از اعدام با هر قیمتی اجتناب کنید، زیرا مرگ شما تیم شما را برای یک شب بی‌قدرت می‌کند.'
            ],
            advanced: 'ادعای یک نقش که گرگ‌ها را به جلب توجه وادار می‌کند را تظاهر کنید و سعی کنید کشته شوید، و در نتیجه نقش‌های مهم‌تر را محافظت کنید. فوراً آنچه کردید را توضیح دهید اگر کسی شما را متهم کند.'
        },
        jester: {
            name: 'دلقک',
            team: 'good',
            image: 'https://platoapp.com/images/a8bd5b60-4363-11ef-bfb7-a598d323cbfc-card_jester.webp',
            ability: 'فقط در صورت کشته شدن، چه در روز چه در شب، برنده می‌شود. می‌تواند به طور تصادفی به عنوان خوب یا بد برای پیش‌گو ظاهر شود.',
            tips: [
                'نقش‌های دیگران را هدر ندهید یا "نسوزانید"؛ اگرچه شرط پیروزی شما متفاوت است، اما شما هنوز یک روستایی هستید.',
                'برای کشته شدن توسط گرگ‌ها فریب دهید، برای مثال با جعل یک نقش غیرموجود.',
                'از سردرگمی برای استخراج اطلاعات از واکنش‌های دیگران استفاده کنید. در صورت تمایل، می‌توانید به تیم دیگری کمک کنید.',
                'همیشه بدون ترول یا خراب کردن تجربه بازی دیگران بازی کنید.'
            ],
            advanced: 'اگر در روز اول به او رأی دهند، می‌توانید خود را به عنوان دلقک آشکار کنید یا یک نقش غایب از بازی را اعلام کنید تا جان خود را فدا کنید و سعی کنید به تیم خیر کمک کنید.',
            warning: 'نقش واقعی بازیکن دیگری را فقط برای کسب پیروزی فاش نکنید — این یک بی‌گناه را مجبور می‌کند که بدون دلیل از خود دفاع کند و می‌تواند بازی او را خراب کند. اگر می‌خواهید چیزی ادعا کنید، همیشه نقشی را که در بازی نیست انتخاب کنید.'
        },
        lycan: {
            name: 'گرگ‌سان',
            team: 'good',
            image: 'https://platoapp.com/images/a8e073c0-4363-11ef-bfb7-a598d323cbfc-card_lycan.webp',
            ability: 'روستایی لعنت‌زده که اگر در شب توسط گرگ‌ها کشته شود، به گرگینه تبدیل می‌شود. پیش‌گو او را قبل از تبدیل به عنوان روستایی می‌بیند، و این اطلاعات تغییر نمی‌کند.',
            tips: [
                'ارزیابی کنید با کدام تیم می‌خواهید بازی کنید؛ در ابتدا، شما همیشه فقط یک روستایی دیگر هستید.',
                'قبل از خیانت، مطمئن شوید که می‌توانید به گرگ‌ها اعتماد کنید؛ آنها می‌توانند شما را فریب دهند.',
                'تا تصمیم‌گیری درباره وفاداری نهایی خود، پروفایل پایینی داشته باشید.'
            ],
            advanced: 'با گرگ‌ها مذاکره کنید تا تبدیل خود را هماهنگ کنید و پیروزی را به دست آورید، اما یک طرح جایگزین در صورت خیانت داشته باشید.',
            warning: 'شما تا زمانی که تبدیل نشدید یک روستایی هستید. مجبور کردن روستایی دیگری به فاش کردن نقش خود برای نفع شخصی شما می‌تواند مستقیماً باعث شکست تیم خیر شود — و از آنجا که تا زمان تبدیل شدن بخشی از آن تیم هستید، شما هم می‌بازید.'
        },
        mayor: {
            name: 'شهردار',
            team: 'good',
            image: 'https://platoapp.com/images/a8c79490-4363-11ef-bfb7-a598d323cbfc-card_mayor.webp',
            ability: 'رأی او در همه مراحل رأی‌گیری دو برابر محاسبه می‌شود.',
            tips: [
                'باید محتاط باشید؛ سوابق رأی‌گیری می‌تواند نشان دهد شهردار کیست.',
                'به همه چیز گفته شده توجه فوق‌العاده‌ای کنید، زیرا رأی شما به طور چشمگیری مسیر یک بازی را تغییر می‌دهد.',
                'از رأی دو برابر خود برای هدایت رأی‌گیری به سمت مظنونین یا بازیکنان تأییدشده استفاده کنید.',
                'می‌توانید در شب به عنوان طعمه عمل کنید، هرچند فایده محدودی دارد.'
            ],
            advanced: 'با بررسی چت و تاریخچه رأی‌گیری بررسی کنید چه کسی دروغ می‌گوید، و با تأثیر رأی خود با متقلبان مقابله کنید.'
        },
        assassin: {
            name: 'آدمکش',
            team: 'good',
            image: 'https://platoapp.com/images/a8e1d350-4363-11ef-bfb7-a598d323cbfc-card_assassin.webp',
            ability: 'می‌تواند یک بازیکن را یک بار در بازی در طول شب ترور کند.',
            tips: [
                'همیشه قابلیت خود را در شب اول برای حذف یک گرگ احتمالی استفاده کنید.',
                'اهداف تأییدشده توسط پیش‌گو یا با رفتار مشکوک را در اولویت قرار دهید.',
                'به طور تصادفی نکشید؛ یک اشتباه می‌تواند به تیم شما آسیب برساند.',
                'اگر کسی نقش شما را اعلام کند، آن را ادعا کنید؛ هر نقشی ادعا می‌شود و آدمکش استثنا نیست.'
            ],
            advanced: 'مطمئن شوید همیشه از قبل تایپ می‌کنید که چه کسی را می‌خواهید بکشید تا کسی نتواند نقش شما را بدزدد (مثال: "من آدمکش هستم، بازیکن X را می‌کشم"). با نقش‌های اطلاعاتی برای اعدام یک گرگ هماهنگ شوید.'
        },
        'town-crier': {
            name: 'منادی شهر',
            team: 'good',
            image: 'https://platoapp.com/images/a8ddb4a0-4363-11ef-bfb7-a598d323cbfc-card_towncrier.webp',
            ability: 'یک بازیکن را در طول شب انتخاب می‌کند؛ اگر بمیرد، نقش بازیکن انتخاب‌شده برای همه آشکار می‌شود. بدانید که دگرپیکر هنگام آشکار شدن توسط منادی شهر با نقش خیر دیگری ظاهر می‌شود.',
            tips: [
                'انتخاب خود را با دقت استفاده کنید تا در صورت مرگ اطلاعات بدهید.',
                'همیشه توجه کنید تا کسی را که قبلاً نقش خود را آشکار کرده انتخاب نکنید.',
                'با اعلام اقدامات جعلی به عنوان طعمه عمل کنید تا گرگ‌ها را گمراه کنید.'
            ],
            advanced: 'اگر فکر می‌کنید هدف بعدی هستید، سعی کنید یک بازیکن کلیدی را انتخاب کنید تا مرگ شما اطلاعات ارزشمندی را برای تیم شما آشکار کند.'
        },
        lovers: {
            name: 'عاشقان',
            team: 'good',
            image: 'https://platoapp.com/images/a8d57740-4363-11ef-bfb7-a598d323cbfc-card_lovers.webp',
            ability: '2 بازیکن انتخاب می‌شوند و هر دو کارت‌های خود را می‌بینند. هر دو وفاداری را به اشتراک می‌گذارند، قابلیتی که آنها را قادر می‌سازد یک حمله گرگ را تحمل کنند. بدانید که دگرپیکر به عنوان عاشق برای هر دو ظاهر می‌شود.',
            tips: [
                'عاشق دیگر خود را اگر باید نقش خود را اعلام کنید آشکار نکنید؛ با مخفی نگه داشتن او از او محافظت کنید.',
                'اگر دگرپیکر وجود دارد، زود ارتباط برقرار کنید و بپرسید عاشق سوم کیست.',
                'ارتباط با شریک خود را برای رأی دادن با هم حفظ کنید.'
            ],
            advanced: 'پاسخ عاشق سوم را هنگام پرسیدن با دقت تحلیل کنید؛ دگرپیکر ممکن است درست پاسخ دهد یا سعی کند از شما پیشی بگیرد. همیشه با هم رأی دهید.'
        },
        druid: {
            name: 'دروید',
            team: 'good',
            image: 'https://platoapp.com/images/a8e8ff40-4363-11ef-bfb7-a598d323cbfc-card_druid.webp',
            ability: 'یک بازیکن را در طول شب انتخاب می‌کند؛ اگر آن شب بمیرد، بازیکن انتخاب‌شده نیز می‌میرد. بدانید که نمی‌تواند بازیکنانی را که توسط عارف یا منادی شهر آشکار شده‌اند انتخاب کند.',
            tips: [
                'همیشه کسی را انتخاب کنید، هرگز اجازه ندهید بدون بردن کسی با خود کشته شوید، اما با دقت انتخاب کنید که چه کسی را ببرید؛ این یک نقش پرخطر است.',
                'می‌توانید با تلویح اینکه یک نقش ارزشمند هستید به عنوان طعمه عمل کنید تا کشته شوید.',
                'با دقت زیاد مراقب باشید تا گرگ‌های احتمالی را شناسایی کرده و آنها را علامت‌گذاری کنید.'
            ],
            advanced: 'با کسی خاص به عنوان طعمه عمل کنید و در عین حال او را علامت‌گذاری کنید. اگر بازیکنی که با او طعمه می‌گذارید یک گرگ باشد، احتمالاً فوراً به شما رأی می‌دهند، که می‌تواند منجر به کشتن یک گرگ توسط شما شود.'
        },
        mystic: {
            name: 'عارف',
            team: 'good',
            image: 'https://platoapp.com/images/a8b5ba40-4363-11ef-bfb7-a598d323cbfc-card_mystic.webp',
            ability: 'یک بازیکن AFK (قطع ارتباط) را در طول شب برای آشکار کردن کارت او به همه بازیکنان انتخاب می‌کند.',
            tips: [
                'از قبل تایپ کنید و به طور فعال از قابلیت خود استفاده کنید؛ برای قطع ارتباط دیگران صبر نکنید.',
                'با اعتماد به نفس از بازیکنان بخواهید برای آشکار شدن به طور مختصر قطع ارتباط کنند.',
                'پیامی را درست قبل از آشکارسازی بفرستید تا هیچ گرگی ادعای حرکت شما را نکند.',
                'به یک بازیکن اصرار نکنید؛ اگر اولین کسی که می‌پرسید قصد قطع ارتباط را نداشت، سریع از دیگری بخواهید.'
            ],
            advanced: 'مستقیماً از چندین بازیکن بخواهید بروند و واکنش‌ها و رفتارهای آنها را برای آشکار کردن مشکوک‌ترین فرد ارزیابی کنید.'
        },
        thief: {
            name: 'دزد',
            team: 'good',
            image: 'https://platoapp.com/images/a8de29d0-4363-11ef-bfb7-a598d323cbfc-card_thief.webp',
            ability: 'می‌تواند رأی هر بازیکنی را در طول شب بدزدد، دو بار در بازی.',
            tips: [
                'قابلیت را برای لحظات حساس نگه دارید؛ رأی‌ها را به طور تصادفی ندزدید.',
                'بازی را تحلیل کنید و بازیکنی را انتخاب کنید که رأی او می‌تواند مسیر را تغییر دهد.',
                'از دزدیدن به طور تصادفی در شب‌های اول اجتناب کنید. بعداً یک شرور می‌تواند نقش شما را ادعا کند و شما هیچ راهی برای اثبات بی‌گناهی خود نخواهید داشت.'
            ],
            advanced: 'از قابلیت خود برای جلوگیری از پیروزی گرگ‌ها در یک رأی‌گیری کلیدی استفاده کنید.'
        },
        harlot: {
            name: 'فاحشه',
            team: 'good',
            image: 'https://platoapp.com/images/a8d32d50-4363-11ef-bfb7-a598d323cbfc-card_harlot.webp',
            ability: 'یک بازیکن را در طول شب اغوا می‌کند؛ اگر بازیکن خوب باشد، فاحشه محافظت می‌شود، اما اگر آن بازیکن بمیرد یا یک گرگ باشد، فاحشه می‌میرد.',
            tips: [
                'برای تأیید نقش‌ها و استخراج اطلاعات ارزشمند اغوا کنید.',
                'به طور محتاطانه از بازیکن اغوا شده درباره نقش او بپرسید؛ یک گرگ می‌تواند ادعا کند و فاش شود.',
                'هرگز اغوا نکنید اگر مرگ شما پیروزی را به گرگ‌ها بدهد. مثال: روز 1 یک روستایی کشته می‌شود، شب 1 نمی‌توانید اغوا کنید زیرا شرورها از اکثریت برنده خواهند شد.'
            ],
            advanced: 'اگر بدون اغوا بمیرید و هیچ نقش اطلاعاتی باقی نمانده، کسی را به عنوان گرگ متهم کنید و فوراً اگر سریع از خود دفاع کردند عقب‌نشینی کنید.'
        },
        bard: {
            name: 'شاعر',
            team: 'good',
            image: 'https://platoapp.com/images/a8c6d140-4363-11ef-bfb7-a598d323cbfc-card_bard.webp',
            ability: 'می‌تواند یک بازیکن دیگر را یک بار در بازی مجذوب کند؛ هر دو کارت‌های خود را خواهند دید. بدانید که دگرپیکر با نقش روستایی دیگری ظاهر خواهد شد.',
            tips: [
                'از قبل تایپ کنید "من شاعر هستم، بازیکن X را مجذوب می‌کنم" ثانیه‌ها قبل از پایان شب.',
                'اگر دگرپیکر وجود دارد، پس از مجذوب کردن کسی، از بازیکن بخواهید نقش خود را اعلام کند.',
                'هدفی را انتخاب کنید که می‌تواند اطلاعات ارزشمندی بدهد.'
            ],
            advanced: 'در بازی با شامان گرگ، بگویید که در حال مجذوب کردن هستید بدون آشکار کردن نام بازیکن؛ به این ترتیب اگر یک گرگ را مجذوب کنید که سکوت کرده است، می‌توانید بدون مشکل او را بکشید.'
        },
        // Evil Roles
        alpha: {
            name: 'گرگ آلفا',
            team: 'evil',
            image: 'https://platoapp.com/images/a88d4ab0-4363-11ef-bfb7-a598d323cbfc-card_alphawolf.webp',
            ability: 'در چشم پیش‌گو به عنوان خوب ظاهر می‌شود، که شناسایی را دشوار می‌کند.',
            tips: [
                'تا جایی که ممکن است زنده بمانید؛ پیش‌گو نمی‌تواند شما را کشف کند.',
                'پیش‌گو را یک متحد در نظر بگیرید؛ مگر در موارد کاملاً ضروری هرگز نقش او را ندزدید.',
                'مگر در بازی‌های بسیار خاص، از ادعای نقش‌ها به عجله اجتناب کنید.'
            ],
            advanced: 'پیش‌گو را متحد خود در نظر بگیرید و سعی کنید او را به طرف خود داشته باشید؛ به این ترتیب، وقتی نوبت ادعای یک نقش است، رأی پیش‌گو را به نفع خود خواهید داشت.'
        },
        werewolf: {
            name: 'گرگینه',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c96950-4363-11ef-bfb7-a598d323cbfc-card_werewolf.webp',
            ability: 'هیچ قابلیت خاصی ندارد. در طول شب رأی می‌دهد که کدام روستایی را با تیم خود بکشد.',
            tips: [
                'پروفایل پایینی داشته باشید و از طرح هم‌تیمی‌های جدید خود پیروی کنید.',
                'از بی‌گناشی قبلی خود برای منحرف کردن سوءظن استفاده کنید.',
                'مگر در موارد کاملاً ضروری چیزی ادعا نکنید.'
            ],
            advanced: 'یک روستایی معمولی تظاهر کنید و همیشه برای محافظت از هم‌تیمی‌های خود رأی دهید؛ در صورتی که این کار پیروزی تیم شر را تضمین می‌کند، خود را فدا کنید.'
        },
        vampire: {
            name: 'خون‌آشام',
            team: 'evil',
            image: 'https://platoapp.com/images/a8db1c90-4363-11ef-bfb7-a598d323cbfc-card_vampire.webp',
            ability: 'می‌تواند یک بار در بازی با استفاده از خون خود قابلیت دکتر را خنثی کند. رأی او به عنوان صفر محاسبه می‌شود و او فقط به عنوان بد برای پیش‌گو ظاهر می‌شود.',
            tips: [
                'همیشه به عنوان اولین وظیفه، سعی کنید دکتر را در شب اول بکشید.',
                'از آخرین گرگ زنده ماندن اجتناب کنید، زیرا رأی او شمرده نمی‌شود.',
                'نگویید که دکتر هستید؛ می‌توانید به سرعت اعدام شوید.'
            ],
            advanced: 'اگر آخرین گرگ زنده هستید، سعی کنید بدون توجه بمانید و در شروع شب پس از انتخاب کسی برای کشتن به سرعت قطع ارتباط کنید.'
        },
        witch: {
            name: 'جادوگر',
            team: 'evil',
            image: 'https://platoapp.com/images/a8969980-4363-11ef-bfb7-a598d323cbfc-card_witch.webp',
            ability: 'می‌تواند در طول بحث روز یک بازیکن خوب را انتخاب و کارت او را آشکار کند.',
            tips: [
                'همیشه قابلیت خود را در ابتدا برای آشکار کردن یک روستایی که ارزش کشتن دارد استفاده کنید.',
                'پس از آشکارسازی، جادوگر کارایی زیادی ندارد؛ می‌توانید به عنوان طعمه عمل کنید.',
                'به تلاش برای کمک به تیم خود ادامه دهید اما با دانستن اینکه می‌توانید فدا شوید.'
            ],
            advanced: 'اگر دکتر را در حالی که خون‌آشام وجود دارد آشکار می‌کنید، مطمئن شوید که در اسرع وقت او را بکشید؛ در غیر این صورت از کشتن او در شب اول اجتناب کنید.'
        },
        siren: {
            name: 'صفاره',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c28b80-4363-11ef-bfb7-a598d323cbfc-card_siren.webp',
            ability: 'اگر در طول روز اعدام شود، روستاییان قدرت‌های خود را در شب بعدی از دست می‌دهند.',
            tips: [
                'این احتمال وجود دارد که هم‌تیمی‌های شما برای خلاص شدن از شر نقش‌هایی که به سختی می‌توان کشت، شما را بفروشند.',
                'همیشه نقش‌هایی را ادعا کنید که تیم شما نمی‌تواند به راحتی بکشد.',
                'مرگ خود را قبل از هر هم‌تیمی دیگری اولویت دهید. اگر بین شما و یک گرگ دیگر بحث می‌کنند، از مرگ او حمایت نکنید، کاری کنید که این شما باشید که می‌میرید.',
                'تا جایی که می‌توانید زنده بمانید علی‌رغم اینکه مرگ شما مفید است.'
            ],
            advanced: 'در روز اول، اگر نقش‌هایی مانند پادشاه ذکر شدند، سریع ادعا کنید تا روستاییان یک شب و یک روز دیگر بدون قدرت بمانند وقتی شما را می‌کشند.'
        },
        shapeshifter: {
            name: 'دگرپیکر',
            team: 'evil',
            image: 'https://platoapp.com/images/a8ce7260-4363-11ef-bfb7-a598d323cbfc-card_shapeshifter.webp',
            ability: 'در صورت آشکار شدن توسط منادی شهر یا مجذوب شدن توسط شاعر به عنوان روستایی، به عنوان عاشق برای عاشقان، و به طور تصادفی به عنوان خوب یا بد برای پیش‌گو ظاهر می‌شود.',
            tips: [
                'در بازی با عاشقان، ایده‌آل این است که شما اولین نفری باشید که می‌پرسید.',
                'اگر شما را آشکار کنند، باید یک نقش اعلام کنید؛ بیش از 4 ثانیه صبر نکنید.',
                'سعی کنید از خود دفاع کنید و سریع تسلیم نشوید، بر دروغ اصرار کنید.'
            ],
            advanced: 'اگر در میان عاشقان نفوذ کردید، آنها را دستکاری کنید تا پس از مرگ اولی به یکدیگر اعتماد نکنند، و در نتیجه دو روستایی را به طور متوالی حذف کنید.'
        },
        nightmare: {
            name: 'کابوس',
            team: 'evil',
            image: 'https://platoapp.com/images/a8a3b8e0-4363-11ef-bfb7-a598d323cbfc-card_nightmare.webp',
            ability: 'در طول بحث روز، یک بازیکن را برای خواباندن انتخاب می‌کند، و او را از استفاده از قابلیتش در شب بعدی بازمی‌دارد.',
            tips: [
                'قربانی را با دقت انتخاب کنید، با اولویت دادن به نقش‌هایی مانند دکتر بر پیش‌گو.',
                'مطمئن شوید نقشی را که یک هم‌تیمی در تلاش برای دزدیدن آن است به خواب نبرید، زیرا این آنها را در معرض خطر قرار می‌دهد.',
                'بدون دلیل از قابلیت استفاده نکنید؛ وضعیت را تحلیل کنید.',
                'با گرگ‌های دیگر هماهنگ شوید تا از غیرفعال کردن بهترین نقش استفاده کنید.'
            ],
            advanced: 'یک نقش کلیدی را درست قبل از استفاده از قابلیت تصمیم‌گیری‌اش به خواب ببرید، و یک شکست را تحمیل کنید و درهای پیروزی در لحظه آخر را باز کنید.'
        },
        'wolf-shaman': {
            name: 'شامان گرگ',
            team: 'evil',
            image: 'https://platoapp.com/images/a8cc4f80-4363-11ef-bfb7-a598d323cbfc-card_wolfshaman.webp',
            ability: 'می‌تواند یک گرگ را از اعدام در طول روز یک بار در بازی محافظت کند؛ گرگ محافظت‌شده هنگام اعدام نخواهد مرد.',
            tips: [
                'شکاف بین روستاییان مرده و گرگ‌های زنده را متعادل نگه دارید تا حاشیه بیشتری برای پیروزی داشته باشید.',
                'شما نقشی هستید که می‌تواند بقیه گرگ‌ها را برای تضمین پیروزی بفروشد.',
                'مگر در صورتی که این پیروزی فوری را به ارمغان بیاورد، هرگز حفاظت خود را روی صفاره خرج نکنید.',
                'توجه را از خود دور کنید تا قدرت خود را در مناسب‌ترین لحظه استفاده کنید.',
                'با دقت تصمیم بگیرید که چه زمانی از یک هم‌تیمی محافظت کنید یا آن را برای خود نگه دارید.'
            ],
            advanced: 'می‌توانید هم‌تیمی‌های خود را با دزدیدن نقش پیش‌گو و ادعای اینکه آنها را بررسی کرده‌اید بفروشید. وقتی یکی از آنها می‌میرد، روستاییان احتمالاً به شما اعتماد خواهند کرد. از آنجا، بازی را آرام هدایت کنید در حالی که حفاظت خود را ذخیره می‌کنید.'
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
        detailTeam.textContent = role.team === 'good' ? 'نقش خیر' : 'نقش شر';
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
