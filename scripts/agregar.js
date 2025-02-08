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

    // Guardar el producto en el localStorage
    guardarProductoEnStorage(nuevoProducto);

    // Limpiar el formulario
    document.getElementById('add-item-form').reset();
});

// Función para agregar el producto a la tienda
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

// Función para guardar el producto en localStorage
function guardarProductoEnStorage(producto) {
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || []; // Obtener los productos guardados o un arreglo vacío si no hay

    productosGuardados.push(producto); // Agregar el nuevo producto al arreglo

    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem('productos', JSON.stringify(productosGuardados));
}

// Función para cargar los productos guardados al cargar la página
function cargarProductosDesdeStorage() {
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || []; // Obtener los productos guardados

    productosGuardados.forEach(producto => {
        agregarProductoTienda(producto); // Mostrar cada producto en la tienda
    });
}

// Cargar los productos desde localStorage cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarProductosDesdeStorage);
