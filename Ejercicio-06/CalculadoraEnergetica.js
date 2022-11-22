"use strict";
class PilaLIFO {
    constructor() {
        this.pila = new Array();
    }
    apilar(valor) {
        this.pila.push(valor);
    }

    desapilar() {
        return (this.pila.pop());
    }

    show(){
        var res = "";
        var size = this.size();
        for (var i in this.pila)
            res += size-- + "\t\t" + this.pila[i]+"\n";

        return res;
    } 

    limpiar(){
        var size = this.size();
        for (var i = 0; i < size; i++){
            this.pila.pop();
        }
    }

    size() {
        return this.pila.length;
    }
    
}
class CalculadoraRPN{

    constructor() {
        this.prepantalla = "";
        this.pila = new PilaLIFO();

        document.addEventListener('keydown', this.cargarBotones.bind(this));
    }


    cargarBotones(event){
        if (event.key >= '0' && event.key <= '9') {
            calculadora.digitos(event.key);
        }
        if (event.key === 'Enter') {
            calculadora.enter();
        }
        
        
        if (event.key === '/') {
            calculadora.division();
        }
        if (event.key === '*') {
            calculadora.multiplicacion();
        }
        if (event.key === '-') {
            calculadora.resta();
        }
        if (event.key === '+') {
            calculadora.suma();
        }
        if (event.key === '.') {
            calculadora.punto();
        }
        if (event.code === 'KeyR') {    //R = raiz
            calculadora.raiz();
        }
    
        
        if (event.key === 'Delete') { // Supr
            calculadora.borrar(); //C
        }
        if (event.key === 'Backspace') {
            calculadora.CE();
        }

        if (event.code === 'KeyS') {    //S = seno
            calculadora.sin();
        }
        if (event.code === 'KeyC') {    //C = coseno
            calculadora.cos();
        }
        if (event.code === 'KeyT') {    //T = tangente 
            calculadora.tan();
        }
        if (event.code === 'KeyD') {    //D = arcoseno
            calculadora.arcoSeno();
        }
        if (event.code === 'KeyF') {    //C = arcocoseno
            calculadora.arcoCoseno();
        }
        if (event.code === 'KeyG') {    //G = arcotangente 
            calculadora.arcoTangente();
        }
    }
    
    digitos(n){
        this.prepantalla += n;
        this.mostrarPrePantalla();
    }

    punto(){
        this.prepantalla += ".";
        this.mostrarPrePantalla();
    }


    // OPERACIONES ----------------------------------------------------

    suma(){
        if (this.pila.size() >= 2){
            var op2 = this.pila.desapilar();
            var op1 = this.pila.desapilar();
            var result = parseFloat(op1) + parseFloat(op2);
            this.pila.apilar(result);

            this.mostrarPantalla();
        }        
    }

    resta(){
        if (this.pila.size() >= 2){
            var op2 = this.pila.desapilar();
            var op1 = this.pila.desapilar();
            var result = parseFloat(op1) - parseFloat(op2);
            this.pila.apilar(result);

            this.mostrarPantalla();
        }        
    }

    multiplicacion(){
        if (this.pila.size() >= 2){
            var op2 = this.pila.desapilar();
            var op1 = this.pila.desapilar();
            var result = parseFloat(op1) * parseFloat(op2);
            this.pila.apilar(result);

            this.mostrarPantalla();
        }
    }

    division(){
        if (this.pila.size() >= 2){
            var op2 = this.pila.desapilar();
            var op1 = this.pila.desapilar();
            var result = parseFloat(op1) / parseFloat(op2);
            this.pila.apilar(result);

            this.mostrarPantalla();
        }
    }

    raiz(){
        if (this.pila.size() >= 1){
            var op = this.pila.desapilar();
            var res = Math.sqrt(op);
            this.pila.apilar(res);

            this.mostrarPantalla();
        }
    }

    sin(){
        if (this.pila.size() >= 1){
            var op = this.pila.desapilar();
            var res = Math.sin(op);
            this.pila.apilar(res);

            this.mostrarPantalla();
        }
    }

    cos(){
        if (this.pila.size() >= 1){
            var op = this.pila.desapilar();
            var res = Math.cos(op);
            this.pila.apilar(res);

            this.mostrarPantalla();
        }
    }

    tan(){
        if (this.pila.size() >= 1){
            var op = this.pila.desapilar();
            var res = Math.tan(op);
            this.pila.apilar(res);

            this.mostrarPantalla();
        }
    }

    arcoSeno(){
        if (this.pila.size() >= 1){
            var op = this.pila.desapilar();
            var res = Math.asin(op);
            this.pila.apilar(res);

            this.mostrarPantalla();
        }
    }

    arcoCoseno(){
        if (this.pila.size() >= 1){
            var op = this.pila.desapilar();
            var res = Math.acos(op);
            this.pila.apilar(res);

            this.mostrarPantalla();
        }
    }

