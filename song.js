
class Song{
    constructor(MAP,SONG,FOLDER,BG){
        this.MAP = MAP;
        this.SONG = SONG;
        this.FOLDER = FOLDER;
        this.BG = BG;
        this.createOption();
        
    }

    loadMap(){
        return songPath+this.FOLDER+"/"+this.MAP;
    }

    loadMp3(){
        return songPath+this.FOLDER+"/"+this.SONG;
    }

    loadBg(){
        return songPath+this.FOLDER+"/"+this.BG;
    }

    createOption(){
        var box = document.createElement("div");
        box.style.backgroundImage = "url("+ songPath+this.FOLDER+"/"+this.BG+")";
        box.style.backgroundPosition = "center";
        box.style.backgroundSize = "cover";
        box.style.width = "200px";
        box.style.height = "200px";
        box.style.margin = "10px";
        box.style.borderRadius ="15px";
        box.style.border = "2px solid black";
        box.addEventListener("mouseup",function(){
            init(songPath+this.FOLDER+"/"+this.MAP, songPath+this.FOLDER+"/"+this.SONG, songPath+this.FOLDER+"/"+this.BG);
            console.log("Now Playing:",songPath+this.FOLDER+"/"+this.MAP, songPath+this.FOLDER+"/"+this.SONG);
        }.bind(this),false);
        songBox.appendChild(box);
    }
}