// public/widget/contador-widget.js
(function(window) {
    window.ContadorVisitas = {
      // Configuración por defecto
      config: {
        apiUrl: 'http://localhost:3000/api/contador',
        autoIncremento: true,
        tema: 'claro'
      },
      
      // Método de inicialización del widget
      iniciar: function(contenedorId, opciones) {
        // Combinar opciones con configuración por defecto
        this.config = {...this.config, ...opciones};
        
        // Obtener el elemento contenedor
        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) {
          console.error('Contenedor no encontrado:', contenedorId);
          return;
        }
        
        // Crear estructura básica del widget
        contenedor.innerHTML = `
          <div class="contador-widget tema-${this.config.tema}">
            <div class="contador-contenido">
              <span class="contador-texto">Visitas:</span>
              <span class="contador-valor" id="contador-valor-${contenedorId}">...</span>
            </div>
          </div>
        `;
        
        // Añadir estilos si no están ya en la página
        if (!document.getElementById('contador-widget-styles')) {
          const estilos = document.createElement('style');
          estilos.id = 'contador-widget-styles';
          estilos.textContent = `
            .contador-widget {
              font-family: Arial, sans-serif;
              border-radius: 8px;
              padding: 10px 15px;
              display: inline-block;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .contador-widget.tema-claro {
              background-color: #f5f5f5;
              color: #333;
              border: 1px solid #ddd;
            }
            .contador-widget.tema-oscuro {
              background-color: #333;
              color: #fff;
              border: 1px solid #555;
            }
            .contador-contenido {
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .contador-texto {
              font-weight: bold;
            }
            .contador-valor {
              font-size: 1.2em;
            }
          `;
          document.head.appendChild(estilos);
        }
        
        // Cargar el valor del contador
        this._cargarContador(contenedorId);
        
        // Si autoIncremento está habilitado, incrementar el contador
        if (this.config.autoIncremento) {
          this._incrementarContador(contenedorId);
        }
      },
      
      // Método privado para cargar el valor actual del contador
      _cargarContador: function(contenedorId) {
        const valorEl = document.getElementById(`contador-valor-${contenedorId}`);
        
        fetch(this.config.apiUrl)
          .then(response => response.json())
          .then(data => {
            valorEl.textContent = data.contador;
          })
          .catch(error => {
            console.error('Error al cargar el contador:', error);
            valorEl.textContent = 'Error';
          });
      },
      
      // Método privado para incrementar el contador
      _incrementarContador: function(contenedorId) {
        const valorEl = document.getElementById(`contador-valor-${contenedorId}`);
        
        fetch(this.config.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            valorEl.textContent = data.contador;
          })
          .catch(error => {
            console.error('Error al incrementar el contador:', error);
          });
      }
    };
  })(window);