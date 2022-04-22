// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import { CommunicationToken } from "./models";
import { TokenCredential } from "./communicationTokenCredential";

/**
 * StaticTokenCredential
 */
export class StaticTokenCredential implements TokenCredential {
  constructor(private readonly token: CommunicationToken) {}

  public async getToken(): Promise<AccessToken> {
    const communicationToken = await this.getCommunicationToken();
    return {
      token: communicationToken.token,
      expiresOnTimestamp: communicationToken.expiresOn.getTime(),
    };
  }

  public async getCommunicationToken(): Promise<CommunicationToken> {
    return this.token;
  }

  public dispose(): void {
    /* intentionally empty */
  }
}
