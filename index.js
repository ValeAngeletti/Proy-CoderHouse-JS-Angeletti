alert("---- BAR CODER HOUSE ----");

let bebidasSinAlcohol = [{ nombre: "Agua Mineral", precio: 1000, cantidad: 20 }, { nombre: "Agua con Gas", precio: 2000, cantidad: 10 }, { nombre: "Gaseosa", precio: 4000, cantidad: 30 }, { nombre: "Jugo", precio: 3000, cantidad: 5 }];

let bebidasConAlcohol = [{ nombre: "Cerveza", precio: 5000, cantidad: 10 }, { nombre: "Vino", precio: 8000, cantidad: 20 }, { nombre: "Whisky", precio: 15000, cantidad: 7 }, { nombre: "Vodka", precio: 12000, cantidad: 10 }, { nombre: "Fernet", precio: 15000, cantidad: 13 }, { nombre: "Licor", precio: 10000, cantidad: 4 }];

let tragos = [{ nombre: "Mojito", precio: 8000 }, { nombre: "Piña Colada", precio: 9000 }, { nombre: "Caipirinha", precio: 7000 }, { nombre: "Daiquiri", precio: 7500 }, { nombre: "Margarita", precio: 8500 }, { nombre: "Fernet con coca", precio: 5000 }, { nombre: "Cosmopolitan", precio: 8000 }];

let carrito = [];
let cuenta = 0;

function menuInicial() {
    let opcion = parseInt(prompt("Ingrese una opción: \n1. Soy cliente\n2. Soy administrador"));
    return opcion;
}

function continuar(mensaje) {
    let continuar = parseInt(prompt(mensaje + "\n1. Si\n2. No\n"));
    return continuar == 1;

}

function menuCliente(nombre) {
    interruptor = true;

    while (interruptor == true) {
        let opcion = parseInt(prompt("Bienvenid@ " + nombre + "!!\n\nIngrese una opción: \n1. Comprar bebidas con alcohol\n2. Comprar bebidas sin alcohol\n3. Pedir un trago\n4. Pedir la cuenta\n5. Pagar\n6. Salir"));

        switch (opcion) {
            case 1:
                mostrarProductos("Bebidas con Alcohol", "Bebida", bebidasConAlcohol, true);
                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 2:
                mostrarProductos("Bebidas sin Alcohol", "Bebida", bebidasSinAlcohol, true);
                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 3:
                mostrarProductos("Tragos", "Tragos", tragos, true);
                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 4:
                solicitarCuenta(nombre);
                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 5:
                cuenta = 0;
                alert("Cuenta pagada !!");
                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 6:
                alert("Gracias por visitarnos !");
                interruptor = false;
                break;
            default:
                alert("Opción incorrecta, intentelo nuevamente");
                interruptor = false;
                break;

        }
    }
}

function mostrarProductos(titulo, tipoProducto, array, interruptor) {
    interruptor = interruptor;
    i = 0;

    while (interruptor == true) {
        console.log("\n" + titulo);
        for (const producto of array) {
            console.log(i + ". " + tipoProducto + ": " + producto.nombre + " | Precio: $" + producto.precio);
            i++;
        }
        let bebida = prompt("Ingrese lo que desea comprar:");
        carrito.push(array[bebida])
        i = 0;
        interruptor = continuar("¿Desea comprar algo más?")
    }
}

function solicitarCuenta(nombre) {
    console.log("Cliente: " + nombre + "\n" + "Cuenta:");
    for (i = 0; i < carrito.length; i++) {
        console.log("Producto: " + carrito[i].nombre + " | Precio: $" + carrito[i].precio)
        cuenta = cuenta + carrito[i].precio;
    }
    console.log("Total: $" + cuenta);
}


//MENU ADMINISTRADOR ---
function menuAdmin() {
    interruptor = true;

    while (interruptor == true) {
        let opcion = parseInt(prompt("Bienvenido Administrador!!\n\nIngrese una opción: \n1. Consultar stock de bebidas\n2. Agregar stock de bebidas\n3. Agregar un nuevo trago\n4. Eliminar bebida\n5. Eliminar trago\n6. Salir"));

        switch (opcion) {
            case 1:
                console.log("\nStock de Productos");
                stockProductos("Bebidas con Alcohol: ", bebidasConAlcohol);
                stockProductos("Bebidas sin Alcohol: ", bebidasSinAlcohol);
                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 2:
                let tipoBebida = parseInt(prompt("¿De qué bebida desea agregar stock?:\n1. Bebidas con Alcohol\n2. Bebidas sin Alcohol\n"));

                if (tipoBebida == 1) {
                    agregarStock("Bebidas con Alcohol: ", bebidasConAlcohol);
                } else {
                    agregarStock("Bebidas sin Alcohol: ", bebidasSinAlcohol);
                }

                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 3:
                agregarTrago(tragos);
                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 4:
                let tipoBebidaEliminar = parseInt(prompt("¿Que tipo de bebida desea eliminar?:\n1. Bebidas con Alcohol\n2. Bebidas sin Alcohol\n"));

                if (tipoBebidaEliminar == 1) {
                    eliminarProducto("Bebidas con Alcohol: ", bebidasConAlcohol);
                } else {
                    eliminarProducto("Bebidas sin Alcohol: ", bebidasSinAlcohol);
                }

                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 5:
                eliminarProducto("Tragos:", tragos);
                interruptor = continuar("¿Desea realizar otra operacion?");
                break;
            case 6:
                alert("Gracias por visitarnos !");
                interruptor = false;
                break;
            default:
                alert("Opción incorrecta, intentelo nuevamente");
                interruptor = false;
                break;

        }
    }
};

function stockProductos(titulo, array) {
    console.log("\n" + titulo)
    i = 0;
    for (let producto of array) {
        console.log(i + ". Producto: " + producto.nombre + " | Stock: " + producto.cantidad)
        i++;
    }

}

function agregarStock(titulo, array) {
    stockProductos(titulo, array);
    let opcion = parseInt(prompt("¿De que producto desea agregar stock?\nIngrese el número de producto:\n"));
    let cantidad = parseInt(prompt("¿Cuantas cantidades quiere agregar?\n"));
    array[opcion].cantidad += cantidad;
}

function agregarTrago(array) {
    console.log("\nNuevo trago: ")
    let nombreNuevo = prompt("Nombre del trago:\n");
    let nombreExistente = array.find(trago => trago.nombre == nombreNuevo);

    if (nombreExistente) {
        alert("El trago ya existe !")
        return;
    }
    let precioNuevo = parseInt(prompt("Precio del trago:\n"));

    array.push({ nombre: nombreNuevo, precio: precioNuevo });
    alert("Trago agregado con éxito!");
}

function eliminarProducto(titulo, array) {
    stockProductos(titulo, array);
    let prodAEliminar = parseInt(prompt("Ingrese el número del producto a eliminar:\n"));
    array.splice(prodAEliminar, 1);
    alert("Producto eliminado con éxito!");
}

let inicio = menuInicial();

switch (inicio) {
    case 1:
        let nombreCliente = prompt("Ingrese su nombre:");
        menuCliente(nombreCliente);
        break;
    case 2:
        let contrasena = parseInt(prompt("Ingrese la contraseña (4 números):"));
        if (contrasena == 9494) {
            menuAdmin();
        } else {
            alert("Contraseña incorrecta, intentelo nuevamente !")
        }
        break;
    default:
        alert("Opcion inválida, intentelo nuevamente !");
        break;
}

