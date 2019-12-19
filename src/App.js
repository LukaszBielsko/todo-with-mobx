import React, { Component } from "react";
import { observable, computed, decorate } from "mobx";
import { observer } from "mobx-react";

class Todo {
  constructor(title) {
    this.title = title;
  }
}

class TodoList {
  todolist = [];
  get list() {
    return this.todolist;
  }
}

// make below properties observable
decorate(Todo, { title: observable });
decorate(TodoList, { todolist: observable });

// make below an obsever
const ShowTodoList = observer(
  class ShowTodoList extends Component {
    render() {
      return this.props.todolist.map(todo => <p>{todo.title}</p>);
    }
  }
);

const store = new TodoList();
store.todolist.push(new Todo("make your bed"), new Todo("do sth"));

class App extends Component {
  render() {
    return <ShowTodoList todolist={store.todolist} />;
  }
}

/*
  assign store go global variable store
  when below is entered in the console  
  store.list.push({title: 'do sth else'})
  new todo item will be rendered to the screen
*/
window.store = store;

export default App;
