import React from 'react'
import '../index.css';

class ToDo extends React.PureComponent{
    render(){
        return(
            <div className = "form">
            <i class="material-icons circle-toggle" onClick = {this.props.toggle}>{this.props.complete ? 'check_circle_outline' : 'panorama_fish_eye'}</i>
            <div className = "Tasks">
            <div className = 'taskname'>
            <div className = {this.props.complete ? "line inputtext" : "no-line inputtext"} >{this.props.text}</div>
            </div>
            <div className = 'editdelbuttons'>
            <i class="material-icons" onClick = {this.props.Ondelete}>close</i>
            </div>
            </div>
            </div>
        );
    }
}
export default ToDo