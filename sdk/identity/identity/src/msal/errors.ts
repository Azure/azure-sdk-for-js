// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-http";

/**
 * Error used to enforce authentication after trying to retrieve a token silently.
 */
export class AuthenticationRequiredError extends Error {
  constructor(
    /**
     * The list of scopes for which the token will have access.
     */
    public scopes: string[],
    /**
     * The options used to configure the getToken request.
     */
    public getTokenOptions: GetTokenOptions = {},
    message?: string
  ) {
    super(message);
    this.name = "AuthenticationRequiredError";
  }
}
