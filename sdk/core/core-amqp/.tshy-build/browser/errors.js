// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable eqeqeq */
import { isAmqpError as rheaIsAmqpError } from "rhea-promise";
import { isDefined, isError, isNodeLike, isObjectWithProperties } from "@azure/core-util";
import { isNumber, isString } from "./util/utils.js";
/**
 * Maps the conditions to the numeric AMQP Response status codes.
 * @internal
 */
export var ConditionStatusMapper;
(function (ConditionStatusMapper) {
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:timeout"] = 408] = "com.microsoft:timeout";
    ConditionStatusMapper[ConditionStatusMapper["amqp:not-found"] = 404] = "amqp:not-found";
    ConditionStatusMapper[ConditionStatusMapper["amqp:not-implemented"] = 501] = "amqp:not-implemented";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:entity-already-exists"] = 409] = "com.microsoft:entity-already-exists";
    ConditionStatusMapper[ConditionStatusMapper["com.microsoft:message-lock-lost"] = 410] = "com.microsoft:message-lock-lost";
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
})(ConditionStatusMapper || (ConditionStatusMapper = {}));
/**
 * Maps the amqp error conditions to the Error names.
 */
export var ConditionErrorNameMapper;
(function (ConditionErrorNameMapper) {
    /**
     * Error is thrown when the address is already in use.
     */
    ConditionErrorNameMapper["com.microsoft:address-already-in-use"] = "AddressAlreadyInUseError";
    /**
     * Error is thrown when the store lock is lost.
     */
    ConditionErrorNameMapper["com.microsoft:store-lock-lost"] = "StoreLockLostError";
    /**
     * Error is thrown when a matching subscription is not found.
     */
    ConditionErrorNameMapper["com.microsoft:no-matching-subscription"] = "NoMatchingSubscriptionError";
    /**
     * Error is thrown when an attempt is made to access a partition that is not owned by the
     * requesting entity.
     */
    ConditionErrorNameMapper["com.microsoft:partition-not-owned"] = "PartitionNotOwnedError";
    /**
     * Error is thrown when access to publisher has been revoked.
     */
    ConditionErrorNameMapper["com.microsoft:publisher-revoked"] = "PublisherRevokedError";
    /**
     * Error is thrown when an attempt is made to create an entity that already exists.
     */
    ConditionErrorNameMapper["com.microsoft:entity-already-exists"] = "MessagingEntityAlreadyExistsError";
    /**
     * Error is thrown when trying to access/connect to a disabled messaging entity.
     */
    ConditionErrorNameMapper["com.microsoft:entity-disabled"] = "MessagingEntityDisabledError";
    /**
     * Error is thrown when the lock on the message is lost.
     */
    ConditionErrorNameMapper["com.microsoft:message-lock-lost"] = "MessageLockLostError";
    /**
     * Error is thrown when the lock on the Azure ServiceBus session is lost.
     */
    ConditionErrorNameMapper["com.microsoft:session-lock-lost"] = "SessionLockLostError";
    /**
     * Error is thrown when the Azure ServiceBus session cannot be locked.
     */
    ConditionErrorNameMapper["com.microsoft:session-cannot-be-locked"] = "SessionCannotBeLockedError";
    /**
     * Error is thrown when an internal server error occurred. You may have found a bug?
     */
    ConditionErrorNameMapper["amqp:internal-error"] = "InternalServerError";
    /**
     * Error for signaling general communication errors related to messaging operations.
     */
    ConditionErrorNameMapper["amqp:not-found"] = "ServiceCommunicationError";
    /**
     * Error is thrown when the message is not found.
     */
    ConditionErrorNameMapper["com.microsoft:message-not-found"] = "MessageNotFoundError";
    /**
     * Error is thrown when relay is not found.
     */
    ConditionErrorNameMapper["com.microsoft:relay-not-found"] = "RelayNotFoundError";
    /**
     * Error is thrown when a feature is not implemented yet but the placeholder is present.
     */
    ConditionErrorNameMapper["amqp:not-implemented"] = "NotImplementedError";
    /**
     * Error is thrown when an operation is attempted but is not allowed.
     */
    ConditionErrorNameMapper["amqp:not-allowed"] = "InvalidOperationError";
    /**
     * Error is thrown the the Azure EventHub/ServiceBus quota has been exceeded.
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
     * Error is thrown when the connection parameters are wrong and the server refused the connection.
     */
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    ConditionErrorNameMapper["com.microsoft:auth-failed"] = "UnauthorizedError";
    /**
     * Error is thrown when the service is unavailable. The operation should be retried.
     */
    ConditionErrorNameMapper["com.microsoft:timeout"] = "ServiceUnavailableError";
    /**
     * Error is thrown when no new messages are received for the specified time.
     */
    ConditionErrorNameMapper["com.microsoft:message-wait-timeout"] = "MessageWaitTimeout";
    /**
     * Error is thrown when an argument has a value that is out of the admissible range.
     */
    ConditionErrorNameMapper["com.microsoft:argument-out-of-range"] = "ArgumentOutOfRangeError";
    /**
     * Error is thrown when a condition that should have been met in order to execute an operation was not.
     */
    ConditionErrorNameMapper["amqp:precondition-failed"] = "PreconditionFailedError";
    /**
     * Error is thrown when a condition that should have been met in order to execute an operation was not.
     */
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    ConditionErrorNameMapper["com.microsoft:precondition-failed"] = "PreconditionFailedError";
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
    ConditionErrorNameMapper["amqp:session:handle-in-use"] = "HandleInUseError";
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
    /**
     * Error is thrown when server cancels the operation due to an internal issue.
     */
    ConditionErrorNameMapper["com.microsoft:operation-cancelled"] = "OperationCancelledError";
    /**
     * Error is thrown when the client sender does not have enough link credits to send the message.
     */
    ConditionErrorNameMapper["client.sender:not-enough-link-credit"] = "SenderBusyError";
    /**
     * Error is thrown when the client sender's link isn't ready
     */
    ConditionErrorNameMapper["client.sender:link-not-ready"] = "SenderNotReadyError";
    /**
     * Error is thrown when a low level system error is thrown by node.js.
     * {@link https://nodejs.org/dist/latest-v8.x/docs/api/all.html#errors_class_system_error}
     */
    ConditionErrorNameMapper["system:error"] = "SystemError";
})(ConditionErrorNameMapper || (ConditionErrorNameMapper = {}));
/**
 * Maps the Error names to the amqp error conditions.
 */
