/*==================================================
        OSVALDÃO NIGHTMARE
        GAME.JS
        PARTE 6.1.1
==================================================*/

"use strict";

/*=========================
THREE.JS
=========================*/

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

scene.fog = new THREE.Fog(0x000000,20,120);

/*=========================
CÂMERA
=========================*/

const camera = new THREE.PerspectiveCamera(

75,

window.innerWidth/window.innerHeight,

0.1,

1000

);

camera.position.set(

0,

1.8,

0

);

/*=========================
RENDERER
=========================*/

const renderer = new THREE.WebGLRenderer({

antialias:true

});

renderer.setSize(

window.innerWidth,

window.innerHeight

);

renderer.setPixelRatio(

window.devicePixelRatio

);

renderer.shadowMap.enabled=true;

renderer.shadowMap.type=THREE.PCFSoftShadowMap;

document
.getElementById("gameContainer")
.appendChild(renderer.domElement);

/*=========================
POINTER LOCK
=========================*/

const controls = new THREE.PointerLockControls(

camera,

document.body

);

document.body.addEventListener("click",()=>{

    controls.lock();

});

/*=========================
LUZ AMBIENTE
=========================*/

const ambient = new THREE.AmbientLight(

0xffffff,

0.18

);

scene.add(ambient);

/*=========================
LANTERNA
=========================*/

const flashlight = new THREE.SpotLight(

0xffffff,

6,

40,

Math.PI/8,

0.5,

1

);

flashlight.castShadow=true;

flashlight.position.set(

0,

0,

0

);

camera.add(flashlight);

camera.add(flashlight.target);

scene.add(camera);

/*=========================
RELÓGIO
=========================*/

const clock = new THREE.Clock();

/*=========================
HUD
=========================*/

let playerLife=100;

let playerStamina=100;

let battery=100;

const lifeBar=document.getElementById("lifeBar");

const staminaBar=document.getElementById("staminaBar");

const batteryBar=document.getElementById("batteryBar");

function updateHUD(){

    lifeBar.style.width=

    playerLife+"%";

    staminaBar.style.width=

    playerStamina+"%";

    batteryBar.style.width=

    battery+"%";

}

/*=========================
CARREGAMENTO
=========================*/

const loadingFill=document.getElementById("loadingFill");

const loading=document.getElementById("gameLoading");

let loadingValue=0;

const loadingInterval=setInterval(()=>{

    loadingValue+=2;

    loadingFill.style.width=

    loadingValue+"%";

    if(loadingValue>=100){

        clearInterval(

        loadingInterval

        );

        loading.style.display="none";

    }

},30);

/*=========================
RESIZE
=========================*/

window.addEventListener(

"resize",

()=>{

camera.aspect=

window.innerWidth/

window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});

/*=========================
OBJETOS
=========================*/

const world=[];

const monsters=[];

const items=[];

const doors=[];

const keys=[];

/*=========================
FIM PARTE 6.1.1
=========================*/
/*==================================================
        OSVALDÃO NIGHTMARE
        GAME.JS
        PARTE 6.1.2
==================================================*/

/*=========================
MATERIAIS
=========================*/

const floorMaterial = new THREE.MeshStandardMaterial({

    color:0x2c2c2c,
    roughness:0.95,
    metalness:0.05

});

const wallMaterial = new THREE.MeshStandardMaterial({

    color:0x8f8f8f,
    roughness:1

});

const ceilingMaterial = new THREE.MeshStandardMaterial({

    color:0x1b1b1b

});

const doorMaterial = new THREE.MeshStandardMaterial({

    color:0x4b2f1d

});

/*=========================
CHÃO
=========================*/

const floor = new THREE.Mesh(

    new THREE.PlaneGeometry(120,120),

    floorMaterial

);

floor.rotation.x = -Math.PI/2;

floor.receiveShadow = true;

scene.add(floor);

/*=========================
TETO
=========================*/

const ceiling = new THREE.Mesh(

    new THREE.PlaneGeometry(120,120),

    ceilingMaterial

);

ceiling.rotation.x = Math.PI/2;

ceiling.position.y = 4;

scene.add(ceiling);

/*=========================
LUZES DO HOSPITAL
=========================*/

function createEmergencyLight(x,z){

    const light = new THREE.PointLight(

        0xff5555,

        1.4,

        12

    );

    light.position.set(x,3.4,z);

    scene.add(light);

    return light;

}

const emergencyLights=[];

emergencyLights.push(createEmergencyLight(0,0));
emergencyLights.push(createEmergencyLight(20,10));
emergencyLights.push(createEmergencyLight(-20,-15));
emergencyLights.push(createEmergencyLight(15,-25));

/*=========================
PAREDES
=========================*/

function createWall(x,y,z,w,h,d){

    const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(w,h,d),

        wallMaterial

    );

    mesh.position.set(x,y,z);

    mesh.castShadow=true;

    mesh.receiveShadow=true;

    scene.add(mesh);

    world.push(mesh);

    return mesh;

}

/*=========================
SALA INICIAL
=========================*/

createWall(0,2,-20,40,4,1);

createWall(0,2,20,40,4,1);

createWall(-20,2,0,1,4,40);

createWall(20,2,0,1,4,40);

/*=========================
CORREDOR
=========================*/

createWall(0,2,-60,12,4,1);

createWall(-6,2,-40,1,4,40);

createWall(6,2,-40,1,4,40);

/*=========================
PORTA
=========================*/

const mainDoor = new THREE.Mesh(

    new THREE.BoxGeometry(

        2,

        3,

        0.4

    ),

    doorMaterial

);

mainDoor.position.set(

0,

1.5,

-20

);

mainDoor.castShadow=true;

scene.add(mainDoor);

doors.push(mainDoor);

/*=========================
PISCAR LUZES
=========================*/

setInterval(()=>{

    emergencyLights.forEach(light=>{

        light.intensity=

        0.8+

        Math.random()*0.9;

    });

},120);

/*=========================
TEMPO
=========================*/

let delta=0;

/*=========================
ANIMATE
=========================*/

function animate(){

    requestAnimationFrame(animate);

    delta=clock.getDelta();

    updateHUD();

    renderer.render(

        scene,

        camera

    );

}

animate();

/*=========================
FIM PARTE 6.1.2
=========================*/