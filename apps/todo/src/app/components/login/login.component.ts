import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  $endsub : Subject<any> = new Subject();
  iserror= false;
  message=""
  form!: FormGroup;
  constructor(private formbuilder: FormBuilder,private router:Router,private auth:LoginService,private messageService:MessageService) { }

  ngOnDestroy() {
    this.$endsub.next();
    this.$endsub.complete();
  }
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }

  onSubmit(){
    if(this.form.invalid){
      return
    }else{
      const data ={
        email:this.form.controls.email.value,
        password:this.form.controls.password.value
      }
      
      this.auth.checkuser(data).pipe(takeUntil(this.$endsub)).subscribe(data =>{
        this.iserror=data.Success;  
        if(!this.iserror){
          this.messageService.add({severity:'error', summary: 'Error', detail: "User Not Found"});
        }else{
          localStorage.setItem('userdata',JSON.stringify({id:data.Userdata[0]._id}));
          this.router.navigate(['/home']);
        }
      })
    }
  }

  signin(){
    this.router.navigate(['/new']);
  }


}
