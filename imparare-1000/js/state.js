const LIVES = 5;
const WORDS_PER_LEVEL = 10;
const TILE_COLORS = [0, 1, 2, 3];
const GOAL_WORDS = (typeof WORDS !== 'undefined' && Array.isArray(WORDS)) ? WORDS.length : 1266;

function getCurrentLang() {
  const lang = window.paroleLanguage || localStorage.getItem('parole_lang') || 'it';
  return (lang === 'nl' || lang === 'it') ? lang : 'it';
}

function storageKey(base) {
  return `${base}_${getCurrentLang()}`;
}

const state = {
  lives: LIVES,
  score: 0,
  streak: 0,
  bestStreak: 0,
  level: 1,
  wordsThisLevel: 0,
  answered: 0,
  correct: 0,
  currentWord: null,
  usedIndices: [],
  locked: false,
  masteredWords: 0,
  // Words answered wrong are inserted here to be repeated 2 questions later.
  // Each entry is { word, after } where `after` is the answered count at insert time.
  repeatQueue: [],
};

let masteredMap = {};

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('parole_hs') || '{}');
    state.bestStreak = s.bestStreak || 0;
  } catch (e) {}
}

function saveHS() {
  try {
    localStorage.setItem('parole_hs', JSON.stringify({ bestStreak: state.bestStreak }));
  } catch (e) {}
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(storageKey('parole_words')) || '{}';
    const parsed = JSON.parse(raw);
    masteredMap = (parsed && typeof parsed === 'object') ? parsed : {};
  } catch (e) {
    masteredMap = {};
  }
  state.masteredWords = Object.keys(masteredMap).length;
}

function saveProgress() {
  try {
    localStorage.setItem(storageKey('parole_words'), JSON.stringify(masteredMap));
  } catch (e) {}
}

function saveSession() {
  try {
    localStorage.setItem(storageKey('parole_session'), JSON.stringify({
      score: state.score,
      level: state.level,
      wordsThisLevel: state.wordsThisLevel,
      lives: state.lives,
      streak: state.streak,
      bestStreak: state.bestStreak,
      answered: state.answered,
      correct: state.correct,
    }));
  } catch (e) {}
}

function loadSession() {
  try {
    const s = JSON.parse(localStorage.getItem(storageKey('parole_session')) || 'null');
    if (!s) return false;
    state.score           = s.score           ?? 0;
    state.level           = s.level           ?? 1;
    state.wordsThisLevel  = s.wordsThisLevel  ?? 0;
    state.lives           = s.lives           ?? LIVES;
    state.streak          = s.streak          ?? 0;
    state.bestStreak      = s.bestStreak      ?? 0;
    state.answered        = s.answered        ?? 0;
    state.correct         = s.correct         ?? 0;
    return true;
  } catch (e) {
    return false;
  }
}

function clearSession() {
  try { localStorage.removeItem(storageKey('parole_session')); } catch (e) {}
}
