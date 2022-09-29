import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false,
            editActive: false,
        }
    }

    handleClick = (event) => {
        if (event.detail === 2) {
            this.setState(prevState => ({
                isDragging: prevState.isDragging,
                draggedTo: prevState.draggedTo,
                editActive: true
            }));

            event.stopPropagation();
            let songIndex=this.getItemNum()-1;
            this.props.editCallback(songIndex); //PASSES THE SONG INDEX TO CALLBACK
            console.log("passing songnum: " + songIndex);
        }
    }


    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo,
            editActive: prevState.editActive
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true,
            editActive: prevState.editActive
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true,
            editActive: prevState.editActive
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false,
            editActive: prevState.editActive
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        if(targetId !== ""){ //TEMPORARY FIX FROM PIAZZA
            console.log("target id is not null, performing drop!");
            targetId = targetId.substring(target.id.indexOf("-") + 1);
            let sourceId = event.dataTransfer.getData("song");
            sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
            this.setState(prevState => ({
                isDragging: false,
                draggedTo: false,
                editActive: prevState.editActive
            }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
        }
        else{
            console.log("target id is null, we are not dropping it here.");
            this.setState(prevState => ({
                isDragging: false,
                draggedTo: false,
                editActive: prevState.editActive
            }));
        }
    }

    getItemNum = () => {
        return this.props.id.substring("playlist-song-".length);
    }

    handleDeleteSong = (event) => {
        event.stopPropagation();
        let songIndex=this.getItemNum()-1;
        this.props.deleteCallback(songIndex); //PASSES THE SONG INDEX TO CALLBACK
        console.log("passing songnum: " + songIndex);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        console.log("num: " + num);
        let itemClass = "playlister-song";
        if(this.state.isDragging){
            itemClass = "playlister-song-is-dragging";
        }
        else if (this.state.draggedTo) {
            itemClass = "playlister-song-dragged-to";
        }
        if(!song){
            console.log("undefined????");
        }
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onClick={this.handleClick}
                draggable="true"
            >
                {num}.
                <a href={'https://www.youtube.com/watch?v=' + song.youTubeId}
                draggable="false">
                    {song.title} by {song.artist}
                </a>

                <input
                    type="button"
                    id={'remove-song-'+num}
                    className="remove-song-button"
                    onClick={this.handleDeleteSong}
                    value={'\u2715'}
                />
            </div>
        )
    }
}