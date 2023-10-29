// list of questions, choices, answers
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
{
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

var student = {
    initials: "",
    score: 0,
  };
  
  var student = document.getElementById("user-name");
  var question = document.getElementById("question");
  var answer = document.getElementById("answer");
  var timerElement = document.querySelector(".timer-count");
  var correct = document.querySelector(".correct");
  var incorrect = document.querySelector(".incorrect");
  var correctCounter = 0;
  var IncorrectCounter = 0;
  var timerCount  ;
  var timerInterval ;
  var startButton = document.querySelector(".start-button");
  var currentIndex = 0
  
  function displayQuestion (){
    document.getElementById("title").textContent=questions[currentIndex].title
    document.querySelector("#question").innerHTML=""
    questions[currentIndex].choices.forEach(function(choice){
     var opt = document.createElement("option") 
     opt.textContent=choice
     opt.value=choice
     document.querySelector("#question").append(opt)
    })
  }
  
  function checkAnswer(evt) {
    const correctAnswer = evt.target.value;
    if (questions[currentIndex].answer === correctAnswer) {
      correctCounter++
      correct.textContent=correctCounter
    } else {
      timerCount -= 5
      if(timerCount<=0)
      endQuiz()
    incorrectCounter++
    incorrect.textContent=incorrectCounter
    }
    currentIndex++
    if (currentIndex===questions.length)
    endQuiz()
  else displayQuestion()
  }
  
  // The setTimer function starts and stops the timer 
  function startTimer() {
    timerInterval = setInterval(function () {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount === 0) {
      endQuiz() 
      }
    }, 1000);
  }
  
  function endQuiz(){
    clearInterval(timerInterval);
    document.querySelector(".questions").classList.add("hide")
    saveUserScore();
  }
  
  var chosenAnswer = "";
  var correctCounter = 0;
  var incorrectCounter = 0;
  var isCorrect = false;
  var timer;
  var timerCount;
  
  function saveUserScore (){
    var initials = prompt("Please enter your initials");
    if (initials) {
      student.initials=initials;
      student.score = correctCounter;
      localStorage.setItem("studentGrade", JSON.stringify(student));
    renderMessage();
    }
  }
  
  function renderMessage(){
    var lastGrade=JSON.parse(localStorage.getItem("studentGrade"));
    if (lastGrade !=null){
      document.querySelector(".message").textContent =
      lastGrade.initials +
      "received a score of" +
      lastGrade.score +
      "in the quiz.";
    }
  }
  
  //The init function is called when the page loads 
  function init() {
    getCorrect();
    getIncorrect();
  }
  // The startGame function is called when the start button is clicked
  function startGame() {
    isWin = false;
    timerCount = 60;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    startTimer()
    displayQuestion()
  }
  startButton.addEventListener("click", startGame);
  
  
  function renderMessage() {
    var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
    if (lastGrade !== null) {
      document.querySelector(".message").textContent = lastGrade.student + 
      " received a/an " + lastGrade.grade
    }
  }
  document.getElementById("question").addEventListener("change",checkAnswer)