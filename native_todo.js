import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { CheckBox, Button, Input } from 'react-native-elements';

let id = 0;
let task = '';
let todoData = [];

const Todo = props => (
  <View style={{flexDirection:'row'}}>
    <Text>{props.todo.text}</Text>
    
    <CheckBox
      checked={props.todo.checked}
      onPress={() => props.onToggle(props.todo.id)}
    />
    <Button onPress={() => props.onDelete(props.todo.id)} title="delete" />
  </View>
);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: todoData,
    };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  addTodo() {
    const text = task;
    todoData.push({ id: id++, text: text, checked: false });
    this.setState({
      todos: todoData,
    });
    console.log("add")
    console.log(todoData);
  }

  removeTodo(id) {
    const updatedTodos = todoData.filter(todo => {
      if (todo.id != id) {
        return todo;
      }
    });
    todoData = updatedTodos
    this.setState({
      todos: todoData,
    });
  console.log("remove")
    console.log(todoData)
  }

  toggleTodo(id) {
    const updatedTodos = todoData.map(todo => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });

    this.setState({
      todos: updatedTodos,
    });
  console.log("toggle")
  console.log(todoData);

  }

  render() {
    const tasks = this.state.todos.map(item => (
      <Todo
        key={item.id}
        todo={item}
        onDelete={this.removeTodo}
        onToggle={this.toggleTodo}
      />
    ));

    return (
      <View>
        {tasks}

        <Input
          placeholder="Add a task here"
          onChangeText={value => (task = value)}
        />
        <Button title="Add" onPress={this.addTodo} />
      </View>
    );
  }
}
