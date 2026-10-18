// Registro de animaciones GSAP por diapositiva.
//
// Regla del proyecto: el HTML y el CSS describen SIEMPRE el estado final de cada
// diapositiva. Las animaciones solo construyen el camino hasta ese estado (con
// gsap.from / fromTo). Así el PDF, la vista del presentador y quien tenga activado
// "reducir movimiento" ven la diapositiva completa sin ejecutar nada.
//
// Uso en cada diapositiva:
//   <section data-animacion="portada"> … </section>
//   Animaciones.registrar('portada', (seccion) => { gsap.timeline()… });

window.Animaciones = (function () {
  const fabricas = {};
  let activa = null; // gsap.context de la diapositiva que se está animando

  function registrar(nombre, fabrica) {
    fabricas[nombre] = fabrica;
  }

  // Deshace la animación en curso y devuelve la diapositiva a su estado final.
  function detener() {
    if (activa) {
      activa.revert();
      activa = null;
    }
  }

  function reproducir(seccion) {
    detener();
    const fabrica = seccion && fabricas[seccion.dataset.animacion];
    if (!fabrica) return;
    // El contexto limita los selectores a la diapositiva y permite revertirlo todo.
    activa = gsap.context(() => fabrica(seccion), seccion);
  }

  return { registrar, reproducir, detener };
})();
