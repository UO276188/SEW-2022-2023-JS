"use strict";
class Calculadora{

    constructor(){
        this.memoria= 0 ;

        
        this.op1 = "";
        this.op2 = "";
        this.operador = "";
        this.pantalla = "";
        this.eval = false;
        this.inicializar();


        this.lastOp ="";
        this.lastOp1 ="";
        this.lastOp2 ="";
        
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
            this.pantalla = "";
            this.eval = false;
            this.mostrarPantalla();
        }
        
        this.pantalla += String(numero);
        
        this.mostrarPantalla();
    }

    punto(){
        this.pantalla += ".";
        this.mostrarPantalla();
    }

    // OPERACIONES 

    suma(){
        if (this.operador != ""){
            this.op2 = new Number(this.pantalla);
            this.pantalla = eval(this.op1 + this.operador + this.op2); 
            this.op1 = new Number(this.pantalla);
            this.op2 = "";
            this.mostrarPantalla();
        } else{
            this.op1 = new Number (this.pantalla);
            
        }
        
        this.eval = false;
        this.pantalla = "";
        this.operador = "+";
        
    }

    resta(){
        if (this.operador != ""){
            this.op2 = new Number(this.pantalla);
            this.pantalla = eval(this.op1 + this.operador + this.op2); 
            this.op1 = new Number(this.pantalla);
            this.op2 = "";
            this.mostrarPantalla();
        } else{
            this.op1 =  new Number(this.pantalla);
        }
       
        this.eval = false;
        this.pantalla = "";
        this.operador = "-";
        
    }

    multiplicacion(){
        if (this.operador != ""){
            this.op2 = new Number(this.pantalla);
            this.pantalla = eval(this.op1 + this.operador + this.op2); 
            this.op1 = new Number(this.pantalla);
            this.op2 = "";
            this.mostrarPantalla();
        } else{
            this.op1 = new Number (this.pantalla);
            
        }
        
        this.eval = false;
        this.pantalla = "";
        this.operador = "*";

    }

    division(){
        if (this.operador != ""){
            this.op2 = new Number(this.pantalla);
            this.pantalla = eval(this.op1 + this.operador + this.op2); 
            this.op1 = new Number(this.pantalla);
            this.op2 = "";
            this.mostrarPantalla();
        } else{
            this.op1 = new Number (this.pantalla);
            
        }
        this.eval = false;
        this.pantalla = "";
        this.operador = "/";

    }

    mrc(){
        this.pantalla = this.memoria;
        this.mostrarPantalla();

        
        this.memoria = 0;
        this.eval = true;
    
    }

    mMenos(){
        this.igual();
        this.memoria -= this.pantalla;
    }
    mMas(){
        this.igual();
        this.memoria += this.pantalla;
    }


    borrar(){
        this.op1 = "";
        this.op2 = "";
        this.operador = "";
        this.pantalla = "";
        
        this.pantalla = "0";
        this.mostrarPantalla();
        this.pantalla = "";
    }

    CE(){
        this.pantalla = "0";
        this.mostrarPantalla();
        this.pantalla = "";
    }
    masMenos(){
       if (this.pantalla != "") {
        this.pantalla = eval(this.pantalla + '*-1');
        this.mostrarPantalla();
       }
    }
    raiz(){
        //TODO No usar math
        //this.pantalla = Math.sqrt(new Number(this.pantalla));
        this.pantalla = eval(new Number(this.pantalla)**(1/2));
        this.mostrarPantalla();
        this.eval = true;
    }
    porcentaje(){
        if (this.operador=="*" || this.operador=="/"){
            this.pantalla =eval(this.pantalla + '/100');
        } else {
            this.pantalla = eval(new Number(this.pantalla) + '/100' + '*' + this.op1);
        }

        this.igual();
        
    }

    igual(){
        if (this.eval == false){
            this.op2 = new Number(this.pantalla);
        } else{
            this.op1 = this.lastOp1;
            this.op2 = this.lastOp2;
            this.operador = this.lastOp;
        }
        
        try{
            this.pantalla = eval(this.op1 + this.operador + '(' +this.op2 +')');
        } catch(err){
            alert("Error = " + err);
            this.pantalla="0";
        }

        //save for the next igual
        this.lastOp = this.operador;
        this.lastOp1 = this.pantalla;
        this.lastOp2 = this.op2;
        
        

        //TODO decimales : multiplicar por el numero de decimales y luego dividir
        this.pantalla = new Number(this.pantalla);
        this.mostrarPantalla();

        this.eval = true;
        this.op1 = "";
        this.op2 = "";
        this.operador = "";
    }

    mostrarPantalla(){
        document.querySelector('body > form > input[type="text"]').value = this.pantalla;
    }
}


