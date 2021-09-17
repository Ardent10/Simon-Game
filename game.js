
// creating an array to store the colors
var buttonColors = ["red","blue","green","yellow"];
// empty array to store the game patterns
var gamePatter = [];
// the empty array to store the user clicked array
var userClickedPattern = [];

// a click function to detect the buttons created when the user has clicked on them
$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);  // to check whether the property is incorporated or not

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//creating the variables for detecting first keystrokes and its levels
var started = false;
var level =0;
//keyboard Keypresse
$(document).keypress(function(){

    if(!started){
      $("#level-title").text("Level "+ level);
      nextSequence();
      started = true;
    }
});



// the main sequence function
function nextSequence(){

   // once the nextSequence() is triggered then reset the  userclicked pattern to an empty array ready for the next level.
   userClickedPattern = [];
  //updating and making the level h1 with its id
   level++;
   $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random()*4);
  // the random chosen color that is to be selected from the button colors array
  var randomChosenColor = buttonColors[randomNumber];

  // pushing that that color into the emply game pattern array
  gamePatter.push(randomChosenColor);

  // Adding the flash property
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // adding the sound property

  playSound(randomChosenColor);
}

// function for play sound
function playSound(name){

  var audio = new Audio(name+".mp3");
  audio.play();
}

// button animation
function animatePress(currentColor){

     $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
       $("#"+currentColor).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){

    if(gamePatter[currentLevel] === userClickedPattern[currentLevel])
    {
      console.log("success");
      if(userClickedPattern.length === gamePatter.length)
      {
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else
    {
      console.log("wrong");
      // the wrong sound
      playSound("wrong");
      // giving the red color to the background when the answer is wrong
      $("body").addClass("game-over");
      // timeout of the background css
      setTimeout(function(){
      $("body").removeClass("game-over");
      },200);
       // game over of the background
      $("#level-title").text("Game Over, Press Any key to Restart");
      $("h2").remove();

      // calling the start over function
      startOver();
    }
}

function startOver(){
  level = 0;
  gamePatter = [];
  started = false;
}
