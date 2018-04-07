"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Maps the conditions to the numeric AMQP Response status codes.
 * @enum {ConditionStatusMapper}
 */
var ConditionStatusMapper;
(function (ConditionStatusMapper) {
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:timeout"] = 408] = "com.microsoft:timeout";
    ConditionStatusMapper[ConditionStatusMapper["amqp:not-found"] = 404] = "amqp:not-found";
    ConditionStatusMapper[ConditionStatusMapper["amqp:not-implemented"] = 501] = "amqp:not-implemented";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:entity-already-exists"] = 409] = "com.microsoft:entity-already-exists";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:session-lock-lost"] = 410] = "com.microsoft:session-lock-lost";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:no-matching-subscription"] = 500] = "com.microsoft:no-matching-subscription";
    ConditionStatusMapper[ConditionStatusMapper["amqp:link:message-size-exceeded"] = 403] = "amqp:link:message-size-exceeded";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:server-busy"] = 503] = "com.microsoft:server-busy";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:argument-error"] = 400] = "com.microsoft:argument-error";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:argument-out-of-range"] = 400] = "com.microsoft:argument-out-of-range";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:store-lock-lost"] = 410] = "com.microsoft:store-lock-lost";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:session-cannot-be-locked"] = 410] = "com.microsoft:session-cannot-be-locked";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:partition-not-owned"] = 410] = "com.microsoft:partition-not-owned";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:entity-disabled"] = 400] = "com.microsoft:entity-disabled";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:publisher-revoked"] = 401] = "com.microsoft:publisher-revoked";
    ConditionStatusMapper[ConditionStatusMapper["amqp:link:stolen"] = 410] = "amqp:link:stolen";
    ConditionStatusMapper[ConditionStatusMapper["amqp:not-allowed"] = 400] = "amqp:not-allowed";
    ConditionStatusMapper[ConditionStatusMapper["amqp:unauthorized-access"] = 401] = "amqp:unauthorized-access";
    ConditionStatusMapper[ConditionStatusMapper["amqp:resource-limit-exceeded"] = 403] = "amqp:resource-limit-exceeded";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:message-lock-lost"] = 410] = "com.microsoft:message-lock-lost";
})(ConditionStatusMapper = exports.ConditionStatusMapper || (exports.ConditionStatusMapper = {}));
/**
 * Error is thrown when an argument has a value that is out of the admissible range.
 *
 * @augments {Error}
 */
