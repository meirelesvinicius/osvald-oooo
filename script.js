// ==========================
// ELEMENTOS
// ==========================

const loader = document.getElementById("loader");

const continueBtn = document.getElementById("continueBtn");
const newGameBtn = document.getElementById("newGameBtn");
const difficultyBtn = document.getElementById("difficultyBtn");
const settingsBtn = document.getElementById("settingsBtn");
const creditsBtn = document.getElementById("creditsBtn");
const exitBtn = document.getElementById("exitBtn");

const difficultyMenu = document.getElementById("difficultyMenu");
const settingsMenu = document.getElementById("settingsMenu");
const creditsMenu = document.getElementById("creditsMenu");

const introScreen = document.getElementById("introScreen");
const startMission = document.getElementById("startMission");

const closeButtons = document.querySelectorAll(".closePopup");

const menuHover = document.getElementById("menuHover");
const jumpAudio = document.getElementById("jumpAudio");
const ambientAudio = document.getElementById("ambientAudio");

const monsterFlash = document.getElementById("monsterFlash");

// ==========================
// LOADER
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 1000);

    }, 3000);

});

// ==========================
// AUDIO
// ==========================

let audioStarted = false;

function startAudio() {

    if(audioStarted) return;

    audioStarted = true;

    if(ambientAudio){

        ambientAudio.volume = 0.35;

        ambientAudio.play().catch(() => {});

    }

}

document.addEventListener("click", startAudio);

// ==========================
// HOVER SOUND
// ==========================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("mouseenter", () => {

        if(menuHover){

            menuHover.currentTime = 0;

            menuHover.volume = 0.5;

            menuHover.play().catch(() => {});

        }

    });

});

// ==========================
// POPUPS
// ==========================

settingsBtn.addEventListener("click", () => {

    settingsMenu.style.display = "flex";

});

creditsBtn.addEventListener("click", () => {

    creditsMenu.style.display = "flex";

});

difficultyBtn.addEventListener("click", () => {

    difficultyMenu.style.display = "flex";

});

closeButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        settingsMenu.style.display = "none";
        creditsMenu.style.display = "none";
        difficultyMenu.style.display = "none";

    });

});

// ==========================
// FECHAR FORA
// ==========================

window.addEventListener("click", (e) => {

    if(e.target === settingsMenu)
        settingsMenu.style.display = "none";

    if(e.target === creditsMenu)
        creditsMenu.style.display = "none";

    if(e.target === difficultyMenu)
        difficultyMenu.style.display = "none";

});

// ==========================
// DIFICULDADE
// ==========================

document.querySelectorAll(".difficulty-option")
.forEach(button => {

    button.addEventListener("click", () => {

        localStorage.setItem(
            "difficulty",
            button.textContent
        );

        alert(
            "Dificuldade definida para: " +
            button.textContent
        );

        difficultyMenu.style.display = "none";

    });

});

// ==========================
// NOVO JOGO
// ==========================

newGameBtn.addEventListener("click", () => {

    introScreen.style.display = "flex";

});

// ==========================
// CONTINUAR
// ==========================

continueBtn.addEventListener("click", () => {

    const save =
    localStorage.getItem("savegame");

    if(save){

        alert(
            "Carregando progresso salvo..."
        );

    }else{

        alert(
            "Nenhum progresso encontrado."
        );

    }

});

// ==========================
// INICIAR MISSÃO
// ==========================

startMission.addEventListener("click", () => {

    localStorage.setItem(
        "savegame",
        "started"
    );

    document.body.classList.add(
        "game-starting"
    );

    setTimeout(() => {

        alert(
            "A fase FPS será carregada na Parte 5."
        );

        introScreen.style.display = "none";

    }, 2000);

});

// ==========================
// SALVAR ESTATÍSTICAS
// ==========================

if(!localStorage.getItem("playerLevel")){

    localStorage.setItem(
        "playerLevel",
        "1"
    );

    localStorage.setItem(
        "playerEscapes",
        "0"
    );

    localStorage.setItem(
        "playerDeaths",
        "0"
    );

}

document.getElementById("playerLevel")
.textContent =
localStorage.getItem("playerLevel");

document.getElementById("playerEscapes")
.textContent =
localStorage.getItem("playerEscapes");

document.getElementById("playerDeaths")
.textContent =
localStorage.getItem("playerDeaths");

// ==========================
// PROGRESSO
// ==========================

let progress =
localStorage.getItem("progress");

if(!progress){

    progress = 0;

}

document.querySelector(".progress-fill")
.style.width =
progress + "%";

document.getElementById("progressText")
.textContent =
progress + "%";

// ==========================
// JUMPSCARE
// ==========================

function randomJumpscare(){

    if(!monsterFlash) return;

    monsterFlash.style.opacity = "1";

    monsterFlash.classList.add(
        "jumpscare"
    );

    if(jumpAudio){

        jumpAudio.currentTime = 0;

        jumpAudio.volume = 0.7;

        jumpAudio.play().catch(() => {});

    }

    setTimeout(() => {

        monsterFlash.style.opacity = "0";

        monsterFlash.classList.remove(
            "jumpscare"
        );

    }, 250);

}

setInterval(() => {

    const chance =
    Math.floor(Math.random() * 100);

    if(chance > 94){

        randomJumpscare();

    }

}, 20000);

// ==========================
// ESC
// ==========================

document.addEventListener(
"keydown",
(event)=>{

    if(event.key === "Escape"){

        settingsMenu.style.display = "none";
        creditsMenu.style.display = "none";
        difficultyMenu.style.display = "none";

    }

});

// ==========================
// SAIR
// ==========================

exitBtn.addEventListener("click", () => {

    const sair =
    confirm(
        "Deseja sair do jogo?"
    );

    if(sair){

        window.close();

        setTimeout(() => {

            alert(
                "Feche a aba para sair."
            );

        },100);

    }

});

// ==========================
// LOGO PISCANDO
// ==========================

setInterval(() => {

    const logoMain =
    document.querySelector(".logo-main");

    const logoSub =
    document.querySelector(".logo-sub");

    if(!logoMain || !logoSub)
        return;

    logoMain.style.opacity = ".5";
    logoSub.style.opacity = ".5";

    setTimeout(() => {

        logoMain.style.opacity = "1";
        logoSub.style.opacity = "1";

    },100);

},8000);

// ==========================
// DEBUG
// ==========================

console.log(
    "OSVALDÃO NIGHTMARE INICIADO"
);