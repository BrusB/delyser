// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.scroll-to-top');
    
    // Verificar que el botón existe
    if (!button) {
        console.warn('No se encontró el botón .scroll-to-top');
        return;
    }

    // Función para volver arriba
    function scrollToTop() {
        // Verificar si existe smooth scroll personalizado
        if (window.smoothScrollInstance && typeof window.smoothScrollInstance.scrollTo === 'function') {
            // Usar el smooth scroll personalizado
            window.smoothScrollInstance.scrollTo(0);
        } else {
            // Usar scroll nativo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Agregar evento click al botón
    button.addEventListener('click', scrollToTop);

    // Mostrar/ocultar botón según el scroll
    function toggleButtonVisibility() {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
            button.style.transform = 'translateY(20px)';
        }
    }

    // Escuchar el evento scroll
    window.addEventListener('scroll', toggleButtonVisibility);

    // Llamar la función una vez al cargar para establecer el estado inicial
    toggleButtonVisibility();
});    
    
    
    // function scrollToTop() {
        //     window.scrollTo({
        //         top: 0,
        //         behavior: 'smooth'
        //     });
        // }

        // // Mostrar/ocultar bot�n seg�n el scroll (opcional)
        // window.addEventListener('scroll', function() {
        //     const button = document.querySelector('.scroll-to-top');
        //     if (window.pageYOffset > 300) {
        //         button.style.opacity = '1';
        //         button.style.visibility = 'visible';
        //     } else {
        //         button.style.opacity = '0.7';
        //     }
        // });