class ArgumentOutOfRangeError extends Error {
    constructor(message) {
        super(message);
        this.condition = "com.microsoft:argument-out-of-range";
        this.name = "ArgumentOutOfRangeError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
/**
 * Error is thrown when the Event Hub is not found on the namespace.
 *
 * @augments {Error}
 */
class MessagingEntityNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:not-found";
        this.name = "MessagingEntityNotFoundError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.MessagingEntityNotFoundError = MessagingEntityNotFoundError;
/**
 * Error is thrown when an internal server error occured. You may have found a bug?
 *
 * @augments {Error}
 */
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:internal-error";
        this.name = "InternalServerError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.InternalServerError = InternalServerError;
/**
 * Error is thrown when a feature is not implemented yet but the placeholder is present.
 *
 * @augments {Error}
 */
class NotImplementedError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:not-implemented";
        this.name = "NotImplementedError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.NotImplementedError = NotImplementedError;
/**
 * Error is thrown when an operation is attempted but is not allowed.
 *
 * @augments {Error}
 */
class InvalidOperationError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:not-allowed";
        this.name = "InvalidOperationError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.InvalidOperationError = InvalidOperationError;
/**
 * Error is thrown when the connection parameters are wrong and the server refused the connection.
 *
 * @augments {Error}
 */
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:unauthorized-access";
        this.name = "UnauthorizedError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Error is thrown the the Azure Event Hub quota has been exceeded.
 * Quotas are reset periodically, this operation will have to wait until then.
 * The messaging entity has reached its maximum allowable size.
 * This can happen if the maximum number of receivers (which is 5) has already
 * been opened on a per-consumer group level.
 * @augments {Error}
 */
class QuotaExceededError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:resource-limit-exceeded";
        this.name = "QuotaExceededError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.QuotaExceededError = QuotaExceededError;
/**
 * Error is thrown when the message sent is too large: the maximum size is 256Kb.
 *
 * @augments {Error}
 */
class MessageTooLargeError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:link:message-size-exceeded";
        this.name = "MessageTooLargeError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.MessageTooLargeError = MessageTooLargeError;
/**
 * Error is thrown when data could not be decoded.
 *
 * @augments {Error}
 */
class DecodeError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:decode-error";
        this.name = "DecodeError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.DecodeError = DecodeError;
/**
 * Error is thrown when two or more instances connect to the same partition
 * with different epoch values.
 *
 * @augments {Error}
 */
class ReceiverDisconnectedError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:link:stolen";
        this.name = "ReceiverDisconnectedError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ReceiverDisconnectedError = ReceiverDisconnectedError;
/**
 * Error is thrown when the service is unavailable. The operation should be retried.
 *
 * @augments {Error}
 */
class ServiceUnavailableError extends Error {
    constructor(message) {
        super(message);
        this.condition = "com.microsoft:timeout";
        this.name = "ServiceUnavailableError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
/**
 * Error is thrown when a condition that should have been met in order to execute an operation was not.
 *
 * @augments {Error}
 */
class PreconditionFailedError extends Error {
    constructor(condition, message) {
        super(message);
        this.name = "PreconditionFailedError";
        this.message = message;
        this.condition = condition;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.PreconditionFailedError = PreconditionFailedError;
/**
 * Error is thrown when an invalid field was passed in a frame body, and the operation could not proceed.
 *
 * @augments {Error}
 */
class InvalidFieldError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:invalid-field";
        this.name = "InvalidFieldError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.InvalidFieldError = InvalidFieldError;
/**
 * Error is thrown when the client attempted to work with a server entity to which it
 * has no access because another client is working with it.
 *
 * @augments {Error}
 */
class ResourceLockedError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:resource-locked";
        this.name = "ResourceLockedError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ResourceLockedError = ResourceLockedError;
/**
 * Error is thrown when a server entity the client is working with has been deleted.
 *
 * @augments {Error}
 */
class ResourceDeletedError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:resource-deleted";
        this.name = "ResourceDeletedError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ResourceDeletedError = ResourceDeletedError;
/**
 * Error is thrown when the peer sent a frame that is not permitted in the current state.
 *
 * @augments {Error}
 */
class IllegalStateError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp::illegal-state";
        this.name = "IllegalStateError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.IllegalStateError = IllegalStateError;
/**
 * Error is thrown when the peer cannot send a frame because the smallest encoding of
 * the performative with the currently valid values would be too large to fit within
 * a frame of the agreed maximum frame size.
 *
 * @augments {Error}
 */
class FrameSizeTooSmallError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:frame-size-too-small";
        this.name = "FrameSizeTooSmallError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.FrameSizeTooSmallError = FrameSizeTooSmallError;
/**
 * Error is thrown when the address provided cannot be resolved to a terminus at the current container
 *
 * @augments {Error}
 */
class LinkRedirectError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:link:redirect";
        this.name = "LinkRedirectError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.LinkRedirectError = LinkRedirectError;
/**
 * Error is thrown when an operator intervened to detach for some reason.
 *
 * @augments {Error}
 */
class DetachForcedError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:link:detach-forced";
        this.name = "DetachForcedError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.DetachForcedError = DetachForcedError;
/**
 * Error is thrown when the peer sent more message transfers than currently allowed on the link.
 *
 * @augments {Error}
 */
class TransferLimitExceededError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:link:transfer-limit-exceeded";
        this.name = "TransferLimitExceededError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.TransferLimitExceededError = TransferLimitExceededError;
/**
 * Error is thrown when the peer violated incoming window for the session.
 *
 * @augments {Error}
 */
class SessionWindowViolationError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:session:window-violation";
        this.name = "SessionWindowViolationError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.SessionWindowViolationError = SessionWindowViolationError;
/**
 * Error is thrown when input was received for a link that was detached with an error.
 *
 * @augments {Error}
 */
class ErrantLinkError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:session:errant-link";
        this.name = "SessionWindowViolationError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrantLinkError = ErrantLinkError;
/**
 * Error is thrown when an attach was received using a handle that is already in use for an attached link.
 *
 * @augments {Error}
 */
class HanldeInUseError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:session:handle-in-use";
        this.name = "HanldeInUseError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HanldeInUseError = HanldeInUseError;
/**
 * Error is thrown when a frame (other than attach) was received referencing a handle which is not
 * currently in use of an attached link.
 *
 * @augments {Error}
 */
class UnattachedHandleError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:session:unattached-handle";
        this.name = "UnattachedHandleError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.UnattachedHandleError = UnattachedHandleError;
/**
 * Error is thrown when an operator intervened to close the connection for some reason.
 * @augments {Error}
 */
class ConnectionForcedError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:connection:forced";
        this.name = "ConnectionForcedError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ConnectionForcedError = ConnectionForcedError;
/**
 * Error is thrown when a valid frame header cannot be formed from the incoming byte stream.
 *
 * @augments {Error}
 */
class FramingError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:connection:framing-error";
        this.name = "FramingError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.FramingError = FramingError;
/**
 * Error is thrown when the container is no longer available on the current connection.
 *
 * @augments {Error}
 */
class ConnectionRedirectError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:connection:redirect";
        this.name = "ConnectionRedirectError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ConnectionRedirectError = ConnectionRedirectError;
/**
 * Error is thrown when the server is busy. Callers should wait a while and retry the operation.
 *
 * @augments {Error}
 */
class ServerBusyError extends Error {
    constructor(message) {
        super(message);
        this.condition = "com.microsoft:server-busy";
        this.name = "ServerBusyError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ServerBusyError = ServerBusyError;
/**
 * Error is thrown when an incorrect argument was received.
 *
 * @augments {Error}
 */
class ArgumentError extends Error {
    constructor(message) {
        super(message);
        this.condition = "com.microsoft:argument-error";
        this.name = "ArgumentError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ArgumentError = ArgumentError;
/**
 * Error for signaling general communication errors related to messaging operations.
 *
 * @augments {Error}
 */
class EventHubsCommunicationError extends Error {
    constructor(message) {
        super(message);
        this.condition = "amqp:not-found";
        this.name = "EventHubsCommunicationError";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.EventHubsCommunicationError = EventHubsCommunicationError;
/**
 * Translates the AQMP error received at the protocol layer into an EventHub JS Error.
 *
 * @param {AmqpError} err The amqp error that was received.
 * @param {any} code The status code if any.
 * @returns {Error} eventHubError object.
 */
function translate(err) {
    const condition = err.condition;
    let error = err;
    if (condition) {
        switch (condition) {
            case "amqp:internal-error":// Retryable
                error = new InternalServerError(err.description);
                break;
            case "amqp:not-found":
                let description = err.description;
                if (description &&
                    (description.includes("status-code: 404") ||
                        description.match(/The messaging entity .* could not be found.*/i) !== null)) {
                    error = new MessagingEntityNotFoundError(err.description);
                }
                else {
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
            case "amqp:session:errant-link":// Retryable
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
exports.translate = translate;
