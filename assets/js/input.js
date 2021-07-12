import "./libraries/swiped-events/dist/swiped-events.min.js";
import {
  checkDeath,
  togglePause,
  show,
  hide,
  startGame,
  settingsMenu,
  gameOverMenu,
  pauseMenu,
  gameBoard,
  toggleSettings,
  //  toggleSettings,
} from "./game.js";

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

// Add keyboard event listeners
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      toggleSettings();
      break;
    case "p":
      togglePause();
      break;
    case " ":
      startGame();
      break;
    // Use arrow keys in game
    case "ArrowUp":
    case "w":
      if (lastInputDirection.y !== 0) break; // Stop snake from moving down if currently moving up
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
    case "s":
      if (lastInputDirection.y !== 0) break; // Stop snake from moving up if currently moving down
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
    case "a":
      if (lastInputDirection.x !== 0) break; // Stop snake from moving right if currently moving left
      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
    case "d":
      if (lastInputDirection.x !== 0) break; // Stop snake from moving left if currently moving right
      inputDirection = { x: 1, y: 0 };
      break;
    default:
      return;
  }
});

// Use enter button to restart game when user looses
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && checkDeath()) {
    location.reload();
  } else {
    return;
  }
});

// Add touch event listeners for touchscreen devices
window.addEventListener("swiped", function (e) {
  switch (e.detail.dir) {
    case "up":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "down":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "left":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case "right":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
});

// Event listers to toggle between menu and settings boxes
// prettier-ignore
window.addEventListener("click", (e) => {
  console.log(e.target.className)
  if (e.target.className === "settings" || e.target.className === "fas fa-cog") {
    toggleSettings()
    // window.location.assign("http://127.0.0.1:5500/game.html")
    // window.location.assign("https://datonex.github.io/snake-and-the-wizard/")
  } else {
    return;
  }
});

/**
 * This function will get the current input direction from the user. Function is called in @see update
 *
 * @requires module:snake
 * @requires module:game
 */
export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}
