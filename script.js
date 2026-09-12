// ===== THEME TOGGLE =====
(function() {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var html = document.documentElement;
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    try { localStorage.setItem('icut-theme', next); } catch(e) {}
  });
})();

// ===== REVEAL ON SCROLL =====
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(function(el) { observer.observe(el); });
})();

// ===== HERO PARALLAX =====
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var hero = document.querySelector('.name-pin-inner');
  if (!hero) return;
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var y = window.scrollY;
        hero.style.transform = 'translateY(' + (y * 0.18) + 'px)';
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // subtle mousemove drift
  document.addEventListener('mousemove', function(e) {
    if (window.scrollY > window.innerHeight) return;
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var dx = (e.clientX - cx) / cx;
    var dy = (e.clientY - cy) / cy;
    var nameImg = document.querySelector('.name-write-img');
    if (nameImg) {
      nameImg.style.transform = 'translate(' + (dx * 6) + 'px, ' + (dy * 4) + 'px)';
    }
  });
})();
