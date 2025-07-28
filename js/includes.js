/**
 * Sistema de Includes MEJORADO para Delyser Abogados
 * Versión corregida para páginas de servicios
 */

class DelyserlIncludes {
  constructor() {
    this.basePath = this.detectBasePath();
    console.log('🔍 Ruta base detectada:', this.basePath);
    this.init();
  }

  // Detecta la ruta base según la ubicación del archivo
  detectBasePath() {
    const path = window.location.pathname;
    const currentFile = path.split('/').pop() || 'index.html';
    
    console.log('📍 Ruta completa:', path);
    console.log('📄 Archivo actual:', currentFile);
    
    // Si está en una subcarpeta de servicios
    if (path.includes('/servicios/') || path.indexOf('servicios/') !== -1) {
      console.log('📁 Detectado: página de servicios');
      return '../';
    }
    
    // Si está en la raíz
    console.log('📁 Detectado: página raíz');
    return '';
  }

  // Header HTML con rutas dinámicas
  getHeaderHTML() {
    return `
      <header>
        <nav class="navbar">
          <a href="${this.basePath}index.html" class="logo">
            <img src="${this.basePath}img/img-index/logo-blanco.png" alt="Delyser Abogados Logo">
          </a>
          <ul class="nav-links">
            <li><a href="${this.basePath}index.html" data-page="index">INICIO</a></li>

            <li class="has-submenu" id="servicios-item">
              <a href="#servicios" id="servicios-link">SERVICIOS</a>
              <ul class="submenu" id="servicios-submenu">
                <div class="submenu-section">
                  <h3 class="submenu-title">Áreas de especialización</h3>
                  <div class="submenu-row">
                    <li><a href="${this.basePath}servicios/litigios.html" data-page="litigios">Litigios</a></li>
                    <li><a href="${this.basePath}servicios/clinicas.html" data-page="clinicas">Valoración de clínicas</a></li>
                    <li><a href="${this.basePath}servicios/compliance.html" data-page="compliance">Compliance Penal</a></li>
                    <li><a href="${this.basePath}servicios/rgpd.html" data-page="rgpd">Contratos tecnológicos y RGPD</a></li>
                    <li><a href="${this.basePath}servicios/fusiones.html" data-page="fusiones">Fusiones y Adquisiciones</a></li>
                  </div>
                </div>
                <div class="submenu-section">
                  <h3 class="submenu-title">Servicios</h3>
                  <div class="submenu-row">
                    <li><a href="${this.basePath}servicios/corporate.html" data-page="corporate">Corporate</a></li>
                    <li><a href="${this.basePath}servicios/urbanismo.html" data-page="urbanismo">Urbanismo</a></li>
                    <li><a href="${this.basePath}servicios/legal.html" data-page="legal">Legal</a></li>
                    <li><a href="${this.basePath}servicios/digital.html" data-page="digital">Digital</a></li>
                    <li><a href="${this.basePath}servicios/dental.html" data-page="dental">Dental</a></li>
                    <li><a href="${this.basePath}servicios/fiscal.html" data-page="fiscal">Fiscal</a></li>
                  </div>
                </div>
              </ul>
            </li>

            <li><a href="${this.basePath}equipo.html" data-page="equipo">EQUIPO</a></li>

            <li class="has-submenu" id="recursos-item">
              <a href="#recursos" id="recursos-link">RECURSOS</a>
              <ul class="submenu" id="recursos-submenu">
                <div class="submenu-row">
                  <li><a href="${this.basePath}delyser-cloud.html" data-page="delyser-cloud">Delyser Cloud</a></li>
                  <li><a href="${this.basePath}campus-delyser.html" data-page="campus-delyser">Campus Delyser</a></li>
                  <li><a href="${this.basePath}canal360.html" data-page="canal360">Canal 360</a></li>
                </div>
              </ul>
            </li>

            <li><a href="${this.basePath}derecho-1-min.html" data-page="derecho-1-min">DERECHO EN 1 MIN</a></li>
            <li><a href="${this.basePath}contacto.html" data-page="contacto">CONTACTO</a></li>
          </ul>
        </nav>
      </header>
    `;
  }

