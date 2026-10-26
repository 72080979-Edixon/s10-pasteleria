const productos = [
    {
        id: 1,
        nombre: "Torta Chocolate",
        precio: 80,
        categoria: "Tortas",
        imagen:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
        id: 2,
        nombre: "Torta Fresa",
        precio: 75,
        categoria: "Tortas",
        imagen:
        "https://images.unsplash.com/photo-1464306076886-da185f6a9d05"
    },
    {
        id: 3,
        nombre: "Cupcake Vainilla",
        precio: 10,
        categoria: "Cupcakes",
        imagen:
        "https://images.unsplash.com/photo-1486427944299-d1955d23e34d"
    },
    {
        id: 4,
        nombre: "Cupcake Chocolate",
        precio: 12,
        categoria: "Cupcakes",
        imagen:
        "https://images.unsplash.com/photo-1519869325930-281384150729"
    },
    {
        id: 5,
        nombre: "Cheesecake",
        precio: 25,
        categoria: "Postres",
        imagen:
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad"
    },
    {
        id: 6,
        nombre: "Tiramisú",
        precio: 20,
        categoria: "Postres",
        imagen:
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c"
    }
];

const contenedor = document.getElementById("productos");

let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}

function mostrarProductos(lista) {

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        contenedor.innerHTML += `

        <div class="col-md-4">

            <div class="card shadow h-100">

                ${producto.imagen}

                <div class="card-body">

                    <span class="badge bg-primary">
                        ${producto.categoria}
                    </span>

                    <h5 class="mt-2">
                        ${producto.nombre}
                    </h5>

                    <p>
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

    const producto =
        productos.find(p => p.id === id);

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
        <li class="list-group-item">
        ${item.nombre}
        - S/ ${item.precio}
        </li>
        `;
    });

    document.getElementById("total")
        .textContent = total;

    document.getElementById("contador")
        .textContent = carrito.length;
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

    const texto =
        e.target.value.toLowerCase();

    const resultado =
        productos.filter(p =>
            p.nombre.toLowerCase()
            .includes(texto));

    mostrarProductos(resultado);
});

document
.querySelectorAll(".filtro")
.forEach(btn => {

    btn.addEventListener("click", () => {

        const categoria =
            btn.dataset.categoria;

        if (categoria === "Todos") {
            mostrarProductos(productos);
            return;
        }

        const filtrados =
            productos.filter(
                p => p.categoria === categoria
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