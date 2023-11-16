//Creamos una variable de tipo DataTable
var oTabla = $("#tblRoles").DataTable();


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
    LlenarTablaRoles();
});

function LlenarTablaRoles() {
    LlenarTablasXServicio("http://localhost:53634/api/Roles", "#tblRoles");
}

async function Consultar() {
    //Capturo los datos de entrada
    let IdRol = $("#txtIdRol").val();

    $("#txtNombreRol").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Roles?IdRol=" + IdRol,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtIdRol").val(Rpta.ID_ROL);
        $("#txtNombreRol").val(Rpta.NOMBRE_ROL);
        $("#chkActivo").prop('checked', Rpta.ACTIVO);
        $("#dvMensaje").html('');
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#txtIdRol").val(IdRol);
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let IdRol = $("#txtIdRol").val();
    let Nombre_Rol = $("#txtNombreRol").val();
    let Activo = $("#chkActivo").prop('checked');
    //Defino el json
    let DatosRol = {
        ID_ROL: IdRol,
        NOMBRE_ROL: Nombre_Rol,
        ACTIVO: Activo
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Roles",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosRol)
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(Rpta);
        LlenarTablaRoles();
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

async function Limpiar() {
    $("#txtIdRol").val('');
    $("#txtNombreRol").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}