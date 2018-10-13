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
var songPath = "songs/";
var clickSound = "clickfeedback.wav";
var songBox = document.createElement("div");
songBox.style.position = "absolute";
songBox.style.right = "0";
songBox.style.top = "10px";
songBox.style.height = "100%";
songBox.style.background = "transparent";
//songBox.style.display = "flex";
//songBox.style.justifyContent = "center";
//songBox.style.alignItems = "center";
//songBox.style.flexDirection = "column";
songBox.style.margin = "0 auto";
songBox.style.overflowY = "scroll";
document.body.appendChild(songBox);
var songVolume = document.createElement("input");
songVolume.setAttribute("type","range");
songVolume.setAttribute("value","0.5");
songVolume.setAttribute("min","0.0");
songVolume.setAttribute("max","1.0");
songVolume.setAttribute("step","0.05");
songVolume.addEventListener("click",function(){
    music.volume = songVolume.value;
},false);
songBox.appendChild(songVolume);

var zenith = new Song("map.osu","map.mp3","bluezenith","bg.jpg");
var honesty = new Song("GYZE - HONESTY (Bibbity Bill) [DISHONEST].osu","audio.mp3","honesty","sillyalbumcoverxd.jpg");

var zenith = new Song("Halozy - Genryuu Kaiko (Hollow Wings) [Higan Torrent].osu","Gennryuu Kaiko.mp3","gk","gk.jpg");

var defenders = new Song("DragonForce - Defenders (Spaghetti) [Legend].osu","DragonForce-Defenders.mp3","defenders","BG.png");

var krucigang = new Song("Klocuch - Kruci Gang (Peuniak) [Nasz gang jest silny jak mauo ktory].osu","audio.mp3","krucigang","krucigang.jpg");

var tengaku = new Song("Wagakki Band - Tengaku (Shiro) [Uncompressed Fury of a Raging Japanese God].osu","Tengaku.mp3","tengaku","TGBG.jpg");

var dadada = new Song("dadada.osu","m.mp3","dadada","54ee19bcffffa20b58bc6fc0c042a588.jpg");

var wd = new Song("Cartoons - Witch Doctor (Mara) [TAG4].osu","Cartoons - Witch Doctor.mp3","wd","bg.jpg");

var bom = new Song("Nico Nico Douga - BARUSA of MIKOSU (DJPop) [TAG4].osu","BARUSA of MIKOSU.mp3","bom","BARUSAofMIKOSU.png");

var pmc = new Song("IOSYS - Cirno's Perfect Math Class (Louis Cyphre) [TAG4].osu","IOSYS - Cirno's Perfect Math Class.mp3","pmc","moe.jpg");

var pmc = new Song("Renard - Rainbow Dash Likes Girls (Stay Gay Pony Girl) (ztrot) [Holy Shit! It's Rainbow Dash!!].osu","Renard - Rainbow Dash Likes Girls (Stay Gay Pony Girl).mp3","rdlg","RD-Salute1.png");

var cent = new Song("Knife Party - Centipede (Sugoi-_-Desu) [This isn't a map, just a simple visualisation].osu","02-knife_party-centipede.mp3","cent","cent.jpg");


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
            mapObj.push(temp0[i].split(",",3));
        }

        createCircles(mapObj);
    });

    setTimeout(function(){
        c.clearRect(0,0,canvas.width,canvas.height);
        exitLoop = false;
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


function createCircles(z){
    for(let i=0; i<z.length;i++){
        circleArray.push(new Circle(mapObj[i]));
        //console.log(1);
    }
    //console.log(circleArray);
}

function gameLoop(){
    //c.clearRect(0,0,1000,1000);
    c.clearRect(0,0,2000,2000);
    for(let i=circleArray.length-1;i>=0;i--){
        circleArray[i].update();
        //console.log(circleArray[i].update());
    }

    c.beginPath();
    c.fillStyle = "#fff";
    c.font = "48px Arial";
    c.fillText(PScore,1300,60);
    c.stroke();
    c.closePath();

    c.beginPath();
    c.fillStyle = "#fff";
    c.font = "64px Arial";
    c.fillText("x"+PCombo,20,900);
    c.stroke();
    c.closePath();

    gameTime=music.currentTime*1000+80;
    if(exitLoop){return;}
    requestAnimationFrame(gameLoop);
    if(gameTime>circleArray[circleArray.length-2].time){
        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "64px Arial";
        c.fillText("Hits: "+hits,canvas.width/2-100,canvas.height/2-100);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "64px Arial";
        c.fillText("Misses: "+miss,canvas.width/2-100,canvas.height/2+50);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "86px Arial";
        c.fillText(Math.round( (hits*100)/(hits+miss) )+"%",canvas.width/2-50,canvas.height/2+250);
        c.stroke();
        c.closePath();


        //RATING
        c.beginPath();
        c.fillStyle = "#fff";
        c.font = "128px Arial";
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
