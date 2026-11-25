// ============================================================================
// MATH RACERS · MOTOR DE CARRERAS MATEMÁTICAS (MÓVIL Y TABLET)
// ============================================================================

const STATE = {
  agePreset: '6', // '6' | '9'
  operations: {
    add: true,
    sub: true,
    mul: false,
    div: false
  },
  inputMode: 'choices', // 'choices' | 'keypad'
  raceDistance: 900,    // metros hasta la meta
  pickerTab: 'player',  // 'player' | 'rival'
  playerCharId: 'pikachu',
  rivalCharId: 'doraemon',
  trackId: 'mushroom',
  soundEnabled: true,
  totalWins: parseInt(localStorage.getItem('mathRacers_wins') || '0', 10),
  visualHintOpen: false,

  // Modo Copa Gran Premio (Torneo de 4 carreras)
  gameMode: '1v1', // '1v1' | 'cup' | '2p'
  cupStage: 0,
  cupRivals: ['doraemon', 'mario', 'goku', 'sonic'],

  // Configuración Duelo 2 Jugadores
  p1Setup: { charId: 'pikachu', age: '6' },
  p2Setup: { charId: 'goku', age: '9' },

  // Estado en carrera activa
  raceActive: false,
  countdownActive: false,
  lastFrameTime: 0,
  trackScrollX: 0,
  keypadBuffer: '',

  // Corredor 1 (Jugador Principal)
  p1: {
    char: null,
    distance: 0,
    speed: 60,
    baseCruise: 52,
    topSpeedReached: 60,
    hearts: 5,
    maxHearts: 5,
    combo: 0,
    turboTimer: 0,
    hurtTimer: 0,
    correctCount: 0,
    wrongCount: 0,
    totalAnswerTimeMs: 0,
    currentQ: null,
    qStartTime: 0,
    gateScreenX: 460
  },

  // Corredor 2 (Rival IA o Jugador 2)
  p2: {
    char: null,
    isHuman: false,
    distance: 0,
    speed: 58,
    baseCruise: 56,
    hearts: 5,
    maxHearts: 5,
    combo: 0,
    turboTimer: 0,
    hurtTimer: 0,
    aiBurstTimer: 0,
    currentQ: null,
    qStartTime: 0
  },

  mistakesLog: [],
  particles: []
};

const SPRITE_CACHE = {};

// ============================================================================
// SONIDOS SINTETIZADOS (WEB AUDIO API)
// ============================================================================
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!STATE.soundEnabled) return;
  const ctx = getAudioCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (type === 'turbo') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(330, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
    osc.frequency.exponentialRampToValueAtTime(1174, now + 0.32);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } else if (type === 'good') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.08);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } else if (type === 'wrong') {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc2.type = 'square';
    osc.frequency.setValueAtTime(175, now);
    osc.frequency.linearRampToValueAtTime(98, now + 0.42);
    osc2.frequency.setValueAtTime(166, now);
    osc2.frequency.linearRampToValueAtTime(92, now + 0.42);
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.45);
    osc2.stop(now + 0.45);
  } else if (type === 'beep') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  } else if (type === 'go') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.32);
  } else if (type === 'win') {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.11);
      gain.gain.setValueAtTime(0.2, now + i * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.11 + 0.26);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.11);
      osc.stop(now + i * 0.11 + 0.26);
    });
  }
}

function toggleSound() {
  STATE.soundEnabled = !STATE.soundEnabled;
  const btn = document.getElementById('btn-sound');
  if (btn) btn.textContent = STATE.soundEnabled ? '🔊' : '🔇';
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  preloadCharacterSprites();
  renderCharacterGrid();
  renderTrackPills();
  updateWinsBadge();
  selectAgePreset('6');

  window.addEventListener('keydown', handleKeyboardInput);
  window.addEventListener('resize', resizeCanvas);
});

function preloadCharacterSprites() {
  CHARACTERS.forEach(char => {
    const svgString = char.svg.trim();
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      SPRITE_CACHE[char.id] = img;
    };
    img.src = url;
  });
}

function getCharacterById(id) {
  return CHARACTERS.find(c => c.id === id) || CHARACTERS[0];
}

function getTrackById(id) {
  return TRACKS.find(t => t.id === id) || TRACKS[0];
}

function updateWinsBadge() {
  const el = document.getElementById('total-wins-badge');
  if (el) el.textContent = STATE.totalWins;
}

// ============================================================================
// EDAD (6 AÑOS vs 9 AÑOS) Y OPERACIONES
// ============================================================================
function selectAgePreset(preset) {
  STATE.agePreset = preset;
  document.querySelectorAll('.age-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.age === preset);
  });

  if (preset === '6') {
    STATE.operations = { add: true, sub: true, mul: false, div: false };
  } else {
    STATE.operations = { add: true, sub: true, mul: true, div: true };
  }
  syncOperationPillsUI();
}

function toggleOperation(opKey) {
  const activeCount = Object.values(STATE.operations).filter(Boolean).length;
  if (STATE.operations[opKey] && activeCount <= 1) return;
  STATE.operations[opKey] = !STATE.operations[opKey];
  syncOperationPillsUI();
}

function syncOperationPillsUI() {
  document.querySelectorAll('.op-pill').forEach(btn => {
    const key = btn.dataset.op;
    btn.classList.toggle('active', !!STATE.operations[key]);
  });
}

function setInputMode(mode) {
  STATE.inputMode = mode;
  const btn = document.getElementById('btn-input-toggle');
  if (btn) {
    btn.textContent = mode === 'choices' ? '🎯' : '🔢';
  }
}

function cycleInputMode() {
  playSound('beep');
  setInputMode(STATE.inputMode === 'choices' ? 'keypad' : 'choices');
}

// ============================================================================
// SELECTOR VISUAL DE PERSONAJES (MODAL) Y PISTA
// ============================================================================
function openCharacterModal(tab) {
  playSound('beep');
  STATE.pickerTab = tab;
  const titleEl = document.getElementById('char-modal-title');
  if (titleEl) {
    titleEl.textContent = tab === 'player' ? '🏎️ Elige tu Personaje' : '😈 Elige tu Rival';
  }
  renderCharacterGrid();
  document.getElementById('character-modal').classList.remove('hidden');
}

