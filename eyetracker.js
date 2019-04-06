const HOVER_LENGTH = 400 //in milliseconds 
const FLASH_DURATION = 200; //in milliseconds 

let letters="qwertyuiop|asdfghjkl|zxcvbnm";
letters = letters.split("");

let speechBox = document.getElementById("speechBox");
let keyboard = document.getElementById("keyboard");
let hoverTimeout;
//here is the function for hover clicking
function startHover(onClickFunction) {
  return (e)=>{
    hoverTimeout= setTimeout(()=>{
      flashButton(e);onClickFunction(e);
    } ,HOVER_LENGTH);
  };  
}

function endHover(e){
  clearTimeout(hoverTimeout);
}

function flashButton(e){
  let origColor = e.target.style.background;
  console.log(e);
  e.target.style.background = "#ff66cc";
  if (e.target.firstChild.text == "Speak") {
     e.target.style.background = "#22ffcc";
  }
  setTimeout(()=>{e.target.style.background = origColor;}, FLASH_DURATION);
}

function speak(){
  let msg = new SpeechSynthesisUtterance(speechBox.value);
  window.speechSynthesis.speak(msg);
  pastSpeechBox.innerHTML+=`\n${speechBox.value}`;
  pastSpeechBox.scrollTop = pastSpeechBox.scrollHeight; 
  speechBox.value = "";
}

function clearText(){
  speechBox.value = "";
}

document.onkeydown = (e)=>{
  console.log("you typed a key");
  console.log(e.keyCode);
}

function typeText(e){
  if(e.target.innerHTML=="Space"){
    speechBox.value += " ";
  }else{
  speechBox.value +=e.target.innerHTML;
  }
}

function sayToilet(e){
  speechBox.value += "I would like to go to the bathroom.";
}

function sayBed(e){
  speechBox.value += "I would like to go to bed.";
}

function sayHungry(e){
  speechBox.value += "I would like some food I'm hungry.";
}

function sayThirsty(e){
  speechBox.value += "I would like some water I'm thirsty.";
}

function createKeyboard() {
  console.log("HELLO");
  for(let i = 0; i < letters.length;i++){
    if (letters[i]=="|"){
      keyboard.appendChild(document.createElement("br"));
    }else{
      createButton(letters[i], typeText);
      //keyboard.appendChild(letter);
    }
  }
keyboard.appendChild(document.createElement("br"));
  let space = createButton("Space", typeText); 
  let delButton = createButton("Delete", deleteText); 
  let speakButton = createButton("Speak", speak); 
  let yesButton = createButton("Yes", typeText); 
  let noButton = createButton("No", typeText);
  let clearButton = createButton("Clear", clearText); 
  keyboard.appendChild(document.createElement("br"));
  let toiletButton = createButton('<i class="fas fa-toilet"></i>', sayToilet);
  let bedButton = createButton('<i class="fas fa-bed"></i>', sayBed);
  let glassButton = createButton('<i class="fas fa-glass-whiskey"></i>', sayThirsty);
  let foodButton = createButton('<i class="fas fa-utensils"></i>', sayHungry);
}

function deleteText(e){
  speechBox.value = speechBox.value.slice(0, speechBox.value.length-1);
}

function clearScreen(target_screen){
  screen = document.getElementById(target_screen);
  screen.innerHTML = null;
}
  
function createButton(buttonText, onclickFunction){
  let button = document.createElement("button");
  button.innerHTML = buttonText;
  button.onclick = onclickFunction;
  keyboard.appendChild(button);
  button.onmouseenter = startHover(onclickFunction);
  button.onmouseleave = endHover; 
  return button; 
}

function changeState (current_state, new_state){
  if (current_state == 'clear') {
   var screen = document.getElementById("screen2");
    var n1 = screen.innerHTML;      
    showNum(n1+new_state,"screen1");
    clearScreen("screen2");    
  }
  if (new_state == '='){   
    var screen = document.getElementById("screen1");
    var equation = screen.innerHTML.slice(0,-1);  
    showNum(eval(equation), "screen2");

  }
  var app_state = state; 
  }
 


//start the app
createKeyboard();
