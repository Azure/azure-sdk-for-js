// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { IdentityClient, TokenResponseParsedBody } from "../../client/identityClient";

/**
 * @internal
 */
export type MSIExpiresInParser = (requestBody: TokenResponseParsedBody) => number;

/**
 * @internal
 */
export interface MSIConfiguration {
  identityClient: IdentityClient;
  scopes: string | string[];
  clientId?: string;
  resourceId?: string;
}

/**
 * @internal
 */
export interface MSI {
  isAvailable(options: {
    scopes: string | string[];
    identityClient?: IdentityClient;
    clientId?: string;
    resourceId?: string;
    getTokenOptions?: GetTokenOptions;
  }): Promise<boolean>;
  getToken(
    configuration: MSIConfiguration,
    getTokenOptions?: GetTokenOptions
  ): Promise<AccessToken | null>;
}
