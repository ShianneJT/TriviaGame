/* You'll create a trivia form with multiple choice or true/false options (your choice).

The player will have a limited amount of time to finish the quiz.

The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.

Don't let the player pick more than one answer per question.

Don't forget to include a countdown timer. */ 

// Variables
// Qs answered correctly
// Qs answer incorrectly
// Qs unanswered

// Have a start button that on click will disappear and load the questions
$(document).ready(function() {
// Object array with trivia questions
    var triviaQs = [
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
    ] 

    var timerRunning = false;
    var intervalId;
    var timer = 10;
    var numOfQs = triviaQs.length;  
    var randomQindex = Math.floor(Math.random() * triviaQs.length);
    var choices = triviaQs[randomQindex];
    var usersChoice = '';
    var correctAnswer = 0;
    var wrongAnswer = 0
    var noAnswer = 0;
    var usedQs = [];


    console.log(`Number of questions: ${numOfQs}`);
    console.log(`Random Q Index: ${randomQindex}`);
    console.log(`Choices: ${choices}`);


// Click the start button to start the game displays questoin and moves it to used qs
    $('#start').click(function() {
         $('#start').hide();
         displayRandomQ();
         startTimer();
         for (var i = 0; i < triviaQs.length; i++) {
             usedQs.push(triviaQs[i])
        }

     }); //~~~~~ FOR TESTING RIGHT NOW ~~~~~~~~~

    // $('#start').click(function () {
    //     $('#start')
    // })

// If the timer is not running, run the countdown option
    function startTimer() {
        if (!timerRunning) {
            intervalId = setInterval(countdown, 1000)
            timerRunning = true;
        }
    };

// Timer begins and decrements 1 from timer var every second until the value is 0
    function countdown() {
        $('#timerDiv').html("<p>Time remaining: " + timer + "</p>");
        console.log(timer);
        timer--;

// When the timer reaches 0 
        if (timer === 0) {
            noAnswer++;
            timerRunning = false
            clearInterval(intervalId);       
            $('#testing').html("<p>TIME IS UP!</p>")
            console.log(timer)
            console.log(noAnswer)
        }
    };

// Stops the timer
    function stopTimer() {
        timerRunning = false;
        clearInterval(intervalId);
    };
        


    

// Display a random question adds value for each option
    function displayRandomQ() {
        $("#randomQdiv").html("<p>" + choices.question + "</p>");
            for (var j = 0; j < choices.options.length; j++) {
                var userChoicesDiv = $('<div>');
                userChoicesDiv.addClass('userGuess');
                userChoicesDiv.html(choices.options[j])
                userChoicesDiv.data('guessValue', j);
                $('#optionsDiv').append(userChoicesDiv);
        }

// seeing if user got the question right
        $('.userGuess').click(function() {
            usersChoice = parseInt($(this).data('guessValue'));           

            if (usersChoice === choices.answer) {
                stopTimer()
                usedQs.push($(this));
                correctAnswer++;
                $('#testing').html('<h1>CORRECT!</h1>')

                
                
                console.log(`Num of correct: ${correctAnswer}`)
                console.log('Correct!');
                console.log(`Used Qs: ${usedQs.length}`);
                console.log('randomQindex');
                console.log(`Number of questions left: ${triviaQs.length}`);
            } else {
                console.log('Wrong-o!');
                wrongAnswer++;
                console.log(`Num of wrong: ${wrongAnswer}`);
            }
        })
    }; // end of displayRandomQ()

//checks for end game status

    function endGameCheck() {
        if ((correctAnswer + wrongAnswer + noAnswer) === triviaQs) {
            $('#questionDiv').empty();
            $('#questionDiv').html("<p> Here is how you did: </p>")
            $('#choicesDiv').empty();
            $('#choicesDiv').append(`<p> Correct: ${correctAnswer} </p>`);
            $('#choicesDiv').append("<p>Incorrect: " + wrongAnswer + "</p>");
            $('#choicesDiv').append("<p>Unanswered: " + noAnswer + "</p>");
        } else {
            startTimer()
            displayRandomQ()
        }
    }
    


    


}); // End of $(document).ready(function()