    // Sample video data - Replace with your actual video data
    const videosData = [
      {
        id: 1,
        title: "Derecho Laboral en 1 minuto",
        description: "Conceptos básicos sobre contratos laborales y derechos del trabajador",
        tags: ["Laboral", "Contratos"],
        thumbnail: null,
        videoUrl: "videos/penguins.mp4" 
      },
      {
        id: 2,
        title: "Compliance Penal",
        description: "Importancia del compliance en empresas y prevención de delitos",
        tags: ["Penal", "Compliance"],
        thumbnail: null,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" // URL de ejemplo
      },
      {
        id: 3,
        title: "Protección de Datos",
        description: "RGPD y protección de datos personales en el entorno digital",
        tags: ["RGPD", "Datos"],
        thumbnail: null,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" // URL de ejemplo
      },
      {
        id: 4,
        title: "Derecho Fiscal",
        description: "Obligaciones fiscales para empresas y autónomos",
        tags: ["Fiscal", "Empresas"],
        thumbnail: null,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" // URL de ejemplo
      },
      {
        id: 5,
        title: "Derecho Mercantil",
        description: "Fusiones y adquisiciones empresariales paso a paso",
        tags: ["Mercantil", "Fusiones"],
        thumbnail: null,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" // URL de ejemplo
      },
      {
        id: 6,
        title: "Derecho de Familia",
        description: "Procedimientos de divorcio y custodia de menores",
        tags: ["Familia", "Divorcio"],
        thumbnail: null,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" // URL de ejemplo
      },
      {
        id: 7,
        title: "Derecho Inmobiliario",
        description: "Aspectos legales en la compraventa de inmuebles",
        tags: ["Inmobiliario", "Compraventa"],
        thumbnail: null,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" // URL de ejemplo
      },
      {
        id: 8,
        title: "Litigios Comerciales",
        description: "Estrategias para la resolución de conflictos empresariales",
        tags: ["Litigios", "Comercial"],
        thumbnail: null,
        videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" // URL de ejemplo
      }
    ];

    // Generate video cards
    function generateVideoCards(videos) {
      const videosGrid = document.getElementById('videosGrid');
      videosGrid.innerHTML = '';

      videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
          <div class="video-container">
            <div class="video-placeholder" id="placeholder-${video.id}">
              <button class="play-button" onclick="playVideo(${video.id})">
                <i class="ph ph-play"></i>
              </button>
            </div>
            <video class="video-element" id="video-${video.id}" controls>
              <source src="${video.videoUrl}" type="video/mp4">
              <p>Tu navegador no soporta la reproducción de videos.</p>
            </video>
          </div>
          <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-description">${video.description}</p>
            <div class="video-tags">
              ${video.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        `;
        videosGrid.appendChild(videoCard);
      });
    }

    // Filter videos
    function filterVideos() {
      const filterValue = document.getElementById('filterInput').value.toLowerCase();
      const filteredVideos = videosData.filter(video => 
        video.title.toLowerCase().includes(filterValue) ||
        video.description.toLowerCase().includes(filterValue) ||
        video.tags.some(tag => tag.toLowerCase().includes(filterValue))
      );
      generateVideoCards(filteredVideos);
    }

    // Play video
    function playVideo(videoId) {
      const video = videosData.find(v => v.id === videoId);
      if (video) {
        const videoElement = document.getElementById(`video-${videoId}`);
        const placeholder = document.getElementById(`placeholder-${videoId}`);
        
        if (videoElement && placeholder) {
          // Pausar todos los otros videos
          document.querySelectorAll('.video-element.playing').forEach(v => {
            v.classList.remove('playing');
            v.pause();
            v.currentTime = 0;
          });
          
          // Mostrar todos los placeholders
          document.querySelectorAll('.video-placeholder.playing').forEach(p => {
            p.classList.remove('playing');
          });
          
          // Ocultar placeholder y mostrar video
          placeholder.classList.add('playing');
          videoElement.classList.add('playing');
          
          // Reproducir el video
          videoElement.play().catch(error => {
            console.log('Error al reproducir el video:', error);
            // Si no se puede reproducir el video, mostrar mensaje
            placeholder.classList.remove('playing');
            videoElement.classList.remove('playing');
            alert('No se pudo cargar el video. Verifica la URL del video.');
          });
          
          // Cuando el video termine, volver al placeholder
          videoElement.onended = function() {
            placeholder.classList.remove('playing');
            videoElement.classList.remove('playing');
            videoElement.currentTime = 0;
          };
        }
      }
    }

    // Close modal
    function closeModal() {
      document.getElementById('videoModal').style.display = 'none';
    }

    // Event listeners
    document.getElementById('filterInput').addEventListener('input', filterVideos);

    // Pause videos when clicking outside
    document.addEventListener('click', function(e) {
      // Si el clic no es en un video o sus controles, pausar todos los videos
      if (!e.target.closest('.video-container') && !e.target.closest('.play-button')) {
        document.querySelectorAll('.video-element.playing').forEach(v => {
          v.pause();
        });
      }
    });

    // Initialize page
    document.addEventListener('DOMContentLoaded', function() {
      generateVideoCards(videosData);
    });