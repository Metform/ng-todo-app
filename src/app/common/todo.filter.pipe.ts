import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from './todo.service';

@Pipe({
  name: 'todo_filter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todoList: ITodo[], query?: string): ITodo[] {
    if(!query.trim()) return todoList
    return todoList.filter(todo => todo.title.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
}
