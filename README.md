# 📘 Wordly — Interactive Dictionary SPA

A Single Page Application (SPA) built using HTML, CSS, and JavaScript that allows users to search for words and retrieve definitions, phonetics, synonyms, and audio pronunciation — all without a page reload.


## Overview

Wordly is a dictionary web application built as part of a summative lab project for an introductory web development course. The goal was to demonstrate proficiency in:

- Building a functional Single Page Application (SPA)
- Communicating with a public REST API using asynchronous JavaScript (`async/await`)
- Dynamically updating the DOM based on API responses
- Handling errors gracefully for a smooth user experience

---

## Features

- 🔍 **Word Search** — Type any English word and retrieve its dictionary entry instantly
- 📖 **Definitions** — Displays definitions grouped by part of speech (noun, verb, adjective, etc.)
- 🔊 **Audio Pronunciation** — Play the word's pronunciation directly in the browser
- 🗣️ **Phonetic Text** — Shows the phonetic spelling (e.g. `/ˈwɜːdli/`)
- 🏷️ **Synonyms** — Lists synonyms as clickable tags that trigger a new search
- ⚠️ **Error Handling** — Friendly messages for unknown words or network failures
- 📱 **Responsive Design** — Works on desktop and mobile screens

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, layout, glassmorphism design |
| JavaScript (ES6+) | DOM manipulation, async API calls |
| [Free Dictionary API](https://dictionaryapi.dev/) | Word data source |
| Google Fonts (Roboto) | Typography |

---

## Project Structure

```
wordly/
├── index.html       # Main HTML file — app structure and element IDs
├── style.css        # All styles — layout, colours, responsive design
├── app.js           # JavaScript logic — fetch, render, event handling
└── README.md        # Project documentation
```

---

## Getting Started

No build tools, frameworks, or installations required.

### Steps

1. **Clone or download** this repository:
   ```bash
   git clone git@github.com:evamomanyi/SPA-wordly.git
   ```

2. **Navigate** into the project folder:
   ```bash
   cd wordly-spa
   ```

3. **Open** `index.html` in your browser:
   - Double-click `index.html`, **or**
   - Use a local server extension like **Live Server** in VS Code for best results

> ⚠️ An active internet connection is required — the app fetches live data from the Free Dictionary API.

---

## API Reference

This project uses the **Free Dictionary API** — a free, open-source REST API with no authentication required.

- **Base URL:** `https://api.dictionaryapi.dev/api/v2/entries/en/`
- **Method:** `GET`
- **Endpoint example:** `GET /api/v2/entries/en/hello`


## Usage

1. Type a word into the search bar
2. Press **Enter** or click the **Search** button
3. View the word's:
   - Phonetic spelling
   - Definitions by part of speech
   - Example sentences (where available)
   - Synonyms (click any tag to search that word)
4. Click **🔊 Play Pronunciation** to hear the word spoken aloud

---

## Error Handling

| Scenario | Behaviour |
|----------|-----------|
| Empty search field | Form validation prevents submission |
| Word not found (404) | Displays `"<word>" was not found. Check your spelling.` |
| Network failure | Displays `Network error — please check your connection.` |
| Audio unavailable | Audio button is hidden automatically |
| No synonyms returned | Synonyms section is not rendered |

---

## Future Improvements

- [ ] Save favourite words to `localStorage` for offline access
- [ ] Dark / light theme toggle
- [ ] Search history dropdown
- [ ] Support for multiple languages via language selector
- [ ] Highlight searched word within example sentences
- [ ] Loading spinner for slower network connections


