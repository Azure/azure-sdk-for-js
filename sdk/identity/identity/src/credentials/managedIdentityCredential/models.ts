// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-http";
import { IdentityClient } from "../../client/identityClient";

export type MSIExpiresInParser = (requestBody: any) => number;

export interface MSI {
  isAvailable(
    identityClient?: IdentityClient,
    resource?: string,
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ): Promise<boolean>;
  getToken(
    identityClient: IdentityClient,
    resource: string,
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ): Promise<AccessToken | null>;
}
