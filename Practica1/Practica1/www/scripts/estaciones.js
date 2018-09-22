
//Se llama al iniciar la aplicación
function inicioEstaciones() {
    
    var datos;
    var datosfiltrados = [];
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
    $(document).on("pagecreate", "#estaciones", function (event) {
        InicializarGrid();
    });
    function InicializarGrid() {

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
            var j = 0;

            $.ajax(response.datos).done((response) => {
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
                datos = JSON.parse(response);

                datos.forEach(function (entry) {
                    datosfiltrados[j] = entry;
                    j = j + 1;
                });
                tabla = $('#dataGrid').DataTable({
                    
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
                            "data": "indsinop"
                        },
                        {
                            "defaultContent": `<button onclick='prueba(this.parentElement.parentElement);'>Info</button>`
                        }
                    ],
                    
                });

                

               

            }); //Fin de la segunda petición AJAX
            
            

        }); //Fin de la primera petición AJAX
    }

    
}



function prueba(e) {
    console.log(e);
}

function prueba2() {
    console.log('uwu');
}