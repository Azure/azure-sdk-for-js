import * as coreClient from "@azure/core-client";

export interface ClientTokenResponse {
  token?: string;
}

/** Known values of {@link WebPubSubPermission} that the service accepts. */
export enum KnownWebPubSubPermission {
  SendToGroup = "sendToGroup",
  JoinLeaveGroup = "joinLeaveGroup"
}

/**
 * Defines values for WebPubSubPermission. \
 * {@link KnownWebPubSubPermission} can be used interchangeably with WebPubSubPermission,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **sendToGroup** \
 * **joinLeaveGroup**
 */
export type WebPubSubPermission = string;
/** Defines values for ContentType. */
export type ContentType = "application/json" | "application/octet-stream";

/** Optional parameters. */
export interface HealthApiGetServiceStatusOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubGenerateClientTokenOptionalParams
  extends coreClient.OperationOptions {
  /** User Id. */
  userId?: string;
  /** Roles that the connection with the generated token will have. */
  role?: string[];
  /** The expire time of the generated token. */
  minutesToExpire?: number;
}

/** Contains response data for the generateClientToken operation. */
export type WebPubSubGenerateClientTokenResponse = ClientTokenResponse;

/** Optional parameters. */
export interface WebPubSubSendToAll$binaryOptionalParams
  extends coreClient.OperationOptions {
  /** Excluded connection Ids. */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubSendToAll$textOptionalParams
  extends coreClient.OperationOptions {
  /** Excluded connection Ids. */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubConnectionExistsOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubCloseConnectionOptionalParams
  extends coreClient.OperationOptions {
  /** The reason closing the client connection. */
  reason?: string;
}

/** Optional parameters. */
export interface WebPubSubSendToConnection$binaryOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubSendToConnection$textOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubGroupExistsOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubSendToGroup$binaryOptionalParams
  extends coreClient.OperationOptions {
  /** Excluded connection Ids */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubSendToGroup$textOptionalParams
  extends coreClient.OperationOptions {
  /** Excluded connection Ids */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubAddConnectionToGroupOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubRemoveConnectionFromGroupOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubUserExistsOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubSendToUser$binaryOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubSendToUser$textOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubAddUserToGroupOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubRemoveUserFromGroupOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubRemoveUserFromAllGroupsOptionalParams
  extends coreClient.OperationOptions {}

/** Optional parameters. */
export interface WebPubSubGrantPermissionOptionalParams
  extends coreClient.OperationOptions {
  /** The meaning of the target depends on the specific permission. For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name. */
  targetName?: string;
}

/** Optional parameters. */
export interface WebPubSubRevokePermissionOptionalParams
  extends coreClient.OperationOptions {
  /** The meaning of the target depends on the specific permission. For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name. */
  targetName?: string;
}

/** Optional parameters. */
export interface WebPubSubCheckPermissionOptionalParams
  extends coreClient.OperationOptions {
  /** The meaning of the target depends on the specific permission. For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name. */
  targetName?: string;
}

/** Optional parameters. */
export interface AzureWebPubSubServiceRestAPIOptionalParams
  extends coreClient.ServiceClientOptions {
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
