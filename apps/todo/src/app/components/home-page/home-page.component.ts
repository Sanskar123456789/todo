import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'todo-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  ishomepage = true;

  constructor(private router: Router , private routes:ActivatedRoute) { }

  ngOnInit(): void {
    this.ishomepage = true;
  }


  logout(){
    localStorage.removeItem("userdata");
    this.router.navigate([{outlets:{primary: 'home' ,left: 'gtodo'}}]);
    this.router.navigate(['/login']);
  }
  tonewtodo(){
    this.router.navigate([{outlets: {primary: 'home' ,left: 'newtodo'}}]);
    this.ishomepage=false;
  }

  toseetodo(){
    this.router.navigate([{outlets:{primary: 'home' ,left: 'gettodo'}}]);
    this.ishomepage=false;
  }

}
