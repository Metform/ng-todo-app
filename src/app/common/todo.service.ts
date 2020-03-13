import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Observable, interval, from, BehaviorSubject } from 'rxjs';

export interface ITodo {
  id?: number;
  title: string;
  description: string;
  done: boolean;
  start?: Date;
  end?: Date;
}

@Injectable({
  providedIn: "root"
})
export class TodoService {
  public todoCollection = new BehaviorSubject<ITodo[]>([])

  constructor(private idbService: NgxIndexedDBService) {
    this.getAll()
  }

  async getAll() {
    const items = await this.idbService.getAll<ITodo>('todoList')
    this.todoCollection.next(items)
  }

  async onChecked(id: number) {
    try {
      const item = await this.idbService.getByKey('todoList', id)
      item.done = !item.done
      await this.idbService.update('todoList', { id, ...item })
      this.getAll()
    } catch (error) {
      console.log(error)
    }
  }

  async onAdd(todo: ITodo) {
    try {
      await this.idbService.add("todoList", todo)
      this.getAll()
    } catch (error) {
      console.log(error);
    }
  }

  onEdit(id: number) {
    console.log(id);
  }

  async onRemove(id: number): Promise<any> {
    try {
      await this.idbService.deleteRecord('todoList', id)
      this.getAll()
    } catch (error) {
      console.log(error)
    }
  }
}
