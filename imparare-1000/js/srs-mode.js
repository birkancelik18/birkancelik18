// SRS Review Mode — FSRS-powered flashcard review

const srsSession = {
  queue:   [],
  idx:     0,
  flipped: false,
};

function _buildSRSQueue() {
  const cards = fsrsLoadAllCards();
  const queue = [];
  WORDS.forEach((word, i) => {
    const card = cards[i] || fsrsNewCard();
    if (fsrsIsDue(card)) queue.push({ word, wordIdx: i, card });
  });
  return shuffle(queue);
}

function updateSRSDueCount() {
  const el = document.getElementById('srsDueBadge');
  if (!el) return;
  const n = (typeof WORDS !== 'undefined') ? fsrsCountDue() : 0;
  el.textContent = n > 0 ? n + ' due' : '✓';
  el.style.background = n > 0 ? 'rgba(255,107,157,0.85)' : 'rgba(107,203,119,0.7)';
}

function enterSRSMode() {
  document.getElementById('modeSelect').classList.add('hidden');
  document.getElementById('srsApp').classList.add('active');

  // Labor illusion: show "building queue" before rendering
  _showSRSScreen('loading');

  setTimeout(() => {
    srsSession.queue   = _buildSRSQueue();
    srsSession.idx     = 0;
    srsSession.flipped = false;

    if (srsSession.queue.length === 0) {
      _showSRSScreen('complete');
      document.getElementById('srsCompleteTitle').textContent = '✅ All caught up!';
      document.getElementById('srsCompleteSub').textContent = 'No cards due. Come back tomorrow!';
      document.getElementById('srsCompleteCount').textContent = '';
    } else {
      _showSRSScreen('card');
      _renderSRSCard();
    }
  }, 1500);
}

function _showSRSScreen(which) {
  ['loading', 'card', 'complete'].forEach(id => {
    const el = document.getElementById('srs' + id.charAt(0).toUpperCase() + id.slice(1) + 'Screen');
    if (el) el.style.display = (id === which) ? 'flex' : 'none';
  });
}

function _renderSRSCard() {
  srsSession.flipped = false;
  const item = srsSession.queue[srsSession.idx];
  if (!item) { _finishSRSSession(); return; }

  const { word, card } = item;
  const total = srsSession.queue.length;
  const done  = srsSession.idx;

  document.getElementById('srsProgressText').textContent = done + ' / ' + total;
  document.getElementById('srsProgressFill').style.width = (done / total * 100) + '%';

  const catStyle = (typeof CAT_STYLE !== 'undefined' && CAT_STYLE[word[3]])
    ? CAT_STYLE[word[3]] : { label: word[3] || '', bg: '#333', color: '#fff' };
  const badge = document.getElementById('srsCatBadge');
  badge.textContent = catStyle.label;
  badge.style.background = catStyle.bg;
  badge.style.color = catStyle.color;

  const stabilityEl = document.getElementById('srsStabilityInfo');
  if (card.reps > 0 && card.stability > 0) {
    const days = Math.round(card.stability);
    stabilityEl.textContent = days >= 365
      ? '📅 ' + Math.round(days / 365) + 'yr memory'
      : '📅 ' + days + 'd memory';
  } else {
    stabilityEl.textContent = '🆕 New card';
  }

  document.getElementById('srsFrontWord').textContent = word[1];
  document.getElementById('srsFrontSentence').textContent = word[5] || '';
  document.getElementById('srsBackWord').textContent = word[0];
  document.getElementById('srsBackSentence').textContent = word[4] || '';
  const hintEl = document.getElementById('srsBackHint');
  if (word[6]) {
    hintEl.textContent = '💡 ' + word[6];
    hintEl.style.display = '';
  } else {
    hintEl.style.display = 'none';
  }

  document.getElementById('srsFront').style.display = 'flex';
  document.getElementById('srsBack').style.display   = 'none';
  document.getElementById('srsRatings').style.display = 'none';
  document.getElementById('srsFlipBtn').style.display  = '';

  // Card entrance animation
  const cardEl = document.getElementById('srsCard');
  cardEl.classList.remove('card-enter');
  void cardEl.offsetWidth;
  cardEl.classList.add('card-enter');
}

