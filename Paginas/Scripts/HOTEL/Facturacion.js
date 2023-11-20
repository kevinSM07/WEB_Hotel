//Defino la variable oTabla como pública
var oTabla = $("#tblFactura").DataTable();
var TotalCompra = 0;
jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    $("#txtFecha").val(FechaHoy());
    $("#tblFactura tbody").on("click", 'tr', function () {
        //Levanta el evento del click sobre la tabla
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            oTabla.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            EditarFila($(this).closest('tr'));
        }
    });
    $('#btnBuscar').on("click", function () {
        ConsultarCliente();
    });
    $("#btnAgregar").on("click", function () {
        AgregarProductos();
    });
    $("#btnEliminar").on("click", function () {
        EliminarProductos();
    });
    $("#btnCancelar").on("click", function () {
        OcultarBotones();
    });
    $("#btnActualizar").on("click", function () {
        AgregarProductos();
        EliminarProductos();
    });
    $("#btnGrabarFactura").on("click", function () {
        GrabarFactura();
    });
    $("#cboTipoProducto").on("change", function () {
        LlenarComboProducto();
    });
    $("#txtCantidad").on("change", function () {
        CalcularSubtotal();
    });
    $("#cboProducto").on("change", function () {
        CalcularSubtotal();
    });
    LlenarComboPersonal();
    LlenarComboXServicios();
    LlenarComboModoPago();
    LlenaTipoHabitaciones();
    LlenarComboServiciosAdicionales();
    LlenaComboSede();
    OcultarBotones();
});
//async function GrabarFactura() {
//    let Documento = $("#txtDocumento").val();
//    let CodigoEmpleado = $("#cboEmpleado").val();
//    //Capturar la información de la tabla
//    //Capturar los datos de la tabla, que corresponden al detalle de la factura
//    var fieldNames = [], DEtalleFActuras = [];
//    oTabla.settings().columns()[0].forEach(function (index) {
//        fieldNames.push($(oTabla.column(index).header()).text().replace(/ /g, ""));
//    });
//    //Recorre la tabla, y arma un arreglo en formato json
//    oTabla.rows().data().toArray().forEach(function (row) {
//        var item = {};
//        row.forEach(function (content, index) {
//            item[fieldNames[index]] = content;
//        });
//        DEtalleFActuras.push(item);
//    });
//    let DatosFactura = {
//        Documento: Documento,
//        CodigoEmpleado: CodigoEmpleado,
//        DEtalleFActuras
//    }
//    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
//    try {
//        const Respuesta = await fetch("http://localhost:53634/api/Facturacion",
//            {
//                method: "POST",
//                mode: "cors",
//                headers: {
//                    "Content-Type": "application/json"
//                },
//                body: JSON.stringify(DatosFactura)
//            });
//        const Rpta = await Respuesta.json();
//        //Se presenta la factura
//        $("#txtNumeroFactura").val(Rpta);
//    }
//    catch (error) {
//        //Se presenta la respuesta en el div mensaje
//        $("#dvMensaje").html(error);
//    }
//}
//function EliminarProductos() {
//    //para calcular el total, se toma la información de la tabla
//    let DatosProducto = oTabla.row('.selected').data();
//    let Cantidad = DatosProducto[4];
//    let ValorUnitario = DatosProducto[5];

//    TotalCompra -= Cantidad * ValorUnitario;
//    $("#txtTotalCompra").val(FormatoMiles(TotalCompra));

//    //Elimina la fila seleccionada
//    oTabla.row('.selected').remove().draw(false);
//    OcultarBotones();
//}
//async function EditarFila(DatosFila) {
//    $("#cboTipoProducto").val(DatosFila.find('td:eq(0)').text());
//    //Hay que llenar el combo de producto
//    await LlenarComboProducto();
//    //Seleccionar el producto
//    let CodigoProd = DatosFila.find('td:eq(2)').text();
//    let ValorUnitario = DatosFila.find('td:eq(5)').text();
//    $("#cboProducto").val(CodigoProd + "|" + ValorUnitario);
//    let Cantidad = DatosFila.find('td:eq(4)').text();
//    $("#txtCantidad").val(Cantidad);
//    CalcularSubtotal();
//    //Muestra los botones de actualizar, eliminar y cancelar
//    MostrarBotones();
//}
//function AgregarProductos() {
//    //Agregar los productos en la tabla, sin necesidad de grabar la base de datos
//    let CodTipoProducto = $("#cboTipoProducto").val();
//    let TipoProducto = $("#cboTipoProducto option:selected").text();
//    let CodProducto = $("#txtCodigoProducto").val();
//    let Producto = $("#cboProducto option:selected").text();
//    let Cantidad = $("#txtCantidad").val();
//    let ValorUnitario = $("#txtValorUnitario").val();

