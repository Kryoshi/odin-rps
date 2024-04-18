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
                throw "cancel";
            }
        } while(true)
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
        roundOutcome = OUTCOMES.Draw;
    }
    else if(((playerChoice === CHOICES.Rock) && (computerChoice === CHOICES.Paper))
            || ((playerChoice === CHOICES.Paper) && (computerChoice === CHOICES.Scissors))
            || ((playerChoice === CHOICES.Scissors) && (computerChoice === CHOICES.Rock))) {
        roundOutcome = OUTCOMES.Lose;
    }
    else {
        roundOutcome = OUTCOMES.Win;
    }
    return roundOutcome;
}

function willPlay() {
    let play;
    play = prompt("Do you want to play Rock, Paper, Scissors? [Y/N]", "Y")
    try {
        do {
            play = play.toUpperCase();
            switch(play) {
                case "Y": return true;
                case "N": return false;
                default:
                    play = prompt("Invalid Input! Enter [Y/N]", "Y");
            }
            if(play == null) {
                throw "cancel";
            }
        } while(true)
    } catch(error) {
        return false;
    }
}

function numberOfRounds() {
    let rounds = Number(prompt("Enter the number of rounds you want to play:", 5));
    try {
        do {
            if (Number.isNaN(rounds)) {
                rounds = Number(prompt("Not a Number! Enter the number of rounds you want to play:", 5));
            }
            else if (rounds == 0)
                throw EXIT;
            else return rounds;
            
        } while(true)
    } catch {
        return EXIT;
    }
}

function printResult(playerScore = 0, computerScore = 0, currentScore = "YOU: 0\nCOMPUTER: 0") {

    if (playerScore > computerScore) {
        console.log(OUTCOMES.Win);
        console.log("Final Score:\n" + currentScore);
    }
    else if (playerScore < computerScore) {
        console.log(OUTCOMES.Lose);
        console.log("Final Score:\n" + currentScore);
    }
    else {
        console.log(OUTCOMES.Draw);
        console.log("Final Score:\n" + currentScore);
    }
    return;
}

function playGame() {
    let cancelRound = false;
    while(cancelRound || willPlay()) {
        cancelRound = false;
        let rounds = numberOfRounds();
        if (rounds != EXIT) {
            console.log(START);

            let playerScore = 0;
            let computerScore = 0;
            let currentScore = "YOU: 0\nCOMPUTER: 0";

            for (i = 0; i < rounds; ++i) {
                let playerChoice = getPlayerChoice();
                let computerChoice = getComputerChoice();
                let roundOutcome = gameRound(playerChoice, computerChoice);
                switch(roundOutcome) {
                    case OUTCOMES.Draw:
                        roundOutcome = OUTCOMES.Draw + playerChoice + " draws " + computerChoice;
                    break;
                    case OUTCOMES.Lose:
                        ++computerScore;
                        roundOutcome = OUTCOMES.Lose + computerChoice + " beats " + playerChoice;
                    break;
                    case OUTCOMES.Win:
                        ++playerScore;
                        roundOutcome = OUTCOMES.Win + playerChoice + " beats " + computerChoice;
                    break;
                    default:
                        cancelRound = true;
                }
                if (cancelRound)
                    break;
                currentScore = "YOU: " + playerScore + "\nCOMPUTER: " + computerScore;
                console.log(roundOutcome);
                console.log(currentScore);
            }

            printResult(playerScore, computerScore, currentScore);
        }
    }
    return EXIT;
}

console.log(playGame());