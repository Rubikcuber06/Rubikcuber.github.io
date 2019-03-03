// let ="qwertyuiop|asdfghjkl|zxcvbnm";
// letters = letters.split("");
const SPACE = "Space";

let icons = [
  {name:"toilet",value: "I want to go to the bathroom.", html:'<i class="fas fa-toilet"></i>'},
  {name:"bed",value: "I am tired.", html:'<i class="fas fa-bed"></i>'},
  {name:"hungry",value:"I am hungry.", html:'<i class="fas fa-utensils"></i>'},
  {name:"thirsty",value:"I am thirsty.", html:'<i class="fas fa-glass-whiskey"></i>'},
  {name:"question",value:"I am confused.", html:'<i class="fas fa-question"></i>'},
  {name:"smile",value:"Ha ha ha. That is so funny. L O L.", html:'<i class="fas fa-smile"></i>'},
  {name:"sad",value:"I'm sad.", html: '<i class="fas fa-frown"></i>'},
  {name:"cold",value:"I'm cold.", html: '<i class="fas fa-mitten"></i>'},
  {name:"hot",value:"I'm hot.", html: '<i class="fab fa-hotjar"></i>'}
];

let speechBox = document.getElementById("speechBox");
let keyboard = document.getElementById("keyboard");


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
  let clickedItem = e.target;
  //while the label we are looking for is null, check its parent for the label
  while(clickedItem.getAttribute("data-button-value")==null &&clickedItem.parentElement!=null){
    clickedItem = clickedItem.parentElement;
  }
  let label = clickedItem.getAttribute("data-button-value");
  if(e.target.innerHTML==SPACE){
    speechBox.value += " ";
  }else{
    speechBox.value +=label;
  }
}
  

function createKeyboard() {
  for(let i = 0; i < icons.length;i++){
      createButton(icons[i].html, typeText, icons[i].value);
  }
  //add the special case buttons
  keyboard.appendChild(document.createElement("br"));
  let speakButton = createButton("Speak", speak); 
  let yesButton = createButton("Yes", typeText, "Yes"); 
  let noButton = createButton("No", typeText, "No");
  let clearButton = createButton("Clear", clearText); 
}


function deleteText(e){
  speechBox.value = speechBox.value.slice(0, speechBox.value.length-1);
}

function clearScreen(target_screen){
  screen = document.getElementById(target_screen);
  screen.innerHTML = null;
}
  
function createButton(buttonText, onclickFunction, value = null){
  let button = document.createElement("button");
  button.innerHTML = buttonText;
  if(value!=null){
    button.setAttribute("data-button-value", value);
  }
  button.onclick = onclickFunction;
  keyboard.appendChild(button);
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
 
createKeyboard();