class CalculadoraCientifica extends Calculadora{
    constructor(){
        super();
        this.parentesis = false;
        this.degr = 0;  //0= degrees , 1=radianes, 2 = grad
        this.hype = false; //if true -> hyperbolicas
        this.upArrow = false; //If TRUE en vez de seno coseno y tangente -> arsin, arcos, atan
    }

    igual(){
       
        try{
            this.pantalla = eval(this.pantalla);
           
        } catch(err){
            alert("Error = " + err);
            this.pantalla="0";
        }
        
        //TODO decimales : multiplicar por el numero de decimales y luego dividir
        this.pantalla = new Number(this.pantalla);
        this.mostrarPantalla();

        this.eval = true;
        this.op1 = "";
        this.op2 = "";
        this.operador = "";
    }


    suma(){
        this.pantalla += "+";
        this.mostrarPantalla();
        this.operador = "+";
        if (this.eval){
            this.eval = false;
        }
        
    }

    resta(){
        this.pantalla += "-";
        this.mostrarPantalla();
        this.operador = "-";
        if (this.eval){
            this.eval = false;
        }
    }

    multiplicacion(){
        this.pantalla += "*";
        this.mostrarPantalla();
        this.operador = "*";
        if (this.eval){
            this.eval = false;
        }
    }

    division(){
        this.pantalla += "/";
        this.mostrarPantalla();
        this.operador = "/";
        if (this.eval){
            this.eval = false;
        }
    }

    pickLast(){
        if (this.operador!= ""){
            var s = this.pantalla.split(/[\\-|\\+|\\*|\\-\\]/);
            var length = s.length;
            var res = s[length-1]; //numero a pasar por la funcion
            var lengthNum = res.length;
            var newExp = this.pantalla.substring(0, this.pantalla.length-lengthNum);
            this.pantalla = newExp;
            return new Number(res);
        }
        else {
            var newExp = eval(this.pantalla);
            this.pantalla = "";
            return newExp;
        }
        
    }

    
    sin(){
        var number = this.pickLast();
        if (this.upArrow == false){
            if (this.hype == false){
                this.pantalla += Math.sin(this.trigonometric(number));
            } else {
                this.pantalla += Math.sinh(this.trigonometric(number));
            }
        } else {
            if (this.hype == false){
                this.pantalla += Math.asin(this.trigonometric(number));
            } else {
                this.pantalla += Math.asinh(this.trigonometric(number));
            }
        }
        this.mostrarPantalla();
        this.eval = true;
    }
    cos(){
        var number = this.pickLast();
        if (this.upArrow == false){
            if (this.hype == false){
                this.pantalla += Math.cos(this.trigonometric(number));
            } else {
                this.pantalla += Math.cosh(this.trigonometric(number));
            }
        } else {
            if (this.hype == false){
                this.pantalla += Math.acos(this.trigonometric(number));
            } else {
                this.pantalla += Math.acosh(this.trigonometric(number));
            }
        }
        this.mostrarPantalla();
        this.eval = true;
    }
    tan(){
        var number = this.pickLast();
        if (this.upArrow == false){
            if (this.hype == false){
                this.pantalla += Math.tan(this.trigonometric(number));
            } else {
                this.pantalla += Math.tanh(this.trigonometric(number));
            }
        } else {
            if (this.hype == false){
                this.pantalla += Math.atan(this.trigonometric(number));
            } else {
                this.pantalla += Math.atanh(this.trigonometric(number));
            }
        }
        this.mostrarPantalla();
        this.eval = true;
    }

    trigonometric(number){
        switch(this.degr){
            case 0: // radians -> DEG
                return new Number(number * (Math.PI/180));
            case 1: //rad
                return new Number(number);
            case 2: //rad -> GRAD
            return new Number(number * (Math.PI/200));
        }
        
    }



    log(){
        var number = this.pickLast();
        this.pantalla += Math.log10(number);
        this.mostrarPantalla();
        this.eval = true;
    }
    exp(){
        this.pantalla += "*10**";
        this.mostrarPantalla();
    }

    cuadrado(){
        var number = this.pickLast();
        this.pantalla += Math.pow(number, 2);
        this.mostrarPantalla();
        this.eval = true;
    }

    pot10(){
        var number = this.pickLast();
        this.pantalla += Math.pow(10, number);
        this.mostrarPantalla();
        this.eval = true;
    }

    potencia(){
        this.pantalla += "**";
        this.mostrarPantalla();
    }

