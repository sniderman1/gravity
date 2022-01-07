const elem = document.getElementById("object1");
const elem2 = document.getElementById("object2");

var G, m1, m2, F;
G = 50;
m1 = 50;
m2 = 50;
var bounce = 1;
var object1Location = [300,250];
var object2Location = [650,500];

//Gravity Input ==============================================================================
var gravityInput = document.getElementById("gravityInput");
var gravityOutput = document.getElementById("gravityOutput");
gravityOutput.innerHTML = gravityInput.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
gravityInput.oninput = function() {
    gravityOutput.innerHTML = this.value;
    G = this.value;
}
//Object 1 mass option ======================================================================
var mass1Input = document.getElementById("mass1Input");
var mass1Output = document.getElementById("mass1Output");
mass1Output.innerHTML = mass1Input.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
mass1Input.oninput = function() {
    mass1Output.innerHTML = this.value;
    elem.style.height = this.value + "px";
    elem.style.width = this.value + "px";
    m1 = this.value;
}
//Object 2 mass option ======================================================================
var mass2Input = document.getElementById("mass2Input");
var mass2Output = document.getElementById("mass2Output");
mass2Output.innerHTML = mass2Input.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
mass2Input.oninput = function() {
    mass2Output.innerHTML = this.value;
    elem2.style.height = this.value + "px";
    elem2.style.width = this.value + "px";
    m2 = this.value;
}
//Object 1 x location ======================================================================
var object1xInput = document.getElementById("object1xInput");
var object1xOutput = document.getElementById("object1xOutput");
object1xOutput.innerHTML = object1xInput.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
object1xInput.oninput = function() {
    object1xOutput.innerHTML = this.value;
    elem.style.left = this.value + "px";
    object1Location[0] = Number(this.value);
}
//Object 1 y location ======================================================================
var object1yInput = document.getElementById("object1yInput");
var object1yOutput = document.getElementById("object1yOutput");
object1yOutput.innerHTML = object1yInput.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
object1yInput.oninput = function() {
    object1yOutput.innerHTML = this.value;
    elem.style.top = this.value + "px";
    object1Location[1] = Number(this.value);
}
//Object 2 x location ======================================================================
var object2xInput = document.getElementById("object2xInput");
var object2xOutput = document.getElementById("object2xOutput");
object2xOutput.innerHTML = object2xInput.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
object2xInput.oninput = function() {
    object2xOutput.innerHTML = this.value;
    elem2.style.left = this.value + "px";
    object2Location[0] = Number(this.value);
}
//Object 2 y location ======================================================================
var object2yInput = document.getElementById("object2yInput");
var object2yOutput = document.getElementById("object2yOutput");
object2yOutput.innerHTML = object2yInput.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
object2yInput.oninput = function() {
    object2yOutput.innerHTML = this.value;
    elem2.style.top = this.value + "px";
    object2Location[1] = Number(this.value);
}

const startBtn = document.getElementById("startBtn");
var start = true;

function restart(){
    G = Number(gravityInput.value);
    object1Location[0] = Number(object1xInput.value);
    object1Location[1] = Number(object1yInput.value);
    object2Location[0] = Number(object2xInput.value);
    object2Location[1] = Number(object2yInput.value);
    xyDistance[0] = Math.abs(object1Location[0] - object2Location[0]);
    xyDistance[1] = Math.abs(object1Location[1] - object2Location[1]);
    r = Math.sqrt(Math.pow(xyDistance[0], 2) + Math.pow(xyDistance[1], 2));
    elem.style.left = object1xInput.value + "px";
    elem.style.top = object1yInput.value + "px";
    elem2.style.left = object2xInput.value + "px";
    elem2.style.top = object2yInput.value + "px";
    startBtn.innerHTML = "Start";
    object1Accel = [0,0];
    object2Accel = [0,0];
    object1Velocity = [0,0];
    object2Velocity = [0,0];
    console.log("restart: " + start);
}


