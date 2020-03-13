import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from 'ngx-indexed-db'

export interface ITodo {
  id: string;
  title: string;
  description: string;
  done: boolean;
  date?: Date;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  public todoItems: ITodo[] = [
    {
      id: "1",
      title: "buy milk",
      description: "house in the village",
      done: false,
      date: new Date()
    }
  ];

  constructor(private dbService: NgxIndexedDBService) {}

  onChecked(id: string) {
    this.todoItems.forEach(todo =>
      todo.id === id ? (todo.done = !todo.done) : null
    );
  }

  onRemove(id: string) {
      this.todoItems = this.todoItems.filter(todo => todo.id !== id)
  }
}
