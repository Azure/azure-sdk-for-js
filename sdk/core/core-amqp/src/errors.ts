// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { AmqpResponseStatusCode, isAmqpError, AmqpError } from "rhea-promise";
import { isNode } from "../src/util/utils";

/**
 * Maps the conditions to the numeric AMQP Response status codes.
 * @enum {ConditionStatusMapper}
 */
export enum ConditionStatusMapper {
  "com.microsoft:timeout" = AmqpResponseStatusCode.RequestTimeout,
  "amqp:not-found" = AmqpResponseStatusCode.NotFound,
  "amqp:not-implemented" = AmqpResponseStatusCode.NotImplemented,
  "com.microsoft:entity-already-exists" = AmqpResponseStatusCode.Conflict,
  "com.microsoft:message-lock-lost" = AmqpResponseStatusCode.Gone,
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
  "amqp:resource-limit-exceeded" = AmqpResponseStatusCode.Forbidden
}

/**
 * Maps the amqp error conditions to the Error names.
 * @enum {ConditionErrorNameMapper}
 */
export enum ConditionErrorNameMapper {
  /**
   * Error is thrown when the address is already in use.
   */
  "com.microsoft:address-already-in-use" = "AddressAlreadyInUseError",
  /**
   * Error is thrown when the store lock is lost.
   */
  "com.microsoft:store-lock-lost" = "StoreLockLostError",
  /**
   * Error is thrown when a matching subscription is not found.
   */
  "com.microsoft:no-matching-subscription" = "NoMatchingSubscriptionError",
  /**
   * Error is thrown when an attempt is made to access a parition that is not owned by the
   * requesting entity.
   */
  "com.microsoft:partition-not-owned" = "PartitionNotOwnedError",
  /**
   * Error is thrown when access to publisher has been revoked.
   */
  "com.microsoft:publisher-revoked" = "PublisherRevokedError",
  /**
   * Error is thrown when an attempt is made to create an entity that already exists.
   */
  "com.microsoft:entity-already-exists" = "MessagingEntityAlreadyExistsError",
  /**
   * Error is thrown when trying to access/connect to a disabled messaging entity.
   */
  "com.microsoft:entity-disabled" = "MessagingEntityDisabledError",
  /**
   * Error is thrown when the lock on the message is lost.
   */
  "com.microsoft:message-lock-lost" = "MessageLockLostError",
  /**
   * Error is thrown when the lock on the Azure ServiceBus session is lost.
   */
  "com.microsoft:session-lock-lost" = "SessionLockLostError",
  /**
   * Error is thrown when the Azure ServiceBus session cannot be locked.
   */
  "com.microsoft:session-cannot-be-locked" = "SessionCannotBeLockedError",
  /**
   * Error is thrown when an internal server error occured. You may have found a bug?
   */
  "amqp:internal-error" = "InternalServerError", // Retryable
  /**
   * Error for signaling general communication errors related to messaging operations.
   */
  "amqp:not-found" = "ServiceCommunicationError",
  /**
   * Error is thrown when the message is not found.
   */
  "com.microsoft:message-not-found" = "MessageNotFoundError",
  /**
   * Error is thrown when relay is not found.
   */
  "com.microsoft:relay-not-found" = "RelayNotFoundError",
  /**
   * Error is thrown when a feature is not implemented yet but the placeholder is present.
   */
  "amqp:not-implemented" = "NotImplementedError",
  /**
   * Error is thrown when an operation is attempted but is not allowed.
   */
  "amqp:not-allowed" = "InvalidOperationError",
  /**
   * Error is thrown the the Azure EventHub/ServiceBus quota has been exceeded.
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
   * Error is thrown when the connection parameters are wrong and the server refused the connection.
   */
  "com.microsoft:auth-failed" = "UnauthorizedError",
  /**
   * Error is thrown when the service is unavailable. The operation should be retried.
   */
  "com.microsoft:timeout" = "ServiceUnavailableError", // Retryable
  /**
   * Error is thrown when no new messages are received for the specified time.
   */
  "com.microsoft:message-wait-timeout" = "MessageWaitTimeout",
  /**
   * Error is thrown when timeout happens for the said operation.
   */
  "amqp:operation-timeout" = "OperationTimeoutError",
  /**
   * Error is thrown when an argument has a value that is out of the admissible range.
   */
  "com.microsoft:argument-out-of-range" = "ArgumentOutOfRangeError",
  /**
   * Error is thrown when a condition that should have been met in order to execute an operation was not.
   */
  "amqp:precondition-failed" = "PreconditionFailedError",
  /**
   * Error is thrown when a condition that should have been met in order to execute an operation was not.
   */
  "com.microsoft:precondition-failed" = "PreconditionFailedError",
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
  "amqp:link:detach-forced" = "DetachForcedError", // Retryable
  /**
   * Error is thrown when the peer sent more message transfers than currently allowed on the link.
   */
  "amqp:link:transfer-limit-exceeded" = "TransferLimitExceededError", // Retryable
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
  "amqp:session:errant-link" = "ErrantLinkError",
  /**
   * Error is thrown when an attach was received using a handle that is already in use for an attached link.
   */
  "amqp:session:handle-in-use" = "HandleInUseError",
  /**
   * Error is thrown when a frame (other than attach) was received referencing a handle which is not
   * currently in use of an attached link.
   */
  "amqp:session:unattached-handle" = "UnattachedHandleError",
  /**
   * Error is thrown when an operator intervened to close the connection for some reason.
   */
  "amqp:connection:forced" = "ConnectionForcedError", // Retryable
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
  "com.microsoft:argument-error" = "ArgumentError",
  /**
   * Error is thrown when server cancels the operation due to an internal issue.
   */
  "com.microsoft:operation-cancelled" = "OperationCancelledError", // Retryable
  /**
   * Error is thrown when the client sender does not have enough link credits to send the message.
   */
  "client.sender:not-enough-link-credit" = "SenderBusyError", // Retryable
  /**
   * Error is thrown when a low level system error is thrown by node.js.
   * {@link https://nodejs.org/dist/latest-v8.x/docs/api/all.html#errors_class_system_error}
   */
  "system:error" = "SystemError"
}

