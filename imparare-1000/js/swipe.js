const swState = {
  currentWord: null,
  currentIndex: 0,
  seen: 0,
  flying: false,
};

function getSwipeStorageKey(base) {
  // Prefer shared storageKey(lang) from state.js, but keep a safe fallback.
  if (typeof storageKey === 'function') return storageKey(base);
  const lang = window.paroleLanguage || localStorage.getItem('parole_lang') || 'it';
  return `${base}_${lang}`;
}

function getWordFromCurrentIndex() {
  if (!Array.isArray(WORDS) || WORDS.length === 0) return null;
  const len = WORDS.length;
  const idx = (swState.currentIndex - 1 + len) % len;
  return WORDS[idx];
}

function loadSwipeSession() {
  try {
    const raw = localStorage.getItem(getSwipeStorageKey('parole_swipe_session')) || 'null';
    const s = JSON.parse(raw);
    if (!s || typeof s !== 'object') return false;
    if (typeof s.currentIndex !== 'number') return false;
    swState.currentIndex = s.currentIndex;
    swState.seen = s.seen ?? 0;
    return true;
  } catch (e) {
    return false;
  }
}

function saveSwipeSession() {
  try {
    localStorage.setItem(getSwipeStorageKey('parole_swipe_session'), JSON.stringify({
      currentIndex: swState.currentIndex,
      seen: swState.seen,
    }));
  } catch (e) {}
}

function clearSwipeSession() {
  try { localStorage.removeItem(getSwipeStorageKey('parole_swipe_session')); } catch (e) {}
}

function pickNextWordInOrder() {
  if (!Array.isArray(WORDS) || WORDS.length === 0) return null;
  const word = WORDS[swState.currentIndex % WORDS.length];
  swState.currentIndex = (swState.currentIndex + 1) % WORDS.length;
  return word;
}

function pickPrevWordInOrder() {
  if (!Array.isArray(WORDS) || WORDS.length === 0) return null;
  const prevIndex = (swState.currentIndex - 2 + WORDS.length) % WORDS.length;
  const word = WORDS[prevIndex];
  swState.currentIndex = (prevIndex + 1) % WORDS.length;
  return word;
}

function startSwipeSession(fresh = false) {
  swState.flying = false;

  if (fresh) {
    clearSwipeSession();
    swState.currentIndex = 0;
    swState.currentWord = pickNextWordInOrder();
    swState.seen = 0;
  } else if (!swState.currentWord) {
    const restored = loadSwipeSession();
    if (restored) {
      swState.currentWord = getWordFromCurrentIndex();
    }
    if (!swState.currentWord) {
      swState.currentIndex = 0;
      swState.currentWord = pickNextWordInOrder();
      swState.seen = 0;
    }
  }

  renderSwipeDeck();
  updateSwProgress();
  saveSwipeSession();
}

function updateSwProgress() {
  document.getElementById('swProgress').textContent =
    swState.seen + ' watched';
}

function buildSwCard(word) {
  const [sourceWord, english, pronunciation, cat, sourceSentence, sourceSentenceEn, hint] = word;
  const style = CAT_STYLE[cat] || CAT_STYLE.noun;

  const card = document.createElement('div');
  card.className = 'sw-card';

  const badge = document.createElement('div');
  badge.className = 'sw-cat-badge';
  badge.textContent = style.label;
  badge.style.background = style.bg;
  badge.style.color = style.color;

  const wordEl = document.createElement('div');
  wordEl.className = 'sw-word';
  wordEl.textContent = sourceWord;

  const meaningEl = document.createElement('div');
  meaningEl.className = 'sw-meaning';
  meaningEl.textContent = '🇬🇧 ' + english;

  const sentenceEl = document.createElement('div');
  sentenceEl.className = 'sw-sentence';
  sentenceEl.textContent = sourceSentence;

  const hintEl = document.createElement('div');
  hintEl.className = 'sw-hint';
  if (hint) hintEl.textContent = '💡 ' + hint;
  hintEl.style.display = hint ? '' : 'none';

  const sentenceEnEl = document.createElement('div');
  sentenceEnEl.className = 'sw-sentence-en';
  if (sourceSentenceEn) {
    sentenceEnEl.textContent = '🇬🇧 ' + sourceSentenceEn;
  } else {
    sentenceEnEl.textContent = '';
    sentenceEnEl.style.display = 'none';
  }

  const divider = document.createElement('hr');
  divider.className = 'sw-divider';

  const hearBtn = document.createElement('button');
  hearBtn.type = 'button';
  hearBtn.className = 'hear-btn sw-hear-btn';
  hearBtn.innerHTML = '🔊 <span>Hear pronunciation</span>';
  if (pronunciation) hearBtn.title = `Pronunciation: ${pronunciation}`;
  hearBtn.addEventListener('pointerdown', e => e.stopPropagation());
  hearBtn.addEventListener('click', e => {
    e.stopPropagation();
    const lang = window.paroleLanguage === 'nl' ? 'nl-NL' : 'it-IT';
    speak(sourceWord || sourceSentence || '', lang);
  });

  // Visual hierarchy: Italian word -> English translation -> hint -> sentence(s) -> actions.
  card.append(badge, wordEl, meaningEl, hintEl, sentenceEl, sentenceEnEl, divider, hearBtn);
  return card;
}

