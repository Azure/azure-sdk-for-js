// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
// import { EnvironmentCredential } from "./environmentCredential";

// import { ChainedTokenCredential } from "./chainedTokenCredential";

export class ApplicationCredential implements TokenCredential {
  constructor(clientId: string, tenantId: string, authorityHost?: string) {
    clientId = clientId;
    tenantId = tenantId;
    authorityHost = authorityHost;
    //new EnvironmentCredential({authorityHost})
  }
  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    throw new Error("Method not implemented.");
  }
}
