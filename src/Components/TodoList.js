import React from "react";
import Form from './Form';
import ToDo from './ToDo';
import '../index.css';
class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            todoToShow: "all",
        };
    }
    
    
    addTodo = (todo) => {
        if (!todo.text.trim())  return;
        todo.text = todo.text.trim(); 
        if (this.state.todos === null){ 
            this.setState({
                todos: todo,
                todoToShow: "all"
            });
        }else{
            this.setState({
                todos: [todo, ...this.state.todos],
                todoToShow: "all"
            });
        }
    };
    toggle = (idx, e) => {
        e.preventDefault();
       
            this.setState({
                todos: this.state.todos.map(todo => {
                    if (todo.id === idx) {
                        return {
                            ...todo,
                            complete: !todo.complete
                     };
                }else{
                    return todo;    
                }
            })
        })
    }

    update = (e, s) => {
        console.log(e.target.value);
        this.setState({
            todoToShow: s,
        })
    }
    Updatedelete = (idx) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== idx)
        });
    };
    deleteAllComplete = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        })
    }

    
    allCheck = () => {
        let compare = [];
        let flag = 0;
        this.state.todos.forEach(todo => compare.push(todo.complete));
        for (let i=0;i<compare.length;i++){
            if (compare[i] === false){
                flag = 1;
                break;
            }
        }
        this.setState({
            todos: this.state.todos.map(todo => {
                return {
                    ...todo,
                    complete: flag === 1 ? true : false,
               }
            })
        })
    }

  render(){ 
    let todos = [];
    let classNamea = 'midbtn';
    let classNameb = 'midbtn';
    let classNamec = 'midbtn';
    if (this.state.todoToShow === "all"){
        todos = this.state.todos;
        classNamea += ' select';
    }else if (this.state.todoToShow === "active"){
        todos = this.state.todos.filter(todo => !todo.complete);
        classNameb += ' select';
    }else if(this.state.todoToShow === "complete"){
        todos = this.state.todos.filter(todo => todo.complete);
        classNamec += ' select';
    }
    return(
      <div>  
        <div className="header">Todo List</div>
        <div className = "Form">

        <Form onSubmit={this.addTodo} onClick={this.allCheck} />
          {todos.length > 0 && todos.map(todo => (
                <ToDo key = {todo.id} toggle={(e) => this.toggle(todo.id, e)} text={todo.text} complete={todo.complete} todo={todo} Ondelete={() => {   
                    this.Updatedelete(todo.id)}
                }/>
          ))}
          </div>
        <div className='footer'>
        <div>
            {this.state.todos.filter(todo => !todo.complete).length} items left
        </div>
        <div className='firstthree'>
            <button value = 'All' className = {classNamea} onClick = {(e) => this.update(e, "all")}>All</button>
            <button value = 'Active' className = {classNameb} onClick = {(e) => this.update(e, "active")}>Active</button>
            <button value='Completed' className = {classNamec} onClick = {(e) => this.update(e, "complete")}>Completed</button>
        </div>
        <div className='last'>
            <button className = 'glow-on-hover' onClick = {this.deleteAllComplete}>Clear completed</button>
        </div>
        </div>
      </div>
    );
  }
}
export default TodoList;