import React from 'react';
import Form from './form';
import ToDo from './ToDo';
import '../index.css';
const ID = 'TODO_LIST';
class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            todoToShow: "all",
            selectedB: 'All',
        };
    }
    
    
    componentDidMount() {
        let capture = JSON.parse(localStorage.getItem(ID));
        console.warn(capture);
        if (capture === null){
            this.setState({
                todoToShow: "all",
                todos: [],
            })
        }else{
            this.setState({
                todoToShow: "all",
                todos: capture,
            })
        }
        
    }
    addTodo = (todo) => {
        let flag = 0;
        for (let i=0;i<todo.text.length;i++){
            if (todo.text[i] !== ' '){
                flag = 1;
                break;
            }
        }
        if (!flag)  return;
        todo.text = todo.text.trim();
        if (this.state.todos === null){
            this.setState({
                todos: todo
            });
        }else{
            this.setState({
                todos: [todo, ...this.state.todos]
            });
        }
        //alert(this.state.todos);
           
    };
    toggle = (idx, e) => {
        e.preventDefault();
        console.log(e.shiftKey);
        let index;
        let choose = 0;
        if (e.shiftKey){
            for (let i=0;i<this.state.todos.length;i++){
                if (this.state.todos[i].id === idx){
                    if (this.state.todos[i].complete === false){
                        choose = 1;
                    }
                    index = i;
                    break;
                }
            }
            let WhatToChoose = true;

            if (choose === 0){
                WhatToChoose = false;
            }
            let lastOccur = -1;
            for (let i=index;i>=0;i--){
                if (this.state.todos[i].complete === WhatToChoose){
                    lastOccur = i+1;
                    break;
                }
            }
                let currIndex = -1;
                this.setState({
                    todos: this.state.todos.map(todo => {
                        currIndex += 1;
                        if (currIndex < lastOccur || currIndex > index){
                            return todo;
                        }else{
                            return {
                                ...todo,
                                complete: WhatToChoose,
                            }
                        }
                    })
                })
                // Current index to lastOccur should be checked.
        }else{
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
        };
    }
    componentDidUpdate(Pp, Ss){
        if (Ss.todos !== this.state.todos){
            localStorage.removeItem(ID);
            localStorage.setItem(ID, JSON.stringify(this.state.todos));
        }
    }
    update = (e, s) => {
        console.log(e.target.value);
        this.setState({
            todoToShow: s,
            selectedB: e.target.value,
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
    OnEdit = (idx) => {
        let c = prompt();
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === idx){
                    return {
                        ...todo,
                        text: c
                    }
                }else{
                    return todo;
                }
            })
        })
    }
    
    allCheck = () => {
        let compare = [];
        let flag = 0;
        this.state.todos.map(todo => compare.push(todo.complete));
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
        <div className = "Form">
        <Form onSubmit={this.addTodo} onClick={this.allCheck} osos={this.state} />
          {todos.map(todo => (
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