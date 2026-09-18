# Scopri l'Italia — Landing Page | Documento de Proyecto

Equipo: **Esteban** (programación) + **Sofía**, **Dayana**, **Jorge**, **Guzmán** (contenido, imágenes, SVG)
Stack: HTML + CSS + JS puro · Despliegue: GitHub Pages · Sin base de datos

---

## 1. PROMPT PARA OPENCODE

Copia y pega esto en opencode (ajusta rutas de assets cuando Sofía/Dayana/Jorge/Guzmán entreguen sus archivos):

```
Build a single-page website called "Scopri l'Italia" in plain HTML, CSS and vanilla JavaScript (no frameworks, no build tools), optimized to be deployed on GitHub Pages as a static site.

GLOBAL SPECS
- Fonts: "Playfair Display" (serif, headings) + "Poppins" (sans-serif, body) from Google Fonts.
- Color palette (CSS variables in :root):
  --italy-green: #0d5c34
  --italy-white: #faf7f0
  --italy-red: #b6291f
  --terracotta: #c46a3f
  --gold: #d4af37
  --dark-navy: #0b1f2a (footer background)
- Layout: mobile-first, fully responsive (breakpoints at 640px, 1024px).
- Animations: fade-in-up on scroll for every section (IntersectionObserver, no libraries), hover scale (1.03) + shadow lift on all cards, smooth scroll for nav anchors, subtle parallax on the hero background image.
- File structure:
  /index.html
  /css/styles.css
  /js/main.js
  /js/modal-data.js      (holds the content objects described below)
  /assets/images/        (photos, delivered by teammates)
  /assets/icons/         (SVG icons, delivered by teammates)

SECTIONS (in order)
1. HERO — full-viewport section, background photo of the Colosseum at sunset (assets/images/hero-colosseum.jpg) with a dark gradient overlay for text contrast. Decorative torn-flag SVG shapes (green/white/red) in top-left and top-right corners (assets/icons/flag-corner-left.svg, flag-corner-right.svg). Title "Discover Italy" in Playfair Display, huge, white with subtle text-shadow. Subtitle "Adventure • Culture • Food • Nature — Your Ultimate Italian Journey". Small italic line under subtitle: "Landscapes, art, history and flavors that will make you fall in love." A down-arrow scroll indicator, bouncing animation.

2. ICONIC LANDMARKS — section title "Iconic Landmarks" centered, with a small red/green underline flourish (assets/icons/divider-flourish.svg). Grid of 6 cards (CSS grid, 3 columns desktop / 2 tablet / 1 mobile): Rome (Colosseum), Florence (Duomo), Milan (Duomo), Venice (Canals), Amalfi Coast, Dolomites. Each card = photo + location pin icon (assets/icons/pin.svg) + caption "City • Landmark name". Every card is a <button> that opens a MODAL with detailed content (see MODAL SYSTEM below), data-modal-id matching modal-data.js keys: "colosseum", "florence-duomo", "milan-duomo", "venice-canals", "amalfi-coast", "dolomites".

3. EXPLORE ITALY — interactive SVG map of Italy (assets/icons/italy-map.svg, delivered by Jorge) with 6 clickable pin markers positioned absolutely over the map: Venice, Florence, Rome, Naples, Sardinia, Sicily. Dashed curved lines connecting the pins (already inside the SVG). Each pin is a clickable <button class="map-pin"> that opens a modal with data-modal-id: "region-venice", "region-florence", "region-rome", "region-naples", "region-sardinia", "region-sicily". Small decorative food/culture emoji-style SVG icons scattered near the map (gondola, lemon, mask, etc. — assets/icons/map-doodle-*.svg).

4. GASTRONOMY — section title "Gastronomy" with fork & knife SVG icon (assets/icons/fork-knife.svg). Grid of 4 cards: Pizza, Pasta, Gelato, Wine. Same card/modal pattern as Landmarks. data-modal-id: "pizza", "pasta", "gelato", "wine".

5. CULTURE & MUSIC — section title with music note SVG icon (assets/icons/music-note.svg). 3 cards: Live Orchestra & Opera, Opera in Verona, Timeless Violin Melodies. data-modal-id: "orchestra", "opera-verona", "violin".

6. VIBRANT LANDSCAPES — 2 large cards: Mountain Lakes (Dolomites), Coastal Views (Mediterranean Coast). data-modal-id: "mountain-lakes", "coastal-views".

7. FOOTER — dark navy background, centered text "Plan your dream journey today", subtext "Discover Italy's magic", 3 social icons (Instagram, Facebook, YouTube — assets/icons/social-*.svg), thin decorative mosaic-pattern border on top (assets/icons/mosaic-border.svg).

MODAL SYSTEM (critical feature)
- One generic modal component in the DOM, reused for every item, populated dynamically from js/modal-data.js.
- js/modal-data.js exports a single object where each key (e.g. "colosseum") maps to: { title, location, heroImage, paragraphs: [string, string], funFact: string, accentColor }.
- Opening a modal: fade + scale-in animation, dark overlay behind it, closes on: click outside, close button (×), or Escape key. Body scroll locked while open.
- Modal visual style: decorated header using the item's accentColor (a thin colored ribbon/ background tint matching the item's theme — e.g. terracotta for Colosseum, blue for coastal items), large image at top, title in Playfair Display, location line with pin icon, two paragraphs of body text, a highlighted "Did you know?" box with funFact, close button top-right.
- Every modal must look slightly different per category (Landmarks = stone/arch-textured header accent, Gastronomy = warm terracotta accent, Culture = deep red/gold accent, Landscapes = green/blue accent) using the accentColor field, not separate hardcoded CSS per item.

ACCESSIBILITY & PERFORMANCE
- All images use loading="lazy" except the hero image.
- All interactive elements keyboard-accessible (tabindex, focus states, aria-labels on modal triggers and close button).
- alt text on every image, descriptive and specific.

8. DAVINCI CHATBOT WIDGET — a fixed-position floating widget, bottom-right corner (24px from edges), on top of everything (high z-index), present on the whole page while scrolling.
   - CLOSED STATE: shows assets/images/davinci-bot-closed.png (Leonardo da Vinci cartoon eating pizza), circular/rounded frame, gentle idle bounce animation (translateY loop), small pulsing badge/dot to draw attention, tooltip on hover "Ask Leo about Italy!".
   - Clicking it opens the chat window with a scale+fade transition and swaps the avatar image to assets/images/davinci-bot-open.png (Leonardo pointing forward) shown in the chat window header next to the name "Leo da Vinci" and a subtitle "Your Renaissance guide".
   - CHAT WINDOW: card ~340px wide x 480px tall (full-width bottom sheet on mobile), header with avatar/name/close button, scrollable message list area, input field + send button at the bottom, plus a row of quick-reply chips shown at the start (pulled from js/chatbot-data.js).
   - LOGIC: no backend/API calls — pure client-side JS keyword matching against js/chatbot-data.js, which exports: greeting (string), quickReplies (array of {label, question}), and faq (array of {keywords: [string], answer: string}). On send, lowercase the input, find the faq entry whose keywords best match, else show a friendly fallback ("I'm not sure about that, but ask me about our landmarks, food, or the best time to visit!"). Bot messages appear with a short typing-indicator delay (~600ms) before showing.
   - Message bubbles styled distinctly for bot (cream background, left-aligned, small Leo avatar) vs user (terracotta background, right-aligned).
   - Widget must not overlap the footer content on small screens (add bottom offset if footer is in view).

Leave clear TODO comments in modal-data.js, chatbot-data.js and index.html wherever teammate content/assets still need to be dropped in, referencing this document's section numbers.
```

