
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
        box.classList.add("selection-box");
        box.style.backgroundImage = "url("+ songPath+this.FOLDER+"/"+this.BG+")";
        songBox.appendChild(box);
        box.addEventListener("mouseup",function(){
            init(songPath+this.FOLDER+"/"+this.MAP, songPath+this.FOLDER+"/"+this.SONG, songPath+this.FOLDER+"/"+this.BG);
            console.log("Now Playing:",songPath+this.FOLDER+"/"+this.MAP, songPath+this.FOLDER+"/"+this.SONG);
        }.bind(this),false);
    }
}