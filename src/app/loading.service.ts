import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, debounceTime } from 'rxjs';
import { finalize, concatMap, tap } from 'rxjs/operators';

interface loader {
  name: string;
  loading: boolean;
}

@Injectable()
export class LoadingService {
  _loaders: loader[] = [];

  private loadingSubject = new BehaviorSubject<loader[]>([]);
  loading$: Observable<loader[]> = this.loadingSubject.asObservable();

  constructor() {
    console.log('Loading service created...');
  }

  showLoaderUntilComplete<T>(obs$: Observable<T>, name: string): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn(name)),
      concatMap(() => obs$),
      finalize(() => this.loadingOff(name))
    );
  }

  loadingOn(name: string) {
    this._loaders.push({ name, loading: true });
    this.loadingSubject.next(this._loaders);
    console.log(name + ' On', new Date(),this._loaders);
  }

  loadingOff(name: string) {
    this._loaders=this._loaders.filter(l=>l.name!=name);
    this.loadingSubject.next(this._loaders);
    console.log(name + ' Off', new Date(),this._loaders);
  }

  getLoader$(name: string): Observable<boolean> {
    return of(this._loaders.find(l=>l.name==name)?.loading);
  }
}
