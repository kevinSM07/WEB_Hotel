//Creamos una variable de tipo DataTable
var oTabla = $("#tblCancelacion").DataTable();

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
    //LlenaComboTipoCliente();
    LlenarTablaCancelaciones();
});

function LlenarTablaCancelaciones() {
    LlenarTablasXServicio("http://localhost:53634/api/Cancelacion", "#tblCancelacion");
}

async function Consultar() {
    //Capturo los datos de entrada
    let IdCancelacion = $("#txtIdCancelacion").val();

    $("#txtIdCancelacion").val('');
    $("#txtDescripcion").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Cancelacion?IdCancelacion=" + IdCancelacion,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtIdCancelacion").val(Rpta.ID_CANCELACION);
        $("#txtDescripcion").val(Rpta.DESCRIPCION);
        $("#chkActivo").prop('checked', Rpta.ACTIVO);
        $("#dvMensaje").html('');
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#txtIdCancelacion").val(IdCancelacion);
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let IdCancelacion = $("#txtIdCancelacion").val();
    let Descripcion = $("#txtDescripcion").val();
    let Activo = $("#chkActivo").prop('checked');
    //Defino el json
    let DatosCancelacion = {
        ID_CANCELACION: IdCancelacion,
        DESCRIPCION: Descripcion,
        ACTIVO: Activo
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Cancelacion",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosCancelacion)
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(Rpta);
        LlenarTablaCancelaciones();
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

async function Limpiar() {
    $("#txtIdCancelacion").val('');
    $("#txtDescripcion").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}