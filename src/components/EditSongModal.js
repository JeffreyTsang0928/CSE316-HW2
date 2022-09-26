import React, { Component } from 'react';

export default class EditSongModal extends Component{
    constructor(props) {
        super(props);
 
         this.state ={
            stateSongName : "",
            stateArtist : "",
            stateYT : ""
        }
        this.titleInput=React.createRef();
        this.artistInput=React.createRef();
        this.YtInput=React.createRef();
    }

    // componentDidMount(){
    //     if(this.props.song !=null && this.props.currList){
    //         this.setState(prevState => ({
    //             stateSongName : this.props.currList[this.props.song].title,
    //             stateArtist : this.props.currList[this.props.song].artist,
    //             stateYT : this.props.currList[this.props.song].youTubeId
    //         }))
    //         console.log("just changed the state with didmount!");
    //     }
    // }

    componentDidUpdate = (prevProps) =>{
        if(this.props.song !== prevProps.song && this.props.currList){
            let list=this.props.currList;
            let songIndex=this.props.song;
            if(list!=null && songIndex!=null){
                // console.log("list and songindex arent null!");
                console.log("setting state to:" + list.songs[songIndex].title)
                this.setState(prevState => ({
                    stateSongName : list.songs[songIndex].title,
                    stateArtist : list.songs[songIndex].artist,
                    stateYT : list.songs[songIndex].youTubeId
                }))
            }
            
        } //IF SONG CHANGED
    }

    handleUpdateSongName = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            stateSongName : event.target.value,
            stateArtist : prevState.stateArtist,
            stateYT : prevState.stateYT
        }));
        console.log("updating song name...");
    }
    handleUpdateArtist= (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            stateSongName : prevState.stateSongName,
            stateArtist : event.target.value,
            stateYT : prevState.stateYT
        }));
        console.log("updating artist...");
    }
    handleUpdateYT = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            stateSongName : prevState.stateSongName,
            stateArtist : prevState.stateArtist,
            stateYT : event.target.value
        }));
        console.log("updating yt id...");
    }

    handleCancel = (event) =>{
        event.preventDefault();
        // this.setState({inputSongName: "",
        // inputArtist: "",
        // inputYT: ""})
        this.props.hideEditSongModalCallback();
        console.log("cancelling!");
    }

    handleEdit = (event) =>{
        event.preventDefault();
        console.log("handling edit with: " + this.titleInput);
        let inputSongName=this.titleInput.current.value;
        let inputArtist=this.artistInput.current.value;
        let inputYT=this.YtInput.current.value;
        this.props.editSongCallback(inputSongName, inputArtist, inputYT);
        // this.setState({inputSongName: "",
        // inputArtist: "",
        // inputYT: ""}) 
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
                                ref={this.titleInput}
                                value={this.state.stateSongName}
                                onChange={this.handleUpdateSongName}
                                onBlur={this.handleUpdateSongName}
                                // defaultValue={this.state.inputSongName || songName}
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
                                ref={this.artistInput}
                                value={this.state.stateArtist}
                                onChange={this.handleUpdateArtist}
                                onBlur={this.handleUpdateArtist}
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
                                ref={this.YtInput}
                                value={this.state.stateYT}
                                onChange={this.handleUpdateYT}
                                onBlur={this.handleUpdateYT}
                                
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