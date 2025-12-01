const contenedorPrincipal = document.getElementById("contenido")
let contenedorInicio = document.getElementById("inicio");

let bebidasConAlcohol = [];
let bebidasSinAlcohol = [];
let tragos = [];

let carrito = [];

const contenido = document.querySelector("#contenido");
const filtro = document.querySelector(".filtro");

async function cargaDeDatos() {
    const res = await fetch("bebidas.json");
    const data = await res.json();

    bebidasConAlcohol = data.bebidasConAlcohol.map(p => ({ ...p, cantidadOriginal: p.cantidad }));
    bebidasSinAlcohol = data.bebidasSinAlcohol.map(p => ({ ...p, cantidadOriginal: p.cantidad }));
    tragos = data.tragos.map(p => ({ ...p, cantidadOriginal: p.cantidad }));

    console.log("Datos cargados:", bebidasConAlcohol, bebidasSinAlcohol, tragos);

    const stockGuardado = JSON.parse(localStorage.getItem("stockActual"));
    if (stockGuardado) {
        bebidasConAlcohol = stockGuardado.bebidasConAlcohol;
        bebidasSinAlcohol = stockGuardado.bebidasSinAlcohol;
        tragos = stockGuardado.tragos;
    }
}

async function init() {
    await cargaDeDatos();




    document.getElementById("botonCliente").addEventListener("click", () => {
        filtro.classList.replace("justify-content-center", "justify-content-start")
        contenido.className = "w-100 h-100";
        menuCliente()
    });
    document.getElementById("botonAdmin").addEventListener("click", () => {

        filtro.classList.replace("justify-content-center", "justify-content-start")
        contenedorInicio.className = "ocultar";
        contenedorPrincipal.innerHTML = `
            <h2 class="tituloBtnVolver ps-4">Ingrese la contraseña</h2>
            <input type="password" id="contrasenaAdmin" placeholder="Contraseña">
            <button id="botonContraAdmin" type="button">Ingresar</button>
        `

        comprobarContrasena();
    })

}

init();

//Toast
const toastContenedor = document.createElement("div");
toastContenedor.className = "toast-container position-fixed bottom-0 end-0 p-3";
toastContenedor.innerHTML = `
        <div id="toastCarrito" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Felicitaciones!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" id="toastMensaje">
                ...
            </div>
        </div>
    `;
document.body.appendChild(toastContenedor);

//Modal
const modalContenedor = document.createElement("div");
modalContenedor.className = "modal fade";
modalContenedor.id = "modal";
modalContenedor.tabIndex = "-1";
modalContenedor.setAttribute("aria-hidden", "true");
modalContenedor.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Error !</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modalMensaje">
                        ...
                    </div>
                </div>
            </div>
        </div>
