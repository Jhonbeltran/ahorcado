//Elijan de un array de palabras aleatorio
// variables globales
var palabra = "Guardia";
var hombre, l, espacio;

//Declaración de la clase Ahorcado (recibe como parametro contexto)
var Ahorcado = function (con)
{
	//this es las variables locales de la clase, accesibles en toda la clase
	//this.contexto es el context de dibujo del canvas, que llega por parametro
	//desde la variable con
	this.contexto = con;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;
	//Luego de la declaracion lo primero que hacemos es dibujar
	this.dibujar();
}

var fondo = {
	imagenURL: "poste.png",
	imagenOK: false
};

function confirmarFondo ()
{
	
	fondo.imagenOK = true;
	dibujar();
}
var cabeza = {
	cabezaURL: "cabeza.png",
	cabezaOK: false,
	x: 70,
	y: 167
};
function confirmarCabeza ()
{
	
	cabeza.cabezaOK = true;
	dibujar();
}

var cuerpo = {
	cuerpoURL: "cuerpo.png",
	cuerpoOK: false,
	x: 30,
	y: 254
};
function confirmarCuerpo ()
{
	
	cuerpo.cuerpoOK = true;
	dibujar();
}

var brazos = {
	brazosURL: "brazos.png",
	brazosOK: false,
	x: 30,
	y: 250
};
function confirmarBrazos ()
{
	
	brazos.brazosOK = true;
	dibujar();
}

var pies = {
	piesURL: "pies.png",
	piesOK: false,
	x: 40,
	y: 450
};
function confirmarPies ()
{
	
	pies.piesOK = true;
	dibujar();
}

var muerto = {
	muertoURL: "muerto.png",
	muertoOK: false,
	x: 55,
	y: 167
};
function confirmarMuerto ()
{
	
	muerto.muertoOK = true;
	dibujar();
}

function dibujar()
{
	var canvas = document.getElementById("canvas");
	tablero = canvas.getContext("2d");
	//Capa 1: Fondo
	if(fondo.imagenOK == true)
	{
		tablero.drawImage(fondo.imagen, 0, 0);
	}
	if(cabeza.cabezaOK)
	{
		tablero.drawImage(cabeza.cabeza, cabeza.x, cabeza.y);
	}
	if(cuerpo.cuerpoOK)
	{
		tablero.drawImage(cuerpo.cuerpo, cuerpo.x, cuerpo.y);
	}
	if(brazos.brazosOK)
	{
		tablero.drawImage(brazos.brazos, brazos.x, brazos.y);
	}
	if(pies.piesOK)
	{
		tablero.drawImage(pies.pies, pies.x, pies.y);
	}
	if(muerto.muertoOK)
	{
		tablero.drawImage(muerto.muerto, muerto.x, muerto.y);
	}
}

Ahorcado.prototype.dibujar = function ()
{
	var dibujo = this.contexto;

	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	if(this.intentos > 0)
	{
		
		cabeza.cabeza = new Image();
		cabeza.cabeza.src = cabeza.cabezaURL;
		cabeza.cabeza.onload = confirmarCabeza;

		if(this.intentos > 1)
		{
			cuerpo.cuerpo = new Image();
			cuerpo.cuerpo.src = cuerpo.cuerpoURL;
			cuerpo.cuerpo.onload = confirmarCuerpo;

			if(this.intentos > 2)
			{
				brazos.brazos = new Image();
				brazos.brazos.src = brazos.brazosURL;
				brazos.brazos.onload = confirmarBrazos;

				if(this.intentos > 3)
				{
					pies.pies = new Image();
					pies.pies.src = pies.piesURL;
					pies.pies.onload = confirmarPies;

					if(this.intentos > 4)
					{
						muerto.muerto = new Image();
						muerto.muerto.src = muerto.muertoURL;
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
	var canvas = document.getElementById("canvas");
	//podemos darle un ancho y un alto a la etiqueta de canvas desde js
	canvas.width = 500;
	canvas.height = 502;
	var contexto = canvas.getContext("2d");
	//Al poner contexto como parametro ya lo puedo usar dentro de la clase Ahorcado
	hombre = new Ahorcado(contexto);

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








