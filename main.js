// Root & Route — main.js (dynamic features)

// ---- Theme: apply saved preference ASAP (also inlined in <head> to avoid flash)
(function () {
  try {
    var saved = localStorage.getItem('rr-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', function () {

  // ---- Theme toggle
  var themeBtn = document.querySelector('.theme-toggle');
  function setIcon() {
    if (!themeBtn) return;
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeBtn.textContent = dark ? '☀' : '☾';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if (themeBtn) {
    setIcon();
    themeBtn.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = dark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('rr-theme', next); } catch (e) {}
      setIcon();
    });
  }

  // ---- Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ---- Trail log: category filter + live search
  var catButtons = Array.prototype.slice.call(document.querySelectorAll('.filter-btn[data-filter]'));
  var tierButtons = Array.prototype.slice.call(document.querySelectorAll('.filter-btn[data-tier-filter]'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('.post-row'));
  var searchInput = document.querySelector('#post-search');
  var noResults = document.querySelector('.no-results');
  var activeCat = 'all';
  var activeTier = 'all';

  function applyFilters() {
    var q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var visible = 0;
    rows.forEach(function (row) {
      var catOk = activeCat === 'all' || row.getAttribute('data-category') === activeCat;
      var tierOk = activeTier === 'all' || row.getAttribute('data-tier') === activeTier;
      var text = row.textContent.toLowerCase();
      var qOk = !q || text.indexOf(q) !== -1;
      var show = catOk && tierOk && qOk;
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  catButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      catButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeCat = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  tierButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tierButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeTier = btn.getAttribute('data-tier-filter') || 'all';
      applyFilters();
    });
  });
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  // ---- Reading progress bar (post pages)
  var fill = document.querySelector('.progress-fill');
  var article = document.querySelector('.post-body .content');
  if (fill && article) {
    var onScroll = function () {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var done = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      fill.style.width = (total > 0 ? (done / total) * 100 : 100) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Back to top
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ---- Typewriter (homepage hero) — reduced-motion safe
(function () {
  var target = document.getElementById('type-target');
  if (!target) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var words = ['IT', 'Networking', 'Security', 'Hardware', 'The cloud', 'ITIL', 'AI'];
  if (reduce) { target.textContent = 'IT and security,'; var c = document.querySelector('.type-cursor'); if (c) c.style.display = 'none'; return; }
  var wi = 0, ci = 2, deleting = false;
  function tick() {
    var word = words[wi];
    if (!deleting) {
      ci++;
      target.textContent = word.slice(0, ci);
      if (ci === word.length) { deleting = true; return setTimeout(tick, 2100); }
      return setTimeout(tick, 85 + Math.random() * 60);
    }
    ci--;
    target.textContent = word.slice(0, ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; return setTimeout(tick, 350); }
    setTimeout(tick, 45);
  }
  setTimeout(tick, 1400);
})();

// ---- Count-up stats — reduced-motion safe
(function () {
  var nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function run(el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    if (reduce || end === 0) { el.textContent = end; return; }
    var start = null, dur = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  } else nums.forEach(run);
})();

// ---- Service worker: offline support + asset caching
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });
}
