import {Inject} from '@angular/core';
import {UpgradeModule} from '@angular/upgrade/static';

interface AppWindow extends Window {
  appName: string;
}

export abstract class AppModule {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(@Inject(UpgradeModule) private upgrade: UpgradeModule, @Inject('APP_NAME') private appName: string) { }

  // noinspection JSUnusedGlobalSymbols
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [this.appName], { strictDi: true });
  }
}

export function getAppName() {
  return (typeof window !== 'undefined' && (window as AppWindow).appName != null) ? (window as AppWindow).appName :
    null;
}
