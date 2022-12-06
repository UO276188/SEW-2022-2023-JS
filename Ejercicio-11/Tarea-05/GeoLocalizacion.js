class Mapa {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this),this.getErrores.bind(this)); 
        
    }

    getPosition(position){
        this.longitud         = position.coords.longitude; 
        this.latitud          = position.coords.latitude;  

        this.dibujarMapa();
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
        var centro = {lat: this.latitud, lng: this.longitud};
        var mapaGeoposicionado = new google.maps.Map( document.querySelector('body > main'),
        {
            zoom: 12,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        var infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(centro);
        infoWindow.setContent("Estas aquí");
        infoWindow.open(mapaGeoposicionado);

    }
}

var mapa = new Mapa()