async function LlenarComboXServicios(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].Codigo + '>' + Rpta[i].Nombre + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

//Llenar combo para Tipo Cliente
async function LlenarComboTipoCliente(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].ID_TIPO_CLIENTE + '>' + Rpta[i].NOMBRE + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

//Llenar combo para Sedes
async function LlenarComboSedes(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].ID_SEDE + '>' + Rpta[i].NOMBRE_SEDE + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

//Llenar combo para Tipo Habitaciones
async function LlenarComboTipoHabitaciones(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].ID_TIPO_HABITACION + '>' + Rpta[i].TIPO + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

//Llenar combo para Servicios
async function LlenarComboServicios(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].ID_SERVICIO + '>' + Rpta[i].DESCRIPCION + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

async function LlenarComboServiciosAdd(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].ID_HABITACIONES_SERVICIOS + '>' + Rpta[i].DESCRIPCION + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}


//Llenar combo para Reservas
async function LlenarComboReservas(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].ID_RESERVA + '>' + Rpta[i].NOMBRE + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

//Llenar combo para Cliente
async function LlenarComboClientes(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].ID_CLIENTE + '>' + Rpta[i].NOMBRE +" "+ Rpta[i].APELLIDO + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

//Llenar combo para ModoPago
async function LlenarComboXModoPago(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].Codigo_Modo_Pago + '>' + Rpta[i].Metodo_Pago + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

//Llenar combo para ModoPago
async function LlenarComboXPersonal(urlServicio, ComboLlenar) {
    //Invocar el servicio
    try {
        const Respuesta = await fetch(urlServicio,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //En Rpta, está el listado de los elementos del combo
        //Recorrer la lista para agregarla al combo
        for (i = 0; i < Rpta.length; i++) {
            $(ComboLlenar).append('<option value=' + Rpta[i].Documento + '>' + Rpta[i].Nombre + ' ' + Rpta[i].Apellido + '</option>')
        }
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}

