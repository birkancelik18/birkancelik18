function handleBigBtn() {
  const overlay = document.getElementById('bigOverlay');
  const mode = overlay.dataset.mode;
  overlay.classList.remove('show');
  if (mode === 'gameover') {
    resetGame();
  } else {
    renderQuestion(true);
  }
}

document.getElementById('hearBtn').addEventListener('click', () => {
  speak(state.currentWord?.[4] || state.currentWord?.[0] || '');
});
document.getElementById('bigBtn').addEventListener('click', handleBigBtn);

loadProgress();
loadSession(); // restores score/level/lives/streak; falls back to defaults if no save
renderHearts();
updateScore();
updateStreak();
updateLevel();
updateGoal();
renderQuestion(false);
