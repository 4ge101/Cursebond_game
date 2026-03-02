// ══════════════════════════════════════════════
// WEAPON DEFINITIONS
// ══════════════════════════════════════════════
const WEAPONS = {
  assault_rifle: {
    id: "assault_rifle",
    name: "ASSAULT RIFLE",
    icon: "🔫",
    desc: "Standard issue rapid-fire rifle. Reliable across all biomes.",
    damage: 1,
    fireRate: 260,
    maxAmmo: 30,
    reloadTime: 1800,
    spread: 0.01,
    bulletSpeed: 1.8,
    recoil: 0.016,
    dmgStat: 35,
    spdStat: 65,
    rangeStat: 60,
    price: 0,
    color: 0x222222,
    ownedByDefault: true,
  },
  shotgun: {
    id: "shotgun",
    name: "COMBAT SHOTGUN",
    icon: "🔫",
    desc: "Close-range devastator. 6 pellets per shot. Wreaks havoc in tight spaces.",
    damage: 1.5,
    fireRate: 750,
    maxAmmo: 8,
    reloadTime: 2400,
    spread: 0.06,
    bulletSpeed: 1.4,
    recoil: 0.05,
    pellets: 6,
    dmgStat: 85,
    spdStat: 30,
    rangeStat: 25,
    price: 150,
    color: 0x4a2a0a,
  },
  smg: {
    id: "smg",
    name: "RAPID SMG",
    icon: "🔫",
    desc: "Blazing fast submachine gun. Low damage but insane fire rate.",
    damage: 0.6,
    fireRate: 100,
    maxAmmo: 40,
    reloadTime: 1200,
    spread: 0.018,
    bulletSpeed: 2.0,
    recoil: 0.008,
    dmgStat: 25,
    spdStat: 95,
    rangeStat: 40,
    price: 200,
    color: 0x181818,
  },
  sniper: {
    id: "sniper",
    name: "VOID SNIPER",
    icon: "🎯",
    desc: "Single shot annihilator. One-taps most enemies. Extreme range.",
    damage: 5,
    fireRate: 1800,
    maxAmmo: 6,
    reloadTime: 2800,
    spread: 0.002,
    bulletSpeed: 3.5,
    recoil: 0.08,
    dmgStat: 100,
    spdStat: 10,
    rangeStat: 100,
    price: 350,
    color: 0x0a0808,
  },
  plasma: {
    id: "plasma",
    name: "PLASMA CANNON",
    icon: "⚡",
    desc: "Experimental energy weapon. Deals massive AoE damage to nearby enemies.",
    damage: 3,
    fireRate: 600,
    maxAmmo: 12,
    reloadTime: 2200,
    spread: 0.005,
    bulletSpeed: 2.2,
    recoil: 0.035,
    aoe: true,
    aoeRadius: 3.5,
    dmgStat: 90,
    spdStat: 45,
    rangeStat: 75,
    price: 500,
    color: 0x4400aa,
  },
  minigun: {
    id: "minigun",
    name: "DEATH MINIGUN",
    icon: "💥",
    desc: "Chaingun of pure destruction. Slow spin-up but unstoppable force.",
    damage: 0.8,
    fireRate: 80,
    maxAmmo: 120,
    reloadTime: 3500,
    spread: 0.025,
    bulletSpeed: 1.6,
    recoil: 0.006,
    dmgStat: 60,
    spdStat: 100,
    rangeStat: 50,
    price: 800,
    color: 0x333333,
  },
  rocket: {
    id: "rocket",
    name: "ROCKET LAUNCHER",
    icon: "🚀",
    desc: "High-explosive rocket launcher. Massive splash damage. Ammo is precious.",
    damage: 8,
    fireRate: 2500,
    maxAmmo: 4,
    reloadTime: 3200,
    spread: 0.003,
    bulletSpeed: 1.2,
    recoil: 0.12,
    aoe: true,
    aoeRadius: 6.0,
    dmgStat: 100,
    spdStat: 8,
    rangeStat: 80,
    price: 1200,
    color: 0x5a2a0a,
  },
};

const CONSUMABLES = {
  medkit: {
    id: "medkit",
    name: "MEDKIT",
    icon: "💊",
    desc: "Restores 50 HP",
    price: 80,
    effect: "heal",
    value: 50,
  },
  ammo_pack: {
    id: "ammo_pack",
    name: "AMMO PACK",
    icon: "📦",
    desc: "Refill all ammo",
    price: 60,
    effect: "ammo",
  },
  speed_boost: {
    id: "speed_boost",
    name: "SPEED BOOST",
    icon: "⚡",
    desc: "Double speed 30s",
    price: 120,
    effect: "speed",
    duration: 30,
  },
  damage_amp: {
    id: "damage_amp",
    name: "DAMAGE AMP",
    icon: "🔥",
    desc: "3x damage 20s",
    price: 150,
    effect: "damage",
    duration: 20,
  },
  shield: {
    id: "shield",
    name: "SHIELD",
    icon: "🛡️",
    desc: "Absorbs 50 damage",
    price: 180,
    effect: "shield",
    value: 50,
  },
};

// ══════════════════════════════════════════════
// PLAYER STATE
// ══════════════════════════════════════════════
let gold = 0,
  totalGoldEarned = 0,
  shotsFired = 0;
let playerInventory = {
  weapons: ["assault_rifle"],
  consumables: {},
  activeWeapon: "assault_rifle",
};
let activeEffects = { speed: 0, damage: 0, shield: 0 };
let shopOpen = false,
  invOpen = false;

// ══════════════════════════════════════════════
// BIOME DEFINITIONS
// ══════════════════════════════════════════════
const BIOMES = {
  jungle: {
    name: "🌿 JUNGLE",
    nameColor: "#00ff44",
    sub: "TROPICAL RAINFOREST",
    fogColor: 0x0a1508,
    fogDensity: 0.028,
    skyColor: 0x030803,
    groundColor: 0x122810,
    groundColor2: 0x0e2008,
    ambientColor: 0x1a3318,
    ambientIntensity: 1.1,
    sunColor: 0x88ff44,
    sunIntensity: 1.4,
    hemiSkyColor: 0x003300,
    hemiGroundColor: 0x060a03,
    particleColor: "#88ff44",
    particleType: "firefly",
    waveColor: "#00ff88",
    waveGlow: "#00ff44",
    buildScene: buildJungle,
  },
  snow: {
    name: "❄️ ARCTIC",
    nameColor: "#aaddff",
    sub: "FROZEN TUNDRA",
    fogColor: 0x8ab4cc,
    fogDensity: 0.022,
    skyColor: 0x4a6a88,
    groundColor: 0xddeeff,
    groundColor2: 0xc8ddf0,
    ambientColor: 0x334455,
    ambientIntensity: 1.3,
    sunColor: 0xccddff,
    sunIntensity: 1.1,
    hemiSkyColor: 0x334466,
    hemiGroundColor: 0x223344,
    particleColor: "#aaddff",
    particleType: "snow",
    waveColor: "#aaddff",
    waveGlow: "#6699cc",
    buildScene: buildSnow,
  },
  hills: {
    name: "⛰️ HIGHLANDS",
    nameColor: "#ffaa44",
    sub: "ROCKY HIGHLANDS",
    fogColor: 0x1a120a,
    fogDensity: 0.02,
    skyColor: 0x0d0805,
    groundColor: 0x5a3a1a,
    groundColor2: 0x3a2210,
    ambientColor: 0x2a1a08,
    ambientIntensity: 1.0,
    sunColor: 0xffaa44,
    sunIntensity: 1.5,
    hemiSkyColor: 0x331a00,
    hemiGroundColor: 0x110800,
    particleColor: "#ffaa44",
    particleType: "ember",
    waveColor: "#ffaa44",
    waveGlow: "#ff7700",
    buildScene: buildHills,
  },
  desert: {
    name: "🏜️ DESERT",
    nameColor: "#ffdd88",
    sub: "SCORCHED WASTELAND",
    fogColor: 0x2a1a08,
    fogDensity: 0.018,
    skyColor: 0x1a0e05,
    groundColor: 0xd4a855,
    groundColor2: 0xba9040,
    ambientColor: 0x3a2808,
    ambientIntensity: 1.2,
    sunColor: 0xffdd44,
    sunIntensity: 2.0,
    hemiSkyColor: 0x331a00,
    hemiGroundColor: 0x220f00,
    particleColor: "#ffcc44",
    particleType: "dust",
    waveColor: "#ffdd88",
    waveGlow: "#ffaa00",
    buildScene: buildDesert,
  },
  swamp: {
    name: "🌫️ SWAMP",
    nameColor: "#88ff99",
    sub: "MURKY WETLANDS",
    fogColor: 0x0a1a0a,
    fogDensity: 0.038,
    skyColor: 0x050c05,
    groundColor: 0x1a2a12,
    groundColor2: 0x121e0c,
    ambientColor: 0x0d1a0d,
    ambientIntensity: 0.9,
    sunColor: 0x66aa44,
    sunIntensity: 0.8,
    hemiSkyColor: 0x112211,
    hemiGroundColor: 0x080d04,
    particleColor: "#55ff77",
    particleType: "firefly",
    waveColor: "#88ff99",
    waveGlow: "#44cc55",
    buildScene: buildSwamp,
  },
  lava: {
    name: "🌋 INFERNO",
    nameColor: "#ff3300",
    sub: "LAVA HELLSCAPE",
    fogColor: 0x1a0500,
    fogDensity: 0.032,
    skyColor: 0x0d0200,
    groundColor: 0x3a0800,
    groundColor2: 0x220500,
    ambientColor: 0x3a0800,
    ambientIntensity: 1.4,
    sunColor: 0xff4400,
    sunIntensity: 2.2,
    hemiSkyColor: 0x440800,
    hemiGroundColor: 0x220200,
    particleColor: "#ff6600",
    particleType: "ember",
    waveColor: "#ff3300",
    waveGlow: "#ff2200",
    buildScene: buildLava,
  },
};
const BIOME_KEYS = Object.keys(BIOMES);

// ══════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════
let score = 0,
  health = 100,
  wave = 1,
  kills = 0,
  gameRunning = false;
let enemies = [],
  bullets = [],
  particles3d = [],
  dynamicObjects = [];
let lastShot = 0;
let targetAngleX = 0,
  targetAngleY = 0,
  smoothAngleX = 0,
  smoothAngleY = 0;
let gestureMode = false,
  handVisible = false;
let isFist = false,
  wasFist = false,
  wasPointing = false;
let rawHandX = 0.5,
  rawHandY = 0.5,
  smoothHandX = 0.5,
  smoothHandY = 0.5;
let comboKills = 0,
  comboTimer = 0;
let ammo = 30,
  maxAmmo = 30;
let isReloading = false,
  reloadStart = 0,
  reloadTime = 1800;
let crosshairSpread = 0;
let time = 0,
  lastFrameTime = 0,
  bobTime = 0;
let moving = false;
let currentBiomeKey = "jungle";
let weatherParticles = null,
  muzzleFlashMesh = null;
let colliders = [],
  hauntedLights = [];
let grassMeshes = [],
  grassWindTime = 0,
  wavingTrees = [],
  treeWindTime = 0;
// BOSS STATE
let bossActive = false,
  bossEntity = null,
  bossPhase = 1;
let bossSpawned = false;
let lavaFloors = [],
  lavaTime = 0;
const PLAYER_RADIUS = 0.55;

// ══════════════════════════════════════════════
// PERLIN NOISE
// ══════════════════════════════════════════════
const perm = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
})();
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
  return a + t * (b - a);
}
function grad(h, x, y) {
  const u = h < 8 ? x : y,
    v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
  return (h & 1 ? -u : u) + (h & 2 ? -v : v);
}
function noise2(x, y) {
  const X = Math.floor(x) & 255,
    Y = Math.floor(y) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  const u = fade(x),
    v = fade(y);
  const A = perm[X] + Y,
    B = perm[X + 1] + Y;
  return lerp(
    lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
    lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u),
    v,
  );
}
function fbm(x, y, o = 4, l = 2, g = 0.5) {
  let v = 0,
    a = 0.5,
    f = 1,
    m = 0;
  for (let i = 0; i < o; i++) {
    v += noise2(x * f, y * f) * a;
    m += a;
    a *= g;
    f *= l;
  }
  return v / m;
}

// ══════════════════════════════════════════════
// THREE SETUP
// ══════════════════════════════════════════════
const canvas = document.getElementById("gameCanvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.2;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a1508, 0.028);
renderer.setClearColor(0x0a1508);

const camera = new THREE.PerspectiveCamera(
  72,
  window.innerWidth / window.innerHeight,
  0.1,
  250,
);
camera.position.set(0, 1.7, 0);
camera.rotation.order = "YXZ";
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0x1a3318, 1.1);
scene.add(ambientLight);
const sunLight = new THREE.DirectionalLight(0x88ff44, 1.4);
sunLight.position.set(15, 30, 10);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.left = sunLight.shadow.camera.bottom = -80;
sunLight.shadow.camera.right = sunLight.shadow.camera.top = 80;
sunLight.shadow.camera.far = 120;
scene.add(sunLight);
const hemiLight = new THREE.HemisphereLight(0x003300, 0x060a03, 0.6);
scene.add(hemiLight);
const torch = new THREE.PointLight(0xff7700, 2.5, 20);
torch.position.set(0, 4, -2);
scene.add(torch);

const starsGeo = new THREE.BufferGeometry();
const sv = [];
for (let i = 0; i < 1000; i++) {
  const r = 185,
    t = Math.random() * Math.PI * 2,
    p = Math.random() * Math.PI;
  sv.push(
    r * Math.sin(p) * Math.cos(t),
    r * Math.cos(p),
    r * Math.sin(p) * Math.sin(t),
  );
}
starsGeo.setAttribute("position", new THREE.Float32BufferAttribute(sv, 3));
const starField = new THREE.Points(
  starsGeo,
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.9,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  }),
);
scene.add(starField);

const skyMesh = new THREE.Mesh(
  new THREE.SphereGeometry(200, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0x030803, side: THREE.BackSide }),
);
scene.add(skyMesh);

const moonMesh = new THREE.Mesh(
  new THREE.SphereGeometry(3.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xddddcc }),
);
moonMesh.position.set(-60, 85, -130);
scene.add(moonMesh);

let groundMesh = null;

// ══════════════════════════════════════════════
// GUN MODEL SYSTEM — Builds different gun shapes
// ══════════════════════════════════════════════
const gunGrp = new THREE.Group();
let muzzleLight = null;
let currentGunMeshes = [];

function buildGunModel(weaponId) {
  // Remove old gun meshes
  currentGunMeshes.forEach((m) => gunGrp.remove(m));
  currentGunMeshes = [];
  if (muzzleFlashMesh) gunGrp.remove(muzzleFlashMesh);
  if (muzzleLight) gunGrp.remove(muzzleLight);

  const w = WEAPONS[weaponId];
  const barrelMat = new THREE.MeshLambertMaterial({ color: w.color });
  const bodyMat = new THREE.MeshLambertMaterial({ color: w.color });
  const stockMat = new THREE.MeshLambertMaterial({ color: 0x3a1a0a });
  const accentMat = new THREE.MeshLambertMaterial({
    color:
      weaponId === "plasma"
        ? 0x6600ff
        : weaponId === "rocket"
          ? 0xaa3300
          : 0x111111,
  });

  if (weaponId === "assault_rifle" || weaponId === "smg") {
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.04, 0.7, 8),
      barrelMat,
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.35;
    gunGrp.add(barrel);
    currentGunMeshes.push(barrel);
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(
        weaponId === "smg" ? 0.1 : 0.12,
        weaponId === "smg" ? 0.14 : 0.18,
        0.45,
      ),
      bodyMat,
    );
    body.position.set(0, -0.03, -0.05);
    gunGrp.add(body);
    currentGunMeshes.push(body);
    const stock = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.14, 0.32),
      stockMat,
    );
    stock.position.set(0, -0.05, 0.22);
    gunGrp.add(stock);
    currentGunMeshes.push(stock);
    if (weaponId === "smg") {
      const mag = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.22, 0.06),
        bodyMat,
      );
      mag.position.set(0, -0.18, -0.05);
      gunGrp.add(mag);
      currentGunMeshes.push(mag);
    }
  } else if (weaponId === "shotgun") {
    const barrel1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.05, 0.75, 7),
      barrelMat,
    );
    barrel1.rotation.x = Math.PI / 2;
    barrel1.position.set(-0.04, -0.01, -0.38);
    gunGrp.add(barrel1);
    currentGunMeshes.push(barrel1);
    const barrel2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.05, 0.75, 7),
      barrelMat,
    );
    barrel2.rotation.x = Math.PI / 2;
    barrel2.position.set(0.04, -0.01, -0.38);
    gunGrp.add(barrel2);
    currentGunMeshes.push(barrel2);
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.14, 0.55),
      bodyMat,
    );
    body.position.set(0, -0.02, -0.03);
    gunGrp.add(body);
    currentGunMeshes.push(body);
    const stock = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.16, 0.38),
      stockMat,
    );
    stock.position.set(0, -0.04, 0.28);
    gunGrp.add(stock);
    currentGunMeshes.push(stock);
  } else if (weaponId === "sniper") {
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 1.0, 8),
      barrelMat,
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.5;
    gunGrp.add(barrel);
    currentGunMeshes.push(barrel);
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.15, 0.55),
      bodyMat,
    );
    body.position.set(0, -0.02, 0);
    gunGrp.add(body);
    currentGunMeshes.push(body);
    const stock = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.12, 0.4),
      stockMat,
    );
    stock.position.set(0, -0.04, 0.32);
    gunGrp.add(stock);
    currentGunMeshes.push(stock);
    const scope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8),
      accentMat,
    );
    scope.rotation.x = Math.PI / 2;
    scope.position.set(0, 0.12, -0.05);
    gunGrp.add(scope);
    currentGunMeshes.push(scope);
    const bipod1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.22, 4),
      barrelMat,
    );
    bipod1.position.set(-0.08, -0.13, -0.35);
    bipod1.rotation.z = 0.3;
    gunGrp.add(bipod1);
    currentGunMeshes.push(bipod1);
    const bipod2 = bipod1.clone();
    bipod2.position.x = 0.08;
    bipod2.rotation.z = -0.3;
    gunGrp.add(bipod2);
    currentGunMeshes.push(bipod2);
  } else if (weaponId === "plasma") {
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.2, 0.55),
      bodyMat,
    );
    body.position.set(0, 0, -0.05);
    gunGrp.add(body);
    currentGunMeshes.push(body);
    const emitter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 0.5, 8),
      accentMat,
    );
    emitter.rotation.x = Math.PI / 2;
    emitter.position.z = -0.38;
    gunGrp.add(emitter);
    currentGunMeshes.push(emitter);
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xaa44ff }),
    );
    core.position.z = -0.62;
    gunGrp.add(core);
    currentGunMeshes.push(core);
    const tank = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8),
      accentMat,
    );
    tank.position.set(0, -0.12, 0.1);
    gunGrp.add(tank);
    currentGunMeshes.push(tank);
  } else if (weaponId === "minigun") {
    for (let b = 0; b < 6; b++) {
      const a = (b / 6) * Math.PI * 2;
      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.022, 0.7, 6),
        barrelMat,
      );
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(Math.cos(a) * 0.07, Math.sin(a) * 0.07, -0.35);
      gunGrp.add(barrel);
      currentGunMeshes.push(barrel);
    }
    const frame = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8),
      bodyMat,
    );
    frame.rotation.x = Math.PI / 2;
    frame.position.z = -0.08;
    gunGrp.add(frame);
    currentGunMeshes.push(frame);
    const motor = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.18, 0.35),
      bodyMat,
    );
    motor.position.set(0, 0, 0.12);
    gunGrp.add(motor);
    currentGunMeshes.push(motor);
  } else if (weaponId === "rocket") {
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.85, 12),
      bodyMat,
    );
    tube.rotation.x = Math.PI / 2;
    tube.position.z = -0.28;
    gunGrp.add(tube);
    currentGunMeshes.push(tube);
    const sight = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.1, 0.15),
      accentMat,
    );
    sight.position.set(0, 0.14, 0);
    gunGrp.add(sight);
    currentGunMeshes.push(sight);
    const handle = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.22, 0.12),
      stockMat,
    );
    handle.position.set(0, -0.16, 0.1);
    gunGrp.add(handle);
    currentGunMeshes.push(handle);
  }

  // Muzzle flash
  const muzzleGeo = new THREE.ConeGeometry(0.07, 0.22, 6);
  const muzzleMat = new THREE.MeshBasicMaterial({
    color: weaponId === "plasma" ? 0xaa44ff : 0xffee44,
    transparent: true,
    opacity: 0,
  });
  muzzleFlashMesh = new THREE.Mesh(muzzleGeo, muzzleMat);
  muzzleFlashMesh.rotation.x = Math.PI / 2;
  const muzzleZ =
    weaponId === "sniper"
      ? -1.0
      : weaponId === "rocket"
        ? -0.72
        : weaponId === "minigun"
          ? -0.74
          : -0.72;
  muzzleFlashMesh.position.z = muzzleZ;
  gunGrp.add(muzzleFlashMesh);

  muzzleLight = new THREE.PointLight(
    weaponId === "plasma" ? 0x8844ff : 0xffaa00,
    0,
    4,
  );
  muzzleLight.position.z = muzzleZ;
  gunGrp.add(muzzleLight);
}

