class Circle{
    constructor([a,b,c,d]){
        this.posX = parseInt(a)*2+100;
        this.posY = parseInt(b)*2+100;
        this.time = parseInt(c);
        this.drawed=false;
        this.comboData = d; //unused (for now)
        this.ar=400;
        this.approachCircle=GLOBALCIRCLESIZE*3;
        this.COMBO=CCOMBO+1;
        CCOMBO++;
        
    }

    update(){
        if(gameTime>=this.time-this.ar && !this.drawed){
            this.draw();
            if(gameTime>=this.time){
                this.drawed=true;
                
                if((MX>=this.posX-GLOBALCIRCLESIZE-4 && MY>=this.posY-GLOBALCIRCLESIZE-4) && (MX<=this.posX+GLOBALCIRCLESIZE+4 && MY<=this.posY+GLOBALCIRCLESIZE+4)) {
                    PCombo+=1
                    PScore+=300;
                    PScore=PScore+PCombo;
                    let ta = new Audio(clickSound);
                    ta.volume = 0.5;
                    ta.play();
                    hits++;
                }else{
                    if(PCombo>10){
                        let bre = new Audio(missSound);
                        bre.volume = 0.5;
                        bre.play();
                    }
                    miss++;
                    PCombo=0;
                }
            }
        }
    }

    drawHitbox(){
        c.beginPath();
        c.lineWidth=2;
        c.strokeStyle ="#ffffff88";
        c.fillStyle = "#ffffff88";
        c.strokeRect(this.posX-GLOBALCIRCLESIZE-4,this.posY-GLOBALCIRCLESIZE-4, GLOBALCIRCLESIZE*2+8,GLOBALCIRCLESIZE*2+8);
        c.font = GLOBALCIRCLESIZE/3+"px 'Exo 2'";
        c.fillText("X:"+this.posX+"  "+"Y:"+this.posY,this.posX,this.posY-GLOBALCIRCLESIZE-8);
        c.stroke();
        c.fill();
        c.closePath();
    }

    draw(){
        c.lineWidth = 5;
        c.strokeStyle ="#fff";

        c.beginPath();
        c.fillStyle = "purple";
        c.arc((this.posX),(this.posY),GLOBALCIRCLESIZE,0,360,false);
        c.fill();
        c.stroke();
        c.closePath();


        c.beginPath();
        c.textBaseline="middle"; 
        c.font = GLOBALCIRCLESIZE/2.5+"px 'Exo 2'";
        c.fillStyle="#fff";
        c.fillText(this.COMBO,(this.posX),(this.posY));
        c.fill();
        c.stroke();
        c.closePath();

        
        c.beginPath();
        c.fillStyle ="none";
        c.arc((this.posX),(this.posY),this.approachCircle,0,360,false);
        if(this.approachCircle>GLOBALCIRCLESIZE){
            this.approachCircle-=(GLOBALCIRCLESIZE*5)/60;
        }
        c.stroke();
        c.closePath();

        if(drawCircleHitbox){
            c.textBaseline="bottom"; 
            this.drawHitbox();
        }
    }

}