// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions, IdentityClient } from '../client/identityClient';
import * as keytar from 'keytar';

const commonTenantId = 'common';
const clientId = 'aebc6443-996d-45c2-90f0-388ff96faa56'; // VSC: 'aebc6443-996d-45c2-90f0-388ff96faa56'

export class VSCodeCredential implements TokenCredential {
  private identityClient: IdentityClient;

  constructor(
    options?: TokenCredentialOptions
  ) {
    this.identityClient = new IdentityClient();
  }

  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    let scopeString = typeof scopes === "string" ? scopes : scopes.join(" ");
    if (scopeString.indexOf("offline_access") < 0) {
      scopeString += " offline_access";
    }    
    let refreshToken = await keytar.findPassword("VS Code Azure");
    if (refreshToken) {
      let tokenResponse = await this.identityClient.refreshAccessToken(
          commonTenantId,
          clientId,
          scopeString,
          refreshToken,
          undefined
        );
      
      if (tokenResponse) {
        return tokenResponse.accessToken;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
