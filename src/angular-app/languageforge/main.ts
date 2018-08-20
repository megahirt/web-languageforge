import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {LanguageForgeAppModule} from '../../app/languageforge/language-forge-app.module';
import '../bellows/apps/usermanagement/user-management-app.module';
import '../bellows/main.common';
import './lexicon/lexicon-app.module';

// allow HTML to load before bootstrapping
setTimeout(() => platformBrowserDynamic().bootstrapModule(LanguageForgeAppModule), 0);
