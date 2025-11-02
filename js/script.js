/* Global JS for portfolio
   - Mobile nav toggle
   - Active nav highlighting
   - Project modal lightbox
   - Contact form minimal client-side validation
*/

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggles (applies to all pages with same IDs)
  const body = document.body;
  function setupNavToggle(toggleId, linksId) {
    const toggle = document.getElementById(toggleId);
    const links = document.getElementById(linksId);
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      body.classList.toggle('nav-open');
      // Toggle aria-expanded
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!expanded).toString());
    });
    // clicking a link should close menu
    links.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', () => {
        body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  setupNavToggle('navToggle', 'navLinks');
  setupNavToggle('navToggleAbout', 'navLinksAbout');
  setupNavToggle('navTogglePortfolio', 'navLinksPortfolio');
  setupNavToggle('navToggleGallery', 'navLinksGallery');
  setupNavToggle('navToggleContact', 'navLinksContact');

  // Active nav link detection (simple)
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href === currentPath) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // Project modal
  function openModalWithImage(src) {
    const modal = document.getElementById('projectModal') || document.querySelector('.project-modal');
    const content = document.getElementById('modalContent') || document.getElementById('modalContent2');
    if (!modal || !content) return;
    content.innerHTML = `<img src="${src}" alt="Project screenshot">`;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
  }
  function closeModal() {
    const modal = document.getElementById('projectModal') || document.querySelector('.project-modal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
  }

  document.querySelectorAll('.view-screenshot').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const src = btn.getAttribute('data-src');
      if (src) openModalWithImage(src);
    });
  });

  // Close modal buttons
  const modalCloseBtns = document.querySelectorAll('#modalClose, #modalClose2');
  modalCloseBtns.forEach(b => b && b.addEventListener('click', closeModal));
  // click outside modal content closes it
  const modal = document.getElementById('projectModal') || document.querySelector('.project-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Contact form (client-side only)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();
      const status = document.getElementById('formStatus');
      if (!name || !email || !message) {
        status.textContent = 'Please fill out all fields.';
        status.style.color = '#ffb3b3';
        return;
      }
      // Basic email format check
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.style.color = '#ffb3b3';
        return;
      }

      // Since this is client-only, provide success message and clear
      status.textContent = 'Message ready to be sent. (This demo form does not send email — wire it to a backend to enable real sending.)';
      status.style.color = '#bfffe0';
      contactForm.reset();
    });
  }

  // Accessible keyboard closing for modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

});
