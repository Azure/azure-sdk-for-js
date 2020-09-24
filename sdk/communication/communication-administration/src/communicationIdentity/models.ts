// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse, PipelineOptions } from "@azure/core-http";
import { CommunicationUser } from "@azure/communication-common";
import { CommunicationIdentityToken } from "./generated/src/models";

/**
 * Represents the scope of the token.
 */
export type TokenScope = "chat" | "voip" | "pstn";

/**
 * Client options used to configure the CommunicationIdentity API requests.
 */
export interface CommunicationIdentityOptions extends PipelineOptions {}

/**
 * Represents an object with a non-enumerable _response property which provides
 * information about the HTTP response.
 */
export type WithResponse<T> = T & { _response: HttpResponse };

/**
 * Represents a generic HTTP response
 */
export type VoidResponse = WithResponse<{}>;

/**
 * The issued token and the user it was issued for.
 */
export interface CommunicationUserToken
  extends Pick<CommunicationIdentityToken, "token" | "expiresOn"> {
  /**
   * Represents the user the token was issued for
   */
  user: CommunicationUser;
}

/**
 * Represents the response from creating a user
 */
export type CreateUserResponse = WithResponse<CommunicationUser>;

/**
 * Represents the response from issuing a token
 */
export type IssueTokenResponse = WithResponse<CommunicationUserToken>;
