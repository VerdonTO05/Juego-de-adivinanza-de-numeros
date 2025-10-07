// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // Seleccionamos el formulario y el input
  const form = document.getElementById('myForm');
  const input = document.getElementById('numInput');

  // Escuchamos el evento submit
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita recargar la página

    // Obtenemos el valor ingresado
    const numero = parseInt(input.value, 10);

    
    form.reset();
  });

});
