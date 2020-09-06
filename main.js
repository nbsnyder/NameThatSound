/*

Here's the correspondence between the IPA vowels and the letters I use:

qw------er-----------ty
 |   ui  |         o  |
 pa------sd----------fg
  |        |h         |
  jk-------lz--------xc
   |v       |b        |
   nm----------------!@

*/

// Pairs of vowels that can be hard for speakers of General American English to differentiate
var pairs = {
    'q': ['e'], 
    'w': ['e', 'r', 'i'], 
    'e': ['q', 'w', 't', 's'], 
    'r': ['w', 'y'], 
    't': ['o', 'f', 'e'], 
    'y': ['r'], 
    'u': ['p'], 
    'i': ['w', 'a'], 
    'o': ['t'], 
    'p': ['u'], 
    'a': ['i'], 
    's': ['e', 'h'], 
    'f': ['t'], 
    'g': ['c'], 
    'h': ['s'], 
    'c': ['g'], 
    'b': ['n', 'm'],
    'n': ['b',],
    'm': ['b']
};

// Sets up a new screen in the game
function NewScreen() {

    // Clear the class and src attributes of the answer buttons
    $("#Option0, #Option1").removeAttr("class");
    $("#Option0, #Option1").removeAttr("src");

    // Determine (randomly) the sounds that the user will be tested on
    var firstSound = Object.keys(pairs)[Math.floor(Math.random() * Object.keys(pairs).length)];
    var secondSound = pairs[firstSound][Math.floor(Math.random() * pairs[firstSound].length)];

    // Random 0 or 1 --> will determine which answer choice is the correct one
    var zeroOrOne = (Math.random() < 0.5) ? 0 : 1;

    // Sets the answer button with the correct answer
    $("#Option" + zeroOrOne.toString()).attr("class", "correct");
    $("#Option" + zeroOrOne.toString() + "Img").attr("src", "images/" + firstSound + ".png");

    // Sets the answer button with the incorrect answer
    $("#Option" + (1 - zeroOrOne).toString()).attr("class", "incorrect");
    $("#Option" + (1 - zeroOrOne).toString() + "Img").attr("src", "images/" + secondSound + ".png");

    // Sets up the play button with the correct sound
    $("#PlaySound").attr("src", "audio/" + firstSound + ".mp3");

    // Play the sound
    $("#PlaySound")[0].play();

}

// Determines if the choice the user made was correct
function ChoiceMade(id) {
    if ($("#" + id).attr("class").localeCompare("correct") == 0) {
        // Set the response box to correct
        $("#Response").text("Correct!");

        // Set up a new screen
        NewScreen();
    } else {
        // Set the response box to incorrect
        $("#Response").html("Incorrect.<br>Listen again.");
        
        // Play the sound
        $("#PlaySound")[0].play();
    }

}

$(document).ready(function() {

    // When the user click the ok button, set up the game
    $("#okbutton").click(function () {
        if ($(".row").css("display") === "none") {

            // show the main game
            $(".row").fadeIn("slow");
            $(".row").css("display", "block");

            // hide the start screen
            $("#startscreen").css("display", "none");

            // set up a new screen in the game
            NewScreen();
        }
    });

    // When the user clicks the play button, play the sound
    $("#PlaySoundButton").click(function () {
        $("#PlaySound")[0].play();
    });

    // When the user clicks an answer button, check if the choicewas correct
    $("#Option0, #Option1").click(function() {
        // Calls the ChoiceMade function and passes the id of the answer button that was clicked
        ChoiceMade($(this).attr("id"));
    });

});