gunGrp.position.set(0.22, -0.23, -0.38);
camera.add(gunGrp);
buildGunModel("assault_rifle");

// ══════════════════════════════════════════════
// COLLISION SYSTEM
// ══════════════════════════════════════════════
function addCollider(x, z, r) {
  colliders.push({ x, z, r });
}
function resolvePlayerCollisions() {
  let px = camera.position.x,
    pz = camera.position.z;
  for (let iter = 0; iter < 3; iter++) {
    for (let i = 0; i < colliders.length; i++) {
      const c = colliders[i];
      const dx = px - c.x,
        dz = pz - c.z;
      const distSq = dx * dx + dz * dz,
        minDist = PLAYER_RADIUS + c.r;
      if (distSq < minDist * minDist && distSq > 0.0001) {
        const dist = Math.sqrt(distSq),
          overlap = minDist - dist;
        px += (dx / dist) * overlap;
        pz += (dz / dist) * overlap;
      }
    }
  }
  camera.position.x = px;
  camera.position.z = pz;
}

// ══════════════════════════════════════════════
// TERRAIN HEIGHT
// ══════════════════════════════════════════════
function getTerrainHeight(x, z, bk) {
  switch (bk) {
    case "jungle":
      return (
        fbm(x * 0.025, z * 0.025, 4) * 3.5 + noise2(x * 0.08, z * 0.08) * 1.2
      );
    case "snow":
      return fbm(x * 0.03, z * 0.03, 3) * 2.5 + noise2(x * 0.1, z * 0.1) * 0.8;
    case "hills":
      return (
        fbm(x * 0.018, z * 0.018, 5) * 12 +
        fbm(x * 0.06, z * 0.06, 2) * 3 +
        noise2(x * 0.15, z * 0.15) * 0.8
      );
    case "desert":
      return (
        fbm(x * 0.04, z * 0.04, 2) * 1.5 + noise2(x * 0.12, z * 0.12) * 0.4
      );
    case "swamp":
      return fbm(x * 0.05, z * 0.05, 3) * 0.9 + noise2(x * 0.2, z * 0.2) * 0.3;
    case "lava":
      return (
        fbm(x * 0.035, z * 0.035, 3) * 4.5 +
        fbm(x * 0.09, z * 0.09, 2) * 1.5 +
        noise2(x * 0.18, z * 0.18) * 0.6
      );
    default:
      return fbm(x * 0.025, z * 0.025, 4) * 4;
  }
}

// ══════════════════════════════════════════════
// CLEAR SCENE
// ══════════════════════════════════════════════
function clearBiomeObjects() {
  dynamicObjects.forEach((o) => scene.remove(o));
  dynamicObjects = [];
  hauntedLights = [];
  colliders = [];
  grassMeshes.forEach((m) => scene.remove(m));
  grassMeshes = [];
  wavingTrees = [];
  lavaFloors = [];
  if (groundMesh) {
    scene.remove(groundMesh);
    groundMesh = null;
  }
  if (weatherParticles) {
    scene.remove(weatherParticles);
    weatherParticles = null;
  }
  // Clean up boss if biome switching mid-boss (shouldn't normally happen)
  if (bossEntity) {
    scene.remove(bossEntity);
    bossEntity = null;
    bossActive = false;
  }
  document.getElementById("boss-hud").classList.remove("visible");
}

// ══════════════════════════════════════════════
// BUILD TERRAIN
// ══════════════════════════════════════════════
function buildTerrain(bk, segments = 80, size = 300) {
  const geo = new THREE.PlaneGeometry(size, size, segments, segments);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i),
      z = -pos.getY(i);
    pos.setZ(i, getTerrainHeight(x, z, bk));
  }
  geo.computeVertexNormals();
  const mat = new THREE.MeshLambertMaterial({ color: BIOMES[bk].groundColor });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
  groundMesh = mesh;
}

// ══════════════════════════════════════════════
// GRASS SYSTEM
// ══════════════════════════════════════════════
function createGrassBladeGeo(height, width, lean) {
  const geo = new THREE.BufferGeometry(),
    segs = 3;
  const verts = [],
    uvs = [],
    indices = [];
  for (let s = 0; s <= segs; s++) {
    const t = s / segs,
      w = width * (1 - t * 0.9),
      y = height * t,
      x = lean * t * t;
    verts.push(-w / 2 + x, y, 0, w / 2 + x, y, 0);
    uvs.push(0, t, 1, t);
  }
  for (let s = 0; s < segs; s++) {
    const b = s * 2;
    indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
  }
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

const GRASS_CONFIGS = {
  jungle: {
    count: 18000,
    bladeH: [0.55, 1.4],
    bladeW: [0.04, 0.1],
    lean: [0.05, 0.35],
    spread: 95,
    minClearance: 5.5,
    colorBase: new THREE.Color(0x0d3a0a),
    colorMid: new THREE.Color(0x1a5c12),
    colorTip: new THREE.Color(0x2aaa20),
    windStrength: 0.9,
    windSpeed: 0.8,
    clumping: 0.7,
    density: 1.0,
    layers: 2,
  },
  snow: {
    count: 3000,
    bladeH: [0.15, 0.45],
    bladeW: [0.03, 0.07],
    lean: [0.05, 0.2],
    spread: 85,
    minClearance: 5,
    colorBase: new THREE.Color(0x8899aa),
    colorMid: new THREE.Color(0xaabbcc),
    colorTip: new THREE.Color(0xddeeff),
    windStrength: 1.4,
    windSpeed: 1.2,
    clumping: 0.3,
    density: 0.3,
    layers: 1,
  },
  hills: {
    count: 10000,
    bladeH: [0.3, 0.85],
    bladeW: [0.03, 0.08],
    lean: [0.1, 0.4],
    spread: 90,
    minClearance: 5,
    colorBase: new THREE.Color(0x5a3a08),
    colorMid: new THREE.Color(0x8a6018),
    colorTip: new THREE.Color(0xc09030),
    windStrength: 1.1,
    windSpeed: 1.0,
    clumping: 0.5,
    density: 0.7,
    layers: 2,
  },
  desert: {
    count: 2500,
    bladeH: [0.2, 0.6],
    bladeW: [0.03, 0.07],
    lean: [0.1, 0.5],
    spread: 80,
    minClearance: 4,
    colorBase: new THREE.Color(0x8a6010),
    colorMid: new THREE.Color(0xaa8820),
    colorTip: new THREE.Color(0xccaa40),
    windStrength: 1.6,
    windSpeed: 1.5,
    clumping: 0.2,
    density: 0.2,
    layers: 1,
  },
  swamp: {
    count: 14000,
    bladeH: [0.6, 2.2],
    bladeW: [0.04, 0.12],
    lean: [0.05, 0.25],
    spread: 85,
    minClearance: 5,
    colorBase: new THREE.Color(0x0d2a0a),
    colorMid: new THREE.Color(0x1a4010),
    colorTip: new THREE.Color(0x2a6620),
    windStrength: 0.6,
    windSpeed: 0.5,
    clumping: 0.8,
    density: 1.0,
    layers: 2,
  },
  lava: {
    count: 800,
    bladeH: [0.15, 0.4],
    bladeW: [0.03, 0.06],
    lean: [0.2, 0.6],
    spread: 70,
    minClearance: 6,
    colorBase: new THREE.Color(0x3a0a00),
    colorMid: new THREE.Color(0x5a1000),
    colorTip: new THREE.Color(0x880a00),
    windStrength: 2.0,
    windSpeed: 1.8,
    clumping: 0.2,
    density: 0.15,
    layers: 1,
  },
};

function buildGrassField(bk) {
  const cfg = GRASS_CONFIGS[bk] || GRASS_CONFIGS.jungle;
  const dummy = new THREE.Object3D();
  for (let layer = 0; layer < cfg.layers; layer++) {
    const count = Math.floor(cfg.count / cfg.layers);
    const bladeH =
      cfg.bladeH[0] + Math.random() * (cfg.bladeH[1] - cfg.bladeH[0]);
    const bladeW =
      cfg.bladeW[0] + Math.random() * (cfg.bladeW[1] - cfg.bladeW[0]);
    const bladeLean = cfg.lean[0] + Math.random() * (cfg.lean[1] - cfg.lean[0]);
    const bladeGeo = createGrassBladeGeo(bladeH, bladeW, bladeLean);
    const grassMat = new THREE.MeshLambertMaterial({
      color: cfg.colorMid,
      side: THREE.DoubleSide,
      transparent: true,
      alphaTest: 0.15,
    });
    const im = new THREE.InstancedMesh(bladeGeo, grassMat, count);
    im.castShadow = false;
    im.receiveShadow = true;
    const colors = new Float32Array(count * 3),
      windPhases = new Float32Array(count),
      windAmps = new Float32Array(count),
      bladeHeights = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      let x,
        z,
        attempts = 0;
      do {
        x = (Math.random() - 0.5) * cfg.spread * 2;
        z = (Math.random() - 0.5) * cfg.spread * 2;
        const cn = noise2(x * 0.08 + layer * 3.7, z * 0.08 + layer * 2.3);
        if (cfg.clumping < 0.5 || cn > 1 - cfg.clumping || attempts > 12) break;
        attempts++;
      } while (true);
      if (x * x + z * z < cfg.minClearance * cfg.minClearance) {
        x *=
          (cfg.minClearance + Math.random() * 3) /
          Math.max(0.01, Math.sqrt(x * x + z * z));
        z *=
          (cfg.minClearance + Math.random() * 3) /
          Math.max(0.01, Math.sqrt(x * x + z * z));
      }
      const groundY = getTerrainHeight(x, z, bk);
      const scaleH =
          cfg.bladeH[0] + Math.random() * (cfg.bladeH[1] - cfg.bladeH[0]),
        scaleW = 0.7 + Math.random() * 0.6;
      dummy.position.set(x, groundY, z);
      dummy.rotation.set(
        (Math.random() - 0.5) * 0.18,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.18,
      );
      dummy.scale.set(scaleW, scaleH / bladeH, scaleW);
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
      bladeHeights[i] = scaleH;
      const nv = noise2(x * 0.12 + 50, z * 0.12 + 50) * 0.5 + 0.5;
      colors[i * 3] = Math.max(
        0,
        Math.min(
          1,
          lerp(cfg.colorBase.r, cfg.colorTip.r, nv) +
            (Math.random() - 0.5) * 0.06,
        ),
      );
      colors[i * 3 + 1] = Math.max(
        0,
        Math.min(
          1,
          lerp(cfg.colorBase.g, cfg.colorTip.g, nv) +
            (Math.random() - 0.5) * 0.06,
        ),
      );
      colors[i * 3 + 2] = Math.max(
        0,
        Math.min(
          1,
          lerp(cfg.colorBase.b, cfg.colorTip.b, nv) +
            (Math.random() - 0.5) * 0.06,
        ),
      );
      windPhases[i] = Math.random() * Math.PI * 2;
      windAmps[i] = 0.4 + Math.random() * 0.6;
    }
    bladeGeo.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(colors, 3),
    );
    grassMat.vertexColors = true;
    im.userData = { windPhases, windAmps, bladeHeights, cfg, count, layer };
    im.instanceMatrix.needsUpdate = true;
    scene.add(im);
    grassMeshes.push(im);
  }
}

function updateGrass(dt) {
  if (!grassMeshes.length) return;
  grassWindTime += dt * 0.016;
  const dummy = new THREE.Object3D(),
    mat4 = new THREE.Matrix4(),
    pos = new THREE.Vector3(),
    quat = new THREE.Quaternion(),
    scl = new THREE.Vector3();
  const wdX =
    Math.sin(grassWindTime * 0.12) * 0.5 + Math.sin(grassWindTime * 0.31) * 0.3;
  const wdZ =
    Math.cos(grassWindTime * 0.09) * 0.4 +
    Math.cos(grassWindTime * 0.22) * 0.25;
  grassMeshes.forEach((mesh) => {
    const { windPhases, windAmps, cfg, count } = mesh.userData;
    const wS = cfg.windStrength,
      wSp = cfg.windSpeed,
      cx = camera.position.x,
      cz = camera.position.z,
      dr = 55;
    for (let i = 0; i < count; i++) {
      mesh.getMatrixAt(i, mat4);
      mat4.decompose(pos, quat, scl);
      const dx = pos.x - cx,
        dz = pos.z - cz,
        distSq = dx * dx + dz * dz;
      if (distSq > dr * dr) continue;
      const df = 1 - Math.min(1, Math.sqrt(distSq) / dr),
        phase = windPhases[i] + grassWindTime * wSp,
        sAmt = windAmps[i] * wS * 0.12 * df;
      dummy.position.copy(pos);
      dummy.scale.copy(scl);
      dummy.rotation.set(
        (Math.cos(phase * 0.85 + 0.5) * 0.6 + Math.cos(phase * 1.6) * 0.2) *
          sAmt +
          wdZ * wS * 0.06,
        Math.atan2(pos.x - cx, pos.z - cz) * 0.015,
        -(Math.sin(phase) * 0.7 + Math.sin(phase * 2.1 + 0.8) * 0.3) * sAmt -
          wdX * wS * 0.06,
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });
}

function registerTreeWind(leafMeshes, strength) {
  if (!leafMeshes || !leafMeshes.length) return;
  wavingTrees.push({
    leaves: leafMeshes.map((m) => ({
      mesh: m,
      baseRotX: m.rotation.x,
      baseRotZ: m.rotation.z,
      phase: Math.random() * Math.PI * 2,
      layerOffset: Math.random() * 0.5,
    })),
    phase: Math.random() * Math.PI * 2,
    speed: 0.6 + Math.random() * 0.5,
    amp: (0.03 + Math.random() * 0.025) * (strength || 1.0),
  });
}

function updateTrees(dt) {
  if (!wavingTrees.length) return;
  treeWindTime += dt * 0.016;
  const gX =
    Math.sin(treeWindTime * 0.18) * 0.5 + Math.sin(treeWindTime * 0.43) * 0.25;
  const gZ =
    Math.cos(treeWindTime * 0.15) * 0.4 + Math.cos(treeWindTime * 0.37) * 0.2;
  wavingTrees.forEach((tree) => {
    const bp = tree.phase + treeWindTime * tree.speed;
    tree.leaves.forEach((lf) => {
      const p = bp + lf.phase,
        lm = 1 + lf.layerOffset;
      lf.mesh.rotation.x =
        lf.baseRotX + Math.sin(p) * tree.amp * lm + gX * tree.amp * 0.4;
      lf.mesh.rotation.z =
        lf.baseRotZ +
        Math.cos(p * 0.85 + 0.6) * tree.amp * 0.7 * lm +
        gZ * tree.amp * 0.3;
    });
  });
}

function placedObj(obj) {
  dynamicObjects.push(obj);
  scene.add(obj);
}

// ══════════════════════════════════════════════
// BIOME BUILDERS (condensed versions)
// ══════════════════════════════════════════════
function buildJungle() {
  buildTerrain("jungle");
  torch.color.setHex(0xff7700);
  torch.intensity = 2.5;
  torch.distance = 20;
  moonMesh.visible = true;
  starField.material.opacity = 0.8;
  buildGrassField("jungle");
  const leafC = [0x0a420e, 0x0c5212, 0x0e6116, 0x093b0b, 0x165a10, 0x0d4a11];
  const trunkM = new THREE.MeshLambertMaterial({ color: 0x2e1505 });
  for (let i = 0; i < 130; i++) {
    let x, z;
    do {
      x = (Math.random() - 0.5) * 130;
      z = (Math.random() - 0.5) * 130;
    } while (x * x + z * z < 30);
    const h = 4 + Math.random() * 4,
      gy = getTerrainHeight(x, z, "jungle"),
      g = new THREE.Group();
    const tr = 0.1 + Math.random() * 0.1;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(tr, tr + 0.12, h, 8),
      trunkM,
    );
    trunk.position.y = h / 2;
    trunk.castShadow = true;
    g.add(trunk);
    const lms = [];
    for (let j = 0; j < 3 + Math.floor(Math.random() * 2); j++) {
      const r = 2.2 - j * 0.2 + Math.random() * 0.5,
        lh = 2.5 - j * 0.2;
      const lmat = new THREE.MeshLambertMaterial({
        color: leafC[Math.floor(Math.random() * leafC.length)],
      });
      const l = new THREE.Mesh(new THREE.ConeGeometry(r, lh, 7), lmat);
      l.position.y = h + j * 0.9;
      l.rotation.y = Math.random() * Math.PI * 2;
      l.castShadow = true;
      g.add(l);
      lms.push(l);
    }
    const sc = 0.8 + Math.random() * 0.55;
    g.position.set(x, gy, z);
    g.rotation.y = Math.random() * Math.PI * 2;
    g.scale.setScalar(sc);
    placedObj(g);
    registerTreeWind(lms, 1.0);
    addCollider(x, z, (tr + 0.12) * sc * 1.5 + 0.3);
  }
  const rockM = new THREE.MeshLambertMaterial({ color: 0x383830 });
  for (let i = 0; i < 50; i++) {
    const x = (Math.random() - 0.5) * 100,
      z = (Math.random() - 0.5) * 100,
      gy = getTerrainHeight(x, z, "jungle"),
      s = 0.2 + Math.random() * 0.9;
    const r = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockM);
    r.position.set(x, gy + s * 0.4, z);
    r.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    placedObj(r);
    if (s > 0.5) addCollider(x, z, s * 0.9);
  }
  addWeatherParticles("firefly");
  spawnHousesForBiome("jungle");
}

