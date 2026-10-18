# Airbnb: de 3 colchones inflables a…

Presentación del equipo KASECA para el Taller de Emprendimiento e Innovación
(Ingeniería de Sistemas, Universidad de la Amazonia).

## Abrir la presentación (sin internet)

- Doble clic en `index.html` (Chrome o Edge). La vista del presentador (tecla **S**) también funciona así.
- Alternativa con servidor local: `npm start` en una terminal dentro de esta carpeta y abrir
  http://localhost:8000.

Todo lo necesario está en la carpeta (`vendor/` incluye reveal.js, GSAP y la fuente), así que
basta con copiarla completa a una memoria USB.

## Teclas durante la exposición

| Tecla | Acción |
|-------|--------|
| → / Espacio | Siguiente |
| ← | Anterior |
| S | Vista del presentador (notas, tiempo y siguiente diapositiva) |
| F | Pantalla completa |
| A | Repetir la animación de la diapositiva |
| Esc | Vista general de todas las diapositivas |

## Exportar el PDF (para subir a Teams)

```
npm run pdf
```

Genera `salida/airbnb-kaseca.pdf`: 10 páginas 16:9, una por diapositiva, con las animaciones en su
estado final y los enlaces de las referencias activos. Usa el Edge o Chrome instalado; no necesita internet.

## Comprobar que funciona sin internet

```
npm run probar-offline
```

Abre `index.html` como con doble clic, bloquea la red y recorre las 10 diapositivas.

## Para el equipo de desarrollo

- `npm install` instala las dependencias y regenera `vendor/`.
- Guion por diapositiva: `contenido.md`. Fuentes y cifras: `fuentes.md`.
