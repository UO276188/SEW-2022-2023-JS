"use strict";
class MapaGeoJSON{
    
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

            var inJson = JSON.parse(datos);
            var features = inJson.features;
            for (let i = 0; i<features.length; i++ ){
                var prop = features[i].properties;
                var name = prop.Name;
                var geo = features[i].geometry;
                var coordinates = geo.coordinates;
                var latitud = coordinates[1];
                var longitud = coordinates[0];

                var myLatLng = { lat: latitud, lng: longitud };

                new google.maps.Marker({
                    position: myLatLng,
                    map,
                    title: name,
                });
            }
        }
        if (file){
            reader.readAsText(file); 
        }
    }

}

var archivos = new MapaGeoJSON()