function buildSnow() {
  buildTerrain("snow");
  torch.color.setHex(0x4499ff);
  torch.intensity = 1.5;
  torch.distance = 25;
  moonMesh.visible = true;
  starField.material.opacity = 1;
  buildGrassField("snow");
  const trunkM = new THREE.MeshLambertMaterial({ color: 0x3a2010 }),
    pineM = new THREE.MeshLambertMaterial({ color: 0x0a3010 }),
    snowM = new THREE.MeshLambertMaterial({ color: 0xeeeeff });
  for (let i = 0; i < 90; i++) {
    let x, z;
    do {
      x = (Math.random() - 0.5) * 120;
      z = (Math.random() - 0.5) * 120;
    } while (x * x + z * z < 28);
    const gy = getTerrainHeight(x, z, "snow"),
      g = new THREE.Group(),
      h = 4 + Math.random() * 3,
      sc = 0.8 + Math.random() * 0.5;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.15, h, 7),
      trunkM,
    );
    trunk.position.y = h / 2;
    g.add(trunk);
    const sls = [];
    for (let j = 0; j < 4; j++) {
      const r = 1.8 - j * 0.3,
        lh = 1.8 - j * 0.1;
      const l = new THREE.Mesh(new THREE.ConeGeometry(r, lh, 7), pineM);
      l.position.y = h + j * 0.7;
      g.add(l);
      const sc2 = new THREE.Mesh(
        new THREE.ConeGeometry(r * 0.7, lh * 0.25, 7),
        snowM,
      );
      sc2.position.y = h + j * 0.7 + lh * 0.4;
      g.add(sc2);
      sls.push(l, sc2);
    }
    g.position.set(x, gy, z);
    g.rotation.y = Math.random() * Math.PI * 2;
    g.scale.setScalar(sc);
    placedObj(g);
    registerTreeWind(sls, 1.3);
    addCollider(x, z, 0.22 * sc + 0.3);
  }
  const iceM = new THREE.MeshPhongMaterial({
    color: 0x8ab4dd,
    shininess: 150,
    opacity: 0.8,
    transparent: true,
  });
  for (let i = 0; i < 60; i++) {
    const x = (Math.random() - 0.5) * 100,
      z = (Math.random() - 0.5) * 100,
      gy = getTerrainHeight(x, z, "snow"),
      s = 0.3 + Math.random() * 1.2;
    const r = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), iceM);
    r.position.set(x, gy + s * 0.5, z);
    r.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    placedObj(r);
    if (s > 0.6) addCollider(x, z, s * 0.85);
  }
  addWeatherParticles("snow");
  spawnHousesForBiome("snow");
}

function buildHills() {
  buildTerrain("hills");
  torch.color.setHex(0xff6600);
  torch.intensity = 3;
  torch.distance = 18;
  moonMesh.visible = true;
  starField.material.opacity = 0.6;
  buildGrassField("hills");
  const trunkM = new THREE.MeshLambertMaterial({ color: 0x4a2a0a }),
    leafC = [0xaa4400, 0xcc6600, 0xaa3300, 0x883300, 0xdd7700];
  for (let i = 0; i < 70; i++) {
    let x, z;
    do {
      x = (Math.random() - 0.5) * 110;
      z = (Math.random() - 0.5) * 110;
    } while (x * x + z * z < 25);
    const gy = getTerrainHeight(x, z, "hills"),
      g = new THREE.Group(),
      h = 3 + Math.random() * 5,
      sc = 0.8 + Math.random() * 0.6;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.22, h, 7),
      trunkM,
    );
    trunk.position.y = h / 2;
    trunk.castShadow = true;
    g.add(trunk);
    const hls = [];
    for (let b = 0; b < 3 + Math.floor(Math.random() * 3); b++) {
      const bh = h * 0.5 + Math.random() * h * 0.4,
        ba = Math.random() * Math.PI * 2,
        bl = 1 + Math.random() * 2;
      if (Math.random() > 0.4) {
        const lmat = new THREE.MeshLambertMaterial({
          color: leafC[Math.floor(Math.random() * leafC.length)],
        });
        const lf = new THREE.Mesh(
          new THREE.SphereGeometry(0.6 + Math.random() * 0.5, 5, 4),
          lmat,
        );
        lf.position.set(
          Math.cos(ba) * (bl * 0.5 + 0.3),
          bh + bl * 0.5,
          Math.sin(ba) * (bl * 0.5 + 0.3),
        );
        lf.scale.y = 0.6;
        g.add(lf);
        hls.push(lf);
      }
    }
    g.position.set(x, gy, z);
    g.rotation.y = Math.random() * Math.PI * 2;
    g.scale.setScalar(sc);
    placedObj(g);
    registerTreeWind(hls, 1.1);
    addCollider(x, z, 0.22 * sc + 0.35);
  }
  const rockM = new THREE.MeshLambertMaterial({ color: 0x5a4030 });
  for (let i = 0; i < 80; i++) {
    const x = (Math.random() - 0.5) * 100,
      z = (Math.random() - 0.5) * 100,
      gy = getTerrainHeight(x, z, "hills"),
      s = 0.3 + Math.random() * 2.5;
    const r = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockM);
    r.position.set(x, gy + s * 0.5, z);
    r.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    r.castShadow = true;
    placedObj(r);
    if (s > 0.7) addCollider(x, z, s * 0.9);
  }
  addWeatherParticles("ember");
  spawnHousesForBiome("hills");
}

function buildDesert() {
  buildTerrain("desert");
  torch.color.setHex(0xffaa00);
  torch.intensity = 3.5;
  torch.distance = 22;
  moonMesh.visible = false;
  starField.material.opacity = 1.2;
  buildGrassField("desert");
  const cactusM = new THREE.MeshLambertMaterial({ color: 0x2a6020 });
  for (let i = 0; i < 60; i++) {
    let x, z;
    do {
      x = (Math.random() - 0.5) * 110;
      z = (Math.random() - 0.5) * 110;
    } while (x * x + z * z < 25);
    const gy = getTerrainHeight(x, z, "desert"),
      g = new THREE.Group(),
      h = 1 + Math.random() * 2.5;
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.22, h, 7),
      cactusM,
    );
    body.position.y = h / 2;
    body.castShadow = true;
    g.add(body);
    const arms = Math.floor(Math.random() * 3);
    for (let a = 0; a < arms; a++) {
      const ad = a === 0 ? 1 : -1,
        aLen = 0.5 + Math.random() * 0.6;
      const av = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, aLen, 6),
        cactusM,
      );
      av.position.set(ad * 0.2, h * 0.4 + Math.random() * h * 0.3, 0);
      av.rotation.z = ad * 0.6;
      g.add(av);
    }
    g.position.set(x, gy, z);
    g.rotation.y = Math.random() * Math.PI * 2;
    placedObj(g);
    addCollider(x, z, 0.28 + arms * 0.25);
  }
  addWeatherParticles("dust");
  spawnHousesForBiome("desert");
}

function buildSwamp() {
  buildTerrain("swamp");
  torch.color.setHex(0x44ff77);
  torch.intensity = 1.8;
  torch.distance = 15;
  moonMesh.visible = true;
  starField.material.opacity = 0.3;
  buildGrassField("swamp");
  const trunkM = new THREE.MeshLambertMaterial({ color: 0x1a2a0a }),
    leafC = [0x0a3008, 0x0d3a0a, 0x0a280a, 0x133308];
  for (let i = 0; i < 100; i++) {
    let x, z;
    do {
      x = (Math.random() - 0.5) * 120;
      z = (Math.random() - 0.5) * 120;
    } while (x * x + z * z < 28);
    const gy = getTerrainHeight(x, z, "swamp"),
      g = new THREE.Group(),
      h = 3 + Math.random() * 4,
      bR = 0.1 + Math.random() * 0.12,
      sc = 0.7 + Math.random() * 0.6;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(bR, bR + 0.1, h, 7),
      trunkM,
    );
    trunk.position.y = h / 2;
    trunk.rotation.z = (Math.random() - 0.5) * 0.2;
    g.add(trunk);
    const sls = [];
    for (let j = 0; j < 3; j++) {
      const r = 1.5 - j * 0.1 + Math.random() * 0.4;
      const lmat = new THREE.MeshLambertMaterial({
        color: leafC[Math.floor(Math.random() * leafC.length)],
      });
      const l = new THREE.Mesh(new THREE.SphereGeometry(r, 6, 5), lmat);
      l.scale.y = 0.55;
      l.position.y = h + j * 0.6;
      g.add(l);
      sls.push(l);
    }
    g.position.set(x, gy, z);
    g.rotation.y = Math.random() * Math.PI * 2;
    g.scale.setScalar(sc);
    placedObj(g);
    registerTreeWind(sls, 0.7);
    addCollider(x, z, (bR + 0.1) * sc + 0.3);
  }
  const mushCapM = new THREE.MeshLambertMaterial({
    color: 0x44ff88,
    emissive: new THREE.Color(0x002a10),
  });
  for (let i = 0; i < 25; i++) {
    const x = (Math.random() - 0.5) * 80,
      z = (Math.random() - 0.5) * 80,
      gy = getTerrainHeight(x, z, "swamp");
    const g = new THREE.Group();
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.06, 0.3, 6),
      new THREE.MeshLambertMaterial({ color: 0xccddcc }),
    );
    stem.position.y = 0.15;
    g.add(stem);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.2, 8), mushCapM);
    cap.rotation.x = Math.PI;
    cap.position.y = 0.3;
    g.add(cap);
    const gl = new THREE.PointLight(0x44ff88, 0.5, 2.5);
    gl.position.y = 0.3;
    g.add(gl);
    g.position.set(x, gy, z);
    placedObj(g);
    addCollider(x, z, 0.25);
  }
  addWeatherParticles("firefly");
  spawnHousesForBiome("swamp");
}

// ══════════════════════════════════════════════
// LAVA BIOME
// ══════════════════════════════════════════════
function buildLava() {
  buildTerrain("lava");
  torch.color.setHex(0xff3300);
  torch.intensity = 4.5;
  torch.distance = 30;
  moonMesh.visible = false;
  starField.material.opacity = 0.0;
  // Lava ground glow
  const lavaAmbient = new THREE.PointLight(0xff2200, 2.0, 80);
  lavaAmbient.position.set(0, 2, 0);
  scene.add(lavaAmbient);
  dynamicObjects.push(lavaAmbient);
  const lavaAmbient2 = new THREE.PointLight(0xff6600, 1.5, 60);
  lavaAmbient2.position.set(0, 5, 0);
  scene.add(lavaAmbient2);
  dynamicObjects.push(lavaAmbient2);
  // Lava pools - glowing orange-red flat circles
  const lavaMat = new THREE.MeshBasicMaterial({ color: 0xff3300 });
  const lavaGlowMat = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.6,
  });
  lavaFloors = [];
  for (let i = 0; i < 40; i++) {
    const x = (Math.random() - 0.5) * 110,
      z = (Math.random() - 0.5) * 110;
    if (x * x + z * z < 30) continue;
    const gy = getTerrainHeight(x, z, "lava");
    const r = 2 + Math.random() * 5;
    const pool = new THREE.Mesh(new THREE.CircleGeometry(r, 14), lavaMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(x, gy + 0.08, z);
    placedObj(pool);
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(r * 1.3, 14),
      lavaGlowMat,
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.set(x, gy + 0.05, z);
    placedObj(glow);
    const lpl = new THREE.PointLight(0xff4400, 1.2, r * 3.5);
    lpl.position.set(x, gy + 1, z);
    scene.add(lpl);
    dynamicObjects.push(lpl);
    lavaFloors.push({
      x,
      z,
      r,
      light: lpl,
      baseIntensity: 1.2,
      phase: Math.random() * Math.PI * 2,
    });
  }
  // Volcanic rock pillars
  const rockMat = new THREE.MeshLambertMaterial({ color: 0x1a0800 });
  const hotRockMat = new THREE.MeshLambertMaterial({ color: 0x3a0a00 });
  for (let i = 0; i < 50; i++) {
    let x, z;
    do {
      x = (Math.random() - 0.5) * 100;
      z = (Math.random() - 0.5) * 100;
    } while (x * x + z * z < 20);
    const gy = getTerrainHeight(x, z, "lava");
    const h = 1.5 + Math.random() * 5,
      r = 0.3 + Math.random() * 0.8;
    const g = new THREE.Group();
    const pillar = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 0.5, r, h, 7),
      i % 3 === 0 ? hotRockMat : rockMat,
    );
    pillar.position.y = h / 2;
    pillar.castShadow = true;
    g.add(pillar);
    // glowing top crack
    if (Math.random() > 0.5) {
      const crack = new THREE.Mesh(
        new THREE.SphereGeometry(r * 0.3, 6, 4),
        new THREE.MeshBasicMaterial({ color: 0xff4400 }),
      );
      crack.position.y = h + 0.05;
      g.add(crack);
      const cl = new THREE.PointLight(0xff3300, 0.8, 3);
      cl.position.y = h;
      g.add(cl);
      hauntedLights.push({
        light: cl,
        baseIntensity: 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
    g.position.set(x, gy, z);
    g.rotation.y = Math.random() * Math.PI * 2;
    placedObj(g);
    addCollider(x, z, r + 0.3);
  }
  // Lava geysers - tall thin jets of orange
  for (let i = 0; i < 12; i++) {
    const x = (Math.random() - 0.5) * 90,
      z = (Math.random() - 0.5) * 90;
    if (x * x + z * z < 25) continue;
    const gy = getTerrainHeight(x, z, "lava");
    const g = new THREE.Group();
    const jet = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.25, 4 + Math.random() * 3, 8),
      new THREE.MeshBasicMaterial({
        color: 0xff5500,
        transparent: true,
        opacity: 0.7,
      }),
    );
    jet.position.y = 2;
    g.add(jet);
    const tip = new THREE.Mesh(
      new THREE.ConeGeometry(0.25, 1, 8),
      new THREE.MeshBasicMaterial({
        color: 0xff8800,
        transparent: true,
        opacity: 0.5,
      }),
    );
    tip.position.y = 5;
    g.add(tip);
    const gl = new THREE.PointLight(0xff5500, 2, 8);
    gl.position.y = 3;
    g.add(gl);
    g.position.set(x, gy, z);
    placedObj(g);
    hauntedLights.push({
      light: gl,
      baseIntensity: 2,
      phase: Math.random() * Math.PI * 2,
    });
    addCollider(x, z, 0.5);
  }
  // Ash clouds
  addWeatherParticles("ember");
  // Skulls and bones scattered
  const boneMat = new THREE.MeshLambertMaterial({ color: 0x553322 });
  for (let i = 0; i < 30; i++) {
    const x = (Math.random() - 0.5) * 80,
      z = (Math.random() - 0.5) * 80,
      gy = getTerrainHeight(x, z, "lava");
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.3 + Math.random() * 0.4, 0.22, 0.28),
      boneMat,
    );
    b.position.set(x, gy + 0.1, z);
    b.rotation.y = Math.random() * Math.PI;
    placedObj(b);
  }
}

function updateLava(dt) {
  lavaTime += dt * 0.025;
  lavaFloors.forEach((lf) => {
    if (lf.light)
      lf.light.intensity =
        lf.baseIntensity *
        (0.6 + 0.5 * Math.abs(Math.sin(lavaTime * 1.5 + lf.phase)));
    // Damage player if standing in lava pool
    const dx = camera.position.x - lf.x,
      dz = camera.position.z - lf.z;
    if (dx * dx + dz * dz < lf.r * lf.r) {
      if (Math.random() < 0.008) {
        health = Math.max(0, health - 3);
        document.getElementById("health-val").textContent = health;
        document.getElementById("health-bar").style.width = health + "%";
        document.getElementById("health-bar").style.background =
          "linear-gradient(90deg,#cc0000,#ff3300)";
        const df = document.getElementById("damage-flash");
        df.style.opacity = ".25";
        setTimeout(() => (df.style.opacity = "0"), 90);
        if (health <= 0) endGame();
      }
    }
  });
}

// ══════════════════════════════════════════════
// WEATHER PARTICLES
// ══════════════════════════════════════════════
function addWeatherParticles(type) {
  const count =
    type === "snow"
      ? 600
      : type === "firefly"
        ? 50
        : type === "ember"
          ? 120
          : 200;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3),
    velocities = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 1] =
      Math.random() * (type === "snow" ? 18 : type === "dust" ? 6 : 3) + 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] =
      type === "snow"
        ? -0.04 - Math.random() * 0.03
        : type === "ember"
          ? 0.02 + Math.random() * 0.04
          : (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("velocity", new THREE.Float32BufferAttribute(velocities, 3));
  const colorMap = {
    snow: 0xddeeff,
    firefly: 0xccff66,
    ember: 0xff6600,
    dust: 0xddbb88,
  };
  const sizeMap = { snow: 0.8, firefly: 0.25, ember: 0.4, dust: 1.2 };
  const mat = new THREE.PointsMaterial({
    color: colorMap[type] || 0xffffff,
    size: sizeMap[type] || 0.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: type === "firefly" ? 0.7 : 0.5,
  });
  weatherParticles = new THREE.Points(geo, mat);
  weatherParticles.userData = { type, velocities, count };
  scene.add(weatherParticles);
}

