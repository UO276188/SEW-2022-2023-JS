var oro = new Object();

oro.error = "<h2>¡Problemas! No puedo obtener información de <a href='https://metals-api.com'>Metals-Api</a></h2>";



oro.cargarDatos = function(){
    // set endpoint and your access key
    endpoint = 'latest'
    access_key = 'z35bujfb27epxi73bt7bqwsy73be3mmg3pkwmejbdn66f85r32pnuh82dioi';
    base = 'XAU';
    symbols = $("select").val();
    oro.currency = symbols;

    // get the most recent exchange rates via the "latest" endpoint:
    $.ajax({
        url: 'https://metals-api.com/api/' + endpoint + '?access_key=' + access_key + '&base=' + base + '&symbols=' + symbols ,  
        dataType: 'json',
        success: function(json) {
            oro.datos = json;
            oro.verDatos();
        }, 
        error:function(){
            document.write(oro.error);    
        }
    });

}

oro.verDatos = function(){
    var rates = oro.datos.rates;
    var rate = "";
    for (var i in rates){
        rate = rates[i];
    }

    $("section").remove();
    var stringDatos = "<section>"
    stringDatos += "<h2>Precio del oro en " + oro.currency + "</h2>";
    stringDatos += "<p>Fecha: " + new Date(oro.datos.timestamp *1000).toLocaleDateString() + ", " + new Date(oro.datos.timestamp *1000).toLocaleTimeString() + "</p>";
    stringDatos += "<p>Precio por onza = " + rate +  "</p>";
    stringDatos += "<p>Precio por kilo = " + rate*35,274 +  "</p>";
    stringDatos += "</section>";
    $("button").after(stringDatos);
    
}