    // Animación del footer al hacer scroll (bidireccional)
    const footer = document.querySelector('.footer');
    
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