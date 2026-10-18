// Servidor local mínimo, sin dependencias, para presentar o ensayar:
//   npm start            -> http://localhost:8000
//   npm start -- 9000    -> otro puerto
// La presentación también abre con doble clic en index.html; el servidor es
// necesario para la vista del presentador (tecla S) y para exportar el PDF.

import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const puerto = Number(process.argv[2] ?? process.env.PUERTO ?? 8000);

const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

export function iniciarServidor(puertoDeseado = puerto) {
  const servidor = createServer((peticion, respuesta) => {
    const ruta = decodeURIComponent(new URL(peticion.url, 'http://localhost').pathname);
    let archivo = normalize(join(raiz, ruta));
    if (!archivo.startsWith(raiz + sep) && archivo !== raiz) {
      respuesta.writeHead(403).end('Prohibido');
      return;
    }
    try {
      if (statSync(archivo).isDirectory()) archivo = join(archivo, 'index.html');
      statSync(archivo);
    } catch {
      respuesta.writeHead(404).end('No encontrado');
      return;
    }
    respuesta.writeHead(200, {
      'Content-Type': tipos[extname(archivo).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    createReadStream(archivo).pipe(respuesta);
  });
  return new Promise((resolver) => servidor.listen(puertoDeseado, () => resolver(servidor)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await iniciarServidor();
  console.log(`Presentación lista en http://localhost:${puerto}  (Ctrl+C para detener)`);
}
