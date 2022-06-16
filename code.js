//in this approach of reshuffling i am shuffling the images where grid are staying at the same place
//create an array of img

let images = []
for(let i=0;i<16;i++)
{
    images[i] = `<img id=${i} src= "Pictures/image${i}.png" width=100% height=100%>`
}
const divs = document.querySelectorAll('section  section  div')

window.addEventListener('load',()=>{
    for(let i = 0;i<16;i++)
    {
        divs[i].classList.add("grid")
        divs[i].innerHTML = images[i];
        
    }
})



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
    let finalScore = 0;
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
    if(finalScore==15 && isClicked[index]==false)
    {
        highScore = finalScore+1;
        alert(`final score is ${highScore} and Max score is ${highScore}`)
        finalScore = 0;
        isClicked.fill(false)
        rearrange(images)
        reshuffleImages();
        return;

    }
    //if u dont click all the 16 and end your game in between
    if(isClicked[index])
    {
        alert(`final score is ${finalScore} and Max score is ${highScore}`)
        finalScore = 0;
        //reset the game here
        isClicked.fill(false)
        rearrange(images)
        reshuffleImages();
        return;
    }
    finalScore++;
    highScore = Math.max(highScore,finalScore)
    isClicked[index] = true;
    rearrange(images);
    reshuffleImages();
}

//adding event to each grid
for(let i=0;i<16;i++)
divs[i].addEventListener('click',mainMeat)
