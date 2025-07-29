// Animación del footer al hacer scroll (bidireccional) - VERSIÓN CORREGIDA
function initFooterAnimation() {
  const footer = document.querySelector('.footer');
  
  // Verificar que el footer existe antes de continuar
  if (!footer) {
    console.warn('⚠️ Footer no encontrado, reintentando en 500ms...');
    setTimeout(initFooterAnimation, 500);
    return;
  }

  console.log('✅ Footer encontrado, inicializando animación');

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // El footer entra en vista - animar hacia arriba
        footer.classList.add('animate');
      } else {
        // El footer sale de vista - animar hacia abajo
        footer.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.2, // Se activa cuando el 20% del footer es visible
    rootMargin: '0px 0px -50px 0px' // Se activa un poco antes de que sea completamente visible
  });
  
  footerObserver.observe(footer);
}

// Inicializar cuando el DOM esté listo Y cuando los includes estén cargados
function startFooterInit() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterAnimation);
  } else {
    initFooterAnimation();
  }
}

// Escuchar el evento de includes cargados
document.addEventListener('includesLoaded', initFooterAnimation);

// También intentar inicializar de forma normal
startFooterInit();