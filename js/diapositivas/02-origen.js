// Diapositiva 2 — El origen: un avión de papel recorre la línea de tiempo
// (San Francisco → Austin → Denver), la línea se dibuja a su paso y cada hito
// cae como una nota adhesiva cuando el avión llega a su marca.

Animaciones.registrar('origen', (seccion) => {
  const ruta = seccion.querySelector('#origen-ruta');
  const duracion = 3.4;
  const linea = gsap.timeline({ delay: 0.3 });

  linea
    .from(ruta, { drawSVG: '0%', duration: duracion, ease: 'none' }, 0)
    .to('.avion', {
      motionPath: { path: ruta, align: ruta, alignOrigin: [0.5, 0.5], autoRotate: true },
      duration: duracion,
      ease: 'none',
      immediateRender: true,
    }, 0)
    .fromTo('.linea-tiempo__sigue', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, duracion);

  // Cada hito aparece cuando el avión pasa por su marca (proporción del recorrido).
  const inicio = 220;
  const fin = 1780;
  gsap.utils.toArray('.linea-tiempo__marca').forEach((marca) => {
    const hito = marca.dataset.hito;
    const circulo = marca.querySelector('circle');
    const x = Number(circulo.getAttribute('cx'));
    const momento = duracion * ((x - inicio) / (fin - inicio)) - 0.1;

    linea
      .from(marca, {
        scale: 0,
        svgOrigin: `${x} ${circulo.getAttribute('cy')}`,
        duration: 0.45,
        ease: 'back.out(2.5)',
      }, momento)
      // Opacidad con fromTo y destino explícito (ver nota en 03-problema.js sobre auto-animate).
      .fromTo(`.nota[data-hito="${hito}"]`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, momento)
      .from(`.nota[data-hito="${hito}"]`, { y: -60, rotation: '+=7', duration: 0.6, ease: 'back.out(1.6)' }, momento)
      .fromTo(`.fecha[data-hito="${hito}"]`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, momento + 0.15)
      .from(`.fecha[data-hito="${hito}"]`, { y: 14, duration: 0.4 }, momento + 0.15);
  });
});
