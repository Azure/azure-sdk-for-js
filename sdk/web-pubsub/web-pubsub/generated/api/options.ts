// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClientType } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AddUserToGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemoveUserFromGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemoveUserFromAllGroupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SendToUserOptionalParams extends OperationOptions {
  /**
   * Following OData filter syntax to filter out the subscribers receiving the
   * messages.
   */
  filter?: string;
  /**
   * The time-to-live (TTL) value in seconds for messages sent to the service. 0 is
   * the default value, which means the message never expires. 300 is the maximum
   * value. If this parameter is non-zero, messages that are not consumed by the
   * client within the specified TTL will be dropped by the service. This parameter
   * can help when the client's bandwidth is limited.
   */
  messageTtlSeconds?: number;
}

/** Optional parameters. */
export interface CloseUserConnectionsOptionalParams extends OperationOptions {
  /** Exclude these connectionIds when closing the connections for the user. */
  excluded?: string[];
  /** The reason closing the client connection. */
  reason?: string;
}

/** Optional parameters. */
export interface UserExistsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GrantPermissionOptionalParams extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission. For
   * joinLeaveGroup and sendToGroup, targetName is a required parameter standing for
   * the group name.
   */
  targetName?: string;
}

/** Optional parameters. */
export interface CheckPermissionOptionalParams extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission. For
   * joinLeaveGroup and sendToGroup, targetName is a required parameter standing for
   * the group name.
   */
  targetName?: string;
}

/** Optional parameters. */
export interface RevokePermissionOptionalParams extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission. For
   * joinLeaveGroup and sendToGroup, targetName is a required parameter standing for
   * the group name.
   */
  targetName?: string;
}

/** Optional parameters. */
export interface AddConnectionToGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemoveConnectionFromGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListConnectionsInGroupOptionalParams extends OperationOptions {
  /**
   * The maximum number of connections to include in a single response. It should be
   * between 1 and 200.
   */
  maxpagesize?: number;
  /**
   * The maximum number of connections to return. If the value is not set, then all
   * the connections in a group are returned.
   */
  top?: number;
  /**
   * A token that allows the client to retrieve the next page of results. This
   * parameter is provided by the service in the response of a previous request when
   * there are additional results to be fetched. Clients should include the
   * continuationToken in the next request to receive the subsequent page of data.
   * If this parameter is omitted, the server will return the first page of results.
   */
  continuationToken?: string;
}

/** Optional parameters. */
export interface SendToGroupOptionalParams extends OperationOptions {
  /** Excluded connection Ids */
  excluded?: string[];
  /**
   * Following OData filter syntax to filter out the subscribers receiving the
   * messages.
   */
  filter?: string;
  /**
   * The time-to-live (TTL) value in seconds for messages sent to the service. 0 is
   * the default value, which means the message never expires. 300 is the maximum
   * value. If this parameter is non-zero, messages that are not consumed by the
   * client within the specified TTL will be dropped by the service. This parameter
   * can help when the client's bandwidth is limited.
   */
  messageTtlSeconds?: number;
}

/** Optional parameters. */
export interface CloseGroupConnectionsOptionalParams extends OperationOptions {
  /** Exclude these connectionIds when closing the connections in the group. */
  excluded?: string[];
  /** The reason closing the client connection. */
  reason?: string;
}

/** Optional parameters. */
export interface GroupExistsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemoveConnectionFromAllGroupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SendToConnectionOptionalParams extends OperationOptions {
  /**
   * The time-to-live (TTL) value in seconds for messages sent to the service. 0 is
   * the default value, which means the message never expires. 300 is the maximum
   * value. If this parameter is non-zero, messages that are not consumed by the
   * client within the specified TTL will be dropped by the service. This parameter
   * can help when the client's bandwidth is limited.
   */
  messageTtlSeconds?: number;
}

/** Optional parameters. */
export interface ConnectionExistsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CloseConnectionOptionalParams extends OperationOptions {
  /** The reason closing the client connection. */
  reason?: string;
}

/** Optional parameters. */
export interface SendToAllOptionalParams extends OperationOptions {
  /** Excluded connection Ids. */
  excluded?: string[];
  /**
   * Following OData filter syntax to filter out the subscribers receiving the
   * messages.
   */
  filter?: string;
  /**
   * The time-to-live (TTL) value in seconds for messages sent to the service. 0 is
   * the default value, which means the message never expires. 300 is the maximum
   * value. If this parameter is non-zero, messages that are not consumed by the
   * client within the specified TTL will be dropped by the service. This parameter
   * can help when the client's bandwidth is limited.
   */
  messageTtlSeconds?: number;
}

/** Optional parameters. */
export interface RemoveConnectionsFromGroupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GenerateClientTokenOptionalParams extends OperationOptions {
  /** User Id. */
  userId?: string;
  /** Roles that the connection with the generated token will have. */
  role?: string[];
  /** The expire time of the generated token. */
  minutesToExpire?: number;
  /** Groups that the connection will join when it connects. */
  group?: string[];
  /**
   * The type of client. Case-insensitive. If not set, it's "Default". For Web
   * PubSub for Socket.IO, only the default value is supported. For Web PubSub, the
   * valid values are 'Default' and 'MQTT'.
   */
  clientType?: WebPubSubClientType;
}

/** Optional parameters. */
export interface CloseAllConnectionsOptionalParams extends OperationOptions {
  /** Exclude these connectionIds when closing the connections in the hub. */
  excluded?: string[];
  /** The reason closing the client connection. */
  reason?: string;
}

/** Optional parameters. */
export interface AddConnectionsToGroupsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetServiceStatusOptionalParams extends OperationOptions {}