function updateWeatherParticles(dt) {
  if (!weatherParticles) return;
  const pos = weatherParticles.geometry.attributes.position,
    vel = weatherParticles.userData.velocities,
    type = weatherParticles.userData.type,
    count = weatherParticles.userData.count;
  for (let i = 0; i < count; i++) {
    pos.array[i * 3] += vel[i * 3] * dt;
    pos.array[i * 3 + 1] += vel[i * 3 + 1] * dt;
    pos.array[i * 3 + 2] += vel[i * 3 + 2] * dt;
    if (type === "firefly") {
      pos.array[i * 3] += Math.sin(time * 0.015 + i * 1.3) * 0.03;
      pos.array[i * 3 + 2] += Math.cos(time * 0.013 + i * 1.7) * 0.03;
    }
    if (
      pos.array[i * 3 + 1] < -0.5 ||
      pos.array[i * 3 + 1] > 20 ||
      Math.abs(pos.array[i * 3] - camera.position.x) > 45 ||
      Math.abs(pos.array[i * 3 + 2] - camera.position.z) > 45
    ) {
      pos.array[i * 3] = camera.position.x + (Math.random() - 0.5) * 80;
      pos.array[i * 3 + 1] =
        type === "snow"
          ? 18 + Math.random() * 5
          : type === "ember"
            ? 0.5 + Math.random() * 0.5
            : Math.random() * 4;
      pos.array[i * 3 + 2] = camera.position.z + (Math.random() - 0.5) * 80;
    }
  }
  pos.needsUpdate = true;
  if (type === "firefly")
    weatherParticles.material.opacity =
      0.4 + Math.abs(Math.sin(time * 0.03)) * 0.5;
  if (type === "ember")
    weatherParticles.material.opacity =
      0.3 + Math.abs(Math.sin(time * 0.04)) * 0.4;
}

// ══════════════════════════════════════════════
// APPLY BIOME
// ══════════════════════════════════════════════
function applyBiome(key) {
  const b = BIOMES[key];
  scene.fog.color.setHex(b.fogColor);
  scene.fog.density = b.fogDensity;
  renderer.setClearColor(b.fogColor);
  skyMesh.material.color.setHex(b.skyColor);
  ambientLight.color.setHex(b.ambientColor);
  ambientLight.intensity = b.ambientIntensity;
  sunLight.color.setHex(b.sunColor);
  sunLight.intensity = b.sunIntensity;
  hemiLight.color.setHex(b.hemiSkyColor);
  hemiLight.groundColor.setHex(b.hemiGroundColor);
  const bn = document.getElementById("biome-name");
  bn.textContent = b.name;
  bn.style.color = b.nameColor;
  bn.style.textShadow = `0 0 18px ${b.nameColor}`;
  document.getElementById("biome-sub").textContent = b.sub + " · WAVE " + wave;
  const wa = document.getElementById("wave-announce");
  wa.querySelector("h2").style.color = b.waveColor;
  wa.querySelector("h2").style.textShadow =
    `0 0 40px ${b.waveGlow},0 0 80px ${b.waveGlow}`;
  wa.querySelector("p").style.color = b.particleColor;
  starField.material.opacity =
    key === "snow" ? 1 : key === "desert" ? 1.3 : key === "swamp" ? 0.3 : 0.8;
}

function loadBiome(key) {
  currentBiomeKey = key;
  const overlay = document.getElementById("biome-overlay");
  overlay.style.opacity = "1";
  setTimeout(() => {
    clearBiomeObjects();
    applyBiome(key);
    BIOMES[key].buildScene();
    camera.position.set(0, 1.7, 0);
    targetAngleX = targetAngleY = smoothAngleX = smoothAngleY = 0;
    overlay.style.opacity = "0";
  }, 400);
}

// ══════════════════════════════════════════════
// ENEMY SYSTEM — WITH ARMED VARIANTS
// ══════════════════════════════════════════════
const ENEMY_NAMES_PER_BIOME = {
  jungle: ["Jungle Stalker", "Vine Phantom", "Canopy Lurker", "Shadow Hunter"],
  snow: ["Frost Raider", "Arctic Wraith", "Tundra Beast", "Ice Crawler"],
  hills: ["Highland Brute", "Ridge Runner", "Stone Phantom", "Ember Ghoul"],
  desert: ["Dune Stalker", "Sand Phantom", "Scorched Warrior", "Desert Wraith"],
  swamp: ["Bog Creature", "Mire Specter", "Swamp Horror", "Mud Wraith"],
};

// Enemy types: 'melee', 'gun', 'knife'
function mkEnemy(x, z, forcedType) {
  const g = new THREE.Group();
  // Decide type based on wave and random
  const rnd = Math.random();
  let enemyType = forcedType || "melee";
  if (!forcedType) {
    if (wave >= 2 && rnd < 0.25) enemyType = "knife";
    if (wave >= 3 && rnd < 0.15) enemyType = "gun";
  }

  const bodyColor =
    currentBiomeKey === "snow"
      ? 0x6688aa
      : currentBiomeKey === "desert"
        ? 0xaa7730
        : currentBiomeKey === "swamp"
          ? 0x2a4a18
          : 0x7a3a10;
  const headColor =
    currentBiomeKey === "snow"
      ? 0x88aacc
      : currentBiomeKey === "desert"
        ? 0xd4a060
        : currentBiomeKey === "swamp"
          ? 0x3a6a28
          : 0xd4865a;
  const bm = new THREE.MeshLambertMaterial({ color: bodyColor });
  const hm = new THREE.MeshLambertMaterial({ color: headColor });

  // Tint armed enemies
  const armColor =
    enemyType === "gun"
      ? 0x333355
      : enemyType === "knife"
        ? 0x443322
        : bodyColor;
  const armedBm = new THREE.MeshLambertMaterial({ color: armColor });

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 1.2, 0.42),
    enemyType !== "melee" ? armedBm : bm,
  );
  body.position.y = 0.82;
  body.castShadow = true;
  g.add(body);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.52, 0.52), hm);
  head.position.y = 1.7;
  head.castShadow = true;
  g.add(head);

  // Eyes - color coded by type
  const eyeColor =
    enemyType === "gun"
      ? 0xff8800
      : enemyType === "knife"
        ? 0xff0088
        : 0xff0000;
  const em = new THREE.MeshBasicMaterial({ color: eyeColor });
  const eg = new THREE.SphereGeometry(0.07, 6, 6);
  const eL = new THREE.Mesh(eg, em);
  eL.position.set(-0.13, 1.73, 0.27);
  g.add(eL);
  const eR = new THREE.Mesh(eg, em);
  eR.position.set(0.13, 1.73, 0.27);
  g.add(eR);

  const aL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.7, 0.18), bm);
  aL.position.set(-0.45, 0.8, 0);
  g.add(aL);
  const aR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.7, 0.18), bm);
  aR.position.set(0.45, 0.8, 0);
  g.add(aR);
  const lL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), bm);
  lL.position.set(-0.18, 0.2, 0);
  g.add(lL);
  const lR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), bm);
  lR.position.set(0.18, 0.2, 0);
  g.add(lR);

  // WEAPON HELD IN HAND
  if (enemyType === "gun") {
    const gunMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
    const gunBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.12, 0.38),
      gunMat,
    );
    gunBody.position.set(0.45, 0.85, -0.22);
    gunBody.rotation.x = 0.2;
    g.add(gunBody);
    const gunBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.025, 0.28, 6),
      gunMat,
    );
    gunBarrel.rotation.x = Math.PI / 2;
    gunBarrel.position.set(0.45, 0.82, -0.38);
    g.add(gunBarrel);
    // muzzle glow
    const mgl = new THREE.PointLight(0xff8800, 0, 3);
    mgl.position.set(0.45, 0.82, -0.5);
    g.add(mgl);
    g.userData.muzzleGlow = mgl;
    g.userData.lastShot = 0;
    g.userData.shootInterval = 2200 + Math.random() * 1000;
  } else if (enemyType === "knife") {
    const knifeMat = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
    const knifeHandle = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 0.18),
      new THREE.MeshLambertMaterial({ color: 0x4a2a0a }),
    );
    knifeHandle.position.set(0.45, 0.82, -0.1);
    g.add(knifeHandle);
    const knifeBlade = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.04, 0.28),
      knifeMat,
    );
    knifeBlade.position.set(0.45, 0.82, -0.28);
    g.add(knifeBlade);
    // Blade glint
    const bladeLight = new THREE.PointLight(0xaaaaff, 0.3, 1.5);
    bladeLight.position.set(0.45, 0.82, -0.42);
    g.add(bladeLight);
  }

  // Health indicator light
  const hLight = new THREE.PointLight(0xff2200, 0.8, 5);
  hLight.position.y = 1.9;
  g.add(hLight);

  // HP scaled by type and wave
  const hpMult = enemyType === "gun" ? 1.5 : enemyType === "knife" ? 1.2 : 1.0;
  const hp = Math.round((2 + wave + Math.floor(Math.random() * 2)) * hpMult);
  const groundY = getTerrainHeight(x, z, currentBiomeKey);
  const speed =
    (0.012 + wave * 0.002 + Math.random() * 0.01) *
    (enemyType === "gun" ? 0.7 : enemyType === "knife" ? 1.3 : 1.0);

  g.userData = {
    hp,
    maxHp: hp,
    alive: true,
    speed,
    lastHit: 0,
    aL,
    aR,
    lL,
    lR,
    walkPhase: Math.random() * Math.PI * 2,
    hLight,
    groundY,
    type: enemyType,
    goldDrop: enemyType === "gun" ? 25 : enemyType === "knife" ? 15 : 10,
  };
  g.position.set(x, groundY, z);
  scene.add(g);
  enemies.push(g);
  document.getElementById("enemiesVal").textContent = enemies.length;
  return g;
}

let enemyBullets = [];
function spawnEnemyBullet(pos, dir) {
  const b = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 4, 4),
    new THREE.MeshBasicMaterial({
      color: 0xff8800,
      transparent: true,
      opacity: 0.9,
    }),
  );
  b.position.copy(pos);
  const bl = new THREE.PointLight(0xff6600, 1.5, 2);
  b.add(bl);
  b.userData = { dir: dir.clone(), life: 60, damage: 6 };
  scene.add(b);
  enemyBullets.push(b);
}

function spawnWave(n) {
  const gunCount = Math.floor(n * Math.min(0.3, wave * 0.08));
  const knifeCount = Math.floor(n * Math.min(0.25, wave * 0.06));
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + Math.random() * 0.6,
      d = 20 + Math.random() * 28;
    let type = "melee";
    if (i < gunCount) type = "gun";
    else if (i < gunCount + knifeCount) type = "knife";
    mkEnemy(Math.cos(a) * d, Math.sin(a) * d, type);
  }
  showWaveAnnounce(wave, n);
}

function showWaveAnnounce(w, n) {
  const el = document.getElementById("wave-announce");
  document.getElementById("wave-announce-title").textContent = "WAVE " + w;
  document.getElementById("wave-announce-sub").textContent =
    n + " ENEMIES · " + BIOMES[currentBiomeKey].sub;
  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "wavePop 3.5s forwards";
}

// ══════════════════════════════════════════════
// AMMO UI
// ══════════════════════════════════════════════
function buildAmmoDots() {
  const c = document.getElementById("ammo-dots");
  c.innerHTML = "";
  for (let i = 0; i < maxAmmo; i++) {
    const d = document.createElement("div");
    d.className = "ammo-dot" + (i >= ammo ? " spent" : "");
    d.id = "dot-" + i;
    c.appendChild(d);
  }
}
function updateAmmoUI() {
  document.getElementById("ammo-val").textContent = ammo;
  document.querySelectorAll(".ammo-dot").forEach((d, i) => {
    d.className = "ammo-dot" + (i >= ammo ? " spent" : "");
  });
}

// ══════════════════════════════════════════════
// SHOOT
// ══════════════════════════════════════════════
function shoot() {
  if (isReloading) return;
  const now = Date.now();
  const wep = WEAPONS[playerInventory.activeWeapon];
  if (now - lastShot < wep.fireRate) return;
  lastShot = now;
  if (ammo <= 0) {
    startReload();
    return;
  }
  ammo--;
  updateAmmoUI();
  shotsFired++;
  if (ammo <= 0) setTimeout(startReload, 200);
  muzzleFlashMesh.material.opacity = 1;
  if (muzzleLight) muzzleLight.intensity = 8;
  setTimeout(() => {
    muzzleFlashMesh.material.opacity = 0;
    if (muzzleLight) muzzleLight.intensity = 0;
  }, 65);

  if (audioCtx) {
    const shotOsc = audioCtx.createOscillator(),
      shotG = audioCtx.createGain();
    shotOsc.type = "sawtooth";
    shotOsc.frequency.setValueAtTime(
      wep.id === "sniper" ? 300 : wep.id === "shotgun" ? 150 : 220,
      audioCtx.currentTime,
    );
    shotOsc.frequency.exponentialRampToValueAtTime(
      55,
      audioCtx.currentTime + 0.12,
    );
    shotG.gain.setValueAtTime(
      wep.id === "sniper" ? 0.35 : 0.28,
      audioCtx.currentTime,
    );
    shotG.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    const dist = audioCtx.createWaveShaper(),
      curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1;
      curve[i] = ((Math.PI + 80) * x) / (Math.PI + 80 * Math.abs(x));
    }
    dist.curve = curve;
    shotOsc.connect(dist);
    dist.connect(shotG);
    shotG.connect(audioCtx.destination);
    shotOsc.start();
    shotOsc.stop(audioCtx.currentTime + 0.18);
  }

  const fl = document.getElementById("flash");
  fl.style.opacity = ".2";
  setTimeout(() => (fl.style.opacity = "0"), 65);
  const cw = document.getElementById("crosshair-wrap");
  cw.classList.add("crosshair-fire");
  setTimeout(() => cw.classList.remove("crosshair-fire"), 130);
  crosshairSpread = 16;
  gunGrp.position.z += wep.recoil * 0.8;
  gunGrp.rotation.x += wep.recoil * 0.3;
  targetAngleY += wep.recoil;
  setTimeout(() => {
    gunGrp.position.z -= wep.recoil * 0.8;
    gunGrp.rotation.x -= wep.recoil * 0.3;
  }, 100);
  setTimeout(() => (targetAngleY -= wep.recoil), 130);

  const damageMultiplier = activeEffects.damage > 0 ? 3 : 1;
  const pellets = wep.pellets || 1;
  for (let p = 0; p < pellets; p++) {
    const spreadMult = p === 0 && pellets === 1 ? 1 : 1;
    const spread = wep.spread * spreadMult;
    const dir = new THREE.Vector3(
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread * 0.5,
      -1,
    )
      .normalize()
      .applyQuaternion(camera.quaternion);
    const ray = new THREE.Raycaster(camera.position.clone(), dir);
    let hitEnemy = false;
    enemies.forEach((en) => {
      if (!en.userData.alive) return;
      const hits = ray.intersectObjects(en.children, false);
      if (hits.length) {
        hitEnemy = true;
        en.userData.hp -= wep.damage * damageMultiplier;
        en.children.forEach((c) => {
          if (c.material && c.material.emissive)
            c.material.emissive.setHex(0xff2200);
        });
        setTimeout(
          () =>
            en.children.forEach((c) => {
              if (c.material?.emissive) c.material.emissive.setHex(0);
            }),
          90,
        );
        spawnParticles3d(hits[0].point, 0xff4400, 12);
        if (en.userData.hp <= 0) killEnemy(en);
      }
    });

    // AoE weapons
    if (wep.aoe) {
      const aoePt = camera.position.clone().add(dir.clone().multiplyScalar(20));
      enemies.forEach((en) => {
        if (!en.userData.alive) return;
        if (en.position.distanceTo(aoePt) < wep.aoeRadius) {
          en.userData.hp -= wep.damage * damageMultiplier * 0.6;
          spawnParticles3d(
            en.position.clone().add(new THREE.Vector3(0, 1, 0)),
            wep.id === "plasma" ? 0x8844ff : 0xff4400,
            16,
          );
          if (en.userData.hp <= 0) killEnemy(en);
        }
      });
      // Big AoE flash
      spawnParticles3d(aoePt, wep.id === "plasma" ? 0x8844ff : 0xff8800, 30);
    }

    if (!hitEnemy && groundMesh) {
      const r2 = new THREE.Raycaster(camera.position.clone(), dir);
      const pts = r2.intersectObject(groundMesh);
      if (pts.length) spawnParticles3d(pts[0].point, getBiomeDustColor(), 7);
    }

    const blt = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 4, 4),
      new THREE.MeshBasicMaterial({
        color: wep.id === "plasma" ? 0xaa44ff : 0xffee44,
      }),
    );
    blt.position.copy(camera.position);
    blt.userData = { dir: dir.clone(), life: 28 };
    scene.add(blt);
    bullets.push(blt);
  }
}

function getBiomeDustColor() {
  const m = {
    jungle: 0x88aa44,
    snow: 0xffffff,
    hills: 0xaa8844,
    desert: 0xddbb66,
    swamp: 0x66aa44,
  };
  return m[currentBiomeKey] || 0x888888;
}

function startReload() {
  if (isReloading || ammo === maxAmmo) return;
  isReloading = true;
  reloadStart = Date.now();
  const wep = WEAPONS[playerInventory.activeWeapon];
  reloadTime = wep.reloadTime;
  document.getElementById("reload-ring").style.opacity = "1";
  const circle = document.getElementById("reload-ring").querySelector("circle");
  const animate = () => {
    if (!isReloading) return;
    const pct = (Date.now() - reloadStart) / reloadTime;
    circle.style.strokeDashoffset = 100 - pct * 100;
    if (pct < 1) requestAnimationFrame(animate);
    else finishReload();
  };
  requestAnimationFrame(animate);
}
function finishReload() {
  isReloading = false;
  const wep = WEAPONS[playerInventory.activeWeapon];
  ammo = wep.maxAmmo;
  maxAmmo = wep.maxAmmo;
  updateAmmoUI();
  document.getElementById("reload-ring").style.opacity = "0";
  document
    .getElementById("reload-ring")
    .querySelector("circle").style.strokeDashoffset = 100;
}

// ══════════════════════════════════════════════
// PARTICLES
// ══════════════════════════════════════════════
function spawnParticles3d(pos, color, n = 10) {
  for (let i = 0; i < n; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.04 + Math.random() * 0.04, 4, 4),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 }),
    );
    p.position.copy(pos);
    const s = 0.1 + Math.random() * 0.2,
      a = Math.random() * Math.PI * 2;
    p.userData = {
      vel: new THREE.Vector3(
        Math.cos(a) * s,
        Math.random() * 0.3 + 0.05,
        Math.sin(a) * s,
      ),
      life: 20 + Math.random() * 20,
      maxLife: 0,
    };
    p.userData.maxLife = p.userData.life;
    scene.add(p);
    particles3d.push(p);
  }
}

