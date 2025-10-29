const contenedorPrincipal = document.getElementById("contenido")
let contenedorInicio = document.getElementById("inicio");
let carrito = [];

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

//Cliente
document.getElementById("botonCliente").addEventListener("click", () => menuCliente());

function menuCliente() {
    contenedorInicio.className = "ocultar";
    contenedorPrincipal.innerHTML = `
        <h2> Seleccione una opción</h2>
        <button id="botonComprarBebidas">Comprar bebidas</button>
        <button id="botonComprarTrago">Pedir un trago</button>
        <button id="botonCuenta">Solicitar la cuenta</button>
        <button id="botonPagar">Pagar</button>
    `

    document.getElementById("botonComprarBebidas").addEventListener("click", () => {
        contenedorPrincipal.innerHTML = `
        <div class = "tituloOpcion d-flex flex-row ps-3">
            <button id="botonVolver"><- Volver</button>
            <h2>¿Qué tipo de bebida desea comprar?</h2>
        </div>
        <button id="botonBebidaConA">Bebidas con Alcohol</button>
        <button id="botonBebidaSinA">Bebidas sin Alcohol</button>`

        document.getElementById("botonVolver").addEventListener("click", () => menuCliente());


        document.getElementById("botonBebidaConA").addEventListener("click", () => mostrarProductos("Bebidas con Alcohol", bebidasConAlcohol));

        document.getElementById("botonBebidaSinA").addEventListener("click", () => mostrarProductos("Bebidas sin Alcohol", bebidasSinAlcohol));
    })

    document.getElementById("botonComprarTrago").addEventListener("click", () => mostrarProductos("Tragos", tragos));
    document.getElementById("botonCuenta").addEventListener("click", () => mostrarCuenta());
    document.getElementById("botonPagar").addEventListener("click", () => pagarCuenta());
}

function mostrarProductos(titulo, lista) {
    contenedorPrincipal.innerHTML = `
        <div class = "tituloOpcion d-flex flex-row ps-3">
            <button id="botonVolver"><- Volver</button>
            <h2>${titulo}</h2>
        </div>
    `
    document.getElementById("botonVolver").addEventListener("click", () => menuCliente());

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
            carrito.push(producto);

            document.getElementById("toastMensaje").innerHTML =
                `Se agregó <strong>${producto.nombre}</strong> al carrito.`;
            const toastCarrito = document.getElementById("toastCarrito");
            const toast = new bootstrap.Toast(toastCarrito);
            toast.show();
        });

        contenedorPrincipal.appendChild(divLista);
    })
}

function mostrarCuenta() {
    contenedorPrincipal.innerHTML = `
        <div class = "tituloOpcion d-flex flex-row ps-3">
            <button id="botonVolver"><- Volver</button>
            <h2>Cuenta</h2>
        </div>
    `
    document.getElementById("botonVolver").addEventListener("click", () => menuCliente());


    const divLista = document.createElement("div");
    divLista.className = "divLista d-flex flex-row justify-content-evenly align-items-center mb-3";

    if (carrito.length === 0) {
        divLista.innerHTML = `
            <h3>El carrito esta vacío</h3>
        `
        contenedorPrincipal.appendChild(divLista);
    } else {
        carrito.forEach((productoCarrito) => {
            const productoDiv = document.createElement("div");
            productoDiv.className = "productoCarrito mb-1";
            productoDiv.innerHTML = `
                <span>${productoCarrito.nombre}</span>
                <p class="mb-1">$${productoCarrito.precio}</p>
            `

            contenedorPrincipal.appendChild(productoDiv);
        })
    }

    contenedorPrincipal.appendChild(divLista);
    console.log(carrito)

    const botonPagarCarrito = document.createElement("button");
    botonPagarCarrito.id = "botonPagarCarrito";
    botonPagarCarrito.innerText = "Pagar";
    contenedorPrincipal.appendChild(botonPagarCarrito);

    document.getElementById("botonPagarCarrito").addEventListener("click", () => pagarCuenta());

}

function pagarCuenta() {
    carrito.splice(0, carrito.length);
    const modal = new bootstrap.Modal(document.getElementById("modal"));
    document.getElementById("exampleModalLabel").innerHTML = `Pagado`;
    document.getElementById("modalMensaje").innerHTML = `Cuenta pagada correctamente!`;
    modal.show();
}

//Admin
document.getElementById("botonAdmin").addEventListener("click", () => {

    contenedorInicio.className = "ocultar";
    contenedorPrincipal.innerHTML = `
        <h2>Ingrese la contraseña</h2>
        <input type="password" id="contrasenaAdmin" placeholder="Contraseña">
        <button id="botonContraAdmin" type="button" class="btn btn-primary">Ingresar</button>
    `

    comprobarContrasena();
})

function comprobarContrasena() {
    document.getElementById("botonContraAdmin").addEventListener("click", () => {
        const contrasena = document.getElementById("contrasenaAdmin").value.trim();
        console.log(contrasena)

        if (contrasena === "9494") {
            menuAdmin()
        } else {
            const modal = new bootstrap.Modal(document.getElementById("modal"));
            document.getElementById("exampleModalLabel").innerHTML = `Error!`;
            document.getElementById("modalMensaje").innerHTML = `Contraseña incorrecta, intentelo nuevamente !`;
            modal.show();
        }
    })
}

function menuAdmin() {
    contenedorPrincipal.innerHTML = `
        <h2>Bienvenido Administrador !</h2>
        <h3> Seleccione una opción</h3>
        <button id="botonVerStock">Ver Stock</button>
        <button id="botonAgregarStock">Agregar Stock</button>
        <button id="botonAgregarTrago">Agregar Trago</button>
        <button id="botonEliminarProducto">Eliminar Producto</button>
        <button id="botonEditarTrago">Modificar Trago</button>
    `
}
