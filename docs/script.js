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

const choiceButtons = document.querySelector("#choices");
const scoreDisplay = document.querySelectorAll(".score");

const ROUNDSTOWIN = 5;
let playerScore = 0;
let computerScore = 0;

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
    currentScore = "CURRENT SCORE:\n YOU: " + playerScore + "\nCOMPUTER: " + computerScore;
    scoreDisplay[0].textContent = roundOutcome;
    scoreDisplay[1].textContent = currentScore;
}

choiceButtons.addEventListener("click", function (e) {
    const choice = e.target;
    if (choice.tagName === 'BUTTON')
        playRound(choice.id);
});