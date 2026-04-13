// ── Word picking ──────────────────────────────────────────────────────

// Interleaved queue for Sprint mode: round-robin across categories so no
// two consecutive words share the same grammatical category.
let _interleavedQueue = [];
let _interleavedPos   = 0;

function _buildInterleavedQueue() {
  const catGroups = {};
  WORDS.forEach(w => {
    const cat = w[3] || 'other';
    if (!catGroups[cat]) catGroups[cat] = [];
    catGroups[cat].push(w);
  });
  const cats   = Object.keys(catGroups);
  const result = [];
  const maxLen = Math.max(...cats.map(c => catGroups[c].length));
  for (let i = 0; i < maxLen; i++) {
    for (const cat of cats) {
      if (i < catGroups[cat].length) result.push(catGroups[cat][i]);
    }
  }
  return result;
}

const MASTERED_THRESHOLD = 3;
let _currentDirection = 'recognition';

// state.sprintMode is set by enterSprintMode(); false = classic random quiz.
function pickWord() {
  // Serve a repeat if one is due (scheduled 2 questions after the mistake)
  const due = state.repeatQueue.find(e => state.answered >= e.after);
  if (due) {
    state.repeatQueue.splice(state.repeatQueue.indexOf(due), 1);
    return due.word;
  }

  if (state.sprintMode) {
    // Build queue on first use or when exhausted
    if (_interleavedQueue.length === 0 || _interleavedPos >= _interleavedQueue.length) {
      _interleavedQueue = _buildInterleavedQueue();
      _interleavedPos   = 0;
    }
    const word = _interleavedQueue[_interleavedPos++];
    return word;
  }

  // Classic random pick
  if (state.usedIndices.length >= WORDS.length - 4) state.usedIndices = [];
  let idx;
  do { idx = ~~(Math.random() * WORDS.length); }
  while (state.usedIndices.includes(idx));
  state.usedIndices.push(idx);
  return WORDS[idx];
}

function pickWrongAnswers(correct, count) {
  const sameCat = WORDS.filter(w => w[1] !== correct[1] && w[3] === correct[3]);
  const pool = sameCat.length >= count ? sameCat : WORDS.filter(w => w[1] !== correct[1]);
  return shuffle(pool).slice(0, count);
}

// Bug fix: if the target word doesn't appear verbatim in the sentence (e.g.
// conjugated verbs), show the blank above the sentence as context hint.
function buildBlankedSentence(italian, sentenceIT) {
  const escaped = italian.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'i');
  if (regex.test(sentenceIT)) {
    return sentenceIT.replace(regex, `<span class="blank" id="theBlank">___</span>`);
  }
  return `<span class="blank" id="theBlank">___</span><br><span style="font-size:0.72em;opacity:0.55;font-style:italic">${sentenceIT}</span>`;
}

function fillCard(italian, cat, direction) {
  const word  = state.currentWord;
  const style = CAT_STYLE[cat] || CAT_STYLE.noun;

  const badge = document.getElementById('catBadge');
  badge.textContent       = style.label;
  badge.style.background  = style.bg;
  badge.style.color       = style.color;

  const instrEl = document.querySelector('.q-instruction');
  if (direction === 'production') {
    const lang = window.paroleLanguage === 'nl' ? 'Dutch' : 'Italian';
    if (instrEl) instrEl.textContent = `Translate to ${lang} 👇`;
    document.getElementById('sentenceDisplay').innerHTML =
      `<span class="production-word">${word[1]}</span>`;
    document.getElementById('sentenceEn').textContent = '💡 ' + word[5];
  } else {
    if (instrEl) instrEl.textContent = 'Fill in the blank 👇';
    document.getElementById('sentenceDisplay').innerHTML = buildBlankedSentence(italian, word[4]);
    document.getElementById('sentenceEn').textContent    = '🇬🇧 ' + word[5];
  }

  const hintEl = document.getElementById('wordHint');
  if (hintEl) {
    const hint = word[6];
    // Hide hint in production mode to avoid giving away the answer
    hintEl.textContent    = hint ? '💡 ' + hint : '';
    hintEl.style.display  = (hint && direction !== 'production') ? '' : 'none';
  }

  // Leech indicator
  const leechEl = document.getElementById('leechIndicator');
  if (leechEl) {
    const flagged = (typeof isLeechWord === 'function') && isLeechWord(word);
    leechEl.style.display = flagged ? '' : 'none';
  }
}

