// AltiusWork — shared site behaviour
(function () {
  // Mobile nav toggle
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  // Reveal on scroll
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  // Contact / candidature forms — AJAX submit to Formspree
  function initForms() {
    var en = document.documentElement.lang === 'en';
    var T = {
      sending: en ? 'Sending…' : 'Envoi…',
      errSend: en ? 'Something went wrong while sending. Please try again, or email us at nicolas@altius-work.com.'
                  : "Une erreur est survenue lors de l'envoi. Réessayez, ou écrivez-nous à nicolas@altius-work.com.",
      errNet:  en ? 'Connection failed. Please try again, or email us at nicolas@altius-work.com.'
                  : 'Connexion impossible. Réessayez, ou écrivez-nous à nicolas@altius-work.com.'
    };
    document.querySelectorAll('form.contact-form[action*="formspree"]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var okId = form.getAttribute('data-ok');
        var btn = form.querySelector('button[type="submit"]');
        var label = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = T.sending; }
        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(function (r) {
          if (r.ok) {
            form.reset();
            if (okId) { var ok = document.getElementById(okId); if (ok) ok.hidden = false; }
          } else {
            alert(T.errSend);
          }
        }).catch(function () {
          alert(T.errNet);
        }).finally(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = label; }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initNav(); initReveal(); initForms(); });
  } else { initNav(); initReveal(); initForms(); }
})();
