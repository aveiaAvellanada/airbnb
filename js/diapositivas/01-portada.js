// Diapositiva 1 — Portada: la foto de la polaroid se revela como una instantánea
// (de blanco lechoso a la imagen) y, al final, la flecha sale de "a…" hacia el
// resto de la historia.

Animaciones.registrar('portada', () => {
  const linea = gsap.timeline({ delay: 0.4 });

  // 1. La instantánea se revela. El destino repite el filtro de .polaroid img en base.css.
  linea.fromTo('.portada__foto',
    { filter: 'blur(6px) saturate(0) contrast(0.5) brightness(1.6) sepia(0.08)' },
    { filter: 'blur(0px) saturate(0.9) contrast(1.04) brightness(1) sepia(0.08)', duration: 2, ease: 'power2.out' }, 0);

  // 2. La flecha se dibuja como un trazo a mano y termina en su punta. Ambas piezas
  //    quedan ocultas hasta su turno: con remate redondeado, un trazo de largo 0 se ve como un punto.
  linea
    .addLabel('flecha', 1.4)
    .from('.portada__trazo', { autoAlpha: 0, duration: 0.01 }, 'flecha')
    .from('.portada__trazo', { drawSVG: '0%', duration: 1.4, ease: 'power2.inOut' }, 'flecha')
    .fromTo('.portada__punta',
      { drawSVG: '50% 50%', autoAlpha: 0 },
      { drawSVG: '0% 100%', autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
});