function renderQuestion(animate) {
  state.locked = false;
  const word   = pickWord();
  state.currentWord = word;
  const italian = word[0];
  const cat     = word[3];
  // Production (English→target) only in Classic Quiz, not Sprint
  _currentDirection = (!state.sprintMode && Math.random() < 0.5) ? 'production' : 'recognition';

  const cardInner = document.getElementById('cardInner');
  if (animate) {
    cardInner.classList.add('exit');
    setTimeout(() => {
      fillCard(italian, cat, _currentDirection);
      cardInner.classList.remove('exit');
      cardInner.classList.add('enter');
      setTimeout(() => cardInner.classList.remove('enter'), 350);
    }, 150);
  } else {
    fillCard(italian, cat, _currentDirection);
  }

  const wrongs  = pickWrongAnswers(word, 3);
  const options = shuffle([word, ...wrongs]);

  const tilesEl = document.getElementById('tilesEl');
  tilesEl.innerHTML = '';
  const colors  = shuffle([...TILE_COLORS]);
  options.forEach((opt, i) => {
    const btn             = document.createElement('button');
    btn.className         = `tile c${colors[i]}`;
    btn.textContent       = opt[0];
    btn.dataset.correct   = opt[0] === italian ? '1' : '0';
    btn.onclick           = () => handleAnswer(btn, opt[0] === italian, word, opt);
    tilesEl.appendChild(btn);
  });
}

// ── Answer handling ───────────────────────────────────────────────────

let fbTimer = null;

function showFeedback(correct, word, disambiguationHint) {
  const overlay = document.getElementById('fbOverlay');
  const correctMsgs = ['Perfetto! 🎉', 'Bravissimo! ⭐', 'Magnifico! 🏆', 'Ottimo! 🔥', 'Esatto! ✨'];
  const wrongMsgs   = ['Non mollare! 💪', 'Riprova! 😤', 'Quasi! 🤏', 'Forza! ⚡'];

  document.getElementById('fbEmoji').textContent = correct
    ? (state.streak >= 5 ? '🔥' : state.streak >= 3 ? '⭐' : '✅')
    : '❌';
  document.getElementById('fbWord').textContent = correct
    ? correctMsgs[~~(Math.random() * correctMsgs.length)]
    : wrongMsgs[~~(Math.random() * wrongMsgs.length)];

  const fbExampleEl = document.getElementById('fbExample');
  if (!correct && disambiguationHint) {
    fbExampleEl.textContent = disambiguationHint;
    fbExampleEl.classList.add('disambiguation');
  } else {
    fbExampleEl.textContent = '"' + word[4] + '" - ' + word[5];
    fbExampleEl.classList.remove('disambiguation');
  }

  overlay.classList.add('show');
  clearTimeout(fbTimer);
  fbTimer = setTimeout(() => overlay.classList.remove('show'), correct ? 1000 : 1600);
}

// opt = the word object the user actually clicked (may differ from word)
function handleAnswer(btn, isCorrect, word, opt) {
  if (state.locked) return;
  state.locked = true;
  state.answered++;

  const allTiles = document.querySelectorAll('.tile');
  allTiles.forEach(t => (t.disabled = true));

  const blank = document.getElementById('theBlank');

  if (isCorrect) {
    if (blank) { blank.textContent = word[0]; blank.className = 'blank filled'; }
    state.correct++;
    state.streak++;
    state.wordsThisLevel++;
    if (state.streak > state.bestStreak) { state.bestStreak = state.streak; saveHS(); }

    btn.classList.add('correct');
    allTiles.forEach(t => { if (t !== btn) t.classList.add('dimmed'); });

    const r = btn.getBoundingClientRect();
    spawnConfetti(r.left + r.width / 2, r.top + r.height / 2, 22);

    // Leech tracking
    let leechCleared = false;
    if (typeof recordLeechCorrect === 'function') {
      ({ leechCleared } = recordLeechCorrect(word));
    }
    if (leechCleared) setTimeout(() => showRPEBadge('🧠', 'Leech Cleared!', '"' + word[0] + '" is conquered!'), 500);

    masteredMap[word[0]] = (masteredMap[word[0]] || 0) + 1;
    const newlyMastered = masteredMap[word[0]] === MASTERED_THRESHOLD;
    state.masteredWords = Object.keys(masteredMap).filter(k => masteredMap[k] >= MASTERED_THRESHOLD).length;
    saveProgress();
    updateGoal();
    if (newlyMastered) {
      setTimeout(() => showRPEBadge('⭐', 'Word Mastered!', '"' + word[0] + '" is locked in!'), 500);
    }

    // XP + streak system (Sprint keeps its own score too)
    if (typeof handleCorrectReward === 'function') {
      const { xpResult } = handleCorrectReward(state.streak);
      showXPFloat(xpResult.xp, r.left + r.width / 2 - 20, r.top, xpResult.bonusActive);
    } else {
      const streakBonus = Math.min(state.streak - 1, 9) * 20;
      floatPoints(100 + streakBonus, r.left + r.width / 2 - 20, r.top, '#ffd93d');
    }

    // Sprint score kept separately
    const streakBonus = Math.min(state.streak - 1, 9) * 20;
    state.score += 100 + streakBonus;

    if (state.streak >= 3) showComboBurst(state.streak);

    updateScore();
    updateStreak();
    updateLevel();
    saveSession();
    showFeedback(true, word, null);
    speak(word[4]);

    if (state.wordsThisLevel >= WORDS_PER_LEVEL) {
      setTimeout(showLevelUp, 1000);
    } else {
      setTimeout(() => renderQuestion(true), 1200);
    }

  } else {
    // Sprint mode keeps lives; SRS/Speak/Chunks don't (but this file is Sprint only)
    state.lives--;
    state.streak = 0;

    if (blank) { blank.textContent = word[0]; blank.className = 'blank filled-wrong'; }

    btn.classList.add('wrong');
    allTiles.forEach(t => {
      if (t.dataset.correct === '1') t.classList.add('reveal-correct');
      else if (t !== btn) t.classList.add('dimmed');
    });

    // Track leech + confusion
    const chosenWord = opt && opt[0] !== word[0] ? opt : null;
    let disambiguationHint = null;
    if (typeof recordWrongAnswer === 'function') {
      const { isNewLeech } = recordWrongAnswer(word, chosenWord);
      if (isNewLeech && typeof buildDisambiguationHint === 'function') {
        disambiguationHint = buildDisambiguationHint(word);
      }
    }
    if (!disambiguationHint && typeof buildDisambiguationHint === 'function') {
      disambiguationHint = buildDisambiguationHint(word);
    }

    // Schedule word to reappear
    state.repeatQueue.push({ word, after: state.answered + 2 });

    renderHearts();
    updateStreak();
    saveSession();

    const card = document.getElementById('wordCard');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);

    showFeedback(false, word, disambiguationHint);

    if (state.lives <= 0) {
      setTimeout(showGameOver, 1400);
    } else {
      setTimeout(() => renderQuestion(true), 1800);
    }
  }
}

