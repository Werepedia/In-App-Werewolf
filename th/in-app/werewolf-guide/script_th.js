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

    // ROLES DATA (THAI TRANSLATION)
    const rolesData = {
        // Good Roles
        seer: {
            name: 'Seer',
            team: 'good',
            image: 'https://platoapp.com/images/a8e44450-4363-11ef-bfb7-a598d323cbfc-card_seer.webp',
            ability: 'ทุกคืน Seer สามารถตรวจสอบผู้เล่นเพื่อรู้ว่าพวกเขาอยู่ในทีมไหน บทบาทอย่าง Alpha Wolf, Shapeshifter, Jester และ Lycan ส่งผลบางส่วนหรือทั้งหมดต่อความน่าเชื่อถือของข้อมูลที่บทบาทนี้สามารถให้ได้',
            tips: [
                'อ่านทุกสิ่งที่พูดอย่างละเอียดเพื่อตัดสินใจว่าจะตรวจสอบใคร',
                'อย่าเปิดเผยข้อมูลโดยไม่จำเป็น ตรวจสอบให้แน่ใจว่าไม่มีบทบาทอย่าง Wolf Shaman ก่อนที่จะเปิดเผยข้อมูล',
                'หากมี Assassin ให้ส่งข้อมูลของคุณให้พวกเขาโดยเร็วที่สุดเท่าที่จะทำได้',
                'มีท่าทีมั่นใจและทำให้ตัวเองได้รับการยอมรับ'
            ],
            advanced: 'Seer สามารถเล่นอย่างเสี่ยงได้ เช่น การอ้างบทบาทปลอม/กล่าวหาเท็จเพื่อกดดันผู้เล่น หากพวกเขาเปิดเผยตัวเองทันทีเมื่อถูกกล่าวหา สิ่งสำคัญคือต้องถอยกลับและให้ข้อมูลที่แท้จริง ไม่เช่นนั้น Seer อาจถูกมองว่าเป็นหมาป่า'
        },
        doctor: {
            name: 'Doctor',
            team: 'good',
            image: 'https://platoapp.com/images/a897f910-4363-11ef-bfb7-a598d323cbfc-card_doctor.webp',
            ability: 'ทุกคืน Doctor สามารถปกป้องผู้เล่นคนหนึ่งหรือตัวเอง ป้องกันไม่ให้พวกเขาตายหากถูกหมาป่าโจมตี อาจไม่เป็นเช่นนั้นเสมอไปหากมี Vampire อยู่ในเกม เพราะ Vampire สามารถยกเลิกความสามารถของ Doctor ได้หนึ่งครั้งต่อเกม หากผู้ที่ได้รับการช่วยถูกหมาป่าฆ่า',
            tips: [
                'พิมพ์การกระทำของคุณไว้ล่วงหน้า (เช่น "ฉันคือ Doctor กำลังช่วย PlayerX") แล้วส่งตอนสิ้นสุดคืน ตรวจสอบให้แน่ใจว่าคุณช่วยผู้เล่นนั้นจริงๆ ไม่เช่นนั้นคุณจะเปิดเผยโดยไม่มีเหตุผลและอาจกลายเป็นเป้าหมายถัดไป',
                'ตัดสินใจว่าจะปกป้องใครโดยอาศัยข้อมูลที่มี ปกป้องตัวเองในคืนที่สถานการณ์ซับซ้อนขึ้น',
                'ระวังบทบาทที่ยกเลิกหรือรบกวนความสามารถของคุณ (Nightmare, Siren, Vampire)',
                'เมื่อมี Witch อยู่ คุณต้องปกป้องตัวเองหากไม่มีบทบาทที่สำคัญกว่าต้องปกป้อง'
            ],
            advanced: 'ประสานงานกับชาวบ้านคนอื่นเพื่อปกป้องบทบาทสำคัญในช่วงวิกฤต และใช้การปกป้องตัวเองอย่างชาญฉลาดเพื่อให้รอดถึงตอนท้าย คุณยังสามารถคิดหาวิธีทำให้หมาป่าเข้าใจผิดว่าคุณไม่ใช่ Doctor'
        },
        knight: {
            name: 'Knight',
            team: 'good',
            image: 'https://platoapp.com/images/a8aa2180-4363-11ef-bfb7-a598d323cbfc-card_knight.webp',
            ability: 'มีโล่ที่ช่วยชีวิตได้หนึ่งครั้งต่อเกมจากการโจมตีของหมาป่า ไม่สามารถถูกปกป้องโดย Doctor ในขณะที่ยังมีโล่อยู่',
            tips: [
                'Knight อยู่ในราชวงศ์ ตราบใดที่ยังมีชีวิตอยู่ King จะไม่สามารถถูกหมาป่าฆ่าได้',
                'แสดงตัวเป็นเหยื่อล่อเพื่อดึงดูดการโจมตีจากหมาป่าที่ไม่ทันระวัง และปกป้องชาวบ้านคนอื่น',
                'จำไว้ว่าโล่จะทำงานอัตโนมัติและไม่ทับซ้อนกับการปกป้องของ Doctor'
            ],
            advanced: 'หลอกหมาป่าโดยทำท่าทีว่าคุณเป็นบทบาทที่มีค่าหรือเปราะบาง เพื่อให้พวกเขาเสียการโจมตีไปเปล่าๆ แต่วางแผนการล่อให้ดีเพื่อไม่ให้กระทบต่อราชวงศ์ ใช้บทบาทที่ไม่มีในเกมหรือที่ถูกเปิดเผยไปแล้วในการล่อ หากจำเป็น ให้ชี้แจงภายหลังว่าคุณทำเพราะคุณคือ Knight'
        },
        princess: {
            name: 'Princess',
            team: 'good',
            image: 'https://platoapp.com/images/a8d61380-4363-11ef-bfb7-a598d323cbfc-card_princess.webp',
            ability: 'รอดพ้นจากการถูกแขวนคอในตอนกลางวัน เมื่อความสามารถนี้ทำงาน การ์ดของเธอจะถูกเปิดเผยให้ผู้เล่นทุกคนเห็น',
            tips: [
                'Princess อยู่ในราชวงศ์ ตราบใดที่ยังมีชีวิตอยู่ King จะไม่สามารถถูกหมาป่าฆ่าได้',
                'เมื่อถูกโหวต ให้อ้างบทบาทที่ทรงพลังซึ่งไม่มีในเกม เพื่อยั่วยุให้หมาป่าที่ไม่ระวังอ้างบทบาทนั้นตาม',
                'ใช้ภูมิคุ้มกันจากการแขวนคอให้เป็นประโยชน์เพื่อดูว่าใครโหวตให้คุณ',
                'ระวังอย่าล่อโดยไม่มีเหตุผลในช่วงกลางคืนเพื่อปกป้อง King',
                'อย่าปล่อยให้ตัวเองถูกเลือกโดยไม่จำเป็น หากสามารถหลีกเลี่ยงการขึ้นศาลได้ ให้ทำ การแขวนคอ Princess ถือว่าเป็นการเสียวันไปเปล่าๆ'
            ],
            advanced: 'เมื่อถูกนำขึ้นศาล ให้ระบุบทบาทที่ไม่มีในเกม การเล่นนี้อาจทำให้หมาป่าที่ตื่นเต้นหรือเผลอเรออ้างบทบาทนั้นและเปิดเผยตัวเอง'
        },
        hunter: {
            name: 'Hunter',
            team: 'good',
            image: 'https://platoapp.com/images/a8a5dbc0-4363-11ef-bfb7-a598d323cbfc-card_hunter.webp',
            ability: 'เมื่อตายในตอนกลางคืน มีโอกาส 75% ที่จะพาหมาป่าสุ่มคนหนึ่งไปด้วย',
            tips: [
                'แสดงตัวเป็นเหยื่อล่อโดยประกาศคาถาหรือการเปิดเผยเพื่อยุยงให้หมาป่ามาโจมตีคุณ',
                'ขอให้ผู้เล่นตัดการเชื่อมต่อเพื่อ "เปิดเผย" พวกเขา และหลอกหมาป่าด้วยวิธีนี้',
                'อยู่อย่างกระตือรือร้นและสื่อสารเพื่อเพิ่มผลกระทบจากบทบาทปลอมที่คุณแสดง',
                'การล่อในช่วงกลางคืนเป็นข้ออ้างที่ดีเมื่อปกป้องบทบาทของตัวเอง อธิบายว่าคุณล่อเพื่อดูว่าพวกเขาจะฆ่าคุณหรือไม่เพราะคุณคือ Hunter (ฝ่ายร้ายอาจใช้ข้อโต้แย้งนี้เช่นกัน)'
            ],
            advanced: 'แกล้งทำเป็นบทบาทอื่นที่กระตุ้นให้หมาป่าสนใจและมาโจมตี แต่เตรียมพร้อมที่จะถอยกลับหากมันเริ่มส่งผลเสีย'
        },
        necromancer: {
            name: 'Necromancer',
            team: 'good',
            image: 'https://platoapp.com/images/a8da0b20-4363-11ef-bfb7-a598d323cbfc-card_necromancer.webp',
            ability: 'สามารถปลุกชีวิตชาวบ้านที่ตายไปแล้วได้หนึ่งครั้งต่อเกมในตอนกลางคืน',
            tips: [
                'พิมพ์การกระทำของคุณล่วงหน้าและส่งก่อนสิ้นสุดคืนเล็กน้อย เพื่อให้ชัดเจนว่าเป็นคุณจริงๆ',
                'ใช้ความสามารถโดยเร็วที่สุด อย่ารอให้บทบาทที่มีค่ากว่าตายก่อน',
                'ประสานงานกับทีมเพื่อปลุกผู้เล่นที่ความสามารถของเขาให้ประโยชน์สูงสุด'
            ],
            advanced: 'ในข้อพิพาทที่มีหมาป่าอ้างตัวเป็น Necromancer หากสถานการณ์เปิดโอกาส ให้เสนอปลุกผู้เล่นที่แตกต่างกัน ใครที่ทำตามสัญญาคือคนจริง'
        },
        king: {
            name: 'King',
            team: 'good',
            image: 'https://platoapp.com/images/a8e359f0-4363-11ef-bfb7-a598d323cbfc-card_king.webp',
            ability: 'ตราบใดที่ Knight, Princess หรือ Jester ยังมีชีวิต King จะไม่สามารถถูกหมาป่าฆ่าในตอนกลางคืนได้ หากถูกแขวนคอ ชาวบ้านจะไม่สามารถใช้ความสามารถของตนในคืนถัดไป',
            tips: [
                'ใช้ภูมิคุ้มกันของคุณเพื่อแสดงตัวเป็นเหยื่อล่อในช่วงคืนแรกๆ เพื่อเบี่ยงเบนการโจมตีของหมาป่า',
                'อย่าเปิดเผยบทบาทของคุณหากไม่จำเป็น ภูมิคุ้มกันจะหายไปหากสมาชิกราชวงศ์เสียชีวิต',
                'หลีกเลี่ยงการถูกแขวนคอทุกวิถีทาง เพราะการตายของคุณทำให้ทีมหยุดใช้ความสามารถหนึ่งคืน'
            ],
            advanced: 'แกล้งทำเป็นบทบาทที่กระตุ้นความสนใจของหมาป่าเพื่อดึงดูดพวกเขาและพยายามให้ถูกฆ่า เพื่อปกป้องบทบาทที่สำคัญกว่า หากมีคนกล่าวหาคุณ ให้ชี้แจงสิ่งที่คุณทำทันที'
        },
        jester: {
            name: 'Jester',
            team: 'good',
            image: 'https://platoapp.com/images/a8bd5b60-4363-11ef-bfb7-a598d323cbfc-card_jester.webp',
            ability: 'ชนะก็ต่อเมื่อถูกฆ่าเท่านั้น ไม่ว่าจะในเวลากลางวันหรือกลางคืน สามารถปรากฏแบบสุ่มว่าเป็นฝ่ายดีหรือฝ่ายร้ายต่อ Seer',
            tips: [
                'อย่าเปิดเผยหรือ "เผาทำลาย" บทบาทของผู้อื่น แม้เงื่อนไขชัยชนะของคุณจะต่างออกไป คุณก็ยังเป็นชาวบ้าน',
                'หลอกลวงเพื่อให้ถูกหมาป่าฆ่า เช่น แกล้งทำเป็นบทบาทที่ไม่มีในเกม',
                'ใช้ประโยชน์จากความสับสนในการดึงข้อมูลจากปฏิกิริยาของผู้อื่น หากต้องการ คุณช่วยให้ทีมอื่นชนะได้',
                'เล่นเสมอโดยไม่ทรอลหรือทำลายประสบการณ์ของผู้อื่น'
            ],
            advanced: 'หากพวกเขาโหวตให้คุณในวันแรก คุณสามารถเปิดเผยตัวเองว่าเป็น Jester หรือระบุบทบาทที่ไม่มีในเกมเพื่อสละชีวิตและพยายามช่วยทีมฝ่ายดี',
            warning: 'อย่าเปิดเผยบทบาทจริงของผู้เล่นคนอื่นเพียงเพื่อให้ได้ชัยชนะ — นี่บังคับให้ผู้บริสุทธิ์ต้องปกป้องตัวเองโดยไม่จำเป็นและอาจทำลายเกมของพวกเขา หากต้องการอ้างอะไร ให้เลือกบทบาทที่ไม่มีในเกมเสมอ'
        },
        lycan: {
            name: 'Lycan',
            team: 'good',
            image: 'https://platoapp.com/images/a8e073c0-4363-11ef-bfb7-a598d323cbfc-card_lycan.webp',
            ability: 'ชาวบ้านที่ถูกสาปแช่ง หากถูกหมาป่าฆ่าในตอนกลางคืนจะกลายเป็น Werewolf Seer จะเห็นพวกเขาเป็นชาวบ้านก่อนที่จะแปรร่าง และข้อมูลนี้ไม่เปลี่ยนแปลง',
            tips: [
                'ประเมินว่าคุณต้องการเล่นกับทีมไหน ในตอนเริ่มต้นคุณเป็นแค่ชาวบ้านธรรมดาเสมอ',
                'ก่อนจะทรยศ ตรวจสอบให้แน่ใจว่าคุณไว้วางใจหมาป่าได้ พวกเขาอาจหลอกคุณ',
                'อยู่อย่างเงียบๆ จนกว่าจะตัดสินใจความจงรักภักดีที่แน่วแน่'
            ],
            advanced: 'เจรจากับหมาป่าเพื่อประสานงานการแปรร่างและคว้าชัยชนะ แต่มีแผนสำรองไว้ในกรณีที่ถูกทรยศ',
            warning: 'คุณคือชาวบ้านจนกว่าจะแปรร่าง การบังคับให้ชาวบ้านคนอื่นเปิดเผยบทบาทเพื่อประโยชน์ของตัวเองอาจทำให้ทีมฝ่ายดีพ่ายแพ้โดยตรง — และเนื่องจากคุณเป็นส่วนหนึ่งของทีมนั้นจนกว่าจะแปรร่าง คุณก็แพ้ด้วย'
        },
        mayor: {
            name: 'Mayor',
            team: 'good',
            image: 'https://platoapp.com/images/a8c79490-4363-11ef-bfb7-a598d323cbfc-card_mayor.webp',
            ability: 'คะแนนโหวตของพวกเขานับเป็นสองเท่าในทุกช่วงการโหวต',
            tips: [
                'ต้องระมัดระวัง ประวัติการโหวตสามารถเปิดเผยว่าใครคือ Mayor',
                'ให้ความสนใจอย่างสุดขีดกับทุกสิ่งที่พูด เพราะคะแนนโหวตของคุณเปลี่ยนแปลงเส้นทางของเกมได้อย่างมาก',
                'ใช้คะแนนโหวตสองเท่าเพื่อนำทิศทางการโหวตไปยังผู้ที่น่าสงสัยหรือผู้ที่ได้รับการยืนยัน',
                'คุณสามารถใช้เป็นเหยื่อล่อในช่วงกลางคืนได้ แม้ประโยชน์จะจำกัด'
            ],
            advanced: 'ตรวจสอบว่าใครโกหกโดยดูจากประวัติแชทและการโหวต และเผชิญหน้ากับผู้แทรกซึมโดยใช้อิทธิพลคะแนนโหวตของคุณ'
        },
        assassin: {
            name: 'Assassin',
            team: 'good',
            image: 'https://platoapp.com/images/a8e1d350-4363-11ef-bfb7-a598d323cbfc-card_assassin.webp',
            ability: 'สามารถลอบสังหารผู้เล่นได้หนึ่งครั้งต่อเกมในตอนกลางคืน',
            tips: [
                'ใช้ความสามารถของคุณในคืนแรกเสมอเพื่อกำจัดหมาป่าที่อาจเป็นไปได้',
                'ให้ความสำคัญกับเป้าหมายที่ถูกยืนยันโดย Seer หรือที่มีพฤติกรรมน่าสงสัย',
                'อย่าฆ่าแบบสุ่ม ความผิดพลาดอาจทำให้ทีมของคุณเสียหาย',
                'หากมีคนระบุบทบาทของคุณ ให้อ้างมัน ทุกบทบาทมีคนอ้าง และ Assassin ก็ไม่ต่างกัน'
            ],
            advanced: 'ตรวจสอบให้แน่ใจว่าพิมพ์ชื่อเป้าหมายไว้ล่วงหน้าเสมอเพื่อไม่ให้ใครขโมยบทบาทของคุณได้ (เช่น "ฉันคือ assa ฉันฆ่า PlayerX") ประสานงานกับบทบาทด้านข้อมูลเพื่อกำจัดหมาป่า'
        },
        'town-crier': {
            name: 'Town Crier',
            team: 'good',
            image: 'https://platoapp.com/images/a8ddb4a0-4363-11ef-bfb7-a598d323cbfc-card_towncrier.webp',
            ability: 'เลือกผู้เล่นในตอนกลางคืน หากผู้เล่นนั้นตาย บทบาทของผู้เล่นที่ถูกเลือกจะถูกเปิดเผยให้ทุกคนเห็น รู้ว่า Shapeshifter จะปรากฏพร้อมบทบาทฝ่ายดีอื่นเมื่อถูกเปิดเผยโดย Town Crier',
            tips: [
                'ใช้การเลือกของคุณอย่างระมัดระวังเพื่อให้ข้อมูลหากคุณตาย',
                'ระวังอย่าเลือกคนที่เปิดเผยบทบาทตัวเองไปแล้ว',
                'แสดงตัวเป็นเหยื่อล่อโดยประกาศการกระทำปลอมเพื่อสับสนหมาป่า'
            ],
            advanced: 'หากคุณเชื่อว่าคุณคือเป้าหมายถัดไป ลองเลือกผู้เล่นคนสำคัญเพื่อให้การตายของคุณเปิดเผยข้อมูลที่มีค่าแก่ทีม'
        },
        lovers: {
            name: 'Lovers',
            team: 'good',
            image: 'https://platoapp.com/images/a8d57740-4363-11ef-bfb7-a598d323cbfc-card_lovers.webp',
            ability: 'ผู้เล่น 2 คนถูกเลือกและทั้งคู่เห็นการ์ดของกันและกัน ทั้งคู่แบ่งปัน Devotion ซึ่งเป็นความสามารถที่ทำให้พวกเขาทนการโจมตีของหมาป่าได้หนึ่งครั้ง รู้ว่า Shapeshifter จะปรากฏเป็น Lover ต่อผู้เล่นทั้งสอง',
            tips: [
                'อย่าเปิดเผยคู่รักของคุณหากต้องระบุบทบาท ปกป้องพวกเขาโดยการเก็บเป็นความลับ',
                'หากมี Shapeshifter ให้เชื่อมต่อกันแต่เนิ่นๆ และถามว่าใครคือคู่รักคนที่สาม',
                'รักษาการสื่อสารกับคู่ของคุณเพื่อโหวตไปด้วยกัน'
            ],
            advanced: 'วิเคราะห์คำตอบของคู่รักคนที่สามอย่างละเอียดเมื่อคุณถาม Shapeshifter อาจตอบถูกหรือพยายามแย่งตอบ โหวตด้วยกันเสมอ'
        },
        druid: {
            name: 'Druid',
            team: 'good',
            image: 'https://platoapp.com/images/a8e8ff40-4363-11ef-bfb7-a598d323cbfc-card_druid.webp',
            ability: 'เลือกผู้เล่นในตอนกลางคืน หากพวกเขาตายในคืนนั้น ผู้เล่นที่ถูกเลือกก็จะตายด้วย รู้ว่าไม่สามารถเลือกผู้เล่นที่ถูกเปิดเผยโดย Mystic หรือ Town Crier ได้',
            tips: [
                'เลือกใครสักคนเสมอ อย่าปล่อยให้ตัวเองถูกฆ่าโดยไม่พาใครไปด้วย',
                'คุณสามารถล่อเหยื่อโดยทำท่าทีว่าเป็นบทบาทที่มีค่าเพื่อให้ถูกฆ่า',
                'ใส่ใจอย่างใกล้ชิดเพื่อจับตาดูหมาป่าที่อาจเป็นไปได้และทำเครื่องหมายไว้'
            ],
            advanced: 'ล่อด้วยคนที่เจาะจงและทำเครื่องหมายพวกเขาไปพร้อมกัน หากผู้เล่นที่คุณใช้ล่อเป็นหมาป่า พวกเขาจะโหวตให้คุณทันที ซึ่งอาจนำไปสู่การที่คุณฆ่าหมาป่าได้'
        },
        mystic: {
            name: 'Mystic',
            team: 'good',
            image: 'https://platoapp.com/images/a8b5ba40-4363-11ef-bfb7-a598d323cbfc-card_mystic.webp',
            ability: 'เลือกผู้เล่นที่ AFK (ตัดการเชื่อมต่อ) ในตอนกลางคืนเพื่อเปิดเผยการ์ดของพวกเขาให้ผู้เล่นทุกคนเห็น',
            tips: [
                'พิมพ์ล่วงหน้าและใช้ความสามารถของคุณอย่างแข็งขัน อย่ารอให้คนอื่นตัดการเชื่อมต่อ',
                'ขอให้ผู้เล่นตัดการเชื่อมต่อชั่วคราวอย่างมั่นใจเพื่อให้ถูกเปิดเผย',
                'ส่งข้อความก่อนเปิดเผยสักครู่เพื่อไม่ให้หมาป่าอ้างการกระทำของคุณ',
                'อย่าดื้อรั้นกับผู้เล่นคนเดียว หากคนแรกที่คุณถามไม่ออกหรือไม่แสดงความตั้งใจที่จะทำ ให้รีบถามคนอื่น'
            ],
            advanced: 'ถามผู้เล่นหลายคนโดยตรงให้ออกไป และประเมินปฏิกิริยาและพฤติกรรมของพวกเขาเพื่อเปิดเผยคนที่น่าสงสัยที่สุด'
        },
        thief: {
            name: 'Thief',
            team: 'good',
            image: 'https://platoapp.com/images/a8de29d0-4363-11ef-bfb7-a598d323cbfc-card_thief.webp',
            ability: 'สามารถขโมยคะแนนโหวตของผู้เล่นใดก็ได้ในตอนกลางคืน สองครั้งต่อเกม',
            tips: [
                'รักษาความสามารถไว้สำหรับช่วงเวลาวิกฤต อย่าขโมยคะแนนโหวตแบบสุ่ม',
                'วิเคราะห์เกมและเลือกผู้เล่นที่คะแนนโหวตของเขาสามารถเปลี่ยนทิศทางได้',
                'หลีกเลี่ยงการขโมยแบบสุ่มในช่วงคืนแรกๆ ต่อมาฝ่ายร้ายอาจอ้างบทบาทของคุณและคุณจะไม่มีทางพิสูจน์ความบริสุทธิ์ได้'
            ],
            advanced: 'ใช้ความสามารถของคุณเพื่อป้องกันไม่ให้หมาป่าชนะการโหวตในจังหวะสำคัญ'
        },
        harlot: {
            name: 'Harlot',
            team: 'good',
            image: 'https://platoapp.com/images/a8d32d50-4363-11ef-bfb7-a598d323cbfc-card_harlot.webp',
            ability: 'ยั่วยวนผู้เล่นในตอนกลางคืน หากผู้เล่นนั้นเป็นฝ่ายดี Harlot จะได้รับการปกป้อง แต่หากผู้เล่นนั้นตายหรือเป็นหมาป่า Harlot จะตาย',
            tips: [
                'ยั่วยวนเพื่อยืนยันบทบาทและดึงข้อมูลที่มีค่า',
                'ถามผู้เล่นที่ถูกยั่วยวนเรื่องบทบาทของพวกเขาอย่างไม่เป็นทางการ หมาป่าอาจอ้างและถูกเปิดโปง',
                'อย่ายั่วยวนเด็ดขาดหากการตายของคุณจะทำให้หมาป่าชนะ ตัวอย่าง: วันที่ 1 ชาวบ้านถูกฆ่า คืนที่ 1 คุณยั่วยวนไม่ได้เพราะฝ่ายร้ายจะชนะด้วยเสียงข้างมาก'
            ],
            advanced: 'หากคุณตายโดยไม่ได้ยั่วยวนและไม่มีบทบาทด้านข้อมูลเหลือ ให้กล่าวหาใครสักคนว่าเป็นหมาป่าและถอยกลับทันทีหากพวกเขาปกป้องตัวเองอย่างรวดเร็ว'
        },
        bard: {
            name: 'Bard',
            team: 'good',
            image: 'https://platoapp.com/images/a8c6d140-4363-11ef-bfb7-a598d323cbfc-card_bard.webp',
            ability: 'สามารถใช้เสน่ห์กับผู้เล่นอีกคนได้หนึ่งครั้งต่อเกม ทั้งคู่จะเห็นการ์ดของกันและกัน รู้ว่า Shapeshifter จะปรากฏพร้อมบทบาทชาวบ้านอื่น',
            tips: [
                'พิมพ์ "ฉันคือ Bard กำลังใช้เสน่ห์กับ PlayerX" ไว้ล่วงหน้าก่อนสิ้นสุดคืนไม่กี่วินาที',
                'หากมี Shapeshifter หลังจากใช้เสน่ห์ ให้ขอให้ผู้เล่นระบุบทบาทของตนเอง หากบทบาทไม่ตรงหรือลังเลมากเกินไป แสดงว่าเป็นฝ่ายร้าย',
                'เลือกเป้าหมายที่สามารถให้ข้อมูลที่มีค่าได้'
            ],
            advanced: 'ในเกมที่มี Wolf Shaman ให้บอกว่าคุณกำลังใช้เสน่ห์โดยไม่เปิดเผยชื่อผู้เล่น วิธีนี้ถ้าคุณใช้เสน่ห์กับหมาป่าที่เงียบ คุณสามารถฆ่าพวกเขาได้โดยไม่มีปัญหา'
        },
        // Evil Roles
        alpha: {
            name: 'Alpha Wolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a88d4ab0-4363-11ef-bfb7-a598d323cbfc-card_alphawolf.webp',
            ability: 'ปรากฏว่าเป็นฝ่ายดีในสายตาของ Seer ทำให้การตรวจจับเป็นเรื่องยาก',
            tips: [
                'อยู่รอดให้นานที่สุดเท่าที่จะทำได้ Seer ไม่สามารถค้นพบคุณได้',
                'มอง Seer เป็นพันธมิตร อย่าขโมยบทบาทของพวกเขาหากไม่จำเป็นอย่างยิ่ง กรณีที่ควรทำคือเมื่อเพื่อนร่วมทีมกำลังถูกกล่าวหาและนั่นจะนำไปสู่ความพ่ายแพ้',
                'หลีกเลี่ยงการอ้างบทบาทอย่างรีบร้อน ยกเว้นในการเล่นที่เจาะจงมาก'
            ],
            advanced: 'มอง Seer เป็นพันธมิตรและพยายามให้พวกเขาอยู่ข้างคุณ วิธีนี้เมื่อถึงเวลาที่คุณจะอ้างบทบาท คุณจะมีคะแนนโหวตของ Seer อยู่ในมือ'
        },
        werewolf: {
            name: 'Werewolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c96950-4363-11ef-bfb7-a598d323cbfc-card_werewolf.webp',
            ability: 'ไม่มีความสามารถพิเศษ โหวตในตอนกลางคืนร่วมกับทีมว่าจะฆ่าชาวบ้านคนไหน',
            tips: [
                'อยู่อย่างเงียบๆ และทำตามแผนของเพื่อนร่วมทีมใหม่',
                'ใช้ประโยชน์จากความบริสุทธิ์ก่อนหน้านี้เพื่อเบี่ยงเบนความสงสัย',
                'อย่าอ้างบทบาทใดๆ หากไม่จำเป็นอย่างยิ่ง'
            ],
            advanced: 'แกล้งทำเป็นชาวบ้านธรรมดาและโหวตเพื่อปกป้องเพื่อนร่วมทีมเสมอ สละตัวเองหากการทำเช่นนั้นรับประกันชัยชนะให้ทีมฝ่ายร้าย'
        },
        vampire: {
            name: 'Vampire',
            team: 'evil',
            image: 'https://platoapp.com/images/a8db1c90-4363-11ef-bfb7-a598d323cbfc-card_vampire.webp',
            ability: 'สามารถต่อต้านความสามารถของ Doctor ได้หนึ่งครั้งต่อเกมด้วยเลือดของพวกเขา คะแนนโหวตของพวกเขานับเป็นศูนย์และปรากฏเป็นฝ่ายร้ายเท่านั้นต่อ Seer',
            tips: [
                'ภารกิจแรกเสมอ พยายามฆ่า Doctor ในคืนแรก',
                'หลีกเลี่ยงการเป็นหมาป่าคนสุดท้ายที่ยังมีชีวิต เพราะคะแนนโหวตของคุณไม่นับ',
                'อย่าบอกว่าคุณเป็น Doctor คุณอาจถูกแขวนคออย่างรวดเร็ว'
            ],
            advanced: 'หากคุณเป็นหมาป่าคนสุดท้าย พยายามไม่ให้ใครสังเกตเห็นและตัดการเชื่อมต่ออย่างรวดเร็วตอนต้นคืนหลังจากเลือกเป้าหมาย อย่ากลับมาก่อนช่วงการโหวต เป้าหมายของคุณคือหลีกเลี่ยงการเผชิญหน้า 1vs1 กับผู้เล่นที่คุณพยายามชนะ'
        },
        witch: {
            name: 'Witch',
            team: 'evil',
            image: 'https://platoapp.com/images/a8969980-4363-11ef-bfb7-a598d323cbfc-card_witch.webp',
            ability: 'สามารถเลือกและเปิดเผยการ์ดของผู้เล่นฝ่ายดีได้ในช่วงการอภิปรายกลางวัน',
            tips: [
                'ใช้ความสามารถของคุณตั้งแต่ต้นเพื่อเปิดเผยชาวบ้านที่ควรค่าแก่การฆ่า',
                'หลังจากเปิดเผยแล้ว Witch ไม่มีประโยชน์มากนักแล้ว คุณอาจทำหน้าที่เป็นเหยื่อล่อได้',
                'พยายามช่วยทีมต่อไป แต่รู้ว่าคุณอาจถูกทิ้งได้'
            ],
            advanced: 'หากคุณเปิดเผย Doctor ในขณะที่มี Vampire อยู่ ให้รีบฆ่าพวกเขาโดยเร็วที่สุด ไม่เช่นนั้นหลีกเลี่ยงการฆ่าพวกเขาในคืนแรก หากคุณเปิดเผยบทบาทอื่น คุณอาจปล่อยให้พวกเขามีชีวิตอยู่จนกว่าจะสามารถขโมยบทบาทในช่วงเวลาสำคัญได้'
        },
        siren: {
            name: 'Siren',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c28b80-4363-11ef-bfb7-a598d323cbfc-card_siren.webp',
            ability: 'หากถูกแขวนคอในตอนกลางวัน ชาวบ้านจะสูญเสียพลังของพวกเขาในคืนถัดไป',
            tips: [
                'มีความเป็นไปได้ที่เพื่อนร่วมทีมจะขายคุณเพื่อกำจัดบทบาทที่ฆ่าได้ยาก',
                'อ้างบทบาทที่ทีมของคุณไม่สามารถฆ่าได้ง่ายเสมอ',
                'ให้ความสำคัญกับการตายของตัวเองก่อนเพื่อนร่วมทีมคนอื่น หากมีการพูดถึงระหว่างคุณหรือหมาป่าคนอื่น อย่าสนับสนุนการตายของพวกเขา ทำบางอย่างเพื่อให้คุณเป็นคนที่ตาย',
                'พยายามอยู่รอดให้นานที่สุดเท่าที่จะทำได้ แม้การตายของคุณจะเป็นประโยชน์'
            ],
            advanced: 'ในวันแรก หากมีการกล่าวถึงบทบาทอย่าง King ให้รีบอ้างเพื่อให้ชาวบ้านอยู่โดยไม่มีพลังหนึ่งคืน และอีกคืนในวันถัดไปเมื่อพวกเขาฆ่าคุณ'
        },
        shapeshifter: {
            name: 'Shapeshifter',
            team: 'evil',
            image: 'https://platoapp.com/images/a8ce7260-4363-11ef-bfb7-a598d323cbfc-card_shapeshifter.webp',
            ability: 'ปรากฏเป็นชาวบ้านหากถูกเปิดเผยโดย Town Crier หรือถูกใช้เสน่ห์โดย Bard ปรากฏเป็น Lover ต่อ Lovers และแบบสุ่มว่าเป็นฝ่ายดีหรือฝ่ายร้ายต่อ Seer',
            tips: [
                'ในเกมที่มี Lovers โดยหลักการแล้วคุณควรเป็นคนแรกที่ถาม หากทำได้ถูกต้อง หลังจากฆ่า Lover คนหนึ่ง คุณสามารถจัดการให้คนที่เหลือฆ่า Lover อีกคน',
                'หากพวกเขาเปิดเผยคุณ (TC หรือ Bard) คุณต้องระบุบทบาท อย่ารอมากกว่า 4 วินาที จำไว้ว่าทีมของคุณอาจพยายามช่วยคุณ',
                'พยายามปกป้องตัวเองและอย่ายอมแพ้อย่างรวดเร็ว ยืนกรานในการโกหก Bard ที่มีประสบการณ์มากกว่าอาจต้องการทดสอบคุณและบอกว่าคุณระบุบทบาทผิดทั้งที่คุณระบุถูก ดังนั้นจงยืนหยัด'
            ],
            advanced: 'หากคุณแทรกซึมเข้าไปในกลุ่ม Lovers ให้บิดเบือนพวกเขาเพื่อไม่ให้ไว้วางใจกันหลังจากการตายของคนแรก กำจัดชาวบ้านสองคนติดต่อกัน'
        },
        nightmare: {
            name: 'Nightmare',
            team: 'evil',
            image: 'https://platoapp.com/images/a8a3b8e0-4363-11ef-bfb7-a598d323cbfc-card_nightmare.webp',
            ability: 'ในช่วงการอภิปรายกลางวัน เลือกผู้เล่นเพื่อทำให้หลับ ป้องกันไม่ให้ใช้ความสามารถในคืนถัดไป',
            tips: [
                'เลือกเหยื่ออย่างระมัดระวัง ให้ความสำคัญกับบทบาทอย่าง Doctor มากกว่า Seer ขึ้นอยู่กับเกม',
                'ตรวจสอบให้แน่ใจว่าไม่ทำให้หลับบทบาทที่เพื่อนร่วมทีมกำลังพยายามขโมย เพราะนั่นทำให้พวกเขาเปิดเผยตัว',
                'อย่าใช้ความสามารถโดยไม่มีเหตุผล วิเคราะห์สถานการณ์ก่อน',
                'ประสานงานกับหมาป่าคนอื่นเพื่อใช้ประโยชน์จากการปิดบทบาทที่ดีที่สุด'
            ],
            advanced: 'ทำให้บทบาทสำคัญหลับก่อนที่พวกเขาจะใช้ความสามารถชี้ขาด บังคับให้ล้มเหลวและเปิดประตูสู่ชัยชนะในนาทีสุดท้าย'
        },
        'wolf-shaman': {
            name: 'Wolf Shaman',
            team: 'evil',
            image: 'https://platoapp.com/images/a8cc4f80-4363-11ef-bfb7-a598d323cbfc-card_wolfshaman.webp',
            ability: 'สามารถปกป้องหมาป่าจากการถูกแขวนคอในตอนกลางวันได้หนึ่งครั้งต่อเกม หมาป่าที่ได้รับการปกป้องจะไม่ตายเมื่อถูกแขวนคอ',
            tips: [
                'รักษาสมดุลระหว่างชาวบ้านที่ตายและหมาป่าที่ยังมีชีวิตเพื่อมีช่องทางสู่ชัยชนะที่กว้างขึ้น',
                'คุณคือบทบาทที่สามารถขายเพื่อนร่วมทีมที่เหลือเพื่อรับประกันชัยชนะ',
                'อย่าใช้การปกป้องกับ Siren หากไม่ทำให้ชนะทันที',
                'เบี่ยงความสนใจจากตัวเองเพื่อใช้พลังของคุณในช่วงเวลาที่เหมาะสมที่สุด',
                'ตัดสินใจอย่างรอบคอบว่าจะปกป้องเพื่อนร่วมทีมหรือเก็บไว้ใช้เอง'
            ],
            advanced: 'คุณสามารถทรยศเพื่อนร่วมทีมโดยขโมยบทบาท Seer และอ้างว่าคุณตรวจสอบผู้เล่นบางคน เมื่อคนหนึ่งในพวกเขาตาย ชาวบ้านน่าจะเชื่อคุณ จากนั้น นำทิศทางเกมอย่างสงบในขณะที่เก็บการปกป้องไว้สำรอง'
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
        detailTeam.textContent = role.team === 'good' ? 'บทบาทฝ่ายดี' : 'บทบาทฝ่ายร้าย';
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
