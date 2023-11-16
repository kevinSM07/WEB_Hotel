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
});


async function Consultar() {
    //Capturo los datos de entrada
    let Idservicio = $("#txtIdServicio").val();
    $("#txtIdServicio").val('');
    $("#txtNombreServicio").val('');
    $("#txtDescripcion").val('');
    $("#txtPrecio").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Servicio?Idservicio=" + Idservicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtIdServicio").val(Rpta.ID_SERVICIO);
        $("#txtNombreServicio").val(Rpta.NOMBRE_SERVICIO);
        $("#txtDescripcion").val(Rpta.DESCRIPCION);
        $("#txtPrecio").val(Rpta.PRECIO);
        $("#chkActivo").prop('checked', Rpta.ACTIVO);
        $("#dvMensaje").html('');
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#txtIdServicio").val(Idservicio);
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let ID_SERVICIO = $("#txtIdServicio").val();
    let NOMBRE_SERVICIO = $("#txtNombreServicio").val();
    let DESCRIPCION = $("#txtDescripcion").val();
    let PRECIO = $("#txtPrecio").val();
    let ACTIVO = $("#chkActivo").prop('checked');
    //Defino el json
    let DatosServicio = {
        ID_SERVICIO: ID_SERVICIO,
        NOMBRE_SERVICIO: NOMBRE_SERVICIO,
        DESCRIPCION: DESCRIPCION,
        PRECIO: PRECIO,
        ACTIVO: ACTIVO
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Servicio",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosServicio)
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

async function Limpiar() {
    $("#txtIdServicio").val('');
    $("#txtNombreServicio").val('');
    $("#txtDescripcion").val('');
    $("#txtPrecio").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}