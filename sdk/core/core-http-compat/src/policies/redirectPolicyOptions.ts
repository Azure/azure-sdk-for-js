// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface RedirectPolicyOptions {
  handleRedirects?: boolean;

  /**
   * The maximum number of times the redirect URL will be tried before
   * failing.  Defaults to 20.
   */
  maxRetries?: number;
}
