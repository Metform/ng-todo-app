import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const dbConfig = {
  name: 'TodoDb',
  version: 1,
  objectStoresMeta: [{
    store: 'todoList',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'title', keypath: 'title', options: { unique: false } },
      { name: 'description', keypath: 'description', options: { unique: false } }
    ]
  }]
}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [NgxIndexedDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
