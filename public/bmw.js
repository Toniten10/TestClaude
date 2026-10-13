(() => {
  const root = document.getElementById("bmw");
  if (!root) return;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------------------------
  // Gama BMW México 2026. Precios "desde" de referencia (autosnuevos.mx / my-car.mx).
  // fam: números con los que "resuena" el modelo (serie o la cifra de su nombre).
  // est: precio estimado solo para el cálculo cuando no hay precio publicado.
  // ---------------------------------------------------------------------------
  const MODELS = [
    { id: "118i", name: "BMW 118i", line: "Serie 1", body: "hatch", power: "gas", fam: [1], price: 799900, tagline: "Compacto, ágil y hecho para la ciudad." },
    { id: "218gc", name: "BMW 218 Gran Coupé", line: "Serie 2", body: "sedan", power: "gas", fam: [2], price: 849900, tagline: "Silueta de coupé con cuatro puertas." },
    { id: "220i", name: "BMW 220i Coupé", line: "Serie 2", body: "coupe", power: "gas", fam: [2], price: 925900, tagline: "Tracción trasera y manejo puro." },
    { id: "m2", name: "BMW M2 Coupé", line: "BMW M", body: "coupe", power: "gas", m: true, fam: [2], price: 1764900, tagline: "El M más compacto y el más salvaje." },
    { id: "x1", name: "BMW X1 sDrive18i", line: "X1", body: "suv", power: "gas", fam: [1], price: 969900, tagline: "La SUV que va contigo a todos lados." },
    { id: "ix1", name: "BMW iX1", line: "BMW i", body: "suv", power: "ev", fam: [1, 0], price: null, est: 1250000, tagline: "SUV compacta 100% eléctrica." },
    { id: "x2", name: "BMW X2", line: "X2", body: "suvcoupe", power: "gas", fam: [2], price: null, est: 1100000, tagline: "SUV con caída de coupé y mucha actitud." },
    { id: "320i", name: "BMW 320i", line: "Serie 3", body: "sedan", power: "gas", fam: [3], price: 1002900, tagline: "El sedán deportivo de referencia." },
    { id: "330e", name: "BMW 330e", line: "Serie 3", body: "sedan", power: "phev", fam: [3], price: 1319900, tagline: "Híbrido conectable: eléctrico entre semana, gasolina en carretera." },
    { id: "m340i", name: "BMW M340i xDrive", line: "Serie 3", body: "sedan", power: "gas", m: true, fam: [3], price: 1439900, tagline: "Seis cilindros en línea con tracción total." },
    { id: "m3", name: "BMW M3 Competition", line: "BMW M", body: "sedan", power: "gas", m: true, fam: [3], price: 2214900, tagline: "Un sedán familiar con alma de pista." },
    { id: "x3", name: "BMW X3", line: "X3", body: "suv", power: "gas", fam: [3], price: 1194900, tagline: "La SUV mediana más equilibrada de la gama." },
    { id: "430i", name: "BMW 430i Coupé", line: "Serie 4", body: "coupe", power: "gas", fam: [4], price: 1219900, tagline: "Elegancia de dos puertas para el día a día." },
    { id: "m440i-cab", name: "BMW M440i xDrive Convertible", line: "Serie 4", body: "convertible", power: "gas", m: true, fam: [4], price: 1770900, tagline: "Capota abierta y seis cilindros." },
    { id: "i4", name: "BMW i4 eDrive40", line: "BMW i", body: "sedan", power: "ev", fam: [4, 0], price: 1480000, tagline: "Gran Coupé eléctrico, silencioso y rápido." },
    { id: "z4", name: "BMW Z4 M40i", line: "Z4", body: "roadster", power: "gas", m: true, fam: [4], price: 1525000, tagline: "Roadster de dos plazas para las curvas." },
    { id: "i5", name: "BMW i5 eDrive40", line: "BMW i", body: "sedan", power: "ev", fam: [5, 0], price: 1599900, tagline: "Ejecutivo y totalmente eléctrico." },
    { id: "x5", name: "BMW X5", line: "X5", body: "suv", power: "gas", fam: [5], price: 1694900, tagline: "La SUV grande que lo hace todo bien." },
    { id: "x6", name: "BMW X6", line: "X6", body: "suvcoupe", power: "gas", fam: [6], price: null, est: 2300000, tagline: "La SUV coupé original, imposible de ignorar." },
    { id: "750e", name: "BMW 750e xDrive", line: "Serie 7", body: "sedan", power: "phev", fam: [7], price: 2730900, tagline: "Lujo de primera clase con motor híbrido." },
    { id: "x7", name: "BMW X7", line: "X7", body: "suv", power: "gas", fam: [7], price: null, est: 2800000, tagline: "Tres filas de asientos y presencia total." },
    { id: "m850i", name: "BMW M850i xDrive Gran Coupé", line: "Serie 8", body: "coupe", power: "gas", m: true, fam: [8], price: 2504900, tagline: "V8, cuatro puertas y gran turismo." },
    { id: "ix", name: "BMW iX xDrive45", line: "BMW i", body: "suv", power: "ev", fam: [9, 0], price: 1799900, tagline: "El buque insignia eléctrico de BMW." },
    { id: "xm", name: "BMW XM", line: "BMW M", body: "suvcoupe", power: "phev", m: true, fam: [9], price: 4204900, tagline: "La SUV M más extrema, híbrida y de 600+ hp." },
  ];

  const COLORS = [
    { name: "Blanco Alpino", hex: "#eef0f2" },
    { name: "Negro Zafiro", hex: "#14161b" },
    { name: "Gris Brooklyn", hex: "#7c8287" },
    { name: "Plata Glaciar", hex: "#b9bec4" },
    { name: "Azul Portimao", hex: "#1f5fbf" },
    { name: "Rojo Toronto", hex: "#b3121c" },
    { name: "Verde Isla de Man", hex: "#1f4d3a" },
    { name: "Amarillo São Paulo", hex: "#f2c200" },
    { name: "Naranja Fuego", hex: "#e2561b" },
    { name: "Morado Twilight", hex: "#4b2a6e" },
  ];

  const BODY_LABEL = { hatch: "Hatchback", sedan: "Sedán", coupe: "Coupé", convertible: "Convertible", roadster: "Roadster", suv: "SUV", suvcoupe: "SUV coupé" };
  const POWER_LABEL = { gas: "Gasolina", phev: "Híbrido conectable", ev: "100% eléctrico" };
  const money = (v) => "$" + v.toLocaleString("es-MX") + " MXN";

  // ---------------------------------------------------------------------------
  // Cómo se elige el coche
  // ---------------------------------------------------------------------------
  const SIGNS = [
    // [nombre, elemento, mes, día de inicio]
    ["Capricornio", "tierra", 1, 1], ["Acuario", "aire", 1, 20], ["Piscis", "agua", 2, 19],
    ["Aries", "fuego", 3, 21], ["Tauro", "tierra", 4, 20], ["Géminis", "aire", 5, 21],
    ["Cáncer", "agua", 6, 21], ["Leo", "fuego", 7, 23], ["Virgo", "tierra", 8, 23],
    ["Libra", "aire", 9, 23], ["Escorpio", "agua", 10, 23], ["Sagitario", "fuego", 11, 22],
    ["Capricornio", "tierra", 12, 22],
  ];
  const zodiac = (m, d) => {
    let sign = SIGNS[0];
    for (const s of SIGNS) if (m > s[2] || (m === s[2] && d >= s[3])) sign = s;
    return { name: sign[0], element: sign[1] };
  };
  const ELEMENT_TEXT = {
    fuego: "Los signos de fuego piden potencia: sumamos puntos a los modelos M.",
    tierra: "Los signos de tierra son prácticos: sumamos puntos a las SUV.",
    aire: "Los signos de aire buscan libertad: sumamos puntos a coupés y descapotables.",
    agua: "Los signos de agua fluyen con el futuro: sumamos puntos a eléctricos e híbridos.",
  };

  // Número favorito → número de serie. 1 a 8 van directo; los demás se reducen sumando dígitos.
  function seriesFromNumber(n) {
    const steps = [n];
    let v = n;
    while (v > 9) {
      v = String(v).split("").reduce((a, b) => a + Number(b), 0);
      steps.push(v);
    }
    return { value: v, steps };
  }

  function colorMood(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    let h = 0;
    if (d) {
      if (max === r) h = 60 * (((g - b) / d) % 6);
      else if (max === g) h = 60 * ((b - r) / d + 2);
      else h = 60 * ((r - g) / d + 4);
      if (h < 0) h += 360;
    }
    if (s < 0.18 || l < 0.12 || l > 0.9) return "neutro";
    if (h < 65 || h >= 330) return "calido";
    if (h < 200) return "natural";
    if (h < 270) return "azul";
    return "morado";
  }
  const MOOD_TEXT = {
    neutro: "Los tonos neutros son elegancia clásica: favorecen los modelos de lujo.",
    calido: "Un color cálido pide carácter deportivo: favorece a los BMW M.",
    natural: "Los verdes y turquesas conectan con lo eléctrico.",
    azul: "El azul es tecnología y deportividad: favorece eléctricos y M.",
    morado: "El morado es atrevido: favorece siluetas coupé y descapotables.",
  };

  // Rango de precio cómodo según la edad.
  function budgetFor(age) {
    if (age < 25) return [700000, 1100000];
    if (age < 35) return [900000, 1650000];
    if (age < 50) return [1300000, 2600000];
    return [1600000, 4500000];
  }

  function recommend({ number, birth, color }) {
    const series = seriesFromNumber(number);
    const [y, m, d] = birth.split("-").map(Number);
    const sign = zodiac(m, d);
    const now = new Date();
    let age = now.getFullYear() - y;
    if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--;
    const budget = budgetFor(age);
    const mood = colorMood(color.hex);

    const scored = MODELS.map((car, i) => {
      const price = car.price ?? car.est;
      let score = 0;
      if (car.fam.includes(series.value)) score += 6;
      const el = sign.element;
      if (el === "fuego" && car.m) score += 4;
      if (el === "fuego" && car.body === "coupe") score += 1;
      if (el === "tierra" && (car.body === "suv" || car.body === "suvcoupe")) score += 4;
      if (el === "aire" && ["coupe", "convertible", "roadster"].includes(car.body)) score += 4;
      if (el === "agua" && car.power === "ev") score += 4;
      if (el === "agua" && car.power === "phev") score += 2;
      if (mood === "calido" && car.m) score += 2;
      if (mood === "natural" && car.power !== "gas") score += 2;
      if (mood === "azul" && (car.power === "ev" || car.m)) score += 2;
      if (mood === "neutro" && price >= 1600000) score += 2;
      if (mood === "morado" && ["coupe", "convertible", "roadster", "suvcoupe"].includes(car.body)) score += 2;
      if (price >= budget[0] && price <= budget[1]) score += 3;
      else if (price > budget[1] * 1.6) score -= 2;
      // Desempate estable: tu día de nacimiento decide entre empatados.
      score += ((d * 7 + number + i * 3) % 10) / 100;
      return { car, score };
    }).sort((a, b) => b.score - a.score);

    const best = scored[0].car;
    const why = [];
    const numText = series.value === 0 ? "El 0 es el inicio de todo: la gama eléctrica i."
      : series.value === 9 ? "El 9 está fuera de serie: XM e iX."
      : `Apunta a la familia ${series.value}.`;
    const chain = series.steps.length > 1 ? series.steps.join(" → ") + ". " : "";
    const fit = best.fam.includes(series.value) ? " Tu coche es parte de ella." : " Esta vez tus otras respuestas pesaron más.";
    why.push(["Tu número", chain + numText + fit]);
    why.push(["Tu signo", `${sign.name} (${sign.element}). ${ELEMENT_TEXT[sign.element]}`]);
    why.push(["Tu edad", `${age} años: buscamos entre ${money(budget[0]).replace(" MXN", "")} y ${money(budget[1])}.`]);
    why.push(["Tu color", `${color.name}. ${MOOD_TEXT[mood]}`]);
    return { best, alts: scored.slice(1, 3).map((s) => s.car), why };
  }

  // ---------------------------------------------------------------------------
  // Dibujo del coche (perfil lateral). La carrocería toma el color elegido.
  // ---------------------------------------------------------------------------
  const FRONT = "C555,110 592,116 607,128 C617,137 619,157 613,172 L602,189";
  const SHAPES = {
    sedan: {
      body: `M30,170 C28,150 32,132 44,124 L70,118 C110,112 150,110 176,108 C205,80 240,62 290,58 L400,56 C440,58 470,78 505,104 ${FRONT} L36,189 C32,182 30,176 30,170 Z`,
      glass: ["M190,108 C214,86 244,72 288,68 L336,67 L336,108 Z", "M346,67 L394,66 C426,68 452,84 480,107 L346,108 Z"],
      door: [341], r: 44,
    },
    coupe: {
      body: `M30,170 C28,150 34,132 48,126 L80,122 C130,116 170,108 210,90 C240,74 270,66 305,64 L380,64 C425,66 458,86 495,106 ${FRONT} L36,189 C32,182 30,176 30,170 Z`,
      glass: ["M222,100 C248,82 272,73 300,71 L300,104 Z", "M308,71 L380,70 C414,72 444,88 470,106 L308,106 Z"],
      door: [], r: 44,
    },
    convertible: {
      body: `M30,170 C28,150 34,132 48,126 L90,118 C150,112 260,110 420,110 C460,110 488,104 505,104 ${FRONT} L36,189 C32,182 30,176 30,170 Z`,
      glass: ["M440,110 L470,108 L418,70 L408,72 Z"],
      seats: ["M290,110 L292,86 Q294,80 302,80 L314,80 Q320,80 320,88 L318,110 Z", "M210,110 L212,90 Q214,84 222,84 L232,84 Q238,84 238,92 L236,110 Z"],
      door: [], r: 44,
    },
    roadster: {
      body: `M40,168 C38,150 44,134 58,128 L100,120 C150,114 220,112 330,112 C380,112 420,108 470,104 ${FRONT} L46,189 C42,182 40,176 40,168 Z`,
      glass: ["M372,112 L400,110 L350,74 L340,76 Z"],
      seats: ["M238,112 L240,86 Q242,80 250,80 L262,80 Q268,80 268,88 L266,112 Z", "M186,112 L188,92 Q190,86 198,86 L208,86 Q214,86 214,94 L212,112 Z"],
      door: [], r: 44,
    },
    hatch: {
      body: `M52,170 C48,145 52,118 64,104 L82,96 C100,70 130,56 170,54 L380,54 C425,58 455,80 488,104 ${FRONT} L58,189 C54,182 52,176 52,170 Z`,
      glass: ["M98,98 C112,76 135,62 172,60 L230,60 L230,100 Z", "M238,60 L330,59 L330,102 L238,101 Z", "M338,59 L378,60 C412,64 440,82 465,103 L338,103 Z"],
      door: [334], r: 44,
    },
    suv: {
      body: `M28,168 C26,140 30,110 40,98 L60,92 C74,70 92,52 130,46 L400,40 C440,42 470,70 500,96 C550,104 594,110 609,122 C619,132 621,156 615,172 L604,191 L34,191 C30,184 28,176 28,168 Z`,
      glass: ["M90,94 C98,72 112,58 136,54 L190,52 L190,94 Z", "M198,51 L340,50 L340,94 L198,94 Z", "M348,50 L398,50 C430,52 455,74 478,95 L348,95 Z"],
      door: [194, 344], r: 48, rails: true,
    },
    suvcoupe: {
      body: `M28,168 C26,140 32,118 46,106 L70,100 C110,70 150,50 200,44 L390,42 C435,44 465,70 498,96 C550,104 594,110 609,122 C619,132 621,156 615,172 L604,191 L34,191 C30,184 28,176 28,168 Z`,
      glass: ["M92,100 C125,72 160,56 200,52 L262,51 L262,98 Z", "M270,51 L345,50 L345,98 L270,98 Z", "M352,50 L392,50 C428,52 455,74 478,97 L352,98 Z"],
      door: [266, 348], r: 48,
    },
  };

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const f = (c) => Math.max(0, Math.min(255, Math.round(c + amt * 255)));
    return "#" + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map((c) => c.toString(16).padStart(2, "0")).join("");
  }

  function carSVG(car, hex) {
    const s = SHAPES[car.body];
    const r = s.r;
    const wc = 232 - r; // centro de las ruedas: la llanta toca el piso
    const wheels = [150, 490];
    const dark = shade(hex, -0.18);
    const rear = car.body === "hatch" ? 52 : car.body === "roadster" ? 40 : 30;
    const doorTop = car.body.startsWith("suv") ? 98 : 110;
    return `
<svg viewBox="0 0 640 260" role="img" aria-label="${car.name} en ${chosen.name}">
  <defs>
    <linearGradient id="car-shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".38"/>
      <stop offset=".35" stop-color="#fff" stop-opacity=".06"/>
      <stop offset=".62" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".45"/>
    </linearGradient>
    <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2b3442"/><stop offset=".55" stop-color="#0d1118"/><stop offset="1" stop-color="#1b2330"/>
    </linearGradient>
    <radialGradient id="car-floor" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#000" stop-opacity=".8"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="car-reflect" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${hex}" stop-opacity=".22"/><stop offset="1" stop-color="${hex}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <ellipse cx="320" cy="232" rx="300" ry="14" fill="url(#car-floor)"/>
  <rect x="60" y="234" width="520" height="22" fill="url(#car-reflect)"/>
  <g class="car">
    <path class="paint" d="${s.body}" fill="${hex}"/>
    <path d="${s.body}" fill="url(#car-shade)"/>
    ${wheels.map((x) => `<path d="M${x - r - 8},194 L${x - r - 8},${wc} A${r + 8},${r + 8} 0 0 1 ${x + r + 8},${wc} L${x + r + 8},194 Z" fill="#07080a"/>`).join("")}
    ${s.rails ? `<path d="M120,40 L396,38" stroke="#2a2d33" stroke-width="4" stroke-linecap="round"/>` : ""}
    ${(s.seats || []).map((p) => `<path d="${p}" fill="#14161a"/>`).join("")}
    ${s.glass.map((p) => `<path d="${p}" fill="url(#car-glass)"/>`).join("")}
    ${s.door.map((x) => `<path d="M${x},${doorTop} L${x + 2},178" stroke="${dark}" stroke-width="1.5"/>`).join("")}
    <path d="M52,132 C200,128 420,128 600,132" stroke="#fff" stroke-opacity=".28" stroke-width="1.5" fill="none"/>
    <path d="M70,160 C220,164 420,164 590,158" stroke="#000" stroke-opacity=".25" stroke-width="2" fill="none"/>
    <path d="M588,124 L608,130 L606,138 L586,134 Z" fill="#eaf3ff"/>
    <path d="M590,127 L604,131" stroke="#8ec5ff" stroke-width="1.5"/>
    <path d="M${rear + 2},130 L${rear + 18},128 L${rear + 20},142 L${rear + 4},144 Z" fill="#c4161c"/>
    <path d="M606,142 L614,144 L613,158 L605,156 Z" fill="#0b0c0f"/>
    ${wheels.map((x) => `
    <g transform="translate(${x - r},${wc - r})">
      <g class="wheel-spin"><use href="#bmw-rim" width="${r * 2}" height="${r * 2}"/></g>
    </g>`).join("")}
  </g>
</svg>`;
  }

  // ---------------------------------------------------------------------------
  // Bóveda: el rin se gira arrastrando o con el botón; dos vueltas la abren.
  // ---------------------------------------------------------------------------
  const vault = root.querySelector(".vault");
  const svg = root.querySelector(".vault-svg");
  const spins = svg.querySelectorAll(".spin");
  const progress = svg.querySelector(".progress");
  const spinBtn = root.querySelector("#spinBtn");
  const quiz = root.querySelector(".quiz");
  const result = root.querySelector(".result");
  const UNLOCK = 720;
  const CIRC = 2 * Math.PI * 112;
  progress.style.strokeDasharray = CIRC;

  let angle = 0, travelled = 0, opened = false;

  function setAngle(a) {
    angle = a;
    spins.forEach((g) => g.setAttribute("transform", `rotate(${angle})`));
    progress.style.strokeDashoffset = CIRC * (1 - Math.min(travelled / UNLOCK, 1));
  }

  function addTravel(delta) {
    if (opened) return;
    const before = Math.floor(travelled / 30);
    travelled += Math.abs(delta);
    if (Math.floor(travelled / 30) !== before && navigator.vibrate) navigator.vibrate(4);
    setAngle(angle + delta);
    if (travelled >= UNLOCK) openVault();
  }

  function openVault() {
    if (opened) return;
    opened = true;
    progress.style.strokeDashoffset = 0;
    vault.classList.add("open");
    setTimeout(() => {
      vault.hidden = true;
      quiz.hidden = false;
      requestAnimationFrame(() => quiz.classList.add("show"));
      quiz.querySelector(".q.active input")?.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 1200);
  }

  const center = () => {
    const r = svg.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  };
  let last = null;
  svg.addEventListener("pointerdown", (e) => {
    const [cx, cy] = center();
    last = Math.atan2(e.clientY - cy, e.clientX - cx);
    svg.setPointerCapture(e.pointerId);
    svg.classList.add("dragging");
  });
  svg.addEventListener("pointermove", (e) => {
    if (last === null) return;
    const [cx, cy] = center();
    const a = Math.atan2(e.clientY - cy, e.clientX - cx);
    let d = a - last;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    last = a;
    addTravel((d * 180) / Math.PI);
  });
  const endDrag = () => { last = null; svg.classList.remove("dragging"); };
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);
  svg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { addTravel(30); e.preventDefault(); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { addTravel(-30); e.preventDefault(); }
  });

  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    if (reduceMotion) { travelled = UNLOCK; openVault(); return; }
    const remaining = UNLOCK - travelled + 10;
    const start = performance.now(), dur = 2200;
    let prev = 0;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const frame = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const v = ease(t) * remaining;
      addTravel(v - prev);
      prev = v;
      if (t < 1 && !opened) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  });

  // ---------------------------------------------------------------------------
  // Preguntas
  // ---------------------------------------------------------------------------
  const qs = [...quiz.querySelectorAll(".q")];
  const bars = [...quiz.querySelectorAll(".steps span")];
  const prevBtn = quiz.querySelector("[data-prev]");
  const nextBtn = quiz.querySelector("[data-next]");
  const err = quiz.querySelector(".err");
  const numInput = quiz.querySelector("#fav-number");
  const dateInput = quiz.querySelector("#birth");
  const customInput = quiz.querySelector("#custom-color");
  const swatchBox = quiz.querySelector(".swatches");
  let step = 0;
  let chosen = null;

  dateInput.max = new Date().toISOString().slice(0, 10);

  swatchBox.innerHTML = COLORS.map((c, i) =>
    `<button type="button" class="swatch" role="radio" aria-checked="false" data-i="${i}" style="--c:${c.hex}"><i></i>${c.name}</button>`).join("");
  const swatchEls = [...swatchBox.children];
  function pickColor(c, el) {
    chosen = c;
    swatchEls.forEach((s) => s.setAttribute("aria-checked", String(s === el)));
    err.textContent = "";
  }
  swatchEls.forEach((el) => el.addEventListener("click", () => pickColor(COLORS[el.dataset.i], el)));
  customInput.addEventListener("input", () => pickColor({ name: "Color personalizado " + customInput.value.toUpperCase(), hex: customInput.value }, null));

  function showStep(i) {
    step = i;
    qs.forEach((q, j) => q.classList.toggle("active", j === i));
    bars.forEach((b, j) => b.classList.toggle("done", j <= i));
    prevBtn.style.visibility = i === 0 ? "hidden" : "visible";
    nextBtn.textContent = i === qs.length - 1 ? "Revelar mi BMW" : "Siguiente";
    err.textContent = "";
    qs[i].querySelector("input")?.focus({ preventScroll: true });
  }

  function validate() {
    if (step === 0) {
      const v = numInput.value.trim();
      if (!/^\d{1,6}$/.test(v)) return "Escribe un número entero entre 0 y 999999.";
    }
    if (step === 1) {
      if (!dateInput.value) return "Elige tu fecha de nacimiento.";
      const y = Number(dateInput.value.slice(0, 4));
      if (y < 1920 || dateInput.value > dateInput.max) return "Revisa la fecha: debe estar entre 1920 y hoy.";
    }
    if (step === 2 && !chosen) return "Elige un color.";
    return "";
  }

  nextBtn.addEventListener("click", () => {
    const e = validate();
    if (e) { err.textContent = e; return; }
    if (step < qs.length - 1) showStep(step + 1);
    else reveal();
  });
  prevBtn.addEventListener("click", () => showStep(Math.max(0, step - 1)));
  quiz.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") { e.preventDefault(); nextBtn.click(); }
  });

  // ---------------------------------------------------------------------------
  // Resultado
  // ---------------------------------------------------------------------------
  const stage = result.querySelector(".car-stage");
  const info = result.querySelector(".res-info");
  const whyList = result.querySelector(".why");
  const altRow = result.querySelector(".alts .row");

  function showCar(car) {
    stage.innerHTML = carSVG(car, chosen.hex);
    const g = stage.querySelector(".car");
    info.innerHTML = `
      <div class="match">Tu BMW ideal</div>
      <h3>${car.name}</h3>
      <p class="meta">${car.line} · ${BODY_LABEL[car.body]} · ${POWER_LABEL[car.power]}</p>
      <p class="meta">${car.tagline}</p>
      <p class="price">${car.price ? "Desde " + money(car.price) : "Precio por confirmar con distribuidor"}</p>
      <span class="paint-chip" style="--c:${chosen.hex}"><i></i>${chosen.name}</span>`;
    if (reduceMotion) { g.classList.add("in"); return; }
    g.getBoundingClientRect();
    g.classList.add("in", "rolling");
  }

  let current = null;
  function reveal() {
    current = recommend({ number: Number(numInput.value), birth: dateInput.value, color: chosen });
    quiz.classList.remove("show");
    setTimeout(() => {
      quiz.hidden = true;
      result.hidden = false;
      requestAnimationFrame(() => result.classList.add("show"));
      showCar(current.best);
      whyList.innerHTML = current.why.map(([t, d]) => `<li><b>${t}</b>${d}</li>`).join("");
      renderAlts(current.best);
    }, reduceMotion ? 0 : 400);
  }

  function renderAlts(shown) {
    const all = [current.best, ...current.alts].filter((c) => c !== shown);
    altRow.innerHTML = all.map((c) =>
      `<button type="button" class="alt" data-id="${c.id}">${c.name}<small>${BODY_LABEL[c.body]} · ${c.price ? "desde " + money(c.price) : "precio por confirmar"}</small></button>`).join("");
    altRow.querySelectorAll(".alt").forEach((b) => b.addEventListener("click", () => {
      const car = MODELS.find((m) => m.id === b.dataset.id);
      showCar(car);
      info.querySelector(".match").textContent = car === current.best ? "Tu BMW ideal" : "También va contigo";
      renderAlts(car);
    }));
  }

  result.querySelector("[data-repaint]").addEventListener("click", () => {
    result.classList.remove("show");
    result.hidden = true;
    quiz.hidden = false;
    showStep(2);
    requestAnimationFrame(() => quiz.classList.add("show"));
  });

  result.querySelector("[data-restart]").addEventListener("click", () => {
    result.classList.remove("show");
    result.hidden = true;
    opened = false;
    travelled = 0;
    setAngle(0);
    vault.hidden = false;
    vault.classList.remove("open");
    spinBtn.disabled = false;
    showStep(0);
    root.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });

  showStep(0);
  setAngle(0);
})();
