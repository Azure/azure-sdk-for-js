// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * Container file for all classes that pertain to the OnTokenIssuanceStart event API schema version 10-01-2021-preview.
 */
import {
  AuthEventData,
  AuthEventAction,
  CloudEventRequest,
  ActionableCloudEventResponse,
} from "..";

/**
 * The main request class, this will relate it's response and payload.
 * @beta
 */
export interface TokenIssuanceStartRequest extends CloudEventRequest<
  TokenIssuanceStartResponse,
  TokenIssuanceStartData
> {
  /** A dictionary of token claims. */
  tokenClaims?: Record<string,string>;
}

/**
 * The main response class that is related to the request, this extends IActionable as the response
 * contains actions, we only allow actions that inherit the TokenIssuanceStartAction.
 * @beta
 */
export type TokenIssuanceStartResponse = ActionableCloudEventResponse<TokenIssuanceStartAction>;

/**
 * The main data class related to the request.
 * @beta
 */
export interface TokenIssuanceStartData extends AuthEventData {
  /** The main context of the data. */
  authenticationContext: AuthenticationEventContext;
}

/**
 * Client class for data.
 * @beta
 */
export interface AuthenticationEventContextClient {
  /** The Ip Address */
  ip: string;
  locale: string;
  market: string;
}

/**
 * ResourceServicePrincipal class for data.
 * @beta
 */
export interface AuthenticationEventContextServicePrincipal {
  /** The identifier for the service principal. */
  id: string;
  /** The application identifier. */
  appId: string;
  /** The application display name. */
  appDisplayName: string;
  /** The display name. */
  displayName: string;
}

/**
 * User class for data.
 * @beta
 */
export interface AuthenticationEventContextUser {
  /** The user's company name. */
  companyName: string;
  /** The user's country. */
  country: string;
  /** The user's display name. */
  displayName: string;
  /** The user's given name. */
  givenName: string;
  /** The user identifier. */
  id: string;
  /** The user's email address. */
  mail: string;
  /** The user's on premise SAM account name. */
  onPremisesSamAccountName: string;
  /** The user's on premise security identifier. */
  onPremisesSecurityIdentifier: string;
  /** The user's on premise principal name. */
  onPremiseUserPrincipalName: string;
  /** The user's preferred data location */
  preferredDataLocation: string;
  /** The user's preferred language. */
  preferredLanguage: string;
  /** The user's surname. */
  surname: string;
  /** The user's principal name. */
  userPrincipalName: string;
  /** The user type. */
  userType: string;
}

/**
 * Context class for data.
 * @beta
 */
export interface AuthenticationEventContext {
  /** Unique identifier for the request. */
  correlationId: string;
  /** The client. */
  client: AuthenticationEventContextClient;
  /** The authorization protocol. */
  authenticationProtocol: "OAUTH2.0" | "SAML" | "WS-FED" | "unknownFutureValue" | "";
  /** The client service principal. */
  clientServicePrincipal: AuthenticationEventContextServicePrincipal;
  /** The resource service principal. */
  resourceServicePrincipal: AuthenticationEventContextServicePrincipal;
  /** Data pertaining to the user requesting a token. */
  user: AuthenticationEventContextUser;
}

/**
 * All actions for the token issuance start event should extended this class, as it looks the correct action to the correct event.
 * @beta
 */
export interface TokenIssuanceStartAction extends AuthEventAction {
  /** This will be the 'Name' of the action in the JSON. */
  actionType: string;
}