// var object1Location = [0,0];
// var object2Location = [200,100];
// var xyDistance = [];
// var r = 200;

function myMove(){
    if(start === true){
        start = false;
        startBtn.innerHTML = "restart";
        let id = null;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame(){
            if(start === false){
                if(r <= (m1/4)+(m2/4)){
                    clearInterval(id);
                }
                else{
                    bounce = 1; 
                    cordance();                       
                }                        
            }
            else{
                clearInterval(id);
            }    
        }                
    }
    else{
        start = true;
        restart();
    }
}

var xyDistance = [];
var r;

function cordance(){
    console.log(object1Location);
    // console.log(object2Location);
    xyDistance[0] = Math.abs(object1Location[0] - object2Location[0]);
    xyDistance[1] = Math.abs(object1Location[1] - object2Location[1]);
    r = Math.sqrt(Math.pow(xyDistance[0], 2) + Math.pow(xyDistance[1], 2));
    vectorDirection();
    console.log(r);
}

var xVector = 1;
var yVector = 1;

function vectorDirection(){
    xVector = ((object1Location[0] - object2Location[0])/Math.abs(object1Location[0] - object2Location[0])*-1);
    yVector = ((object1Location[1] - object2Location[1])/Math.abs(object1Location[1] - object2Location[1])*-1);
    // console.log("x vector: " + xVector);
    // console.log("y vector: " + yVector);
    forceMag();
}

var forceMagPercentage = [];

function forceMag(){
    forceMagPercentage[0] = Math.abs((xyDistance[0]/(xyDistance[0] + xyDistance[1]))-1);
    forceMagPercentage[1] = Math.abs((xyDistance[1]/(xyDistance[0] + xyDistance[1]))-1);
    // console.log(forceMagPercentage);
    G_Force();
}

var xyForce = [0,0];

function G_Force(){
    F = (-G*((m1*m2)/(r*r)));
    // console.log("Force: " + F);
    xyForce[0] = (F * forceMagPercentage[0]);
    xyForce[1] = (F * forceMagPercentage[1]);
    // console.log(xyForce);
    acceleration();   
}

var object1Accel = [];
var object2Accel = [];

function acceleration(){
    object1Accel[0] = xVector*((xyForce[0]/m1)*-1);
    object1Accel[1] = yVector*((xyForce[1]/m1)*-1);
    object2Accel[0] = xVector*(xyForce[0]/m2);
    object2Accel[1] = yVector*(xyForce[1]/m2);
    // console.log("Accel 1:" + object1Accel);
    // console.log("Accel 2:" + object2Accel);
    velocity();
}

var object1Velocity = [0,0];
var object2Velocity = [0,0];

function velocity(){
    object1Velocity[0] = bounce*(object1Velocity[0] + object1Accel[0]);
    object1Velocity[1] = bounce*(object1Velocity[1] + object1Accel[1]);
    object2Velocity[0] = bounce*(object2Velocity[0] + object2Accel[0]);
    object2Velocity[1] = bounce*(object2Velocity[1] + object2Accel[1]);
    // console.log(object1Velocity);
    postion();
}

var object1LocationNew = [];
var object2LocationNew = [];

function postion(){
    object1LocationNew[0] = object1Location[0] + object1Velocity[0];
    object1LocationNew[1] = object1Location[1] + object1Velocity[1];
    object2LocationNew[0] = object2Location[0] + object2Velocity[0];
    object2LocationNew[1] = object2Location[1] + object2Velocity[1];
    elem.style.left = object1LocationNew[0] + "px";
    elem.style.top = object1LocationNew[1] + "px";
    elem2.style.left = object2LocationNew[0] + "px";
    elem2.style.top = object2LocationNew[1] + "px";
    // console.log(object1LocationNew);
    // console.log(object2LocationNew);
    object1Location[0] = object1LocationNew[0];
    object1Location[1] = object1LocationNew[1];
    object2Location[0] = object2LocationNew[0];
    object2Location[1] = object2LocationNew[1];
}