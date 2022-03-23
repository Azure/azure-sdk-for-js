// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable eqeqeq */

import { AmqpError, AmqpResponseStatusCode, isAmqpError as rheaIsAmqpError } from "rhea-promise";
import { isDefined, isObjectWithProperties } from "./util/typeGuards";
import { isNode, isNumber, isString } from "../src/util/utils";

/**
 * Maps the conditions to the numeric AMQP Response status codes.
 * @internal
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
  "amqp:resource-limit-exceeded" = AmqpResponseStatusCode.Forbidden,
}

/**
 * Maps the amqp error conditions to the Error names.
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
   * Error is thrown when an attempt is made to access a partition that is not owned by the
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
   * Error is thrown when an internal server error occurred. You may have found a bug?
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
  "system:error" = "SystemError",
}

/**
 * Maps the Error names to the amqp error conditions.
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
   * Error is thrown when an attempt is made to access a partition that is not owned by the
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
   * Error is thrown when an internal server error occurred. You may have found a bug?
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
  SystemError = "system:error",
}

/**
 * Describes the fields on a Node.js SystemError.
 * Omits fields that are not related to network calls (e.g. file system calls).
 * See https://nodejs.org/dist/latest-v12.x/docs/api/errors.html#errors_class_systemerror
 */
export interface NetworkSystemError {
  address?: string;
  code: string;
  errno: string | number;
  info?: any;
  message: string;
  name: string;
  port?: number;
  stack: string;
  syscall: string;
}

/**
 * @internal
 */
const systemErrorFieldsToCopy: (keyof Omit<NetworkSystemError, "name" | "message">)[] = [
  "address",
  "code",
  "errno",
  "info",
  "port",
  "stack",
  "syscall",
];

/**
 * Determines if an error is a MessagingError.
 *
 * @param error - An error that can either be an Error or a MessagingError.
 */
export function isMessagingError(error: Error | MessagingError): error is MessagingError {
  return error.name === "MessagingError";
}

/**
 * Describes the base class for Messaging Error.
 */
