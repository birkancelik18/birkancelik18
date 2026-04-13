function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderHearts() {
  const el = document.getElementById('heartsEl');
  el.innerHTML = '';
  for (let i = 0; i < LIVES; i++) {
    const h = document.createElement('span');
    h.className = 'heart' + (i >= state.lives ? ' lost' : '');
    h.textContent = '❤️';
    el.appendChild(h);
  }
}

function updateScore() {
  const el = document.getElementById('scoreEl');
  el.textContent = state.score.toLocaleString();
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

function updateStreak() {
  const el = document.getElementById('streakEl');
  const num = document.getElementById('streakNum');
  num.textContent = state.streak;
  el.classList.toggle('hot', state.streak >= 3);
}

function updateLevel() {
  document.getElementById('lvNum').textContent = state.level;
  document.getElementById('lvProgress').textContent = state.wordsThisLevel;
  const pct = (state.wordsThisLevel / WORDS_PER_LEVEL) * 100;
  document.getElementById('lvBar').style.width = pct + '%';
}

function updateGoal() {
  const el = document.getElementById('goalNum');
  if (!el) return;
  el.textContent = `${state.masteredWords} / ${GOAL_WORDS}`;
}

function getSpeechVoice(lang) {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  if (!voices.length) return null;

  const wanted = lang.toLowerCase();
  const prefix = wanted.split('-')[0];

  return voices.find(v => (v.lang || '').toLowerCase() === wanted)
    || voices.find(v => (v.lang || '').toLowerCase().startsWith(prefix))
    || voices.find(v => (v.name || '').toLowerCase().includes(prefix));
}

function speak(text, lang = window.paroleLanguage === 'nl' ? 'nl-NL' : 'it-IT') {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = getSpeechVoice(lang);
  if (voice) {
    u.voice = voice;
    u.lang = voice.lang || lang;
  } else {
    u.lang = lang;
  }
  u.rate = 0.82;
  window.speechSynthesis.speak(u);
}

function floatPoints(pts, x, y, color) {
  const el = document.createElement('div');
  el.className = 'float-pts';
  el.textContent = '+' + pts;
  el.style.cssText = `left:${x}px;top:${y}px;color:${color || '#ffd93d'};text-shadow:0 0 8px ${color || 'rgba(255,217,61,0.6)'}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function showComboBurst(streak) {
  const comboMessages = { 3: '3x Combo!🔥', 4: '4x Sizzling!🔥', 5: '5x On Fire!🔥', 7: '7x Incredible!💥', 10: '10x GODLIKE!👑' };
  if (!comboMessages[streak] && streak % 5 !== 0) return;
  const msg = comboMessages[streak] || (streak + 'x Combo! 🔥');
  const el = document.getElementById('comboBurst');
  el.textContent = msg;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 700);
}
