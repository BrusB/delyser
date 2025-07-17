    function toggleDetails(button) {
      const card = button.closest('.team-card');
      const details = card.querySelector('.team-details');
      const isActive = details.classList.contains('active');
      
      // Cerrar todos los otros desplegables
      document.querySelectorAll('.team-details').forEach(detail => {
        detail.classList.remove('active');
      });
      
      document.querySelectorAll('.info-btn').forEach(btn => {
        btn.textContent = '+ info';
      });
      
      // Toggle del desplegable actual
      if (!isActive) {
        details.classList.add('active');
        button.textContent = '- info';
      }
    }