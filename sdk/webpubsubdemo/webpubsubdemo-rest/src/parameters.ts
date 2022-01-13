// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";

export type HealthApiGetServiceStatusParameters = RequestParameters;

export interface WebPubSubGenerateClientTokenQueryParamProperties {
  /** User Id. */
  userId?: string;
  /** Roles that the connection with the generated token will have. */
  role?: Array<string>;
  /** The expire time of the generated token. */
  minutesToExpire?: number;
}

export interface WebPubSubGenerateClientTokenQueryParam {
  queryParameters?: WebPubSubGenerateClientTokenQueryParamProperties;
}

export type WebPubSubGenerateClientTokenParameters = WebPubSubGenerateClientTokenQueryParam &
  RequestParameters;

export interface WebPubSubCloseAllConnectionsQueryParamProperties {
  /** Exclude these connectionIds when closing the connections in the hub. */
  excluded?: Array<string>;
  /** The reason closing the client connection. */
  reason?: string;
}

export interface WebPubSubCloseAllConnectionsQueryParam {
  queryParameters?: WebPubSubCloseAllConnectionsQueryParamProperties;
}

export type WebPubSubCloseAllConnectionsParameters = WebPubSubCloseAllConnectionsQueryParam &
  RequestParameters;

export interface WebPubSubSendToAllBodyParam {
  /**
   * The payload body.
   *
   * Value may contain any sequence of octets
   */
  body: string;
}

export interface WebPubSubSendToAllQueryParamProperties {
  /** Excluded connection Ids. */
  excluded?: Array<string>;
}

export interface WebPubSubSendToAllQueryParam {
  queryParameters?: WebPubSubSendToAllQueryParamProperties;
}

export interface WebPubSubSendToAllMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "application/octet-stream";
}

export type WebPubSubSendToAllRequestParameters = WebPubSubSendToAllQueryParam &
  WebPubSubSendToAllMediaTypesParam &
  WebPubSubSendToAllBodyParam &
  RequestParameters;

export interface WebPubSubSendToAllBodyParam1 {
  /** The payload body. */
  body: string;
}

export interface WebPubSubSendToAllQueryParamProperties {
  /** Excluded connection Ids. */
  excluded?: Array<string>;
}

export interface WebPubSubSendToAllQueryParam1 {
  queryParameters?: WebPubSubSendToAllQueryParamProperties;
}

export interface WebPubSubSendToAllMediaTypesParam1 {
  /** Request content type */
  contentType?: "text/plain";
}

export type WebPubSubSendToAllRequestParameters1 = WebPubSubSendToAllQueryParam1 &
  WebPubSubSendToAllMediaTypesParam1 &
  WebPubSubSendToAllBodyParam1 &
  RequestParameters;
export type WebPubSubSendToAllParameters =
  | WebPubSubSendToAllRequestParameters
  | WebPubSubSendToAllRequestParameters1;
export type WebPubSubConnectionExistsParameters = RequestParameters;

export interface WebPubSubCloseConnectionQueryParamProperties {
  /** The reason closing the client connection. */
  reason?: string;
}

export interface WebPubSubCloseConnectionQueryParam {
  queryParameters?: WebPubSubCloseConnectionQueryParamProperties;
}

export type WebPubSubCloseConnectionParameters = WebPubSubCloseConnectionQueryParam &
  RequestParameters;

export interface WebPubSubSendToConnectionBodyParam {
  /**
   * The payload body.
   *
   * Value may contain any sequence of octets
   */
  body: string;
}

export interface WebPubSubSendToConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "application/octet-stream";
}

export type WebPubSubSendToConnectionRequestParameters = WebPubSubSendToConnectionMediaTypesParam &
  WebPubSubSendToConnectionBodyParam &
  RequestParameters;

export interface WebPubSubSendToConnectionBodyParam1 {
  /** The payload body. */
  body: string;
}

export interface WebPubSubSendToConnectionMediaTypesParam1 {
  /** Request content type */
  contentType?: "text/plain";
}

export type WebPubSubSendToConnectionRequestParameters1 = WebPubSubSendToConnectionMediaTypesParam1 &
  WebPubSubSendToConnectionBodyParam1 &
  RequestParameters;
export type WebPubSubSendToConnectionParameters =
  | WebPubSubSendToConnectionRequestParameters
  | WebPubSubSendToConnectionRequestParameters1;
export type WebPubSubGroupExistsParameters = RequestParameters;

export interface WebPubSubCloseGroupConnectionsQueryParamProperties {
  /** Exclude these connectionIds when closing the connections in the group. */
  excluded?: Array<string>;
  /** The reason closing the client connection. */
  reason?: string;
}

export interface WebPubSubCloseGroupConnectionsQueryParam {
  queryParameters?: WebPubSubCloseGroupConnectionsQueryParamProperties;
}

export type WebPubSubCloseGroupConnectionsParameters = WebPubSubCloseGroupConnectionsQueryParam &
  RequestParameters;

