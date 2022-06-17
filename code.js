//in this approach of reshuffling i am shuffling the images where grid are staying at the same place
//create an array of img
let startBtn = document.querySelector('.start');
let mainGrid = document.querySelector('section #container')
let displayTime = document.querySelector('.displayTime')
let images = []
for(let i=0;i<16;i++)
{
    images[i] = `<img id=${i} src= "Pictures/image${i}.png" width=100% height=100%>`
}
const divs = document.querySelectorAll('section  section  div')

startBtn.addEventListener('click',()=>{
    mainGrid.classList.add("grid-container");
    mainGrid.classList.remove("gridBlur");
    for(let i = 0;i<16;i++)
    {
        
        divs[i].classList.add("grid")
        divs[i].innerHTML = images[i];
        
    }
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
        return array2;
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

        mainGrid.classList.remove("grid-container")
        for(let i = 0;i<16;i++)
        {
            
            divs[i].classList.remove("grid");
            divs[i].innerHTML = "";
            
        }
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
    
    if(hScore.innerHTML==0)
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
    document.querySelector('.start').innerHTML = "Start";
    if(countDown) {
        return
    }
    countDown = setInterval(function() {
        secs--;
        if (secs === 0) {
            clearInterval(countDown);
            secs = 60;
            countDown = null; 
            
            alert(`final score is ${currScore} and Max score is ${highScore}`)
            currScore = 0;
            isClicked.fill(false);
            mainGrid.classList.remove("grid-container")
            for(let i = 0;i<16;i++)
            {
                
                divs[i].classList.remove("grid");
                divs[i].innerHTML = "";
                
            }

        }
        if (secs<10 && secs > 0)
            displayTime.innerHTML = "0" + secs;
        else displayTime.innerHTML = secs;
    }, 1000)
}

function pause () {
    mainGrid.classList.add("gridBlur");
    document.querySelector('.start').innerHTML = "Resume";
    clearInterval(countDown);
    countDown = null;
}

function reset () {
    if(!countDown) {
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
        isClicked.fill(false)

        mainGrid.classList.remove("grid-container")
        for(let i = 0;i<16;i++)
        {
            
            divs[i].classList.remove("grid");
            divs[i].innerHTML = "";
            
        }
    }
}
