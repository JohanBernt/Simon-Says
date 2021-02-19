//Creates an array of colours
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//detects when game has started
var started = false;

var level = 0;

$(document).keydown(function() {
if (!started) {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});

//detecting button press
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //checks answer after player has clicked
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    // plays when player is wrong
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // call startOver to restart the game when wrong
    startOver();
  }
}

//selects a random colour from the array
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomChosenColour = buttonColours[Math.floor(Math.random() * buttonColours.length)];
  gamePattern.push(randomChosenColour);

  //setting a flash animation when clicking a colour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //adding audio
  playSound(randomChosenColour);
}

//Add sounds to button clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + '.mp3');
  audio.play();
}

//Adding animations to clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
