// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import { TokenCredential } from "./communicationTokenCredential";

/**
 * StaticTokenCredential
 */
export class StaticTokenCredential implements TokenCredential {
  constructor(private readonly token: AccessToken) {}

  public async getToken(): Promise<AccessToken> {
    return this.token;
  }

  public dispose(): void {
    /* intentionally empty */
  }
}