function closeCharacterModal() {
  document.getElementById('character-modal').classList.add('hidden');
}

function renderCharacterGrid() {
  const pChar = getCharacterById(STATE.playerCharId);
  const rChar = getCharacterById(STATE.rivalCharId);

  const pNameEl = document.getElementById('selected-player-name');
  const rNameEl = document.getElementById('selected-rival-name');
  if (pNameEl) pNameEl.textContent = pChar.name;
  if (rNameEl) rNameEl.textContent = rChar.name;

  const pPrev = document.getElementById('preview-player-svg');
  const rPrev = document.getElementById('preview-rival-svg');
  if (pPrev) pPrev.innerHTML = pChar.svg;
  if (rPrev) rPrev.innerHTML = rChar.svg;

  const grid = document.getElementById('character-grid');
  if (!grid) return;

  grid.innerHTML = CHARACTERS.map(c => {
    const isPlayer = c.id === STATE.playerCharId;
    const isRival = c.id === STATE.rivalCharId;
    let cardClass = 'char-card';
    if (isPlayer) cardClass += ' selected-player';
    else if (isRival) cardClass += ' selected-rival';

    let badgeHTML = '';
    if (isPlayer) badgeHTML = `<span class="char-badge-tag tag-p1">TÚ</span>`;
    else if (isRival) badgeHTML = `<span class="char-badge-tag tag-rival">RIVAL</span>`;

    return `
      <div class="${cardClass}" onclick="selectCharacter('${c.id}')">
        ${badgeHTML}
        <div class="char-svg-wrap">${c.svg}</div>
        <div class="char-name">${c.name}</div>
      </div>
    `;
  }).join('');
}

function selectCharacter(charId) {
  playSound('beep');
  if (STATE.pickerTab === 'player') {
    STATE.playerCharId = charId;
    if (STATE.rivalCharId === charId) {
      const other = CHARACTERS.find(c => c.id !== charId);
      if (other) STATE.rivalCharId = other.id;
    }
  } else {
    if (charId === STATE.playerCharId) {
      STATE.playerCharId = STATE.rivalCharId;
    }
    STATE.rivalCharId = charId;
  }
  renderCharacterGrid();
  closeCharacterModal();
}

function renderTrackPills() {
  const container = document.getElementById('track-pills');
  if (!container) return;
  container.innerHTML = TRACKS.map(t => `
    <button class="track-pill ${t.id === STATE.trackId ? 'active' : ''}" onclick="selectTrack('${t.id}')">
      ${t.name}
    </button>
  `).join('');
}

function selectTrack(trackId) {
  STATE.trackId = trackId;
  renderTrackPills();
}

// ============================================================================
// GENERADOR DE OPERACIONES (6 AÑOS vs 9 AÑOS)
// ============================================================================
function generateMathQuestion(ageLevelOverride = null, opsOverride = null) {
  const level = ageLevelOverride || STATE.agePreset;
  let activeOps = [];

  if (opsOverride) {
    activeOps = opsOverride;
  } else {
    Object.keys(STATE.operations).forEach(k => {
      if (STATE.operations[k]) activeOps.push(k);
    });
  }
  if (activeOps.length === 0) activeOps = ['add'];

  const op = activeOps[Math.floor(Math.random() * activeOps.length)];
  let a = 0;
  let b = 0;
  let answer = 0;
  let symbol = '+';
  let visualHintHTML = '';

  if (op === 'add') {
    symbol = '+';
    if (level === '6') {
      a = randInt(1, 9);
      b = randInt(1, 8);
      answer = a + b;
      visualHintHTML = `${'🟢'.repeat(a)} + ${'🟡'.repeat(b)}`;
    } else {
      a = randInt(8, 42);
      b = randInt(6, 32);
      answer = a + b;
      visualHintHTML = `${Math.floor(a / 10) * 10}+${Math.floor(b / 10) * 10} y ${a % 10}+${b % 10}`;
    }
  } else if (op === 'sub') {
    symbol = '−';
    if (level === '6') {
      a = randInt(3, 12);
      b = randInt(1, a - 1);
      answer = a - b;
      visualHintHTML = `${'⭐'.repeat(answer)}${'❌'.repeat(b)}`;
    } else {
      a = randInt(15, 58);
      b = randInt(5, a - 4);
      answer = a - b;
      visualHintHTML = `De ${b} a ${a}`;
    }
  } else if (op === 'mul') {
    symbol = '×';
    if (level === '6') {
      const easyTables = [1, 2, 5, 10];
      a = easyTables[Math.floor(Math.random() * easyTables.length)];
      b = randInt(1, 5);
      answer = a * b;
      visualHintHTML = Array(b).fill('🍓'.repeat(Math.min(a, 5))).join(' + ');
    } else {
      a = randInt(2, 10);
      b = randInt(2, 10);
      answer = a * b;
      visualHintHTML = `${a} × ${b - 1} = ${a * (b - 1)} (+${a})`;
    }
  } else if (op === 'div') {
    symbol = '÷';
    if (level === '6') {
      b = Math.random() < 0.75 ? 2 : 5;
      answer = randInt(1, 5);
      a = b * answer;
      visualHintHTML = `${a} 🍪 entre ${b}`;
    } else {
      b = randInt(2, 9);
      answer = randInt(2, 10);
      a = b * answer;
      visualHintHTML = `${b} × ? = ${a}`;
    }
  }

  const equationText = `${a} ${symbol} ${b}`;
  const choices = generateChoices(answer, op, level);

  return {
    a,
    b,
    op,
    symbol,
    equationText,
    answer,
    choices,
    visualHintHTML
  };
}

