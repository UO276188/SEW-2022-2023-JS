class Auxiliar{
    constructor () {   
    }
    mostrar(){
        $("p").show();
    }
    ocultar(){
        $("p").hide();
    } 
    añadir(){
        $("h3").first().after("<h4>Añadiendo titulos...</h4>");
    }
    eliminarH2(){
        $("h2").remove();
    }
    eliminarP(){
        $("p").last().remove();
    }
    modificarTitulo(){
        $("h1").text("Hemos modificado el titulo 1");
    }
    fotoLibro(){
        $("img").attr("src", "media/libro.png");
        $("img").attr("alt", "Libro");
    }
    fotoArbol(){
        $("img").attr("src", "media/arbol.png");
        $("img").attr("alt", "Árbol");
    }
    recorrer(){
        $("section").remove();
        var stringDatos = "<section>";
        stringDatos += "<h2>Elementos recorridos:</h2>";
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            var etiquetaActual = $(this).get(0).tagName;
            var valorEtiquetaActual = $(this).get(0).textContent;
            stringDatos += "<p>Etiqueta padre : "  + etiquetaPadre + " elemento : " +  etiquetaActual + " valor: " + valorEtiquetaActual + "<p>";
        });
        stringDatos += "</section>";
        $("form").before(stringDatos);
    }
    contarTabla(){
        var nFilas = $("table tr").length;
        var nColumnas = $("table tr:last td").length + 1;
        var msg = "Filas: "+nFilas+" - Columnas: "+nColumnas;
        $("table").after("<h4>" + msg +"</h4>");
    }
}
var botones = new Auxiliar();