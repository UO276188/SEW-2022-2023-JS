class Archivos {

    validarNavegador(){
        if (!(window.File && window.FileReader && window.FileList && window.Blob))
        {  
            alert("¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!");
        }
            
    }

    procesarArchivos(files){
        var archivo = files[0];
        var tipoArchivo = /.*\/(json|plain|xml)/;
        if (archivo.type.match(tipoArchivo)) {
            var lector = new FileReader();
                            
            lector.onload = function (evento) {
                var dataArchivo = "<h2>" + archivo.name +"</h2>";
                dataArchivo += "<p>Tamaño: " + archivo.size + " bytes</p>"
                dataArchivo += "<p>Tipo: " + archivo.type + "</p>"
                dataArchivo += "<p>Fecha de última modificación: " + archivo.lastModifiedDate + "</p>"
                dataArchivo +="<p>Contenido del archivo:</p>"
                dataArchivo +="<pre> <code>"
                dataArchivo += lector.result
                dataArchivo += "</code> </pre>";

                document.querySelector("body > main").innerHTML = dataArchivo;
            }
            
            lector.readAsText(archivo);
        } 
        else{
            document.querySelector("body > main").innerHTML = "<p>Error: Archivo no válido</p>";
        }
    }

}
var archivos = new Archivos();