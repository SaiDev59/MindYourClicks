// VARIABLES----------------------------------
///changed to typescript
let images: string[] = [];
const gridLength: number = 16;
let isClicked: boolean[] = new Array(gridLength).fill(false);
let currScore: number = 0;
let highScore: number = 0;
//sai take care of the below two
let countDown: number | null = null;
let secs = 60;

//sai do the 3 below
const startBtn = document.querySelector(".start") as HTMLButtonElement | null;
const mainGrid = document.querySelector(
  "section #container"
) as HTMLElement | null;
const displayTime = document.querySelector(
  ".displayTime"
) as HTMLButtonElement | null;

const gameGrids = document.querySelectorAll(
  "#container div"
) as NodeListOf<HTMLDivElement> | null;
const highScoreArea = document.querySelector(
  "#highscorenumber"
) as HTMLSpanElement | null;
const highScoreNameArea = document.querySelector(
  "#highscorename"
) as HTMLSpanElement | null;
const currentScoreArea = document.querySelector(
  "#currscorenumber"
) as HTMLSpanElement | null;
const currentScoreNameArea = document.querySelector(
  "#currscorename"
) as HTMLSpanElement | null;

const pauseBtn = document.querySelector(".pause") as HTMLSpanElement | null;
const resetBtn = document.querySelector(".reset") as HTMLSpanElement | null;

//EVENT LISTENERS----------------------------

if (startBtn) startBtn.addEventListener("click", start);
if (pauseBtn) pauseBtn.addEventListener("click", pause);
if (resetBtn) resetBtn.addEventListener("click", reset);

// FUNCTIONS-----------------------------------

const clockResetting = (): void => {
  if (countDown) clearInterval(countDown);
  countDown = null;
  secs = 60;
  if (displayTime) displayTime.textContent = secs.toString();
};
//changed to typescript
const bindingEvents = (first: number, second: number): void => {
  alert(`final score is ${first} and Max score is ${second}`);
  rearrange(images);
  reshuffleImages();
  displayScore();
  currScore = 0;
  hideGame();
};

//nochange
if (gameGrids)
  gameGrids.forEach((index) => {
    index.addEventListener("click", mainMeat);
  });
//changed to typescript
let j: number = Math.floor(Math.random() * 74) + 10;
//Below forEach is for inputting pictures inside image array
//changed to typescript
for (let i = 0; i < gridLength; i++) {
  images[i] = `<img id=${i} src= "Pictures/00${j}.png" width=100% height=100%>`;
  j++;
}

//changed to typescript
function rearrange(inputArray: string[]): void {
  let array2: string[] = new Array();
  let counter: number = 0;
  const looplength: number = inputArray.length;
  for (let i = 0; i < looplength; i++) {
    let index: number = Math.floor(Math.random() * inputArray.length);
    array2[counter] = inputArray[index];
    inputArray.splice(index, 1);
    counter++;
  }
  //Filling the emptied inputarray for later use
  array2.forEach((index) => {
    inputArray.push(index);
  });
}

