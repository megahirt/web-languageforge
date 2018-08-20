import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';

import {AppModule, getAppName} from '../app.module';
import {CheckingAppModule} from './checking/checking-app.module';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    CheckingAppModule
  ],
  providers: [
    { provide: 'APP_NAME', useFactory: getAppName }
  ]
})
export class ScriptureForgeAppModule extends AppModule { }