// ══════════════════════════════════════════════
// KILL + GOLD DROP
// ══════════════════════════════════════════════
function killEnemy(en) {
  en.userData.alive = false;
  spawnParticles3d(en.position.clone().setY(en.position.y + 1.2), 0xff2200, 26);
  scene.remove(en);
  enemies = enemies.filter((e) => e !== en);
  kills++;
  document.getElementById("killsVal").textContent = kills;
  document.getElementById("enemiesVal").textContent = enemies.length;

  // Gold reward
  const goldEarned =
    en.userData.goldDrop ||
    (en.userData.type === "gun" ? 25 : en.userData.type === "knife" ? 15 : 10);
  addGold(goldEarned);
  showGoldNotify("+💰" + goldEarned);

  comboKills++;
  comboTimer = 180;
  const bonus = comboKills > 1 ? comboKills * 50 : 0;
  score += 100 + bonus;
  document.getElementById("scoreVal").textContent = score;
  if (comboKills > 1) {
    const el = document.getElementById("streak");
    el.textContent =
      comboKills === 2
        ? "DOUBLE KILL! +" + (100 + bonus)
        : comboKills === 3
          ? "TRIPLE KILL! +" + (100 + bonus)
          : "KILLING SPREE! +" + (100 + bonus);
    el.style.opacity = "1";
    setTimeout(() => (el.style.opacity = "0"), 1500);
  }
  addKillFeed(en.userData.type);
  if (en.userData.type === "boss") {
    killBoss(en);
    return;
  }
  if (enemies.length === 0) {
    wave++;
    document.getElementById("waveVal").textContent = wave;
    // Wave clear gold bonus
    addGold(wave * 30);
    showGoldNotify("🏆 WAVE CLEAR +" + wave * 30 + " GOLD");
    ammo = maxAmmo;
    updateAmmoUI();
    isReloading = false;
    document.getElementById("reload-ring").style.opacity = "0";
    // Every 5 waves: spawn boss on lava biome
    if (wave > 1 && (wave - 1) % 5 === 0 && !bossSpawned) {
      bossSpawned = true;
      setTimeout(() => {
        bossSpawned = false;
        loadBiome("lava");
        setTimeout(() => {
          spawnWave(Math.max(2, Math.floor((4 + wave * 2) * 0.3)));
          setTimeout(spawnBoss, 3000);
        }, 1800);
      }, 2200);
    } else {
      const nextBiome =
        BIOME_KEYS[Math.floor(Math.random() * BIOME_KEYS.length)];
      setTimeout(() => {
        loadBiome(nextBiome);
        setTimeout(() => spawnWave(4 + wave * 2), 1800);
      }, 2200);
    }
  }
}

function addGold(amount) {
  gold += amount;
  totalGoldEarned += amount;
  document.getElementById("goldVal").textContent = gold;
  document.getElementById("shop-gold-display").textContent = gold;
}

function showGoldNotify(msg) {
  const el = document.getElementById("gold-notify");
  el.textContent = msg;
  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "goldPop 1.8s forwards";
}

function addKillFeed(type) {
  const names = ENEMY_NAMES_PER_BIOME[currentBiomeKey] || ["Enemy"];
  const feed = document.getElementById("kill-feed");
  const e = document.createElement("div");
  e.className =
    "kill-entry" + (type === "gun" || type === "knife" ? " gold-drop" : "");
  const icon = type === "gun" ? "🔫" : type === "knife" ? "🔪" : "✓";
  e.textContent =
    icon +
    " " +
    names[Math.floor(Math.random() * names.length)] +
    " eliminated";
  feed.appendChild(e);
  setTimeout(() => e.remove(), 2600);
  if (feed.children.length > 5) feed.removeChild(feed.firstChild);
}

// ══════════════════════════════════════════════
// SHOP SYSTEM
// ══════════════════════════════════════════════
function openShop() {
  shopOpen = true;
  document.getElementById("shop-overlay").classList.add("open");
  document.getElementById("shop-gold-display").textContent = gold;
  renderShop();
  if (document.pointerLockElement === canvas) document.exitPointerLock();
  playUIClick();
}

function closeShop() {
  shopOpen = false;
  document.getElementById("shop-overlay").classList.remove("open");
}

function renderShop() {
  const grid = document.getElementById("shop-weapons-grid");
  grid.innerHTML = "";
  Object.values(WEAPONS).forEach((w) => {
    const owned = playerInventory.weapons.includes(w.id);
    const equipped = playerInventory.activeWeapon === w.id;
    const canAfford = gold >= w.price;
    let cls = "shop-item";
    if (equipped) cls += " equipped";
    else if (owned) cls += " owned";
    else if (!canAfford) cls += " cant-afford";

    grid.innerHTML += `
    <div class="${cls}" onclick="shopBuyOrEquip('${w.id}')">
      ${equipped ? '<div class="owned-badge equipped-badge">EQUIPPED</div>' : owned ? '<div class="owned-badge">OWNED</div>' : ""}
      <span class="shop-item-icon">${w.icon}</span>
      <div class="shop-item-name">${w.name}</div>
      <div class="shop-item-desc">${w.desc}</div>
      <div class="shop-item-stats">
        <span class="stat-pill dmg">DMG ${w.dmgStat}</span>
        <span class="stat-pill spd">SPD ${w.spdStat}</span>
        <span class="stat-pill range">RNG ${w.rangeStat}</span>
        <span class="stat-pill ammo">MAG ${w.maxAmmo}</span>
      </div>
      <div class="shop-item-price ${w.price === 0 ? "free" : ""}">${owned ? "CLICK TO EQUIP" : w.price === 0 ? "FREE" : w.price + " 💰"}</div>
    </div>`;
  });

  const cGrid = document.getElementById("shop-consumables-grid");
  cGrid.innerHTML = "";
  Object.values(CONSUMABLES).forEach((c) => {
    const canAfford = gold >= c.price;
    cGrid.innerHTML += `
    <div class="consumable-item ${!canAfford ? "cant-afford" : ""}" onclick="shopBuyConsumable('${c.id}')">
      <div class="consumable-icon">${c.icon}</div>
      <div class="consumable-info">
        <div class="c-name">${c.name}</div>
        <div class="c-desc">${c.desc}</div>
        <div class="c-price">${c.price} 💰</div>
      </div>
    </div>`;
  });
}

function shopBuyOrEquip(weaponId) {
  const w = WEAPONS[weaponId];
  if (playerInventory.weapons.includes(weaponId)) {
    equipWeapon(weaponId);
    closeShop();
    return;
  }
  if (gold < w.price) {
    playUIClick();
    return;
  }
  gold -= w.price;
  document.getElementById("goldVal").textContent = gold;
  playerInventory.weapons.push(weaponId);
  equipWeapon(weaponId);
  playUIClick();
  renderShop();
  showGoldNotify("🛒 " + w.name + " ACQUIRED!");
}

function shopBuyConsumable(consumableId) {
  const c = CONSUMABLES[consumableId];
  if (gold < c.price) return;
  gold -= c.price;
  document.getElementById("goldVal").textContent = gold;
  if (!playerInventory.consumables[consumableId])
    playerInventory.consumables[consumableId] = 0;
  playerInventory.consumables[consumableId]++;
  playUIClick();
  renderShop();
  showGoldNotify("🛒 " + c.name + " BOUGHT!");
}

function equipWeapon(weaponId) {
  playerInventory.activeWeapon = weaponId;
  const w = WEAPONS[weaponId];
  maxAmmo = w.maxAmmo;
  ammo = w.maxAmmo;
  reloadTime = w.reloadTime;
  buildGunModel(weaponId);
  buildAmmoDots();
  updateAmmoUI();
  document.getElementById("weapon-name-display").textContent = w.name;
  isReloading = false;
  document.getElementById("reload-ring").style.opacity = "0";
}

function useConsumable(id) {
  if (!playerInventory.consumables[id] || playerInventory.consumables[id] <= 0)
    return;
  const c = CONSUMABLES[id];
  playerInventory.consumables[id]--;
  switch (c.effect) {
    case "heal":
      health = Math.min(100, health + c.value);
      document.getElementById("health-val").textContent = health;
      document.getElementById("health-bar").style.width = health + "%";
      break;
    case "ammo":
      ammo = maxAmmo;
      updateAmmoUI();
      break;
    case "speed":
      activeEffects.speed = c.duration * 60;
      break;
    case "damage":
      activeEffects.damage = c.duration * 60;
      break;
    case "shield":
      activeEffects.shield = c.value;
      break;
  }
  showGoldNotify(c.icon + " " + c.name + " USED!");
  playUIClick();
}

// ══════════════════════════════════════════════
// INVENTORY SYSTEM
// ══════════════════════════════════════════════
function openInventory() {
  invOpen = true;
  document.getElementById("inv-overlay").classList.add("open");
  renderInventory();
  if (document.pointerLockElement === canvas) document.exitPointerLock();
  playUIClick();
}

function closeInventory() {
  invOpen = false;
  document.getElementById("inv-overlay").classList.remove("open");
}

function renderInventory() {
  const grid = document.getElementById("inv-weapons-grid");
  grid.innerHTML = "";
  playerInventory.weapons.forEach((wid) => {
    const w = WEAPONS[wid];
    const active = playerInventory.activeWeapon === wid;
    grid.innerHTML += `
    <div class="inv-weapon-card ${active ? "active" : ""}" onclick="invEquipWeapon('${wid}')">
      ${active ? '<div class="equip-label">EQUIPPED</div>' : ""}
      <div class="inv-weapon-icon">${w.icon}</div>
      <div class="inv-weapon-name">${w.name}</div>
      <div class="inv-weapon-stats">
        <div class="inv-stat-row"><span style="width:35px;color:#557766">DMG</span><div class="inv-stat-bar"><div class="inv-stat-fill dmg" style="width:${w.dmgStat}%"></div></div></div>
        <div class="inv-stat-row"><span style="width:35px;color:#557766">SPD</span><div class="inv-stat-bar"><div class="inv-stat-fill spd" style="width:${w.spdStat}%"></div></div></div>
        <div class="inv-stat-row"><span style="width:35px;color:#557766">RNG</span><div class="inv-stat-bar"><div class="inv-stat-fill range" style="width:${w.rangeStat}%"></div></div></div>
      </div>
      <div style="font-family:Orbitron;font-size:8px;color:#557766;margin-top:8px;letter-spacing:1px">MAG: ${w.maxAmmo} · RATE: ${Math.round((1000 / w.fireRate) * 10) / 10}/s</div>
    </div>`;
  });

  const conList = document.getElementById("inv-consumables-list");
  conList.innerHTML = "";
  let hasAny = false;
  Object.keys(playerInventory.consumables).forEach((cid) => {
    const qty = playerInventory.consumables[cid];
    if (qty <= 0) return;
    hasAny = true;
    const c = CONSUMABLES[cid];
    conList.innerHTML += `<div class="inv-consumable-chip" onclick="invUseConsumable('${cid}')"><span>${c.icon}</span><span>${c.name}<span class="qty">×${qty}</span></span></div>`;
  });
  if (!hasAny)
    conList.innerHTML =
      '<div style="font-size:13px;color:#446644;font-family:Orbitron;letter-spacing:2px;padding:8px">NO CONSUMABLES — BUY FROM SHOP</div>';

  document.getElementById("inv-stat-kills").textContent = kills;
  document.getElementById("inv-stat-waves").textContent = wave - 1;
  document.getElementById("inv-stat-gold").textContent = totalGoldEarned;
  document.getElementById("inv-stat-shots").textContent = shotsFired;
}

function invEquipWeapon(wid) {
  equipWeapon(wid);
  closeInventory();
}
function invUseConsumable(id) {
  useConsumable(id);
  closeInventory();
}

// ══════════════════════════════════════════════
// MOUSE / KEYBOARD
// ══════════════════════════════════════════════
canvas.addEventListener("click", () => {
  if (gameRunning && !shopOpen && !invOpen) canvas.requestPointerLock();
});
document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement === canvas) {
    targetAngleX -= e.movementX * 0.0018;
    targetAngleY = Math.max(
      -Math.PI / 3,
      Math.min(Math.PI / 3, targetAngleY - e.movementY * 0.0018),
    );
  }
});
document.addEventListener("mousedown", (e) => {
  if (gameRunning && e.button === 0 && !shopOpen && !invOpen) shoot();
});
const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (e.code === "KeyR" && !isReloading) startReload();
  if (e.code === "KeyB" && gameRunning) {
    shopOpen ? closeShop() : openShop();
  }
  if (e.code === "KeyI" && gameRunning) {
    invOpen ? closeInventory() : openInventory();
  }
  // Number keys to equip weapons
  const numMap = {
    Digit1: 0,
    Digit2: 1,
    Digit3: 2,
    Digit4: 3,
    Digit5: 4,
    Digit6: 5,
    Digit7: 6,
  };
  if (numMap[e.code] !== undefined) {
    const wkeys = playerInventory.weapons;
    const idx = numMap[e.code];
    if (idx < wkeys.length) equipWeapon(wkeys[idx]);
  }
  // Consumable hotkeys
  if (e.code === "KeyQ") {
    const cids = Object.keys(playerInventory.consumables).filter(
      (k) => playerInventory.consumables[k] > 0,
    );
    if (cids.length > 0) useConsumable(cids[0]);
  }
  if (e.code === "Escape") {
    if (shopOpen) closeShop();
    if (invOpen) closeInventory();
  }
});
document.addEventListener("keyup", (e) => (keys[e.code] = false));

// ══════════════════════════════════════════════
// MINIMAP
// ══════════════════════════════════════════════
function updateMinimap() {
  const map = document.getElementById("minimap");
  map.querySelectorAll(".minimap-enemy").forEach((e) => e.remove());
  const scale = 120 / 140,
    cx = camera.position.x,
    cz = camera.position.z;
  enemies.forEach((en) => {
    if (!en.userData.alive) return;
    const dx = en.position.x - cx,
      dz = en.position.z - cz,
      mx = 60 + dx * scale,
      my = 60 + dz * scale;
    if (mx < 0 || mx > 120 || my < 0 || my > 120) return;
    const d = document.createElement("div");
    if (en.userData.type === "boss") {
      d.style.cssText = `position:absolute;width:12px;height:12px;background:#ff0066;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px #ff0066,0 0 20px #ff0000;left:${mx}px;top:${my}px;animation:bossPulse 0.5s ease-in-out infinite alternate;`;
      d.className = "minimap-enemy";
    } else {
      d.className =
        "minimap-enemy" +
        (en.userData.type === "gun" || en.userData.type === "knife"
          ? " armed"
          : "");
    }
    d.style.left = mx + "px";
    d.style.top = my + "px";
    map.appendChild(d);
  });
  document.getElementById("minimap-fov").style.transform =
    `rotate(${camera.rotation.y}rad) translate(-50%,0%)`;
}

// ══════════════════════════════════════════════
// HAND TRACKING
// ══════════════════════════════════════════════
const handCanvas = document.getElementById("handCanvas");
const hctx = handCanvas.getContext("2d");
const CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [0, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [0, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  [5, 9],
  [9, 13],
  [13, 17],
];

function drawHand(lm, fist) {
  hctx.clearRect(0, 0, 185, 138);
  if (!lm) return;
  const pts = lm.map((p) => ({ x: (1 - p.x) * 185, y: p.y * 138 })),
    col = fist ? "#ff4400" : "#00ff88";
  hctx.save();
  hctx.strokeStyle = col;
  hctx.lineWidth = 2.2;
  hctx.shadowBlur = 10;
  hctx.shadowColor = col;
  CONNECTIONS.forEach(([a, b]) => {
    hctx.beginPath();
    hctx.moveTo(pts[a].x, pts[a].y);
    hctx.lineTo(pts[b].x, pts[b].y);
    hctx.stroke();
  });
  pts.forEach((pt, i) => {
    const r = i === 0 ? 7 : i % 4 === 0 ? 5 : 3;
    hctx.beginPath();
    hctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
    hctx.fillStyle = fist ? "#ff6600" : "#44ffaa";
    hctx.shadowBlur = 12;
    hctx.fill();
  });
  hctx.restore();
}

function updateGestureLabel() {
  const el = document.getElementById("gesture-label");
  if (el.className === "fire") return;
  if (isReloading) {
    el.textContent = "🔄 RELOADING...";
    el.className = "";
    return;
  }
  if (!handVisible) {
    el.textContent = "✋ Show Hand";
    el.className = "";
    return;
  }
  if (isFist) {
    el.textContent = "👊 FIRE!";
    el.className = "fire";
  } else {
    el.textContent = "🖐️ Aiming...";
    el.className = "";
  }
}

async function startCamera() {
  document.getElementById("gesture-label").textContent = "📷 Camera...";
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 240 },
    });
    document.getElementById("webcam").srcObject = stream;
    document.getElementById("cam-status").textContent = "Loading hand AI...";
    await loadMediaPipe(document.getElementById("webcam"));
  } catch (e) {
    document.getElementById("gesture-label").textContent = "🖱️ Mouse Mode";
    document.getElementById("cam-status").textContent = "No camera – use mouse";
  }
}

async function loadMediaPipe(video) {
  return new Promise((resolve) => {
    const s1 = document.createElement("script");
    s1.src = "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/hands.js";
    s1.crossOrigin = "anonymous";
    s1.onload = () => {
      const s2 = document.createElement("script");
      s2.src =
        "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js";
      s2.crossOrigin = "anonymous";
      s2.onload = () => {
        try {
          const hands = new Hands({
            locateFile: (f) =>
              `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${f}`,
          });
          hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 0,
            minDetectionConfidence: 0.65,
            minTrackingConfidence: 0.5,
          });
          hands.onResults((r) => {
            if (!r.multiHandLandmarks?.length) {
              handVisible = false;
              hctx.clearRect(0, 0, 185, 138);
              updateGestureLabel();
              return;
            }
            handVisible = true;
            const lm = r.multiHandLandmarks[0];
            rawHandX = 1 - lm[9].x;
            rawHandY = lm[9].y;
            const tips = [8, 12, 16, 20],
              mcps = [5, 9, 13, 17];
            let curl = 0;
            tips.forEach((t, i) => {
              if (lm[t].y > lm[mcps[i]].y) curl++;
            });
            const nowFist = curl >= 3,
              isPointing = lm[8].y < lm[6].y && lm[12].y > lm[10].y;
            if ((nowFist && !wasFist) || (isPointing && !wasPointing)) shoot();
            wasFist = nowFist;
            wasPointing = isPointing;
            isFist = nowFist;
            drawHand(lm, nowFist);
            updateGestureLabel();
          });
          const cam = new Camera(video, {
            onFrame: async () => await hands.send({ image: video }),
            width: 320,
            height: 240,
          });
          cam.start();
          gestureMode = true;
          document.getElementById("cam-status").textContent = "✅ Tracking ON";
          document.getElementById("gesture-label").textContent = "✋ Show Hand";
          resolve();
        } catch (e) {
          document.getElementById("cam-status").textContent = "Fallback: mouse";
          resolve();
        }
      };
      s2.onerror = () => resolve();
      document.head.appendChild(s2);
    };
    s1.onerror = () => resolve();
    document.head.appendChild(s1);
  });
}

