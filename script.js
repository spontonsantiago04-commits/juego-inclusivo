let intervalo;
let timerGlobal;
let audioRadar = null;
// =====================================================
// ===================== VOZ ===========================
// =====================================================

function hablar(texto){

    speechSynthesis.cancel();

    let msg =
    new SpeechSynthesisUtterance(texto);

    // IDIOMA

    msg.lang = "es-ES";

    // VELOCIDAD

    msg.rate = 0.9;

    // TONO

    msg.pitch = 1;

    // VOLUMEN

    msg.volume = 1;

    // OBTENER VOCES

    let voces =
    speechSynthesis.getVoices();

    // BUSCAR VOZ MAS NATURAL

    let voz =
    voces.find(v =>

        v.name.includes("Elvira")
        ||

        v.name.includes("Google español")
        ||

        v.name.includes("Microsoft Helena")
    );

    // USAR VOZ

    if(voz){

        msg.voice = voz;
    }

    speechSynthesis.speak(msg);
}
// =====================================================
// ==================== LIMPIAR ========================
// =====================================================

function limpiar(){

    const esc =
    document.getElementById("escenario");

    /* ========================================= */
    /* DETENER SONIDO DEL RADAR                 */
    /* ========================================= */

    if(audioRadar){

        audioRadar.pause();

        audioRadar.currentTime = 0;

        audioRadar.volume = 0;

        audioRadar.src = "";

        audioRadar = null;
    }


    /* ========================================= */
    /* LIMPIAR ESCENARIO                        */
    /* ========================================= */

    esc.style.backgroundImage = "";

    esc.style.background = "black";

    esc.innerHTML = "";


    /* ========================================= */
    /* LIMPIAR CONTROLES                        */
    /* ========================================= */

    window.onkeydown = null;
    window.onkeyup = null;


    /* ========================================= */
    /* DETENER TIMERS                           */
    /* ========================================= */

    clearInterval(timerGlobal);

    timerGlobal = null;


    if(intervalo){

        cancelAnimationFrame(intervalo);

        intervalo = null;
    }


    /* ========================================= */
    /* DETENER VOZ                              */
    /* ========================================= */

    speechSynthesis.cancel();
}
// =====================================================
// =================== GAME OVER =======================
// =====================================================

function gameOver(){

    limpiar();

    // OCULTAR JUEGO

    document.getElementById(
        "pantalla-juego"
    ).style.display = "none";

    // MOSTRAR GAME OVER

    document.getElementById(
        "gameover"
    ).style.display = "block";

    // OCULTAR MENU

    document.getElementById(
        "menu"
    ).style.display = "none";

    // OCULTAR SALIR

    document.getElementById(
        "btnSalir"
    ).style.display = "none";

    hablar("perdiste");
}
// =====================================================
// ================== VOLVER MENU ======================
// =====================================================

function volverMenu(){

    // LIMPIAR TODO

    limpiar();

    // OCULTAR GAME OVER

    document.getElementById(
        "gameover"
    ).style.display = "none";

    // OCULTAR PANTALLA JUEGO

    document.getElementById(
        "pantalla-juego"
    ).style.display = "none";

    // MOSTRAR MENU

    document.getElementById(
        "menu"
    ).style.display = "block";

    // OCULTAR BOTON SALIR

    document.getElementById(
        "btnSalir"
    ).style.display = "none";

    // LIMPIAR ESCENARIO

    document.getElementById(
        "escenario"
    ).innerHTML = "";

    // CANCELAR VOZ

    speechSynthesis.cancel();

    // DETENER TIMERS

    clearInterval(timerGlobal);

    if(intervalo){

        cancelAnimationFrame(intervalo);
    }
}