---

## 2. REPARTO DE TAREAS (sin programación)

Formato de entrega común para todos:
- **Imágenes**: JPG o WEBP, mínimo 1600px de ancho, licencia libre (Unsplash, Pexels o Pixabay — nunca Google Images directo), nombradas en minúsculas con guiones (`amalfi-coast.jpg`).
- **SVG**: fondo transparente, `viewBox` limpio, nombrados igual (`pin.svg`, `fork-knife.svg`), pueden salir de Flaticon, SVGRepo, unDraw o Freepik (buscar licencia "free for commercial use" / "attribution not required" si es posible).
- **Textos**: entregar en un documento (Word/Google Docs) o directamente en un JSON siguiendo la plantilla de abajo, en inglés, tono cálido/inspirador (no técnico).

Plantilla de texto para CADA ítem con modal:
```json
{
  "title": "Nombre del lugar/elemento",
  "location": "Ciudad, Región",
  "paragraphs": [
    "Párrafo 1: qué es, por qué es icónico (2-3 frases).",
    "Párrafo 2: experiencia del visitante / detalle sensorial (2-3 frases)."
  ],
  "funFact": "Un dato curioso corto y verificado."
}
```

### SOFÍA — Sección "Iconic Landmarks"
**Qué investigar y escribir** (plantilla de arriba, 1 por ítem):
1. Rome — The Colosseum
2. Florence — Cathedral of Santa Maria del Fiore (Duomo)
3. Milan — Duomo di Milano
4. Venice — Canals & Gondolas
5. Amalfi Coast — Coastal Villages
6. Dolomites — Alpine Peaks

