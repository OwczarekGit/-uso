var GLOBALCIRCLESIZE=76;
var GLOBALAPPROACHCIRLESIZE=GLOBALCIRCLESIZE*3;

var mapLoc;
var mapObj=[];
var circleArray = [];
var music = new Audio();
var CCOMBO=0;
music.volume=0.30;
var MX,MY;
var miss=0;
var hits=0;
var gameTime = 0;
var canvas = document.getElementById("game");
var c = canvas.getContext("2d");
var PScore=0;
var PCombo=0;
var map;
var exitLoop = false;
var oldMusicVolume= music.volume;
var musicVolumeVisualyzer=0;
var songPath = "songs/";
var clickSound = "clickfeedback.wav";
var missSound = "combobreak.mp3";
var drawCircleHitbox=false;

window.onresize = function(){
    setCanvasSize();
}

setCanvasSize();
function setCanvasSize(){
    canvas.width = window.innerWidth;
    canvas.height= window.innerHeight;
}

function resetSettings(){
    miss=0;
    hits=0;
    PScore=0;
    PCombo=0;
}


function init(MAP,MAP_SONG,BG){
    music.pause();
    music.currentTime=0;
    CCOMBO=0;
    PScore=0;
    PCombo=0;
    mapObj=[];
    circleArray = [];
    exitLoop = true;
    gameTime=0;
    miss=0;
    hits=0;
    

    music.src = MAP_SONG;
    mapLoc = MAP;
    document.body.style.backgroundImage = "url("+BG+")";
    //readFile(e,MAP);
    map = jQuery.get(mapLoc,function(data){
        var temp0=[];
        temp0=data.split("\n");
        for(let i=0;i<temp0.length;i++){
            mapObj.push(temp0[i].split(",",4));
        }

        createCircles(mapObj);
    });

    setTimeout(function(){
        c.clearRect(0,0,canvas.width,canvas.height);
        exitLoop = false;
        songBox.closePanel();
        music.play();
        gameLoop();
    },1000);
}

function readFile(evt,MAP) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(){alert(target.result);}
}

function mapInNewRange(x,oldMin,oldMax,newMin,newMax){
    return (x-oldMin)/(oldMax-oldMin)*(newMax-newMin)+newMin;
}

canvas.onmousemove = function(e){
    MX=e.clientX;
    MY=e.clientY;
}

canvas.addEventListener("wheel",function(e){
    if(e.deltaY<0){
        try {
            music.volume+=0.05;
            musicVolumeVisualyzer=100;
        } catch(ex){}
    }else if(e.deltaY>0){
        try {
            music.volume-=0.05;
            musicVolumeVisualyzer=100;
        } catch(ex){}
    }
},false);

var changingCurrentTime=false;
window.addEventListener("keydown",function(e){
    if(e.key == "Shift"){
        changingCurrentTime = true;
    }
    if(e.key == "Escape"){
        settingsPanel.closePanel();
        songBox.closePanel();
    }
    if(e.key == "o"){
        settingsPanel.tooglePanel();
    }
    if(e.key == "p"){
        songBox.tooglePanel();
    }
},false);

window.addEventListener("keyup",function(e){
    if(e.key == "Shift"){
        changingCurrentTime = false;
    }
},false);


function createCircles(z){
    for(let i=0; i<z.length;i++){
        circleArray.push(new Circle(mapObj[i]));
    }
}

function musicVolumeChange(){
    c.beginPath();
    c.fillStyle = "#fff";
    c.fillRect(canvas.width-232-36,canvas.height-48,28,(-music.volume*200));
    c.fill();
    c.closePath();
}

function drawCursorPosition(){
    c.beginPath();
    c.lineWidth=1;
    c.strokeStyle = "#fff";
    c.moveTo(MX,0);
    c.lineTo(MX,canvas.height);
    c.moveTo(0,MY);
    c.lineTo(canvas.width,MY);
    c.strokeRect(MX-24,MY-24,48,48);
    c.stroke();
    c.closePath();
}


function changeCurrentTime(){
    settingsPanel.closePanel();
    songBox.closePanel();

    c.beginPath();
    c.strokeStyle = "#fff";
    c.moveTo(MX,0);
    c.lineTo(MX,canvas.height);
    c.font = "64px 'Exo 2'";
    c.fillText(mapInNewRange(MX,0,canvas.width,0,music.duration),MX+10,MY+100);
    c.fillStyle = "#cbcbcb11";
    c.fillRect(0,canvas.height-200,MX,200);
    music.currentTime = mapInNewRange(MX,0,canvas.width,0,music.duration);

    resetSettings();
    for(let i=0;i < circleArray.length;i++){
        if(circleArray[i].time > music.currentTime*1000){
            circleArray[i].drawed = false;
            circleArray[i].approachCircle=GLOBALAPPROACHCIRLESIZE;
            
        }else{
            circleArray[i].drawed = true;
        }
        
    }

    c.fill();
    c.stroke();
    c.closePath();
}

function gameLoop(){
    c.clearRect(0,0,canvas.width,canvas.height);
    
    c.textAlign="center"; 
    
    for(let i=circleArray.length-1;i>=0;i--){
        circleArray[i].update();
    }
    
    c.textBaseline="middle"; 

    //MUSIC VOLUME
    if(musicVolumeVisualyzer>0){
        musicVolumeChange();
        musicVolumeVisualyzer--;
    }
    if(changingCurrentTime){
        changeCurrentTime();
        music.play();
    }
    
    //POINTS
    c.textAlign="right"; 
    c.beginPath();
    c.fillStyle = "#fff";
    c.font = "64px 'Exo 2'";
    c.fillText(PScore,canvas.width-24,48);
    c.stroke();
    c.closePath();

    //COMBO
    c.textAlign="left"; 
    c.beginPath();
    c.fillStyle = "#fff";
    c.font = "64px 'Exo 2'";
    c.fillText("x"+PCombo,24,canvas.height-48);
    c.stroke();
    c.closePath();

    gameTime=music.currentTime*1000+80;
    if(exitLoop){return;}
    requestAnimationFrame(gameLoop);

    
    //SCORE SCREEN
    c.textAlign="center"; 
    if(gameTime>circleArray[circleArray.length-2].time){
        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "64px 'Exo 2'";
        c.fillText("Hits: "+hits,canvas.width/2,canvas.height/2-100);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "64px 'Exo 2'";
        c.fillText("Misses: "+miss,canvas.width/2,canvas.height/2+50);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "86px 'Exo 2'";
        c.fillText(Math.round( (hits*100)/(hits+miss) )+"%",canvas.width/2,canvas.height/2+250);
        c.stroke();
        c.closePath();


        //RATING
        c.beginPath();
        c.fillStyle = "#fff";
        c.textBaseline="middle";
        c.font = "128px 'Exo 2'";
        if(miss==0){
            c.fillText("SS",canvas.width/2+256,canvas.height/2);
        }
        else if(miss<32){
            c.fillText("S",canvas.width/2+256,canvas.height/2);
        }
        else if(miss<64){
            c.fillText("A",canvas.width/2+256,canvas.height/2);
        }
        else if(miss<128){
            c.fillText("B",canvas.width/2+256,canvas.height/2);
        }
        else if(miss<256){
            c.fillText("C",canvas.width/2+256,canvas.height/2);
        }
        else{
            c.fillText("D",canvas.width/2+256,canvas.height/2);
        }
        c.stroke();
        c.closePath();

    }
}
