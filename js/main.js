// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos principales ---
    const form = document.getElementById('myForm');
    const input = document.getElementById('numInput');
    const resetBtn = document.getElementById('resetBtn');
    const historyList = document.getElementById('historyList');
    const toggleSwitch = document.getElementById('toggleTheme');

    // --- Variables de juego ---
    let numRandom = Math.floor(Math.random() * 100) + 1;
    let counter = 0;

    // --- Elementos de feedback ---
    const textAlert = document.createElement("p");
    const textCounter = document.createElement("p");
    document.getElementById('card').appendChild(textAlert);
    document.getElementById('card').appendChild(textCounter);

    // --- Evento de enviar número ---
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita recarga

        const numberInput = parseInt(input.value, 10); // Número entero

        if (!isNaN(numberInput)) {
            counter++;

            // Crear item de historial
            const li = document.createElement("li");

            if (numberInput > numRandom) {
                textAlert.textContent = 'El número es menor de ' + numberInput;
                textAlert.className = 'error';
                textCounter.textContent = 'Intentos totales: ' + counter;

                li.textContent = `➤ ${numberInput} (Muy alto)`;
            } else if (numberInput < numRandom) {
                textAlert.textContent = 'El número es mayor de ' + numberInput;
                textAlert.className = 'error';
                textCounter.textContent = 'Intentos totales: ' + counter;

                li.textContent = `➤ ${numberInput} (Muy bajo)`;
            } else {
                if (counter < 5) {
                    textAlert.textContent = 'Excelente: Has acertado el número: ' + numberInput + ' en ' + counter + ' intentos.';
                } else if (counter < 10) {
                    textAlert.textContent = 'Bien: Has acertado el número: ' + numberInput + ' en ' + counter + ' intentos.';
                } else {
                    textAlert.textContent = 'Regular: Has acertado el número: ' + numberInput + ' en ' + counter + ' intentos.';
                }
                textAlert.className = 'acertado';
                textCounter.textContent = '';

                li.textContent = `🎉 ${numberInput} (¡Acertado!)`;

                // Reiniciar número aleatorio y contador para nueva partida
                numRandom = Math.floor(Math.random() * 100) + 1;
                counter = 0;
            }

            historyList.appendChild(li);
        } else {
            console.log('Por favor, introduce un número válido.');
        }

        form.reset();
    });

    // --- Reiniciar juego e historial ---
    resetBtn.addEventListener("click", () => {
        historyList.innerHTML = ""; // limpia historial
        input.value = "";           // limpia input
        textAlert.textContent = ""; // limpia mensajes
        textCounter.textContent = "";
        counter = 0;
        numRandom = Math.floor(Math.random() * 100) + 1; // nuevo número secreto
    });

    // --- Cambio de tema ---
    toggleSwitch.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode", toggleSwitch.checked);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const input = document.getElementById('numInput');
    const resetBtn = document.getElementById('resetBtn');
    const historyBody = document.getElementById('historyBody');
    const toggleSwitch = document.getElementById('toggleTheme');

    let numRandom = Math.floor(Math.random() * 100) + 1;
    let counter = 0;

    const textAlert = document.createElement("p");
    const textCounter = document.createElement("p");
    document.getElementById('card').appendChild(textAlert);
    document.getElementById('card').appendChild(textCounter);

    // --- Enviar número ---
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const numberInput = parseInt(input.value, 10);

        if (!isNaN(numberInput)) {
            counter++;
            let resultText = "";
            let resultClass = "";

            if (numberInput > numRandom) {
                resultText = "Muy alto";
                resultClass = "result-high";
                textAlert.textContent = 'El número es menor de ' + numberInput;
                textAlert.className = 'error';
                textCounter.textContent = 'Intentos totales: ' + counter;
            } else if (numberInput < numRandom) {
                resultText = "Muy bajo";
                resultClass = "result-low";
                textAlert.textContent = 'El número es mayor de ' + numberInput;
                textAlert.className = 'error';
                textCounter.textContent = 'Intentos totales: ' + counter;
            } else {
                resultText = "¡Acertado!";
                resultClass = "result-win";

                if (counter < 5) {
                    textAlert.textContent = `Excelente: Has acertado en ${counter} intentos.`;
                } else if (counter < 10) {
                    textAlert.textContent = `Bien: Has acertado en ${counter} intentos.`;
                } else {
                    textAlert.textContent = `Regular: Has acertado en ${counter} intentos.`;
                }
                textAlert.className = 'acertado';
                textCounter.textContent = '';

                // Reinicia el juego
                numRandom = Math.floor(Math.random() * 100) + 1;
                counter = 0;
            }

            // Agregar fila al historial
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${counter}</td>
                <td>${numberInput}</td>
                <td class="${resultClass}">${resultText}</td>
            `;
            historyBody.appendChild(row);
        }

        form.reset();
    });

    // --- Reiniciar ---
    resetBtn.addEventListener("click", () => {
        historyBody.innerHTML = "";
        input.value = "";
        textAlert.textContent = "";
        textCounter.textContent = "";
        counter = 0;
        numRandom = Math.floor(Math.random() * 100) + 1;
    });

    // --- Cambio de tema ---
    toggleSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode", toggleSwitch.checked);
    });
});

