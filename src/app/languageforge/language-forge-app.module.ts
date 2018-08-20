import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';

import {AppModule, getAppName} from '../app.module';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    { provide: 'APP_NAME', useFactory: getAppName }
  ]
})
export class LanguageForgeAppModule extends AppModule { }
