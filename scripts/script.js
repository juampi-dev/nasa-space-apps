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

// Fetch de json para las cards dinámicas
fetch('./scripts/challenges.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('challengesGrid');
    data.forEach(desafio => {
      const card = document.createElement('div');
      card.className = 'challengesCard';

      // Verifica si la descripción es mayor a 250 caracteres
      let descripcionCorta = desafio.descripcion;
      if (desafio.descripcion.length > 200) {
        descripcionCorta = desafio.descripcion.substring(0, 200) + '...';
      }

      card.innerHTML = `
        <div class="cardInner">
          <div class="cardFront" style="background-image: url('assets/challenges/NASA_Space_Apps_2024_Challenge_${desafio.id}.jpg');">
            <h6>${desafio.titulo}</h6>
            <div class="flipIcon">&#x21bb; Más info</div>
          </div>
          <div class="cardBack">
            <p>${descripcionCorta}</p>
            <a class="cardCta" href="${desafio.link}" target="_blank">Ver más</a>
          </div>
        </div>
        `;

      const style = document.createElement('style');
      style.innerHTML = `
        .challengesCard:nth-child(${desafio.id}) .cardBack::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('assets/challenges/NASA_Space_Apps_2024_Challenge_${desafio.id}.jpg');
          background-size: cover;
          background-position: center;
          filter: blur(5px) grayscale(100%);
          transform: scaleX(-1);
          z-index: 0;
        }
      `;
      document.head.appendChild(style);


      grid.appendChild(card);
    });
  });

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
  document.querySelectorAll('.challengesCard').forEach(card => {
    card.addEventListener('click', function () {
      this.classList.toggle('touch-active');
    });
  });
}