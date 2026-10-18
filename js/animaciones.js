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
  let restauraciones = []; // textos que hay que devolver a su estado final

  function registrar(nombre, fabrica) {
    fabricas[nombre] = fabrica;
  }

  // Deshace la animación en curso y devuelve la diapositiva a su estado final.
  function detener() {
    if (activa) {
      activa.revert();
      activa = null;
    }
    restauraciones.forEach((restaurar) => restaurar());
    restauraciones = [];
  }

  function reproducir(seccion) {
    detener();
    const fabrica = seccion && fabricas[seccion.dataset.animacion];
    if (!fabrica) return;
    // El contexto limita los selectores a la diapositiva y permite revertirlo todo.
    activa = gsap.context(() => fabrica(seccion), seccion);
  }

  // Cuenta desde `desde` hasta el número de data-valor (formato es-CO, con
  // data-decimales opcional). Devuelve el tween para ubicarlo en una línea de tiempo.
  function contar(elemento, { desde = 0, ...vars } = {}) {
    const texto = elemento.textContent;
    const final = Number(elemento.dataset.valor);
    const decimales = Number(elemento.dataset.decimales || 0);
    const formato = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    });
    const estado = { valor: desde };
    const escribir = () => { elemento.textContent = formato.format(estado.valor); };
    restauraciones.push(() => { elemento.textContent = texto; });
    escribir();
    return gsap.to(estado, { ...vars, valor: final, onUpdate: escribir });
  }

  return { registrar, reproducir, detener, contar };
})();
