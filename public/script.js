// =============================================
// SHOPFLASH — JAVASCRIPT
// =============================================

// ====== NAVBAR SCROLL ======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ====== TAB SWITCHING ======
const tabBtns = document.querySelectorAll('.tab-btn');
const codePanels = document.querySelectorAll('.code-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    // Update buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update panels
    codePanels.forEach(p => p.classList.remove('active'));
    const target = document.getElementById('tab-' + tab);
    if (target) {
      target.classList.add('active');
    }
  });
});

// ====== COPY TO CLIPBOARD ======
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Find sibling pre's code
    const codeBlock = btn.closest('.code-block');
    const code = codeBlock ? codeBlock.querySelector('code') : null;
    if (!code) return;

    // Strip HTML tags to get plain text
    const text = code.innerText || code.textContent;

    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});

// ====== SCROLL REVEAL ======
const revealElements = document.querySelectorAll(
  '.feature-card, .arch-node, .schema-card, .step, .section-header'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ====== SMOOTH ANCHOR SCROLLING ======
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ====== TERMINAL TYPE ANIMATION ======
const cursor = document.querySelector('.cursor-blink');
// already handled by CSS animation

console.log('%c ShopFlash ','background:#7c3aed;color:white;font-weight:bold;font-size:14px;padding:4px 8px;border-radius:6px;');
console.log('Java E-Commerce System — EcommerceSystem.java');
