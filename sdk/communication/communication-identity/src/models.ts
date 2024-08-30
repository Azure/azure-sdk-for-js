// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { CommunicationUserIdentifier } from "@azure/communication-common";

/**
 * Represents the scope of the token.
 */
export type TokenScope = "chat" | "voip" | "chat.join" | "chat.join.limited" | "voip.join";

/**
 * Client options used to configure the CommunicationIdentity API requests.
 */
export interface CommunicationIdentityClientOptions extends CommonClientOptions {}

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
 * Options used to exchange an AAD access token of a Teams user for a new Communication Identity access token.
 */
export interface GetTokenForTeamsUserOptions extends OperationOptions {
  /**
   * Azure Active Directory access token of a Teams user.
   */
  teamsUserAadToken: string;

  /**
   * Client ID of an Azure AD application to be verified against the appId claim in the Azure AD access token.
   */
  clientId: string;

  /**
   * Object ID of an Azure AD user (Teams User) to be verified against the OID claim in the Azure AD access token.
   */
  userObjectId: string;
}

/**
 * Options to create a single user and a token simultaneously.
 */
export declare interface CreateUserAndTokenOptions extends OperationOptions {
  /** Optional custom validity period of the token within [60,1440] minutes range. If not provided, the default value of 1440 minutes (24 hours) will be used. */
  tokenExpiresInMinutes?: number;
}

/**
 * Options to create a scoped user token.
 */
export declare interface GetTokenOptions extends OperationOptions {
  /** Optional custom validity period of the token within [60,1440] minutes range. If not provided, the default value of 1440 minutes (24 hours) will be used. */
  tokenExpiresInMinutes?: number;
}
