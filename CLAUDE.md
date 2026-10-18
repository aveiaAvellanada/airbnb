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

## Carpetas

```
docs/          PDF del curso (guía, ejemplo Mercado Libre, clase Ley 2069 de 2020)
assets/logo/   SVG oficiales de Airbnb (logo completo e ícono)
contenido.md   Guion por diapositiva
fuentes.md     Fuentes y registro de cifras
```
