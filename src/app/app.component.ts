import { Component, OnInit } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'

export interface ITodo {
  id: string,
  title: string,
  description: string,
  done: boolean,
  date?: Date
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public todoItems: ITodo[] = [
    { id: '1', title: 'buy milk', description: 'house in the village', done: false, date: new Date() }
  ]

  constructor(private dbService: NgxIndexedDBService) {}

  ngOnInit() {}
}
