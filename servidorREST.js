
var express = require("express");
var mysql = require('mysql');
var app = express();
var bp = require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(bp.json());
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : '3311',
    database : 'dism'
});
//Ejemplo: GET http://localhost:8080/municipios
app.get('/municipios', function(req, resp) {
    connection.query('select * from municipios', function(err, rows) {
        if (err) {
            console.log('Error en /municipios '+err);
            resp.status(500);
            resp.send({message: "Error al obtener municipios"});

        }
        else {
            console.log('/munipios');

            resp.status(200);
            resp.send(rows);
        }
    })
});

//Ejemplo: GET http://localhost:8080/municipios/:capital
app.get('/municipios/:capital', function(req, resp) {
    connection.query(`select * from municipios where capital="${req.params.capital}"`, function(err, rows) {
        if (err) {
            console.log('Error en /municipios '+err);
            resp.status(500);
            resp.send({message: "Error al obtener municipios"});

        }
        else {
            console.log('/munipios');

            resp.status(200);
            resp.send(rows);
        }
    })
});

//Ejemplo: GET http://localhost:8080/estaciones
app.get('/estaciones', function(req, resp) {
    connection.query('select * from estaciones', function(err, rows) {
        if (err) {
            console.log('Error en /estaciones '+err);
            resp.status(500);
            resp.send({message: "Error al obtener estaciones"});

        }
        else {
            console.log('/estaciones');

            resp.status(200);
            resp.send(rows);
        }
    })
});

//Ejemplo: GET http://localhost:8080/observaciones
app.get('/observaciones', function(req, resp) {
    connection.query('select * from observaciones', function(err, rows) {
        if (err) {
            console.log('Error en /observaciones '+err);
            resp.status(500);
            resp.send({message: "Error al obtener observaciones"});

        }
        else {
            console.log('/observaciones');

            resp.status(200);
            resp.send(rows);
        }
    })
});

//Ejemplo: GET http://localhost:8080/observaciones/idema
app.get('/observaciones/:idema', function(req, resp) {
    connection.query(`select * from observaciones where idema="${req.params.idema}"`, function(err, rows) {
        if (err) {
            console.log('Error en /observaciones/idema '+err);
            resp.status(500);
            resp.send({message: "Error al obtener observaciones"});

        }
        else {
            console.log('/observaciones/idema');

            resp.status(200);
            resp.send(rows);
        }
    })
});

//Ejemplo: GET http://localhost:8080/introducirDatos/:tipo
app.get('/introducirDatos/:tipo', (req,resp)=>{
    //tipo = {municipios,estaciones,observaciones}
    if(req.params.tipo=="municipios"){
        insertarMunicipios();    
    }else if(req.params.tipo=="estaciones"){
        insertarEstaciones();
    }else if(req.params.tipo=="observaciones"){
        insertarObservaciones();
    }
    
});

function insertarMunicipios(){
    var datos;
    var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWJlbnNpcGFsYUBnbWFpbC5jb20iLCJqdGkiOiIwYzI0ZDVlMC1jODM0LTQ5YjAtYjQ3My02OWE0MDAzZWU4OGIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTUzNzE5OTE3NCwidXNlcklkIjoiMGMyNGQ1ZTAtYzgzNC00OWIwLWI0NzMtNjlhNDAwM2VlODhiIiwicm9sZSI6IiJ9.mVgNwU7E9xeMUbmZ3yJJNkuCXWR6EibEbj9WebDySCs';
    

    var peti = new XMLHttpRequest();
    peti.open("GET","https://opendata.aemet.es/opendata/api/maestro/municipios?api_key=" + key,true);


    peti.onload = function(){
        connection.query("DELETE FROM municipios");
        datos = JSON.parse(peti.responseText);
        var i = 0;
        
        datos.forEach(element => {
            if(i<10){
                var sql = `INSERT INTO municipios(id_old, url, latitud_dec, altitud, capital, num_hab, zona_comercal, destacada, nombre, longitud_dec, id) VALUES ("${element.id_old}","${element.url}","${element.latitud_dec}","${element.altitud}","${element.capital}","${element.num_hab}","${element.zona_comarcal}","${element.destacada}","${element.nombre}","${element.longitud_dec}","${element.id}")`;

                connection.query(sql, function(err, rows) {
                    if (err) {
                        console.log('Error en /introducirDatos/municipios '+err);
                        resp.status(500);
                        resp.send({message: "Error al insertar municipios"});
            
                    }
                    else {
                        console.log('/insertarDatos/municipios');
            
                        resp.status(200);
                        resp.send(rows);
                    }
                })
               
                i++;
            }
            
        });
    }

    peti.onerror = function(){
        console.log("Vaya que ha pasao aqui...");
    }
    peti.setRequestHeader("cache-control", "no-cache");
    peti.send();
}

