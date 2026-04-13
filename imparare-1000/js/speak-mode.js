// Speak Mode - vocal production checks using SpeechRecognition

const speakSession = {
  word:        null,
  score:       0,
  answered:    0,
  recognition: null,
  listening:   false,
  usedIndices: [],
};

// ── Speech Recognition setup ──────────────────────────────────────────

function _initSR() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  const r = new SR();
  r.lang = window.paroleLanguage === 'nl' ? 'nl-NL' : 'it-IT';
  r.continuous = false;
  r.interimResults = false;
  r.maxAlternatives = 5;
  return r;
}

// Diacritic-insensitive, lowercased comparison
function _normalize(s) {
  return s.toLowerCase().trim()
    .replace(/[àáâãä]/g, 'a').replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u').replace(/[ñ]/g, 'n')
    .replace(/[^a-z ]/g, '');
}

function _levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i || j));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function fuzzyMatch(spoken, target) {
  const s = _normalize(spoken);
  const t = _normalize(target);
  if (s === t || s.includes(t) || t.includes(s)) return true;
  return _levenshtein(s, t) <= Math.max(1, Math.floor(t.length * 0.25));
}

// ── Session lifecycle ─────────────────────────────────────────────────

function enterSpeakMode() {
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('speakApp').classList.add('active');

  speakSession.score       = 0;
  speakSession.answered    = 0;
  speakSession.usedIndices = [];
  speakSession.listening   = false;
  speakSession.recognition = _initSR();

  const hasSR = !!speakSession.recognition;
  document.getElementById('speakMicArea').style.display   = hasSR ? '' : 'none';
  document.getElementById('speakTypeArea').style.display  = hasSR ? 'none' : '';

  _renderSpeakCard();
}

function _pickSpeakWord() {
  if (!Array.isArray(WORDS) || WORDS.length === 0) return null;
  if (speakSession.usedIndices.length >= WORDS.length - 2) speakSession.usedIndices = [];
  let idx;
  do { idx = ~~(Math.random() * WORDS.length); }
  while (speakSession.usedIndices.includes(idx));
  speakSession.usedIndices.push(idx);
  return WORDS[idx];
}

function _renderSpeakCard() {
  speakSession.listening = false;
  speakSession.word = _pickSpeakWord();
  const word = speakSession.word;
  if (!word) return;

  document.getElementById('speakEnglish').textContent    = word[1];
  document.getElementById('speakSentenceEn').textContent = word[5] || '';
  document.getElementById('speakTarget').textContent     = '?';
  document.getElementById('speakTarget').className       = 'speak-target';
  document.getElementById('speakFeedback').textContent   = '';
  document.getElementById('speakFeedback').className     = 'speak-feedback';
  document.getElementById('speakScoreEl').textContent    = speakSession.score;
  document.getElementById('speakAnsweredEl').textContent = speakSession.answered;

  const btn = document.getElementById('speakMicBtn');
  if (btn) { btn.textContent = '🎤 Speak it'; btn.classList.remove('listening'); }
  const inp = document.getElementById('speakTypeInp');
  if (inp) inp.value = '';

  if (speakSession.recognition) _attachSRHandlers(speakSession.recognition);
}

function _attachSRHandlers(r) {
  r.onresult = e => {
    const alts = Array.from(e.results[0]).map(a => a.transcript);
    _handleSpeakAnswer(alts);
  };
  r.onerror = () => {
    speakSession.listening = false;
    const btn = document.getElementById('speakMicBtn');
    if (btn) { btn.textContent = '🎤 Speak it'; btn.classList.remove('listening'); }
    document.getElementById('speakFeedback').textContent = 'Could not hear - try again';
    document.getElementById('speakFeedback').className   = 'speak-feedback wrong';
  };
  r.onend = () => {
    speakSession.listening = false;
    const btn = document.getElementById('speakMicBtn');
    if (btn && btn.classList.contains('listening')) {
      btn.textContent = '🎤 Speak it';
      btn.classList.remove('listening');
    }
  };
}

function startSpeakListening() {
  if (speakSession.listening || !speakSession.recognition) return;
  speakSession.listening = true;
  const btn = document.getElementById('speakMicBtn');
  if (btn) { btn.textContent = '🔴 Listening…'; btn.classList.add('listening'); }
  if (navigator.vibrate) navigator.vibrate(50);
  try { speakSession.recognition.start(); }
  catch (e) { speakSession.listening = false; }
}

function handleSpeakTypeSubmit(e) {
  if (e.key !== 'Enter') return;
  const val = e.target.value.trim();
  if (!val) return;
  e.target.value = '';
  _handleSpeakAnswer([val]);
}

function _handleSpeakAnswer(transcripts) {
  const word = speakSession.word;
  if (!word) return;
  speakSession.listening = false;
  const btn = document.getElementById('speakMicBtn');
  if (btn) { btn.textContent = '🎤 Speak it'; btn.classList.remove('listening'); }

  const isCorrect = transcripts.some(t => fuzzyMatch(t, word[0]));
  speakSession.answered++;

  // Always reveal the target word
  const targetEl = document.getElementById('speakTarget');
  targetEl.textContent = word[0];
  targetEl.className   = 'speak-target ' + (isCorrect ? 'correct' : 'wrong');
  if (typeof speak === 'function') speak(word[0]);

  const fbEl = document.getElementById('speakFeedback');

  if (isCorrect) {
    speakSession.score++;
    fbEl.textContent = '✅ Correct!';
    fbEl.className   = 'speak-feedback correct';
    if (navigator.vibrate) navigator.vibrate(80);

    const streakData = getStreakData();
    const { xp, bonusActive, dailyGoalJustCompleted } = awardXP(streakXPMultiplier(streakData.count || 0));
    const rect = targetEl.getBoundingClientRect();
    showXPFloat(xp, rect.left + rect.width / 2 - 20, rect.top, bonusActive);
    if (dailyGoalJustCompleted && typeof spawnConfetti === 'function') {
      setTimeout(() => spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 60), 300);
    }

    const sr = recordStreakAnswer();
    if (sr.milestone) setTimeout(() => showRPEBadge('🔥', sr.data.count + '-Day Streak!', 'Keep it up!'), 600);
    if (sr.gainedFreeze) setTimeout(() => showRPEBadge('🧊', 'Streak Freeze!', 'Miss a day safely!'), 600);
    const { leechCleared } = recordLeechCorrect(word);
    if (leechCleared) setTimeout(() => showRPEBadge('🧠', 'Leech Cleared!', '"' + word[0] + '" remembered!'), 500);
    if (maybeStartBonusRound()) showBonusRoundBanner();

    updateXPDisplay();
    updateStreakDisplay();
  } else {
    const said = transcripts[0] || '?';
    fbEl.textContent = `❌  "${word[0]}"  •  You said: "${said}"`;
    fbEl.className   = 'speak-feedback wrong';
    recordWrongAnswer(word, null);

    const card = document.getElementById('speakCard');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);
  }

  setTimeout(() => _renderSpeakCard(), isCorrect ? 1300 : 2200);
}

function exitSpeakMode() {
  if (speakSession.recognition) {
    try { speakSession.recognition.abort(); } catch (_) {}
  }
  speakSession.listening = false;
  document.getElementById('speakApp').classList.remove('active');
  document.getElementById('modeSelect').classList.remove('hidden');
  updateStreakDisplay();
  updateXPDisplay();
}
