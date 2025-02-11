self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("teddy-game-cache-v2").then((cache) => {
            return cache.addAll([
                "index.html",
                "style.css",
                "script.js",
                "teddy.png",
                "heart.png",
                "dodge.mp3",
                "gameover.mp3",
                "manifest.json"
            ]);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== "teddy-game-cache-v2") {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
