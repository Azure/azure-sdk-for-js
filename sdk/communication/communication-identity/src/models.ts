// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationToken, CommunicationUserIdentifier } from "@azure/communication-common";
import { CommonClientOptions } from "@azure/core-client";

/**
 * Represents the scope of the token.
 */
export type TokenScope = "chat" | "voip";

/**
 * Client options used to configure the CommunicationIdentity API requests.
 */
export interface CommunicationIdentityClientOptions extends CommonClientOptions {}

/**
 * The access token for a user.
 */
export interface CommunicationAccessToken extends CommunicationToken {
  /**
   * The access token issued for the user.
   */
  token: string;
  /**
   * The expiry time of the token.
   */
  expiresOn: Date;
}

/**
 * The issued token and the user it was issued for.
 */
export interface CommunicationUserToken extends CommunicationAccessToken {
  /**
   * Represents the user the token was issued for
   */
  user: CommunicationUserIdentifier;
}
