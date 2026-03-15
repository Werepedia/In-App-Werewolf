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
            ability: 'Every night, the Seer can check a player to know which team they belong to. Roles like Alpha Wolf, Shapeshifter, Jester, and Lycan partially or totally affect the authenticity of the information this role can provide.',
            tips: [
                'Read everything said carefully to know who to check.',
                'Do not reveal information unnecessarily. Make sure there are no roles like Wolf Shaman before revealing info.',
                'In case there is Assassin, provide them with your information as quickly as you can.',
                'Have an attitude and make yourself heard.'
            ],
            advanced: 'The Seer can make risky plays like fake claiming/accusing falsely to pressure a player. If they reveal themselves instantly upon being accused, it is key to back down and give the real information; otherwise, the Seer could be considered a wolf.'
        },
        doctor: {
            name: 'Doctor',
            team: 'good',
            image: 'https://platoapp.com/images/a897f910-4363-11ef-bfb7-a598d323cbfc-card_doctor.webp',
            ability: 'Every night, the Doctor can protect a player or themselves, preventing them from dying if attacked by the wolves. This may not always be the case if there is a Vampire; they cancel the Doctor once per game if the person saved by the Doctor is killed by wolves.',
            tips: [
                'Pre-type your move (for example, "I am Doctor, saving PlayerX") and send it at the end of the night. Make sure you actually save that player; otherwise, you would be revealing for no reason and could be the next target.',
                'Decide who to save based on available information; save yourself in advanced nights.',
                'Be cautious when there are roles that cancel or interfere with your ability (Nightmare, Siren, Vampire).',
                'Whenever there is Witch, you have to save yourself if there is no more important role to save.'
            ],
            advanced: 'Coordinate with other villagers to protect key roles at critical moments and use your self-protection strategically to survive until the end. You can also devise ways to confuse the wolves into thinking you are not the Doctor.'
        },
        knight: {
            name: 'Knight',
            team: 'good',
            image: 'https://platoapp.com/images/a8aa2180-4363-11ef-bfb7-a598d323cbfc-card_knight.webp',
            ability: 'Possesses a shield that saves them once per game from a wolf attack. Cannot be protected by the Doctor while they have their shield.',
            tips: [
                'The Knight belongs to the Royal Family; while alive, the King cannot be killed by wolves. You staying alive helps protect the King.',
                'Act as bait to attract attacks from clueless wolves and protect other villagers.',
                'Remember that your shield activates automatically and does not combine with the Doctor\'s protection.'
            ],
            advanced: 'Deceive the wolves by insinuating you are a valuable or vulnerable role so they waste attacks, but plan your baiting so it doesn\'t affect the Royal Family. Bait with roles that are not in the game or have already been revealed. If necessary, clarify afterwards that you did that because you are Knight.'
        },
        princess: {
            name: 'Princess',
            team: 'good',
            image: 'https://platoapp.com/images/a8d61380-4363-11ef-bfb7-a598d323cbfc-card_princess.webp',
            ability: 'Survives a lynching during the day; when the ability activates, their card is revealed to all players.',
            tips: [
                'The Princess belongs to the Royal Family; while alive, the King cannot be killed by wolves while Princess is alive.',
                'When voted for, claim a powerful role that is not in play to provoke a clueless wolf into claiming it.',
                'Take advantage of your lynching immunity to get information on who is voting for you.',
                'Be careful not to bait without reason during the night to protect the King.',
                'Don\'t let yourself be selected for no reason if you can avoid being put on Trial, do so. Lynching the Princess is considered wasting a day.'
            ],
            advanced: 'When put on Trial, state a role that is not in the game; this play can lead a nervous or clueless wolf to claim and thus expose themselves.'
        },
        hunter: {
            name: 'Hunter',
            team: 'good',
            image: 'https://platoapp.com/images/a8a5dbc0-4363-11ef-bfb7-a598d323cbfc-card_hunter.webp',
            ability: 'When dying at night, has a 75% chance of taking a random wolf with them.',
            tips: [
                'Act as bait by announcing spells or revelations to incite the wolves to attack you.',
                'Ask players to disconnect to "reveal" them and thus trick the wolves.',
                'Stay active and communicative to maximize the impact of your fake role on the wolves.',
                'Baiting at night serves as an excuse when defending your role. Explain that you were baiting to see if they would kill you because you are the Hunter. (Evils might use this argument as well)'
            ],
            advanced: 'Pretend to be some other role that alerts the wolves to attract attacks, but be prepared to retract if it becomes counterproductive.'
        },
        necromancer: {
            name: 'Necromancer',
            team: 'good',
            image: 'https://platoapp.com/images/a8da0b20-4363-11ef-bfb7-a598d323cbfc-card_necromancer.webp',
            ability: 'Can raise a dead villager once per game during the night.',
            tips: [
                'Pre-type your action and send it just before the night ends so it is clear that it is really you.',
                'Use your ability as soon as possible; do not wait for a more valuable role to die.',
                'Coordinate with your team to raise the player whose ability offers the greatest advantage.'
            ],
            advanced: 'In disputes where there is a wolf claiming to be Necromancer, if the situation allows, propose raising different players; whoever keeps the promise will be the real one.'
        },
        king: {
            name: 'King',
            team: 'good',
            image: 'https://platoapp.com/images/a8e359f0-4363-11ef-bfb7-a598d323cbfc-card_king.webp',
            ability: 'While the Knight, Princess, or Jester are alive, the King cannot be killed by wolves at night. If lynched, the villagers will not be able to use their abilities the following night.',
            tips: [
                'Use your immunity to act as bait in the first few nights, diverting attacks from the wolves.',
                'Do not reveal your role unless necessary; your immunity is lost if members of the Royal Family die.',
                'Avoid being lynched at all costs, as your death leaves your team powerless for a night.'
            ],
            advanced: 'Pretend to be a role that alerts the wolves to attract their attention and try to be killed, thus protecting more important roles. Clarify what you did instantly if someone accuses you.'
        },
        jester: {
            name: 'Jester',
            team: 'good',
            image: 'https://platoapp.com/images/a8bd5b60-4363-11ef-bfb7-a598d323cbfc-card_jester.webp',
            ability: 'Only wins if killed, either during the day or night. Can appear randomly as good or bad to the Seer.',
            tips: [
                'Do not waste or "burn" others roles; although your win condition is different, you are still a villager.',
                'Deceive to get killed by wolves, for example by faking a non-existent role.',
                'Take advantage of the confusion to extract information from others reactions. If you wish, you can help another team win.',
                'Always play without trolling or ruining the game experience for others.'
            ],
            advanced: 'If they vote for you on the first day, you can reveal yourself as Jester or state a role absent from the game to sacrifice your life and try to help the good team.',
            warning: 'Do not reveal another player\'s real role just to get the win — this forces an innocent to defend themselves unnecessarily and can ruin their game. If you want to claim something, always choose a role absent from the game.'
        },
        lycan: {
            name: 'Lycan',
            team: 'good',
            image: 'https://platoapp.com/images/a8e073c0-4363-11ef-bfb7-a598d323cbfc-card_lycan.webp',
            ability: 'Cursed villager who, if killed at night by wolves, turns into a Werewolf. The Seer sees them as a villager before they turn, and this info does not change.',
            tips: [
                'Evaluate which team you want to play with; initially, you are always just another villager.',
                'Before betraying, make sure you can trust the wolves; they could deceive you and make you lose.',
                'Keep a low profile until deciding your definitive loyalty.'
            ],
            advanced: 'Negotiate with the wolves to coordinate your transformation and achieve victory, but have an alternative plan in case of betrayal.',
            warning: 'You are a villager until you turn. Forcing another villager to reveal their role for your own benefit can directly cost the good team the game — and since you\'re part of that team until you transform, you lose too.'
        },
        mayor: {
            name: 'Mayor',
            team: 'good',
            image: 'https://platoapp.com/images/a8c79490-4363-11ef-bfb7-a598d323cbfc-card_mayor.webp',
            ability: 'Their vote counts double in all voting phases.',
            tips: [
                'You must be cautious; voting records can show who the Mayor is.',
                'Pay extreme attention to everything said, as your vote drastically changes the course of a game.',
                'Use your double vote to guide the voting towards suspects or verified players.',
                'You can serve as bait at night, although the benefit is limited.'
            ],
            advanced: 'Verify who is lying by checking the chat and voting history, and confront impostors with your voting influence.'
        },
        assassin: {
            name: 'Assassin',
            team: 'good',
            image: 'https://platoapp.com/images/a8e1d350-4363-11ef-bfb7-a598d323cbfc-card_assassin.webp',
            ability: 'Can assassinate a player once per game during the night.',
            tips: [
                'Always use your ability on the first night to eliminate a possible wolf.',
                'Prioritize targets confirmed by the Seer or with suspicious behavior.',
                'Do not kill randomly; a mistake could harm your team.',
                'If someone states your role, claim it; every role is claimed and the Assassin is no exception.'
            ],
            advanced: 'Make sure to always pre-type who you are going to kill so no one can steal your role (Ex: "I am assa I kill PlayerX"). Coordinate with information roles to execute a wolf.'
        },
        'town-crier': {
            name: 'Town Crier',
            team: 'good',
            image: 'https://platoapp.com/images/a8ddb4a0-4363-11ef-bfb7-a598d323cbfc-card_towncrier.webp',
            ability: 'Selects a player during the night; if they die, the selected player\'s role will be revealed to everyone. Know that the Shapeshifter appears with another good role when revealed by the Town Crier.',
            tips: [
                'Use your selection carefully to give information if you die.',
                'Always pay attention so as not to select someone who has already revealed their role.',
                'Act as bait by announcing fake actions to confuse the wolves.'
            ],
            advanced: 'If you believe you are the next target, try selecting a key player so that your death reveals valuable information to your team.'
        },
        lovers: {
            name: 'Lovers',
            team: 'good',
            image: 'https://platoapp.com/images/a8d57740-4363-11ef-bfb7-a598d323cbfc-card_lovers.webp',
            ability: '2 players are chosen and both see their cards. Both share Devotion, an ability that makes them withstand one wolf attack. Know that The Shapeshifter appears as a Lover to both.',
            tips: [
                'Do not reveal your other lover if you must state your role; protect them by keeping them hidden.',
                'If there is a Shapeshifter, connect early and ask who the third lover is.',
                'Maintain communication with your partner to vote together.'
            ],
            advanced: 'Analyze the third Lover\'s answer carefully when you ask; the Shapeshifter might answer correctly or try to beat you to it. Always vote together.'
        },
        druid: {
            name: 'Druid',
            team: 'good',
            image: 'https://platoapp.com/images/a8e8ff40-4363-11ef-bfb7-a598d323cbfc-card_druid.webp',
            ability: 'Chooses a player during the night; if they die that night, the selected player also dies. Know that it cannot choose players revealed by the Mystic or Town Crier.',
            tips: [
                'Always choose someone, never let yourself be killed without taking someone with you, but choose carefully whom to take; it is a risky role.',
                'You can bait by insinuating you are a valuable role to get killed.',
                'Pay close attention to spot possible wolves and have them marked.'
            ],
            advanced: 'Bait with someone specific and mark them at the same time. If the player you bait with is a wolf, they will probably vote for you instantly, which can lead to you killing a wolf.'
        },
        mystic: {
            name: 'Mystic',
            team: 'good',
            image: 'https://platoapp.com/images/a8b5ba40-4363-11ef-bfb7-a598d323cbfc-card_mystic.webp',
            ability: 'Selects an AFK (disconnected) player during the night to reveal their card to all players.',
            tips: [
                'Pre-type and actively use your ability; do not wait for others to disconnect.',
                'Ask with attitude for players to disconnect briefly to be revealed.',
                'Send a message just before revealing so no wolf claims your action.',
                'Do not insist with a single player; if the first one you ask doesn\'t go AFK or show intention to do so, ask another quickly.'
            ],
            advanced: 'Ask several players directly to leave and evaluate their reactions and behaviors to reveal the most suspicious one.'
        },
        thief: {
            name: 'Thief',
            team: 'good',
            image: 'https://platoapp.com/images/a8de29d0-4363-11ef-bfb7-a598d323cbfc-card_thief.webp',
            ability: 'Can steal any player\'s vote during the night, twice per game.',
            tips: [
                'Save the ability for critical moments; do not steal votes randomly.',
                'Analyze the game and choose a player whose vote can change the course.',
                'Avoid stealing randomly in the first few nights. Later an evil could claim your role and you would have no way to prove your innocence.'
            ],
            advanced: 'Use your ability to prevent the wolves from winning a key vote.'
        },
        harlot: {
            name: 'Harlot',
            team: 'good',
            image: 'https://platoapp.com/images/a8d32d50-4363-11ef-bfb7-a598d323cbfc-card_harlot.webp',
            ability: 'Tempts a player during the night; if the player is good, the Harlot is protected, but if that player dies or is a wolf, the Harlot dies.',
            tips: [
                'Tempt to verify roles and extract valuable information.',
                'Discreetly ask the tempted player for their role; a wolf could claim and be unmasked.',
                'Never tempt if your death would grant victory to the wolves. Example: Day 1 a villager is killed, Night 1 you cannot tempt because evils would win out of majority.'
            ],
            advanced: 'If you die without tempting and there are no informative roles left, accuse someone of being a wolf and retract instantly if they defend themselves quickly.'
        },
        bard: {
            name: 'Bard',
            team: 'good',
            image: 'https://platoapp.com/images/a8c6d140-4363-11ef-bfb7-a598d323cbfc-card_bard.webp',
            ability: 'Can charm another player once per game; both will see their cards. Know that The Shapeshifter will appear with another villager role.',
            tips: [
                'Pre-type "I am Bard, charming PlayerX" seconds before the night ends.',
                'If there is a Shapeshifter, after charming someone, ask the player to state their role. If it doesn\'t match or they hesitate too much, it is an evil.',
                'Choose a target that can give valuable information.'
            ],
            advanced: 'In a game with Wolf Shaman, say you are charming without revealing the player\'s name; that way if you charm a wolf who stays silent, you can kill them without problem.'
        },
        // Evil Roles
        alpha: {
            name: 'Alpha Wolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a88d4ab0-4363-11ef-bfb7-a598d323cbfc-card_alphawolf.webp',
            ability: 'Appears as good in the eyes of the Seer, making detection difficult.',
            tips: [
                'Stay alive as long as possible; the Seer cannot discover you.',
                'Consider the Seer an ally; never steal their role unless absolutely necessary. Such a case would be when a teammate is being accused and that would lead to defeat.',
                'Avoid claiming roles hastily except in very specific plays.'
            ],
            advanced: 'Consider the Seer your ally and try to have them on your side; that way, when it\'s your moment to claim a role, you will have the Seer\'s vote in your favor.'
        },
        werewolf: {
            name: 'Werewolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c96950-4363-11ef-bfb7-a598d323cbfc-card_werewolf.webp',
            ability: 'Possesses no special abilities. Votes during the night on which villager to kill with their team.',
            tips: [
                'Keep a low profile and follow your new teammates plan.',
                'Take advantage of your previous innocence to deflect suspicion.',
                'Do not claim anything unless absolutely necessary.'
            ],
            advanced: 'Pretend to be a common villager and always vote to protect your teammates; sacrifice yourself if doing so ensures victory for the Evil team.'
        },
        vampire: {
            name: 'Vampire',
            team: 'evil',
            image: 'https://platoapp.com/images/a8db1c90-4363-11ef-bfb7-a598d323cbfc-card_vampire.webp',
            ability: 'Can counter the Doctor\'s ability once per game using their blood. Their vote counts as zero and they appear only as bad to the Seer.',
            tips: [
                'Always as a first task, try to kill the Doctor on the first night.',
                'Avoid being the last wolf alive, since your vote doesn\'t count.',
                'Do not say you are the Doctor; you could be lynched quickly.'
            ],
            advanced: 'If you are the last wolf alive, try to go unnoticed and disconnect quickly at the start of the night after selecting someone to kill. Do not come back before the voting phase, your goal is to avoid a 1vs1 with the player you are trying to win against.'
        },
        witch: {
            name: 'Witch',
            team: 'evil',
            image: 'https://platoapp.com/images/a8969980-4363-11ef-bfb7-a598d323cbfc-card_witch.webp',
            ability: 'Can choose and reveal a good player\'s card during the Day Discussion.',
            tips: [
                'Always use your ability at the start to reveal a villager worth killing.',
                'After revealing, the Witch doesn\'t have much more utility; you could serve as bait, so other wolves sell you out and thus gain the trust of other villagers..',
                'Keep trying to help your team but knowing you can be discarded.'
            ],
            advanced: 'If you reveal the Doctor while there is a Vampire, make sure to kill them as soon as you can; otherwise avoid killing them the first night. If you reveal another role, you could leave them alive until you can steal their role at some key moment.'
        },
        siren: {
            name: 'Siren',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c28b80-4363-11ef-bfb7-a598d323cbfc-card_siren.webp',
            ability: 'If lynched during the day, the villagers lose their powers the following night.',
            tips: [
                'There is a possibility that your teammates sell you out to get rid of roles difficult to kill.',
                'Always claim roles that your team cannot kill easily.',
                'Prioritize your death before that of any other teammate. If they are discussing between you or a fellow wolf, do not support their death, do something so that it is you who dies',
                'Try to survive as long as you can despite your death being beneficial.'
            ],
            advanced: 'On the first day, if roles like King are mentioned, claim quickly so villagers are left without powers one night and another the next day when they kill you.'
        },
        shapeshifter: {
            name: 'Shapeshifter',
            team: 'evil',
            image: 'https://platoapp.com/images/a8ce7260-4363-11ef-bfb7-a598d323cbfc-card_shapeshifter.webp',
            ability: 'Appears as a villager if revealed by Town Crier or charmed by Bard, as a Lover to the Lovers, and randomly as good or bad to the Seer.',
            tips: [
                'In a game with Lovers, ideally you should be the first to ask. If you do it right, after killing a Lover you can manipulate the rest to kill the other Lover.',
                'If they reveal you (TC or Bard), you have to state a role; don\'t wait more than 4 seconds. Keep in mind that your team might try to help you.',
                'Try to defend yourself and do not give up quickly, insist on the lie. A Bard with more experience might want to test you and tell you that you got the role wrong even though you got it right, so stand firm.'
            ],
            advanced: 'If you infiltrate among the Lovers, manipulate them so they don\'t believe each other after the death of the first one, eliminating two villagers consecutively.'
        },
        nightmare: {
            name: 'Nightmare',
            team: 'evil',
            image: 'https://platoapp.com/images/a8a3b8e0-4363-11ef-bfb7-a598d323cbfc-card_nightmare.webp',
            ability: 'During the Day Discussion, chooses a player to put to sleep, preventing them from using their ability the following night.',
            tips: [
                'Select the victim carefully, prioritizing roles like Doctor over Seer depending on the game.',
                'Make sure not to put to sleep a role that a teammate is trying to steal, as that leaves them exposed.',
                'Do not use the ability without reason; analyze the situation.',
                'Coordinate with other wolves to take advantage of disabling the best role.'
            ],
            advanced: 'Put a key role to sleep just before they use their decisive ability, forcing a failure and opening the door to a last-minute victory.'
        },
        'wolf-shaman': {
            name: 'Wolf Shaman',
            team: 'evil',
            image: 'https://platoapp.com/images/a8cc4f80-4363-11ef-bfb7-a598d323cbfc-card_wolfshaman.webp',
            ability: 'Can protect a wolf from being lynched during the day once per game; the protected wolf will not die when lynched.',
            tips: [
                'Keep the gap between dead villagers and live wolves balanced to have a greater margin for victory.',
                'You are the role that can sell out the rest of the wolves in order to ensure victory.',
                'Never spend your protection on the Siren unless this grants immediate victory.',
                'Draw attention away from yourself to use your power at the most suitable moment.',
                'Decide carefully when to protect a teammate or save it for yourself.'
            ],
            advanced: 'You can sell out your teammates by stealing the Seer role and claiming you checked someone. When one of them dies, the villagers will likely believe you. From there, guide the game calmly while keeping your protection in reserve.'
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
        detailTeam.textContent = role.team === 'good' ? 'Good Role' : 'Evil Role';
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