/**
 * Maps the Error names to the amqp error conditions.
 * @enum {ErrorNameConditionMapper}
 */
export enum ErrorNameConditionMapper {
  /**
   * Error is thrown when the address is already in use.
   */
  AddressAlreadyInUseError = "com.microsoft:address-already-in-use",
  /**
   * Error is thrown when the store lock is lost.
   */
  StoreLockLostError = "com.microsoft:store-lock-lost",
  /**
   * Error is thrown when a matching subscription is not found.
   */
  NoMatchingSubscriptionError = "com.microsoft:no-matching-subscription",
  /**
   * Error is thrown when an attempt is made to access a parition that is not owned by the
   * requesting entity.
   */
  PartitionNotOwnedError = "com.microsoft:partition-not-owned",
  /**
   * Error is thrown when access to publisher has been revoked.
   */
  PublisherRevokedError = "com.microsoft:publisher-revoked",
  /**
   * Error is thrown when an attempt is made to create an entity that already exists.
   */
  MessagingEntityAlreadyExistsError = "com.microsoft:entity-already-exists",
  /**
   * Error is thrown when trying to access/connect to a disabled messaging entity.
   */
  MessagingEntityDisabledError = "com.microsoft:entity-disabled",
  /**
   * Error is thrown when the lock on the message is lost.
   */
  MessageLockLostError = "com.microsoft:message-lock-lost",
  /**
   * Error is thrown when the lock on the Azure ServiceBus session is lost.
   */
  SessionLockLostError = "com.microsoft:session-lock-lost",
  /**
   * Error is thrown when the Azure ServiceBus session cannot be locked.
   */
  SessionCannotBeLockedError = "com.microsoft:session-cannot-be-locked",
  /**
   * Error is thrown when an internal server error occured. You may have found a bug?
   */
  InternalServerError = "amqp:internal-error", // Retryable
  /**
   * Error for signaling general communication errors related to messaging operations.
   */
  ServiceCommunicationError = "amqp:not-found",
  /**
   * Error is thrown when message is not found.
   */
  MessageNotFoundError = "com.microsoft:message-not-found",
  /**
   * Error is thrown when relay is not found.
   */
  RelayNotFoundError = "com.microsoft:relay-not-found",
  /**
   * Error is thrown when a feature is not implemented yet but the placeholder is present.
   */
  NotImplementedError = "amqp:not-implemented",
  /**
   * Error is thrown when an operation is attempted but is not allowed.
   */
  InvalidOperationError = "amqp:not-allowed",
  /**
   * Error is thrown the the Azure EventHub/ServiceBus quota has been exceeded.
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
   * Error is thrown when no new messages are received for the specified time.
   */
  MessageWaitTimeout = "com.microsoft:message-wait-timeout",
  /**
   * Error is thrown when timeout happens for the said operation.
   */
  OperationTimeoutError = "amqp:operation-timeout",
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
  DetachForcedError = "amqp:link:detach-forced", // Retryable
  /**
   * Error is thrown when the peer sent more message transfers than currently allowed on the link.
   */
  TransferLimitExceededError = "amqp:link:transfer-limit-exceeded", // Retryable
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
  ErrantLinkError = "amqp:session:errant-link",
  /**
   * Error is thrown when an attach was received using a handle that is already in use for an attached link.
   */
  HandleInUseError = "amqp:session:handle-in-use",
  /**
   * Error is thrown when a frame (other than attach) was received referencing a handle which is not
   * currently in use of an attached link.
   */
  UnattachedHandleError = "amqp:session:unattached-handle",
  /**
   * Error is thrown when an operator intervened to close the connection for some reason.
   */
  ConnectionForcedError = "amqp:connection:forced", // Retryable
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
  ArgumentError = "com.microsoft:argument-error",
  /**
   * Error is thrown when server cancels the operation due to an internal issue.
   */
  OperationCancelledError = "com.microsoft:operation-cancelled", // Retryable
  /**
   * Error is thrown when the client sender does not have enough link credits to send the message.
   */
  SenderBusyError = "client.sender:not-enough-link-credit", // Retryable
  /**
   * Error is thrown when a low level system error is thrown by node.js.
   * {@link https://nodejs.org/api/errors.html#errors_class_systemerror}
   */
  SystemError = "system:error"
}

