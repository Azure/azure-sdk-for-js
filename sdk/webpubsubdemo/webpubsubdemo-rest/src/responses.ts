// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import { ClientTokenResponseOutput, ErrorDetailOutput } from "./outputModels";

/** Get service health status. */
export interface HealthApiGetServiceStatus200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Get service health status. */
export interface HealthApiGetServiceStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Generate token for the client to connect Azure Web PubSub service. */
export interface WebPubSubGenerateClientToken200Response extends HttpResponse {
  status: "200";
  body: ClientTokenResponseOutput;
}

export interface WebPubSubGenerateClientTokendefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Generate token for the client to connect Azure Web PubSub service. */
export interface WebPubSubGenerateClientTokendefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubGenerateClientTokendefaultHeaders;
}

/** Close the connections in the hub. */
export interface WebPubSubCloseAllConnections204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface WebPubSubCloseAllConnectionsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Close the connections in the hub. */
export interface WebPubSubCloseAllConnectionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubCloseAllConnectionsdefaultHeaders;
}

/** Broadcast content inside request body to all the connected client connections. */
export interface WebPubSubSendToAll202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

export interface WebPubSubSendToAlldefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Broadcast content inside request body to all the connected client connections. */
export interface WebPubSubSendToAlldefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubSendToAlldefaultHeaders;
}

/** Check if the connection with the given connectionId exists. */
export interface WebPubSubConnectionExists200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Check if the connection with the given connectionId exists. */
export interface WebPubSubConnectionExists404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

export interface WebPubSubConnectionExistsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Check if the connection with the given connectionId exists. */
export interface WebPubSubConnectionExistsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubConnectionExistsdefaultHeaders;
}

/** Close the client connection. */
export interface WebPubSubCloseConnection204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface WebPubSubCloseConnectiondefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Close the client connection. */
export interface WebPubSubCloseConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubCloseConnectiondefaultHeaders;
}

/** Send content inside request body to the specific connection. */
export interface WebPubSubSendToConnection202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

export interface WebPubSubSendToConnectiondefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Send content inside request body to the specific connection. */
export interface WebPubSubSendToConnectiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubSendToConnectiondefaultHeaders;
}

/** Check if there are any client connections inside the given group */
export interface WebPubSubGroupExists200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Check if there are any client connections inside the given group */
export interface WebPubSubGroupExists404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

export interface WebPubSubGroupExistsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Check if there are any client connections inside the given group */
export interface WebPubSubGroupExistsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubGroupExistsdefaultHeaders;
}

/** Close connections in the specific group. */
export interface WebPubSubCloseGroupConnections204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface WebPubSubCloseGroupConnectionsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Close connections in the specific group. */
export interface WebPubSubCloseGroupConnectionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubCloseGroupConnectionsdefaultHeaders;
}

/** Send content inside request body to a group of connections. */
export interface WebPubSubSendToGroup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

export interface WebPubSubSendToGroupdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Send content inside request body to a group of connections. */
export interface WebPubSubSendToGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubSendToGroupdefaultHeaders;
}

/** Add a connection to the target group. */
export interface WebPubSubAddConnectionToGroup200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface WebPubSubAddConnectionToGroupdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Add a connection to the target group. */
export interface WebPubSubAddConnectionToGroupdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubAddConnectionToGroupdefaultHeaders;
}

/** Remove a connection from the target group. */
export interface WebPubSubRemoveConnectionFromGroup204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface WebPubSubRemoveConnectionFromGroupdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Remove a connection from the target group. */
export interface WebPubSubRemoveConnectionFromGroupdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubRemoveConnectionFromGroupdefaultHeaders;
}

/** Check if there are any client connections connected for the given user. */
export interface WebPubSubUserExists200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Check if there are any client connections connected for the given user. */
export interface WebPubSubUserExists404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

export interface WebPubSubUserExistsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Check if there are any client connections connected for the given user. */
export interface WebPubSubUserExistsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubUserExistsdefaultHeaders;
}

/** Close connections for the specific user. */
export interface WebPubSubCloseUserConnections204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface WebPubSubCloseUserConnectionsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Close connections for the specific user. */
export interface WebPubSubCloseUserConnectionsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubCloseUserConnectionsdefaultHeaders;
}

/** Send content inside request body to the specific user. */
export interface WebPubSubSendToUser202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

export interface WebPubSubSendToUserdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Send content inside request body to the specific user. */
export interface WebPubSubSendToUserdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubSendToUserdefaultHeaders;
}

/** Add a user to the target group. */
export interface WebPubSubAddUserToGroup200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface WebPubSubAddUserToGroupdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Add a user to the target group. */
export interface WebPubSubAddUserToGroupdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubAddUserToGroupdefaultHeaders;
}

/** Remove a user from the target group. */
export interface WebPubSubRemoveUserFromGroup204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface WebPubSubRemoveUserFromGroupdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Remove a user from the target group. */
export interface WebPubSubRemoveUserFromGroupdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubRemoveUserFromGroupdefaultHeaders;
}

/** Remove a user from all groups. */
export interface WebPubSubRemoveUserFromAllGroups204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface WebPubSubRemoveUserFromAllGroupsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Remove a user from all groups. */
export interface WebPubSubRemoveUserFromAllGroupsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubRemoveUserFromAllGroupsdefaultHeaders;
}

/** Grant permission to the connection. */
export interface WebPubSubGrantPermission200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

export interface WebPubSubGrantPermissiondefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Grant permission to the connection. */
export interface WebPubSubGrantPermissiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubGrantPermissiondefaultHeaders;
}

/** Revoke permission for the connection. */
export interface WebPubSubRevokePermission204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface WebPubSubRevokePermissiondefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Revoke permission for the connection. */
export interface WebPubSubRevokePermissiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubRevokePermissiondefaultHeaders;
}

/** Check if a connection has permission to the specified action. */
export interface WebPubSubCheckPermission200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Check if a connection has permission to the specified action. */
export interface WebPubSubCheckPermission404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

export interface WebPubSubCheckPermissiondefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Check if a connection has permission to the specified action. */
export interface WebPubSubCheckPermissiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorDetailOutput;
  headers: RawHttpHeaders & WebPubSubCheckPermissiondefaultHeaders;
}
