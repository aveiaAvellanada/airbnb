// Diapositiva 8 — Dificultades y crecimiento: el horizonte de edificios crece
// mientras suben las tres cifras de consolidación; después se dibuja la línea
// de tiempo larga (2007–2026), donde la etapa startup queda como un tramo corto.

Animaciones.registrar('crece', (seccion) => {
  const linea = gsap.timeline({ delay: 0.4 });

  // 1. Crecimiento: edificios y cifras al mismo tiempo.
  linea.from('.edificio', {
    scaleY: 0,
    transformOrigin: '50% 100%',
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
  }, 0);
  seccion.querySelectorAll('.cifra .contador').forEach((contador) => {
    linea.add(Animaciones.contar(contador, { duration: 1.6, ease: 'power2.out' }), 0.1);
  });

  // 2. La historia completa: el eje se dibuja y los hitos aparecen en orden.
  linea
    .from('.historia .eje', { drawSVG: '0%', duration: 1.4, ease: 'power1.inOut' }, 1.0)
    .from('.historia .marcas', { autoAlpha: 0, duration: 0.6 }, 1.2)
    .from('.historia .hito', { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.3 }, 1.4);
});
