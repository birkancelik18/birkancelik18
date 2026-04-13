// Variable reward system: XP, bonus rounds, RPE badges, micro-interactions

const XP_PER_CORRECT  = 10;
const XP_DAILY_GOAL   = 300;
const BONUS_CHANCE    = 1 / 8;
const BONUS_CARDS     = 3;
const BONUS_MULT      = 2;

const rewardsState = {
  xp: 0,
  dailyXP: 0,
  bonusRemaining: 0,
  dailyGoalDone: false,
};

function _xpKey() {
  return (typeof storageKey === 'function') ? storageKey('parole_xp') : 'parole_xp';
}

function loadXPData() {
  try {
    const raw = JSON.parse(localStorage.getItem(_xpKey()) || '{}');
    rewardsState.xp = raw.xp || 0;
    const today = new Date().toISOString().slice(0, 10);
    if (raw.dailyDate === today) {
      rewardsState.dailyXP = raw.dailyXP || 0;
      rewardsState.dailyGoalDone = raw.dailyGoalDone || false;
    } else {
      rewardsState.dailyXP = 0;
      rewardsState.dailyGoalDone = false;
    }
  } catch (e) {}
}

function _saveXP() {
  try {
    localStorage.setItem(_xpKey(), JSON.stringify({
      xp: rewardsState.xp,
      dailyXP: rewardsState.dailyXP,
      dailyDate: new Date().toISOString().slice(0, 10),
      dailyGoalDone: rewardsState.dailyGoalDone,
    }));
  } catch (e) {}
}

// Returns { xp, bonusActive, dailyGoalJustCompleted }
function awardXP(streakMultiplier) {
  const mult = rewardsState.bonusRemaining > 0 ? BONUS_MULT : 1;
  const base = Math.round(XP_PER_CORRECT * (streakMultiplier || 1) * mult);
  if (rewardsState.bonusRemaining > 0) rewardsState.bonusRemaining--;

  rewardsState.xp += base;
  rewardsState.dailyXP += base;

  const justDone = !rewardsState.dailyGoalDone && rewardsState.dailyXP >= XP_DAILY_GOAL;
  if (justDone) rewardsState.dailyGoalDone = true;

  _saveXP();
  return { xp: base, bonusActive: mult > 1, dailyGoalJustCompleted: justDone };
}

function streakXPMultiplier(streakCount) {
  return Math.min(3, 1 + Math.floor((streakCount || 0) / 5) * 0.5);
}

// Returns true if a bonus round just started
function maybeStartBonusRound() {
  if (rewardsState.bonusRemaining > 0) return false;
  if (Math.random() < BONUS_CHANCE) {
    rewardsState.bonusRemaining = BONUS_CARDS;
    return true;
  }
  return false;
}

// ── UI helpers ─────────────────────────────────────────────────────────

function showXPFloat(xp, x, y, bonus) {
  const el = document.createElement('div');
  el.className = 'float-pts xp-float' + (bonus ? ' xp-bonus' : '');
  el.textContent = '+' + xp + ' XP';
  el.style.cssText = `left:${x}px;top:${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function showBonusRoundBanner() {
  let el = document.getElementById('bonusRoundBanner');
  if (!el) {
    el = document.createElement('div');
    el.id = 'bonusRoundBanner';
    el.className = 'bonus-banner';
    document.body.appendChild(el);
  }
  el.textContent = '⚡ BONUS ROUND! 2× XP for 3 cards!';
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

function showRPEBadge(icon, title, sub) {
  let el = document.getElementById('rpeBadge');
  if (!el) {
    el = document.createElement('div');
    el.id = 'rpeBadge';
    el.className = 'rpe-badge';
    el.innerHTML = [
      '<div class="rpe-icon" id="rpeIcon"></div>',
      '<div class="rpe-title" id="rpeTitle"></div>',
      '<div class="rpe-sub" id="rpeSub"></div>',
      '<button class="big-btn rpe-close-btn" id="rpeBadgeClose">Awesome! →</button>',
    ].join('');
    document.body.appendChild(el);
    document.getElementById('rpeBadgeClose').addEventListener('click', () => {
      el.classList.remove('show');
    });
  }
  document.getElementById('rpeIcon').textContent = icon;
  document.getElementById('rpeTitle').textContent = title;
  document.getElementById('rpeSub').textContent = sub;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  if (typeof spawnConfetti === 'function') {
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 80);
  }
}

function updateXPDisplay() {
  const el = document.getElementById('msXPEl');
  if (el) el.textContent = rewardsState.xp.toLocaleString() + ' XP';
  const dailyEl = document.getElementById('msDailyXPEl');
  if (dailyEl) dailyEl.textContent = rewardsState.dailyXP + ' / ' + XP_DAILY_GOAL + ' today';
  const barEl = document.getElementById('msXPBarFill');
  if (barEl) {
    const pct = Math.min(100, (rewardsState.dailyXP / XP_DAILY_GOAL) * 100);
    barEl.style.width = pct + '%';
  }
}

// Central handler for a correct answer in any mode (except Sprint which has its own logic).
// Returns awardXP result + streak result.
function handleCorrectReward(currentStreak) {
  const mult = streakXPMultiplier(currentStreak);
  const xpResult = awardXP(mult);
  const streakResult = (typeof recordStreakAnswer === 'function') ? recordStreakAnswer() : { data: {}, milestone: null, gainedFreeze: false };
  const bonusFired  = maybeStartBonusRound();

  if (bonusFired) showBonusRoundBanner();
  if (xpResult.dailyGoalJustCompleted && typeof spawnConfetti === 'function') {
    setTimeout(() => spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 60), 300);
  }
  if (streakResult.milestone) {
    setTimeout(() => showRPEBadge('🔥', streakResult.data.count + '-Day Streak!', 'Amazing consistency!'), 700);
  }
  if (streakResult.gainedFreeze) {
    setTimeout(() => showRPEBadge('🧊', 'Streak Freeze Earned!', 'Miss a day — your streak stays safe!'), 700);
  }

  updateXPDisplay();
  updateStreakDisplay();

  return { xpResult, streakResult };
}
