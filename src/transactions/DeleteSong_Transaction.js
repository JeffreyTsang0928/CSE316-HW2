import jsTPS_Transaction from "../common/jsTPS.js"

export default class DeleteSong_Transaction extends jsTPS_Transaction{
    constructor(initApp, initIndex, initSong){
        super();
        this.app=initApp;
        this.songIndex=initIndex;
        this.song=initSong;
    }

    doTransaction(){
        this.app.deleteSongAtIndex(this.songIndex);
        console.log("deleting song at index: " + this.songIndex);
    }

    undoTransaction(){
        this.app.addSongAtIndex(this.songIndex, this.song);
        console.log("undoing delete!");
    }
}