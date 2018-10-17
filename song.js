
class Song{
    constructor(MAP,SONG,FOLDER,BG){
        this.MAP = MAP;
        this.SONG = SONG;
        this.FOLDER = FOLDER;
        this.BG = BG;
        this.box = document.createElement("div");
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
        this.box.classList.add("selection-box");
        this.box.style.backgroundImage = "url("+ songPath+this.FOLDER+"/"+this.BG+")";
        this.box.addEventListener("mouseup",function(){
            init(songPath+this.FOLDER+"/"+this.MAP, songPath+this.FOLDER+"/"+this.SONG, songPath+this.FOLDER+"/"+this.BG);
            console.log("Now Playing:",songPath+this.FOLDER+"/"+this.MAP, songPath+this.FOLDER+"/"+this.SONG);
        }.bind(this),false);
    }

    add(){
        return this.box;
    }
}