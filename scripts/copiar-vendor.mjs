// Copia las librerías instaladas con npm a vendor/ para que la presentación
// funcione sin internet y sin node_modules (basta con copiar la carpeta).
// Se ejecuta solo después de `npm install` (postinstall) o con `npm run vendor`.

import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const modulos = join(raiz, 'node_modules');
const vendor = join(raiz, 'vendor');

// [origen dentro de node_modules, destino dentro de vendor]
const archivos = [
  ['reveal.js/dist/reset.css', 'reveal/reset.css'],
  ['reveal.js/dist/reveal.css', 'reveal/reveal.css'],
  ['reveal.js/dist/reveal.js', 'reveal/reveal.js'],
  ['reveal.js/dist/plugin/notes.js', 'reveal/plugin/notes.js'],
  ['reveal.js/LICENSE', 'licencias/reveal.js-LICENSE.txt'],
  ['gsap/dist/gsap.min.js', 'gsap/gsap.min.js'],
  ['gsap/dist/DrawSVGPlugin.min.js', 'gsap/DrawSVGPlugin.min.js'],
  ['gsap/dist/MotionPathPlugin.min.js', 'gsap/MotionPathPlugin.min.js'],
  ['gsap/README.md', 'licencias/gsap-README.md'],
  ['@fontsource-variable/plus-jakarta-sans/LICENSE', 'licencias/plus-jakarta-sans-OFL.txt'],
];

// De la fuente solo se usan los subconjuntos latinos (español completo: tildes, ñ, ¿, ¡).
const fuente = {
  familia: 'Plus Jakarta Sans',
  paquete: '@fontsource-variable/plus-jakarta-sans',
  hojas: ['wght.css', 'wght-italic.css'],
  subconjuntos: ['latin', 'latin-ext'],
};

if (!existsSync(modulos)) {
  console.error('No existe node_modules/. Ejecuta primero: npm install');
  process.exit(1);
}

rmSync(vendor, { recursive: true, force: true });

for (const [origen, destino] of archivos) {
  const rutaOrigen = join(modulos, origen);
  if (!existsSync(rutaOrigen)) {
    console.warn(`Aviso: no se encontró ${origen}`);
    continue;
  }
  const rutaDestino = join(vendor, destino);
  mkdirSync(dirname(rutaDestino), { recursive: true });
  copyFileSync(rutaOrigen, rutaDestino);
}

// La fuente va incrustada en base64: los navegadores bloquean fuentes
// cargadas desde file://, y así la presentación abre con doble clic.
const caras = [];
for (const hoja of fuente.hojas) {
  const css = readFileSync(join(modulos, fuente.paquete, hoja), 'utf8');
  for (const [, nombre, cuerpo] of css.matchAll(/\/\* (\S+) \*\/\s*@font-face \{([^}]*)\}/g)) {
    if (!fuente.subconjuntos.some((s) => nombre.includes(`-${s}-wght-`))) continue;
    const archivo = cuerpo.match(/url\(\.\/(files\/[^)]+)\)/)[1];
    const base64 = readFileSync(join(modulos, fuente.paquete, archivo)).toString('base64');
    caras.push(`/* ${nombre} */\n@font-face {${cuerpo
      .replace(/font-family: [^;]+;/, `font-family: '${fuente.familia}';`)
      .replace(/font-display: [^;]+;/, 'font-display: block;')
      .replace(/src: [^;]+;/, `src: url(data:font/woff2;base64,${base64}) format('woff2');`)}}`);
  }
}
mkdirSync(join(vendor, 'fuentes'), { recursive: true });
writeFileSync(
  join(vendor, 'fuentes', 'plus-jakarta-sans.css'),
  `/* Generado por scripts/copiar-vendor.mjs a partir de @fontsource-variable/plus-jakarta-sans. No editar. */\n${caras.join('\n\n')}\n`,
);

console.log('vendor/ actualizado: reveal.js, GSAP y Plus Jakarta Sans listos para usar sin internet.');