export var ErrorNameConditionMapper;
(function (ErrorNameConditionMapper) {
    /**
     * Error is thrown when the address is already in use.
     */
    ErrorNameConditionMapper["AddressAlreadyInUseError"] = "com.microsoft:address-already-in-use";
    /**
     * Error is thrown when the store lock is lost.
     */
    ErrorNameConditionMapper["StoreLockLostError"] = "com.microsoft:store-lock-lost";
    /**
     * Error is thrown when a matching subscription is not found.
     */
    ErrorNameConditionMapper["NoMatchingSubscriptionError"] = "com.microsoft:no-matching-subscription";
    /**
     * Error is thrown when an attempt is made to access a partition that is not owned by the
     * requesting entity.
     */
    ErrorNameConditionMapper["PartitionNotOwnedError"] = "com.microsoft:partition-not-owned";
    /**
     * Error is thrown when access to publisher has been revoked.
     */
    ErrorNameConditionMapper["PublisherRevokedError"] = "com.microsoft:publisher-revoked";
    /**
     * Error is thrown when an attempt is made to create an entity that already exists.
     */
    ErrorNameConditionMapper["MessagingEntityAlreadyExistsError"] = "com.microsoft:entity-already-exists";
    /**
     * Error is thrown when trying to access/connect to a disabled messaging entity.
     */
    ErrorNameConditionMapper["MessagingEntityDisabledError"] = "com.microsoft:entity-disabled";
    /**
     * Error is thrown when the lock on the message is lost.
     */
    ErrorNameConditionMapper["MessageLockLostError"] = "com.microsoft:message-lock-lost";
    /**
     * Error is thrown when the lock on the Azure ServiceBus session is lost.
     */
    ErrorNameConditionMapper["SessionLockLostError"] = "com.microsoft:session-lock-lost";
    /**
     * Error is thrown when the Azure ServiceBus session cannot be locked.
     */
    ErrorNameConditionMapper["SessionCannotBeLockedError"] = "com.microsoft:session-cannot-be-locked";
    /**
     * Error is thrown when an internal server error occurred. You may have found a bug?
     */
    ErrorNameConditionMapper["InternalServerError"] = "amqp:internal-error";
    /**
     * Error for signaling general communication errors related to messaging operations.
     */
    ErrorNameConditionMapper["ServiceCommunicationError"] = "amqp:not-found";
    /**
     * Error is thrown when message is not found.
     */
    ErrorNameConditionMapper["MessageNotFoundError"] = "com.microsoft:message-not-found";
    /**
     * Error is thrown when relay is not found.
     */
    ErrorNameConditionMapper["RelayNotFoundError"] = "com.microsoft:relay-not-found";
    /**
     * Error is thrown when a feature is not implemented yet but the placeholder is present.
     */
    ErrorNameConditionMapper["NotImplementedError"] = "amqp:not-implemented";
    /**
     * Error is thrown when an operation is attempted but is not allowed.
     */
    ErrorNameConditionMapper["InvalidOperationError"] = "amqp:not-allowed";
    /**
     * Error is thrown the the Azure EventHub/ServiceBus quota has been exceeded.
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
     * Error is thrown when no new messages are received for the specified time.
     */
    ErrorNameConditionMapper["MessageWaitTimeout"] = "com.microsoft:message-wait-timeout";
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
    ErrorNameConditionMapper["HandleInUseError"] = "amqp:session:handle-in-use";
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
    /**
     * Error is thrown when server cancels the operation due to an internal issue.
     */
    ErrorNameConditionMapper["OperationCancelledError"] = "com.microsoft:operation-cancelled";
    /**
     * Error is thrown when the client sender does not have enough link credits to send the message.
     */
    ErrorNameConditionMapper["SenderBusyError"] = "client.sender:not-enough-link-credit";
    /**
     * Error is thrown when the client sender's link isn't ready
     */
    ErrorNameConditionMapper["SenderNotReadyError"] = "client.sender:link-not-ready";
    /**
     * Error is thrown when a low level system error is thrown by node.js.
     * {@link https://nodejs.org/api/errors.html#errors_class_systemerror}
     */
    ErrorNameConditionMapper["SystemError"] = "system:error";
})(ErrorNameConditionMapper || (ErrorNameConditionMapper = {}));
/**
 * @internal
 */
