// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AmqpError, AmqpResponseStatusCode } from "../lib/rhea-promise";

/**
 * Maps the conditions to the numeric AMQP Response status codes.
 * @enum {ConditionStatusMapper}
 */
export enum ConditionStatusMapper {
  "com.microsoft:timeout" = AmqpResponseStatusCode.RequestTimeout,
  "amqp:not-found" = AmqpResponseStatusCode.NotFound,
  "amqp:not-implemented" = AmqpResponseStatusCode.NotImplemented,
  "com.microsoft:entity-already-exists" = AmqpResponseStatusCode.Conflict,
  "com.microsoft:session-lock-lost" = AmqpResponseStatusCode.Gone,
  "com.microsoft:no-matching-subscription" = AmqpResponseStatusCode.InternalServerError,
  "amqp:link:message-size-exceeded" = AmqpResponseStatusCode.Forbidden,
  "com.microsoft:server-busy" = AmqpResponseStatusCode.ServiceUnavailable,
  "com.microsoft:argument-error" = AmqpResponseStatusCode.BadRequest,
  "com.microsoft:argument-out-of-range" = AmqpResponseStatusCode.BadRequest,
  "com.microsoft:store-lock-lost" = AmqpResponseStatusCode.Gone,
  "com.microsoft:session-cannot-be-locked" = AmqpResponseStatusCode.Gone,
  "com.microsoft:partition-not-owned" = AmqpResponseStatusCode.Gone,
  "com.microsoft:entity-disabled" = AmqpResponseStatusCode.BadRequest,
  "com.microsoft:publisher-revoked" = AmqpResponseStatusCode.Unauthorized,
  "amqp:link:stolen" = AmqpResponseStatusCode.Gone,
  "amqp:not-allowed" = AmqpResponseStatusCode.BadRequest,
  "amqp:unauthorized-access" = AmqpResponseStatusCode.Unauthorized,
  "amqp:resource-limit-exceeded" = AmqpResponseStatusCode.Forbidden,
  "com.microsoft:message-lock-lost" = AmqpResponseStatusCode.Gone,
}

/**
 * Maps the conditions to the Error names.
 * @enum {ConditionErrorNameMapper}
 */
export enum ConditionErrorNameMapper {
  /**
   * Error is thrown when an internal server error occured. You may have found a bug?
   */
  "amqp:internal-error" = "InternalServerError", // Retryable
  /**
   * Error for signaling general communication errors related to messaging operations.
   */
  "amqp:not-found" = "EventHubsCommunicationError",
  /**
   * Error is thrown when a feature is not implemented yet but the placeholder is present.
   */
  "amqp:not-implemented" = "NotImplementedError",
  /**
   * Error is thrown when an operation is attempted but is not allowed.
   */
  "amqp:not-allowed" = "InvalidOperationError",
  /**
   * Error is thrown the the Azure Event Hub quota has been exceeded.
   * Quotas are reset periodically, this operation will have to wait until then.
   * The messaging entity has reached its maximum allowable size.
   * This can happen if the maximum number of receivers (which is 5) has already
   * been opened on a per-consumer group level.
   */
  "amqp:resource-limit-exceeded" = "QuotaExceededError",
  /**
   * Error is thrown when the connection parameters are wrong and the server refused the connection.
   */
  "amqp:unauthorized-access" = "UnauthorizedError",
  /**
   * Error is thrown when the service is unavailable. The operation should be retried.
   */
  "com.microsoft:timeout" = "ServiceUnavailableError", // Retryable
  /**
   * Error is thrown when an argument has a value that is out of the admissible range.
   */
  "com.microsoft:argument-out-of-range" = "ArgumentOutOfRangeError",
  /**
   * Error is thrown when a condition that should have been met in order to execute an operation was not.
   */
  "amqp:precondition-failed" = "PreconditionFailedError",
  /**
   * Error is thrown when data could not be decoded.
   */
  "amqp:decode-error" = "DecodeError",
  /**
   * Error is thrown when an invalid field was passed in a frame body, and the operation could not proceed.
   */
  "amqp:invalid-field" = "InvalidFieldError",
  /**
   * Error is thrown when the client attempted to work with a server entity to which it
   * has no access because another client is working with it.
   */
  "amqp:resource-locked" = "ResourceLockedError",
  /**
   * Error is thrown when a server entity the client is working with has been deleted.
   */
  "amqp:resource-deleted" = "ResourceDeletedError",
  /**
   * Error is thrown when the peer sent a frame that is not permitted in the current state.
   */
  "amqp:illegal-state" = "IllegalStateError",
  /**
   * Error is thrown when the peer cannot send a frame because the smallest encoding of
   * the performative with the currently valid values would be too large to fit within
   * a frame of the agreed maximum frame size.
   */
  "amqp:frame-size-too-small" = "FrameSizeTooSmallError",
  /**
   * Error is thrown when an operator intervened to detach for some reason.
   */
  "amqp:link:detach-forced" = "DetachForcedError",
  /**
   * Error is thrown when the peer sent more message transfers than currently allowed on the link.
   */
  "amqp:link:transfer-limit-exceeded" = "TransferLimitExceededError",
  /**
   * Error is thrown when the message sent is too large: the maximum size is 256Kb.
   */
  "amqp:link:message-size-exceeded" = "MessageTooLargeError",
  /**
   * Error is thrown when the address provided cannot be resolved to a terminus at the current container.
   */
  "amqp:link:redirect" = "LinkRedirectError",
  /**
   * Error is thrown when two or more instances connect to the same partition
   * with different epoch values.
   */
  "amqp:link:stolen" = "ReceiverDisconnectedError",
  /**
   * Error is thrown when the peer violated incoming window for the session.
   */
  "amqp:session:window-violation" = "SessionWindowViolationError",
  /**
   * Error is thrown when input was received for a link that was detached with an error.
   */
  "amqp:session:errant-link" = "ErrantLinkError", // Retryable
  /**
   * Error is thrown when an attach was received using a handle that is already in use for an attached link.
   */
  "amqp:session:handle-in-use" = "HanldeInUseError",
  /**
   * Error is thrown when a frame (other than attach) was received referencing a handle which is not
   * currently in use of an attached link.
   */
  "amqp:session:unattached-handle" = "UnattachedHandleError",
  /**
   * Error is thrown when an operator intervened to close the connection for some reason.
   */
  "amqp:connection:forced" = "ConnectionForcedError",
  /**
   * Error is thrown when a valid frame header cannot be formed from the incoming byte stream.
   */
  "amqp:connection:framing-error" = "FramingError",
  /**
   * Error is thrown when the container is no longer available on the current connection.
   */
  "amqp:connection:redirect" = "ConnectionRedirectError",
  /**
   * Error is thrown when the server is busy. Callers should wait a while and retry the operation.
   */
  "com.microsoft:server-busy" = "ServerBusyError", // Retryable
  /**
   * Error is thrown when an incorrect argument was received.
   */
  "com.microsoft:argument-error" = "ArgumentError"
}

