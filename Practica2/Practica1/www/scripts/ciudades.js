$(document).on("pagecreate", "#ciudades", function (event) {
    inicioCiudades();
});

function inicioCiudades() {
    
    var datos;
    var datosfiltrados = [];
    var clave = "1234";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/municipios",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "token": clave
        }
    }

    $.ajax(settings).done(function (response) {


        var j = 0;
        datos = response;

        //datos.forEach(function (entry) {
        //    if (entry.num_hab > 50000) {
        //        datosfiltrados[j] = entry;
        //        j = j + 1;
        //    }

        //});
        tabla = $('#dataGrid2').DataTable({

            "data": datos,
            responsive:true,
            "columns":
            [
                {
                    "data": "nombre"
                },
                {
                    "data": "latitud_dec"
                },
                {
                    "data": "longitud_dec"
                },
                {
                    "data": "num_hab"
                }

            ],

        });



    }); //Fin de la primera petición AJAX
}
