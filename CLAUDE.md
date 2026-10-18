# Presentación Airbnb — Equipo KASECA

Presentación web animada (reveal.js + GSAP) para la exposición del caso de éxito de un
emprendimiento de base tecnológica: **Airbnb**.

## Contexto

- Curso: Taller de Emprendimiento e Innovación — Ingeniería de Sistemas, Universidad de la
  Amazonia (Florencia, Caquetá, Colombia).
- Requisitos y rúbrica: `docs/guia-trabajo-casos-de-exito.pdf` (léela antes de cambiar contenido).
  Los demás PDF de `docs/` son material de clase o ejemplos: solo contexto.
- **Instrucción de la profesora (prioridad sobre la guía):** el énfasis es Airbnb como
  **STARTUP**, no como empresa consolidada. Mostrar cómo empezó, qué potenció la idea y
  reflexionar sobre el proceso. La etapa de empresa grande va resumida en **una sola diapositiva** (la 8).
- Exposición de **15 minutos**, todo en **español**.
- Equipo KASECA:
  - Karly Alexa Puentes Moreno
  - Sebastian Villanueva Mosquera
  - Camilo Artunduaga Bueno

## Estructura (10 diapositivas)

| # | Diapositiva | Expositor |
|---|-------------|-----------|
| 1 | Portada: gancho "De 3 colchones inflables a…" + integrantes | Karly |
| 2 | El origen (2007–2008), con línea de tiempo | Karly |
| 3 | Problema y público objetivo (mercado de dos lados; quién usa y quién paga) | Karly |
| 4 | El MVP y la tecnología (la confianza como producto; propuesta de valor) | Sebastian |
| 5 | El valle de la muerte (rechazos de inversionistas, cajas de cereal, Y Combinator) | Sebastian |
| 6 | Lo que la potenció ("hacer cosas que no escalan", fotos en Nueva York, capital semilla) | Sebastian |
| 7 | Modelo de negocio (comisiones a huéspedes y anfitriones) | Camilo |
| 8 | Dificultades y crecimiento (una dificultad y cómo la abordaron + 2–3 cifras de consolidación) | Camilo |
| 9 | Reflexión del grupo (pregunta orientadora; qué aprendimos, qué aplicaríamos en Caquetá, qué sería difícil de replicar; sin limitarse a elogiar) | Los tres |
| 10 | Referencias con enlaces | Camilo |

El detalle por diapositiva está en `contenido.md`; las fuentes y el registro de cifras, en `fuentes.md`.

## Reglas de contenido

- Todo el texto (pantalla, notas, PDF) en español. Números en formato es-CO: punto de miles,
  coma decimal (USD 12.241 millones; 533,0 millones).
- **Cada cifra lleva fuente, fecha, moneda y unidad.** Si un dato no se puede confirmar en una
  fuente, se marca `[VERIFICAR]`; nunca se inventa. Las cifras viven en `fuentes.md` (IDs `[F#]`).
- Cada diapositiva con datos muestra una línea pequeña de "Fuente:" al pie.
- Los análisis propios se rotulan como "Análisis del grupo".
- La reflexión de la diapositiva 9 es del grupo: queda como `[BORRADOR]` hasta que el grupo
  entregue su versión. No reescribirla sin que lo pidan.
- Poco texto, cifras grandes, legible desde el fondo de un salón con proyector.

## Diseño

- **Logo:** usar SOLO `assets/logo/airbnb-logo-completo.svg` y `assets/logo/airbnb-icono.svg`.
  No dibujar, recrear ni modificar el logo (solo escalar y posicionar).
- **Paleta:**
  - Rausch `#FF5A5F` (principal)
  - Babu `#00A699`
  - Arches `#FC642D`
  - Hof `#484848` (texto)
  - Foggy `#767676`
- **Tipografía:** Plus Jakarta Sans, instalada localmente con npm (`@fontsource/plus-jakarta-sans`).
- **Evolución visual con la historia:** las primeras diapositivas parecen un cuaderno o garaje de
  startup (textura de papel, trazos a mano, fotos tipo polaroid) y se vuelven limpias y
  corporativas hacia la diapositiva 8.
- **Animaciones:** GSAP. Máximo 1–2 por diapositiva y cada una debe ayudar a contar la historia.
- **Ilustraciones:** SVG originales hechas a mano en código (avión, edificios que crecen,
  personas, maletas, casas, cámara con flash, mapa). No usar imágenes externas sin aprobación.
- **Línea de tiempo entre diapositivas:** auto-animate de reveal.js (`data-auto-animate` +
  `data-id` compartido).

## Requisitos técnicos

- reveal.js + GSAP, todo instalado localmente con npm. **Debe funcionar SIN internet**
  (nada de CDN, Google Fonts ni recursos remotos).
- Formato 16:9.
- Notas del presentador en **cada** diapositiva, indicando quién expone.
- Exportación a PDF (8–10 páginas, una por diapositiva) con cada animación en su **estado final**.
  Exportación automatizada con un script (decktape o Playwright).
- El PDF se sube al drive de Teams antes de la exposición (requisito de la guía).

## Flujo de trabajo

- Se trabaja por fases y **hay que detenerse a esperar revisión** al final de cada una:
  - FASE 1 — Organización e investigación (sin código).
  - FASE 2 — Proyecto base y portada.
  - FASE 3 — Diapositivas 2 a 10, **de una en una**, esperando revisión después de cada una.
  - FASE 4 — Exportación a PDF y prueba sin internet.
- Git: inicializar el repositorio y hacer **un commit al terminar cada fase aprobada**.
- Las sesiones son cortas: después de **cada diapositiva** hay que parar y preguntar si se sigue,
  y actualizar la sección "Estado del avance" antes de parar.