`
document.body.appendChild(modalContenedor);


function mostrarModal(titulo, mensaje) {
    document.getElementById("exampleModalLabel").innerText = titulo;
    document.getElementById("modalMensaje").innerText = mensaje;

    const modal = new bootstrap.Modal(document.getElementById("modal"));
    modal.show();
}

function btnVolver(titulo, menu) {
    contenedorPrincipal.innerHTML = `
        <div class="tituloOpcion d-flex flex-row align-items-center ps-3">
            <button id="botonVolver">ᐸ</button>
            <h2 class="tituloBtnVolver">${titulo}</h2>
        </div>
    `;

    document.getElementById("botonVolver").addEventListener("click", menu);
}

function volverAlInicio() {
    contenedorPrincipal.innerHTML = "";
    contenedorInicio.classList.remove("ocultar");

    filtro.classList.replace("justify-content-start", "justify-content-center")
}


//Cliente
document.getElementById("botonCliente").addEventListener("click", () => menuCliente());

function menuCliente() {
    contenedorInicio.className = "ocultar";
    btnVolver("Seleccione una Opción", volverAlInicio);

    const opciones = document.createElement("div");
    opciones.className = "divBotones";
    opciones.innerHTML = `
        <button id="botonComprarBebidas" class="botonesSecundarios">Comprar bebidas</button>
        <button id="botonComprarTrago" class="botonesSecundarios">Pedir un trago</button>
        <button id="botonCuenta" class="botonesSecundarios">Solicitar la cuenta</button>
        <button id="botonPagar" class="botonesSecundarios">Pagar</button>
    `;

    contenedorPrincipal.appendChild(opciones);

    document.getElementById("botonComprarBebidas").addEventListener("click", () => {
        contenedorPrincipal.innerHTML = "";
        btnVolver("¿Qué tipo de bebida desea comprar?", menuCliente);

        const opciones = document.createElement("div");
        opciones.id = "opcionesMenu";
        opciones.className = "divBotones pt-5";

        opciones.innerHTML = `
            <button id="botonBebidaConA" class="botonesSecundarios">Bebidas con Alcohol</button>
            <button id="botonBebidaSinA" class="botonesSecundarios">Bebidas sin Alcohol</button>
        `;

        contenedorPrincipal.appendChild(opciones);

        document.getElementById("botonBebidaConA").addEventListener("click", () => mostrarProductos("Bebidas con Alcohol", bebidasConAlcohol));

        document.getElementById("botonBebidaSinA").addEventListener("click", () => mostrarProductos("Bebidas sin Alcohol", bebidasSinAlcohol));
    })

    document.getElementById("botonComprarTrago").addEventListener("click", () => mostrarProductos("Tragos", tragos));
    document.getElementById("botonCuenta").addEventListener("click", () => mostrarCuenta("Carrito de Compras"));
    document.getElementById("botonPagar").addEventListener("click", () => pagarCuenta());
}

function mostrarProductos(titulo, lista) {
    btnVolver("Comprar Bebidas", menuCliente);

    lista.forEach((producto) => {
        const divLista = document.createElement("div");
        divLista.className = "divLista d-flex flex-row justify-content-evenly align-items-center mb-3";
        divLista.innerHTML = `
            <span>${producto.nombre}</span>
            <div class="precioComprar d-flex flex-column align-items-center">
                <p class="mb-1">$${producto.precio}</p>
                <button class="btnComprar">Comprar</button>
            </div>
        `
        const btnComprar = divLista.querySelector(".btnComprar");
        btnComprar.addEventListener("click", () => {
            agregarAlCarrito(producto);

            document.getElementById("toastMensaje").innerHTML =
                `Se agregó <strong>${producto.nombre}</strong> al carrito.`;
            const toastCarrito = document.getElementById("toastCarrito");
            const toast = new bootstrap.Toast(toastCarrito);
            toast.show();
        });

        contenedorPrincipal.appendChild(divLista);
    })
}

function agregarAlCarrito(producto) {
    const item = carrito.find(p => p.id === producto.id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function mostrarCuenta(titulo) {
    btnVolver("Carrito de Compras", menuCliente);

    if (carrito.length === 0) {
        const vacio = document.createElement("h3");
        vacio.textContent = "El carrito está vacío";
        contenedorPrincipal.appendChild(vacio);
        return;
    }

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.className = "productoCarrito mb-2";

        div.innerHTML = `
            <strong>${item.nombre}</strong>
            <p>${item.cantidad} x $${item.precio} = $${item.cantidad * item.precio}</p>
        `;

        contenedorPrincipal.appendChild(div);
    });

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const divTotal = document.createElement("div");
    divTotal.innerHTML = `<h3>Total: $${total}</h3>`;
    contenedorPrincipal.appendChild(divTotal);

    const botonPagar = document.createElement("button");
    botonPagar.innerText = "Pagar";
    botonPagar.className = "btn btn-success mt-3";
    botonPagar.addEventListener("click", () => pagarCuenta());
    contenedorPrincipal.appendChild(botonPagar);
}


function pagarCuenta() {

    carrito.forEach(item => {
        let prod = bebidasConAlcohol.find(p => p.id === item.id);
        if (prod) prod.cantidad -= item.cantidad;

        prod = bebidasSinAlcohol.find(p => p.id === item.id);
        if (prod) prod.cantidad -= item.cantidad;

        prod = tragos.find(p => p.id === item.id);
        if (prod) prod.cantidad -= item.cantidad;
    });

    localStorage.setItem("stockActual", JSON.stringify({
        bebidasConAlcohol,
        bebidasSinAlcohol,
        tragos
    }));

    carrito = [];
    localStorage.removeItem("carrito");

    mostrarModal("Pagado", "Cuenta pagada correctamente!");
}


//Admin
function menuAdmin() {
    btnVolver("Bienvenido Administrador !", volverAlInicio);

    const opciones = document.createElement("div");
    opciones.className = "divBotones";
    opciones.innerHTML = `
        <button id="botonVerStock" class="botonesSecundarios">Ver Stock</button>
        <button id="botonAgregarStock" class="botonesSecundarios">Agregar Stock</button>
        <button id="botonAgregarTrago" class="botonesSecundarios">Agregar Trago</button>
        <button id="botonEliminarProducto" class="botonesSecundarios">Eliminar Producto</button>
        <button id="botonEditarTrago" class="botonesSecundarios">Modificar Trago</button>
    `;

    contenedorPrincipal.appendChild(opciones);


}

function comprobarContrasena() {

    contenido.className = "w-100 h-100";
    document.getElementById("botonContraAdmin").addEventListener("click", () => {
        const contrasena = document.getElementById("contrasenaAdmin").value.trim();
        console.log(contrasena)

        if (contrasena === "9494") {
            menuAdmin()
        } else {
            mostrarModal("Error", "Contraseña incorrecta, intentelo nuevamente !");
        }
    })
}

document.addEventListener("click", (e) => {

    const id = e.target.id;

    if (!id) return;

    switch (id) {
        case "botonVerStock":
            mostrarStock("Stock de Productos", [...bebidasConAlcohol, ...bebidasSinAlcohol]);
            break;
        case "botonAgregarStock":
            agregarStock("Agregar Stock Productos", [...bebidasConAlcohol, ...bebidasSinAlcohol]);
            break;

        case "botonAgregarTrago":
            agregarTrago("Nuevo Trago");
            break;
        case "botonEditarTrago":
            modificarTrago("Actualizar Trago");
            break;
        case "botonEliminarProducto":
            eliminarProducto("Eliminar Producto", [...bebidasConAlcohol, ...bebidasSinAlcohol]);
            break;
    }
});

function mostrarStock(titulo, lista) {
    btnVolver(titulo, menuAdmin);

    lista.forEach((producto) => {
        const divLista = document.createElement("div");
        divLista.className = "divLista d-flex flex-row justify-content-evenly align-items-center mb-3";
        divLista.innerHTML = `
            <span>${producto.nombre}</span>
            <div class="stockProducto d-flex flex-column align-items-center">
                <p class="mb-1">${producto.cantidad} unidades</p>
            </div>
        `

        contenedorPrincipal.appendChild(divLista);
    })
}

document.addEventListener("click", e => {

    const id = e.target.dataset.id;
    if (!id) return;

    const producto = [...bebidasConAlcohol, ...bebidasSinAlcohol, ...tragos]
        .find(p => p.id == id);

    if (!producto) return;

    const input = document.querySelector(`input[data-id="${id}"]`);

    if (e.target.classList.contains("btn-sumar")) {
        producto.cantidad++;
        input.value = producto.cantidad;
    }

    if (e.target.classList.contains("btn-restar")) {
        if (producto.cantidad > producto.cantidadOriginal) {
            producto.cantidad--;
            input.value = producto.cantidad;
        }
    }
});


function agregarStock(titulo, listaPlana) {
    btnVolver(titulo, menuAdmin);

    const contenedor = document.createElement("div");
    contenedor.id = "listaStock";
    contenedor.className = "lista-stock mt-3";

    contenedorPrincipal.appendChild(contenedor);

    listaPlana.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item-stock");
        div.dataset.id = item.id;

        div.innerHTML = `
            <span><b>${item.nombre}</b></span>
            <div class="stock-control">
                <button class="btn-restar" data-id="${item.id}">–</button>
                <input type="number" class="input-cantidad" value="${item.cantidad}" readonly data-id="${item.id}" />
                <button class="btn-sumar" data-id="${item.id}">+</button>
            </div>
        `;

        contenedor.appendChild(div);
    });

    const botonGuardar = document.createElement("button");
    botonGuardar.id = "botonGuardarStock";
    botonGuardar.className = "btn btn-primary mt-3";
    botonGuardar.innerText = "Guardar Cambios";

    contenedor.appendChild(botonGuardar);

    document.addEventListener("click", (e) => {
        if (e.target.id === "botonGuardarStock") {
            const dataAGuardar = {
                bebidasConAlcohol,
                bebidasSinAlcohol,
                tragos
            };

            localStorage.setItem("stockActual", JSON.stringify(dataAGuardar));

            mostrarModal("Éxito", "Stock actualizado correctamente ✔️");
        }
    });

}

function agregarTrago(titulo) {
    btnVolver(titulo, menuAdmin);

    const formularioTrago = document.createElement("form");
    formularioTrago.innerHTML = `
        <div class="mb-3">
            <label for="nombreTrago" class="form-label">Nombre del Trago</label>
            <input type="text" class="form-control" id="nombreTrago" required>
        </div>
        <div class="mb-3">
            <label for="precioTrago" class="form-label">Precio del Trago</label>
            <input type="number" class="form-control" id="precioTrago" required>
        </div>
        <button type="submit" class="btn btn-primary">Agregar Trago</button>
    `;

    contenedorPrincipal.appendChild(formularioTrago)

    formularioTrago.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombreTrago").value.trim();
        const precio = Number(document.getElementById("precioTrago").value.trim());

        if (!nombre || !precio) {
            mostrarModal("Error", "Debes completar todos los campos.");
            return;
        }

        let ultimoId = 0;

        if (tragos.length > 0) {
            ultimoId = Math.max(
                ...tragos.map(t => Number(t.id.replace("t", "")))
            );
        }

        const nuevoTrago = {
            id: (ultimoId + 1) + "t",
            nombre,
            precio,
            cantidad: 0
        };

        tragos.push(nuevoTrago);

        const datosAGuardar = {
            bebidasConAlcohol,
            bebidasSinAlcohol,
            tragos
        };

        localStorage.setItem("stockActual", JSON.stringify(datosAGuardar));

        mostrarModal("Éxito", "El trago se agregó correctamente ✔️");

    });

}

function modificarTrago(titulo) {

    contenedorPrincipal.innerHTML = `
        <div class="tituloOpcion d-flex flex-row ps-3">
            <button id="botonVolver"><- Volver</button>
            <h2>${titulo}</h2>
        </div>

        <div id="listaTragosEditar" class="mt-3"></div>
        <div id="contenedorModalEditar"></div>
    `;

    document.getElementById("botonVolver").addEventListener("click", () => menuAdmin());

    const lista = document.getElementById("listaTragosEditar");

    tragos.forEach(trago => {
        const fila = document.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center border p-2 mb-2";

        fila.innerHTML = `
            <span><b>${trago.nombre}</b> - $${trago.precio}</span>
            <button class="btn btn-warning btn-sm btn-editar" data-id="${trago.id}">
                Editar
            </button>
        `;

        lista.appendChild(fila);
    });

    const modalHTML = `
        <div class="modal fade" id="modalEditarTrago" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Editar Trago</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <input type="hidden" id="editTragoId">

                        <label>Nombre</label>
                        <input type="text" id="editTragoNombre" class="form-control mb-2">

                        <label>Precio</label>
                        <input type="number" id="editTragoPrecio" class="form-control mb-2">
                    </div>

                    <div class="modal-footer">
                        <button id="guardarCambiosTrago" class="btn btn-success">Guardar Cambios</button>
                    </div>

                </div>
            </div>
        </div>
    `;

    document.getElementById("contenedorModalEditar").innerHTML = modalHTML;

    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const trago = tragos.find(t => t.id == id);

            document.getElementById("editTragoId").value = trago.id;
            document.getElementById("editTragoNombre").value = trago.nombre;
            document.getElementById("editTragoPrecio").value = trago.precio;

            const modal = new bootstrap.Modal(document.getElementById("modalEditarTrago"));
            modal.show();
        });
    });
}

document.addEventListener("click", (e) => {
    if (e.target.id === "guardarCambiosTrago") {

        const id = document.getElementById("editTragoId").value;
        const nuevoNombre = document.getElementById("editTragoNombre").value.trim();
        const nuevoPrecio = parseFloat(document.getElementById("editTragoPrecio").value);

        const trago = tragos.find(t => t.id == id);

        if (!trago) return;

        trago.nombre = nuevoNombre;
        trago.precio = nuevoPrecio;

        localStorage.setItem("stockActual", JSON.stringify({
            bebidasConAlcohol,
            bebidasSinAlcohol,
            tragos
        }));

        mostrarModal("Éxito", "Trago actualizado correctamente ✓");

        const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditarTrago"));
        modal.hide();

        document.getElementById("editTragoNombre").value = "";
        document.getElementById("editTragoPrecio").value = "";

        modificarTrago("Modificar Tragos");
    }
});


function eliminarProducto(titulo, listas) {
    btnVolver(titulo, menuAdmin);

    const contenedor = document.createElement("div");
    contenedor.id = "listaEliminar";
    contenedor.className = "lista-eliminar mt-3";

    contenedorPrincipal.appendChild(contenedor);


    listas.forEach(prod => {
        const div = document.createElement("div");
        div.className = "item-eliminar d-flex justify-content-between align-items-center mb-2";
        div.dataset.id = prod.id;

        div.innerHTML = `
            <span><b>${prod.nombre}</b> — ${prod.cantidad} unidades</span>
            <button class="btn btn-danger btnEliminar" data-id="${prod.id}">Eliminar</button>
        `;

        contenedor.appendChild(div);
    });

    contenedor.addEventListener("click", (e) => {
        if (!e.target.classList.contains("btnEliminar")) return;

        const id = e.target.dataset.id;

        bebidasConAlcohol = bebidasConAlcohol.filter(p => p.id != id);
        bebidasSinAlcohol = bebidasSinAlcohol.filter(p => p.id != id);
        tragos = tragos.filter(p => p.id != id);

        localStorage.setItem("stockActual", JSON.stringify({
            bebidasConAlcohol,
            bebidasSinAlcohol,
            tragos
        }));

        e.target.parentElement.remove();

        mostrarModal("Producto Eliminado", "El producto se eliminó correctamente ✔️");
    });
}