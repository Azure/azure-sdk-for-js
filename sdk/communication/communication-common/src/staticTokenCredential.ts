// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken } from "@azure/core-auth";
import type { TokenCredential } from "./communicationTokenCredential.js";

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
