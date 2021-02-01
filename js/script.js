// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions

function GameObject(name, image, health) {
    this.name = name;
    this.img = image;
    this.health = health;
    this.x = 0;
    this.y = 0;
    this.height = 600;
    this.width = 400;
}

//initialising sprite image
var playerImage = new Image();
playerImage.src = "./img/spritesheet.png";

var npcImage = new Image();
npcImage.src = "./img/spritesheet1.png";

var bg = new Image();
bg.src = "./img/background.png";

var canvas = document.getElementById("game");
//2d context for canvas
var context = canvas.getContext("2d");

// Holds current user input
function GamerInput(input) {
    this.action = input;
}
// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input
//Default direction is 0
var direction = 0;
//Default speed is 2
var playerSpeed = 0;
// Default Player
var npcRandomx=Math.floor((Math.random()*650)+1);
var npcRandomy=Math.floor((Math.random()*350)+1);

var player = new GameObject("Player", playerImage, 100);
var npc = new GameObject("NPC", npcImage, 100);

// Gameobjects is an array of the objects within the game
var gameobjects = [player, npc];

// Process keyboard input event
function input(event) {
    // Take Input from the Player
    console.log("Keycode:" + event.keyCode);

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37:
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None"); //No Input
    }
}

function update() {

    for (i = 0; i < gameobjects.length; i++) {
       
        if (gamerInput.action === "Down") {
            console.log("Down");
        }
        if (gamerInput.action === "Up") {
            console.log("Up");
        }
        if (gamerInput.action === "Right") { 
            console.log("Right");
        }
        if (gamerInput.action === "Left") {
            console.log("Left");
        }
       
       //if switch is active then your selection is applied
        if (active.checked == true)
        {
            if (document.getElementById("speed").value === "normal")
            {
                playerSpeed = 3;
            }
            if (document.getElementById("speed").value === "slow")
            {
                playerSpeed = 1;
            }
            if (document.getElementById("speed").value === "fast")
            {
                playerSpeed = 5;
            }
            if (document.getElementById("speed").value === "super fast")
            {
                playerSpeed = 8;
            }
        }
        switch(direction)
        {
            case 0:
                gamerInput = new GamerInput("None");
            break;
            case 1:
                player.x -= playerSpeed;
            break;
            case 2:
                player.y -= playerSpeed;
            break;
            case 3:
                player.x += playerSpeed;
            break;
            case 4:
                player.y += playerSpeed;
            break;
        }
    }

    speedSelection();

    //window boundaries
    if(player.x < 0 - playerSpeed){
        player.x = canvas.width - playerSpeed;
    }
    if(player.x > 800){
        player.x = 0;
    }
    if(player.y < 0 - playerSpeed){
        player.y = canvas.height - playerSpeed;
    }
    if(player.y > canvas.height - playerSpeed){
        player.y = 0;
    }
}

/*function collision(a, b)
{
    return  a.x > b.x - b.width &&
            a.x < b.x + b.width &&
            a.y > b.y - b.height &&
            a.y < b.y + b.height
}
*/
//functions that take user input and assign corresponding numbers
function buttonOnClickUp()
{
    gamerInput = new GamerInput("Up");
    direction = 2;
}
function buttonOnClickDown()
{
    gamerInput = new GamerInput("Down");
    direction = 4;
}
function buttonOnClickLeft()
{
    gamerInput = new GamerInput("Left");
    direction = 1;
}
function buttonOnClickRight()
{
    gamerInput = new GamerInput("Right");
    direction = 3;
}
function buttonOnClickNone()
{
    gamerInput = new GamerInput("None");
    direction = 0;
}
 

//Total frames of animation
var frames = 6;

//Current frame
var currentFrame = 0;

//Initial time set for animation
var initial = new Date().getTime();
var current; //current time in gameloop

function animate() {
    current = new Date().getTime(); //update current time
    if (current - initial >= 500) //checks if 500ms have elapsed
    {
        //update current frame using modulo so it doesn't exceed frames
        currentFrame = (currentFrame + 1) % frames;
        initial = current //reset initial
    }
}
// Draw a HealthBar on Canvas, can be used to indicate players health
function drawHealthbar() {
    var width = 100;
    var height = 20;
    var max = 100;
    var val = 10;
  
    // Draw the background
    context.fillStyle = "#000000";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, width, height);
  
    // Draw the fill
    context.fillStyle = "#00FF00";
    var fillVal = Math.min(Math.max(val / max, 0), 1);
    context.fillRect(0, 0, fillVal * width, height);
  }


// Draw GameObjects to Console
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clear previous frame

    // Iterate through all GameObjects
    // Draw each GameObject
    context.drawImage(bg, 0, 0);
    context.drawImage(playerImage, (playerImage.width / 6) * currentFrame, 0, 400, 400, player.x, player.y, 150, 150);
    context.drawImage(npcImage, (npcImage.width / 6) * currentFrame, 0, 400, 400, npcRandomx, npcRandomy, 150, 150);
    /*if (collision(player, npc)){
        npcRandomx = Math.floor((Math.random()*350)+1);
    }
    */
    animate();
}

// Update Heads Up Display with Weapon Information
function speedSelection() {
    var selection = document.getElementById("speed").value;
    var active = document.getElementById("active");
    if (active.checked == true) {
      document.getElementById("HUD").innerHTML = selection + " active ";
      console.log("Speed Active");
    } else {
      document.getElementById("HUD").innerHTML = selection + " selected ";
      console.log("Speed Selected");
    }
  }

function splitFunction() {
    var url = document.location.href;
    var result = url.split("="); // Splits string based on =
    document.getElementById("gamerTag").innerHTML = "Welcome " + result[1];
}

var options = [{
    "text": "Select a Speed",
    "value": "normal",
    "selected": true
  },
  {
    "text": "slow",
    "value": "slow"
  },
  {
    "text": "fast",
    "value": "fast"
  },
  {
    "text": "super fast",
    "value": "super fast"
  }
];

var selectBox = document.getElementById("speed");

for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}

function gameloop() {
    update(); 
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);