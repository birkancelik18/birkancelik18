// FSRS-4.5 Algorithm
// Reference: open-spaced-repetition/fsrs4anki

const FSRS_W = [
  0.4072, 1.1829, 3.1262, 15.4722,  // 0-3: initial stability for ratings 1-4
  7.2102, 0.5316,                    // 4-5: initial difficulty parameters
  1.0651, 0.0589,                    // 6-7: difficulty update parameters
  1.5330, 0.1544, 1.0020,            // 8-10: recall stability parameters
  1.9395, 0.1100, 0.2900, 2.2700,   // 11-14: forget stability parameters
  0.0140, 3.0000, 0.3400,            // 15-17: hard penalty, easy bonus
];

const FSRS_DECAY = -0.5;
const FSRS_FACTOR = Math.pow(0.9, 1 / FSRS_DECAY) - 1; // ≈ 0.2346
const FSRS_DESIRED_RETENTION = 0.9;

const FSRS_AGAIN = 1;
const FSRS_HARD  = 2;
const FSRS_GOOD  = 3;
const FSRS_EASY  = 4;

function fsrsInitStability(rating) {
  return Math.max(0.1, FSRS_W[rating - 1]);
}

function fsrsInitDifficulty(rating) {
  const d = FSRS_W[4] - Math.exp(FSRS_W[5] * (rating - 1)) + 1;
  return Math.min(10, Math.max(1, d));
}

function fsrsRetrievability(elapsedDays, stability) {
  if (stability <= 0) return 0;
  return Math.pow(1 + FSRS_FACTOR * elapsedDays / stability, FSRS_DECAY);
}

function fsrsNextDifficulty(d, rating) {
  const nextD = d - FSRS_W[6] * (rating - 3);
  const easyD0 = fsrsInitDifficulty(FSRS_EASY);
  return Math.min(10, Math.max(1, FSRS_W[7] * easyD0 + (1 - FSRS_W[7]) * nextD));
}

function fsrsRecallStability(d, s, r, rating) {
  const hardPenalty = rating === FSRS_HARD ? FSRS_W[15] : 1;
  const easyBonus   = rating === FSRS_EASY ? FSRS_W[16] : 1;
  const increase = Math.exp(FSRS_W[8]) * (11 - d) * Math.pow(s, -FSRS_W[9]) *
    (Math.exp(FSRS_W[10] * (1 - r)) - 1) * hardPenalty * easyBonus;
  return Math.max(0.1, s * (increase + 1));
}

function fsrsForgetStability(d, s, r) {
  return Math.max(0.1,
    FSRS_W[11] * Math.pow(d, -FSRS_W[12]) *
    (Math.pow(s + 1, FSRS_W[13]) - 1) *
    Math.exp(FSRS_W[14] * (1 - r))
  );
}

function fsrsNextInterval(stability) {
  const interval = stability / FSRS_FACTOR *
    (Math.pow(FSRS_DESIRED_RETENTION, 1 / FSRS_DECAY) - 1);
  return Math.max(1, Math.round(interval));
}

function fsrsNewCard() {
  return { stability: 0, difficulty: 0, due: null, lastReview: null, reps: 0, lapses: 0 };
}

function fsrsReview(card, rating) {
  const now = Date.now();
  const todayMs = Math.floor(now / 86400000) * 86400000;

  let newS, newD;

  if (!card || card.reps === 0) {
    newS = fsrsInitStability(rating);
    newD = fsrsInitDifficulty(rating);
  } else {
    const lastMs = new Date(card.lastReview).getTime();
    const elapsed = Math.max(1, Math.floor((now - lastMs) / 86400000));
    const r = fsrsRetrievability(elapsed, card.stability);
    newS = rating === FSRS_AGAIN
      ? fsrsForgetStability(card.difficulty, card.stability, r)
      : fsrsRecallStability(card.difficulty, card.stability, r, rating);
    newD = fsrsNextDifficulty(card.difficulty, rating);
  }

  newS = Math.min(36500, Math.max(0.1, newS));
  const intervalDays = fsrsNextInterval(newS);
  const dueMs = todayMs + intervalDays * 86400000;

  return {
    stability: newS,
    difficulty: newD,
    due: new Date(dueMs).toISOString(),
    lastReview: new Date(now).toISOString(),
    reps: (card ? card.reps : 0) + 1,
    lapses: (card ? card.lapses : 0) + (rating === FSRS_AGAIN ? 1 : 0),
  };
}

function fsrsIsDue(card) {
  if (!card || !card.due) return true;
  return new Date(card.due).getTime() <= Date.now();
}

function fsrsDaysUntilDue(card) {
  if (!card || !card.due) return 0;
  return Math.ceil((new Date(card.due).getTime() - Date.now()) / 86400000);
}

function fsrsCountDue() {
  if (typeof WORDS === 'undefined') return 0;
  const data = fsrsLoadAllCards();
  let count = 0;
  WORDS.forEach((_, idx) => {
    if (fsrsIsDue(data[idx] || null)) count++;
  });
  return count;
}

function fsrsLoadAllCards() {
  try {
    const key = (typeof storageKey === 'function') ? storageKey('parole_fsrs') : 'parole_fsrs';
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch (e) { return {}; }
}

function fsrsSaveAllCards(data) {
  try {
    const key = (typeof storageKey === 'function') ? storageKey('parole_fsrs') : 'parole_fsrs';
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
}
