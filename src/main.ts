import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdIconRegistry } from '@angular2-material/icon';

import {
  DeterminantAppComponent,
  environment,
  MATRIX_PROVIDERS,
  SessionProvider
} from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(DeterminantAppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  MdIconRegistry,
  MATRIX_PROVIDERS,
  SessionProvider
]);
