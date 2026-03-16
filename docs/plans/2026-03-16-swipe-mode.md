# Swipe Mode Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Bumble-style swipe flashcard mode where a card shows the full word details and the user self-assesses by swiping right (know it) or left (don't know), with unknown words cycling back.

**Architecture:** A mode-select splash screen is shown on page load before either mode starts. Both the quiz section and swipe section live in `index.html` toggled via CSS class `active` on `#app` and `#swipeApp`. All swipe logic lives in a new `js/swipe.js`. Shared utilities (`words.js`, `ui.js`, `state.js`) are reused without modification.

**Tech Stack:** Vanilla JS, HTML5 Pointer Events API (covers mouse + touch), CSS transforms for card drag/rotate.

---

### Task 1: Mode-select screen HTML

**Files:**
- Modify: `imparare-1000/index.html`

**Step 1: Add mode-select section and swipe section to index.html**

Inside `<body>`, before `<canvas id="confetti">`, insert:

```html
<!-- Mode select -->
<div id="modeSelect" class="mode-select">
  <div class="ms-title">Parole! 🇮🇹</div>
  <div class="ms-sub">How do you want to study?</div>
  <div class="ms-cards">
    <button class="ms-card" id="btnQuiz">
      <div class="ms-card-icon">🧩</div>
      <div class="ms-card-name">Quiz</div>
      <div class="ms-card-desc">Fill in the blank<br>Multiple choice</div>
    </button>
    <button class="ms-card" id="btnSwipe">
      <div class="ms-card-icon">👆</div>
      <div class="ms-card-name">Swipe</div>
      <div class="ms-card-desc">Flashcards<br>Self-assess</div>
    </button>
  </div>
</div>
```

After the closing `</div>` of `#app` (the quiz section), insert the swipe section:

```html
<!-- Swipe mode -->
<div id="swipeApp" class="swipe-app">
  <div class="sw-topbar">
    <button class="sw-back-btn" id="swBackBtn">← Back</button>
    <div class="sw-progress" id="swProgress">0 known</div>
  </div>

  <div class="sw-deck" id="swDeck">
    <!-- Cards injected by swipe.js -->
  </div>

  <div class="sw-hint-row">
    <span class="sw-hint-left">👈 Don't know</span>
    <span class="sw-hint-right">Know it 👉</span>
  </div>
</div>
```

Also add `js/swipe.js` to the script tags at the bottom, after `game.js`:

```html
<script defer src="js/swipe.js"></script>
```

**Step 2: Verify in browser**

Open `index.html` in a browser. You should still see the existing quiz UI — the new sections have no styles yet so they may overlap, but JS is not wired yet so nothing breaks.

**Step 3: Commit**

```bash
git add imparare-1000/index.html
git commit -m "feat: add mode-select and swipe section HTML scaffolding"
```

---

### Task 2: Mode-select and swipe section CSS

**Files:**
- Modify: `imparare-1000/style.css`

**Step 1: Hide quiz and swipe app by default; show mode select**

Add at the end of `style.css`:

```css
/* ── Mode visibility ─────────────────────────── */
#app        { display: none; }
#swipeApp   { display: none; }
#modeSelect { display: flex; }

#app.active        { display: block; }
#swipeApp.active   { display: flex; }
#modeSelect.hidden { display: none; }
```

**Step 2: Mode-select screen styles**

```css
/* ── Mode Select ─────────────────────────────── */
.mode-select {
  position: fixed; inset: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a1a2e;
  z-index: 200;
  gap: 1.2rem;
  padding: 2rem;
}

.ms-title {
  font-family: 'Nunito', sans-serif;
  font-size: 2.4rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
}

.ms-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  font-family: 'Nunito', sans-serif;
  margin-top: -0.4rem;
}

.ms-cards {
  display: flex;
  gap: 1.2rem;
  margin-top: 0.8rem;
}

.ms-card {
  background: #16213e;
  border: 2px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 1.8rem 1.4rem;
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s, background 0.15s;
  color: #fff;
  font-family: 'Nunito', sans-serif;
}

.ms-card:hover, .ms-card:focus {
  transform: translateY(-4px) scale(1.03);
  border-color: #e94560;
  background: #0f3460;
  outline: none;
}

.ms-card-icon { font-size: 2.4rem; }

.ms-card-name {
  font-size: 1.15rem;
  font-weight: 800;
}

.ms-card-desc {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.5);
  text-align: center;
  line-height: 1.4;
}
```

**Step 3: Swipe app layout**

