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
    LlenaTipoHabitaciones();
    LlenaServiciosAdicionales();
});

function LlenaTipoHabitaciones() {
    LlenarComboTipoHabitaciones("http://localhost:53634/api/TipoHabitacion", "#cboTipoHabitacion");
}
function LlenaServiciosAdicionales() {
    LlenarComboServiciosAdd("http://localhost:53634/api/HabitacionesServicios", "#cboIdServiciosAdicionales");
}


async function Consultar() {
    //Capturo los datos de entrada
    let idHabitacion = $("#txtNumHabitacion").val();

    $("#cboTipoHabitacion").val('');
    $("#txtTarifaNoche").val('');
    $("#cboIdServiciosAdicionales").val('');
    $("#txtDescriopcionServ").val('');
    $("#chkDisponibilidad").prop('checked', false);
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Habitaciones?idHabitacion=" + idHabitacion,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtNumHabitacion").val(Rpta.NUMERO_HABITACION);
        $("#cboTipoHabitacion").val(Rpta.ID_TIPO_HABITACION);
        $("#txtTarifaNoche").val(Rpta.TARIFA_NOCHE);
        $("#cboIdServiciosAdicionales").val(Rpta.ID_SERVICIOS_ADICIONALES);
        $("#txtDescriopcionServ").val(Rpta.NOMBRE_SERVICIO_AD);
        $("#chkDisponibilidad").prop('checked', Rpta.DISPONIBILIDAD);
        $("#chkActivo").prop('checked', Rpta.ACTIVO);
        $("#dvMensaje").html('');
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#txtNumHabitacion").val(idHabitacion);
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let idHabitacion = $("#txtNumHabitacion").val();
    let Tipo_Habitacion = $("#cboTipoHabitacion").val();
    let TarifaNoche = $("#txtTarifaNoche").val();
    let IdServiciosAdicionales = $("#cboIdServiciosAdicionales").val();
    let Disponibilidad = $("#chkDisponibilidad").prop('checked');
    let Activo = $("#chkActivo").prop('checked');
    //Defino el json
    let DatosHabitaciones = {
        NUMERO_HABITACION: idHabitacion,
        ID_TIPO_HABITACION: Tipo_Habitacion,
        TARIFA_NOCHE: TarifaNoche,
        DISPONIBILIDAD: Disponibilidad,
        ID_SERVICIOS_ADICIONALES: IdServiciosAdicionales,
        ACTIVO: Activo
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Habitaciones",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosHabitaciones)
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
    $("#txtNumHabitacion").val('');
    $("#cboTipoHabitacion").val('');
    $("#txtTarifaNoche").val('');
    $("#cboIdServiciosAdicionales").val('');
    $("#txtDescriopcionServ").val('');
    $("#chkDisponibilidad").prop('checked', false);
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}