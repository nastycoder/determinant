import { ApiOptions } from './api-options';
import { Headers } from '@angular/http';

/**
 * Base class for all Api classes.
 */
export class Api {
  public headers: Headers;

  constructor() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }
}