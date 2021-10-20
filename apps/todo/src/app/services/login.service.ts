import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

    // api = "http://localhost:3000/todo/data/users";
    api ="https://todos123.herokuapp.com/todo/data/users";
    // production one ^
      constructor(private http: HttpClient) { }
    
      checkuser(data:{email: string, password: string}): Observable<any> {
        return this.http.post<any>(`${this.api}/useremail`,data);
      }
    
      postuser(data:{email: string, password: string,phone: number,name: string}): Observable<any>{
        return this.http.post<any>(`${this.api}`,data);
      }
    
      checkisuser(data:{id:string}): Observable<any>{
        return this.http.post<any>(`${this.api}/isvaliduser`,data);
      }
}
