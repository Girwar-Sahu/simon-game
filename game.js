// declare variables
const buttonColor = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = true;
var score = 0;

// start game with keypress
$(document).on('keypress', function () {
    if (started) {
        nextSequence();
        started = false;
    }
});

// click a button and play sound with click event and playSound function
$('.btn').click(function () {
    var userChosenColor = $(this).attr('id');
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});

// set the game score
function gameScore(value){
    $('.score strong').text('0'+value);
}

// next Level or next sequence
function nextSequence() {
    userClickPattern = [];
    level += 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// play sound when click a button or start game
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// animation when press a key
function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

// check the answer with check answer function
function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length) {
            gameScore(score += 5);
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press any key to Restart.');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 250);
        startOver();
    }
}

// reset the game if game is over
function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
    score = 0;
    gameScore(score);
}