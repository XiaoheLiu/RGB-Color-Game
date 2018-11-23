var colors = [];
var pickedColor = "";
var nSquares = 6; // number of squares

var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var resultDisplay = document.querySelector("#resultDisplay");
var resetButton = document.querySelector("#newGame");
var modeButtons = document.querySelectorAll(".modeButtons");


resetGame();
setUpSquares();

resetButton.addEventListener("click", function(){
    resetGame();
    this.textContent = "New Game";
})

for (var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
        if (this.textContent === "Easy") {
            nSquares = 3;
        }
        else if (this.textContent === "Hard") {
            nSquares = 6;
        }
        // Remove .selectedButton from all buttons
        for (var i = 0; i < modeButtons.length; i++) {
            modeButtons[i].classList.remove("selectedButton");
        }
        // Add .selectedButton for clicked button
        this.classList.add("selectedButton");
        resetGame();
    })
}

// Function to reset the game
function resetGame() {
    colors = getColors(nSquares);
    pickedColor = getPickedColor(colors);
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "teal";
    resultDisplay.textContent ="";

    for (var i=0; i < squares.length; i++){
        if (colors[i]){
            // Add initial colors to squares
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.backgroundColor = "#333333";
        }
    }
}

// Function to set up the static logics of the squares
function setUpSquares() {
    for (var i=0; i < squares.length; i++){
        // Add click listeners: remove color if clicked wrong color
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
                // Get color of clicked square, compare with pickedColor
            if (clickedColor === pickedColor){
                 // alert("Correct");
                resultDisplay.textContent = "Correct!";
                for (var j=0; j < squares.length; j++){
                    squares[j].style.backgroundColor = pickedColor;
                }
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again?";
            }
            else {
                // alert("Wrong");
                resultDisplay.textContent = "Try again!";
                this.style.backgroundColor = "#333333";
            }
        });
    }
}

// Function to get the picked color from colors
function getPickedColor(colors) {
    var len = colors.length;
    var pickedNum = getRandomInt(0,len);
    return colors[pickedNum];
}

// Function to build colors array with n elements
function getColors(n) {
    var colors = [];
    for (var i=0; i<n; i++) {
        str = "rgb(" + getRandomInt(0, 256) + ", " + getRandomInt(0, 256) + ", " + getRandomInt(0, 256) + ")";
        colors.push(str);
    }
    return colors;
}

// Function to get random int between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
    //The maximum is exclusive and the minimum is inclusive
}