    mod(){
        this.pantalla += "%";
        this.mostrarPantalla();
    }


    pi(){
        this.digitos(Math.PI);
    }

    factorial(){
        var total = 1;
        this.igual();
        for (var i=1 ; i <= this.pantalla; i++){
            total = total * i;
        }
        this.pantalla = total;
        this.mostrarPantalla();
        
    }

    abreParentesis(){
        if (this.eval){
            this.pantalla = "";
            this.eval = false;
        }
        this.pantalla += "(";
        this.mostrarPantalla();
    }

    cierraParentesis(){
        this.pantalla += ")";
        this.mostrarPantalla();
        this.operador = "";
    }

    
    deg(){
        switch(this.degr){
            case 0: //Deg to Rad
                this.degr = 1; 
                document.querySelector('input[type="button"][value="DEG"]').value = "RAD";
                break;
            case 1:  //Rad to Grad
                this.degr = 2; 
                document.querySelector('input[type="button"][value="RAD"]').value = "GRAD";
                break;
            case 2:  //Grad to DEG
                this.degr = 0; 
                document.querySelector('input[type="button"][value="GRAD"]').value = "DEG";
                break;
        }
        
        
        /*
        if(this.degr == true){
            this.pantalla = eval(this.pantalla) * (Math.PI/180);
            this.mostrarPantalla();
            this.degr = false;

        }else{
            
            this.pantalla = eval(this.pantalla) * (180/Math.PI);
            this.mostrarPantalla();
            this.degr = true;
           
        } */
    }

    hyp(){
        if (this.hype == false){ //añadir hype
            this.hype = true;
            if (this.upArrow == false){
                document.querySelector('input[type="button"][value="sin"]').value = "sinh";
                document.querySelector('input[type="button"][value="cos"]').value = "cosh";
                document.querySelector('input[type="button"][value="tan"]').value = "tanh";
            } else { //a
                document.querySelector('input[type="button"][value="asin"]').value = "asinh";
                document.querySelector('input[type="button"][value="acos"]').value = "acosh";
                document.querySelector('input[type="button"][value="atan"]').value = "atanh";
            }
        } else { //quitar hype            
            this.hype = false;
            if (this.upArrow == false){
                document.querySelector('input[type="button"][value="sinh"]').value = "sin";
                document.querySelector('input[type="button"][value="cosh"]').value = "cos";
                document.querySelector('input[type="button"][value="tanh"]').value = "tan";
            } else { //a
                document.querySelector('input[type="button"][value="asinh"]').value = "sin";
                document.querySelector('input[type="button"][value="acosh"]').value = "cos";
                document.querySelector('input[type="button"][value="atanh"]').value = "tan";
            }
        }
    }
    shift(){
        if (this.upArrow == false){ //añadir a
            this.upArrow = true;
            if (this.hype == false){
                document.querySelector('input[type="button"][value="sin"]').value = "asin";
                document.querySelector('input[type="button"][value="cos"]').value = "acos";
                document.querySelector('input[type="button"][value="tan"]').value = "atan";
            } else { //h
                document.querySelector('input[type="button"][value="sinh"]').value = "asinh";
                document.querySelector('input[type="button"][value="cosh"]').value = "acosh";
                document.querySelector('input[type="button"][value="tanh"]').value = "atanh";
            }
        } else { //quitar a
            this.upArrow = false;
            if (this.hype == false){
                document.querySelector('input[type="button"][value="asin"]').value = "sin";
                document.querySelector('input[type="button"][value="acos"]').value = "cos";
                document.querySelector('input[type="button"][value="atan"]').value = "tan";
            } else { //
                document.querySelector('input[type="button"][value="asinh"]').value = "sinh";
                document.querySelector('input[type="button"][value="acosh"]').value = "cosh";
                document.querySelector('input[type="button"][value="atanh"]').value = "tanh";
            }
        }
    }



    //MEMORIAS----------------
    mc(){
        this.memoria = 0;
        this.eval = true;
    }
    mr(){
        this.pantalla = this.memoria;
        this.mostrarPantalla();
        this.eval = true;
    }
    ms(){
        this.memoria = this.pantalla;
        this.eval = true;
    }

    //BORRADOS
    CE(){
       var number = this.pickLast(); 
       this.mostrarPantalla();
    }
    borraFlecha(){
        if (this.pantalla!= ""){
            var newExp = this.pantalla.substring(0, this.pantalla.length-1);
            this.pantalla = newExp;
            this.mostrarPantalla();
        }
    }
}

var calculadora = new CalculadoraCientifica();