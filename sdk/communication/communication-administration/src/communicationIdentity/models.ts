// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import { CommunicationUser } from "@azure/communication-common";
import { CommunicationIdentityToken } from "./generated/src/models";
import { WithResponse } from "../common/models";

/**
 * Represents the scope of the token.
 */
export type TokenScope = "chat" | "voip" | "pstn";

/**
 * Client options used to configure the CommunicationIdentity API requests.
 */
export interface CommunicationIdentityOptions extends PipelineOptions {}

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