## Estado del avance

- FASE 1 ✅ aprobada (commit e006824).
- FASE 2 ✅ aprobada (commit "Fase 2: proyecto base y portada").
- FASE 3 en curso — diapositivas: 2 ✅ aprobada (con fotos reales de los fundadores que aportó el
  usuario, en `assets/fundadores/`) · 3 ✅ aprobada · 4 ✅ aprobada · el usuario pidió construir **todas las restantes seguidas**
  y revisarlas al final: 5–10 ✔ hechas y verificadas (recorrido 1→10→1 sin errores, notas en las 10, 10 páginas de impresión en estado final). **FASE 3 completa, esperando revisión del usuario**; al aprobarla: commit «Fase 3» y seguir con la FASE 4 (script de exportación a PDF + prueba sin internet) (sin commit hasta cerrar la fase).
- Línea de tiempo: las diap. 2 y 3 llevan `data-auto-animate`; la versión compacta
  (`.linea-tiempo--compacta`, franja inferior, estilos en `css/linea-tiempo.css`) marca el hito
  actual con `<circle class="actual">` y `.etiqueta--actual`. Puntos y etiquetas de la franja compacta son HTML con
  `data-id` (`lt-p1…lt-p5`, `lt-e1…lt-e5`) para que se deslicen: diap. 3–4 usan 3 hitos (x 400/1000/1600);
  diap. 5–6 usan 5 hitos (x 330/640/950/1260/1570: oct-07, mar-08, ago-08, ene-09, mar-09).
  La diap. 7 no la lleva. Contadores: `Animaciones.contar(el, vars)` con `data-valor` (restaura el texto).
- Decisiones del usuario: fotos reales para los fundadores (diap. 2) y stickers fotográficos de
  huéspedes y anfitriones (diap. 3, PNG generados con `scripts/recortar-sticker.mjs` desde
  `assets/problema/originales/`) y fotos en `assets/fotos/` (diap. 1 colchones «recreación», diap. 5
  cajas de cereal, diap. 6 apartamento «foto ilustrativa»; reducidas con `scripts/redimensionar.mjs`),
  todo aportado por el usuario; el resto, ilustraciones SVG propias; dificultad de la diap. 8 =
  crisis de confianza de 2011; capital semilla de Sequoia sin monto; el nombre de la docente aún
  no se tiene (no se muestra en la portada).

## Carpetas

```
index.html                 Las 10 diapositivas (<section>) con sus notas (<aside class="notes">)
css/base.css               Tokens, lienzo 1920×1080 y estilos cuaderno / transición / corporativo
css/diapositivas/NN-*.css  Estilos de cada diapositiva
js/animaciones.js          Registro de animaciones GSAP por diapositiva
js/diapositivas/NN-*.js    Animación de cada diapositiva
js/presentacion.js         Configuración de reveal.js y conexión con las animaciones
scripts/copiar-vendor.mjs  Copia librerías de node_modules a vendor/ (postinstall)
scripts/servidor.mjs       Servidor local sin dependencias (npm start)
vendor/                    reveal.js, GSAP y fuente; se versiona para funcionar sin internet
docs/                      PDF del curso (guía, ejemplo Mercado Libre, clase Ley 2069 de 2020)
assets/logo/               SVG oficiales de Airbnb (logo completo e ícono)
contenido.md               Guion por diapositiva
fuentes.md                 Fuentes y registro de cifras
```

## Convenciones técnicas (aprendidas en la Fase 2)

- **El HTML/CSS es el estado final.** Las animaciones solo usan `gsap.from`/`fromTo` dentro de
  `Animaciones.registrar('nombre', …)` y la diapositiva lleva `data-animacion="nombre"`. No se
  animan en impresión (`Reveal.isPrintView()`), en la vista del presentador ni con
  `prefers-reduced-motion`. Tecla A = repetir animación.
- **reveal.js 6:** la API es `Reveal.isPrintView()` (no existe `isPrintingPDF`). Las librerías se
  cargan como `<script>` clásicos (UMD) para que `index.html` abra también con doble clic (`file://`).
- **Fuente:** se incrusta en base64 en `vendor/fuentes/plus-jakarta-sans.css` (los navegadores
  bloquean fuentes desde `file://`). Familia CSS: `'Plus Jakarta Sans'`.
- **Selectores:** usar `section.estilo-*` (reveal.js copia las clases de la diapositiva a su capa
  de fondo) y `.reveal .slides section` (al imprimir, cada diapositiva queda dentro de `.pdf-page`).
- **SVG:** no usar `<use>` para piezas con estilos de clase (el CSS no llega a su árbol interno);
  repetir el marcado. Para trazos que se dibujan con DrawSVG y remate redondeado, ocultarlos
  (`autoAlpha`) hasta que empiecen, o se ve un punto.
- **Auto-animate (aprendido en la diap. 3):**
  - El `data-id` compartido va en un elemento **HTML** del mismo tamaño en ambas diapositivas
    (reveal.js mide con `offsetTop`/`offsetWidth`; en un `<svg>` da `NaN` y no anima, y si el
    tamaño cambia, deforma). La línea de tiempo usa `.linea-tiempo[data-id="linea-tiempo"]` (1920×400).
  - En diapositivas con `data-auto-animate`, la opacidad se anima **siempre con `fromTo` y
    `autoAlpha: 1` explícito**: reveal.js deja en `opacity: 0` los elementos no emparejados al
    iniciar la transición y `gsap.from()` tomaría ese 0 como destino (quedan invisibles).
  - Probar la transición en ambos sentidos (→ y ←).
- **Verificación:** capturas con Playwright usando el Edge instalado (`channel: 'msedge'`), en
  1920×1080, 1366×768, 1024×768 y `?print-pdf`.
