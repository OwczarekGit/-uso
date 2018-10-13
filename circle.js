class Circle{
    constructor([a,b,c]){
        this.posX = parseInt(a)*2;
        this.posY = parseInt(b)*2;
        this.time = parseInt(c);
        this.drawed=false;
        this.CS=76;
        //console.log(this);
        this.ar=400;
        this.arC=this.CS*3;
        this.COMBO=CCOMBO+1;
        CCOMBO++;
        
    }

    update(){
        if(gameTime>=this.time-this.ar && !this.drawed){
            this.draw();
            if(gameTime>=this.time){
                this.drawed=true;
                
                if((MX-this.CS/3>=this.posX-this.CS/3 && MY-this.CS/3>=this.posY-this.CS/3) && (MX+this.CS<=this.posX+this.CS*5 && MY+this.CS<=this.posY+this.CS*5)) {
                    PCombo+=1
                    PScore+=300;
                    PScore=PScore+PCombo;
                    let ta = new Audio(clickSound);
                    ta.volume = 0.5;
                    ta.play();
                    hits++;
                }else{
                    if(PCombo>10){
                        let bre = new Audio("combobreak.mp3");
                        bre.volume = 0.5;
                        bre.play();
                    }
                    miss++;
                    PCombo=0;
                }
            }
        }
    }

    draw(){
        //console.log(this.time);
        c.beginPath();
        c.fillStyle = "purple";
        c.font = "30px Arial";
        c.arc((this.posX)+100,(this.posY)+100,this.CS,0,360,false);
        c.fill();
        c.fillStyle = "#fff";
        c.fillText(this.COMBO,(this.posX)+80,(this.posY)+110);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.fillStyle ="none";
        c.strokeStyle = "#fff";
        c.arc((this.posX)+100,(this.posY)+100,this.arC,0,360,false);
        if(this.arC>this.CS){
            this.arC-=6;
        }
        c.lineWidth=6;
        c.stroke();
        c.closePath();

        

    }

}