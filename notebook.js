/* Root & Route — Field Notebook: highlight any text on a post, save it locally */
(function () {
  'use strict';
  var KEY = 'rr-notebook';
  var article = document.querySelector('.post-body .content');
  if (!article) return; // only runs on post pages

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save(notes) {
    try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch (e) {}
  }

  // Floating "save" button
  var btn = document.createElement('button');
  btn.className = 'notebook-pop';
  btn.type = 'button';
  btn.innerHTML = '✎ Save to Field Notebook';
  btn.setAttribute('aria-label', 'Save selected text to your Field Notebook');
  btn.hidden = true;
  document.body.appendChild(btn);

  var toast = document.createElement('div');
  toast.className = 'notebook-toast';
  toast.hidden = true;
  document.body.appendChild(toast);

  var currentText = '';

  function onSelection() {
    var sel = window.getSelection();
    var text = sel ? sel.toString().trim() : '';
    if (!text || text.length < 8 || text.length > 600 || sel.rangeCount === 0) {
      btn.hidden = true; return;
    }
    // Only offer saving for selections inside the article
    var node = sel.anchorNode;
    var inArticle = false;
    while (node) { if (node === article) { inArticle = true; break; } node = node.parentNode; }
    if (!inArticle) { btn.hidden = true; return; }

    currentText = text;
    var rect = sel.getRangeAt(0).getBoundingClientRect();
    btn.style.top = (window.scrollY + rect.top - 44) + 'px';
    btn.style.left = Math.max(10, window.scrollX + rect.left + rect.width / 2 - btn.offsetWidth / 2) + 'px';
    btn.hidden = false;
  }

  document.addEventListener('mouseup', function () { setTimeout(onSelection, 10); });
  document.addEventListener('touchend', function () { setTimeout(onSelection, 200); });
  document.addEventListener('selectionchange', function () {
    var sel = window.getSelection();
    if (!sel || !sel.toString().trim()) btn.hidden = true;
  });

  btn.addEventListener('click', function () {
    var notes = load();
    var slug = location.pathname.split('/').pop().replace('.html', '');
    var title = (document.querySelector('.post-hero h1') || {}).textContent || document.title;
    // De-duplicate identical highlights on the same post
    var dupe = notes.some(function (n) { return n.slug === slug && n.text === currentText; });
    if (!dupe) {
      notes.unshift({ text: currentText, slug: slug, title: title.trim(), when: new Date().toISOString().slice(0, 10) });
      if (notes.length > 300) notes.length = 300;
      save(notes);
    }
    btn.hidden = true;
    if (window.getSelection) window.getSelection().removeAllRanges();
    toast.textContent = dupe ? 'Already in your notebook' : '✓ Saved — ' + load().length + ' note' + (load().length === 1 ? '' : 's') + ' in your notebook';
    toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.hidden = true; }, 2200);
  });
})();