// =====================================================
// ================= CARGAR JUEGO ======================
// =====================================================
function crearControlesDino() {

    // Eliminar controles anteriores
    document.querySelectorAll(".controlesDino").forEach(c => c.remove());

    const esc = document.getElementById("escenario");

    if (!esc) return;

    // Detectar pantalla táctil
    const esTactil =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

    // En PC NO crear botones
    if (!esTactil) return;

    // Crear controles
    const controles = document.createElement("div");

    controles.className = "controlesDino";

    controles.innerHTML = `
        <button id="btnSaltar" type="button">
            🦘
            <span>SALTAR</span>
        </button>

        <button id="btnAgachar" type="button">
            🦆
            <span>AGACHARSE</span>
        </button>
    `;

    esc.appendChild(controles);

    // =================================================
    // ZONA DE BOTONES
    // =================================================

    controles.style.position = "absolute";
    controles.style.left = "0";
    controles.style.bottom = "0";

    controles.style.width = "100%";
    controles.style.height = "100px";

    controles.style.display = "flex";
    controles.style.alignItems = "center";
    controles.style.justifyContent = "space-between";

    controles.style.padding = "10px 25px";
    controles.style.boxSizing = "border-box";

    controles.style.zIndex = "9999";

    controles.style.pointerEvents = "none";

    // =================================================
    // BOTONES
    // =================================================

    const botones = controles.querySelectorAll("button");

    botones.forEach(boton => {

        boton.style.width = "140px";
        boton.style.height = "65px";

        boton.style.border = "3px solid white";
        boton.style.borderRadius = "20px";

        boton.style.background =
            "linear-gradient(180deg,#53c8ff,#198fd1)";

        boton.style.color = "white";

        boton.style.fontSize = "16px";
        boton.style.fontWeight = "900";

        boton.style.display = "flex";
        boton.style.flexDirection = "column";
        boton.style.alignItems = "center";
        boton.style.justifyContent = "center";

        boton.style.boxShadow =
            "0 5px 0 #116da3, 0 7px 12px rgba(0,0,0,.3)";

        boton.style.pointerEvents = "auto";

        boton.style.touchAction = "none";

        boton.style.userSelect = "none";

    });

    // =================================================
    // SALTAR
    // =================================================

    const saltar = document.getElementById("btnSaltar");

    saltar.addEventListener("pointerdown", e => {

        e.preventDefault();

        window.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: " ",
                code: "Space",
                bubbles: true
            })
        );

    });

    // =================================================
    // AGACHARSE
    // =================================================

    const agachar = document.getElementById("btnAgachar");

    function empezarAgachar(e) {

        e.preventDefault();

        window.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "ArrowDown",
                code: "ArrowDown",
                bubbles: true
            })
        );

    }

    function terminarAgachar(e) {

        e.preventDefault();

        window.dispatchEvent(
            new KeyboardEvent("keyup", {
                key: "ArrowDown",
                code: "ArrowDown",
                bubbles: true
            })
        );

    }

    agachar.addEventListener("pointerdown", empezarAgachar);
    agachar.addEventListener("pointerup", terminarAgachar);
    agachar.addEventListener("pointercancel", terminarAgachar);
    agachar.addEventListener("pointerleave", terminarAgachar);
}
function cargarJuego(tipo){

    limpiar();

    const esc =
    document.getElementById("escenario");

    const titulo =
    document.getElementById("titulo-juego");

    document.getElementById(
        "menu"
    ).style.display = "none";

    document.getElementById(
        "pantalla-juego"
    ).style.display = "block";

    document.getElementById(
        "btnSalir"
    ).style.display = "block";
// =================================================
// ================= JUEGO VISUAL ==================
// =================================================

if(tipo === "visual"){
titulo.className = "tituloJuego";
titulo.innerText = "Radar Estelar";
   
    esc.style.backgroundImage =
    "url('https://github.com/spontonsantiago04-commits/juego-inclusivo/blob/main/ChatGPT%20Image%2024%20jun%202026,%2003_10_50%20p.m..png?raw=true')";
    esc.style.backgroundSize = "cover";
    esc.style.backgroundPosition = "center";
    esc.style.backgroundRepeat = "no-repeat";

    let nivel = 1;

    iniciarNivel();

    function iniciarNivel(){

        esc.innerHTML = "";

        let tiempo = 0;
        let cantidadEstrellas = 1;

        if(nivel === 1){
            tiempo = 0;
            cantidadEstrellas = 1;
        }

        if(nivel === 2){
            tiempo = 40;
            cantidadEstrellas = 2;
        }

        if(nivel === 3){
            tiempo = 20;
            cantidadEstrellas = 3;
        }

        let reloj = document.createElement("div");
        reloj.style.position = "absolute";
        reloj.style.top = "20px";
        reloj.style.left = "20px";
        reloj.style.fontSize = "40px";
        reloj.style.fontWeight = "bold";
        reloj.innerText = tiempo > 0 ? "⏰ " + tiempo : "∞";
        esc.appendChild(reloj);

       audioRadar = new Audio(
    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
);

audioRadar.loop = true;
audioRadar.volume = 0;

        let estrellas = [];

        for(let i=0;i<cantidadEstrellas;i++){

            let estrella = document.createElement("div");

            estrella.innerText = "⭐";
            estrella.style.position = "absolute";
            estrella.style.left = Math.random()*80 + "%";
            estrella.style.top = Math.random()*70 + "%";
            estrella.style.fontSize = "70px";
            estrella.style.cursor = "pointer";

            esc.appendChild(estrella);
            estrellas.push(estrella);

            // PASAR EL CURSOR
            estrella.onmouseenter = ()=>{

                if(estrella.encontrada) return;
                estrella.encontrada = true;

                estrella.remove();

                estrellas = estrellas.filter(
                    e=>e!==estrella
                );

                hablar("bien");

                if(estrellas.length===0){

                    clearInterval(timerGlobal);

                   audioRadar.pause();

                    esc.onmousemove = null;

                    hablar("ganaste");

                    nivel++;

                    if(nivel>3){

                        setTimeout(()=>{
                            volverMenu();
                        },2000);

                    }else{

                        esc.innerHTML=`
                        <h1 style="
                        margin-top:220px;
                        font-size:65px;
                        ">
                        🎉 Nivel Superado
                        </h1>`;

                        setTimeout(()=>{
                            iniciarNivel();
                        },2000);
                    }
                }

            };

        }

        esc.onmousemove = (e)=>{

            const rect = esc.getBoundingClientRect();

            let mouseX = e.clientX - rect.left;
            let mouseY = e.clientY - rect.top;

            let distanciaMinima = Infinity;

            estrellas.forEach(estrella=>{

                const r = estrella.getBoundingClientRect();

                const x = r.left - rect.left + r.width/2;
                const y = r.top - rect.top + r.height/2;

                const dx = mouseX - x;
                const dy = mouseY - y;

                const d = Math.sqrt(dx*dx + dy*dy);

                if(d < distanciaMinima){
                    distanciaMinima = d;
                }

            });

            let proximidad = 1 - (distanciaMinima/600);

            if(proximidad<0) proximidad=0;
            if(proximidad>1) proximidad=1;

          audioRadar.volume = proximidad;

audioRadar.playbackRate =
    0.5 + proximidad * 3;

if(audioRadar.paused){

    audioRadar.play().catch(
        ()=>{}
    );

}

        };

        if(tiempo>0){

            timerGlobal = setInterval(()=>{

                tiempo--;

                reloj.innerText = "⏰ " + tiempo;

                if(tiempo<=0){

                audioRadar.pause();
audioRadar.currentTime = 0;
audioRadar.volume = 0;

                    gameOver();

                }

            },1000);

        }

    }

}
   // =================================================
// ==================== JUEGO dino ==================
// =================================================

if(tipo === "tea"){
titulo.className = "tituloJuego";
    titulo.innerText = "Dino Corre";

  esc.style.backgroundImage =
"url('https://raw.githubusercontent.com/spontonsantiago04-commits/juego-inclusivo/main/ChatGPT%20Image%206%20ago%202026,%2008_20_48%20p.m..png')";
    
    esc.style.backgroundSize = "cover";
    esc.style.backgroundPosition = "center";
    esc.style.backgroundRepeat = "no-repeat";

    let nivel = 1;

   
iniciarNivel();


    function iniciarNivel(){

        esc.innerHTML = `


        <div style="
        position:absolute;
        top:10px;
        left:5%;
        width:90%;
        height:12px;
        background:#333;
        border-radius:10px;
        z-index:20;">

            <div id="prog" style="
            width:0%;
            height:100%;
            background:#00ff88;
            border-radius:10px;"></div>

        </div>

        <div id="pj"></div>
        `;
/* ==========================================
   CONTROLES TÁCTILES DEL NIVEL
   ========================================== */

const esDinoTactil =
    ("ontouchstart" in window) ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

if (esDinoTactil) {
    crearControlesDino();
}
        const pj = document.getElementById("pj");
        const prog = document.getElementById("prog");

        const dinoRun =
        "https://raw.githubusercontent.com/spontonsantiago04-commits/juego-inclusivo/main/ChatGPT%20Image%204%20ago%202026,%2003_22_07%20p.m..png";

        const dinoDuck =
        "https://raw.githubusercontent.com/spontonsantiago04-commits/juego-inclusivo/main/ChatGPT%20Image%203%20ago%202026,%2011_41_39%20a.m..png";

        // =====================================================
        // PERSONAJE
        // =====================================================

        pj.style.position = "absolute";
        pj.style.left = "80px";
        pj.style.bottom = "0px";
        pj.style.width = "180px";
        pj.style.height = "180px";
        pj.style.backgroundImage = `url(${dinoRun})`;
        pj.style.backgroundRepeat = "no-repeat";
        pj.style.backgroundSize = "contain";
        pj.style.backgroundPosition = "center bottom";
        pj.style.zIndex = "10";

        const alturaNormal = 180;
        const alturaAgachado = 180;

        let gravedad = 0.7;
        let salto = -20;

        let velocidad = 10;
        let frecuenciaObs = 90;
        let meta = 12000;

        if(nivel==2){
            velocidad=12;
            frecuenciaObs=80;
            meta=15000;
        }

        if(nivel==3){
            velocidad=14;
            frecuenciaObs=70;
            meta=18000;
        }

        let y = 0;
        let vy = 0;
        let frame = 0;
        let distancia = 0;

        let obstaculos = [];
        let agachado = false;

        // =====================================================
        // CONTROLES
        // =====================================================

        window.onkeydown=(e)=>{

            if((e.code=="Space" || e.code=="ArrowUp") && y==0){
                vy=salto;
            }

            if(e.code=="ArrowDown" && !agachado){

                agachado=true;

               pj.style.backgroundImage=`url(${dinoDuck})`;
pj.style.height=alturaAgachado+"px";
pj.style.backgroundSize="170px auto";
pj.style.backgroundRepeat="no-repeat";
pj.style.backgroundPosition="center bottom";

            }

        };

        window.onkeyup=(e)=>{

            if(e.code=="ArrowDown"){

                agachado=false;

                pj.style.backgroundImage=`url(${dinoRun})`;
pj.style.height=alturaNormal+"px";
pj.style.backgroundSize="170px auto";
pj.style.backgroundRepeat="no-repeat";
pj.style.backgroundPosition="center bottom";

            }

        };
function crearObs(){

    let o = document.createElement("div");

    if(nivel==3 && Math.random()<0.30){

        o.tipo="pajaro";

        o.innerHTML=`
        <img
        src="https://raw.githubusercontent.com/spontonsantiago04-commits/juego-inclusivo/main/ChatGPT%20Image%2030%20jul%202026,%2003_43_07%20p.m..png"
        style="
        width:180px;
        height:120px;
        object-fit:contain;
        pointer-events:none;
        ">
        `;

        o.style.bottom="145px";

    }else{

        o.tipo="cactus";

        if(nivel==1){

            o.innerHTML=`
            <img
            src="https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/cactus.png"
            style="
            width:90px;
            height:140px;
            object-fit:contain;
            pointer-events:none;
            ">
            `;

        }else{

            o.innerHTML=`
            <img
            src="https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/cactus%20doble%20bueno.png"
            style="
            width:170px;
            height:140px;
            object-fit:contain;
            pointer-events:none;
            ">
            `;

        }

        o.style.bottom="100px";
    }

    o.style.position="absolute";
    o.style.left="100%";
    o.style.filter="drop-shadow(0 0 5px black)";

    esc.appendChild(o);

    obstaculos.push(o);

}
function loop(){

    vy += gravedad;
    y += vy;

    if(y>0){
        y=0;
        vy=0;
    }

    // El dinosaurio siempre apoya en el mismo suelo
   pj.style.bottom = (100 - y) + "px";

    distancia += velocidad;

    prog.style.width =
    (distancia/meta)*100 + "%";

    if(frame>60 && frame%frecuenciaObs==0){

        crearObs();

    }

    const pjReal = pj.getBoundingClientRect();

    const pjRect = {

        left: pjReal.left + 35,
        right: pjReal.right - 35,

        top: agachado
            ? pjReal.top + 75
            : pjReal.top + 25,

        bottom: pjReal.bottom - 20

    };

          
obstaculos.forEach((o,i)=>{

    let x = o.offsetLeft - velocidad;

    o.style.left = x + "px";

    const img = o.querySelector("img");

    const oRect = img
        ? img.getBoundingClientRect()
        : o.getBoundingClientRect();

    // ============================================
    // COLISIONES
    // ============================================

    if(

        pjRect.right > oRect.left + 15 &&
        pjRect.left < oRect.right - 15 &&
        pjRect.bottom > oRect.top + 15 &&
        pjRect.top < oRect.bottom - 15

    ){

        if(o.tipo=="pajaro"){

            // Solo golpea si NO está agachado
            if(!agachado){

                gameOver();
                return;

            }

        }else{

            gameOver();
            return;

        }

    }

    // ============================================
    // ELIMINAR OBSTACULOS
    // ============================================

    if(x < -200){

        o.remove();

        obstaculos.splice(i,1);

    }

});

          if(distancia>=meta){

    obstaculos=[];

    cancelAnimationFrame(intervalo);

    hablar("ganaste");

    nivel++;

    if(nivel>3){

        setTimeout(()=>{

            volverMenu();

        },2000);

    }else{

        esc.innerHTML=`

        <h1 style="
        margin-top:220px;
        font-size:65px;
        ">

        🎉 Nivel Superado

        </h1>

        `;

        setTimeout(()=>{

            iniciarNivel();

        },2000);

    }

    return;

}
       frame++;

intervalo = requestAnimationFrame(loop);

}

loop();

    }

}
    // =================================================
// ================= JUEGO AUDITIVO ================
// =================================================

if(tipo === "auditivo"){
      // ==========================================
    // PERMITIR SCROLL EN TABLET
    // ==========================================

    esc.style.touchAction = "auto";
titulo.className = "tituloJuego";
    titulo.innerText = "Lengua de Señas";

    // =================================================
    // ================= FONDO ==========================
    // =================================================

    esc.style.backgroundImage =
    "url('https://raw.githubusercontent.com/spontonsantiago04-commits/juego-inclusivo/main/ChatGPT%20Image%204%20ago%202026,%2005_16_17%20p.m..png')";

    esc.style.backgroundSize = "cover";
  esc.style.backgroundSize = "100% 105%";
    esc.style.backgroundPosition = "center";
    esc.style.backgroundRepeat = "no-repeat";

    // =================================================
    // ================= INTERFAZ =======================
    // =================================================

    esc.innerHTML = `

    <div
    style="
    width:96%;
    height:95%;
    margin:auto;
    display:flex;
    flex-direction:column;
    ">

        <div
        style="
        text-align:center;
        color:#fff7d6;

text-shadow:
0 2px 0 #8b6d3d,
0 0 8px rgba(255,255,255,.4);
        
        font-size:30px;
        font-weight:bold;
        margin-bottom:8px;
        text-shadow:0 4px 10px rgba(0,0,0,.45);
        letter-spacing:2px;
        ">

            EMPAREJA CADA SEÑA CON SU LETRA

        </div>

        <div
        id="contenedorAuditivo"

        style="
        flex:1;

        display:flex;

        justify-content:space-between;

        gap:40px;

        padding:22px;

        border-radius:30px;

       background:transparent;

box-shadow:none;

        overflow:hidden;

        ">

            <!-- IMAGENES -->

            <div
            id="zonaImgs"

            style="
            width:72%;

            display:grid;

            grid-template-columns:
            repeat(4,1fr);

            gap:22px;

            overflow:hidden;

            padding-right:10px;

            ">

            </div>

            <!-- LETRAS -->

           <div
id="zonaLetras"

style="
width:30%;

display:grid;
grid-template-columns:repeat(3,1fr);
gap:8px;
align-content:start;;

padding:5px;
">

            </div>

        </div>

    </div>

    `;

    // =================================================
    // ================= DATOS =========================
    // =================================================

    const datos = [
 
        {letra:"A",img:"https://i.imgur.com/AmJu9l0.png"},
        {letra:"B",img:"https://i.imgur.com/6vLcxZH.png"},
        {letra:"C",img:"https://i.imgur.com/vxeee4e.png"},
        {letra:"D",img:"https://i.imgur.com/BTh9BRK.png"},
        {letra:"E",img:"https://i.imgur.com/We5U9aC.png"},
        {letra:"F",img:"https://i.imgur.com/TJdssFn.png"},
        {letra:"G",img:"https://i.imgur.com/6kWR74i.png"},
        {letra:"H",img:"https://i.imgur.com/NFrdAYV.png"},
        {letra:"I",img:"https://i.imgur.com/U1ImYIP.png"},
        {letra:"J",img:"https://i.imgur.com/B878irs.png"},
        {letra:"K",img:"https://i.imgur.com/MoTmR9C.png"},
        {letra:"L",img:"https://i.imgur.com/MoTmR9C.png"},
        {letra:"M",img:"https://i.imgur.com/KUOpOOl.png"},
        {letra:"N",img:"https://i.imgur.com/uvkZeSv.png"},
        {letra:"Ñ",img:"https://i.imgur.com/EJ634Cp.png"},
        {letra:"O",img:"https://i.imgur.com/BdxwPLs.png"},
        {letra:"P",img:"https://i.imgur.com/9bWsi7r.png"},
        {letra:"Q",img:"https://i.imgur.com/Av3ngXA.png"},
        {letra:"R",img:"https://i.imgur.com/jsUgusZ.png"},
        {letra:"S",img:"https://i.imgur.com/VRJpdHQ.png"},
        {letra:"T",img:"https://i.imgur.com/CDZFS2x.png"},
        {letra:"U",img:"https://i.imgur.com/6oLtobL.png"},
        {letra:"V",img:"https://i.imgur.com/rEEP0Js.png"},
        {letra:"W",img:"https://i.imgur.com/pBmFiQI.png"},
        {letra:"X",img:"https://i.imgur.com/JJY3Gqc.png"},
        {letra:"Y",img:"https://i.imgur.com/B20x6Zh.png"},
        {letra:"Z",img:"https://i.imgur.com/L31KZtm.png"}

    ];

    // =================================================
    // ================= MEZCLAR =======================
    // =================================================

    function mezclar(array){

        return [...array].sort(
            ()=>Math.random()-0.5
        );
    }

    const imagenes = mezclar(datos);

const letras = mezclar(datos);

const zonaImgs =
document.getElementById("zonaImgs");

const zonaLetras =
document.getElementById("zonaLetras");
// ==========================================
// SCROLL TÁCTIL
// ==========================================

zonaImgs.style.touchAction = "pan-y";
zonaLetras.style.touchAction = "pan-y";
const panel =
document.getElementById("contenedorAuditivo");

panel.animate(

[
    {
        opacity:0,
        transform:"translateY(35px)"
    },
    {
        opacity:1,
        transform:"translateY(0px)"
    }
],

{
    duration:700,
    easing:"ease-out"
}

);

let restantes = datos.length;

// ==========================================
// SOLO 12 IMAGENES VISIBLES
// ==========================================

const MAX_VISIBLES = 12;

let pendientes = [...imagenes];

function crearTarjeta(item){

    const caja = document.createElement("div");

    caja.style.height = "170px";
    caja.style.background="rgba(255,255,255,.95)";
    caja.style.border="3px solid rgba(255,255,255,.7)";
    caja.style.borderRadius="22px";
    caja.style.display="flex";
    caja.style.alignItems="center";
    caja.style.justifyContent="center";
    caja.style.cursor="pointer";
    caja.style.boxShadow="0 10px 25px rgba(0,0,0,.25)";
    caja.style.transition=".25s";

    caja.dataset.letra = item.letra;

    const img=document.createElement("img");

    img.src=item.img;

    img.style.maxWidth="90%";
    img.style.maxHeight="90%";

    caja.appendChild(img);

    caja.onmouseenter=()=>{

        caja.style.transform=
        "translateY(-6px) scale(1.04)";

    };

    caja.onmouseleave=()=>{

        caja.style.transform="scale(1)";

    };

    caja.ondragover=(e)=>{

        e.preventDefault();

        caja.style.background="#c8f2ff";

    };

    caja.ondragleave=()=>{

        caja.style.background=
        "rgba(255,255,255,.95)";

    };
  caja.ondrop = (e)=>{

    e.preventDefault();

    caja.style.background =
    "rgba(255,255,255,.95)";

    const letra =
    e.dataTransfer.getData("text");

    if(letra === caja.dataset.letra){

        hablar("bien");

        document.getElementById(
            "letra-"+letra
        ).style.visibility =
        "hidden";

        restantes--;

        // ===========================================
        // ¿QUEDAN IMAGENES POR MOSTRAR?
        // ===========================================

        if(pendientes.length > 0){

            const siguiente =
            pendientes.shift();

            caja.dataset.letra =
            siguiente.letra;

            img.src =
            siguiente.img;

            caja.animate(

                [

                    {
                        opacity:0,
                        transform:"scale(.8)"
                    },

                    {
                        opacity:1,
                        transform:"scale(1)"
                    }

                ],

                {

                    duration:250

                }

            );

        }

        // ===========================================
        // YA NO QUEDAN IMAGENES
        // ===========================================

        else{

            caja.animate(

                [

                    {
                        opacity:1
                    },

                    {
                        opacity:0
                    }

                ],

                {

                    duration:300

                }

            );

            setTimeout(()=>{

                caja.remove();

            },280);

        }

        if(restantes<=0){

            hablar("ganaste");

            setTimeout(()=>{

                volverMenu();

            },1800);

        }

    }

    else{

        hablar("incorrecto");

        caja.animate(

            [

                {transform:"translateX(-8px)"},

                {transform:"translateX(8px)"},

                {transform:"translateX(-8px)"},

                {transform:"translateX(0px)"}

            ],

            {

                duration:250

            }

        );

    }

};

zonaImgs.appendChild(caja);

}
  // ========================================
// CARGAR SOLO 12 TARJETAS
// ========================================

for(

    let i=0;

    i<MAX_VISIBLES && pendientes.length>0;

    i++

){

    crearTarjeta(

        pendientes.shift()

    );

}
// =================================================
// ================= LETRAS ========================
// =================================================

letras.forEach(item=>{

    const b = document.createElement("div");

    b.id = "letra-" + item.letra;
b.dataset.letra = item.letra;
    b.innerText = item.letra;

    b.draggable = true;

    b.style.height = "54px";
    b.style.width = "92%";

    b.style.display = "flex";
    b.style.alignItems = "center";
    b.style.justifyContent = "center";

    b.style.borderRadius = "6px";

    b.style.background =
    "linear-gradient(180deg,#fff9e8,#f3e3b8)";

    b.style.border =
    "2px solid #b98f4b";

    b.style.color =
    "#3f2b15";

    b.style.fontSize = "34px";
    b.style.fontWeight = "bold";

    b.style.cursor = "grab";
b.style.touchAction = "none";
    b.style.userSelect = "none";

    b.style.boxShadow =
    "0 5px 12px rgba(0,0,0,.25)";

    b.style.transition = ".25s";

    b.onmouseenter=()=>{

        b.style.transform="scale(1.06)";

    };

    b.onmouseleave=()=>{

        b.style.transform="scale(1)";

    };

    b.ondragstart=(e)=>{

        e.dataTransfer.setData(
            "text",
            item.letra
        );

        b.style.opacity=".55";

    };

    b.ondragend=()=>{

        b.style.opacity="1";

    };

    zonaLetras.appendChild(b);

});
}
// =================================================
// ================= JUEGO MOTRIZ ==================
// =================================================
if(tipo === "motriz"){
titulo.className = "tituloJuego";
  titulo.innerText =
    "Juego Motriz";

esc.style.backgroundImage =
"url('https://raw.githubusercontent.com/spontonsantiago04-commits/juego-inclusivo/main/ChatGPT%20Image%206%20ago%202026,%2007_19_01%20p.m..png')";

esc.style.backgroundSize = "cover";
esc.style.backgroundSize = "101% 102%";
esc.style.backgroundPosition = "center";

esc.style.backgroundRepeat = "no-repeat";
   esc.innerHTML = `

<div id="objetivo"
style="
height:180px;
display:flex;
align-items:center;
justify-content:center;
font-size:150px;
font-family:'Comic Sans MS',cursive;
font-weight:bold;
color:#222;
text-shadow:3px 3px 0 rgba(0,0,0,.12);
transform:rotate(-3deg);
transition:.3s;
">
</div>

<div id="contenedorLetras"
style="
display:flex;
justify-content:center;
align-items:center;
gap:80px;
margin-top:140px;
flex-wrap:wrap;
">
</div>

`;

    const objetivo =
    document.getElementById(
        "objetivo"
    );

    const contenedor =
    document.getElementById(
        "contenedorLetras"
    );

    // =================================================
    // ================= LETRAS ========================
    // =================================================

    const letras = [

        "A","E","I","O","U",

        "B","C","D","F","G",
        "H","J","K","L","M",
        "N","Ñ","P","Q","R",
        "S","T","V","W","X",
        "Y","Z"
    ];

    // =================================================
    // ================= NUMEROS =======================
    // =================================================

    const numeros = [

        "0","1","2","3","4",
        "5","6","7","8","9"
    ];

    // =================================================
    // ================= PENDIENTES ====================
    // =================================================

    let pendientes = [

        ...letras,
        ...numeros
    ];

    // =================================================
    // ================= MEZCLAR =======================
    // =================================================

    function mezclar(array){

        return [...array].sort(
            ()=>Math.random()-0.5
        );
    }

    // =================================================
    // ================= NUEVA RONDA ===================
    // =================================================

    function nuevaRonda(){

        // TERMINAR

        if(pendientes.length <= 0){

            hablar("ganaste");

            setTimeout(()=>{

                volverMenu();

            },2000);

            return;
        }

        contenedor.innerHTML = "";

        // =============================================
        // ============ CORRECTA =======================
        // =============================================

        let correcta =
        pendientes.shift();

        objetivo.innerText =
        correcta;

        // VOZ SOLO LETRA/NUMERO

        hablar(correcta);

        // =============================================
        // ============ MISMO TIPO =====================
        // =============================================

        let grupoActual;

        // SI ES NUMERO

        if(
            numeros.includes(correcta)
        ){

            grupoActual = numeros;

        }else{

            grupoActual = letras;
        }

        // =============================================
        // ============ OPCIONES =======================
        // =============================================

        let extras =
        mezclar(grupoActual)
        .filter(
            l => l !== correcta
        )
        .slice(0,2);

        let opciones =
        mezclar(
            [
                correcta,
                ...extras
            ]
        );

        // =============================================
        // ============ BOTONES ========================
        // =============================================

        opciones.forEach(letra=>{

            const b =
            document.createElement("button");
const colores = [

"#ff595e",
"#ff924c",
"#ffca3a",
"#8ac926",
"#52b788",
"#1982c4",
"#4267ff",
"#6a4cff",
"#b5179e",
"#f72585"

];

const color =
colores[
Math.floor(
Math.random()*colores.length
)
];

b.style.width="145px";

b.style.height="145px";

b.style.borderRadius="30px";

b.style.border="5px solid rgba(255,255,255,.85)";

b.style.background=
`linear-gradient(
180deg,
${color},
${color}CC
)`;

b.style.color="white";

b.style.fontSize="82px";

b.style.fontFamily="Arial Black";

b.style.fontWeight="900";

b.style.textShadow=
"0 3px 4px rgba(0,0,0,.35)";

b.style.boxShadow=`
0 10px 0 rgba(0,0,0,.18),
0 18px 22px rgba(0,0,0,.28)
`;

b.style.transition=".18s";

b.style.cursor="pointer";
          b.onmouseenter=()=>{

    b.style.transform=
    "translateY(-8px) rotate(-2deg) scale(1.08)";

};

b.onmouseleave=()=>{

    b.style.transform=
    "translateY(0px) rotate(0deg) scale(1)";

};
                // =====================================
                // ============ CORRECTO ===============
                // =====================================

 b.innerText = letra;

b.onclick = ()=>{

    if(letra === correcta){

        hablar("bien");

        b.animate(

            [
                {transform:"scale(1)"},
                {transform:"scale(1.25) rotate(10deg)"},
                {transform:"scale(0)"}
            ],

            {
                duration:450
            }

        );

        setTimeout(()=>{

            nuevaRonda();

        },500);

    }else{

        hablar("incorrecto");

        b.style.background="red";

        setTimeout(()=>{

            b.style.background=
            `linear-gradient(180deg,${color},${color}CC)`;

        },500);

    }

};

contenedor.appendChild(b);

    // =================================================
    // ================= INICIAR =======================
    // =================================================
        });
    }
    nuevaRonda();
}

// =================================================
// ========= EMPAREJAR FIGURAS Y SILUETAS ==========
// =================================================

if(tipo === "figuras"){
  
  esc.style.background = "linear-gradient(180deg,#dff7ff,#bdeeff,#9ee4ff)";
esc.style.backgroundImage = "none";
titulo.className = "tituloJuego";

    titulo.innerText =
    "Emparejar Figuras";

   let nivel = 1;


/* ================================================= */
/* ========== COMPROBAR FIGURA ===================== */
/* ================================================= */

function comprobarFigura(figura, sombra){

    if(!figura || !sombra){
        return false;
    }

    const idFigura =
        figura.dataset.id ||
        figura.getAttribute("data-id");

    const idSombra =
        sombra.dataset.id ||
        sombra.getAttribute("data-id");

    if(!idFigura || !idSombra){
        return false;
    }

    return idFigura === idSombra;
}

    iniciarNivel();

    function iniciarNivel(){

        esc.innerHTML = "";

        let cantidad = 3;

        if(nivel === 2) cantidad = 5;
        if(nivel === 3) cantidad = 7;

       const figuras = [

{
    id:"manzana",
    figura:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/apple.png"
  ,
    sombra:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/apple%20sombra.png"
},
{
id:"arbol",
    figura:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/arbol.png",
    sombra:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/arbol-sombra.png"
},

{
    id:"auto",
    figura:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/car%20si.png",
    sombra:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/car%20sombra.png"
},

{
    id:"perro",
    figura:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/dog%20si.png",
    sombra:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/dog%20sombra.png"
},

{
    id:"flor",
    figura:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/flor.png",
    sombra:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/flor-sombra.png"
},

{
    id:"gato",
    figura:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/gato-negro.png",
    sombra:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/gato-negro-sombra.png"
},

{
    id:"mariposa",
    figura:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/mariposa.png",
    sombra:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/mariposa-sombra.png"
},

{
    id:"pelota",
    figura:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/pelota.png",
    sombra:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/pelota-sombra.png"
},

{
    id:"sol",
    figura:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/sol.png",
    sombra:"https://raw.githubusercontent.com/martinstirnemann07-coder/juego-inclusivo/main/sol-sombra.png"
}

].slice(0,cantidad);

        const mezcladasFiguras =
        [...figuras].sort(
            ()=>Math.random()-0.5
        );

        const mezcladasSombras =
        [...figuras].sort(
            ()=>Math.random()-0.5
        );
esc.innerHTML = `

<div style="
display:flex;
justify-content:space-between;
align-items:center;
height:100%;
padding:20px;
box-sizing:border-box;
">

    <div id="figuras"
    style="
    width:47%;
    display:grid;
    grid-template-columns:repeat(${nivel==3 ? 3 : 2},1fr);
    gap:${nivel==3 ? "10px" : "18px"};
    justify-items:center;
    align-items:center;
    ">
    </div>

    <div id="sombras"
    style="
    width:47%;
    display:grid;
    grid-template-columns:repeat(${nivel==3 ? 3 : 2},1fr);
    gap:${nivel==3 ? "10px" : "18px"};
    justify-items:center;
    align-items:center;
    ">
    </div>

</div>
`;
        const zonaFiguras =
        document.getElementById("figuras");

        const zonaSombras =
        document.getElementById("sombras");

        let restantes = cantidad;

        // FIGURAS

        mezcladasFiguras.forEach(item=>{

            let figura =
            document.createElement("div");
const tamImg = nivel == 3 ? 80 : 100;

figura.innerHTML = `
<img
src="${item.figura}"
style="
width:100%;
height:100%;
max-width:100%;
max-height:100%;
object-fit:contain;
pointer-events:none;
display:block;
">
`;
           
            figura.draggable = true;

            figura.dataset.id =
            item.id;

            figura.style.fontSize =
            "70px";

if(nivel==3){

    figura.style.width="130px";
    figura.style.height="105px";

}else{

    figura.style.width="170px";
    figura.style.height="125px";

}

figura.style.padding="8px";
figura.style.boxSizing="border-box";
figura.style.overflow="hidden";
figura.style.background =
"linear-gradient(180deg,#49d5ff,#00b5eb)";
figura.style.border = "4px solid white";
figura.style.boxShadow = "0 8px 18px rgba(0,0,0,.25)";
figura.style.transition = ".25s";  

            figura.style.borderRadius =
            "15px";

            figura.style.cursor =
            "grab";

            figura.style.textAlign =
            "center";

            figura.ondragstart = (e)=>{

                e.dataTransfer.setData(
                    "text",
                    item.id
                );
            };

            zonaFiguras.appendChild(
                figura
            );
        } )

        // SILUETAS

        mezcladasSombras.forEach(item=>{

            let sombra =
            document.createElement("div");
const tamSombra = nivel == 3 ? 80 : 100;

sombra.innerHTML = `
<img
src="${item.sombra}"
style="
width:100%;
height:100%;
max-width:100%;
max-height:100%;
object-fit:contain;
pointer-events:none;
display:block;
">
`;
 

            sombra.dataset.id =
            item.id;

            sombra.style.fontSize =
            "70px";

            
if(nivel==3){

    sombra.style.width="130px";
    sombra.style.height="105px";

}else{

    sombra.style.width="170px";
    sombra.style.height="125px";

}

sombra.style.padding="8px";
sombra.style.boxSizing="border-box";
sombra.style.overflow="hidden";
            sombra.style.background = "#ffffff";

sombra.style.border = "4px dashed #4aa8ff";

sombra.style.opacity = "1";

sombra.style.boxShadow =
"inset 0 0 12px rgba(0,0,0,.12)";

            sombra.style.textAlign =
            "center";

           sombra.ondragover = (e)=>{

    e.preventDefault();

    sombra.style.background = "#dff6ff";

    sombra.style.transform = "scale(1.03)";
};

sombra.ondragleave = ()=>{

    sombra.style.background = "#ffffff";

    sombra.style.transform = "scale(1)";
};

sombra.ondrop = (e) => {

    e.preventDefault();

    const dato =
        e.dataTransfer.getData("text");


    /* ========================================= */
    /* COMPROBAR SI LA FIGURA ES CORRECTA        */
    /* ========================================= */

    const correcto =
        comprobarFigura(
            { dataset: { id: dato } },
            sombra
        );


    if (correcto) {

        hablar("muy bien");


        /* ===================================== */
        /* ANIMACIÓN DE ACIERTO                  */
        /* ===================================== */

        sombra.style.background =
            "linear-gradient(180deg,#9dff8a,#4cd964)";

        sombra.style.transform =
            "scale(1.08)";

        sombra.style.boxShadow =
            "0 0 25px rgba(76,217,100,.6)";

        sombra.style.opacity =
            "1";


        /* ===================================== */
        /* ELIMINAR FIGURA ORIGINAL              */
        /* ===================================== */

        const figura =
            [...zonaFiguras.children]
            .find(f =>
                f.dataset.id === dato
            );

        if(figura){

            figura.remove();

        }


        /* ===================================== */
        /* BLOQUEAR SOMBRA                       */
        /* ===================================== */

        sombra.style.border =
            "none";

        sombra.dataset.completada =
            "true";


        restantes--;


        /* ===================================== */
        /* NIVEL COMPLETADO                      */
        /* ===================================== */

        if(restantes <= 0){

            hablar(
                "nivel superado"
            );

            nivel++;


            /* ================================= */
            /* JUEGO TERMINADO                  */
            /* ================================= */

            if(nivel > 3){

                setTimeout(()=>{

                    hablar(
                        "ganaste"
                    );

                    volverMenu();

                },1500);


            }else{

                esc.innerHTML = `

                    <h1 style="
                    margin-top:220px;
                    font-size:65px;
                    ">

                    🎉 Nivel Superado

                    </h1>

                `;


                setTimeout(()=>{

                    iniciarNivel();

                },2000);

            }
 
        }


       }else{

        hablar(
            "intenta otra vez"
        );

    }
};
zonaSombras.appendChild(
    sombra
);
            });

        }

    }

}   


