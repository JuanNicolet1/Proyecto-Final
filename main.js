let lista_libros = [
    {id: 1, nombre: "Don Quijote de la Mancha Comic", precio: 25000, tipo: "Clasico", imagen: "assets/quijote.png"},
    {id: 2, nombre: "It", precio: 60000, tipo: "Terror", imagen: "assets/it.png"},
    {id: 3, nombre: "El Aleph", precio: 41100, tipo: "Reflexivo", imagen: "assets/aleph.png"},
    {id: 4, nombre: "Lazarillo de Tormes", precio: 25000, tipo: "Clasico", imagen: "assets/lazarillo.png"},
    {id: 5, nombre: "La Divina Comedia", precio: 25000, tipo: "Clasico", imagen: "assets/comedia.png"},
    {id: 6, nombre: "Harry Potter y la Orden del Fenix", precio: 25000, tipo: "Ficcion", imagen: "assets/harry.png"},
    {id: 7, nombre: "El Señor de los Anillos", precio: 85000, tipo: "Ficcion", imagen: "assets/anillos.png"},
    {id: 8, nombre: "Hamlet", precio: 20000, tipo: "Clasico", imagen: "assets/hamlet.png"},
    {id: 9, nombre: "El Gato Negro", precio: 47500, tipo: "Terror", imagen: "assets/gato_negro.png"},
    {id: 10, nombre: "El Principito", precio: 10000, tipo: "Reflexivo", imagen: "assets/principito.png"},
    {id: 11, nombre: "Frankenstein", precio: 15000, tipo: "Terror", imagen: "assets/frankenstein.png"},
    {id: 12, nombre: "La Metamorfosis", precio: 30000, tipo: "Reflexivo", imagen: "assets/metamorfosis.png"},
];

let lista_productos = document.getElementById("libro1");
let barraBusqueda = document.getElementById("barra-busqueda");
carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos(array) {
    let htmlProductos = "";
    array.forEach(libro => {
        htmlProductos += `
        <li class= "listado_libros" type= "none">
        <img src= ${libro.imagen} alt= "" class="imagen-libro">
                <div class="text">
                    <p> ${libro.nombre} </p>
                    <p> <strong>${libro.precio}</strong></p>
                    <button class="boton-agregar" onclick="agregarCarrito(${libro.id})">Agregar al carrito</button>
                </div>
        </li>
        `;
    });
    lista_productos.innerHTML = htmlProductos;
}

barraBusqueda.addEventListener("keyup", function(){
    let valorInput = barraBusqueda.value.toLowerCase();
    console.log(valorInput);
    let librosFiltradas = lista_libros.filter(producto => producto.nombre.toLowerCase().includes(valorInput));
    mostrarProductos(librosFiltradas);
});

function agregarCarrito(id){
    let nuevoProducto = lista_libros.find(producto => producto.id === id);
    let chequeo = carrito.find(producto2 => producto2.id === id);
    if(chequeo) {
        chequeo.cantidad += 1;
    } else {
        nuevoProducto.cantidad = 1;
        carrito.push(nuevoProducto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.querySelector(".clasico").addEventListener("click", function(a) {
        a.preventDefault();
        let tipoSeleccionado = "Clasico";
        let librosFiltrados = lista_libros.filter(libro => libro.tipo === tipoSeleccionado);
        mostrarProductos(librosFiltrados);
})

document.querySelector(".terror").addEventListener("click", function(a) {
        a.preventDefault();
        let tipoSeleccionado = "Terror";
        let librosFiltrados = lista_libros.filter(libro => libro.tipo === tipoSeleccionado);
        mostrarProductos(librosFiltrados);
})

document.querySelector(".ficcion").addEventListener("click", function(a) {
        a.preventDefault();
        let tipoSeleccionado = "Ficcion";
        let librosFiltrados = lista_libros.filter(libro => libro.tipo === tipoSeleccionado);
        mostrarProductos(librosFiltrados);
})

document.querySelector(".reflexion").addEventListener("click", function(a) {
        a.preventDefault();
        let tipoSeleccionado = "Reflexivo";
        let librosFiltrados = lista_libros.filter(libro => libro.tipo === tipoSeleccionado);
        mostrarProductos(librosFiltrados);
})

mostrarProductos(lista_libros);