/**
 * Describes the base class for Messaging Error.
 * @class {MessagingError}
 * @extends Error
 */
export class MessagingError extends Error {
  /**
   * @property {string} [condition] The error condition.
   */
  condition?: string;
  /**
   * @property {string} name The error name. Default value: "MessagingError".
   */
  name: string = "MessagingError";
  /**
   * @property {boolean} translated Has the error been translated. Default: true.
   */
  translated: boolean = true;
  /**
   *
   * @property {boolean} retryable Describes whether the error is retryable. Default: true.
   */
  retryable: boolean = true;
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
 * Provides a list of retryable AMQP errors.
 * "InternalServerError", "ServerBusyError", "ServiceUnavailableError", "OperationCancelledError",
 * "SenderBusyError", "MessagingError", "DetachForcedError", "ConnectionForcedError",
 * "TransferLimitExceededError"
 */
export const retryableErrors: string[] = [
  "InternalServerError",
  "ServerBusyError",
  "ServiceUnavailableError",
  "OperationCancelledError",
  "SenderBusyError",
  "MessagingError",
  "DetachForcedError",
  "ConnectionForcedError",
  "TransferLimitExceededError"
];

/**
 * Maps some SytemErrors to amqp error conditions
 * @enum SystemErrorConditionMapper
 */
export enum SystemErrorConditionMapper {
  ENOTFOUND = "amqp:not-found",
  EBUSY = "com.microsoft:server-busy",
  ECONNREFUSED = "amqp:connection:forced",
  ETIMEDOUT = "com.microsoft:timeout",
  ECONNRESET = "com.microsoft:timeout",
  ENETDOWN = "com.microsoft:timeout",
  EHOSTDOWN = "com.microsoft:timeout",
  ENETRESET = "com.microsoft:timeout",
  ENETUNREACH = "com.microsoft:timeout",
  ENONET = "com.microsoft:timeout"
}

export function isSystemError(err: any): boolean {
  let result: boolean = false;
  if (
    err.code &&
    typeof err.code === "string" &&
    (err.syscall && typeof err.syscall === "string") &&
    (err.errno && (typeof err.errno === "string" || typeof err.errno === "number"))
  ) {
    result = true;
  }
  return result;
}

/**
 * @internal
 * Since browser doesnt differentiate between the various kinds of service communication errors,
 * this utility is used to look at the error target to identify such category of errors.
 * For more information refer to - https://html.spec.whatwg.org/multipage/comms.html#feedback-from-the-protocol
 * @param err object that may contain error information
 */
function isBrowserWebsocketError(err: any): boolean {
  let result: boolean = false;
  if (
    !isNode &&
    window &&
    err.type === "error" &&
    err.target instanceof (window as any).WebSocket
  ) {
    result = true;
  }
  return result;
}

/**
 * Translates the AQMP error received at the protocol layer or a generic Error into a MessagingError.
 *
 * @param {AmqpError} err The amqp error that was received.
 * @returns {MessagingError} MessagingError object.
 */
export function translate(err: AmqpError | Error): MessagingError {
  if ((err as MessagingError).translated) {
    // already translated
    return err as MessagingError;
  }

  let error: MessagingError = err as MessagingError;

  // Built-in errors like TypeError and RangeError should not be retryable as these indicate issues
  // with user input and not an issue with the Messaging process.
  if (err instanceof TypeError || err instanceof RangeError) {
    error.retryable = false;
    return error;
  }

  if (isAmqpError(err)) {
    // translate
    const condition = (err as AmqpError).condition;
    const description = (err as AmqpError).description as string;
    error = new MessagingError(description);
    if ((err as any).stack) error.stack = (err as any).stack;
    error.info = (err as AmqpError).info;
    error.condition = condition;
    if (condition) {
      error.name = ConditionErrorNameMapper[condition as any];
    }
    if (!error.name) error.name = "MessagingError";
    if (
      description &&
      (description.includes("status-code: 404") ||
        description.match(/The messaging entity .* could not be found.*/i) !== null)
    ) {
      error.name = "MessagingEntityNotFoundError";
    }
    if (retryableErrors.indexOf(error.name) === -1) {
      // not found
      error.retryable = false;
    }
  } else if (isSystemError(err)) {
    // translate
    const condition = (err as any).code;
    const description = (err as Error).message;
    error = new MessagingError(description);
    if ((err as any).stack) error.stack = (err as any).stack;
    if (condition) {
      const amqpErrorCondition = SystemErrorConditionMapper[condition as any];
      error.name = ConditionErrorNameMapper[amqpErrorCondition as any];
    }
    if (!error.name) error.name = "SystemError";
    if (retryableErrors.indexOf(error.name) === -1) {
      // not found
      error.retryable = false;
    }
  } else if (isBrowserWebsocketError(err)) {
    // Translate browser communication errors during opening handshake to generic SeviceCommunicationError
    error = new MessagingError("Websocket connection failed.");
    error.name = ConditionErrorNameMapper[ErrorNameConditionMapper.ServiceCommunicationError];
    error.retryable = false;
  } else {
    // Translate a generic error into MessagingError.
    error = new MessagingError((err as Error).message);
    error.stack = (err as Error).stack;
  }
  return error;
}
