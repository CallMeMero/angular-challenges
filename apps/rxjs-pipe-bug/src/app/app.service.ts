import { inject, Injectable } from '@angular/core';
import { first, forkJoin, map, Observable, switchMap } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAll$ = this.dbService.infos$;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    return this.dbService.searchByType(type).pipe(
      first(),
      switchMap((topicToDelete) =>
        forkJoin(
          topicToDelete.map((t) => this.dbService.deleteOneTopic(t.id))
        ).pipe(map((deletedTopics) => deletedTopics.every((k) => k === true)))
      )
    );
  }
}
