// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { TokenCredentialOptions } from "../client/identityClient";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";

// import { ChainedTokenCredential } from "./chainedTokenCredential";

export class ApplicationCredential implements TokenCredential {
  constructor(clientId: string, tenantId: string, authorityHost?: string) {
    clientId = clientId;
    tenantId = tenantId;
    authorityHost = authorityHost;
    new ManagedIdentityCredential(clientId);
    new EnvironmentCredential({ authorityHost });
  }
  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    throw new Error("Method not implemented.");
  }
}

export interface ApplicationCredentialOptions extends TokenCredentialOptions {
  /**
   * Optionally pass in a Tenant ID to be used as part of the credential
   */
  secretId?: string;
}
