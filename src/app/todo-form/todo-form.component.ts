import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core"
import { TodoService, ITodo } from "../common/todo.service"
import * as M from "../../../node_modules/materialize-css/dist/js/materialize.min.js"
import * as moment from 'moment'

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.css"]
})
export class TodoFormComponent implements OnInit, AfterViewInit {
  @ViewChild("todoTitle") todoTitle: ElementRef
  @ViewChild("todoDescription") todoDescription: ElementRef
  private todoEnd: any
  private updatedItem: ITodo = null

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.editItem.subscribe({
      next: todo => {
        if (!todo) return
        this.todoTitle.nativeElement.value = todo.title
        this.todoDescription.nativeElement.value = todo.description
        this.todoEnd.el.value = moment(todo.end).format('MMM DD,YYYY')
        this.updatedItem = todo
        M.updateTextFields()
      }
    })
  }

  ngAfterViewInit() {
    const instance = M.Datepicker.init(document.querySelector(".datepicker"), {
      minDate: new Date(),
      autoClose: true
    })
    this.todoEnd = instance
  }

  onUpdate() {
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
    if (this.updatedItem) {
      todo.id = this.updatedItem.id
      todo.end = this.todoEnd.date ? this.todoEnd.date : this.updatedItem.end
      this.todoService.edit(todo)
      this.updatedItem = null
    } else {
      this.todoService.onAdd(todo)
    }
    title.value = ""
    description.value = ""
    this.todoEnd.el.value = ""
    M.updateTextFields()
  }
}
