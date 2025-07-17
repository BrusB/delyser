  document.addEventListener("DOMContentLoaded", function () {
    const submenus = [
      { itemId: "recursos-item", linkId: "recursos-link" },
      { itemId: "servicios-item", linkId: "servicios-link" }
    ];

    submenus.forEach(({ itemId, linkId }) => {
      const item = document.getElementById(itemId);
      const link = document.getElementById(linkId);

      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Cierra todos los demás submenús abiertos
        submenus.forEach(({ itemId: otherId }) => {
          if (otherId !== itemId) {
            document.getElementById(otherId).classList.remove("open");
          }
        });

        // Alterna este submenú
        item.classList.toggle("open");
      });
    });

    // Cierra cualquier submenú si haces clic fuera
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".has-submenu")) {
        submenus.forEach(({ itemId }) => {
          document.getElementById(itemId).classList.remove("open");
        });
      }
    });
  });