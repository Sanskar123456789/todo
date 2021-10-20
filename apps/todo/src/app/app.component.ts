import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'todo';
  constructor( private router : Router) {}
  ngOnInit() {
    console.log('New');
    this.router.navigate(['/login']);
  }
}
