class edgePanel{
    constructor(CLASS,ONLEFT,OPENEDBYDEFAULT,FONTAWESOMEICON){
        this.pos = ONLEFT;
        this.icon = FONTAWESOMEICON;
        if(OPENEDBYDEFAULT){
            this.opened = true; 
        }else{
            this.opened = false;
        }
        this.box = document.createElement("div");
        this.boxToggleButton = document.createElement("div");
        this.box.classList.add(CLASS);
        document.body.appendChild(this.box);
        this.boxToggleButton.addEventListener("click",function(){
            this.tooglePanel();
        }.bind(this),false);
        this.boxToggleButton.innerHTML = this.icon;
        this.boxToggleButton.classList.add(CLASS + "-button");
        document.body.appendChild(this.boxToggleButton);
    }

    tooglePanel(){
        if(this.opened){
            this.closePanel();
        }else{
            this.openPanel();
        }
    }

    openPanel(){
        
        this.box.style.transform = "translateX(0%)";
        this.opened=true;
    }

    closePanel(){
        if(this.pos){
            this.box.style.transform = "translateX(-100%)";
        }else{
            this.box.style.transform = "translateX(100%)"; 
        }
        this.opened=false;
    }

    insert(ELEMENT){
        this.box.appendChild(ELEMENT);
    }
}   

class edgePanelElement{
    constructor(DESC,PANEL){
        this.DESC = DESC;
        this.PANEL = PANEL;
    }
}

class edgePanelCheckbox extends edgePanelElement{
    constructor(ENABLED){
        this.enabled = ENABLED;        
    }
}

class edgePanelSlider{
    constructor(MIN,MAX,STEP){

    }
}



