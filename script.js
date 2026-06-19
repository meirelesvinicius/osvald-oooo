// ==========================
// ELEMENTOS
// ==========================

const loader = document.getElementById("loader");

const playBtn = document.getElementById("playBtn");
const settingsBtn = document.getElementById("settingsBtn");
const creditsBtn = document.getElementById("creditsBtn");
const exitBtn = document.getElementById("exitBtn");

const settingsMenu = document.getElementById("settingsMenu");
const creditsMenu = document.getElementById("creditsMenu");

const introScreen = document.getElementById("introScreen");
const startMission = document.getElementById("startMission");

const ambientAudio = document.getElementById("ambientAudio");

const closeButtons = document.querySelectorAll(".closePopup");

// ==========================
// LOADER
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 1000);

    }, 2500);

});

// ==========================
// SOM AMBIENTE
// ==========================

let audioStarted = false;

function startAudio() {

    if (audioStarted) return;

    audioStarted = true;

    if (ambientAudio) {

        ambientAudio.volume = 0.4;

        ambientAudio.play().catch(() => {
            console.log("Autoplay bloqueado.");
        });

    }

}

document.addEventListener("click", startAudio);

// ==========================
// CONFIGURAÇÕES
// ==========================

if (settingsBtn) {

    settingsBtn.addEventListener("click", () => {

        settingsMenu.style.display = "flex";

    });

}

// ==========================
// CRÉDITOS
// ==========================

if (creditsBtn) {

    creditsBtn.addEventListener("click", () => {

        creditsMenu.style.display = "flex";

    });

}

// ==========================
// FECHAR POPUPS
// ==========================

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        settingsMenu.style.display = "none";
        creditsMenu.style.display = "none";

    });

});

// ==========================
// FECHAR AO CLICAR FORA
// ==========================

window.addEventListener("click", (event) => {

    if (event.target === settingsMenu) {

        settingsMenu.style.display = "none";

    }

    if (event.target === creditsMenu) {

        creditsMenu.style.display = "none";

    }

});

// ==========================
// JOGAR
// ==========================

if (playBtn) {

    playBtn.addEventListener("click", () => {

        introScreen.style.display = "flex";

    });

}

// ==========================
// INICIAR MISSÃO
// ==========================

if (startMission) {

    startMission.addEventListener("click", () => {

        introScreen.innerHTML = `

            <div class="intro-box">

                <h2>CARREGANDO MISSÃO...</h2>

                <p>
                    Preparando instalação subterrânea.
                </p>

                <p>
                    Gerando criaturas...
                </p>

                <p>
                    Carregando mapa...
                </p>

            </div>

        `;

        setTimeout(() => {

            alert("Fase 1 iniciada! (Em desenvolvimento)");

            introScreen.style.display = "none";

        }, 3000);

    });

}

// ==========================
// BOTÃO SAIR
// ==========================

if (exitBtn) {

    exitBtn.addEventListener("click", () => {

        const sair = confirm("Deseja sair do jogo?");

        if (sair) {

            window.close();

            setTimeout(() => {

                alert("Feche a aba para sair do jogo.");

            }, 100);

        }

    });

}

// ==========================
// TECLA ESC
// ==========================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        settingsMenu.style.display = "none";
        creditsMenu.style.display = "none";

        if (introScreen.style.display === "flex") {

            introScreen.style.display = "none";

        }

    }

});

// ==========================
// EFEITO DE TÍTULO
// ==========================

const gameTitle = document.querySelector(".game-title");

if (gameTitle) {

    setInterval(() => {

        gameTitle.style.opacity = "0.85";

        setTimeout(() => {

            gameTitle.style.opacity = "1";

        }, 100);

    }, 5000);

}