function generateChoices(correctAnswer, op, level) {
  const set = new Set([correctAnswer]);
  const maxSpread = level === '6' ? 4 : (op === 'mul' || op === 'div' ? 10 : 8);

  let attempts = 0;
  while (set.size < 4 && attempts < 40) {
    attempts++;
    const delta = randInt(1, maxSpread) * (Math.random() < 0.5 ? 1 : -1);
    const candidate = correctAnswer + delta;
    if (candidate >= 0 && candidate !== correctAnswer) {
      set.add(candidate);
    }
  }

  while (set.size < 4) {
    set.add(correctAnswer + set.size + 1);
  }

  return Array.from(set).sort(() => Math.random() - 0.5);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================================================
// MODOS DE CARRERA
// ============================================================================
function startSingleRace() {
  STATE.gameMode = '1v1';
  launchRace(STATE.playerCharId, STATE.rivalCharId, false);
}

function startGrandPrix() {
  STATE.gameMode = 'cup';
  STATE.cupStage = 0;
  const available = CHARACTERS.filter(c => c.id !== STATE.playerCharId).map(c => c.id);
  STATE.cupRivals = available.slice(0, 4);
  launchRace(STATE.playerCharId, STATE.cupRivals[0], false);
}

function openTwoPlayerSetup() {
  document.getElementById('two-player-modal').classList.remove('hidden');
  renderTwoPlayerMiniGrids();
}

function closeTwoPlayerModal() {
  document.getElementById('two-player-modal').classList.add('hidden');
}

function renderTwoPlayerMiniGrids() {
  const p1Grid = document.getElementById('p1-char-mini-grid');
  const p2Grid = document.getElementById('p2-char-mini-grid');
  if (!p1Grid || !p2Grid) return;

  p1Grid.innerHTML = CHARACTERS.slice(0, 8).map(c => `
    <div class="char-card ${STATE.p1Setup.charId === c.id ? 'selected-player' : ''}"
         onclick="pickTwoPlayerChar(1, '${c.id}')">
      <div class="char-svg-wrap" style="width:34px;height:34px;">${c.svg}</div>
      <div class="char-name">${c.name}</div>
    </div>
  `).join('');

  p2Grid.innerHTML = CHARACTERS.slice(0, 8).map(c => `
    <div class="char-card ${STATE.p2Setup.charId === c.id ? 'selected-rival' : ''}"
         onclick="pickTwoPlayerChar(2, '${c.id}')">
      <div class="char-svg-wrap" style="width:34px;height:34px;">${c.svg}</div>
      <div class="char-name">${c.name}</div>
    </div>
  `).join('');
}

function pickTwoPlayerChar(playerNum, charId) {
  playSound('beep');
  if (playerNum === 1) STATE.p1Setup.charId = charId;
  else STATE.p2Setup.charId = charId;
  renderTwoPlayerMiniGrids();
}

function startTwoPlayerRace() {
  STATE.p1Setup.age = document.getElementById('p1-age-select').value;
  STATE.p2Setup.age = document.getElementById('p2-age-select').value;
  closeTwoPlayerModal();
  STATE.gameMode = '2p';
  launchRace(STATE.p1Setup.charId, STATE.p2Setup.charId, true);
}

// ============================================================================
// ARRANCAR CARRERA
// ============================================================================
function launchRace(p1CharId, p2CharId, isTwoPlayer) {
  const p1Char = getCharacterById(p1CharId);
  const p2Char = getCharacterById(p2CharId);

  const isSixYearMode = STATE.agePreset === '6' && !isTwoPlayer;
  const p1Base = isSixYearMode ? 52 : 58;
  const cupBonus = STATE.gameMode === 'cup' ? STATE.cupStage * 5 : 0;
  const aiBase = (isSixYearMode ? 50 : 62) * p2Char.baseSpeedMultiplier + cupBonus;

  STATE.p1 = {
    char: p1Char,
    distance: 0,
    speed: p1Base,
    baseCruise: p1Base,
    topSpeedReached: p1Base,
    hearts: 5,
    maxHearts: 5,
    combo: 0,
    turboTimer: 0,
    hurtTimer: 0,
    correctCount: 0,
    wrongCount: 0,
    totalAnswerTimeMs: 0,
    currentQ: null,
    qStartTime: performance.now(),
    gateScreenX: 460
  };

  STATE.p2 = {
    char: p2Char,
    isHuman: isTwoPlayer,
    distance: 0,
    speed: isTwoPlayer ? p1Base : aiBase,
    baseCruise: isTwoPlayer ? p1Base : aiBase,
    hearts: 5,
    maxHearts: 5,
    combo: 0,
    turboTimer: 0,
    hurtTimer: 0,
    aiBurstTimer: 2.5,
    currentQ: null,
    qStartTime: performance.now()
  };

  STATE.mistakesLog = [];
  STATE.particles = [];
  STATE.trackScrollX = 0;
  STATE.visualHintOpen = false;
  document.getElementById('visual-hint-area').classList.add('hidden');
  document.getElementById('low-hp-vignette').classList.add('hidden');
  document.getElementById('result-modal').classList.add('hidden');

  document.getElementById('menu-screen').classList.remove('active');
  document.getElementById('race-screen').classList.add('active');

  document.getElementById('hud-p1-avatar').innerHTML = p1Char.svg;
  document.getElementById('hud-p1-name').textContent = p1Char.name;
  document.getElementById('minimap-p1-icon').textContent = p1Char.emoji;

  document.getElementById('hud-rival-avatar').innerHTML = p2Char.svg;
  document.getElementById('hud-rival-name').textContent = p2Char.name;
  document.getElementById('minimap-rival-icon').textContent = p2Char.emoji;

  const modeBadge = document.getElementById('race-mode-badge');
  if (STATE.gameMode === 'cup') {
    modeBadge.textContent = `🏆 ${STATE.cupStage + 1}/4`;
    modeBadge.classList.remove('hidden');
  } else {
    modeBadge.classList.add('hidden');
  }

  document.getElementById('cockpit-1p').classList.toggle('hidden', isTwoPlayer);
  document.getElementById('cockpit-2p').classList.toggle('hidden', !isTwoPlayer);
  document.getElementById('hud-p2-hearts').classList.toggle('hidden', !isTwoPlayer);

  renderHeartsHUD();
  updateMinimapHUD();
  resizeCanvas();

  if (isTwoPlayer) {
    document.getElementById('p1-cockpit-title').textContent = `${p1Char.emoji} ${p1Char.name}`;
    document.getElementById('p2-cockpit-title').textContent = `${p2Char.emoji} ${p2Char.name}`;
    nextQuestion2P(1);
    nextQuestion2P(2);
  } else {
    nextQuestion1P();
  }

  runStartCountdown();
}

function runStartCountdown() {
  STATE.raceActive = false;
  STATE.countdownActive = true;
  const overlay = document.getElementById('countdown-overlay');
  const numEl = document.getElementById('countdown-number');
  const red = document.getElementById('light-red');
  const yellow = document.getElementById('light-yellow');
  const green = document.getElementById('light-green');

  overlay.classList.remove('hidden');
  red.className = 't-bulb red-on';
  yellow.className = 't-bulb';
  green.className = 't-bulb';
  numEl.textContent = '3';
  playSound('beep');
  drawRaceFrame();

  setTimeout(() => {
    if (!STATE.countdownActive) return;
    numEl.textContent = '2';
    yellow.className = 't-bulb yellow-on';
    playSound('beep');
  }, 650);

  setTimeout(() => {
    if (!STATE.countdownActive) return;
    numEl.textContent = '1';
    playSound('beep');
  }, 1300);

  setTimeout(() => {
    if (!STATE.countdownActive) return;
    numEl.textContent = '¡YA! 🚀';
    green.className = 't-bulb green-on';
    playSound('go');
  }, 1950);

  setTimeout(() => {
    if (!STATE.countdownActive) return;
    overlay.classList.add('hidden');
    STATE.countdownActive = false;
    STATE.raceActive = true;
    STATE.p1.qStartTime = performance.now();
    STATE.p2.qStartTime = performance.now();
    STATE.lastFrameTime = performance.now();
    requestAnimationFrame(gameLoop);
  }, 2350);
}

// ============================================================================
// PREGUNTAS Y RESPUESTAS (1 JUGADOR)
// ============================================================================
function nextQuestion1P() {
  const q = generateMathQuestion();
  STATE.p1.currentQ = q;
  STATE.p1.qStartTime = performance.now();
  const canvas = document.getElementById('race-canvas');
  STATE.p1.gateScreenX = canvas ? Math.max(320, canvas.width * 0.78) : 450;
  STATE.keypadBuffer = '';

  document.getElementById('math-equation-text').textContent = `${q.equationText} = ?`;

  const hintArea = document.getElementById('visual-hint-area');
  hintArea.innerHTML = q.visualHintHTML;
  hintArea.classList.toggle('hidden', !STATE.visualHintOpen);

  const choicesContainer = document.getElementById('choices-container');
  const keypadContainer = document.getElementById('keypad-container');

  if (STATE.inputMode === 'choices') {
    choicesContainer.classList.remove('hidden');
    keypadContainer.classList.add('hidden');
    choicesContainer.innerHTML = q.choices.map(val => `
      <button class="choice-btn" onclick="submitAnswer1P(${val}, this)">
        ${val}
      </button>
    `).join('');
  } else {
    choicesContainer.classList.add('hidden');
    keypadContainer.classList.remove('hidden');
  }
}

function toggleVisualHint() {
  STATE.visualHintOpen = !STATE.visualHintOpen;
  const hintArea = document.getElementById('visual-hint-area');
  hintArea.classList.toggle('hidden', !STATE.visualHintOpen);
}

function pressKeypad(key) {
  if (!STATE.raceActive || !STATE.p1.currentQ) return;
  const eqEl = document.getElementById('math-equation-text');
  const q = STATE.p1.currentQ;

  if (key === 'C') {
    STATE.keypadBuffer = STATE.keypadBuffer.slice(0, -1);
  } else if (key === 'OK') {
    if (STATE.keypadBuffer.length > 0) {
      submitAnswer1P(parseInt(STATE.keypadBuffer, 10), null);
    }
    return;
  } else if (STATE.keypadBuffer.length < 3) {
    STATE.keypadBuffer += key;
  }

  eqEl.textContent = `${q.equationText} = ${STATE.keypadBuffer || '?'}`;
}

function submitAnswer1P(userValue, btnElement) {
  if (!STATE.raceActive || !STATE.p1.currentQ) return;
  const q = STATE.p1.currentQ;
  const elapsedMs = Math.max(200, performance.now() - STATE.p1.qStartTime);
  const elapsedSec = elapsedMs / 1000;

  if (userValue === q.answer) {
    STATE.p1.correctCount++;
    STATE.p1.totalAnswerTimeMs += elapsedMs;
    STATE.p1.combo++;

    let speedBoost = 48;
    let distanceJump = 22;
    let bannerText = '✅ +48 km/h';

    if (elapsedSec <= 2.2) {
      speedBoost = 125;
      distanceJump = 46;
      bannerText = '⚡ ¡SÚPER TURBO!';
      playSound('turbo');
      triggerTurboFlash();
    } else if (elapsedSec <= 4.3) {
      speedBoost = 82;
      distanceJump = 34;
      bannerText = '🔥 ¡TURBO!';
      playSound('turbo');
      triggerTurboFlash();
    } else {
      playSound('good');
    }

    const comboBonus = Math.min(45, STATE.p1.combo * 9);
    STATE.p1.speed = Math.min(265, STATE.p1.baseCruise + speedBoost + comboBonus);
    STATE.p1.topSpeedReached = Math.max(STATE.p1.topSpeedReached, Math.round(STATE.p1.speed));
    STATE.p1.distance += distanceJump;
    STATE.p1.turboTimer = 1.3;

    if (STATE.p1.combo > 0 && STATE.p1.combo % 4 === 0 && STATE.p1.hearts < STATE.p1.maxHearts) {
      STATE.p1.hearts++;
      bannerText = '💖 +1 ❤️';
      renderHeartsHUD();
    }

    updateComboBadge();
    showFloatingBanner(bannerText);
    spawnTurboParticles(110, 100, STATE.p1.char.trailColor);

    if (btnElement) btnElement.classList.add('correct-flash');
    nextQuestion1P();
  } else {
    handlePlayerMistake(STATE.p1, q, btnElement);
  }
}

// ============================================================================
// PANTALLA ROJA DE FALLO Y PÉRDIDA DE VIDA
// ============================================================================
function handlePlayerMistake(playerObj, questionObj, btnElement) {
  playSound('wrong');

  playerObj.wrongCount = (playerObj.wrongCount || 0) + 1;
  playerObj.hearts = Math.max(0, playerObj.hearts - 1);
  playerObj.combo = 0;
  playerObj.speed = Math.max(24, playerObj.baseCruise * 0.48);
  playerObj.hurtTimer = 1.1;

  STATE.mistakesLog.push(`${questionObj.equationText} = ${questionObj.answer}`);

  if (btnElement) btnElement.classList.add('wrong-flash');

  const damageOverlay = document.getElementById('damage-overlay');
  document.getElementById('damage-title-text').textContent = `-1 ❤️ (${playerObj.hearts}/${playerObj.maxHearts})`;
  document.getElementById('damage-correction-text').textContent = `${questionObj.equationText} = ${questionObj.answer}`;

  damageOverlay.classList.remove('active');
  void damageOverlay.offsetWidth;
  damageOverlay.classList.add('active');

  const raceScreen = document.getElementById('race-screen');
  raceScreen.classList.remove('screen-shake');
  void raceScreen.offsetWidth;
  raceScreen.classList.add('screen-shake');

  renderHeartsHUD();
  updateComboBadge();
  spawnDamageParticles(110, 100);

  if (playerObj.hearts <= 0) {
    setTimeout(() => {
      if (STATE.raceActive) finishRace('no_hearts');
    }, 600);
    return;
  }

  setTimeout(() => {
    if (STATE.raceActive && STATE.gameMode !== '2p') {
      nextQuestion1P();
    }
  }, 500);
}

function triggerTurboFlash() {
  const el = document.getElementById('turbo-overlay');
  el.classList.remove('active');
  void el.offsetWidth;
  el.classList.add('active');
}

function showFloatingBanner(text) {
  const banner = document.getElementById('floating-race-banner');
  banner.textContent = text;
  banner.classList.remove('hidden');
  clearTimeout(banner._hideTimer);
  banner._hideTimer = setTimeout(() => {
    banner.classList.add('hidden');
  }, 1150);
}

function renderHeartsHUD() {
  const container = document.getElementById('hud-p1-hearts');
  const hpFill = document.getElementById('hud-p1-hp-fill');
  const vignette = document.getElementById('low-hp-vignette');

  let html = '';
  for (let i = 0; i < STATE.p1.maxHearts; i++) {
    const alive = i < STATE.p1.hearts;
    html += `<span class="heart-icon ${alive ? '' : 'lost'}">❤️</span>`;
  }
  container.innerHTML = html;

  const pct = Math.max(0, (STATE.p1.hearts / STATE.p1.maxHearts) * 100);
  hpFill.style.width = `${pct}%`;
  if (STATE.p1.hearts <= 1) {
    hpFill.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    vignette.classList.remove('hidden');
  } else if (STATE.p1.hearts <= 2) {
    hpFill.style.background = 'linear-gradient(90deg, #f59e0b, #ea580c)';
    vignette.classList.add('hidden');
  } else {
    hpFill.style.background = 'linear-gradient(90deg, #22c55e, #4ade80)';
    vignette.classList.add('hidden');
  }

  if (STATE.gameMode === '2p') {
    const p2Container = document.getElementById('hud-p2-hearts');
    let html2 = '';
    for (let i = 0; i < STATE.p2.maxHearts; i++) {
      const alive = i < STATE.p2.hearts;
      html2 += `<span class="heart-icon ${alive ? '' : 'lost'}">❤️</span>`;
    }
    p2Container.innerHTML = html2;
  }
}

function updateComboBadge() {
  const badge = document.getElementById('hud-combo-badge');
  if (STATE.p1.combo >= 2) {
    badge.textContent = `🔥x${STATE.p1.combo}`;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

// ============================================================================
// DUELO 2 JUGADORES
// ============================================================================
function getOpsFor2PLevel(levelCode) {
  if (levelCode === '6') return { age: '6', ops: ['add', 'sub'] };
  if (levelCode === 'mul') return { age: '9', ops: ['mul'] };
  return { age: '9', ops: ['add', 'sub', 'mul', 'div'] };
}

function nextQuestion2P(playerNum) {
  const isP1 = playerNum === 1;
  const setup = isP1 ? STATE.p1Setup : STATE.p2Setup;
  const runner = isP1 ? STATE.p1 : STATE.p2;
  const cfg = getOpsFor2PLevel(setup.age);

  const q = generateMathQuestion(cfg.age, cfg.ops);
  runner.currentQ = q;
  runner.qStartTime = performance.now();

  document.getElementById(isP1 ? 'p1-equation' : 'p2-equation').textContent = `${q.equationText} = ?`;
  document.getElementById(isP1 ? 'p1-choices' : 'p2-choices').innerHTML = q.choices.map(val => `
    <button class="p2p-choice-btn" onclick="submitAnswer2P(${playerNum}, ${val})">
      ${val}
    </button>
  `).join('');
}

function submitAnswer2P(playerNum, val) {
  if (!STATE.raceActive) return;
  const isP1 = playerNum === 1;
  const runner = isP1 ? STATE.p1 : STATE.p2;
  const q = runner.currentQ;
  if (!q) return;

  const elapsedSec = (performance.now() - runner.qStartTime) / 1000;

  if (val === q.answer) {
    runner.combo++;
    const boost = elapsedSec < 2.3 ? 115 : (elapsedSec < 4.5 ? 78 : 48);
    const jump = elapsedSec < 2.3 ? 42 : 26;
    runner.speed = Math.min(255, runner.baseCruise + boost + runner.combo * 6);
    runner.distance += jump;
    runner.turboTimer = 1.1;
    playSound(elapsedSec < 3 ? 'turbo' : 'good');
    nextQuestion2P(playerNum);
  } else {
    playSound('wrong');
    runner.hearts = Math.max(0, runner.hearts - 1);
    runner.combo = 0;
    runner.speed = 28;
    runner.hurtTimer = 1.0;

    const sideBox = document.getElementById(isP1 ? 'p1-cockpit-box' : 'p2-cockpit-box');
    sideBox.classList.add('side-damaged');
    setTimeout(() => sideBox.classList.remove('side-damaged'), 650);

    const damageOverlay = document.getElementById('damage-overlay');
    document.getElementById('damage-title-text').textContent = `${runner.char.emoji} -1 ❤️`;
    document.getElementById('damage-correction-text').textContent = `${q.equationText} = ${q.answer}`;
    damageOverlay.classList.remove('active');
    void damageOverlay.offsetWidth;
    damageOverlay.classList.add('active');

    renderHeartsHUD();

    if (runner.hearts <= 0) {
      finishRace(isP1 ? 'p2_wins_ko' : 'p1_wins_ko');
      return;
    }
    nextQuestion2P(playerNum);
  }
}

// ============================================================================
// FÍSICA Y ANIMACIÓN (60 FPS)
// ============================================================================
function gameLoop(now) {
  if (!STATE.raceActive) return;

  const dt = Math.min(0.05, (now - STATE.lastFrameTime) / 1000);
  STATE.lastFrameTime = now;

  updatePhysics(dt, now);
  drawRaceFrame();

  if (STATE.raceActive) {
    requestAnimationFrame(gameLoop);
  }
}

function updatePhysics(dt, now) {
  const p1 = STATE.p1;
  const p2 = STATE.p2;

  p1.speed += (p1.baseCruise - p1.speed) * Math.min(1, dt * 1.15);
  p1.distance += (p1.speed * 0.62) * dt;
  if (p1.turboTimer > 0) p1.turboTimer -= dt;
  if (p1.hurtTimer > 0) p1.hurtTimer -= dt;

  p1.gateScreenX -= p1.speed * 1.35 * dt;
  if (p1.gateScreenX < 155) {
    p1.gateScreenX = 155;
  }

  if (p2.isHuman) {
    p2.speed += (p2.baseCruise - p2.speed) * Math.min(1, dt * 1.15);
    p2.distance += (p2.speed * 0.62) * dt;
    if (p2.turboTimer > 0) p2.turboTimer -= dt;
    if (p2.hurtTimer > 0) p2.hurtTimer -= dt;

    document.getElementById('p1-cockpit-speed').textContent = `⚡ ${Math.round(p1.speed)}`;
    document.getElementById('p2-cockpit-speed').textContent = `⚡ ${Math.round(p2.speed)}`;

    const p1Elapsed = (now - p1.qStartTime) / 1000;
    const p2Elapsed = (now - p2.qStartTime) / 1000;
    document.getElementById('p1-timer-fill').style.width = `${Math.max(8, 100 - p1Elapsed * 12.5)}%`;
    document.getElementById('p2-timer-fill').style.width = `${Math.max(8, 100 - p2Elapsed * 12.5)}%`;
  } else {
    p2.aiBurstTimer -= dt;
    if (p2.aiBurstTimer <= 0) {
      p2.aiBurstTimer = 2.6 + Math.random() * 2.2;
      const gap = p1.distance - p2.distance;
      let burst = 24 + Math.random() * 22;
      if (gap > 140) burst += 18;
      if (gap < -120) burst *= 0.45;
      p2.speed = p2.baseCruise + burst;
      p2.turboTimer = 0.7;
    }
    p2.speed += (p2.baseCruise - p2.speed) * Math.min(1, dt * 1.3);
    p2.distance += (p2.speed * 0.62) * dt;
    if (p2.turboTimer > 0) p2.turboTimer -= dt;
  }

  if (!p2.isHuman && p1.currentQ) {
    const elapsedSec = (now - p1.qStartTime) / 1000;
    const bonusPct = Math.max(6, 100 - elapsedSec * 12.5);
    const fillEl = document.getElementById('speed-timer-fill');
    fillEl.style.width = `${bonusPct}%`;

    if (elapsedSec <= 2.2) {
      fillEl.style.background = 'linear-gradient(90deg, #38bdf8, #22c55e)';
    } else if (elapsedSec <= 4.3) {
      fillEl.style.background = 'linear-gradient(90deg, #f59e0b, #eab308)';
    } else {
      fillEl.style.background = 'linear-gradient(90deg, #64748b, #94a3b8)';
    }
  }

  STATE.trackScrollX += p1.speed * 3.1 * dt;

  document.getElementById('speed-kmh').textContent = Math.round(p1.speed);
  updateMinimapHUD();

  if (p1.distance >= STATE.raceDistance || p2.distance >= STATE.raceDistance) {
    if (p1.distance >= p2.distance) finishRace('p1_wins');
    else finishRace('p2_wins');
  }
}

function updateMinimapHUD() {
  const p1Pct = Math.min(96, Math.max(3, (STATE.p1.distance / STATE.raceDistance) * 93 + 3));
  const p2Pct = Math.min(96, Math.max(3, (STATE.p2.distance / STATE.raceDistance) * 93 + 3));

  document.getElementById('minimap-fill-p1').style.width = `${p1Pct}%`;
  document.getElementById('minimap-marker-p1').style.left = `${p1Pct}%`;
  document.getElementById('minimap-marker-rival').style.left = `${p2Pct}%`;
}

// ============================================================================
// RENDERIZADO DEL CANVAS ESCALABLE (MÓVIL Y TABLET)
// ============================================================================
function resizeCanvas() {
  const canvas = document.getElementById('race-canvas');
  const viewport = document.getElementById('track-viewport');
  if (!canvas || !viewport) return;
  canvas.width = viewport.clientWidth;
  canvas.height = viewport.clientHeight;
  if (!STATE.raceActive) drawRaceFrame();
}

function drawRaceFrame() {
  const canvas = document.getElementById('race-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  if (W === 0 || H === 0) return;

  const track = getTrackById(STATE.trackId);
  const scale = Math.min(1.1, Math.max(0.68, H / 230));

  ctx.clearRect(0, 0, W, H);

  // 1. Cielo
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.42);
  skyGrad.addColorStop(0, track.skyTop);
  skyGrad.addColorStop(1, track.skyBottom);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H * 0.42);

  // 2. Colinas
  const hillY = H * 0.39;
  ctx.fillStyle = track.hillColor;
  ctx.beginPath();
  ctx.moveTo(0, hillY);
  for (let x = 0; x <= W + 100; x += 50) {
    const wave = Math.sin((x + STATE.trackScrollX * 0.18) * 0.014) * (13 * scale);
    ctx.lineTo(x, hillY - 12 * scale + wave);
  }
  ctx.lineTo(W, hillY + 20);
  ctx.lineTo(0, hillY + 20);
  ctx.closePath();
  ctx.fill();

  // Decoración
  ctx.font = `${Math.round(20 * scale)}px sans-serif`;
  const decors = track.decorEmoji;
  for (let i = 0; i < 8; i++) {
    const worldX = ((i * 200 - (STATE.trackScrollX * 0.45) % 1600) + 1600) % 1600 - 60;
    if (worldX > -40 && worldX < W + 40) {
      ctx.fillText(decors[i % decors.length], worldX, hillY - 6 * scale);
    }
  }

  // 3. Carretera
  const roadTop = H * 0.38;
  const roadHeight = H * 0.59;
  ctx.fillStyle = track.roadColor;
  ctx.fillRect(0, roadTop, W, roadHeight);

  const kerbStripeW = 36;
  const kerbH = Math.max(6, Math.round(8 * scale));
  const kerbOffset = Math.floor(STATE.trackScrollX) % (kerbStripeW * 2);
  for (let x = -kerbStripeW * 2; x < W + kerbStripeW; x += kerbStripeW) {
    const drawX = x - kerbOffset;
    const isEven = Math.abs(Math.round(x / kerbStripeW)) % 2 === 0;
    ctx.fillStyle = isEven ? track.kerbA : track.kerbB;
    ctx.fillRect(drawX, roadTop, kerbStripeW, kerbH);
    ctx.fillRect(drawX, roadTop + roadHeight - kerbH, kerbStripeW, kerbH);
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 3;
  ctx.setLineDash([28, 22]);
  ctx.lineDashOffset = -(STATE.trackScrollX % 50);
  ctx.beginPath();
  ctx.moveTo(0, roadTop + roadHeight * 0.5);
  ctx.lineTo(W, roadTop + roadHeight * 0.5);
  ctx.stroke();
  ctx.setLineDash([]);

  // 4. Meta
  const p1X = Math.min(130, W * 0.24);
  const remainingMeters = STATE.raceDistance - STATE.p1.distance;
  if (remainingMeters < 200) {
    const finishX = p1X + remainingMeters * 2.8;
    drawCheckeredLine(ctx, finishX, roadTop + kerbH, roadHeight - kerbH * 2);
  }

  // 5. Valla Matemática en la pista
  if (STATE.p1.currentQ && STATE.gameMode !== '2p') {
    const gateX = Math.min(W - 75, Math.max(p1X + 85, STATE.p1.gateScreenX));
    const laneCenterY = roadTop + roadHeight * 0.75;
    drawMathGateOnTrack(ctx, gateX, laneCenterY, STATE.p1.currentQ.equationText, scale);
  }

  // 6. Corredores
  const deltaMeters = STATE.p2.distance - STATE.p1.distance;
  const p2X = Math.max(42, Math.min(W - 55, p1X + deltaMeters * 2.2));

  const lane1Y = roadTop + roadHeight * 0.28;
  const lane2Y = roadTop + roadHeight * 0.75;

  drawRacerOnTrack(ctx, STATE.p2, p2X, lane1Y, STATE.p2.isHuman ? 'J2' : 'VS', scale);
  drawRacerOnTrack(ctx, STATE.p1, p1X, lane2Y, 'TÚ', scale);

  updateAndDrawParticles(ctx);
}

function drawCheckeredLine(ctx, x, y, height) {
  const size = 12;
  const rows = Math.floor(height / size);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < 2; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#ffffff' : '#0f172a';
      ctx.fillRect(x + c * size, y + r * size, size, size);
    }
  }
}

function drawMathGateOnTrack(ctx, x, y, equationStr, scale) {
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5;
  const boxW = Math.round(104 * scale);
  const boxH = Math.round(38 * scale);
  ctx.beginPath();
  ctx.roundRect(x - boxW / 2, y - 40 * scale, boxW, boxH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fef08a';
  ctx.font = `bold ${Math.round(17 * scale)}px Fredoka, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${equationStr}`, x, y - 21 * scale);
  ctx.restore();
}

function drawRacerOnTrack(ctx, runner, x, y, tagText, scale) {
  if (!runner || !runner.char) return;
  ctx.save();

  const bounceY = Math.sin(performance.now() * 0.018) * 2;
  const hurtShakeX = runner.hurtTimer > 0 ? Math.sin(performance.now() * 0.06) * 6 : 0;

  ctx.translate(x + hurtShakeX, y + bounceY);

  const spriteSize = Math.round(62 * scale);
  const half = spriteSize / 2;

  if (runner.turboTimer > 0) {
    const flameLen = (28 + Math.random() * 20) * scale;
    const grad = ctx.createLinearGradient(-half * 0.6, 0, -half * 0.6 - flameLen, 0);
    grad.addColorStop(0, '#38bdf8');
    grad.addColorStop(0.5, runner.char.trailColor || '#facc15');
    grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-half * 0.6, -8 * scale);
    ctx.lineTo(-half * 0.7 - flameLen, 2 * scale);
    ctx.lineTo(-half * 0.6, 13 * scale);
    ctx.closePath();
    ctx.fill();
  }

  if (runner.hurtTimer > 0) {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
    ctx.beginPath();
    ctx.arc(0, 0, half * 1.15, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, half * 0.85, half * 0.8, 6 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  const img = SPRITE_CACHE[runner.char.id];
  if (img) {
    ctx.drawImage(img, -half, -half, spriteSize, spriteSize);
  } else {
    ctx.font = `${Math.round(32 * scale)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(runner.char.emoji, 0, 10);
  }

  ctx.restore();
}

function spawnTurboParticles(x, y, color) {
  for (let i = 0; i < 14; i++) {
    STATE.particles.push({
      x,
      y: y + randInt(-16, 16),
      vx: -randInt(110, 250),
      vy: randInt(-50, 50),
      r: randInt(3, 6),
      color: color || '#fde047',
      life: 0.5
    });
  }
}

function spawnDamageParticles(x, y) {
  for (let i = 0; i < 16; i++) {
    STATE.particles.push({
      x,
      y,
      vx: randInt(-140, 140),
      vy: randInt(-140, 140),
      r: randInt(4, 7),
      color: '#ef4444',
      life: 0.6
    });
  }
}

function updateAndDrawParticles(ctx) {
  for (let i = STATE.particles.length - 1; i >= 0; i--) {
    const p = STATE.particles[i];
    p.x += p.vx * 0.016;
    p.y += p.vy * 0.016;
    p.life -= 0.016;
    if (p.life <= 0) {
      STATE.particles.splice(i, 1);
      continue;
    }
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life * 1.5);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ============================================================================
// FIN DE CARRERA Y PODIO COMPACTO
// ============================================================================
function finishRace(reason) {
  STATE.raceActive = false;
  document.getElementById('low-hp-vignette').classList.add('hidden');

  const modal = document.getElementById('result-modal');
  const banner = document.getElementById('result-trophy-banner');
  const title = document.getElementById('result-title');
  const podium = document.getElementById('result-podium-box');
  const nextBtn = document.getElementById('btn-next-race');

  const p1Won = reason === 'p1_wins' || reason === 'p1_wins_ko';

  if (p1Won) {
    playSound('win');
    STATE.totalWins++;
    localStorage.setItem('mathRacers_wins', String(STATE.totalWins));
    updateWinsBadge();

    banner.textContent = '🏆🎉';
    title.textContent = `¡GANÓ ${STATE.p1.char.name.toUpperCase()}!`;
    title.style.color = '#4ade80';
  } else if (reason === 'no_hearts') {
    playSound('wrong');
    banner.textContent = '💔';
    title.textContent = '¡SIN VIDAS!';
    title.style.color = '#f87171';
  } else {
    banner.textContent = '🥈';
    title.textContent = `¡GANÓ ${STATE.p2.char.name.toUpperCase()}!`;
    title.style.color = '#fbbf24';
  }

  podium.innerHTML = `
    <div class="podium-fighter">
      <div class="podium-svg">${STATE.p1.char.svg}</div>
      <strong>${STATE.p1.char.name}</strong>
    </div>
    <div style="font-family:var(--font-display);font-size:1.4rem;color:#94a3b8;">⚡VS⚡</div>
    <div class="podium-fighter">
      <div class="podium-svg">${STATE.p2.char.svg}</div>
      <strong>${STATE.p2.char.name}</strong>
    </div>
  `;

  const avgSec = STATE.p1.correctCount > 0
    ? ((STATE.p1.totalAnswerTimeMs / STATE.p1.correctCount) / 1000).toFixed(1)
    : '0.0';

  document.getElementById('stat-correct').textContent = STATE.p1.correctCount;
  document.getElementById('stat-avg-time').textContent = `${avgSec}s`;
  document.getElementById('stat-top-speed').textContent = `${STATE.p1.topSpeedReached}`;
  document.getElementById('stat-hearts-left').textContent = `${STATE.p1.hearts}/${STATE.p1.maxHearts}`;

  const reviewBox = document.getElementById('mistakes-review-box');
  const mistakesList = document.getElementById('mistakes-list');
  if (STATE.mistakesLog.length > 0) {
    reviewBox.classList.remove('hidden');
    const uniqueMistakes = Array.from(new Set(STATE.mistakesLog));
    mistakesList.innerHTML = uniqueMistakes.map(item => `
      <span class="mistake-chip">${item}</span>
    `).join('');
  } else {
    reviewBox.classList.add('hidden');
  }

  if (STATE.gameMode === 'cup' && p1Won && STATE.cupStage < 3) {
    const nextRival = getCharacterById(STATE.cupRivals[STATE.cupStage + 1]);
    nextBtn.textContent = `🏆 vs ${nextRival.name} ➡️`;
  } else {
    nextBtn.textContent = '🔄 ¡Otra!';
  }

  modal.classList.remove('hidden');
}

function handleNextRaceAction() {
  if (STATE.gameMode === 'cup' && STATE.p1.hearts > 0 && STATE.p1.distance >= STATE.p2.distance) {
    if (STATE.cupStage < 3) {
      STATE.cupStage++;
      STATE.trackId = TRACKS[STATE.cupStage % TRACKS.length].id;
      launchRace(STATE.playerCharId, STATE.cupRivals[STATE.cupStage], false);
      return;
    }
  }

  if (STATE.gameMode === '2p') {
    launchRace(STATE.p1Setup.charId, STATE.p2Setup.charId, true);
  } else {
    launchRace(STATE.playerCharId, STATE.rivalCharId, false);
  }
}

function confirmExitRace() {
  STATE.raceActive = false;
  STATE.countdownActive = false;
  backToMenu();
}

function backToMenu() {
  STATE.raceActive = false;
  STATE.countdownActive = false;
  document.getElementById('low-hp-vignette').classList.add('hidden');
  document.getElementById('result-modal').classList.add('hidden');
  document.getElementById('race-screen').classList.remove('active');
  document.getElementById('menu-screen').classList.add('active');
}

function handleKeyboardInput(e) {
  if (!STATE.raceActive || STATE.gameMode === '2p') return;

  if (STATE.inputMode === 'choices') {
    const buttons = document.querySelectorAll('#choices-container .choice-btn');
    if (e.key >= '1' && e.key <= '4') {
      const idx = parseInt(e.key, 10) - 1;
      if (buttons[idx]) buttons[idx].click();
    }
  } else {
    if (e.key >= '0' && e.key <= '9') pressKeypad(e.key);
    else if (e.key === 'Backspace') pressKeypad('C');
    else if (e.key === 'Enter') pressKeypad('OK');
  }
}
