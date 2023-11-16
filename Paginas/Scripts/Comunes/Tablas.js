async function LlenarTablasXServicio(urlServicio, TablaLlenar) {
    //Invocar el servicio que trae la lista con la información para llenar la tabla
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
        //En Rpta, está el listado 
        //Recorrer la lista para llenar la tabla con encabezado y datos
        var Columnas = [];
        NombresColumna = Object.keys(Rpta[0]);
        for (var i in NombresColumna) {
            Columnas.push({
                data: NombresColumna[i],
                title: NombresColumna[i]
            });
        }
        //Llena los datos de la tabla
        $(TablaLlenar).DataTable({
            data: Rpta,
            columns: Columnas,
            destroy: true
        });
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}


