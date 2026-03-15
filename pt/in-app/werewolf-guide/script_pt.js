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

    // ROLES DATA (PORTUGUESE TRANSLATION)
    const rolesData = {
        // Good Roles
        seer: {
            name: 'Seer',
            team: 'good',
            image: 'https://platoapp.com/images/a8e44450-4363-11ef-bfb7-a598d323cbfc-card_seer.webp',
            ability: 'Toda noite, o Seer pode verificar um jogador para saber a qual equipe ele pertence. Papéis como Alpha Wolf, Shapeshifter, Jester e Lycan afetam parcial ou totalmente a autenticidade das informações que este papel pode fornecer.',
            tips: [
                'Leia tudo o que for dito com cuidado para saber quem verificar.',
                'Não revele informações desnecessariamente. Certifique-se de que não há papéis como Wolf Shaman antes de revelar informações.',
                'Caso haja um Assassin, forneça as informações a eles o mais rápido possível.',
                'Tenha atitude e faça-se ouvir.'
            ],
            advanced: 'O Seer pode fazer jogadas arriscadas como falsas acusações para pressionar um jogador. Se eles se revelarem instantaneamente ao serem acusados, é fundamental recuar e dar as informações reais; caso contrário, o Seer pode ser considerado um lobo.'
        },
        doctor: {
            name: 'Doctor',
            team: 'good',
            image: 'https://platoapp.com/images/a897f910-4363-11ef-bfb7-a598d323cbfc-card_doctor.webp',
            ability: 'Toda noite, o Doctor pode proteger um jogador ou a si mesmo, impedindo que morram se atacados pelos lobos. Isso pode nem sempre ser o caso se houver um Vampire; eles cancelam o Doctor uma vez por jogo se a pessoa salva pelo Doctor for morta por lobos.',
            tips: [
                'Pré-digite seu movimento (por exemplo, "Eu sou Doctor, salvando PlayerX") e envie no final da noite.',
                'Decida quem proteger com base nas informações disponíveis; proteja-se em noites avançadas.',
                'Tenha cautela quando há papéis que cancelam ou interferem com sua habilidade (Nightmare, Siren, Vampire).',
                'Sempre que houver Witch, você deve se proteger se não houver um papel mais importante para salvar.'
            ],
            advanced: 'Coordene com outros aldeões para proteger papéis-chave em momentos críticos e use sua autoproteção estrategicamente para sobreviver até o fim. Você também pode criar formas de confundir os lobos fazendo-os pensar que você não é o Doctor.'
        },
        knight: {
            name: 'Knight',
            team: 'good',
            image: 'https://platoapp.com/images/a8aa2180-4363-11ef-bfb7-a598d323cbfc-card_knight.webp',
            ability: 'Possui um escudo que o salva uma vez por jogo de um ataque de lobo. Não pode ser protegido pelo Doctor enquanto tiver seu escudo.',
            tips: [
                'O Knight pertence à Família Real; enquanto vivo, o King não pode ser morto pelos lobos.',
                'Aja como isca para atrair ataques de lobos desinformados e proteger outros aldeões.',
                'Lembre-se de que seu escudo ativa automaticamente e não se combina com a proteção do Doctor.'
            ],
            advanced: 'Engane os lobos insinuando que você é um papel valioso ou vulnerável para que desperdicem ataques, mas planeje sua isca para que não afete a Família Real. Use isca com papéis que não estão no jogo ou já foram revelados.'
        },
        princess: {
            name: 'Princess',
            team: 'good',
            image: 'https://platoapp.com/images/a8d61380-4363-11ef-bfb7-a598d323cbfc-card_princess.webp',
            ability: 'Sobrevive a um linchamento durante o dia; quando a habilidade ativa, seu cartão é revelado a todos os jogadores.',
            tips: [
                'A Princess pertence à Família Real; enquanto viva, o King não pode ser morto pelos lobos.',
                'Quando votada, reivindique um papel poderoso que não esteja em jogo para provocar um lobo desinformado a reivindicá-lo.',
                'Aproveite sua imunidade a linchamentos para obter informações sobre quem está votando em você.',
                'Seja cuidadoso ao não fazer isca sem motivo durante a noite para proteger o King.',
                'Não se deixe ser selecionado sem motivo, se puder evitar ser colocado em Julgamento, faça isso. Linchar a Princess é considerado desperdiçar um dia.'
            ],
            advanced: 'Quando colocada em Julgamento, declare um papel que não esteja no jogo; esta jogada pode levar um lobo nervoso ou desinformado a reivindicá-lo e assim se expor.'
        },
        hunter: {
            name: 'Hunter',
            team: 'good',
            image: 'https://platoapp.com/images/a8a5dbc0-4363-11ef-bfb7-a598d323cbfc-card_hunter.webp',
            ability: 'Ao morrer à noite, tem 75% de chance de levar um lobo aleatório consigo.',
            tips: [
                'Aja como isca anunciando feitiços ou revelações para incitar os lobos a atacá-lo.',
                'Peça aos jogadores para desconectarem para "revelá-los" e assim enganar os lobos.',
                'Mantenha-se ativo e comunicativo para maximizar o impacto de seu papel falso nos lobos.',
                'Fazer isca à noite serve como desculpa ao defender seu papel. Explique que estava fazendo isca para ver se o matariam porque você é o Hunter. (Maligno pode usar este argumento também)'
            ],
            advanced: 'Finja ser algum outro papel que alerte os lobos para atrair ataques, mas esteja preparado para retrair se tornar contraproducente.'
        },
        necromancer: {
            name: 'Necromancer',
            team: 'good',
            image: 'https://platoapp.com/images/a8da0b20-4363-11ef-bfb7-a598d323cbfc-card_necromancer.webp',
            ability: 'Pode ressuscitar um aldeão morto uma vez por jogo durante a noite.',
            tips: [
                'Pré-digite sua ação e envie pouco antes da noite terminar para que fique claro que é realmente você.',
                'Use sua habilidade o mais rápido possível; não espere um papel mais valioso morrer.',
                'Coordene com sua equipe para ressuscitar o jogador cuja habilidade oferece a maior vantagem.'
            ],
            advanced: 'Em disputas onde há um lobo reivindicando ser Necromancer, se a situação permitir, proponha ressuscitar jogadores diferentes; quem cumprir a promessa será o verdadeiro.'
        },
        king: {
            name: 'King',
            team: 'good',
            image: 'https://platoapp.com/images/a8e359f0-4363-11ef-bfb7-a598d323cbfc-card_king.webp',
            ability: 'Enquanto o Knight, Princess ou Jester estiverem vivos, o King não pode ser morto pelos lobos à noite. Se linchado, os aldeões não poderão usar suas habilidades na noite seguinte.',
            tips: [
                'Use sua imunidade para agir como isca nas primeiras noites, desviando ataques dos lobos.',
                'Não revele seu papel a menos que necessário; sua imunidade é perdida se membros da Família Real morrerem.',
                'Evite ser linchado a todo custo, pois sua morte deixa sua equipe impotente por uma noite.'
            ],
            advanced: 'Finja ser um papel que alerte os lobos para atrair sua atenção e tente ser morto, assim protegendo papéis mais importantes. Esclareça o que fez instantaneamente se alguém o acusar.'
        },
        jester: {
            name: 'Jester',
            team: 'good',
            image: 'https://platoapp.com/images/a8bd5b60-4363-11ef-bfb7-a598d323cbfc-card_jester.webp',
            ability: 'Só vence se for morto, seja durante o dia ou noite. Pode aparecer aleatoriamente como bom ou mau para o Seer.',
            tips: [
                'Não desperdice ou "queime" papéis de outros; embora sua condição de vitória seja diferente, você ainda é um aldeão.',
                'Engane para ser morto pelos lobos, por exemplo fingindo um papel inexistente.',
                'Aproveite a confusão para extrair informações das reações dos outros.',
                'Sempre jogue sem trollar ou arruinar a experiência de jogo dos outros.'
            ],
            advanced: 'Se votarem em você no primeiro dia, você pode se revelar como Jester ou declarar um papel ausente do jogo para sacrificar sua vida e tentar ajudar a equipe do bem.',
            warning: 'Não revele o papel real de outro jogador apenas para obter a vitória — isso força um inocente a se defender desnecessariamente e pode arruinar o jogo dele. Se quiser afirmar algo, sempre escolha um papel ausente do jogo.'
        },
        lycan: {
            name: 'Lycan',
            team: 'good',
            image: 'https://platoapp.com/images/a8e073c0-4363-11ef-bfb7-a598d323cbfc-card_lycan.webp',
            ability: 'Aldeão amaldiçoado que, se morto à noite pelos lobos, se transforma em Werewolf. O Seer o vê como aldeão antes de se transformar, e esta informação não muda.',
            tips: [
                'Avalie com qual equipe quer jogar; inicialmente, você é sempre apenas outro aldeão.',
                'Antes de trair, certifique-se de que pode confiar nos lobos; eles podem enganá-lo.',
                'Mantenha um perfil baixo até decidir sua lealdade definitiva.'
            ],
            advanced: 'Negocie com os lobos para coordenar sua transformação e alcançar a vitória, mas tenha um plano alternativo em caso de traição.',
            warning: 'Você é um aldeão até se transformar. Forçar outro aldeão a revelar seu papel para seu próprio benefício pode custar diretamente ao time do bem a partida — e como você faz parte desse time até se transformar, você também perde.'
        },
        mayor: {
            name: 'Mayor',
            team: 'good',
            image: 'https://platoapp.com/images/a8c79490-4363-11ef-bfb7-a598d323cbfc-card_mayor.webp',
            ability: 'Seu voto conta em dobro em todas as fases de votação.',
            tips: [
                'Você deve ser cauteloso; registros de votação podem mostrar quem é o Mayor.',
                'Preste atenção extrema a tudo que for dito, pois seu voto muda drasticamente o curso de um jogo.',
                'Use seu voto duplo para guiar a votação em direção a suspeitos ou jogadores verificados.',
                'Você pode servir como isca à noite, embora o benefício seja limitado.'
            ],
            advanced: 'Verifique quem está mentindo verificando o chat e histórico de votação, e confronte impostores com sua influência de voto.'
        },
        assassin: {
            name: 'Assassin',
            team: 'good',
            image: 'https://platoapp.com/images/a8e1d350-4363-11ef-bfb7-a598d323cbfc-card_assassin.webp',
            ability: 'Pode assassinar um jogador uma vez por jogo durante a noite.',
            tips: [
                'Sempre use sua habilidade na primeira noite para eliminar um possível lobo.',
                'Priorize alvos confirmados pelo Seer ou com comportamento suspeito.',
                'Não mate aleatoriamente; um erro pode prejudicar sua equipe.',
                'Se alguém declarar seu papel, reivindique-o; todo papel é reivindicado e o Assassin não é exceção.'
            ],
            advanced: 'Certifique-se de sempre pré-digitar quem vai matar para que ninguém possa roubar seu papel (Ex: "Eu sou assa eu mato PlayerX"). Coordene com papéis de informação para executar um lobo.'
        },
        'town-crier': {
            name: 'Town Crier',
            team: 'good',
            image: 'https://platoapp.com/images/a8ddb4a0-4363-11ef-bfb7-a598d323cbfc-card_towncrier.webp',
            ability: 'Seleciona um jogador durante a noite; se morrer, o papel do jogador selecionado será revelado a todos. Saiba que o Shapeshifter aparece com outro papel bom quando revelado pelo Town Crier.',
            tips: [
                'Use sua seleção com cuidado para dar informação se você morrer.',
                'Sempre preste atenção para não selecionar alguém que já revelou seu papel.',
                'Aja como isca anunciando ações falsas para confundir os lobos.'
            ],
            advanced: 'Se acredita que é o próximo alvo, tente selecionar um jogador-chave para que sua morte revele informações valiosas para sua equipe.'
        },
        lovers: {
            name: 'Lovers',
            team: 'good',
            image: 'https://platoapp.com/images/a8d57740-4363-11ef-bfb7-a598d323cbfc-card_lovers.webp',
            ability: '2 jogadores são escolhidos e ambos veem seus cartões. Ambos compartilham Devoção, uma habilidade que os faz resistir a um ataque de lobo. Saiba que o Shapeshifter aparece como Lover para ambos.',
            tips: [
                'Não revele seu outro amante se deve declarar seu papel; proteja-o mantendo-o escondido.',
                'Se houver um Shapeshifter, conecte-se cedo e pergunte quem é o terceiro amante.',
                'Mantenha comunicação com seu parceiro para votar juntos.'
            ],
            advanced: 'Analise cuidadosamente a resposta do terceiro Lover quando perguntar; o Shapeshifter pode responder corretamente ou tentar antecipar-se a você. Sempre votem juntos.'
        },
        druid: {
            name: 'Druid',
            team: 'good',
            image: 'https://platoapp.com/images/a8e8ff40-4363-11ef-bfb7-a598d323cbfc-card_druid.webp',
            ability: 'Escolhe um jogador durante a noite; se morrerem naquela noite, o jogador selecionado também morre. Saiba que não pode escolher jogadores revelados pelo Mystic ou Town Crier.',
            tips: [
                'Sempre escolha alguém, nunca deixe-se matar sem levar alguém com você, mas escolha cuidadosamente quem levar; é um papel arriscado.',
                'Você pode usar isca insinuando que é um papel valioso para ser morto.',
                'Preste muita atenção para identificar possíveis lobos e tê-los marcados.'
            ],
            advanced: 'Use isca com alguém específico e marque-o ao mesmo tempo. Se o jogador com quem você usa isca for um lobo, eles provavelmente votarão em você instantaneamente, o que pode levá-lo a matar um lobo.'
        },
        mystic: {
            name: 'Mystic',
            team: 'good',
            image: 'https://platoapp.com/images/a8b5ba40-4363-11ef-bfb7-a598d323cbfc-card_mystic.webp',
            ability: 'Seleciona um jogador AFK (desconectado) durante a noite para revelar seu cartão a todos os jogadores.',
            tips: [
                'Pré-digite e use ativamente sua habilidade; não espere outros desconectarem.',
                'Peça com atitude para jogadores desconectarem brevemente para serem revelados.',
                'Envie uma mensagem pouco antes de revelar para que nenhum lobo reivindique sua ação.',
                'Não insista com um único jogador; se o primeiro que você perguntar não ficar AFK ou mostrar intenção de fazê-lo, pergunte rapidamente a outro.'
            ],
            advanced: 'Peça diretamente a vários jogadores para saírem e avalie suas reações e comportamentos para revelar o mais suspeito.'
        },
        thief: {
            name: 'Thief',
            team: 'good',
            image: 'https://platoapp.com/images/a8de29d0-4363-11ef-bfb7-a598d323cbfc-card_thief.webp',
            ability: 'Pode roubar o voto de qualquer jogador durante a noite, duas vezes por jogo.',
            tips: [
                'Guarde a habilidade para momentos críticos; não roube votos aleatoriamente.',
                'Analise o jogo e escolha um jogador cujo voto pode mudar o curso.',
                'Evite roubar aleatoriamente nas primeiras noites. Mais tarde, um maligno pode reivindicar seu papel e você não teria como provar sua inocência.'
            ],
            advanced: 'Use sua habilidade para impedir que os lobos vençam uma votação-chave.'
        },
        harlot: {
            name: 'Harlot',
            team: 'good',
            image: 'https://platoapp.com/images/a8d32d50-4363-11ef-bfb7-a598d323cbfc-card_harlot.webp',
            ability: 'Tenta um jogador durante a noite; se o jogador for bom, a Harlot é protegida, mas se aquele jogador morrer ou for um lobo, a Harlot morre.',
            tips: [
                'Tente verificar papéis e extrair informações valiosas.',
                'Discretamente pergunte ao jogador tentado sobre seu papel; um lobo pode reivindicar e ser desmascarado.',
                'Nunca tente se sua morte conceder vitória aos lobos. Exemplo: Dia 1 um aldeão é morto, Noite 1 você não pode tentar porque os lobos venceriam por maioria.'
            ],
            advanced: 'Se você morrer sem tentar e não restarem papéis informativos, acuse alguém de ser lobo e retrate-se instantaneamente se eles se defenderem rapidamente.'
        },
        bard: {
            name: 'Bard',
            team: 'good',
            image: 'https://platoapp.com/images/a8c6d140-4363-11ef-bfb7-a598d323cbfc-card_bard.webp',
            ability: 'Pode encantar outro jogador uma vez por jogo; ambos verão seus cartões. Saiba que o Shapeshifter aparecerá com outro papel de aldeão.',
            tips: [
                'Pré-digite "Eu sou Bard, encantando PlayerX" segundos antes da noite terminar.',
                'Se houver um Shapeshifter, após encantar alguém, peça ao jogador para declarar seu papel.',
                'Escolha um alvo que possa dar informações valiosas.'
            ],
            advanced: 'Em um jogo com Wolf Shaman, diga que está encantando sem revelar o nome do jogador; assim se você encantar um lobo que fica em silêncio, pode matá-lo sem problema.'
        },
        // Evil Roles
        alpha: {
            name: 'Alpha Wolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a88d4ab0-4363-11ef-bfb7-a598d323cbfc-card_alphawolf.webp',
            ability: 'Aparece como bom aos olhos do Seer, tornando a detecção difícil.',
            tips: [
                'Mantenha-se vivo o maior tempo possível; o Seer não pode descobri-lo.',
                'Considere o Seer um aliado; nunca roube seu papel a menos que absolutamente necessário.',
                'Evite reivindicar papéis apressadamente exceto em jogadas muito específicas.'
            ],
            advanced: 'Considere o Seer seu aliado e tente tê-lo ao seu lado; assim, quando for seu momento de reivindicar um papel, você terá o voto do Seer a seu favor.'
        },
        werewolf: {
            name: 'Werewolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c96950-4363-11ef-bfb7-a598d323cbfc-card_werewolf.webp',
            ability: 'Não possui habilidades especiais. Vota durante a noite em qual aldeão matar com sua equipe.',
            tips: [
                'Mantenha um perfil baixo e siga o plano de seus novos companheiros de equipe.',
                'Aproveite sua inocência anterior para desviar suspeitas.',
                'Não reivindique nada a menos que absolutamente necessário.'
            ],
            advanced: 'Finja ser um aldeão comum e sempre vote para proteger seus companheiros de equipe; sacrifique-se se isso garantir vitória para a equipe do Mal.'
        },
        vampire: {
            name: 'Vampire',
            team: 'evil',
            image: 'https://platoapp.com/images/a8db1c90-4363-11ef-bfb7-a598d323cbfc-card_vampire.webp',
            ability: 'Pode neutralizar a habilidade do Doctor uma vez por jogo usando seu sangue. Seu voto conta como zero e ele aparece apenas como mau para o Seer.',
            tips: [
                'Sempre como primeira tarefa, tente matar o Doctor na primeira noite.',
                'Evite ser o último lobo vivo, já que seu voto não conta.',
                'Não diga que é o Doctor; você pode ser linchado rapidamente.'
            ],
            advanced: 'Se você for o último lobo vivo, tente passar despercebido e desconecte-se rapidamente no início da noite após selecionar alguém para matar.'
        },
        witch: {
            name: 'Witch',
            team: 'evil',
            image: 'https://platoapp.com/images/a8969980-4363-11ef-bfb7-a598d323cbfc-card_witch.webp',
            ability: 'Pode escolher e revelar o cartão de um jogador bom durante a Discussão do Dia.',
            tips: [
                'Sempre use sua habilidade no início para revelar um aldeão que vale a pena matar.',
                'Após revelar, a Witch não tem muita mais utilidade; você pode servir como isca.',
                'Continue tentando ajudar sua equipe mas sabendo que pode ser descartada.'
            ],
            advanced: 'Se você revelar o Doctor enquanto houver um Vampire, certifique-se de matá-lo assim que puder; caso contrário evite matá-lo na primeira noite.'
        },
        siren: {
            name: 'Siren',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c28b80-4363-11ef-bfb7-a598d323cbfc-card_siren.webp',
            ability: 'Se linchada durante o dia, os aldeões perdem seus poderes na noite seguinte.',
            tips: [
                'Existe a possibilidade de seus companheiros de equipe te venderem para se livrar de papéis difíceis de matar.',
                'Sempre reivindique papéis que sua equipe não pode matar facilmente.',
                'Priorize sua morte antes de qualquer outro companheiro de equipe. Se estiverem discutindo entre você ou um lobo companheiro, não apoie a morte deles, faça algo para que seja você quem morra.',
                'Tente sobreviver o maior tempo possível apesar de sua morte ser benéfica.'
            ],
            advanced: 'No primeiro dia, se papéis como King forem mencionados, reivindique rapidamente para que os aldeões fiquem sem poderes uma noite e outro dia quando matarem você.'
        },
        shapeshifter: {
            name: 'Shapeshifter',
            team: 'evil',
            image: 'https://platoapp.com/images/a8ce7260-4363-11ef-bfb7-a598d323cbfc-card_shapeshifter.webp',
            ability: 'Aparece como aldeão se revelado por Town Crier ou encantado por Bard, como Lover para os Lovers, e aleatoriamente como bom ou mau para o Seer.',
            tips: [
                'Em um jogo com Lovers, idealmente você deve ser o primeiro a perguntar.',
                'Se revelarem você, você tem que declarar um papel; não espere mais de 4 segundos.',
                'Tente defender-se e não desista rapidamente, insista na mentira.'
            ],
            advanced: 'Se se infiltrar entre os Lovers, manipule-os para que não acreditem uns nos outros após a morte do primeiro, eliminando dois aldeões consecutivamente.'
        },
        nightmare: {
            name: 'Nightmare',
            team: 'evil',
            image: 'https://platoapp.com/images/a8a3b8e0-4363-11ef-bfb7-a598d323cbfc-card_nightmare.webp',
            ability: 'Durante a Discussão do Dia, escolhe um jogador para adormecer, impedindo-o de usar sua habilidade na noite seguinte.',
            tips: [
                'Selecione a vítima com cuidado, priorizando papéis como Doctor em vez de Seer.',
                'Certifique-se de não colocar para dormir um papel que um companheiro está tentando roubar, pois isso os deixa expostos.',
                'Não use a habilidade sem razão; analise a situação.',
                'Coordene com outros lobos para aproveitar a desativação do melhor papel.'
            ],
            advanced: 'Adormeça um papel-chave pouco antes de ele usar sua habilidade decisiva, forçando um fracasso e abrindo as portas para uma vitória de última hora.'
        },
        'wolf-shaman': {
            name: 'Wolf Shaman',
            team: 'evil',
            image: 'https://platoapp.com/images/a8cc4f80-4363-11ef-bfb7-a598d323cbfc-card_wolfshaman.webp',
            ability: 'Pode proteger um lobo de ser linchado durante o dia uma vez por jogo; o lobo protegido não morrerá quando linchado.',
            tips: [
                'Mantenha o equilíbrio entre aldeões mortos e lobos vivos para ter maior margem de vitória.',
                'Você é o papel que pode vender o resto dos lobos para garantir a vitória.',
                'Nunca gaste sua proteção na Siren a menos que isso conceda vitória imediata.',
                'Desvie a atenção de si mesmo para usar seu poder no momento mais adequado.',
                'Decida cuidadosamente quando proteger um companheiro de equipe ou guardar para si.'
            ],
            advanced: 'Você pode vender seus companheiros de equipe roubando o papel de Seer e afirmando que verificou alguém. Quando um deles morrer, os aldeões provavelmente acreditarão em você. A partir daí, guie o jogo com calma enquanto mantém sua proteção em reserva.'
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
        detailTeam.textContent = role.team === 'good' ? 'Papel do Bem' : 'Papel do Mal';
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
