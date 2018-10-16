//SONG SELECT
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

//SETTINGS PANEL
var settingsPanel = document.createElement("div");
var settingsPanelOpened=false;
function toggleSettingsPanel(){
    if(settingsPanelOpened){
        settingsPanel.style.transform = "translateX(-100%)";
        settingsPanelOpened=false;
    }else{
        settingsPanel.style.transform = "translateX(0%)";
        settingsPanelOpened=true;
    }
}
settingsPanel.classList.add("settingsPanel");
var settingsPanelToggle = document.createElement("div");
settingsPanelToggle.classList.add("settingsPanelToggle");
settingsPanelToggle.addEventListener("click",function(){
    toggleSettingsPanel();
},false);
document.body.appendChild(settingsPanelToggle);
settingsPanelToggle.innerHTML = '<i class="fas fa-cog"></i>';
document.body.appendChild(settingsPanel);

var CSSlider = document.createElement("input");
CSSlider.type = "range";
CSSlider.setAttribute("min","1");
CSSlider.setAttribute("max","1000");
CSSlider.setAttribute("step","0.01");
CSSlider.style.width="90%";
CSSlider.addEventListener("mousemove",function(){
    setCircleSize(CSSlider.value);
},false);
settingsPanel.appendChild(CSSlider);


function setCircleSize(value){
    GLOBALCIRCLESIZE=value;
    GLOBALAPPROACHCIRLESIZE=GLOBALCIRCLESIZE*3
    for(let i=0;i < circleArray.length;i++){
        if(circleArray[i].time > music.currentTime*1000){
            circleArray[i].approachCircle=GLOBALAPPROACHCIRLESIZE;
        }
    }
}


var drawCircleHitbox=document.createElement("input");
drawCircleHitbox.type = "checkbox";
drawCircleHitbox.classList.add("settingspanel-checkbox");
drawCircleHitbox.addEventListener("click",function(){
    drawCircleHitbox = true;
},false);
settingsPanel.appendChild(drawCircleHitbox);