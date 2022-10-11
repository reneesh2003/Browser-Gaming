var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];

var level=0;
var started=false;

// When a is pressed
$(".game--start").click(function(){

  if(started!=true){
    $("#level-title").text("Level "+level);
    started=true;
    nextSequence();

  }


});


function nextSequence(){
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);



}


// When clicked on the colored buttons
$(".button").on("click",function(event){
  var buttonId=$(this).attr("id");
  userClickedPattern.push(buttonId);
  playSound(buttonId);
  animatePress(buttonId);
  correct(gamePattern,userClickedPattern);

});

function correct(gamePattern,userClickedPattern){
  var count=0;
  var flag=false;

  for(var i=0;i<userClickedPattern.length;i++){
    if(gamePattern[i]!==userClickedPattern[i]){
      flag=true;
      gameOver();
      break;
    }
    count=count+1;
  }
  if(gamePattern.length===count && flag===false){

    setTimeout(function(){
      nextSequence();
    },1000);

  }
  var title=$("#level-title").text();
  if (title==="Game Over, Press Start Key to Restart")
    startOver();

}


function gameOver(){
  $("#level-title").text("Game Over, Press Start Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },100);
  playSound("wrong");


}

function startOver(){
  gamePattern=[];
  userClickedPattern=[];
  level=0;
  started=false;


}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(curentColor){
  var color="#"+curentColor;
  $(color).addClass("pressed");
  setTimeout(function(){
    $(color).removeClass("pressed");
  },100);
}
