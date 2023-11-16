//Creamos una variable de tipo DataTable
var oTabla = $("#tblModoPago").DataTable();

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
    $("#btnLimpiar").on("click", function () {
        Limpiar();
    });
    LlenarTablaModoPago();
});

function LlenarTablaModoPago() {
    LlenarTablasXServicio("http://localhost:53634/api/ModoPago", "#tblModoPago");
}

async function Consultar() {
    //Capturo los datos de entrada
    let IdModoPago = $("#txtModoPago").val();

    $("#txtMetodoPago").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/ModoPago?IdModoPago=" + IdModoPago,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtModoPago").val(Rpta.ID_MODO_PAGO);
        $("#txtMetodoPago").val(Rpta.METODO_PAGO);
        $("#chkActivo").prop('checked', Rpta.ACTIVO);
        $("#dvMensaje").html('');
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#txtModoPago").val(IdModoPago);
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let IdModoPago = $("#txtModoPago").val();
    let MetodoPago = $("#txtMetodoPago").val();
    let Activo = $("#chkActivo").prop('checked');
    //Defino el json
    let DatosModoPago = {
        ID_MODO_PAGO: IdModoPago,
        METODO_PAGO: MetodoPago,
        ACTIVO: Activo
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/ModoPago",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosModoPago)
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(Rpta);
        LlenarTablaModoPago();
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

async function Limpiar() {
    $("#txtModoPago").val('');
    $("#txtMetodoPago").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}
