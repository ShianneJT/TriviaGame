// To do: 
// Add images and maybe some fluff
// Tell them the right answer if they get it wrong

// BUGS
// Doesn't stop at 10 questions
// Needs to not duplicate questions

$(document).ready(function() {

// Object array with trivia questions
    var questionArr = [
        {
            question: "Who is Han Solo's faithful companion?",
            options: [
                'Fozzy Bear', 'Chewbacca', 'Harry', 'Alf',
            ],
            answer: 1,
        },
        {
            question: "What is the name of Boba Fett's ship?",
            options: [
                'Starship Enterprise', 'Ebon Hawk', 'Millennium Falcon', 'Slave I',
            ],
            answer: 3,
        },
        {
            question: "What kind of droid is C-3PO?",
            options: [
                'Interrogation', 'Protocol', 'Samsung Galaxy S8', 'Astromech',
            ],
            answer: 1,
        },
        {
            question: "What is the name of the Ewok who helps Leia? ",
            options: [
                'Olaf', 'Kermit', 'Wicket', 'Pippin',
            ],
            answer: 2,
        },
        {
            question: "What color is Yoda's lightsaber?",
            options: [
                'Red', 'Green', 'Blue', 'Purple',
            ],
            answer: 1,
        },
        {
            question: "Who is Leia's only hope?",
            options: [
                'Jabba The Hutt', 'Barack Obama', 'Obi-Wan Kenobi', 'Oobi Doob Scooby Dooby Benubi',
            ],
            answer: 2,
        },
        {
            question: "Who is C3PO's companion?",
            options: [
                'Bib Fortuna', 'Willrow Hood', 'R2-D2', 'Salacious B. Crumb',
            ],
            answer: 2,
        },
        {
            question: "Who is Luke's Uncle?",
            options: [
                'Sam', 'Phil', 'Owen', 'Fester',
            ],
            answer: 2,
        },
        {
            question: "What does Elan Sel'Sabagno (seriously, that's his name) try to sell Obi-Wan in the club on Coruscant?",
            options: [
                'Death Sticks', 'Kyber Crystals', 'Toilet Paper', 'Power Convertors',
            ],
            answer: 0,
        },
        {
            question: "What planet is Han Solo from?",
            options: [
                'Corellia', 'Coruscant', 'Dathomir', 'Tattooine',
            ],
            answer: 0,
        },
    ];

// Arrays
    var timerRunning = false;
    var timer = 20;
    var intervalId;
    var numOfQs = questionArr.length;
    var qIndex;
    var questionIndex;
    var activeQs = [];
    var usedQs = [];
    var totalQs = [];
    var usersChoice = "";
    var usersGuess = "";
    var correctCount = 0;
    var wrongCount = 0;
    var noAnswerCount = 0;
    var randomQ;


console.log('Question array length: ' + questionArr.length);



// Hides the reset button on load
    $('#reset').hide();

// Click Start to begin - start button disappears, a question is displayed while the timer starts
    $('#start').click(function() {
        $('#start').hide();
        displayRandomQ();
        startTimer();
    // NOPE !@43423 This adds the array of questions into a separate array to prevent duplicate questions

            console.log('Total qs: ' + totalQs.length);
            console.log('Used qs: ' + usedQs.length);
            console.log('Q array: ' + questionArr.length);
            console.log('The game has started');
       
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
        $('#timerDiv').html("<p>Time remaining: " + timer + "</p>");
        timer--;

    // When the timer reaches 0, adds 1 to no answer, stops timer and notifies user the time is up
        if (timer === 0) {
            noAnswerCount++;
            stopTimer();
            $('#answersDiv').html("<p>TIME IS UP!</p>");
            endGameCheck();
        };
    };

// Stops the timer
    function stopTimer() {
        timerRunning = false;
        clearInterval(intervalId);
    };

// Creates a random number to represent the index of the question array to generate and display a random question
    function displayRandomQ() {
        qIndex = Math.floor(Math.random() * questionArr.length);
        randomQ = questionArr[qIndex];
        $("#questionDiv").html("<p>" + randomQ.question + "</p>");
        
// Loops through and creates a div for each option with a class and value equal to i
        for (var i = 0; i < randomQ.options.length; i++) {
            var optionsDiv = $('<div>');
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
                $('#answersDiv').html('<h1>CORRECT!</h1>');
                endGameCheck();
// If the value is not equal to the value, stop the timer
// ...add one to wrong answer var and notify the user their choice is incorrect then run endGameCheck()
            } else {
                stopTimer();
                wrongCount++;
                usersGuess = "";
                $('#answersDiv').html('<h1>INCORRECT!</h1>');
                endGameCheck();
            };
        });
    }; // end of displayRandomQ()

// clean up below
// Checks the end game status
    function endGameCheck() {
        $('#answersDiv').append("This is a test of the emergency broadcast system");
    // Moves the question so it doesnt get duplicated
    usedQs.push(randomQ);
    questionArr.splice(qIndex, 1)

        setTimeout(function() {
            $('#answersDiv').empty();
            timer = 5;


        if ((correctCount + wrongCount + noAnswerCount) === numOfQs) {
            $('#questionDiv').empty();
            $('#questionDiv').html("<p> Here is how you did: </p>");
            $('#answersDiv').append(`<p>Correct: ${correctCount} </p>`);
            $('#answersDiv').append("<p>Incorrect: " + wrongCount + "</p>");
            $('#answersDiv').append("<p>Unanswered: " + noAnswerCount + "</p>");
            $('#reset').show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
        } else {
            startTimer();
            displayRandomQ();
        }
    }, 2000); // change
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
        startTimer();
        displayRandomQ();
        console.log('playing again!')
    });

}); // End of $(document).ready(function()