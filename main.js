

let base_preguntas = [];
let pregunta_actual;
let preguntas_ordenadas = [];
let respuesta_seleccionada = null;

fetch("./db.json") // Asegura que Live Server lo detecte correctamente

document.addEventListener("DOMContentLoaded", function () {
    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            base_preguntas = data;
            preguntas_ordenadas = [...base_preguntas].sort(() => Math.random() - 0.5);
            escogerPregunta();
        })
        .catch(error => console.error("Error cargando JSON:", error));

    document.querySelector(".btnsiguiente").addEventListener("click", verificarRespuesta);
});


function escogerPregunta() {

    pregunta_actual = preguntas_ordenadas.pop();
    respuesta_seleccionada = null; // Resetear la selección

    document.querySelector("section h2").textContent = pregunta_actual.pregunta;
    desordenarRespuestas(pregunta_actual);
}

function desordenarRespuestas(pregunta) {
    let opciones = [pregunta.respuesta, pregunta.incorrecta1, pregunta.incorrecta2];
    opciones.sort(() => Math.random() - 0.5);
    
    let labels = document.querySelectorAll("label");
    labels.forEach((label, index) => {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "p0";
        input.value = opciones[index];
        input.addEventListener("change", () => respuesta(input.value)); // Evento para guardar la respuesta

        label.innerHTML = ""; // Limpiar contenido anterior
        label.appendChild(input);
        label.append(` ${opciones[index]}`);
    });
}

function respuesta(valor) {
    respuesta_seleccionada = valor; // Guardar la opción seleccionada
}

function verificarRespuesta() {
    if (respuesta_seleccionada === null) {
        Swal.fire({
            title: "¡ESPERA!",
            text: "Por favor selecciona una respuesta.",
            imageUrl: "./imagenes/selecciona.png",
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: "Entendido",
            customClass: {
                popup: "mi-alerta",
                title: "mi-titulo",
                confirmButton: "mi-boton"
            },
            heightAuto: false
        });
        return;
    }

    if (respuesta_seleccionada === pregunta_actual.respuesta) {
        Swal.fire({
            title: "¡CORRECTO!✅",
            text: "Has respondido correctamente.",
            imageUrl: "./imagenes/bien.png",
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: "Siguiente pregunta",
            customClass: {
                popup: "mi-alerta",
                title: "mi-titulo",
                confirmButton: "mi-boton"
            },
            heightAuto: false
        }).then(() => {
            if (preguntas_ordenadas.length === 0) {
                // Si no hay más preguntas, muestra el mensaje de agradecimiento
                Swal.fire({
                    title: "¡Gracias por participar! 🎉",
                    text: "Has completado el quiz. ¡Esperamos verte nuevamente!",
                    imageUrl: "./imagenes/gracias.png", // Puedes poner una imagen de agradecimiento aquí
                    imageWidth: 200,
                    imageHeight: 200,
                    confirmButtonText: "¡De nada!",
                    customClass: {
                        popup: "mi-alerta",
                        title: "mi-titulo",
                        confirmButton: "mi-boton"
                    },
                    heightAuto: false
                });
            } else {
                escogerPregunta(); // Cargar la siguiente pregunta
            }
        });

    } else {
        Swal.fire({
            title: "INCORRECTO ❌",
            text: `La respuesta correcta era: ${pregunta_actual.respuesta}`,
            imageUrl: "./imagenes/mal.png",
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: "Intentar de nuevo",
            customClass: {
                popup: "mi-alerta",
                title: "mi-titulo",
                confirmButton: "mi-boton"
            },
            heightAuto: false
        });
    }
}


    
    escogerPregunta(); // Pasar a la siguiente pregunta

