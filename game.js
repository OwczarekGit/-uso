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

new Song("map.osu","map.mp3","bluezenith","bg.jpg");

new Song("GYZE - HONESTY (Bibbity Bill) [DISHONEST].osu","audio.mp3","honesty","sillyalbumcoverxd.jpg");

new Song("Team Nekokan - Can't Defeat Airman (Blue Dragon) [Holy Shit! It's Airman!!].osu","Can't Defeat Airman.mp3","airman","airman.jpg");

new Song("Camellia - Exit This Earth's Atomosphere (rrtyui) [Evolution].osu","audio.mp3","etea","bg.jpg");

new Song("Halozy - Genryuu Kaiko (Hollow Wings) [Higan Torrent].osu","Gennryuu Kaiko.mp3","gk","gk.jpg");

new Song("DragonForce - Defenders (Spaghetti) [Legend].osu","DragonForce-Defenders.mp3","defenders","BG.png");

new Song("Mili - Summoning 101 (-NeBu-) [Scientific Evocation].osu","audio.mp3","sum101","aarw.jpg");

new Song("Klocuch - Kruci Gang (Peuniak) [Nasz gang jest silny jak mauo ktory].osu","audio.mp3","krucigang","krucigang.jpg");

new Song("Wagakki Band - Tengaku (Shiro) [Uncompressed Fury of a Raging Japanese God].osu","Tengaku.mp3","tengaku","TGBG.jpg");

new Song("dadada.osu","m.mp3","dadada","54ee19bcffffa20b58bc6fc0c042a588.jpg");

new Song("Cartoons - Witch Doctor (Mara) [TAG4].osu","Cartoons - Witch Doctor.mp3","wd","bg.jpg");

new Song("Nico Nico Douga - BARUSA of MIKOSU (DJPop) [TAG4].osu","BARUSA of MIKOSU.mp3","bom","BARUSAofMIKOSU.png");

new Song("IOSYS - Cirno's Perfect Math Class (Louis Cyphre) [TAG4].osu","IOSYS - Cirno's Perfect Math Class.mp3","pmc","moe.jpg");

new Song("Renard - Rainbow Dash Likes Girls (Stay Gay Pony Girl) (ztrot) [Holy Shit! It's Rainbow Dash!!].osu","Renard - Rainbow Dash Likes Girls (Stay Gay Pony Girl).mp3","rdlg","RD-Salute1.png");



new Song("Knife Party - Centipede (Sugoi-_-Desu) [This isn't a map, just a simple visualisation].osu","02-knife_party-centipede.mp3","cent","cent.jpg");

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
        toggleSongBox();
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

function changeCurrentTime(){
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

    c.textBaseline="Alphabetic"; 

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
    c.fillText(PScore,canvas.width-16,72);
    c.stroke();
    c.closePath();

    //COMBO
    c.textAlign="left"; 
    c.beginPath();
    c.fillStyle = "#fff";
    c.font = "64px 'Exo 2'";
    c.fillText("x"+PCombo,24,canvas.height-24);
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
