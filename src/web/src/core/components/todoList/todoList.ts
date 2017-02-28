declare var require: any;

import {Component} from '@angular/core';

@Component({
  selector: 'todo-list',
  template: require('./todoList.html'),
  styles: [require('./todoList.css')]
})

export class TodoList {

  title = 'New Todo List';

  constructor() {

  }

}