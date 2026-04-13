// ── Mode entry ────────────────────────────────────────────────────────

function enterQuizMode() {
  state.sprintMode = false;
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('app').classList.add('active');
  document.getElementById('quizModeLabel').textContent = 'Classic Quiz';
  loadProgress();
  loadSession();
  renderHearts();
  updateScore();
  updateStreak();
  updateLevel();
  updateGoal();
  renderQuestion(false);
}

function enterSprintMode() {
  state.sprintMode = true;
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('app').classList.add('active');
  document.getElementById('quizModeLabel').textContent = '⚡ Sprint';
  loadProgress();
  // Sprint always starts fresh to use interleaved queue from position 0
  state.lives         = LIVES;
  state.score         = 0;
  state.streak        = 0;
  state.level         = 1;
  state.wordsThisLevel = 0;
  state.answered      = 0;
  state.correct       = 0;
  state.usedIndices   = [];
  state.repeatQueue   = [];
  renderHearts();
  updateScore();
  updateStreak();
  updateLevel();
  updateGoal();
  renderQuestion(false);
}

function enterSwipeMode() {
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('swipeApp').classList.add('active');
  startSwipeSession();
}

// ── Overlay button ────────────────────────────────────────────────────

function handleBigBtn() {
  const overlay = document.getElementById('bigOverlay');
  const mode    = overlay.dataset.mode;
  overlay.classList.remove('show');
  if (mode === 'gameover') {
    resetGame();
  } else if (mode === 'swipe') {
    startSwipeSession(true);
  } else {
    renderQuestion(true);
  }
}

// ── Event listeners ───────────────────────────────────────────────────

document.getElementById('btnQuiz').addEventListener('click', enterQuizMode);
document.getElementById('btnSprint').addEventListener('click', enterSprintMode);
document.getElementById('btnSwipe').addEventListener('click', enterSwipeMode);
document.getElementById('btnSRS').addEventListener('click', enterSRSMode);
document.getElementById('btnSpeak').addEventListener('click', enterSpeakMode);
document.getElementById('btnChunks').addEventListener('click', enterChunksMode);

document.getElementById('hearBtn').addEventListener('click', () => {
  speak(state.currentWord?.[4] || state.currentWord?.[0] || '');
});
document.getElementById('bigBtn').addEventListener('click', handleBigBtn);

document.getElementById('quizBackBtn').addEventListener('click', () => {
  document.getElementById('app').classList.remove('active');
  document.getElementById('modeSelect').classList.remove('hidden');
  updateStreakDisplay();
  updateXPDisplay();
});
document.getElementById('swBackBtn').addEventListener('click', () => {
  document.getElementById('swipeApp').classList.remove('active');
  document.getElementById('modeSelect').classList.remove('hidden');
});

// SRS mode buttons
document.getElementById('srsBackBtn').addEventListener('click', exitSRSMode);
document.getElementById('srsFlipBtn').addEventListener('click', flipSRSCard);
document.getElementById('srsCompleteBackBtn').addEventListener('click', exitSRSMode);
['srsAgain', 'srsHard', 'srsGood', 'srsEasy'].forEach((id, i) => {
  document.getElementById(id).addEventListener('click', () => rateSRSCard(i + 1));
});

// Speak mode buttons
document.getElementById('speakBackBtn').addEventListener('click', exitSpeakMode);
document.getElementById('speakMicBtn').addEventListener('click', startSpeakListening);
document.getElementById('speakTypeInp').addEventListener('keydown', handleSpeakTypeSubmit);

// Chunks mode buttons
document.getElementById('chunksBackBtn').addEventListener('click', exitChunksMode);

// ── Language select ───────────────────────────────────────────────────

const languageSelect  = document.getElementById('languageSelect');
const modeTitle       = document.querySelector('.ms-title');
const currentLang     = localStorage.getItem('parole_lang') || 'it';

if (modeTitle) {
  modeTitle.textContent = `Parole! ${currentLang === 'nl' ? '🇳🇱' : '🇮🇹'}`;
}
if (languageSelect) {
  languageSelect.value = currentLang;
  languageSelect.addEventListener('change', e => {
    localStorage.setItem('parole_lang', e.target.value);
    window.location.reload();
  });
}

// ── Bootstrap ─────────────────────────────────────────────────────────

loadState();
loadProgress();
loadXPData();
initStreakOnLoad();
updateSRSDueCount();
updateStreakDisplay();
updateXPDisplay();
