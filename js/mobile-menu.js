/**
 * Funcionalidad del menú móvil responsive
 * Delyser Abogados - Mobile Menu Handler
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    handleResponsiveAdjustments();
});

/**
 * Inicializa el menú móvil
 */
function initMobileMenu() {
    // Crear el botón del menú móvil si no existe
    createMobileMenuButton();
    
    // Agregar event listeners
    setupMobileMenuEvents();
    
    // Configurar el comportamiento del menú en diferentes tamaños de pantalla
    handleScreenResize();
}

/**
 * Crea el botón del menú móvil
 */
function createMobileMenuButton() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Verificar si el botón ya existe
    let mobileButton = document.querySelector('.mobile-menu-toggle');
    
    if (!mobileButton) {
        mobileButton = document.createElement('button');
        mobileButton.className = 'mobile-menu-toggle';
        mobileButton.innerHTML = '<i class="ph ph-list"></i>';
        mobileButton.setAttribute('aria-label', 'Abrir menú de navegación');
        mobileButton.setAttribute('aria-expanded', 'false');
        
        // Insertar el botón después del logo
        const logo = navbar.querySelector('.logo');
        if (logo) {
            logo.insertAdjacentElement('afterend', mobileButton);
        } else {
            navbar.insertBefore(mobileButton, navbar.firstChild);
        }
    }
}

/**
 * Configura los eventos del menú móvil
 */
function setupMobileMenuEvents() {
    const mobileButton = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileButton || !navLinks) return;
    
    // Toggle del menú principal
    mobileButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            closeMobileMenu();
        }
    });
    
    // Manejar submenús en móvil
    setupMobileSubmenus();
    
    // Cerrar menú al hacer clic en enlaces (excepto los que tienen submenú)
    const menuLinks = navLinks.querySelectorAll('a:not([href^="#"])');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}

/**
 * Configura los submenús para móvil
 */
function setupMobileSubmenus() {
    const submenuItems = document.querySelectorAll('.has-submenu');
    
    submenuItems.forEach(item => {
        const link = item.querySelector('a[href^="#"]');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (window.innerWidth <= 768) {
                    // En móvil, toggle del submenú
                    item.classList.toggle('open');
                    
                    // Cerrar otros submenús
                    submenuItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('open');
                        }
                    });
                }
            });
        }
    });
}

/**
 * Alterna la visibilidad del menú móvil
 */
function toggleMobileMenu() {
    const mobileButton = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const icon = mobileButton.querySelector('i');
    
    if (!mobileButton || !navLinks || !icon) return;
    
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    
    // Cambiar el icono
    icon.className = isOpen ? 'ph ph-x' : 'ph ph-list';
    
    // Actualizar ARIA
    mobileButton.setAttribute('aria-expanded', isOpen.toString());
    
    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

/**
 * Cierra el menú móvil
 */
function closeMobileMenu() {
    const mobileButton = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const icon = mobileButton?.querySelector('i');
    
    if (!mobileButton || !navLinks || !icon) return;
    
    navLinks.classList.remove('active');
    icon.className = 'ph ph-list';
    mobileButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // Cerrar todos los submenús
    document.querySelectorAll('.has-submenu').forEach(item => {
        item.classList.remove('open');
    });
}

/**
 * Maneja los cambios de tamaño de pantalla
 */
function handleScreenResize() {
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
                // Restaurar el comportamiento normal de submenús
                document.querySelectorAll('.has-submenu').forEach(item => {
                    item.classList.remove('open');
                });
            }
        }, 100);
    });
}

/**
 * Ajustes responsivos adicionales
 */
function handleResponsiveAdjustments() {
    // Ajustar tamaño de fuente según el dispositivo
    adjustFontSizes();
    
    // Optimizar animaciones en móvil
    optimizeAnimationsForMobile();
    
    // Ajustar espaciado vertical
    adjustVerticalSpacing();
}

/**
 * Ajusta tamaños de fuente dinámicamente
 */
function adjustFontSizes() {
    const h1Elements = document.querySelectorAll('h1');
    const h2Elements = document.querySelectorAll('h2');
    
    function updateFontSizes() {
        const screenWidth = window.innerWidth;
        
        h1Elements.forEach(h1 => {
            if (screenWidth <= 480) {
                h1.style.fontSize = 'clamp(1.8rem, 8vw, 2.5rem)';
            } else if (screenWidth <= 768) {
                h1.style.fontSize = 'clamp(2rem, 6vw, 3rem)';
            } else {
                h1.style.fontSize = 'clamp(2.5rem, 5vw, 4.5rem)';
            }
        });
        
        h2Elements.forEach(h2 => {
            if (screenWidth <= 480) {
                h2.style.fontSize = 'clamp(1.2rem, 5vw, 1.8rem)';
            } else if (screenWidth <= 768) {
                h2.style.fontSize = 'clamp(1.4rem, 4vw, 2.2rem)';
            } else {
                h2.style.fontSize = 'clamp(1.8rem, 3vw, 2.5rem)';
            }
        });
    }
    
    updateFontSizes();
    window.addEventListener('resize', updateFontSizes);
}

/**
 * Optimiza animaciones para móvil
 */
function optimizeAnimationsForMobile() {
    // Reducir animaciones en dispositivos móviles para mejor rendimiento
    if (window.innerWidth <= 768) {
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        animatedElements.forEach(element => {
            element.style.transitionDuration = '0.4s';
        });
    }
}

/**
 * Ajusta el espaciado vertical en móvil
 */
function adjustVerticalSpacing() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reducir espaciado excesivo en móvil
        const spacingElements = document.querySelectorAll('br');
        spacingElements.forEach(br => {
            // Ocultar algunos br consecutivos en móvil
            if (br.nextElementSibling && br.nextElementSibling.tagName === 'BR') {
                br.style.display = 'none';
            }
        });
    }
}

/**
 * Utilidades adicionales para mejorar la experiencia móvil
 */

// Detectar orientación del dispositivo
function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            closeMobileMenu();
            // Ajustar elementos según la nueva orientación
            adjustForOrientation();
        }, 500);
    });
}

function adjustForOrientation() {
    const isLandscape = window.innerHeight < window.innerWidth;
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && isLandscape) {
        // Ajustes específicos para móvil en landscape
        document.body.classList.add('mobile-landscape');
    } else {
        document.body.classList.remove('mobile-landscape');
    }
}

// Mejorar el rendimiento del scroll en móvil
function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollElements() {
        // Aquí se pueden añadir optimizaciones específicas para el scroll
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }
    
    // Usar scroll pasivo para mejor rendimiento
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// Inicializar todas las funcionalidades adicionales
document.addEventListener('DOMContentLoaded', function() {
    handleOrientationChange();
    optimizeScrollPerformance();
});

// Exportar funciones para uso externo si es necesario
window.MobileMenu = {
    toggle: toggleMobileMenu,
    close: closeMobileMenu,
    init: initMobileMenu
};