// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The error object. */
export interface ErrorDetail {
  /** One of a server-defined set of error codes. */
  code?: string;
  /** A human-readable representation of the error. */
  message?: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details?: ErrorDetail[];
  /** An object containing more specific information about the error. */
  inner?: InnerError;
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    inner: !item["inner"] ? item["inner"] : innerErrorDeserializer(item["inner"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

/** Inner error detail. */
export interface InnerError {
  /** A more specific error code than was provided by the containing error. */
  code?: string;
  /** Inner error. */
  inner?: InnerError;
}

export function innerErrorDeserializer(item: any): InnerError {
  return {
    code: item["code"],
    inner: !item["inner"] ? item["inner"] : innerErrorDeserializer(item["inner"]),
  };
}

/** Request object to add connections to groups */
export interface AddToGroupsRequest {
  /** Target groups */
  groups: string[];
  /** Following OData filter syntax to filter out the subscribers receiving the messages */
  filter?: string;
}

export function addToGroupsRequestSerializer(item: AddToGroupsRequest): any {
  return {
    groups: item["groups"].map((p: any) => {
      return p;
    }),
    filter: item["filter"],
  };
}

/** The response object containing the client access token */
export interface ClientTokenResponse {
  /** Access token for the client to connect Azure Web PubSub service */
  token: string;
}

export function clientTokenResponseDeserializer(item: any): ClientTokenResponse {
  return {
    token: item["token"],
  };
}

/** Request object to remove connections from groups */
export interface RemoveFromGroupsRequest {
  /** Target groups */
  groups: string[];
  /** Following OData filter syntax to filter out the subscribers receiving the messages */
  filter?: string;
}

export function removeFromGroupsRequestSerializer(item: RemoveFromGroupsRequest): any {
  return {
    groups: item["groups"].map((p: any) => {
      return p;
    }),
    filter: item["filter"],
  };
}

/** Paged response for group members */
export interface _GroupMemberPagedValues {
  /** The group members */
  value: GroupMember[];
  /** The link to the next page of results */
  nextLink?: string;
}

export function _groupMemberPagedValuesDeserializer(item: any): _GroupMemberPagedValues {
  return {
    value: groupMemberArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function groupMemberArrayDeserializer(result: Array<GroupMember>): any[] {
  return result.map((item) => {
    return groupMemberDeserializer(item);
  });
}

/** Group member */
export interface GroupMember {
  /** Connection Id */
  connectionId: string;
  /** User Id */
  userId?: string;
}

export function groupMemberDeserializer(item: any): GroupMember {
  return {
    connectionId: item["connectionId"],
    userId: item["userId"],
  };
}

/** Web PubSub client type */
export type WebPubSubClientType = "Default" | "MQTT";
/** Content type for response headers (closed union for HTTP compliance) */
export type ResponseContentType = "text/plain" | "application/json" | "text/json";
/** Content type for HTTP headers in message operations (closed union for HTTP compliance) */
export type MessageContentType = "application/json" | "application/octet-stream" | "text/plain";
/** Web PubSub permission */
export type WebPubSubPermission = "sendToGroup" | "joinLeaveGroup";

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-12-01 API version. */
  V20241201 = "2024-12-01",
}
