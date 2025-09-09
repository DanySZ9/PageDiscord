// --- 🌍 Idiomas ---
const textos = {
  es: {
    titulo: "Mis gustos personales 🎧",
    descripcion: "Aquí comparto lo que me inspira, me emociona y me define.",
  },
  en: {
    titulo: "My personal tastes 🎧",
    descripcion: "Here I share what inspires me, excites me, and defines me.",
  },
};

// Cambiar idioma
function cambiarIdioma(idioma) {
  document.getElementById("titulo").textContent = textos[idioma].titulo;
  document.getElementById("descripcion").textContent = textos[idioma].descripcion;
}

// --- 🎵 Lista de canciones ---
const canciones = [
  { archivo: "01 Avenged Sevenfold - Beast and the Harlot.mp3", titulo: "Beast and the Harlot", artista: "Avenged Sevenfold" },
  { archivo: "Play.mp3", titulo: "Play", artista: "BAND-MAID" },
  { archivo: "03 Avenged Sevenfold - Scream.mp3", titulo: "Scream", artista: "Avenged Sevenfold" },
  { archivo: "04 Avenged Sevenfold - Afterlife.mp3", titulo: "Afterlife", artista: "Avenged Sevenfold" },
  { archivo: "04 Avenged Sevenfold - Bat Country.mp3", titulo: "Bat Country", artista: "Avenged Sevenfold" },
  { archivo: "05 Avenged Sevenfold - Requiem.mp3", titulo: "Requiem", artista: "Avenged Sevenfold" },
  { archivo: "09 Avenged Sevenfold - Roman Sky.mp3", titulo: "Roman Sky", artista: "Avenged Sevenfold" },
  { archivo: "10. Bubble.mp3", titulo: "Bubble", artista: "BAND-MAID" },
  { archivo: "11. Daydreaming.mp3", titulo: "Daydreaming", artista: "BAND-MAID" },
  { archivo: "ALONE.mp3", titulo: "Alone", artista: "BAND-MAID" },
  { archivo: "Avenged Sevenfold - Blinded in Chains.mp3", titulo: "Blinded in Chains", artista: "Avenged Sevenfold" },
  { archivo: "MORE - The Warning .mp3", titulo: "MORE", artista: "The Warning" },
  { archivo: "sayuriChocolate.mp3", titulo: "Chocolate", artista: "SAYURI" },
  { archivo: "SiM - Teardrops (Audio).mp3", titulo: "Teardrops", artista: "SiM" },
  { archivo: "So far AwaySub Español.mp3", titulo: "So far Away", artista: "Avenged Sevenfold" },
  { archivo: "When I m Alone - The Warning (Subtitulado Español).mp3", titulo: "When I'm Alone", artista: "The Warning" },
];

// --- 🎧 Audio ---
const cancionActual = document.getElementById("cancionActual");
const audio = new Audio();
let volume = 50; // volumen inicial (0-100)
let muted = false;

audio.volume = volume / 100;

// --- 🔀 Reproducir canción aleatoria ---
function reproducirCancionAleatoria() {
  const indiceAleatorio = Math.floor(Math.random() * canciones.length);
  const cancion = canciones[indiceAleatorio];

  audio.src = `media/music/${cancion.archivo}`;
  audio.play();

  cancionActual.textContent = `${cancion.titulo} – ${cancion.artista}`;
}

// --- 🔊 Volumen ---
const icon = document.getElementById("volumeIcon");
const slider = document.getElementById("volumeSlider");

function updateIcon() {
  icon.innerHTML = ""; // limpiar SVG

  if (muted || volume === 0) {
    // Mute
    icon.innerHTML = `
      <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    `;
  } else if (volume <= 30) {
    // Bajo
    icon.innerHTML = `
      <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
      <path d="M15 12c0-1-.3-2-.9-2.7"></path>
      <path d="M15 12c0 1 .3 2 .9 2.7"></path>
    `;
  } else if (volume <= 70) {
    // Medio
    icon.innerHTML = `
      <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
      <path d="M19 12c0-1.5-.5-2.9-1.4-4"></path>
      <path d="M19 12c0 1.5-.5 2.9-1.4 4"></path>
    `;
  } else {
    // Alto
    icon.innerHTML = `
      <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
      <path d="M19 12c0-1.5-.5-2.9-1.4-4"></path>
      <path d="M19 12c0 1.5-.5 2.9-1.4 4"></path>
      <path d="M23 12c0-2-.7-3.9-2-5.4"></path>
      <path d="M23 12c0 2-.7-3.9-2 5.4"></path>
    `;
  }
}

function changeVolume(val) {
  volume = parseInt(val);
  muted = volume === 0;

  audio.volume = volume / 100;
  audio.muted = muted;

  updateIcon();
}

function toggleMute() {
  muted = !muted;
  audio.muted = muted;

  if (muted) {
    slider.value = 0;
  } else {
    slider.value = volume || 50;
    audio.volume = slider.value / 100;
  }

  updateIcon();
}

// --- 🚀 Inicializar ---
window.onload = () => {
  reproducirCancionAleatoria();
  slider.value = volume;
  updateIcon();
};

// Cuando termine una canción, reproducir otra
audio.addEventListener("ended", reproducirCancionAleatoria);

// Seleccionar el elemento del efecto borroso
const blurEffect = document.getElementById("blurEffect");

// Evento para mover el área borrosa con el puntero
document.addEventListener("mousemove", (e) => {
  const x = e.clientX - blurEffect.offsetWidth / 2;
  const y = e.clientY - blurEffect.offsetHeight / 2;

  // Actualizar la posición del área borrosa
  blurEffect.style.transform = `translate(${x}px, ${y}px)`;
});

// Evento para agrandar el área borrosa al pasar el mouse
document.addEventListener("mouseover", () => {
  blurEffect.style.width = "100px";
  blurEffect.style.height = "100px";
});

// Evento para reducir el área borrosa al salir del mouse
document.addEventListener("mouseout", () => {
  blurEffect.style.width = "50px";
  blurEffect.style.height = "50px";
});