**Imágenes a buscar**: 1 foto por cada uno de los 6 lugares (para la card) + 1 foto adicional en mayor calidad de cada uno para el modal (puede ser la misma en mejor resolución). Total: 6-12 fotos.

**SVG a crear/buscar**: `pin.svg` (ícono de ubicación tipo Google Maps, minimalista), `divider-flourish.svg` (línea decorativa con hoja de laurel o rama de olivo para el título de sección), `flag-corner-left.svg` y `flag-corner-right.svg` (formas de bandera italiana rasgada/orgánica para las esquinas del hero — verde, blanco, rojo).

**Dónde va**: sección 2 (Iconic Landmarks) y las esquinas decorativas del Hero (sección 1).

### DAYANA — Secciones "Gastronomy" y "Culture & Music"
**Qué investigar y escribir**:
1. Pizza — Naples Classic
2. Pasta — Homemade Tagliatelle
3. Gelato — Artisan Flavors
4. Wine — Tuscan Vineyards
5. Culture — Live Orchestra & Opera
6. Culture — Opera in Verona
7. Music — Timeless Violin Melodies

**Imágenes a buscar**: 1 foto por cada uno de los 7 ítems (comida con estética editorial/rústica; cultura con fotos de orquesta, ópera, violín).

**SVG a crear/buscar**: `fork-knife.svg` (ícono para título de Gastronomy), `music-note.svg` (ícono para título de Culture & Music), y 3-4 iconitos decorativos pequeños (pizza slice, wine glass, gelato cone, violin) para acompañar las cards.

**Dónde va**: secciones 4 (Gastronomy) y 5 (Culture & Music).

### JORGE — Sección "Explore Italy" (mapa interactivo)
**Tarea principal**: crear o adaptar un **SVG del mapa de Italia** (`italy-map.svg`) en estilo flat/minimalista, con colores del proyecto (verde/blanco/rojo o solo contorno terracota). Puede buscar una base libre en SVGRepo/Wikimedia Commons ("Italy blank map SVG") y editarla en Figma, Inkscape o Illustrator para que combine con la paleta. El SVG debe tener espacio identificable para colocar 6 pines sobre estas zonas: Venecia (noreste), Florencia (centro-norte), Roma (centro), Nápoles (sur), Cerdeña (isla oeste), Sicilia (isla sur).

**Qué investigar y escribir** (misma plantilla), uno por región:
1. Venice
2. Florence
3. Rome
4. Naples
5. Sardinia
6. Sicily
(Enfocar el texto en "qué encontrarás si visitas esta región", distinto al contenido de Landmarks aunque la ciudad se repita.)

**SVG adicionales a crear/buscar**: 3-4 "doodles" decorativos pequeños para poner alrededor del mapa (góndola, limón, máscara veneciana, copa de vino) y el ícono de pin del mapa si quiere uno distinto al de Sofía.

**Dónde va**: sección 3 (Explore Italy).

