$(document).on("pagecreate", "#ciudades", function (event) {
    inicioCiudades();
});


function inicioCiudades() {
    
    var datos;
    var datosfiltrados = [];
    var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWJlbnNpcGFsYUBnbWFpbC5jb20iLCJqdGkiOiIwYzI0ZDVlMC1jODM0LTQ5YjAtYjQ3My02OWE0MDAzZWU4OGIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTUzNzE5OTE3NCwidXNlcklkIjoiMGMyNGQ1ZTAtYzgzNC00OWIwLWI0NzMtNjlhNDAwM2VlODhiIiwicm9sZSI6IiJ9.mVgNwU7E9xeMUbmZ3yJJNkuCXWR6EibEbj9WebDySCs';
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/maestro/municipios?api_key=" + key,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {


        var j = 0;

        datos = JSON.parse(response);

        datos.forEach(function (entry) {
            if (entry.num_hab > 50000) {
                datosfiltrados[j] = entry;
                j = j + 1;
            }

        });
        tabla = $('#dataGrid2').DataTable({

            "data": datosfiltrados,
            "columns":
            [
                {
                    "data": "nombre"
                },
                {
                    "data": "latitud"
                },
                {
                    "data": "longitud"
                },
                {
                    "data": "num_hab"
                }

            ],

        });



    }); //Fin de la primera petición AJAX
}
