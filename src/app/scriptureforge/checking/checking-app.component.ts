import {Component} from '@angular/core';

@Component({
  selector: 'checking-app',
  template: `<h1>Hello {{name}}</h1>`
})
export class CheckingAppComponent  { name = 'Angular 6'; }
