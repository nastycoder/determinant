/**
 * Creates `ApiOptions` instance from provided values. This values govern
 * various aspects of the API interaction. (Still fleshing this out, hence the
 * vagueness)
 *
 * All values are null by default. Typical defaults can be found in the {@link
 * BaseApiOptions} class, which sub-classes `ApiOptions`
 */
import { Injectable } from '@angular/core';

import { ApiOptionsArgs } from './interfaces';

export class ApiOptions {
  /**
   * Host to use for authentication request.
   */
  identity_host: string;

  /**
   * Host to use as Home server.
   */
  home_host: string;

  constructor({ identity_host, home_host }: ApiOptionsArgs) {
    this.identity_host = (identity_host) ? identity_host : null;
    this.home_host = (home_host) ? home_host : null;
  }
}

/**
 * Subclass of {@link ApiOptions}, with default values.
 *
 * Default values:
 *  * identity_host: 'https://matrix.org'
 *  * home_host: 'https://matrix.org'
 *
 */
@Injectable()
export class BaseApiOptions extends ApiOptions {
  constructor() {
    super({
      identity_host: 'https://matrix.org',
      home_host: 'https://matrix.org'
    });
  }
}