import { createGame } from "./game.js";
import { ROUTES } from "./constants.js";
import { createAudioController } from "./audio.js";

const game = createGame();
const audio = createAudioController();

document.querySelectorAll("[data-route]").forEach((button) => {
  button.addEventListener("click", () => {
    const route = button.getAttribute("data-route");
    game.render(route);
  });
});

document.getElementById("musicToggle").addEventListener("click", () => {
  const enabled = audio.toggle();
  document.getElementById("musicToggle").textContent = enabled ? "🎵 Música" : "🔇 Música";
});

game.render(ROUTES.play);