### GUZMÁN — "Hero", "Vibrant Landscapes", "Footer" y el Chatbot "Leo da Vinci"
**Qué escribir (Hero / Landscapes / Footer)**:
- Confirmar/ajustar el copy del Hero: título "Discover Italy", subtítulo "Adventure • Culture • Food • Nature — Your Ultimate Italian Journey", frase italic corta.
- Contenido (plantilla de la sección 2) para:
  1. Mountain Lakes — Dolomites
  2. Coastal Views — Mediterranean Coast
- Copy del Footer: línea principal "Plan your dream journey today", subtexto "Discover Italy's magic".

**Imágenes a buscar**: foto de fondo del Hero (Coliseo al atardecer, alta resolución, formato panorámico), + 1 foto para cada uno de los 2 ítems de Landscapes.

**SVG a crear/buscar**: `mosaic-border.svg` (patrón decorativo tipo azulejo para el borde superior del footer).

---

**Tarea principal nueva: el chatbot "Leo da Vinci"**

Ya tenemos las dos imágenes del personaje (Leonardo da Vinci caricaturizado):
- `davinci-bot-closed.png` → estado cerrado del widget (Leo comiendo pizza)
- `davinci-bot-open.png` → estado abierto del chat (Leo señalando)

El chatbot **no usa IA ni backend**: es un asistente de preguntas frecuentes basado en JavaScript puro, que busca palabras clave en lo que escribe el usuario y responde con un texto ya preparado. Por eso el trabajo de Guzmán es 100% de contenido/guion, no de programación:

1. **Personalidad y tono de "Leo"**: escribir cómo debe "hablar" el personaje — amigable, un poco teatral/renacentista, usa alguna expresión recurrente (ej. "Ah, curious traveler!"). Definir:
   - Un mensaje de bienvenida (greeting) que aparece apenas se abre el chat.
   - 4-6 "quick replies" (botones de preguntas sugeridas) que el usuario puede tocar sin escribir, ej: "What's the best food to try?", "Tell me a fun fact", "What's the best time to visit?", "Help me explore the map".

2. **Base de preguntas y respuestas (FAQ)**: redactar entre 15 y 20 pares de pregunta/respuesta que el bot debe poder responder, cubriendo:
   - Preguntas sobre cada sección de la página (landmarks, gastronomy, culture, landscapes, el mapa)
   - Preguntas prácticas de un viajero: mejor época para viajar, cómo moverse, qué llevar, idioma, propinas
   - 5-8 datos curiosos ("fun facts") distintos a los que ya están en los modales de las otras secciones, para que Leo los use cuando le pregunten "tell me something interesting" o similar
   - Una respuesta de "no sé" (fallback) con la personalidad del personaje, para cuando no entienda la pregunta

   Para cada entrada, entregar en este formato (para que Esteban lo pegue directo en `chatbot-data.js`):
   ```json
   {
     "keywords": ["pizza", "food", "eat"],
     "answer": "Ah, you must try Neapolitan pizza..."
   }
   ```
   (3-6 palabras clave por entrada, en inglés, pensando en cómo escribiría un usuario real, ej. sinónimos y variaciones).

3. **Investigar** en fuentes confiables (guías de viaje, sitios oficiales de turismo de Italia) los datos prácticos y curiosidades para que las respuestas sean reales y verificables, no inventadas.

**Dónde va**: sección 1 (Hero), sección 6 (Vibrant Landscapes), sección 7 (Footer) y sección 8 (Chatbot widget, esquina inferior derecha, visible en toda la página).

---

## 3. CHECKLIST DE ENTREGA PARA ESTEBAN

- [ ] Todas las imágenes en `/assets/images/` con nombres ya definidos arriba
- [ ] Todos los SVG en `/assets/icons/`
- [ ] Un archivo `contenido.json` (o 4 archivos, uno por persona) con todos los objetos de texto listos para pegar en `modal-data.js`
- [ ] `davinci-bot-closed.png` y `davinci-bot-open.png` en `/assets/images/` (ya las tienes, solo cambiarles el nombre/formato si hace falta)
- [ ] Archivo de Guzmán con greeting, quick replies y las 15-20 preguntas/respuestas listas para pegar en `chatbot-data.js`
- [ ] Verificar que cada imagen tenga licencia libre antes de subir a GitHub (evitar problemas de derechos en la exposición)
