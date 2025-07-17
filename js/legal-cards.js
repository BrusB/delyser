   // FUNCIONALIDAD DE TARJETAS DESPLEGABLES - TODA LA TARJETA CLICKEABLE
    document.addEventListener('DOMContentLoaded', function() {
      const cards = document.querySelectorAll('.texto-leg-1');
      
      cards.forEach((card, index) => {
        const header = card.querySelector('.card-header');
        const content = card.querySelector('.card-content');
        const icon = card.querySelector('.card-icon');
        
        // Asegurar que cada tarjeta comience cerrada
        card.classList.remove('active');
        content.classList.remove('expanded');
        
        // Función para toggle de la tarjeta
        function toggleCard(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const isActive = card.classList.contains('active');
          
          // Toggle solo la tarjeta actual de forma completamente independiente
          if (isActive) {
            // Cerrar la tarjeta actual
            card.classList.remove('active');
            content.classList.remove('expanded');
          } else {
            // Abrir la tarjeta actual
            card.classList.add('active');
            content.classList.add('expanded');
            
            // Asegurar que el scroll se ajuste suavemente
            setTimeout(() => {
              if (content.scrollHeight > content.clientHeight) {
                content.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'nearest' 
                });
              }
            }, 100);
          }
        }
        
        // Hacer toda la tarjeta clickeable cuando está cerrada
        card.addEventListener('click', function(e) {
          const isActive = card.classList.contains('active');
          
          // Si la tarjeta está cerrada, toda la tarjeta es clickeable
          if (!isActive) {
            toggleCard(e);
          }
        });
        
        // Cuando está abierta, solo el header es clickeable para evitar cierres accidentales
        header.addEventListener('click', function(e) {
          const isActive = card.classList.contains('active');
          
          // Si la tarjeta está abierta, solo permitir cerrar desde el header
          if (isActive) {
            toggleCard(e);
          }
        });
        
        // Prevenir que clicks en el contenido cierren la tarjeta
        content.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      });
      
      // Animaciones de entrada con delay
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
      
      // Observar tarjetas para animación
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      });
    });