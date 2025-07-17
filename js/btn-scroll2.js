// === BOT�N SCROLL TO TOP ===

// Funci�n para hacer scroll hacia arriba
function scrollToTop() {
    // Verificar si existe la instancia de smooth scroll
    if (window.smoothScrollInstance && !window.smoothScrollInstance.isTouchDevice) {
        // Usar el smooth scroll personalizado
        window.smoothScrollInstance.target = 0;
        if (!window.smoothScrollInstance.rafActive) {
            window.smoothScrollInstance.rafActive = true;
        }
    } else {
        // Usar el scroll nativo para dispositivos t�ctiles
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Mostrar/ocultar el bot�n basado en la posici�n del scroll
window.addEventListener('scroll', () => {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    }
});

// Inicializar el bot�n
document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        // Estado inicial
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
        scrollButton.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        
        // Agregar el evento click
        scrollButton.addEventListener('click', scrollToTop);
    }
});

// Hacer la funci�n global para el onclick inline en HTML
window.scrollToTop = scrollToTop;