  // Footer HTML con rutas dinámicas
  getFooterHTML() {
    return `
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-info">
            <h4>DELYSER ABOGADOS S.L.P.</h4>
            <p>C/Doctor Fleming 30, 1ºD 28036 Madrid</p>
            <div class="footer-contact">
              <p>T: (+34) 91 541 01 47</p>
              <p>F: (+34) 91 542 66 98</p>
              <p>delyser@delyser.com</p>
            </div>
          </div>
          
          <div class="footer-logo">
            <img src="${this.basePath}img/img-index/logo-blanco.png" alt="Delyser Abogados Logo">
          </div>

          <div class="footer-social">
            <a href="#" class="social-icon instagram" title="Instagram">
              <i class="ph ph-instagram-logo"></i>
            </a>
            <a href="#" class="social-icon twitter" title="Twitter/X">
              <i class="ph ph-x-logo"></i>
            </a>
            <a href="#" class="social-icon linkedin" title="LinkedIn">
              <i class="ph ph-linkedin-logo"></i>
            </a>
            <a href="#" class="social-icon facebook" title="Facebook">
              <i class="ph ph-facebook-logo"></i>
            </a>
            <a href="https://wa.me/34681277466?text=Hola,%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20sus%20servicios%20legales." class="social-icon whatsapp" title="WhatsApp" target="_blank" rel="noopener noreferrer">
                <i class="ph ph-whatsapp-logo"></i>
            </a>
          </div>
        </div>
      </footer>

      <button class="scroll-to-top" title="Volver arriba"></button>
    `;
  }

  // Carga los includes
  loadIncludes() {
    // Cargar header
    const headerContainer = document.querySelector('[data-include="header"]');
    if (headerContainer) {
      headerContainer.innerHTML = this.getHeaderHTML();
      console.log('✅ Header cargado correctamente');
    } else {
      console.warn('⚠️ No se encontró contenedor para header [data-include="header"]');
    }

    // Cargar footer
    const footerContainer = document.querySelector('[data-include="footer"]');
    if (footerContainer) {
      footerContainer.innerHTML = this.getFooterHTML();
      console.log('✅ Footer cargado correctamente');
    } else {
      console.warn('⚠️ No se encontró contenedor para footer [data-include="footer"]');
    }
  }

  // Establece la navegación activa
  setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    // Remover .html para comparar
    const currentPage = currentFile.replace('.html', '');
    
    console.log('🎯 Estableciendo navegación activa para:', currentPage);

    // Esperar un poco para que el DOM se cargue
    setTimeout(() => {
      // Encontrar y marcar el enlace activo
      const links = document.querySelectorAll('[data-page]');
      console.log('🔍 Enlaces encontrados:', links.length);
      
      links.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        
        // Remover clase active de todos
        link.classList.remove('active');
        
        // Marcar activo si coincide
        if (linkPage === currentPage || 
            (currentPage === 'index' && linkPage === 'index')) {
          link.classList.add('active');
          console.log('✅ Marcado como activo:', linkPage);
        }
      });
    }, 200);
  }

  // Inicializa los submenús
  initSubmenu() {
    console.log('📋 Inicializando submenús...');
    
    // Esperar a que el DOM se cargue
    setTimeout(() => {
      const submenus = [
        { itemId: "recursos-item", linkId: "recursos-link" },
        { itemId: "servicios-item", linkId: "servicios-link" }
      ];

      submenus.forEach(({ itemId, linkId }) => {
        const item = document.getElementById(itemId);
        const link = document.getElementById(linkId);

        if (item && link) {
          console.log(`✅ Submenú configurado: ${itemId}`);
          
          link.addEventListener("click", function (e) {
            e.preventDefault();

            // Cierra otros submenús
            submenus.forEach(({ itemId: otherId }) => {
              if (otherId !== itemId) {
                const otherItem = document.getElementById(otherId);
                if (otherItem) otherItem.classList.remove("open");
              }
            });

            // Toggle este submenú
            item.classList.toggle("open");
          });
        } else {
          console.warn(`⚠️ No se pudo configurar submenú: ${itemId}`);
        }
      });

      // Cerrar submenús al hacer clic fuera
      document.addEventListener("click", function (e) {
        if (!e.target.closest(".has-submenu")) {
          submenus.forEach(({ itemId }) => {
            const item = document.getElementById(itemId);
            if (item) item.classList.remove("open");
          });
        }
      });

      console.log('✅ Submenús inicializados correctamente');
    }, 300);
  }

  // Inicialización principal
  async init() {
    console.log('🚀 Iniciando Delyser Includes...');
    
    // Cargar includes inmediatamente
    this.loadIncludes();
    
    // Configurar navegación y submenús después de cargar
    setTimeout(() => {
      this.setActiveNavigation();
      this.initSubmenu();
      
      // Disparar evento personalizado para otros scripts
      document.dispatchEvent(new CustomEvent('includesLoaded'));
      
      console.log('🎉 Delyser Includes completado exitosamente');
    }, 100);
  }
}

// Inicializar cuando el DOM esté listo
function initIncludes() {
  console.log('🔧 DOM listo - Iniciando sistema de includes...');
  window.delyserlIncludes = new DelyserlIncludes();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIncludes);
} else {
  initIncludes();
}