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

// attachDragHandlers and flyCard defined in Task 5 — stub to prevent ReferenceError
function attachDragHandlers(card, word) { /* stub */ }

// showSwipeSummary defined in Task 6 — stub
function showSwipeSummary() { /* stub */ }
