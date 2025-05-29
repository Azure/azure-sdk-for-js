// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getAlreadyReceivingErrorMsg, getReceiverClosedErrorMsg, InvalidMaxMessageCountError, throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing, throwTypeErrorIfParameterNotLong, throwErrorIfInvalidOperationOnMessage, throwTypeErrorIfParameterTypeMismatch, } from "../util/errors.js";
import { abandonMessage, assertValidMessageHandlers, completeMessage, deadLetterMessage, deferMessage, getMessageIterator, wrapProcessErrorHandler, } from "./receiverCommon.js";
import { defaultMaxTimeAfterFirstMessageForBatchingMs, MaxDeleteMessageCount } from "./receiver.js";
import { Constants, RetryOperationType, retry, ErrorNameConditionMapper } from "@azure/core-amqp";
import { toProcessingSpanOptions } from "../diagnostics/instrumentServiceBusMessage.js";
import { tracingClient } from "../diagnostics/tracing.js";
import { receiverLogger as logger } from "../log.js";
import { translateServiceBusError } from "../serviceBusError.js";
/**
 * @internal
 */
export class ServiceBusSessionReceiverImpl {
    get logPrefix() {
        return `[${this._context.connectionId}|session:${this.entityPath}]`;
    }
    /**
     * @internal
     * @throws Error if the underlying connection is closed.
     * @throws Error if an open receiver is already existing for given sessionId.
     */
    constructor(_messageSession, _context, entityPath, receiveMode, _skipParsingBodyAsJson, _skipConvertingDate, _retryOptions = {}) {
        this._messageSession = _messageSession;
        this._context = _context;
        this.entityPath = entityPath;
        this.receiveMode = receiveMode;
        this._skipParsingBodyAsJson = _skipParsingBodyAsJson;
        this._skipConvertingDate = _skipConvertingDate;
        this._retryOptions = _retryOptions;
        /**
         * Denotes if close() was called on this receiver
         */
        this._isClosed = false;
        throwErrorIfConnectionClosed(_context);
        this.sessionId = _messageSession.sessionId;
        this.identifier = _messageSession.identifier;
    }
    _throwIfReceiverOrConnectionClosed() {
        throwErrorIfConnectionClosed(this._context);
        if (this.isClosed) {
            if (this._isClosed) {
                const errorMessage = getReceiverClosedErrorMsg(this.entityPath, this.sessionId);
                const error = new Error(errorMessage);
                logger.logError(error, `${this.logPrefix} already closed`);
                throw error;
            }
            const amqpError = {
                condition: ErrorNameConditionMapper.SessionLockLostError,
                description: `The session lock has expired on the session with id ${this.sessionId}`,
            };
            throw translateServiceBusError(amqpError);
        }
    }
    _throwIfAlreadyReceiving() {
        if (this._isReceivingMessages()) {
            const errorMessage = getAlreadyReceivingErrorMsg(this.entityPath, this.sessionId);
            const error = new Error(errorMessage);
            logger.logError(error, `${this.logPrefix} is already receiving.`);
            throw error;
        }
    }
    get isClosed() {
        return (this._isClosed ||
            !this._context.messageSessions[this._messageSession.name] ||
            !this._messageSession.isOpen());
    }
    /**
     * The time in UTC until which the session is locked.
     * Every time `renewSessionLock()` is called, this time gets updated to current time plus the lock
     * duration as specified during the Queue/Subscription creation.
     *
     * When the lock on the session expires
     * - The current receiver can no longer be used to receive more messages.
     * Create a new receiver using `ServiceBusClient.acceptSession()` or `ServiceBusClient.acceptNextSession()`.
     * - Messages that were received in `peekLock` mode with this receiver but not yet settled
     * will land back in the Queue/Subscription with their delivery count incremented.
     *
     * @readonly
     */
    get sessionLockedUntilUtc() {
        return this._messageSession.sessionLockedUntilUtc;
    }
    /**
     * Renews the lock on the session for the duration as specified during the Queue/Subscription
     * creation. You can check the `sessionLockedUntilUtc` property for the time when the lock expires.
     *
     * When the lock on the session expires
     * - The current receiver can no longer be used to receive mode messages.
     * Create a new receiver using `ServiceBusClient.acceptSession()` or `ServiceBusClient.acceptNextSession()`.
     * - Messages that were received in `peekLock` mode with this receiver but not yet settled
     * will land back in the Queue/Subscription with their delivery count incremented.
     *
     * @param options - Options bag to pass an abort signal or tracing options.
     * @returns New lock token expiry date and time in UTC format.
     * @throws Error if the underlying connection or receiver is closed.
     * @throws `ServiceBusError` if the service returns an error while renewing session lock.
     */
    async renewSessionLock(options) {
        this._throwIfReceiverOrConnectionClosed();
        return tracingClient.withSpan("ServiceBusSessionReceiver.renewSessionLock", options !== null && options !== void 0 ? options : {}, (updatedOptions) => {
            const renewSessionLockOperationPromise = async () => {
                this._messageSession.sessionLockedUntilUtc = await this._context
                    .getManagementClient(this.entityPath)
                    .renewSessionLock(this.sessionId, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this._messageSession.name, requestName: "renewSessionLock", timeoutInMs: this._retryOptions.timeoutInMs }));
                return this._messageSession.sessionLockedUntilUtc;
            };
            const config = {
                operation: renewSessionLockOperationPromise,
                connectionId: this._context.connectionId,
                operationType: RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            };
            return retry(config);
        });
    }
    /**
     * Sets the state on the Session. For more on session states, see
     * {@link https://learn.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
     * @param state - The state that needs to be set.
     * @param options - Options bag to pass an abort signal or tracing options.
     * @throws Error if the underlying connection or receiver is closed.
     * @throws `ServiceBusError` if the service returns an error while setting the session state.
     */
    async setSessionState(state, options = {}) {
        this._throwIfReceiverOrConnectionClosed();
        return tracingClient.withSpan("ServiceBusSessionReceiver.setSessionState", options !== null && options !== void 0 ? options : {}, (updatedOptions) => {
            const setSessionStateOperationPromise = async () => {
                await this._context
                    .getManagementClient(this.entityPath)
                    .setSessionState(this.sessionId, state, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this._messageSession.name, requestName: "setState", timeoutInMs: this._retryOptions.timeoutInMs }));
                return;
            };
            const config = {
                operation: setSessionStateOperationPromise,
                connectionId: this._context.connectionId,
                operationType: RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            };
            return retry(config);
        });
    }
    /**
     * Gets the state of the Session. For more on session states, see
     * {@link https://learn.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
     * @param options - Options bag to pass an abort signal or tracing options.
     * @returns The state of that session
     * @throws Error if the underlying connection or receiver is closed.
     * @throws `ServiceBusError` if the service returns an error while retrieving session state.
     */
    async getSessionState(options = {}) {
        this._throwIfReceiverOrConnectionClosed();
        return tracingClient.withSpan("ServiceBusSessionReceiver.getSessionState", options !== null && options !== void 0 ? options : {}, (updatedOptions) => {
            const getSessionStateOperationPromise = async () => {
                return this._context
                    .getManagementClient(this.entityPath)
                    .getSessionState(this.sessionId, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this._messageSession.name, requestName: "getState", timeoutInMs: this._retryOptions.timeoutInMs }));
            };
            const config = {
                operation: getSessionStateOperationPromise,
                connectionId: this._context.connectionId,
                operationType: RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            };
            return retry(config);
        });
    }
    async peekMessages(maxMessageCount, options = {}) {
        var _a;
        this._throwIfReceiverOrConnectionClosed();
        const managementRequestOptions = Object.assign(Object.assign({}, options), { associatedLinkName: this._messageSession.name, requestName: "peekMessages", timeoutInMs: (_a = this._retryOptions) === null || _a === void 0 ? void 0 : _a.timeoutInMs, skipParsingBodyAsJson: this._skipParsingBodyAsJson, skipConvertingDate: this._skipConvertingDate });
        // omitMessageBody is available at runtime, but only exported in experimental subpath
        const { fromSequenceNumber, omitMessageBody } = options;
        const peekOperationPromise = async () => {
            if (fromSequenceNumber !== undefined) {
                return this._context
                    .getManagementClient(this.entityPath)
                    .peekBySequenceNumber(fromSequenceNumber, maxMessageCount, this.sessionId, omitMessageBody, managementRequestOptions);
            }
            else {
                return this._context
                    .getManagementClient(this.entityPath)
                    .peekMessagesBySession(this.sessionId, maxMessageCount, omitMessageBody, managementRequestOptions);
            }
        };
        const config = {
            operation: peekOperationPromise,
            connectionId: this._context.connectionId,
            operationType: RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return retry(config);
    }
    async receiveDeferredMessages(sequenceNumbers, options = {}) {
        this._throwIfReceiverOrConnectionClosed();
        throwTypeErrorIfParameterMissing(this._context.connectionId, "sequenceNumbers", sequenceNumbers);
        throwTypeErrorIfParameterNotLong(this._context.connectionId, "sequenceNumbers", sequenceNumbers);
        const deferredSequenceNumbers = Array.isArray(sequenceNumbers)
            ? sequenceNumbers
            : [sequenceNumbers];
        const receiveDeferredMessagesOperationPromise = async () => {
            const deferredMessages = await this._context
                .getManagementClient(this.entityPath)
                .receiveDeferredMessages(deferredSequenceNumbers, this.receiveMode, this.sessionId, Object.assign(Object.assign({}, options), { associatedLinkName: this._messageSession.name, requestName: "receiveDeferredMessages", timeoutInMs: this._retryOptions.timeoutInMs, skipParsingBodyAsJson: this._skipParsingBodyAsJson, skipConvertingDate: this._skipConvertingDate }));
            return deferredMessages;
        };
        const config = {
            operation: receiveDeferredMessagesOperationPromise,
            connectionId: this._context.connectionId,
            operationType: RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return retry(config);
    }
    async deleteMessages(options) {
        this._throwIfReceiverOrConnectionClosed();
        const deleteMessagesOperationPromise = () => {
            return this._context
                .getManagementClient(this.entityPath)
                .deleteMessages(options.maxMessageCount, options === null || options === void 0 ? void 0 : options.beforeEnqueueTime, this.sessionId, Object.assign(Object.assign({}, options), { associatedLinkName: this._messageSession.name, requestName: "deleteMessages", timeoutInMs: this._retryOptions.timeoutInMs }));
        };
        const config = {
            operation: deleteMessagesOperationPromise,
            connectionId: this._context.connectionId,
            operationType: RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return retry(config);
    }
    async purgeMessages(options) {
        let deletedCount = await this.deleteMessages({
            maxMessageCount: MaxDeleteMessageCount,
            beforeEnqueueTime: options === null || options === void 0 ? void 0 : options.beforeEnqueueTime,
        });
        if (deletedCount === MaxDeleteMessageCount) {
            let batchCount = MaxDeleteMessageCount;
            while (batchCount === MaxDeleteMessageCount) {
                batchCount = await this.deleteMessages({
                    maxMessageCount: MaxDeleteMessageCount,
                    beforeEnqueueTime: options === null || options === void 0 ? void 0 : options.beforeEnqueueTime,
                });
                deletedCount += batchCount;
            }
        }
        return deletedCount;
    }
    async receiveMessages(maxMessageCount, options) {
        this._throwIfReceiverOrConnectionClosed();
        this._throwIfAlreadyReceiving();
        throwTypeErrorIfParameterMissing(this._context.connectionId, "maxMessageCount", maxMessageCount);
        throwTypeErrorIfParameterTypeMismatch(this._context.connectionId, "maxMessageCount", maxMessageCount, "number");
        if (isNaN(maxMessageCount) || maxMessageCount < 1) {
            throw new TypeError(InvalidMaxMessageCountError);
        }
        const receiveBatchOperationPromise = async () => {
            var _a;
            const receivedMessages = await this._messageSession.receiveMessages(maxMessageCount, (_a = options === null || options === void 0 ? void 0 : options.maxWaitTimeInMs) !== null && _a !== void 0 ? _a : Constants.defaultOperationTimeoutInMs, defaultMaxTimeAfterFirstMessageForBatchingMs, options !== null && options !== void 0 ? options : {});
            return receivedMessages;
        };
        const config = {
            operation: receiveBatchOperationPromise,
            connectionId: this._context.connectionId,
            operationType: RetryOperationType.receiveMessage,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return retry(config).catch((err) => {
            throw translateServiceBusError(err);
        });
    }
    subscribe(handlers, options) {
        // TODO - receiverOptions for subscribe??
        assertValidMessageHandlers(handlers);
        options = options !== null && options !== void 0 ? options : {};
        const processError = wrapProcessErrorHandler(handlers);
        this._registerMessageHandler(async (message) => {
            return tracingClient.withSpan("SessionReceiver.process", options !== null && options !== void 0 ? options : {}, () => handlers.processMessage(message), toProcessingSpanOptions(message, this, this._context.config, "process"));
        }, processError, options);
        return {
            close: async () => {
                var _a;
                return (_a = this._messageSession) === null || _a === void 0 ? void 0 : _a.receiverHelper.suspend();
            },
        };
    }
    /**
     * Registers handlers to deal with the incoming stream of messages over an AMQP receiver link
     * from a Queue/Subscription.
     * To stop receiving messages, call `close()` on the SessionReceiver.
     *
     * Throws an error if there is another receive operation in progress on the same receiver. If you
     * are not sure whether there is another receive operation running, check the `isReceivingMessages`
     * property on the receiver.
     *
     * @param onMessage - Handler for processing each incoming message.
     * @param onError - Handler for any error that occurs while receiving or processing messages.
     * @param options - Options to control whether messages should be automatically completed
     * or if the lock on the session should be automatically renewed. You can control the
     * maximum number of messages that should be concurrently processed. You can
     * also provide a timeout in milliseconds to denote the amount of time to wait for a new message
     * before closing the receiver.
     *
     * @throws Error if the underlying connection or receiver is closed.
     * @throws Error if the receiver is already in state of receiving messages.
     * @throws `ServiceBusError` if the service returns an error while receiving messages. These are bubbled up to be handled by user provided `onError` handler.
     */
    _registerMessageHandler(onMessage, onError, options) {
        this._throwIfReceiverOrConnectionClosed();
        this._throwIfAlreadyReceiving();
        const connId = this._context.connectionId;
        throwTypeErrorIfParameterMissing(connId, "onMessage", onMessage);
        throwTypeErrorIfParameterMissing(connId, "onError", onError);
        if (typeof onMessage !== "function") {
            throw new TypeError("The parameter 'onMessage' must be of type 'function'.");
        }
        if (typeof onError !== "function") {
            throw new TypeError("The parameter 'onError' must be of type 'function'.");
        }
        try {
            this._messageSession.subscribe(onMessage, onError, options);
        }
        catch (err) {
            onError({
                error: err,
                errorSource: "receive",
                entityPath: this.entityPath,
                fullyQualifiedNamespace: this._context.config.host,
                identifier: this.identifier,
            });
        }
    }
    getMessageIterator(options) {
        return getMessageIterator(this, options);
    }
    async completeMessage(message) {
        this._throwIfReceiverOrConnectionClosed();
        throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
        const msgImpl = message;
        return completeMessage(msgImpl, this._context, this.entityPath, this._retryOptions);
    }
    async abandonMessage(message, propertiesToModify) {
        this._throwIfReceiverOrConnectionClosed();
        throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
        const msgImpl = message;
        return abandonMessage(msgImpl, this._context, this.entityPath, propertiesToModify, this._retryOptions);
    }
    async deferMessage(message, propertiesToModify) {
        this._throwIfReceiverOrConnectionClosed();
        throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
        const msgImpl = message;
        return deferMessage(msgImpl, this._context, this.entityPath, propertiesToModify, this._retryOptions);
    }
    async deadLetterMessage(message, options) {
        this._throwIfReceiverOrConnectionClosed();
        throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
        const msgImpl = message;
        return deadLetterMessage(msgImpl, this._context, this.entityPath, options, this._retryOptions);
    }
    async renewMessageLock() {
        throw new Error("Renewing message lock is an invalid operation when working with sessions.");
    }
    async close() {
        try {
            await this._messageSession.close();
        }
        catch (err) {
            logger.logError(err, "%s An error occurred while closing the SessionReceiver for session %s", this.logPrefix, this.sessionId);
            throw err;
        }
        finally {
            this._isClosed = true;
        }
    }
    /**
     * Indicates whether the receiver is currently receiving messages or not.
     * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
     */
    _isReceivingMessages() {
        return this._messageSession ? this._messageSession.isReceivingMessages : false;
    }
}
//# sourceMappingURL=sessionReceiver.js.map