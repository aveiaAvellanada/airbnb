// Diapositiva 1 — Portada: los tres colchones se inflan uno tras otro y, al final,
// la flecha sale de "a…" hacia el resto de la historia.

Animaciones.registrar('portada', () => {
  const linea = gsap.timeline({ delay: 0.4 });

  // 1. Inflar: cada colchón parte casi plano y rebota hasta su altura final.
  gsap.utils.toArray('.colchon').forEach((colchon, i) => {
    const inicio = i * 0.5;
    linea
      .from(colchon, {
        scaleY: 0.1,
        scaleX: 1.07,
        transformOrigin: '50% 100%',
        duration: 1.1,
        ease: 'elastic.out(1, 0.45)',
      }, inicio)
      .fromTo(colchon.querySelectorAll('.soplo'),
        { opacity: 1, drawSVG: '0%' },
        { drawSVG: '100%', duration: 0.35, stagger: 0.06, ease: 'power1.out' },
        inicio)
      .to(colchon.querySelectorAll('.soplo'),
        { opacity: 0, y: -14, duration: 0.4, stagger: 0.06 },
        inicio + 0.4);
  });

  // 2. La flecha se dibuja como un trazo a mano y termina en su punta. Ambas piezas
  //    quedan ocultas hasta su turno: con remate redondeado, un trazo de largo 0 se ve como un punto.
  linea
    .addLabel('flecha', '-=0.2')
    .from('.portada__trazo', { autoAlpha: 0, duration: 0.01 }, 'flecha')
    .from('.portada__trazo', { drawSVG: '0%', duration: 1.4, ease: 'power2.inOut' }, 'flecha')
    .fromTo('.portada__punta',
      { drawSVG: '50% 50%', autoAlpha: 0 },
      { drawSVG: '0% 100%', autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
});
