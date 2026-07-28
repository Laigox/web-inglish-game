/**
 * Animate a numeric value in a DOM element.
 * @param {HTMLElement} element
 * @param {number} from
 * @param {number} to
 */
export function animateNumber(element, from, to) {
  element.textContent = String(from);
  window.requestAnimationFrame(() => {
    element.textContent = String(to);
  });
}
