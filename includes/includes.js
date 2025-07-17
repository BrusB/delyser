/**
 * Sistema de Includes con Debug Específico para Footer
 * Identifica por qué el footer no aparece
 */

console.log("🔧 Delyser Includes Debug cargado");

class DelyserlIncludesDebug {
  constructor() {
    this.basePath = this.detectBasePath();
    this.init();
  }

  detectBasePath() {
    const path = window.location.pathname;
    console.log("🔧 Ruta actual:", path);
    
    if (path.includes('/index/servicios/')) {
      return '../../';
    } else if (path.includes('/index/')) {
      return '../';
    } else {
      return '';
    }
  }

  getFooterFallback() {
    return `<footer class="footer">
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
    </div>
  </div>
</footer>

<button class="scroll-to-top" title="Volver arriba"></button>`;
  }

  getHeaderFallback() {
    return `<header>
  <nav class="navbar">
    <a href="${this.basePath}index/index.html" class="logo">
      <img src="${this.basePath}img/img-index/logo-blanco.png" alt="Delyser Abogados Logo">
    </a>
    <ul class="nav-links">
      <li><a href="${this.basePath}index/index.html">INICIO</a></li>

      <li class="has-submenu" id="servicios-item">
        <a href="#servicios" id="servicios-link">SERVICIOS</a>
        <ul class="submenu" id="servicios-submenu">
          <div class="submenu-section">
            <h3 class="submenu-title">Áreas de especialización</h3>
            <div class="submenu-row">
              <li><a href="${this.basePath}index/servicios/litigios.html">Litigios</a></li>
              <li><a href="${this.basePath}index/servicios/clinicas.html">Valoración de clínicas</a></li>
              <li><a href="${this.basePath}index/servicios/compliance.html">Compliance Penal</a></li>
              <li><a href="${this.basePath}index/servicios/rgpd.html">Contratos tecnológicos y RGPD</a></li>
              <li><a href="${this.basePath}index/servicios/fusiones.html">Fusiones y Adquisiciones</a></li>
            </div>
          </div>
          <div class="submenu-section">
            <h3 class="submenu-title">Servicios</h3>
            <div class="submenu-row">
              <li><a href="${this.basePath}index/servicios/corporate.html">Corporate</a></li>
              <li><a href="${this.basePath}index/servicios/urbanismo.html">Urbanismo</a></li>
              <li><a href="${this.basePath}index/servicios/legal.html">Legal</a></li>
              <li><a href="${this.basePath}index/servicios/digital.html">Digital</a></li>
              <li><a href="${this.basePath}index/servicios/dental.html">Dental</a></li>
              <li><a href="${this.basePath}index/servicios/fiscal.html">Fiscal</a></li>
            </div>
          </div>
        </ul>
      </li>

      <li><a href="${this.basePath}index/equipo.html">EQUIPO</a></li>

      <li class="has-submenu" id="recursos-item">
        <a href="#recursos" id="recursos-link">RECURSOS</a>
        <ul class="submenu" id="recursos-submenu">
          <div class="submenu-row">
            <li><a href="${this.basePath}index/delyser-cloud.html">Delyser Cloud</a></li>
            <li><a href="${this.basePath}index/campus-delyser.html">Campus Delyser</a></li>
            <li><a href="${this.basePath}index/canal360.html">Canal 360</a></li>
          </div>
        </ul>
      </li>

      <li><a href="${this.basePath}index/derecho-1min.html">DERECHO EN 1 MIN</a></li>
      <li><a href="${this.basePath}index/contacto.html">CONTACTO</a></li>
    </ul>
  </nav>
</header>`;
  }

  async loadInclude(selector, includeType) {
    const element = document.querySelector(selector);
    
    console.log(`🔧 === DEBUG ${includeType.toUpperCase()} ===`);
    console.log(`🔧 Selector: ${selector}`);
    console.log(`🔧 Elemento encontrado:`, element);
    
    if (!element) {
      console.error(`❌ No se encontró elemento: ${selector}`);
      return;
    }

    console.log(`🔧 Elemento HTML antes:`, element.innerHTML);
    console.log(`🔧 Intentando cargar desde: ${this.basePath}includes/${includeType}.html`);

    try {
      const response = await fetch(`${this.basePath}includes/${includeType}.html`);
      console.log(`🔧 Respuesta fetch:`, response.status, response.statusText);
      
      if (response.ok) {
        const html = await response.text();
        console.log(`🔧 HTML recibido (longitud: ${html.length}):`, html.substring(0, 200) + '...');
        
        // Verificar si el HTML no está vacío
        if (html.trim().length === 0) {
          console.warn(`⚠️ Archivo ${includeType}.html está vacío`);
          throw new Error(`Archivo ${includeType}.html vacío`);
        }
        
        element.innerHTML = html;
        console.log(`✅ ${includeType} insertado en DOM`);
        console.log(`🔧 Elemento HTML después:`, element.innerHTML.substring(0, 200) + '...');
        
        // Verificar que realmente se insertó
        setTimeout(() => {
          console.log(`🔧 Verificación ${includeType} después de 100ms:`, element.innerHTML ? 'PRESENTE' : 'AUSENTE');
        }, 100);
        
        // Corregir rutas si es necesario
        this.fixPathsInContent(element);
        
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`❌ Error cargando ${includeType}:`, error);
      console.log(`🔧 Usando fallback para ${includeType}...`);
      
      // Usar fallback
      if (includeType === 'header') {
        element.innerHTML = this.getHeaderFallback();
      } else if (includeType === 'footer') {
        element.innerHTML = this.getFooterFallback();
      }
      
      console.log(`✅ ${includeType} cargado desde fallback`);
    }

    console.log(`🔧 === FIN DEBUG ${includeType.toUpperCase()} ===`);
  }

