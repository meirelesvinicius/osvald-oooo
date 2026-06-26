/*=========================================
    OSVALDÃO NIGHTMARE
    SCRIPT.JS
    PARTE 4.1
=========================================*/

"use strict";

/*=========================
ELEMENTOS
=========================*/

const loader = document.getElementById("loader");

const menu = document.getElementById("menu");

const setupScreen = document.getElementById("setupScreen");

const settingsScreen = document.getElementById("settingsScreen");

const creditsScreen = document.getElementById("creditsScreen");

const introScreen = document.getElementById("introScreen");

/*=========================
BOTÕES
=========================*/

const btnPlay = document.getElementById("btnPlay");

const btnContinue = document.getElementById("btnContinue");

const btnSettings = document.getElementById("btnSettings");

const btnCredits = document.getElementById("btnCredits");

const btnExit = document.getElementById("btnExit");

const btnStart = document.getElementById("btnStart");

const btnBack = document.getElementById("btnBack");

const continueGame = document.getElementById("continueGame");

const closeButtons = document.querySelectorAll(".closeWindow");

/*=========================
LOADER
=========================*/

window.addEventListener("load", () => {

    const progress = document.querySelector(".loader-progress");

    let value = 0;

    const timer = setInterval(() => {

        value += 2;

        progress.style.width = value + "%";

        if(value >= 100){

            clearInterval(timer);

            setTimeout(()=>{

                loader.classList.add("fadeOut");

            },500);

        }

    },40);

});

/*=========================
SOM DOS BOTÕES
=========================*/

const clickAudio = new Audio("assets/audio/click.mp3");

function playClick(){

    clickAudio.currentTime = 0;

    clickAudio.play().catch(()=>{});

}

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",playClick);

});

/*=========================
JANELAS
=========================*/

function closeAll(){

    setupScreen.classList.remove("show");

    settingsScreen.classList.remove("show");

    creditsScreen.classList.remove("show");

}

btnPlay.onclick=()=>{

    closeAll();

    setupScreen.classList.add("show");

}

btnSettings.onclick=()=>{

    closeAll();

    settingsScreen.classList.add("show");

}

btnCredits.onclick=()=>{

    closeAll();

    creditsScreen.classList.add("show");

}

btnBack.onclick=()=>{

    setupScreen.classList.remove("show");

}

closeButtons.forEach(btn=>{

    btn.onclick=()=>{

        settingsScreen.classList.remove("show");

        creditsScreen.classList.remove("show");

    }

});

/*=========================
SALVAR CONFIGURAÇÕES
=========================*/

function saveSettings(){

    localStorage.setItem(

        "difficulty",

        document.getElementById("difficulty").value

    );

    localStorage.setItem(

        "monsterCount",

        document.getElementById("monsterCount").value

    );

    localStorage.setItem(

        "monsterAI",

        document.getElementById("monsterAI").value

    );

    localStorage.setItem(

        "flashlight",

        document.getElementById("flashlight").checked

    );

    localStorage.setItem(

        "objectives",

        document.getElementById("showObjectives").checked

    );

}

/*=========================
INICIAR
=========================*/

btnStart.onclick=()=>{

    saveSettings();

    setupScreen.classList.remove("show");

    introScreen.style.display="flex";

}

/*=========================
CONTINUAR INTRO
=========================*/

continueGame.onclick=()=>{

    document.body.classList.add("fadeOut");

    setTimeout(()=>{

        window.location.href="game.html";

    },800);

}

/*=========================
CONTINUAR JOGO
=========================*/

btnContinue.onclick=()=>{

    const save = localStorage.getItem("save");

    if(save){

        window.location.href="game.html";

    }else{

        alert("Nenhum jogo salvo.");

    }

}

/*=========================
SAIR
=========================*/

btnExit.onclick=()=>{

    alert("Obrigado por jogar OSVALDÃO NIGHTMARE!");

}
/*=========================================
    SCRIPT.JS
    PARTE 4.2
=========================================*/

/*=========================
MÚSICA DO MENU
=========================*/

const menuMusic = new Audio("assets/audio/menu.mp3");

menuMusic.loop = true;
menuMusic.volume = 0.35;

window.addEventListener("click", () => {

    if(menuMusic.paused){

        menuMusic.play().catch(()=>{});

    }

},{once:true});

/*=========================
EFEITO HOVER
=========================*/

document.querySelectorAll(".menu-buttons button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="translateX(15px) scale(1.02)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="";

    });

});

/*=========================
PARTÍCULAS
=========================*/

const particles=document.createElement("div");

particles.id="particles";

document.body.appendChild(particles);

function createParticle(){

    const p=document.createElement("div");

    p.className="particle";

    p.style.left=Math.random()*100+"vw";

    p.style.animationDuration=(6+Math.random()*10)+"s";

    p.style.opacity=Math.random()*0.3;

    p.style.width=(2+Math.random()*4)+"px";

    p.style.height=p.style.width;

    particles.appendChild(p);

    setTimeout(()=>{

        p.remove();

    },17000);

}

setInterval(createParticle,250);

/*=========================
EFEITO DE TELA
=========================*/

function flicker(){

    document.body.classList.add("flicker");

    setTimeout(()=>{

        document.body.classList.remove("flicker");

    },160);

}

setInterval(()=>{

    if(Math.random()<0.18){

        flicker();

    }

},5000);

/*=========================
SALVAR CONFIGURAÇÕES
=========================*/

const settingsIds=[

"masterVolume",

"mouseSensitivity",

"brightness",

"fov",

"showFPS",

"showBlood"

];

