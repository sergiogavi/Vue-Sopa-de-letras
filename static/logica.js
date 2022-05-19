$(document).ready(function(){ //cuando el documento esté listo ejecuta la función 


    //Definimos los arrays necesarios para la logica del juego 
   var PalabrasIntroducidas = [];
   var PalabrasEncontradas = [];

   //Definimos el numero de filas y columnas que generará nuestro
   var filas = 10;
   var columnas = 20;


   //Definimos la variable Sopa
    var Sopa = {
        'grid': [],
        'init': function () {

            //Y genera la tabla con las columnas y filas predefinidas
            for (var x = 0; x < filas; x++) {
                Sopa.grid[x] = [];
                for (var y = 0; y < columnas; y++) {
                      //definimos unicode de manera aleatoria según la tabla asci para que rellene el resto 
                    //de letras de forma aleatoria 
                    var unicode = Math.round(Math.random() * ((89 - 65)+1) + 65 );

                    //printa las filas y las columnas gracias a la variable unicode anterior
                    //en forma de string
                    Sopa.grid[x][y] = String.fromCharCode(unicode);
                }
            }
        },  //Función que forma la tabla según filas y columnas introducidas 
        'printaGrid': function () {
            for (var i = 0; i < filas; i++) {
                $("table").append("<tr id='" + i + "'>");
                for (var j = 0; j < columnas; j++) {
                    $("#"+i).append("<td>" + Sopa.grid[i][j] + "</td>");
                }
            }
        },  //función que elimina la tabla
        'deleteGrid': function () {
            $("table").empty();
        },  //función que añade palabra 
        'añadirPalabra': function (paraula){
            var ok = false;
            var llargada = paraula.length;
            //Split = separa con comas y en mayusculas 
            var p_lletres = paraula.toUpperCase().split('');
            console.log(p_lletres);

            //genera 3 variables aleatorias y redondeadas entre 1-8
            do {
                var x = Math.round(random(0,9));
                var y = Math.round(random(0,9));
                var z = Math.round(random(0,1));

                //x=fila, y= columna
                console.log("Random punt: ["+x+"]["+y+"]" );
                console.log("llargada: " + llargada);
                console.log("z: " + z);

                //Ubica e informa de donde serán ubicadas nuestras palabras


                //si z es 1 genera una palabra horizontal
                if (z) {
                    if ((filas - y) >= llargada) {                     
                        ok = true;
                        var c = 0;
                        for (var k = y; k < y + llargada; k++) {
                            console.log("[" + x + "][" + k + "]");
                            Sopa.grid[x][k] = "<b>" +  p_lletres[c] + "</b>";
                            c++;
                        }
                    }

                        //Si no se añade una  palabra vertical
                } else {
                    if ((filas - x) >= llargada) {                   
                        ok = true;
                        var q = 0;
                        for (var p = x; p < x + llargada; p++) {
                            console.log("[" + p + "][" + y + "]");
                            Sopa.grid[p][y] = "<b>" + p + "</b>";
                            Sopa.grid[p][y] = "<b>" +  p_lletres[q] + "</b>";
                            q++;
                        }
                    }
                }
            }while(ok == false);
        }
    };

    //por defecto están ocultos

    $("table").hide();
    $("#llista").hide();

    //se llama a la función init
    Sopa.init();

    //cuando se pula el botón start 
    $("#start").click(function(){

        //se genera la tabla
        Sopa.printaGrid();
        //columnas
        $("td").click(tdSelect);
        //animación Jquery
        $("table").fadeIn(1500);
        llistarEntrades();
        $("#llista").fadeIn(3000);
    });
    //cuando se pulsa el botón entra
    $("#entra").click(function (){
        var $entrada = $("#entrada");
        //almacenamos los valores introducidos 
        var paraula = $entrada.val();
        $entrada.val('');
        //mensaje al introducir palabra
        $entrada.attr('placeholder', 'recibido, Introduce la siguiente palabra');
        //se vuelve a mayuscula y se añade en el array de PalabrasIntroducidas
        PalabrasIntroducidas.push(paraula.toUpperCase());
        //se añaden las palabras
        Sopa.añadirPalabra(paraula);
        console.log("PalabrasIntroducidas: " + PalabrasIntroducidas);
    });

    //Mensajes al pasar al juego 

    function tdSelect(){
        $(this).toggleClass("selected");

        //slecciona las letras 
        var lletres = $(".selected").text();
        console.log("\n" + lletres + "\n");
        //conforma una palabra
        $("#paraula").text(lletres);

        //recorre PalabrasIntroducidas
        for (var i = 0; i < PalabrasIntroducidas.length; i++){
            console.log("PalabrasIntroducidas["+i+"]: " + PalabrasIntroducidas[i]);
            //si la palabra seleccionada forma parte de las palabras introducidas 
            if($("#paraula").text() == PalabrasIntroducidas[i]){
                //se desvanece la palabra
                $('#p'+i).fadeOut(3000);
                correcte();
            }
        }
        console.log(PalabrasEncontradas);
    }

    //Lista las palabras introducidas durante el juego
    function llistarEntrades(){
        var llista = $('#llista');
        var numEntrades = PalabrasIntroducidas.length;
        for (var m = 0; m < numEntrades; m++){
            llista.append("<li id='p"+m+"'>" + PalabrasIntroducidas[m] + "</li>");
        }
    }

    function correcte() {
       //si es correcto se cambia el css y se elimina el anterior
        $(".selected").addClass("adivinada");
        $(".adivinada").removeClass("selected");
    }

   
    function random(i, f){
        return Math.floor(Math.random() * ((f-i)+1) + i);
    }

});