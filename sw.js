const CACHE_NAME = 'surveyhub-v2';
const APP_URL = 'https://sudandioch.github.io/App/';

const ASSETS = [
  APP_URL,
  APP_URL + 'index.html',
  APP_URL + 'manifest.json',
  APP_URL + 'Icon.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching App Assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate & Clean Old Cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetching Assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
