//Creamos una variable de tipo DataTable
var oTabla = $("#tblPersonal").DataTable();

jQuery(function () {
    $("#tblPersonal tbody").on("click", 'tr', function () {
        //Levanta el evento del click sobre la tabla
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            oTabla.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            EditarFila($(this).closest('tr'));
        }
    });
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
    LlenarTablaPersonal();
});

function EditarFila(DatosFila) {
    $("#txtDocumento").val(DatosFila.find('td:eq(0)').text());
    $("#txtNombre").val(DatosFila.find('td:eq(1)').text());
    $("#txtApellido").val(DatosFila.find('td:eq(2)').text());
    $("#txtTelefono").val(DatosFila.find('td:eq(3)').text());
    $("#txtCorreoElectronico").val(DatosFila.find('td:eq(4)').text());
    $("#cboSedes").val(DatosFila.find('td:eq(5)').text());
    let activo = DatosFila.find('td:eq(7)').text();
    if (activo == 'true') {
        $("#chkActivo").prop('checked', true);
    }
    else {
        $("#chkActivo").prop('checked', false);
    }
}

function LlenaComboSede() {
    LlenarComboSedes("http://localhost:53634/api/Sede", "#cboSedes");
}
function LlenarTablaPersonal() {
    LlenarTablasXServicio("http://localhost:53634/api/Personal", "#tblPersonal");
}

//async function Consultar() {
//    //Capturo los datos de entrada
//    let Documento = $("#txtDocumento").val();
//    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
//    try {
//        const Respuesta = await fetch("http://localhost:53634/api/Personal?Documento=" + Documento,
//            {
//                method: "GET",
//                mode: "cors",
//                headers: {
//                    "Content-Type": "application/json"
//                }
//            });
//        const Rpta = await Respuesta.json();
//        //Se presenta la respuesta en el div mensaje
//        $("#txtNombre").val(Rpta.NOMBRE);
//        $("#txtApellido").val(Rpta.APELLIDO);
//        $("#txtTelefono").val(Rpta.TELEFONO);
//        $("#txtCorreoElectronico").val(Rpta.CORREO_ELECTRONICO);
//        $("#cboSedes").val(Rpta.ID_SEDE);
//        $("#chkActivo").prop('checked', Rpta.ACTIVO);
//        $("#dvMensaje").html('');
//    }
//    catch (error) {
//        //Se presenta la respuesta en el div mensaje
//        $("#dvMensaje").html(error);
//    }
//}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let Documento = $("#txtDocumento").val();
    let Nombre = $("#txtNombre").val();
    let Apellido = $("#txtApellido").val();
    let Telefono = $("#txtTelefono").val();
    let Correo = $("#txtCorreoElectronico").val();
    let Sedes = $("#cboSedes").val();
    let Activo = $("#chkActivo").prop('checked');
    //Defino el json
    let DatosPersonal = {
        DOCUMENTO: Documento,
        NOMBRE: Nombre,
        APELLIDO: Apellido,
        TELEFONO: Telefono,
        CORREO_ELECTRONICO: Correo,
        ID_SEDE: Sedes,
        ACTIVO: Activo
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:53634/api/Personal",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosPersonal)
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(Rpta);
        LlenarTablaPersonal();
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
    $("#txtTelefono").val('');
    $("#txtCorreoElectronico").val('');
    $("#cboSedes").val('');
    $("#chkActivo").prop('checked', false);
    $("#dvMensaje").html('')
}