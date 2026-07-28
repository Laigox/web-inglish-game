/**
 * Clamp a number into a range.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Shuffle an array using Fisher-Yates.
 * @param {Array<T>} items
 * @returns {Array<T>}
 * @template T
 */
export function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

/**
 * Pick a random item from a list.
 * @param {Array<T>} items
 * @returns {T}
 * @template T
 */
export function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Create a DOM element with classes and text.
 * @param {string} tag
 * @param {string[]} [classNames]
 * @param {string} [text]
 * @returns {HTMLElement}
 */
export function createElement(tag, classNames = [], text = "") {
  const element = document.createElement(tag);
  element.className = classNames.join(" ");
  if (text) element.textContent = text;
  return element;
}
