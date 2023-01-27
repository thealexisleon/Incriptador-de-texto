const textarea = document.querySelector("#textoEncriptar");
const btnEncriptar = document.querySelector(".btnEncriptar");
const btnDesencriptar = document.querySelector(".btnDesencriptar");
const btnCopiar = document.querySelector(".btnCopiar");
const textoEncriptado = document.querySelector("#textoEncriptado");
const cardTextoEncriptado = document.querySelector(".cardTextoEncriptado");

function mostrarTextoEncriptado(textareaValue){
    //Verificar que se haya ingresado texto
    if (textareaValue !==""){
        //Eliminar la clase del "hidden" del textarea
        textoEncriptado.classList.remove("hidden");
        // Ocultar el contenido del card
        cardTextoEncriptado.style.display = "none";
    } else{
        //Añadir la clase "hidden" al textarea
        textoEncriptado.classList.add("hidden");
        //Mostrar el contenido de la tarjeta
        cardTextoEncriptado.style.display = "flex";
    }
    //Asignacion del valor del texto pasado por el parametro al textarea que contrendra el el texto encriptado
    textoEncriptado.value = textareaValue;
}

function mostrarTextArea(textareaValue){
    //Verificar si el valor del campo de texto "encryptedTextarea" esta vacío
    if (textoEncriptado.value == "") {
        //Si esta vacio, se agrega la clase "hidden" al campo de texto "encryptedTextarea" y se establece la propiedad "display" del elemento "cardContent" en "flex".
        textoEncriptado.classList.add("hidden");
        cardTextoEncriptado.style.display = "flex";
    }
    //Establecer el valor del campo de texto "textarea" con el valor del argumento "textareaValue".
    textarea.value = textareaValue;
}

//Función para verificar si el texto posee acentos, en caso de que sí, cambiarlos a caracteres sin acentos.
function revisarTexto(textareaValue) {
    let newText = textareaValue.replace(/á/g, "a")
                            .replace(/é/g, "e")
                            .replace(/í/g, "i")
                            .replace(/ó/g, "o")
                            .replace(/ú/g, "u")
    return newText;
}

function encriptarTexto(textareaValue){
    //Se declara una variable que almacenará el valor que retorne la función revisarTexto
    let cleanText = revisarTexto(textareaValue);
    //Iniciamos una variable para almacenar el incriptado
    let newText = "";

    //Hacemos el recorrido de cada caracter del texto ingresado
    for (let i = 0; i < cleanText.length; i++){
        let letter = cleanText[i];
        //Comparación del caracter con las letras "a","e","i","o","u"
        switch(letter){
            //Caracter "a", cambiarlo por "ai"
            case 'a':
                newText += "ai";
                break;
            //Caracter "e", cambiarlo por "enter"
            case 'e':
                newText += "enter";
                break;
            //Caracter "i", cambiarlo por "imes"
            case 'i':
                newText += "imes";
                break;
            //Caracter es "o", cambiarlo por "ober"
            case 'o':
                newText += "ober";
                break;
            //Caracter es "u", cambiarlo por "ufat"
            case 'u':
                newText += "ufat";
                break;
            // Si el caracter no es ninguna de las letras especificadas, lo agregamos tal y como está al texto encriptado
            default:
                newText += letter;
        }
    }
    //Mostramos el texto Encriptado
    mostrarTextoEncriptado(newText);
}

//Función para desencriptar el texto
function desencriptarTexto(textareaValue) {
    let cleanText = revisarTexto(textareaValue);
    // Utilizamos el método replace() para hacer lo opuesto en la función encryptText
    // Es importante hacerlo en orden inverso para evitar que algunas de las cadenas de encriptación sean reemplazadas por otras cadenas de encriptación
    let newText = cleanText.replace(/ufat/g, "u")
                        .replace(/ober/g, "o")
                        .replace(/imes/g, "i")
                        .replace(/enter/g, "e")
                        .replace(/ai/g, "a");
    // Asignamos el texto desencriptado en el elemento encryptedTextarea
    textareaValue = newText;
    mostrarTextoEncriptado(textareaValue);
}

function copiarTexto(value){
     //Se declara una variable que almacena el contenido actual del botón "btnCopiar" 
     let originalText = btnCopiar.innerHTML;
     //Verificar si el campo de texto no está vacío
     if (value !== "") {
         //Selecciona el campo de texto "encryptedTextarea" y establece su rango de selección desde el caracter 0 hasta el 999.
         textoEncriptado.select();
         textoEncriptado.setSelectionRange(0, 999);
         //Utiliza el método "writeText" del objeto "navigator.clipboard" para escribir el valor del campo de texto "encryptedTextarea" en el portapapeles del sistema.
         navigator.clipboard.writeText(value);
         //Cambia el contenido del botón "btnCopy" a "¡Texto copiado!"
         btnCopiar.innerHTML = "¡Texto copiado!";
         //Establece una función que cambiará el texto de "bntCopy" a su valor original.
         setTimeout(function() {
            btnCopiar.innerHTML = originalText;
         }, 1000);
     }
}

//Se agregan los eventos a los botones para llamar a las funciones
btnEncriptar.addEventListener("click",()=> {
    encriptarTexto(textarea.value);
});

btnDesencriptar.addEventListener("click",()=>{
    desencriptarTexto(textarea.value);
});

btnCopiar.addEventListener("click", function() {
    copiarTexto(textoEncriptado.value);
});
