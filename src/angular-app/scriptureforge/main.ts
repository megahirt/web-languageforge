import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ScriptureForgeAppModule} from '../../app/scriptureforge/scripture-forge-app.module';
import '../bellows/apps/translate/translate-app.module';
import '../bellows/main.common';
import './checking/checking.module';
import './sfchecks/sf-checks-app.module';

// allow HTML to load before bootstrapping
setTimeout(() => platformBrowserDynamic().bootstrapModule(ScriptureForgeAppModule), 0);
