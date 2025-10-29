function Bebida(nombre, precio, cantidad = 0) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
}

const bebidasConAlcohol = [
    new Bebida("Cerveza", 5000, 10),
    new Bebida("Vino", 8000, 20),
    new Bebida("Whisky", 15000, 7),
    new Bebida("Vodka", 12000, 10),
    new Bebida("Fernet", 15000, 13),
    new Bebida("Licor", 10000, 4)
]

const bebidasSinAlcohol = [
    new Bebida("Agua Mineral", 1000, 20),
    new Bebida("Agua con Gas", 2000, 10),
    new Bebida("Gaseosa", 4000, 30),
    new Bebida("Jugo", 3000, 5),
    new Bebida("Limonada", 5000, 15)
]

const tragos = [
    new Bebida("Mojito", 8000),
    new Bebida("Piña Colada", 9000),
    new Bebida("Caipirinha", 7000),
    new Bebida("Daiquiri", 7500),
    new Bebida("Margarita", 8500),
    new Bebida("Fernet con coca", 5000),
    new Bebida("Cosmopolitan", 8000),
]