// ══════════════════════════════════════════════
// START SCREEN BACKGROUND
// ══════════════════════════════════════════════
function animateStartBg() {
  const c = document.getElementById("start-bg-canvas");
  if (!c) return;
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  const ctx = c.getContext("2d");
  let t = 0;
  const pts = Array.from({ length: 80 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
    col: `hsla(${100 + Math.random() * 60},80%,50%,`,
  }));
  const loop = () => {
    if (
      !document.getElementById("start-screen") ||
      document.getElementById("start-screen").style.display === "none"
    )
      return;
    ctx.fillStyle = "rgba(0,5,0,.12)";
    ctx.fillRect(0, 0, c.width, c.height);
    pts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > c.width) p.vx *= -1;
      if (p.y < 0 || p.y > c.height) p.vy *= -1;
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
      grd.addColorStop(0, p.col + "0.8)");
      grd.addColorStop(1, p.col + "0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    });
    t++;
    requestAnimationFrame(loop);
  };
  loop();
}

// ══════════════════════════════════════════════
// WORMHOLE INTRO
// ══════════════════════════════════════════════
(function initWormhole() {
  var wCanvas = document.getElementById("wormhole-canvas");
  var wRenderer = new THREE.WebGLRenderer({
    canvas: wCanvas,
    antialias: true,
    alpha: false,
  });
  wRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  wRenderer.setSize(window.innerWidth, window.innerHeight);
  wRenderer.setClearColor(0x000005, 1);
  var wScene = new THREE.Scene(),
    wCamera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      600,
    );
  wCamera.position.z = 5;
  function lrp(a, b, t) {
    return a + (b - a) * t;
  }
  var bgV = [];
  for (var i = 0; i < 9000; i++) {
    var _r = 90 + Math.random() * 130,
      _th = Math.random() * Math.PI * 2,
      _ph = Math.acos(2 * Math.random() - 1);
    bgV.push(
      _r * Math.sin(_ph) * Math.cos(_th),
      _r * Math.sin(_ph) * Math.sin(_th),
      _r * Math.cos(_ph),
    );
  }
  var bgGeo = new THREE.BufferGeometry();
  bgGeo.setAttribute("position", new THREE.Float32BufferAttribute(bgV, 3));
  var bgMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.3,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  });
  var bgStars = new THREE.Points(bgGeo, bgMat);
  wScene.add(bgStars);
  function mkNeb(n, col, spread, zr, sz, op) {
    var v = [];
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2,
        r2 = Math.pow(Math.random(), 0.5) * spread;
      v.push(Math.cos(a) * r2, Math.sin(a) * r2, (Math.random() - 0.5) * zr);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    var m = new THREE.PointsMaterial({
      color: col,
      size: sz,
      sizeAttenuation: true,
      transparent: true,
      opacity: op,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return new THREE.Points(g, m);
  }
  wScene.add(mkNeb(3500, 0x1133ff, 40, 70, 2.0, 0.15));
  wScene.add(mkNeb(2800, 0x6600bb, 32, 55, 2.5, 0.12));
  wScene.add(mkNeb(2200, 0x0099ff, 24, 45, 1.6, 0.14));
  wScene.add(mkNeb(1800, 0xff1155, 18, 35, 1.2, 0.1));
  wScene.add(mkNeb(1200, 0x00ffcc, 12, 25, 1.0, 0.13));
  var TCNT = 14000,
    tPosArr = new Float32Array(TCNT * 3),
    tColArr = new Float32Array(TCNT * 3),
    tPh = new Float32Array(TCNT),
    tRad = new Float32Array(TCNT),
    tSpd = new Float32Array(TCNT);
  function resetP(i, zOv) {
    var z = zOv !== undefined ? zOv : -130 + Math.random() * 5;
    tPh[i] = Math.random() * Math.PI * 2;
    tRad[i] = 0.2 + Math.pow(Math.random(), 0.6) * 8;
    tSpd[i] = 0.009 + Math.random() * 0.02;
    var dt = Math.max(0, Math.min(1, 1 - (z + 130) / 130));
    var rr = tRad[i] * (0.08 + dt * 0.92);
    var ang = tPh[i] + z * 0.055;
    tPosArr[i * 3] = Math.cos(ang) * rr;
    tPosArr[i * 3 + 1] = Math.sin(ang) * rr;
    tPosArr[i * 3 + 2] = z;
    var ct = Math.min(1, tRad[i] / 8);
    tColArr[i * 3] = lrp(0.9, 0.05, ct);
    tColArr[i * 3 + 1] = lrp(1, 0.45, ct);
    tColArr[i * 3 + 2] = lrp(1, 0.85, ct);
  }
  for (var j = 0; j < TCNT; j++) resetP(j, -130 + Math.random() * 136);
  var tGeo = new THREE.BufferGeometry();
  tGeo.setAttribute("position", new THREE.Float32BufferAttribute(tPosArr, 3));
  tGeo.setAttribute("color", new THREE.Float32BufferAttribute(tColArr, 3));
  var tMat = new THREE.PointsMaterial({
    size: 0.055,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  var tMesh = new THREE.Points(tGeo, tMat);
  wScene.add(tMesh);
  var wRings = [];
  for (var ri = 0; ri < 9; ri++) {
    var rr2 = 0.4 + ri * 0.72,
      rGeo = new THREE.RingGeometry(rr2 - 0.045, rr2 + 0.045, 72),
      rAlpha = 0.65 - ri * 0.055;
    var rMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.57 + ri * 0.018, 1, 0.72),
      transparent: true,
      opacity: rAlpha,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    var ring2 = new THREE.Mesh(rGeo, rMat2);
    ring2.position.z = -0.3 - ri * 0.08;
    ring2.userData = { base: rAlpha, phase: ri * 0.75 };
    wScene.add(ring2);
    wRings.push(ring2);
  }
  var sGrp = new THREE.Group();
  for (var si = 0; si < 72; si++) {
    var bA = (si / 72) * Math.PI * 2,
      spts = [];
    for (var p = 0; p <= 28; p++) {
      var st = p / 28,
        sr = Math.pow(1 - st, 1.4) * (3.5 + Math.random() * 3),
        sz = -st * 25 - Math.random() * 4,
        sa = bA + st * 1.4 * (si % 2 === 0 ? 1 : -1);
      spts.push(new THREE.Vector3(Math.cos(sa) * sr, Math.sin(sa) * sr, sz));
    }
    var crv = new THREE.CatmullRomCurve3(spts);
    var sGeo2 = new THREE.TubeGeometry(
      crv,
      22,
      0.007 + Math.random() * 0.012,
      4,
      false,
    );
    var sMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.54 + Math.random() * 0.18, 1, 0.82),
      transparent: true,
      opacity: 0.22 + Math.random() * 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    sGrp.add(new THREE.Mesh(sGeo2, sMat2));
  }
  wScene.add(sGrp);
  var cMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.38, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xaaddff,
      transparent: true,
      opacity: 0.95,
    }),
  );
  wScene.add(cMesh);
  var cLight = new THREE.PointLight(0x88ccff, 5, 22);
  wScene.add(cLight);
  var wT = 0,
    diving = false,
    diveT = 0,
    wRunning = true;
  function wLoop() {
    if (!wRunning) return;
    requestAnimationFrame(wLoop);
    wT += 0.016;
    var spMult = diving ? 1 + diveT * 18 : 1;
    var pa = tGeo.attributes.position.array;
    for (var i = 0; i < TCNT; i++) {
      pa[i * 3 + 2] += tSpd[i] * spMult;
      if (pa[i * 3 + 2] > 7) {
        resetP(i);
        continue;
      }
      var z2 = pa[i * 3 + 2],
        dt2 = Math.max(0, Math.min(1, 1 - (z2 + 130) / 130)),
        rr3 = tRad[i] * (0.08 + dt2 * 0.92),
        ang2 = tPh[i] + z2 * 0.055 + wT * 0.12;
      pa[i * 3] = Math.cos(ang2) * rr3;
      pa[i * 3 + 1] = Math.sin(ang2) * rr3;
    }
    tGeo.attributes.position.needsUpdate = true;
    sGrp.rotation.z = -wT * 0.07;
    bgStars.rotation.y = wT * 0.004;
    wRings.forEach((r) => {
      r.material.opacity =
        r.userData.base *
        (0.55 + 0.55 * Math.abs(Math.sin(wT * 2 + r.userData.phase)));
      r.rotation.z = wT * 0.22 + r.userData.phase * 0.28;
      r.scale.setScalar(1 + 0.04 * Math.sin(wT * 1.5 + r.userData.phase));
    });
    var cp = 0.75 + Math.abs(Math.sin(wT * 2.3)) * 0.5;
    cMesh.scale.setScalar(cp);
    cLight.intensity = 4 + cp * 4;
    if (diving) {
      diveT = Math.min(1, diveT + 0.013);
      var ease = diveT * diveT * (3 - 2 * diveT);
      wCamera.position.z = 5 - ease * 160;
      wCamera.fov = 70 + ease * 70;
      wCamera.updateProjectionMatrix();
      tMat.opacity = Math.max(0, 0.88 - ease * 0.5);
      if (diveT >= 1) {
        wRunning = false;
        var el = document.getElementById("wormhole-intro");
        if (el) el.remove();
        showStoryIntro();
        return;
      }
    }
    wRenderer.render(wScene, wCamera);
  }
  wLoop();
  window.addEventListener("resize", () => {
    wCamera.aspect = window.innerWidth / window.innerHeight;
    wCamera.updateProjectionMatrix();
    wRenderer.setSize(window.innerWidth, window.innerHeight);
  });
  window.launchWormholeDive = () => {
    if (diving) return;
    diving = true;
    diveT = 0;
    const cta = document.getElementById("wormhole-cta");
    if (cta) {
      cta.style.transition = "opacity .4s";
      cta.style.opacity = "0";
      setTimeout(() => (cta.style.display = "none"), 400);
    }
    const ttl = document.getElementById("wormhole-title");
    if (ttl) {
      ttl.style.transition = "opacity .6s";
      ttl.style.opacity = "0";
    }
  };
  document
    .getElementById("wormhole-canvas")
    .addEventListener("click", window.launchWormholeDive);
})();

// ══════════════════════════════════════════════
// HOUSE SYSTEM
// ══════════════════════════════════════════════
function buildHouse(x, z, bk, isHaunted, isAbandoned) {
  const g = new THREE.Group(),
    gy = getTerrainHeight(x, z, bk);
  let wallColor, roofColor, windowColor, doorColor, trimColor;
  if (isHaunted) {
    wallColor = 0x1a0a0a;
    roofColor = 0x0d0505;
    windowColor = 0xffcc00;
    doorColor = 0x0a0505;
    trimColor = 0x2a0808;
  } else if (isAbandoned) {
    wallColor = 0x6a5a42;
    roofColor = 0x3a2a18;
    windowColor = 0x111108;
    doorColor = 0x3a2a18;
    trimColor = 0x5a4a35;
  } else {
    const np = {
      jungle: {
        wall: 0x8a6a40,
        roof: 0x5a3a18,
        win: 0xaaddff,
        door: 0x6a4020,
        trim: 0x9a7a50,
      },
      snow: {
        wall: 0xddeeff,
        roof: 0x4466aa,
        win: 0x88ccff,
        door: 0x4455aa,
        trim: 0xffffff,
      },
      hills: {
        wall: 0xaa8855,
        roof: 0x663322,
        win: 0xffddaa,
        door: 0x553322,
        trim: 0xbbaa88,
      },
      desert: {
        wall: 0xd4b870,
        roof: 0xaa7730,
        win: 0xffeecc,
        door: 0x8a5520,
        trim: 0xc8a855,
      },
      swamp: {
        wall: 0x4a5a3a,
        roof: 0x2a3a1a,
        win: 0x88ff88,
        door: 0x2a3a18,
        trim: 0x5a6a4a,
      },
    };
    const pal = np[bk] || np.jungle;
    wallColor = pal.wall;
    roofColor = pal.roof;
    windowColor = pal.win;
    doorColor = pal.door;
    trimColor = pal.trim;
  }
  const wallMat = new THREE.MeshLambertMaterial({ color: wallColor }),
    roofMat = new THREE.MeshLambertMaterial({ color: roofColor }),
    winMat = new THREE.MeshBasicMaterial({
      color: windowColor,
      transparent: true,
      opacity: isHaunted ? 0.9 : isAbandoned ? 0.2 : 0.7,
    }),
    doorMat = new THREE.MeshLambertMaterial({ color: doorColor }),
    trimMat = new THREE.MeshLambertMaterial({ color: trimColor });
  const scale = 0.85 + Math.random() * 0.45,
    W = 4 * scale,
    H = 3.2 * scale,
    D = 3.5 * scale;
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(W + 0.3, 0.28, D + 0.3),
    trimMat,
  );
  foundation.position.y = 0.14;
  g.add(foundation);
  const walls = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), wallMat);
  walls.position.y = H / 2 + 0.28;
  walls.castShadow = true;
  g.add(walls);
  const roofH = H * 0.65,
    roof = new THREE.Mesh(
      new THREE.ConeGeometry(Math.max(W, D) * 0.75, roofH, 4),
      roofMat,
    );
  roof.rotation.y = Math.PI / 4;
  roof.position.y = H + 0.28 + roofH / 2;
  roof.castShadow = true;
  g.add(roof);
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.75 * scale, 1.5 * scale, 0.08),
    doorMat,
  );
  door.position.set(0, 1.06 * scale + 0.28, D / 2 + 0.04);
  g.add(door);
  if (isHaunted) {
    const hauntGlow = new THREE.PointLight(0xffcc00, 1.2, 8);
    hauntGlow.position.set(0, H * 0.6 + 0.28, 0);
    g.add(hauntGlow);
    hauntedLights.push({
      light: hauntGlow,
      baseIntensity: 1.2,
      phase: Math.random() * Math.PI * 2,
    });
  }
  g.position.set(x, gy, z);
  g.rotation.y = Math.random() * Math.PI * 2;
  placedObj(g);
  addCollider(x, z, Math.max(W, D) * 0.55);
}

function spawnHousesForBiome(bk) {
  const houseCount = 8 + Math.floor(Math.random() * 7);
  for (let i = 0; i < houseCount; i++) {
    let x,
      z,
      attempts = 0;
    do {
      const angle =
          (i / houseCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.8,
        dist = 18 + Math.random() * 52;
      x = Math.cos(angle) * dist;
      z = Math.sin(angle) * dist;
      attempts++;
    } while (x * x + z * z < 100 && attempts < 20);
    const rng = Math.random(),
      isHaunted = rng < 0.22,
      isAbandoned = !isHaunted && rng < 0.48;
    buildHouse(x, z, bk, isHaunted, isAbandoned);
  }
}

function updateHauntedEffects(t) {
  hauntedLights.forEach((h) => {
    if (h.light)
      h.light.intensity =
        h.baseIntensity *
        (0.5 +
          0.6 * Math.abs(Math.sin(t * 0.07 + h.phase)) +
          0.15 * Math.sin(t * 0.23 + h.phase));
    if (h.orb) {
      h.orb.position.y = h.baseY + Math.sin(t * 0.05 + h.phase) * 0.35;
      h.orb.material.opacity =
        0.5 + 0.45 * Math.abs(Math.sin(t * 0.04 + h.phase));
    }
  });
}

// ══════════════════════════════════════════════
// WEB AUDIO
// ══════════════════════════════════════════════
let audioCtx = null,
  masterGain = null,
  ambienceNodes = [];

function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.55, audioCtx.currentTime + 3.5);
  masterGain.connect(audioCtx.destination);
  startAmbience();
}

function makeOscNode(freq, type, gainVal, lfoFreq, lfoDepth) {
  const osc = audioCtx.createOscillator(),
    g = audioCtx.createGain(),
    lfo = audioCtx.createOscillator(),
    lfoG = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  lfo.type = "sine";
  lfo.frequency.value = lfoFreq;
  lfoG.gain.value = lfoDepth;
  lfo.connect(lfoG);
  lfoG.connect(osc.frequency);
  g.gain.value = gainVal;
  osc.connect(g);
  g.connect(masterGain);
  osc.start();
  lfo.start();
  ambienceNodes.push(osc, lfo);
  return { osc, gain: g };
}

function makeWindNoise(gainVal) {
  const bufLen = audioCtx.sampleRate * 2,
    buf = audioCtx.createBuffer(1, bufLen, audioCtx.sampleRate),
    data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufLen; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.08 * w) / 1.08;
    data[i] = last * 18;
  }
  const src = audioCtx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const filt = audioCtx.createBiquadFilter();
  filt.type = "bandpass";
  filt.frequency.value = 320;
  filt.Q.value = 0.4;
  const g = audioCtx.createGain();
  g.gain.value = gainVal;
  src.connect(filt);
  filt.connect(g);
  g.connect(masterGain);
  src.start();
  ambienceNodes.push(src);
  const lfo = audioCtx.createOscillator(),
    lfoG = audioCtx.createGain();
  lfo.frequency.value = 0.07;
  lfoG.gain.value = 180;
  lfo.connect(lfoG);
  lfoG.connect(filt.frequency);
  lfo.start();
  ambienceNodes.push(lfo);
}

function startAmbience() {
  makeOscNode(42, "sine", 0.18, 0.03, 0.8);
  makeOscNode(87, "sine", 0.07, 0.11, 2);
  makeOscNode(63, "triangle", 0.05, 0.07, 1.2);
  makeOscNode(348, "sine", 0.018, 0.19, 4);
  makeWindNoise(0.06);
}

function playUIClick() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator(),
    g = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(880, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.12);
  g.gain.setValueAtTime(0.22, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
  osc.connect(g);
  g.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

function playTypeSound() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator(),
    g = audioCtx.createGain();
  osc.type = "square";
  osc.frequency.value = 600 + Math.random() * 200;
  g.gain.setValueAtTime(0.04, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.055);
  osc.connect(g);
  g.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.06);
}

function playStoryTransition() {
  if (!audioCtx) return;
  [0, 0.08, 0.16].forEach((delay, i) => {
    const osc = audioCtx.createOscillator(),
      g = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = [330, 440, 550][i];
    g.gain.setValueAtTime(0, audioCtx.currentTime + delay);
    g.gain.linearRampToValueAtTime(0.14, audioCtx.currentTime + delay + 0.05);
    g.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + delay + 0.5,
    );
    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + 0.6);
  });
}

