class Producto {
    constructor(nombre, dimensiones, resistencia, exclusividad, imagen, precio) {
        this.nombre = nombre;
        this.dimensiones = dimensiones;
        this.resistencia = resistencia;
        this.exclusividad = exclusividad;
        this.imagen = imagen;
        this.precio = precio;
    }
    }
    document.getElementById('add-item-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se recargue la página

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const dimensiones = document.getElementById('atributo1').value;
        const resistencia = document.getElementById('atributo2').value;
        const exclusividad = document.getElementById('atributo3').value;
        const imagen = document.getElementById('imagen').value;
        const precio = parseFloat(document.getElementById('precio').value);

        // Crear un nuevo objeto Producto
        const nuevoProducto = new Producto(nombre, dimensiones, resistencia, exclusividad, imagen, precio);

        // Llamar a la función para agregar el producto a la tienda
        agregarProductoTienda(nuevoProducto);

        // Limpiar el formulario
        document.getElementById('add-item-form').reset();
    });

    function agregarProductoTienda(producto) {
        const tienda = document.querySelector('.productos'); // Selecciona el contenedor de productos
    
        const nuevoProductoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="info">
                    <h3>${producto.nombre}</h3>
                    <ul>
                        <li>Dimensiones: ${producto.dimensiones}</li>
                        <li>Resistencia: ${producto.resistencia}</li>
                        <li>Exclusividad: ${producto.exclusividad}</li>
                    </ul>
                </div>
                <div class="precio">
                    <p>$${producto.precio}</p>
                    <button class="agregar-carrito">Agregar al Carrito</button>
                </div>
            </div>
        `;
    
        // Agregar el nuevo producto al contenedor de productos
        tienda.innerHTML += nuevoProductoHTML;
    }
    
