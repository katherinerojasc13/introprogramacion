// Definir las constantes que interactuan en el juego
const squares = document.querySelectorAll('.square') //Los cuadrados
const mole = document.querySelector('.mole') //El "topo"
const timeLeft = document.querySelector('#time-left') //Tiempo
const score = document.querySelector('#score') //Puntaje

//Hacer esto es para llamar o enlazar los elementos que cree en HTML y CSS

// Variables de control
let result = 0
let hitPosition
let currentTime = 60
let timerId = null

//Seleccionar el cuadrado a impactar
const randomSquare = () => {
  //Eliminar  las imagenes del mole
  squares.forEach(square => {
    square.classList.remove('mole')
  })

  //Seleccionar posición aleatoria entre 1 y 9
  let randomSquare = squares[Math.floor(Math.random() * 9)] //Especificar el número entre 1 y 9, hace como el calculo
  randomSquare.classList.add('mole') //Rana o topo asignado

  hitPosition = randomSquare.id // Pone el numero entre 1 y 9 que se dio antes y lo vuelve de que una posición
}

// Identifica los clicks 
// Basicamente son procesos dentro de procesos
squares.forEach(square => {
  //Agregar escuchadores a cada cuadrito
  square.addEventListener('mousedown', () => {
    //Chequeo si el cuadrado impactado por el usuario es en el que está el topo o la rana en ese momento, lit para saber si esta bien
    
    // Si lo hizo bien, se añade un punto y se va sumando 
    if (square.id == hitPosition) {
      result++ //Incrementamos resultado
      score.textContent = result // Aca cambia el puntaje a interfaz
      hitPosition = null //Reinicia el ciclo
    }
  })
})

function moveMole() {
  timerId = setInterval(randomSquare, 750)
}

moveMole()

function countDown() {
  currentTime--
  timeLeft.textContent = currentTime

  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    alert('GAME OVER! Your final score is ' + result)
  }

}

let countDownTimerId = setInterval(countDown, 1000)

///////////////* MEJORA FUNCIONAL *///////////////

// Botón para reiniciar el juego
function resetGame() {
  // Reiniciar variables
  result = 0
  currentTime = 60
  score.textContent = result
  timeLeft.textContent = currentTime

  // Detener cualquier intervalo anterior
  clearInterval(timerId)
  clearInterval(countDownTimerId)

  // Reiniciar rana y contador
  moveMole()
  countDownTimerId = setInterval(countDown, 1000)
}

// Detectar clic en el botón de reinicio
const resetButton = document.getElementById('reset-btn')
resetButton.addEventListener('click', resetGame)

// Slider de velocidad
const speedSlider = document.getElementById('speed');

// Cambiar velocidad en tiempo real
speedSlider.addEventListener('input', () => {
  clearInterval(timerId);               // Detiene el movimiento anterior
  timerId = setInterval(randomSquare, speedSlider.value); // Aplica la nueva velocidad
});