import { MAX_LEVEL } from "./constants.js";

/**
 * Calculate the overall progress percentage.
 * @param {number} level
 * @param {number} experience
 * @returns {number}
 */
export function getProgressPercent(level, experience) {
  const levelPortion = (level - 1) / MAX_LEVEL;
  const experiencePortion = experience / 100;
  return Math.min(100, Math.round(((levelPortion * 100) + experiencePortion) / 2));
}

/**
 * Check whether the next level can be unlocked.
 * @param {object} state
 * @returns {boolean}
 */
export function canUnlockNextLevel(state) {
  return state.experience >= 100 && state.level < MAX_LEVEL;
}