//changed to typescript
const reshuffleImages = (): void => {
  let j: number = 0;
  if (gameGrids)
    gameGrids.forEach((index) => {
      index.innerHTML = images[j];
      j++;
    });
};
//changed to typescript
const showGame = (): void => {
  let j: number = 0;
  if (gameGrids)
    gameGrids.forEach((index) => {
      index.classList.add("grid");
      index.innerHTML = images[j];
      j++;
    });
};
//chagned to typescript
const hideGame = (): void => {
  if (mainGrid) mainGrid.classList.remove("grid-container");
  if (gameGrids)
    gameGrids.forEach((index) => {
      index.classList.remove("grid");
      index.textContent = "";
    });
};
//changed to typescript
function mainMeat(event: PointerEvent): void {
  //Below line gets the id of image in the div
  let index: number | null;
  if (event.target) {
    index = parseInt((event.target as HTMLInputElement).id);
    //If u click all the 16 unique then only will this if condition will be executed
    if (currScore === 15 && !isClicked[index]) {
      highScore = currScore + 1;
      currScore += 1; //This is far that displaying score thing inside the function displayRecord()
      bindingEvents(highScore, highScore);
      clockResetting();
      isClicked.fill(false);
    }
    //If u dont click all the 16 and end your game in between
    else if (isClicked[index]) {
      clockResetting();
      bindingEvents(currScore, highScore);
      isClicked.fill(false);
    } else {
      currScore++;
      highScore = Math.max(highScore, currScore);
      isClicked[index] = true;
      rearrange(images);
      reshuffleImages();
    }
  }
}
//changed to typescript
const displayScore = (): void => {
  const name = prompt("Whats your name player?") as string;
  if (name === null) {
    clockResetting();
    isClicked.fill(false);
    rearrange(images);
    reshuffleImages();
    currScore = 0;
    hideGame();
    return;
  }
  if (highScoreArea) highScoreArea.textContent = highScore.toString();
  if (currentScoreArea) currentScoreArea.textContent = currScore.toString();

  // !hScore.innerHTML.length
  if (highScoreArea)
    if (!highScoreArea.textContent) {
      scoreUpdate(name.toString());
    } else if (parseInt(highScoreArea.textContent)) {
      if (
        currentScoreArea?.textContent &&
        parseInt(currentScoreArea.textContent) >=
          parseInt(highScoreArea.textContent)
      ) {
        scoreUpdate(name.toString());
      } else if (currentScoreArea?.textContent &&
        parseInt(currentScoreArea.textContent) <
        parseInt(highScoreArea.textContent)
      ) {
        if (currentScoreArea)
          currentScoreArea.textContent = currScore.toString();
        if (currentScoreNameArea)
          currentScoreNameArea.textContent = name.toString();
      }
    } else {
      if (highScoreNameArea) highScoreNameArea.textContent = name.toString();
      if (currentScoreNameArea)
        currentScoreNameArea.textContent = name.toString();
    }
};

function scoreUpdate(name: string): void {
  if (highScoreArea) highScoreArea.textContent = highScore.toString();
  if (highScoreNameArea) highScoreNameArea.textContent = name.toString();
  if (currentScoreArea) currentScoreArea.textContent = currScore.toString();
  if (currentScoreNameArea) currentScoreNameArea.textContent = name.toString();
}

function timeRun(): void {
  secs--;
  if (secs === 0) {
    clockResetting();
    alert(`final score is ${currScore} and Max score is ${highScore}`);
    isClicked.fill(false);
    displayScore();
    currScore = 0;
    hideGame();
    return;
  } else if (displayTime) {
    if (secs < 10 && secs > 0) displayTime.textContent = "0" + secs;
    else displayTime.textContent = secs.toString();
  }
}

function start(): void {
  //If its resume then the b`elow button will change this to start.
  if (startBtn) startBtn.textContent = "Start";
  if (mainGrid) mainGrid.classList.add("grid-container");
  if (mainGrid) mainGrid.classList.remove("gridBlur");
  showGame();
  //Below 2 line code is so that after game is paused i shouldnt see the hover effect on game tiles
  if (gameGrids)
    gameGrids.forEach((index) => {
      index.classList.remove("noHover");
    });
  if (countDown) {
    alert("the game is already Running!!");
    return;
  }
  countDown = setInterval(timeRun, 1000);
}

function pause(): void {
  if (!countDown) {
    alert("the game is not started");
    return;
  }
  if (mainGrid) mainGrid.classList.add("gridBlur");
  if (gameGrids)
    gameGrids.forEach((index) => {
      index.classList.add("noHover");
    });
  if (startBtn) startBtn.textContent = "Resume";
  clearInterval(countDown);
  countDown = null;
}

function reset(): void {
  if (!countDown && startBtn?.textContent && startBtn.textContent != "Resume") {
    return;
  }
  const toConfirm: boolean = confirm("Are you sure?");
  if (!toConfirm) {
    return;
  } else if (toConfirm) {
    clockResetting();
    currScore = 0;
    isClicked.fill(false);
    hideGame();
    if(startBtn)
    startBtn.textContent = "Start";
  }
}
