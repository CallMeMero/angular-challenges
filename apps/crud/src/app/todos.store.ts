import { Injectable, inject } from '@angular/core';
import { CallStateComponentStore } from '@angular-challenges/ngrx-callstate-store';
import { OnStateInit, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { Todo } from './todo.model';
import { ToDoService } from './todo.service';
import { pipe, switchMap, tap } from 'rxjs';
import { randomErrorHttp } from '@angular-challenges/shared/utils';

@Injectable()
export class TodosStore
  extends CallStateComponentStore<{ todos: Todo[] }>
  implements OnStateInit, OnStoreInit
{
  private todoService = inject(ToDoService);
  private readonly todos$ = this.select((state) => state.todos);

  readonly vm$ = this.select(
    {
      todos: this.todos$,
      loading: this.isLoading$,
      error: this.error$,
    },
    { debounce: true }
  );

  readonly updateTodo = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? { ...todo } : t)),
  }));

  readonly deleteTodoState = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== todo.id),
  }));

  readonly fetchTodo = this.effect<void>(
    pipe(
      tap(() => this.startLoading()),
      switchMap(() =>
        randomErrorHttp({
          httpRequest: () => this.todoService.getTodos(),
        }).pipe(
          tapResponse(
            (todos) => this.stopLoading({ todos }),
            (error: unknown) => this.handleError(error)
          )
        )
      )
    )
  );

  ngrxOnStateInit() {
    this.fetchTodo();
  }
  ngrxOnStoreInit() {
    this.setInitState({ todos: [] });
  }
}
