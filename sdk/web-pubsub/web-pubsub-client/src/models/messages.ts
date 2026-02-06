// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { JSONTypes } from "../webPubSubClient.js";

/**
 * The web pubsub message
 */
export type WebPubSubMessage =
  | GroupDataMessage
  | ServerDataMessage
  | JoinGroupMessage
  | LeaveGroupMessage
  | ConnectedMessage
  | DisconnectedMessage
  | SendToGroupMessage
  | SendEventMessage
  | SequenceAckMessage
  | PingMessage
  | AckMessage
  | InvokeMessage
  | InvokeResponseMessage
  | CancelInvocationMessage
  | PongMessage;

/**
 * The common of web pubsub message
 */
export interface WebPubSubMessageBase {
  kind: DownstreamMessageType | UpstreamMessageType;
}

/**
 * Types for downstream messages
 */
export type DownstreamMessageType =
  /**
   * Type for AckMessage
   */
  | "ack"
  /**
   * Type for PongMessage
   */
  | "pong"
  /**
   * Type for ConnectedMessage
   */
  | "connected"
  /**
   * Type for DisconnectedMessage
   */
  | "disconnected"
  /**
   * Type for GroupDataMessage
   */
  | "groupData"
  /**
   * Type for ServerDataMessage
   */
  | "serverData"
  /**
   * Type for InvokeResponseMessage
   */
  | "invokeResponse";

/**
 * Types for upstream messages
 */
export type UpstreamMessageType =
  /**
   * Type for JoinGroupMessage
   */
  | "joinGroup"
  /**
   * Type for LeaveGroupMessage
   */
  | "leaveGroup"
  /**
   * Type for SendToGroupMessage
   */
  | "sendToGroup"
  /**
   * Type for SendEventMessage
   */
  | "sendEvent"
  /**
   * Type for SequenceAckMessage
   */
  | "sequenceAck"
  /**
   * Type for PingMessage
   */
  | "ping"
  /**
   * Type for InvokeMessage
   */
  | "invoke"
  /**
   * Type for CancelInvocationMessage
   */
  | "cancelInvocation";

/**
 * The ack message
 */
export interface AckMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "ack";
  /**
   * The correspending id
   */
  ackId: number;
  /**
   * Is operation success or not
   */
  success: boolean;
  /**
   * The error detail. Only available when success is false
   */
  error?: AckMessageError;
}

/**
 * The pong message
 */
export interface PongMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "pong";
}

/**
 * Error detail in AckMessage
 */
export interface AckMessageError {
  /**
   * Error name
   */
  name: string;
  /**
   * Details error message
   */
  message: string;
}

/**
 * Connected message
 */
export interface ConnectedMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "connected";
  /**
   * The connection id
   */
  connectionId: string;
  /**
   * The user id of the client connection
   */
  userId: string;
  /**
   * The reconnection token. Only available in reliable protocols.
   */
  reconnectionToken: string;
}

/**
 * Disconnected message
 */
export interface DisconnectedMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "disconnected";
  /**
   * Reason of disconnection.
   */
  message: string;
}

/**
 * Group data message
 */
export interface GroupDataMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "groupData";
  /**
   * The data type
   */
  dataType: WebPubSubDataType;
  /**
   * The data
   */
  data: JSONTypes | ArrayBuffer;
  /**
   * The sequence id of the data. Only available in reliable protocols
   */
  sequenceId?: number;
  /**
   * The name of group that the message come from.
   */
  group: string;
  /**
   * The user id of the sender
   */
  fromUserId: string;
}

/**
 * Server data message
 */
export interface ServerDataMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "serverData";
  /**
   * The data type
   */
  dataType: WebPubSubDataType;
  /**
   * The data
   */
  data: JSONTypes | ArrayBuffer;
  /**
   * The sequence id of the data. Only available in reliable protocols
   */
  sequenceId?: number;
}

/**
 * Join group message
 */
export interface JoinGroupMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "joinGroup";
  /**
   * The group to join
   */
  group: string;
  /**
   * Optional ack id. If specified, an AckMessage with success or not will be returned with the same ackId
   */
  ackId?: number;
}

/**
 * Leave group message
 */
export interface LeaveGroupMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "leaveGroup";
  /**
   * The group to leave
   */
  group: string;
  /**
   * Optional ack id. If specified, an AckMessage with success or not will be returned with the same ackId
   */
  ackId?: number;
}

/**
 * Send custom event message
 */
export interface SendEventMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "sendEvent";
  /**
   * Optional ack id. If specified, an AckMessage with success or not will be returned with the same ackId
   */
  ackId?: number;
  /**
   * The data type
   */
  dataType: WebPubSubDataType;
  /**
   * The data
   */
  data: JSONTypes | ArrayBuffer;
  /**
   * The event name
   */
  event: string;
}

/**
 * Send to group message
 */
export interface SendToGroupMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "sendToGroup";
  /**
   * The group to send
   */
  group: string;
  /**
   * Optional ack id. If specified, an AckMessage with success or not will be returned with the same ackId
   */
  ackId?: number;
  /**
   * The data type
   */
  dataType: WebPubSubDataType;
  /**
   * The data
   */
  data: JSONTypes | ArrayBuffer;
  /**
   * Whether the message needs to echo to sender
   */
  noEcho: boolean;
}

/**
 * Sequence ack message
 */
export interface SequenceAckMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "sequenceAck";
  /**
   * The sequence id
   */
  sequenceId: number;
}

/**
 * Invoke message
 */
export interface InvokeMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "invoke";
  /**
   * The invocation id
   */
  invocationId: string;
  /**
   * The invocation target type. Currently, only upstream events are supported.
   */
  target?: "event";
  /**
   * The event name when targeting upstream events.
   */
  event?: string;
  /**
   * Data type of the payload.
   */
  dataType?: WebPubSubDataType;
  /**
   * Payload data.
   */
  data?: JSONTypes | ArrayBuffer;
}

/**
 * Invoke response message
 */
export interface InvokeResponseMessage extends WebPubSubMessageBase {
  /**
   * Message type.
   */
  readonly kind: "invokeResponse";
  /**
   * The invocation ID that this response is for.
   */
  invocationId: string;
  /**
   * Indicates whether the invocation was successful.
   */
  success?: boolean;
  /**
   * Data type of the payload.
   */
  dataType?: WebPubSubDataType;
  /**
   * Payload data.
   */
  data?: JSONTypes | ArrayBuffer;
  /**
   * Error details if the invocation failed.
   */
  error?: InvokeResponseError;
}

/**
 * Invoke response error details
 */
export interface InvokeResponseError {
  /**
   * The error name.
   */
  name: string;
  /**
   * The error message.
   */
  message: string;
}

/**
 * Cancel invocation message
 */
export interface CancelInvocationMessage extends WebPubSubMessageBase {
  /**
   * The message kind.
   */
  readonly kind: "cancelInvocation";
  /**
   * The invocation ID to cancel.
   */
  invocationId: string;
}

/**
 * Ping message
 */
export interface PingMessage extends WebPubSubMessageBase {
  /**
   * Message type
   */
  readonly kind: "ping";
}

/**
 * The data type
 */
export type WebPubSubDataType =
  /**
   * Binary type
   */
  | "binary"
  /**
   * Json type
   */
  | "json"
  /**
   * Text type
   */
  | "text"
  /**
   * Protobuf type
   */
  | "protobuf";
