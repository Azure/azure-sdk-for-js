// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unused-vars */

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { TokenCredentialOptions, IdentityClient } from '../client/identityClient';
import * as keytar from 'keytar';
import { CredentialUnavailable } from "../client/errors";

const CommonTenantId = 'common';
const AzureAccountClientId = 'aebc6443-996d-45c2-90f0-388ff96faa56'; // VSC: 'aebc6443-996d-45c2-90f0-388ff96faa56'
const VSCodeUserName = 'VS Code Azure';

/**
 * Connect to Azure using the credential provided by the VSCode extension 'Azure Account'.
 * Once the user has logged in via the extension, this credential can share the same refresh token
 * that is cached by the extension.
 */
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

    // Check to make sure the scope we get back is a valid scope
    if (!scopeString.match(/^[0-9a-zA-Z-.:/]+$/)) {
      throw new Error("Invalid scope was specified by the user or calling client")
    }

    if (scopeString.indexOf("offline_access") < 0) {
      scopeString += " offline_access";
    }

    let refreshToken = await keytar.findPassword(VSCodeUserName);
    if (refreshToken) {
      let tokenResponse = await this.identityClient.refreshAccessToken(
          CommonTenantId,
          AzureAccountClientId,
          scopeString,
          refreshToken,
          undefined
        );
      
      if (tokenResponse) {
        return tokenResponse.accessToken;
      } else {
        throw new CredentialUnavailable("Could not retrieve the token associated with VSCode. Have you connected using the 'Azure Account' extension recently?");
      }
    } else {
      throw new CredentialUnavailable("Could not retrieve the token associated with VSCode. Did you connect using the 'Azure Account' extension?");
    }
  }
}