```css
/* ── Swipe App ───────────────────────────────── */
.swipe-app {
  flex-direction: column;
  align-items: center;
  min-height: 100dvh;
  background: #1a1a2e;
  padding: 0 0 1.5rem;
  overflow: hidden;
  position: relative;
}

.sw-topbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem 0.4rem;
}

.sw-back-btn {
  background: none;
  border: none;
  color: rgba(255,255,255,0.55);
  font-family: 'Nunito', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  transition: color 0.15s, background 0.15s;
}

.sw-back-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }

.sw-progress {
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.7);
}

.sw-deck {
  position: relative;
  width: min(380px, 92vw);
  height: 520px;
  margin-top: 1rem;
}

.sw-hint-row {
  display: flex;
  justify-content: space-between;
  width: min(380px, 92vw);
  margin-top: 1rem;
  font-family: 'Nunito', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
}
```

**Step 4: Swipe card styles**

```css
/* ── Swipe Card ──────────────────────────────── */
.sw-card {
  position: absolute;
  inset: 0;
  background: #16213e;
  border-radius: 22px;
  border: 1.5px solid rgba(255,255,255,0.09);
  padding: 1.8rem 1.6rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  cursor: grab;
  user-select: none;
  touch-action: none;
  will-change: transform;
  transition: box-shadow 0.15s;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
}

.sw-card:active { cursor: grabbing; }

/* Behind-cards visual stack effect */
.sw-card:nth-child(2) {
  transform: scale(0.96) translateY(10px);
  z-index: 0;
  pointer-events: none;
}
.sw-card:nth-child(3) {
  transform: scale(0.92) translateY(20px);
  z-index: 0;
  pointer-events: none;
}

.sw-card.top { z-index: 10; }

.sw-cat-badge {
  align-self: flex-start;
  font-size: 0.7rem;
  font-weight: 800;
  font-family: 'Nunito', sans-serif;
  padding: 0.2rem 0.7rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sw-word {
  font-family: 'Nunito', sans-serif;
  font-size: 2.1rem;
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
}

.sw-sentence {
  font-family: 'Nunito', sans-serif;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.65);
  font-style: italic;
  line-height: 1.5;
}

.sw-hint {
  font-family: 'Nunito', sans-serif;
  font-size: 0.78rem;
  color: rgba(255,220,80,0.8);
}

.sw-divider {
  border: none;
  border-top: 1px solid rgba(255,255,255,0.08);
  margin: 0.2rem 0;
}

.sw-meaning {
  font-family: 'Nunito', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #e8e8f0;
}

/* Swipe direction overlays */
.sw-label {
  position: absolute;
  top: 1.4rem;
  font-family: 'Nunito', sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  padding: 0.35rem 1rem;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.1s;
  pointer-events: none;
  border: 3px solid;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.sw-label-know {
  right: 1.2rem;
  color: #2ecc71;
  border-color: #2ecc71;
}

.sw-label-dontknow {
  left: 1.2rem;
  color: #e74c3c;
  border-color: #e74c3c;
}
```

**Step 5: Verify**

Open `index.html` in browser. You should now see the mode-select screen (dark background, two cards). The quiz app and swipe app are hidden. Clicking cards does nothing yet.

**Step 6: Commit**

```bash
git add imparare-1000/style.css
git commit -m "feat: add mode-select and swipe mode CSS"
```

---

### Task 3: Mode-select wiring and quiz mode entry

**Files:**
- Create: `imparare-1000/js/swipe.js` (empty scaffold for now)
- Modify: `imparare-1000/js/main.js`

**Step 1: Create swipe.js stub**

Create `imparare-1000/js/swipe.js` with just an empty comment for now:

```js
// Swipe mode — implemented in Task 4+
```

**Step 2: Modify main.js to wire mode select**

At the top of `main.js`, before all existing code, add:

```js
function enterQuizMode() {
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('app').classList.add('active');
}

function enterSwipeMode() {
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('swipeApp').classList.add('active');
  startSwipeSession();
}

document.getElementById('btnQuiz').addEventListener('click', enterQuizMode);
document.getElementById('btnSwipe').addEventListener('click', enterSwipeMode);
```

Remove the direct calls at the bottom of `main.js` that immediately start the quiz (`renderHearts()`, `updateScore()` etc.) — they now only run when quiz mode is entered. Wrap them inside `enterQuizMode()` instead. The full new `main.js` should be:

