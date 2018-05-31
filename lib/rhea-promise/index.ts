// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export {
  Delivery, Message, OnAmqpEvent, MessageProperties, MessageHeader, EventContext,
  ConnectionOptions, AmqpError, Dictionary, types, message, filter, Filter, MessageUtil,
  uuid_to_string, generate_uuid, string_to_uuid, LinkError, ProtocolError, LinkOptions,
  DeliveryAnnotations, MessageAnnotations
} from "rhea";

export { Connection, ReqResLink } from "./connection";
export { Session } from "./session";
export { Receiver, ReceiverOptions } from "./receiver";
export { Sender, SenderOptions } from "./sender";

/**
 * Defines a mapping for Http like response status codes for different status-code values
 * provided by an AMQP broker.
 * @enum AmqpResponseStatusCode
 */
export enum AmqpResponseStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  Ambiguous = 300,
  MultipleChoices = 300,
  Moved = 301,
  MovedPermanently = 301,
  Found = 302,
  Redirect = 302,
  RedirectMethod = 303,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  RedirectKeepVerb = 307,
  TemporaryRedirect = 307,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  RequestEntityTooLarge = 413,
  RequestUriTooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  UpgradeRequired = 426,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505
}

export const messageProperties: string[] = [
  "message_id", "reply_to", "to", "correlation_id", "content_type", "absolute_expiry_time",
  "group_id", "group_sequence", "reply_to_group_id", "content_encoding", "creation_time", "subject",
  "user_id"
];

export const messageHeader: string[] = [
  "first_acquirer", "delivery_count", "ttl", "durable", "priority"
];

/**
 * Type declaration for a Function type where T is the input to the function and V is the output of the function.
 */
export type Func<T, V> = (a: T) => V;

export enum ReceiverEvents {
  /**
   * @property {string} message Raised when a message is received.
   */
  message = "message",
  /**
   * @property {string} receiverOpen Raised when the remote peer indicates the link is
   * open (i.e. attached in AMQP parlance).
   */
  receiverOpen = "receiver_open",
  /**
   * @property {string} receiverError Raised when the remote peer receives an error. The context
   * may also have an error property giving some information about the reason for the error.
   */
  receiverError = "receiver_error",
  /**
   * @property {string} receiverClose Raised when the remote peer indicates the link is closed.
   */
  receiverClose = "receiver_close"
}

export enum SenderEvents {
  /**
   * @property {string} sendable Raised when the sender has sufficient credit to be able
   * to transmit messages to its peer.
   */
  sendable = "sendable",
  /**
   * @property {string} senderOpen Raised when the remote peer indicates the link is
   * open (i.e. attached in AMQP parlance).
   */
  senderOpen = "sender_open",
  /**
   * @property {string} senderError Raised when the remote peer receives an error. The context
   * may also have an error property giving some information about the reason for the error.
   */
  senderError = "sender_error",
  /**
   * @property {string} senderClose Raised when the remote peer indicates the link is closed.
   */
  senderClose = "sender_close",
  /**
   * @property {string} accepted Raised when a sent message is accepted by the peer.
   */
  accepted = "accepted",
  /**
   * @property {string} released Raised when a sent message is released by the peer.
   */
  released = "released",
  /**
   * @property {string} rejected Raised when a sent message is rejected by the peer.
   */
  rejected = "rejected",
  /**
   * @property {string} modified Raised when a sent message is modified by the peer.
   */
  modified = "modified"
}

export enum SessionEvents {
  /**
   * @property {string} sessionOpen Raised when the remote peer indicates the session is
   * open (i.e. attached in AMQP parlance).
   */
  sessionOpen = "session_open",
  /**
   * @property {string} sessionError Raised when the remote peer receives an error. The context
   * may also have an error property giving some information about the reason for the error.
   */
  sessionError = "session_error",
  /**
   * @property {string} sessionClose Raised when the remote peer indicates the session is closed.
   */
  sessionClose = "session_close"
}

export enum ConnectionEvents {
  /**
   * @property {string} connectionOpen Raised when the remote peer indicates the connection is open.
   */
  connectionOpen = "connection_open",
  /**
   * @property {string} connectionClose Raised when the remote peer indicates the connection is closed.
   */
  connectionClose = "connection_close",
  /**
   * @property {string} connectionError Raised when the remote peer indicates an error occurred on
   * the connection.
   */
  connectionError = "connection_error",
  /**
   * @property {string} disconnected Raised when the underlying tcp connection is lost. The context
   * has a reconnecting property which is true if the library is attempting to automatically reconnect
   * and false if it has reached the reconnect limit. If reconnect has not been enabled or if the connection
   * is a tcp server, then the reconnecting property is undefined. The context may also have an error
   * property giving some information about the reason for the disconnect.
   */
  disconnected = "disconnected"
}
