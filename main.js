/**
 * Wordly — Interactive Dictionary SPA
 * API: https://api.dictionaryapi.dev/api/v2/entries/en/<word>
 *
 * Uses async/await for all API communication.
 * All element IDs match the HTML exactly.
 */

"use strict";

/* ── DOM REFERENCES ──────────────────────────────────── */
const formEl        = document.getElementById("wordly-form");
const inputEl       = document.getElementById("wordly-input");
const titleEl       = document.getElementById("wordly-title");
const phoneticEl    = document.getElementById("wordly-phonetic");
const definitionsEl = document.getElementById("wordly-definitions");
const synonymsEl    = document.getElementById("wordly-synonyms");
const errorEl       = document.getElementById("wordly-error");
const audioBtn      = document.getElementById("wordly-audio-btn");

let currentAudio = null;   // holds the active Audio object

/* ── EVENT LISTENER ──────────────────────────────────── */
formEl.addEventListener("submit", handleWordlySearch);

/* ── FORM SUBMIT HANDLER ─────────────────────────────── */
async function handleWordlySearch(e) {
  e.preventDefault();
  const word = inputEl.value.trim();
  if (!word) return;
  await fetchWordlyData(word);
}

/* ── FETCH (async/await) ─────────────────────────────── */
async function fetchWordlyData(word) {
  resetWordlyUI();

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );

    if (!response.ok) {
      // 404 means word not found; anything else is an API/server error
      if (response.status === 404) {
        throw new Error(`"${word}" was not found. Check your spelling and try again.`);
      }
      throw new Error(`API error (${response.status}). Please try again later.`);
    }

    const data = await response.json();
    renderWordlyData(data[0]);

  } catch (err) {
    // Catches both network failures and the errors thrown above
    showWordlyError(err.message || "Something went wrong. Please try again.");
  }
}

/* ── RENDER ──────────────────────────────────────────── */
function renderWordlyData(data) {
  // ── Word title
  titleEl.textContent = data.word;

  // ── Phonetic text
  phoneticEl.textContent = data.phonetic || "";

  // ── Audio pronunciation
  const audioSrc = data.phonetics?.find(p => p.audio && p.audio.trim() !== "")?.audio;
  if (audioSrc) {
    // Some URLs come without a protocol prefix
    const fullSrc = audioSrc.startsWith("//") ? "https:" + audioSrc : audioSrc;
    audioBtn.classList.remove("hidden");

    audioBtn.onclick = () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      currentAudio = new Audio(fullSrc);
      currentAudio.play().catch(() => {
        showWordlyError("Audio could not be played in this browser.");
      });
    };
  }

  // ── Definitions
  definitionsEl.innerHTML = "<h3>Definitions</h3>";
  data.meanings.forEach(meaning => {
    meaning.definitions.forEach(def => {
      const p = document.createElement("p");

      const posTag = document.createElement("strong");
      posTag.textContent = meaning.partOfSpeech;
      p.appendChild(posTag);

      p.append(" " + def.definition);

      // Optional example sentence
      if (def.example) {
        const example = document.createElement("em");
        example.textContent = ` — "${def.example}"`;
        example.style.opacity = "0.75";
        p.appendChild(example);
      }

      definitionsEl.appendChild(p);
    });
  });

  // ── Synonyms (collected from all meanings)
  const synonyms = data.meanings.flatMap(m => m.synonyms || []);
  if (synonyms.length > 0) {
    synonymsEl.innerHTML = "<h3>Synonyms</h3>";

    synonyms.slice(0, 8).forEach(syn => {
      const span = document.createElement("span");
      span.textContent = syn;
      span.classList.add("synonym-tag");

      // Clicking a synonym searches for it
      span.addEventListener("click", () => {
        inputEl.value = syn;
        fetchWordlyData(syn);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      synonymsEl.appendChild(span);
    });
  }
}

/* ── ERROR DISPLAY ───────────────────────────────────── */
function showWordlyError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove("hidden");
}

/* ── RESET UI ────────────────────────────────────────── */
function resetWordlyUI() {
  errorEl.classList.add("hidden");
  errorEl.textContent = "";
  titleEl.textContent = "";
  phoneticEl.textContent = "";
  definitionsEl.innerHTML = "";
  synonymsEl.innerHTML = "";
  audioBtn.classList.add("hidden");
  audioBtn.onclick = null;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}
