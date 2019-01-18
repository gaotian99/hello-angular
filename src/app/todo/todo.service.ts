import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, Headers } from '@angular/http';
import { Todo } from './todo.model';
import { UUID } from 'angular2-uuid';

//import 'rxjs/add/operator/toPromise';
//import { Observable } from 'rxjs';

//@Injectable({
//  providedIn: 'root'
//})
@Injectable()
export class TodoService {

  private api_url = 'api/todos';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  //todos: Todo[] =[];

  constructor(private httpc:HttpClient) { }

  //POST /todos
  addTodo(desc:string): Promise<Todo> {
    let todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false
    };
    return this.httpc
      .post(this.api_url, todo, this.httpOptions)
      .toPromise()
      .then(res => res as Todo)
      .catch(this.handleError);
  }

// PUT /todos/:id
toggleTodo(todo: Todo): Promise<Todo> {
  const url = `${this.api_url}/${todo.id}`;
  console.log(url);
  let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
  return this.httpc
          .put(url, updatedTodo, this.httpOptions)
          .toPromise()
          .then(() => updatedTodo)
          .catch(this.handleError);
}

// DELETE /todos/:id
deleteTodoById(id: string): Promise<void> {
  const url = `${this.api_url}/${id}`;
  return this.httpc
          .delete(url, this.httpOptions)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
}

// GET /todos
getTodos(): Promise<Todo[]>{
  return this.httpc.get(this.api_url)
            .toPromise()
            .then(res => res as Todo[])
            .catch(this.handleError);
}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
