// Dutch lexical chunks - multi-word expressions taught as single units
// Format: [chunk, english_translation, dutch_example, english_example, category]
// Categories: phrase | idiom | connector | expression

const CHUNKS = [
  // ── Connectors ──────────────────────────────────────────────────────
  ["trouwens", "by the way / incidentally", "Trouwens, heb je Maria gisteren gezien?", "By the way, did you see Maria yesterday?", "connector"],
  ["bovendien", "moreover / furthermore / besides", "Het is goedkoop en bovendien van goede kwaliteit.", "It's cheap and moreover of good quality.", "connector"],
  ["desondanks", "nevertheless / despite that", "Het regende; desondanks gingen we wandelen.", "It was raining; nevertheless, we went for a walk.", "connector"],
  ["wat betreft", "as far as … is concerned / regarding", "Wat betreft het werk gaat alles goed.", "As far as work is concerned, everything is fine.", "connector"],
  ["in ieder geval", "in any case / at any rate", "In ieder geval moeten we vandaag beslissen.", "In any case, we need to decide today.", "connector"],
  ["ondertussen", "in the meantime / meanwhile", "Ondertussen kun je alvast beginnen.", "In the meantime, you can already start.", "connector"],
  ["toch", "yet / still / after all / though", "Hij was moe, toch bleef hij werken.", "He was tired, yet he kept on working.", "connector"],
  ["hoewel", "although / even though", "Hoewel het laat was, belde hij toch.", "Although it was late, he called anyway.", "connector"],
  ["tenzij", "unless", "Ik kom tenzij het regent.", "I'll come unless it rains.", "connector"],
  ["zeg maar", "sort of / you know / kind of", "Het is, zeg maar, een beetje ingewikkeld.", "It's, you know, a bit complicated.", "connector"],

  // ── Common expressions ───────────────────────────────────────────────
  ["zin hebben in", "to feel like / fancy (something)", "Ik heb zin in een kop koffie.", "I feel like a cup of coffee.", "expression"],
  ["haast hebben", "to be in a hurry", "Sorry, ik heb haast - tot later!", "Sorry, I'm in a hurry - talk later!", "expression"],
  ["zijn best doen", "to do one's best", "Hij heeft zijn best gedaan maar het was genoeg.", "He did his best but it wasn't enough.", "expression"],
  ["rekening houden met", "to take into account / consider", "Je moet rekening houden met het verkeer.", "You have to take traffic into account.", "expression"],
  ["zich realiseren dat", "to realize that", "Ik realiseerde me dat ik een fout had gemaakt.", "I realized that I had made a mistake.", "expression"],
  ["het goed kunnen vinden met", "to get along well with", "Ik kan het goed vinden met mijn collega's.", "I get along well with my colleagues.", "expression"],
  ["doen alsof", "to pretend / act as if", "Hij deed alsof hij het niet hoorde.", "He pretended not to hear it.", "expression"],
  ["te maken hebben met", "to have to do with / deal with", "Ik heb niets te maken met dit probleem.", "I have nothing to do with this problem.", "expression"],
  ["in twijfel trekken", "to question / cast doubt on", "Ik wil je beslissing niet in twijfel trekken.", "I don't want to question your decision.", "expression"],
  ["zonder kunnen", "to do without / manage without", "Ik kan niet zonder koffie in de ochtend.", "I can't do without coffee in the morning.", "expression"],

  // ── Idioms ──────────────────────────────────────────────────────────
  ["succes ermee", "good luck with it", "Succes ermee met je examen morgen!", "Good luck with your exam tomorrow!", "idiom"],
  ["voor de gek houden", "to fool / make fun of (lit: hold for the fool)", "Hou me niet voor de gek!", "Don't make a fool of me!", "idiom"],
  ["duimen draaien", "to twiddle one's thumbs / sit idle", "Ik kan niet de hele dag duimen draaien.", "I can't twiddle my thumbs all day.", "idiom"],
  ["erbij betrokken zijn", "to be involved in", "Hij is bij veel projecten betrokken.", "He is involved in many projects.", "idiom"],
  ["ernaar uitkijken", "to look forward to", "Ik kijk er enorm naar uit om op vakantie te gaan.", "I really look forward to going on holiday.", "idiom"],
  ["het ijs breken", "to break the ice", "Een grap kan het ijs breken.", "A joke can break the ice.", "idiom"],
  ["het hoofd verliezen", "to lose one's head / panic", "Je moet je hoofd niet verliezen.", "You shouldn't lose your head.", "idiom"],
  ["een fortuin kosten", "to cost a fortune", "Dat restaurant kost een fortuin.", "That restaurant costs a fortune.", "idiom"],
  ["ermee wegkomen", "to get away with it", "Je kunt er niet elke keer mee wegkomen!", "You can't get away with it every time!", "idiom"],
  ["blut zijn", "to be broke / penniless", "Ik ben deze maand compleet blut.", "I'm completely broke this month.", "idiom"],

  // ── Phrases ─────────────────────────────────────────────────────────
  ["het maakt niet uit", "it doesn't matter / never mind", "Het maakt niet uit, ik doe het wel.", "Never mind, I'll do it.", "phrase"],
  ["dat vind ik fijn", "I'm glad about that / I like that", "Dat vind ik fijn om te horen!", "I'm glad to hear that!", "phrase"],
  ["wat vind je ervan", "what do you think about it", "Wat vind je van mijn idee?", "What do you think of my idea?", "phrase"],
  ["hoe komt het dat", "how come / why is it that", "Hoe komt het dat je te laat bent?", "How come you're late?", "phrase"],
  ["nou eenmaal", "just the way it is / simply", "Dat is nou eenmaal zo, ik kan er niets aan doen.", "That's just the way it is, I can't do anything about it.", "phrase"],
  ["kennelijk", "apparently / evidently", "Kennelijk is de vergadering afgelast.", "Apparently, the meeting has been cancelled.", "phrase"],
  ["je meent het", "you're joking / you can't be serious", "Je meent het! Dat is ongelooflijk!", "You're joking! That's incredible!", "phrase"],
  ["toevallig", "by chance / coincidentally / happen to", "Heb je toevallig mijn sleutels gezien?", "Have you seen my keys by any chance?", "phrase"],
  ["voor de verandering", "for a change", "Hij was voor de verandering eens op tijd.", "For a change, he was on time.", "phrase"],
  ["het gaat erom dat", "the thing is that / what matters is", "Het gaat erom dat je je best doet.", "The thing is that you do your best.", "phrase"],

  // ── More expressions ─────────────────────────────────────────────────
  ["in je hoofd halen", "to get into one's head / conceive the idea", "Hij haalde het in zijn hoofd om Chinees te leren.", "He got it into his head to learn Chinese.", "expression"],
  ["als vanzelfsprekend beschouwen", "to take for granted", "Beschouw je gezondheid niet als vanzelfsprekend.", "Don't take your health for granted.", "expression"],
  ["van plan zijn", "to plan to / intend to", "Ik ben van plan om van baan te wisselen.", "I'm planning to change jobs.", "expression"],
  ["oppassen voor", "to be careful of / watch out for", "Pas op voor wat je zegt.", "Be careful about what you say.", "expression"],
  ["uiteindelijk", "ultimately / in the end", "Ik heb uiteindelijk de trein gemist.", "I ended up missing the train.", "expression"],
  ["de moed hebben om", "to have the courage to", "Hij had niet de moed om haar de waarheid te vertellen.", "He didn't have the courage to tell her the truth.", "expression"],
  ["op het punt staan", "to be about to / on the verge of", "Ik stond op het punt je te bellen!", "I was about to call you!", "expression"],
  ["er niet meer aan denken", "to forget about it / let it go", "Denk er niet meer aan, het is de moeite niet waard.", "Forget about it, it's not worth it.", "expression"],
  ["de moeite waard zijn", "to be worth (doing / seeing)", "Die museum is zeker de moeite waard.", "That museum is definitely worth visiting.", "expression"],
  ["zodat", "so that / in order that", "Vertrek vroeg zodat je het verkeer vermijdt.", "Leave early so that you avoid traffic.", "expression"],
];
