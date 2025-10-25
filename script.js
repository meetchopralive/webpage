// Save as: script.js
// Initialize mobile menu on all pages
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.menu-overlay');

  if (!menuBtn || !mobileMenu || !overlay) {
    console.warn('Mobile menu elements not found');
    return;
  }

  // Always reset menu state and button text
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  menuBtn.textContent = '☰';
  document.body.style.overflow = '';

  // Remove previous listeners (if any)
  menuBtn.onclick = null;
  overlay.onclick = null;
  document.onkeydown = null;
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.onclick = null;
  });

  function openMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    menuBtn.textContent = '✕';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    menuBtn.textContent = '☰';
    document.body.style.overflow = '';
  }

  // Toggle menu
  menuBtn.onclick = function(e) {
    e.stopPropagation();
    if (mobileMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Close menu when clicking overlay
  overlay.onclick = closeMenu;

  // Close menu when clicking links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.onclick = closeMenu;
  });

  // Handle escape key
  document.onkeydown = function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year2, #year3, #year4, #year5').forEach(el => { 
    if(el) el.textContent = y;
  });

  // Always reset mobile menu state on page load
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.menu-overlay');
  if (mobileMenu) mobileMenu.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';

  // Initialize mobile menu
  initMobileMenu();
});

/* small mailto handler for contact form */
function handleContact(e){
  if(!e) return;
  e.preventDefault();
  const name = document.getElementById('name')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const message = document.getElementById('message')?.value || '';
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\n(from: ' + name + ' | ' + email + ')');
  window.location.href = `mailto:meetchopra@example.com?subject=${subject}&body=${body}`;
}
