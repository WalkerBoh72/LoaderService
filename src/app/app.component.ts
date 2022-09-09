import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import {
  BehaviorSubject,
  tap,
  debounceTime,
  fromEvent,
  interval,
  of,
  throwError,
  map, delay
} from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular  ' + VERSION.major;

  private subject = new BehaviorSubject<any>(null);

  constructor(private loading: LoadingService, private http: HttpClient) {}

  ngOnInit() {
    const load1$ = this.http.get<any>(
      'https://becaweb.temporary.it/becawebservice2/weatherforecast/now'
    )
    .pipe(delay(2000));

    this.loading
      .showLoaderUntilComplete(load1$, "a")
      .subscribe((res) => console.log(res));

      const load2$ = this.http.get<any>(
        'https://becaweb.temporary.it/becawebservice2/weatherforecast/now'
      )
      .pipe(delay(4000));
  
      this.loading
        .showLoaderUntilComplete(load2$, "b")
        .subscribe((res) => console.log(res));
  }
}
