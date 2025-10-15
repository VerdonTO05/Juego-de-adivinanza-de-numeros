// Espera a que el DOM esté completamente cargado (evitando cualquier error)
document.addEventListener('DOMContentLoaded', () => {

    // Elementos principales de la página
    const form = document.getElementById('myForm');
    const input = document.getElementById('numInput');
    const submitBtn = form.querySelector('button[type="submit"]');
    const resetBtn = document.getElementById('resetBtn');
    const historyBody = document.getElementById('historyBody');
    const toggleSwitch = document.getElementById('toggleTheme');
    const toggleHistoryBtn = document.getElementById("toggleHistoryBtn");
    const historyCard = document.getElementById("historyCard");
    const timerEl = document.getElementById('timer');

    // Variables del juego
    let numRandom = Math.floor(Math.random() * 100) + 1;
    let counter = 0;
    let time = 60;
    let intervaloTime = null;
    let gameOver = false;

    // Elementos de feedback
    const textAlert = document.createElement("p");
    const textCounter = document.createElement("p");
    document.getElementById('card').appendChild(textAlert);
    document.getElementById('card').appendChild(textCounter);

    // Evento: enviar número 
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if(gameOver) return; //Si el juego está terminado que no pueda seguir enviando

        const numberInput = parseInt(input.value, 10);

        if (counter === 0) iniciarCuentaAtras();

        // Comprueba que el valor introducido sea válido 
        if (isNaN(numberInput)) {
            textAlert.textContent = 'Por favor, introduce un número válido.';
            textAlert.className = 'error';
            return;
        }

        counter++;
        let resultText = "";
        let resultClass = "";

        // Lógica del juego 
        if (numberInput !== numRandom) {
            const diferencia = Math.abs(numberInput - numRandom);

            if (diferencia === 1) {
                resultText = "Casi casi";
                resultClass = "result-close";
                textAlert.textContent = numberInput > numRandom
                    ? '¡Estás muy cerca! Es un poco menor.'
                    : '¡Estás muy cerca! Es un poco mayor.';
            }
            else if (numberInput > numRandom) {
                resultText = "Muy alto";
                resultClass = "result-high";
                textAlert.textContent = 'El número es MENOR que ' + numberInput;
            }
            else {
                resultText = "Muy bajo";
                resultClass = "result-low";
                textAlert.textContent = 'El número es MAYOR que ' + numberInput;
            }

            textAlert.className = 'error';
            textCounter.textContent = 'Intentos totales: ' + counter;
        } else {
            // Si acierta 
            gameOver = true;
            resultText = "¡Acertado!";
            resultClass = "result-win";

            if (counter < 5) {
                textAlert.textContent = `Excelente: ¡Has acertado en ${counter} intentos!`;
                mostrarAnimacion("excelente");
            } else if (counter < 10) {
                textAlert.textContent = `Bien: ¡Has acertado en ${counter} intentos!`;
                mostrarAnimacion("bien");
            } else {
                textAlert.textContent = `Regular: Has acertado en ${counter} intentos.`;
                mostrarAnimacion("regular");
            }

            textAlert.className = 'acertado';
            textCounter.textContent = '';
            clearInterval(intervaloTime);
            document.getElementById('timer').textContent = "¡A tiempo!";

            // Ocultar el botón Enviar (Evita que se pueda pulsar para evitar errores)
            submitBtn.style.display = 'none';
        }

        // Agregar fila al historial
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${counter}</td>
            <td>${numberInput}</td>
            <td class="${resultClass}">${resultText}</td>
        `;
        historyBody.appendChild(row);
        form.reset();
    });

    // Evento: reiniciar juego
    resetBtn.addEventListener("click", () => {
        historyBody.innerHTML = "";
        input.value = "";
        textAlert.textContent = "";
        textCounter.textContent = "";
        counter = 0;
        numRandom = Math.floor(Math.random() * 100) + 1;
        clearInterval(intervaloTime);
        time = 60;
        timerEl.textContent = "60s";
        timerEl.className = "time-good";
        submitBtn.disabled = false;
        gameOver = false;

        // Mostrar nuevamente el botón Enviar
        submitBtn.style.display = 'inline-block';
    });

    // Evento: cambio de tema (modo oscuro)
    toggleSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode", toggleSwitch.checked);
    });

    // Ocultamos el historial por defecto
    historyCard.style.display = "none";

    toggleHistoryBtn.addEventListener("click", () => {
        const visible = historyCard.style.display === "block";

        if (visible) {
            historyCard.style.display = "none";
            toggleHistoryBtn.textContent = "Mostrar historial";
        } else {
            historyCard.style.display = "block";
            toggleHistoryBtn.textContent = "Ocultar historial";
        }
    });

    function iniciarCuentaAtras() {
        // Evita múltiples temporizadores simultáneos
        clearInterval(intervaloTime);
        time = 60; // Reinicia el tiempo

        timerEl.textContent = `${time}s`;
        timerEl.className = "timer-good";
        intervaloTime = setInterval(() => {
            time--;
            timerEl.textContent = `${time}s`;

            if (time <= 5) {
                timerEl.className = "timer-bad";
            } else if (time <= 10) {
                timerEl.className = "timer-regular";
            } else {
                timerEl.className = "timer-good";
            }

            // Si el tiempo se acaba
            if (time <= 0) {
                clearInterval(intervaloTime);
                timerEl.textContent = "¡Tiempo agotado!";
                submitBtn.style.display = 'none'; // Oculta boton enviar
                textAlert.textContent = "¡Se acabó el tiempo! Reinicia el juego.";
                textAlert.className = "error";
                gameOver = true;
            }
        }, 1000);
    }
});

function mostrarAnimacion(tipo) {
    // FUEGOS ARTIFICIALES (excelente)
    if (tipo === "excelente") {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = 0;
        container.style.left = 0;
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.zIndex = 9999;
        document.body.appendChild(container);

        const fireworks = new Fireworks.default(container, {
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.98,
            gravity: 1.5,
            particles: 70,
            trace: 3,
            explosion: 5
        });
        fireworks.start();

        setTimeout(() => {
            fireworks.stop();
            container.remove();
        }, 4000);
    }

    // CONFETI (bien)
    else if (tipo === "bien") {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            // Confeti de ambos lados
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }

    // CARITAS TRISTES (regular)
    else if (tipo === "regular") {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = 0;
        container.style.left = 0;
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.overflow = 'hidden';
        container.style.pointerEvents = 'none';
        container.style.zIndex = 9999;
        document.body.appendChild(container);

        const totalFaces = 30;
        const emojis = ['😞', '😢', '😔', '😭'];

        for (let i = 0; i < totalFaces; i++) {
            const face = document.createElement('div');
            face.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            face.style.position = 'absolute';
            face.style.left = Math.random() * 100 + 'vw';
            face.style.top = '-50px';
            face.style.fontSize = `${Math.random() * 24 + 24}px`;
            face.style.opacity = Math.random() * 0.8 + 0.2;
            container.appendChild(face);

            // Animación de caída
            const duration = Math.random() * 3000 + 3000; // entre 3 y 6 segundos
            const translateY = window.innerHeight + 100;

            face.animate([
                { transform: 'translateY(0) rotate(0deg)' },
                { transform: `translateY(${translateY}px) rotate(${Math.random() * 720 - 360}deg)` }
            ], {
                duration: duration,
                easing: 'ease-in',
                iterations: 1,
                delay: Math.random() * 1000
            });
        }

        // Limpiar después de unos segundos
        setTimeout(() => container.remove(), 7000);
    }
}



