'use strict';

/* ===============================
   Utility: Add event listener
   =============================== */
const addEventOnElem = (elem, type, callback) => {
  if (!elem) return;

  if (elem instanceof NodeList) {
    elem.forEach(el => el.addEventListener(type, callback));
  } else {
    elem.addEventListener(type, callback);
  }
};

/* ===============================
   Feature interaction logic
   =============================== */
const featureItems = document.querySelectorAll('.feature-item');
const previewOverlay = document.getElementById('featurePreview');
const previewImage = document.getElementById('previewImage');
const desktopPreviews = document.querySelectorAll('.preview-image');

featureItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.dataset.previewImg;
    if (!imgSrc) return;

    /* -------- MOBILE VIEW -------- */
    if (window.innerWidth <= 768) {
      if (!previewOverlay || !previewImage) return;

      previewImage.src = imgSrc;
      previewOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      return;
    }

    /* -------- DESKTOP VIEW -------- */
    desktopPreviews.forEach(img => img.classList.remove('active'));

    const targetImg = Array.from(desktopPreviews)
      .find(img => img.getAttribute('src') === imgSrc);

    if (targetImg) {
      targetImg.classList.add('active');
    }

    featureItems.forEach(btn => btn.classList.remove('active'));
    item.classList.add('active');
  });
});

/* ===============================
   Mobile overlay close handlers
   =============================== */

/* Close when clicking outside image */
if (previewOverlay) {
  previewOverlay.addEventListener('click', (e) => {
    if (e.target !== previewImage) {
      previewOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* Prevent image click from bubbling */
previewImage?.addEventListener('click', e => {
  e.stopPropagation();
});

/* Close on ESC */
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && previewOverlay?.classList.contains('active')) {
    previewOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ===============================
   Navbar toggle
   =============================== */
const navbar = document.querySelector('[data-navbar]');
const navToggler = document.querySelector('[data-nav-toggler]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const toggleNavbar = () => navbar?.classList.toggle('active');
const closeNavbar = () => navbar?.classList.remove('active');

addEventOnElem(navToggler, 'click', toggleNavbar);
addEventOnElem(navLinks, 'click', closeNavbar);

/* ===============================
   Back to top (2s inactivity hide)
   =============================== */
const backTopBtn = document.querySelector('[data-back-top-btn]');
let hideTimer = null;

window.addEventListener('scroll', () => {
  if (!backTopBtn) return;

  if (window.scrollY > 120) {
    backTopBtn.classList.add('active');
    backTopBtn.classList.remove('hide');

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      backTopBtn.classList.add('hide');
    }, 500); 
  } else {
    backTopBtn.classList.remove('active', 'hide');
    clearTimeout(hideTimer);
  }
});
