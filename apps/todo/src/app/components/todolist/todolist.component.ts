import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { TodoService } from '../../services/todo.service';
import { TODO } from '../../models/todo';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'todo-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit,OnDestroy {
  

  id = 0; 
  str = "";
  limit = 5;
  $endsub : Subject<any> = new Subject();
  todoslist:TODO[] = [];
  newtodolist:TODO[] = [];
  constructor(private todoService:TodoService,private router:Router,private messageService:MessageService) { }

  ngOnInit(): void {
    this._getodos();
  }

  ngOnDestroy(): void {
    this.$endsub.next();
    this.$endsub.complete();
  }
  
  private _getodos() {
    const udata = localStorage.getItem('userdata');
    const userId:{id:string} = JSON.parse(String(udata));
    this.todoService.gettodo(userId).pipe(takeUntil(this.$endsub)).subscribe((data) => {
      
      this.todoslist = data[0].todos;
      const l = this.todoslist.length;
      for(let i = 0; i < l; i++) {
        this.todoslist[i].key = i;      
      }
      
      for(let i = 0; i <= 4 ; i++){
        this.newtodolist[i] = this.todoslist[i];
      }
      console.log(this.newtodolist);
      
    })

  }
  
  update(key: TODO){
    this.router.navigateByUrl(`update/${key.key}`);
    // this.router.navigate([{outlets: {primary: 'home' ,left: `newtodo/${key.key}`,}}]);
  }


  deletenote(keys: TODO){ 
    const udata = localStorage.getItem('userdata');
    const userId:{id:string} = JSON.parse(String(udata));
    this.id = Number(keys.key);
    this.todoService.deletetodo({
      key : this.id,
      id :userId.id
    }).pipe(takeUntil(this.$endsub)).subscribe((data) => {
      
      this.messageService.add({severity:'success', summary: 'Success', detail: "Note is deleted"});
          timer(1000).toPromise().then(() =>{
            this._getodos();
          })
        },
        (err)=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: `${err}`});
        })
  }

  limitincrement(): void{
    this.limit += 5
    for(let i = 0; i <= this.limit-1 ; i++){
      if(i >= this.todoslist.length){
        break;
      }
      this.newtodolist[i] = this.todoslist[i];
    }
    console.log(this.newtodolist);
  }

  s(str: string){
    let regex: RegExp;
    let regexStr: string;
    // eslint-disable-next-line prefer-const
    regexStr = "/"+str + "/" + "i";
    console.log("str"+regexStr);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line prefer-const
    regex = new RegExp(regexStr);
    let c = 0;
    const newlist:TODO[]  = []; 
    for(let i = 0; i < this.todoslist.length; i++) {
      console.log(regex , regexStr);
      regexStr = String(this.todoslist[i].Title);
      if(regex.test(regexStr)) {
        console.log(true);
        newlist[c] = this.todoslist[i];
        c++;
      }
    }
    
    this.newtodolist = newlist;
    this.limit =5;
  }



  
}