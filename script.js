const loader =
document.getElementById("loader");

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loader.style.display="none";

    },3000);

});

const settingsBtn =
document.getElementById("settingsBtn");

const creditsBtn =
document.getElementById("creditsBtn");

const playBtn =
document.getElementById("playBtn");

const settings =
document.getElementById("settings");

const credits =
document.getElementById("credits");

const intro =
document.getElementById("intro");

settingsBtn.onclick = ()=>{

    settings.style.display="flex";

};

creditsBtn.onclick = ()=>{

    credits.style.display="flex";

};

playBtn.onclick = ()=>{

    intro.style.display="flex";

};

document.querySelectorAll(".close")
.forEach(btn=>{

    btn.onclick=()=>{

        settings.style.display="none";
        credits.style.display="none";

    };

});

document.getElementById("startGame")
.onclick = ()=>{

    alert(
        "Próxima etapa: mapa estilo Specimen Zero."
    );

};

document.getElementById("exitBtn")
.onclick = ()=>{

    alert(
        "Feche a aba para sair."
    );

};