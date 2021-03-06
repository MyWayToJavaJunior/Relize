import {Injectable, EventEmitter, Output} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import "rxjs/Rx";
import {ITodo} from "./todo.model";
import {Observable} from "rxjs/Rx";
import {ApiUrl} from "../../login/apiurl.model";


@Injectable()
export class TodoService {

    @Output() onAdded$ : EventEmitter<ITodo>;

    private apiUrl:string;

    constructor(private http:Http, apiurl:ApiUrl) {
        this.onAdded$ = new EventEmitter<ITodo>();
        this.apiUrl = apiurl.apiUrl + '/api/todos';
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    todoCreated(todo:ITodo):void{
        this.onAdded$.emit(todo);
    }

    getTodoData():Observable<any> {
        return this.http.get(this.apiUrl)
            .map(response => response.json())
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            })
    }

    addTodo(todo:ITodo):Observable<ITodo> {
        let body = JSON.stringify(todo);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        return this.http.post(this.apiUrl, body, options)
            .map(this.extractData)
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            })
    }

    saveTodo(todo:ITodo):Observable<ITodo> {
        let body = JSON.stringify(todo);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        let url = `${this.apiUrl}/${todo.id}`;

        return this.http.put(url, body, options)
            .map(this.extractData)
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            })
    }

    deleteTodo(todo:ITodo):Observable<ITodo> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        let url = `${this.apiUrl}/${todo.id}`;

        return this.http.delete(url, options)
            .map(this.extractData)
            .catch(error => {
                console.error(error);
                return Observable.throw(error.json())
            })
    }
}