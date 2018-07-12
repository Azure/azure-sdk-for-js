// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export {
  Delivery, Message, OnAmqpEvent, MessageProperties, MessageHeader, EventContext,
  ConnectionOptions, AmqpError, Dictionary, types, message, filter, Filter, MessageUtil,
  uuid_to_string, generate_uuid, string_to_uuid, LinkError, ProtocolError, LinkOptions,
  DeliveryAnnotations, MessageAnnotations, ReceiverEvents, SenderEvents, ConnectionEvents,
  SessionEvents
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

/**
 * Determines whether the given error object is like an AmqpError object.
 * @param err The AmqpError object
 */
export function isAmqpError(err: any): boolean {
  if (!err || typeof err !== "object") {
    throw new Error("err is a required parameter and must be of type 'object'.");
  }
  let result: boolean = false;
  if (((err.condition && typeof err.condition === "string") && (err.description && typeof err.description === "string"))
    || (err.value && Array.isArray(err.value))
    || (err.constructor && err.constructor.name === "c")) {
    result = true;
  }
  return result;
}
