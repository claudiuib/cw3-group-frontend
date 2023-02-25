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