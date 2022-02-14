import React from 'react';
import shortid from 'shortid';
import '../index.css';

class Form extends React.Component{
  constructor(props){
    super(props); 
    this.state = {
      text: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text: this.state.text,
      complete: false,
    })
    this.setState({
      text:''
    })
  }
  render(){
    return(
      <form className = 'inputform' onSubmit = {this.handleSubmit}>
        <div>
        <i class="material-icons inputboxsubmit"  onClick = {() => this.props.onClick()}>expand_more</i>
        </div>
        <div>
      <input
        autoFocus = 'true'
        className = 'inputbox'
        type='texts'
        name="text"
        value={this.state.text}
        onChange={this.handleChange}
        placeholder='What needs to be done ?'
       />
       </div>
        </form>
    );
  }
}
export default Form;