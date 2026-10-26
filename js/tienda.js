const productos = [
    {
        id: 1,
        nombre: "Torta Chocolate",
        precio: 80,
        categoria: "Tortas",
        imagen: "img/tortachocolate.jpg"
    },
    {
        id: 2,
        nombre: "Torta Fresa",
        precio: 75,
        categoria: "Tortas",
        imagen: "img/tortafresa.jpg"
    },
    {
        id: 3,
        nombre: "Cupcake Vainilla",
        precio: 10,
        categoria: "Cupcakes",
        imagen: "img/cupcakevainilla.jpg"
    },
    {
        id: 4,
        nombre: "Cupcake Chocolate",
        precio: 12,
        categoria: "Cupcakes",
        imagen: "img/cupcakechocolate.jpg"
    },
    {
        id: 5,
        nombre: "Cheesecake",
        precio: 25,
        categoria: "Postres",
        imagen: "img/cheesecake.jpg"
    },
    {
        id: 6,
        nombre: "Tiramisú",
        precio: 20,
        categoria: "Postres",
        imagen: "img/tiramisu.jpg"
    }
];

const contenedor = document.getElementById("productos");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarProductos(lista) {

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        contenedor.innerHTML += `
        <div class="col-md-4">

            <div class="card shadow h-100">

                <img
                    src="${producto.imagen}"
                    class="card-img-top"
                    alt="${producto.nombre}">

                <div class="card-body">

                    <span class="badge bg-primary">
                        ${producto.categoria}
                    </span>

                    <h5 class="mt-2">
                        ${producto.nombre}
                    </h5>

                    <p class="fw-bold">
                        S/ ${producto.precio}
                    </p>

                    <button
                        class="btn btn-primary w-100"
                        onclick="agregarCarrito(${producto.id})">
                        Agregar
                    </button>

                </div>

            </div>

        </div>
        `;
    });
}

function agregarCarrito(id) {

    const producto = productos.find(
        p => p.id === id
    );

    carrito.push(producto);

    guardarCarrito();
    renderCarrito();
}

function renderCarrito() {

    const lista =
        document.getElementById("listaCarrito");

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach(item => {

        total += item.precio;

        lista.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
            <span>${item.nombre}</span>
            <span>S/ ${item.precio}</span>
        </li>
        `;
    });

    document.getElementById("total").textContent = total;
    document.getElementById("contador").textContent = carrito.length;
}

document
.getElementById("vaciar")
.addEventListener("click", () => {

    carrito = [];

    guardarCarrito();
    renderCarrito();
});

document
.getElementById("buscar")
.addEventListener("keyup", e => {

    const texto = e.target.value.toLowerCase();

    const resultado = productos.filter(
        producto =>
            producto.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(resultado);
});

document
.querySelectorAll(".filtro")
.forEach(btn => {

    btn.addEventListener("click", () => {

        const categoria = btn.dataset.categoria;

        if (categoria === "Todos") {
            mostrarProductos(productos);
            return;
        }

        const filtrados = productos.filter(
            producto => producto.categoria === categoria
        );

        mostrarProductos(filtrados);
    });
});

document
.getElementById("formPedido")
.addEventListener("submit", e => {

    e.preventDefault();

    document
        .getElementById("mensaje")
        .classList.remove("d-none");

    e.target.reset();
});

mostrarProductos(productos);
renderCarrito();
