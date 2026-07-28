(function () {
  const STORAGE_KEY = "present-simple-quest-state-v4";
  const MAX_NAME_LENGTH = 7;
  const ROUTES = { home: "home", rankings: "rankings", profile: "profile", settings: "settings" };
  const GAME_MODES = {
    simple: "SIMPLE INTERROGATIVA",
    frequency: "FRECUENCY ADVERBS",
    wh: "WH QUESTIONS",
    mix: "MIX",
  };
  const GAME_PAGE = /game_interface\.html$/i.test(location.pathname);

  const QUESTION_BANK = {
    simple: [
      { prompt: "___ he go to school every day?", answer: "Does", options: ["Do", "Does"], explanation: "Con he usamos Does.", translation: "¿Él va a la escuela todos los días?" },
      { prompt: "___ they play football on Sundays?", answer: "Do", options: ["Do", "Does"], explanation: "Con they usamos Do.", translation: "¿Ellos juegan fútbol los domingos?" },
      { prompt: "___ she drink water after training?", answer: "Does", options: ["Do", "Does"], explanation: "Con she usamos Does.", translation: "¿Ella bebe agua después del entrenamiento?" },
      { prompt: "___ the sun rise in the east?", answer: "Does", options: ["Do", "Does"], explanation: "The sun es singular.", translation: "¿El sol sale por el este?" },
      { prompt: "___ I eat breakfast at 7?", answer: "Do", options: ["Do", "Does"], explanation: "Con I usamos Do.", translation: "¿Desayuno a las 7?" },
      { prompt: "___ we listen to music in the car?", answer: "Do", options: ["Do", "Does"], explanation: "Con we usamos Do.", translation: "¿Escuchamos música en el carro?" },
      { prompt: "___ he work at the library?", answer: "Does", options: ["Do", "Does"], explanation: "He necesita Does.", translation: "¿Él trabaja en la biblioteca?" },
      { prompt: "___ you study English every day?", answer: "Do", options: ["Do", "Does"], explanation: "You usa Do.", translation: "¿Estudias inglés todos los días?" },
      { prompt: "___ she like pizza?", answer: "Does", options: ["Do", "Does"], explanation: "She usa Does.", translation: "¿A ella le gusta la pizza?" },
      { prompt: "___ they visit grandma on Sundays?", answer: "Do", options: ["Do", "Does"], explanation: "They usa Do.", translation: "¿Ellos visitan a la abuela los domingos?" },
      { prompt: "___ it rain often?", answer: "Does", options: ["Do", "Does"], explanation: "It usa Does.", translation: "¿Llueve a menudo?" },
      { prompt: "___ he wake up early?", answer: "Does", options: ["Do", "Does"], explanation: "He toma Does.", translation: "¿Él se despierta temprano?" },
      { prompt: "___ we need help?", answer: "Do", options: ["Do", "Does"], explanation: "We usa Do.", translation: "¿Necesitamos ayuda?" },
      { prompt: "___ she clean her room every day?", answer: "Does", options: ["Do", "Does"], explanation: "She usa Does.", translation: "¿Ella limpia su cuarto todos los días?" },
      { prompt: "___ I speak too fast?", answer: "Do", options: ["Do", "Does"], explanation: "I usa Do.", translation: "¿Hablo demasiado rápido?" },
    ],
    frequency: [
      { prompt: "ALWAYS", answer: "SIEMPRE", options: ["SIEMPRE", "NUNCA", "RARA VEZ"], explanation: "Always significa siempre.", translation: "SIEMPRE" },
      { prompt: "ANNUALLY", answer: "ANUALMENTE", options: ["ANUALMENTE", "DIARIAMENTE", "SEMANALMENTE"], explanation: "Annually significa anualmente.", translation: "ANUALMENTE" },
      { prompt: "DAILY", answer: "DIARIAMENTE", options: ["DIARIAMENTE", "RARA VEZ", "NUNCA"], explanation: "Daily significa diariamente.", translation: "DIARIAMENTE" },
      { prompt: "EVER", answer: "ALGUNA VEZ", options: ["ALGUNA VEZ", "SIEMPRE", "NUNCA"], explanation: "Ever significa alguna vez.", translation: "ALGUNA VEZ" },
      { prompt: "FREQUENTLY", answer: "FRECUENTEMENTE", options: ["FRECUENTEMENTE", "OCASIONALMENTE", "NUNCA"], explanation: "Frequently significa frecuentemente.", translation: "FRECUENTEMENTE" },
      { prompt: "FROM TIME TO TIME", answer: "DE VEZ EN CUANDO", options: ["DE VEZ EN CUANDO", "SIEMPRE", "ANUALMENTE"], explanation: "From time to time significa de vez en cuando.", translation: "DE VEZ EN CUANDO" },
      { prompt: "HARDLY EVER", answer: "CASI NUNCA", options: ["CASI NUNCA", "SIEMPRE", "A MENUDO"], explanation: "Hardly ever significa casi nunca.", translation: "CASI NUNCA" },
      { prompt: "NEVER", answer: "NUNCA", options: ["NUNCA", "USUALMENTE", "DIARIAMENTE"], explanation: "Never significa nunca.", translation: "NUNCA" },
      { prompt: "NORMALLY", answer: "NORMALMENTE", options: ["NORMALMENTE", "RARA VEZ", "ANUALMENTE"], explanation: "Normally significa normalmente.", translation: "NORMALMENTE" },
      { prompt: "OCCASIONALLY", answer: "OCASIONALMENTE", options: ["OCASIONALMENTE", "SEMANALMENTE", "SIEMPRE"], explanation: "Occasionally significa ocasionalmente.", translation: "OCASIONALMENTE" },
      { prompt: "ONCE", answer: "UNA VEZ", options: ["UNA VEZ", "SEMANALMENTE", "DIARIAMENTE"], explanation: "Once significa una vez.", translation: "UNA VEZ" },
      { prompt: "REGULARLY", answer: "REGULARMENTE", options: ["REGULARMENTE", "NUNCA", "RARA VEZ"], explanation: "Regularly significa regularmente.", translation: "REGULARMENTE" },
      { prompt: "SELDOM", answer: "RARA VEZ", options: ["RARA VEZ", "SIEMPRE", "DIARIAMENTE"], explanation: "Seldom significa rara vez.", translation: "RARA VEZ" },
      { prompt: "USUALLY", answer: "USUALMENTE", options: ["USUALMENTE", "NUNCA", "ANUALMENTE"], explanation: "Usually significa usualmente.", translation: "USUALMENTE" },
      { prompt: "WEEKLY", answer: "SEMANALMENTE", options: ["SEMANALMENTE", "DIARIAMENTE", "ANUALMENTE"], explanation: "Weekly significa semanalmente.", translation: "SEMANALMENTE" },
    ],
    wh: [
      { prompt: "___ do you live?", answer: "Where", options: ["What", "Where", "When"], explanation: "Where pregunta por un lugar.", translation: "¿Dónde vives?" },
      { prompt: "___ does he arrive?", answer: "When", options: ["When", "Why", "Who"], explanation: "When pregunta por tiempo.", translation: "¿Cuándo llega él?" },
      { prompt: "___ is your teacher?", answer: "Who", options: ["Who", "Whose", "Which"], explanation: "Who pregunta por personas.", translation: "¿Quién es tu profesor?" },
      { prompt: "___ do they go after school?", answer: "Where", options: ["Where", "How", "Why"], explanation: "Where pregunta por destino.", translation: "¿A dónde van después de la escuela?" },
      { prompt: "___ is this notebook?", answer: "Whose", options: ["Whose", "Which", "How"], explanation: "Whose pregunta por pertenencia.", translation: "¿De quién es este cuaderno?" },
      { prompt: "___ color do you prefer?", answer: "Which", options: ["Which", "What", "Who"], explanation: "Which sirve para elegir.", translation: "¿Qué color prefieres?" },
      { prompt: "___ does she study English?", answer: "Why", options: ["Why", "Where", "When"], explanation: "Why pregunta por la razón.", translation: "¿Por qué ella estudia inglés?" },
      { prompt: "___ do you call your sister?", answer: "How", options: ["How", "Who", "Which"], explanation: "How pregunta por la manera.", translation: "¿Cómo llamas a tu hermana?" },
      { prompt: "___ bike is outside?", answer: "Whose", options: ["Whose", "What", "Where"], explanation: "Whose pregunta por posesión.", translation: "¿De quién es la bicicleta de afuera?" },
      { prompt: "___ do we start the game?", answer: "When", options: ["When", "Who", "Where"], explanation: "When pregunta por momento.", translation: "¿Cuándo empezamos el juego?" },
      { prompt: "___ do you want for lunch?", answer: "What", options: ["What", "Which", "Why"], explanation: "What pregunta por una cosa.", translation: "¿Qué quieres para el almuerzo?" },
      { prompt: "___ class do they have today?", answer: "Which", options: ["Which", "Who", "Where"], explanation: "Which pregunta por selección.", translation: "¿Qué clase tienen hoy?" },
      { prompt: "___ is knocking at the door?", answer: "Who", options: ["Who", "What", "Where"], explanation: "Who pregunta por una persona.", translation: "¿Quién está tocando la puerta?" },
      { prompt: "___ do they buy snacks?", answer: "Where", options: ["Where", "When", "Why"], explanation: "Where pregunta por lugar.", translation: "¿Dónde compran snacks?" },
      { prompt: "___ is your favorite singer?", answer: "Who", options: ["Who", "Which", "Why"], explanation: "Who pregunta por personas.", translation: "¿Quién es tu cantante favorito?" },
    ],
  };

  const state = loadState() || { activeProfile: null, profiles: [], route: ROUTES.home };

  const els = {
    view: document.getElementById("appView") || document.getElementById("gameRoot"),
    scoreValue: document.getElementById("scoreValue"),
    comboValue: document.getElementById("comboValue"),
    medalValue: document.getElementById("medalValue"),
    progressBar: document.getElementById("progressBar"),
    progressLabel: document.getElementById("progressLabel"),
    unlockLabel: document.getElementById("unlockLabel"),
    musicToggle: document.getElementById("musicToggle"),
    feedbackToast: document.getElementById("feedbackToast"),
    bgMusic: document.getElementById("bgMusic"),
    musicControl: document.getElementById("musicControl"),
    gameModeLabel: document.getElementById("gameModeLabel"),
    gameProgressBar: document.getElementById("gameProgressBar"),
    gameProgressLabel: document.getElementById("gameProgressLabel"),
  };

  const gameState = { mode: null, queue: [], index: 0, answered: false };

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function normalizeName(value) {
    return value.trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, MAX_NAME_LENGTH);
  }

  function createProfile(name) {
    return { name, score: 0, combo: 0, bestCombo: 0, medals: 0, questionHistory: [] };
  }

  function getActiveProfile() {
    return state.profiles.find((profile) => profile.name === state.activeProfile) || null;
  }

  function ensureActiveProfile() {
    if (getActiveProfile()) return;
    state.activeProfile = state.profiles[0]?.name || null;
  }

  function createElement(tag, classNames = [], text = "") {
    const element = document.createElement(tag);
    element.className = classNames.join(" ");
    if (text) element.textContent = text;
    return element;
  }

  function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function buildModeQueue(mode) {
    if (mode === "mix") {
      return shuffle([
        ...shuffle(QUESTION_BANK.simple).slice(0, 5),
        ...shuffle(QUESTION_BANK.frequency).slice(0, 5),
        ...shuffle(QUESTION_BANK.wh).slice(0, 5),
      ]);
    }
    return shuffle(QUESTION_BANK[mode] || QUESTION_BANK.simple).slice(0, 15);
  }

  function getModeLabel(mode) {
    return GAME_MODES[mode] || GAME_MODES.simple;
  }

  function syncHud() {
    const profile = getActiveProfile();
    if (!profile) {
      if (els.scoreValue) els.scoreValue.textContent = "0";
      if (els.comboValue) els.comboValue.textContent = "x1";
      if (els.medalValue) els.medalValue.textContent = "0";
      if (els.progressBar) els.progressBar.style.width = "0%";
      if (els.progressLabel) els.progressLabel.textContent = "0%";
      if (els.unlockLabel) els.unlockLabel.textContent = "Listo";
      saveState();
      return;
    }
    if (els.scoreValue) els.scoreValue.textContent = String(profile.score || 0);
    if (els.comboValue) els.comboValue.textContent = `x${Math.max(1, profile.combo || 0)}`;
    if (els.medalValue) els.medalValue.textContent = String(profile.medals || 0);
    const percent = Math.min(100, Math.round(((profile.questionHistory.length || 0) / 15) * 100));
    if (els.progressBar) els.progressBar.style.width = `${percent}%`;
    if (els.progressLabel) els.progressLabel.textContent = `${percent}%`;
    if (els.unlockLabel) els.unlockLabel.textContent = "15 preguntas";
    saveState();
  }

  function setFeedback(isCorrect, explanation, translation) {
    if (!els.feedbackToast) return;
    els.feedbackToast.classList.remove("is-good", "is-bad", "is-visible");
    els.feedbackToast.classList.add(isCorrect ? "is-good" : "is-bad", "is-visible");
    els.feedbackToast.innerHTML = `<strong>${isCorrect ? "Respuesta buena" : "Respuesta mala"}</strong><span>${explanation}</span><small>${translation}</small>`;
    clearTimeout(setFeedback.timer);
    setFeedback.timer = setTimeout(() => els.feedbackToast.classList.remove("is-visible"), 2400);
  }

  function setMusicEnabled(enabled) {
    if (!els.bgMusic || !els.musicControl) return;
    if (enabled) {
      els.bgMusic.muted = false;
      els.bgMusic.volume = 0.6;
      els.bgMusic.play().catch(() => {});
      els.musicControl.textContent = "🔊";
      els.musicControl.dataset.enabled = "true";
      els.musicControl.setAttribute("aria-label", "Pausar música");
    } else {
      els.bgMusic.pause();
      els.musicControl.textContent = "🔇";
      els.musicControl.dataset.enabled = "false";
      els.musicControl.setAttribute("aria-label", "Reanudar música");
    }
  }

  function ensureAutoplayFallback() {
    if (!els.bgMusic) return;
    els.bgMusic.play().catch(() => {
      const resume = () => {
        els.bgMusic.play().catch(() => {});
        window.removeEventListener("pointerdown", resume);
        window.removeEventListener("keydown", resume);
      };
      window.addEventListener("pointerdown", resume, { once: true });
      window.addEventListener("keydown", resume, { once: true });
    });
  }

  function routeToGame() {
    const profile = getActiveProfile();
    const params = new URLSearchParams();
    if (profile) params.set("profile", profile.name);
    location.href = `pages/game_interface.html?${params.toString()}`;
  }

  function routeToGameAction(action) {
    const profile = getActiveProfile();
    const params = new URLSearchParams();
    if (profile) params.set("profile", profile.name);
    params.set("action", action);
    location.href = `pages/game_interface.html?${params.toString()}`;
  }

  function renderHome() {
    const root = createElement("div", ["stack"]);
    const card = createElement("article", ["lesson"]);
    const profile = getActiveProfile();
    card.innerHTML = `
      <h2>Menu</h2>
      <p>Perfil: <strong>${profile ? profile.name : "NONE"}</strong></p>
      <div class="hero-actions hero-actions--arcade">
        <button class="btn btn-primary" data-play-entry="true">▶ PLAY</button>
        <button class="btn btn-secondary" data-action="profile">👾 PROFILE</button>
        <button class="btn btn-secondary" data-action="rankings">🏆 TOP</button>
        <button class="btn btn-secondary" data-action="settings">⚙ SET</button>
      </div>
    `;
    card.querySelector("[data-play-entry]").addEventListener("click", routeToGame);
    card.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => routeToGameAction(button.getAttribute("data-action")));
    });
    root.appendChild(card);
    return root;
  }

  function renderRankings() {
    const sorted = [...state.profiles].sort((a, b) => (b.score || 0) - (a.score || 0));
    const root = createElement("div", ["stack"]);
    const card = createElement("article", ["lesson"]);
    card.innerHTML = "<h2>Ranking</h2>";
    const podium = createElement("div", ["podium"]);
    const places = [sorted[1], sorted[0], sorted[2]];
    const classes = ["podium-item podium-item--silver", "podium-item podium-item--gold", "podium-item podium-item--bronze"];
    const labels = ["2", "1", "3"];
    places.forEach((profile, index) => {
      const slot = createElement("div", [classes[index]]);
      slot.innerHTML = `<span class="podium-rank">${labels[index]}</span><strong>${profile ? profile.name : "---"}</strong><small>${profile ? profile.score : 0} pts</small>`;
      podium.appendChild(slot);
    });
    card.appendChild(podium);
    const table = createElement("table", ["ranking-table"]);
    table.innerHTML = `
      <thead><tr><th>#</th><th>Nombre</th><th>Puntos</th><th>Combo</th></tr></thead>
      <tbody>
        ${sorted.map((profile, index) => `<tr class="${index === 0 ? "row-gold" : index === 1 ? "row-silver" : index === 2 ? "row-bronze" : ""}"><td>${index + 1}</td><td>${profile.name}</td><td>${profile.score}</td><td>${profile.bestCombo}</td></tr>`).join("") || "<tr><td colspan='4'>Sin perfiles todavía.</td></tr>"}
      </tbody>`;
    card.appendChild(table);
    root.appendChild(card);
    return root;
  }

  function renderProfile() {
    const root = createElement("div", ["stack"]);
    const form = createElement("form", ["lesson"]);
    form.innerHTML = `
      <h2>Perfiles</h2>
      <label class="field"><span>Nombre arcade</span><input id="profileNameInput" maxlength="${MAX_NAME_LENGTH}" autocomplete="off" placeholder="PLAYER"></label>
      <button class="btn btn-primary" type="submit">Guardar</button>
      <p id="profileMessage" class="form-message" aria-live="polite"></p>
    `;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("#profileNameInput");
      const message = form.querySelector("#profileMessage");
      const name = normalizeName(input.value);
      if (!name) return (message.textContent = "Nombre inválido.");
      if (state.profiles.some((profile) => profile.name === name)) return (message.textContent = "Ese nombre ya existe.");
      state.profiles.unshift(createProfile(name));
      state.activeProfile = name;
      syncHud();
      render(ROUTES.home);
    });
    root.appendChild(form);
    return root;
  }

  function renderSettings() {
    const root = createElement("div", ["stack"]);
    const card = createElement("article", ["lesson"]);
    card.innerHTML = `<h2>Configuración</h2><button class="btn btn-secondary" id="resetAllBtn" type="button">Borrar todo</button>`;
    root.appendChild(card);
    requestAnimationFrame(() => {
      document.getElementById("resetAllBtn")?.addEventListener("click", () => {
        state.activeProfile = null;
        state.profiles = [];
        syncHud();
        render(ROUTES.home);
      });
    });
    return root;
  }

  function makeNavGrid() {
    const nav = createElement("nav", ["menu-grid"]);
    [["play", "▶", "PLAY"], ["rankings", "🏆", "TOP"], ["profile", "👾", "PROFILE"], ["settings", "⚙", "SET"]].forEach(([route, icon, title]) => {
      const button = createElement("button", ["menu-card"]);
      button.type = "button";
      button.innerHTML = `<span>${icon}</span><strong>${title}</strong>`;
      button.addEventListener("click", () => render(route));
      nav.appendChild(button);
    });
    return nav;
  }

  function render(route) {
    state.route = route;
    if (!els.view) return;
    if (route === ROUTES.home) els.view.replaceChildren(renderHome());
    else if (route === ROUTES.rankings) els.view.replaceChildren(renderRankings());
    else if (route === ROUTES.profile) els.view.replaceChildren(renderProfile());
    else if (route === ROUTES.settings) els.view.replaceChildren(renderSettings());
    syncHud();
  }

  function initHub() {
    document.querySelectorAll("[data-route]").forEach((button) => button.addEventListener("click", () => render(button.getAttribute("data-route"))));
    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => routeToGameAction(button.getAttribute("data-action")));
    });
    document.querySelectorAll("[data-play-entry]").forEach((button) => {
      button.addEventListener("click", routeToGame);
    });
    if (els.musicToggle) {
      els.musicToggle.addEventListener("click", () => {
        const enabled = els.musicToggle.dataset.enabled !== "true";
        els.musicToggle.dataset.enabled = enabled ? "true" : "false";
        els.musicToggle.textContent = enabled ? "🎵" : "🔇";
      });
    }
    if (els.musicControl) {
      els.musicControl.addEventListener("click", () => setMusicEnabled(!(els.bgMusic && !els.bgMusic.paused)));
      setMusicEnabled(true);
      ensureAutoplayFallback();
    }
    ensureActiveProfile();
    syncHud();
    render(state.route || ROUTES.home);
  }

  function initGame() {
    const profile = getActiveProfile();
    if (!profile) {
      renderCreateProfile();
      return;
    }

    const url = new URL(location.href);
    const selectedMode = url.searchParams.get("mode");
    const action = url.searchParams.get("action");
    if (action === "profile") {
      renderCreateProfile();
      return;
    }
    if (action === "rankings") {
      renderModeMenu("rankings");
      return;
    }
    if (action === "settings") {
      renderModeMenu("settings");
      return;
    }
    if (!selectedMode) {
      renderStartChoice();
      return;
    }

    gameState.mode = selectedMode;
    gameState.queue = buildModeQueue(selectedMode);
    gameState.index = 0;

    const root = createElement("div", ["stack"]);
    const card = createElement("article", ["lesson"]);
    card.innerHTML = `
      <div class="game-top">
        <button class="btn btn-secondary btn-small" id="backHomeBtn" type="button">← HOME</button>
        <div class="game-title"><h2>${getModeLabel(selectedMode)}</h2><small>${profile.name}</small></div>
      </div>
      <div id="questionShell"></div>
    `;
    root.appendChild(card);
    els.view.replaceChildren(root);
    syncHud();

    card.querySelector("#backHomeBtn").addEventListener("click", () => (location.href = "../index.html"));
    const questionShell = card.querySelector("#questionShell");

    function renderQuestion() {
      const question = gameState.queue[gameState.index];
      if (!question) {
        questionShell.innerHTML = `<p class="prompt">Terminaste la partida.</p><button class="btn btn-primary" id="backModeBtn" type="button">Ir a rankings</button>`;
        questionShell.querySelector("#backModeBtn").addEventListener("click", () => {
          const profile = getActiveProfile();
          const params = new URLSearchParams();
          if (profile) params.set("profile", profile.name);
          location.href = `pages/game_interface.html?action=rankings&${params.toString()}`;
        });
        return;
      }

      if (els.gameProgressBar) {
        els.gameProgressBar.style.width = `${((gameState.index + 1) / 15) * 100}%`;
      }
      if (els.gameProgressLabel) {
        els.gameProgressLabel.textContent = `${gameState.index + 1} de 15`;
      }

      questionShell.innerHTML = `
        <p class="prompt">${question.prompt}</p>
        <div class="option-grid" id="optionGrid"></div>
        <div class="game-explain" id="gameExplain" hidden>
          <strong id="gameExplainTitle"></strong>
          <p id="gameExplainText"></p>
          <p class="translation-line" id="gameTranslation"></p>
          <button class="btn btn-primary btn-following" id="followingBtn" type="button" hidden>following</button>
        </div>
      `;

      const optionGrid = questionShell.querySelector("#optionGrid");
      const explain = questionShell.querySelector("#gameExplain");
      const explainTitle = questionShell.querySelector("#gameExplainTitle");
      const explainText = questionShell.querySelector("#gameExplainText");
      const gameTranslation = questionShell.querySelector("#gameTranslation");
      const followingBtn = questionShell.querySelector("#followingBtn");

      shuffle(question.options).forEach((option) => {
        const button = createElement("button", ["btn", "btn-option"], option);
        button.type = "button";
        button.addEventListener("click", () => {
          if (gameState.answered) return;
          gameState.answered = true;
          const isCorrect = option === question.answer;
          if (isCorrect) {
            button.classList.add("option-correct");
          } else {
            button.classList.add("option-wrong");
            [...optionGrid.querySelectorAll("button")].forEach((candidate) => {
              if (candidate.textContent === question.answer) candidate.classList.add("option-correct");
            });
          }
          setFeedback(isCorrect, question.explanation, `Traducción completa: ${question.translation}`);
          explainTitle.textContent = isCorrect ? "Explicación correcta" : "Explicación de la respuesta correcta";
          explainText.textContent = question.explanation;
          gameTranslation.textContent = `Traducción: ${question.translation}`;
          explain.hidden = false;
          followingBtn.hidden = false;
          awardAnswer(isCorrect);
          syncHud();
        });
        optionGrid.appendChild(button);
      });

      followingBtn.addEventListener("click", () => {
        gameState.answered = false;
        gameState.index += 1;
        renderQuestion();
      });
    }

    renderQuestion();

    if (els.musicControl) {
      els.musicControl.addEventListener("click", () => {
        if (els.bgMusic && !els.bgMusic.paused) setMusicEnabled(false);
        else setMusicEnabled(true);
      });
      setMusicEnabled(true);
      ensureAutoplayFallback();
    }
  }

  function renderCreateProfile() {
    const root = createElement("div", ["stack"]);
    const card = createElement("article", ["lesson"]);
    card.innerHTML = `
      <h2>Crea tu perfil</h2>
      <p>Necesitas un perfil para jugar.</p>
      <form id="quickProfileForm" class="stack">
        <label class="field">
          <span>Nombre arcade</span>
          <input id="profileNameInput" maxlength="${MAX_NAME_LENGTH}" autocomplete="off" placeholder="PLAYER">
        </label>
        <button class="btn btn-primary" type="submit">Crear perfil</button>
        <p id="profileMessage" class="form-message" aria-live="polite"></p>
      </form>
    `;
    root.appendChild(card);
    els.view.replaceChildren(root);
    card.querySelector("#quickProfileForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const input = card.querySelector("#profileNameInput");
      const message = card.querySelector("#profileMessage");
      const name = normalizeName(input.value);
      if (!name) return (message.textContent = "Nombre inválido.");
      if (state.profiles.some((profile) => profile.name === name)) return (message.textContent = "Ese nombre ya existe.");
      state.profiles.unshift(createProfile(name));
      state.activeProfile = name;
      syncHud();
      renderGameModeSelect();
    });
  }

  function renderGameModeSelect() {
    renderModeSelect();
  }

  function renderStartChoice() {
    const profile = getActiveProfile();
    const root = createElement("div", ["stack"]);
    const card = createElement("article", ["lesson"]);
    card.innerHTML = `
      <h2>Iniciar partida</h2>
      <p>Usuario actual: <strong>${profile ? profile.name : "Sin perfil"}</strong></p>
      <div class="option-grid">
        <button class="btn btn-primary" id="continueUserBtn" type="button">Continuar con el mismo usuario</button>
        <button class="btn btn-secondary" id="changeUserBtn" type="button">Cambiar a uno nuevo</button>
      </div>
    `;
    root.appendChild(card);
    els.view.replaceChildren(root);

    card.querySelector("#continueUserBtn").addEventListener("click", () => renderModeSelect());
    card.querySelector("#changeUserBtn").addEventListener("click", () => renderCreateProfile());
  }

  function renderModeMenu(mode) {
    if (!els.view) return;
    if (mode === "rankings") {
      const root = createElement("div", ["stack"]);
      root.appendChild(renderRankings());
      els.view.replaceChildren(root);
      return;
    }
    if (mode === "settings") {
      const root = createElement("div", ["stack"]);
      root.appendChild(renderSettings());
      els.view.replaceChildren(root);
    }
  }

  function renderModeSelect() {
    const root = createElement("div", ["stack"]);
    const card = createElement("article", ["lesson"]);
    card.innerHTML = `<h2>Elige modo</h2><p>Cada partida tiene 15 preguntas.</p>`;
    const grid = createElement("div", ["option-grid"]);
    Object.entries(GAME_MODES).forEach(([key, label]) => {
      const button = createElement("button", ["btn", "btn-option"], label);
      button.type = "button";
      button.addEventListener("click", () => {
        const params = new URLSearchParams(location.search);
        params.set("mode", key);
        location.search = params.toString();
      });
      grid.appendChild(button);
    });
    card.appendChild(grid);
    root.appendChild(card);
    els.view.replaceChildren(root);
  }

  if (GAME_PAGE) initGame();
  else initHub();
})();

