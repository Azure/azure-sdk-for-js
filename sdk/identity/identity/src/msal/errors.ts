// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CredentialUnavailable } from "../client/errors";

/**
 * Error used to enforce authentication after trying to retrieve a token silently.
 */
export class AuthenticationRequired extends CredentialUnavailable {
  constructor(message?: string) {
    super(message);
    this.name = "AuthenticationRequired";
  }
}
