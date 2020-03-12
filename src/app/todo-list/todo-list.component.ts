import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ITodo } from '../app.component'
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min.js'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {
  @Input() todoItems: ITodo[] = []
  @ViewChild('todoTitle') todoTitleEl: ElementRef

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    M.Tooltip.init(this.todoTitleEl.nativeElement, {
      enterDelay: 300,
      position: 'left',
      transitionMovement: 20
    })
  }

  onChange(id: string) {
    this.todoItems.forEach(todo => todo.id === id ? todo.done = !todo.done : null)
  }

}
