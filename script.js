// script.js

(function(){
  // Galería / Pasarela
  const openBtn   = document.getElementById('open-gallery');
  const closeBtn  = document.getElementById('close-gallery');
  const modal     = document.getElementById('gallery-modal');
  const slider    = document.getElementById('slider');
  const prevBtn   = document.getElementById('prev-slide');
  const nextBtn   = document.getElementById('next-slide');

  if (!openBtn || !closeBtn || !modal || !slider || !prevBtn || !nextBtn) {
    console.error('Galería: faltan elementos en el DOM');
    return;
  }

  let slides  = Array.from(slider.children);
  let current = 0;
  function scrollToSlide(idx) {
    slides = Array.from(slider.children);
    if (slides[idx]) slides[idx].scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }

  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    scrollToSlide(current);
  });
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    scrollToSlide(current);
  });
  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    scrollToSlide(current);
  });
  slider.addEventListener('scroll', () => {
    const center = slider.scrollLeft + slider.offsetWidth/2;
    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth/2;
      if (Math.abs(center - slideCenter) < slide.offsetWidth/2) current = idx;
    });
  });

  // Cuenta regresiva hasta el 3 de mayo de 2025, 18:00
  const targetDate = new Date(2025, 4, 3, 18, 0, 0).getTime();
  const els = ['days','hours','mins','secs'].reduce((o, id) => {
    o[id] = document.getElementById(id);
    return o;
  }, {});
  function updateCountdown() {
    const dist = targetDate - Date.now();
    if (dist < 0) {
      clearInterval(countdownInterval);
      Object.values(els).forEach(el => el.textContent = '00');
      return;
    }
    const time = {
      days:  Math.floor(dist / 86400000),
      hours: Math.floor((dist % 86400000) / 3600000),
      mins:  Math.floor((dist % 3600000) / 60000),
      secs:  Math.floor((dist % 60000) / 1000),
    };
    Object.entries(time).forEach(([k, v]) => {
      els[k].textContent = String(v).padStart(2, '0');
    });
  }
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  // Intersection Observer para elementos .reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible','opacity-100','translate-y-0');
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Toggle música de fondo
  const bgMusic     = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  if (bgMusic && musicToggle) {
    musicToggle.textContent = bgMusic.muted ? '🔇' : '🔊';
    musicToggle.addEventListener('click', () => {
      bgMusic.muted = !bgMusic.muted;
      if (!bgMusic.muted) bgMusic.play();
      musicToggle.textContent = bgMusic.muted ? '🔇' : '🔊';
    });
  }

  // Al cargar, intenta autoplay en 2s; si falla, desbloquea al primer clic
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (bgMusic) {
        bgMusic.muted = false;
        bgMusic.play()
          .then(() => musicToggle && (musicToggle.textContent = '🔊'))
          .catch(() => {
            document.addEventListener('click', unlockAudio, { once: true });
          });
      }
    }, 2000);
  });

  // Desmuta y reproduce al primer clic si el autoplay fue bloqueado
  function unlockAudio() {
    if (!bgMusic) return;
    bgMusic.muted = false;
    bgMusic.play().catch(() => {});
    if (musicToggle) musicToggle.textContent = '🔊';
  }

})();  // Fin IIFE
