//changed to typescript
let images = [];
const gridLength = 16;
let isClicked = new Array(gridLength).fill(false);
let currScore = 0;
let highScore = 0;
//sai take care of the below two
let countDown = null;
let secs = 60;
//sai do the 3 below
const startBtn = document.querySelector(".start");
const mainGrid = document.querySelector("section #container");
const displayTime = document.querySelector(".displayTime");
const gameGrids = document.querySelectorAll("#container div");
const highScoreArea = document.querySelector("#highscorenumber");
const highScoreNameArea = document.querySelector("#highscorename");
const currentScoreArea = document.querySelector("#currscorenumber");
const currentScoreNameArea = document.querySelector("#currscorename");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
//EVENT LISTENERS----------------------------
if (startBtn)
    startBtn.addEventListener("click", start);
if (pauseBtn)
    pauseBtn.addEventListener("click", pause);
if (resetBtn)
    resetBtn.addEventListener("click", reset);
// FUNCTIONS-----------------------------------
const clockResetting = () => {
    if (countDown)
        clearInterval(countDown);
    countDown = null;
    secs = 60;
    if (displayTime)
        displayTime.textContent = secs.toString();
};
//changed to typescript
const bindingEvents = (first, second) => {
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
let j = Math.floor(Math.random() * 74) + 10;
//Below forEach is for inputting pictures inside image array
//changed to typescript
for (let i = 0; i < gridLength; i++) {
    images[i] = `<img id=${i} src= "Pictures/00${j}.png" width=100% height=100%>`;
    j++;
}
//changed to typescript
function rearrange(inputArray) {
    let array2 = new Array();
    let counter = 0;
    const looplength = inputArray.length;
    for (let i = 0; i < looplength; i++) {
        let index = Math.floor(Math.random() * inputArray.length);
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
const reshuffleImages = () => {
    let j = 0;
    if (gameGrids)
        gameGrids.forEach((index) => {
            index.innerHTML = images[j];
            j++;
        });
};
//changed to typescript
const showGame = () => {
    let j = 0;
    if (gameGrids)
        gameGrids.forEach((index) => {
            index.classList.add("grid");
            index.innerHTML = images[j];
            j++;
        });
};
//chagned to typescript
const hideGame = () => {
    if (mainGrid)
        mainGrid.classList.remove("grid-container");
    if (gameGrids)
        gameGrids.forEach((index) => {
            index.classList.remove("grid");
            index.textContent = "";
        });
};
//changed to typescript
function mainMeat(event) {
    //Below line gets the id of image in the div
    let index;
    if (event.target) {
        index = parseInt(event.target.id);
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
        }
        else {
            currScore++;
            highScore = Math.max(highScore, currScore);
            isClicked[index] = true;
            rearrange(images);
            reshuffleImages();
        }
    }
}
//changed to typescript
const displayScore = () => {
    const name = prompt("Whats your name player?");
    if (name === null) {
        clockResetting();
        isClicked.fill(false);
        rearrange(images);
        reshuffleImages();
        currScore = 0;
        hideGame();
        return;
    }
    if (highScoreArea)
        highScoreArea.textContent = highScore.toString();
    if (currentScoreArea)
        currentScoreArea.textContent = currScore.toString();
    // !hScore.innerHTML.length
    if (highScoreArea)
        if (!highScoreArea.textContent) {
            scoreUpdate(name.toString());
        }
        else if (parseInt(highScoreArea.textContent)) {
            if ((currentScoreArea === null || currentScoreArea === void 0 ? void 0 : currentScoreArea.textContent) &&
                parseInt(currentScoreArea.textContent) >=
                    parseInt(highScoreArea.textContent)) {
                scoreUpdate(name.toString());
            }
            else if ((currentScoreArea === null || currentScoreArea === void 0 ? void 0 : currentScoreArea.textContent) &&
                parseInt(currentScoreArea.textContent) <
                    parseInt(highScoreArea.textContent)) {
                if (currentScoreArea)
                    currentScoreArea.textContent = currScore.toString();
                if (currentScoreNameArea)
                    currentScoreNameArea.textContent = name.toString();
            }
        }
        else {
            if (highScoreNameArea)
                highScoreNameArea.textContent = name.toString();
            if (currentScoreNameArea)
                currentScoreNameArea.textContent = name.toString();
        }
};
function scoreUpdate(name) {
    if (highScoreArea)
        highScoreArea.textContent = highScore.toString();
    if (highScoreNameArea)
        highScoreNameArea.textContent = name.toString();
    if (currentScoreArea)
        currentScoreArea.textContent = currScore.toString();
    if (currentScoreNameArea)
        currentScoreNameArea.textContent = name.toString();
}
function timeRun() {
    secs--;
    if (secs === 0) {
        clockResetting();
        alert(`final score is ${currScore} and Max score is ${highScore}`);
        isClicked.fill(false);
        displayScore();
        currScore = 0;
        hideGame();
        return;
    }
    else if (displayTime) {
        if (secs < 10 && secs > 0)
            displayTime.textContent = "0" + secs;
        else
            displayTime.textContent = secs.toString();
    }
}
function start() {
    //If its resume then the b`elow button will change this to start.
    if (startBtn)
        startBtn.textContent = "Start";
    if (mainGrid)
        mainGrid.classList.add("grid-container");
    if (mainGrid)
        mainGrid.classList.remove("gridBlur");
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
function pause() {
    if (!countDown) {
        alert("the game is not started");
        return;
    }
    if (mainGrid)
        mainGrid.classList.add("gridBlur");
    if (gameGrids)
        gameGrids.forEach((index) => {
            index.classList.add("noHover");
        });
    if (startBtn)
        startBtn.textContent = "Resume";
    clearInterval(countDown);
    countDown = null;
}
function reset() {
    if (!countDown && (startBtn === null || startBtn === void 0 ? void 0 : startBtn.textContent) && startBtn.textContent != "Resume") {
        return;
    }
    const toConfirm = confirm("Are you sure?");
    if (!toConfirm) {
        return;
    }
    else if (toConfirm) {
        clockResetting();
        currScore = 0;
        isClicked.fill(false);
        hideGame();
        if (startBtn)
            startBtn.textContent = "Start";
    }
}