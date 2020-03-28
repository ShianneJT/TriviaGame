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
            choices: [
                'Fozzy Bear',
                'Chewbacca',
                'Harry',
                'Alf'
            ],
            answer: 1,
        },
        {
            question: "What is the name of Boba Fett's ship?",
            choices: [
                'Starship Enterprise',
                'Ebon Hawk',
                'Millennium Falcon',
                'Slave I'
            ],
            answer: 3,
        },
        {
            question: "What kind of droid is C-3PO?",
            choices: [
                'Interrogation',
                'Protocol',
                'Samsung Galaxy S8',
                'Astromech'
            ],
            answer: 1,
        },
        {
            question: "What is the name of the Ewok who helps Leia? ",
            choices: [
                'Olaf',
                'Kermit',
                'Wicket',
                'Pippin'
            ],
            answer: 2,
        },
        {
            question: "What color is Yoda's lightsaber?",
            choices: [
                'Red',
                'Green',
                'Blue',
                'Purple'
            ],
            answer: 1,
        },
        {
            question: "Who is Leia's only hope?",
            choices: [
                'Jabba The Hutt',
                'Barack Obama',
                'Obi-Wan Kenobi',
                'Oobi Doob Scooby Dooby Benubi'
            ],
            answer: 2,
        },
        {
            question: "Who is C3PO's companion?",
            choices: [
                'Bib Fortuna',
                'Willrow Hood',
                'R2-D2',
                'Salacious B. Crumb'
            ],
            answer: 2,
        },
        {
            question: "Who is Luke's Uncle?",
            choices: [
                'Sam',
                'Phil',
                'Owen',
                'Fester'
            ],
            answer: 2,
        },
        {
            question: "What does Elan Sel'Sabagno (seriously, that's his name) try to sell Obi-Wan in the club on Coruscant?",
            choices: [
                'Death Sticks',
                'Kyber Crystals',
                'Toilet Paper',
                'Power Convertors'
            ],
            answer: 0,
        },
        {
            question: "What planet is Han Solo from?",
            choices: [
                'Corellia',
                'Coruscant',
                'Dathomir',
                'Tattooine'
            ],
            answer: 0,
        },        
    ] 




}) // End of $(document).ready(function()