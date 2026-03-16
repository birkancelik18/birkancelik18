function enterQuizMode() {
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('app').classList.add('active');
  loadProgress();
  loadSession();
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

function handleBigBtn() {
  const overlay = document.getElementById('bigOverlay');
  const mode = overlay.dataset.mode;
  overlay.classList.remove('show');
  if (mode === 'gameover') {
    resetGame();
  } else if (mode === 'swipe') {
    startSwipeSession();
  } else {
    renderQuestion(true);
  }
}

document.getElementById('btnQuiz').addEventListener('click', enterQuizMode);
document.getElementById('btnSwipe').addEventListener('click', enterSwipeMode);
document.getElementById('hearBtn').addEventListener('click', () => {
  speak(state.currentWord?.[4] || state.currentWord?.[0] || '');
});
document.getElementById('bigBtn').addEventListener('click', handleBigBtn);
document.getElementById('swBackBtn').addEventListener('click', () => {
  document.getElementById('swipeApp').classList.remove('active');
  document.getElementById('modeSelect').classList.remove('hidden');
});

loadState();
loadProgress();
