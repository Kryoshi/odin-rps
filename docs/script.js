const CHOICES = {
    Rock    :   "ROCK",
    Paper   :   "PAPER",
    Scissors:   "SCISSORS"
};

const COMPUTER = {
    Rock    :   0,
    Paper   :   1,
    Scissors:   2
}

const OUTCOMES = {
    Win     :   "You Win! ",
    Lose    :   "You Lose! ",
    Draw    :   "It's a Draw! "
};

const START = "Game Start";
const END = "Game Over";

const newGameButton = document.querySelector("#newgame");
const gameStateDisplay = document.querySelector("#gamestate");
const choiceButtons = document.querySelector("#choices");
const scoreDisplay = document.querySelectorAll(".score");
/* [0]: Outcome, [1]: Score Type, [2]: Player Score, [3]: Computer Score */

const ROUNDSTOWIN = 5;
let playerScore = 0;
let computerScore = 0;

function newGame() {
    gameStateDisplay.textContent = START;

    playerScore = 0;
    computerScore = 0;
    scoreDisplay.values.textContent = "";
    newGameButton.style.display = 'none';
    choiceButtons.style.display = 'block';
}

function endGame() {

    newGameButton.style.display = 'block';
    choiceButtons.style.display = 'none';
    scoreDisplay[1].textContent = "FINAL SCORE:"

    if (playerScore > computerScore) {
        gameStateDisplay.textContent = OUTCOMES.Win + END
    }
    else {
        gameStateDisplay.textContent = OUTCOMES.Lose + END
    }
}

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3);
    switch(computerChoice) {
        case COMPUTER.Rock:
            return CHOICES.Rock;
        case COMPUTER.Paper:
            return CHOICES.Paper;
        case COMPUTER.Scissors:
            return CHOICES.Scissors;
    }
}

function getRoundOutcome(playerChoice, computerChoice) {
    let roundOutcome;

    playerChoice = playerChoice.toUpperCase();
    if(playerChoice === computerChoice) {
        roundOutcome = OUTCOMES.Draw + playerChoice + " draws " + computerChoice;
    }
    else if(((playerChoice === CHOICES.Rock) && (computerChoice === CHOICES.Paper))
            || ((playerChoice === CHOICES.Paper) && (computerChoice === CHOICES.Scissors))
            || ((playerChoice === CHOICES.Scissors) && (computerChoice === CHOICES.Rock))) {
        ++computerScore;
        roundOutcome = OUTCOMES.Lose + computerChoice + " beats " + playerChoice;
    }
    else {
        ++playerScore;
        roundOutcome = OUTCOMES.Win + playerChoice + " beats " + computerChoice;
    }
    return roundOutcome;
}

function playRound(playerChoice, computerChoice = getComputerChoice()) {
    roundOutcome = getRoundOutcome(playerChoice, computerChoice);
    currentScore = "YOU: " + playerScore + "\nCOMPUTER: " + computerScore;
    scoreDisplay[0].textContent = roundOutcome;
    scoreDisplay[1].textContent = "CURRENT SCORE:";
    scoreDisplay[2].textContent = ("YOU: " + playerScore);
    scoreDisplay[3].textContent = ("COMPUTER: " + computerScore);

    if (playerScore === ROUNDSTOWIN || computerScore === ROUNDSTOWIN) {
        endGame();
    }
}

newGameButton.addEventListener("click", function (e) {
    newGame();
});

choiceButtons.addEventListener("click", function (e) {
    const choice = e.target;
    gameStateDisplay.textContent = "";

    if (choice.tagName === 'BUTTON')
        playRound(choice.id);
});