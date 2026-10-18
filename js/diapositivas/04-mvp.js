// Diapositiva 4 — El MVP y la tecnología: el boceto de la página se arma pieza por
// pieza (foto, perfil, reseñas, mensajes, pago) y al final cae el sello "CONFIANZA".
// Opacidad con fromTo y destino explícito: la diapositiva usa auto-animate.

Animaciones.registrar('mvp', () => {
  const visible = { autoAlpha: 1 };
  const linea = gsap.timeline({ delay: 0.6 });

  // El navegador se dibuja a mano; el resto del marco aparece cuando ya hay contorno.
  linea
    .fromTo('.boceto .marco', { autoAlpha: 0 }, { ...visible, duration: 0.01 }, 0)
    .from('.boceto .marco', { drawSVG: '0%', duration: 0.9, ease: 'power1.inOut' }, 0)
    .fromTo('.wf-marco > :not(.marco)', { autoAlpha: 0 }, { ...visible, duration: 0.4 }, 0.5);

  // Cada pieza de la confianza entra en orden.
  const inicio = 0.9;
  const paso = 0.45;
  gsap.utils.toArray('.wf-pieza').forEach((pieza, i) => {
    linea.fromTo(pieza, { autoAlpha: 0, y: 16 }, { ...visible, y: 0, duration: 0.45, ease: 'power2.out' }, inicio + i * paso);
  });
  linea.from('.estrella', {
    scale: 0,
    transformOrigin: '50% 50%',
    duration: 0.3,
    stagger: 0.08,
    ease: 'back.out(3)',
  }, inicio + 2 * paso + 0.1);

  // El sello cae al final.
  const final = inicio + 5 * paso + 0.2;
  linea
    .fromTo('.sello',
      { autoAlpha: 0, scale: 2.2, rotation: -20 },
      { ...visible, scale: 1, rotation: -9, duration: 0.35, ease: 'power4.in' }, final)
    .to('.sello', { scale: 1.06, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.out' });
});
