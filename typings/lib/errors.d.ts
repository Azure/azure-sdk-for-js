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
 * Maps the conditions to the Error names.
 * @enum {ConditionErrorNameMapper}
 */
export declare enum ConditionErrorNameMapper {
    /**
     * Error is thrown when an internal server error occured. You may have found a bug?
     */
    "amqp:internal-error" = "InternalServerError",
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
    "com.microsoft:timeout" = "ServiceUnavailableError",
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
    "amqp:session:errant-link" = "ErrantLinkError",
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
    "com.microsoft:server-busy" = "ServerBusyError",
    /**
     * Error is thrown when an incorrect argument was received.
     */
    "com.microsoft:argument-error" = "ArgumentError",
}
/**
 * Maps the conditions to the Error names.
 * @enum {ErrorNameConditionMapper}
 */
export declare enum ErrorNameConditionMapper {
    /**
     * Error is thrown when an internal server error occured. You may have found a bug?
     */
    InternalServerError = "amqp:internal-error",
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
    ServiceUnavailableError = "com.microsoft:timeout",
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
    ErrantLinkError = "amqp:session:errant-link",
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
    ServerBusyError = "com.microsoft:server-busy",
    /**
     * Error is thrown when an incorrect argument was received.
     */
    ArgumentError = "com.microsoft:argument-error",
}
/**
 * Describes the base class for an EventHub Error.
 * @class {EventHubsError}
 * @extends Error
 */
export declare class EventHubsError extends Error {
    /**
     * @property {string} [condition] The error condition.
     */
    condition?: string;
    /**
     * @property {string} name The error name. Default value: "EventHubsError".
     */
    name: string;
    /**
     * @property {boolean} translated Has the error been translated. Default: true.
     */
    translated: boolean;
    /**
     *
     * @param {boolean} retryable Describes whether the error is retryable. Default: false.
     */
    retryable: boolean;
    /**
     * @param {string} message The error message that provides more information about the error.
     */
    constructor(message: string);
}
/**
 * Translates the AQMP error received at the protocol layer or a generic Error into an EventHubsError.
 *
 * @param {AmqpError} err The amqp error that was received.
 * @returns {EventHubsError} EventHubsError object.
 */
export declare function translate(err: AmqpError | Error): EventHubsError;
