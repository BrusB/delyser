class TeamSlider {
    constructor() {
        this.track = document.getElementById('sliderTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('dotsContainer');
        
        // Verificar que todos los elementos existan
        if (!this.track || !this.prevBtn || !this.nextBtn || !this.dotsContainer) {
            console.error('Slider: No se encontraron todos los elementos necesarios');
            return;
        }
        
        this.cards = document.querySelectorAll('.team-card');
        this.currentPage = 0;
        this.cardsPerView = this.getCardsPerView();
        this.totalPages = Math.ceil(this.cards.length / this.cardsPerView);
        this.autoPlayInterval = null;
        
        console.log('Slider inicializado:', {
            cards: this.cards.length,
            cardsPerView: this.cardsPerView,
            totalPages: this.totalPages
        });
        
        this.init();
    }
    
    getCardsPerView() {
        const containerWidth = this.track.parentElement.offsetWidth;
        const cardWidth = 300; // Ancho mínimo de cada tarjeta
        const gap = 20; // Espacio entre tarjetas
        const padding = 40; // Padding del contenedor
        
        const availableWidth = containerWidth - (padding * 2);
        const cardsPerView = Math.floor(availableWidth / (cardWidth + gap));
        
        return Math.max(1, cardsPerView);
    }
    
    init() {
        // Agregar iconos a los botones
        this.prevBtn.innerHTML = '<i class="ph ph-caret-left"></i>';
        this.nextBtn.innerHTML = '<i class="ph ph-caret-right"></i>';
        
        this.createDots();
        this.updateSlider();
        this.addEventListeners();
        this.startAutoPlay();
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        
        // Crear un dot por cada "página" del slider
        for (let i = 0; i < this.totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === this.currentPage) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => this.goToPage(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === this.currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    updateSlider() {
        // Ajustar el ancho de las tarjetas para llenar el espacio disponible
        const containerWidth = this.track.parentElement.offsetWidth;
        const gap = 20;
        const totalGaps = (this.cardsPerView - 1) * gap;
        const availableWidth = containerWidth - totalGaps;
        const cardWidth = Math.max(300, availableWidth / this.cardsPerView);
        
        this.cards.forEach(card => {
            card.style.width = cardWidth + 'px';
        });
        
        // Calcular el offset basado en la página actual
        const cardsToMove = this.currentPage * this.cardsPerView;
        const offset = -(cardsToMove * (cardWidth + gap));
        this.track.style.transform = `translateX(${offset}px)`;
        
        // Los botones siempre están habilitados para comportamiento circular
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
        
        // Actualizar dots
        this.updateDots();
    }
    
    goToPage(pageIndex) {
        this.currentPage = pageIndex;
        this.updateSlider();
        // Forzar actualización de dots
        this.updateDots();
    }
    
    nextSlide() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
        } else {
            // Comportamiento circular: volver al principio
            this.currentPage = 0;
        }
        this.updateSlider();
    }
    
    prevSlide() {
        if (this.currentPage > 0) {
            this.currentPage--;
        } else {
            // Comportamiento circular: ir al final
            this.currentPage = this.totalPages - 1;
        }
        this.updateSlider();
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // 4 segundos
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resumeAutoPlay() {
        setTimeout(() => {
            this.startAutoPlay();
        }, 2000); // Esperar 2 segundos antes de reanudar
    }
    
    handleResize() {
        const oldCardsPerView = this.cardsPerView;
        this.cardsPerView = this.getCardsPerView();
        const oldTotalPages = this.totalPages;
        this.totalPages = Math.ceil(this.cards.length / this.cardsPerView);
        
        // Ajustar currentPage si es necesario
        if (this.currentPage >= this.totalPages) {
            this.currentPage = this.totalPages - 1;
        }
        
        // Recrear dots si cambió el número de páginas
        if (oldTotalPages !== this.totalPages) {
            this.createDots();
        }
        
        this.updateSlider();
    }
    
    addEventListeners() {
        // Botones de navegación
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.prevSlide();
            this.resumeAutoPlay();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide();
            this.resumeAutoPlay();
        });
        
        // Resize handler con debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Pausar auto-play al hacer hover
        this.track.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        this.track.addEventListener('mouseleave', () => {
            this.resumeAutoPlay();
        });
        
        // Pausar auto-play al interactuar con dots
        this.dotsContainer.addEventListener('click', () => {
            this.stopAutoPlay();
            this.resumeAutoPlay();
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.stopAutoPlay();
                this.prevSlide();
                this.resumeAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.stopAutoPlay();
                this.nextSlide();
                this.resumeAutoPlay();
            }
        });
        
        // Touch/swipe support para móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                this.stopAutoPlay();
                if (diff > 0) {
                    // Swipe left - next
                    this.nextSlide();
                } else {
                    // Swipe right - prev
                    this.prevSlide();
                }
                this.resumeAutoPlay();
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
}

// Inicializar el slider cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new TeamSlider();
});