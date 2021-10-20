import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  callbackValue=false;
  
  constructor(private router: Router,private user:LoginService) { }
  canActivate(){
    
    const udata = localStorage.getItem('userdata');
    if(!udata){
      this.router.navigate(['/']);
    }
    else{
      const userdata:{id:string} = JSON.parse(String(udata));
      
      this.user.checkisuser(userdata).subscribe(res=>{
        if(res){
          this.callbackValue = true;
        }
      });

      return this.callbackValue;
    }
    this.router.navigate(['/']);
    return false;
  }
}

