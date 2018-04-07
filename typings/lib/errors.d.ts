import { AmqpError } from "../lib/rhea-promise";
/**
 * Maps the conditions to the numeric AMQP Response status codes.
 * @enum {ConditionStatusMapper}
 */
export declare enum ConditionStatusMapper {
    "com.microsoft:timeout" = 408,
    "amqp:not-found" = 404,
    "amqp:not-implemented" = 501,
    "com.microsoft:entity-already-exists" = 409,
    "com.microsoft:session-lock-lost" = 410,
    "com.microsoft:no-matching-subscription" = 500,
    "amqp:link:message-size-exceeded" = 403,
    "com.microsoft:server-busy" = 503,
    "com.microsoft:argument-error" = 400,
    "com.microsoft:argument-out-of-range" = 400,
    "com.microsoft:store-lock-lost" = 410,
    "com.microsoft:session-cannot-be-locked" = 410,
    "com.microsoft:partition-not-owned" = 410,
    "com.microsoft:entity-disabled" = 400,
    "com.microsoft:publisher-revoked" = 401,
    "amqp:link:stolen" = 410,
    "amqp:not-allowed" = 400,
    "amqp:unauthorized-access" = 401,
    "amqp:resource-limit-exceeded" = 403,
    "com.microsoft:message-lock-lost" = 410,
}
/**
 * Error is thrown when an argument has a value that is out of the admissible range.
 *
 * @augments {Error}
 */
export declare class ArgumentOutOfRangeError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the Event Hub is not found on the namespace.
 *
 * @augments {Error}
 */
export declare class MessagingEntityNotFoundError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when an internal server error occured. You may have found a bug?
 *
 * @augments {Error}
 */
export declare class InternalServerError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when a feature is not implemented yet but the placeholder is present.
 *
 * @augments {Error}
 */
export declare class NotImplementedError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when an operation is attempted but is not allowed.
 *
 * @augments {Error}
 */
export declare class InvalidOperationError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the connection parameters are wrong and the server refused the connection.
 *
 * @augments {Error}
 */
export declare class UnauthorizedError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown the the Azure Event Hub quota has been exceeded.
 * Quotas are reset periodically, this operation will have to wait until then.
 * The messaging entity has reached its maximum allowable size.
 * This can happen if the maximum number of receivers (which is 5) has already
 * been opened on a per-consumer group level.
 * @augments {Error}
 */
export declare class QuotaExceededError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the message sent is too large: the maximum size is 256Kb.
 *
 * @augments {Error}
 */
export declare class MessageTooLargeError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when data could not be decoded.
 *
 * @augments {Error}
 */
export declare class DecodeError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when two or more instances connect to the same partition
 * with different epoch values.
 *
 * @augments {Error}
 */
export declare class ReceiverDisconnectedError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the service is unavailable. The operation should be retried.
 *
 * @augments {Error}
 */
export declare class ServiceUnavailableError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when a condition that should have been met in order to execute an operation was not.
 *
 * @augments {Error}
 */
export declare class PreconditionFailedError extends Error {
    condition: "com.microsoft:precondition-failed" | "amqp:precondition-failed";
    constructor(condition: "com.microsoft:precondition-failed" | "amqp:precondition-failed", message?: string);
}
/**
 * Error is thrown when an invalid field was passed in a frame body, and the operation could not proceed.
 *
 * @augments {Error}
 */
export declare class InvalidFieldError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the client attempted to work with a server entity to which it
 * has no access because another client is working with it.
 *
 * @augments {Error}
 */
export declare class ResourceLockedError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when a server entity the client is working with has been deleted.
 *
 * @augments {Error}
 */
export declare class ResourceDeletedError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the peer sent a frame that is not permitted in the current state.
 *
 * @augments {Error}
 */
export declare class IllegalStateError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the peer cannot send a frame because the smallest encoding of
 * the performative with the currently valid values would be too large to fit within
 * a frame of the agreed maximum frame size.
 *
 * @augments {Error}
 */
export declare class FrameSizeTooSmallError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the address provided cannot be resolved to a terminus at the current container
 *
 * @augments {Error}
 */
export declare class LinkRedirectError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when an operator intervened to detach for some reason.
 *
 * @augments {Error}
 */
export declare class DetachForcedError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the peer sent more message transfers than currently allowed on the link.
 *
 * @augments {Error}
 */
export declare class TransferLimitExceededError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the peer violated incoming window for the session.
 *
 * @augments {Error}
 */
export declare class SessionWindowViolationError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when input was received for a link that was detached with an error.
 *
 * @augments {Error}
 */
export declare class ErrantLinkError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when an attach was received using a handle that is already in use for an attached link.
 *
 * @augments {Error}
 */
export declare class HanldeInUseError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when a frame (other than attach) was received referencing a handle which is not
 * currently in use of an attached link.
 *
 * @augments {Error}
 */
export declare class UnattachedHandleError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when an operator intervened to close the connection for some reason.
 * @augments {Error}
 */
export declare class ConnectionForcedError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when a valid frame header cannot be formed from the incoming byte stream.
 *
 * @augments {Error}
 */
export declare class FramingError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the container is no longer available on the current connection.
 *
 * @augments {Error}
 */
export declare class ConnectionRedirectError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when the server is busy. Callers should wait a while and retry the operation.
 *
 * @augments {Error}
 */
export declare class ServerBusyError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error is thrown when an incorrect argument was received.
 *
 * @augments {Error}
 */
export declare class ArgumentError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Error for signaling general communication errors related to messaging operations.
 *
 * @augments {Error}
 */
export declare class EventHubsCommunicationError extends Error {
    condition: string;
    constructor(message?: string);
}
/**
 * Translates the AQMP error received at the protocol layer into an EventHub JS Error.
 *
 * @param {AmqpError} err The amqp error that was received.
 * @param {any} code The status code if any.
 * @returns {Error} eventHubError object.
 */
export declare function translate(err: AmqpError): Error;
