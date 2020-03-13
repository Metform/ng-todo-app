import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min.js';
import { ITodo, TodoService } from '../common/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {
  private searchString = ''
  private todoItems: ITodo[] = []
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.todoCollection.subscribe({next: todoItems => this.todoItems = todoItems})
  }

  ngAfterViewInit() {
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
      enterDelay: 300,
      inDuration: 350,
      position: 'left',
      transitionMovement: 20
    })
  }

  onChecked(id: number) {
    this.todoService.onChecked(id)
  }

  onEdit(id: number) {
    this.todoService.onEdit(id)
  }

  onRemove(id: number) {
    this.todoService.onRemove(id)
  }

  onPaginate({ target: { textContent } }) {
    console.log(textContent)
  }
}
