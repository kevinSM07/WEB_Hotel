//Creamos una variable de tipo DataTable
var oTabla = $("#tblCiudades").DataTable();


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
    LlenarTablaCiudades();
});

function LlenarTablaCiudades() {
    LlenarTablasXServicio("http://localhost:53634/api/Ciudades", "#tblCiudades");
}

async function Consultar() {
    //Capturo los datos de entrada
    let IdCiudad = $("#txtIdCiudad").val();

    $("#txtNombreCiudad").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Ciudades?IdCiudad=" + IdCiudad,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtIdCiudad").val(Rpta.CIUDAD_ID);
        $("#txtNombreCiudad").val(Rpta.NOMBRE_CIUDAD);
        $("#chkActivo").prop('checked', Rpta.ACTIVO);
        $("#dvMensaje").html('');
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#txtIdCiudad").val(IdCiudad);
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let IdCiudad = $("#txtIdCiudad").val();
    let Nombre_Ciudad = $("#txtNombreCiudad").val();
    let Activo = $("#chkActivo").prop('checked');
    //Defino el json
    let DatosCiudades = {
        CIUDAD_ID: IdCiudad,
        NOMBRE_CIUDAD: Nombre_Ciudad,
        ACTIVO: Activo
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Ciudades",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosCiudades)
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(Rpta);
        LlenarTablaCiudades();
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

async function Limpiar() {
    $("#txtIdCiudad").val('');
    $("#txtNombreCiudad").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}