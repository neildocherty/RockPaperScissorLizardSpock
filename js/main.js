// Sets up the rock (r), paper (p), spock (v) etc. and what they can defeat (d)
// n signifies the number of times the player has selected this.
// TODO: n will be used to add weighting to the computer random choice.
let objs = {
  r: {d:['s','l'],n:0},
  p: {d:['r','v'],n:0},
  s: {d:['p','l'],n:0},
  l: {d:['v','p'],n:0},
  v: {d:['r','s'],n:0}
}

// Pick out the DOM elements that will be manipulated.
let btns = document.querySelectorAll('.button');
let userPlaceholder = document.getElementById('userSelect');
let compPlaceholder = document.getElementById('compSelect');
let ui = document.getElementById('ui');
let readyButton = document.getElementById('readyButton');

// Initialise some variables
let interval;
let i = 0;
let userScore = 0;
let compScore = 0;
let userSelect;     // What move (rock, paper...) did the user select?
let uiState = true; // Are we showing the 'Ready...' button, or the choices?


// Add click event listener to the buttons that sets of the battle.
btns.forEach(btn => btn.addEventListener('click',
  (e) => {
    userSelect = e.target.value // The thing that was clicked (rock, paper, etc...).
    compSelect = compMove();
    objs[userSelect].n++; // Increment n for the object chosen.
    toggleDisabled();     // Disable the buttons so that they can't be selected again.
    userPlaceholder.className = 'fa '+userSelect; // Display the choice made by the player.
    compPlaceholder.className = 'fa '+compSelect; // Display the choice made by the comp.
    updateScore(battle(userSelect, compSelect)); // Change score of comp/player.
    ui.classList.add('scroll'); // Display the 'Ready...' button.
    uiState = true;
    readyButton.disabled = false; // We want to be able to click the button again to start a new round.
  }))


// When the user hovers over a button we see a placeholder (semi-transparent) image appear.
// Only when the user has not yet made a selection.
btns.forEach(btn => btn.addEventListener('mouseenter',
  (e) => {
    if (!userSelect){
      userPlaceholder.classList.add(e.target.value, 'placeholder');
    }
  }))

// Remove the placeholder when the mouse isn't over a button.
btns.forEach(btn => btn.addEventListener('mouseleave',
  (e) => {
    if (!userSelect){
      userPlaceholder.className = 'fa';
    }
  }))

// When the user selects the 'Ready...' button we start a new round.
readyButton.addEventListener('click',
  (e) => {
    userPlaceholder.className = 'fa';
    userSelect = '';
    ui.classList.remove('scroll');
    readyButton.disabled = true;
    uiState = false;
  })

// Returns the result of the battle (eg. rock vs. paper = paper wins).
// 1 = win, 0 = draw, -1 = lose.
battle = (a, b) => {
  if (a === b) return 0;
  return (objs[a].d.indexOf(b) != -1) ? 1 : -1;
}

updateScore = (x) => {
  x > 0 ? userScore += x : compScore -= x
  document.getElementById('userScore').innerHTML = userScore;
  document.getElementById('compScore').innerHTML = compScore;
  toggleDisabled();
}

toggleDisabled = () => {
  btns.forEach(btn => {
    btn.disabled = btn.disabled ? false : true
  })
}

// Randomly select a play for the comp.
compMove = () => {
  let r = Math.floor(Math.random()*5);
  if ( r < 1 ) { return 'r'};
  if ( r < 2 ) { return 'p'};
  if ( r < 3 ) { return 's'};
  if ( r < 4 ) { return 'l'};
  if ( r < 5 ) { return 'v'};
}

// Before a player decides, the comp placeholder cycles.
cyclecompPlaceholder = () => {
    if (!uiState) {
      compPlaceholder.className = 'fa placeholder ' + ['r','p','s','l','v'][i]
      i = i < 4 ? i+1 : 0;
    }
  }

var intervalCycle = window.setInterval(cyclecompPlaceholder, 180);
