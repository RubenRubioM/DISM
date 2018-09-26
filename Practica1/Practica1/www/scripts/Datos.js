function busqueda() {
    
    var datos;
    var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWJlbnNpcGFsYUBnbWFpbC5jb20iLCJqdGkiOiIwYzI0ZDVlMC1jODM0LTQ5YjAtYjQ3My02OWE0MDAzZWU4OGIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTUzNzE5OTE3NCwidXNlcklkIjoiMGMyNGQ1ZTAtYzgzNC00OWIwLWI0NzMtNjlhNDAwM2VlODhiIiwicm9sZSI6IiJ9.mVgNwU7E9xeMUbmZ3yJJNkuCXWR6EibEbj9WebDySCs';
    var idema = document.getElementById('idema').innerHTML;
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/" + idema + "?api_key=" + key,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    //TODO 
    //Por algun motivo la peticion ajax funciona siempre menos cuando el resultado es correcto
    $.ajax(settings).done( function (response) {
        
        /*  RESPUESTA
            {
              "descripcion" : "exito",
              "estado" : 200,
              "datos" : "https://opendata.aemet.es/opendata/sh/d59fcb02",
              "metadatos" : "https://opendata.aemet.es/opendata/sh/55c2971b"
            }
        */
        
        //200 -> IDEMA correcto
        console.log(response.estado);
        console.log(response);
        if (response.estado == 200) {
            console.log('hay datos');
            $.ajax(response.datos).done(function (response) {

                /*  RESPUESTA
                    {
                        idema: "1387E",
                        lon: -8.371975,
                        fint: "2018-09-25T17:00:00",
                        prec: 0,
                        alt: 98,
                        vmax: 10.3,
                        vv: 5.6,
                        dv: 80,
                        lat: 43.306953,
                        dmax: 80,
                        ubi: "A CORUÑA/ALVEDRO",
                        pres: 1009.4,
                        hr: 47,
                        stdvv: 0.9,
                        ts: 22.8,
                        pres_nmar: 1021.4,
                        tamin: 21.7,
                        ta: 21.8,
                        tamax: 23.5,
                        tpr: 9.9,
                        vis: 30,
                        stddv: 3,
                        inso: 60
                    }
                */


                inicializarTabla();

            });
        }
        
    });

    
}


function inicializarTabla() {
    tabla = $('#dataGrid3').DataTable({

        "data": response,
        "columns":
        [
            {
                "data": "idema"
            },
            {
                "data": "ubi"
            },
            {
                "data": "fint"
            },
            {
                "data": "ta"
            }
        ],

    });
}