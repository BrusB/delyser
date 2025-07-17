        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value,
                correo: document.getElementById('correo').value,
                telefono: document.getElementById('telefono').value,
                motivo: document.getElementById('motivo').value,
                privacidad: document.getElementById('privacidad').checked
            };

            // Aquí puedes agregar la lógica para enviar los datos
            console.log('Datos del formulario:', formData);
            
            // Simulación de envío exitoso
            alert('¡Formulario enviado exitosamente! Te contactaremos pronto.');
            
            // Opcional: limpiar el formulario
            this.reset();
        });

        // Efectos visuales adicionales
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });