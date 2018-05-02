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
 * Maps the conditions to the Error names.
 * @enum {ConditionErrorNameMapper}
 */
var ConditionErrorNameMapper;
(function (ConditionErrorNameMapper) {
    /**
     * Error is thrown when an internal server error occured. You may have found a bug?
     */
    ConditionErrorNameMapper["amqp:internal-error"] = "InternalServerError";
    /**
     * Error for signaling general communication errors related to messaging operations.
     */
    ConditionErrorNameMapper["amqp:not-found"] = "EventHubsCommunicationError";
    /**
     * Error is thrown when a feature is not implemented yet but the placeholder is present.
     */
    ConditionErrorNameMapper["amqp:not-implemented"] = "NotImplementedError";
    /**
     * Error is thrown when an operation is attempted but is not allowed.
     */
    ConditionErrorNameMapper["amqp:not-allowed"] = "InvalidOperationError";
    /**
     * Error is thrown the the Azure Event Hub quota has been exceeded.
     * Quotas are reset periodically, this operation will have to wait until then.
     * The messaging entity has reached its maximum allowable size.
     * This can happen if the maximum number of receivers (which is 5) has already
     * been opened on a per-consumer group level.
     */
    ConditionErrorNameMapper["amqp:resource-limit-exceeded"] = "QuotaExceededError";
    /**
     * Error is thrown when the connection parameters are wrong and the server refused the connection.
     */
    ConditionErrorNameMapper["amqp:unauthorized-access"] = "UnauthorizedError";
    /**
     * Error is thrown when the service is unavailable. The operation should be retried.
     */
    ConditionErrorNameMapper["com.microsoft:timeout"] = "ServiceUnavailableError";
    /**
     * Error is thrown when an argument has a value that is out of the admissible range.
     */
    ConditionErrorNameMapper["com.microsoft:argument-out-of-range"] = "ArgumentOutOfRangeError";
    /**
     * Error is thrown when a condition that should have been met in order to execute an operation was not.
     */
    ConditionErrorNameMapper["amqp:precondition-failed"] = "PreconditionFailedError";
    /**
     * Error is thrown when data could not be decoded.
     */
    ConditionErrorNameMapper["amqp:decode-error"] = "DecodeError";
    /**
     * Error is thrown when an invalid field was passed in a frame body, and the operation could not proceed.
     */
    ConditionErrorNameMapper["amqp:invalid-field"] = "InvalidFieldError";
    /**
     * Error is thrown when the client attempted to work with a server entity to which it
     * has no access because another client is working with it.
     */
    ConditionErrorNameMapper["amqp:resource-locked"] = "ResourceLockedError";
    /**
     * Error is thrown when a server entity the client is working with has been deleted.
     */
    ConditionErrorNameMapper["amqp:resource-deleted"] = "ResourceDeletedError";
    /**
     * Error is thrown when the peer sent a frame that is not permitted in the current state.
     */
    ConditionErrorNameMapper["amqp:illegal-state"] = "IllegalStateError";
    /**
     * Error is thrown when the peer cannot send a frame because the smallest encoding of
     * the performative with the currently valid values would be too large to fit within
     * a frame of the agreed maximum frame size.
     */
    ConditionErrorNameMapper["amqp:frame-size-too-small"] = "FrameSizeTooSmallError";
    /**
     * Error is thrown when an operator intervened to detach for some reason.
     */
    ConditionErrorNameMapper["amqp:link:detach-forced"] = "DetachForcedError";
    /**
     * Error is thrown when the peer sent more message transfers than currently allowed on the link.
     */
    ConditionErrorNameMapper["amqp:link:transfer-limit-exceeded"] = "TransferLimitExceededError";
    /**
     * Error is thrown when the message sent is too large: the maximum size is 256Kb.
     */
    ConditionErrorNameMapper["amqp:link:message-size-exceeded"] = "MessageTooLargeError";
    /**
     * Error is thrown when the address provided cannot be resolved to a terminus at the current container.
     */
    ConditionErrorNameMapper["amqp:link:redirect"] = "LinkRedirectError";
    /**
     * Error is thrown when two or more instances connect to the same partition
     * with different epoch values.
     */
    ConditionErrorNameMapper["amqp:link:stolen"] = "ReceiverDisconnectedError";
    /**
     * Error is thrown when the peer violated incoming window for the session.
     */
    ConditionErrorNameMapper["amqp:session:window-violation"] = "SessionWindowViolationError";
    /**
     * Error is thrown when input was received for a link that was detached with an error.
     */
    ConditionErrorNameMapper["amqp:session:errant-link"] = "ErrantLinkError";
    /**
     * Error is thrown when an attach was received using a handle that is already in use for an attached link.
     */
    ConditionErrorNameMapper["amqp:session:handle-in-use"] = "HanldeInUseError";
    /**
     * Error is thrown when a frame (other than attach) was received referencing a handle which is not
     * currently in use of an attached link.
     */
    ConditionErrorNameMapper["amqp:session:unattached-handle"] = "UnattachedHandleError";
    /**
     * Error is thrown when an operator intervened to close the connection for some reason.
     */
    ConditionErrorNameMapper["amqp:connection:forced"] = "ConnectionForcedError";
    /**
     * Error is thrown when a valid frame header cannot be formed from the incoming byte stream.
     */
    ConditionErrorNameMapper["amqp:connection:framing-error"] = "FramingError";
    /**
     * Error is thrown when the container is no longer available on the current connection.
     */
    ConditionErrorNameMapper["amqp:connection:redirect"] = "ConnectionRedirectError";
    /**
     * Error is thrown when the server is busy. Callers should wait a while and retry the operation.
     */
    ConditionErrorNameMapper["com.microsoft:server-busy"] = "ServerBusyError";
    /**
     * Error is thrown when an incorrect argument was received.
     */
    ConditionErrorNameMapper["com.microsoft:argument-error"] = "ArgumentError";
})(ConditionErrorNameMapper = exports.ConditionErrorNameMapper || (exports.ConditionErrorNameMapper = {}));
/**
 * Maps the conditions to the Error names.
 * @enum {ErrorNameConditionMapper}
 */
var ErrorNameConditionMapper;
(function (ErrorNameConditionMapper) {
    /**
     * Error is thrown when an internal server error occured. You may have found a bug?
     */
    ErrorNameConditionMapper["InternalServerError"] = "amqp:internal-error";
    /**
     * Error for signaling general communication errors related to messaging operations.
     */
    ErrorNameConditionMapper["EventHubsCommunicationError"] = "amqp:not-found";
    /**
     * Error is thrown when a feature is not implemented yet but the placeholder is present.
     */
    ErrorNameConditionMapper["NotImplementedError"] = "amqp:not-implemented";
    /**
     * Error is thrown when an operation is attempted but is not allowed.
     */
    ErrorNameConditionMapper["InvalidOperationError"] = "amqp:not-allowed";
    /**
     * Error is thrown the the Azure Event Hub quota has been exceeded.
     * Quotas are reset periodically, this operation will have to wait until then.
     * The messaging entity has reached its maximum allowable size.
     * This can happen if the maximum number of receivers (which is 5) has already
     * been opened on a per-consumer group level.
     */
    ErrorNameConditionMapper["QuotaExceededError"] = "amqp:resource-limit-exceeded";
    /**
     * Error is thrown when the connection parameters are wrong and the server refused the connection.
     */
    ErrorNameConditionMapper["UnauthorizedError"] = "amqp:unauthorized-access";
    /**
     * Error is thrown when the service is unavailable. The operation should be retried.
     */
    ErrorNameConditionMapper["ServiceUnavailableError"] = "com.microsoft:timeout";
    /**
     * Error is thrown when an argument has a value that is out of the admissible range.
     */
    ErrorNameConditionMapper["ArgumentOutOfRangeError"] = "com.microsoft:argument-out-of-range";
    /**
     * Error is thrown when a condition that should have been met in order to execute an operation was not.
     */
    ErrorNameConditionMapper["PreconditionFailedError"] = "amqp:precondition-failed";
    /**
     * Error is thrown when data could not be decoded.
     */
    ErrorNameConditionMapper["DecodeError"] = "amqp:decode-error";
    /**
     * Error is thrown when an invalid field was passed in a frame body, and the operation could not proceed.
     */
    ErrorNameConditionMapper["InvalidFieldError"] = "amqp:invalid-field";
    /**
     * Error is thrown when the client attempted to work with a server entity to which it
     * has no access because another client is working with it.
     */
    ErrorNameConditionMapper["ResourceLockedError"] = "amqp:resource-locked";
    /**
     * Error is thrown when a server entity the client is working with has been deleted.
     */
    ErrorNameConditionMapper["ResourceDeletedError"] = "amqp:resource-deleted";
    /**
     * Error is thrown when the peer sent a frame that is not permitted in the current state.
     */
    ErrorNameConditionMapper["IllegalStateError"] = "amqp:illegal-state";
    /**
     * Error is thrown when the peer cannot send a frame because the smallest encoding of
     * the performative with the currently valid values would be too large to fit within
     * a frame of the agreed maximum frame size.
     */
    ErrorNameConditionMapper["FrameSizeTooSmallError"] = "amqp:frame-size-too-small";
    /**
     * Error is thrown when an operator intervened to detach for some reason.
     */
    ErrorNameConditionMapper["DetachForcedError"] = "amqp:link:detach-forced";
    /**
     * Error is thrown when the peer sent more message transfers than currently allowed on the link.
     */
    ErrorNameConditionMapper["TransferLimitExceededError"] = "amqp:link:transfer-limit-exceeded";
    /**
     * Error is thrown when the message sent is too large: the maximum size is 256Kb.
     */
    ErrorNameConditionMapper["MessageTooLargeError"] = "amqp:link:message-size-exceeded";
    /**
     * Error is thrown when the address provided cannot be resolved to a terminus at the current container.
     */
    ErrorNameConditionMapper["LinkRedirectError"] = "amqp:link:redirect";
    /**
     * Error is thrown when two or more instances connect to the same partition
     * with different epoch values.
     */
    ErrorNameConditionMapper["ReceiverDisconnectedError"] = "amqp:link:stolen";
    /**
     * Error is thrown when the peer violated incoming window for the session.
     */
    ErrorNameConditionMapper["SessionWindowViolationError"] = "amqp:session:window-violation";
    /**
     * Error is thrown when input was received for a link that was detached with an error.
     */
    ErrorNameConditionMapper["ErrantLinkError"] = "amqp:session:errant-link";
    /**
     * Error is thrown when an attach was received using a handle that is already in use for an attached link.
     */
    ErrorNameConditionMapper["HanldeInUseError"] = "amqp:session:handle-in-use";
    /**
     * Error is thrown when a frame (other than attach) was received referencing a handle which is not
     * currently in use of an attached link.
     */
    ErrorNameConditionMapper["UnattachedHandleError"] = "amqp:session:unattached-handle";
    /**
     * Error is thrown when an operator intervened to close the connection for some reason.
     */
    ErrorNameConditionMapper["ConnectionForcedError"] = "amqp:connection:forced";
    /**
     * Error is thrown when a valid frame header cannot be formed from the incoming byte stream.
     */
    ErrorNameConditionMapper["FramingError"] = "amqp:connection:framing-error";
    /**
     * Error is thrown when the container is no longer available on the current connection.
     */
    ErrorNameConditionMapper["ConnectionRedirectError"] = "amqp:connection:redirect";
    /**
     * Error is thrown when the server is busy. Callers should wait a while and retry the operation.
     */
    ErrorNameConditionMapper["ServerBusyError"] = "com.microsoft:server-busy";
    /**
     * Error is thrown when an incorrect argument was received.
     */
    ErrorNameConditionMapper["ArgumentError"] = "com.microsoft:argument-error";
})(ErrorNameConditionMapper = exports.ErrorNameConditionMapper || (exports.ErrorNameConditionMapper = {}));
/**
 * Describes the base class for an EventHub Error.
 * @class {EventHubsError}
 * @extends Error
 */
class EventHubsError extends Error {
    /**
     * @param {string} message The error message that provides more information about the error.
     */
    constructor(message) {
        super(message);
        /**
         * @property {string} name The error name. Default value: "EventHubsError".
         */
        this.name = "EventHubsError";
        /**
         * @property {boolean} translated Has the error been translated. Default: true.
         */
        this.translated = true;
        /**
         *
         * @param {boolean} retryable Describes whether the error is retryable. Default: false.
         */
        this.retryable = false;
    }
}
exports.EventHubsError = EventHubsError;
/**
 * Determines whether the given error object is like an AmqpError object.
 * @param err The AmqpError object
 */
function isAmqpError(err) {
    if (!err || typeof err !== "object") {
        throw new Error("err is a required parameter and must be of type 'object'.");
    }
    let result = false;
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
function translate(err) {
    if (err.translated) { // already translated
        return err;
    }
    else if (isAmqpError(err)) { // translate
        const condition = err.condition;
        const description = err.description;
        const error = new EventHubsError(description);
        error.condition = condition;
        if (condition) {
            if (condition === "com.microsoft:precondition-failed")
                error.name = "PreconditionFailedError";
            else
                error.name = ConditionErrorNameMapper[condition] || "EventHubsError";
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
    }
    else {
        // Translate a generic error into EventHubsError.
        const error = new EventHubsError(err.message);
        return error;
    }
}
exports.translate = translate;
