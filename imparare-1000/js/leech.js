// Leech detection: words the user repeatedly fails → disambiguation cards

const LEECH_THRESHOLD    = 4;  // failures before flagged
const LEECH_CLEAR_STREAK = 2;  // consecutive correct to clear flag

function _leechKey() {
  return (typeof storageKey === 'function') ? storageKey('parole_leeches') : 'parole_leeches';
}

function loadLeechData() {
  try { return JSON.parse(localStorage.getItem(_leechKey()) || '{}'); }
  catch (e) { return {}; }
}

function saveLeechData(d) {
  try { localStorage.setItem(_leechKey(), JSON.stringify(d)); } catch (e) {}
}

function _wordKey(word) {
  return word[0];
}

// Called when the user picks the wrong answer.
// chosenWord is the wrong word object they picked (used for confusion tracking).
// Returns { isNewLeech, fails }
function recordWrongAnswer(word, chosenWord) {
  const d = loadLeechData();
  const key = _wordKey(word);

  if (!d[key]) d[key] = { fails: 0, confusedWith: {}, consecutive: 0, isLeech: false };
  d[key].fails++;
  d[key].consecutive = 0;

  if (chosenWord) {
    const cKey = _wordKey(chosenWord);
    d[key].confusedWith[cKey] = (d[key].confusedWith[cKey] || 0) + 1;
  }

  const wasLeech = d[key].isLeech;
  if (d[key].fails >= LEECH_THRESHOLD) d[key].isLeech = true;

  saveLeechData(d);
  return { isNewLeech: d[key].isLeech && !wasLeech, fails: d[key].fails };
}

// Called when the user answers correctly.
// Returns { leechCleared }
function recordLeechCorrect(word) {
  const d = loadLeechData();
  const key = _wordKey(word);
  if (!d[key]) return { leechCleared: false };

  d[key].consecutive = (d[key].consecutive || 0) + 1;

  let leechCleared = false;
  if (d[key].isLeech && d[key].consecutive >= LEECH_CLEAR_STREAK) {
    d[key].isLeech = false;
    d[key].fails   = 0;
    leechCleared   = true;
  }

  saveLeechData(d);
  return { leechCleared };
}

function isLeechWord(word) {
  const d = loadLeechData();
  const key = _wordKey(word);
  return !!(d[key] && d[key].isLeech);
}

// Returns the word object most often confused with the given word, or null.
function getMostConfusedWord(word) {
  if (typeof WORDS === 'undefined') return null;
  const d = loadLeechData();
  const key = _wordKey(word);
  if (!d[key] || !d[key].confusedWith) return null;

  let maxKey = null, maxCount = 0;
  for (const [k, v] of Object.entries(d[key].confusedWith)) {
    if (v > maxCount) { maxCount = v; maxKey = k; }
  }
  if (!maxKey) return null;
  return WORDS.find(w => w[0] === maxKey) || null;
}

// Returns a disambiguation hint string for display after a wrong answer on a leech.
function buildDisambiguationHint(word) {
  const confused = getMostConfusedWord(word);
  if (!confused) return null;
  return `⚡ Often confused: "${word[0]}" = ${word[1]}  •  "${confused[0]}" = ${confused[1]}`;
}

function getLeechCount() {
  const d = loadLeechData();
  return Object.values(d).filter(x => x.isLeech).length;
}
