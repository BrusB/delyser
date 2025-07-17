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

    // Funci�n alternativa m�s flexible (activaci�n parcial)
    function isElementPartiallyVisible(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < windowHeight && rect.bottom > 0;
    }

    // Configurar Intersection Observer para las animaciones
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in');
    
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

    // Observar todos los elementos con animaci�n
    animateElements.forEach(el => {
      animateObserver.observe(el);
    });

    // Alternativa con scroll listener (m�s control)
    function checkScroll() {
      animateElements.forEach(el => {
        if (isElementPartiallyVisible(el) && !el.classList.contains('animate')) {
          el.classList.add('animate');
        }
      });
    }

    // Verificar al cargar la p�gina
    window.addEventListener('load', checkScroll);