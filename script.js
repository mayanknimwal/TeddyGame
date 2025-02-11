// Select elements
const player = document.getElementById("player");
const fallingObject = document.getElementById("falling-object");
const scoreDisplay = document.getElementById("score");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

let playerPos = 125;
const gameWidth = 300;
const playerSpeed = 20;

let objectPosX = Math.floor(Math.random() * 250);
let objectPosY = 0;
let objectSpeed = 2;
let score = 0; // Initialize score

// Move teddy left and right (Keyboard Controls)
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && playerPos > 0) {
        playerPos -= playerSpeed;
    } else if (event.key === "ArrowRight" && playerPos < gameWidth - 50) {
        playerPos += playerSpeed;
    }
    player.style.left = playerPos + "px";
});

// Mobile Touch Controls
leftBtn.addEventListener("click", () => {
    if (playerPos > 0) {
        playerPos -= playerSpeed;
        player.style.left = playerPos + "px";
    }
});

rightBtn.addEventListener("click", () => {
    if (playerPos < gameWidth - 50) {
        playerPos += playerSpeed;
        player.style.left = playerPos + "px";
    }
});

// Falling heart logic
function moveObject() {
    objectPosY += objectSpeed;
    fallingObject.style.top = objectPosY + "px";
    fallingObject.style.left = objectPosX + "px";

    // Check for collision
    if (detectCollision()) {
        score = 0; // Reset score
        scoreDisplay.innerText = score; // Update score display
        objectSpeed = 2; // Reset speed

        // Restart game after 1 second
        setTimeout(() => {
            objectPosY = 0; // Reset falling object
            objectPosX = Math.floor(Math.random() * 250); // New random position
        }, 1000);
    }

    // Reset when it reaches the bottom (Dodged successfully)
    if (objectPosY > 400) {
        objectPosY = 0; // Reset to the top
        objectPosX = Math.floor(Math.random() * 250); // New random position
        score++; // Increase score when dodging
        scoreDisplay.innerText = score; // Update score on screen

        // Increase speed slightly every 5 points
        if (score % 5 === 0) {
            objectSpeed += 0.5;
        }
    }

    requestAnimationFrame(moveObject);
}

// Collision detection function
function detectCollision() {
    let playerRect = player.getBoundingClientRect();
    let objectRect = fallingObject.getBoundingClientRect();

    return !(
        playerRect.top > objectRect.bottom ||
        playerRect.bottom < objectRect.top ||
        playerRect.left > objectRect.right ||
        playerRect.right < objectRect.left
    );
}

// Start the falling animation
moveObject();
