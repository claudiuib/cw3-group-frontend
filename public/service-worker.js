var cacheName ="lessons-shop";
var  cacheFiles = [
    "index.html",
    "images/dino-192.png",
    "images/hacker-512.png",
   
];
// add event listener to create cache storage element
self.addEventListener("install",function(e){
    console.log("{Servive Worker} install");
    e.waitUntil(
       caches.open(cacheName).then(function(cache){
           console.log("{Servive Worker} Caching all the files");
           return cache.addAll(cacheFiles);
       })
    );
   
   });

   self.addEventListener("fetch",function(e){
    e.respondWith(
        caches.match(e.request).then(function(cachedFiles){
            if(cachedFiles){
                console.log("{Service Worker}Resource fetched from the cache for: "
                + e.request.url);
                return cachedFiles
            } else{
                return fetch (e.request).then(function(response){

                    return caches.open(cacheName).then(function(cache){
                        cache.put(e.request,  response.clone());
                        console.log("{Service Work} resource fetch  and saved in the cache :"
                        + e.request.url);
                        return response;
                    });
                });
            }
        })
    )
   })