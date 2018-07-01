  'use -strict';

var cacheName = 'moola-v1';
var staticCache = ['./','./js/apps.js', './css/main.css', './images/icons/icon-72x72.png'
];


self.addEventListener('install', function(event) {
  console.log("Service Worker Installed");

  event.waitUntil(
      caches.open(cacheName).then(function(cache){
          console.log("[Service Worker caching files]");
          return cache.addAll(staticCache);

      })
    );
});




  
self.addEventListener('activate', function(event) {
    console.log("Service Worker Activated");
  


   event.waitUntil(
    
    caches.keys().then(function (cacheNames) {
      return Promise.All(cacheNames.map(function(thisCacheName){
        if (expectedCacheNames.indexOf(cacheName) === -1) {
            console.log("Service Worker deleting files from ", thisCacheName);
            return cache.delete(thisCacheName);
          }
      }));
})
    );
});

        
self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});


/*self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match( event.request ).then( function( response ) {
        return response || fetch(event.request);
      }).catch( function( error ) {
        console.log( error, 'no cache entry for:', event.request.url );
      })
    );
  });*/
  

 
