import { ROUTES } from "./constants.js";
import { loadState, saveState } from "./storage.js";
import { animateNumber } from "./animations.js";
import { buildFinalView, buildLearnView, buildPlayView, buildScoresView, buildSettingsView } from "./ui.js";
import { applyAnswerScore } from "./score.js";
import { canUnlockNextLevel, getProgressPercent } from "./progress.js";
import { LEVELS } from "./levels.js";

const defaultState = {
  route: ROUTES.play,
  level: 1,
  score: 0,
  combo: 0,
  bestCombo: 0,
  medals: 0,
  experience: 0,
};

/**
 * Main game controller.
 */
export function createGame() {
  const persistedState = loadState();
  const state = { ...defaultState, ...(persistedState || {}) };
  const view = document.getElementById("appView");
  const scoreValue = document.getElementById("scoreValue");
  const comboValue = document.getElementById("comboValue");
  const medalValue = document.getElementById("medalValue");
  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");
  const unlockLabel = document.getElementById("unlockLabel");

  /**
   * Refresh dashboard and persist progress.
   */
  function sync() {
    animateNumber(scoreValue, Number(scoreValue.textContent || 0), state.score);
    comboValue.textContent = `x${Math.max(1, state.combo || 1)}`;
    medalValue.textContent = String(state.medals);
    const progress = getProgressPercent(state.level, state.experience);
    progressBar.style.width = `${progress}%`;
    progressLabel.textContent = `${progress}% completado`;
    unlockLabel.textContent = state.level < LEVELS.length ? `Nivel ${state.level + 1} por desbloquear` : "Juego final desbloqueado";
    saveState(state);
  }

  /**
   * Handle correct or incorrect answers.
   * @param {boolean} isCorrect
   */
  function handleAnswer(isCorrect) {
    Object.assign(state, applyAnswerScore(state, isCorrect));
    state.experience = Math.min(100, state.experience + (isCorrect ? 34 : 8));
    if (isCorrect && canUnlockNextLevel(state)) {
      state.level += 1;
      state.experience = 0;
    }
    sync();
    render(state.route);
  }

  /**
   * Render the selected route.
   * @param {string} route
   */
  function render(route) {
    state.route = route;
    if (route === ROUTES.learn) view.replaceChildren(buildLearnView());
    else if (route === ROUTES.scores) view.replaceChildren(buildScoresView(state));
    else if (route === ROUTES.settings) view.replaceChildren(buildSettingsView());
    else if (route === "final" || state.level >= LEVELS.length) view.replaceChildren(buildFinalView(handleAnswer));
    else view.replaceChildren(buildPlayView(state, handleAnswer));
    sync();
  }

  return {
    state,
    render,
    sync,
  };
}
