import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {CheckingAppComponent} from './checking-app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ CheckingAppComponent ],
  bootstrap:    [ CheckingAppComponent ]
})
export class CheckingAppModule { }
