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

    // ROLES DATA (FRENCH)
    const rolesData = {
        // Good Roles
        seer: {
            name: 'Seer',
            team: 'good',
            image: 'https://platoapp.com/images/a8e44450-4363-11ef-bfb7-a598d323cbfc-card_seer.webp',
            ability: 'Chaque nuit, le Seer peut vérifier un joueur pour savoir à quelle équipe il appartient. Des rôles comme Alpha Wolf, Shapeshifter, Jester et Lycan affectent partiellement ou totalement l\'authenticité des informations que ce rôle peut fournir.',
            tips: [
                'Lisez attentivement tout ce qui est dit pour savoir qui vérifier.',
                'Ne révélez pas d\'informations inutilement. Assurez-vous qu\'il n\'y a pas de rôles comme Wolf Shaman avant de révéler des infos.',
                'En cas d\'Assassin, fournissez-lui vos informations le plus rapidement possible.',
                'Ayez de l\'attitude et faites-vous entendre.'
            ],
            advanced: 'Le Seer peut faire des jeux risqués comme de fausses accusations pour faire pression sur un joueur. S\'ils se révèlent instantanément suite à une accusation, il est crucial de reculer et de donner la vraie information; sinon, le Seer pourrait être considéré comme un loup.'
        },
        doctor: {
            name: 'Doctor',
            team: 'good',
            image: 'https://platoapp.com/images/a897f910-4363-11ef-bfb7-a598d323cbfc-card_doctor.webp',
            ability: 'Chaque nuit, le Doctor peut protéger un joueur ou lui-même, l\'empêchant de mourir s\'il est attaqué par les loups. Ce n\'est pas toujours le cas s\'il y a un Vampire; ils annulent le Doctor une fois par partie si la personne sauvée par le Doctor est tuée par des loups.',
            tips: [
                'Pré-écrivez votre coup (par exemple, "Je suis Doctor, je sauve PlayerX") et envoyez-le à la fin de la nuit. Assurez-vous de vraiment sauver ce joueur; sinon, vous vous révéleriez sans raison et pourriez être la prochaine cible.',
                'Décidez qui protéger basé sur les informations disponibles; protégez-vous dans les nuits avancées.',
                'Soyez prudent quand il y a des rôles qui annulent ou interfèrent avec votre capacité (Nightmare, Siren, Vampire).',
                'Chaque fois qu\'il y a une Witch, vous devez vous sauver s\'il n\'y a pas de rôle plus important à sauver.'
            ],
            advanced: 'Coordonnez-vous avec d\'autres villageois pour protéger des rôles clés à des moments critiques et utilisez votre auto-protection stratégiquement pour survivre jusqu\'à la fin. Vous pouvez aussi imaginer des façons de confondre les loups en leur faisant croire que vous n\'êtes pas le Doctor.'
        },
        knight: {
            name: 'Knight',
            team: 'good',
            image: 'https://platoapp.com/images/a8aa2180-4363-11ef-bfb7-a598d323cbfc-card_knight.webp',
            ability: 'Possède un bouclier qui le sauve une fois par partie d\'une attaque de loup. Ne peut pas être protégé par le Doctor tant qu\'il a son bouclier.',
            tips: [
                'Le Knight appartient à la Famille Royale; tant qu\'il est vivant, le King ne peut pas être tué par des loups.',
                'Agissez comme leurre pour attirer des attaques de loups ignorants et protéger d\'autres villageois.',
                'Rappelez-vous que votre bouclier s\'active automatiquement et ne se combine pas avec la protection du Doctor.'
            ],
            advanced: 'Trompez les loups en insinuant que vous êtes un rôle précieux ou vulnérable pour qu\'ils gaspillent des attaques, mais planifiez votre leurre pour que cela n\'affecte pas la Famille Royale. Leurrez avec des rôles qui ne sont pas dans le jeu ou qui ont déjà été révélés. Si nécessaire, clarifiez ensuite que vous avez fait cela parce que vous êtes le Knight.'
        },
        princess: {
            name: 'Princess',
            team: 'good',
            image: 'https://platoapp.com/images/a8d61380-4363-11ef-bfb7-a598d323cbfc-card_princess.webp',
            ability: 'Survit à un lynchage pendant la journée; quand la capacité s\'active, sa carte est révélée à tous les joueurs.',
            tips: [
                'La Princess appartient à la Famille Royale; tant qu\'elle est vivante, le King ne peut pas être tué par des loups.',
                'Quand on vote pour vous, réclamez un rôle puissant qui n\'est pas en jeu pour provoquer un loup ignorant à le réclamer.',
                'Profitez de votre immunité au lynchage pour obtenir des informations sur qui vous vote.',
                'Faites attention à ne pas faire leurre sans raison pendant la nuit pour protéger le King.',
                'Ne vous laissez pas sélectionner sans raison; si vous pouvez éviter d\'être mise en jugement, faites-le. Lyncher la Princess est considéré comme gaspiller une journée.'
            ],
            advanced: 'Quand vous êtes mis en jugement, déclarez un rôle qui n\'est pas dans le jeu; cette manœuvre peut amener un loup nerveux ou ignorant à le réclamer et ainsi s\'exposer.'
        },
        hunter: {
            name: 'Hunter',
            team: 'good',
            image: 'https://platoapp.com/images/a8a5dbc0-4363-11ef-bfb7-a598d323cbfc-card_hunter.webp',
            ability: 'En mourant de nuit, a 75% de chances d\'emmener un loup aléatoire avec lui.',
            tips: [
                'Agissez comme leurre en annonçant des sorts ou révélations pour inciter les loups à vous attaquer.',
                'Demandez aux joueurs de se déconnecter pour les "révéler" et ainsi tromper les loups.',
                'Restez actif et communicatif pour maximiser l\'impact de votre faux rôle sur les loups.',
                'Faire leurre la nuit sert d\'excuse lors de la défense de votre rôle. Expliquez que vous faisiez leurre pour voir s\'ils vous tueraient parce que vous êtes le Hunter. (Les mauvais pourraient également utiliser cet argument)'
            ],
            advanced: 'Faites semblant d\'être un autre rôle qui alerte les loups pour attirer des attaques, mais soyez prêt à vous rétracter si cela devient contre-productif.'
        },
        necromancer: {
            name: 'Necromancer',
            team: 'good',
            image: 'https://platoapp.com/images/a8da0b20-4363-11ef-bfb7-a598d323cbfc-card_necromancer.webp',
            ability: 'Peut ressusciter un villageois mort une fois par partie pendant la nuit.',
            tips: [
                'Pré-écrivez votre action et envoyez-la juste avant que la nuit ne se termine pour qu\'il soit clair que c\'est vraiment vous.',
                'Utilisez votre capacité dès que possible; n\'attendez pas qu\'un rôle plus précieux meure.',
                'Coordonnez-vous avec votre équipe pour ressusciter le joueur dont la capacité offre le plus grand avantage.'
            ],
            advanced: 'Dans les disputes où il y a un loup prétendant être Necromancer, si la situation le permet, proposez de ressusciter différents joueurs; celui qui tient sa promesse sera le vrai.'
        },
        king: {
            name: 'King',
            team: 'good',
            image: 'https://platoapp.com/images/a8e359f0-4363-11ef-bfb7-a598d323cbfc-card_king.webp',
            ability: 'Tant que le Knight, Princess ou Jester sont vivants, le King ne peut pas être tué par des loups la nuit. S\'il est lynché, les villageois ne pourront pas utiliser leurs capacités la nuit suivante.',
            tips: [
                'Utilisez votre immunité pour agir comme leurre dans les premières nuits, détournant les attaques des loups.',
                'Ne révélez pas votre rôle à moins que ce soit nécessaire; votre immunité est perdue si des membres de la Famille Royale meurent.',
                'Évitez d\'être lynché à tout prix, car votre mort laisse votre équipe sans pouvoir pour une nuit.'
            ],
            advanced: 'Faites semblant d\'être un rôle qui alerte les loups pour attirer leur attention et essayez d\'être tué, protégeant ainsi des rôles plus importants. Clarifiez ce que vous avez fait instantanément si quelqu\'un vous accuse.'
        },
        jester: {
            name: 'Jester',
            team: 'good',
            image: 'https://platoapp.com/images/a8bd5b60-4363-11ef-bfb7-a598d323cbfc-card_jester.webp',
            ability: 'Ne gagne que s\'il est tué, soit de jour soit de nuit. Peut apparaître aléatoirement comme bon ou mauvais pour le Seer.',
            tips: [
                'Ne gâchez pas ou ne "brûlez" pas les rôles des autres; bien que votre condition de victoire soit différente, vous êtes toujours un villageois.',
                'Trompez pour vous faire tuer par les loups, par exemple en simulant un rôle inexistant.',
                'Profitez de la confusion pour extraire des informations des réactions des autres. Si vous le souhaitez, vous pouvez aider une autre équipe à gagner.',
                'Jouez toujours sans trolling ni ruiner l\'expérience de jeu des autres.'
            ],
            advanced: 'Si on vote pour vous le premier jour, vous pouvez vous révéler comme Jester ou déclarer un rôle absent du jeu pour sacrifier votre vie et essayer d\'aider l\'équipe bonne.',
            warning: 'Ne révélez pas le vrai rôle d\'un autre joueur juste pour gagner — cela force un innocent à se défendre inutilement et peut ruiner sa partie. Si vous voulez revendiquer quelque chose, choisissez toujours un rôle absent du jeu.'
        },
        lycan: {
            name: 'Lycan',
            team: 'good',
            image: 'https://platoapp.com/images/a8e073c0-4363-11ef-bfb7-a598d323cbfc-card_lycan.webp',
            ability: 'Villageois maudit qui, s\'il est tué de nuit par des loups, se transforme en Werewolf. Le Seer le voit comme un villageois avant sa transformation, et cette info ne change pas.',
            tips: [
                'Évaluez avec quelle équipe vous voulez jouer; initialement, vous êtes toujours juste un autre villageois.',
                'Avant de trahir, assurez-vous de pouvoir faire confiance aux loups; ils pourraient vous tromper.',
                'Gardez un profil bas jusqu\'à décider de votre loyauté définitive.'
            ],
            advanced: 'Négociez avec les loups pour coordonner votre transformation et obtenir la victoire, mais ayez un plan alternatif en cas de trahison.',
            warning: 'Vous êtes un villageois jusqu\'à votre transformation. Forcer un autre villageois à révéler son rôle pour votre propre bénéfice peut directement coûter la victoire à l\'équipe bonne — et comme vous faites partie de cette équipe jusqu\'à votre transformation, vous perdez aussi.'
        },
        mayor: {
            name: 'Mayor',
            team: 'good',
            image: 'https://platoapp.com/images/a8c79490-4363-11ef-bfb7-a598d323cbfc-card_mayor.webp',
            ability: 'Son vote compte double dans toutes les phases de vote.',
            tips: [
                'Vous devez être prudent; les registres de vote peuvent montrer qui est le Mayor.',
                'Prêtez une attention extrême à tout ce qui est dit, car votre vote change drastiquement le cours d\'une partie.',
                'Utilisez votre vote double pour guider le vote vers des suspects ou des joueurs vérifiés.',
                'Vous pouvez servir de leurre la nuit, bien que le bénéfice soit limité.'
            ],
            advanced: 'Vérifiez qui ment en vérifiant l\'historique de chat et de vote, et confrontez les imposteurs avec votre influence de vote.'
        },
        assassin: {
            name: 'Assassin',
            team: 'good',
            image: 'https://platoapp.com/images/a8e1d350-4363-11ef-bfb7-a598d323cbfc-card_assassin.webp',
            ability: 'Peut assassiner un joueur une fois par partie pendant la nuit.',
            tips: [
                'Utilisez toujours votre capacité la première nuit pour éliminer un possible loup.',
                'Priorisez les cibles confirmées par le Seer ou avec un comportement suspect.',
                'Ne tuez pas au hasard; une erreur pourrait nuire à votre équipe.',
                'Si quelqu\'un déclare votre rôle, revendiquez-le; chaque rôle est revendiqué et l\'Assassin n\'est pas une exception.'
            ],
            advanced: 'Assurez-vous de toujours pré-écrire qui vous allez tuer pour que personne ne puisse voler votre rôle (Ex: "Je suis assa je tue PlayerX"). Coordonnez-vous avec les rôles d\'information pour exécuter un loup.'
        },
        'town-crier': {
            name: 'Town Crier',
            team: 'good',
            image: 'https://platoapp.com/images/a8ddb4a0-4363-11ef-bfb7-a598d323cbfc-card_towncrier.webp',
            ability: 'Sélectionne un joueur pendant la nuit; s\'il meurt, le rôle du joueur sélectionné sera révélé à tout le monde. Notez que le Shapeshifter apparaît avec un autre bon rôle lorsqu\'il est révélé par le Town Crier.',
            tips: [
                'Utilisez votre sélection soigneusement pour donner des informations si vous mourez.',
                'Faites toujours attention pour ne pas sélectionner quelqu\'un qui a déjà révélé son rôle.',
                'Agissez comme leurre en annonçant de fausses actions pour confondre les loups.'
            ],
            advanced: 'Si vous croyez être la prochaine cible, essayez de sélectionner un joueur clé pour que votre mort révèle des informations précieuses à votre équipe.'
        },
        lovers: {
            name: 'Lovers',
            team: 'good',
            image: 'https://platoapp.com/images/a8d57740-4363-11ef-bfb7-a598d323cbfc-card_lovers.webp',
            ability: '2 joueurs sont choisis et voient tous les deux leurs cartes. Tous les deux partagent la Dévotion, une capacité qui leur permet de résister à une attaque de loup. Notez que le Shapeshifter apparaît comme un Lover pour les deux.',
            tips: [
                'Ne révélez pas votre autre amant si vous devez déclarer votre rôle; protégez-le en le gardant caché.',
                'S\'il y a un Shapeshifter, connectez-vous tôt et demandez qui est le troisième amant.',
                'Maintenez la communication avec votre partenaire pour voter ensemble.'
            ],
            advanced: 'Analysez soigneusement la réponse du troisième Lover quand vous demandez; le Shapeshifter pourrait répondre correctement ou essayer de vous devancer. Votez toujours ensemble.'
        },
        druid: {
            name: 'Druid',
            team: 'good',
            image: 'https://platoapp.com/images/a8e8ff40-4363-11ef-bfb7-a598d323cbfc-card_druid.webp',
            ability: 'Choisit un joueur pendant la nuit; s\'il meurt cette nuit, le joueur sélectionné meurt aussi. Notez qu\'il ne peut pas choisir les joueurs révélés par le Mystic ou le Town Crier.',
            tips: [
                'Choisissez toujours quelqu\'un, ne vous laissez jamais tuer sans emmener quelqu\'un avec vous, mais choisissez soigneusement qui emmener ; c\'est un rôle risqué.',
                'Vous pouvez faire leurre en insinuant que vous êtes un rôle précieux pour vous faire tuer.',
                'Faites très attention pour repérer d\'éventuels loups et les avoir marqués.'
            ],
            advanced: 'Faites leurre avec quelqu\'un de spécifique et marquez-le en même temps. Si le joueur avec lequel vous faites leurre est un loup, il votera probablement pour vous instantanément, ce qui peut vous amener à tuer un loup.'
        },
        mystic: {
            name: 'Mystic',
            team: 'good',
            image: 'https://platoapp.com/images/a8b5ba40-4363-11ef-bfb7-a598d323cbfc-card_mystic.webp',
            ability: 'Sélectionne un joueur AFK (déconnecté) pendant la nuit pour révéler sa carte à tous les joueurs.',
            tips: [
                'Pré-écrivez et utilisez activement votre capacité; n\'attendez pas que d\'autres se déconnectent.',
                'Demandez avec attitude aux joueurs de se déconnecter brièvement pour être révélés.',
                'Envoyez un message juste avant de révéler pour qu\'aucun loup ne réclame votre action.',
                'N\'insistez pas avec un seul joueur; si le premier que vous demandez ne se déconnecte pas ou ne montre pas l\'intention de le faire, demandez rapidement à un autre.'
            ],
            advanced: 'Demandez directement à plusieurs joueurs de partir et évaluez leurs réactions et comportements pour révéler le plus suspect.'
        },
        thief: {
            name: 'Thief',
            team: 'good',
            image: 'https://platoapp.com/images/a8de29d0-4363-11ef-bfb7-a598d323cbfc-card_thief.webp',
            ability: 'Peut voler le vote de n\'importe quel joueur pendant la nuit, deux fois par partie.',
            tips: [
                'Gardez la capacité pour les moments critiques; ne volez pas de votes au hasard.',
                'Analysez le jeu et choisissez un joueur dont le vote peut changer le cours.',
                'Évitez de voler au hasard dans les premières nuits. Plus tard, un mauvais pourrait revendiquer votre rôle et vous n\'auriez aucun moyen de prouver votre innocence.'
            ],
            advanced: 'Utilisez votre capacité pour empêcher les loups de gagner un vote clé.'
        },
        harlot: {
            name: 'Harlot',
            team: 'good',
            image: 'https://platoapp.com/images/a8d32d50-4363-11ef-bfb7-a598d323cbfc-card_harlot.webp',
            ability: 'Tente un joueur pendant la nuit; si le joueur est bon, le Harlot est protégé, mais si ce joueur meurt ou est un loup, le Harlot meurt.',
            tips: [
                'Tentez pour vérifier les rôles et extraire des informations précieuses.',
                'Demandez discrètement au joueur tenté son rôle; un loup pourrait le réclamer et être démasqué.',
                'Ne tentez jamais si votre mort donnerait la victoire aux loups. Exemple : Jour 1 un villageois est tué, Nuit 1 vous ne pouvez pas tenter car les mauvais gagneraient par majorité.'
            ],
            advanced: 'Si vous mourez sans tenter et qu\'il ne reste plus de rôles informatifs, accusez quelqu\'un d\'être un loup et rétractez-vous instantanément s\'ils se défendent vite.'
        },
        bard: {
            name: 'Bard',
            team: 'good',
            image: 'https://platoapp.com/images/a8c6d140-4363-11ef-bfb7-a598d323cbfc-card_bard.webp',
            ability: 'Peut enchanter un autre joueur une fois par partie; tous les deux verront leurs cartes. Notez que le Shapeshifter apparaître avec un autre rôle de villageois.',
            tips: [
                'Pré-écrivez "Je suis Bard, j\'enchante PlayerX" secondes avant que la nuit ne se termine.',
                'S\'il y a un Shapeshifter, après avoir enchanté quelqu\'un, demandez au joueur de déclarer son rôle.',
                'Choisissez une cible qui peut donner des informations précieuses.'
            ],
            advanced: 'Dans une partie avec Wolf Shaman, dites que vous enchantiez sans révéler le nom du joueur; ainsi si vous enchantez un loup qui reste silencieux, vous pouvez le tuer sans problème.'
        },
        // Evil Roles
        alpha: {
            name: 'Alpha Wolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a88d4ab0-4363-11ef-bfb7-a598d323cbfc-card_alphawolf.webp',
            ability: 'Apparaît comme bon aux yeux du Seer, rendant la détection difficile.',
            tips: [
                'Restez en vie le plus longtemps possible; le Seer ne peut pas vous découvrir.',
                'Considérez le Seer comme un allié; ne lui volez jamais son rôle à moins que ce soit absolument nécessaire.',
                'Évitez de réclamer des rôles hâtivement sauf dans des manœuvres très spécifiques.'
            ],
            advanced: 'Considérez le Seer comme votre allié et essayez de l\'avoir de votre côté; ainsi, quand ce sera votre moment de réclamer un rôle, vous aurez le vote du Seer en votre faveur.'
        },
        werewolf: {
            name: 'Werewolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c96950-4363-11ef-bfb7-a598d323cbfc-card_werewolf.webp',
            ability: 'Ne possède aucune capacité spéciale. Vote pendant la nuit sur quel villageois tuer avec son équipe.',
            tips: [
                'Gardez un profil bas et suivez le plan de vos nouveaux coéquipiers.',
                'Profitez de votre innocence précédente pour dévier les soupçons.',
                'Ne réclamez rien à moins que ce soit absolument nécessaire.'
            ],
            advanced: 'Faites semblant d\'être un villageois commun et votez toujours pour protéger vos coéquipiers; sacrifiez-vous si cela assure la victoire pour l\'équipe Mauvais.'
        },
        vampire: {
            name: 'Vampire',
            team: 'evil',
            image: 'https://platoapp.com/images/a8db1c90-4363-11ef-bfb7-a598d323cbfc-card_vampire.webp',
            ability: 'Peut contrer la capacité du Doctor une fois par partie en utilisant son sang. Son vote compte comme zéro et il apparaît seulement comme mauvais pour le Seer.',
            tips: [
                'Toujours comme première tâche, essayez de tuer le Doctor la première nuit.',
                'Évitez d\'être le dernier loup en vie, puisque votre vote ne compte pas.',
                'Ne dites pas que vous êtes le Doctor; vous pourriez être lynché rapidement.'
            ],
            advanced: 'Si vous êtes le dernier loup en vie, essayez de passer inaperçu et déconnectez-vous vite au début de la nuit après avoir sélectionné quelqu\'un à tuer. Ne revenez pas avant la phase de vote, votre objectif est d\'éviter un 1vs1 avec le joueur contre qui vous essayez de gagner.'
        },
        witch: {
            name: 'Witch',
            team: 'evil',
            image: 'https://platoapp.com/images/a8969980-4363-11ef-bfb7-a598d323cbfc-card_witch.webp',
            ability: 'Peut choisir et révéler la carte d\'un joueur bon pendant la Discussion de Jour.',
            tips: [
                'Utilisez toujours votre capacité au début pour révéler un villageois qui vaut la peine d\'être tué.',
                'Après avoir révélé, la Witch n\'a pas beaucoup plus d\'utilité; vous pourriez servir de leurre.',
                'Continuez à essayer d\'aider votre équipe mais en sachant que vous pouvez être sacrifié.'
            ],
            advanced: 'Si vous révélez le Doctor alors qu\'il y a un Vampire, assurez-vous de le tuer dès que vous le pouvez; sinon évitez de le tuer la première nuit. Si vous révélez un autre rôle, vous pourriez le laisser en vie jusqu\'à ce que vous puissiez voler son rôle à un moment clé.'
        },
        siren: {
            name: 'Siren',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c28b80-4363-11ef-bfb7-a598d323cbfc-card_siren.webp',
            ability: 'Si lynchée pendant la journée, les villageois perdent leurs pouvoirs la nuit suivante.',
            tips: [
                'Il est possible que vos coéquipiers vous trahissent pour se débarrasser de rôles difficiles à tuer.',
                'Réclamez toujours des rôles que votre équipe ne peut pas tuer facilement.',
                'Priorisez votre mort avant celle de tout autre coéquipier. S\'ils discutent entre vous ou un camarade loup, ne soutenez pas sa mort, faites quelque chose pour que ce soit vous qui mourrez.',
                'Essayez de survivre aussi longtemps que possible malgré le fait que votre mort soit bénéfique.'
            ],
            advanced: 'Le premier jour, si des rôles comme King sont mentionnés, réclamez vite pour que les villageois se retrouvent sans pouvoir une nuit et un autre jour quand ils vous tueront.'
        },
        shapeshifter: {
            name: 'Shapeshifter',
            team: 'evil',
            image: 'https://platoapp.com/images/a8ce7260-4363-11ef-bfb7-a598d323cbfc-card_shapeshifter.webp',
            ability: 'Apparaît comme un villageois s\'il est révélé par Town Crier ou enchanté par Bard, comme un Lover pour les Lovers, et aléatoirement comme bon ou mauvais pour le Seer.',
            tips: [
                'Dans une partie avec Lovers, idéalement vous devriez être le premier à demander.',
                'S\'ils vous révèlent, vous devez déclarer un rôle; n\'attendez pas plus de 4 secondes.',
                'Essayez de vous défendre et ne vous rendez pas vite, insistez sur le mensonge.'
            ],
            advanced: 'Si vous vous infiltrez parmi les Lovers, manipulez-les pour qu\'ils ne se fassent pas confiance après la mort du premier, éliminant deux villageois consécutivement.'
        },
        nightmare: {
            name: 'Nightmare',
            team: 'evil',
            image: 'https://platoapp.com/images/a8a3b8e0-4363-11ef-bfb7-a598d323cbfc-card_nightmare.webp',
            ability: 'Pendant la Discussion de Jour, choisit un joueur à endormir, l\'empêchant d\'utiliser sa capacité la nuit suivante.',
            tips: [
                'Sélectionnez la victime soigneusement, en priorisant des rôles comme Doctor plutôt que Seer.',
                'Assurez-vous de ne pas endormir un rôle qu\'un coéquipier essaie de voler, car cela les exposerait.',
                'N\'utilisez pas la capacité sans raison; analysez la situation.',
                'Coordonnez-vous avec d\'autres loups pour profiter de la désactivation du meilleur rôle.'
            ],
            advanced: 'Endormez un rôle clé juste avant qu\'il utilise sa capacité décisive, forçant un échec et ouvrant la porte à une victoire de dernière minute.'
        },
        'wolf-shaman': {
            name: 'Wolf Shaman',
            team: 'evil',
            image: 'https://platoapp.com/images/a8cc4f80-4363-11ef-bfb7-a598d323cbfc-card_wolfshaman.webp',
            ability: 'Peut protéger un loup d\'être lynché pendant la journée une fois par partie; le loup protégé ne mourra pas quand il sera lynché.',
            tips: [
                'Gardez l\'écart entre les villageois morts et les loups vivants équilibré pour avoir une plus grande marge de victoire.',
                'Vous êtes le rôle qui peut vendre le reste des loups pour assurer la victoire.',
                'Ne dépensez jamais votre protection sur la Siren à moins que cela n\'accorde la victoire immédiate.',
                'Détournez l\'attention de vous-même pour utiliser votre pouvoir au moment le plus approprié.',
                'Décidez soigneusement quand protéger un coéquipier ou le garder pour vous.'
            ],
            advanced: 'Vous pouvez trahir vos coéquipiers en volant le rôle de Seer et en disant que vous les avez vérifiés. Quand l\'un d\'eux meurt, les villageois vous croiront probablement. À partir de là, guidez le jeu calmement tout en gardant votre protection en réserve.'
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

        // Update active state in role items
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
        detailTeam.textContent = role.team === 'good' ? 'Rôle Bon' : 'Rôle Mauvais';
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
