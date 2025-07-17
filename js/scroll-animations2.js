// === ANIMACIONES AL HACER SCROLL ===

// Función para detectar cuando un elemento está visible
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Función alternativa más flexible (activación parcial)
function isElementPartiallyVisible(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < windowHeight && rect.bottom > 0;
}

// Configurar Intersection Observer para las animaciones generales
const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in, .divider-dot-center, .areas-title, .areas-grid');

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1, // Se activa cuando el 10% del elemento es visible
  rootMargin: '0px 0px -50px 0px' // Se activa un poco antes
});

// Observar todos los elementos con animación
animateElements.forEach(el => {
  animateObserver.observe(el);
});

// === ANIMACIONES ESPECÍFICAS PARA EL SLIDER ===

// Configurar animaciones para el slider
function setupSliderAnimations() {
  const sliderContainer = document.querySelector('.slider-container');
  const sliderHeader = document.querySelector('.slider-header');
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const sliderControls = document.querySelector('.slider-controls');
  const teamCards = document.querySelectorAll('.team-card');
  
  if (!sliderContainer) return;
  
  // Crear un observer específico para el slider
  const sliderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('slider-animated')) {
        entry.target.classList.add('slider-animated');
        
        // Animar el header del slider
        if (sliderHeader) {
          sliderHeader.style.opacity = '0';
          sliderHeader.style.transform = 'translateY(30px)';
          setTimeout(() => {
            sliderHeader.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            sliderHeader.style.opacity = '1';
            sliderHeader.style.transform = 'translateY(0)';
          }, 100);
        }
        
        // Animar el wrapper del slider
        if (sliderWrapper) {
          sliderWrapper.style.opacity = '0';
          sliderWrapper.style.transform = 'scale(0.95)';
          setTimeout(() => {
            sliderWrapper.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            sliderWrapper.style.opacity = '1';
            sliderWrapper.style.transform = 'scale(1)';
          }, 300);
        }
        
        // Animar cada tarjeta con retraso escalonado
        teamCards.forEach((card, index) => {
          // Solo animar las tarjetas visibles inicialmente
          if (index < 3) { // Ajusta este número según cuántas tarjetas se muestran inicialmente
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.9)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 400 + (index * 150)); // Retraso escalonado
          }
        });
        
        // Animar controles
        if (sliderControls) {
          sliderControls.style.opacity = '0';
          sliderControls.style.transform = 'translateY(20px)';
          setTimeout(() => {
            sliderControls.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            sliderControls.style.opacity = '1';
            sliderControls.style.transform = 'translateY(0)';
          }, 800);
        }
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observar el contenedor del slider
  if (sliderContainer) {
    sliderObserver.observe(sliderContainer);
  }
}

// === ANIMACIÓN PARA EL FOOTER (mejorada) ===
function setupFooterAnimation() {
  const footer = document.querySelector('.footer');
  if (!footer) return;
  
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add('animate');
      } else if (entry.boundingClientRect.top > 0) {
        // Solo remover la clase si el footer está debajo del viewport
        footer.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  footerObserver.observe(footer);
}

// Función alternativa con scroll listener (más control)
function checkScroll() {
  animateElements.forEach(el => {
    if (isElementPartiallyVisible(el) && !el.classList.contains('animate')) {
      el.classList.add('animate');
    }
  });
}

// Inicializar todo cuando se carga la página
window.addEventListener('load', () => {
  checkScroll();
  setupSliderAnimations();
  setupFooterAnimation();
});

// También verificar en el evento DOMContentLoaded por si acaso
document.addEventListener('DOMContentLoaded', () => {
  setupSliderAnimations();
  setupFooterAnimation();
});