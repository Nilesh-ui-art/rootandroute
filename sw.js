/* Root & Route service worker — v3 */
var CACHE = 'rr-v3';
var CORE = ['/','/index.html','/trail-log.html','/quiz.html','/about.html','/404.html',
  '/assets/css/style.css?v=3','/assets/js/main.js?v=3','/assets/js/quiz.js?v=3','/notebook.html','/terminal.html','/assets/js/terminal.js?v=3','/assets/js/notebook.js?v=3','/assets/img/favicon.svg'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  var isHTML = req.headers.get('accept') && req.headers.get('accept').indexOf('text/html') !== -1;
  if (isHTML) {
    // Network first: readers always get fresh posts; cache is the offline fallback
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) { return hit || caches.match('/404.html'); });
    }));
  } else {
    // Cache first: CSS/JS/images are versioned, so cached copies are always valid
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      });
    }));
  }
});
