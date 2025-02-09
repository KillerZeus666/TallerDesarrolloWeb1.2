class Producto {
    constructor(nombre, dimensiones, resistencia, exclusividad, imagen, precio) {
        this.nombre = nombre;
        this.dimensiones = dimensiones;
        this.resistencia = resistencia;
        this.exclusividad = exclusividad;
        this.imagen = imagen;
        this.precio = precio;
        this.cantidad = 1;
    }
}

document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const dimensiones = document.getElementById('atributo1').value.trim();
    const resistencia = document.getElementById('atributo2').value.trim();
    const exclusividad = document.getElementById('atributo3').value.trim();
    const imagen = document.getElementById('imagen').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    
    if (!nombre || !dimensiones || !resistencia || !exclusividad || !imagen || isNaN(precio) || precio <= 0) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    const nuevoProducto = new Producto(nombre, dimensiones, resistencia, exclusividad, imagen, precio);
    console.log("Nuevo producto creado:", nuevoProducto);
    
    agregarProductoTienda(nuevoProducto);
    guardarProductoEnStorage(nuevoProducto);
    
    document.getElementById('add-item-form').reset();
});

function agregarProductoTienda(producto) {
    const tienda = document.querySelector('.productos');

    const productoHTML = document.createElement('div');
    productoHTML.classList.add('producto');
    productoHTML.innerHTML = `
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
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="agregar-carrito">Agregar al Carrito</button>
        </div>
    `;
    
    productoHTML.querySelector('.agregar-carrito').addEventListener('click', () => {
        console.log("Botón 'Agregar al Carrito' presionado para:", producto.nombre);
        agregarAlCarrito(producto);
    });
    
    tienda.appendChild(productoHTML);
}

function guardarProductoEnStorage(producto) {
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    productosGuardados.push(producto);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));
    console.log("Producto guardado en localStorage:", producto);
}

function cargarProductosDesdeStorage() {
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    console.log("Cargando productos desde localStorage:", productosGuardados);
    productosGuardados.forEach(producto => agregarProductoTienda(producto));
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDesdeStorage();
    actualizarCarritoDesdeStorage();
});

// --- Funciones del carrito ---
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const cartContent = document.getElementById("cart-content tbody");
const cartContainer = document.getElementById("carrito");

function agregarAlCarrito(producto) {
    let item = carrito.find(p => p.nombre === producto.nombre);
    
    if (item) {
        item.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    
    console.log("Carrito actualizado:", carrito);
    actualizarCarrito();
}

function actualizarCarrito() {
    const cartContent = document.querySelector("#cart-content tbody");
    const cartCount = document.getElementById("cart-count");
    cartContent.innerHTML = ""; // Limpiar contenido antes de actualizar
    
    if (carrito.length === 0) {
        cartCount.textContent = "0";
        return; // Si el carrito está vacío, no hacemos nada más
    }

    carrito.forEach((producto, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td><button onclick="eliminarDelCarrito(${index})">🗑</button></td>
        `;
        cartContent.appendChild(row);
    });

    cartCount.textContent = carrito.reduce((total, p) => total + p.cantidad, 0); // Mostrar cantidad total
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar carrito actualizado
    console.log("Carrito actualizado:", carrito);
}


function eliminarDelCarrito(index) {
    console.log("Producto eliminado del carrito:", carrito[index]);
    carrito.splice(index, 1);
    actualizarCarrito();
}

cartButton.addEventListener("click", mostrarCarrito);

function mostrarCarrito() {
    cartContainer.innerHTML = "";
    carrito.forEach(producto => {
        const item = document.createElement("div");
        item.innerHTML = `
            <img src="${producto.imagen}" width="100">
            <p><strong>${producto.nombre}</strong></p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <hr>
        `;
        cartContainer.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", actualizarCarrito);
