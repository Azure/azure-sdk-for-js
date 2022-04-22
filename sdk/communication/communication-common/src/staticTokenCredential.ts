// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken } from "@azure/core-auth";
import { CommunicationToken } from "./models";
import { TokenCredential } from "./communicationTokenCredential";
import { convertToAccessToken } from "./tokenParser";

/**
 * StaticTokenCredential
 */
export class StaticTokenCredential implements TokenCredential {
  constructor(private readonly token: CommunicationToken) {}

  public async getToken(): Promise<AccessToken> {
    const communicationToken = await this.getCommunicationToken();
    return convertToAccessToken(communicationToken);
  }

  public async getCommunicationToken(): Promise<CommunicationToken> {
    return this.token;
  }

  public dispose(): void {
    /* intentionally empty */
  }
}
