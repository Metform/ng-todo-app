import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TodoService, ITodo } from '../common/todo.service';
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min.js';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit, AfterViewInit {
  @ViewChild('todoTitle') todoTitle: ElementRef
  @ViewChild('todoDescription') todoDescription: ElementRef
  todoEnd: any

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const instance = M.Datepicker.init(document.querySelector('.datepicker'), {
      minDate: new Date(),
      autoClose: true
    });
    this.todoEnd = instance
  }

  onAdd() {
    const title = this.todoTitle.nativeElement
    const description = this.todoDescription.nativeElement
    const todo: ITodo = {
      id: Date.now(),
      title: title.value,
      description: description.value,
      done: false,
      start: new Date(),
      end: this.todoEnd.date ? this.todoEnd.date : null
    }

    this.todoService.onAdd(todo)
    title.value = ''
    description.value = ''
    this.todoEnd.el.value = ''
    M.updateTextFields()
  }
}
