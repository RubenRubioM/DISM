function eliminarDatos() {



    var clave = "1234";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/eliminarDatos",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "token": clave
        }
    }

    $.ajax(settings).done(function (response) {

        console.log("Borrado...");

    }); //Fin de la primera petición AJAX
}

function insertarMunicipios(){
    var clave = "1234";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/introducirDatos/municipios",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "token": clave
        }
    }

    $.ajax(settings).done(function (response) {

        console.log("Municipios insertados...");

    }); //Fin de la primera petición AJAX
}


function insertarEstaciones() {
    var clave = "1234";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/introducirDatos/estaciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "token": clave
        }
    }

    $.ajax(settings).done(function (response) {

        console.log("Estaciones insertadas...");

    }); //Fin de la primera petición AJAX
}

function insertarObservaciones() {
    var clave = "1234";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/introducirDatos/observaciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "token": clave
        }
    }

    $.ajax(settings).done(function (response) {

        console.log("Observaciones insertadas...");

    }); //Fin de la primera petición AJAX
}