```js
function enterQuizMode() {
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('app').classList.add('active');
  loadProgress();
  loadSession();
  renderHearts();
  updateScore();
  updateStreak();
  updateLevel();
  updateGoal();
  renderQuestion(false);
}

function enterSwipeMode() {
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('swipeApp').classList.add('active');
  startSwipeSession();
}

document.getElementById('btnQuiz').addEventListener('click', enterQuizMode);
document.getElementById('btnSwipe').addEventListener('click', enterSwipeMode);

document.getElementById('hearBtn').addEventListener('click', () => {
  speak(state.currentWord?.[4] || state.currentWord?.[0] || '');
});
document.getElementById('bigBtn').addEventListener('click', handleBigBtn);
```

Note: `loadProgress()` is still called at the top level (before mode select) in `state.js` — move its call to inside `enterQuizMode` and `enterSwipeMode` so both modes can access `masteredMap`. Actually `loadProgress` and `loadState` should be called once on page load before mode select. Add these two calls at the very bottom of `main.js` (outside any function) so they run immediately:

```js
loadState();
loadProgress();
```

**Step 3: Verify**

Open `index.html`. Click "Quiz" — the mode-select disappears and the quiz game starts. Click back won't work yet (not wired), but quiz should be fully functional.

**Step 4: Commit**

```bash
git add imparare-1000/js/swipe.js imparare-1000/js/main.js
git commit -m "feat: wire mode-select to quiz and swipe entry points"
```

---

### Task 4: Swipe deck logic

**Files:**
- Modify: `imparare-1000/js/swipe.js`

**Step 1: Write deck state and session init**

Replace the stub content of `swipe.js` with:

```js
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
```

**Step 2: Card building function**

```js
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
```

**Step 3: Deck renderer — shows top 3 cards stacked**

```js
function renderSwipeDeck() {
  const deckEl = document.getElementById('swDeck');
  deckEl.innerHTML = '';

  if (swState.deck.length === 0) {
    showSwipeSummary();
    return;
  }

  // Render up to 3 cards, bottom-first so top card is last child (highest z)
  const visible = swState.deck.slice(0, 3).reverse();
  visible.forEach((word, i) => {
    const card = buildSwCard(word);
    deckEl.appendChild(card);
  });

  // The last appended card is the top card
  const topCard = deckEl.lastElementChild;
  topCard.classList.add('top');
  attachDragHandlers(topCard, swState.deck[0]);
}
```

**Step 4: Commit**

```bash
git add imparare-1000/js/swipe.js
git commit -m "feat: implement swipe deck state and card builder"
```

---

### Task 5: Drag/swipe interaction

**Files:**
- Modify: `imparare-1000/js/swipe.js`

**Step 1: Attach pointer event handlers to the top card**

Add to `swipe.js`:

```js
function attachDragHandlers(card, word) {
  let startX = 0, startY = 0, currentX = 0;
  let dragging = false;
  const THRESHOLD = window.innerWidth * 0.28;

  function onPointerDown(e) {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    currentX = 0;
    card.setPointerCapture(e.pointerId);
    card.style.transition = 'none';
  }

  function onPointerMove(e) {
    if (!dragging) return;
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

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;

    if (currentX > THRESHOLD) {
      flyCard(card, word, true);
    } else if (currentX < -THRESHOLD) {
      flyCard(card, word, false);
    } else {
      // Snap back
      card.style.transition = 'transform 0.35s cubic-bezier(0.175,0.885,0.32,1.275)';
      card.style.transform = '';
      const knowLabel = card.querySelector('.sw-label-know');
      const dontLabel = card.querySelector('.sw-label-dontknow');
      knowLabel.style.opacity = 0;
      dontLabel.style.opacity = 0;
    }
  }

  card.addEventListener('pointerdown', onPointerDown);
  card.addEventListener('pointermove', onPointerMove);
  card.addEventListener('pointerup', onPointerUp);
  card.addEventListener('pointercancel', onPointerUp);
}
```

**Step 2: flyCard — animates card off screen and updates deck**

```js
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
    swState.deck.push(word); // cycle to back
  }

  updateSwProgress();

  setTimeout(() => {
    renderSwipeDeck();
  }, 380);
}
```

**Step 3: Keyboard support**

```js
function handleSwipeKey(e) {
  if (!document.getElementById('swipeApp').classList.contains('active')) return;
  if (swState.deck.length === 0) return;
  if (e.key === 'ArrowRight') {
    const topCard = document.getElementById('swDeck').lastElementChild;
    if (topCard && topCard.classList.contains('top')) flyCard(topCard, swState.deck[0], true);
  }
  if (e.key === 'ArrowLeft') {
    const topCard = document.getElementById('swDeck').lastElementChild;
    if (topCard && topCard.classList.contains('top')) flyCard(topCard, swState.deck[0], false);
  }
}
document.addEventListener('keydown', handleSwipeKey);
```

**Step 4: Verify**

