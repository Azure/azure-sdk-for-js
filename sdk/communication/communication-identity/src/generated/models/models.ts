// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/** Request to create a new identity with optional access token. */
export interface CommunicationIdentityCreateRequest {
  /** Also create access token for the created identity. */
  createTokenWithScopes?: CommunicationIdentityTokenScope[];
  /** Optional custom validity period of the token within [60,1440] minutes range. If not provided, the default value of 1440 minutes (24 hours) will be used. */
  expiresInMinutes?: number;
}

export function communicationIdentityCreateRequestSerializer(
  item: CommunicationIdentityCreateRequest,
): any {
  return {
    createTokenWithScopes: !item["createTokenWithScopes"]
      ? item["createTokenWithScopes"]
      : item["createTokenWithScopes"].map((p: any) => {
          return p;
        }),
    expiresInMinutes: item["expiresInMinutes"],
  };
}

/** List of scopes for an access token. */
export type CommunicationIdentityTokenScope =
  "chat" | "voip" | "chat.join" | "chat.join.limited" | "voip.join";

/** A communication identity with access token. */
export interface CommunicationIdentityAccessTokenResult {
  /** The communication identity. */
  identity: CommunicationIdentity;
  /** An access token. */
  accessToken?: CommunicationIdentityAccessToken;
}

export function communicationIdentityAccessTokenResultDeserializer(
  item: any,
): CommunicationIdentityAccessTokenResult {
  return {
    identity: communicationIdentityDeserializer(item["identity"]),
    accessToken: !item["accessToken"]
      ? item["accessToken"]
      : communicationIdentityAccessTokenDeserializer(item["accessToken"]),
  };
}

/** A communication identity. */
export interface CommunicationIdentity {
  /** Identifier of the identity. */
  id: string;
}

export function communicationIdentityDeserializer(item: any): CommunicationIdentity {
  return {
    id: item["id"],
  };
}

/** An access token. */
export interface CommunicationIdentityAccessToken {
  /** The access token issued for the identity. */
  token: string;
  /** The expiry time of the token. */
  expiresOn: Date;
}

export function communicationIdentityAccessTokenDeserializer(
  item: any,
): CommunicationIdentityAccessToken {
  return {
    token: item["token"],
    expiresOn: new Date(item["expiresOn"]),
  };
}

/** The Communication Services error. */
export interface CommunicationErrorResponse {
  /** The Communication Services error. */
  error: CommunicationError;
}

export function communicationErrorResponseDeserializer(item: any): CommunicationErrorResponse {
  return {
    error: communicationErrorDeserializer(item["error"]),
  };
}

/** The Communication Services error. */
export interface CommunicationError {
  /** The error code. */
  code: string;
  /** The error message. */
  message: string;
  /** The error target. */
  readonly target?: string;
  /** Further details about specific errors that led to this error. */
  readonly details?: CommunicationError[];
  /** The inner error if any. */
  readonly innerError?: CommunicationError;
}

export function communicationErrorDeserializer(item: any): CommunicationError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : communicationErrorArrayDeserializer(item["details"]),
    innerError: !item["innererror"]
      ? item["innererror"]
      : communicationErrorDeserializer(item["innererror"]),
  };
}

export function communicationErrorArrayDeserializer(result: Array<CommunicationError>): any[] {
  return result.map((item) => {
    return communicationErrorDeserializer(item);
  });
}

/** Request to issue a new access token for an identity. */
export interface CommunicationIdentityAccessTokenRequest {
  /** List of scopes attached to the token. */
  scopes: CommunicationIdentityTokenScope[];
  /** Optional custom validity period of the token within [60,1440] minutes range. If not provided, the default value of 1440 minutes (24 hours) will be used. */
  expiresInMinutes?: number;
}

export function communicationIdentityAccessTokenRequestSerializer(
  item: CommunicationIdentityAccessTokenRequest,
): any {
  return {
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    expiresInMinutes: item["expiresInMinutes"],
  };
}

/** A request to exchange a Teams user access token. */
export interface TeamsUserExchangeTokenRequest {
  /** Entra ID access token of a Teams User to acquire a new Communication Identity access token. */
  token: string;
  /** Client ID of an Entra ID application to be verified against the appid claim in the Entra ID access token. */
  appId: string;
  /** Object ID of an Entra ID user (Teams User) to be verified against the oid claim in the Entra ID access token. */
  userId: string;
}

export function teamsUserExchangeTokenRequestSerializer(item: TeamsUserExchangeTokenRequest): any {
  return { token: item["token"], appId: item["appId"], userId: item["userId"] };
}

/** A request to exchange a Teams Extension token. */
export interface TeamsExtensionExchangeTokenRequest {
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function teamsExtensionExchangeTokenRequestSerializer(
  item: TeamsExtensionExchangeTokenRequest,
): any {
  return { ...serializeRecord(item.additionalProperties ?? {}) };
}

/** A Teams Extension assignment response. */
export interface TeamsExtensionAssignmentResponse {
  /** The object ID of the assignment. */
  objectId: string;
  /** The tenant ID of the assignment. */
  tenantId: string;
  /** The type of principal the assignment is for. */
  principalType: TeamsExtensionPrincipalType;
  /** The client IDs for the assignment. */
  clientIds?: string[];
}

export function teamsExtensionAssignmentResponseDeserializer(
  item: any,
): TeamsExtensionAssignmentResponse {
  return {
    objectId: item["objectId"],
    tenantId: item["tenantId"],
    principalType: item["principalType"],
    clientIds: !item["clientIds"]
      ? item["clientIds"]
      : item["clientIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The type of principal the assignment is for. */
export type TeamsExtensionPrincipalType = "resourceAccount" | "user";

/** A request to create or update a Teams Extension assignment. */
export interface TeamsExtensionAssignmentCreateOrUpdateRequest {
  /** The type of principal the assignment is for. */
  principalType: TeamsExtensionPrincipalType;
  /** The client IDs for the assignment. */
  clientIds?: string[];
}

export function teamsExtensionAssignmentCreateOrUpdateRequestSerializer(
  item: TeamsExtensionAssignmentCreateOrUpdateRequest,
): any {
  return {
    principalType: item["principalType"],
    clientIds: !item["clientIds"]
      ? item["clientIds"]
      : item["clientIds"].map((p: any) => {
          return p;
        }),
  };
}

/** API versions for the Communication Identity Service. */
export enum KnownVersions {
  /** Communication Identity 2025-06-30 api version */
  C20250630 = "2025-06-30",
  /** Communication Identity 2026-09-23 api version */
  C20260923 = "2026-09-23",
}
