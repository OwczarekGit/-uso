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

var songBox = document.createElement("div");
var songBoxOpened=true;
function toggleSongBox(){
    if(songBoxOpened){
        songBox.style.transform = "translateX(100%)";
        songBoxOpened=false;
    }else{
        songBox.style.transform = "translateX(0%)";
        songBoxOpened=true;
    }
}
songBox.classList.add("songBox");
var songBoxToggle = document.createElement("div");
songBoxToggle.classList.add("songBoxToggle");
songBoxToggle.addEventListener("click",function(){
    toggleSongBox();
},false);
document.body.appendChild(songBoxToggle);
songBoxToggle.innerHTML = '<i class="fas fa-music"></i>';
document.body.appendChild(songBox);



new Song("map.osu","map.mp3","bluezenith","bg.jpg");

new Song("GYZE - HONESTY (Bibbity Bill) [DISHONEST].osu","audio.mp3","honesty","sillyalbumcoverxd.jpg");

new Song("Team Nekokan - Can't Defeat Airman (Blue Dragon) [Holy Shit! It's Airman!!].osu","Can't Defeat Airman.mp3","airman","airman.jpg");

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


//init(zenith.loadMap(),zenith.loadMp3());
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

function gameLoop(){
    c.clearRect(0,0,canvas.width,canvas.height);
    for(let i=circleArray.length-1;i>=0;i--){
        circleArray[i].update();
    }

    //MUSIC VOLUME
    if(musicVolumeVisualyzer>0){
        musicVolumeChange();
        musicVolumeVisualyzer--;
    }

    c.beginPath();
    c.fillStyle = "#fff";
    c.font = "48px 'Exo 2'";
    let scoreX = ((PScore.toString().length)*48)-14*(PScore.toString().length);
    c.fillText(PScore,canvas.width-scoreX,48);
    c.stroke();
    c.closePath();

    c.beginPath();
    c.fillStyle = "#fff";
    c.font = "64px 'Exo 2'";
    c.fillText("x"+PCombo,24,canvas.height-24);
    c.stroke();
    c.closePath();

    gameTime=music.currentTime*1000+80;
    if(exitLoop){return;}
    requestAnimationFrame(gameLoop);

    

    if(gameTime>circleArray[circleArray.length-2].time){
        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "64px 'Exo 2'";
        c.fillText("Hits: "+hits,canvas.width/2-100,canvas.height/2-100);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "64px 'Exo 2'";
        c.fillText("Misses: "+miss,canvas.width/2-100,canvas.height/2+50);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "86px 'Exo 2'";
        c.fillText(Math.round( (hits*100)/(hits+miss) )+"%",canvas.width/2-50,canvas.height/2+250);
        c.stroke();
        c.closePath();


        //RATING
        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "128px 'Exo 2'";
        if(miss==0){
            c.fillText("SS",canvas.width/2+300,canvas.height/2);
        }
        else if(miss<32){
            c.fillText("S",canvas.width/2+300,canvas.height/2);
        }
        else if(miss<64){
            c.fillText("A",canvas.width/2+300,canvas.height/2);
        }
        else if(miss<128){
            c.fillText("B",canvas.width/2+300,canvas.height/2);
        }
        else if(miss<256){
            c.fillText("C",canvas.width/2+300,canvas.height/2);
        }
        else{
            c.fillText("D",canvas.width/2+300,canvas.height/2);
        }
        c.stroke();
        c.closePath();

    }
}
