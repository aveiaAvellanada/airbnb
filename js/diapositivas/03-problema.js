// Diapositiva 3 — Problema y público objetivo: llegan el huésped y el anfitrión,
// entre ellos aparece un "?" que se convierte en Airbnb, y de Airbnb salen las dos
// conexiones. Un solo momento: el problema de dos lados y su solución.
//
// La opacidad siempre va con fromTo y destino explícito: en diapositivas con
// auto-animate, reveal.js deja en opacity 0 los elementos no emparejados al empezar
// la transición, y un gsap.from() tomaría ese 0 como valor final.

Animaciones.registrar('problema', () => {
  const linea = gsap.timeline({ delay: 0.5 }); // deja terminar el auto-animate de la línea de tiempo
  const visible = { autoAlpha: 1 };

  linea
    .fromTo('.problema__huesped', { x: -90, autoAlpha: 0 }, { ...visible, x: 0, duration: 0.7, ease: 'power3.out' }, 0)
    .fromTo('.problema__anfitrion', { x: 90, autoAlpha: 0 }, { ...visible, x: 0, duration: 0.7, ease: 'power3.out' }, 0)

    // El "?" aparece, duda y desaparece.
    .fromTo('.problema__pregunta',
      { autoAlpha: 0, scale: 0 },
      { ...visible, scale: 1, duration: 0.45, ease: 'back.out(2.2)' }, 0.6)
    .to('.problema__pregunta', { rotation: 10, duration: 0.12, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 1.05)
    .to('.problema__pregunta', { autoAlpha: 0, scale: 0.3, duration: 0.25, ease: 'power2.in' }, 1.6)

    // En su lugar entra Airbnb y conecta los dos lados (cada trazo nace en el círculo).
    .fromTo('.problema__plataforma', { scale: 0, autoAlpha: 0 }, { ...visible, scale: 1, duration: 0.5, ease: 'back.out(2)' }, 1.75)
    .fromTo('.problema__lazos path', { autoAlpha: 0 }, { ...visible, duration: 0.01 }, 2.0)
    .from('.lazo-huesped', { drawSVG: '100% 100%', duration: 0.6, ease: 'power2.out' }, 2.0)
    .from('.lazo-anfitrion', { drawSVG: '0% 0%', duration: 0.6, ease: 'power2.out' }, 2.0)
    .fromTo('.problema__conecta', { y: 10, autoAlpha: 0 }, { ...visible, y: 0, duration: 0.4 }, 2.3);
});
