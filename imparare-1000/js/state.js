const LIVES = 5;
const WORDS_PER_LEVEL = 10;
const TILE_COLORS = [0, 1, 2, 3];
const GOAL_WORDS = 1000;

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
    const raw = localStorage.getItem('parole_words') || '{}';
    const parsed = JSON.parse(raw);
    masteredMap = (parsed && typeof parsed === 'object') ? parsed : {};
  } catch (e) {
    masteredMap = {};
  }
  state.masteredWords = Object.keys(masteredMap).length;
}

function saveProgress() {
  try {
    localStorage.setItem('parole_words', JSON.stringify(masteredMap));
  } catch (e) {}
}
