import { Injectable, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Todo } from './todo.model';
import { randText } from '@ngneat/falso';

@Injectable({ providedIn: 'root' })
export class ToDoService implements OnDestroy {
  private http = inject(HttpClient);

  todoList$ = new BehaviorSubject<Todo[]>([]);
  destroy = new Subject();

  ngOnDestroy(): void {
    this.destroy.next(null);

    this.todoList$.complete();
  }

  /**
   * getTodos
   */
  public getTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  public updateTodo(todo: Todo) {
    todo.title = randText();
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }

  public deleteTodo(todo: Todo) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`
    );
  }
}
