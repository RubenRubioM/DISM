$(document).on("pagecreate", "#mapaEstaciones", function (event) {
    inicioMapaEstaciones();
});

function inicioMapaEstaciones() {

    var datos;
    var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWJlbnNpcGFsYUBnbWFpbC5jb20iLCJqdGkiOiIwYzI0ZDVlMC1jODM0LTQ5YjAtYjQ3My02OWE0MDAzZWU4OGIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTUzNzE5OTE3NCwidXNlcklkIjoiMGMyNGQ1ZTAtYzgzNC00OWIwLWI0NzMtNjlhNDAwM2VlODhiIiwicm9sZSI6IiJ9.mVgNwU7E9xeMUbmZ3yJJNkuCXWR6EibEbj9WebDySCs';
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones?api_key=" + key,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'AqphJZdvgCLdhp_ajUuuROok1O3_jHlHE0_FLN-o1STbqzYnTeGjchdE-0Nwp41N'
    });

    $.ajax(settings).done(function (response) {

        /*
            Esta primera peticion ajax nos devuelve este body
            {
              "descripcion": "exito",
              "estado": 200,
              "datos": "https://opendata.aemet.es/opendata/sh/651d566d",
              "metadatos": "https://opendata.aemet.es/opendata/sh/0556af7a"
            }
 
            Con lo cual volveremos a hacer otra petición al valor "datos"
        */


        $.ajax(response.datos).done((response) => {
            /*
                Esta segunda peticion nos devuelve este body (ejemplo)
                {
                  "latitud" : "431825N",  (array de 6)
                  "provincia" : "A CORUÑA",
                  "altitud" : "98",
                  "indicativo" : "1387E",
                  "nombre" : "A CORUÑA AEROPUERTO",
                  "indsinop" : "08002",
                  "longitud" : "082219W"
                }

                N = +
                S = -
                E = +
                W = -
            */


            
            var i = 1;

            datos = JSON.parse(response);

            
            

            datos.forEach(function (entry) {

                // Hay que pasar las coordenadas de grados a numeros, pero no se como se hace
                

                var loc = new Microsoft.Maps.Location(hexToDec(entry.latitud), hexToDec(entry.longitud));
                var pushpin = new Microsoft.Maps.Pushpin(loc, {
                    icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
                    text: `${i}`
                });
                map.entities.push(pushpin);
               
                i++;
                map.setView({ center: loc, zoom: 5 });
            })

            

            
        }); //Fin de la segunda petición AJAX



    }); //Fin de la primera petición AJAX
}

function hexToDec(hex) {

    var segundos = ((hex.charAt(4) + hex.charAt(5)) / 60).toString().split(".")[1];
    var minutos = (((hex.charAt(2) + hex.charAt(3)) + "." + segundos) / 60).toString().split(".")[1];
    var decimal = hex.charAt(0) + hex.charAt(1) + "." + minutos;
    if (hex.charAt(6) == "S" || hex.charAt(6) == "W") {
        decimal *= -1;
    }

    return decimal;
}