const CACHE_NAME = 'passgen-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './script.js',
  './manifest.json',
  // Tambahkan icon jika Anda sudah memilikinya, contoh:
  // './icon-192.png'
];

// 1. Tahap Install: Menyimpan file ke dalam Cache browser
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Mengamankan aset ke cache...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Tahap Aktivasi: Membersihkan cache lama jika ada update
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Menghapus cache lama...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Tahap Fetch: Mengambil data dari cache jika offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika ada di cache, gunakan itu. Jika tidak, ambil dari jaringan.
      return response || fetch(event.request);
    })
  );
});