/* ========================================================= */
/* ========== COMPATIBILIDAD TÁCTIL PC + TABLET ============ */
/* ========================================================= */



/* ===================================================== */
/* ===== EMPAREJAR FIGURAS - TÁCTIL REAL =============== */
/* ===================================================== */

(function () {

    const esTactil =
        ("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0;

    if (!esTactil) return;

    let figuraActiva = null;
    let clonFigura = null;
    let pointerActivo = null;


    /* ================================================= */
    /* ============ EVITAR DRAG NATIVO ================= */
    /* ================================================= */

    document.addEventListener("dragstart", function (e) {

        const figura =
            e.target.closest("#figuras > div");

        if (figura) {
            e.preventDefault();
        }

    });


    /* ================================================= */
    /* ================ INICIAR ARRASTRE =============== */
    /* ================================================= */

    document.addEventListener(
        "pointerdown",
        function (e) {

            const figura =
                e.target.closest("#figuras > div");

            if (!figura) return;

            if (
                e.pointerType !== "touch" &&
                e.pointerType !== "pen"
            ) {
                return;
            }

            e.preventDefault();

            figuraActiva = figura;
            pointerActivo = e.pointerId;

            figura.style.touchAction = "none";
            figura.draggable = false;
            figura.style.opacity = "0.35";


            /* ========================================= */
            /* CREAR COPIA QUE SIGUE AL DEDO             */
            /* ========================================= */

            clonFigura = figura.cloneNode(true);

            clonFigura.style.position = "fixed";

            clonFigura.style.left =
                (e.clientX - figura.offsetWidth / 2) + "px";

            clonFigura.style.top =
                (e.clientY - figura.offsetHeight / 2) + "px";

            clonFigura.style.width =
                figura.offsetWidth + "px";

            clonFigura.style.height =
                figura.offsetHeight + "px";

            clonFigura.style.margin = "0";

            clonFigura.style.opacity = "0.9";

            clonFigura.style.transform =
                "scale(1.08)";

            clonFigura.style.zIndex =
                "999999";

            clonFigura.style.pointerEvents =
                "none";

            document.body.appendChild(clonFigura);


            try {

                figura.setPointerCapture(
                    pointerActivo
                );

            } catch (_) {}

        },

        {
            passive: false
        }
    );


    /* ================================================= */
    /* ================= MOVER FIGURA ================== */
    /* ================================================= */

    document.addEventListener(
        "pointermove",
        function (e) {

            if (
                !figuraActiva ||
                !clonFigura ||
                e.pointerId !== pointerActivo
            ) {
                return;
            }

            e.preventDefault();


            /* ========================================= */
            /* COPIA SIGUE AL DEDO                      */
            /* ========================================= */

            clonFigura.style.left =
                (
                    e.clientX -
                    clonFigura.offsetWidth / 2
                ) + "px";

            clonFigura.style.top =
                (
                    e.clientY -
                    clonFigura.offsetHeight / 2
                ) + "px";


            /* ========================================= */
            /* BUSCAR SILUETA                           */
            /* ========================================= */

            const elemento =
                document.elementFromPoint(
                    e.clientX,
                    e.clientY
                );

            const sombra =
                elemento
                    ? elemento.closest(
                        "#sombras > div"
                    )
                    : null;


            /* ========================================= */
            /* QUITAR RESALTADOS                        */
            /* ========================================= */

            document
                .querySelectorAll(
                    "#sombras > div"
                )
                .forEach(s => {

                    if (
                        s !== sombra &&
                        s.style.border !== "none"
                    ) {

                        s.style.transform =
                            "scale(1)";

                        s.style.background =
                            "#ffffff";

                    }

                });


            /* ========================================= */
            /* RESALTAR SILUETA                         */
            /* ========================================= */

            if (sombra) {

                sombra.style.transform =
                    "scale(1.07)";

                sombra.style.background =
                    "#dff6ff";

            }

        },

        {
            passive: false
        }
    );


    /* ================================================= */
    /* ================= SOLTAR FIGURA ================= */
    /* ================================================= */

    document.addEventListener(
        "pointerup",
        function (e) {

            if (
                !figuraActiva ||
                e.pointerId !== pointerActivo
            ) {
                return;
            }

            e.preventDefault();


            const elemento =
                document.elementFromPoint(
                    e.clientX,
                    e.clientY
                );

            const sombra =
                elemento
                    ? elemento.closest(
                        "#sombras > div"
                    )
                    : null;


            /* ========================================= */
            /* RESTAURAR FIGURA ORIGINAL                */
            /* ========================================= */

            figuraActiva.style.opacity =
                "1";


            /* ========================================= */
            /* ELIMINAR COPIA                           */
            /* ========================================= */

            if (clonFigura) {

                clonFigura.remove();

                clonFigura = null;

            }


            /* ========================================= */
            /* QUITAR RESALTADOS                        */
            /* ========================================= */

            document
                .querySelectorAll(
                    "#sombras > div"
                )
                .forEach(s => {

                    if (
                        s.style.border !== "none"
                    ) {

                        s.style.transform =
                            "scale(1)";

                        s.style.background =
                            "#ffffff";

                    }

                });


     /* ========================================= */
/* COMPROBAR DESTINO                        */
/* ========================================= */

if (sombra) {

    const idFigura =
        figuraActiva.dataset.id;


    /* ========================================= */
    /* USAR EL MISMO DROP QUE USA LA PC          */
    /* ========================================= */

    sombra.ondrop({

        preventDefault:
            function () {},

        dataTransfer: {

            getData:
                function () {

                    return idFigura;

                }

        }

    });

}


figuraActiva = null;
pointerActivo = null;
        },

        {
            passive: false
        }
    );


    /* ================================================= */
    /* ================= CANCELAR ====================== */
    /* ================================================= */

    function cancelarArrastre() {

        if (figuraActiva) {

            figuraActiva.style.opacity =
                "1";

        }

        if (clonFigura) {

            clonFigura.remove();

            clonFigura = null;

        }

        figuraActiva = null;
        pointerActivo = null;


        document
            .querySelectorAll(
                "#sombras > div"
            )
            .forEach(s => {

                if (
                    s.style.border !== "none"
                ) {

                    s.style.transform =
                        "scale(1)";

                    s.style.background =
                        "#ffffff";

                }

            });

    }


    document.addEventListener(
        "pointercancel",
        cancelarArrastre
    );

})();

/* ===================================================== */
/* ========== LENGUA DE SEÑAS - TOUCH REAL ============= */
/* ===================================================== */

(function () {

    const esTactil =
        ("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0;

    if (!esTactil) return;

    let letraActiva = null;
    let copiaLetra = null;
    let pointerActivo = null;


    /* ================================================= */
    /* ============== INICIAR ARRASTRE ================= */
    /* ================================================= */

    document.addEventListener(
        "pointerdown",
        function (e) {

            const letra =
                e.target.closest("#zonaLetras > div");

            if (!letra) return;

            if (
                e.pointerType !== "touch" &&
                e.pointerType !== "pen"
            ) {
                return;
            }

            e.preventDefault();

            letraActiva = letra;
            pointerActivo = e.pointerId;

            letra.draggable = false;

            letra.style.opacity = "0.3";


            /* ========================================= */
            /* CREAR COPIA QUE SIGUE AL DEDO             */
            /* ========================================= */

            copiaLetra =
                letra.cloneNode(true);

            copiaLetra.style.position =
                "fixed";

            copiaLetra.style.left =
                (
                    e.clientX -
                    letra.offsetWidth / 2
                ) + "px";

            copiaLetra.style.top =
                (
                    e.clientY -
                    letra.offsetHeight / 2
                ) + "px";

            copiaLetra.style.width =
                letra.offsetWidth + "px";

            copiaLetra.style.height =
                letra.offsetHeight + "px";

            copiaLetra.style.margin = "0";

            copiaLetra.style.opacity = "0.95";

            copiaLetra.style.zIndex =
                "999999";

            copiaLetra.style.pointerEvents =
                "none";

            copiaLetra.style.transform =
                "scale(1.08)";

            copiaLetra.style.boxShadow =
                "0 10px 25px rgba(0,0,0,.35)";

            document.body.appendChild(
                copiaLetra
            );


            try {

                letra.setPointerCapture(
                    pointerActivo
                );

            } catch (_) {}

        },

        {
            passive: false
        }
    );


    /* ================================================= */
    /* ================= MOVER LETRA =================== */
    /* ================================================= */

    document.addEventListener(
        "pointermove",
        function (e) {

            if (
                !letraActiva ||
                !copiaLetra ||
                e.pointerId !== pointerActivo
            ) {
                return;
            }

            e.preventDefault();


            /* ========================================= */
            /* LA COPIA SIGUE AL DEDO                   */
            /* ========================================= */

            copiaLetra.style.left =
                (
                    e.clientX -
                    copiaLetra.offsetWidth / 2
                ) + "px";

            copiaLetra.style.top =
                (
                    e.clientY -
                    copiaLetra.offsetHeight / 2
                ) + "px";


            /* ========================================= */
            /* BUSCAR SEÑA DEBAJO DEL DEDO              */
            /* ========================================= */

            const elemento =
                document.elementFromPoint(
                    e.clientX,
                    e.clientY
                );

            const tarjeta =
                elemento
                    ? elemento.closest(
                        "#zonaImgs > div"
                    )
                    : null;


            /* ========================================= */
            /* QUITAR RESALTADOS                        */
            /* ========================================= */

            document
                .querySelectorAll(
                    "#zonaImgs > div"
                )
                .forEach(caja => {

                    if (caja !== tarjeta) {

                        caja.style.transform =
                            "scale(1)";

                        caja.style.background =
                            "rgba(255,255,255,.95)";

                    }

                });


            /* ========================================= */
            /* RESALTAR DESTINO                         */
            /* ========================================= */

            if (tarjeta) {

                tarjeta.style.transform =
                    "scale(1.06)";

                tarjeta.style.background =
                    "#c8f2ff";

            }

        },

        {
            passive: false
        }
    );


    /* ================================================= */
    /* ================= SOLTAR LETRA ================= */
    /* ================================================= */

    document.addEventListener(
        "pointerup",
        function (e) {

            if (
                !letraActiva ||
                e.pointerId !== pointerActivo
            ) {
                return;
            }

            e.preventDefault();


            /* ========================================= */
            /* BUSCAR DESTINO FINAL                     */
            /* ========================================= */

            const elemento =
                document.elementFromPoint(
                    e.clientX,
                    e.clientY
                );

            const tarjeta =
                elemento
                    ? elemento.closest(
                        "#zonaImgs > div"
                    )
                    : null;


            /* ========================================= */
            /* GUARDAR REFERENCIA                       */
            /* ========================================= */

            const letraSoltada =
                letraActiva;


            /* ========================================= */
            /* RESTAURAR LETRA                          */
            /* ========================================= */

            letraSoltada.style.opacity =
                "1";


            /* ========================================= */
            /* ELIMINAR COPIA                           */
            /* ========================================= */

            if (copiaLetra) {

                copiaLetra.remove();

                copiaLetra = null;

            }


            /* ========================================= */
            /* QUITAR RESALTADOS                        */
            /* ========================================= */

            document
                .querySelectorAll(
                    "#zonaImgs > div"
                )
                .forEach(caja => {

                    caja.style.transform =
                        "scale(1)";

                    caja.style.background =
                        "rgba(255,255,255,.95)";

                });


            /* ========================================= */
            /* COMPROBAR DESTINO                        */
            /* ========================================= */

            if (tarjeta) {

                const valor =
                    letraSoltada.dataset.letra;


                /* ===================================== */
                /* USAR LA MISMA VALIDACIÓN DEL DROP     */
                /* ===================================== */

                if (
                    typeof tarjeta.ondrop ===
                    "function"
                ) {

                    tarjeta.ondrop({

                        preventDefault:
                            function () {},

                        dataTransfer: {

                            getData:
                                function () {

                                    return valor;

                                }

                        }

                    });

                }

            }


            letraActiva = null;
            pointerActivo = null;

        },

        {
            passive: false
        }
    );


    /* ================================================= */
    /* ================= CANCELAR ====================== */
    /* ================================================= */

    function cancelarArrastre() {

        if (letraActiva) {

            letraActiva.style.opacity =
                "1";

        }

        if (copiaLetra) {

            copiaLetra.remove();

            copiaLetra = null;

        }

        letraActiva = null;
        pointerActivo = null;


        document
            .querySelectorAll(
                "#zonaImgs > div"
            )
            .forEach(caja => {

                caja.style.transform =
                    "scale(1)";

                caja.style.background =
                    "rgba(255,255,255,.95)";

            });

    }


    document.addEventListener(
        "pointercancel",
        cancelarArrastre
    );

})();
/* ===================================================== */
/* =================== RADAR ESTELAR ==================== */
/* ===================================================== */

(function () {

    let dedoActivo = false;


    /* ================================================= */
    /* ================= INICIAR TOQUE ================= */
    /* ================================================= */

    document.addEventListener(
        "pointerdown",
        function (e) {

            if (
                e.pointerType !== "touch" &&
                e.pointerType !== "pen"
            ) {
                return;
            }

            const esc =
                document.getElementById("escenario");

            if (!esc) return;

            if (
                typeof esc.onmousemove !==
                "function"
            ) {
                return;
            }

            dedoActivo = true;

            e.preventDefault();


            /* ========================================= */
            /* SI TOCA DIRECTAMENTE UNA ESTRELLA         */
            /* ========================================= */

            seleccionarEstrella(
                e.clientX,
                e.clientY
            );

        },

        {
            passive: false
        }
    );


    /* ================================================= */
    /* ================ MOVER EL DEDO ================= */
    /* ================================================= */

    document.addEventListener(
        "pointermove",
        function (e) {

            if (!dedoActivo) return;

            if (
                e.pointerType !== "touch" &&
                e.pointerType !== "pen"
            ) {
                return;
            }


            const esc =
                document.getElementById(
                    "escenario"
                );

            if (!esc) return;


            /* ========================================= */
            /* SOLO SI ESTÁ ACTIVO EL RADAR              */
            /* ========================================= */

            if (
                typeof esc.onmousemove !==
                "function"
            ) {
                return;
            }


            e.preventDefault();


            /* ========================================= */
            /* MANTENER EL RADAR FUNCIONANDO             */
            /* ========================================= */

            const evento =
                new MouseEvent(
                    "mousemove",
                    {
                        bubbles: true,

                        clientX:
                            e.clientX,

                        clientY:
                            e.clientY
                    }
                );

            esc.dispatchEvent(
                evento
            );


            /* ========================================= */
            /* BUSCAR ESTRELLA BAJO EL DEDO              */
            /* ========================================= */

            seleccionarEstrella(
                e.clientX,
                e.clientY
            );

        },

        {
            passive: false
        }
    );


    /* ================================================= */
    /* ================= SOLTAR DEDO ================== */
    /* ================================================= */

    document.addEventListener(
        "pointerup",
        function (e) {

            if (
                e.pointerType !== "touch" &&
                e.pointerType !== "pen"
            ) {
                return;
            }

            dedoActivo = false;

        }
    );


    document.addEventListener(
        "pointercancel",
        function () {

            dedoActivo = false;

        }
    );


    /* ================================================= */
    /* ============ DETECTAR ESTRELLA ================= */
    /* ================================================= */

    function seleccionarEstrella(
        x,
        y
    ) {

        const esc =
            document.getElementById(
                "escenario"
            );

        if (!esc) return;


        /* ========================================= */
        /* BUSCAR TODAS LAS ESTRELLAS                */
        /* ========================================= */

        const estrellas =
            esc.querySelectorAll(
                'div'
            );


        for (
            const estrella
            of estrellas
        ) {

            if (
                !estrella.innerText ||
                !estrella.innerText.includes("⭐")
            ) {
                continue;
            }


            /* ===================================== */
            /* ESTRELLA YA ENCONTRADA                */
            /* ===================================== */

            if (
                estrella.encontrada
            ) {
                continue;
            }


            const rect =
                estrella.getBoundingClientRect();


            /* ===================================== */
            /* CENTRO DE LA ESTRELLA                */
            /* ===================================== */

            const centroX =
                rect.left +
                rect.width / 2;

            const centroY =
                rect.top +
                rect.height / 2;


            const dx =
                x - centroX;

            const dy =
                y - centroY;


            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            /* ===================================== */
            /* ZONA DE DETECCIÓN                     */
            /* ===================================== */

            const radio =
                Math.max(
                    rect.width,
                    rect.height
                ) / 2 + 20;


            if (
                distancia <= radio
            ) {

                if (
                    typeof estrella.onmouseenter ===
                    "function"
                ) {

                    estrella.onmouseenter();

                }

                return;

            }

        }

    }

})();
    /* ===================================================== */
    /* ==================== DINO =========================== */
    /* ===================================================== */

  // =====================================================
// ==================== CONTROLES DINO =================
// =====================================================

function crearControlesDino() {

    // Eliminar controles anteriores
    document.querySelectorAll(".controlesDino")
        .forEach(c => c.remove());

    const esc = document.getElementById("escenario");

    if (!esc) return;

    // ==========================================
    // CREAR CONTROLES
    // ==========================================

    const controles = document.createElement("div");

    controles.className = "controlesDino";

    controles.innerHTML = `
        <button id="btnSaltar" type="button">
            🦘
            <span>SALTAR</span>
        </button>

        <button id="btnAgachar" type="button">
            🦆
            <span>AGACHARSE</span>
        </button>
    `;

    esc.appendChild(controles);

    // ==========================================
    // ZONA DE BOTONES
    // ==========================================

    controles.style.position = "absolute";

    controles.style.left = "0";
    controles.style.right = "0";

    controles.style.bottom = "0";

    controles.style.width = "100%";
    controles.style.height = "95px";

    controles.style.display = "none";

    controles.style.alignItems = "center";
    controles.style.justifyContent = "space-between";

    controles.style.padding = "10px 25px";

    controles.style.boxSizing = "border-box";

    controles.style.background =
        "rgba(0,0,0,.15)";

    controles.style.zIndex = "1000";

    controles.style.pointerEvents = "none";

    // ==========================================
    // MOSTRAR SOLO EN TABLET / TÁCTIL
    // ==========================================

   const esTablet =
    ("ontouchstart" in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0);

if (esTablet) {
    controles.style.display = "flex";
}

    // ==========================================
    // BOTONES
    // ==========================================

    const botones =
        controles.querySelectorAll("button");

    botones.forEach(boton => {

        boton.style.width = "140px";
        boton.style.height = "65px";

        boton.style.border = "3px solid white";

        boton.style.borderRadius = "20px";

        boton.style.background =
            "linear-gradient(180deg,#53c8ff,#198fd1)";

        boton.style.color = "white";

        boton.style.fontFamily =
            "Arial, sans-serif";

        boton.style.fontSize = "16px";

        boton.style.fontWeight = "900";

        boton.style.display = "flex";

        boton.style.flexDirection = "column";

        boton.style.alignItems = "center";

        boton.style.justifyContent = "center";

        boton.style.lineHeight = "18px";

        boton.style.boxShadow =
            "0 5px 0 #116da3, 0 7px 12px rgba(0,0,0,.3)";

        boton.style.touchAction = "none";

        boton.style.pointerEvents = "auto";

        boton.style.userSelect = "none";

        boton.style.webkitUserSelect = "none";

        boton.style.cursor = "pointer";

        boton.style.transition =
            "transform .1s";
    });

    // ==========================================
    // SALTAR
    // ==========================================

    const saltar =
        document.getElementById("btnSaltar");

    saltar.addEventListener(
        "pointerdown",
        function(e) {

            e.preventDefault();

            saltar.style.transform =
                "translateY(4px) scale(.95)";

            window.dispatchEvent(
                new KeyboardEvent("keydown", {
                    key: " ",
                    code: "Space",
                    bubbles: true
                })
            );
        }
    );

    saltar.addEventListener(
        "pointerup",
        function(e) {

            e.preventDefault();

            saltar.style.transform = "";
        }
    );

    saltar.addEventListener(
        "pointercancel",
        function() {

            saltar.style.transform = "";
        }
    );

    // ==========================================
    // AGACHARSE
    // ==========================================

    const agachar =
        document.getElementById("btnAgachar");

    function empezarAgachar(e) {

        e.preventDefault();

        agachar.style.transform =
            "translateY(4px) scale(.95)";

        window.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "ArrowDown",
                code: "ArrowDown",
                bubbles: true
            })
        );
    }

    function terminarAgachar(e) {

        e.preventDefault();

        agachar.style.transform = "";

        window.dispatchEvent(
            new KeyboardEvent("keyup", {
                key: "ArrowDown",
                code: "ArrowDown",
                bubbles: true
            })
        );
    }

    agachar.addEventListener(
        "pointerdown",
        empezarAgachar
    );

    agachar.addEventListener(
        "pointerup",
        terminarAgachar
    );

    agachar.addEventListener(
        "pointercancel",
        terminarAgachar
    );

    agachar.addEventListener(
        "pointerleave",
        terminarAgachar
    );
}
 