    arcoTangente(){
        if (this.pila.size() >= 1){
            var op = this.pila.desapilar();
            var res = Math.atan(op);
            this.pila.apilar(res);

            this.mostrarPantalla();
        }
    }



    borrar(){
        this.CE();
        this.pila.limpiar();
        this.mostrarPantalla();
    }

    CE(){ //limpiar valores a introducir
        this.prepantalla = "";
        this.mostrarPrePantalla();
    }





    enter(){
        if (this.prepantalla != ""){
            this.pila.apilar(this.prepantalla);
            this.CE();
            this.mostrarPantalla();
        }
    }

    mostrarPantalla(){
        document.querySelector('body > form > textarea[title="pantalla"]').value = this.pila.show();
    }
    mostrarPrePantalla(){
        document.querySelector('body > form > textarea[title="prePantalla"]').value = this.prepantalla;
    }
}

class CalculadoraEnergetica extends CalculadoraRPN{

    constructor(){
        super();
    }

    cargarBotones(event){
        super.cargarBotones(event);
        if (event.code === 'KeyV') {//Tecla V -> Volumen
            calculadora.volumen();
        }
        if (event.code === 'KeyP') {//Tecla P -> Perdidas
            calculadora.perdida();
        }
        if (event.code === 'KeyK') {//Tecla K -> Consumo
            calculadora.consumo();
        }
        if (event.code === 'KeyE') {//Tecla E -> Coste
            calculadora.coste();
        }

        if (event.code === 'KeyL') {//Tecla L -> Salon
            calculadora.salon();
        }
        if (event.code === 'KeyN') {//Tecla N -> Cocina
            calculadora.cocina();
        }
        if (event.code === 'KeyM') {//Tecla M -> Dormitorio
            calculadora.dormitorio();
        }
        if (event.code === 'KeyO') {//Tecla O -> Baño
            calculadora.baño();
        }
    }

    /**
     * Calcula el volumen de un espacio.
     * Necesita dos valores en la pila, ancho y largo, en metros.
     * Se considera el alto estándar de una vivienda 2.5 metros.
     * Devuelve metros cubicos.
     */
    volumen(){
        var techo = 2.5;
        if (this.pila.size() >= 2){
            var largo = this.pila.desapilar();
            var ancho = this.pila.desapilar();
            var result = parseFloat(ancho) * parseFloat(largo) * parseFloat(techo);
            this.pila.apilar(result);

            this.mostrarPantalla();
        }    
    }


    /**
     * Calcula las kilocalorias necesarias para calentar una estancia en funcion de un coeficiente.
     * Necesita un valor en la pila, en metros cúbicos.
     * Devuelve kilocalorias.
     * @param {} coeficiente 
     */
    estancia(coeficiente){
        if (this.pila.size() >= 1){
            var vol = this.pila.desapilar();
            var result = parseFloat(vol) * coeficiente;
            this.pila.apilar(result);

            this.mostrarPantalla();
        }   
    }

    salon(){
        this.estancia(42);
    }
    baño(){
        this.estancia(42);
    }
    dormitorio(){
        this.estancia(40);
    }
    cocina(){
        this.estancia(40);
    }

    /**
     * Calcula la pérdida de energía en una estancia.
     * Necesita un valor en la pila, las kilocalorias necesarias para calentar la estancia.
     * El coeficiente de pérdida se considera del 20%.
     * Añade a la pila las kcalorias perdidas.
     */
    perdida(){
        if (this.pila.size() >= 1){
            var cal = this.pila.desapilar();
            var result = parseFloat(cal) * 0.2; //perdida energética
            this.pila.apilar(cal);
            this.pila.apilar(result);
            this.mostrarPantalla();
        }   
    }

    /**
     * Calcula el consumo total de energía para calentar la estancia.
     * Necesita dos valores en la pila, las kcal necesarias, y las kcal perdidas.
     * Devuelve el total en kW (kilovatios).
     */
    consumo(){
        if (this.pila.size() >= 2){
            var perdida = this.pila.desapilar();
            var necesarias = this.pila.desapilar();
            var result = parseFloat(perdida) + parseFloat(necesarias); //kilocalorias totales
            
            result = result / 859.65; //kilocalorias a kilovatios
            
            this.pila.apilar(result);
            this.mostrarPantalla();
        } 
    }

    /**
     * Calcula el coste en euros del consumo (en kW).
     * Necesita un valor e la pila, los kilovatios totales.
     * Devuelve el precio en euros.
     */
    coste(){
        if (this.pila.size() >= 1){
            var precioKw = 0.326964;
            var kw = this.pila.desapilar();
            
            var result = parseFloat(kw) * parseFloat(precioKw); 
            
            this.pila.apilar(result);
            this.mostrarPantalla();
        } 
    }

    
}
var calculadora = new CalculadoraEnergetica();

