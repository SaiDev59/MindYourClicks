# MindYourClicks



Description: 

The 4*4 grid has 16 distinct clickable images. 
Each time you click a disctinct image, you score a point. 
Click as many distinct images you can before the timer ends. 
Note: Double clicking on a image will end your game. 
Good Luck!!!!!

Features of PokeOne:

-Once u start a game u can pause the game midway and continue it later,the game will be blurred out during this period for obvious reasons
-U can reset the game at any point of time,it will ask u for confirmation whether you want to reset it or not
-After each successive game the CurrentScore on the Top right corner of the page will be updated,the highscore will be updated
 once your current score exceeds the max of previous scores.
-We have implemented media queries in our game for great experience even on a mobile device.

For Developers :

Explanation of all the functions used in our Game

1 - rearrange();
This function takes input an array of numbers and changes the relative postion of those numbers using Math.random

2 - reshuffleImages();
This function initialzes each of the divs in the main grid with images from the images[] array
Note:
Almost every time we call reshuffleImages() we call the function rearrange() before it so that the images inside the divs are the shuffled ones.

3 - hideGame();
This function hides the mainGrid game by removing some class and changing innerHTML of those divs

4 - showGame();
This function shows the mainGrid game by adding the class removed by hideGame()

5 - displayScore();
This function is used to update HighScore and CurrentScore in our game.Several if/else logic statements are written to implement this.

6 - start();
This function takes care of the start button.

7 - pause();
This function pauses the Game at any point in time.Also the mainGrid gets blurred out when paused.

8 - reset();
This function resets the game at any point in time,player can start a new game after this.It will ask for confirmation before resetting

9 - mainMeat();
This is the core function in our program where we have added addEvenlistener() to each divs in the mainGrid and attached various 
Functionalites to them.We are combining all the other functionalities such as rearrange(),reshuffleImages(),displayScore(),hidegame() to achieve our goal.Inside this function we are mainly looking at three cases

#### Case 1 : When the user clicks a new Grid for the first time and the game ends.(Corresponds to maximum score of 16)
#### Case 2 : When the user click a new Grid for the first time and the game does not ends.(Still playing)
#### Case 3 : When the user click on a already cliked grid.(Game Over)

Explanation of Variables used in our Game

1 - images[]
Array to store images

2 - isClicked[]
boolean array of length 16 where each index corresponds to the image being clicked or not

3 - currScore,highScore 