// ── Level up / Game over ──────────────────────────────────────────────

function showLevelUp() {
  state.level++;
  state.wordsThisLevel = 0;
  updateLevel();
  const overlay = document.getElementById('bigOverlay');
  const lang    = window.paroleLanguage === 'nl' ? 'Dutch' : 'Italian';
  document.getElementById('bigIcon').textContent  = '🏆';
  document.getElementById('bigTitle').textContent = 'Level ' + state.level + '!';
  document.getElementById('bigSub').textContent   = 'Fantastico! Keep going 🇮🇹';
  if (window.paroleLanguage === 'nl') document.getElementById('bigSub').textContent = 'Geweldig! Keep going 🇳🇱';
  document.getElementById('bigStats').innerHTML = `
    <div class="big-stat"><div class="big-stat-val">${state.score.toLocaleString()}</div><div class="big-stat-lbl">Score</div></div>
    <div class="big-stat"><div class="big-stat-val">${state.streak}</div><div class="big-stat-lbl">Streak</div></div>
    <div class="big-stat"><div class="big-stat-val">${Math.round(state.correct / state.answered * 100) || 0}%</div><div class="big-stat-lbl">Accuracy</div></div>
  `;
  document.getElementById('bigBtn').textContent = 'Continue! →';
  overlay.dataset.mode = 'levelup';
  overlay.classList.add('show');
  spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 60);
  setTimeout(() => spawnConfetti(window.innerWidth / 4, window.innerHeight / 2, 40), 200);
  setTimeout(() => spawnConfetti(window.innerWidth * 3 / 4, window.innerHeight / 2, 40), 400);
}

function showGameOver() {
  const accuracy = state.answered > 0 ? Math.round(state.correct / state.answered * 100) : 0;
  const overlay  = document.getElementById('bigOverlay');
  document.getElementById('bigIcon').textContent  = accuracy >= 80 ? '😎' : accuracy >= 50 ? '😅' : '😢';
  document.getElementById('bigTitle').textContent = 'Game Over!';
  document.getElementById('bigSub').textContent   = accuracy >= 80
    ? 'Molto bene! You did great!'
    : accuracy >= 50 ? 'Bel tentativo! Keep practising!' : 'Non arrenderti - practice makes perfect!';
  document.getElementById('bigStats').innerHTML = `
    <div class="big-stat"><div class="big-stat-val">${state.score.toLocaleString()}</div><div class="big-stat-lbl">Score</div></div>
    <div class="big-stat"><div class="big-stat-val">${state.bestStreak}</div><div class="big-stat-lbl">Best Streak</div></div>
    <div class="big-stat"><div class="big-stat-val">${accuracy}%</div><div class="big-stat-lbl">Accuracy</div></div>
  `;
  document.getElementById('bigBtn').textContent = '🔄 Play Again';
  overlay.dataset.mode = 'gameover';
  overlay.classList.add('show');
}

function resetGame() {
  state.lives         = LIVES;
  state.score         = 0;
  state.streak        = 0;
  state.level         = 1;
  state.wordsThisLevel = 0;
  state.answered      = 0;
  state.correct       = 0;
  state.usedIndices   = [];
  state.repeatQueue   = [];
  clearSession();
  renderHearts();
  updateScore();
  updateStreak();
  updateLevel();
  renderQuestion(false);
}
