const codigo = [];
const maxIntento = 6;
const result = [];
let intentos = 0;

codigoSecreto();
console.log(codigo);
generarTablaIntentos(maxIntento);


/* Genera una constante CODIGO_SECRETO de tipo array de 5 número aleatorios entre 0 y 9 usando la libreria Math.random();*/
function codigoSecreto() {
    for (let i = 0; i < 5; i++) {
        codigo[i] = Math.floor((Math.random() * 10));
    }
}

function generarTablaIntentos(maxIntento) {
    for (i = 0; i < maxIntento; i++) {
        divGrande = document.createElement("div")
        divGrande.classList.add("rowResult", "w100", "flex", "wrap")
        document.getElementById("Result").appendChild(divGrande)
    }
    divsGrandes = document.getElementsByClassName("rowResult")
    for (i = 0; i < divsGrandes.length; i++) {
        for (u = 0; u < 5; u++) {
            divMediano = document.createElement("div")
            divMediano.classList.add("w20")
            divsGrandes[i].appendChild(divMediano)
        }
    }
    divsMedianos = document.getElementById("Result").getElementsByClassName("w20")
    for (i = 0; i < divsMedianos.length; i++) {
        divPequeno = document.createElement("div");
        divPequeno.classList.add("celResult", "flex");
        divsMedianos[i].appendChild(divPequeno)
    }
}

/* Coje el numero introducido por el usuario para comprobar digito por digito si es exacto, inexacto o inexistente en el CODIGO_SECRETO.*/
function Comprobar() {
    var codUsuario = document.getElementById("numero").value; //String
    if (codigoValido(codUsuario)) {
        result.length = 0; //Reseteo la lista resultado
        for (i = 0; i < 5; i++) {
            if (codUsuario[i] == codigo[i]) {
                result[i] = 1;
            } else if (codigo.includes(parseInt(codUsuario[i]))) {
                result[i] = 2;
            } else {
                result[i] = 3;
            }
        }

        if (numAcertado()) {
            finalizarPartida();
        } else if (intentos < maxIntento) {
            insertarIntento(codUsuario);
            mostrarInfo();
        } else {
            fallarPartida();
        }

    }
    document.getElementById("numero").value = "";
}

/* Compruebo que el codigo siga las reglas: 5 dígitos numéricos, ni letras ni cualquier otro carácter*/
function codigoValido(codUsuario) {
    let mensaje = ""

    if (codUsuario.toUpperCase() != codUsuario.toLowerCase()) {
        mensaje = "No se permiten caràcteres no numericos"
        mostrarError(mensaje);
        return false
    } else if (codUsuario.length != 5) {
        mensaje = "Introduce 5 dígitos"
        mostrarError(mensaje);
        return false
    } else if (detectarSimbolos(codUsuario)) {
        mensaje = "No se permiten símbolos"
        mostrarError(mensaje);
        return false
    } else {
        return true
    }
}

/* Detectar carácter por carácter si se trata de un número o de cualquier otro símbolo. Esta función se ejecuta sólo para buscar carácteres no alfanuméricos.*/
function detectarSimbolos(codUsuario) {
    var simboloEncontrado = false;
    for (i = 0; i < 5; i++) {
        if (codUsuario.charCodeAt(i) < 48 || codUsuario.charCodeAt(i) > 57) {
            simboloEncontrado = true;
        }
    }
    return simboloEncontrado;
}

/* Cambia el mensaje de información según las condiciones*/
function mostrarError(mensaje) {
    document.getElementById("info").innerHTML = mensaje
    document.getElementsByClassName("info")[0].style.backgroundColor = "red"
}

/* Comprueba si se ha acertado el número secreto*/
function numAcertado() {
    aciertos = 0;
    for (i = 0; i < 5; i++) {
        if (result[i] == 1) {
            aciertos++;
        }
    }
    return (aciertos == 5);
}

/* Muestra el código acertado en las celdas de arriba, cambia el mensaje de info y permite reiniciar la pàgina para empezar una nueva partida*/
function finalizarPartida() {
    document.getElementById("info").innerHTML = "Número acertado, enhorabuena!";
    document.getElementsByClassName("info")[0].style.backgroundColor = "rgb(45, 177, 45)"
    cels = document.getElementById("codigo").getElementsByClassName("cel")
    for (i = 0; i < 5; i++) {
        cels[i].innerHTML = codigo[i]
        cels[i].style.backgroundColor = "#1DCD18"
    }
    boton = document.getElementById("check")
    boton.innerHTML = "Nueva partida"
    boton.setAttribute("onclick", "location.reload()");
}

/* Inserta el código introducido por el usuario en las celdas de intentos, con sus respectivos colores de aciertos*/
function insertarIntento(codUsuario) {
    const matrizIntentos = document.getElementById("Result").getElementsByClassName("rowResult");
    celdas = matrizIntentos[intentos].getElementsByClassName("celResult");
    console.log(matrizIntentos.length)
    for (i = 0; i < 5; i++) {
        if (result[i] == 1) {
            celdas[i].style.backgroundColor = "green";
        } else if (result[i] == 2) {
            celdas[i].style.backgroundColor = "yellow";
        } else {
            celdas[i].style.backgroundColor = "#4E4E4E";
        }
        celdas[i].innerHTML = codUsuario[i];
    }
    intentos++;
}

/* Cambia el mensaje de info después de cada intento mientras aún haya intentos disponibles.*/
function mostrarInfo() {
    info = document.getElementById("info")
    document.getElementsByClassName("info")[0].style.backgroundColor = "#FFC300"

    switch (intentos) {
        case 1:
            info.innerHTML = "Primer intento, ni tan mal!";
            break;
        case 2:
            info.innerHTML = "A la tercera va la vencida!";
            break;
        case 3:
            info.innerHTML = "Buen intento!"
            break;
        case 4:
            info.innerHTML = "Vas en buen camino!";
            break;
        case 5:
            info.innerHTML = "Casi lo tienes!";
            break;
        default:
            info.innerHTML = "Ya vuelo la victoria!";
            break;
    }
}

function fallarPartida() {
    document.getElementById("info").innerHTML = "Vaya! No ha habido suerte esta vez.";
    document.getElementsByClassName("info")[0].style.backgroundColor = "red";
    cels = document.getElementById("codigo").getElementsByClassName("cel")
    for (i = 0; i < 5; i++) {
        cels[i].innerHTML = codigo[i]
        cels[i].style.backgroundColor = "red"
    }
}