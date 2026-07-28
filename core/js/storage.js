import { STORAGE_KEY } from "./constants.js";

/**
 * Load persisted game state.
 * @returns {object}
 */
export function loadState() {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    return rawState ? JSON.parse(rawState) : null;
  } catch {
    return null;
  }
}

/**
 * Persist game state.
 * @param {object} state
 */
export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
