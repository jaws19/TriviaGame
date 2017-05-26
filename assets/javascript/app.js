var triviaQuestions = [{
  question: "Which former NBA player was also known as 'Skip To My Lou'?",
  answerList: ["Steve Francis", "Rafer Alston", "Latrell Sprewell", "Allen Iverson"],
  answer: 1
},{
  question: "Which current NBA legend has been dubbed the 'Ghostface Drillah'?",
  answerList: ["Dirk Nowitzki", "Paul Pierce", "Tony Parker", "Lebron James"],
  answer: 0
},{
  question: "Which NBA future hall-of-famer is known simply as, 'The Black Mamba'?",
  answerList: ["Kobe Bryant", "Chris Paul", "Dwayne Wade", "Ray Allen"],
  answer: 0
},{
  question: "Which unheralded NBA player was known as, 'The Custodian'?",
  answerList: ["Luke Walton", "Raef Lafrenz", "Brian Cardinal", "Dwayne Schintzius"],
  answer: 2
},{
  question: "Which NBA hall-of-famer was knows as, 'The Round Mound of Rebound'?",
  answerList: ["Charles Oakley", "Shaquille O'neil", "Dennis Rodman", "Charles Barkley"],
  answer: 3
}];

var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
  correct: "Nothing But Net!",
  incorrect: "Brick!",
  endTime: "Shot Clock Violation!",
  finished: "Let's check the box score."
}

$('#gameOn').on('click', function(){
  $(this).hide();
  newGame();
});

$('#rematch').on('click', function(){
  $(this).hide();
  newGame();
});

function newGame(){
  $('#boxScore').empty();
  $('#nothingButNet').empty();
  $('#brick').empty();
  $('#airBall').empty();
  currentQuestion = 0;
  nothingButNet = 0;
  brick = 0;
  airBall = 0;
  newQuestion();
}

function newQuestion(){
  $('#message').empty();
  $('#correctedAnswer').empty();
  answered = true;
  
  //sets up new questions & answerList
  $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
  $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
  for(var i = 0; i < 4; i++){
    var choices = $('<div>');
    choices.text(triviaQuestions[currentQuestion].answerList[i]);
    choices.attr({'data-index': i });
    choices.addClass('thisChoice');
    $('.answerList').append(choices);
  }
  countdown();
  //clicking an answer will pause the time and setup answerPage
  $('.thisChoice').on('click',function(){
    userSelect = $(this).data('index');
    clearInterval(time);
    answerPage();
  });
}

function countdown(){
  seconds = 10;
  $('#shotClock').html('<h3>Shot Clock: ' + seconds + '</h3>');
  answered = true;
  //sets timer to go down
  time = setInterval(showCountdown, 1000);
}

function showCountdown(){
  seconds--;
  $('#shotClock').html('<h3>Shot Clock: ' + seconds + '</h3>');
  if(seconds < 1){
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage(){
  $('#currentQuestion').empty();
  $('.thisChoice').empty(); //Clears question page
  $('.question').empty();

  var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
  
  //checks to see correct, incorrect, or unanswered
  if((userSelect == rightAnswerIndex) && (answered == true)){
    nothingButNet++;
    $('#message').html(messages.correct);
  } else if((userSelect != rightAnswerIndex) && (answered == true)){
    brick++;
    $('#message').html(messages.incorrect);
    $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
  } else{
    airBall++;
    $('#message').html(messages.endTime);
    $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    answered = true;
  }
  
  if(currentQuestion == (triviaQuestions.length-1)){
    setTimeout(boxScore, 3000)
  } else{
    currentQuestion++;
    setTimeout(newQuestion, 3000);
  } 
}

function boxScore(){
  $('#shotClock').empty();
  $('#message').empty();
  $('#correctedAnswer').empty();

  $('#boxScore').html(messages.finished);
  $('#nothingButNet').html("Makes: " + nothingButNet);
  $('#brick').html("Misses: " + brick);
  $('#airBall').html("Turnovers: " + airBall);
  $('#rematch').addClass('reset');
  $('#rematch').show();
  $('#rematch').html('New Game?');
}