// Exporta la presentación a PDF: una página 16:9 por diapositiva, con cada
// animación en su estado final (en la vista de impresión no se anima nada).
// Usa el Chrome o Edge instalado en el equipo; no necesita internet.
//   npm run pdf                         -> salida/airbnb-kaseca.pdf
//   npm run pdf -- otra/ruta.pdf        -> ruta elegida
//   NAVEGADOR=chrome npm run pdf        -> forzar Chrome (por defecto prueba Edge y luego Chrome)

import { createRequire } from 'node:module';
import { mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { iniciarServidor } from './servidor.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(raiz, 'package.json'));
const { chromium } = require('playwright-core');

const salida = resolve(raiz, process.argv[2] ?? 'salida/airbnb-kaseca.pdf');
const PUERTO = 8765;

async function abrirNavegador() {
  const canales = process.env.NAVEGADOR === 'chrome' ? ['chrome'] : ['msedge', 'chrome'];
  for (const channel of canales) {
    try {
      return await chromium.launch({ channel });
    } catch {
      // Se prueba el siguiente navegador instalado.
    }
  }
  throw new Error('No se encontró Microsoft Edge ni Google Chrome instalados.');
}

const servidor = await iniciarServidor(PUERTO);
const navegador = await abrirNavegador();
try {
  const pagina = await navegador.newPage({ viewport: { width: 1920, height: 1080 } });
  const errores = [];
  pagina.on('pageerror', (e) => errores.push(e.message));
  pagina.on('requestfailed', (r) => errores.push(`No cargó: ${r.url()}`));

  await pagina.goto(`http://localhost:${PUERTO}/index.html?print-pdf`, { waitUntil: 'networkidle' });
  await pagina.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => (img.complete ? null : img.decode().catch(() => null))));
  });
  await pagina.waitForFunction(() => document.querySelectorAll('.pdf-page').length > 0);
  await pagina.waitForTimeout(500);

  const paginas = await pagina.evaluate(() => document.querySelectorAll('.pdf-page').length);
  if (errores.length) throw new Error('Errores al cargar la presentación:\n' + errores.join('\n'));

  mkdirSync(dirname(salida), { recursive: true });
  await pagina.pdf({
    path: salida,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const megas = (statSync(salida).size / 1024 / 1024).toFixed(1);
  console.log(`PDF listo: ${salida} (${paginas} páginas, ${megas} MB)`);
  if (paginas < 8 || paginas > 10) console.warn(`Aviso: la guía pide 8–10 páginas y salieron ${paginas}.`);
} finally {
  await navegador.close();
  servidor.close();
}
