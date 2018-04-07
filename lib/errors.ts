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
 * Error is thrown when an argument has a value that is out of the admissible range.
 *
 * @augments {Error}
 */
export class ArgumentOutOfRangeError extends Error {
  condition: string = "com.microsoft:argument-out-of-range";
  constructor(message?: string) {
    super(message);
    this.name = "ArgumentOutOfRangeError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the Event Hub is not found on the namespace.
 *
 * @augments {Error}
 */
export class MessagingEntityNotFoundError extends Error {
  condition: string = "amqp:not-found";
  constructor(message?: string) {
    super(message);
    this.name = "MessagingEntityNotFoundError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when an internal server error occured. You may have found a bug?
 *
 * @augments {Error}
 */
export class InternalServerError extends Error {
  condition: string = "amqp:internal-error";
  constructor(message?: string) {
    super(message);
    this.name = "InternalServerError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when a feature is not implemented yet but the placeholder is present.
 *
 * @augments {Error}
 */
export class NotImplementedError extends Error {
  condition: string = "amqp:not-implemented";
  constructor(message?: string) {
    super(message);
    this.name = "NotImplementedError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when an operation is attempted but is not allowed.
 *
 * @augments {Error}
 */
export class InvalidOperationError extends Error {
  condition: string = "amqp:not-allowed";
  constructor(message?: string) {
    super(message);
    this.name = "InvalidOperationError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the connection parameters are wrong and the server refused the connection.
 *
 * @augments {Error}
 */
export class UnauthorizedError extends Error {
  condition: string = "amqp:unauthorized-access";
  constructor(message?: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown the the Azure Event Hub quota has been exceeded.
 * Quotas are reset periodically, this operation will have to wait until then.
 * The messaging entity has reached its maximum allowable size.
 * This can happen if the maximum number of receivers (which is 5) has already
 * been opened on a per-consumer group level.
 * @augments {Error}
 */
export class QuotaExceededError extends Error {
  condition: string = "amqp:resource-limit-exceeded";
  constructor(message?: string) {
    super(message);
    this.name = "QuotaExceededError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the message sent is too large: the maximum size is 256Kb.
 *
 * @augments {Error}
 */
export class MessageTooLargeError extends Error {
  condition: string = "amqp:link:message-size-exceeded";
  constructor(message?: string) {
    super(message);
    this.name = "MessageTooLargeError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when data could not be decoded.
 *
 * @augments {Error}
 */
export class DecodeError extends Error {
  condition: string = "amqp:decode-error";
  constructor(message?: string) {
    super(message);
    this.name = "DecodeError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when two or more instances connect to the same partition
 * with different epoch values.
 *
 * @augments {Error}
 */
export class ReceiverDisconnectedError extends Error {
  condition: string = "amqp:link:stolen";
  constructor(message?: string) {
    super(message);
    this.name = "ReceiverDisconnectedError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the service is unavailable. The operation should be retried.
 *
 * @augments {Error}
 */
export class ServiceUnavailableError extends Error {
  condition: string = "com.microsoft:timeout";
  constructor(message?: string) {
    super(message);
    this.name = "ServiceUnavailableError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when a condition that should have been met in order to execute an operation was not.
 *
 * @augments {Error}
 */
export class PreconditionFailedError extends Error {
  condition: "com.microsoft:precondition-failed" | "amqp:precondition-failed";
  constructor(condition: "com.microsoft:precondition-failed" | "amqp:precondition-failed", message?: string) {
    super(message);
    this.name = "PreconditionFailedError";
    this.message = message as string;
    this.condition = condition;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when an invalid field was passed in a frame body, and the operation could not proceed.
 *
 * @augments {Error}
 */
export class InvalidFieldError extends Error {
  condition: string = "amqp:invalid-field";
  constructor(message?: string) {
    super(message);
    this.name = "InvalidFieldError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the client attempted to work with a server entity to which it
 * has no access because another client is working with it.
 *
 * @augments {Error}
 */
export class ResourceLockedError extends Error {
  condition: string = "amqp:resource-locked";
  constructor(message?: string) {
    super(message);
    this.name = "ResourceLockedError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when a server entity the client is working with has been deleted.
 *
 * @augments {Error}
 */
export class ResourceDeletedError extends Error {
  condition: string = "amqp:resource-deleted";
  constructor(message?: string) {
    super(message);
    this.name = "ResourceDeletedError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the peer sent a frame that is not permitted in the current state.
 *
 * @augments {Error}
 */
export class IllegalStateError extends Error {
  condition: string = "amqp::illegal-state";
  constructor(message?: string) {
    super(message);
    this.name = "IllegalStateError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the peer cannot send a frame because the smallest encoding of
 * the performative with the currently valid values would be too large to fit within
 * a frame of the agreed maximum frame size.
 *
 * @augments {Error}
 */
export class FrameSizeTooSmallError extends Error {
  condition: string = "amqp:frame-size-too-small";
  constructor(message?: string) {
    super(message);
    this.name = "FrameSizeTooSmallError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the address provided cannot be resolved to a terminus at the current container
 *
 * @augments {Error}
 */
export class LinkRedirectError extends Error {
  condition: string = "amqp:link:redirect";
  constructor(message?: string) {
    super(message);
    this.name = "LinkRedirectError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}
/**
 * Error is thrown when an operator intervened to detach for some reason.
 *
 * @augments {Error}
 */
export class DetachForcedError extends Error {
  condition: string = "amqp:link:detach-forced";
  constructor(message?: string) {
    super(message);
    this.name = "DetachForcedError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the peer sent more message transfers than currently allowed on the link.
 *
 * @augments {Error}
 */
export class TransferLimitExceededError extends Error {
  condition: string = "amqp:link:transfer-limit-exceeded";
  constructor(message?: string) {
    super(message);
    this.name = "TransferLimitExceededError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the peer violated incoming window for the session.
 *
 * @augments {Error}
 */
export class SessionWindowViolationError extends Error {
  condition: string = "amqp:session:window-violation";
  constructor(message?: string) {
    super(message);
    this.name = "SessionWindowViolationError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when input was received for a link that was detached with an error.
 *
 * @augments {Error}
 */
export class ErrantLinkError extends Error {
  condition: string = "amqp:session:errant-link";
  constructor(message?: string) {
    super(message);
    this.name = "SessionWindowViolationError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when an attach was received using a handle that is already in use for an attached link.
 *
 * @augments {Error}
 */
export class HanldeInUseError extends Error {
  condition: string = "amqp:session:handle-in-use";
  constructor(message?: string) {
    super(message);
    this.name = "HanldeInUseError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when a frame (other than attach) was received referencing a handle which is not
 * currently in use of an attached link.
 *
 * @augments {Error}
 */
export class UnattachedHandleError extends Error {
  condition: string = "amqp:session:unattached-handle";
  constructor(message?: string) {
    super(message);
    this.name = "UnattachedHandleError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when an operator intervened to close the connection for some reason.
 * @augments {Error}
 */
export class ConnectionForcedError extends Error {
  condition: string = "amqp:connection:forced";
  constructor(message?: string) {
    super(message);
    this.name = "ConnectionForcedError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when a valid frame header cannot be formed from the incoming byte stream.
 *
 * @augments {Error}
 */
export class FramingError extends Error {
  condition: string = "amqp:connection:framing-error";
  constructor(message?: string) {
    super(message);
    this.name = "FramingError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the container is no longer available on the current connection.
 *
 * @augments {Error}
 */
export class ConnectionRedirectError extends Error {
  condition: string = "amqp:connection:redirect";
  constructor(message?: string) {
    super(message);
    this.name = "ConnectionRedirectError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when the server is busy. Callers should wait a while and retry the operation.
 *
 * @augments {Error}
 */
export class ServerBusyError extends Error {
  condition: string = "com.microsoft:server-busy";
  constructor(message?: string) {
    super(message);
    this.name = "ServerBusyError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error is thrown when an incorrect argument was received.
 *
 * @augments {Error}
 */
export class ArgumentError extends Error {
  condition: string = "com.microsoft:argument-error";
  constructor(message?: string) {
    super(message);
    this.name = "ArgumentError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for signaling general communication errors related to messaging operations.
 *
 * @augments {Error}
 */
export class EventHubsCommunicationError extends Error {
  condition: string = "amqp:not-found";
  constructor(message?: string) {
    super(message);
    this.name = "EventHubsCommunicationError";
    this.message = message as string;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Translates the AQMP error received at the protocol layer into an EventHub JS Error.
 *
 * @param {AmqpError} err The amqp error that was received.
 * @param {any} code The status code if any.
 * @returns {Error} eventHubError object.
 */
export function translate(err: AmqpError): Error {
  const condition = err.condition;
  let error: any = err;
  if (condition) {
    switch (condition) {
      case "amqp:internal-error": // Retryable
        error = new InternalServerError(err.description);
        break;
      case "amqp:not-found":
        let description = err.description;
        if (description &&
          (description.includes("status-code: 404") ||
            description.match(/The messaging entity .* could not be found.*/i) !== null)) {
          error = new MessagingEntityNotFoundError(err.description);
        } else {
          error = new EventHubsCommunicationError(err.description); // Retryable
        }
        break;
      case "amqp:not-implemented":
        error = new NotImplementedError(err.description);
        break;
      case "amqp:not-allowed":
        error = new InvalidOperationError(err.description);
        break;
      case "amqp:resource-limit-exceeded":
        error = new QuotaExceededError(err.description);
        break;
      case "amqp:unauthorized-access":
        error = new UnauthorizedError(err.description);
        break;
      case "com.microsoft:timeout":
        error = new ServiceUnavailableError(err.description);
        break;
      case "com.microsoft:argument-out-of-range":
        error = new ArgumentOutOfRangeError(err.description);
        break;
      case "com.microsoft:precondition-failed":
        error = new PreconditionFailedError("com.microsoft:precondition-failed", err.description);
        break;
      case "amqp:precondition-failed":
        error = new PreconditionFailedError("amqp:precondition-failed", err.description);
        break;
      case "amqp:decode-error":
        error = new DecodeError(err.description);
        break;
      case "amqp:invalid-field":
        error = new InvalidFieldError(err.description);
        break;
      case "amqp:resource-locked":
        error = new ResourceLockedError(err.description);
        break;
      case "amqp:resource-deleted":
        error = new ResourceDeletedError(err.description);
        break;
      case "amqp:illegal-state":
        error = new IllegalStateError(err.description);
        break;
      case "amqp:frame-size-too-small":
        error = new FrameSizeTooSmallError(err.description);
        break;
      case "amqp:link:detach-forced":
        error = new DetachForcedError(err.description);
        break;
      case "amqp:link:transfer-limit-exceeded":
        error = new TransferLimitExceededError(err.description);
        break;
      case "amqp:link:message-size-exceeded":
        error = new MessageTooLargeError(err.description);
        break;
      case "amqp:link:redirect":
        error = new LinkRedirectError(err.description);
        break;
      case "amqp:link:stolen":
        error = new ReceiverDisconnectedError(err.description);
        break;
      case "amqp:session:window-violation":
        error = new SessionWindowViolationError(err.description);
        break;
      case "amqp:session:errant-link":  // Retryable
        error = new ErrantLinkError(err.description);
        break;
      case "amqp:session:handle-in-use":
        error = new HanldeInUseError(err.description);
        break;
      case "amqp:session:unattached-handle":
        error = new UnattachedHandleError(err.description);
        break;
      case "amqp:connection:forced":
        error = new ConnectionForcedError(err.description);
        break;
      case "amqp:connection:framing-error":
        error = new FramingError(err.description);
        break;
      case "amqp:connection:redirect":
        error = new ConnectionRedirectError(err.description);
        break;
      case "com.microsoft:server-busy":
        error = new ServerBusyError(err.description); // Retryable
        break;
      case "com.microsoft:argument-error":
        error = new ArgumentError(err.description);
        break;
      default:
        error = new Error(err.description);
    }
  }

  return error;
}
