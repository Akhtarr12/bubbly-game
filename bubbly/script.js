let hitrn = 0;
let score = 0;
let timer = 60;
let timerInterval;

// Function to create bubbles
function makeBubbles() {
    let bubbly = "";
    for (let i = 0; i < 136; i++) {
        const rn = Math.floor(Math.random() * 10);
        bubbly += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#bpanel").innerHTML = bubbly;
}

// Function to generate a new hit number
function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hit").textContent = hitrn;
}

// Function to start the timer
function runTimer() {
    timer = 60;
    document.querySelector("#timer").textContent = timer;

    timerInterval = setInterval(() => {
        timer--;
        document.querySelector("#timer").textContent = timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Function to increment the score
function incrementScore() {
    score += 10;
    document.querySelector("#score").textContent = score;
    getNewHit();
}

// Function to handle bubble clicks
function handleBubbleClick(e) {
    if (e.target.classList.contains("bubble")) {
        const num = Number(e.target.textContent);
        if (num === hitrn) {
            const hitSound = document.querySelector("#hit-sound");
            hitSound.currentTime = 0; // Restart sound
            hitSound.play(); // Play sound

            incrementScore(); // Increment score
            makeBubbles(); // Refresh bubbles
        }
    }
}

// Function to end the game
function endGame() {
    document.querySelector("#bpanel").innerHTML = "";
    document.querySelector("#game-over").classList.remove("hidden");
    document.querySelector("#final-score").textContent = score;
}

// Function to reset and start the game again
function startGame() {
    score = 0;
    document.querySelector("#score").textContent = score;

    document.querySelector("#game-over").classList.add("hidden");

    makeBubbles();
    getNewHit();
    runTimer();
}

// Add event listeners
document.querySelector("#bpanel").addEventListener("click", handleBubbleClick);
document.querySelector("#start-again").addEventListener("click", startGame);

// Start the game initially
startGame();
