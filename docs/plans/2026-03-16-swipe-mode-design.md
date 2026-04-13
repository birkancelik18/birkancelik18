# Swipe Mode Design

Date: 2026-03-16

## Overview

Add a Bumble-style swipe flashcard mode to the Parole! Italian vocabulary app.
The user sees a card showing the full word details and self-assesses by swiping
right (know it) or left (don't know). Unknown words cycle back through the deck
until all are known.

## Mode Selection

On page load a full-viewport mode-select screen is shown before either mode
starts. Two large tappable cards let the user choose:

- Quiz Mode — existing fill-in-the-blank game
- Swipe Mode — new flashcard swiper

Tapping a choice hides the selector and activates the chosen section. Both
sections live in the same index.html, toggled via CSS classes.

## Swipe Mode UI

### Card layout (top to bottom)

1. Category badge (coloured, same as quiz mode)
2. Italian word — large, prominent
3. Example sentence in Italian
4. Hint (if present)
5. English meaning

Everything is visible at once — no flip needed. The goal is frictionless
exposure to the full context of the word.

### Interaction

The top card can be dragged horizontally by mouse or touch.

While dragging:
- Card rotates slightly proportional to drag offset
- Green "Know it ✓" label fades in over the right side
- Red "Don't know ✗" label fades in over the left side

On release:
- Past threshold (~30% of screen width): card flies off in the drag direction
- Below threshold: card snaps back to centre

Swipe right → word marked known, next card slides in
Swipe left  → word appended to the end of the review queue

Keyboard shortcut: ArrowRight / ArrowLeft for desktop convenience.

### Deck management

State:
- `deck[]`  — remaining cards to show (initially a full shuffle of WORDS)
- `known`   — count of words swiped right this session

When a card is swiped left it is pushed to the back of the deck. The session
ends only when every card has been swiped right (deck is empty).

### Session end screen

Reuses the existing big-overlay pattern. Shows:
- Total words reviewed
- How many passes it took (left-swipes ÷ total WORDS)
- A "Play again" button to reshuffle and restart swipe mode

## Shared Progress

Words swiped right that are not already in `masteredMap` are added to it and
`saveProgress()` is called. This means swipe-mode learning counts toward the
"Words unlocked" goal shown in quiz mode.

## Files Changed

| File | Change |
|---|---|
| index.html | Add mode-select screen HTML, swipe section HTML, load swipe.js |
| style.css | Mode-select styles; swipe card drag/rotate/overlay styles |
| js/swipe.js | New file — all swipe mode runtime logic |

No changes to state.js, ui.js, game.js, main.js, words.js, or confetti.js.

## Out of Scope

- No lives/score/streak system in swipe mode (pure self-assessment)
- No persistence of deck position across page reloads
- No per-word "strength" tracking
