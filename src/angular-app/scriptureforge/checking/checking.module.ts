import {downgradeComponent} from '@angular/upgrade/static';
import * as angular from 'angular';

import {CheckingAppComponent} from '../../../app/scriptureforge/checking/checking-app.component';
import {CoreModule} from '../../bellows/core/core.module';

export const CheckingModule = angular
  .module('checking', [
    CoreModule
  ])
  .directive('checkingApp', downgradeComponent({ component: CheckingAppComponent }) as angular.IDirectiveFactory)
  .name;
