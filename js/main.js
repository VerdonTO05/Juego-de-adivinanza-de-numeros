// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos principales ---
    const form = document.getElementById('myForm');
    const input = document.getElementById('numInput');
    const submitBtn = form.querySelector('button[type="submit"]'); // 👈 botón Enviar
    const resetBtn = document.getElementById('resetBtn');
    const historyBody = document.getElementById('historyBody');
    const toggleSwitch = document.getElementById('toggleTheme');

    // --- Variables del juego ---
    let numRandom = Math.floor(Math.random() * 100) + 1;
    let counter = 0;

    // --- Elementos de feedback ---
    const textAlert = document.createElement("p");
    const textCounter = document.createElement("p");
    document.getElementById('card').appendChild(textAlert);
    document.getElementById('card').appendChild(textCounter);

    // --- Evento: enviar número ---
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const numberInput = parseInt(input.value, 10);

        // Validar entrada
        if (isNaN(numberInput)) {
            textAlert.textContent = 'Por favor, introduce un número válido.';
            textAlert.className = 'error';
            return;
        }

        counter++;
        let resultText = "";
        let resultClass = "";

        // --- Lógica del juego ---
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
            // --- Si acierta ---
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

            // 🔹 Ocultar el botón Enviar
            submitBtn.style.display = 'none';

            // Reiniciar número aleatorio y contador
            numRandom = Math.floor(Math.random() * 100) + 1;
            counter = 0;
        }

        // --- Agregar fila al historial ---
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${counter}</td>
            <td>${numberInput}</td>
            <td class="${resultClass}">${resultText}</td>
        `;
        historyBody.appendChild(row);

        form.reset();
    });

    // --- Evento: reiniciar juego ---
    resetBtn.addEventListener("click", () => {
        historyBody.innerHTML = "";
        input.value = "";
        textAlert.textContent = "";
        textCounter.textContent = "";
        counter = 0;
        numRandom = Math.floor(Math.random() * 100) + 1;

        // 🔹 Mostrar nuevamente el botón Enviar
        submitBtn.style.display = 'inline-block';
    });

    // --- Evento: cambio de tema (modo oscuro) ---
    toggleSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode", toggleSwitch.checked);
    });
});
