import { CallStateComponentStore } from '@angular-challenges/ngrx-callstate-store';
import { Injectable, inject } from '@angular/core';
import { Todo } from './todo.model';
import { ToDoService } from './todo.service';
import { TodosStore } from './todos.store';
import { pipe, switchMap, tap } from 'rxjs';
import { randomErrorHttp } from '@angular-challenges/shared/utils';
import { tapResponse } from '@ngrx/component-store';

@Injectable()
export class TodoItemStore extends CallStateComponentStore<{ todo: Todo }> {
  private todoService = inject(ToDoService);
  private todosStore = inject(TodosStore);

  private readonly todo$ = this.select((state) => state.todo);

  readonly vm$ = this.select(
    {
      todo: this.todo$,
      loading: this.isLoading$,
      error: this.error$,
    },
    { debounce: true }
  );

  readonly updateTodo = this.effect<Todo>(
    pipe(
      tap(() => this.startLoading()),
      switchMap((todo) =>
        randomErrorHttp({
          httpRequest: () => this.todoService.updateTodo(todo),
        }).pipe(
          tapResponse(
            (todo) => {
              this.stopLoading();
              this.todosStore.updateTodo(todo);
            },
            (error: unknown) => this.handleError(error)
          )
        )
      )
    )
  );

  readonly deleteTodo = this.effect<Todo>(
    pipe(
      tap(() => this.startLoading()),
      switchMap((todo) =>
        randomErrorHttp({
          httpRequest: () => this.todoService.deleteTodo(todo),
        }).pipe(
          tapResponse(
            () => {
              this.stopLoading();
              this.todosStore.deleteTodoState(todo);
            },
            (error: unknown) => this.handleError(error)
          )
        )
      )
    )
  );
}
