// SUBMENÚ MEJORADO - Espera a que el contenido esté cargado
function initSubmenu() {
  console.log('🔧 Iniciando configuración de submenús...');
  
  const submenus = [
    { itemId: "recursos-item", linkId: "recursos-link" },
    { itemId: "servicios-item", linkId: "servicios-link" }
  ];

  let elementsFound = 0;
  let totalElements = submenus.length * 2; // item + link para cada submenú

  submenus.forEach(({ itemId, linkId }) => {
    const item = document.getElementById(itemId);
    const link = document.getElementById(linkId);

    if (item && link) {
      elementsFound += 2;
      console.log(`✅ Submenú configurado: ${itemId}`);
      
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Cierra todos los demás submenús abiertos
        submenus.forEach(({ itemId: otherId }) => {
          if (otherId !== itemId) {
            const otherItem = document.getElementById(otherId);
            if (otherItem) {
              otherItem.classList.remove("open");
            }
          }
        });

        // Alterna este submenú
        item.classList.toggle("open");
      });
    } else {
      console.warn(`⚠️ No se encontraron elementos para: ${itemId} o ${linkId}`);
    }
  });

  // Solo configurar el event listener global si encontramos al menos algunos elementos
  if (elementsFound > 0) {
    // Cierra cualquier submenú si haces clic fuera
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".has-submenu")) {
        submenus.forEach(({ itemId }) => {
          const item = document.getElementById(itemId);
          if (item) {
            item.classList.remove("open");
          }
        });
      }
    });
    
    console.log(`✅ Submenús inicializados: ${elementsFound}/${totalElements} elementos encontrados`);
  } else {
    console.warn('⚠️ No se encontraron elementos de submenú, reintentando en 500ms...');
    setTimeout(initSubmenu, 500);
  }
}

// Función para intentar inicializar cuando esté listo
function startSubmenuInit() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initSubmenu, 100); // Pequeño delay para asegurar que todo esté listo
    });
  } else {
    setTimeout(initSubmenu, 100);
  }
}

// Escuchar el evento personalizado de includes cargados
document.addEventListener('includesLoaded', () => {
  console.log('📡 Evento includesLoaded recibido, inicializando submenús...');
  setTimeout(initSubmenu, 100);
});

// También intentar la inicialización normal
startSubmenuInit();