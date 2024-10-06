(function() {
/* Variables */
var ctx;
var canvas;
var palabra;
var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
var colorTecla = "#585858";
var colorMargen = "#FF6F61";
var inicioX = 200;
var inicioY = 300;
var lon = 35;
var margen = 20;
var pistaText = "";

/* Arreglos */
var teclas_array = new Array();
var letras_array = new Array();
var palabras_array = new Array();

/* Variables de control */
var aciertos = 0;
var errores = 0;

/* Palabras */
palabras_array.push("LEON");
palabras_array.push("CABALLO");
palabras_array.push("PERRO");
palabras_array.push("GATO");
palabras_array.push("LAGARTIJA");
palabras_array.push("RINOCERONTE");
palabras_array.push("TIBURON");
palabras_array.push("CARACOL");
palabras_array.push("ALACRAN");
palabras_array.push("ARAÑA");
palabras_array.push("CHAPULIN");
palabras_array.push("AVESTRUZ");
palabras_array.push("OCELOTE");
palabras_array.push("MUSARAÑA");
palabras_array.push("AGUILA");

/* Objetos */
function Tecla(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaTecla;
}

function Letra(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaCajaLetra;
    this.dibujaLetra = dibujaLetraLetra;
}

/* Funciones */
/* Dibujar Teclas */
function dibujaTecla() {
    ctx.fillStyle = colorTecla;
    ctx.strokeStyle = colorMargen;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

    ctx.fillStyle = "white";
    ctx.font = "bold 20px courier";
    ctx.fillText(this.letra, this.x + this.ancho / 2 - 5, this.y + this.alto / 2 + 5);
}

/* Dibujar la letra y su caja */
function dibujaLetraLetra() {
    var w = this.ancho;
    var h = this.alto;
    ctx.fillStyle = "black";
    ctx.font = "bold 40px Courier";
    ctx.fillText(this.letra, this.x + w / 2 - 12, this.y + h / 2 + 14);
}

function dibujaCajaLetra() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
}

/* Función para dar una pista al usuario */
function pistaFunction(palabra) {
    let pista = "";
    switch (palabra) {
        case 'LEON':
            pista = "Ruge y es fuerte.";
            break;
        case 'CABALLO':
            pista = "Hay de tierra y hay de mar.";
            break;
        case 'PERRO':
            pista = "El mejor amigo del hombre.";
            break;
        case 'GATO':
            pista = "Son tiernos pero arañan.";
            break;
        case 'LAGARTIJA':
            pista = "Se mueve rápidamente y a menudo se encuentra tomando el sol en las rocas.";
            break;
        case 'RINOCERONTE':
            pista = "Tiene una piel gruesa y es conocido por su cuerno, que a menudo es codiciado.";
            break;
        case 'TIBURON':
            pista = "Es un depredador ágil que vive en el océano y tiene un sentido del olfato extremadamente agudo.";
            break;
        case 'CARACOL':
            pista = "Se mueve lentamente";
            break;
        case 'ALACRAN':
            pista = "Tiene un veneno potente y vive en lugares secos.";
            break;
        case 'ARAÑA':
            pista = "Teje telas y tiene ocho patas.";
            break;
        case 'CHAPULIN':
            pista = "Salta alto y es un insecto muy común en México.";
            break;
        case 'AVESTRUZ':
            pista = "Es el ave más grande y no vuela.";
            break;
        case 'OCELOTE':
            pista = "Es un felino manchado que habita en la selva.";
            break;
        case 'MUSARAÑA':
            pista = "Pequeño mamífero que se parece a un ratón y es insectívoro";
            break;
        case 'AGUILA':
            pista = "Es un ave rapaz con una gran visión y vuela muy alto.";
            break;
        default:
            pista = "No hay pista aun xP";
    }
    ctx.fillStyle = "#FF6F61"; 
    ctx.font = "bold 25px Courier";  
    ctx.fillText(pista, 10, 15);  
}

/* Distribuir nuestro teclado con sus letras respectivas */
function teclado() {
    var ren = 0;
    var col = 0;
    var letra = "";
    var miLetra;
    var x = inicioX;
    var y = inicioY;
    for (var i = 0; i < letras.length; i++) {
        letra = letras.substr(i, 1);
        miLetra = new Tecla(x, y, lon, lon, letra);
        miLetra.dibuja();
        teclas_array.push(miLetra);
        x += lon + margen;
        col++;
        if (col == 10) {
            col = 0;
            ren++;
            if (ren == 2) {
                x = 280;
            } else {
                x = inicioX;
            }
        }
        y = inicioY + ren * 50;
    }
}

/* Obtener nuestra palabra aleatoriamente y la dividimos en letras */
function pintaPalabra() {
    var p = Math.floor(Math.random() * palabras_array.length);
    palabra = palabras_array[p];
    pistaFunction(palabra);
    var w = canvas.width;
    var len = palabra.length;
    var ren = 0;
    var col = 0;
    var y = 230;
    var lon = 50;
    var x = (w - (lon + margen) * len) / 2;
    for (var i = 0; i < palabra.length; i++) {
        letra = palabra.substr(i, 1);
        miLetra = new Letra(x, y, lon, lon, letra);
        miLetra.dibuja();
        letras_array.push(miLetra);
        x += lon + margen;
    }
}

/* Dibujar horca y partes del personaje */
function horca(errores) {
    var imagen = new Image();
    imagen.src = "img/ahorcado" + errores + ".png";
    imagen.onload = function () {
        ctx.drawImage(imagen, 390, 0, 230, 230);
    }
}

/* Ajustar coordenadas */
function ajusta(xx, yy) {
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx - posCanvas.left;
    var y = yy - posCanvas.top;
    return { x: x, y: y }
}

/* Detectar tecla clickeada y compararla con las letras de la palabra */
function selecciona(e) {
    var pos = ajusta(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var tecla;
    var bandera = false;
    for (var i = 0; i < teclas_array.length; i++) {
        tecla = teclas_array[i];
        if (tecla.x > 0) {
            if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)) {
                break;
            }
        }
    }
    if (i < teclas_array.length) {
        for (var i = 0; i < palabra.length; i++) {
            letra = palabra.substr(i, 1);
            if (letra == tecla.letra) {
                caja = letras_array[i];
                caja.dibujaLetra();
                aciertos++;
                bandera = true;
            }
        }
        if (!bandera) {
            errores++;
            horca(errores);
            if (errores == 5) gameOver(errores);
        }
        ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
        if (aciertos == palabra.length) gameOver(errores);
    }
}

/* Limpiar el canvas y mostrar mensaje de fin de juego */
function gameOver(errores) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "bold 50px Courier";
    if (errores < 5) {
        ctx.fillText("Muy bien, la palabra es: ", 110, 280);
    } else {
        ctx.fillText("Lo sentimos, la palabra era: ", 110, 280);
    }
    ctx.font = "bold 80px Courier";
    lon = (canvas.width - (palabra.length * 48)) / 2;
    ctx.fillText(palabra, lon, 380);
    horca(errores);
}

/* Función para iniciar el juego al hacer clic en el botón */
function iniciarJuego() {
    canvas = document.getElementById("pantalla");
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
        if (ctx) {
            teclado();
            pintaPalabra();
            horca(errores);
            canvas.addEventListener("click", selecciona, false);
        } else {
            alert("Error al cargar el contexto!");
        }
    }
}

// Agregar evento al botón
document.getElementById("startButton").addEventListener("click", iniciarJuego);
})();