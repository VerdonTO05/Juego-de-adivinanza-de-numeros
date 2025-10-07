// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos el formulario y el input
    const form = document.getElementById('myForm');
    const input = document.getElementById('numInput');
    let numRandom = Math.floor(Math.random() * 100) + 1;
    let counter = 0;
    const textAlert = document.createElement("p");
    const textCounter = document.createElement("p");
    document.body.appendChild(textAlert);
    document.body.appendChild(textCounter);


    // Escuchamos el evento submit
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita recargar la página

        // Obtenemos el valor ingresado
        const numberInput = parseInt(input.value, 10); // Número entero

        if (!isNaN(numberInput)) {
            counter++;
            if (numberInput > numRandom) {
                textAlert.textContent = 'El número es menor de ' + numberInput;
                textCounter.textContent = 'Intentos totales: ' + counter;
            } else if (numberInput < numRandom) {
                textAlert.textContent = 'El número es mayor de ' + numberInput;
                textCounter.textContent = 'Intentos totales: ' + counter;
            } else {
                if (counter < 5) {
                    textAlert.textContent = 'Excelente: Has acertado el número: ' + numberInput + ' en ' + counter + ' intentos.';
                } else if (counter < 10) {
                    textAlert.textContent = 'Bien: Has acertado el número: ' + numberInput + ' en ' + counter + ' intentos.';
                } else {
                    textAlert.textContent = 'Regular: Has acertado el número: ' + numberInput + ' en ' + counter + ' intentos.';
                }
                counter = 0;
                numRandom = Math.floor(Math.random() * 100) + 1;
                textCounter.textContent = '';
            }
        } else {
            console.log('Por favor, introduce un número válido.');
        }

        form.reset();
    });

    //TODO: mostrar seguimiento de numeros introducidos, es decir para que sea mas facil poder jugar que se muestre el historial.

});
