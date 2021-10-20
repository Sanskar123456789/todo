import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TODO } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-newtodo',
  templateUrl: './newtodo.component.html',
  styleUrls: ['./newtodo.component.scss']
})
export class NewtodoComponent  implements OnInit,OnDestroy {

  color ="#808080"
  isupdatemode = false;
  form!: FormGroup;
  id = 0;
  data:TODO ={};
  constructor(private formbuilder: FormBuilder,
    private router:Router,
              private todoService:TodoService,
              private messageService:MessageService,
              private routes :ActivatedRoute) { }
              
              
  $endsub : Subject<any> = new Subject();
  todolist:TODO[] = [];
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      Title : ['',Validators.required],
      Content:['',Validators.required],
    });
    this._checkupdtae();
    this._getdata();
  }

  ngOnDestroy() {
    this.$endsub.next();
    this.$endsub.complete();
  }

  private _checkupdtae(){
    this.routes.params.subscribe(params => {
      if(params.id){
        this.isupdatemode=true;
        this.id = params.id;
        
      }
    })
  }

  private _getdata(){
    if(this.isupdatemode){
      const udata = localStorage.getItem('userdata');
      const userId:{id:string} = JSON.parse(String(udata));
      this.todoService.gettodo(userId).pipe(takeUntil(this.$endsub)).subscribe((data) => {
        this.todolist = data[0].todos;
        const l = this.todolist.length;
        for(let i = 0; i < l; i++) {
          if(i == this.id){
            this.data = this.todolist[i];
          }
        }
        this.form.controls.Title.setValue(this.data.Title);
        this.form.controls.Content.setValue(this.data.Content);
      })
    }
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    else{
      if(this.isupdatemode){

        const udata = localStorage.getItem('userdata');
        const userdata:{id:string} = JSON.parse(String(udata));
        
        // ----------------------------------------------------------------------------------
        this.todoService.updatetodo({
          Title : this.form.controls.Title.value,
          Content : this.form.controls.Content.value,
          key : this.id,
          id : userdata.id
        }).pipe(takeUntil(this.$endsub)).subscribe(() => {
          
            this.messageService.add({severity:'success', summary: 'Success', detail: "Note is Updated"});
            timer(1000).toPromise().then(() =>{this.router.navigate(['/home']);})},
        ()=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: "Note is Not updated"});}
        ) 
      }
      else{
        const udata = localStorage.getItem('userdata');
        const userdata:{id:string} = JSON.parse(String(udata));
        const data = {
          Title : this.form.controls.Title.value,
          Content : this.form.controls.Content.value,
          id:userdata.id
        }
        
        this.todoService.posttodo(data).pipe(takeUntil(this.$endsub)).subscribe(() =>{
          this.messageService.add({severity:'success', summary: 'Success', detail: "Note is added"});
          timer(1000).toPromise().then(() =>{
            this.router.navigate(['/home']);
          })
        },
        ()=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: "Note is not added"});
        })
        
      }
    }
  }

}
