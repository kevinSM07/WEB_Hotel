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
    LlenaComboTipoCliente();
});

function LlenaComboTipoCliente() {
    LlenarComboTipoCliente("http://localhost:53634/api/TipoCliente", "#cboTipoCliente");
}
async function Consultar() {
    //Capturo los datos de entrada
    let Documento = $("#txtDocumento").val();
    $("#txtDocumento").val('');
    $("#txtNombre").val('');
    $("#txtApellido").val('');
    $("#txtDireccion").val('');
    $("#txtTelefono").val('');
    $("#txtCorreoElectronico").val('');
    $("#cboTipoCliente").val('');
    $("#chk_IN").prop('checked', false);
    $("#chk_OUT").prop('checked', false);
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Cliente?Documento=" + Documento,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        
        //Se presenta la respuesta en el div mensaje
        $("#txtDocumento").val(Rpta.DOCUMENTO);
        $("#txtNombre").val(Rpta.NOMBRE);
        $("#txtApellido").val(Rpta.APELLIDO);
        $("#txtDireccion").val(Rpta.DIRECCION);
        $("#txtTelefono").val(Rpta.TELEFONO);
        $("#txtCorreoElectronico").val(Rpta.CORREO_ELECTRONICO);
        $("#cboTipoCliente").val(Rpta.ID_TIPO_CLIENTE);
        $("#chk_IN").prop('checked', Rpta.CHECK_IN);
        $("#chk_OUT").prop('checked', Rpta.CHECK_OUT);
        $("#chkActivo").prop('checked', Rpta.ACTIVO);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#txtDocumento").val(Documento);
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let Documento =  $("#txtDocumento").val();
    let Nombre = $("#txtNombre").val();
    let Apellido = $("#txtApellido").val();
    let Direccion = $("#txtDireccion").val();
    let Telefono = $("#txtTelefono").val();
    let Correo = $("#txtCorreoElectronico").val();
    let TipoCliente = $("#cboTipoCliente").val();
    let Check_IN = $("#chk_IN").prop('checked');
    let Check_OUT = $("#chk_OUT").prop('checked');
    let Activo = $("#chkActivo").prop('checked');


    //Defino el json
    let DatosClientes = {
        DOCUMENTO: Documento,
        NOMBRE: Nombre,
        APELLIDO: Apellido,
        DIRECCION: Direccion,
        TELEFONO: Telefono,
        CORREO_ELECTRONICO: Correo,
        ID_TIPO_CLIENTE: TipoCliente,
        CHECK_IN: Check_IN,
        CHECK_OUT: Check_OUT,
        ACTIVO: Activo,
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Cliente",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosClientes)
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
    $("#txtDocumento").val('');
    $("#txtNombre").val('');
    $("#txtApellido").val('');
    $("#txtDireccion").val('');
    $("#txtTelefono").val('');
    $("#txtCorreoElectronico").val('');
    $("#cboTipoCliente").val('');
    $("#chk_IN").prop('checked', false);
    $("#chk_OUT").prop('checked', false);
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}