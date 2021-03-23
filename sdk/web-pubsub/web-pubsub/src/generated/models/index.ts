import * as coreHttp from "@azure/core-http";

/** Known values of {@link Enum0} that the service accepts. */
export const enum KnownEnum0 {
  SendToGroup = "sendToGroup",
  JoinLeaveGroup = "joinLeaveGroup"
}

/**
 * Defines values for Enum0. \
 * {@link KnownEnum0} can be used interchangeably with Enum0,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **sendToGroup** \
 * **joinLeaveGroup**
 */
export type Enum0 = string;

/** Known values of {@link Enum1} that the service accepts. */
export const enum KnownEnum1 {
  SendToGroup = "sendToGroup",
  JoinLeaveGroup = "joinLeaveGroup"
}

/**
 * Defines values for Enum1. \
 * {@link KnownEnum1} can be used interchangeably with Enum1,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **sendToGroup** \
 * **joinLeaveGroup**
 */
export type Enum1 = string;

/** Known values of {@link Enum2} that the service accepts. */
export const enum KnownEnum2 {
  SendToGroup = "sendToGroup",
  JoinLeaveGroup = "joinLeaveGroup"
}

/**
 * Defines values for Enum2. \
 * {@link KnownEnum2} can be used interchangeably with Enum2,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **sendToGroup** \
 * **joinLeaveGroup**
 */
export type Enum2 = string;

/** Optional parameters. */
export interface WebPubSubSendToAll$binaryOptionalParams
  extends coreHttp.OperationOptions {
  /** Excluded connection Ids. */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubSendToAll$textOptionalParams
  extends coreHttp.OperationOptions {
  /** Excluded connection Ids. */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubCloseClientConnectionOptionalParams
  extends coreHttp.OperationOptions {
  /** The reason closing the client connection. */
  reason?: string;
}

/** Optional parameters. */
export interface WebPubSubSendToGroup$binaryOptionalParams
  extends coreHttp.OperationOptions {
  /** Excluded connection Ids */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubSendToGroup$textOptionalParams
  extends coreHttp.OperationOptions {
  /** Excluded connection Ids */
  excluded?: string[];
}

/** Optional parameters. */
export interface WebPubSubGrantPermissionOptionalParams
  extends coreHttp.OperationOptions {
  /** Optional. If not set, grant the permission to all the targets. If set, grant the permission to the specific target. The meaning of the target depends on the specific permission. */
  targetName?: string;
}

/** Optional parameters. */
export interface WebPubSubRevokePermissionOptionalParams
  extends coreHttp.OperationOptions {
  /** Optional. If not set, revoke the permission for all targets. If set, revoke the permission for the specific target. The meaning of the target depends on the specific permission. */
  targetName?: string;
}

/** Optional parameters. */
export interface WebPubSubCheckPermissionOptionalParams
  extends coreHttp.OperationOptions {
  /** Optional. If not set, get the permission for all targets. If set, get the permission for the specific target. The meaning of the target depends on the specific permission. */
  targetName?: string;
}

/** Optional parameters. */
export interface AzureWebPubSubServiceRestAPIOptionalParams
  extends coreHttp.ServiceClientOptions {
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