function flipSRSCard() {
  if (srsSession.flipped) return;
  srsSession.flipped = true;

  document.getElementById('srsFront').style.display   = 'none';
  document.getElementById('srsBack').style.display    = 'flex';
  document.getElementById('srsRatings').style.display = 'grid';
  document.getElementById('srsFlipBtn').style.display  = 'none';

  const item = srsSession.queue[srsSession.idx];
  if (item && typeof speak === 'function') speak(item.word[0]);
  if (navigator.vibrate) navigator.vibrate(30);
}

function rateSRSCard(rating) {
  const item = srsSession.queue[srsSession.idx];
  if (!item) return;

  const { word, wordIdx, card } = item;
  const newCard = fsrsReview(card, rating);
  const allCards = fsrsLoadAllCards();
  allCards[wordIdx] = newCard;
  fsrsSaveAllCards(allCards);

  // XP (Again=0, Hard=half, Good=full, Easy=1.5×)
  if (rating > FSRS_AGAIN) {
    const xpMult = rating === FSRS_HARD ? 0.5 : rating === FSRS_EASY ? 1.5 : 1;
    const streakData = getStreakData();
    const mult = streakXPMultiplier(streakData.count || 0) * xpMult;
    const { xp, bonusActive, dailyGoalJustCompleted } = awardXP(mult);
    const cardEl = document.getElementById('srsCard');
    const rect   = cardEl.getBoundingClientRect();
    showXPFloat(xp, rect.left + rect.width / 2 - 20, rect.top + 10, bonusActive);
    if (dailyGoalJustCompleted && typeof spawnConfetti === 'function') {
      setTimeout(() => spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 60), 300);
    }

    // Streak
    const sr = recordStreakAnswer();
    if (sr.milestone) setTimeout(() => showRPEBadge('🔥', sr.data.count + '-Day Streak!', 'Amazing consistency!'), 700);
    if (sr.gainedFreeze) setTimeout(() => showRPEBadge('🧊', 'Streak Freeze!', 'Miss a day — your streak stays safe!'), 700);

    // Bonus round
    if (maybeStartBonusRound()) showBonusRoundBanner();

    // Leech clear check
    const { leechCleared } = recordLeechCorrect(word);
    if (leechCleared) setTimeout(() => showRPEBadge('🧠', 'Leech Cleared!', '"' + word[0] + '" is now in long-term memory!'), 500);

    // Long-term memory milestone (≥365 day stability, first time)
    if (newCard.stability >= 365 && card.stability < 365) {
      setTimeout(() => showRPEBadge('🌟', 'Long-Term Memory!', 'You\'ll remember "' + word[0] + '" for over a year!'), 600);
    }

    updateXPDisplay();
    updateStreakDisplay();
  } else {
    recordWrongAnswer(word, null);
  }

  srsSession.idx++;
  if (srsSession.idx >= srsSession.queue.length) {
    setTimeout(_finishSRSSession, 400);
  } else {
    setTimeout(_renderSRSCard, 350);
  }
}

function _finishSRSSession() {
  const reviewed = srsSession.idx;
  _showSRSScreen('complete');
  document.getElementById('srsCompleteTitle').textContent = '🎉 Session complete!';
  document.getElementById('srsCompleteSub').textContent = 'Great work — FSRS has scheduled your next reviews.';
  document.getElementById('srsCompleteCount').textContent = reviewed + ' card' + (reviewed !== 1 ? 's' : '') + ' reviewed';
  if (reviewed > 0 && typeof spawnConfetti === 'function') {
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 3, 50);
  }
}

function exitSRSMode() {
  document.getElementById('srsApp').classList.remove('active');
  document.getElementById('modeSelect').classList.remove('hidden');
  updateSRSDueCount();
  updateStreakDisplay();
  updateXPDisplay();
}
