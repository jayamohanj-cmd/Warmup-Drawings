// Daily Drawing Warm-Up — selection, timer, keys, custom prompts.

const KEY = "warmup";
const THEME = "warmup-theme";
const CUSTOM = "warmup-custom";
const MINUTES = "warmup-minutes";
const HINT = "type your prompt · enter to show · esc to cancel";

const el = {
  stage: document.querySelector(".stage"),
  tag: document.getElementById("tag"),
  num: document.getElementById("num"),
  prompt: document.getElementById("prompt"),
  wave: document.getElementById("wave"),
  clock: document.getElementById("clock"),
  materials: document.getElementById("materials"),
  legend: document.getElementById("legend"),
};

const today = () => new Date().toLocaleDateString("en-CA");

function store(index) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ lastDate: today(), index }));
  } catch (e) {}
}

function restore() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch (e) {
    return null;
  }
}

// ?p=17 pins prompt 17 and leaves the saved day alone.
const asked = new URLSearchParams(location.search).get("p");
const pinned = asked !== null && PROMPTS.some((p) => p.id === Number(asked));

let index = 0;
if (pinned) {
  index = PROMPTS.findIndex((p) => p.id === Number(asked));
} else {
  const saved = restore();
  if (!saved) store((index = 0));
  else if (saved.lastDate !== today()) store((index = (saved.index + 1) % PROMPTS.length));
  else index = saved.index;
}

// ---------- timer ----------

let duration = 0;
let remaining = 0;
let running = false;
let last = 0;
let ticker = null;
let phase = 0;
let shown = "";

const AMP = 6; // wave height at full time, in viewBox units. Tune for the room.
const calm = matchMedia("(prefers-reduced-motion: reduce)");

// The wave is the ambient readout: full squiggle at the start, dead flat at
// 0:00. The numeral in the footer keeps the precision. Motion means running,
// so a frozen squiggle reads as paused without needing an icon.
function wave() {
  const amp = duration ? AMP * (remaining / duration) : 0;
  let d = "M0 10";
  for (let x = 10; x <= 1000; x += 10) {
    d += " L" + x + " " + (10 + amp * Math.sin(x / 40 + phase)).toFixed(2);
  }
  el.wave.setAttribute("d", d);
}

function paint() {
  const secs = Math.ceil(remaining / 1000);
  const text = Math.floor(secs / 60) + ":" + String(secs % 60).padStart(2, "0");
  if (text !== shown) el.clock.textContent = shown = text;
  el.clock.classList.toggle("running", running);
  el.clock.classList.toggle("last", remaining > 0 && remaining <= 30000);
  wave();
}

function stop() {
  running = false;
  cancelAnimationFrame(ticker);
  ticker = null;
  paint();
}

function start() {
  if (remaining <= 0) return;
  running = true;
  last = performance.now();
  const step = (now) => {
    remaining = Math.max(0, remaining - (now - last));
    if (!calm.matches) phase += (now - last) / 500;
    last = now;
    if (remaining === 0) return stop();
    paint();
    ticker = requestAnimationFrame(step);
  };
  ticker = requestAnimationFrame(step);
  paint();
}

function reset() {
  stop();
  remaining = duration;
  phase = 0;
  paint();
}

// Length is a room preference, not a property of the prompt: it sticks across
// days and overrides the prompt's own minutes. 0 means use the prompt's value.
let minutes = 0;
try {
  const m = Number(localStorage.getItem(MINUTES));
  if (m >= 1 && m <= 9) minutes = m;
} catch (e) {}

function setMinutes(m) {
  minutes = m;
  try {
    localStorage.setItem(MINUTES, String(m));
  } catch (e) {}
  duration = m * 60000;
  reset();
}

// ---------- prompts ----------

function size(text) {
  const words = text.trim().split(/\s+/).length;
  return words <= 16 ? "is-short" : words > 25 ? "is-long" : "is-mid";
}

