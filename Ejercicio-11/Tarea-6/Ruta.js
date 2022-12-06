class Mapa {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this),this.getErrores.bind(this)); 
        
    }

    getPosition(position){
        this.longitud         = position.coords.longitude; 
        this.latitud          = position.coords.latitude;  
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

    dibujarMapa(){
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer(); // 1.Crear el objeto DirectionsRender

        var posicionActual = new google.maps.LatLng(this.latitud, this.longitud);
        
        //Crear el mapa
        var mapOptions = {
            zoom:7,
            center: posicionActual,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.querySelector('body > main'), mapOptions);

        directionsRenderer.setMap(map); //2.Llamar a setMap() para vincularlo al mapa
        directionsRenderer.setPanel(document.querySelector('body > article')); //mostrar instrucciones de como llegar


        //CalcularRuta
        var end = document.querySelector('input[type="text"]').value;
        var selectedMode = document.querySelector('select').value;
        var request = {
            origin: posicionActual,
            destination: end,
            travelMode: google.maps.TravelMode[selectedMode]
        };
        directionsService.route(request, function(result, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(result); //3.Llamar a setDirections(), pasandole el directionsResult
            }
        });

    }
}

var mapa = new Mapa()