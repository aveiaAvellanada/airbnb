// Diapositiva 5 — El valle de la muerte: llueven los correos de rechazo con su
// sello "NO"; después caen las cajas de cereal y el dinero recaudado sube.
// Opacidad con fromTo y destino explícito: la diapositiva usa auto-animate.

Animaciones.registrar('valle', (seccion) => {
  const visible = { autoAlpha: 1 };
  const linea = gsap.timeline({ delay: 0.5 });

  // 1. Los rechazos.
  gsap.utils.toArray('.correo').forEach((correo, i) => {
    const momento = i * 0.32;
    linea
      .fromTo(correo, { autoAlpha: 0 }, { ...visible, duration: 0.15 }, momento)
      .from(correo, { y: -160, rotation: '+=14', duration: 0.5, ease: 'power3.out' }, momento)
      .fromTo(correo.querySelector('.no'),
        { autoAlpha: 0, scale: 2.4 },
        { ...visible, scale: 1, duration: 0.22, ease: 'power4.in' }, momento + 0.42);
  });
  linea.fromTo('.valle__respuestas', { autoAlpha: 0 }, { ...visible, duration: 0.4 });

  // 2. El cereal que los mantuvo vivos.
  linea
    .fromTo('.cereal', { autoAlpha: 0 }, { ...visible, duration: 0.2 }, '+=0.2')
    .from('.cereal', { y: -140, duration: 0.8, ease: 'bounce.out' }, '<')
    .add(Animaciones.contar(seccion.querySelector('.contador'), { duration: 1.4, ease: 'power2.out' }), '-=0.2');
});
