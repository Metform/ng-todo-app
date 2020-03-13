import { Component, OnInit } from "@angular/core";
import { ITodo, TodoService } from "../common/todo.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {
  private searchString = "";
  private todoItems: ITodo[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todoCollection.subscribe({
      next: todoItems => {
        if (!todoItems) return
        this.todoItems = todoItems;
      }
    });
  }

  onChecked(id: number) {
    this.todoService.onChecked(id);
  }

  onEdit(id: number) {
    this.todoService.onEdit(id);
  }

  onRemove(id: number) {
    this.todoService.onRemove(id);
  }

  onClearDone() {
    this.todoService.clearAllDone()
  }
}
