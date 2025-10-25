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

// Blog posts loader (runs only on blog page)
async function loadAndRenderPosts() {
  const postsList = document.getElementById('posts-list');
  if (!postsList) return; // not on blog page

  // List your post files here (keep relative to the blog page)
  const posts = [
    { url: 'blog-posts/post-1.html' },
    { url: 'blog-posts/post-2.html' }
  ];

  // Extract metadata from the HTML comment front-matter at top of each post
  function extractPostMeta(html) {
    const titleMatch = html.match(/title:\s*([^\n]+)/i);
    const dateMatch = html.match(/date:\s*([^\n]+)/i);
    return {
      title: titleMatch ? titleMatch[1].trim() : 'Untitled Post',
      date: dateMatch ? dateMatch[1].trim() : ''
    };
  }

  async function loadPost(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const html = await res.text();
      return extractPostMeta(html);
    } catch (err) {
      console.error('Failed to load post', url, err);
      return null;
    }
  }

  // Load metadata for all posts
  const loaded = await Promise.all(posts.map(async p => {
    const meta = await loadPost(p.url);
    if (!meta) return null;
    return { ...p, ...meta };
  }));

  const valid = loaded.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));

  if (valid.length === 0) {
    postsList.innerHTML = '<li class="muted">No posts yet.</li>';
    return;
  }

  postsList.innerHTML = valid.map(post => `\n    <li>\n      <a href="${post.url}">${post.title}</a>\n      <span class="muted">— ${post.date}</span>\n    </li>`).join('');
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
  // Load posts if on blog page
  loadAndRenderPosts();
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