function playGameStartSound() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator(),
    g = audioCtx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(80, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.9);
  g.gain.setValueAtTime(0.0, audioCtx.currentTime);
  g.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.1);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.1);
  const filt = audioCtx.createBiquadFilter();
  filt.type = "lowpass";
  filt.frequency.setValueAtTime(200, audioCtx.currentTime);
  filt.frequency.exponentialRampToValueAtTime(4000, audioCtx.currentTime + 0.9);
  osc.connect(filt);
  filt.connect(g);
  g.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 1.2);
}

// ══════════════════════════════════════════════
// STORY INTRO SYSTEM
// ══════════════════════════════════════════════
const STORY_PAGES = [
  {
    chapter: "CHAPTER 01 · THE CURSE",
    title: "BORN FROM THE RIFT",
    text: "The Wormhole didn't just transport you — it rewrote you.\n\nYou were a soldier. Now you are something else. Something the biomes have been waiting for. The land is fractured across five worlds, each consumed by a darkness older than memory.",
  },
  {
    chapter: "CHAPTER 02 · THE MISSION",
    title: "CLEANSE THE BIOMES",
    text: "Corrupted hunters stalk every jungle path, every frozen ridge, every scorched dune. Some carry guns. Some carry blades. All of them want you dead.\n\nYour orders: eliminate every last one. Collect their gold. Arm yourself. Each wave you survive, the darkness grows stronger.",
  },
  {
    chapter: "CHAPTER 03 · THE WARNING",
    title: "THEY KNOW YOU'RE HERE",
    text: "The creatures felt your arrival through the Wormhole. Gunners shoot from distance. Knife wielders rush fast.\n\nKill them. Take their gold. Visit the ARMORY between waves — buy weapons, medkits, and power-ups to survive what's coming.",
  },
  {
    chapter: "READY · GUARDIAN",
    title: "THE HUNT BEGINS",
    text: "Five biomes. Endless waves. Seven weapons to master.\n\nWASD to move. Click to fire. B=Shop, I=Inventory. Q=Use consumable. Keys 1-7 to swap weapons.\n\nStep forward. The Cursebound world awaits.",
  },
];

let storyPage = 0,
  storyTyping = false,
  storyTypeInterval = null,
  storyEmberInterval = null;

function showStoryIntro() {
  initAudio();
  const el = document.getElementById("story-screen");
  el.classList.add("active");
  spawnStoryEmbers();
  buildStoryDots();
  loadStoryPage(0);
}
function buildStoryDots() {
  const c = document.getElementById("story-page-dots");
  c.innerHTML = "";
  STORY_PAGES.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "story-dot" + (i === 0 ? " active" : "");
    c.appendChild(d);
  });
}
function updateStoryDots(idx) {
  document.querySelectorAll(".story-dot").forEach((d, i) => {
    d.className = "story-dot" + (i === idx ? " active" : "");
  });
}
function loadStoryPage(idx) {
  storyPage = idx;
  const page = STORY_PAGES[idx];
  const btn = document.getElementById("story-continue");
  btn.classList.remove("visible");
  btn.textContent =
    idx === STORY_PAGES.length - 1 ? "▶ ENTER THE WORLD" : "▶ CONTINUE";
  document.getElementById("story-chapter").textContent = page.chapter;
  document.getElementById("story-title").innerHTML = page.title.replace(
    /\n/g,
    "<br>",
  );
  document.getElementById("story-typewriter").textContent = "";
  updateStoryDots(idx);
  playStoryTransition();
  startTypewriter(page.text, () => {
    document.getElementById("story-cursor").style.display = "none";
    document.getElementById("story-continue").classList.add("visible");
  });
}
function startTypewriter(text, onDone) {
  storyTyping = true;
  clearInterval(storyTypeInterval);
  const el = document.getElementById("story-typewriter");
  document.getElementById("story-cursor").style.display = "inline-block";
  el.textContent = "";
  el.style.whiteSpace = "pre-line";
  let i = 0;
  storyTypeInterval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      if (i % 3 === 0) playTypeSound();
      i++;
    } else {
      clearInterval(storyTypeInterval);
      storyTyping = false;
      if (onDone) onDone();
    }
  }, 28);
}
function storyNext() {
  playUIClick();
  if (storyTyping) {
    clearInterval(storyTypeInterval);
    storyTyping = false;
    const page = STORY_PAGES[storyPage];
    document.getElementById("story-typewriter").textContent = page.text;
    document.getElementById("story-cursor").style.display = "none";
    document.getElementById("story-continue").classList.add("visible");
    return;
  }
  if (storyPage < STORY_PAGES.length - 1) {
    loadStoryPage(storyPage + 1);
  } else {
    launchFromStory();
  }
}
function storySkip() {
  playUIClick();
  clearInterval(storyTypeInterval);
  launchFromStory();
}
function launchFromStory() {
  playGameStartSound();
  clearInterval(storyEmberInterval);
  const el = document.getElementById("story-screen");
  el.style.transition = "opacity 0.7s";
  el.style.opacity = "0";
  setTimeout(() => {
    el.style.display = "none";
    startGame();
  }, 700);
}
function spawnStoryEmbers() {
  const parent = document.getElementById("story-screen");
  storyEmberInterval = setInterval(() => {
    if (!document.getElementById("story-screen").classList.contains("active"))
      return;
    const ember = document.createElement("div");
    ember.className = "story-ember";
    const size = 2 + Math.random() * 4,
      hue = 10 + Math.random() * 30;
    ember.style.cssText = `left:${Math.random() * 100}%;bottom:-10px;width:${size}px;height:${size}px;background:hsl(${hue},100%,65%);box-shadow:0 0 ${size * 2}px hsl(${hue},100%,65%);animation-duration:${4 + Math.random() * 5}s;animation-delay:0s;`;
    parent.appendChild(ember);
    setTimeout(() => ember.remove(), 9000);
  }, 220);
}

// ══════════════════════════════════════════════
// BOSS SYSTEM
// ══════════════════════════════════════════════
const BOSS_MAX_HP = 1000;
const BOSS_PHASES = [
  {
    name: "PHASE 1 · BERSERKER",
    hpThreshold: 1.0,
    color: "#ff4400",
    speed: 0.022,
    shootInterval: 1800,
    label: "PHASE 1",
    weapon: "minigun",
  },
  {
    name: "PHASE 2 · PREDATOR",
    hpThreshold: 0.6,
    color: "#ff2200",
    speed: 0.032,
    shootInterval: 1200,
    label: "PHASE 2",
    weapon: "shotgun",
  },
  {
    name: "PHASE 3 · ANNIHILATOR",
    hpThreshold: 0.3,
    color: "#ff0066",
    speed: 0.048,
    shootInterval: 700,
    label: "PHASE 3 · ENRAGED",
    weapon: "rocket",
  },
];

function spawnBoss() {
  bossActive = true;
  bossPhase = 0;
  const g = new THREE.Group();

  // BODY - massive and imposing
  const coreMat = new THREE.MeshLambertMaterial({ color: 0x1a0000 });
  const armorMat = new THREE.MeshLambertMaterial({ color: 0x330800 });
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xff2200,
    transparent: true,
    opacity: 0.9,
  });

  // Main torso - much bigger than normal enemy
  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 0.9), armorMat);
  torso.position.y = 1.6;
  torso.castShadow = true;
  g.add(torso);

  // Chest armor plates
  const chestPlate = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 1.0, 0.12),
    new THREE.MeshLambertMaterial({ color: 0x550800 }),
  );
  chestPlate.position.set(0, 2.0, 0.5);
  g.add(chestPlate);
  const chestPlate2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.6, 0.12),
    new THREE.MeshLambertMaterial({ color: 0x660a00 }),
  );
  chestPlate2.position.set(0, 2.5, 0.5);
  g.add(chestPlate2);

  // Head - horned skull-like
  const head = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.0), armorMat);
  head.position.y = 3.3;
  head.castShadow = true;
  g.add(head);

  // Horns
  const hornMat = new THREE.MeshLambertMaterial({ color: 0x220000 });
  const hornL = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.0, 6), hornMat);
  hornL.position.set(-0.45, 4.2, 0);
  hornL.rotation.z = 0.3;
  g.add(hornL);
  const hornR = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.0, 6), hornMat);
  hornR.position.set(0.45, 4.2, 0);
  hornR.rotation.z = -0.3;
  g.add(hornR);

  // Glowing red eyes
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const eyeGeo = new THREE.SphereGeometry(0.14, 8, 8);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.28, 3.4, 0.52);
  g.add(eyeL);
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
  eyeR.position.set(0.28, 3.4, 0.52);
  g.add(eyeR);
  const eyeGlowL = new THREE.PointLight(0xff0000, 1.5, 4);
  eyeGlowL.position.set(-0.28, 3.4, 0.6);
  g.add(eyeGlowL);
  const eyeGlowR = new THREE.PointLight(0xff0000, 1.5, 4);
  eyeGlowR.position.set(0.28, 3.4, 0.6);
  g.add(eyeGlowR);

  // Shoulder armor spikes
  const spikeMat = new THREE.MeshLambertMaterial({ color: 0x440000 });
  for (let s = 0; s < 3; s++) {
    const spL = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5, 5), spikeMat);
    spL.position.set(-0.9, 2.4 - s * 0.25, 0);
    spL.rotation.z = -Math.PI / 3 + s * 0.1;
    g.add(spL);
    const spR = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5, 5), spikeMat);
    spR.position.set(0.9, 2.4 - s * 0.25, 0);
    spR.rotation.z = Math.PI / 3 - s * 0.1;
    g.add(spR);
  }

  // Arms - thick and menacing
  const aL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.4, 0.42), armorMat);
  aL.position.set(-1.08, 1.6, 0);
  g.add(aL);
  const aR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.4, 0.42), armorMat);
  aR.position.set(1.08, 1.6, 0);
  g.add(aR);

  // Legs
  const lL = new THREE.Mesh(new THREE.BoxGeometry(0.52, 1.4, 0.52), coreMat);
  lL.position.set(-0.42, 0.4, 0);
  g.add(lL);
  const lR = new THREE.Mesh(new THREE.BoxGeometry(0.52, 1.4, 0.52), coreMat);
  lR.position.set(0.42, 0.4, 0);
  g.add(lR);

  // WEAPON 1: Giant cannon on right arm
  const cannonMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
  const cannonBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.35, 0.9),
    cannonMat,
  );
  cannonBody.position.set(1.28, 1.4, -0.45);
  g.add(cannonBody);
  const cannonBarrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.16, 1.1, 10),
    cannonMat,
  );
  cannonBarrel.rotation.x = Math.PI / 2;
  cannonBarrel.position.set(1.28, 1.4, -1.0);
  g.add(cannonBarrel);
  const cannonFlare = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 0.35, 10),
    new THREE.MeshBasicMaterial({
      color: 0xff4400,
      transparent: true,
      opacity: 0,
    }),
  );
  cannonFlare.rotation.x = Math.PI / 2;
  cannonFlare.position.set(1.28, 1.4, -1.6);
  g.add(cannonFlare);

  // WEAPON 2: Blade/axe on left arm
  const bladeMat = new THREE.MeshLambertMaterial({ color: 0x888899 });
  const bladeHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8),
    new THREE.MeshLambertMaterial({ color: 0x3a1a00 }),
  );
  bladeHandle.rotation.x = Math.PI / 2;
  bladeHandle.position.set(-1.28, 1.4, -0.6);
  g.add(bladeHandle);
  const bladeHead = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.55, 0.1),
    bladeMat,
  );
  bladeHead.position.set(-1.28, 1.55, -1.1);
  g.add(bladeHead);
  const bladeTip = new THREE.Mesh(
    new THREE.ConeGeometry(0.12, 0.35, 5),
    bladeMat,
  );
  bladeTip.rotation.x = Math.PI / 2;
  bladeTip.position.set(-1.28, 1.4, -1.42);
  g.add(bladeTip);
  const bladeGlow = new THREE.PointLight(0x8888ff, 0.8, 2);
  bladeGlow.position.set(-1.28, 1.4, -1.4);
  g.add(bladeGlow);

  // Spine spikes down the back
  for (let s = 0; s < 5; s++) {
    const sp = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.6, 5), spikeMat);
    sp.position.set(0, 2.8 - s * 0.38, -0.48);
    sp.rotation.x = Math.PI / 2 + 0.2;
    g.add(sp);
  }

  // Glowing energy core on chest
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), glowMat);
  core.position.set(0, 2.0, 0.52);
  g.add(core);
  const coreLight = new THREE.PointLight(0xff2200, 3, 8);
  coreLight.position.set(0, 2.0, 0.6);
  g.add(coreLight);

  // Footstep dust cloud
  const dustMat = new THREE.MeshBasicMaterial({
    color: 0x443322,
    transparent: true,
    opacity: 0.3,
  });
  const dustRing = new THREE.Mesh(
    new THREE.RingGeometry(0.8, 1.5, 16),
    dustMat,
  );
  dustRing.rotation.x = -Math.PI / 2;
  dustRing.position.y = 0.05;
  g.add(dustRing);

  // Aura ring
  const auraMat = new THREE.MeshBasicMaterial({
    color: 0xff2200,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  });
  const aura = new THREE.Mesh(new THREE.RingGeometry(2.5, 3.0, 24), auraMat);
  aura.rotation.x = -Math.PI / 2;
  aura.position.y = 0.1;
  g.add(aura);

  // Position boss
  const spawnAngle = Math.random() * Math.PI * 2,
    spawnDist = 30;
  const bx = Math.cos(spawnAngle) * spawnDist,
    bz = Math.sin(spawnAngle) * spawnDist;
  const bgy = getTerrainHeight(bx, bz, currentBiomeKey);
  g.position.set(bx, bgy, bz);
  g.scale.setScalar(1.4); // Scale up for imposing size

  g.userData = {
    hp: BOSS_MAX_HP,
    maxHp: BOSS_MAX_HP,
    alive: true,
    speed: BOSS_PHASES[0].speed,
    lastHit: 0,
    walkPhase: 0,
    eyeGlowL,
    eyeGlowR,
    coreLight,
    cannonFlare,
    bladeGlow,
    aura,
    core,
    aL,
    aR,
    lL,
    lR,
    dustRing,
    lastShot: 0,
    shootInterval: BOSS_PHASES[0].shootInterval,
    type: "boss",
    goldDrop: 500,
    phase: 0,
  };
  bossEntity = g;
  scene.add(g);
  enemies.push(g);
  document.getElementById("enemiesVal").textContent = enemies.length;

  // Show boss HUD
  document.getElementById("boss-hud").classList.add("visible");
  updateBossHUD(BOSS_MAX_HP, BOSS_MAX_HP, 0);

  // Boss announce
  const ann = document.getElementById("boss-announce");
  ann.classList.remove("show");
  void ann.offsetWidth;
  ann.classList.add("show");

  // Dramatic red flash
  const fl = document.getElementById("flash");
  fl.style.background = "red";
  fl.style.opacity = "0.4";
  setTimeout(() => {
    fl.style.opacity = "0";
    setTimeout(() => (fl.style.background = "white"), 500);
  }, 400);

  // Screen shake via camera wobble
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      targetAngleX += (Math.random() - 0.5) * 0.04;
      targetAngleY += (Math.random() - 0.5) * 0.02;
    }, i * 60);
  }

  if (audioCtx) playBossAlarm();
}

function updateBossHUD(hp, maxHp, phase) {
  const pct = Math.max(0, (hp / maxHp) * 100);
  document.getElementById("boss-bar-fill").style.width = pct + "%";
  document.getElementById("boss-hp-text").textContent =
    Math.max(0, hp) + " / " + maxHp;
  const p = BOSS_PHASES[Math.min(phase, BOSS_PHASES.length - 1)];
  document.getElementById("boss-phase-label").textContent = p.name;
  // Color bar by phase
  const colors = [
    "linear-gradient(90deg,#ff0000,#ff4400,#ff8800)",
    "linear-gradient(90deg,#ff0000,#ff2200,#ff6600)",
    "linear-gradient(90deg,#cc0000,#ff0000,#ff0066)",
  ];
  document.getElementById("boss-bar-fill").style.background =
    colors[Math.min(phase, 2)];
}

