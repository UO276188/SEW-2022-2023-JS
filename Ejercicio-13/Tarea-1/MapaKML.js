"use strict";
class MapaKML{
    
    constructor(){
        this.arch = "";
    }

    validarNavegador(){
        if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
            //alert("Este navegador soporta el API File");
            
        }
            else alert("¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!");
    }


    initMap(files) {
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function(){
            var datos = reader.result;
            //Crear un mapa de Google maps
            var map = new google.maps.Map(document.querySelector("body > main"), {
                center: new google.maps.LatLng(43.35633712649931, -5.851226040799346), //Centro=EII
                zoom: 10,
                mapTypeId: 'terrain'
            });

            var placemarks= $('Placemark',datos).each(
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
                    });
        });
        }
        if (file){
            reader.readAsText(file); 
        }
    }

}

var archivos = new MapaKML()