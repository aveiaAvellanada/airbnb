// Arranque de la presentación: reveal.js en 16:9 y conexión con las animaciones.

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

Reveal.initialize({
  // Lienzo fijo de 1920 × 1080; reveal.js lo escala a la pantalla o al proyector.
  width: 1920,
  height: 1080,
  margin: 0,
  minScale: 0.1,
  maxScale: 3,
  center: false,

  hash: true,
  controls: false, // se avanza con teclado o presentador inalámbrico
  progress: true,
  slideNumber: false,
  transition: 'fade',
  backgroundTransition: 'fade',

  // Línea de tiempo entre diapositivas (Fase 3)
  autoAnimateDuration: 1.1,
  autoAnimateEasing: 'cubic-bezier(0.65, 0, 0.35, 1)',

  // PDF: una página por diapositiva, con todo en su estado final
  pdfSeparateFragments: false,
  pdfMaxPagesPerSlide: 1,

  plugins: [RevealNotes],
}).then(() => {
  const sinMovimiento =
    Reveal.isPrintView() ||
    Reveal.isSpeakerNotes() ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sinMovimiento) return;

  Animaciones.reproducir(Reveal.getCurrentSlide());
  Reveal.on('slidechanged', (evento) => Animaciones.reproducir(evento.currentSlide));

  // Tecla A: repetir la animación de la diapositiva actual (útil al ensayar).
  Reveal.addKeyBinding(
    { keyCode: 65, key: 'A', description: 'Repetir la animación de la diapositiva' },
    () => Animaciones.reproducir(Reveal.getCurrentSlide()),
  );
});
