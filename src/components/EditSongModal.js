import React, { Component } from 'react';

export default class EditSongModal extends Component{
    constructor(props) {
        super(props);
 
        this.state = {
            inputSongName: "",
            inputArtist: "",
            inputYT: ""
        }

        let songName=props.currList[props.song].title;
        let inputArtist=props.currList[props.song].artist;
        let inputYT=props.currList[props.song].youTubeId;
        if(props.currList && props.song!=null){
            // this.state ={
            //     inputSongName : currList[song].title,
            //     inputArtist : currList[song].artist,
            //     inputYT : currList[song].youTubeId
            // }
            console.log("props currlist and props song is not null!??!?!!");
         }   
    }

    setDefaultValues(songName, artistName, ytId){
        this.setState(prevState => ({
            inputSongName : songName,
            inputArtist : artistName,
            inputYT : ytId
        }))
    }

    handleUpdateSongName = (event) => {
        this.setState({ inputSongName: event.target.value });
        console.log("updating song name...");
    }
    handleUpdateArtist= (event) => {
        this.setState({ inputArtist: event.target.value });
        console.log("updating artist...");
    }
    handleUpdateYT = (event) => {
        this.setState({ inputYT: event.target.value });
        console.log("updating yt id...");
    }

    handleCancel = (event) =>{
        this.setState({inputSongName: "",
        inputArtist: "",
        inputYT: ""})
        this.props.hideEditSongModalCallback();
        console.log("cancelling!");
    }

    handleEdit = (event) =>{
        this.props.editSongCallback(this.state.inputSongName, this.state.inputArtist, this.state.inputYT);
    }



    render() {
        const { currList, song, 
            // editSongCallback, 
            // hideEditSongModalCallback 
        } = this.props;
        let songName="";
        let artist="";
        let youTubeId="";
        console.log("value of song passed to edit modal: " + song);
        if(song!=null && currList){
            songName=currList.songs[song].title;
            artist=currList.songs[song].artist;
            youTubeId=currList.songs[song].youTubeId;
        }
        console.log("current songname passed to edit modal: " + songName);
        console.log("current artist passed to edit modal: " + artist);
        console.log("current yt id passed to edit modal: " + youTubeId);


    
        return (
            <div 
                class="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-edit-song-root'>
                        <div class="modal-north">
                            Edit Song
                        </div>
                        <div class="modal-center">
                            <div 
                                id="title-prompt" 
                                class="modal-prompt">
                                Title:
                            </div>
                            <input 
                                id="edit-song-modal-title-textfield" 
                                class='modal-textfield' 
                                type="text" 
                                onChange={this.handleUpdateSongName}
                                onBlur={this.handleUpdateSongName}
                                defaultValue={this.state.inputSongName} 
                            />
                            <div 
                                id="artist-prompt" 
                                class="modal-prompt">
                                Artist:
                            </div>
                            <input 
                                id="edit-song-modal-artist-textfield" 
                                class='modal-textfield' 
                                type="text" 
                                onChange={this.handleUpdateArtist}
                                onBlur={this.handleUpdateArtist}
                                defaultValue={artist} 
                            />
                            <div 
                                id="you-tube-id-prompt" 
                                class="modal-prompt">
                                You Tube Id:
                            </div>
                            <input 
                                id="edit-song-modal-youTubeId-textfield" 
                                class='modal-textfield' 
                                type="text" 
                                onChange={this.handleUpdateYT}
                                onBlur={this.handleUpdateYT}
                                defaultValue={youTubeId} 
                            />
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                class="modal-button" 
                                onClick={this.handleEdit}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                class="modal-button" 
                                onClick={this.handleCancel}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }
}