var songBox = new edgePanel("songBox",false,true,'<i class="fas fa-music"></i>');
var settingsPanel = new edgePanel("settingsPanel",true,false,'<i class="fas fa-cog"></i>');



var CSSlider = document.createElement("input");
CSSlider.type = "range";
CSSlider.setAttribute("min","4");
CSSlider.setAttribute("max","64");
CSSlider.setAttribute("step","0.01");
CSSlider.style.width="90%";
CSSlider.value=16;
CSSlider.addEventListener("mousedown",function(){
    setCircleSize(CSSlider.value);
},false);
settingsPanel.box.appendChild(CSSlider);

function setCircleSize(value){
    GLOBALCIRCLESIZE=value*4;
    GLOBALAPPROACHCIRLESIZE=GLOBALCIRCLESIZE*3
    for(let i=0;i < circleArray.length;i++){
        if(circleArray[i].time > gameTime){
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
settingsPanel.insert(drawCircleHitbox);