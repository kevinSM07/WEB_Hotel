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
    LlenaComboSede();
});

function LlenaComboSede() {
    LlenarComboSedes("http://localhost:53634/api/Sede", "#cboSedes");
}

async function Consultar() {
    //Capturo los datos de entrada
    let IdEvento = $("#txtIdEvento").val();

    $("#txtIdEvento").val('');
    $("#txtNombreEvento").val('');
    $("#txtDescripcion").val('');
    $("#txtFechaEvento").val('');
    $("#txtLugarEvento").val('');
    $("#cboSedes").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Eventos?IdEvento=" + IdEvento,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtIdEvento").val(Rpta.ID_EVENTO);
        $("#txtNombreEvento").val(Rpta.NOMBRE_EVENTO);
        $("#txtDescripcion").val(Rpta.DESCRIPCION);
        let FechaFormater = Rpta.FECHA;
        if (FechaFormater != undefined) {
            $("#txtFechaEvento").val(FechaFormater.split('T')[0]);
        }
        $("#txtLugarEvento").val(Rpta.LUGAR);
        $("#cboSedes").val(Rpta.ID_SEDE);
        $("#chkActivo").prop('checked', Rpta.ACTIVO);
        $("#dvMensaje").html('');
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#txtIdEvento").val(IdEvento);
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let IdEvento = $("#txtIdEvento").val();
    let NombreEvento = $("#txtNombreEvento").val();
    let Descripcion = $("#txtDescripcion").val();
    let FechaEvento = $("#txtFechaEvento").val();
    let Sedes = $("#cboSedes").val();
    let LugarEvento = $("#txtLugarEvento").val();
    let Activo = $("#chkActivo").prop('checked');
    //Defino el json
    let DatosEventos = {
        ID_EVENTO: IdEvento,
        NOMBRE_EVENTO: NombreEvento,
        DESCRIPCION: Descripcion,
        FECHA: FechaEvento,
        ID_SEDE: Sedes,
        LUGAR: LugarEvento,
        ACTIVO: Activo
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Eventos",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosEventos)
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
    $("#txtIdEvento").val('');
    $("#txtNombreEvento").val('');
    $("#txtDescripcion").val('');
    $("#txtFechaEvento").val('');
    $("#txtLugarEvento").val('');
    $("#cboSedes").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}