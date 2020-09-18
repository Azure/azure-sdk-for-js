// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-http";
import { UserCredential } from "./communicationUserCredential";

/**
 * StaticTokenCredential
 */
export class StaticTokenCredential implements UserCredential {
  constructor(private readonly token: AccessToken) {}

  public async getToken(): Promise<AccessToken> {
    return this.token;
  }

  public dispose(): void {
    /* intentionally empty */
  }
}
