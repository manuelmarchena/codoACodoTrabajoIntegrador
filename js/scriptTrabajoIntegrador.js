//Precio de ticket
const precio = 200

// Descuentos
let mailValidado = false
let seleccionCategoria = false
let inputValido = false

// Elementos en variables
let descuentoAplicado
let totalAPagar
let ticketsEmail = document.getElementById("ticketsEmail")
let ticketsCantidadticketsCantidad = document.getElementById("ticketsCantidad")
let ticketsTotalPago = document.getElementById("ticketsTotalPago")
let ticketsborrar = document.getElementById("ticketsborrar")
let ticketsResumen = document.getElementById("ticketsResumen")

// Función robada de la clase sin permiso, elimina la clase 'is-invalid'

function quitarClaseError() {
    let x = document.querySelectorAll(".form-control, .form-select")
    let i
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove("is-invalid");
        x[i].value = ""
    }
}

function validacionesDeInput() {

    //Función robada
    // Array de elementos a validar
    let listaValidacion = ['input', 'select', 'span']
    for (i = 0; i < listaValidacion.length; i++) {

        // Recorre el arreglo listaValidación

        // console.log(prueba)
        let listaElementos = document.querySelectorAll(listaValidacion[i])
        let ArraydeElementos = [...listaElementos]
            //Realiza verificaciones para los input 
            //Si i=0, listaValidacion == 'input'; verifica todos los campos y el mail
        if (listaValidacion[i] == "input") {
            for (j = 0; j < ArraydeElementos.length; j++) {
                let capturaId = document.getElementsByTagName(listaValidacion[i])[j].id
                let capturaEstilo = document.getElementsByTagName(listaValidacion[i])[j].classList
                let capturaValue = document.getElementsByTagName(listaValidacion[i])[j].value
                console.log(capturaId)
                    // Verifica si hay algún valor vacio 
                if (capturaValue == "") {
                    console.log("Por favor complete el campo ", capturaId)
                    capturaEstilo.add("is-invalid")
                } else {
                    inputValido = true
                }
                // Verifica si valor es un numero o es cero 
                if (capturaId == "ticketsCantidad" && (isNaN(capturaValue) || capturaId == 0)) {
                    console.log("No introdujo una Cantidad de Tickets válida")
                    capturaEstilo.add("is-invalid")
                        // pruebaDecaptura.focus()
                }
                if (capturaId == "ticketsCantidad") {
                    ticketsCantidad = capturaValue
                    console.log(ticketsCantidad)
                }
                // Verifica si el mail es valido 
                if (capturaId == "ticketsEmail") {
                    const emailvalido = (capturaValue) => {
                        let caracteresMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return caracteresMail.test(capturaValue)

                    }
                    if (!emailvalido(capturaValue)) {
                        console.warn("Correo Invalido")
                        capturaEstilo.add("is-invalid")
                    } else {
                        mailValidado = true
                    }
                }
            }
        }
        // Realiza varificaciones para el select
        if (listaValidacion[i] == "select") {
            // Verificar cuales borrar de las 4 proximas lineas
            //Obtiene valore seleccionado
            let capturaValue = document.querySelector("select").value
                // Determina el tamaño de la matriz, era para ponerlo en las opciones de del switch -case
            let capturaValueOption = document.querySelectorAll("option")
                // Para aplicar is-invalid en caso de error
            let capturaEstilo = document.querySelector("select").classList

            // Verifica si se seleccionó un valor y manda alerta en caso de NO
            if (capturaValue == "-") {
                console.log("Seleccione una categoría")
                capturaEstilo.add("is-invalid")
            } else {
                // Agrega en la variable el valor seleccionado para los cálculos

                descuentoAplicado = capturaValue
                seleccionCategoria = true
            }

        }
        if (listaValidacion[i] == "span") {
            montoTotal(seleccionCategoria)
        }
    }
}

function montoTotal() {
    debugger
    if (isNaN(ticketsCantidad) || isNaN(descuentoAplicado)) {
        console.error("Selecione una Categoría")
    } else if (
        inputValido &&
        seleccionCategoria &&
        inputValido &&
        mailValidado
    ) {
        totalAPagar = (ticketsCantidad * precio * (1 - descuentoAplicado)).toFixed(1)
        ticketsTotalPago.innerHTML = totalAPagar
    }

    return
}

function reset_total_a_pagar() {
    quitarClaseError()
    ticketsCategoria.value = "-"
    return ticketsTotalPago.innerHTML = ""
}

ticketsborrar.addEventListener('click', reset_total_a_pagar)


ticketsResumen.addEventListener('click', validacionesDeInput)