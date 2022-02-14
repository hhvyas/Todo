import React from 'react';
import './App.css';
// import Form from './Components/form';
import TodoList from './Components/TodoList';

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <TodoList />  
      </div>
  );
}
}
export default App;