function renderSwipeDeck() {
  const deckEl = document.getElementById('swDeck');
  deckEl.innerHTML = '';

  if (!swState.currentWord) {
    return;
  }

  const topCard = buildSwCard(swState.currentWord);
  deckEl.appendChild(topCard);
  topCard.classList.add('top');
  attachDragHandlers(topCard);
}

function attachDragHandlers(card) {
  if (!swState.currentWord) return;
  let startY = 0, currentY = 0;
  let dragging = false;
  const THRESHOLD = window.innerHeight * 0.2;

  function onPointerDown(e) {
    dragging = true;
    startY = e.clientY;
    currentY = 0;
    card.setPointerCapture(e.pointerId);
    card.style.transition = 'none';
  }

  function onPointerMove(e) {
    if (!dragging) return;
    e.preventDefault();
    currentY = e.clientY - startY;
    card.style.transform = `translateY(${currentY}px)`;
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;

    if (currentY < -THRESHOLD) {
      flyCard(card, -1);
    } else if (currentY > THRESHOLD) {
      flyCard(card, 1);
    } else {
      card.style.transition = 'transform 0.35s cubic-bezier(0.175,0.885,0.32,1.275)';
      card.style.transform = '';
    }
  }

  function onWheel(e) {
    if (swState.flying) return;
    e.preventDefault();
    if (Math.abs(e.deltaY) < 20) return;
    flyCard(card, e.deltaY < 0 ? -1 : 1);
  }

  card.addEventListener('pointerdown', onPointerDown);
  card.addEventListener('pointermove', onPointerMove, { passive: false });
  card.addEventListener('pointerup', onPointerUp);
  card.addEventListener('wheel', onWheel, { passive: false });
  card.addEventListener('pointercancel', () => {
    if (!dragging) return;
    dragging = false;
    card.style.transition = 'transform 0.35s cubic-bezier(0.175,0.885,0.32,1.275)';
    card.style.transform = '';
  });
}

function flyCard(card, direction) {
  if (swState.flying) return;
  swState.flying = true;
  card.style.transition = 'transform 0.38s ease-in, opacity 0.38s ease-in';
  card.style.transform = `translateY(${direction * window.innerHeight * 1.2}px)`;
  card.style.opacity = '0';
  swState.seen++;
  updateSwProgress();

  setTimeout(() => {
    swState.currentWord = direction < 0 ? pickPrevWordInOrder() : pickNextWordInOrder();
    swState.flying = false;
    renderSwipeDeck();
    saveSwipeSession();
  }, 380);
}

function handleSwipeKey(e) {
  if (!document.getElementById('swipeApp').classList.contains('active')) return;
  if (!swState.currentWord) return;
  const topCard = document.getElementById('swDeck').lastElementChild;
  if (!topCard || !topCard.classList.contains('top')) return;
  if (e.key === 'ArrowUp') flyCard(topCard, -1);
  if (e.key === 'ArrowDown') flyCard(topCard, 1);
}
document.addEventListener('keydown', handleSwipeKey);
