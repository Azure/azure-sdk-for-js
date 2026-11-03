// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  type FailedRequest,
  type ActionableResponse,
  type AuthenticationEventAction,
  type AuthenticationEventData,
  type AuthenticationEventRequest,
  type AuthenticationEventRequestCommon,
  type AuthenticationEventResponse,
  type RequestStatus,
  type CloudEventRequest,
  createFailedRequest,
  type ActionableCloudEventResponse,
} from "./events.js";

export type {
  AuthenticationEventContext,
  AuthenticationEventContextClient,
  AuthenticationEventContextServicePrincipal,
  AuthenticationEventContextUser,
  TokenIssuanceStartData,
  TokenIssuanceStartRequest,
  TokenIssuanceStartResponse,
} from "./tokenIssuanceStart/context.js";
export {
  type ProvideClaimsForToken,
  type TokenClaim,
  createProvideClaimsForToken,
} from "./tokenIssuanceStart/actions.js";

export type { TokenIssuanceStartAction } from "./tokenIssuanceStart/context.js";
