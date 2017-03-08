import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {HomeComponent} from '../home/home';
import {TodoListComponent} from '../todoList/todoList';
import {TodoListService} from '../../services/todoList/todoList.service';

@Component({
    selector: 'app',
    viewProviders: [TodoListService],
    templateUrl: './components/app/app.html',
    styleUrls: ['./components/app/app.css'],
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/home', component: HomeComponent, as: 'Home', useAsDefault: true },
    { path: '/todo-lists/...', component: TodoListComponent, as: 'TodoLists' }
])

export class AppComponent {
}