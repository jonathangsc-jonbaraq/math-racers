// ============================================================================
// MATH RACERS · PERSONAJES DE DIBUJOS Y CIRCUITOS (SVG + CANVAS SPRITES)
// ============================================================================

const CHARACTERS = [
  {
    id: 'pikachu',
    name: 'Pikachu',
    title: 'Rayo Veloz',
    emoji: '⚡',
    color: '#facc15',
    accent: '#ef4444',
    trailColor: '#fde047',
    baseSpeedMultiplier: 1.0,
    catchphrase: '¡Pika-Pika! ¡Impactrueno a toda velocidad!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Cola Rayo -->
        <polygon points="8,55 24,42 20,34 36,24 28,48 34,54 14,68" fill="#eab308" stroke="#713f12" stroke-width="2.5"/>
        <!-- Orejas con puntas negras -->
        <g transform="rotate(-22 35 25)">
          <ellipse cx="35" cy="16" rx="7" ry="18" fill="#facc15" stroke="#1e293b" stroke-width="2.5"/>
          <path d="M29,6 Q35,-4 41,6 L39,12 L31,12 Z" fill="#1e293b"/>
        </g>
        <g transform="rotate(25 70 25)">
          <ellipse cx="70" cy="16" rx="7" ry="18" fill="#facc15" stroke="#1e293b" stroke-width="2.5"/>
          <path d="M64,6 Q70,-4 76,6 L74,12 L66,12 Z" fill="#1e293b"/>
        </g>
        <!-- Kart / Monopatín Eléctrico -->
        <rect x="20" y="74" width="62" height="11" rx="6" fill="#2563eb" stroke="#1e293b" stroke-width="2.5"/>
        <circle cx="32" cy="87" r="7" fill="#1e293b"/><circle cx="32" cy="87" r="3" fill="#38bdf8"/>
        <circle cx="70" cy="87" r="7" fill="#1e293b"/><circle cx="70" cy="87" r="3" fill="#38bdf8"/>
        <!-- Cabeza y Cuerpo -->
        <circle cx="53" cy="52" r="25" fill="#facc15" stroke="#1e293b" stroke-width="2.8"/>
        <!-- Ojos brillantes -->
        <circle cx="44" cy="46" r="4.5" fill="#0f172a"/>
        <circle cx="45.5" cy="44.5" r="1.6" fill="#ffffff"/>
        <circle cx="64" cy="46" r="4.5" fill="#0f172a"/>
        <circle cx="65.5" cy="44.5" r="1.6" fill="#ffffff"/>
        <!-- Mofletes Rojos Eléctricos -->
        <circle cx="35" cy="56" r="5.5" fill="#ef4444"/>
        <circle cx="72" cy="56" r="5.5" fill="#ef4444"/>
        <!-- Nariz y Sonrisa -->
        <polygon points="52,51 56,51 54,53.5" fill="#1e293b"/>
        <path d="M48,57 Q51,61 54,57 Q57,61 60,57" fill="none" stroke="#1e293b" stroke-width="2.4" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'doraemon',
    name: 'Doraemon',
    title: 'Gorrocóptero',
    emoji: '🔔',
    color: '#0284c7',
    accent: '#ef4444',
    trailColor: '#38bdf8',
    baseSpeedMultiplier: 0.96,
    catchphrase: '¡Sacaré el Turbo Mágico de mi bolsillo!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Gorrocóptero en la cabeza -->
        <rect x="48" y="6" width="4" height="12" fill="#f59e0b" stroke="#1e293b" stroke-width="1.8"/>
        <ellipse cx="50" cy="6" rx="22" ry="3.5" fill="#fde047" stroke="#ca8a04" stroke-width="1.8"/>
        <!-- Cuerpo y Bolsillo Mágico -->
        <rect x="28" y="62" width="44" height="24" rx="12" fill="#0ea5e9" stroke="#1e293b" stroke-width="2.5"/>
        <circle cx="50" cy="75" r="11" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
        <path d="M42,74 A8,8 0 0,0 58,74 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="1.8"/>
        <!-- Cabeza Azul -->
        <circle cx="50" cy="43" r="26" fill="#0ea5e9" stroke="#1e293b" stroke-width="2.8"/>
        <!-- Cara Blanca -->
        <ellipse cx="50" cy="48" rx="21" ry="18" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
        <!-- Ojos grandes -->
        <ellipse cx="44" cy="33" rx="5.5" ry="7" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
        <circle cx="46" cy="34" r="2.3" fill="#0f172a"/>
        <ellipse cx="56" cy="33" rx="5.5" ry="7" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
        <circle cx="54" cy="34" r="2.3" fill="#0f172a"/>
        <!-- Nariz Roja -->
        <circle cx="50" cy="41" r="4.5" fill="#ef4444" stroke="#1e293b" stroke-width="1.8"/>
        <circle cx="48.8" cy="39.8" r="1.3" fill="#ffffff"/>
        <!-- Bigotes y Sonrisa -->
        <line x1="50" y1="45.5" x2="50" y2="55" stroke="#1e293b" stroke-width="2"/>
        <path d="M38,53 Q50,63 62,53" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="27" y1="44" x2="39" y2="46" stroke="#1e293b" stroke-width="1.8"/>
        <line x1="26" y1="50" x2="39" y2="50" stroke="#1e293b" stroke-width="1.8"/>
        <line x1="61" y1="46" x2="73" y2="44" stroke="#1e293b" stroke-width="1.8"/>
        <line x1="61" y1="50" x2="74" y2="50" stroke="#1e293b" stroke-width="1.8"/>
        <!-- Collar Rojo y Cascabel Dorado -->
        <rect x="31" y="62" width="38" height="6" rx="3" fill="#ef4444" stroke="#1e293b" stroke-width="2"/>
        <circle cx="50" cy="67" r="5.5" fill="#facc15" stroke="#1e293b" stroke-width="2"/>
        <circle cx="50" cy="68" r="1.3" fill="#1e293b"/>
      </svg>
    `
  },
  {
    id: 'mario',
    name: 'Super Mario',
    title: 'Super Kart',
    emoji: '🍄',
    color: '#ef4444',
    accent: '#2563eb',
    trailColor: '#fb923c',
    baseSpeedMultiplier: 1.04,
    catchphrase: '¡Here we go! ¡Champiñón Turbo activado!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Kart Rojo de Carreras -->
        <path d="M14,72 L86,72 L80,86 L20,86 Z" fill="#ef4444" stroke="#1e293b" stroke-width="2.5"/>
        <rect x="28" y="64" width="40" height="10" rx="4" fill="#2563eb" stroke="#1e293b" stroke-width="2"/>
        <circle cx="28" cy="86" r="8" fill="#1e293b"/><circle cx="28" cy="86" r="3.5" fill="#facc15"/>
        <circle cx="72" cy="86" r="8" fill="#1e293b"/><circle cx="72" cy="86" r="3.5" fill="#facc15"/>
        <!-- Cara de Mario -->
        <circle cx="50" cy="46" r="20" fill="#fed7aa" stroke="#1e293b" stroke-width="2.5"/>
        <!-- Ojos azules -->
        <ellipse cx="45" cy="43" rx="3" ry="4.2" fill="#0284c7"/>
        <ellipse cx="57" cy="43" rx="3" ry="4.2" fill="#0284c7"/>
        <!-- Nariz redonda y Bigote icónico -->
        <ellipse cx="53" cy="49" rx="6.5" ry="5" fill="#fdba74" stroke="#1e293b" stroke-width="2"/>
        <path d="M36,54 Q44,50 52,54 Q60,50 67,54 Q62,61 52,58 Q42,61 36,54 Z" fill="#451a03" stroke="#1e293b" stroke-width="1.8"/>
        <!-- Gorra Roja con Emblema M -->
        <path d="M27,36 Q50,10 74,34 L82,37 L26,38 Z" fill="#ef4444" stroke="#1e293b" stroke-width="2.5"/>
        <circle cx="51" cy="26" r="7" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
        <text x="51" y="30" text-anchor="middle" font-size="10" font-weight="900" fill="#ef4444" font-family="Arial">M</text>
      </svg>
    `
  },
  {
    id: 'goku',
    name: 'Son Goku',
    title: 'Nube Kinton',
    emoji: '🐉',
    color: '#f97316',
    accent: '#facc15',
    trailColor: '#fde047',
    baseSpeedMultiplier: 1.08,
    catchphrase: '¡Kame-Hame-Ha! ¡A volar en la Nube Kinton!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Nube Kinton Dorada Voladora -->
        <path d="M12,78 Q8,68 22,68 Q28,60 40,65 Q52,58 64,65 Q78,60 84,70 Q92,76 82,85 L18,85 Q10,84 12,78 Z" fill="#facc15" stroke="#ca8a04" stroke-width="2.5"/>
        <!-- Traje Naranja Gi -->
        <path d="M34,56 L66,56 L62,73 L38,73 Z" fill="#f97316" stroke="#1e293b" stroke-width="2.2"/>
        <path d="M43,56 L50,66 L57,56" fill="#1d4ed8"/>
        <!-- Cara de Goku -->
        <circle cx="50" cy="43" r="16" fill="#fed7aa" stroke="#1e293b" stroke-width="2.4"/>
        <!-- Ojos decididos y Cejas -->
        <line x1="40" y1="38" x2="47" y2="40" stroke="#1e293b" stroke-width="2.4" stroke-linecap="round"/>
        <line x1="60" y1="38" x2="53" y2="40" stroke="#1e293b" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="44" cy="42" r="2.4" fill="#0f172a"/>
        <circle cx="56" cy="42" r="2.4" fill="#0f172a"/>
        <path d="M45,50 Q50,55 56,50" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Pelo Icónico de Puntas (Super Saiyan Dorado / Negro con brillo) -->
        <path d="M33,38 L16,32 L30,25 L18,14 L38,20 L46,4 L54,19 L72,8 L65,24 L85,22 L70,34 L82,40 L66,40 Q50,26 33,38 Z" fill="#facc15" stroke="#1e293b" stroke-width="2.4"/>
      </svg>
    `
  },
  {
    id: 'sonic',
    name: 'Sonic',
    title: 'Destello Azul',
    emoji: '🦔',
    color: '#2563eb',
    accent: '#ef4444',
    trailColor: '#60a5fa',
    baseSpeedMultiplier: 1.12,
    catchphrase: '¡Gotta go fast! ¡Nadie me alcanza con mis anillos!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Anillo Dorado Detrás -->
        <circle cx="50" cy="52" r="36" fill="none" stroke="#facc15" stroke-width="4.5" opacity="0.85"/>
        <!-- Púas Azules Supersónicas hacia atrás -->
        <path d="M45,20 L12,24 L30,36 L8,44 L30,52 L14,64 L46,62 Z" fill="#2563eb" stroke="#1e293b" stroke-width="2.5"/>
        <!-- Cabeza Azul -->
        <circle cx="55" cy="44" r="21" fill="#2563eb" stroke="#1e293b" stroke-width="2.6"/>
        <!-- Orejas -->
        <polygon points="44,26 48,12 57,24" fill="#2563eb" stroke="#1e293b" stroke-width="2.2"/>
        <polygon points="62,25 70,13 73,28" fill="#2563eb" stroke="#1e293b" stroke-width="2.2"/>
        <!-- Ojos Verdes conectados -->
        <path d="M45,44 Q45,30 56,34 Q67,30 67,44 Z" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
        <ellipse cx="53" cy="40" rx="2.8" ry="4.5" fill="#16a34a"/>
        <ellipse cx="62" cy="40" rx="2.8" ry="4.5" fill="#16a34a"/>
        <!-- Hocico color melocotón y sonrisa -->
        <ellipse cx="57" cy="52" rx="16" ry="10" fill="#fed7aa" stroke="#1e293b" stroke-width="2"/>
        <ellipse cx="68" cy="48" rx="4" ry="2.6" fill="#0f172a"/>
        <path d="M48,54 Q56,60 64,54" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Zapatillas Rojas Supersónicas -->
        <ellipse cx="40" cy="82" rx="13" ry="7" fill="#ef4444" stroke="#1e293b" stroke-width="2.2"/>
        <rect x="35" y="76" width="8" height="11" fill="#ffffff"/>
        <ellipse cx="66" cy="82" rx="13" ry="7" fill="#ef4444" stroke="#1e293b" stroke-width="2.2"/>
        <rect x="61" y="76" width="8" height="11" fill="#ffffff"/>
      </svg>
    `
  },
  {
    id: 'elsa',
    name: 'Reina Elsa',
    title: 'Trineo de Hielo',
    emoji: '❄️',
    color: '#38bdf8',
    accent: '#e0f2fe',
    trailColor: '#7dd3fc',
    baseSpeedMultiplier: 0.94,
    catchphrase: '¡Suéltalo! ¡El hielo mágico congela la pista!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Trineo Cristal de Hielo -->
        <path d="M16,74 L84,74 Q92,70 90,82 L18,84 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2.5"/>
        <!-- Vestido Azul Brillante -->
        <path d="M35,58 L65,58 L72,76 L28,76 Z" fill="#0ea5e9" stroke="#bae6fd" stroke-width="2"/>
        <!-- Trenza Platino lateral -->
        <path d="M62,48 Q75,56 70,72 Q63,68 60,55 Z" fill="#fef9c3" stroke="#eab308" stroke-width="1.8"/>
        <!-- Cara -->
        <circle cx="50" cy="42" r="17" fill="#ffedd5" stroke="#1e293b" stroke-width="2.2"/>
        <!-- Pelo Rubio Platino y Corona de Hielo -->
        <path d="M32,42 Q32,20 50,22 Q68,20 68,42 Q58,30 50,33 Q40,30 32,42 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
        <polygon points="40,23 45,12 50,19 55,9 60,23" fill="#38bdf8" stroke="#0284c7" stroke-width="1.8"/>
        <!-- Ojos Azules y Sonrisa -->
        <circle cx="44" cy="42" r="2.8" fill="#0284c7"/>
        <circle cx="56" cy="42" r="2.8" fill="#0284c7"/>
        <path d="M45,50 Q50,54 55,50" fill="none" stroke="#e11d48" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'spiderman',
    name: 'Spider-Man',
    title: 'Bólido Arácnido',
    emoji: '🕷️',
    color: '#dc2626',
    accent: '#1d4ed8',
    trailColor: '#f87171',
    baseSpeedMultiplier: 1.05,
    catchphrase: '¡Mi sentido arácnido sabe todas las respuestas!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Bólido Azul y Rojo -->
        <rect x="18" y="72" width="64" height="12" rx="6" fill="#1d4ed8" stroke="#1e293b" stroke-width="2.5"/>
        <circle cx="30" cy="86" r="7" fill="#1e293b"/><circle cx="30" cy="86" r="3" fill="#ef4444"/>
        <circle cx="70" cy="86" r="7" fill="#1e293b"/><circle cx="70" cy="86" r="3" fill="#ef4444"/>
        <!-- Máscara Roja con Telarañas -->
        <ellipse cx="50" cy="46" rx="23" ry="25" fill="#dc2626" stroke="#1e293b" stroke-width="2.8"/>
        <!-- Líneas de telaraña -->
        <line x1="50" y1="21" x2="50" y2="71" stroke="#1e293b" stroke-width="1.4" opacity="0.6"/>
        <line x1="27" y1="46" x2="73" y2="46" stroke="#1e293b" stroke-width="1.4" opacity="0.6"/>
        <line x1="33" y1="28" x2="67" y2="64" stroke="#1e293b" stroke-width="1.4" opacity="0.6"/>
        <line x1="67" y1="28" x2="33" y2="64" stroke="#1e293b" stroke-width="1.4" opacity="0.6"/>
        <!-- Ojos Arácnidos Blancos con borde negro -->
        <path d="M33,38 Q40,34 46,45 Q38,52 33,38 Z" fill="#ffffff" stroke="#0f172a" stroke-width="3.2"/>
        <path d="M67,38 Q60,34 54,45 Q62,52 67,38 Z" fill="#ffffff" stroke="#0f172a" stroke-width="3.2"/>
      </svg>
    `
  },
  {
    id: 'chase',
    name: 'Súper Cachorro',
    title: 'Patrulla Turbo',
    emoji: '🐾',
    color: '#1d4ed8',
    accent: '#eab308',
    trailColor: '#60a5fa',
    baseSpeedMultiplier: 0.92,
    catchphrase: '¡Patrulla lista para la acción matemática!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Coche Policial Azul con Sirena -->
        <rect x="18" y="70" width="64" height="14" rx="6" fill="#1d4ed8" stroke="#1e293b" stroke-width="2.5"/>
        <circle cx="24" cy="67" r="4" fill="#ef4444"/>
        <circle cx="30" cy="86" r="7" fill="#1e293b"/>
        <circle cx="70" cy="86" r="7" fill="#1e293b"/>
        <!-- Orejas de Pastor Alemán -->
        <polygon points="28,38 22,14 40,28" fill="#78350f" stroke="#1e293b" stroke-width="2.2"/>
        <polygon points="72,38 78,14 60,28" fill="#78350f" stroke="#1e293b" stroke-width="2.2"/>
        <!-- Cara Cachorro -->
        <circle cx="50" cy="48" r="20" fill="#b45309" stroke="#1e293b" stroke-width="2.5"/>
        <ellipse cx="50" cy="54" rx="14" ry="11" fill="#fde68a"/>
        <!-- Gorra de Policía Azul con Escudo Dorado -->
        <path d="M30,33 L70,33 L65,17 L35,17 Z" fill="#1e40af" stroke="#1e293b" stroke-width="2.2"/>
        <rect x="28" y="31" width="44" height="5" rx="2" fill="#0f172a"/>
        <polygon points="50,20 54,24 52,29 48,29 46,24" fill="#facc15"/>
        <!-- Ojos y Nariz -->
        <circle cx="43" cy="44" r="3" fill="#0f172a"/>
        <circle cx="57" cy="44" r="3" fill="#0f172a"/>
        <ellipse cx="50" cy="51" rx="4.5" ry="3" fill="#0f172a"/>
        <path d="M44,57 Q50,62 56,57" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'yoshi',
    name: 'Dino Yoshi',
    title: 'Dino Saltarín',
    emoji: '🦖',
    color: '#22c55e',
    accent: '#ef4444',
    trailColor: '#4ade80',
    baseSpeedMultiplier: 0.95,
    catchphrase: '¡Yoshi! ¡A correr saltando obstáculos!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Kart Huevo Verde y Blanco -->
        <rect x="20" y="72" width="60" height="12" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="2.5"/>
        <circle cx="34" cy="78" r="4" fill="#22c55e"/>
        <circle cx="52" cy="78" r="4" fill="#22c55e"/>
        <circle cx="68" cy="78" r="4" fill="#22c55e"/>
        <circle cx="30" cy="86" r="7" fill="#ef4444" stroke="#1e293b" stroke-width="2"/>
        <circle cx="70" cy="86" r="7" fill="#ef4444" stroke="#1e293b" stroke-width="2"/>
        <!-- Cresta Roja -->
        <polygon points="28,36 20,30 30,26" fill="#ef4444" stroke="#1e293b" stroke-width="1.8"/>
        <polygon points="26,46 17,42 27,38" fill="#ef4444" stroke="#1e293b" stroke-width="1.8"/>
        <!-- Cabeza y Gran Nariz Redonda de Yoshi -->
        <circle cx="44" cy="46" r="18" fill="#22c55e" stroke="#1e293b" stroke-width="2.5"/>
        <!-- Ojos saltones -->
        <ellipse cx="44" cy="28" rx="6" ry="8" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
        <circle cx="46" cy="28" r="2.8" fill="#0f172a"/>
        <ellipse cx="54" cy="28" rx="6" ry="8" fill="#ffffff" stroke="#1e293b" stroke-width="2.2"/>
        <circle cx="56" cy="28" r="2.8" fill="#0f172a"/>
        <!-- Súper Nariz Verde -->
        <circle cx="66" cy="44" r="14" fill="#22c55e" stroke="#1e293b" stroke-width="2.5"/>
        <!-- Moflete Blanco -->
        <ellipse cx="46" cy="54" rx="12" ry="8" fill="#ffffff"/>
        <path d="M44,54 Q52,60 60,54" fill="none" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'unicorn',
    name: 'Unicornio Mágico',
    title: 'Estrella Arcoíris',
    emoji: '🦄',
    color: '#ec4899',
    accent: '#a855f7',
    trailColor: '#f472b6',
    baseSpeedMultiplier: 0.90,
    catchphrase: '¡Brillo mágico y arcoíris a toda potencia!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Nube Rosa con Arcoíris -->
        <path d="M16,78 Q24,68 38,72 Q50,65 64,72 Q78,68 84,78 L80,86 L20,86 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="2.5"/>
        <!-- Crin Arcoíris -->
        <path d="M24,36 Q14,44 26,56" stroke="#ec4899" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M26,42 Q18,50 28,62" stroke="#38bdf8" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M28,48 Q20,56 32,68" stroke="#facc15" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- Cabeza Blanca de Unicornio -->
        <circle cx="50" cy="46" r="19" fill="#ffffff" stroke="#1e293b" stroke-width="2.5"/>
        <ellipse cx="64" cy="50" rx="11" ry="9" fill="#fce7f3" stroke="#1e293b" stroke-width="2.2"/>
        <!-- Cuerno Dorado Mágico -->
        <polygon points="48,28 58,6 57,30" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
        <!-- Ojo Feliz y Colorete -->
        <circle cx="50" cy="42" r="3.5" fill="#0f172a"/>
        <circle cx="51" cy="41" r="1.2" fill="#ffffff"/>
        <circle cx="48" cy="52" r="4" fill="#f472b6"/>
      </svg>
    `
  },
  {
    id: 'kirby',
    name: 'Kirby',
    title: 'Estrella Warp',
    emoji: '⭐',
    color: '#f472b6',
    accent: '#facc15',
    trailColor: '#fde047',
    baseSpeedMultiplier: 0.98,
    catchphrase: '¡Poyo! ¡Volando en mi Estrella Warp!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Estrella Warp Amarilla Debajo -->
        <polygon points="50,62 64,70 86,72 68,82 74,95 50,86 26,95 32,82 14,72 36,70" fill="#facc15" stroke="#ca8a04" stroke-width="2.5"/>
        <!-- Cuerpo Redondo Rosado de Kirby -->
        <circle cx="50" cy="46" r="24" fill="#f9a8d4" stroke="#db2777" stroke-width="2.6"/>
        <!-- Brazos saludando -->
        <ellipse cx="25" cy="44" rx="7" ry="5" fill="#f9a8d4" stroke="#db2777" stroke-width="2.2"/>
        <ellipse cx="75" cy="40" rx="7" ry="5" fill="#f9a8d4" stroke="#db2777" stroke-width="2.2"/>
        <!-- Zapatos Rojos -->
        <ellipse cx="38" cy="68" rx="9" ry="5" fill="#e11d48" stroke="#1e293b" stroke-width="2"/>
        <ellipse cx="62" cy="68" rx="9" ry="5" fill="#e11d48" stroke="#1e293b" stroke-width="2"/>
        <!-- Ojos Azules Ovalados -->
        <ellipse cx="44" cy="40" rx="3" ry="6.5" fill="#1d4ed8"/>
        <ellipse cx="44" cy="37.5" rx="1.8" ry="2.5" fill="#ffffff"/>
        <ellipse cx="56" cy="40" rx="3" ry="6.5" fill="#1d4ed8"/>
        <ellipse cx="56" cy="37.5" rx="1.8" ry="2.5" fill="#ffffff"/>
        <!-- Mejillas Sonrojadas y Boquita Feliz -->
        <ellipse cx="36" cy="47" rx="4" ry="2.2" fill="#f43f5e"/>
        <ellipse cx="64" cy="47" rx="4" ry="2.2" fill="#f43f5e"/>
        <path d="M46,48 Q50,55 54,48 Z" fill="#e11d48"/>
      </svg>
    `
  },
  {
    id: 'bumblebee',
    name: 'Bumblebee',
    title: 'Robot Bólido',
    emoji: '🤖',
    color: '#eab308',
    accent: '#0f172a',
    trailColor: '#38bdf8',
    baseSpeedMultiplier: 1.07,
    catchphrase: '¡Autobots, transfórmense y aceleren!',
    svg: `
      <svg viewBox="0 0 100 100">
        <!-- Chasis Deportivo Amarillo y Negro -->
        <rect x="16" y="70" width="68" height="14" rx="6" fill="#facc15" stroke="#1e293b" stroke-width="2.5"/>
        <rect x="38" y="70" width="8" height="14" fill="#0f172a"/>
        <rect x="54" y="70" width="8" height="14" fill="#0f172a"/>
        <circle cx="28" cy="86" r="7.5" fill="#0f172a"/><circle cx="28" cy="86" r="3" fill="#38bdf8"/>
        <circle cx="72" cy="86" r="7.5" fill="#0f172a"/><circle cx="72" cy="86" r="3" fill="#38bdf8"/>
        <!-- Casco Robot Amarillo -->
        <polygon points="30,24 50,16 70,24 74,56 50,66 26,56" fill="#facc15" stroke="#1e293b" stroke-width="2.8"/>
        <!-- Cuernos/Antenas y Franja Negra -->
        <polygon points="30,24 22,12 36,20" fill="#facc15" stroke="#1e293b" stroke-width="2.2"/>
        <polygon points="70,24 78,12 64,20" fill="#facc15" stroke="#1e293b" stroke-width="2.2"/>
        <rect x="46" y="17" width="8" height="16" fill="#1e293b"/>
        <!-- Cara Plateada y Ojos Cyber Azules -->
        <polygon points="34,36 66,36 62,58 50,63 38,58" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>
        <rect x="37" y="40" width="10" height="5" rx="2" fill="#38bdf8"/>
        <rect x="53" y="40" width="10" height="5" rx="2" fill="#38bdf8"/>
      </svg>
    `
  }
];

const TRACKS = [
  {
    id: 'mushroom',
    name: '🍄 Reino Champiñón',
    skyTop: '#0284c7',
    skyBottom: '#bae6fd',
    hillColor: '#22c55e',
    roadColor: '#475569',
    kerbA: '#ef4444',
    kerbB: '#ffffff',
    decorEmoji: ['🍄', '⭐', '🐢', '🌻']
  },
  {
    id: 'future',
    name: '🔔 Ciudad Doraemon',
    skyTop: '#1e1b4b',
    skyBottom: '#3b82f6',
    hillColor: '#334155',
    roadColor: '#1e293b',
    kerbA: '#38bdf8',
    kerbB: '#ffffff',
    decorEmoji: ['🔔', '🏢', '🛸', '🚪']
  },
  {
    id: 'stadium',
    name: '⚡ Estadio Pokémon',
    skyTop: '#0f172a',
    skyBottom: '#1d4ed8',
    hillColor: '#15803d',
    roadColor: '#334155',
    kerbA: '#facc15',
    kerbB: '#ef4444',
    decorEmoji: ['⚡', '🏆', '🔥', '✨']
  },
  {
    id: 'dragon',
    name: '🐉 Montañas Kinton',
    skyTop: '#7c2d12',
    skyBottom: '#fb923c',
    hillColor: '#b45309',
    roadColor: '#44403c',
    kerbA: '#facc15',
    kerbB: '#ea580c',
    decorEmoji: ['🐉', '☁️', '🟠', '⛰️']
  },
  {
    id: 'rainbow',
    name: '🌈 Pista Arcoíris',
    skyTop: '#090d16',
    skyBottom: '#311042',
    hillColor: '#4c1d95',
    roadColor: '#2e1065',
    kerbA: '#ec4899',
    kerbB: '#38bdf8',
    decorEmoji: ['🌈', '🪐', '🌟', '🚀']
  }
];
