let carrito_libros = document.getElementById("listado-carrito");
let seccion_total = document.getElementById("listado-total");
let total = 0;
let total_cantidad = 0;

function mostrarCarrito(){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    let htmlProductos = "";
    if(listaProductos.length >= 1){
        listaProductos.forEach(libro => {
            htmlProductos += `
              <li class="listado_mostrar" type="none">
                  <img src= ${libro.imagen} alt= "" class="imagen-libro">
                  <div class="info-producto">
                    <p>Nombre: ${libro.nombre}</p>
                    <div class="cantidad-container">
                        <p>Cantidad: ${libro.cantidad}</p>
                        <button class="boton-carrito" onclick="sumarCantidad(${libro.id})">+</button>
                        <button class="boton-carrito" onclick="restarCantidad(${libro.id})">-</button>
                    <div class="precio-container">
                        <p class="precio">Precio: ${libro.precio}</p>
                        <button class="boton-eliminar" onclick="eliminarCarrito(${libro.id})">Eliminar del carrito</button>
                    </div>
                    </div>
                </div>
              </li>
            `;
        });
    } else {
        htmlProductos = `<p>No hay productos en el carrito</p>`;
    }
    carrito_libros.innerHTML = htmlProductos;
}

function sumarTotal(){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    listaProductos.forEach(libro => {
        total += libro.precio * libro.cantidad
    });
    mostrarCarrito();
}

function eliminarCarrito(id){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    listaProductos = listaProductos.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    mostrarTotal();
    mostrarCarrito();
}

function sumarCantidad(id){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    let nue = listaProductos.find(producto => producto.id == id);
    nue.cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    mostrarTotal();
    mostrarCarrito();
}

function restarCantidad(id){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    let libro_cantidad = listaProductos.find(producto => producto.id == id);
    libro_cantidad.cantidad -= 1;
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    if(libro_cantidad.cantidad <= 0){
        eliminarCarrito(id);
    }

    
    mostrarTotal();
    mostrarCarrito();
}

function mostrarTotal(){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    total = 0;
    sumarTotal();
    sumarTotalCantidad();
    let htmlBoton = ` <div class="total-container">
    <p>Resumen</p>
    <button class="boton-comprar"> Continuar con la compra</button>
    <p>${total_cantidad} productos</p>
    <hr>
    <p>Total: ${total}</p>
    <button class="boton-eliminar-todo" onclick="vaciarCarrito()">Eliminar todo</button>
    </div>`;
    seccion_total.innerHTML = htmlBoton;
}

function sumarTotalCantidad(){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    total_cantidad = 0;
    listaProductos.forEach(libro => {
        total_cantidad += libro.cantidad
    });
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
}

function vaciarCarrito(){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    listaProductos = [];
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    mostrarCarrito();
    mostrarTotal();
}

mostrarCarrito();
mostrarTotal();