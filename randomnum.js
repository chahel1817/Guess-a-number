const form = document.querySelector('form')
const submit = document.querySelector('#subt')
const lowOrHi = document.querySelector('.lowOrHi')
const res = document.querySelector('.resultParas')
const prev = document.querySelector('.guesses')
const remain = document.querySelector('.lastResult')
const num = document.querySelector('#guessField')

let randomNum = parseInt(Math.random() * 100 + 1)
// console.log(randomNum)

const p = document.createElement('p')

let prevGuess = []
let currGuess = 1
let startGame = true

if (startGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault()
    const guess = parseInt(num.value)
    validGuess(guess)
  })
}

function validGuess(guess) {
  if (isNaN(guess)) {
    alert("The input you gave isn't a Number!")
  } else if (guess < 0) {
    alert("Enter a Positive Number!")
  } else if (guess > 100) {
    alert("Enter a Number less than 100")
  } else {
    prevGuess.push(guess)
    if (currGuess === 5) {
      dispGuess(guess)
      dispMesg("You've already entered 5  guesses, try a new game!")
      endGame()
    } else {
      dispGuess(guess)
      checkGuess(guess)
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNum) {
    dispMesg("Congrats, You've won the game!!!!! 🎉")
    endGame()
  } else if (guess < randomNum) {
    dispMesg("The number you entered is LOWER than the answer.")
  } else {
    dispMesg("The number you entered is HIGHER than the answer.")
  }
}

function dispGuess(guess) {
  num.value = ''
  prev.innerHTML += `${guess}, ` 
  currGuess++
  remain.innerHTML = `${6 - currGuess}`
}

function dispMesg(message) {
  lowOrHi.innerHTML = `<h3>${message}</h3>`
}

function endGame() {
  num.value = ''
  num.setAttribute('disabled', '')
  p.classList.add('button')
  p.innerHTML = `<button id="newGame">Start New Game</button>`
  res.appendChild(p)
  startGame = false
  newGame(); 
}

function newGame() {
  const newGameBtn = document.querySelector('#newGame')
  newGameBtn.addEventListener('click', function () {
    randomNum = parseInt(Math.random() * 100 + 1)
    currGuess = 1
    prevGuess = []
    lowOrHi.innerHTML = ''
    prev.innerHTML = '' 
    num.removeAttribute('disabled')
    remain.innerHTML = 5
    res.removeChild(p)
    startGame = true
  })
}
