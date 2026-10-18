// Diapositiva 6 — Lo que la potenció: la cámara dispara el flash, la foto del
// apartamento en Nueva York se revela (de borrosa a nítida) y luego los ingresos
// semanales se duplican de USD 200 a USD 400.

Animaciones.registrar('potencio', (seccion) => {
  const linea = gsap.timeline({ delay: 0.6 });

  // 1. Flash y foto que se revela.
  linea
    .fromTo('.camara .destello',
      { autoAlpha: 0, scale: 0.4, transformOrigin: '0% 100%' },
      { autoAlpha: 1, scale: 1, duration: 0.12 }, 0)
    .to('.camara .destello', { autoAlpha: 0, duration: 0.4 }, 0.25)
    .fromTo('.flash', { autoAlpha: 0 }, { autoAlpha: 0.85, duration: 0.08 }, 0.05)
    .to('.flash', { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, 0.15)
    // El destino repite el filtro de .polaroid img en base.css para no dar un salto al final.
    .fromTo('.foto-ny__escena',
      { filter: 'blur(10px) saturate(0) contrast(0.7) brightness(0.8) sepia(0.08)' },
      { filter: 'blur(0px) saturate(0.9) contrast(1.04) brightness(1) sepia(0.08)', duration: 1.4, ease: 'power2.out' }, 0.15);

  // 2. Los ingresos se duplican.
  linea
    .from('.barra--despues', { scaleY: 0.5, duration: 0.9, ease: 'power2.out' }, 1.8)
    .add(Animaciones.contar(seccion.querySelector('.barras .contador'), {
      desde: 200,
      duration: 0.9,
      ease: 'power2.out',
    }), 1.8);
});
