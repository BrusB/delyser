// === SMOOTH SCROLL PERSONALIZADO ===

class SmoothScroll {
    constructor() {
        this.target = 0;
        this.current = 0;
        this.ease = 0.075; // Ajusta este valor para cambiar la velocidad (menor = más lento)
        this.rafId = null;
        this.rafActive = false;
        this.init();
    }

    init() {
        // Configurar el documento para smooth scroll
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Detectar el tipo de dispositivo
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (!this.isTouchDevice) {
            this.setupSmoothScroll();
        }
        
        // Smooth scroll para enlaces internos
        this.setupAnchorLinks();
    }

    setupSmoothScroll() {
        // Guardar la posición actual del scroll
        this.target = window.scrollY;
        this.current = window.scrollY;
        
        // Interceptar eventos de scroll
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        window.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Iniciar el loop de animación
        this.rafId = requestAnimationFrame(this.updateScroll.bind(this));
    }

    handleWheel(e) {
        e.preventDefault();
        
        // Calcular la velocidad del scroll
        const speed = 0.5; // Ajusta este valor para cambiar la sensibilidad (menor = más lento)
        const delta = e.deltaY * speed;
        
        this.target += delta;
        
        // Limitar el scroll a los límites de la página
        const limit = document.body.scrollHeight - window.innerHeight;
        this.target = Math.max(0, Math.min(this.target, limit));
        
        if (!this.rafActive) {
            this.rafActive = true;
        }
    }

    handleKeydown(e) {
        const scrollAmount = window.innerHeight * 0.9; // 90% de la altura de la ventana
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.target -= scrollAmount * 0.3;
                this.target = Math.max(0, this.target);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.target += scrollAmount * 0.3;
                break;
            case 'PageUp':
                e.preventDefault();
                this.target -= scrollAmount;
                this.target = Math.max(0, this.target);
                break;
            case 'PageDown':
                e.preventDefault();
                this.target += scrollAmount;
                break;
            case 'Home':
                e.preventDefault();
                this.target = 0;
                break;
            case 'End':
                e.preventDefault();
                this.target = document.body.scrollHeight - window.innerHeight;
                break;
            case ' ': // Barra espaciadora
                if (!e.shiftKey) {
                    e.preventDefault();
                    this.target += scrollAmount;
                } else {
                    e.preventDefault();
                    this.target -= scrollAmount;
                    this.target = Math.max(0, this.target);
                }
                break;
        }
        
        // Limitar el scroll
        const limit = document.body.scrollHeight - window.innerHeight;
        this.target = Math.max(0, Math.min(this.target, limit));
        
        if (!this.rafActive) {
            this.rafActive = true;
        }
    }

    updateScroll() {
        // Calcular la diferencia
        const diff = this.target - this.current;
        
        // Si la diferencia es muy pequeña, consideramos que llegamos al destino
        if (Math.abs(diff) < 0.1) {
            this.current = this.target;
            window.scrollTo(0, this.current);
            this.rafActive = false;
        } else {
            // Aplicar el easing
            this.current += diff * this.ease;
            window.scrollTo(0, this.current);
        }
        
        // Continuar el loop
        this.rafId = requestAnimationFrame(this.updateScroll.bind(this));
    }

    setupAnchorLinks() {
        // Smooth scroll para todos los enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                
                if (targetId === '#' || targetId === '') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const targetPosition = targetElement.offsetTop;
                    
                    if (this.isTouchDevice) {
                        // Para dispositivos táctiles, usar scroll nativo suave
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Para desktop, usar nuestro smooth scroll personalizado
                        this.target = targetPosition;
                        if (!this.rafActive) {
                            this.rafActive = true;
                        }
                    }
                }
            });
        });
    }

    // Método público para scroll programático
    scrollTo(position) {
        this.target = Math.max(0, Math.min(position, document.body.scrollHeight - window.innerHeight));
        if (!this.rafActive) {
            this.rafActive = true;
        }
    }
    
    // Método para destruir el smooth scroll si es necesario
    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        window.removeEventListener('wheel', this.handleWheel);
        window.removeEventListener('keydown', this.handleKeydown);
        document.documentElement.style.scrollBehavior = 'auto';
    }
}

// Inicializar el smooth scroll cuando se carga la página
let smoothScrollInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    smoothScrollInstance = new SmoothScroll();
    // Hacer la instancia global para que otros scripts puedan acceder
    window.smoothScrollInstance = smoothScrollInstance;
});

// Destruir y recrear en caso de cambio de orientación en móviles
window.addEventListener('orientationchange', () => {
    if (smoothScrollInstance) {
        smoothScrollInstance.destroy();
        setTimeout(() => {
            smoothScrollInstance = new SmoothScroll();
        }, 300);
    }
});