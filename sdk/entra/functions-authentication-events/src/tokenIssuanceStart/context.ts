// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Container file for all interfaces that pertain to the OnTokenIssuanceStart event API schema version 10-01-2021-preview.
 */
import type {
  ActionableCloudEventResponse,
  AuthenticationEventAction,
  AuthenticationEventData,
  CloudEventRequest,
} from "../events.js";

/**
 * The main request interface, this will relate it's response and payload.
 */
export interface TokenIssuanceStartRequest extends CloudEventRequest<
  TokenIssuanceStartResponse,
  TokenIssuanceStartData
> {
  /** A dictionary of token claims. */
  tokenClaims?: Record<string, string>;
}

/**
 * The main response interface that is related to the request, this extends IActionable as the response
 * contains actions, we only allow actions that inherit the TokenIssuanceStartAction.
 */
export type TokenIssuanceStartResponse = ActionableCloudEventResponse<TokenIssuanceStartAction>;

/**
 * The main data interface related to the request.
 */
export interface TokenIssuanceStartData extends AuthenticationEventData {
  /** The main context of the data. */
  authenticationContext: AuthenticationEventContext;
}

/**
 * Client interface for data.
 */
export interface AuthenticationEventContextClient {
  /** The Ip Address */
  ip: string;
  /** Gets or sets the locale. */
  locale: string;
  /** Gets or sets the market. */
  market: string;
}

/**
 * ResourceServicePrincipal interface for data.
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
 * User interface for data.
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
 * Context interface for data.
 */
export interface AuthenticationEventContext {
  /** Unique identifier for the request. */
  correlationId: string;
  /** The client. */
  client: AuthenticationEventContextClient;
  /** The authorization protocol. */
  authenticationProtocol: "OAUTH2.0" | "SAML" | "WS-FED" | "unknownFutureValue" | undefined;
  /** The client service principal. */
  clientServicePrincipal: AuthenticationEventContextServicePrincipal;
  /** The resource service principal. */
  resourceServicePrincipal: AuthenticationEventContextServicePrincipal;
  /** Data pertaining to the user requesting a token. */
  user: AuthenticationEventContextUser;
}

/**
 * All actions for the token issuance start event should extended this interface, as it looks the correct action to the correct event.
 */
export interface TokenIssuanceStartAction extends AuthenticationEventAction {
  /** This will be the 'Name' of the action in the JSON. */
  actionType: string;
}
