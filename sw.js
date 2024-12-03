//asignar a nombre y version de la cache
const CACHE_NAME = 'v1_cache_ByAgarPWA';

//ficheros a cachear en la aplicacion
var urlsToCache = [
    './',
    './styles.css',
    './img/facebook.png',
    './img/twitter.png',
    './img/instagram.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/favicons/favicon-1024.png',
    './img/favicons/favicon-512.png',
    './img/favicons/favicon-384.png',
    './img/favicons/favicon-256.png',
    './img/favicons/favicon-192.png',
    './img/favicons/favicon-128.png',
    './img/favicons/favicon-96.png',
    './img/favicons/favicon-64.png',
    './img/favicons/favicon-32.png',
    './img/favicons/favicon-16.png',
];

//Evento install
//Instalacion del serviceWorker y guarda en cache los recursos estaticos
self.addEventListener('install', e => {    e.waitUntill(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(()=>{
                self.skipWaiting();
            });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});
//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});