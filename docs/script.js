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

const EXIT = "Game Over";

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

function getPlayerChoice() {
    let playerChoice = prompt("Enter Rock, Paper, or Scissors");
    try {
        do {
            playerChoice = playerChoice.toUpperCase();
            switch(playerChoice) {
                case CHOICES.Rock:
                case CHOICES.Paper:
                case CHOICES.Scissors:
                    return playerChoice;
                default:
                    playerChoice = prompt("Invalid Input! Enter Rock, Paper, or Scissors");
            }
            if (playerChoice == null) {
                throw "cancel"
            }
        } while(playerChoice != CHOICES)
    } catch (error) {
        return EXIT;
    }
}

function gameRound(playerChoice = getPlayerChoice(), computerChoice = getComputerChoice()) {
    if (playerChoice === EXIT) {
        return EXIT;
    }
    
    let roundOutcome;
    if(playerChoice === computerChoice) {
        roundOutcome = OUTCOMES.Draw + playerChoice + " draws " + computerChoice;
    }
    else if(((playerChoice === CHOICES.Rock) && (computerChoice === CHOICES.Paper))
            || ((playerChoice === CHOICES.Paper) && (computerChoice === CHOICES.Scissors))
            || ((playerChoice === CHOICES.Scissors) && (computerChoice === CHOICES.Rock))) {
        roundOutcome = OUTCOMES.Lose + computerChoice + " beats " + playerChoice;
    }
    else {
        roundOutcome = OUTCOMES.Win + playerChoice + " beats " + computerChoice;
    }
    return roundOutcome;
}

console.log(gameRound());
