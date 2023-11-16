function FormatoMiles(Numero) {
    return "$ " + new Intl.NumberFormat('es-CO').format(Numero);
}
function FechaHoy() {
    let now = new Date();
    return now.toISOString().split('T')[0];
}