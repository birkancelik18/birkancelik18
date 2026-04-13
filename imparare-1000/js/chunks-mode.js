// Chunks Mode - multi-word expression quiz

const CHUNK_CAT_STYLE = {
  phrase:     { label: 'PHRASE',     bg: 'rgba(91,45,142,0.85)',  color: '#e0d0ff' },
  idiom:      { label: 'IDIOM',      bg: 'rgba(26,92,138,0.85)',  color: '#d0eeff' },
  expression: { label: 'EXPRESSION', bg: 'rgba(13,92,58,0.85)',   color: '#c8f5e0' },
  connector:  { label: 'CONNECTOR',  bg: 'rgba(92,58,0,0.85)',    color: '#ffe8a0' },
};

const chunksSession = {
  current:     null,
  usedIndices: [],
  answered:    0,
  correct:     0,
  locked:      false,
};

function enterChunksMode() {
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('chunksApp').classList.add('active');
  chunksSession.usedIndices = [];
  chunksSession.answered    = 0;
  chunksSession.correct     = 0;
  chunksSession.locked      = false;
  _renderChunksQuestion(false);
}

function _pickChunk() {
  if (!Array.isArray(CHUNKS) || CHUNKS.length === 0) return null;
  if (chunksSession.usedIndices.length >= CHUNKS.length - 2) chunksSession.usedIndices = [];
  let idx;
  do { idx = ~~(Math.random() * CHUNKS.length); }
  while (chunksSession.usedIndices.includes(idx));
  chunksSession.usedIndices.push(idx);
  return CHUNKS[idx];
}

function _pickWrongChunks(correct, count) {
  const pool = CHUNKS.filter(c => c[1] !== correct[1]);
  return shuffle(pool).slice(0, count);
}

function _renderChunksQuestion(animate) {
  chunksSession.locked = false;
  const chunk = _pickChunk();
  if (!chunk) return;
  chunksSession.current = chunk;

  const [text, , exampleSrc, exampleEn, cat] = chunk;
  const style = CHUNK_CAT_STYLE[cat] || CHUNK_CAT_STYLE.phrase;

  function doRender() {
    const badge = document.getElementById('chunkCatBadge');
    badge.textContent     = style.label;
    badge.style.background = style.bg;
    badge.style.color      = style.color;

    const esc = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blanked = exampleSrc && new RegExp(esc, 'i').test(exampleSrc)
      ? exampleSrc.replace(new RegExp(esc, 'i'), '<span class="blank" id="chunkBlank">___</span>')
      : '<span class="blank" id="chunkBlank">___</span>';

    document.getElementById('chunkSentence').innerHTML   = blanked;
    document.getElementById('chunkSentenceEn').textContent = '🇬🇧 ' + (exampleEn || chunk[1]);
    document.getElementById('chunkStats').textContent =
      chunksSession.correct + ' / ' + chunksSession.answered + ' correct';

    const wrongs   = _pickWrongChunks(chunk, 3);
    const options  = shuffle([chunk, ...wrongs]);
    const colors   = shuffle([...TILE_COLORS]);
    const tilesEl  = document.getElementById('chunkTilesEl');
    tilesEl.innerHTML = '';
    options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className        = `tile c${colors[i]}`;
      btn.textContent      = opt[0];
      btn.dataset.correct  = opt[0] === text ? '1' : '0';
      btn.onclick          = () => _handleChunkAnswer(btn, opt[0] === text, chunk);
      tilesEl.appendChild(btn);
    });
  }

  const inner = document.getElementById('chunkCardInner');
  if (animate) {
    inner.classList.add('exit');
    setTimeout(() => {
      doRender();
      inner.classList.remove('exit');
      inner.classList.add('enter');
      setTimeout(() => inner.classList.remove('enter'), 350);
    }, 150);
  } else {
    doRender();
  }
}

function _handleChunkAnswer(btn, isCorrect, chunk) {
  if (chunksSession.locked) return;
  chunksSession.locked = true;
  chunksSession.answered++;

  const allTiles = document.querySelectorAll('#chunksApp .tile');
  allTiles.forEach(t => (t.disabled = true));
  const blank = document.getElementById('chunkBlank');

  if (isCorrect) {
    if (blank) { blank.textContent = chunk[0]; blank.className = 'blank filled'; }
    chunksSession.correct++;
    btn.classList.add('correct');
    allTiles.forEach(t => { if (t !== btn) t.classList.add('dimmed'); });

    const r = btn.getBoundingClientRect();
    if (typeof spawnConfetti === 'function') spawnConfetti(r.left + r.width / 2, r.top + r.height / 2, 18);
    if (navigator.vibrate) navigator.vibrate(80);
    if (typeof speak === 'function') speak(chunk[0]);

    const streakData = getStreakData();
    const { xp, bonusActive, dailyGoalJustCompleted } = awardXP(streakXPMultiplier(streakData.count || 0));
    showXPFloat(xp, r.left + r.width / 2 - 20, r.top, bonusActive);
    if (dailyGoalJustCompleted && typeof spawnConfetti === 'function') {
      setTimeout(() => spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 60), 300);
    }

    const sr = recordStreakAnswer();
    if (sr.milestone) setTimeout(() => showRPEBadge('🔥', sr.data.count + '-Day Streak!', 'Keep it up!'), 600);
    if (sr.gainedFreeze) setTimeout(() => showRPEBadge('🧊', 'Streak Freeze!', 'Miss a day safely!'), 600);
    if (maybeStartBonusRound()) showBonusRoundBanner();

    updateXPDisplay();
    updateStreakDisplay();

    setTimeout(() => _renderChunksQuestion(true), 1200);
  } else {
    if (blank) { blank.textContent = chunk[0]; blank.className = 'blank filled-wrong'; }
    btn.classList.add('wrong');
    allTiles.forEach(t => {
      if (t.dataset.correct === '1') t.classList.add('reveal-correct');
      else if (t !== btn) t.classList.add('dimmed');
    });

    const card = document.getElementById('chunkCard');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);

    // Disambiguation hint
    const fbEl = document.getElementById('chunkFeedback');
    fbEl.textContent = '💡 "' + chunk[0] + '" = ' + chunk[1];
    fbEl.style.display = '';

    setTimeout(() => {
      fbEl.style.display = 'none';
      _renderChunksQuestion(true);
    }, 1800);
  }
}

function exitChunksMode() {
  document.getElementById('chunksApp').classList.remove('active');
  document.getElementById('modeSelect').classList.remove('hidden');
  updateStreakDisplay();
  updateXPDisplay();
}
