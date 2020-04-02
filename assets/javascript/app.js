$(document).ready(function() {

// Object array with trivia questions
    var questionArr = [
        {
            question: "Who is Han Solo's faithful companion?",
            options: [
                'Fozzy Bear', 'Chewbacca', 'Harry', 'Alf',
            ],
            answer: 1,
            picture: 'assets/images/00.gif',
        },
        {
            question: "What is the name of Boba Fett's ship?",
            options: [
                'Starship Enterprise', 'Ebon Hawk', 'Millennium Falcon', 'Slave I',
            ],
            answer: 3,
            picture: 'assets/images/01.gif',
        },
        {
            question: "What kind of droid is C-3PO?",
            options: [
                'Interrogation', 'Protocol', 'Samsung Galaxy S8', 'Astromech',
            ],
            answer: 1,
            picture: 'assets/images/02.gif',
        },
        {
            question: "What is the name of the Ewok who helps Leia? ",
            options: [
                'Olaf', 'Kermit', 'Wicket', 'Pippin',
            ],
            answer: 2,
            picture: 'assets/images/03.gif',
        },
        {
            question: "What color is Yoda's lightsaber?",
            options: [
                'Red', 'Green', 'Blue', 'Purple',
            ],
            answer: 1,
            picture: 'assets/images/04.gif',
        },
        {
            question: "Who is Leia's only hope?",
            options: [
                'Jabba The Hutt', 'Barack Obama', 'Obi-Wan Kenobi', 'Oobi Doob Scooby Dooby Benubi',
            ],
            answer: 2,
            picture: 'assets/images/05.gif'
        },
        {
            question: "Who is C3PO's companion?",
            options: [
                'Bib Fortuna', 'Willrow Hood', 'R2-D2', 'Salacious B. Crumb',
            ],
            answer: 2,
            picture: 'assets/images/06.gif'
        },
        {
            question: "Who is Luke's Uncle?",
            options: [
                'Sam', 'Phil', 'Owen', 'Fester',
            ],
            answer: 2,
            picture: 'assets/images/07.jpg',
        },
        {
            question: "What does the clubgoer (Elan Sel'Sabagno) try to sell Obi-Wan in the club on Coruscant?",
            options: [
                'Death Sticks', 'Kyber Crystals', 'Toilet Paper', 'Power Convertors',
            ],
            answer: 0,
            picture: 'assets/images/08.gif',
        },
        {
            question: "What planet is Han Solo from?",
            options: [
                'Corellia', 'Coruscant', 'Dathomir', 'Tattooine',
            ],
            answer: 0,
            picture: 'assets/images/09.gif',
        },
    ];

// Arrays
    var timerRunning = false;
    var timer = 15;
    var intervalId;
    var numOfQs = questionArr.length;
    var qIndex;
    var usedQs = [];
    var usersGuess = "";
    var correctCount = 0;
    var wrongCount = 0;
    var noAnswerCount = 0;
    var randomQ;

// Reset button is hidden on load
    $('#reset').hide();

// Click Start to begin - start button disappears, a question is displayed while the timer starts
    $('#start').click(function() {
        $('#start').hide();
        displayRandomQ();
        startTimer();
    });

// Checks if the timer is running - if false run countdown function every second
    function startTimer() {
        if (!timerRunning) {
            intervalId = setInterval(countdown, 1000);
            timerRunning = true;
        };
    };

// Timer starts counting down from 20
    function countdown() {
        $('#timerDiv').html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

// When the timer reaches 0, adds 1 to no answer, stops timer and notifies user the time is up
        if (timer === 0) {
            noAnswerCount++;
            stopTimer();
            $('#answersDiv').html("<h5>Times up! The correct answer was: " + randomQ.options[randomQ.answer] + "</h5>");
            endGameCheck();
        };
    };

// Stops and resets the timer
    function stopTimer() {
        timerRunning = false;
        clearInterval(intervalId);
    };

// Creates a random number to represent the index of the question array to generate and display a random question
    function displayRandomQ() {
        qIndex = Math.floor(Math.random() * questionArr.length);
        randomQ = questionArr[qIndex];
        $("#questionDiv").html("<h4>" + randomQ.question + "</h4>");
        
// Loops through and creates a div for each option/answer with a class and value equal to i
        for (var i = 0; i < randomQ.options.length; i++) {
            var optionsDiv = $('<h4>');
            optionsDiv.addClass('userOption');
            optionsDiv.html(randomQ.options[i])
            optionsDiv.data('guessValue', i);
            $('#answersDiv').append(optionsDiv);
        };

// This takes the users guess and changes the string to an integer to check against the answer
        $('.userOption').click(function() {
            usersGuess = parseInt($(this).data('guessValue'));

// If the value of the users guess is equal to the value of questionIndex.answer stop the timer
// ...add one to correct answers score and notify the user their choice is correct then check end game status
            if (usersGuess === randomQ.answer) {
                stopTimer();
                correctCount++;
                usersGuess = "";
                $('#answersDiv').html('<h4>Correct!</h4>');
                endGameCheck();
// If the value is not equal to the value, stop the timer
// ...add one to wrong answer var and notify the user their choice is incorrect then run endGameCheck()
            } else {
                stopTimer();
                wrongCount++;
                usersGuess = "";
                $('#answersDiv').html("<h4>Sorry, that's incorrect. The correct answer was: " + randomQ.options[randomQ.answer] + "</h4>");
                endGameCheck();
            };
        });
    }; // end of displayRandomQ()

// clean up below
// Checks the end game status
    function endGameCheck() {
// Displays image relevant to the question
        $('#answersDiv').append('<img src=' + randomQ.picture + '>');
// This takes the current question and places it into an array to hold used questions and removes it from the question array so it does not get chosen again
// Then sets the timer back to 15
    usedQs.push(randomQ);
    questionArr.splice(qIndex, 1)
        setTimeout(function() {
            $('#answersDiv').empty();
            timer = 15;

// If the combined number of right, wrong, and no answer i
        if ((correctCount + wrongCount + noAnswerCount) === numOfQs) {
            $('#questionDiv').empty();
            $('#questionDiv').html('<h4>Game over! Here is how you did:</h4>');
            $('#answersDiv').append(`<h4>Correct: ${correctCount}</h4>`);
            $('#answersDiv').append(`<h4>Incorrect: ${wrongCount}</h4>`);
            $('#answersDiv').append(`<h4>Unanswered: ${noAnswerCount}</h4>`);
            $('#reset').show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
        } else {
            startTimer();
            displayRandomQ();
        }
    }, 4000);
    };
// When the player clicks 'Play Again?' the button hides and the game starts over
    $('#reset').click(function() {
        $('#reset').hide();
        $('#questionDiv').empty();
        $('#answersDiv').empty();

// This is supposed to be putting the questions back into the original array
        for (var j = 0; j < usedQs.length; j++) {
            questionArr.push(usedQs[j]);
        }
        usedQs = [];
        startTimer();
        displayRandomQ();
        console.log('playing again!')
    });

}); // End of $(document).ready(function()