import { Injectable } from "@angular/core"
import { NgxIndexedDBService } from "ngx-indexed-db"
import { BehaviorSubject } from 'rxjs'

export interface ITodo {
  id: number
  title: string
  description: string
  done: boolean
  start?: Date
  end?: Date
}

@Injectable({
  providedIn: "root"
})
export class TodoService {
  public todoCollection = new BehaviorSubject<ITodo[]>([])
  public editItem = new BehaviorSubject<ITodo>(null)

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
      console.log(error)
    }
  }

  async onEdit(id: number) {
    const item = await this.idbService.getByKey('todoList', id)
    this.editItem.next(item)
  }

  async edit(todo: ITodo) {
    try {
      await this.idbService.update('todoList', { id: todo.id, ...todo })
      this.getAll()
    } catch (error) {
      console.log(error)
    }
  }

  async onRemove(id: number): Promise<any> {
    try {
      await this.idbService.deleteRecord('todoList', id)
      this.getAll()
    } catch (error) {
      console.log(error)
    }
  }

  async clearAllDone() {
    const items = this.todoCollection.value
    for (const key in items) {
        const item = items[key]
        if (item.done) {
          await this.idbService.deleteRecord('todoList', item.id)
        }
    }
    this.getAll()
  }
}
