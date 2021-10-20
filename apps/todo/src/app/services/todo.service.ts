import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // api = "http://localhost:3000/todo/data/notes";
  api ="https://todos123.herokuapp.com/todo/data/notes";
// production one ^
constructor(private http : HttpClient) { }

posttodo(notes:{Title: string,id: string,Content: string}):Observable<any> {
 return this.http.post(`${this.api}/addtodo`,notes)
}

gettodo(id:{id:string}):Observable<any>{
 return this.http.post<any>(`${this.api}/getodo`,id);
}

updatetodo(data:{Title:string ,Content: string , id: string , key: number}):Observable<any>{
 return this.http.put<any>(`${this.api}/updatetodo`,data);
}

deletetodo(data:{key: number,id: string}):Observable<any>{
 return this.http.put<any>(`${this.api}/removetodo`,data);
}

searchtodo(data1:{str : string}): Observable<any>{
  return this.http.post<any>(`${this.api}/searchtodo` , data1);
}
}
