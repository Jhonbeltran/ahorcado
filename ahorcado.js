//Elijan de un array de palabras aleatorio
// variables globales
var palabra = "Guardia";
var hombre, l, espacio;

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
	}
	this.dibujar();
}

//Acá esta la funcion iniciar!
function iniciar () 
{
	l = document.getElementById("letra");
	var b = document.getElementById("boton");
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

	//Declaro un array con n espacios de acuerdo al largo de la palabra
	espacio = new Array(palabra.length);
	
	//Agregamos una función que se dispare al dar click al botón
	b.addEventListener("click", agregarLetra);

	mostrarPista(espacio);

}
function agregarLetra()
{
	var letra = l.value;
	l.value = "";
	mostrarPalabra(palabra, hombre, letra);
}
function mostrarPalabra(palabra, ahorcado, letra)
{
	var encontrado = false;
	var p;
	letra = letra.toUpperCase();
	for(p in palabra)
	{	
		if(letra == palabra[p])
		{
			espacio[p] = letra;
			encontrado = true;
		}
	}
	mostrarPista(espacio);

	//Si NO lo encontré
	if(!encontrado)
	{
		ahorcado.trazar();
	}

	if(!ahorcado.vivo)
	{
		//Mostrar la palabra entera al morir
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
		if(espacio[i] != undefined)
		{
			texto = texto + espacio[i] + " ";
		}
		else
		{
			texto += "_ ";
		}
	}
	pista.innerText = texto;
}








