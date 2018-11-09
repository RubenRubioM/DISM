'use strict';
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
    database : 'dismruben'
});

var allowCrossTokenHeader = (req,res,next)=>{
	res.header("Acces-Control-Allow-Headers","token");
	return next();
};

var auth = (req,res,next)=>{
	if(req.headers.token === "1234"){
		return next();
	}else{
        res.send("Consigue una key para acceder a la API");
		return next(new Error("No dispones de una key apropiada"));
	}
};

//Ejemplo: GET http://localhost:8080/municipios
app.get('/municipios',auth, function(req, resp) {
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
app.get('/municipios/:capital',auth, function(req, resp) {
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
app.get('/estaciones',auth, function(req, resp) {
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
app.get('/observaciones',auth, function(req, resp) {
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
app.get('/observaciones/:idema',auth, function(req, resp) {
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
app.get('/introducirDatos/:tipo',auth, (req,resp)=>{
    //tipo = {municipios,estaciones,observaciones}
    if(req.params.tipo=="municipios"){
        insertarMunicipios(resp);    
    }else if(req.params.tipo=="estaciones"){
        insertarEstaciones(resp);
    }else if(req.params.tipo=="observaciones"){
        insertarObservaciones(resp);
    }
    
});

//Ejemplo: GET hhtp://localhost:8080/eliminarDatos
app.get('/eliminarDatos',auth, (req,resp)=>{
    connection.query("DELETE FROM municipios");
    connection.query("DELETE FROM estaciones");
    connection.query("DELETE FROM observaciones");

    resp.status(200);
    resp.send({message:"Todos los datos han sido eliminados"});
})

function insertarMunicipios(resp){
    var datos;
    var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydWJlbnNpcGFsYUBnbWFpbC5jb20iLCJqdGkiOiIwYzI0ZDVlMC1jODM0LTQ5YjAtYjQ3My02OWE0MDAzZWU4OGIiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTUzNzE5OTE3NCwidXNlcklkIjoiMGMyNGQ1ZTAtYzgzNC00OWIwLWI0NzMtNjlhNDAwM2VlODhiIiwicm9sZSI6IiJ9.mVgNwU7E9xeMUbmZ3yJJNkuCXWR6EibEbj9WebDySCs';
    

    var peti = new XMLHttpRequest();
    peti.open("GET","https://opendata.aemet.es/opendata/api/maestro/municipios?api_key=" + key,true);
    peti.setRequestHeader("cache-control", "no-cache");


    peti.onload = function(){
        connection.query("DELETE FROM municipios");
        datos = JSON.parse(peti.responseText);
        var i = 0;
        
        datos.forEach(element => {
            if(i<10000){

                if(element.latitud!=undefined && element.id_old!=undefined && element.url!=undefined && element.latitud_dec!=undefined && element.altitud!=undefined && element.capital!=undefined && element.num_hab!=undefined && element.zona_comarcal!=undefined && element.destacada!=undefined && element.nombre!=undefined && element.longitud_dec!=undefined && element.id!=undefined && element.longitud!=undefined){

                    let splited = element.latitud.split('"');
                    let latitud = splited[0].concat('\\"');
                    let splited2 = element.longitud.split('"');
                    let longitud = splited2[0].concat('\\"');
                    
                    var sql = `INSERT INTO municipios(latitud,id_old, url, latitud_dec, altitud, capital, num_hab, zona_comarcal, destacada, nombre, longitud_dec, id,longitud) VALUES ("${latitud}", "${element.id_old}","${element.url}","${element.latitud_dec}","${element.altitud}","${element.capital}","${element.num_hab}","${element.zona_comarcal}","${element.destacada}","${element.nombre}","${element.longitud_dec}","${element.id}","${longitud}")`;
                    console.log('Municipio '+i+' introducido...');

                    connection.query(sql, function(err, rows) {
                        if (err) {
                            console.log('Error en /introducirDatos/municipios '+err);
                            //resp.status(500);
                            //resp.send({message: "Error al insertar municipios"});
                
                        }
                        else {
                
                            resp.status(200);
                            //resp.send(rows);
                        }
                    })
                
                    i++;

                }
                
            }
            
        });
    }

    peti.onerror = function(){
        console.log("Vaya que ha pasao aqui...");
    }
    
    peti.send();
}

function insertarEstaciones(resp){
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
                if(i<10000){
                    if(element.latitud!=undefined && element.provincia!=undefined && element.altitud!=undefined && element.indicativo!=undefined && element.nombre!=undefined && element.indsinop!=undefined && element.longitud!=undefined){

                        var sql = `INSERT INTO estaciones(latitud, provincia, altitud, indicativo, nombre, indsinop, longitud) VALUES ("${element.latitud}","${element.provincia}","${element.altitud}","${element.indicativo}","${element.nombre}","${element.indsinop}","${element.longitud}")`;
                        console.log('Estacion '+i+' introducida...');

                        connection.query(sql, function(err, rows) {
                            if (err) {
                                console.log('Error en /introducirDatos/estaciones '+err);
                                resp.status(500);
                                resp.send({message: "Error al insertar estaciones"});
                    
                            }
                            else {
                    
                                resp.status(200);
                                //resp.send(rows);
                            }
                        })
                    
                        i++;

                    }
                    
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
    //peti.setRequestHeader("cache-control", "no-cache");
    peti.send();
}

function insertarObservaciones(resp){
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
                if(i<10000){

                    if(element.idema!=undefined && element.lon!=undefined && element.fint!=undefined && element.prec!=undefined && element.alt!=undefined && element.vmax!=undefined && element.vv!=undefined && element.dv!=undefined && element.lat!=undefined && element.dmax!=undefined && element.ubi!=undefined && element.hr!=undefined && element.tamin!=undefined && element.ta!=undefined && element.tamax!=undefined && element.tpr!=undefined && element.rviento!=undefined){
                        
                        
                        var sql = `INSERT INTO observaciones(idema, lon, fint, prec, alt, vmax, vv,dv,lat,dmax,ubi,hr,tamin,ta,tamax,tpr,rviento) VALUES ("${element.idema}","${element.lon}","${element.fint}","${element.prec}","${element.alt}","${element.vmax}","${element.vv}","${element.dv}","${element.lat}","${element.dmax}","${element.ubi}","${element.hr}","${element.tamin}","${element.ta}","${element.tamax}","${element.tpr}","${element.rviento}")`;
                        console.log('Observacion '+i+' introducida...');

                        connection.query(sql, function(err, rows) {
                            if (err) {
                                console.log('Error en /introducirDatos/observaciones '+err);
                                resp.status(500);
                                resp.send({message: "Error al insertar observaciones"});
                    
                            }
                            else {
                    
                                resp.status(200);
                                //resp.send(rows);
                            }
                        })
                    
                        i++;
                    }
                    
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