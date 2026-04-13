// Italian lexical chunks — multi-word expressions taught as single units
// Format: [chunk, english_translation, italian_example, english_example, category]
// Categories: phrase | idiom | connector | expression

const CHUNKS = [
  // ── Connectors ──────────────────────────────────────────────────────
  ["a proposito", "by the way", "A proposito, hai visto Marco ieri?", "By the way, did you see Marco yesterday?", "connector"],
  ["in effetti", "as a matter of fact / indeed", "In effetti, hai ragione su questo.", "As a matter of fact, you are right about this.", "connector"],
  ["d'altra parte", "on the other hand", "D'altra parte, ci sono anche dei vantaggi.", "On the other hand, there are also advantages.", "connector"],
  ["per quanto riguarda", "as far as … is concerned / regarding", "Per quanto riguarda il lavoro, tutto va bene.", "As far as work is concerned, everything is going well.", "connector"],
  ["in ogni caso", "in any case / anyway", "In ogni caso, dobbiamo decidere oggi.", "In any case, we need to decide today.", "connector"],
  ["nel frattempo", "in the meantime / meanwhile", "Nel frattempo, puoi prepararti per uscire.", "In the meantime, you can get ready to go out.", "connector"],
  ["tuttavia", "however / nevertheless", "Era stanco; tuttavia, ha continuato a lavorare.", "He was tired; however, he kept on working.", "connector"],
  ["eppure", "and yet / still", "Non l'ho visto, eppure so che è qui.", "I haven't seen him, and yet I know he is here.", "connector"],
  ["a meno che", "unless", "Vengo a meno che non piova.", "I'll come unless it rains.", "connector"],
  ["nel senso che", "in the sense that / meaning that", "Non è difficile, nel senso che richiede solo pratica.", "It's not difficult, in the sense that it only requires practice.", "connector"],

  // ── Common expressions ───────────────────────────────────────────────
  ["avere voglia di", "to feel like / to want to", "Ho voglia di mangiare una pizza stasera.", "I feel like eating a pizza tonight.", "expression"],
  ["avere fretta", "to be in a hurry", "Scusa, ho fretta — parliamo dopo!", "Sorry, I'm in a hurry — let's talk later!", "expression"],
  ["fare del proprio meglio", "to do one's best", "Ho fatto del mio meglio ma non era abbastanza.", "I did my best but it wasn't enough.", "expression"],
  ["tenere conto di", "to take into account / bear in mind", "Bisogna tenere conto del traffico.", "You need to take traffic into account.", "expression"],
  ["rendersi conto di", "to realize / become aware of", "Mi sono reso conto dell'errore troppo tardi.", "I realized the mistake too late.", "expression"],
  ["andare d'accordo", "to get along (with someone)", "Vado d'accordo con tutti i miei colleghi.", "I get along well with all my colleagues.", "expression"],
  ["fare finta di", "to pretend to", "Ha fatto finta di non sentire.", "He pretended not to hear.", "expression"],
  ["avere a che fare con", "to have to do / deal with", "Non ho niente a che fare con questo problema.", "I have nothing to do with this problem.", "expression"],
  ["mettere in discussione", "to question / challenge", "Non voglio mettere in discussione la tua decisione.", "I don't want to question your decision.", "expression"],
  ["fare a meno di", "to do without / go without", "Non riesco a fare a meno del caffè la mattina.", "I can't do without coffee in the morning.", "expression"],

  // ── Idioms ──────────────────────────────────────────────────────────
  ["in bocca al lupo", "good luck (lit: in the wolf's mouth)", "In bocca al lupo per l'esame di domani!", "Good luck for tomorrow's exam!", "idiom"],
  ["prendere in giro", "to make fun of / tease", "Smettila di prendermi in giro!", "Stop making fun of me!", "idiom"],
  ["restare con le mani in mano", "to sit idle (lit: stay with hands in hand)", "Non puoi restare con le mani in mano tutto il giorno.", "You can't sit idle all day.", "idiom"],
  ["avere le mani in pasta", "to have a hand in (lit: hands in dough)", "Lui ha le mani in pasta in molti affari.", "He has a hand in many businesses.", "idiom"],
  ["non vedere l'ora di", "can't wait to (lit: can't see the hour)", "Non vedo l'ora di andare in vacanza.", "I can't wait to go on vacation.", "idiom"],
  ["rompere il ghiaccio", "to break the ice", "Una barzelletta può rompere il ghiaccio.", "A joke can break the ice.", "idiom"],
  ["perdere la testa", "to lose one's head / fall madly in love", "Ha perso la testa per lei.", "He has completely lost his head over her.", "idiom"],
  ["costare un occhio della testa", "to cost an arm and a leg (lit: cost an eye)", "Quel ristorante costa un occhio della testa.", "That restaurant costs an arm and a leg.", "idiom"],
  ["farla franca", "to get away with it", "Non puoi farla franca ogni volta!", "You can't get away with it every time!", "idiom"],
  ["essere al verde", "to be broke (lit: to be in the green)", "Sono completamente al verde questo mese.", "I'm completely broke this month.", "idiom"],

  // ── Phrases ─────────────────────────────────────────────────────────
  ["ti va di", "do you feel like / fancy (something)", "Ti va di uscire a cena stasera?", "Do you fancy going out for dinner tonight?", "phrase"],
  ["non importa", "it doesn't matter / never mind", "Non importa, lo faccio io.", "Never mind, I'll do it.", "phrase"],
  ["mi fa piacere", "I'm glad / it pleases me", "Mi fa piacere sentirti stare bene.", "I'm glad to hear you're doing well.", "phrase"],
  ["che ne pensi", "what do you think about it", "Che ne pensi della mia idea?", "What do you think about my idea?", "phrase"],
  ["come mai", "how come / why on earth", "Come mai sei in ritardo?", "How come you're late?", "phrase"],
  ["per forza", "of course / necessarily / no choice", "Devo farlo per forza, non c'è alternativa.", "I have to do it, there's no other choice.", "phrase"],
  ["a quanto pare", "apparently / it seems", "A quanto pare, la riunione è stata annullata.", "Apparently, the meeting has been cancelled.", "phrase"],
  ["stai scherzando", "you're joking / are you serious", "Stai scherzando? Questo è incredibile!", "You're joking? This is incredible!", "phrase"],
  ["per caso", "by any chance / by chance", "Hai visto per caso le mie chiavi?", "Have you seen my keys by any chance?", "phrase"],
  ["tanto per cambiare", "for a change (ironic)", "Ha fatto tardi, tanto per cambiare.", "He was late, for a change.", "phrase"],

  // ── More expressions ─────────────────────────────────────────────────
  ["mettersi in testa di", "to get it into one's head to", "Si è messo in testa di imparare il cinese.", "He got it into his head to learn Chinese.", "expression"],
  ["dare per scontato", "to take for granted", "Non dare per scontato la salute.", "Don't take your health for granted.", "expression"],
  ["avere in mente di", "to have in mind to / be planning to", "Ho in mente di cambiare lavoro.", "I'm planning to change jobs.", "expression"],
  ["stare attento a", "to be careful about / pay attention to", "Stai attento a quello che dici.", "Be careful about what you say.", "expression"],
  ["finire per", "to end up (doing something)", "Ho finito per perdere il treno.", "I ended up missing the train.", "expression"],
  ["avere il coraggio di", "to have the courage / nerve to", "Non ha avuto il coraggio di dirle la verità.", "He didn't have the courage to tell her the truth.", "expression"],
  ["essere sul punto di", "to be about to / on the verge of", "Ero sul punto di chiamarti!", "I was about to call you!", "expression"],
  ["lasciare perdere", "to let it go / forget about it", "Lascia perdere, non vale la pena.", "Let it go, it's not worth it.", "expression"],
  ["vale la pena di", "it's worth (doing)", "Vale la pena di visitare quel museo.", "It's worth visiting that museum.", "expression"],
  ["in modo da", "so as to / in order to", "Parti presto in modo da evitare il traffico.", "Leave early so as to avoid traffic.", "expression"],
];
