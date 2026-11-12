// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Options for generating a chat client access token. */
export interface GetClientAccessTokenOptions extends OperationOptions {
  /** The user ID for the client. */
  userId?: string;
  /** Minutes until the token expires. */
  expirationTimeInMinutes?: number;
}

/** A chat client access token and connection URLs. */
export interface ClientAccessToken {
  /** The client token. */
  token: string;
  /** The URL client connects to. */
  baseUrl: string;
  /** The URL client connects to with the access token query string. */
  url: string;
}
