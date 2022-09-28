import React from "react";

export default class SidebarHeading extends React.Component {
    handleClick = (event) => {
        const { createNewListCallback } = this.props;
        createNewListCallback();
    };
    render() {
        const { canAddNewList }= this.props;
        let addListClass = "add-list-button";
        if(!canAddNewList){
            addListClass+="-disabled"
        }
        return (
            <div id="sidebar-heading">
                <input 
                    type="button" 
                    id="add-list-button" 
                    className={addListClass}
                    onClick={this.handleClick}
                    value="+"
                    disabled={addListClass.includes("disabled")} />
                Your Playlists
            </div>
        );
    }
}