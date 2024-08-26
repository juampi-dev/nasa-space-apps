// FALTAN label
document.getElementById("faltan").innerHTML = "Faltan ";

// Fecha objetivo
const targetDate = new Date('2024-10-05T08:00:00').getTime();

// Función para actualizar el contador
function updateCountdown() {
  const now = new Date().getTime();
  const timeDifference = targetDate - now;

  // Calcular días, horas, minutos y segundos restantes
  const days = `${Math.floor(timeDifference / (1000 * 60 * 60 * 24))} días`;
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Mostrar los valores en el HTML
  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
  document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

  // Detener el contador cuando la fecha objetivo es alcanzada
  if (timeDifference < 0) {
    clearInterval(countdownInterval);
    document.getElementById("timer").style.display = "none";
    document.getElementById("faltan").innerHTML = "";
    document.getElementById("days").innerHTML = "El Evento ya comenzó: ¡El Sol lo toca todo!";
  }
}

// Actualizar el contador cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);

// Llamar la función una vez para mostrar el tiempo inmediatamente
updateCountdown();