const startGameBtn = document.getElementById('start-game-btn');

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_CHOICE = ROCK;

let maxTimesAskingForChoice = 2

function getPlayerChoice() {

    let playerChoice = prompt(`What is your choice...${ROCK}, ${PAPER} OR ${SCISSORS}?`, "").toUpperCase();

    if ((playerChoice !== ROCK && playerChoice !== PAPER && playerChoice !== SCISSORS) && maxTimesAskingForChoice != 0) {
        maxTimesAskingForChoice--;
        return getPlayerChoice();
    
    } else if (playerChoice === ROCK || playerChoice === PAPER || playerChoice === SCISSORS) {
        return playerChoice;
    } else {
        alert(`Invalid choice many times...We chose for ${DEFAULT_CHOICE} you!`);
        return; // That will return "undefined" so we can use our default function value
    }

}

const generateComputerChoice = () =>  {
    const values = [ROCK, PAPER, SCISSORS];

    const randomPositionChosed = Math.floor(Math.random() * values.length);
    return values[randomPositionChosed];
};

const getGameResult = (computerChoice, playerChoice = DEFAULT_CHOICE ) => {
    const gameResult = [ "Draw", "Player", "Computer" ];

    if (computerChoice === ROCK && playerChoice === PAPER ||
        computerChoice === PAPER && playerChoice === SCISSORS ||
        computerChoice === SCISSORS && playerChoice === ROCK ) {
        return gameResult[1];

    } else if (computerChoice === playerChoice){
        return gameResult[0];
    } else{
        return gameResult[2];
    }
}

startGameBtn.addEventListener("click", function startGame() { // The name is set for error purposes. The error would show "anonymous" otherwise
    
    const playerChoice = getPlayerChoice() || DEFAULT_CHOICE; // If the function something (true) otherwise will be set to DEFAULT_CHOICE
    const computerChoice = generateComputerChoice();
    console.log("Game is starting...");
    const result = getGameResult(computerChoice, playerChoice);
    const messageResult = result !== "Draw" ? `${result} won!` : `${result}!`;
    console.log(`Player choise ${playerChoice}, Computer choise ${computerChoice}`);
    console.log(`The game result is: ${messageResult}`);
    
});