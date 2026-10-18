// Diapositiva 7 — Modelo de negocio: en cada fila salen monedas del huésped;
// una se queda en Airbnb (la comisión) y el resto llega al anfitrión.
// Al final cuenta lo que Airbnb se queda de cada USD 100 reservados.

Animaciones.registrar('modelo', (seccion) => {
  const linea = gsap.timeline({ delay: 0.4 });
  const hastaAirbnb = 232; // de x = 600 a x = 832
  const hastaAnfitrion = 568; // de x = 600 a x = 1168

  ['1', '2'].forEach((fila, f) => {
    gsap.utils.toArray(`.moneda[data-fila="${fila}"]`).forEach((moneda, i) => {
      const momento = f * 1.6 + i * 0.22;
      linea
        .fromTo(moneda, { autoAlpha: 0, x: 0 }, { autoAlpha: 1, duration: 0.15 }, momento)
        .to(moneda, { x: hastaAirbnb, duration: 0.55, ease: 'power1.inOut' }, momento);
      if (moneda.dataset.destino === 'airbnb') {
        linea.to(moneda, { scale: 0, autoAlpha: 0, duration: 0.25 }, momento + 0.55);
      } else {
        linea
          .to(moneda, { x: hastaAnfitrion, duration: 0.55, ease: 'power1.inOut' }, momento + 0.6)
          .to(moneda, { autoAlpha: 0, duration: 0.2 }, momento + 1.15);
      }
    });
  });

  // La tarjeta aparece cuando terminan las monedas, para no mostrar "USD 0" antes de tiempo.
  linea
    .fromTo('.captura', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 3.2)
    .add(Animaciones.contar(seccion.querySelector('.captura .contador'), { duration: 1.2, ease: 'power2.out' }), 3.4);
});
