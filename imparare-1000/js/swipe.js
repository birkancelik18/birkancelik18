const swState = {
  deck: [],
  known: 0,
  total: 0,
};

function startSwipeSession() {
  swState.deck = shuffle([...WORDS]);
  swState.known = 0;
  swState.total = WORDS.length;
  renderSwipeDeck();
  updateSwProgress();
}

function updateSwProgress() {
  document.getElementById('swProgress').textContent =
    swState.known + ' / ' + swState.total + ' known';
}

function buildSwCard(word) {
  const [italian, english, , cat, sentenceIT, , hint] = word;
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
  wordEl.textContent = italian;

  const sentenceEl = document.createElement('div');
  sentenceEl.className = 'sw-sentence';
  sentenceEl.textContent = sentenceIT;

  const hintEl = document.createElement('div');
  hintEl.className = 'sw-hint';
  if (hint) hintEl.textContent = '💡 ' + hint;
  hintEl.style.display = hint ? '' : 'none';

  const divider = document.createElement('hr');
  divider.className = 'sw-divider';

  const meaningEl = document.createElement('div');
  meaningEl.className = 'sw-meaning';
  meaningEl.textContent = '🇬🇧 ' + english;

  const labelKnow = document.createElement('div');
  labelKnow.className = 'sw-label sw-label-know';
  labelKnow.textContent = 'Know it ✓';

  const labelDont = document.createElement('div');
  labelDont.className = 'sw-label sw-label-dontknow';
  labelDont.textContent = "Don't know ✗";

  card.append(badge, wordEl, sentenceEl, hintEl, divider, meaningEl, labelKnow, labelDont);
  return card;
}

function renderSwipeDeck() {
  const deckEl = document.getElementById('swDeck');
  deckEl.innerHTML = '';

  if (swState.deck.length === 0) {
    showSwipeSummary();
    return;
  }

  // Render up to 3 cards; bottom-first so the top card is the last DOM child (highest paint order)
  const visible = swState.deck.slice(0, 3).reverse();
  visible.forEach(word => {
    const card = buildSwCard(word);
    deckEl.appendChild(card);
  });

  // The last appended card is the top card
  const topCard = deckEl.lastElementChild;
  topCard.classList.add('top');
  attachDragHandlers(topCard, swState.deck[0]);
}

function attachDragHandlers(card, word) {
  let startX = 0, currentX = 0;
  let dragging = false;
  const THRESHOLD = window.innerWidth * 0.28;

  function onPointerDown(e) {
    dragging = true;
    startX = e.clientX;
    currentX = 0;
    card.setPointerCapture(e.pointerId);
    card.style.transition = 'none';
  }

  function onPointerMove(e) {
    if (!dragging) return;
    e.preventDefault();
    currentX = e.clientX - startX;
    const rotate = currentX * 0.08;
    card.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;

    const ratio = Math.min(Math.abs(currentX) / THRESHOLD, 1);
    const knowLabel = card.querySelector('.sw-label-know');
    const dontLabel = card.querySelector('.sw-label-dontknow');
    if (currentX > 0) {
      knowLabel.style.opacity = ratio;
      dontLabel.style.opacity = 0;
    } else {
      dontLabel.style.opacity = ratio;
      knowLabel.style.opacity = 0;
    }
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;

    if (currentX > THRESHOLD) {
      flyCard(card, word, true);
    } else if (currentX < -THRESHOLD) {
      flyCard(card, word, false);
    } else {
      card.style.transition = 'transform 0.35s cubic-bezier(0.175,0.885,0.32,1.275)';
      card.style.transform = '';
      card.querySelector('.sw-label-know').style.opacity = 0;
      card.querySelector('.sw-label-dontknow').style.opacity = 0;
    }
  }

  card.addEventListener('pointerdown', onPointerDown);
  card.addEventListener('pointermove', onPointerMove);
  card.addEventListener('pointerup', onPointerUp);
  card.addEventListener('pointercancel', onPointerUp);
}

function flyCard(card, word, isKnown) {
  const dir = isKnown ? 1 : -1;
  card.style.transition = 'transform 0.38s ease-in, opacity 0.38s ease-in';
  card.style.transform = `translateX(${dir * window.innerWidth * 1.4}px) rotate(${dir * 30}deg)`;
  card.style.opacity = '0';

  if (isKnown) {
    swState.known++;
    swState.deck.shift();
    if (!masteredMap[word[0]]) {
      masteredMap[word[0]] = true;
      state.masteredWords = Object.keys(masteredMap).length;
      saveProgress();
    }
  } else {
    swState.deck.shift();
    swState.deck.push(word);
  }

  updateSwProgress();

  setTimeout(() => {
    renderSwipeDeck();
  }, 380);
}

function handleSwipeKey(e) {
  if (!document.getElementById('swipeApp').classList.contains('active')) return;
  if (swState.deck.length === 0) return;
  const topCard = document.getElementById('swDeck').lastElementChild;
  if (!topCard || !topCard.classList.contains('top')) return;
  if (e.key === 'ArrowRight') flyCard(topCard, swState.deck[0], true);
  if (e.key === 'ArrowLeft')  flyCard(topCard, swState.deck[0], false);
}
document.addEventListener('keydown', handleSwipeKey);

// showSwipeSummary defined in Task 6 — stub
function showSwipeSummary() { /* stub */ }
