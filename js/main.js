// ========== SWIPERLAR ==========
const swiperM6 = new Swiper('#sliderM6', {
  loop: false,
  pagination: {
    el: '#sliderM6 .swiper-pagination',
    clickable: true,
  },
});

const swiperDargo = new Swiper('#sliderDargo', {
  loop: false,
  pagination: {
    el: '#sliderDargo .swiper-pagination',
    clickable: true,
  },
});

// Swiper instanslarini saqlash
const swipers = {
  sliderM6: swiperM6,
  sliderDargo: swiperDargo,
};

// ========== RANG TANLASH ==========
// Rang tugmasiga bosganda slider o'sha slide ga o'tadi
function changeSlide(sliderId, index) {
  swipers[sliderId].slideTo(index);
}

// ========== POPUP ==========
function openPopup() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollbarWidth + 'px';
  document.body.style.overflow = 'hidden';
  document.getElementById('popup').classList.add('active');
  document.getElementById('overlay').classList.add('active');
}

function closePopup() {
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
  document.getElementById('popup').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}

// ESC tugmasi bilan yopish
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePopup();
  }
});

// Maqsad sana — o'zingiz o'zgartiring
const targetDate = new Date('2026-06-01T23:59:59');

// Ring circumference
const CIRCUMFERENCE = 216;

function setRing(id, value, max) {
  const ring = document.getElementById(id);
  if (!ring) return;
  const progress = value / max;
  const offset = CIRCUMFERENCE - (progress * CIRCUMFERENCE);
  ring.style.strokeDashoffset = offset;
}

function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Raqamlarni yangilash
  document.getElementById('days').textContent    = String(days).padStart(2, '0');
  document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

  // Ringlarni yangilash
  setRing('ring-days',    days,    365);  // max 365 kun
  setRing('ring-hours',   hours,   24);   // max 24 soat
  setRing('ring-minutes', minutes, 60);   // max 60 daqiqa
  setRing('ring-seconds', seconds, 60);   // max 60 soniya
}

updateTimer();
setInterval(updateTimer, 1000);