/**
 * Maps the conditions to the Error names.
 * @enum {ErrorNameConditionMapper}
 */
export enum ErrorNameConditionMapper {
  /**
   * Error is thrown when an internal server error occured. You may have found a bug?
   */
  InternalServerError = "amqp:internal-error", // Retryable
  /**
   * Error for signaling general communication errors related to messaging operations.
   */
  EventHubsCommunicationError = "amqp:not-found",
  /**
   * Error is thrown when a feature is not implemented yet but the placeholder is present.
   */
  NotImplementedError = "amqp:not-implemented",
  /**
   * Error is thrown when an operation is attempted but is not allowed.
   */
  InvalidOperationError = "amqp:not-allowed",
  /**
   * Error is thrown the the Azure Event Hub quota has been exceeded.
   * Quotas are reset periodically, this operation will have to wait until then.
   * The messaging entity has reached its maximum allowable size.
   * This can happen if the maximum number of receivers (which is 5) has already
   * been opened on a per-consumer group level.
   */
  QuotaExceededError = "amqp:resource-limit-exceeded",
  /**
   * Error is thrown when the connection parameters are wrong and the server refused the connection.
   */
  UnauthorizedError = "amqp:unauthorized-access",
  /**
   * Error is thrown when the service is unavailable. The operation should be retried.
   */
  ServiceUnavailableError = "com.microsoft:timeout", // Retryable
  /**
   * Error is thrown when an argument has a value that is out of the admissible range.
   */
  ArgumentOutOfRangeError = "com.microsoft:argument-out-of-range",
  /**
   * Error is thrown when a condition that should have been met in order to execute an operation was not.
   */
  PreconditionFailedError = "amqp:precondition-failed",
  /**
   * Error is thrown when data could not be decoded.
   */
  DecodeError = "amqp:decode-error",
  /**
   * Error is thrown when an invalid field was passed in a frame body, and the operation could not proceed.
   */
  InvalidFieldError = "amqp:invalid-field",
  /**
   * Error is thrown when the client attempted to work with a server entity to which it
   * has no access because another client is working with it.
   */
  ResourceLockedError = "amqp:resource-locked",
  /**
   * Error is thrown when a server entity the client is working with has been deleted.
   */
  ResourceDeletedError = "amqp:resource-deleted",
  /**
   * Error is thrown when the peer sent a frame that is not permitted in the current state.
   */
  IllegalStateError = "amqp:illegal-state",
  /**
   * Error is thrown when the peer cannot send a frame because the smallest encoding of
   * the performative with the currently valid values would be too large to fit within
   * a frame of the agreed maximum frame size.
   */
  FrameSizeTooSmallError = "amqp:frame-size-too-small",
  /**
   * Error is thrown when an operator intervened to detach for some reason.
   */
  DetachForcedError = "amqp:link:detach-forced",
  /**
   * Error is thrown when the peer sent more message transfers than currently allowed on the link.
   */
  TransferLimitExceededError = "amqp:link:transfer-limit-exceeded",
  /**
   * Error is thrown when the message sent is too large: the maximum size is 256Kb.
   */
  MessageTooLargeError = "amqp:link:message-size-exceeded",
  /**
   * Error is thrown when the address provided cannot be resolved to a terminus at the current container.
   */
  LinkRedirectError = "amqp:link:redirect",
  /**
   * Error is thrown when two or more instances connect to the same partition
   * with different epoch values.
   */
  ReceiverDisconnectedError = "amqp:link:stolen",
  /**
   * Error is thrown when the peer violated incoming window for the session.
   */
  SessionWindowViolationError = "amqp:session:window-violation",
  /**
   * Error is thrown when input was received for a link that was detached with an error.
   */
  ErrantLinkError = "amqp:session:errant-link", // Retryable
  /**
   * Error is thrown when an attach was received using a handle that is already in use for an attached link.
   */
  HanldeInUseError = "amqp:session:handle-in-use",
  /**
   * Error is thrown when a frame (other than attach) was received referencing a handle which is not
   * currently in use of an attached link.
   */
  UnattachedHandleError = "amqp:session:unattached-handle",
  /**
   * Error is thrown when an operator intervened to close the connection for some reason.
   */
  ConnectionForcedError = "amqp:connection:forced",
  /**
   * Error is thrown when a valid frame header cannot be formed from the incoming byte stream.
   */
  FramingError = "amqp:connection:framing-error",
  /**
   * Error is thrown when the container is no longer available on the current connection.
   */
  ConnectionRedirectError = "amqp:connection:redirect",
  /**
   * Error is thrown when the server is busy. Callers should wait a while and retry the operation.
   */
  ServerBusyError = "com.microsoft:server-busy", // Retryable
  /**
   * Error is thrown when an incorrect argument was received.
   */
  ArgumentError = "com.microsoft:argument-error"
}

