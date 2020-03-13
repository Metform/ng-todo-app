import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.js';
import { TodoService } from '../common/todo.service.js';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {
  @ViewChild('todoTitle') todoTitleEl: ElementRef

  constructor(private todoService: TodoService) { }

  ngOnInit() {}

  ngAfterViewInit() {
    M.Tooltip.init(this.todoTitleEl.nativeElement, {
      enterDelay: 300,
      inDuration: 350,
      position: 'left',
      transitionMovement: 20
    })
  }

  onChecked(id: string) {
    this.todoService.onChecked(id)
  }

  onEdit(id: string) {}

  onRemove(id: string) {
    console.log(`id = `, id)
    this.todoService.onRemove(id)
  }
}
