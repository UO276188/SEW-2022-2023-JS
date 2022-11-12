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
        $("#after").after("<h4>Añadiendo titulos...</h4>");
    }
    eliminarH2(){
        $("h2").remove();
    }
    eliminarH3(){
        $("#elim").remove();
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
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode( "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +"> valor: "));
        });
    }
    contarTabla(){
        var nFilas = $("table tr").length;
        var nColumnas = $("table tr:last td").length + 1;
        var msg = "Filas: "+nFilas+" - Columnas: "+nColumnas;
        $("table").after("<h4>" + msg +"</h4>");
    }
}
var botones = new Auxiliar();