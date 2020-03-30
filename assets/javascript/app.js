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
                'Fozzy Bear',
                'Chewbacca',
                'Harry',
                'Alf'
            ],
            answer: 1,
        },
        {
            question: "What is the name of Boba Fett's ship?",
            options: [
                'Starship Enterprise',
                'Ebon Hawk',
                'Millennium Falcon',
                'Slave I'
            ],
            answer: 3,
        },
        {
            question: "What kind of droid is C-3PO?",
            options: [
                'Interrogation',
                'Protocol',
                'Samsung Galaxy S8',
                'Astromech'
            ],
            answer: 1,
        },
        {
            question: "What is the name of the Ewok who helps Leia? ",
            options: [
                'Olaf',
                'Kermit',
                'Wicket',
                'Pippin'
            ],
            answer: 2,
        },
        {
            question: "What color is Yoda's lightsaber?",
            options: [
                'Red',
                'Green',
                'Blue',
                'Purple'
            ],
            answer: 1,
        },
        {
            question: "Who is Leia's only hope?",
            options: [
                'Jabba The Hutt',
                'Barack Obama',
                'Obi-Wan Kenobi',
                'Oobi Doob Scooby Dooby Benubi'
            ],
            answer: 2,
        },
        {
            question: "Who is C3PO's companion?",
            options: [
                'Bib Fortuna',
                'Willrow Hood',
                'R2-D2',
                'Salacious B. Crumb'
            ],
            answer: 2,
        },
        {
            question: "Who is Luke's Uncle?",
            options: [
                'Sam',
                'Phil',
                'Owen',
                'Fester'
            ],
            answer: 2,
        },
        {
            question: "What does Elan Sel'Sabagno (seriously, that's his name) try to sell Obi-Wan in the club on Coruscant?",
            options: [
                'Death Sticks',
                'Kyber Crystals',
                'Toilet Paper',
                'Power Convertors'
            ],
            answer: 0,
        },
        {
            question: "What planet is Han Solo from?",
            options: [
                'Corellia',
                'Coruscant',
                'Dathomir',
                'Tattooine'
            ],
            answer: 0,
        },        
    ];

// Arrays
    var timerRunning = false;
    var timer = 20;
    var intervalId;
    var numOfQs = questionArr.length;
    var randomQ;
    var questionIndex;
    var activeQs = [];
    var usedQs = [];
    var usersChoice = "";
    var correctAnswerCount = 0;
    var wrongAnswerCount = 0;
    var noAnswerCount = 0;

// Hides the reset button on load
    $('#reset').hide();

// Click Start to begin - start button disappears, a question is displayed while the timer starts
    $('#start').click(function() {
        $('#start').hide();
        displayRandomQ();
        startTimer();
    // This adds the array of questions into a separate array to prevent duplicate questions
        for (var i = 0; i < questionArr.length; i++) {
            activeQs.push(questionArr[i]);
            console.log('Active qs: ' + activeQs.length);
            console.log('Used qs: ' + usedQs.length);
            console.log('Q array: ' + questionArr.length);
            console.log('The game has started');
        };
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

// Randomly picks a question from the array and assigns it to a variable
    function displayRandomQ() {
        randomQ = Math.floor(Math.random() * questionArr.length);
        questionIndex = questionArr[randomQ];

    // Displays the question, loops through and creates a div for each option with a class and value
        $("#randomQdiv").html("<p>" + questionIndex.question + "</p>");
            for (var i = 0; i < questionIndex.options.length; i++) {
                var choicesDiv = $('<div>');
                choicesDiv.addClass('userGuess');
                choicesDiv.html(questionIndex.options[i])
                choicesDiv.data('guessValue', i);
                $('#answersDiv').append(choicesDiv);
        };

    // This takes the users choice and changes the string to an integer to check against the answer
        $('.userGuess').click(function() {
            usersChoice = parseInt($(this).data('guessValue'));

    // If the value of the users guess is equal to the value of questionIndex.answer stop the timer
    // ...add one to correct answers score and notify the user their choice is correct then check end game status
            if (usersChoice === questionIndex.answer) {
                stopTimer();
                correctAnswerCount++;
                usersChoice = "";
                $('#answersDiv').html('<h1>CORRECT!</h1>');
                endGameCheck();
    // If the value is not equal to the value, stop the timer
    // ...add one to wrong answer var and notify the user their choice is incorrect then run endGameCheck()
            } else {
                stopTimer();
                wrongAnswerCount++;
                usersChoice = "";
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
        usedQs.push(questionIndex);
        questionArr.splice(randomQ, 1);
        console.log('Active qs end: ' + activeQs.length);
        console.log('Used qs end: ' + usedQs.length);
        console.log('Q array end: ' + questionArr.length);
        // console.log(JSON.stringify(questionArr));
        // console.log(JSON.stringify(usedQs));
        // console.log(JSON.stringify(questionArr));
        setTimeout(function() {
            $('#answersDiv').empty();
            timer = 5;


        if ((correctAnswerCount + wrongAnswerCount + noAnswerCount) === numOfQs) {
            $('#randomQdiv').empty();
            $('#randomQdiv').html("<p> Here is how you did: </p>");
            $('#answersDiv').append(`<p>Correct: ${correctAnswerCount} </p>`);
            $('#answersDiv').append("<p>Incorrect: " + wrongAnswerCount + "</p>");
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
        $('#randomQdiv').empty();
        $('#answersDiv').empty();
// This is supposed to be putting the questions back into the original array
        for (var i = 0; i < usedQs.length; i++) {
            questionArr.push(usedQs[i]);
        }
        startTimer();
        displayRandomQ();
        console.log('playing again!')
    });

}); // End of $(document).ready(function()