/**
 * Describes the base class for an EventHub Error.
 * @class {EventHubsError}
 * @extends Error
 */
export class EventHubsError extends Error {
  /**
   * @property {string} [condition] The error condition.
   */
  condition?: string;
  /**
   * @property {string} name The error name. Default value: "EventHubsError".
   */
  name: string = "EventHubsError";
  /**
   * @property {boolean} translated Has the error been translated. Default: true.
   */
  translated: boolean = true;
  /**
   *
   * @property {boolean} retryable Describes whether the error is retryable. Default: false.
   */
  retryable: boolean = false;
  /**
   * @property {any} [info] Any additional error information given by the service.
   */
  info?: any;
  /**
   * @param {string} message The error message that provides more information about the error.
   */
  constructor(message: string) {
    super(message);
  }
}

/**
 * Determines whether the given error object is like an AmqpError object.
 * @param err The AmqpError object
 */
function isAmqpError(err: any): boolean {
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

/**
 * Translates the AQMP error received at the protocol layer or a generic Error into an EventHubsError.
 *
 * @param {AmqpError} err The amqp error that was received.
 * @returns {EventHubsError} EventHubsError object.
 */
export function translate(err: AmqpError | Error): EventHubsError {
  if ((err as EventHubsError).translated) { // already translated
    return err as EventHubsError;
  } else if (isAmqpError(err)) { // translate
    const condition = (err as AmqpError).condition;
    const description = (err as AmqpError).description as string;
    const error = new EventHubsError(description);
    error.info = (err as AmqpError).info;
    error.condition = condition;
    if (condition) {
      if (condition === "com.microsoft:precondition-failed") {
        error.name = "PreconditionFailedError";
      } else {
        error.name = ConditionErrorNameMapper[condition as any] || "EventHubsError";
      }
    }
    if (description &&
      (description.includes("status-code: 404") ||
        description.match(/The messaging entity .* could not be found.*/i) !== null)) {
      error.name = "MessagingEntityNotFoundError";
    }
    if (error.name === "InternalServerError"
      || error.name === "ServerBusyError"
      || error.name === "ServiceUnavailableError") {
      error.retryable = true;
    }
    return error;
  } else {
    // Translate a generic error into EventHubsError.
    const error = new EventHubsError((err as Error).message);
    return error;
  }
}