  fixPathsInContent(container) {
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('/')) {
        if (!src.startsWith(this.basePath)) {
          img.src = this.basePath + src;
          console.log(`🔧 Ruta imagen corregida: ${src} → ${img.src}`);
        }
      }
    });

    const links = container.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('/')) {
        if (!href.startsWith(this.basePath)) {
          link.href = this.basePath + href;
          console.log(`🔧 Ruta enlace corregida: ${href} → ${link.href}`);
        }
      }
    });
  }

  setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    console.log("🔧 Configurando navegación activa...");
    console.log("🔧 Archivo actual:", currentFile);
    
    setTimeout(() => {
      const allLinks = document.querySelectorAll('.nav-links a, .submenu a');
      console.log("🔧 Enlaces encontrados:", allLinks.length);
      
      allLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      const activeMap = {
        'index.html': 'INICIO',
        'equipo.html': 'EQUIPO',
        'delyser-cloud.html': 'Delyser Cloud',
        'campus-delyser.html': 'Campus Delyser',
        'canal360.html': 'Canal 360',
        'derecho-1min.html': 'DERECHO EN 1 MIN',
        'contacto.html': 'CONTACTO',
        'corporate.html': 'Corporate',
        'litigios.html': 'Litigios',
        'clinicas.html': 'Valoración de clínicas',
        'compliance.html': 'Compliance Penal',
        'rgpd.html': 'Contratos tecnológicos y RGPD',
        'fusiones.html': 'Fusiones y Adquisiciones',
        'urbanismo.html': 'Urbanismo',
        'legal.html': 'Legal',
        'digital.html': 'Digital',
        'dental.html': 'Dental',
        'fiscal.html': 'Fiscal'
      };
      
      const targetText = activeMap[currentFile];
      if (targetText) {
        const targetLink = Array.from(allLinks).find(link => 
          link.textContent.trim() === targetText
        );
        
        if (targetLink) {
          targetLink.classList.add('active');
          console.log(`✅ Marcado como activo: ${targetText}`);
        } else {
          console.log(`⚠️ No se encontró enlace para: ${targetText}`);
        }
      }
    }, 200);
  }

  initSubmenu() {
    console.log("🔧 Inicializando submenús...");
    
    setTimeout(() => {
      const serviciosItem = document.getElementById('servicios-item');
      const recursosItem = document.getElementById('recursos-item');
      
      console.log("🔧 servicios-item:", serviciosItem);
      console.log("🔧 recursos-item:", recursosItem);
      
      [serviciosItem, recursosItem].forEach(item => {
        if (item) {
          item.addEventListener('mouseenter', () => {
            item.classList.add('open');
          });
          
          item.addEventListener('mouseleave', () => {
            item.classList.remove('open');
          });
        }
      });
      
      console.log("✅ Submenús inicializados");
    }, 300);
  }

  // Función para verificar que el footer esté presente
  verifyFooter() {
    setTimeout(() => {
      const footer = document.querySelector('footer');
      const footerContainer = document.querySelector('[data-include="footer"]');
      
      console.log("🔧 === VERIFICACIÓN FOOTER ===");
      console.log("🔧 Footer encontrado:", footer);
      console.log("🔧 Container footer:", footerContainer);
      console.log("🔧 Contenido container:", footerContainer ? footerContainer.innerHTML.length : 'N/A');
      
      if (footer) {
        console.log("✅ Footer presente en DOM");
        console.log("🔧 Estilos footer:", window.getComputedStyle(footer).display);
      } else {
        console.error("❌ Footer NO encontrado en DOM");
      }
      
      console.log("🔧 === FIN VERIFICACIÓN FOOTER ===");
    }, 500);
  }

  async init() {
    console.log(`🔧 === INICIANDO DELYSER INCLUDES DEBUG ===`);
    console.log(`🔧 Base Path: ${this.basePath}`);
    
    try {
      // Cargar header y footer secuencialmente para mejor debug
      await this.loadInclude('[data-include="header"]', 'header');
      await this.loadInclude('[data-include="footer"]', 'footer');
      
      // Verificar que el footer esté presente
      this.verifyFooter();
      
      // Configurar navegación activa
      this.setActiveNavigation();
      
      // Inicializar submenús
      this.initSubmenu();
      
      // Notificar que está listo
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('includesLoaded'));
        console.log("🔧 Evento includesLoaded disparado");
      }, 400);
      
      console.log("✅ Delyser Includes Debug completado");
      
    } catch (error) {
      console.error("❌ Error en Delyser Includes Debug:", error);
    }
  }
}

// Inicializar con mejor timing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log("🔧 DOM ready - Iniciando Delyser Includes Debug...");
    window.delyserlIncludes = new DelyserlIncludesDebug();
  });
} else {
  console.log("🔧 DOM ya listo - Iniciando Delyser Includes Debug...");
  window.delyserlIncludes = new DelyserlIncludesDebug();
}