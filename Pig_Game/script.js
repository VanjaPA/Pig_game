'use strict';

//Getting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const currentScore0 = document.getElementById('current--0');
const score1El = document.querySelector('#score--1');
const currentScore1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Starting conditions
/*

let scores, currentScore, activePlayer, playing; definišu se varijable van, globalne, da bi mogle da se koriste u funkciji
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); funkcija mora da se pozove, kako bi se ucitalo sve, i da bi radilo   */
//Starting conditions
let currentScore = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let activePlayer = 0; //Igrac sa klasom current-0, odnosno prvi igrac
const scores = [0, 0];
const playerSwitch = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
let playing = true; //Boolean vrednost koja ce da odredi kraj igre, ako je true, moze da se klikce, ako nije ne moze

//Writing roll the dice function

btnRoll.addEventListener('click', function () {
  //Generating a new number, LOCAL VARIABLE
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Displaying the result on the DICEEL(the picture of dhe dice)
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Storing the score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switching the player
      playerSwitch();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1. Add current score to total score, depends on the active player
  if (playing) {
    scores[activePlayer] += currentScore;
    //console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if the score is >=100, finish the game

    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      //3.Switch the player
      playerSwitch();
    }
  }
});
btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  playing = true;
  //init() umesto ovoga moze funkcija, sto je bolje resenje, funckija se ovamo prosledjuje kao vrednost
});
