import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoadingService } from './loading.service';
import { LoadingComponent } from './loading/loading.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, LoadingComponent, ],
  bootstrap:    [ AppComponent ],
  providers: [LoadingService]
})
export class AppModule { }
