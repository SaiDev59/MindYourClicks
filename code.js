let displayTime = document.querySelector('.timeBar')
let startBtn = document.querySelector('.start');
let pauseBtn = document.querySelector('.pause');
let resetBtn = document.querySelector('.reset');
let countDown = null;
let secs = 60;

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

function start() {
    if(countDown) {
        return
    }
    countDown = setInterval(function() {
        secs--;
        if (secs === 0) {
            clearInterval(countDown);
            secs = 60;
            counDown = null; 
            
        }
        if (secs<10 && secs > 0)
            displayTime.innerHTML = "0" + secs;
        else displayTime.innerHTML = secs;
    }, 1000)
}

function pause () {
    clearInterval(countDown);
    countDown = null;
}

function reset () {
    clearInterval(countDown);
    countDown = null;
    secs = 60;
    displayTime.innerHTML = secs;

}