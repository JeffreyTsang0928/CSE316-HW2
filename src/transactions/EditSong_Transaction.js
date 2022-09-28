import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initIndex, initNewSong, initOldSong){
        super();
        this.app=initApp;
        this.index=initIndex;
        this.newSong=initNewSong;
        this.oldSong=initOldSong;
    }

    doTransaction(){
        this.app.editSongAtIndex(this.index, this.newSong);
        console.log("editing song at index: " + this.index);
    }
    undoTransaction(){
        this.app.editSongAtIndex(this.index, this.oldSong);
        console.log("undoing edit song");
    }

}