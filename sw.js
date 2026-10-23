const CACHE="carteleria-pnr-v23";
const FILES=["./", "Cartel_Exhibicion_2A4.html", "Carteles_A4_offline.html", "Carteles_Acrilico_A4_offline.html", "Carteles_Bajas_Precio.html", "Carteles_LPT.html", "Carteles_Ofertas.html", "Descriptivos_Pizarras.html", "Descuento_Tarjeta_x4.html", "Venta_Asistida_x4.html", "index.html", "manifest.json", "icon-192.png", "icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))))});