function updateBoss(dt) {
  if (!bossActive || !bossEntity || !bossEntity.userData.alive) return;
  const b = bossEntity,
    ud = b.userData;
  ud.walkPhase += dt * 0.1;

  // Phase transitions
  const hpPct = ud.hp / ud.maxHp;
  let newPhase = 0;
  if (hpPct <= 0.3) newPhase = 2;
  else if (hpPct <= 0.6) newPhase = 1;
  if (newPhase !== ud.phase) {
    ud.phase = newPhase;
    const p = BOSS_PHASES[newPhase];
    ud.speed = p.speed;
    ud.shootInterval = p.shootInterval;
    updateBossHUD(ud.hp, ud.maxHp, ud.phase);
    // Phase change flash
    if (audioCtx) playBossPhaseChange();
    showGoldNotify("⚠️ BOSS " + p.label + "!");
    for (let i = 0; i < 6; i++)
      setTimeout(() => {
        const df = document.getElementById("damage-flash");
        df.style.opacity = ".5";
        setTimeout(() => (df.style.opacity = "0"), 80);
      }, i * 120);
  }

  // Move toward player
  const to = new THREE.Vector3().subVectors(camera.position, b.position);
  to.y = 0;
  const distToPlayer = to.length();
  to.normalize();
  b.position.addScaledVector(to, ud.speed * dt * (1 + ud.phase * 0.3));
  b.lookAt(
    new THREE.Vector3(camera.position.x, b.position.y, camera.position.z),
  );

  // Walk animation
  const wp = ud.walkPhase;
  if (ud.aL) ud.aL.rotation.x = Math.sin(wp) * 0.5;
  if (ud.aR) ud.aR.rotation.x = -Math.sin(wp) * 0.5;
  if (ud.lL) ud.lL.rotation.x = -Math.sin(wp) * 0.6;
  if (ud.lR) ud.lR.rotation.x = Math.sin(wp) * 0.6;

  // Terrain following
  const bgy = getTerrainHeight(b.position.x, b.position.z, currentBiomeKey);
  b.position.y += (bgy - b.position.y) * 0.1;

  // Core pulse
  if (ud.core)
    ud.core.material.opacity = 0.6 + 0.35 * Math.abs(Math.sin(time * 0.12));
  if (ud.coreLight)
    ud.coreLight.intensity =
      2.5 + 1.5 * Math.abs(Math.sin(time * 0.1)) + ud.phase * 0.8;
  if (ud.eyeGlowL)
    ud.eyeGlowL.intensity = 1.2 + 0.8 * Math.abs(Math.sin(time * 0.15));
  if (ud.eyeGlowR)
    ud.eyeGlowR.intensity = 1.2 + 0.8 * Math.abs(Math.sin(time * 0.15 + 0.3));
  if (ud.aura)
    ud.aura.material.opacity = 0.1 + 0.08 * Math.abs(Math.sin(time * 0.07));
  if (ud.dustRing) {
    ud.dustRing.rotation.z += dt * 0.03;
    ud.dustRing.material.opacity = 0.15 + 0.1 * Math.abs(Math.sin(time * 0.08));
  }
  if (ud.bladeGlow) ud.bladeGlow.intensity = 0.6 + 0.5 * Math.sin(time * 0.18);

  // Rotating cannon barrel in phase 2+
  if (ud.cannonFlare && ud.phase >= 1) ud.cannonFlare.rotation.z += dt * 0.08;

  // SHOOT at player
  const now = Date.now();
  if (now - ud.lastShot > ud.shootInterval && distToPlayer < 45) {
    ud.lastShot = now;
    const shootDir = new THREE.Vector3()
      .subVectors(camera.position, b.position)
      .normalize();
    const shotOrigin = b.position
      .clone()
      .add(
        new THREE.Vector3(to.z * 1.28, 1.4 / 1.4, -to.x * 1.28).multiplyScalar(
          1.4,
        ),
      );

    // Phase 1: single heavy shot
    // Phase 2: burst of 3
    // Phase 3: spiral burst of 5
    const shotCount = ud.phase === 0 ? 1 : ud.phase === 1 ? 3 : 5;
    for (let s = 0; s < shotCount; s++) {
      setTimeout(() => {
        if (!bossEntity || !bossEntity.userData.alive) return;
        const dir = shootDir.clone();
        if (shotCount > 1) {
          dir.x += (Math.random() - 0.5) * 0.2 * (ud.phase + 1);
          dir.z += (Math.random() - 0.5) * 0.2 * (ud.phase + 1);
          dir.normalize();
        }
        spawnBossBullet(shotOrigin.clone(), dir, ud.phase);
        // Cannon flash
        if (ud.cannonFlare) {
          ud.cannonFlare.material.opacity = 1;
          setTimeout(() => (ud.cannonFlare.material.opacity = 0), 80);
        }
      }, s * 120);
    }
  }

  // Melee attack
  if (distToPlayer < 3.5) {
    if (now - ud.lastHit > 800) {
      ud.lastHit = now;
      let dmg = ud.phase === 2 ? 25 : ud.phase === 1 ? 18 : 12;
      if (activeEffects.shield > 0) {
        activeEffects.shield -= dmg;
        if (activeEffects.shield < 0) {
          dmg = -activeEffects.shield;
          activeEffects.shield = 0;
        } else dmg = 0;
      }
      health = Math.max(0, health - dmg);
      document.getElementById("health-val").textContent = health;
      document.getElementById("health-bar").style.width = health + "%";
      document.getElementById("health-bar").style.background =
        "linear-gradient(90deg,#cc0000,#ff3300)";
      const df = document.getElementById("damage-flash");
      df.style.opacity = ".55";
      setTimeout(() => (df.style.opacity = "0"), 130);
      targetAngleX += (Math.random() - 0.5) * 0.09;
      targetAngleY += (Math.random() - 0.5) * 0.05;
      if (health <= 25)
        document.getElementById("low-health-vignette").style.animation =
          "healthPulse 1.1s ease-in-out infinite";
      if (health <= 0) endGame();
    }
  }

  // Boss bounds
  b.position.x = Math.max(-60, Math.min(60, b.position.x));
  b.position.z = Math.max(-60, Math.min(60, b.position.z));

  updateBossHUD(ud.hp, ud.maxHp, ud.phase);
}

function spawnBossBullet(pos, dir, phase) {
  const colors = [0xff4400, 0xff2200, 0xff0066];
  const sizes = [0.12, 0.14, 0.18];
  const blt = new THREE.Mesh(
    new THREE.SphereGeometry(sizes[phase], 8, 8),
    new THREE.MeshBasicMaterial({ color: colors[phase] }),
  );
  blt.position.copy(pos);
  const bl = new THREE.PointLight(colors[phase], 3, 4);
  blt.add(bl);
  blt.userData = {
    dir: dir.clone(),
    life: 55,
    damage: phase === 2 ? 20 : phase === 1 ? 14 : 10,
    isBoss: true,
  };
  scene.add(blt);
  enemyBullets.push(blt);
}

function killBoss(b) {
  b.userData.alive = false;
  bossActive = false;
  bossEntity = null;
  // Massive explosion
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        Math.random() * 2,
        (Math.random() - 0.5) * 3,
      );
      spawnParticles3d(
        b.position.clone().add(offset),
        i % 2 === 0 ? 0xff2200 : 0xff8800,
        35,
      );
    }, i * 80);
  }
  // Gold reward
  addGold(500);
  score += 2000;
  document.getElementById("scoreVal").textContent = score;
  scene.remove(b);
  enemies = enemies.filter((e) => e !== b);
  document.getElementById("enemiesVal").textContent = enemies.length;
  document.getElementById("boss-hud").classList.remove("visible");
  showGoldNotify("💀 BOSS SLAIN! +500 GOLD +2000 SCORE");

  const feed = document.getElementById("kill-feed");
  const e = document.createElement("div");
  e.className = "kill-entry gold-drop";
  e.textContent = "💀 THE CURSED OVERLORD DEFEATED!";
  feed.appendChild(e);
  setTimeout(() => e.remove(), 5000);

  if (audioCtx) playBossDeathSound();

  // After boss wave: next biome + double wave
  setTimeout(() => {
    wave++;
    document.getElementById("waveVal").textContent = wave;
    addGold(wave * 50);
    const nextBiome = BIOME_KEYS[Math.floor(Math.random() * BIOME_KEYS.length)];
    setTimeout(() => {
      loadBiome(nextBiome);
      setTimeout(() => spawnWave(4 + wave * 2), 1800);
    }, 2500);
  }, 3000);
}

function playBossAlarm() {
  if (!audioCtx) return;
  [0, 0.1, 0.2, 0.35, 0.45].forEach((t, i) => {
    const osc = audioCtx.createOscillator(),
      g = audioCtx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = [110, 220, 110, 165, 110][i];
    g.gain.setValueAtTime(0, audioCtx.currentTime + t);
    g.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + t + 0.25);
    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + t);
    osc.stop(audioCtx.currentTime + t + 0.3);
  });
}

function playBossPhaseChange() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator(),
    g = audioCtx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(440, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.6);
  g.gain.setValueAtTime(0.35, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
  osc.connect(g);
  g.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.8);
}

function playBossDeathSound() {
  if (!audioCtx) return;
  [0, 0.2, 0.4, 0.6].forEach((t, i) => {
    const osc = audioCtx.createOscillator(),
      g = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(
      [880, 660, 440, 220][i],
      audioCtx.currentTime + t,
    );
    osc.frequency.exponentialRampToValueAtTime(
      [440, 330, 220, 55][i],
      audioCtx.currentTime + t + 0.4,
    );
    g.gain.setValueAtTime(0.2, audioCtx.currentTime + t);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + t + 0.5);
    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + t);
    osc.stop(audioCtx.currentTime + t + 0.6);
  });
}

// ══════════════════════════════════════════════
// START GAME
// ══════════════════════════════════════════════
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  gameRunning = true;
  const wep = WEAPONS[playerInventory.activeWeapon];
  maxAmmo = wep.maxAmmo;
  ammo = wep.maxAmmo;
  buildAmmoDots();
  updateAmmoUI();
  document.getElementById("weapon-name-display").textContent = wep.name;
  initAudio();
  const firstBiome = BIOME_KEYS[Math.floor(Math.random() * BIOME_KEYS.length)];
  loadBiome(firstBiome);
  setTimeout(() => spawnWave(5), 1600);
  startCamera();
  lastFrameTime = performance.now();
  requestAnimationFrame(loop);
}

// ══════════════════════════════════════════════
// MAIN LOOP
// ══════════════════════════════════════════════
function loop(ts) {
  requestAnimationFrame(loop);
  if (!gameRunning) return;
  const dt = Math.min((ts - lastFrameTime) / 16, 3);
  lastFrameTime = ts;
  time += dt;
  bobTime += dt;

  // Active effects countdown
  if (activeEffects.speed > 0) activeEffects.speed -= dt;
  if (activeEffects.damage > 0) activeEffects.damage -= dt;

  torch.intensity =
    2.2 + Math.sin(time * 0.11) * 0.5 + Math.sin(time * 0.37) * 0.3;
  updateWeatherParticles(dt);
  updateHauntedEffects(time);
  updateGrass(dt);
  updateTrees(dt);
  if (currentBiomeKey === "lava") updateLava(dt);
  if (bossActive) updateBoss(dt);

  if (gestureMode && handVisible) {
    smoothHandX += (rawHandX - smoothHandX) * 0.22;
    smoothHandY += (rawHandY - smoothHandY) * 0.22;
    const gestDeltaX = (smoothHandX - 0.5) * -Math.PI * 2.2;
    const gestDeltaY = Math.max(
      -Math.PI / 3,
      Math.min(Math.PI / 3, (smoothHandY - 0.5) * Math.PI * 1.1),
    );
    targetAngleX += (gestDeltaX - targetAngleX) * 0.18;
    targetAngleY += (gestDeltaY - targetAngleY) * 0.18;
  }
  smoothAngleX += (targetAngleX - smoothAngleX) * 0.13;
  smoothAngleY += (targetAngleY - smoothAngleY) * 0.13;
  camera.rotation.y = smoothAngleX;
  camera.rotation.x = smoothAngleY;

  const speedMult = activeEffects.speed > 0 ? 2.0 : 1.0;
  const sp = 0.1 * dt * speedMult;
  const mv = new THREE.Vector3();
  moving = false;
  if (keys["KeyW"] || keys["ArrowUp"]) {
    mv.z -= sp;
    moving = true;
  }
  if (keys["KeyS"] || keys["ArrowDown"]) {
    mv.z += sp;
    moving = true;
  }
  if (keys["KeyA"] || keys["ArrowLeft"]) {
    mv.x -= sp;
    moving = true;
  }
  if (keys["KeyD"] || keys["ArrowRight"]) {
    mv.x += sp;
    moving = true;
  }
  mv.applyEuler(new THREE.Euler(0, smoothAngleX, 0));
  camera.position.add(mv);
  camera.position.x = Math.max(-65, Math.min(65, camera.position.x));
  camera.position.z = Math.max(-65, Math.min(65, camera.position.z));
  resolvePlayerCollisions();

  const tx = camera.position.x,
    tz = camera.position.z;
  const groundY = getTerrainHeight(tx, tz, currentBiomeKey);
  const targetY =
    groundY + 1.7 + (moving ? Math.sin(bobTime * 0.18) * 0.07 : 0);
  camera.position.y += (targetY - camera.position.y) * 0.12;

  if (moving) {
    gunGrp.position.y = -0.23 + Math.sin(bobTime * 0.18) * 0.035;
    gunGrp.rotation.z = Math.sin(bobTime * 0.09) * 0.022;
  } else {
    gunGrp.position.y += (-0.23 - gunGrp.position.y) * 0.1;
    gunGrp.rotation.z *= 0.88;
  }

  if (keys["Space"]) shoot();
  if (comboTimer > 0) {
    comboTimer -= dt;
    if (comboTimer <= 0) comboKills = 0;
  }
  if (crosshairSpread > 0) {
    crosshairSpread *= 0.84;
    const s = crosshairSpread;
    document.getElementById("ch-t").style.top = -s + "px";
    document.getElementById("ch-b").style.bottom = -s + "px";
    document.getElementById("ch-l").style.left = -s + "px";
    document.getElementById("ch-r").style.right = -s + "px";
  }

  // Update enemies
  enemies.forEach((en) => {
    if (!en.userData.alive) return;
    const to = new THREE.Vector3().subVectors(camera.position, en.position);
    to.y = 0;
    to.normalize();
    en.position.addScaledVector(to, en.userData.speed * dt);
    en.lookAt(
      new THREE.Vector3(camera.position.x, en.position.y, camera.position.z),
    );
    const wp = en.userData.walkPhase + time * 0.12;
    if (en.userData.aL) en.userData.aL.rotation.x = Math.sin(wp) * 0.45;
    if (en.userData.aR) en.userData.aR.rotation.x = -Math.sin(wp) * 0.45;
    if (en.userData.lL) en.userData.lL.rotation.x = -Math.sin(wp) * 0.5;
    if (en.userData.lR) en.userData.lR.rotation.x = Math.sin(wp) * 0.5;
    // Knife enemies: arm animation more aggressive
    if (en.userData.type === "knife") {
      en.userData.aR.rotation.x = Math.sin(wp * 2) * 0.8 - 0.5;
    }

    const gy = getTerrainHeight(en.position.x, en.position.z, currentBiomeKey);
    en.position.y += (gy - en.position.y) * 0.15;
    const hpPct = en.userData.hp / en.userData.maxHp;
    if (en.userData.hLight)
      en.userData.hLight.color.setHex(
        hpPct > 0.6 ? 0x00ff00 : hpPct > 0.3 ? 0xffaa00 : 0xff2200,
      );

    // GUN ENEMIES: shoot at player
    if (en.userData.type === "gun" && en.userData.muzzleGlow) {
      const now = Date.now();
      if (now - en.userData.lastShot > en.userData.shootInterval) {
        const dist = en.position.distanceTo(camera.position);
        if (dist < 35 && dist > 4) {
          en.userData.lastShot = now;
          const shootDir = new THREE.Vector3()
            .subVectors(camera.position, en.position)
            .normalize();
          shootDir.x += (Math.random() - 0.5) * 0.15;
          shootDir.y += (Math.random() - 0.5) * 0.08;
          shootDir.normalize();
          const shootFrom = en.position
            .clone()
            .add(new THREE.Vector3(0.45, 0.82, 0));
          spawnEnemyBullet(shootFrom, shootDir);
          en.userData.muzzleGlow.intensity = 4;
          setTimeout(() => {
            if (en.userData.muzzleGlow) en.userData.muzzleGlow.intensity = 0;
          }, 80);
        }
      }
    }

    const dist = en.position.distanceTo(camera.position);
    // Knife enemies attack faster at closer range
    const attackRange = en.userData.type === "knife" ? 2.8 : 2.4;
    const attackDamage =
      en.userData.type === "knife" ? 12 : en.userData.type === "gun" ? 5 : 8;
    const attackCooldown = en.userData.type === "knife" ? 900 : 1300;
    if (dist < attackRange) {
      const now = Date.now();
      if (now - en.userData.lastHit > attackCooldown) {
        en.userData.lastHit = now;
        let dmg = attackDamage;
        if (activeEffects.shield > 0) {
          activeEffects.shield -= dmg;
          if (activeEffects.shield < 0) {
            dmg = -activeEffects.shield;
            activeEffects.shield = 0;
          } else dmg = 0;
        }
        health = Math.max(0, health - dmg);
        document.getElementById("health-val").textContent = health;
        document.getElementById("health-bar").style.width = health + "%";
        document.getElementById("health-bar").style.background =
          health > 60
            ? "linear-gradient(90deg,#ff2200,#ff6644)"
            : health > 30
              ? "linear-gradient(90deg,#ff6600,#ffaa00)"
              : "linear-gradient(90deg,#cc0000,#ff3300)";
        const df = document.getElementById("damage-flash");
        df.style.opacity = ".38";
        setTimeout(() => (df.style.opacity = "0"), 110);
        targetAngleX += (Math.random() - 0.5) * 0.05;
        targetAngleY += (Math.random() - 0.5) * 0.025;
        if (health <= 25)
          document.getElementById("low-health-vignette").style.animation =
            "healthPulse 1.1s ease-in-out infinite";
        else
          document.getElementById("low-health-vignette").style.animation =
            "none";
        if (health <= 0) endGame();
      }
    }
  });

  // Enemy bullets
  enemyBullets = enemyBullets.filter((b) => {
    b.position.addScaledVector(b.userData.dir, 1.4 * dt);
    b.userData.life -= dt;
    if (b.userData.life <= 0) {
      scene.remove(b);
      return false;
    }
    if (b.position.distanceTo(camera.position) < 0.6) {
      let dmg = b.userData.damage;
      if (activeEffects.shield > 0) {
        activeEffects.shield -= dmg;
        if (activeEffects.shield < 0) {
          dmg = -activeEffects.shield;
          activeEffects.shield = 0;
        } else dmg = 0;
      }
      health = Math.max(0, health - dmg);
      document.getElementById("health-val").textContent = health;
      document.getElementById("health-bar").style.width = health + "%";
      const df = document.getElementById("damage-flash");
      df.style.opacity = ".6";
      setTimeout(() => (df.style.opacity = "0"), 120);
      scene.remove(b);
      if (health <= 0) endGame();
      return false;
    }
    return true;
  });

  bullets = bullets.filter((b) => {
    b.position.addScaledVector(b.userData.dir, 1.8 * dt);
    b.userData.life -= dt;
    if (b.userData.life <= 0) {
      scene.remove(b);
      return false;
    }
    return true;
  });
  particles3d = particles3d.filter((p) => {
    p.position.add(p.userData.vel.clone().multiplyScalar(dt));
    p.userData.vel.y -= 0.015 * dt;
    p.userData.vel.multiplyScalar(0.96);
    p.userData.life -= dt;
    p.material.opacity = Math.max(0, p.userData.life / p.userData.maxLife);
    if (p.userData.life <= 0) {
      scene.remove(p);
      return false;
    }
    return true;
  });

  updateMinimap();
  renderer.render(scene, camera);
}

// ══════════════════════════════════════════════
// GAME OVER
// ══════════════════════════════════════════════
function endGame() {
  gameRunning = false;
  setTimeout(() => {
    const ss = document.getElementById("start-screen");
    ss.style.display = "flex";
    ss.querySelector("h1").textContent = "💀 GAME OVER";
    ss.querySelector("h1").style.color = "#ff3300";
    ss.querySelector("h1").style.textShadow = "0 0 40px rgba(255,50,0,.9)";
    ss.querySelector("h1").style.animation = "none";
    ss.querySelector(".start-tagline").textContent =
      `SCORE: ${score}  ·  WAVE: ${wave}  ·  KILLS: ${kills}  ·  GOLD: ${totalGoldEarned}`;
    document.getElementById("startBtn").textContent = "↩ PLAY AGAIN";
    document.getElementById("startBtn").style.borderColor = "#ff4400";
    document.getElementById("startBtn").style.color = "#ff4400";
    document.getElementById("startBtn").style.textShadow = "0 0 10px #ff4400";
    document.getElementById("startBtn").onclick = () => location.reload();
  }, 300);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const c = document.getElementById("start-bg-canvas");
  if (c) {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
});

animateStartBg();
