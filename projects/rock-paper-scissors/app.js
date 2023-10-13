const startGameBtn = document.getElementById('start-game-btn');

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_CHOICE = ROCK;

let maxTimesAskingForChoice = 2

let userChoice = DEFAULT_CHOICE;

function getUserChoice() {

    userChoice = prompt(`What is your choice...${ROCK}, ${PAPER} OR ${SCISSORS}?`, "").toUpperCase();

    if ((userChoice !== ROCK && userChoice !== PAPER && userChoice !== SCISSORS) && maxTimesAskingForChoice != 0) {
        maxTimesAskingForChoice--;
        getUserChoice();
    
    } else if (userChoice === ROCK || userChoice === PAPER || userChoice === SCISSORS) {
        return;
    } else {
        alert(`Invalid choice many times...We chose for you ${DEFAULT_CHOICE}!`);
    }

}

startGameBtn.addEventListener("click", function startGame() { // The name is set for error purposes. The error would show "anonymous" otherwise
    getUserChoice();
    console.log("Game is starting...")
    console.log(`User chose ${userChoice}`)
});