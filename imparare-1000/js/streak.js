// Daily streak system with streak freeze mechanic

const DAILY_GOAL_ANSWERS = 10;

function streakStorageKey() {
  return (typeof storageKey === 'function') ? storageKey('parole_streak') : 'parole_streak';
}

function _loadStreakRaw() {
  try {
    return JSON.parse(localStorage.getItem(streakStorageKey()) || 'null') || {};
  } catch (e) { return {}; }
}

function _saveStreak(data) {
  try { localStorage.setItem(streakStorageKey(), JSON.stringify(data)); } catch (e) {}
}

function _today() {
  return new Date().toISOString().slice(0, 10);
}

// Called once on app load — applies freezes / resets streak if day(s) were missed.
function initStreakOnLoad() {
  const d = _loadStreakRaw();
  const today = _today();

  if (!d.lastDate || d.lastDate === today) {
    if (!d.lastDate) {
      d.lastDate = today;
      d.count = 0;
      d.freezesAvailable = 0;
      d.todayAnswers = 0;
      d.todayCompleted = false;
      _saveStreak(d);
    }
    return d;
  }

  const last = new Date(d.lastDate);
  const now  = new Date(today);
  const diffDays = Math.round((now - last) / 86400000);

  if (diffDays === 1) {
    if (!d.todayCompleted) {
      if ((d.freezesAvailable || 0) > 0) {
        d.freezesAvailable--;
      } else {
        d.count = 0;
      }
    }
  } else if (diffDays > 1) {
    d.count = 0;
    d.freezesAvailable = Math.min(1, d.freezesAvailable || 0);
  }

  d.todayAnswers = 0;
  d.todayCompleted = false;
  d.lastDate = today;
  _saveStreak(d);
  return d;
}

// Call on every correct answer in any mode. Returns { data, milestone, gainedFreeze }
function recordStreakAnswer() {
  const d = _loadStreakRaw();
  const today = _today();

  if (d.lastDate !== today) {
    d.todayAnswers = 0;
    d.todayCompleted = false;
    d.lastDate = today;
  }

  d.todayAnswers = (d.todayAnswers || 0) + 1;

  let milestone = null;
  let gainedFreeze = false;

  if (!d.todayCompleted && d.todayAnswers >= DAILY_GOAL_ANSWERS) {
    d.todayCompleted = true;
    d.count = (d.count || 0) + 1;

    if (d.count % 7 === 0 && (d.freezesAvailable || 0) < 2) {
      d.freezesAvailable = Math.min(2, (d.freezesAvailable || 0) + 1);
      gainedFreeze = true;
    }

    const milestones = [3, 7, 14, 30, 60, 100, 200, 365];
    if (milestones.includes(d.count)) milestone = d.count;
  }

  _saveStreak(d);
  return { data: d, milestone, gainedFreeze };
}

function getStreakData() {
  return _loadStreakRaw();
}

function getDailyProgress() {
  const d = _loadStreakRaw();
  return {
    answers: d.todayAnswers || 0,
    goal: DAILY_GOAL_ANSWERS,
    completed: d.todayCompleted || false,
  };
}

function updateStreakDisplay() {
  const d = getStreakData();
  const el = document.getElementById('msStreakEl');
  if (!el) return;
  el.textContent = (d.count || 0) + ' day streak';
  const freezeEl = document.getElementById('msFreezeEl');
  if (freezeEl) {
    const f = d.freezesAvailable || 0;
    freezeEl.textContent = f > 0 ? '🧊'.repeat(f) : '';
    freezeEl.style.display = f > 0 ? '' : 'none';
  }

  const progress = getDailyProgress();
  const progressEl = document.getElementById('msDailyProgressEl');
  if (progressEl) {
    const pct = Math.min(100, (progress.answers / progress.goal) * 100);
    progressEl.style.width = pct + '%';
  }
  const dangerEl = document.getElementById('msStreakDanger');
  if (dangerEl) {
    const shouldShow = (d.count || 0) > 0 && !progress.completed;
    dangerEl.style.display = shouldShow ? '' : 'none';
  }
}