const systemErrorFieldsToCopy = [
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
export function isMessagingError(error) {
    return error.name === "MessagingError";
}
/**
 * Describes the base class for Messaging Error.
 */
export class MessagingError extends Error {
    /**
     * @param message - The error message that provides more information about the error.
     * @param originalError - An error whose properties will be copied to the MessagingError if the
     * property matches one found on the Node.js `SystemError`.
     */
    constructor(message, originalError) {
        super(message);
        /**
         * The error name. Default value: "MessagingError".
         */
        this.name = "MessagingError";
        /**
         *
         * Describes whether the error is retryable. Default: true.
         */
        this.retryable = true;
        if (!originalError) {
            return;
        }
        // copy properties from system error
        for (const propName of systemErrorFieldsToCopy) {
            if (originalError[propName] != undefined) {
                this[propName] = originalError[propName];
            }
        }
    }
}
/**
 * Provides a list of retryable AMQP errors.
 * "InternalServerError", "ServerBusyError", "ServiceUnavailableError", "OperationCancelledError",
 * "SenderBusyError", "SenderNotReadyError", "MessagingError", "DetachForcedError", "ConnectionForcedError",
 * "TransferLimitExceededError"
 */
export const retryableErrors = [
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
    "SenderNotReadyError",
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
export var SystemErrorConditionMapper;
(function (SystemErrorConditionMapper) {
    /* eslint-disable @typescript-eslint/no-duplicate-enum-values */
    SystemErrorConditionMapper["ENOTFOUND"] = "amqp:not-found";
    SystemErrorConditionMapper["EBUSY"] = "com.microsoft:server-busy";
    SystemErrorConditionMapper["ECONNREFUSED"] = "amqp:connection:forced";
    SystemErrorConditionMapper["ETIMEDOUT"] = "com.microsoft:timeout";
    SystemErrorConditionMapper["ECONNRESET"] = "com.microsoft:timeout";
    SystemErrorConditionMapper["ENETDOWN"] = "com.microsoft:timeout";
    SystemErrorConditionMapper["EHOSTDOWN"] = "com.microsoft:timeout";
    SystemErrorConditionMapper["ENETRESET"] = "com.microsoft:timeout";
    SystemErrorConditionMapper["ENETUNREACH"] = "com.microsoft:timeout";
    SystemErrorConditionMapper["ENONET"] = "com.microsoft:timeout";
    SystemErrorConditionMapper["EADDRNOTAVAIL"] = "com.microsoft:timeout";
    SystemErrorConditionMapper["EAI_AGAIN"] = "com.microsoft:timeout";
    /* eslint-enable @typescript-eslint/no-duplicate-enum-values */
})(SystemErrorConditionMapper || (SystemErrorConditionMapper = {}));
/**
 * Checks whether the provided error is a node.js SystemError.
 * @param err - An object that may contain error information.
 */
export function isSystemError(err) {
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
function isBrowserWebsocketError(err) {
    let result = false;
    if (!isNodeLike &&
        self &&
        err.type === "error" &&
        err.target instanceof self.WebSocket) {
        result = true;
    }
    return result;
}
/**
 * @internal
 * Checks whether a object is an ErrorEvent or not. https://html.spec.whatwg.org/multipage/webappapis.html#errorevent
 * @param err - object that may contain error information
 */
function isErrorEvent(err) {
    return typeof err.error === "object" && typeof err.message === "string";
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
export function translate(err) {
    if (!isDefined(err)) {
        return new Error(`Unknown error encountered.`);
    }
    else if (typeof err !== "object") {
        // The error is a scalar type, make it the message of an actual error.
        return new Error(String(err));
    }
    const errObj = isErrorEvent(err) ? err.error : err;
    // Built-in errors like TypeError and RangeError should not be retryable as these indicate issues
    // with user input and not an issue with the Messaging process.
    if (errObj instanceof TypeError || errObj instanceof RangeError) {
        return errObj;
    }
    if (isAmqpError(errObj)) {
        // translate
        const condition = errObj.condition;
        const description = errObj.description;
        const error = new MessagingError(description);
        if (errObj.stack)
            error.stack = errObj.stack;
        error.info = errObj.info;
        if (condition) {
            error.code = ConditionErrorNameMapper[condition];
        }
        if (description &&
            (description.includes("status-code: 404") ||
                description.match(/The messaging entity .* could not be found.*/i) !== null)) {
            error.code = "MessagingEntityNotFoundError";
        }
        if (error.code && retryableErrors.indexOf(error.code) === -1) {
            // not found
            error.retryable = false;
        }
        return error;
    }
    if (errObj instanceof Error && errObj.name === "MessagingError") {
        // already translated
        return errObj;
    }
    if (isSystemError(errObj)) {
        // translate
        const condition = errObj.code;
        const description = errObj.message;
        const error = new MessagingError(description, errObj);
        let errorType = "SystemError";
        if (condition) {
            const amqpErrorCondition = SystemErrorConditionMapper[condition];
            errorType =
                ConditionErrorNameMapper[amqpErrorCondition];
        }
        if (retryableErrors.indexOf(errorType) === -1) {
            // not found
            error.retryable = false;
        }
        return error;
    }
    if (isBrowserWebsocketError(errObj)) {
        // Translate browser communication errors during opening handshake to generic ServiceCommunicationError
        const error = new MessagingError("Websocket connection failed.");
        error.code = ConditionErrorNameMapper[ErrorNameConditionMapper.ServiceCommunicationError];
        error.retryable = false;
        return error;
    }
    // Some errors come from rhea-promise and need to be converted to MessagingError.
    // A subset of these are also retryable.
    if (isError(errObj) && rheaPromiseErrors.indexOf(errObj.name) !== -1) {
        const error = new MessagingError(errObj.message, errObj);
        error.code = errObj.name;
        if (error.code && retryableErrors.indexOf(error.code) === -1) {
            // not found
            error.retryable = false;
        }
        return error;
    }
    return isError(errObj) ? errObj : new Error(String(errObj));
}
/**
 * @internal
 */
function isAmqpError(error) {
    return rheaIsAmqpError(error);
}
//# sourceMappingURL=errors.js.map