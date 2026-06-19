import * as THREE from "three";

let scene;
let camera;
let renderer;

const keys = {};

let player = {
    speed: 0.12,
    runSpeed: 0.22,
    stamina: 100,
    health: 100
};

init();
animate();

function init() {

    scene = new THREE.Scene();

    scene.fog = new THREE.Fog(
        0x000000,
        10,
        70
    );

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(
        0,
        1.8,
        0
    );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.shadowMap.enabled = true;

    document.body.appendChild(
        renderer.domElement
    );

    createLights();
    createFloor();
    createCorridor();

    setupControls();

    window.addEventListener(
        "resize",
        onResize
    );

}

/* ===================
   LUZES
=================== */

function createLights() {

    const ambient =
    new THREE.AmbientLight(
        0xffffff,
        0.2
    );

    scene.add(ambient);

    const flashlight =
    new THREE.SpotLight(
        0xffffff,
        5
    );

    flashlight.position.set(
        0,
        2,
        0
    );

    flashlight.angle = 0.5;

    flashlight.distance = 25;

    flashlight.castShadow = true;

    camera.add(flashlight);

    scene.add(camera);

}

/* ===================
   CHÃO
=================== */

function createFloor() {

    const floor =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            200,
            200
        ),

        new THREE.MeshStandardMaterial({

            color: 0x222222

        })

    );

    floor.rotation.x =
    -Math.PI / 2;

    floor.receiveShadow = true;

    scene.add(floor);

}

/* ===================
   CORREDOR
=================== */

function createCorridor() {

    const material =
    new THREE.MeshStandardMaterial({

        color: 0x444444

    });

    for(let z = -5; z > -150; z -= 5){

        const leftWall =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1,
                5,
                5
            ),

            material

        );

        leftWall.position.set(
            -5,
            2.5,
            z
        );

        scene.add(leftWall);

        const rightWall =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1,
                5,
                5
            ),

            material

        );

        rightWall.position.set(
            5,
            2.5,
            z
        );

        scene.add(rightWall);

    }

}

/* ===================
   CONTROLES
=================== */

function setupControls() {

    document.body.addEventListener(
        "click",
        () => {

            document.body.requestPointerLock();

        }
    );

    document.addEventListener(
        "keydown",
        e => {

            keys[e.key.toLowerCase()] = true;

        }
    );

    document.addEventListener(
        "keyup",
        e => {

            keys[e.key.toLowerCase()] = false;

        }
    );

    document.addEventListener(
        "mousemove",
        mouseLook
    );

}

let yaw = 0;
let pitch = 0;

function mouseLook(event) {

    if(
        document.pointerLockElement !==
        document.body
    ) return;

    yaw -= event.movementX * 0.002;
    pitch -= event.movementY * 0.002;

    pitch = Math.max(
        -1.4,
        Math.min(
            1.4,
            pitch
        )
    );

    camera.rotation.order = "YXZ";

    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

}

/* ===================
   MOVIMENTO
=================== */

function movePlayer() {

    let speed =
    keys["shift"]
    ? player.runSpeed
    : player.speed;

    const direction =
    new THREE.Vector3();

    camera.getWorldDirection(
        direction
    );

    direction.y = 0;

    direction.normalize();

    const right =
    new THREE.Vector3();

    right.crossVectors(
        direction,
        new THREE.Vector3(
            0,
            1,
            0
        )
    );

    if(keys["w"]) {

        camera.position.add(
            direction.clone()
            .multiplyScalar(speed)
        );

    }

    if(keys["s"]) {

        camera.position.add(
            direction.clone()
            .multiplyScalar(-speed)
        );

    }

    if(keys["a"]) {

        camera.position.add(
            right.clone()
            .multiplyScalar(speed)
        );

    }

    if(keys["d"]) {

        camera.position.add(
            right.clone()
            .multiplyScalar(-speed)
        );

    }

}

/* ===================
   MONSTRO
=================== */

const monster =
new THREE.Mesh(

    new THREE.BoxGeometry(
        1.5,
        3,
        1.5
    ),

    new THREE.MeshStandardMaterial({

        color: 0xaa0000

    })

);

monster.position.set(
    0,
    1.5,
    -80
);

scene?.add(monster);

function updateMonster() {

    if(!monster.parent){

        scene.add(monster);

    }

    monster.lookAt(
        camera.position
    );

    const dir =
    new THREE.Vector3();

    dir.subVectors(
        camera.position,
        monster.position
    );

    const dist =
    dir.length();

    dir.normalize();

    if(dist > 2){

        monster.position.add(
            dir.multiplyScalar(
                0.02
            )
        );

    }else{

        player.health -= 1;

        if(player.health <= 0){

            alert(
                "VOCÊ MORREU"
            );

            location.reload();

        }

    }

}

/* ===================
   HUD
=================== */

function updateHUD() {

    const hp =
    document.getElementById(
        "healthValue"
    );

    const stamina =
    document.getElementById(
        "staminaValue"
    );

    if(hp){

        hp.textContent =
        Math.floor(
            player.health
        );

    }

    if(stamina){

        stamina.textContent =
        Math.floor(
            player.stamina
        );

    }

}

/* ===================
   RESIZE
=================== */

function onResize() {

    camera.aspect =
    window.innerWidth /
    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

}

/* ===================
   LOOP
=================== */

function animate() {

    requestAnimationFrame(
        animate
    );

    movePlayer();

    updateMonster();

    updateHUD();

    renderer.render(
        scene,
        camera
    );

}