Open browser, enter Swipe mode. A stacked card deck appears. Drag the top card left and right — it should rotate and show the label overlays. Release past threshold — card flies off, next card becomes draggable. Left swipe re-queues the word. Progress counter updates.

**Step 5: Commit**

```bash
git add imparare-1000/js/swipe.js
git commit -m "feat: implement swipe drag interaction and fly-off animation"
```

---

### Task 6: Session-end summary and Back button

**Files:**
- Modify: `imparare-1000/js/swipe.js`
- Modify: `imparare-1000/js/main.js`

**Step 1: Session-end screen**

When the deck is empty, reuse the existing `#bigOverlay` pattern. Add to `swipe.js`:

```js
function showSwipeSummary() {
  const deckEl = document.getElementById('swDeck');
  deckEl.innerHTML = '';

  const overlay = document.getElementById('bigOverlay');
  document.getElementById('bigIcon').textContent = '🃏';
  document.getElementById('bigTitle').textContent = 'All done!';
  document.getElementById('bigSub').textContent =
    'You reviewed all ' + swState.total + ' words. Nice work!';
  document.getElementById('bigStats').innerHTML = `
    <div class="big-stat"><div class="big-stat-val">${swState.total}</div><div class="big-stat-lbl">Reviewed</div></div>
    <div class="big-stat"><div class="big-stat-val">${swState.known}</div><div class="big-stat-lbl">Known</div></div>
  `;
  document.getElementById('bigBtn').textContent = '🔄 Shuffle again';
  overlay.dataset.mode = 'swipe';
  overlay.classList.add('show');
  spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 50);
}
```

**Step 2: Handle "Shuffle again" in handleBigBtn (main.js)**

In `main.js`, inside `handleBigBtn`, add a branch for `mode === 'swipe'`:

```js
function handleBigBtn() {
  const overlay = document.getElementById('bigOverlay');
  const mode = overlay.dataset.mode;
  overlay.classList.remove('show');
  if (mode === 'gameover') {
    resetGame();
  } else if (mode === 'swipe') {
    startSwipeSession();
  } else {
    renderQuestion(true);
  }
}
```

**Step 3: Back button in swipe topbar**

In `main.js`, wire the back button so it returns to mode select:

```js
document.getElementById('swBackBtn').addEventListener('click', () => {
  document.getElementById('swipeApp').classList.remove('active');
  document.getElementById('modeSelect').classList.remove('hidden');
});
```

**Step 4: Verify**

Run through all cards in swipe mode — summary overlay should appear with total/known stats. "Shuffle again" restarts the deck. "Back" returns to mode select.

**Step 5: Commit**

```bash
git add imparare-1000/js/swipe.js imparare-1000/js/main.js
git commit -m "feat: add swipe session-end summary and back button"
```

---

### Task 7: Polish and edge cases

**Files:**
- Modify: `imparare-1000/style.css`
- Modify: `imparare-1000/js/swipe.js`

**Step 1: Empty deck guard**

At the top of `attachDragHandlers`, verify the deck isn't empty before attaching (already handled by `renderSwipeDeck` check, but add a guard):

```js
if (swState.deck.length === 0) return;
```

**Step 2: Prevent accidental text selection on drag**

Ensure `user-select: none` is on `.sw-card` (already in CSS). Additionally add to `onPointerMove`:

```js
e.preventDefault();
```

**Step 3: Subtle entrance animation for new top card**

Add to `style.css`:

```css
.sw-card.top {
  animation: swCardEnter 0.3s cubic-bezier(0.175,0.885,0.32,1.275);
}

@keyframes swCardEnter {
  from { transform: scale(0.93) translateY(18px); opacity: 0.6; }
  to   { transform: scale(1)    translateY(0);    opacity: 1; }
}
```

**Step 4: Final browser test checklist**

- [ ] Mode select screen appears on load
- [ ] Quiz mode: fully functional, no regression
- [ ] Swipe mode: card stack shows category badge, word, sentence, hint, meaning
- [ ] Drag right past threshold: card flies right, known count increments, next card appears
- [ ] Drag left past threshold: card flies left, word reappears later in deck
- [ ] Drag below threshold: card snaps back
- [ ] ArrowRight / ArrowLeft keyboard shortcuts work
- [ ] Deck empties when all words known, summary overlay appears
- [ ] "Shuffle again" restarts swipe session
- [ ] "Back" returns to mode select
- [ ] mastered count in quiz mode reflects words known in swipe mode

**Step 5: Commit**

```bash
git add imparare-1000/style.css imparare-1000/js/swipe.js
git commit -m "feat: polish swipe card entrance animation and edge case guards"
```
