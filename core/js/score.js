import { SCORE_RULES } from "./constants.js";

/**
 * Update score and combo after an answer.
 * @param {object} state
 * @param {boolean} isCorrect
 * @returns {object}
 */
export function applyAnswerScore(state, isCorrect) {
  const nextCombo = isCorrect ? state.combo + 1 : 0;
  const comboMultiplier = isCorrect ? Math.min(3, Math.max(1, nextCombo)) : 1;
  return {
    ...state,
    score: Math.max(0, state.score + (isCorrect ? SCORE_RULES.correct : SCORE_RULES.incorrect)),
    combo: isCorrect ? nextCombo : 0,
    bestCombo: Math.max(state.bestCombo, nextCombo),
    medals: state.medals + (isCorrect && nextCombo > 0 && nextCombo % 5 === 0 ? 1 : 0),
    comboMultiplier,
  };
}
