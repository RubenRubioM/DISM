var tabla2;
$(document).on("pagecreate", "#datos", function (event) {
    todasLasEstaciones();
});

function todasLasEstaciones() {



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

    $.ajax(settings).done(function (response) {



            /*
                Esta segunda peticion nos devuelve este body
                [ {
                  "latitud" : "431825N",
                  "provincia" : "A CORUÑA",
                  "altitud" : "98",
                  "indicativo" : "1387E",
                  "nombre" : "A CORUÑA AEROPUERTO",
                  "indsinop" : "08002",
                  "longitud" : "082219W"
                }
            */
        datos = response;

        tabla = $('#dataGrid3').DataTable({

            "data": datos,
            responsive: false,
            retrieve: true,
            deferRender: true,
            scrollY: 500,
            scrollX: true,
            scrollCollapse: true,
            scroller: true,
            "columns":
            [
                {
                    "data": "nombre"
                },
                {
                    "data": "indicativo"
                },
                {
                    "defaultContent": `<button class="ui-btn ui-corner-all" name="info" onclick='busqueda(this);'>Ultimos datos</button>`
                }
            ],

        });



    }); //Fin de la primera petición AJAX


}

// key: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWJlbnNpcGFsYUBnbWFpbC5jb20iLCJqdGkiOiIwYzI0ZDVlMC1jODM0LTQ5YjAtYjQ3My02OWE0MDAzZWU4OGIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTUzNzE5OTE3NCwidXNlcklkIjoiMGMyNGQ1ZTAtYzgzNC00OWIwLWI0NzMtNjlhNDAwM2VlODhiIiwicm9sZSI6IiJ9.mVgNwU7E9xeMUbmZ3yJJNkuCXWR6EibEbj9WebDySCs

//Funcion llamada al dar click en el boton
function busqueda(e) {
    document.getElementById('mensaje-modal').style.display = 'block';
    var idema = e.parentNode.parentNode.children[1].innerHTML;
    var nombre = e.parentNode.parentNode.children[0].innerHTML
    document.getElementById('idemaOutput').innerHTML = idema;
    document.getElementById('nombreOutput').innerHTML = nombre;
    console.log(idema);
    var datos;
   
    settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/observaciones/"+idema,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    console.log(settings.url);
    $.ajax(settings).done(function (response) {

        

        datos = response;
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

        tabla2 = $('#dataGrid4').DataTable({
            
            retrieve: true,  
            "data": datos,
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
        
        
    });

    
}

function cerrarModalDatos() {
    document.getElementById('mensaje-modal').style.display = 'none';
    tabla2.destroy();
}