window.onload = function () {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    // Hide preloader and show content after delay
    setTimeout(() => {

        preloader.style.display = 'none';
        content.style.display = 'block';
    }, 1000); // Adjust time as needed
};




document.getElementById("play-btn").addEventListener("click", () => {
   
    document.getElementById("content").style.display = "none";
    document.getElementById("Container").style.display = "block";
});




function playSound(color) {
    console.log("Playing sound for:", color); // Debug log
    let audio = new Audio(`sounds/${color}.mp3`);

    if (color === "wrong") {
        audio.playbackRate = 4.0; // 2x speed
    }
    audio.play().catch((err) => {
        console.error("audio play failed", err);

    });
}












let gameSeq =[];
let userSeq =[];

let btns = ["yellow","red","green","purple"];


let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
  
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

//flash
function gameFlash(btn){  
    btn.classList.add("flash"); 
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);

}

function userFlash(btn){  
    btn.classList.add("userFlash"); 
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);

}




function levelUp() {
    userSeq = [];
    level ++;
    h2.innerText = `level ${level}`;

    let randInd = Math.floor(Math.random() * 3);
    let randColor = btns[randInd];
    let randBtn = document.querySelector(`.${randColor}`);
   // console.log(randInd);
    //console.log(randColor);
    //console.log(randBtn);
    //random btn choose

    gameSeq.push(randColor);
    console.log(gameSeq)
    gameFlash(randBtn);
}


function checkAns(idx){
   
       if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
        

    } else {
        h2.innerHTML = `Game Over, Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "black";

        },150);
        reset();

    }



}



function btnPress (){
  
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;



}