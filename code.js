// VARIABLES----------------------------------
let images = []
const gridLength = 16
let isClicked = new Array(gridLength).fill(false)
let currScore = 0;
let highScore = 0;
let countDown = null;
let secs = 60;

const startBtn = document.querySelector('.start');
const mainGrid = document.querySelector('section #container')
const displayTime = document.querySelector('.displayTime')

const gameGrids = document.querySelectorAll('#container div')
const hScore = document.querySelector('#highscorenumber')
const hName = document.querySelector('#highscorename')
const cScore = document.querySelector('#currscorenumber')
const cName = document.querySelector('#currscorename')

const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');


//EVENT LISTENERS----------------------------


startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

// FUNCTIONS-----------------------------------
//The below code is done for getting new set of images in a game for a better experience

const clockResetting = () => {
    clearInterval(countDown);
    countDown = null;
    secs = 60;
    displayTime.innerHTML = secs;
}

const bindingEvents = (first, second) => {
    alert(`final score is ${first} and Max score is ${second}`);
    rearrange(images);
    reshuffleImages();
    displayScore();
    currScore = 0;
    hideGame();
}

//adding event to all events
gameGrids.forEach((index)=>{
    index.addEventListener('click',mainMeat)
});

let j = Math.floor(Math.random() * 74) + 10
//Wasef bhaiya since the array is initially empty so i didnt got the solution as to how to fill the image array by using forEach,map method 
for (let i = 0; i < 16; i++, j++) {
    images[i] = `<img id=${i} src= "Pictures/00${j}.png" width=100% height=100%>`
}


function rearrange(inputArray) {
    let array2 = new Array();
    let counter = 0;
    const looplength = inputArray.length;
    for (let i = 0; i < looplength; i++) {
        let index = Math.floor(Math.random() * inputArray.length);
        array2[counter] = inputArray[index];
        inputArray.splice(index, 1)
        counter++;
    }
    //Filling the emptied inputarray for later use
    for (let i of array2)
        inputArray.push(i)
}



const reshuffleImages = () => {
  
    let j = 0;
    gameGrids.forEach((index)=>{
        
        index.innerHTML = images[j]
        j++;
    })

}
const showGame = () => {
    let j = 0;
    gameGrids.forEach((index)=>{
        index.classList.add("grid")
        index.innerHTML = images[j]
        j++;
    })
}
function removing(index) {
    index.classList.remove("grid");
    index.textContent = "";
}
const hideGame = () => {
    mainGrid.classList.remove("grid-container");
    gameGrids.forEach(removing);
}
function mainMeat() {
    //Below line gets the id of image in the div
    let index = this.firstElementChild.id;
    //If u click all the 16 unique then only will this if condition will be executed
    if (currScore === 15 && !isClicked[index]) {
        highScore = currScore + 1;
        currScore += 1;//This is far that displaying score thing inside the function displayRecord()
        bindingEvents(highScore, highScore);
        clockResetting();
        isClicked.fill(false)
        return;

    }
    //If u dont click all the 16 and end your game in between
    else if (isClicked[index]) {
        clockResetting();
        bindingEvents(currScore, highScore);
        isClicked.fill(false);
        return;

    }
    else{
    currScore++;
    highScore = Math.max(highScore, currScore)
    isClicked[index] = true;
    rearrange(images);
    reshuffleImages();}
}

const displayScore = () => {
    const name = prompt("Whats your name player?");
    hScore.textContent = highScore;
    cScore.textContent = currScore;

    // !hScore.innerHTML.length

    if (!hScore.textContent) {
        scoreUpdate(name);

    }
    else if (parseInt(hScore.textContent)) {
        if (parseInt(cScore.textContent) >= parseInt(hScore.textContent)) {
            scoreUpdate(name);
        }
        else if (parseInt(cScore.textContent) < parseInt(hScore.textContent)) {
            cScore.textContent = currScore;
            cName.textContent = name;

        }
    }
    else {
        hName.textContent = name;
        cName.textContent = name;
    }
}

function scoreUpdate(name) {
    hScore.textContent = highScore;
    hName.textContent = name;
    cScore.textContent = currScore;
    cName.textContent = name;
}

const removeHover = (index) => {
    index.classList.remove("noHover");
}

function timeRun () {
    secs--;
    if (secs === 0) {
        clockResetting();
        alert(`final score is ${currScore} and Max score is ${highScore}`)
        isClicked.fill(false);
        displayScore();
        currScore = 0;
        hideGame();

    }
    else if (secs < 10 && secs > 0)
        displayTime.textContent = "0" + secs;
    else displayTime.textContent = secs;
}

function start() {
    //If its resume then the b`elow button will change this to start.
    startBtn.textContent = "Start";
    mainGrid.classList.add("grid-container");
    mainGrid.classList.remove("gridBlur");
    showGame();
    //Below 2 line code is so that after game is paused i shouldnt see the hover effect on game tiles
    gameGrids.forEach(removeHover)
    if (countDown) {
        alert("the game is already Running!!")
        return
    }
    countDown = setInterval(timeRun, 1000);
}

function pause() {
    if (!countDown) {
        alert("the game is not started")
        return
    }
    mainGrid.classList.add("gridBlur");
    //to remove hover effect
    gameGrids.forEach((index) => {
        index.classList.add("noHover");
    })
    startBtn.textContent = "Resume";
    clearInterval(countDown);
    countDown = null;

}

function reset() {
    if (!countDown && startBtn.textContent != "Resume") {
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
        document.querySelector('.start').textContent = "Start"
    }
}