settingsIds.forEach(id=>{

    const el=document.getElementById(id);

    if(!el) return;

    const saved=localStorage.getItem(id);

    if(saved!==null){

        if(el.type==="checkbox"){

            el.checked=saved==="true";

        }else{

            el.value=saved;

        }

    }

    el.addEventListener("input",()=>{

        if(el.type==="checkbox"){

            localStorage.setItem(id,el.checked);

        }else{

            localStorage.setItem(id,el.value);

        }

    });

});

/*=========================
SALVAR PARTIDA
=========================*/

function saveGame(){

    const save={

        room:document.getElementById("roomName").value,

        difficulty:document.getElementById("difficulty").value,

        monsters:document.getElementById("monsterCount").value,

        ai:document.getElementById("monsterAI").value,

        flashlight:document.getElementById("flashlight").checked,

        hardcore:document.getElementById("hardcoreMode").checked,

        created:new Date().toLocaleString()

    };

    localStorage.setItem("save",JSON.stringify(save));

}

/*=========================
BOTÃO START
=========================*/

btnStart.addEventListener("click",()=>{

    saveGame();

});

/*=========================
CONTINUE
=========================*/

const saveExists=localStorage.getItem("save");

if(!saveExists){

    btnContinue.style.opacity=".5";

}

/*=========================
EFEITO DA LOGO
=========================*/

const logo=document.querySelector(".logo");

let glow=0;

setInterval(()=>{

    glow+=0.04;

    logo.style.transform=

    "translateY("+

    Math.sin(glow)*4+

    "px)";

},20);

/*=========================
RELÓGIO
=========================*/

function updateClock(){

    const now=new Date();

    document.title=

    "OSVALDÃO NIGHTMARE - "+

    now.getHours().toString().padStart(2,"0")+

    ":"+

    now.getMinutes().toString().padStart(2,"0");

}

setInterval(updateClock,1000);

/*=========================
ATALHOS
=========================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeAll();

    }

});

/*=========================
FIM PARTE 4.2
=========================*/
/*=========================================
    SCRIPT.JS
    PARTE 4.3
=========================================*/

"use strict";

/*=========================
CARREGAR CONFIGURAÇÕES
=========================*/

function loadSettings(){

    const ids=[

        "masterVolume",
        "mouseSensitivity",
        "brightness",
        "fov",
        "difficulty",
        "monsterCount",
        "monsterAI"

    ];

    ids.forEach(id=>{

        const element=document.getElementById(id);

        if(!element) return;

        const value=localStorage.getItem(id);

        if(value!==null){

            element.value=value;

        }

    });

    const checks=[

        "flashlight",
        "showObjectives",
        "hardcoreMode",
        "showFPS",
        "showBlood"

    ];

    checks.forEach(id=>{

        const element=document.getElementById(id);

        if(!element) return;

        const value=localStorage.getItem(id);

        if(value!==null){

            element.checked=(value==="true");

        }

    });

}

loadSettings();

/*=========================
VOLUME
=========================*/

function updateVolume(){

    const slider=document.getElementById("masterVolume");

    if(!slider) return;

    menuMusic.volume=slider.value/100;

}

const volumeSlider=document.getElementById("masterVolume");

if(volumeSlider){

    volumeSlider.addEventListener("input",updateVolume);

    updateVolume();

}

/*=========================
BRILHO
=========================*/

const overlay=document.getElementById("overlay");

function updateBrightness(){

    const slider=document.getElementById("brightness");

    if(!slider || !overlay) return;

    const value=slider.value;

    overlay.style.background=

    `rgba(0,0,0,${1-(value/100)*0.7})`;

}

const bright=document.getElementById("brightness");

if(bright){

    bright.addEventListener("input",updateBrightness);

    updateBrightness();

}

/*=========================
EFEITO DA LOGO
=========================*/

let pulse=0;

setInterval(()=>{

    pulse+=0.05;

    const glow=15+Math.sin(pulse)*10;

    document.querySelector(".logo h1").style.textShadow=

    `0 0 ${glow}px red,
     0 0 ${glow*2}px red`;

},40);

/*=========================
SALVAR AUTOMÁTICO
=========================*/

document.querySelectorAll("input,select").forEach(element=>{

    element.addEventListener("change",()=>{

        if(element.type==="checkbox"){

            localStorage.setItem(

                element.id,

                element.checked

            );

        }

        else{

            localStorage.setItem(

                element.id,

                element.value

            );

        }

    });

});

/*=========================
TRANSIÇÃO PARA O JOGO
=========================*/

function startTransition(){

    document.body.classList.add("fadeOut");

    menuMusic.volume=0;

    setTimeout(()=>{

        window.location.href="game.html";

    },1200);

}

continueGame.addEventListener(

"click",

startTransition

);

/*=========================
ANIMAÇÃO DOS CARDS
=========================*/

const cards=document.querySelectorAll(".card");

cards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateX(50px)";

    setTimeout(()=>{

        card.style.transition=".8s";

        card.style.opacity="1";

        card.style.transform="translateX(0)";

    },600+(index*200));

});

/*=========================
RELÓGIO
=========================*/

function updateTitle(){

    const date=new Date();

    document.title=

    "OSVALDÃO NIGHTMARE | "+

    date.toLocaleTimeString();

}

setInterval(updateTitle,1000);

/*=========================
ESC
=========================*/

document.addEventListener(

"keydown",

event=>{

    if(event.key==="Escape"){

        closeAll();

    }

});

/*=========================
BOTÃO SAIR
=========================*/

btnExit.addEventListener(

"click",

()=>{

    if(confirm("Deseja realmente sair do jogo?")){

        window.close();

    }

});

/*=========================
DEBUG
=========================*/

console.log(

"%cOSVALDÃO NIGHTMARE",

"color:red;font-size:30px;font-weight:bold;"

);

console.log(

"Menu carregado com sucesso."

);

/*=========================
FIM DO SCRIPT.JS
=========================*/