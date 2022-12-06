var meteo = new Object();
meteo.apikey = "06935fba7ca18593cf4109ba94e04f88";
meteo.unidades = "&units=metric";
meteo.tipo = "&mode=xml";
meteo.idioma = "&lang=es";
meteo.error = "<h2>¡problemas! No puedo obtener información de <a href='https://openweathermap.org'>OpenWeatherMap</a></h2>";
meteo.cargarDatos = function(){
    var city = $("select").val();
    meteo.ciudad = city;
    meteo.url = "https://api.openweathermap.org/data/2.5/weather?q=" + meteo.ciudad +meteo.tipo+ meteo.unidades + meteo.idioma + "&APPID=" + meteo.apikey;
    $.ajax({
        dataType: "xml",
        url: meteo.url,
        method: 'GET',
        success: function(datos){
            meteo.datos = datos;
            meteo.extraerDatos(datos);
            meteo.verDatos();            
        },
        error:function(){
            document.write(meteo.error);    
        }
    });
}
meteo.extraerDatos = function(datos){
    meteo.name        = $('city',datos).attr("name");
    meteo.datos.pais = $('country',datos).text();
    meteo.datos.icon = $('weather',datos).attr("icon");
    meteo.datos.lon = $('coord',datos).attr("lon");
    meteo.datos.lat = $('coord',datos).attr("lat");
   
    var amanecer              = $('sun',datos).attr("rise");
    var minutosZonaHoraria    = new Date().getTimezoneOffset();
    meteo.datos.sunrise   = Date.parse(amanecer);
    meteo.datos.sunrise  -= minutosZonaHoraria * 60 * 1000;
    var oscurecer             = $('sun',datos).attr("set");          
    meteo.datos.sunset = Date.parse(oscurecer);
    meteo.datos.sunset  -= minutosZonaHoraria * 60 * 1000;
    meteo.datos.temp           = $('temperature',datos).attr("value");
    meteo.datos.temp_min        = $('temperature',datos).attr("min");
    meteo.datos.temp_max        = $('temperature',datos).attr("max");
    meteo.datos.feels_like = $('feels_like',datos).attr("value");
    meteo.datos.temperaturaUnit       = $('temperature',datos).attr("unit");
    meteo.datos.humidity               = $('humidity',datos).attr("value");
    meteo.datos.humedadUnit           = $('humidity',datos).attr("unit");
    meteo.datos.pressure = $('pressure',datos).attr("value");
    meteo.datos.presionUnit  = $('pressure',datos).attr("unit");
    meteo.datos.speed = $('speed',datos).attr("value");
    meteo.datos.viento  = $('speed',datos).attr("name");
    meteo.datos.deg = $('direction',datos).attr("value");
    meteo.datos.codigoViento = $('direction',datos).attr("code");
    meteo.datos.nombreDireccionViento = $('direction',datos).attr("name");
    meteo.datos.nubosidad = $('clouds',datos).attr("value");
    meteo.datos.nombreNubosidad = $('clouds',datos).attr("name");
    meteo.datos.visibility         = $('visibility',datos).attr("value");
    meteo.datos.precipitacionValue    = $('precipitation',datos).attr("value");
    meteo.datos.precipitacionMode     = $('precipitation',datos).attr("mode");
    meteo.datos.description = $('weather',datos).attr("value");
    var horaMedida            = $('lastupdate',datos).attr("value");
    meteo.datos.dt = Date.parse(horaMedida);
    meteo.datos.dt -= minutosZonaHoraria * 60 * 1000;
}
meteo.verDatos = function(){
    $("section").remove();
    
    var stringDatos = "<section>"
    stringDatos += "<h2>" + meteo.name + ", "+  meteo.datos.pais + "</h2>";
    var alt = meteo.datos.description;
    alt = alt.replace(/\s+/g,"_");
    stringDatos += "<img src=https://openweathermap.org/img/w/" + meteo.datos.icon + ".png alt=" + "\"" + alt + "\"" + "/>";
    stringDatos += "<p>Fecha: " + new Date(meteo.datos.dt).toLocaleDateString("es-ES") + ", " + new Date(meteo.datos.dt).toLocaleTimeString("es-ES") + "</p>";
    stringDatos += "<p>Tiempo: " + meteo.datos.description + "</p>";
    stringDatos += "<p>Coordenadas:</p>";
    stringDatos += "<ul><li>Latitud: " + meteo.datos.lat + " grados</li>";
    stringDatos += "<li>Longitud: " + meteo.datos.lon + " grados</li></ul>";
    stringDatos += "<p>Amanecer: " + new Date(meteo.datos.sunrise).toLocaleTimeString("es-ES") + "h</p>"; 
    stringDatos += "<p>Atardecer: " + new Date(meteo.datos.sunset).toLocaleTimeString("es-ES") + "h</p>";
    stringDatos += "<p>Temperatura: " + meteo.datos.temp + " "+meteo.datos.temperaturaUnit+"</p>";
    stringDatos += "<ul><li>Temperatura máxima: " + meteo.datos.temp_max + " " + meteo.datos.temperaturaUnit+"</li>";
    stringDatos += "<li>Temperatura mínima: " + meteo.datos.temp_min + " " + meteo.datos.temperaturaUnit+"</li>";
    stringDatos += "<li>Sensación térmica: " + meteo.datos.feels_like + " " + meteo.datos.temperaturaUnit+"</li></ul>";
    stringDatos += "<p>Presión: " + meteo.datos.pressure + " "+ meteo.datos.presionUnit+ "</p>";
    stringDatos += "<p>Humedad: " + meteo.datos.humidity + " " + meteo.datos.humedadUnit +"</p>"; 
    
    stringDatos += "<p>Viento: "+ meteo.datos.viento + ", " + meteo.datos.codigoViento + "</p>";
    stringDatos += "<ul><li>Dirección del viento: " + meteo.datos.deg + "  grados</li>";
    stringDatos += "<li>Velocidad del viento: " + meteo.datos.speed + " metros/segundo</li>";
    stringDatos += "<li>Nombre de la dirección del viento: " +meteo.datos.nombreDireccionViento + "</li></ul>";
    
    stringDatos += "<p>Precipitaciones: " + meteo.datos.precipitacionValue + ", " + meteo.datos.precipitacionMode + "</p>";

    stringDatos += "<p>Visibilidad: " + meteo.datos.visibility + " metros</p>";
    stringDatos += "<p>Nubosidad: " + meteo.datos.nubosidad + ", "+meteo.datos.nombreNubosidad + "</p>";
    stringDatos += "</section>";
    
    $("button").after(stringDatos);
};