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
    LlenarReservas();
    LlenarSedes();
    LlenarCliente();
    LlenarModoPago();
});


function LlenarReservas() {
    LlenarComboReservas("http://localhost:53634/api/Reservas", "#cboIdReserva");
}

function LlenarSedes() {
    LlenarComboSedes("http://localhost:53634/api/Sede", "#cboIdSede");
}

function LlenarCliente() {
    LlenarComboClientes("http://localhost:53634/api/Cliente", "#cboIdCliente");
}

function LlenarModoPago() {
    LlenarComboModoPago("http://localhost:53634/api/ModoPago", "#cboModoPago");
}

async function Consultar() {
    //Capturo los datos de entrada
    let idFactura = $("#txtIdFactura").val();

    $("#cboIdReserva").val('');
    $("#cboIdSede").val('');
    $("#cboIdCliente").val('');
    $("#cboModoPago").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Factura?idFactura=" + idFactura,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtIdFactura").val(Rpta.ID_FACTURA);
        $("#cboIdReserva").val(Rpta.ID_RESERVA);
        $("#cboIdSede").val(Rpta.ID_SEDE);
        $("#cboIdCliente").val(Rpta.ID_CLIENTE);
        $("#cboModoPago").val(Rpta.ID_MODO_PAGO);
        $("#chkActivo").prop('checked', Rpta.ACTIVO);
        $("#dvMensaje").html('');
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#txtIdFactura").val(idFactura);
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let idFactura = $("#txtIdFactura").val();
    let idReserva = $("#cboIdReserva").val();
    let idSede = $("#cboIdSede").val();
    let idCliente = $("#cboIdCliente").val();
    let idModoPago = $("#cboModoPago").val();
    let Activo = $("#chkActivo").prop('checked');
    //Defino el json
    let DatosFactura = {
        ID_FACTURA: idFactura,
        ID_RESERVA: idReserva,
        ID_SEDE: idSede,
        ID_CLIENTE: idCliente,
        ID_MODO_PAGO: idModoPago,
        ACTIVO: Activo
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Factura",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosFactura)
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
    $("#txtIdFactura").val('');
    $("#cboIdReserva").val('');
    $("#cboIdSede").val('');
    $("#cboIdCliente").val('');
    $("#cboModoPago").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}