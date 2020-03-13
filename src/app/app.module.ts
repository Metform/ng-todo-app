import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoFilterPipe } from './common/todo.filter.pipe';

const dbConfig = {
  name: 'TodoDb',
  version: 1,
  objectStoresMeta: [{
    store: 'todoList',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'title', keypath: 'title', options: { unique: false } },
      { name: 'description', keypath: 'description', options: { unique: false } },
      { name: 'done', keypath: 'done', options: { unique: false } },
      { name: 'start', keypath: 'start', options: { unique: false } },
      { name: 'end', keypath: 'end', options: { unique: false } }
    ]
  }]
}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    TodoFilterPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [NgxIndexedDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
