//in this approach of reshuffling i am shuffling the images where grid are staying at the same place
//create an array of img
let startBtn = document.querySelector('.start');
let mainGrid = document.querySelector('section #container')
let displayTime = document.querySelector('.displayTime')
let images = []
//the below code is done for getting new set of images in a game for a better experience
let j =Math.floor(Math.random()*74)+10
for(let i=0;i<16;i++,j++)
{
    images[i] = `<img id=${i} src= "Pictures/00${j}.png" width=100% height=100%>`
}
const divs = document.querySelectorAll('section  section  div')

startBtn.addEventListener('click',()=>{
    mainGrid.classList.add("grid-container");
    mainGrid.classList.remove("gridBlur");
    showGame();
    
})
    let hScore = document.querySelector('#highscorenumber')
    let hName = document.querySelector('#highscorename')
    let cScore = document.querySelector('#currscorenumber')
    let cName = document.querySelector('#currscorename')


function rearrange(inputArray){
    array2 = new Array();
    var counter = 0;
    let looplength = inputArray.length;
    for(var i = 0;i<looplength;i++)
        {
            let index = Math.floor(Math.random()*inputArray.length);
            array2[counter] = inputArray[index];
            inputArray.splice(index,1)
            counter++;
        }
        //filling the emptied inputarray for later use
        for(var i of array2)
            inputArray.push(i)
    }

    let isClicked = new Array(16).fill(false)
    let currScore = 0;
    let highScore = 0;

function reshuffleImages(){
    for(let i=0;i<16;i++)
    {
        divs[i].innerHTML = images[i];
    }
}
function showGame(){
    for(let i = 0;i<16;i++)
    {
        
        divs[i].classList.add("grid")
        divs[i].innerHTML = images[i];
        
    }
}
function hideGame(){
    mainGrid.classList.remove("grid-container")
        for(let i = 0;i<16;i++)
        {
            
            divs[i].classList.remove("grid");
            divs[i].innerHTML = "";
            
        }
}
function mainMeat()
{
    //below line gets the id of image in the div
    let index = this.firstElementChild.id;
    //if u click all the 16 unique then only will this if condition will be executed
    if(currScore==15 && isClicked[index]==false)
    {
        highScore = currScore+1;
        currScore+=1;//this is far that displaying score thing inside the function displayRecord()
        alert(`final score is ${highScore} and Max score is ${highScore}`)
        isClicked.fill(false)
        rearrange(images)
        reshuffleImages();
        displayScore();
        currScore = 0;
        hideGame();
        return;

    }
    //if u dont click all the 16 and end your game in between
    if(isClicked[index])
    {
        clearInterval(countDown);
        countDown = null;
        secs = 60;
        displayTime.innerHTML = secs;
        alert(`final score is ${currScore} and Max score is ${highScore}`)
        //reset the game here

        isClicked.fill(false);
        rearrange(images)
        reshuffleImages();
        displayScore();
        currScore = 0;
        hideGame();
        return;

    }
    currScore++;
    highScore = Math.max(highScore,currScore)
    isClicked[index] = true;
    rearrange(images);
    reshuffleImages();
}



//adding event to each grid
for(let i=0;i<16;i++)
divs[i].addEventListener('click',mainMeat)


function displayScore(){
    const name = prompt("Whats your name player?");
    hScore.innerHTML = highScore;
    cScore.innerHTML = currScore
    
    if(hScore.innerHTML=="")
    {
        console.log("high=0")
        hScore.innerHTML = highScore;
        hName.innerHTML = name;
        cScore.innerHTML = currScore;
        cName.innerHTML = name;
    }
    else if(parseInt(hScore.innerHTML)!=0)
    {
        if(parseInt(cScore.innerHTML)>=parseInt(hScore.innerHTML))
        {
            console.log("cur>high")
        hScore.innerHTML = highScore;
        hName.innerHTML = name;
        cScore.innerHTML = currScore;
        cName.innerHTML = name;
        }
        else if(parseInt(cScore.innerHTML)<parseInt(hScore.innerHTML))
        {
            console.log("curr<high")
            cScore.innerHTML = currScore;
            cName.innerHTML = name;

        }
    }
    else{
        hName.innerHTML = name;
        cName.innerHTML = name;
    }
}
// buttons logic

let pauseBtn = document.querySelector('.pause');
let resetBtn = document.querySelector('.reset');
let countDown = null;
let secs = 60;

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

function start() {
    //if its resume then the b`elow button will change this to start
    
    document.querySelector('.start').innerHTML = "Start";
    //below 2 line code is so that after game is paused i shouldnt see the hover effect on game tiles
    for(let i=0;i<16;i++)
    divs[i].classList.remove("noHover")
    if(countDown) {
        alert("the game is already Running!!")
        return
    }
    countDown = setInterval(function() {
        secs--;
        if (secs === 0) {
            displayTime.innerHTML = "0" + secs;
            clearInterval(countDown);
            secs = 60;
            countDown = null; 
            alert(`final score is ${currScore} and Max score is ${highScore}`)
            isClicked.fill(false);
            displayScore();
            currScore = 0;
            hideGame();

        }
        if (secs<10 && secs > 0)
            displayTime.innerHTML = "0" + secs;
        else displayTime.innerHTML = secs;
    }, 1000)
}

function pause () {
    if(!countDown)
    {
        alert("the game is not started")
        return
    }
    mainGrid.classList.add("gridBlur");
    //below 2 line code is so that after game is paused i shouldnt see the hover effect on game tiles
    for(let i=0;i<16;i++)
    divs[i].classList.add("noHover")
    document.querySelector('.start').innerHTML = "Resume";
    clearInterval(countDown);
    countDown=null;

}

function reset () {
    if(!countDown && document.querySelector('.start').innerHTML != "Resume") {
        return;
    }
    let toConfirm = confirm("Are you sure?");
    if (!toConfirm) {
        return;
    }
    else if(toConfirm) {
        clearInterval(countDown);
        countDown = null;
        secs = 60;
        displayTime.innerHTML = secs;
        currScore = 0;
        isClicked.fill(false);
        hideGame();
        document.querySelector('.start').innerHTML = "Start"
    }
    //lets add one option to reset the scorecards
}
