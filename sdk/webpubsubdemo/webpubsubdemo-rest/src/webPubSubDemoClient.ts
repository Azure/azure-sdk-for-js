// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HealthApiGetServiceStatusParameters,
  WebPubSubGenerateClientTokenParameters,
  WebPubSubCloseAllConnectionsParameters,
  WebPubSubSendToAllParameters,
  WebPubSubConnectionExistsParameters,
  WebPubSubCloseConnectionParameters,
  WebPubSubSendToConnectionParameters,
  WebPubSubGroupExistsParameters,
  WebPubSubCloseGroupConnectionsParameters,
  WebPubSubSendToGroupParameters,
  WebPubSubAddConnectionToGroupParameters,
  WebPubSubRemoveConnectionFromGroupParameters,
  WebPubSubUserExistsParameters,
  WebPubSubCloseUserConnectionsParameters,
  WebPubSubSendToUserParameters,
  WebPubSubAddUserToGroupParameters,
  WebPubSubRemoveUserFromGroupParameters,
  WebPubSubRemoveUserFromAllGroupsParameters,
  WebPubSubGrantPermissionParameters,
  WebPubSubRevokePermissionParameters,
  WebPubSubCheckPermissionParameters
} from "./parameters";
import {
  HealthApiGetServiceStatus200Response,
  HealthApiGetServiceStatusdefaultResponse,
  WebPubSubGenerateClientToken200Response,
  WebPubSubGenerateClientTokendefaultResponse,
  WebPubSubCloseAllConnections204Response,
  WebPubSubCloseAllConnectionsdefaultResponse,
  WebPubSubSendToAll202Response,
  WebPubSubSendToAlldefaultResponse,
  WebPubSubConnectionExists200Response,
  WebPubSubConnectionExists404Response,
  WebPubSubConnectionExistsdefaultResponse,
  WebPubSubCloseConnection204Response,
  WebPubSubCloseConnectiondefaultResponse,
  WebPubSubSendToConnection202Response,
  WebPubSubSendToConnectiondefaultResponse,
  WebPubSubGroupExists200Response,
  WebPubSubGroupExists404Response,
  WebPubSubGroupExistsdefaultResponse,
  WebPubSubCloseGroupConnections204Response,
  WebPubSubCloseGroupConnectionsdefaultResponse,
  WebPubSubSendToGroup202Response,
  WebPubSubSendToGroupdefaultResponse,
  WebPubSubAddConnectionToGroup200Response,
  WebPubSubAddConnectionToGroupdefaultResponse,
  WebPubSubRemoveConnectionFromGroup204Response,
  WebPubSubRemoveConnectionFromGroupdefaultResponse,
  WebPubSubUserExists200Response,
  WebPubSubUserExists404Response,
  WebPubSubUserExistsdefaultResponse,
  WebPubSubCloseUserConnections204Response,
  WebPubSubCloseUserConnectionsdefaultResponse,
  WebPubSubSendToUser202Response,
  WebPubSubSendToUserdefaultResponse,
  WebPubSubAddUserToGroup200Response,
  WebPubSubAddUserToGroupdefaultResponse,
  WebPubSubRemoveUserFromGroup204Response,
  WebPubSubRemoveUserFromGroupdefaultResponse,
  WebPubSubRemoveUserFromAllGroups204Response,
  WebPubSubRemoveUserFromAllGroupsdefaultResponse,
  WebPubSubGrantPermission200Response,
  WebPubSubGrantPermissiondefaultResponse,
  WebPubSubRevokePermission204Response,
  WebPubSubRevokePermissiondefaultResponse,
  WebPubSubCheckPermission200Response,
  WebPubSubCheckPermission404Response,
  WebPubSubCheckPermissiondefaultResponse
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface HealthApiGetServiceStatus {
  /** Get service health status. */
  head(
    options?: HealthApiGetServiceStatusParameters
  ): Promise<
    | HealthApiGetServiceStatus200Response
    | HealthApiGetServiceStatusdefaultResponse
  >;
}

export interface WebPubSubGenerateClientToken {
  /** Generate token for the client to connect Azure Web PubSub service. */
  post(
    options?: WebPubSubGenerateClientTokenParameters
  ): Promise<
    | WebPubSubGenerateClientToken200Response
    | WebPubSubGenerateClientTokendefaultResponse
  >;
}

export interface WebPubSubCloseAllConnections {
  /** Close the connections in the hub. */
  post(
    options?: WebPubSubCloseAllConnectionsParameters
  ): Promise<
    | WebPubSubCloseAllConnections204Response
    | WebPubSubCloseAllConnectionsdefaultResponse
  >;
}

export interface WebPubSubSendToAll {
  /** Broadcast content inside request body to all the connected client connections. */
  post(
    options: WebPubSubSendToAllParameters | WebPubSubSendToAllParameters
  ):
    | Promise<WebPubSubSendToAll202Response | WebPubSubSendToAlldefaultResponse>
    | Promise<
        WebPubSubSendToAll202Response | WebPubSubSendToAlldefaultResponse
      >;
}

export interface WebPubSubConnectionExists {
  /** Check if the connection with the given connectionId exists. */
  head(
    options?: WebPubSubConnectionExistsParameters
  ): Promise<
    | WebPubSubConnectionExists200Response
    | WebPubSubConnectionExists404Response
    | WebPubSubConnectionExistsdefaultResponse
  >;
  /** Close the client connection. */
  delete(
    options?: WebPubSubCloseConnectionParameters
  ): Promise<
    | WebPubSubCloseConnection204Response
    | WebPubSubCloseConnectiondefaultResponse
  >;
}

export interface WebPubSubSendToConnection {
  /** Send content inside request body to the specific connection. */
  post(
    options:
      | WebPubSubSendToConnectionParameters
      | WebPubSubSendToConnectionParameters
  ):
    | Promise<
        | WebPubSubSendToConnection202Response
        | WebPubSubSendToConnectiondefaultResponse
      >
    | Promise<
        | WebPubSubSendToConnection202Response
        | WebPubSubSendToConnectiondefaultResponse
      >;
}

export interface WebPubSubGroupExists {
  /** Check if there are any client connections inside the given group */
  head(
    options?: WebPubSubGroupExistsParameters
  ): Promise<
    | WebPubSubGroupExists200Response
    | WebPubSubGroupExists404Response
    | WebPubSubGroupExistsdefaultResponse
  >;
}

export interface WebPubSubCloseGroupConnections {
  /** Close connections in the specific group. */
  post(
    options?: WebPubSubCloseGroupConnectionsParameters
  ): Promise<
    | WebPubSubCloseGroupConnections204Response
    | WebPubSubCloseGroupConnectionsdefaultResponse
  >;
}

export interface WebPubSubSendToGroup {
  /** Send content inside request body to a group of connections. */
  post(
    options: WebPubSubSendToGroupParameters | WebPubSubSendToGroupParameters
  ):
    | Promise<
        WebPubSubSendToGroup202Response | WebPubSubSendToGroupdefaultResponse
      >
    | Promise<
        WebPubSubSendToGroup202Response | WebPubSubSendToGroupdefaultResponse
      >;
}

export interface WebPubSubAddConnectionToGroup {
  /** Add a connection to the target group. */
  put(
    options?: WebPubSubAddConnectionToGroupParameters
  ): Promise<
    | WebPubSubAddConnectionToGroup200Response
    | WebPubSubAddConnectionToGroupdefaultResponse
  >;
  /** Remove a connection from the target group. */
  delete(
    options?: WebPubSubRemoveConnectionFromGroupParameters
  ): Promise<
    | WebPubSubRemoveConnectionFromGroup204Response
    | WebPubSubRemoveConnectionFromGroupdefaultResponse
  >;
}

export interface WebPubSubUserExists {
  /** Check if there are any client connections connected for the given user. */
  head(
    options?: WebPubSubUserExistsParameters
  ): Promise<
    | WebPubSubUserExists200Response
    | WebPubSubUserExists404Response
    | WebPubSubUserExistsdefaultResponse
  >;
}

export interface WebPubSubCloseUserConnections {
  /** Close connections for the specific user. */
  post(
    options?: WebPubSubCloseUserConnectionsParameters
  ): Promise<
    | WebPubSubCloseUserConnections204Response
    | WebPubSubCloseUserConnectionsdefaultResponse
  >;
}

export interface WebPubSubSendToUser {
  /** Send content inside request body to the specific user. */
  post(
    options: WebPubSubSendToUserParameters | WebPubSubSendToUserParameters
  ):
    | Promise<
        WebPubSubSendToUser202Response | WebPubSubSendToUserdefaultResponse
      >
    | Promise<
        WebPubSubSendToUser202Response | WebPubSubSendToUserdefaultResponse
      >;
}

export interface WebPubSubAddUserToGroup {
  /** Add a user to the target group. */
  put(
    options?: WebPubSubAddUserToGroupParameters
  ): Promise<
    WebPubSubAddUserToGroup200Response | WebPubSubAddUserToGroupdefaultResponse
  >;
  /** Remove a user from the target group. */
  delete(
    options?: WebPubSubRemoveUserFromGroupParameters
  ): Promise<
    | WebPubSubRemoveUserFromGroup204Response
    | WebPubSubRemoveUserFromGroupdefaultResponse
  >;
}

export interface WebPubSubRemoveUserFromAllGroups {
  /** Remove a user from all groups. */
  delete(
    options?: WebPubSubRemoveUserFromAllGroupsParameters
  ): Promise<
    | WebPubSubRemoveUserFromAllGroups204Response
    | WebPubSubRemoveUserFromAllGroupsdefaultResponse
  >;
}

export interface WebPubSubGrantPermission {
  /** Grant permission to the connection. */
  put(
    options?: WebPubSubGrantPermissionParameters
  ): Promise<
    | WebPubSubGrantPermission200Response
    | WebPubSubGrantPermissiondefaultResponse
  >;
  /** Revoke permission for the connection. */
  delete(
    options?: WebPubSubRevokePermissionParameters
  ): Promise<
    | WebPubSubRevokePermission204Response
    | WebPubSubRevokePermissiondefaultResponse
  >;
  /** Check if a connection has permission to the specified action. */
  head(
    options?: WebPubSubCheckPermissionParameters
  ): Promise<
    | WebPubSubCheckPermission200Response
    | WebPubSubCheckPermission404Response
    | WebPubSubCheckPermissiondefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/api/health' has methods for the following verbs: head */
  (path: "/api/health"): HealthApiGetServiceStatus;
  /** Resource for '/api/hubs/\{hub\}/:generateToken' has methods for the following verbs: post */
  (
    path: "/api/hubs/{hub}/:generateToken",
    hub: string
  ): WebPubSubGenerateClientToken;
  /** Resource for '/api/hubs/\{hub\}/:closeConnections' has methods for the following verbs: post */
  (
    path: "/api/hubs/{hub}/:closeConnections",
    hub: string
  ): WebPubSubCloseAllConnections;
  /** Resource for '/api/hubs/\{hub\}/:send' has methods for the following verbs: post */
  (path: "/api/hubs/{hub}/:send", hub: string): WebPubSubSendToAll;
  /** Resource for '/api/hubs/\{hub\}/connections/\{connectionId\}' has methods for the following verbs: head, delete */
  (
    path: "/api/hubs/{hub}/connections/{connectionId}",
    hub: string,
    connectionId: string
  ): WebPubSubConnectionExists;
  /** Resource for '/api/hubs/\{hub\}/connections/\{connectionId\}/:send' has methods for the following verbs: post */
  (
    path: "/api/hubs/{hub}/connections/{connectionId}/:send",
    hub: string,
    connectionId: string
  ): WebPubSubSendToConnection;
  /** Resource for '/api/hubs/\{hub\}/groups/\{group\}' has methods for the following verbs: head */
  (
    path: "/api/hubs/{hub}/groups/{group}",
    hub: string,
    group: string
  ): WebPubSubGroupExists;
  /** Resource for '/api/hubs/\{hub\}/groups/\{group\}/:closeConnections' has methods for the following verbs: post */
  (
    path: "/api/hubs/{hub}/groups/{group}/:closeConnections",
    hub: string,
    group: string
  ): WebPubSubCloseGroupConnections;
  /** Resource for '/api/hubs/\{hub\}/groups/\{group\}/:send' has methods for the following verbs: post */
  (
    path: "/api/hubs/{hub}/groups/{group}/:send",
    hub: string,
    group: string
  ): WebPubSubSendToGroup;
  /** Resource for '/api/hubs/\{hub\}/groups/\{group\}/connections/\{connectionId\}' has methods for the following verbs: put, delete */
  (
    path: "/api/hubs/{hub}/groups/{group}/connections/{connectionId}",
    hub: string,
    group: string,
    connectionId: string
  ): WebPubSubAddConnectionToGroup;
  /** Resource for '/api/hubs/\{hub\}/users/\{userId\}' has methods for the following verbs: head */
  (
    path: "/api/hubs/{hub}/users/{userId}",
    hub: string,
    userId: string
  ): WebPubSubUserExists;
  /** Resource for '/api/hubs/\{hub\}/users/\{userId\}/:closeConnections' has methods for the following verbs: post */
  (
    path: "/api/hubs/{hub}/users/{userId}/:closeConnections",
    hub: string,
    userId: string
  ): WebPubSubCloseUserConnections;
  /** Resource for '/api/hubs/\{hub\}/users/\{userId\}/:send' has methods for the following verbs: post */
  (
    path: "/api/hubs/{hub}/users/{userId}/:send",
    hub: string,
    userId: string
  ): WebPubSubSendToUser;
  /** Resource for '/api/hubs/\{hub\}/users/\{userId\}/groups/\{group\}' has methods for the following verbs: put, delete */
  (
    path: "/api/hubs/{hub}/users/{userId}/groups/{group}",
    hub: string,
    userId: string,
    group: string
  ): WebPubSubAddUserToGroup;
  /** Resource for '/api/hubs/\{hub\}/users/\{userId\}/groups' has methods for the following verbs: delete */
  (
    path: "/api/hubs/{hub}/users/{userId}/groups",
    hub: string,
    userId: string
  ): WebPubSubRemoveUserFromAllGroups;
  /** Resource for '/api/hubs/\{hub\}/permissions/\{permission\}/connections/\{connectionId\}' has methods for the following verbs: put, delete, head */
  (
    path: "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}",
    hub: string,
    permission: "sendToGroup" | "joinLeaveGroup",
    connectionId: string
  ): WebPubSubGrantPermission;
}

export type WebPubSubDemoClientRestClient = Client & {
  path: Routes;
};

export default function WebPubSubDemoClient(
  Endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): WebPubSubDemoClientRestClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}`;
  options.apiVersion = options.apiVersion ?? "2021-10-01";
  options = {
    ...options,
    credentials: {
      scopes: ["https://webpubsubdemo/.default"]
    }
  };

  return getClient(
    baseUrl,
    credentials,
    options
  ) as WebPubSubDemoClientRestClient;
}
