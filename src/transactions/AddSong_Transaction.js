import jsTPS_Transaction from "../common/jsTPS.js"

export default class AddSong_Transaction extends jsTPS_Transaction{
    constructor(initApp, initIndex, initSong){
        super();
        this.app=initApp;
        this.index=initIndex;
        this.song=initSong;
    }

    doTransaction(){
        this.app.addSongAtIndex(this.index, this.song);
        console.log("adding song at index: " + this.index);
    }

    undoTransaction(){
        this.app.deleteSongAtIndex(this.index);
        console.log("removing song at index: " + this.index);
    }
}