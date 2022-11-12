"use strict";
class Calculadora{

    constructor(){
        this.memoria= 0 ;

        
        this.op1 = "";
        this.op2 = "";
        this.operador = "";
        this.expresion = "";
        this.eval = false;
        this.inicializar();
        
    }
    inicializar(){
        document.addEventListener('keydown', function (event) {
            if (event.key >= '0' && event.key <= '9') {
                calculadora.digitos(event.key);
            }
            if (event.key === 'Enter') {
                calculadora.igual();
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
        
            
            if (event.key === 'Delete') { // Supr
                calculadora.borrar();
            }
            if (event.key === 'Backspace') {
                calculadora.CE();
            }

            //MRC
            if (event.code === 'KeyM') {//Tecla M -> MRC
                calculadora.mrc();
            }
            //M+
            if (event.code === 'KeyK') { //Tecla K -> M+
                calculadora.mMas();
            }
            //M-
            if (event.code === 'KeyL') { //Tecla L -> M-
                calculadora.mMenos();
            }

            //%
            if (event.key === '%') {
                calculadora.porcentaje();
            }
            //Raiz
            if (event.code === 'KeyR') {
                calculadora.raiz();
            }

        });

        
    }

    
    digitos(numero){
        if (this.eval){ //operacion ya evaluada
            this.expresion = "";
            this.eval = false;
            this.mostrarPantalla();
        }
        
        this.expresion += String(numero);
        
        this.mostrarPantalla();
    }

    punto(){
        this.expresion += ".";
        this.mostrarPantalla();
    }

    // OPERACIONES 

    suma(){
        this.expresion += "+";
        this.mostrarPantalla();
        this.operador = "+";
        if (this.eval){
            this.eval = false;
        }
        
    }

    resta(){
        this.expresion += "-";
        this.mostrarPantalla();
        this.operador = "-";
        if (this.eval){
            this.eval = false;
        }
    }

    multiplicacion(){
        this.expresion += "*";
        this.mostrarPantalla();
        this.operador = "*";
        if (this.eval){
            this.eval = false;
        }
    }

    division(){
        this.expresion += "/";
        this.mostrarPantalla();
        this.operador = "/";
        if (this.eval){
            this.eval = false;
        }
    }

    mrc(){
        this.expresion = this.memoria;
        this.mostrarPantalla();

        
        this.memoria = 0;
        this.eval = true;
    
    }

    mMenos(){
        this.igual();
        this.memoria -= this.expresion;
    }
    mMas(){
        this.igual();
        this.memoria += this.expresion;
    }


    borrar(){
        this.op1 = "";
        this.op2 = "";
        this.operador = "";
        this.expresion = "";
        
        this.expresion = "0";
        this.mostrarPantalla();
        this.expresion = "";
    }

    CE(){
        this.expresion = "0";
        this.mostrarPantalla();
        this.expresion = "";
    }
    masMenos(){
       if (this.expresion != "") {
        this.expresion = eval(this.expresion + '*-1');
        this.mostrarPantalla();
       }
    }
    raiz(){
        //TODO No usar math
        this.expresion = Math.sqrt(new Number(this.expresion));
        this.mostrarPantalla();
    }
    porcentaje(){
        if (this.operador=="*" || this.operador=="/"){
            this.expresion =eval(this.expresion + '/100');
        } else {
            this.expresion = eval(new Number(this.expresion) + '/100' + '*' + this.op1);
        }

        this.igual();
        
    }

    igual(){
       
        try{
            this.expresion = eval(this.expresion);
           
        } catch(err){
            alert("Error = " + err);
            this.expresion="0";
        }
        
        //TODO decimales : multiplicar por el numero de decimales y luego dividir
        this.expresion = new Number(this.expresion);
        this.mostrarPantalla();

        this.eval = true;
        this.op1 = "";
        this.op2 = "";
        this.operador = "";
    }

    mostrarPantalla(){
        document.querySelector('body > form > input[type="text"]').value = this.expresion;
    }
}

class CalculadoraCientifica extends Calculadora{
    constructor(){
        super();
        this.parentesis = false;
        this.degr = false;
    }

    pickLast(){
        if (this.operador!= ""){
            var s = this.expresion.split(/[\\-|\\+|\\*|\\-\\]/);
            var length = s.length;
            var res = s[length-1]; //numero a pasar por la funcion
            var lengthNum = res.length;
            var newExp = this.expresion.substring(0, this.expresion.length-lengthNum);
            this.expresion = newExp;
            return new Number(res);
        }
        else {
            var newExp = eval(this.expresion);
            this.expresion = "";
            return newExp;
        }
        
    }

    sin(){
        var number = this.pickLast();
        this.expresion += Math.sin(number);
        this.mostrarPantalla();
        this.eval = true;
    }
    cos(){
        var number = this.pickLast();
        this.expresion += Math.cos(number);
        this.mostrarPantalla();
        this.eval = true;
    }
    tan(){
        var number = this.pickLast();
        this.expresion += Math.tan(number);
        this.mostrarPantalla();
        this.eval = true;
    }
    log(){
        var number = this.pickLast();
        this.expresion += Math.log10(number);
        this.mostrarPantalla();
        this.eval = true;
    }
    exp(){
        var number = this.pickLast();
        this.expresion += Math.exp(number);
        this.mostrarPantalla();
        this.eval = true;
    }

    cuadrado(){
        var number = this.pickLast();
        this.expresion += Math.pow(number, 2);
        this.mostrarPantalla();
        this.eval = true;
    }

    pot10(){
        var number = this.pickLast();
        this.expresion += Math.pow(10, number);
        this.mostrarPantalla();
        this.eval = true;
    }

    pi(){
        this.digitos(Math.PI);
    }

    factorial(){
        var total = 1;
        this.igual();
        for (var i=1 ; i <= this.expresion; i++){
            total = total * i;
        }
        this.expresion = total;
        this.mostrarPantalla();
        
    }

    abreParentesis(){
        if (this.eval){
            this.expresion = "";
            this.eval = false;
        }
        this.expresion += "(";
        this.mostrarPantalla();
    }

    cierraParentesis(){
        this.expresion += ")";
        this.mostrarPantalla();
        this.operador = "";
    }

    
    deg(){
        

        if(this.degr == true){
            this.expresion = eval(this.expresion) * (Math.PI/180);
            this.mostrarPantalla();
            this.degr = false;

        }else{
            
            this.expresion = eval(this.expresion) * (180/Math.PI);
            this.mostrarPantalla();
            this.degr = true;
           
        }
    }


    //MEMORIAS----------------
    mc(){
        this.memoria = 0;
        this.eval = true;
    }
    mr(){
        this.expresion = this.memoria;
        this.mostrarPantalla();
        this.eval = true;
    }
    ms(){
        this.memoria = this.expresion;
        this.eval = true;
    }

    //BORRADOS
    CE(){
       var number = this.pickLast(); 
       this.mostrarPantalla();
    }
    borraFlecha(){
        if (this.expresion!= ""){
            var newExp = this.expresion.substring(0, this.expresion.length-1);
            this.expresion = newExp;
            this.mostrarPantalla();
        }
    }
}

var calculadora = new CalculadoraCientifica();