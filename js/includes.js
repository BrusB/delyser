/**
 * SOLUCIÓN FAVICON PARA DELYSER - Actualización includes.js
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

  // ===== NUEVA FUNCIÓN PARA MANEJAR FAVICON =====
  setupFavicon() {
    console.log('🎨 Configurando favicon con basePath:', this.basePath);
    
    const head = document.head;
    
    // Limpiar favicons existentes para evitar duplicados
    const existingFavicons = head.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]');
    existingFavicons.forEach(link => {
      console.log('🗑️ Removiendo favicon existente:', link.href);
      link.remove();
    });
    
    // Definir todos los favicons necesarios
    const favicons = [
      { rel: 'icon', type: 'image/x-icon', href: this.basePath + 'favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: this.basePath + 'favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: this.basePath + 'favicon-32x32.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: this.basePath + 'apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: this.basePath + 'android-chrome-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', href: this.basePath + 'android-chrome-512x512.png' },
      { rel: 'manifest', href: this.basePath + 'site.webmanifest' }
    ];
    
    // Crear y agregar cada elemento link
    favicons.forEach(faviconData => {
      const link = document.createElement('link');
      
      Object.keys(faviconData).forEach(key => {
        link.setAttribute(key, faviconData[key]);
      });
      
      head.appendChild(link);
      console.log('✅ Favicon agregado:', faviconData.href);
    });
    
    // Agregar meta theme-color para móviles
    const existingThemeColor = head.querySelector('meta[name="theme-color"]');
    if (!existingThemeColor) {
      const themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      themeColorMeta.content = '#f6c90e'; // Color primario de Delyser
      head.appendChild(themeColorMeta);
      console.log('🎨 Theme color agregado');
    }
  }

  // Header HTML con rutas dinámicas (sin cambios)
  getHeaderHTML() {
    return `
      <header>
        <nav class="navbar">
          <a href="${this.basePath}index.html" class="logo">
            <img src="${this.basePath}img/img-index/logo-blanco.png" alt="Delyser Abogados Logo">
          </a>
          <ul class="nav-links">
            <li><a href="${this.basePath}index.html" data-page="index" title="Ir a Inicio">INICIO</a></li>

            <li class="has-submenu" id="servicios-item">
              <a href="#servicios" id="servicios-link" title="Servicios">SERVICIOS</a>
              <ul class="submenu" id="servicios-submenu">
                <div class="submenu-section">
                  <h3 class="submenu-title">Áreas de especialización</h3>
                  <div class="submenu-row">
                    <li><a href="${this.basePath}servicios/litigios.html" data-page="litigios" title="Ir a Litigios">Litigios</a></li>
                    <li><a href="${this.basePath}servicios/clinicas.html" data-page="clinicas" title="Ir a Valoración de Clínicas>Valoración de clínicas</a></li>
                    <li><a href="${this.basePath}servicios/compliance.html" data-page="compliance" title="Ir a Compliance Penal">Compliance Penal</a></li>
                    <li><a href="${this.basePath}servicios/rgpd.html" data-page="rgpd" title="Ir a Contratos tecnológicos y RGPD">Contratos tecnológicos y RGPD</a></li>
                    <li><a href="${this.basePath}servicios/fusiones.html" data-page="fusiones" title="Ir a Fusiones y Adquisiciones">Fusiones y Adquisiciones</a></li>
                  </div>
                </div>
                <div class="submenu-section">
                  <h3 class="submenu-title">Servicios</h3>
                  <div class="submenu-row">
                    <li><a href="${this.basePath}servicios/corporate.html" data-page="corporate" title="Ir a Corporate">Corporate</a></li>
                    <li><a href="${this.basePath}servicios/urbanismo.html" data-page="urbanismo" title="Ir a Urbanismo">Urbanismo</a></li>
                    <li><a href="${this.basePath}servicios/legal.html" data-page="legal" title="Ir a Legal">Legal</a></li>
                    <li><a href="${this.basePath}servicios/digital.html" data-page="digital" title="Ir a Digital">Digital</a></li>
                    <li><a href="${this.basePath}servicios/dental.html" data-page="dental" title="Ir a Dental">Dental</a></li>
                    <li><a href="${this.basePath}servicios/fiscal.html" data-page="fiscal" title="Ir a Fiscal">Fiscal</a></li>
                  </div>
                </div>
              </ul>
            </li>

            <li><a href="${this.basePath}equipo.html" data-page="equipo" title="Ir a Equipo">EQUIPO</a></li>

            <li class="has-submenu" id="recursos-item">
              <a href="#recursos" id="recursos-link" title="Recursos">RECURSOS</a>
              <ul class="submenu" id="recursos-submenu">
                <div class="submenu-row">
                  <li><a href="${this.basePath}delyser-cloud.html" data-page="delyser-cloud" title="Ir a DelyserCloud">Delyser Cloud</a></li>
                  <li><a href="${this.basePath}campus-delyser.html" data-page="campus-delyser" title="Ir a Campus Delyser">Campus Delyser</a></li>
                  <li><a href="${this.basePath}canal360.html" data-page="canal360" title="Ir a Canal 360">Canal 360</a></li>
                </div>
              </ul>
            </li>

            <li><a href="${this.basePath}derecho-1-min.html" data-page="derecho-1-min" title="Ir a Derecho en 1 minuto">DERECHO EN 1 MIN</a></li>
            <li><a href="${this.basePath}contacto.html" data-page="contacto" title="Ir a contacto">CONTACTO</a></li>
          </ul>
        </nav>
      </header>
    `;
  }

  // Footer HTML con rutas dinámicas (sin cambios)
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

  // Establece la navegación activa (sin cambios)
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

  // Inicializa los submenús (sin cambios)
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

  // ===== INICIALIZACIÓN PRINCIPAL MODIFICADA =====
  async init() {
    console.log('🚀 Iniciando Delyser Includes...');
    
    // 1. Configurar favicon PRIMERO
    this.setupFavicon();
    
    // 2. Cargar includes
    this.loadIncludes();
    
    // 3. Configurar navegación y submenús después de cargar
    setTimeout(() => {
      this.setActiveNavigation();
      this.initSubmenu();
      
      // Disparar evento personalizado para otros scripts
      document.dispatchEvent(new CustomEvent('includesLoaded'));
      
      console.log('🎉 Delyser Includes completado exitosamente');
    }, 100);
  }
}

// Función para verificar si los archivos del favicon existen
function checkFaviconFiles() {
  const basePath = window.location.pathname.includes('/servicios/') ? '../' : '';
  const faviconFiles = [
    'favicon.ico',
    'favicon-16x16.png', 
    'favicon-32x32.png',
    'apple-touch-icon.png'
  ];
  
  console.log('🔍 Verificando archivos de favicon...');
  
  faviconFiles.forEach(file => {
    const img = new Image();
    img.onload = () => console.log('✅', file, 'existe');
    img.onerror = () => console.error('❌', file, 'NO ENCONTRADO');
    img.src = basePath + file;
  });
}

// Inicializar cuando el DOM esté listo
function initIncludes() {
  console.log('🔧 DOM listo - Iniciando sistema de includes...');
  window.delyserlIncludes = new DelyserlIncludes();
  
  // Verificar archivos de favicon en desarrollo
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setTimeout(checkFaviconFiles, 1000);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIncludes);
} else {
  initIncludes();
}

// ===== UTILIDAD PARA FORZAR RECARGA DE FAVICON =====
window.reloadFavicon = function() {
  console.log('🔄 Forzando recarga de favicon...');
  const links = document.querySelectorAll('link[rel*="icon"]');
  links.forEach(link => {
    const href = link.href;
    link.href = href + '?v=' + Date.now();
  });
};

// ===== UTILIDAD PARA DEBUG =====
window.debugFavicon = function() {
  console.log('🔍 Debug de favicon:');
  const links = document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"]');
  links.forEach((link, index) => {
    console.log(`${index + 1}. ${link.rel} - ${link.href}`);
  });
};