export interface WebPubSubSendToGroupBodyParam {
  /**
   * The payload body.
   *
   * Value may contain any sequence of octets
   */
  body: string;
}

export interface WebPubSubSendToGroupQueryParamProperties {
  /** Excluded connection Ids */
  excluded?: Array<string>;
}

export interface WebPubSubSendToGroupQueryParam {
  queryParameters?: WebPubSubSendToGroupQueryParamProperties;
}

export interface WebPubSubSendToGroupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "application/octet-stream";
}

export type WebPubSubSendToGroupRequestParameters = WebPubSubSendToGroupQueryParam &
  WebPubSubSendToGroupMediaTypesParam &
  WebPubSubSendToGroupBodyParam &
  RequestParameters;

export interface WebPubSubSendToGroupBodyParam1 {
  /** The payload body. */
  body: string;
}

export interface WebPubSubSendToGroupQueryParamProperties {
  /** Excluded connection Ids */
  excluded?: Array<string>;
}

export interface WebPubSubSendToGroupQueryParam1 {
  queryParameters?: WebPubSubSendToGroupQueryParamProperties;
}

export interface WebPubSubSendToGroupMediaTypesParam1 {
  /** Request content type */
  contentType?: "text/plain";
}

export type WebPubSubSendToGroupRequestParameters1 = WebPubSubSendToGroupQueryParam1 &
  WebPubSubSendToGroupMediaTypesParam1 &
  WebPubSubSendToGroupBodyParam1 &
  RequestParameters;
export type WebPubSubSendToGroupParameters =
  | WebPubSubSendToGroupRequestParameters
  | WebPubSubSendToGroupRequestParameters1;
export type WebPubSubAddConnectionToGroupParameters = RequestParameters;
export type WebPubSubRemoveConnectionFromGroupParameters = RequestParameters;
export type WebPubSubUserExistsParameters = RequestParameters;

export interface WebPubSubCloseUserConnectionsQueryParamProperties {
  /** Exclude these connectionIds when closing the connections for the user. */
  excluded?: Array<string>;
  /** The reason closing the client connection. */
  reason?: string;
}

export interface WebPubSubCloseUserConnectionsQueryParam {
  queryParameters?: WebPubSubCloseUserConnectionsQueryParamProperties;
}

export type WebPubSubCloseUserConnectionsParameters = WebPubSubCloseUserConnectionsQueryParam &
  RequestParameters;

export interface WebPubSubSendToUserBodyParam {
  /**
   * The payload body.
   *
   * Value may contain any sequence of octets
   */
  body: string;
}

export interface WebPubSubSendToUserMediaTypesParam {
  /** Request content type */
  contentType?: "application/json" | "application/octet-stream";
}

export type WebPubSubSendToUserRequestParameters = WebPubSubSendToUserMediaTypesParam &
  WebPubSubSendToUserBodyParam &
  RequestParameters;

export interface WebPubSubSendToUserBodyParam1 {
  /** The payload body. */
  body: string;
}

export interface WebPubSubSendToUserMediaTypesParam1 {
  /** Request content type */
  contentType?: "text/plain";
}

export type WebPubSubSendToUserRequestParameters1 = WebPubSubSendToUserMediaTypesParam1 &
  WebPubSubSendToUserBodyParam1 &
  RequestParameters;
export type WebPubSubSendToUserParameters =
  | WebPubSubSendToUserRequestParameters
  | WebPubSubSendToUserRequestParameters1;
export type WebPubSubAddUserToGroupParameters = RequestParameters;
export type WebPubSubRemoveUserFromGroupParameters = RequestParameters;
export type WebPubSubRemoveUserFromAllGroupsParameters = RequestParameters;

export interface WebPubSubGrantPermissionQueryParamProperties {
  /** The meaning of the target depends on the specific permission. For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name. */
  targetName?: string;
}

export interface WebPubSubGrantPermissionQueryParam {
  queryParameters?: WebPubSubGrantPermissionQueryParamProperties;
}

export type WebPubSubGrantPermissionParameters = WebPubSubGrantPermissionQueryParam &
  RequestParameters;

export interface WebPubSubRevokePermissionQueryParamProperties {
  /** The meaning of the target depends on the specific permission. For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name. */
  targetName?: string;
}

export interface WebPubSubRevokePermissionQueryParam {
  queryParameters?: WebPubSubRevokePermissionQueryParamProperties;
}

export type WebPubSubRevokePermissionParameters = WebPubSubRevokePermissionQueryParam &
  RequestParameters;

export interface WebPubSubCheckPermissionQueryParamProperties {
  /** The meaning of the target depends on the specific permission. For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name. */
  targetName?: string;
}

export interface WebPubSubCheckPermissionQueryParam {
  queryParameters?: WebPubSubCheckPermissionQueryParamProperties;
}

export type WebPubSubCheckPermissionParameters = WebPubSubCheckPermissionQueryParam &
  RequestParameters;
