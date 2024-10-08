//this array holds all of the "Qircles", which is a term i created not to confuse myself with the built in "circles" in p5.
let qircleArray;

//this array holds all of the colors for each Qircle
let qircleColors;

//this array holds all of the key presses that correspond to each Qircle
let qircleKeysArray;

// this variable denotes the value of the upcoming Qircle 
let nextQircle;

//this variable holds the value of the current round, which is set to start at 0
let currentRound=0;

//this variable holds the boolean for the gameOver state, which stops refreshing the circles from being re drawn
let gameOver=false;

//audio for correct Qircle key press
let goodBeep;

//audio for incorrect Qircle key press
let badBeep;

//audio preload
function preload(){
    badBeep = loadSound("bad beep.mp3");
    goodBeep = loadSound("good beep.mp3");
}


//prints the text for the Win conditions
function Win(){
    fill ('green');
    textAlign(CENTER);
    textSize(50);
    text('Fortunately, you win!', 640,600);
    //stops the circle drawing loop
    gameOver=true;
}
    
/*this custom function advances the user to the next Qircle, if they haven't finished the currentRound. 
If currentRound is complete, user advances to next Round.*/  
function Advance(){
    goodBeep.play();
    if (nextQircle.index<4){
        //the next qircle in the array is being called up via the index property 
       nextQircle=qircleArray[nextQircle.index+1] 
    }
    // the whole game consists of 5 Rounds, this else if statement launches a new Round if less than 5 are complete.
    else if  (currentRound<5){
        roundStart()
    }
    // if the rounds are all completed without error, win screen appears
    else{
        Win()
    }
}

// Lose screen appears
function Lose(){ 
    badBeep.play();
    fill ('red');
    textAlign(CENTER);
    textSize(50);
    text('unfortunately, you lose', 640,600);
    gameOver=true;
    
}

// If else statements that matches keypress to the color of the color property of nextQircle, as well as triggering the Advance or Lose function
function keyPressed(){
    if (key ==='r'){
        if (nextQircle.color==='red'){
            Advance()
        }
        else{
            Lose()
        }
    } else if (key === 'b'){
        if (nextQircle.color ==='blue'){
            Advance()
        } 
        else{
            Lose()
        }
    } else if (key === 'g'){
        if (nextQircle.color ==='green'){
            Advance()
        } 
        else{
            Lose()
        }
    } else if (key === 'w'){
        if (nextQircle.color ==='white'){
            Advance()
        }
        else{
            Lose()
        }
    } else if (key === 'p'){
        if (nextQircle.color ==='purple'){
            Advance()
        } 
        else{
            Lose()
        }
    } else if (key === 'y'){
        if (nextQircle.color ==='yellow'){
            Advance()
        } 
        else{
            Lose()
        }
    } else if (key === 'o'){   
        if (nextQircle.color ==='orange'){
            Advance()
        } 
        else{
            Lose()
        }
    }
    //if user presses a key not referenced above, lose screen appears
    else{
        Lose()
    }
}



function roundStart(){
    //at the start of the Round, we are picking a random color from the qircleColorArray index for each of the five Qircles, 
    for(let index=0; index<5; index+=1){
        let randomColor= qircleColors[floor(random(0, 7))]
        qircleArray[index].setColor(randomColor)
    }
    //we are picking the next Qircle in the Array to appear
    nextQircle=qircleArray [0];
    //we are setting the value of the currentRound to be 1 more than whatever it was before roundStart
    currentRound+=1
}

//this class contains all off the properties and functions of each Qircle
class Qircle{
    constructor(index,color,xPos, yPos, dia){
        this.index=index;
        this.color= color;
        this.xPos= xPos;
        this.yPos= yPos;
        this.dia= dia;

    }

    drawQircle(){
        fill(this.color);
        circle (this.xPos, this.yPos, this.dia);

    }
    setColor(color){
        this.color=color;
    }
}

//this initializes all of the Arrays, and creates the canvas, and calls roundStart when canvas starts
function setup(){
    createCanvas(1280,720);

    qircleKeysArray = ['r', 'b', 'g','w','p', 'y', 'o']

    qircleArray = [

        new Qircle(0,'red', 290,360,160),
        new Qircle(1,'red', 465,360,160),
        new Qircle(2,'red', 640,360,160),
        new Qircle(3,'red', 815,360,160),
        new Qircle(4,'red', 990,360,160),
        
    ]
    qircleColors = [
        'red',
        'blue',
        'green',
        'white',
        'purple',
        'yellow',
        'orange',
    ]

    roundStart()
}

// instructions for the game, and a for loop that says, if gameOver is false, a Qircle should appear until 5 are on the screen.
function draw(){
    if(gameOver===false){
        background('black');
        for(let i=0; i<5; i+=1){
        qircleArray[i].drawQircle()
    }
    fill ('white');
    textAlign(CENTER);
    textSize(18);
    text('please press the letters on your keyboard which correspond to the color of each circle on your screen, from left to right!', 640,650)
    textSize(15);
    text('r=red, b=blue, g=green, w=white, p=purple, y=yellow, o=orange', 640,700)
    fill ('white');
    textAlign(LEFT);
    textSize(20);
    // a round counter that calls the current round
    text ('round'+ currentRound + '!', 50,40)
    }
    
}
