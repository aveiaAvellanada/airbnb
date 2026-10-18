// Convierte una imagen tipo sticker (persona recortada con borde blanco y sombra sobre
// fondo casi blanco) en un PNG con transparencia: quita el fondo y la sombra, conserva
// el borde blanco y recorta al contorno. Usa el Edge instalado; no sube nada a internet.
//   node scripts/recortar-sticker.mjs <entrada.jpg> <salida.png> [ladoMaximo=900]
// Ejemplo: node scripts/recortar-sticker.mjs assets/problema/originales/huespedes.jpg assets/problema/huespedes.png
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const proyecto = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(proyecto, 'package.json'));
const { chromium } = require('playwright-core');

const [entrada, salida, ladoMaximo = '900'] = process.argv.slice(2);
const datos = 'data:image/jpeg;base64,' + readFileSync(entrada).toString('base64');

const nav = await chromium.launch({ channel: 'msedge' });
const p = await nav.newPage();
const r = await p.evaluate(async ({ src, maximo }) => {
  const img = new Image();
  img.src = src;
  await img.decode();
  const w = img.width;
  const h = img.height;
  const lienzo = new OffscreenCanvas(w, h);
  const g = lienzo.getContext('2d');
  g.drawImage(img, 0, 0);
  const imagen = g.getImageData(0, 0, w, h);
  const d = imagen.data;
  const fuera = new Uint8Array(w * h);
  const minimo = (i) => Math.min(d[i * 4], d[i * 4 + 1], d[i * 4 + 2]);
  const maximoCanal = (i) => Math.max(d[i * 4], d[i * 4 + 1], d[i * 4 + 2]);

  function rellenar(semillas, puedePasar) {
    const pila = [...semillas];
    for (const s of semillas) fuera[s] = 1;
    let n = 0;
    while (pila.length) {
      const i = pila.pop();
      n++;
      const x = i % w;
      const y = (i / w) | 0;
      const vecinos = [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1];
      for (const v of vecinos) {
        if (v >= 0 && !fuera[v] && puedePasar(v)) { fuera[v] = 1; pila.push(v); }
      }
    }
    return n;
  }

  // 1. Fondo casi blanco, sembrado desde arriba, izquierda y derecha (abajo el sticker puede tocar el borde).
  const esFondo = (i) => minimo(i) >= 248;
  const semillas = [];
  for (let x = 0; x < w; x++) if (esFondo(x)) semillas.push(x);
  for (let y = 0; y < h; y++) {
    if (esFondo(y * w)) semillas.push(y * w);
    if (esFondo(y * w + w - 1)) semillas.push(y * w + w - 1);
  }
  const nFondo = rellenar(semillas, esFondo);

  // 2. Sombra: grises neutros más oscuros que el fondo, conectados al fondo; se detiene en el borde blanco.
  const semillasSombra = [];
  for (let i = 0; i < w * h; i++) if (fuera[i]) semillasSombra.push(i);
  const esSombra = (i) => minimo(i) < 250 && minimo(i) >= 100 && maximoCanal(i) - minimo(i) <= 16;
  const nSombra = rellenar(semillasSombra, esSombra) - semillasSombra.length;

  // 3. Transparencia y caja del contenido.
  let x0 = w, y0 = h, x1 = 0, y1 = 0;
  for (let i = 0; i < w * h; i++) {
    if (fuera[i]) { d[i * 4 + 3] = 0; continue; }
    const x = i % w;
    const y = (i / w) | 0;
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
  }

  // 4. Solo si el sticker tocaba el borde inferior de la foto: quita los restos sueltos
  //    que asoman bajo su línea inferior (filas casi vacías al fondo).
  const anchoCaja = x1 - x0 + 1;
  let base = y1;
  for (; y1 === h - 1 && base > y0; base--) {
    let opacos = 0;
    for (let x = x0; x <= x1; x++) if (!fuera[base * w + x]) opacos++;
    if (opacos >= 0.2 * anchoCaja) break;
  }
  for (let y = base + 1; y <= y1; y++) for (let x = 0; x < w; x++) d[(y * w + x) * 4 + 3] = 0;
  y1 = base;
  g.putImageData(imagen, 0, 0);
  const lienzo2 = lienzo;

  const ancho = x1 - x0 + 1;
  const alto = y1 - y0 + 1;
  const escala = Math.min(1, maximo / Math.max(ancho, alto));
  const final = new OffscreenCanvas(Math.round(ancho * escala), Math.round(alto * escala));
  const gf = final.getContext('2d');
  gf.imageSmoothingQuality = 'high';
  gf.drawImage(lienzo2, x0, y0, ancho, alto, 0, 0, final.width, final.height);
  const blob = await final.convertToBlob({ type: 'image/png' });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binario = '';
  for (let k = 0; k < bytes.length; k += 0x8000) binario += String.fromCharCode(...bytes.subarray(k, k + 0x8000));
  return { png: btoa(binario), caja: [x0, y0, x1, y1], final: [final.width, final.height], nFondo, nSombra, total: w * h };
}, { src: datos, maximo: Number(ladoMaximo) });

mkdirSync(dirname(salida), { recursive: true });
writeFileSync(salida, Buffer.from(r.png, 'base64'));
console.log(salida, 'caja', r.caja.join(','), 'final', r.final.join('x'),
  `fondo ${(100 * r.nFondo / r.total).toFixed(1)} %`, `sombra ${(100 * r.nSombra / r.total).toFixed(1)} %`);
await nav.close();
