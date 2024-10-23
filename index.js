// Step 1: Define the choices available in the game
const choices = ["Rock", "Paper", "Scissors"];
let player1Score = 0;
let player2Score = 0;

// Step 2: Get references to HTML elements
const player1ChoiceDisplay = document.getElementById("player1-choice-display");
const player1ScoreDisplay = document.getElementById("player1-score");
const player2ChoiceDisplay = document.getElementById("player2-choice-display");
const player2ScoreDisplay = document.getElementById("player2-score");
const gameStatusDisplay = document.getElementById("game-status");
const resetGameButton = document.getElementById("reset-game-btn");
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

// Step 3: Add event listeners to the buttons
rockBtn.addEventListener("click", function () {
    player1ChoiceDisplay.innerHTML = '';
    var rockImageLeft = document.createElement('img');
    rockImageLeft.src = "https://github.com/franskeiser/AWSCC-CodeQuest-Frontend/blob/main/projects/03-rock-paper-scissors/images/rock-left.png?raw=true";
    player1ChoiceDisplay.appendChild(rockImageLeft);
    playRound('Rock');
});

paperBtn.addEventListener("click", function () {
    player1ChoiceDisplay.innerHTML = '';
    var paperImageLeft = document.createElement('img');
    paperImageLeft.src = "https://github.com/franskeiser/AWSCC-CodeQuest-Frontend/blob/main/projects/03-rock-paper-scissors/images/Paper%20-%20left.png?raw=true";
    player1ChoiceDisplay.appendChild(paperImageLeft);
    playRound('Paper');
});

scissorsBtn.addEventListener("click", function () {
    player1ChoiceDisplay.innerHTML = '';
    var scissorImageLeft = document.createElement('img');
    scissorImageLeft.src = "https://github.com/franskeiser/AWSCC-CodeQuest-Frontend/blob/main/projects/03-rock-paper-scissors/images/Scissors%20-%20left.png?raw=true";
    player1ChoiceDisplay.appendChild(scissorImageLeft);
    playRound('Scissors');
});

// Step 4: Define helper functions that will be the actions of the game
function playRound(player1Choice) {
    // Get computer's choice
    const player2Choice = computerChoice(choices);

    // Start timer with both player and computer choices
    timer(player1Choice, player2Choice);
}

function timer(player1Choice, player2Choice) {
    var timeLeft = 3;
    gameStatusDisplay.textContent = timeLeft;
    player2ChoiceDisplay.textContent = ''; // Clear player 2 choice initially

    var countDown = setInterval(function() {
        timeLeft--;
        gameStatusDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countDown);
            determineWinner(player1Choice, player2Choice);
            player2ChoiceDisplay.textContent = player2Choice; // Display player 2 choice after timer ends
        }
    }, 1000);
}

function getImageSource(choice) {
    switch(choice) {
        case 'Rock':
            return "https://github.com/franskeiser/AWSCC-CodeQuest-Frontend/blob/main/projects/03-rock-paper-scissors/images/rock-right.png?raw=true";
        case 'Paper':
            return "https://github.com/franskeiser/AWSCC-CodeQuest-Frontend/blob/main/projects/03-rock-paper-scissors/images/Paper%20-%20right.png?raw=true";
        case 'Scissors':
            return "https://github.com/franskeiser/AWSCC-CodeQuest-Frontend/blob/main/projects/03-rock-paper-scissors/images/Scissors%20-%20right.png?raw=true";
    }
}

function determineWinner(player1Choice, player2Choice) {
    if (player1Choice === player2Choice) {
        gameStatusDisplay.textContent = 'TIE!';
        player1Score++;
        player2Score++;
    } else if ((player1Choice === 'Rock' && player2Choice === 'Scissors') ||
               (player1Choice === 'Paper' && player2Choice === 'Rock') ||
               (player1Choice === 'Scissors' && player2Choice === 'Paper')) {
        gameStatusDisplay.textContent = 'PLAYER 1 WINS!';
        player1Score++;
    } else {
        gameStatusDisplay.textContent = 'PLAYER 2 WINS!';
        player2Score++;
    }

    // Update score display
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;

    // Check if a player has reached a score of 5
    if (player1Score >= 5 || player2Score >= 5) {
        if (player1Score > player2Score) {
            gameStatusDisplay.textContent = 'PLAYER 1 WINS THE GAME!';
        } else if (player2Score > player1Score) {
            gameStatusDisplay.textContent = 'PLAYER 2 WINS THE GAME!';
        } else {
            gameStatusDisplay.textContent = 'IT\'S A TIE!';
        }

        // Disable buttons to prevent further gameplay
        rockBtn.disabled = true;
        paperBtn.disabled = true;
        scissorsBtn.disabled = true;
    }
}

function computerChoice(choices) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex]; 
}



// Step 5: Reset game button
resetGameButton.addEventListener("click", function () { 
    player1ChoiceDisplay.textContent = '';
    player2ChoiceDisplay.textContent = '';
    player1ScoreDisplay.textContent = 0;
    player2ScoreDisplay.textContent = 0;
    gameStatusDisplay.textContent = 'SHOW YOUR HAND TO START THE GAME!';
    player1Score = 0;
    player2Score = 0;

    // Enable buttons
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;
});