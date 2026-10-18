// Diapositiva 9 — Reflexión del grupo: el avión viaja de San Francisco a Florencia,
// cae el pin de destino y después llegan las tres notas de los integrantes.

Animaciones.registrar('reflexion', (seccion) => {
  const camino = seccion.querySelector('#ruta-camino');
  const linea = gsap.timeline({ delay: 0.5 });

  linea
    .to('.ruta__avion', {
      motionPath: { path: camino, align: camino, alignOrigin: [0.5, 0.5], autoRotate: true, end: 0.9 },
      duration: 2.2,
      ease: 'power1.inOut',
      immediateRender: true,
    }, 0)
    // y relativo: el pin ya tiene su posición en el atributo transform.
    .from('.ruta__pin--destino', { y: '-=60', autoAlpha: 0, duration: 0.6, ease: 'bounce.out' }, 1.9)
    .from('.aporte', {
      y: 40,
      rotation: '+=4',
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.25,
      ease: 'back.out(1.4)',
    }, 2.3);
});
