$(document).on("pagecreate", "#mapaEstaciones", function (event) {
    inicioMapaEstaciones();
});

var infobox;
function inicioMapaEstaciones() {

    var datos;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/estaciones",
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

        datos = response;


        //Create an infobox at the center of the map but don't show it.
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });

        infobox.setMap(map);

        datos.forEach(function (entry) {

            // Hay que pasar las coordenadas de grados a numeros, pero no se como se hace
            var loc = new Microsoft.Maps.Location(hexToDec(entry.latitud), hexToDec(entry.longitud));
            var pushpin = new Microsoft.Maps.Pushpin(loc, {
                icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
                text: `${i}`
            });

            pushpin.metadata = {
                title: `${entry.nombre}`,
                description: `${entry.altitud}`
            }

            Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
            map.entities.push(pushpin);

            i++;
            map.setView({ center: loc, zoom: 4 });
        })



    }); //Fin de la primera petición AJAX
}

function pushpinClicked(e) {
    console.log(e.target.getLocation());
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: `Altitdu: ${e.target.metadata.description}`,
            visible: true
        });
    }
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