export class MessagingError extends Error {
  /**
   * Address to which the network connection failed.
   * Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.
   */
  address?: string;
  /**
   * A string label that identifies the error.
   */
  code?: string;
  /**
   * System-provided error number.
   * Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.
   */
  errno?: number | string;
  /**
   * The error name. Default value: "MessagingError".
   */
  name: string = "MessagingError";
  /**
   * The unavailable network connection port.
   * Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.
   */
  port?: number;
  /**
   * Name of the system call that triggered the error.
   * Only present if the `MessagingError` was instantiated with a Node.js `SystemError`.
   */
  syscall?: string;
  /**
   *
   * Describes whether the error is retryable. Default: true.
   */
  retryable: boolean = true;
  /**
   * Extra details about the error.
   */
  info?: any;
  /**
   * @param message - The error message that provides more information about the error.
   * @param originalError - An error whose properties will be copied to the MessagingError if the
   * property matches one found on the Node.js `SystemError`.
   */
  constructor(message: string, originalError?: Error) {
    super(message);

    if (!originalError) {
      return;
    }

    // copy properties from system error
    for (const propName of systemErrorFieldsToCopy) {
      if ((originalError as NetworkSystemError)[propName] != undefined) {
        this[propName] = (originalError as NetworkSystemError)[propName];
      }
    }
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

  // The service may throw UnauthorizedError if credentials have been rotated.
  // Attempt to retry in case the user has also rotated their credentials.
  "UnauthorizedError",

  // OperationTimeoutError occurs when the service fails to respond within a given timeframe.
  // Since reasons for such failures can be transient, this is treated as a retryable error.
  "OperationTimeoutError",

  "SenderBusyError",
  "MessagingError",
  "DetachForcedError",
  "ConnectionForcedError",
  "TransferLimitExceededError",

  // InsufficientCreditError occurs when the number of credits available on Rhea link is insufficient.
  // Since reasons for such shortage can be transient such as for pending delivery of messages, this is treated as a retryable error.
  "InsufficientCreditError",
];

/**
 * Maps some SystemErrors to amqp error conditions
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
  ENONET = "com.microsoft:timeout",
}

/**
 * Checks whether the provided error is a node.js SystemError.
 * @param err - An object that may contain error information.
 */
export function isSystemError(err: unknown): err is NetworkSystemError {
  if (!isObjectWithProperties(err, ["code", "syscall", "errno"])) {
    return false;
  }

  if (!isString(err.code) || !isString(err.syscall)) {
    return false;
  }

  if (!isString(err.errno) && !isNumber(err.errno)) {
    return false;
  }

  return true;
}

/**
 * @internal
 * Since browser doesn't differentiate between the various kinds of service communication errors,
 * this utility is used to look at the error target to identify such category of errors.
 * For more information refer to - https://html.spec.whatwg.org/multipage/comms.html#feedback-from-the-protocol
 * @param err - object that may contain error information
 */
function isBrowserWebsocketError(err: any): boolean {
  let result: boolean = false;
  if (!isNode && self && err.type === "error" && err.target instanceof (self as any).WebSocket) {
    result = true;
  }
  return result;
}

/**
 * @internal
 */
const rheaPromiseErrors = [
  // OperationTimeoutError occurs when the service fails to respond within a given timeframe.
  "OperationTimeoutError",

  // InsufficientCreditError occurs when the number of credits available on Rhea link is insufficient.
  "InsufficientCreditError",

  // Defines the error that occurs when the Sender fails to send a message.
  "SendOperationFailedError",
];

/**
 * Translates the AMQP error received at the protocol layer or a SystemError into a MessagingError.
 * All other errors are returned unaltered.
 *
 * @param err - The amqp error that was received.
 * @returns MessagingError object.
 */
export function translate(err: AmqpError | Error): MessagingError | Error {
  if (!isDefined(err)) {
    return new Error(`Unknown error encountered.`);
  } else if (typeof err !== "object") {
    // The error is a scalar type, make it the message of an actual error.
    return new Error(err);
  }
  // Built-in errors like TypeError and RangeError should not be retryable as these indicate issues
  // with user input and not an issue with the Messaging process.
  if (err instanceof TypeError || err instanceof RangeError) {
    return err;
  }

  if (isAmqpError(err)) {
    // translate
    const condition = err.condition;
    const description = err.description!;
    const error = new MessagingError(description);
    if ((err as any).stack) error.stack = (err as any).stack;
    error.info = err.info;
    if (condition) {
      error.code = ConditionErrorNameMapper[condition as keyof typeof ConditionErrorNameMapper];
    }
    if (
      description &&
      (description.includes("status-code: 404") ||
        description.match(/The messaging entity .* could not be found.*/i) !== null)
    ) {
      error.code = "MessagingEntityNotFoundError";
    }
    if (error.code && retryableErrors.indexOf(error.code) === -1) {
      // not found
      error.retryable = false;
    }
    return error;
  }

  if (err.name === "MessagingError") {
    // already translated
    return err;
  }

  if (isSystemError(err)) {
    // translate
    const condition = err.code;
    const description = err.message;
    const error = new MessagingError(description, err);
    let errorType = "SystemError";
    if (condition) {
      const amqpErrorCondition =
        SystemErrorConditionMapper[condition as keyof typeof SystemErrorConditionMapper];
      errorType =
        ConditionErrorNameMapper[amqpErrorCondition as keyof typeof ConditionErrorNameMapper];
    }
    if (retryableErrors.indexOf(errorType) === -1) {
      // not found
      error.retryable = false;
    }
    return error;
  }

  if (isBrowserWebsocketError(err)) {
    // Translate browser communication errors during opening handshake to generic ServiceCommunicationError
    const error = new MessagingError("Websocket connection failed.");
    error.code = ConditionErrorNameMapper[ErrorNameConditionMapper.ServiceCommunicationError];
    error.retryable = false;
    return error;
  }

  // Some errors come from rhea-promise and need to be converted to MessagingError.
  // A subset of these are also retryable.
  if (rheaPromiseErrors.indexOf(err.name) !== -1) {
    const error = new MessagingError(err.message, err);
    error.code = err.name;
    if (error.code && retryableErrors.indexOf(error.code) === -1) {
      // not found
      error.retryable = false;
    }
    return error;
  }

  return err;
}

/**
 * @internal
 */
function isAmqpError(error: any): error is AmqpError {
  return rheaIsAmqpError(error);
}
