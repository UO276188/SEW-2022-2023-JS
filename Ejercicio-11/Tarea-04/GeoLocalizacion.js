var mapaDinamicoGoogle = new Object();
function initMap(){
    
    var aviles = {lat: 43.5547300, lng: -5.9248300};
    var mapaAviles = new google.maps.Map( document.querySelector('body > main'),{zoom: 15,center:aviles});
    var marcador = new google.maps.Marker({position:aviles,map:mapaAviles});
}
mapaDinamicoGoogle.initMap = initMap;