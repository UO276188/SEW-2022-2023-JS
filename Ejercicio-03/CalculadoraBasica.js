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
        if (this.operador != ""){
            this.op2 = new Number(this.expresion);
            this.expresion = eval(this.op1 + this.operador + this.op2); 
            this.op1 = new Number(this.expresion);
            this.op2 = "";
            this.mostrarPantalla();
        } else{
            this.op1 = new Number (this.expresion);
            
        }
        
        this.eval = false;
        this.expresion = "";
        this.operador = "+";
        
    }

    resta(){
        if (this.operador != ""){
            this.op2 = new Number(this.expresion);
            this.expresion = eval(this.op1 + this.operador + this.op2); 
            this.op1 = new Number(this.expresion);
            this.op2 = "";
            this.mostrarPantalla();
        } else{
            this.op1 =  new Number(this.expresion);
        }
       
        this.eval = false;
        this.expresion = "";
        this.operador = "-";
        
    }

    multiplicacion(){
        if (this.operador != ""){
            this.op2 = new Number(this.expresion);
            this.expresion = eval(this.op1 + this.operador + this.op2); 
            this.op1 = new Number(this.expresion);
            this.op2 = "";
            this.mostrarPantalla();
        } else{
            this.op1 = new Number (this.expresion);
            
        }
        
        this.eval = false;
        this.expresion = "";
        this.operador = "*";

    }

    division(){
        if (this.operador != ""){
            this.op2 = new Number(this.expresion);
            this.expresion = eval(this.op1 + this.operador + this.op2); 
            this.op1 = new Number(this.expresion);
            this.op2 = "";
            this.mostrarPantalla();
        } else{
            this.op1 = new Number (this.expresion);
            
        }
        this.eval = false;
        this.expresion = "";
        this.operador = "/";

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
        this.op2 = new Number(this.expresion);
        try{
            this.expresion = eval(this.op1 + this.operador + '(' +this.op2 +')');
           
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

var calculadora = new Calculadora();