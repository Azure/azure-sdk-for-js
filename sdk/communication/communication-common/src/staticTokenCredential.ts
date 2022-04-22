// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import { TokenCredential } from "./communicationTokenCredential";
import { CommunicationAccessToken } from "./models";

/**
 * StaticTokenCredential
 */
export class StaticTokenCredential implements TokenCredential {
  constructor(private readonly token: CommunicationAccessToken) {}

  public async getToken(): Promise<AccessToken> {
    const communicationToken = await this.getCommunicationToken();
    return {
      token: communicationToken.token,
      expiresOnTimestamp: communicationToken.expiresOn.getTime(),
    };
  }

  public async getCommunicationToken(): Promise<CommunicationAccessToken> {
    return this.token;
  }

  public dispose(): void {
    /* intentionally empty */
  }
}
