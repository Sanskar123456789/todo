
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'todo-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit,OnDestroy{

  $endsub : Subject<any> = new Subject();
  form!: FormGroup;
  constructor(private formbuilder: FormBuilder,private router:Router,private authService:LoginService,private messageService:MessageService) { }
  
  ngOnDestroy() {
    this.$endsub.next();
    this.$endsub.complete();
  }
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      name:['',Validators.required],
      phone:['']
    })
  }

  onSubmit(){
    if(this.form.invalid){
      return
    }else{
      const data ={
        email:this.form.controls.email.value,
        password:this.form.controls.password.value,
        name:this.form.controls.name.value,
        phone:this.form.controls.phone.value,
      }
      this.authService.postuser(data).pipe(takeUntil(this.$endsub)).subscribe(data =>{
        if(data.Success){
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User Registered'});
          timer(700).toPromise().then(() =>{
            this.router.navigate(['/login']);
          })
        }
        else{
          this.messageService.add({severity:'error', summary: 'Error', detail: data.Message});
        }
      })
    }
  }



}