function show(i) {
  index = (i + PROMPTS.length) % PROMPTS.length;
  const p = PROMPTS[index];

  custom = null;
  document.body.classList.remove("is-custom");
  document.body.classList.toggle("is-invention", p.type === "invention");
  el.tag.textContent = p.type + " · " + p.skill.replace(/-/g, " ");
  el.num.textContent = "№ " + String(p.id).padStart(2, "0");
  el.prompt.textContent = p.text;
  el.prompt.className = "prompt " + size(p.text);
  el.materials.textContent = p.materials === "pencil" ? "" : p.materials;

  duration = (minutes || p.minutes) * 60000;
  reset();
}

function move(step) {
  clearCustom();
  show(index + step);
  if (!pinned) store(index);
}

// ---------- custom prompts ----------
//
// A custom prompt sits on top of the catalogue: it never advances the day, so
// tomorrow still lands on the prompt it would have anyway.

let custom = null; // what's on screen now
let draft = ""; // last thing typed, so C reopens it for editing
let composing = false;

function saveCustom(text) {
  try {
    localStorage.setItem(CUSTOM, JSON.stringify({ date: today(), text }));
  } catch (e) {}
}

function clearCustom() {
  custom = null;
  try {
    localStorage.removeItem(CUSTOM);
  } catch (e) {}
}

function showCustom(text) {
  custom = draft = text;
  document.body.classList.remove("is-invention");
  document.body.classList.add("is-custom");
  el.tag.textContent = "custom";
  el.num.textContent = "✎";
  el.prompt.textContent = text;
  el.prompt.className = "prompt " + size(text);
  el.materials.textContent = "";
  duration = (minutes || 4) * 60000;
  reset();
}

function compose() {
  composing = true;
  stop();
  document.body.classList.remove("is-invention");
  document.body.classList.add("is-custom");
  el.tag.textContent = HINT;
  el.num.textContent = "✎";
  el.materials.textContent = "";
  el.prompt.textContent = draft;
  el.prompt.className = "prompt is-mid composing";
  try {
    el.prompt.contentEditable = "plaintext-only"; // older browsers reject this
  } catch (e) {
    el.prompt.contentEditable = "true";
  }
  el.prompt.focus();
  document.getSelection().selectAllChildren(el.prompt);
}

function endCompose() {
  composing = false;
  el.prompt.contentEditable = "false";
  el.prompt.classList.remove("composing");
}

function commit() {
  const text = el.prompt.textContent.trim().replace(/\s+/g, " ");
  endCompose();
  if (text) {
    saveCustom(text);
    showCustom(text);
  } else {
    cancel();
  }
}

function cancel() {
  endCompose();
  if (custom) showCustom(custom);
  else show(index);
}

// ---------- input ----------

document.addEventListener("keydown", (e) => {
  // while composing, every other key is a letter
  if (composing) {
    if (e.key === "Enter") {
      commit();
      e.preventDefault();
    } else if (e.key === "Escape") {
      cancel();
      e.preventDefault();
    }
    return;
  }

  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key.toLowerCase();

  if (e.key === "ArrowRight") move(1);
  else if (e.key === "ArrowLeft") move(-1);
  else if (e.key === " ") running ? stop() : start();
  else if (k === "r") reset();
  else if (k === "c") compose();
  else if (k === "d") {
    const dark = document.body.classList.toggle("dark");
    try {
      localStorage.setItem(THEME, dark ? "dark" : "light");
    } catch (err) {}
  } else if (k === "f") {
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  } else if (k === "h") el.legend.hidden = !el.legend.hidden;
  else if (k >= "1" && k <= "9") setMinutes(Number(k));
  else return;

  e.preventDefault();
});

let idle;
document.addEventListener("mousemove", () => {
  document.body.classList.remove("hide-cursor");
  clearTimeout(idle);
  idle = setTimeout(() => document.body.classList.add("hide-cursor"), 3000);
});

// ---------- go ----------

try {
  if (localStorage.getItem(THEME) === "dark") document.body.classList.add("dark");
} catch (e) {}

show(index);

// a custom prompt typed today survives a reload or a projector reconnect
try {
  const held = JSON.parse(localStorage.getItem(CUSTOM));
  if (held && held.date === today() && held.text) showCustom(held.text);
  else if (held) clearCustom();
} catch (e) {}

el.stage.classList.add("enter");
