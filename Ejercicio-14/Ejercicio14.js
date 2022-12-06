class Mapa {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this),this.getErrores.bind(this)); 
        
    }

    getPosition(position){
        this.longitud         = position.coords.longitude; 
        console.log(this.longitud);
        this.latitud          = position.coords.latitude;  
        console.log(this.latitud);
    }

    getErrores(error){
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("El usuario no permite la petición de geolocalización")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Información de geolocalización no disponible")
                break;
            case error.TIMEOUT:
                alert("La petición de geolocalización ha caducado")
                break;
            case error.UNKNOWN_ERROR:
                alert("Se ha producido un error desconocido")
                break;
        }
    }

    initMap(files) {
        var posicionActual = new google.maps.LatLng(this.latitud, this.longitud);
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function(){
            var datos = reader.result;
            var map = new google.maps.Map(document.querySelector("body > main"), {
                center: posicionActual,
                zoom: 10,
                mapTypeId: 'terrain'
            });

            //printea un marcador con la posicion actual
            new google.maps.Marker({
                position: posicionActual,
                map,
                title: "Ubicación actual",
                icon: {
                    url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                }
            });

            $('Placemark',datos).each(
                function(){
                    var punto = $('Point',this);
                    var coord = $('coordinates', punto).text().split(',');
                    var title = $('name', this).text();
                    var latitud = Number(coord[1]);
                    var longitud = Number(coord[0]);
                    
                    var myLatLng = { lat: latitud, lng: longitud };
                    
                    new google.maps.Marker({
                        position: myLatLng,
                        map,
                        title: title,
                        icon: {
                            url: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png"
                        }
                    });
        });
        }
        if (file){
            reader.readAsText(file); 
        }

        $("main").after("<input type=\"button\"  value=\"Ver en pantalla completa\" onclick=\"mapa.pantallaCompleta()\" />");
    }


    pantallaCompleta() {
        var element = document.querySelector("body");

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

   
}

var mapa = new Mapa()