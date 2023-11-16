//Creamos una variable de tipo DataTable
var oTabla = $("#tblReservas").DataTable();

jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html")
    //Registrar los botones para responder al evento click
    $("#btnInsertar").on("click", function () {
        EjecutarComandos("POST");
    });
    $("#btnActualizar").on("click", function () {
        EjecutarComandos("PUT");
    });
    $("#btnEliminar").on("click", function () {
        EjecutarComandos("DELETE");
    });
    $("#btnConsultar").on("click", function () {
        Consultar();
    });
    //Invoca la función para llenar el combo
   // LlenarComboTipoProducto();
    LlenarTablaReservas();
});


async function LlenarTablaReservas() {
    LlenarTablasXServicio("http://localhost:53634/api/Reservas", "#tblReservas");
}
async function Consultar() {
    //Capturo los datos de entrada
    let Codigo = $("#txtIdReserva").val();
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Reservas?Codigo=" + Codigo,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtDocumento").val(Rpta.ID_CLIENTE);
        //$("#chkActivo").prop('checked', Rpta.Activo);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let ID_RESERVA = $("#txtIdReserva").val();
    let ID_CLIENTE = $("#txtDocumento").val();
    //let Activo = $("#chkActivo").prop('checked');

    //Defino el json
    let DatosReserva = {
        ID_RESERVAS: ID_RESERVA,
        ID_CLIENTE: ID_CLIENTE,
        //Activo: Activo
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Reservas",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosTipoProducto)
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(Rpta);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}