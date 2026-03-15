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

    // ROLES DATA (ESPAÑOL)
    const rolesData = {
        // Good Roles
        seer: {
            name: 'Seer',
            team: 'good',
            image: 'https://platoapp.com/images/a8e44450-4363-11ef-bfb7-a598d323cbfc-card_seer.webp',
            ability: 'Cada noche, la Seer puede revisar un jugador para saber a qué equipo pertenece. Roles como Alpha Wolf, Shapeshifter, Jester y Lycan afectan parcial o totalmente la autenticidad de la información que puede proporcionar este rol.',
            tips: [
                'Leé con atención todo lo que se dice para saber a quién revisar.',
                'No reveles información innecesariamente. Asegurate de que no haya roles como Wolf Shaman antes de revelar info.',
                'En caso de que haya Assassin, proporcionále tu información lo más rápido posible.',
                'Tené actitud y hacete escuchar.'
            ],
            advanced: 'La Seer puede hacer jugadas arriesgadas como fingir acusaciones falsas para presionar a un jugador. Si se revelan instantáneamente al ser acusados, es clave retroceder y dar la información real; de lo contrario, la Seer podría ser considerada lobo.'
        },
        doctor: {
            name: 'Doctor',
            team: 'good',
            image: 'https://platoapp.com/images/a897f910-4363-11ef-bfb7-a598d323cbfc-card_doctor.webp',
            ability: 'Cada noche, el Doctor puede proteger a un jugador o a sí mismo, evitando que muera si es atacado por los lobos. Esto puede no ser siempre así si hay un Vampire; ellos anulan al Doctor una vez por partida si la persona salvada por el Doctor es asesinada por lobos.',
            tips: [
                'Pre-typea tu jugada (por ejemplo, "Soy Doctor, salvando a JugadorX") y enviala al final de la noche. Asegurate de realmente salvar a ese jugador; de lo contrario, te estarías revelando sin razón y podrías ser el próximo objetivo.',
                'Decidí a quién proteger basándote en la información disponible; protegéte en noches avanzadas.',
                'Tené cuidado con roles que cancelan o interfieren con tu habilidad (Nightmare, Siren, Vampire).',
                'Siempre que haya Witch, tenés que salvarte a vos mismo si no hay un rol más importante que salvar.'
            ],
            advanced: 'Coordiná con otros aldeanos para proteger roles clave en momentos críticos y usá tu auto-protección estratégicamente para sobrevivir hasta el final. También podés idear formas de confundir a los lobos haciéndoles pensar que no sos el Doctor.'
        },
        knight: {
            name: 'Knight',
            team: 'good',
            image: 'https://platoapp.com/images/a8aa2180-4363-11ef-bfb7-a598d323cbfc-card_knight.webp',
            ability: 'Posee un escudo que lo salva una vez por partida de un ataque de lobo. No puede ser protegido por el Doctor mientras tiene su escudo.',
            tips: [
                'El Knight pertenece a la Familia Real; mientras viva, el King no puede ser asesinado por lobos.',
                'Actuá como cebo para atraer ataques de lobos despistados y proteger a otros aldeanos.',
                'Recordá que tu escudo se activa automáticamente y no se combina con la protección del Doctor.'
            ],
            advanced: 'Engañá a los lobos insinuando que sos un rol valioso o vulnerable para que desperdicien ataques, pero planificá tu cebo para que no afecte a la Familia Real. Cebo con roles que no están en el juego o que ya fueron revelados. Si es necesario, aclarás después que lo hiciste porque sos el Knight.'
        },
        princess: {
            name: 'Princess',
            team: 'good',
            image: 'https://platoapp.com/images/a8d61380-4363-11ef-bfb7-a598d323cbfc-card_princess.webp',
            ability: 'Sobrevive a un linchamiento durante el día; cuando la habilidad se activa, su carta se revela a todos los jugadores.',
            tips: [
                'La Princess pertenece a la Familia Real; mientras viva, el King no puede ser asesinado por lobos.',
                'Cuando voten por vos, reclamá un rol poderoso que no esté en juego para provocar que un lobo despistado lo reclame.',
                'Aprovechá tu inmunidad al linchamiento para obtener información sobre quién te está votando.',
                'Tené cuidado de no hacer cebo sin razón durante la noche para proteger al King.',
                'No te dejes seleccionar sin razón; si podés evitar ser puesto en Juicio, hacelo. Linchar a la Princess se considera desperdiciar un día.'
            ],
            advanced: 'Cuando te pongan en Juicio, declará un rol que no esté en el juego; esta jugada puede llevar a un lobo nervioso o despistado a reclamarlo y así exponerse.'
        },
        hunter: {
            name: 'Hunter',
            team: 'good',
            image: 'https://platoapp.com/images/a8a5dbc0-4363-11ef-bfb7-a598d323cbfc-card_hunter.webp',
            ability: 'Al morir de noche, tiene un 75% de chances de llevarse un lobo aleatorio con él.',
            tips: [
                'Actuá como cebo anunciando hechizos o revelaciones para incitar a los lobos a atacarte.',
                'Pedí a los jugadores que se desconecten para "revelarlos" y así engañar a los lobos.',
                'Mantenete activo y comunicativo para maximizar el impacto de tu rol falso sobre los lobos.',
                'Hacer cebo de noche sirve como excusa al defender tu rol. Explicá que estabas cebando para ver si te mataban porque sos el Hunter. (Los malos también pueden usar este argumento)'
            ],
            advanced: 'Fingí ser otro rol que alerte a los lobos para atraer ataques, pero estate preparado para retractarte si se vuelve contraproducente.'
        },
        necromancer: {
            name: 'Necromancer',
            team: 'good',
            image: 'https://platoapp.com/images/a8da0b20-4363-11ef-bfb7-a598d323cbfc-card_necromancer.webp',
            ability: 'Puede resucitar a un aldeano muerto una vez por partida durante la noche.',
            tips: [
                'Pre-escribí tu acción y enviala justo antes de que termine la noche para que quede claro que realmente sos vos.',
                'Usá tu habilidad lo antes posible; no esperes a que muera un rol más valioso.',
                'Coordiná con tu equipo para resucitar al jugador cuya habilidad ofrezca la mayor ventaja.'
            ],
            advanced: 'En disputas donde hay un lobo reclamando ser Necromancer, si la situación lo permite, proponé resucitar jugadores diferentes; quien cumpla con la promesa será el verdadero.'
        },
        king: {
            name: 'King',
            team: 'good',
            image: 'https://platoapp.com/images/a8e359f0-4363-11ef-bfb7-a598d323cbfc-card_king.webp',
            ability: 'Mientras el Knight, Princess o Jester estén vivos, el King no puede ser asesinado por lobos de noche. Si es linchado, los aldeanos no podrán usar sus habilidades la noche siguiente.',
            tips: [
                'Usá tu inmunidad para actuar como cebo en las primeras noches, desviando ataques de los lobos.',
                'No revelés tu rol a menos que sea necesario; tu inmunidad se pierde si mueren miembros de la Familia Real.',
                'Evitá ser linchado a toda costa, ya que tu muerte deja a tu equipo sin poderes por una noche.'
            ],
            advanced: 'Fingí ser un rol que alerte a los lobos para atraer su atención y tratá de ser asesinado, protegiendo así roles más importantes. Aclará al instante lo que hiciste si alguien te acusa.'
        },
        jester: {
            name: 'Jester',
            team: 'good',
            image: 'https://platoapp.com/images/a8bd5b60-4363-11ef-bfb7-a598d323cbfc-card_jester.webp',
            ability: 'Solo gana si es asesinado, ya sea de día o de noche. Puede aparecer aleatoriamente como bueno o malo para la Vidente.',
            tips: [
                'No gastes ni "quemes" otros roles; aunque tu condición de victoria sea diferente, todavía sos un aldeano.',
                'Engañá para que te maten los lobos, por ejemplo fingiendo un rol inexistente.',
                'Aprovechá la confusión para extraer información de las reacciones de otros. Si querés, podés ayudar a que gane otro equipo.',
                'Jugá siempre sin hacer trollear ni arruinar la experiencia de juego de los demás.'
            ],
            advanced: 'Si te votan el primer día, podés revelarte como Jester o declarar un rol ausente del juego para sacrificar tu vida y tratar de ayudar al equipo bueno.',
            warning: 'No reveles el rol real de otro jugador solo para ganar la partida — obliga a un inocente a defenderse innecesariamente y puede arruinar su partida. Si querés reclamar algo, siempre elegí un rol ausente del juego.'
        },
        lycan: {
            name: 'Lycan',
            team: 'good',
            image: 'https://platoapp.com/images/a8e073c0-4363-11ef-bfb7-a598d323cbfc-card_lycan.webp',
            ability: 'Aldeano maldito que, si muere de noche a manos de lobos, se transforma en Werewolf. La Seer lo ve como aldeano antes de transformarse, y esta info no cambia.',
            tips: [
                'Evaluá con qué equipo querés jugar; inicialmente, siempre sos solo otro aldeano.',
                'Antes de traicionar, asegurate de poder confiar en los lobos; ellos podrían engañarte.',
                'Mantené un perfil bajo hasta decidir tu lealtad definitiva.'
            ],
            advanced: 'Negociá con los lobos para coordinar tu transformación y lograr la victoria, pero tené un plan alternativo en caso de traición.',
            warning: 'Sos un villager hasta que te transformás. Obligar a otro villager a revelar su rol para tu propio beneficio puede costarle la partida directamente al equipo bueno — y dado que sos parte de ese equipo hasta que te transformes, vos también perdés.'
        },
        mayor: {
            name: 'Mayor',
            team: 'good',
            image: 'https://platoapp.com/images/a8c79490-4363-11ef-bfb7-a598d323cbfc-card_mayor.webp',
            ability: 'Su voto cuenta doble en todas las fases de votación.',
            tips: [
                'Debés ser cauteloso; los registros de votación pueden mostrar quién es el Mayor.',
                'Prestá atención extrema a todo lo dicho, ya que tu voto cambia drásticamente el curso de una partida.',
                'Usá tu voto doble para guiar la votación hacia sospechosos o jugadores verificados.',
                'Podés servir como cebo de noche, aunque el beneficio es limitado.'
            ],
            advanced: 'Verificá quién miente revisando el historial de chat y votación, y confrontá a los impostores con tu influencia de voto.'
        },
        assassin: {
            name: 'Assassin',
            team: 'good',
            image: 'https://platoapp.com/images/a8e1d350-4363-11ef-bfb7-a598d323cbfc-card_assassin.webp',
            ability: 'Puede asesinar a un jugador una vez por partida durante la noche.',
            tips: [
                'Usá siempre tu habilidad la primera noche para eliminar un posible lobo.',
                'Priorizá objetivos confirmados por la Seer o con comportamiento sospechoso.',
                'No matés al azar; un error podría perjudicar a tu equipo.',
                'Si alguien más dice tu rol, reclamálo; todos los roles son reclamados y el Assassin no es la excepción.'
            ],
            advanced: 'Asegurate de siempre pre-escribir a quién vas a matar para que nadie pueda robar tu rol (Ej: "Soy asesino mato a JugadorX"). Coordiná con roles informativos para ejecutar a un lobo.'
        },
        'town-crier': {
            name: 'Town Crier',
            team: 'good',
            image: 'https://platoapp.com/images/a8ddb4a0-4363-11ef-bfb7-a598d323cbfc-card_towncrier.webp',
            ability: 'Selecciona un jugador durante la noche; si muere, el rol del jugador seleccionado se revelará a todos. Tené en cuenta que el Shapeshifter aparece con otro rol bueno al ser revelado por el Town Crier.',
            tips: [
                'Usá tu selección cuidadosamente para dar información si morís.',
                'Prestá siempre atención para no seleccionar a alguien que ya haya revelado su rol.',
                'Actuá como cebo anunciando acciones falsas para confundir a los lobos.'
            ],
            advanced: 'Si creés que sos el próximo objetivo, tratá de seleccionar a un jugador clave para que tu muerte revele información valiosa a tu equipo.'
        },
        lovers: {
            name: 'Lovers',
            team: 'good',
            image: 'https://platoapp.com/images/a8d57740-4363-11ef-bfb7-a598d323cbfc-card_lovers.webp',
            ability: 'Se eligen 2 jugadores y ambos ven sus cartas. Ambos comparten Devoción, una habilidad que les permite resistir un ataque de lobo. Tené en cuenta que el Shapeshifter aparece como Lovers para ambos.',
            tips: [
                'No reveles a tu otro amante si debés declarar tu rol; protegélo manteniéndolo oculto.',
                'Si hay un Shapeshifter, conectate temprano y preguntá quién es el tercer amante.',
                'Mantené comunicación con tu compañero para votar juntos.'
            ],
            advanced: 'Analizá cuidadosamente la respuesta del tercer Lover cuando preguntás; el Shapeshifter podría responder correctamente o intentar adelantarse. Siempre voten juntos.'
        },
        druid: {
            name: 'Druid',
            team: 'good',
            image: 'https://platoapp.com/images/a8e8ff40-4363-11ef-bfb7-a598d323cbfc-card_druid.webp',
            ability: 'Elige un jugador durante la noche; si muere esa noche, el jugador seleccionado también muere. Tené en cuenta que no puede elegir jugadores revelados por el Mystic o el Town Crier.',
            tips: [
                'Siempre elegí a alguien, nunca te dejés matar sin llevarte a alguien con vos, pero elegí con cuidado a quién llevarte; es un rol arriesgado.',
                'Podés hacer cebo insinuando que sos un rol valioso para que te maten.',
                'Prestá mucha atención para detectar posibles lobos y tenerlos marcados.'
            ],
            advanced: 'Hacé cebo con alguien específico y marcálo al mismo tiempo. Si el jugador con el que hacés cebo es un lobo, probablemente te voten al instante, lo que puede llevar a que mates a un lobo.'
        },
        mystic: {
            name: 'Mystic',
            team: 'good',
            image: 'https://platoapp.com/images/a8b5ba40-4363-11ef-bfb7-a598d323cbfc-card_mystic.webp',
            ability: 'Selecciona un jugador AFK (desconectado) durante la noche para revelar su carta a todos los jugadores.',
            tips: [
                'Pre-escribí y usá activamente tu habilidad; no esperes a que otros se desconecten.',
                'Pedí con actitud a los jugadores que se desconecten brevemente para ser revelados.',
                'Envíá un mensaje justo antes de revelar para que ningún lobo reclame tu acción.',
                'No insistas con un solo jugador; si el primero al que le pedís no se desconecta ni muestra intención de hacerlo, pedile a otro rápido.'
            ],
            advanced: 'Pedile directamente a varios jugadores que se vayan y evaluá sus reacciones y comportamientos para revelar al más sospechoso.'
        },
        thief: {
            name: 'Thief',
            team: 'good',
            image: 'https://platoapp.com/images/a8de29d0-4363-11ef-bfb7-a598d323cbfc-card_thief.webp',
            ability: 'Puede robar el voto de cualquier jugador durante la noche, dos veces por partida.',
            tips: [
                'Guardá la habilidad para momentos críticos; no robes votos al azar.',
                'Analizá el juego y elegí un jugador cuyo voto pueda cambiar el curso.',
                'Evitá robar al azar en las primeras noches. Más adelante un malo podría reclamar tu rol y no tendrías forma de probar tu inocencia.'
            ],
            advanced: 'Usá tu habilidad para evitar que los lobos ganen una votación clave.'
        },
        harlot: {
            name: 'Harlot',
            team: 'good',
            image: 'https://platoapp.com/images/a8d32d50-4363-11ef-bfb7-a598d323cbfc-card_harlot.webp',
            ability: 'Seduce a un jugador durante la noche; si el jugador es bueno, la Harlot está protegida, pero si ese jugador muere o es un lobo, la Harlot muere.',
            tips: [
                'Seducí para verificar roles y extraer información valiosa.',
                'Preguntá discretamente al jugador seducido por su rol; un lobo podría reclamar y ser desenmascarado.',
                'Nunca seduzcas si tu muerte le daría la victoria a los lobos. Ejemplo: Día 1 se mata a un aldeano, Noche 1 no podés seducir porque los malos ganarían por mayoría.'
            ],
            advanced: 'Si morís sin tentar y no quedan roles informativos, acusá a alguien de ser lobo y retractate al instante si se defienden rápido.'
        },
        bard: {
            name: 'Bard',
            team: 'good',
            image: 'https://platoapp.com/images/a8c6d140-4363-11ef-bfb7-a598d323cbfc-card_bard.webp',
            ability: 'Puede hechizar a otro jugador una vez por partida; ambos verán sus cartas. Tené en cuenta que el Shapeshifter aparecerá con otro rol de villager.',
            tips: [
                'Pre-escribí "Soy Bardo, hechizando a JugadorX" segundos antes de que termine la noche.',
                'Si hay un Shapeshifter, después de hechizar a alguien, pedile al jugador que declare su rol.',
                'Elegí un objetivo que pueda dar información valiosa.'
            ],
            advanced: 'En una partida con Wolf Shaman, decí que estás hechizando sin revelar el nombre del jugador; así si hechizás a un lobo que se queda callado, podés matarlo sin problema.'
        },
        // Evil Roles
        alpha: {
            name: 'Alpha Wolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a88d4ab0-4363-11ef-bfb7-a598d323cbfc-card_alphawolf.webp',
            ability: 'Aparece como bueno ante los ojos de la Vidente, dificultando la detección.',
            tips: [
                'Mantenete vivo el mayor tiempo posible; la Seer no puede descubrirte.',
                'Considerá a la Seer un aliado; nunca le robes el rol a menos que sea absolutamente necesario.',
                'Evitá reclamar roles apresuradamente excepto en jugadas muy específicas.'
            ],
            advanced: 'Considerá a la Seer tu aliado y tratá de tenerla de tu lado; así, cuando sea tu momento de reclamar un rol, tendrás el voto de la Seer a tu favor.'
        },
        werewolf: {
            name: 'Werewolf',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c96950-4363-11ef-bfb7-a598d323cbfc-card_werewolf.webp',
            ability: 'No posee habilidades especiales. Vota durante la noche a qué aldeano matar junto a su equipo.',
            tips: [
                'Mantené un perfil bajo y seguí el plan de tus nuevos compañeros de equipo.',
                'Aprovechá tu inocencia previa para desviar sospechas.',
                'No reclames nada a menos que sea absolutamente necesario.'
            ],
            advanced: 'Fingí ser un aldeano común y votá siempre para proteger a tus compañeros de equipo; sacrificate si hacerlo asegura la victoria para el equipo Malo.'
        },
        vampire: {
            name: 'Vampire',
            team: 'evil',
            image: 'https://platoapp.com/images/a8db1c90-4363-11ef-bfb7-a598d323cbfc-card_vampire.webp',
            ability: 'Puede contrarrestar la habilidad del Doctor una vez por partida usando su sangre. Su voto cuenta como cero y aparece solo como malo para la Seer.',
            tips: [
                'Siempre como primera tarea, tratá de matar al Doctor la primera noche.',
                'Evitá ser el último lobo vivo, ya que tu voto no cuenta.',
                'No digas que sos el Doctor; podrías ser linchado rápidamente.'
            ],
            advanced: 'Si sos el último lobo vivo, tratá de pasar desapercibido y desconectate rápido al inicio de la noche después de seleccionar a alguien para matar. No vuelvas antes de la fase de votación, tu objetivo es evitar un 1vs1 con el jugador contra quien intentás ganar.'
        },
        witch: {
            name: 'Witch',
            team: 'evil',
            image: 'https://platoapp.com/images/a8969980-4363-11ef-bfb7-a598d323cbfc-card_witch.webp',
            ability: 'Puede elegir y revelar la carta de un jugador bueno durante la Discusión de Día.',
            tips: [
                'Usá siempre tu habilidad al inicio para revelar a un aldeano que valga la pena matar.',
                'Después de revelar, la Witch no tiene mucha más utilidad; podrías servir como cebo.',
                'Seguí tratando de ayudar a tu equipo pero sabiendo que podés ser descartada.'
            ],
            advanced: 'Si revelás al Doctor mientras hay Vampire, asegurate de matarlo tan pronto como puedas; de lo contrario evitá matarlo la primera noche. Si revelás otro rol, podrías dejarlo con vida hasta que puedas robar su rol en algún momento clave.'
        },
        siren: {
            name: 'Siren',
            team: 'evil',
            image: 'https://platoapp.com/images/a8c28b80-4363-11ef-bfb7-a598d323cbfc-card_siren.webp',
            ability: 'Si es linchada durante el día, los aldeanos pierden sus poderes la noche siguiente.',
            tips: [
                'Existe la posibilidad de que tus compañeros de equipo te vendan para deshacerse de roles difíciles de matar.',
                'Siempre reclamá roles que tu equipo no pueda matar fácilmente.',
                'Priorizá tu muerte antes que la de cualquier otro compañero de equipo. Si están debatiendo entre vos o un compañero lobo, no apoyés su muerte, hacé algo para que seas vos quien muera.',
                'Tratá de sobrevivir el mayor tiempo posible a pesar de que tu muerte sea beneficiosa.'
            ],
            advanced: 'El primer día, si se mencionan roles como King, reclamá rápido para que los aldeanos se queden sin poderes una noche y otro día cuando te maten.'
        },
        shapeshifter: {
            name: 'Shapeshifter',
            team: 'evil',
            image: 'https://platoapp.com/images/a8ce7260-4363-11ef-bfb7-a598d323cbfc-card_shapeshifter.webp',
            ability: 'Aparece como aldeano si es revelado por el Town Crier o hechizado por el Bard, como Lover para los Lovers, y aleatoriamente como bueno o malo para la Seer.',
            tips: [
                'En una partida con Amantes, idealmente deberías ser el primero en preguntar.',
                'Si te revelan, tenés que declarar un rol; no esperes más de 4 segundos.',
                'Tratá de defenderte y no te rindas rápido, insistí en la mentira.'
            ],
            advanced: 'Si te infiltrás entre los Lovers, manipulalos para que no se crean entre sí después de la muerte del primero, eliminando dos aldeanos consecutivamente.'
        },
        nightmare: {
            name: 'Nightmare',
            team: 'evil',
            image: 'https://platoapp.com/images/a8a3b8e0-4363-11ef-bfb7-a598d323cbfc-card_nightmare.webp',
            ability: 'Durante la Discusión de Día, elige a un jugador para dormirlo, impidiéndole usar su habilidad la noche siguiente.',
            tips: [
                'Seleccioná a la víctima cuidadosamente, priorizando roles como Doctor sobre Seer.',
                'Asegurate de no dormir un rol que un compañero esté intentando robar, ya que eso los expone.',
                'No uses la habilidad sin razón; analizá la situación.',
                'Coordiná con otros lobos para aprovechar deshabilitar el mejor rol.'
            ],
            advanced: 'Dormí un rol clave justo antes de que use su habilidad decisiva, forzando un fracaso y abriendo la puerta a una victoria de último momento.'
        },
        'wolf-shaman': {
            name: 'Wolf Shaman',
            team: 'evil',
            image: 'https://platoapp.com/images/a8cc4f80-4363-11ef-bfb7-a598d323cbfc-card_wolfshaman.webp',
            ability: 'Puede proteger a un lobo de ser linchado durante el día una vez por partida; el lobo protegido no morirá cuando sea linchado.',
            tips: [
                'Mantené el equilibrio entre aldeanos muertos y lobos vivos para tener un mayor margen de victoria.',
                'Sos el rol que puede traicionar al resto de los lobos para asegurar la victoria.',
                'Nunca gastes tu protección en la Siren a menos que esto otorgue victoria inmediata.',
                'Desviá la atención de vos mismo para usar tu poder en el momento más adecuado.',
                'Decidí cuidadosamente cuándo proteger a un compañero o guardarlo para vos.'
            ],
            advanced: 'Podés traicionar a tus compañeros robando el rol de Seer y afirmando que los revisaste. Cuando uno de ellos muera, los villagers probablemente te creerán. Desde ahí, guiá el juego con calma manteniendo tu protección en reserva.'
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

    // Update which role items are visible based on the team
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

    // Select a role and update the detail panel
    function selectRole(roleKey) {
        const role = rolesData[roleKey];
        if (!role) return;

        currentRole = roleKey;

        // Update active state on role items
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
        detailTeam.textContent = role.team === 'good' ? 'Rol Bueno' : 'Rol Malo';
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

    // Toggle team
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
