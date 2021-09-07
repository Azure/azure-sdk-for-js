// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { IdentityClient } from "../../client/identityClient";

/**
 * @internal
 */
export type MSIExpiresInParser = (requestBody: any) => number;

/**
 * @internal
 */
export interface MSIConfiguration {
  identityClient: IdentityClient;
  scopes: string | string[];
  clientId?: string;
}

/**
 * @internal
 */
export interface MSI {
  isAvailable(
    scopes: string | string[],
    identityClient?: IdentityClient,
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ): Promise<boolean>;
  getToken(
    configuration: MSIConfiguration,
    getTokenOptions?: GetTokenOptions
  ): Promise<AccessToken | null>;
}
