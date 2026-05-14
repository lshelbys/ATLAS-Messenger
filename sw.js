const VERSION = 'atlas-v1';
const SHELL = ['./', './index.html', './style.css', './app.js', './config.js', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);
    if (e.request.method !== 'GET') return;
    // Never cache Firebase / Google APIs / Firestore — must hit network for real-time
    if (url.host.includes('googleapis.com') || url.host.includes('gstatic.com') || url.host.includes('firebaseio.com')) return;

    // Same-origin: network-first with cache fallback (so updates show fast, but offline still works).
    if (url.origin === location.origin) {
        e.respondWith(
            fetch(e.request).then(res => {
                const copy = res.clone();
                caches.open(VERSION).then(c => c.put(e.request, copy)).catch(() => {});
                return res;
            }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
        );
    }
});
