import { LESSONS, QUESTIONS } from "./questions.js";
import { LEVELS } from "./levels.js";
import { shuffle, pick, createElement } from "./utils.js";

/**
 * Build the learning view.
 * @returns {HTMLElement}
 */
export function buildLearnView() {
  const root = createElement("div", ["stack"]);
  LESSONS.forEach((lesson) => {
    const card = createElement("article", ["lesson"]);
    card.innerHTML = `<h3>${lesson.title}</h3><p>${lesson.text}</p>`;
    root.appendChild(card);
  });
  return root;
}

/**
 * Build the score view.
 * @param {object} state
 * @returns {HTMLElement}
 */
export function buildScoresView(state) {
  const root = createElement("div", ["stack"]);
  root.innerHTML = `<h2>Puntajes</h2><p>Score: ${state.score}</p><p>Mejor combo: ${state.bestCombo}</p><p>Medallas: ${state.medals}</p>`;
  return root;
}

/**
 * Build the settings view.
 * @returns {HTMLElement}
 */
export function buildSettingsView() {
  const root = createElement("div", ["stack"]);
  root.innerHTML = `<h2>Configuración</h2><p>El juego guarda el progreso automáticamente en LocalStorage.</p>`;
  return root;
}

/**
 * Build the play view.
 * @param {object} state
 * @param {function} onAnswer
 * @returns {HTMLElement}
 */
export function buildPlayView(state, onAnswer) {
  const level = LEVELS[state.level - 1];
  const root = createElement("div", ["stack"]);
  const quiz = shuffle(QUESTIONS[level.route] || QUESTIONS.presentSimple).slice(0, 1)[0];
  const options = shuffle(quiz.options);
  root.innerHTML = `<h2>Nivel ${level.id}: ${level.title}</h2><p class="prompt">${quiz.prompt}</p>`;
  const buttons = createElement("div", ["option-grid"]);
  options.forEach((option) => {
    const button = createElement("button", ["btn", "btn-option"], option);
    button.addEventListener("click", () => onAnswer(option === quiz.answer, option, quiz.answer));
    buttons.appendChild(button);
  });
  root.appendChild(buttons);
  return root;
}

/**
 * Build the final challenge view.
 * @param {function} onAnswer
 * @returns {HTMLElement}
 */
export function buildFinalView(onAnswer) {
  const root = createElement("div", ["stack"]);
  const quiz = pick([
    { prompt: "___ does she work?", answer: "Where", options: ["Where", "What", "Why"] },
    { prompt: "He ___ every day.", answer: "studies", options: ["study", "studies", "studying"] },
    { prompt: "I ___ get up early.", answer: "always", options: ["always", "never", "rarely"] },
  ]);
  root.innerHTML = `<h2>Juego Final</h2><p class="prompt">${quiz.prompt}</p>`;
  const buttons = createElement("div", ["option-grid"]);
  shuffle(quiz.options).forEach((option) => {
    const button = createElement("button", ["btn", "btn-option"], option);
    button.addEventListener("click", () => onAnswer(option === quiz.answer, option, quiz.answer));
    buttons.appendChild(button);
  });
  root.appendChild(buttons);
  return root;
}
