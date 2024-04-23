// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";

import { IdentityClient } from "../../client/identityClient";

/**
 * @internal
 */
export interface MSIConfiguration {
  retryConfig: {
    maxRetries: number;
    startDelayInMs: number;
    intervalIncrement: number;
  };
  identityClient: IdentityClient;
  scopes: string | string[];
  clientId?: string;
  resourceId?: string;
}

/**
 * @internal
 * Represents an access token for {@link ManagedIdentity} for internal usage,
 * with an expiration time and the time in which token should refresh.
 */
export declare interface MSIToken extends AccessToken {}

/**
 * @internal
 */
export interface MSI {
  name: string;
  isAvailable(options: {
    scopes: string | string[];
    identityClient?: IdentityClient;
    clientId?: string;
    resourceId?: string;
    getTokenOptions?: GetTokenOptions;
  }): Promise<boolean>;
  getToken(
    configuration: MSIConfiguration,
    getTokenOptions?: GetTokenOptions,
  ): Promise<MSIToken | null>;
}
