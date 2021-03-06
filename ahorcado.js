//Elijan de un array de palabras aleatorio
// variables globales
//palabra es un objeto de tipo String
function seleccionPalabra(minimo, maximo)
{
	var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
	return numero;
}

var opciones = ["Guardia", "Snow", "Stark", "Aria", "Olly", "Ned", "Kingslanding"]
var opcionMaquina = seleccionPalabra(0,3);
var palabra = opciones[opcionMaquina];
var hombre, l, b, espacio;

//Declaración de la clase Ahorcado (recibe como parametro contexto)
/*var Ahorcado = function (con)*/
var Ahorcado = function ()
{
	//this es las variables locales de la clase, accesibles en toda la clase
	//this.contexto es el context de dibujo del canvas, que llega por parametro
	//desde la variable con
	/*this.contexto = con*/;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;
	//Luego de la declaracion lo primero que hacemos es dibujar
	this.dibujar();
}

var Picture = function (url, ok, x, y) {
	this.imagenURL=url;
	this.imagenOK=ok;
	this.posicionX=x;
	this.posicionY=y;
}


var fondo = new Picture ("poste.png", false, 0, 0);
var cabeza = new Picture("cabeza.png", false, 70, 167);
var cuerpo = new Picture("cuerpo.png", false, 30, 254);
var brazos = new Picture("brazos.png", false, 30, 250);
var pies = new Picture("pies.png", false, 40, 450);
var muerto = new Picture("muerto.png", false, 55, 167);
function confirmarFondo ()
{
	fondo.imagenOK = true;
	dibujarImagen();
}
function confirmarCabeza ()
{
	cabeza.imagenOK = true;
	dibujarImagen();
}
function confirmarCuerpo ()
{
	cuerpo.imagenOK = true;
	dibujarImagen();
}
function confirmarBrazos ()
{
	brazos.imagenOK = true;
	dibujarImagen();
}
function confirmarPies ()
{
	pies.imagenOK = true;
	dibujarImagen();
}
function confirmarMuerto ()
{
	muerto.imagenOK = true;
	dibujarImagen();
}

function dibujarImagen()
{
	var canvas = document.getElementById("canvas");
	//podemos darle un ancho y un alto a la etiqueta de canvas desde js
	var tablero = canvas.getContext("2d");
	
	if(fondo.imagenOK)
	{
		tablero.drawImage(fondo.imagen, fondo.posicionX, fondo.posicionY);
	}
	if(cabeza.imagenOK)
	{
		tablero.drawImage(cabeza.cabeza, cabeza.posicionX, cabeza.posicionY);
	}
	if(cuerpo.imagenOK)
	{
		tablero.drawImage(cuerpo.cuerpo, cuerpo.posicionX, cuerpo.posicionY);
	}
	if(brazos.imagenOK)
	{
		tablero.drawImage(brazos.brazos, brazos.posicionX, brazos.posicionY);
	}
	if(pies.imagenOK)
	{
		tablero.drawImage(pies.pies, pies.posicionX, pies.posicionY);
	}
	if(muerto.imagenOK)
	{
		tablero.drawImage(muerto.muerto, muerto.posicionX, muerto.posicionY);
	}
}

Ahorcado.prototype.dibujar = function ()
{
	/*var dibujo = this.contexto;*/

	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	if(this.intentos > 0)
	{
		
		cabeza.cabeza = new Image();
		cabeza.cabeza.src = cabeza.imagenURL;
		cabeza.cabeza.onload = confirmarCabeza;

		if(this.intentos > 1)
		{
			cuerpo.cuerpo = new Image();
			cuerpo.cuerpo.src = cuerpo.imagenURL;
			cuerpo.cuerpo.onload = confirmarCuerpo;

			if(this.intentos > 2)
			{
				brazos.brazos = new Image();
				brazos.brazos.src = brazos.imagenURL;
				brazos.brazos.onload = confirmarBrazos;

				if(this.intentos > 3)
				{
					pies.pies = new Image();
					pies.pies.src = pies.imagenURL;
					pies.pies.onload = confirmarPies;

					if(this.intentos > 4)
					{
						muerto.muerto = new Image();
						muerto.muerto.src = muerto.imagenURL;
						muerto.muerto.onload = confirmarMuerto;
					}
				}
			}

		}

	}
}
//Trazar le va a decir a la funcion ¡hey, agregue un intento nuevo! 
//Y vuelvamelo a dibujar
Ahorcado.prototype.trazar = function ()
{
	//El operador ++ suma uno
	this.intentos++;
	//Por defecto arrancamos en this.vivo = true
	if(this.intentos >= this.maximo)
	{
		// Acá nos morimos muertos de la muerte
		this.vivo = false;
		alert("¡Estás muerto!");
		b.disabled= true;
	}
	this.dibujar();
}

//Acá esta la funcion iniciar!
function iniciar () 
{
	l = document.getElementById("letra");
	b = document.getElementById("boton");
	/*var canvas = document.getElementById("canvas");
	//podemos darle un ancho y un alto a la etiqueta de canvas desde js
	canvas.width = 500;
	canvas.height = 502;
	var contexto = canvas.getContext("2d");*/
	//Al poner contexto como parametro ya lo puedo usar dentro de la clase Ahorcado
	/*hombre = new Ahorcado(contexto);*/
	hombre = new Ahorcado();

	//Convierte a mayúscula un texto
	palabra = palabra.toUpperCase();
	//Para minusculas es .toLowerCase

	//Declaro un array con n espacios de acuerdo al largo de la palabra
	//Length es una variable no una funcion
	espacio = new Array(palabra.length);
	
	//Agregamos una función que se dispare al dar click al botón
	b.addEventListener("click", agregarLetra);
	//Para mostrar la pista desde el inicio
	mostrarPista(espacio);

}
function agregarLetra()
{
	//Usamos una variable global dentro de nuestro algoritmo
	//l.value nos trae lo que insertemos en el campo de texto
	var letra = l.value;
	//Esto es para que el cuadro de texto se limpie :)
	l.value = "";
	//Esta funcion tiene toda la logica del ahorcado
	mostrarPalabra(palabra, hombre, letra);
}

function mostrarPalabra(palabra, hombre, letra)
{
	var encontrado = false;
	var p;
	letra = letra.toUpperCase();
	//Miren un ciclo in :)
	//Esto empieza letra por letra para ver si existe o no existe en la palabra
	for(p in palabra)
	{	
		if(letra == palabra[p])
		{
			espacio[p] = letra;
			encontrado = true;
		
	}
	}
	mostrarPista(espacio);
	if ((espacio.toString().replace(/,/g, ""))==palabra) {
		alert("Ganaste")
		b.disabled= true;
	}

	//Si NO lo encontré
	if(!encontrado)
	{
		hombre.trazar();
	}

	if(!hombre.vivo)
	{
		//Y esto es lo que debo hacer para que me muestre la palabra cuando muera
		//Cool!
		mostrarPista(palabra);
	}

}
function mostrarPista(espacio)
{
	var pista = document.getElementById("pista");
	var texto = "";
	var i;
	var largo = espacio.length;

	for(i = 0; i<largo; i++)
	{	
		//Mientras NO sea undefined
		if(espacio[i] != undefined)
		{
			//si entrá acá significa que hay una letra :O
			texto = texto + espacio[i] + " ";
		}
		else
		{
			texto += "_ ";
		}
	}
	pista.innerText = texto;
}








