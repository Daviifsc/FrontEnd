/*      SERVICE WORKERS DESATIVADO

const version = '1.104.1'; // Troque isso toda vez que modificar arquivos
const cacheName = 'app-fc-v' + version;

const arquivos = [
  '/',
  '/login.html',
  '/home.html',
  '/manifest.json',
  '/service-worker.js',
  '/HTML/cadastroCliente.html',
  '/HTML/cadastroOferta.html',
  '/HTML/cadastroPublicacao.html',
  '/HTML/cadastroVendedor.html',
  '/HTML/paginaCliente.html',
  '/HTML/paginaVendedor.html',
  '/JS/navegacaoSPA.js',
  '/JS/paginaUser.js',
  '/JS/cadastroCliente.js',
  '/JS/cadastroVendedor.js',
  '/JS/cadastroOferta.js',
  '/JS/cadastroPublicacao.js',
  '/JS/main.js',
  '/JS/login.js',
  '/JS/dados.json',
  '/CSS/style.css',
  '/CSS/paginaUser.css',
  '/CSS/cadastroUser.css',
  '/CSS/cadastroOferta.css',
  '/CSS/cadastroPublicacao.css',
  '/CSS/login.css',
  '/IMAGENS/pote-mel.jpg',
  '/IMAGENS/sacos-trigo.jpg',
  '/IMAGENS/icone192.png',
  '/IMAGENS/icone512.png',
  '/IMAGENS/logo-3.png',
  '/IMAGENS/manoel-gomes.jpg',
  '/IMAGENS/organic-box.jpg',
];

// Instala e pré-carrega os arquivos
self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('[SW] Cacheando arquivos');
        return cache.addAll(arquivos);
      })
  );
  self.skipWaiting();
});

// Limpa caches antigos
self.addEventListener('activate', event => {
  console.log('[SW] Ativando...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('[SW] Deletando cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Responde às requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // console.log('[SW] Respondendo pelo cache:', event.request.url);
          return response;
        }
        // console.log('[SW] Buscando na rede:', event.request.url);
        return fetch(event.request)
          .then(res => {
            const resClone = res.clone();
            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, resClone);
              });
            return res;
          });
      })
      .catch(() => caches.match('/home.html')) // fallback offline
  );
});





const version = 1;
const cachename = 'app-fc-v' + version;

const arquivos = [
  'home.html',
  'manifest.json',
  'service-worker.js',
  'HTML/paginaCliente.html',
  'HTML/paginaVendedor.html',
  'JS/navegacaoSPA.js',
  'JS/paginaVendedor.js',
  'JS/main.js',
  'JS/dados.json',
  'CSS/style.css',
  'CSS/paginaVendedor.css',
  'IMAGENS/pote-mel.jpg',
  'IMAGENS/sacos-trigo.jpg',
  'IMAGENS/icone192.png',
  'IMAGENS/icone512.png',
  'IMAGENS/logo-3.png',
  'IMAGENS/manoel-gomes.jpg',
  'IMAGENS/organic-box.jpg',
];


self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cachename).then(function (cache) {
      return cache.addAll(arquivos);
    })
    
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request)
          .then(function (response) {
            let responseClone = response.clone();

            caches.open(cachename).then(function (cache) {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(function () {
            return caches.match('home.html');
          });
      }
    })
  );
});
*/