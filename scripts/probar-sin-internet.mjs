// Prueba sin internet: abre index.html con doble clic simulado (file://), bloquea
// cualquier petición fuera del equipo y recorre las 10 diapositivas.
//   npm run probar-offline
// Falla si algún recurso intenta descargarse de internet, si no carga la fuente,
// si falta una imagen o si hay errores de JavaScript.

import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(raiz, 'package.json'));
const { chromium } = require('playwright-core');

let navegador;
for (const channel of ['msedge', 'chrome']) {
  try { navegador = await chromium.launch({ channel }); break; } catch { /* siguiente */ }
}
if (!navegador) throw new Error('No se encontró Microsoft Edge ni Google Chrome instalados.');

const contexto = await navegador.newContext({ viewport: { width: 1920, height: 1080 }, offline: true });
const externas = [];
await contexto.route((url) => !url.href.startsWith('file:'), (ruta) => {
  externas.push(ruta.request().url());
  return ruta.abort();
});

const pagina = await contexto.newPage();
const errores = [];
pagina.on('pageerror', (e) => errores.push(`JavaScript: ${e.message}`));
pagina.on('requestfailed', (r) => { if (r.url().startsWith('file:')) errores.push(`No cargó: ${r.url()}`); });

await pagina.goto(pathToFileURL(join(raiz, 'index.html')).href + '#/0', { waitUntil: 'load' });
await pagina.waitForTimeout(1500);

const estado = await pagina.evaluate(async () => {
  await document.fonts.ready;
  return {
    reveal: typeof Reveal !== 'undefined' && Reveal.isReady(),
    gsap: typeof gsap !== 'undefined',
    fuente: document.fonts.check('800 40px "Plus Jakarta Sans"'),
    total: Reveal.getTotalSlides(),
  };
});

let rotas = [];
for (let i = 0; i < estado.total; i++) {
  if (i > 0) { await pagina.keyboard.press('ArrowRight'); await pagina.waitForTimeout(900); }
  rotas = rotas.concat(await pagina.evaluate(() => [...Reveal.getCurrentSlide().querySelectorAll('img')]
    .filter((img) => !img.complete || img.naturalWidth === 0)
    .map((img) => img.getAttribute('src'))));
}
const llegada = await pagina.evaluate(() => Reveal.getIndices().h + 1);
await navegador.close();

const fallos = [];
if (!estado.reveal) fallos.push('reveal.js no arrancó');
if (!estado.gsap) fallos.push('GSAP no cargó');
if (!estado.fuente) fallos.push('La fuente Plus Jakarta Sans no cargó');
if (llegada !== estado.total) fallos.push(`El recorrido se detuvo en la diapositiva ${llegada}`);
if (rotas.length) fallos.push('Imágenes que no cargaron: ' + [...new Set(rotas)].join(', '));
if (externas.length) fallos.push('Intentó usar internet: ' + [...new Set(externas)].join(', '));
fallos.push(...errores);

console.log(`Diapositivas recorridas: ${llegada}/${estado.total} · reveal.js: ${estado.reveal ? 'sí' : 'no'} · GSAP: ${estado.gsap ? 'sí' : 'no'} · fuente: ${estado.fuente ? 'sí' : 'no'}`);
if (fallos.length) {
  console.error('FALLÓ la prueba sin internet:\n- ' + fallos.join('\n- '));
  process.exit(1);
}
console.log('OK: la presentación funciona sin internet.');
