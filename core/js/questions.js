export const QUESTIONS = {
  presentSimple: [
    { prompt: "She ___ to school every day.", answer: "goes", options: ["go", "goes", "going"] },
    { prompt: "They ___ football on Sundays.", answer: "play", options: ["play", "plays", "played"] },
    { prompt: "He ___ water after training.", answer: "drinks", options: ["drink", "drinks", "drinking"] },
  ],
  doDoes: [
    { prompt: "___ you like music?", answer: "Do", options: ["Do", "Does"] },
    { prompt: "___ she work here?", answer: "Does", options: ["Do", "Does"] },
    { prompt: "___ they study English?", answer: "Do", options: ["Do", "Does"] },
  ],
  wh: [
    { prompt: "___ do you live?", answer: "Where", options: ["What", "Where", "When"] },
    { prompt: "___ does he arrive?", answer: "When", options: ["When", "Why", "Who"] },
    { prompt: "___ is your teacher?", answer: "Who", options: ["Who", "Whose", "Which"] },
  ],
  frequency: [
    { prompt: "I ___ drink coffee in the morning.", answer: "usually", options: ["always", "usually", "never"] },
    { prompt: "She ___ arrives late.", answer: "never", options: ["sometimes", "rarely", "never"] },
    { prompt: "They ___ study at night.", answer: "sometimes", options: ["sometimes", "seldom", "always"] },
  ],
};

export const LESSONS = [
  { title: "Present Simple", text: "Se usa para rutinas, hábitos, hechos y verdades generales." },
  { title: "Afirmativa", text: "Con he, she e it se agrega -s o -es al verbo." },
  { title: "Interrogativa", text: "Do/Does + sujeto + verbo base." },
  { title: "WH Questions", text: "WH + Do/Does + sujeto + verbo base." },
  { title: "Frequency Adverbs", text: "Always, usually, often, sometimes, rarely y never." },
];