function insertarEstaciones(){
    var datos;
    var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWJlbnNpcGFsYUBnbWFpbC5jb20iLCJqdGkiOiIwYzI0ZDVlMC1jODM0LTQ5YjAtYjQ3My02OWE0MDAzZWU4OGIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTUzNzE5OTE3NCwidXNlcklkIjoiMGMyNGQ1ZTAtYzgzNC00OWIwLWI0NzMtNjlhNDAwM2VlODhiIiwicm9sZSI6IiJ9.mVgNwU7E9xeMUbmZ3yJJNkuCXWR6EibEbj9WebDySCs';
    

    var peti = new XMLHttpRequest();
    peti.open("GET","https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones?api_key=" + key,true);


    peti.onload = function(){
        var peti2 = new XMLHttpRequest();
        var url = JSON.parse(peti.responseText).datos
        peti2.open("GET",url,true);

        peti2.onload = function(){
            datos = JSON.parse(peti2.responseText)
            connection.query("DELETE FROM estaciones");
       
            var i = 0;
            
            datos.forEach(element => {
                if(i<10){
                    var sql = `INSERT INTO estaciones(latitud, provincia, altitud, indicativo, nombre, indsinop, longitud) VALUES ("${element.latitud}","${element.provincia}","${element.altitud}","${element.indicativo}","${element.nombre}","${element.indsinop}","${element.longitud}")`;

                    connection.query(sql, function(err, rows) {
                        if (err) {
                            console.log('Error en /introducirDatos/estaciones '+err);
                            resp.status(500);
                            resp.send({message: "Error al insertar estaciones"});
                
                        }
                        else {
                            console.log('/insertarDatos/estaciones');
                
                            resp.status(200);
                            resp.send(rows);
                        }
                    })
                
                    i++;
                }
                
            });
        }

        peti2.onerror = function(){
            console.log("Vaya que ha pasao aqui...");
        }
        
        peti2.send();
    }

    peti.onerror = function(){
        console.log("Vaya que ha pasao aqui...");
    }
    peti.setRequestHeader("cache-control", "no-cache");
    peti.send();
}

function insertarObservaciones(){
    var datos;
    var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWJlbnNpcGFsYUBnbWFpbC5jb20iLCJqdGkiOiIwYzI0ZDVlMC1jODM0LTQ5YjAtYjQ3My02OWE0MDAzZWU4OGIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTUzNzE5OTE3NCwidXNlcklkIjoiMGMyNGQ1ZTAtYzgzNC00OWIwLWI0NzMtNjlhNDAwM2VlODhiIiwicm9sZSI6IiJ9.mVgNwU7E9xeMUbmZ3yJJNkuCXWR6EibEbj9WebDySCs';
    

    var peti = new XMLHttpRequest();
    peti.open("GET","https://opendata.aemet.es/opendata/api/observacion/convencional/todas?api_key="+key,true);


    peti.onload = function(){
        var peti2 = new XMLHttpRequest();
        var url = JSON.parse(peti.responseText).datos
        peti2.open("GET",url,true);

        peti2.onload = function(){
            datos = JSON.parse(peti2.responseText);
            connection.query("DELETE FROM observaciones");
       
            var i = 0;
            
            datos.forEach(element => {
                if(i<10){
                    var sql = `INSERT INTO estaciones(idema, lon, fint, prec, alt, vmax, vv,dv,lat,dmax,ubi,hr,tamin,ta,tamax,tpr,rviento) VALUES ("${element.idema}","${element.lon}","${element.altitud}","${element.fint}","${element.prec}","${element.alt}","${element.vmax}","${element.vv}","${element.dv}","${element.lat}","${element.dmax}","${element.ubi}","${element.hr}","${element.tamin}","${element.ta}","${element.tamax}","${element.tpr}","${element.rviento}")`;

                    connection.query(sql, function(err, rows) {
                        if (err) {
                            console.log('Error en /introducirDatos/estaciones '+err);
                            resp.status(500);
                            resp.send({message: "Error al insertar estaciones"});
                
                        }
                        else {
                            console.log('/insertarDatos/estaciones');
                
                            resp.status(200);
                            resp.send(rows);
                        }
                    })
                
                    i++;
                }
                
            });
        }

        peti2.onerror = function(){
            console.log("Vaya que ha pasao aqui...");
        }
        
        peti2.send();
       
    }

    peti.onerror = function(){
        console.log("Vaya que ha pasao aqui...");
    }
    peti.setRequestHeader("cache-control", "no-cache");
    peti.send();
}
var server = app.listen(8080, function () {
    console.log('Servidor iniciado en puerto 8080...');
});