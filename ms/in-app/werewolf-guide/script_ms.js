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

    // ROLES DATA
    const rolesData = {
        // Good Roles
        seer: {
            name: 'Seer',
            team: 'good',
            image: 'https://platoapp.com/images/a8e44450-4363-11ef-bfb7-a598d323cbfc-card_seer.webp',
            ability: 'Setiap malam, Seer boleh memeriksa pemain untuk mengetahui pasukan mana mereka tergolong. Peranan seperti Alpha Wolf, Shapeshifter, Jester, dan Lycan sebahagian atau sepenuhnya menjejaskan kesahihan maklumat yang boleh diberikan oleh peranan ini.',
            tips: [
                'Baca semua yang dikatakan dengan teliti untuk mengetahui siapa yang hendak diperiksa.',
                'Jangan dedahkan maklumat tanpa sebab. Pastikan tiada peranan seperti Wolf Shaman sebelum mendedahkan maklumat.',
                'Sekiranya ada Assassin, berikan maklumat anda kepada mereka secepat mungkin.',
                'Mempunyai sikap dan buatkan diri anda didengari.'
            ],
            advanced: 'Seer boleh membuat permainan berisiko seperti menuduh secara palsu untuk menekan pemain. Jika mereka mendedahkan diri segera setelah dituduh, adalah penting untuk undur dan memberikan maklumat sebenar; jika tidak, Seer mungkin dianggap serigala.'
        },
        doctor: {
            name: 'Doctor',
            team: 'good',
            image: 'https://platoapp.com/images/a897f910-4363-11ef-bfb7-a598d323cbfc-card_doctor.webp',
            ability: 'Setiap malam, Doctor boleh melindungi pemain atau diri mereka sendiri, menghalang mereka daripada mati jika diserang oleh serigala. Ini mungkin tidak sentiasa berlaku jika ada Vampire; mereka membatalkan Doctor sekali setiap permainan jika orang yang diselamatkan oleh Doctor dibunuh oleh serigala.',
            tips: [
                'Taipkan tindakan awal (contohnya, "Saya Doctor, menyelamatkan PlayerX") dan hantar pada penghujung malam.',
                'Putuskan siapa yang hendak dilindungi berdasarkan maklumat yang ada; lindungi diri anda pada malam-malam lanjut.',
                'Berhati-hati apabila ada peranan yang membatalkan atau mengganggu keupayaan anda (Nightmare, Siren, Vampire).',
                'Setiap kali ada Witch, anda mesti menyelamatkan diri jika tiada peranan lebih penting untuk diselamatkan.'
            ],
            advanced: 'Koordinasikan dengan penduduk kampung lain untuk melindungi peranan utama pada saat-saat genting dan gunakan perlindungan diri anda secara strategik untuk terus hidup hingga akhir. Anda juga boleh merancang cara untuk mengelirukan serigala supaya mereka fikir anda bukan Doctor.'
        },
        knight: {
            name: 'Knight',
            team: 'good',
            image: 'https://platoapp.com/images/a8aa2180-4363-11ef-bfb7-a598d323cbfc-card_knight.webp',
            ability: 'Memiliki perisai yang menyelamatkan mereka sekali setiap permainan daripada serangan serigala. Tidak boleh dilindungi oleh Doctor semasa mereka mempunyai perisai.',
            tips: [
                'Knight tergolong dalam Keluarga Diraja; selagi masih hidup, King tidak boleh dibunuh oleh serigala.',
                'Bertindak sebagai umpan untuk menarik serangan daripada serigala yang tidak tahu dan melindungi penduduk kampung lain.',
                'Ingat bahawa perisai anda diaktifkan secara automatik dan tidak bergabung dengan perlindungan Doctor.'
            ],
            advanced: 'Tipu serigala dengan menyiratkan anda adalah peranan berharga atau terdedah supaya mereka membazirkan serangan, tetapi rancangkan pengumpanan anda supaya tidak menjejaskan Keluarga Diraja. Umpan dengan peranan yang tidak dalam permainan atau telahpun didedahkan.'
        },
        princess: {
            name: 'Princess',
            team: 'good',
            image: 'https://platoapp.com/images/a8d61380-4363-11ef-bfb7-a598d323cbfc-card_princess.webp',
            ability: 'Terselamat daripada lynching semasa siang; apabila keupayaan diaktifkan, kad mereka didedahkan kepada semua pemain.',
            tips: [
                'Princess tergolong dalam Keluarga Diraja; selagi masih hidup, King tidak boleh dibunuh oleh serigala.',
                'Apabila diundi, tuntut peranan berkuasa yang tidak dalam permainan untuk provokasi serigala yang tidak tahu menuntutnya.',
                'Manfaatkan kekebalan lynching anda untuk mendapatkan maklumat tentang siapa yang mengundi anda.',
                'Berhati-hati untuk tidak mengumpan tanpa sebab pada waktu malam bagi melindungi King.',
                'Jangan biarkan diri anda dipilih tanpa sebab, jika anda boleh mengelak daripada diletakkan dalam Perbicaraan, lakukanlah. Me-lynch Princess dianggap membazirkan satu hari.'
            ],
            advanced: 'Apabila dibawa ke Perbicaraan, nyatakan peranan yang tidak dalam permainan; permainan ini boleh menyebabkan serigala yang gementar atau tidak tahu menuntut dan dengan itu mendedahkan diri.'
        },
        hunter: {
            name: 'Hunter',
            team: 'good',
            image: 'https://platoapp.com/images/a8a5dbc0-4363-11ef-bfb7-a598d323cbfc-card_hunter.webp',
            ability: 'Apabila mati pada waktu malam, mempunyai 75% peluang untuk mengambil serigala rawak bersama mereka.',
            tips: [
                'Bertindak sebagai umpan dengan mengumumkan jampian atau pendedahan untuk menghasut serigala menyerang anda.',
                'Minta pemain untuk memutuskan sambungan untuk "mendedahkan" mereka dan dengan itu menipu serigala.',
                'Kekal aktif dan komunikatif untuk memaksimumkan impak peranan palsu anda ke atas serigala.',
                'Mengumpan pada waktu malam berfungsi sebagai alasan ketika mempertahankan peranan anda. Jelaskan bahawa anda mengumpan untuk melihat sama ada mereka akan membunuh anda kerana anda adalah Hunter. (Jahat mungkin menggunakan hujah ini juga)'
            ],
            advanced: 'Berpura-pura menjadi peranan lain yang memaklumkan serigala untuk menarik serangan, tetapi bersedia untuk menarik balik jika ia menjadi tidak produktif.'
        },
        necromancer: {
            name: 'Necromancer',
            team: 'good',
            image: 'https://platoapp.com/images/a8da0b20-4363-11ef-bfb7-a598d323cbfc-card_necromancer.webp',
            ability: 'Boleh membangkitkan penduduk kampung yang mati sekali setiap permainan semasa waktu malam.',
            tips: [
                'Taipkan tindakan awal anda dan hantar sejurus sebelum malam berakhir supaya jelas bahawa ia benar-benar anda.',
                'Gunakan keupayaan anda secepat mungkin; jangan tunggu peranan lebih berharga mati.',
                'Koordinasikan dengan pasukan anda untuk membangkitkan pemain yang keupayaannya menawarkan kelebihan terbesar.'
            ],
            advanced: 'Dalam pertikaian di mana ada serigala menuntut menjadi Necromancer, jika keadaan membenarkan, cadangkan membangkitkan pemain yang berbeza; sesiapa yang menepati janji akan menjadi yang sebenar.'
        },
        king: {
            name: 'King',
            team: 'good',
            image: 'https://platoapp.com/images/a8e359f0-4363-11ef-bfb7-a598d323cbfc-card_king.webp',
            ability: 'Selagi Knight, Princess, atau Jester masih hidup, King tidak boleh dibunuh oleh serigala pada waktu malam. Jika di-lynch, penduduk kampung tidak akan dapat menggunakan keupayaan mereka pada malam berikutnya.',
            tips: [
                'Gunakan kekebalan anda untuk bertindak sebagai umpan pada beberapa malam pertama, mengalihkan serangan daripada serigala.',
                'Jangan dedahkan peranan anda kecuali perlu; kekebalan anda hilang jika ahli Keluarga Diraja mati.',
                'Elakkan di-lynch pada setiap kos, kerana kematian anda meninggalkan pasukan anda tidak berkuasa untuk satu malam.'
            ],
            advanced: 'Berpura-pura menjadi peranan yang memaklumkan serigala untuk menarik perhatian mereka dan cuba dibunuh, dengan itu melindungi peranan lebih penting. Jelaskan apa yang anda lakukan segera jika seseorang menuduh anda.'
        },
        jester: {
            name: 'Jester',
            team: 'good',
            image: 'https://platoapp.com/images/a8bd5b60-4363-11ef-bfb7-a598d323cbfc-card_jester.webp',
            ability: 'Hanya menang jika dibunuh, sama ada semasa siang atau malam. Boleh muncul secara rawak sebagai baik atau jahat kepada Seer.',
            tips: [
                'Jangan membazirkan atau "membakar" peranan orang lain; walaupun syarat kemenangan anda berbeza, anda masih penduduk kampung.',
                'Tipu untuk dibunuh oleh serigala, contohnya dengan memalsukan peranan yang tidak wujud.',
                'Manfaatkan kekeliruan untuk mengekstrak maklumat daripada tindak balas orang lain.',
                'Sentiasa bermain tanpa mengusik atau merosakkan pengalaman bermain orang lain.'
            ],
            advanced: 'Jika mereka mengundi anda pada hari pertama, anda boleh mendedahkan diri sebagai Jester atau nyatakan peranan yang tiada dalam permainan untuk mengorbankan nyawa anda dan cuba membantu pasukan baik.',
            warning: 'Jangan dedahkan peranan sebenar pemain lain hanya untuk menang — ini memaksa orang yang tidak bersalah mempertahankan diri mereka tanpa sebab dan boleh merosakkan permainan mereka. Jika anda ingin menuntut sesuatu, sentiasa pilih peranan yang tidak ada dalam permainan.'
        },
        lycan: {
            name: 'Lycan',
            team: 'good',
            image: 'https://platoapp.com/images/a8e073c0-4363-11ef-bfb7-a598d323cbfc-card_lycan.webp',
            ability: 'Penduduk kampung yang terkutuk yang, jika dibunuh pada waktu malam oleh serigala, bertukar menjadi Werewolf. Seer melihat mereka sebagai penduduk kampung sebelum mereka bertukar, dan maklumat ini tidak berubah.',
            tips: [
                'Nilai pasukan mana yang anda mahu bermain; pada mulanya, anda sentiasa sekadar penduduk kampung lain.',
                'Sebelum mengkhianati, pastikan anda boleh mempercayai serigala; mereka mungkin menipu anda.',
                'Kekal profil rendah sehingga memutuskan kesetiaan muktamad anda.'
            ],
            advanced: 'Runding dengan serigala untuk mengoordinasikan pertukaran anda dan mencapai kemenangan, tetapi ada pelan alternatif sekiranya berlaku pengkhianatan.',
            warning: 'Anda adalah penduduk kampung sehingga anda bertukar. Memaksa penduduk kampung lain mendedahkan peranan mereka untuk kepentingan anda sendiri boleh secara langsung menyebabkan pasukan baik kalah — dan kerana anda adalah sebahagian daripada pasukan itu sehingga anda bertukar, anda juga kalah.'
        },
        mayor: {
            name: 'Mayor',
            team: 'good',
            image: 'https://platoapp.com/images/a8c79490-4363-11ef-bfb7-a598d323cbfc-card_mayor.webp',
            ability: 'Undian mereka dikira berganda dalam semua fasa mengundi.',
            tips: [
                'Anda mesti berhati-hati; rekod mengundi boleh menunjukkan siapa Mayor.',
                'Berikan perhatian melampau kepada semua yang dikatakan, kerana undian anda secara drastik mengubah perjalanan permainan.',
                'Gunakan undian berganda anda untuk membimbing pengundian ke arah suspek atau pemain yang disahkan.',
                'Anda boleh berkhidmat sebagai umpan pada waktu malam, walaupun faedahnya terhad.'
            ],
            advanced: 'Sahkan siapa yang berbohong dengan menyemak sembang dan sejarah mengundi, dan hadapi penipu dengan pengaruh mengundi anda.'
        },
        assassin: {
            name: 'Assassin',
            team: 'good',
            image: 'https://platoapp.com/images/a8e1d350-4363-11ef-bfb7-a598d323cbfc-card_assassin.webp',
            ability: 'Boleh membunuh pemain sekali setiap permainan semasa waktu malam.',
            tips: [
                'Sentiasa gunakan keupayaan anda pada malam pertama untuk menghapuskan serigala yang mungkin.',
                'Utamakan sasaran yang disahkan oleh Seer atau dengan tingkah laku mencurigakan.',
                'Jangan membunuh secara rawak; kesilapan mungkin memudaratkan pasukan anda.',
                'Jika seseorang menyatakan peranan anda, tuntutnya; setiap peranan dituntut dan Assassin tidak terkecuali.'
            ],
            advanced: 'Pastikan anda sentiasa menaip awal siapa yang anda akan bunuh supaya tiada siapa boleh mencuri peranan anda (Contoh: "Saya assa saya bunuh PlayerX"). Koordinasikan dengan peranan maklumat untuk melaksanakan serigala.'
        },
        'town-crier': {
            name: 'Town Crier',
            team: 'good',
            image: 'https://platoapp.com/images/a8ddb4a0-4363-11ef-bfb7-a598d323cbfc-card_towncrier.webp',
            ability: 'Memilih pemain semasa waktu malam; jika mereka mati, peranan pemain yang dipilih akan didedahkan kepada semua orang. Ketahui bahawa Shapeshifter muncul dengan peranan baik yang lain apabila didedahkan oleh Town Crier.',
            tips: [
                'Gunakan pilihan anda dengan berhati-hati untuk memberikan maklumat jika anda mati.',
                'Sentiasa beri perhatian supaya tidak memilih seseorang yang telahpun mendedahkan peranan mereka.',
                'Bertindak sebagai umpan dengan mengumumkan tindakan palsu untuk mengelirukan serigala.'
            ],
            advanced: 'Jika anda percaya anda adalah sasaran seterusnya, cuba pilih pemain utama supaya kematian anda mendedahkan maklumat berharga kepada pasukan anda.'
        },
        lovers: {
            name: 'Lovers',
            team: 'good',
            image: 'https://platoapp.com/images/a8d57740-4363-11ef-bfb7-a598d323cbfc-card_lovers.webp',
            ability: '2 pemain dipilih dan kedua-duanya melihat kad mereka. Kedua-duanya berkongsi Devotion, keupayaan yang membuat mereka tahan satu serangan serigala. Ketahui bahawa Shapeshifter muncul sebagai Lover kepada kedua-duanya.',
            tips: [
                'Jangan dedahkan kekasih anda yang lain jika anda mesti nyatakan peranan anda; lindungi mereka dengan mengekalkan mereka tersembunyi.',
                'Jika ada Shapeshifter, berhubung awal dan tanya siapa kekasih ketiga.',
                'Kekalkan komunikasi dengan rakan kongsi anda untuk mengundi bersama.'
            ],
            advanced: 'Analisis jawapan Lover ketiga dengan teliti apabila anda bertanya; Shapeshifter mungkin menjawab dengan betul atau cuba mendahului anda. Sentiasa mengundi bersama.'
        },
        druid: {
            name: 'Druid',
            team: 'good',
            image: 'https://platoapp.com/images/a8e8ff40-4363-11ef-bfb7-a598d323cbfc-card_druid.webp',
            ability: 'Memilih pemain semasa waktu malam; jika mereka mati pada malam itu, pemain yang dipilih juga mati. Ketahui bahawa ia tidak boleh memilih pemain yang didedahkan oleh Mystic atau Town Crier.',
            tips: [
                'Sentiasa pilih seseorang, jangan biarkan diri anda dibunuh tanpa mengambil seseorang bersama anda, tetapi pilih dengan teliti siapa yang hendak dibawa; ia adalah peranan berisiko.',
                'Anda boleh mengumpan dengan menyiratkan anda adalah peranan berharga untuk dibunuh.',
                'Berikan perhatian rapat untuk mengesan serigala yang mungkin dan menandakan mereka.'
            ],
            advanced: 'Umpan dengan seseorang yang spesifik dan tandakan mereka pada masa yang sama. Jika pemain yang anda umpan adalah serigala, mereka mungkin akan mengundi anda segera, yang boleh membawa kepada anda membunuh serigala.'
        },
        mystic: {
            name: 'Mystic',
            team: 'good',
            image: 'https://platoapp.com/images/a8b5ba40-4363-11ef-bfb7-a598d323cbfc-card_mystic.webp',
            ability: 'Memilih pemain AFK (memutuskan sambungan) semasa waktu malam untuk mendedahkan kad mereka kepada semua pemain.',
            tips: [
                'Taipkan awal dan gunakan keupayaan anda secara aktif; jangan tunggu orang lain memutuskan sambungan.',
                'Mintalah dengan sikap supaya pemain memutuskan sambungan sebentar untuk didedahkan.',
                'Hantar mesej sejurus sebelum mendedahkan supaya tiada serigala menuntut tindakan anda.',
                'Jangan paksa dengan satu pemain sahaja; jika yang pertama yang anda tanya tidak pergi AFK atau menunjukkan niat untuk berbuat demikian, tanya pemain lain dengan cepat.'
            ],
            advanced: 'Minta beberapa pemain secara langsung untuk keluar dan nilai tindak balas serta tingkah laku mereka untuk mendedahkan yang paling mencurigakan.'
        },
        thief: {
            name: 'Thief',
            team: 'good',
            image: 'https://platoapp.com/images/a8de29d0-4363-11ef-bfb7-a598d323cbfc-card_thief.webp',
            ability: 'Boleh mencuri undian mana-mana pemain semasa waktu malam, dua kali setiap permainan.',
            tips: [
                'Simpan keupayaan untuk saat-saat genting; jangan mencuri undian secara rawak.',
                'Analisis permainan dan pilih pemain yang undiannya boleh mengubah perjalanan permainan.',
                'Elakkan mencuri secara rawak pada beberapa malam pertama. Kemudian, orang jahat boleh menuntut peranan anda dan anda tidak akan mempunyai cara untuk membuktikan kepolosan anda.'
            ],
            advanced: 'Gunakan keupayaan anda untuk menghalang serigala memenangi undian utama.'
        },
        harlot: {
            name: 'Harlot',
            team: 'good',
            image: 'https://platoapp.com/images/a8d32d50-4363-11ef-bfb7-a598d323cbfc-card_harlot.webp',
            ability: 'Menggoda pemain semasa waktu malam; jika pemain itu baik, Harlot dilindungi, tetapi jika pemain itu mati atau adalah serigala, Harlot mati.',
            tips: [
                'Goda untuk mengesahkan peranan dan mengekstrak maklumat berharga.',
                'Tanya secara berhati-hati pemain yang digoda untuk peranan mereka; serigala mungkin menuntut dan didedahkan.',
                'Jangan sekali-kali goda jika kematian anda memberikan kemenangan kepada serigala. Contoh: Hari 1 penduduk kampung dibunuh, Malam 1 anda tidak boleh menggoda kerana orang jahat akan menang dari segi majoriti.'
            ],
            advanced: 'Jika anda mati tanpa menggoda dan tiada peranan maklumat yang tinggal, tuduh seseorang sebagai serigala dan tarik balik segera jika mereka mempertahankan diri dengan pantas.'
        },
        bard: {
            name: 'Bard',
            team: 'good',
            image: 'https://platoapp.com/images/a8c6d140-4363-11ef-bfb7-a598d323cbfc-card_bard.webp',
            ability: 'Boleh mempesona pemain lain sekali setiap permainan; kedua-duanya akan melihat kad mereka. Ketahui bahawa Shapeshifter akan muncul dengan peranan penduduk kampung yang lain.',
            tips: [
                'Taipkan awal "Saya Bard, mempesona PlayerX" beberapa saat sebelum malam berakhir.',
                'Jika ada Shapeshifter, selepas mempesona seseorang, minta pemain itu menyatakan peranan mereka.',
                'Pilih sasaran yang boleh memberikan maklumat berharga.'
            ],
            advanced: 'Dalam permainan dengan Wolf Shaman, katakan anda mempesona tanpa mendedahkan nama pemain; dengan cara itu jika anda mempesona serigala yang kekal senyap, anda boleh membunuh mereka tanpa masalah.'
        },
        // Evil Roles
        alpha: {
            name: 'Alpha Wolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a88d4ab0-4363-11ef-bfb7-a598d323cbfc-card_alphawolf.webp',
            ability: 'Muncul sebagai baik di mata Seer, menyukarkan pengesanan.',
            tips: [
                'Terus hidup selama mungkin; Seer tidak dapat menemui anda.',
                'Anggap Seer sebagai sekutu; jangan sekali-kali mencuri peranan mereka kecuali benar-benar perlu.',
                'Elakkan menuntut peranan terburu-buru kecuali dalam permainan yang sangat spesifik.'
            ],
            advanced: 'Anggap Seer sebagai sekutu anda dan cuba mempunyai mereka di pihak anda; dengan cara itu, apabila tiba masanya untuk anda menuntut peranan, anda akan mempunyai undian Seer menyokong anda.'
        },
        werewolf: {
            name: 'Werewolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c96950-4363-11ef-bfb7-a598d323cbfc-card_werewolf.webp',
            ability: 'Tidak mempunyai keupayaan khas. Mengundi pada waktu malam penduduk kampung mana yang hendak dibunuh bersama pasukan mereka.',
            tips: [
                'Kekal profil rendah dan ikut rancangan rakan sepasukan baru anda.',
                'Manfaatkan kejahilan anda sebelumnya untuk mengalihkan syak wasangka.',
                'Jangan menuntut apa-apa kecuali benar-benar perlu.'
            ],
            advanced: 'Berpura-pura menjadi penduduk kampung biasa dan sentiasa mengundi untuk melindungi rakan sepasukan anda; korbankan diri jika berbuat demikian menjamin kemenangan untuk Pasukan Jahat.'
        },
        vampire: {
            name: 'Vampire',
            team: 'evil',
            image: 'https://platoapp.com/images/a8db1c90-4363-11ef-bfb7-a598d323cbfc-card_vampire.webp',
            ability: 'Boleh menangani keupayaan Doctor sekali setiap permainan menggunakan darah mereka. Undian mereka dikira sebagai sifar dan mereka hanya muncul sebagai jahat kepada Seer.',
            tips: [
                'Sentiasa sebagai tugas pertama, cuba bunuh Doctor pada malam pertama.',
                'Elakkan menjadi serigala terakhir yang hidup, kerana undian anda tidak dikira.',
                'Jangan katakan anda adalah Doctor; anda mungkin di-lynch dengan pantas.'
            ],
            advanced: 'Jika anda adalah serigala terakhir yang hidup, cuba tidak menonjol dan memutuskan sambungan dengan pantas pada permulaan malam selepas memilih seseorang untuk dibunuh.'
        },
        witch: {
            name: 'Witch',
            team: 'evil',
            image: 'https://platoapp.com/images/a8969980-4363-11ef-bfb7-a598d323cbfc-card_witch.webp',
            ability: 'Boleh memilih dan mendedahkan kad pemain baik semasa Perbincangan Siang.',
            tips: [
                'Sentiasa gunakan keupayaan anda pada permulaan untuk mendedahkan penduduk kampung yang berbaloi dibunuh.',
                'Selepas mendedahkan, Witch tidak mempunyai banyak kegunaan lagi; anda boleh berkhidmat sebagai umpan.',
                'Terus cuba membantu pasukan anda tetapi mengetahui anda boleh dibuang.'
            ],
            advanced: 'Jika anda mendedahkan Doctor sementara ada Vampire, pastikan untuk membunuh mereka secepat yang anda boleh; jika tidak elakkan membunuh mereka pada malam pertama.'
        },
        siren: {
            name: 'Siren',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c28b80-4363-11ef-bfb7-a598d323cbfc-card_siren.webp',
            ability: 'Jika di-lynch semasa siang, penduduk kampung kehilangan kuasa mereka pada malam berikutnya.',
            tips: [
                'Ada kemungkinan rakan sepasukan anda menjual anda untuk menyingkirkan peranan yang sukar dibunuh.',
                'Sentiasa tuntut peranan yang pasukan anda tidak boleh bunuh dengan mudah.',
                'Utamakan kematian anda sebelum mana-mana rakan sepasukan lain. Jika mereka membincangkan antara anda atau serigala rakan, jangan sokong kematian mereka, lakukan sesuatu supaya andalah yang mati.',
                'Cuba terus hidup selama mungkin walaupun kematian anda adalah bermanfaat.'
            ],
            advanced: 'Pada hari pertama, jika peranan seperti King disebut, tuntut dengan pantas supaya penduduk kampung ditinggalkan tanpa kuasa satu malam dan satu lagi hari berikutnya apabila mereka membunuh anda.'
        },
        shapeshifter: {
            name: 'Shapeshifter',
            team: 'evil',
            image: 'https://platoapp.com/images/a8ce7260-4363-11ef-bfb7-a598d323cbfc-card_shapeshifter.webp',
            ability: 'Muncul sebagai penduduk kampung jika didedahkan oleh Town Crier atau dipesona oleh Bard, sebagai Lover kepada Lovers, dan secara rawak sebagai baik atau jahat kepada Seer.',
            tips: [
                'Dalam permainan dengan Lovers, anda sepatutnya menjadi orang pertama yang bertanya.',
                'Jika mereka mendedahkan anda, anda mesti nyatakan peranan; jangan tunggu lebih daripada 4 saat.',
                'Cuba mempertahankan diri dan jangan berputus asa dengan cepat, berkeras dengan pembohongan.'
            ],
            advanced: 'Jika anda menyusup di kalangan Lovers, manipulasikan mereka supaya mereka tidak percaya antara satu sama lain selepas kematian yang pertama, menghapuskan dua penduduk kampung secara berturut-turut.'
        },
        nightmare: {
            name: 'Nightmare',
            team: 'evil',
            image: 'https://platoapp.com/images/a8a3b8e0-4363-11ef-bfb7-a598d323cbfc-card_nightmare.webp',
            ability: 'Semasa Perbincangan Siang, memilih pemain untuk tidur, menghalang mereka daripada menggunakan keupayaan mereka pada malam berikutnya.',
            tips: [
                'Pilih mangsa dengan berhati-hati, mengutamakan peranan seperti Doctor berbanding Seer.',
                'Pastikan untuk tidak menidurkan peranan yang sedang cuba dicuri oleh rakan sepasukan, kerana itu mendedahkan mereka.',
                'Jangan gunakan keupayaan tanpa sebab; analisis keadaan.',
                'Koordinasikan dengan serigala lain untuk memanfaatkan melumpuhkan peranan terbaik.'
            ],
            advanced: 'Letakkan peranan utama tidur sejurus sebelum mereka menggunakan keupayaan muktamad mereka, memaksa kegagalan dan membuka pintu kepada kemenangan saat akhir.'
        },
        'wolf-shaman': {
            name: 'Wolf Shaman',
            team: 'evil',
            image: 'https://platoapp.com/images/a8cc4f80-4363-11ef-bfb7-a598d323cbfc-card_wolfshaman.webp',
            ability: 'Boleh melindungi serigala daripada di-lynch semasa siang sekali setiap permainan; serigala yang dilindungi tidak akan mati apabila di-lynch.',
            tips: [
                'Jaga jurang antara penduduk kampung yang mati dan serigala yang hidup seimbang untuk mempunyai margin kemenangan yang lebih besar.',
                'Anda adalah peranan yang boleh menjual baki serigala untuk memastikan kemenangan.',
                'Jangan sekali-kali membelanjakan perlindungan anda pada Siren kecuali ini memberikan kemenangan segera.',
                'Alihkan perhatian daripada diri anda untuk menggunakan kuasa anda pada saat yang paling sesuai.',
                'Putuskan dengan berhati-hati bila hendak melindungi rakan sepasukan atau menyimpannya untuk diri sendiri.'
            ],
            advanced: 'Anda boleh menjual rakan sepasukan anda dengan mencuri peranan Seer dan mengatakan anda memeriksa seseorang. Apabila salah seorang daripada mereka mati, penduduk kampung mungkin akan mempercayai anda. Dari situ, pimpin permainan dengan tenang sambil menyimpan perlindungan anda sebagai simpanan.'
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
        detailTeam.textContent = role.team === 'good' ? 'Peranan Baik' : 'Peranan Jahat';
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
