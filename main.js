const formEl = document.getElementById("wordly-form");
const inputEl = document.getElementById("wordly-input");

const titleEl = document.getElementById("wordly-title");
const phoneticEl = document.getElementById("wordly-phonetic");
const definitionsEl = document.getElementById("wordly-definitions");
const synonymsEl = document.getElementById("wordly-synonyms");
const errorEl = document.getElementById("wordly-error");
const audioBtn = document.getElementById("wordly-audio-btn");

let currentAudio = null;

formEl.addEventListener("submit", handleWordlySearch);

function handleWordlySearch(e) {
  e.preventDefault();

  const word = inputEl.value.trim();
  if (!word) return;

  fetchWordlyData(word);
}

function fetchWordlyData(word) {
  resetWordlyUI();

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => {
      if (!res.ok) throw new Error("Word not found");
      return res.json();
    })
    .then(data => renderWordlyData(data[0]))
    .catch(err => showWordlyError(err.message));
}

function renderWordlyData(data) {
  titleEl.textContent = data.word;
  phoneticEl.textContent = data.phonetic || "";

  // Audio
  const audioSrc = data.phonetics.find(p => p.audio)?.audio;
  if (audioSrc) {
    audioBtn.classList.remove("hidden");
    audioBtn.onclick = () => {
      if (currentAudio) currentAudio.pause();
      currentAudio = new Audio(audioSrc);
      currentAudio.play();
    };
  }

  // Definitions
  definitionsEl.innerHTML = "<h3>Definitions:</h3>";
  data.meanings.forEach(m => {
    m.definitions.forEach(def => {
      const p = document.createElement("p");
      p.textContent = `${m.partOfSpeech}: ${def.definition}`;
      definitionsEl.appendChild(p);
    });
  });

  // Synonyms
  const synonyms = data.meanings.flatMap(m => m.synonyms || []);
  if (synonyms.length > 0) {
    synonymsEl.innerHTML = "<h3>Synonyms:</h3>";
    synonyms.slice(0, 5).forEach(s => {
      const span = document.createElement("span");
      span.textContent = s;
      span.classList.add("synonym-tag");
      synonymsEl.appendChild(span);
    });
  }
}

function showWordlyError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove("hidden");
}

function resetWordlyUI() {
  errorEl.classList.add("hidden");
  definitionsEl.innerHTML = "";
  synonymsEl.innerHTML = "";
  audioBtn.classList.add("hidden");
}