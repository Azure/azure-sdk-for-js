// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { WithResponse } from "./common/models";

/**
 * Represents the scope of the token.
 */
export type TokenScope = "chat" | "voip";

/**
 * Client options used to configure the CommunicationIdentity API requests.
 */
export interface CommunicationIdentityOptions extends PipelineOptions {}

/**
 * The access token for a user.
 */
export interface CommunicationAccessToken {
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

/**
 * Represents the response from creating a user.
 */
export type CreateUserResponse = WithResponse<CommunicationUserIdentifier>;

/**
 * Represents the response from issuing a token.
 */
export type IssueTokenResponse = WithResponse<CommunicationAccessToken>;

/**
 * Represents the response from creating a user with a token.
 */
export type CreateUserWithTokenResponse = WithResponse<CommunicationUserToken>;
