        // Función para actualizar el mapa con la dirección específica
        function updateMap() {
            const address = "Calle Doctor Fleming 50, 28036 Madrid, España";
            const encodedAddress = encodeURIComponent(address);
            const mapFrame = document.querySelector('.map-frame');
            
            // URL del mapa embebido de Google Maps
            const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}&zoom=15`;
            
            // Si tienes una API key, descomenta la línea siguiente:
            // mapFrame.src = mapUrl;
            
            // Alternativa sin API key (usando la URL de búsqueda)
            mapFrame.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.6!2d-3.7038!3d40.4468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228c4d6f0c8e5%3A0x7b8c7d9e0f1a2b3c!2sCalle%20Doctor%20Fleming%2050%2C%2028036%20Madrid%2C%20Spain!5e0!3m2!1sen!2ses!4v1234567890`;
        }

        // Cargar el mapa cuando la página esté lista
        document.addEventListener('DOMContentLoaded', updateMap);