var meteo = new Object();
meteo.apikey = "06935fba7ca18593cf4109ba94e04f88";
//meteo.ciudad = "Avilés";
meteo.unidades = "&units=metric";
meteo.idioma = "&lang=es";
//meteo.url = "http://api.openweathermap.org/data/2.5/weather?q=" + meteo.ciudad + meteo.unidades + meteo.idioma + "&APPID=" + meteo.apikey;
meteo.error = "<h2>¡problemas! No puedo obtener información de <a href='https://openweathermap.org'>OpenWeatherMap</a></h2>";
meteo.cargarDatos = function(){
    var city = $("select").val();
    meteo.ciudad = city;
    meteo.url = "https://api.openweathermap.org/data/2.5/weather?q=" + meteo.ciudad + meteo.unidades + meteo.idioma + "&APPID=" + meteo.apikey;
    $.ajax({
        dataType: "json",
        url: meteo.url,
        method: 'GET',
        success: function(data){
            meteo.datos = data;
            meteo.verDatos();            
        },
        error:function(){
            document.write(meteo.error);    
        }
    });
}

meteo.verDatos = function(){
    $("section").remove();
    var stringDatos = "<section>"
    stringDatos += "<h2>" + meteo.datos.name + ", "+  meteo.datos.sys.country + "</h2>";
    stringDatos += "<img src=https://openweathermap.org/img/w/" + meteo.datos.weather[0].icon + ".png alt=" + meteo.datos.weather[0].description+ "\"/>";
    stringDatos += "<p>Fecha: " + new Date(meteo.datos.dt *1000).toLocaleDateString() + ", " + new Date(meteo.datos.dt *1000).toLocaleTimeString() + "</p>";
    stringDatos += "<p>Tiempo: " + meteo.datos.weather[0].description + "</p>";
    stringDatos += "<p>Coordenadas:</p>";
    stringDatos += "<ul><li>Latitud: " + meteo.datos.coord.lat + " grados</li>";
    stringDatos += "<li>Longitud: " + meteo.datos.coord.lon + " grados</li></ul>";
    stringDatos += "<p>Amanecer: " + new Date(meteo.datos.sys.sunrise *1000).toLocaleTimeString() + "h</p>"; 
    stringDatos += "<p>Atardecer: " + new Date(meteo.datos.sys.sunset *1000).toLocaleTimeString() + "h</p>";
    stringDatos += "<p>Temperatura: " + meteo.datos.main.temp + " grados Celsius</p>";
    stringDatos += "<ul><li>Temperatura máxima: " + meteo.datos.main.temp_max + " grados Celsius</li>";
    stringDatos += "<li>Temperatura mínima: " + meteo.datos.main.temp_min + " grados Celsius</li>";
    stringDatos += "<li>Sensación térmica: " + meteo.datos.main.feels_like + " grados Celsius</li></ul>";
    stringDatos += "<p>Presión: " + meteo.datos.main.pressure + " milímetros</p>";
    stringDatos += "<p>Humedad: " + meteo.datos.main.humidity + "%</p>"; 
    stringDatos += "<p>Viento:</p>";
    stringDatos += "<ul><li>Dirección del viento: " + meteo.datos.wind.deg + "  grados</li>";
    stringDatos += "<li>Velocidad del viento: " + meteo.datos.wind.speed + " metros/segundo</li></ul>";
    stringDatos += "<p>Visibilidad: " + meteo.datos.visibility + " metros</p>";
    stringDatos += "<p>Nubosidad: " + meteo.datos.clouds.all + " %</p>";
    stringDatos += "</section>";
    $("button").after(stringDatos);
};