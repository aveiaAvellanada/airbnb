// Reduce una imagen a un lado máximo y la guarda como JPG o PNG (según la extensión
// de salida). Usa el Edge instalado; no sube nada a internet.
//   node scripts/redimensionar.mjs <entrada> <salida.jpg|png> [ladoMaximo=1000]
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const proyecto = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(proyecto, 'package.json'));
const { chromium } = require('playwright-core');

const [entrada, salida, ladoMaximo = '1000'] = process.argv.slice(2);
const tipoEntrada = extname(entrada).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
const tipoSalida = extname(salida).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
const datos = `data:${tipoEntrada};base64,` + readFileSync(entrada).toString('base64');

const nav = await chromium.launch({ channel: 'msedge' });
const p = await nav.newPage();
const r = await p.evaluate(async ({ src, maximo, tipo }) => {
  const img = new Image();
  img.src = src;
  await img.decode();
  const escala = Math.min(1, maximo / Math.max(img.width, img.height));
  const lienzo = new OffscreenCanvas(Math.round(img.width * escala), Math.round(img.height * escala));
  const g = lienzo.getContext('2d');
  g.imageSmoothingQuality = 'high';
  g.drawImage(img, 0, 0, lienzo.width, lienzo.height);
  // ¿Tiene transparencia?
  const d = g.getImageData(0, 0, lienzo.width, lienzo.height).data;
  let transparentes = 0;
  for (let i = 3; i < d.length; i += 4) if (d[i] < 250) transparentes++;
  const blob = await lienzo.convertToBlob({ type: tipo, quality: 0.86 });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binario = '';
  for (let k = 0; k < bytes.length; k += 0x8000) binario += String.fromCharCode(...bytes.subarray(k, k + 0x8000));
  return { datos: btoa(binario), tam: [lienzo.width, lienzo.height], original: [img.width, img.height], transparentes };
}, { src: datos, maximo: Number(ladoMaximo), tipo: tipoSalida });

mkdirSync(dirname(salida), { recursive: true });
writeFileSync(salida, Buffer.from(r.datos, 'base64'));
console.log(salida, `${r.original.join('x')} -> ${r.tam.join('x')}`, `píxeles transparentes: ${r.transparentes}`);
await nav.close();
