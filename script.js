// script.js

const openBtn   = document.getElementById('open-gallery');
const closeBtn  = document.getElementById('close-gallery');
const modal     = document.getElementById('gallery-modal');
const slider    = document.getElementById('slider');
const prevBtn   = document.getElementById('prev-slide');
const nextBtn   = document.getElementById('next-slide');

// Recolecta todos los slides
const slides = Array.from(slider.children);
let current = 0;

// Mostrar / ocultar modal
function showModal() { modal.classList.remove('hidden'); scrollToSlide(current); }
function hideModal() { modal.classList.add('hidden'); }

// Centra el slide actual
function scrollToSlide(idx) {
  slides[idx].scrollIntoView({ inline: 'center' });
}

// Navegación con loop infinito
prevBtn.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  scrollToSlide(current);
});
nextBtn.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  scrollToSlide(current);
});

// Abrir modal
openBtn.addEventListener('click', showModal);
// Cerrar con “×”
closeBtn.addEventListener('click', hideModal);

// Cerrar al hacer clic fuera del slider o botones
modal.addEventListener('click', (e) => {
  if (
    !slider.contains(e.target) &&
    !prevBtn.contains(e.target) &&
    !nextBtn.contains(e.target) &&
    e.target !== closeBtn
  ) {
    hideModal();
  }
});

// Actualizar índice si el usuario arrastra manualmente
slider.addEventListener('scroll', () => {
  const center = slider.scrollLeft + slider.offsetWidth/2;
  slides.forEach((slide, idx) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth/2;
    if (Math.abs(center - slideCenter) < slide.offsetWidth/2) {
      current = idx;
    }
  });
});

// Actualiza 'current' si el usuario hace scroll manual
slider.addEventListener('scroll', () => {
  const center = slider.scrollLeft + slider.offsetWidth / 2;
  slides.forEach((slide, idx) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    if (Math.abs(center - slideCenter) < slide.offsetWidth / 2) {
      current = idx;
    }
  });
});







// -------- Cuenta regresiva hasta el 3 de mayo de 2025, 18:00 horas (hora local) --------
const targetDate = new Date(2025, 4, 3, 18, 0, 0).getTime();
const els = ["days", "hours", "mins", "secs"].reduce((o, id) => {
  o[id] = document.getElementById(id);
  return o;
}, {});

function updateCountdown() {
  const dist = targetDate - Date.now();
  if (dist < 0) {
    clearInterval(countdownInterval);
    Object.values(els).forEach((el) => (el.textContent = "00"));
    return;
  }

  const time = {
    days: Math.floor(dist / 86400000),
    hours: Math.floor((dist % 86400000) / 3600000),
    mins: Math.floor((dist % 3600000) / 60000),
    secs: Math.floor((dist % 60000) / 1000),
  };
  Object.entries(time).forEach(([k, v]) => {
    els[k].textContent = String(v).padStart(2, "0");
  });
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// -------- Efecto de transición al hacer scroll --------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Si quieres que la animación solo ocurra una vez, descomenta:
        // observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    },
    { threshold: 0.3 }
  );
  reveals.forEach((el) => observer.observe(el));
});
