// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Request object to add connections to groups */
export interface AddToGroupsRequest {
  /** Target groups */
  groups?: string[];
  /** Following OData filter syntax to filter out the subscribers receiving the messages */
  filter?: string;
}

export function addToGroupsRequestSerializer(item: AddToGroupsRequest): any {
  return {
    groups: !item["groups"]
      ? item["groups"]
      : item["groups"].map((p: any) => {
          return p;
        }),
    filter: item["filter"],
  };
}

/** The response object containing the client access token */
export interface ClientTokenResponse {
  /** Access token for the client to connect Azure Web PubSub service */
  token?: string;
}

export function clientTokenResponseDeserializer(item: any): ClientTokenResponse {
  return {
    token: item["token"],
  };
}

/** Request object to remove connections from groups */
export interface RemoveFromGroupsRequest {
  /** Target groups */
  groups?: string[];
  /** Following OData filter syntax to filter out the subscribers receiving the messages */
  filter?: string;
}

export function removeFromGroupsRequestSerializer(item: RemoveFromGroupsRequest): any {
  return {
    groups: !item["groups"]
      ? item["groups"]
      : item["groups"].map((p: any) => {
          return p;
        }),
    filter: item["filter"],
  };
}

/** Paged response for group members */
export interface _GroupMemberPagedValues {
  /** The group members */
  value?: GroupMember[];
  /** The link to the next page of results */
  nextLink?: string;
}

export function _groupMemberPagedValuesDeserializer(item: any): _GroupMemberPagedValues {
  return {
    value: !item["value"] ? item["value"] : groupMemberArrayDeserializer(item["value"]),
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
export type ResponseContentType = "application/json" | "text/json";
/** Content type for HTTP headers in message operations (closed union for HTTP compliance) */
export type MessageContentType = "application/json" | "application/octet-stream" | "text/plain";
/** Web PubSub permission */
export type WebPubSubPermission = "sendToGroup" | "joinLeaveGroup";

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-12-01 API version. */
  V20241201 = "2024-12-01",
}
