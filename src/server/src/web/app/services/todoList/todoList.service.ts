import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { TodoList } from './todoList.model';

@Injectable()
export class TodoListService {
    private baseUrl = 'api/v1/todo-lists';  // URL to web API

    constructor (private http: Http) {}

    fetch (): Promise<TodoList[]> {
        // TODO - implement bluebird and get rid of helper methods
        return this.http.get(this.baseUrl).toPromise()
            .then((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