//    let DatosFila = [CodTipoProducto, TipoProducto, CodProducto, Producto, Cantidad, ValorUnitario];
//    oTabla.row.add(DatosFila).draw(false);

//    //Calcula el total de la factura
//    TotalCompra += Cantidad * ValorUnitario;
//    $("#txtTotalCompra").val(FormatoMiles(TotalCompra));
//}
function OcultarBotones() {
    $("#btnActualizar").hide();
    $("#btnEliminar").hide();
    $("#btnCancelar").hide();
    $("#btnAgregar").show();
    $("#btnGrabarFactura").show();
    $("#btnLimpiar").show();
}
function MostrarBotones() {
    $("#btnActualizar").show();
    $("#btnEliminar").show();
    $("#btnCancelar").show();
    $("#btnAgregar").hide();
    $("#btnGrabarFactura").hide();
    $("#btnLimpiar").hide();
}
function LlenarComboPersonal() {
    LlenarComboXPersonal("http://localhost:53634/api/Personal", "#cboPersonal");
}

function LlenarComboXServicios() {
    LlenarComboServicios("http://localhost:53634/api/Servicio", "#cboServicios");
}

function LlenarComboModoPago() {
   LlenarComboXModoPago("http://localhost:53634/api/ModoPago", "#cboModoPago");
}

function LlenaComboSede() {
    LlenarComboSedes("http://localhost:53634/api/Sede", "#cboSedes");
}

async function LlenaTipoHabitaciones() {
    await LlenarComboTipoHabitaciones("http://localhost:53634/api/TipoHabitacion", "#cboTipoHabitacion");
    LlenarComboHabitacion();
}

async function LlenarComboHabitacion() {
    let tipoHabitacion = $("#cboTipoHabitacion").val();
    await LlenarComboHabitaciones("http://localhost:53634/api/Habitaciones?tipoHabitacion=" + tipoHabitacion, "#cboHabitacion");
}



function LlenarComboServiciosAdicionales() {
    LlenarComboServiciosAdd("http://localhost:53634/api/HabitacionesServicios", "#cboServicioAdicional");
}


//function CalcularSubtotal() {
//    let DatosProducto = $("#cboProducto").val();
//    let Cantidad = $("#txtCantidad").val();
//    let ValorUnitario = DatosProducto.split('|')[1];

//    $("#txtValorUnitarioTexto").val(FormatoMiles(ValorUnitario));
//    $("#txtValorUnitario").val(ValorUnitario);
//    $("#txtCodigoProducto").val(DatosProducto.split('|')[0]);
//    $("#txtSubtotal").val(FormatoMiles(Cantidad * ValorUnitario));


//}
async function ConsultarCliente() {
    let Documento = $("#txtDocumento").val();
   
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
        $("#txtNombreCliente").val(Rpta.NOMBRE + " " + Rpta.APELLIDO);
        var idCliente = parseInt(Rpta.ID_CLIENTE);

    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
        return alert('El documento no existe vuelva a intentar');
    }

    try {
        const Respuesta = await fetch("http://localhost:53634/api/Reservas?idCliente=" + idCliente,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtIdReserva").val(Rpta.ID_RESERVA);
        $("#txtNombreReservante").val(Rpta.NOMBRE);
        $("#txtCantidad").val(Rpta.CANTIDAD_C);
        $("#cboServicios").val(Rpta.ID_SERVICIO);
        $("#cboSedes").val(Rpta.ID_SEDE);
        $("#cboHabitacion").val(Rpta.NUMERO_HABITACION);
        var idHabitacion = (Rpta.NUMERO_HABITACION);
        var idServicio = Rpta.ID_SERVICIO;
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }

    try {
        const Respuesta = await fetch("http://localhost:53634/api/Servicio?idServicio=" + idServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtValorServicio").val(Rpta.PRECIO);
        var precioServicio = parseInt(Rpta.PRECIO);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }

    var Nada = "Nada"
    const url = `http://localhost:53634/api/Habitaciones?idHabitacion=${idHabitacion}&Nada=${Nada}`;
    try {
        const Respuesta = await fetch(url,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        $("#txtValorHabitacion").val(Rpta.TARIFA_NOCHE);
        var idServiciosAdicionales = (Rpta.NUMERO_HABITACION);
        var precioTarifaNoche = parseInt(Rpta.TARIFA_NOCHE);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }

    try {
        const Respuesta = await fetch("http://localhost:53634/api/HabitacionesServicios?idServiciosAdicionales=" + idServiciosAdicionales,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        $("#cboServicioAdicional").val(Rpta.ID_HABITACIONES_SERVICIOS);
        $("#txtValorServAdd").val(Rpta.PRECIO);
        var precioServAdicional = parseInt(Rpta.PRECIO);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
    $("#txtTotaPago").val(precioServAdicional + precioTarifaNoche + precioServicio);
    

}
