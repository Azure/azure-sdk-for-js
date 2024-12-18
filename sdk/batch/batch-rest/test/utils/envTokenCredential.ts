// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/identity";

/**
 * A TokenCredential implementation that gets the token from the environment variable
 * It's only used in browser live tests.
 */
export class EnvTokenCredential implements TokenCredential {
  private token: string;

  constructor() {
    const token = process.env["AZURE_BATCH_ACCESS_TOKEN"];
    if (!token) {
      throw new Error("AZURE_BATCH_ACCESS_TOKEN must be set");
    }
    this.token = token;
  }

  async getToken(): Promise<{ token: string; expiresOnTimestamp: number }> {
    return { token: this.token, expiresOnTimestamp: Date.now() + 60 * 60 * 24 };
  }
}
