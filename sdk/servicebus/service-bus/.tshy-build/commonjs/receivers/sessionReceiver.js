"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBusSessionReceiverImpl = void 0;
const errors_js_1 = require("../util/errors.js");
const receiverCommon_js_1 = require("./receiverCommon.js");
const receiver_js_1 = require("./receiver.js");
const core_amqp_1 = require("@azure/core-amqp");
const instrumentServiceBusMessage_js_1 = require("../diagnostics/instrumentServiceBusMessage.js");
const tracing_js_1 = require("../diagnostics/tracing.js");
const log_js_1 = require("../log.js");
const serviceBusError_js_1 = require("../serviceBusError.js");
/**
 * @internal
 */
class ServiceBusSessionReceiverImpl {
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
        (0, errors_js_1.throwErrorIfConnectionClosed)(_context);
        this.sessionId = _messageSession.sessionId;
        this.identifier = _messageSession.identifier;
    }
    _throwIfReceiverOrConnectionClosed() {
        (0, errors_js_1.throwErrorIfConnectionClosed)(this._context);
        if (this.isClosed) {
            if (this._isClosed) {
                const errorMessage = (0, errors_js_1.getReceiverClosedErrorMsg)(this.entityPath, this.sessionId);
                const error = new Error(errorMessage);
                log_js_1.receiverLogger.logError(error, `${this.logPrefix} already closed`);
                throw error;
            }
            const amqpError = {
                condition: core_amqp_1.ErrorNameConditionMapper.SessionLockLostError,
                description: `The session lock has expired on the session with id ${this.sessionId}`,
            };
            throw (0, serviceBusError_js_1.translateServiceBusError)(amqpError);
        }
    }
    _throwIfAlreadyReceiving() {
        if (this._isReceivingMessages()) {
            const errorMessage = (0, errors_js_1.getAlreadyReceivingErrorMsg)(this.entityPath, this.sessionId);
            const error = new Error(errorMessage);
            log_js_1.receiverLogger.logError(error, `${this.logPrefix} is already receiving.`);
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
        return tracing_js_1.tracingClient.withSpan("ServiceBusSessionReceiver.renewSessionLock", options !== null && options !== void 0 ? options : {}, (updatedOptions) => {
            const renewSessionLockOperationPromise = async () => {
                this._messageSession.sessionLockedUntilUtc = await this._context
                    .getManagementClient(this.entityPath)
                    .renewSessionLock(this.sessionId, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this._messageSession.name, requestName: "renewSessionLock", timeoutInMs: this._retryOptions.timeoutInMs }));
                return this._messageSession.sessionLockedUntilUtc;
            };
            const config = {
                operation: renewSessionLockOperationPromise,
                connectionId: this._context.connectionId,
                operationType: core_amqp_1.RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            };
            return (0, core_amqp_1.retry)(config);
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
        return tracing_js_1.tracingClient.withSpan("ServiceBusSessionReceiver.setSessionState", options !== null && options !== void 0 ? options : {}, (updatedOptions) => {
            const setSessionStateOperationPromise = async () => {
                await this._context
                    .getManagementClient(this.entityPath)
                    .setSessionState(this.sessionId, state, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this._messageSession.name, requestName: "setState", timeoutInMs: this._retryOptions.timeoutInMs }));
                return;
            };
            const config = {
                operation: setSessionStateOperationPromise,
                connectionId: this._context.connectionId,
                operationType: core_amqp_1.RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            };
            return (0, core_amqp_1.retry)(config);
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
        return tracing_js_1.tracingClient.withSpan("ServiceBusSessionReceiver.getSessionState", options !== null && options !== void 0 ? options : {}, (updatedOptions) => {
            const getSessionStateOperationPromise = async () => {
                return this._context
                    .getManagementClient(this.entityPath)
                    .getSessionState(this.sessionId, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this._messageSession.name, requestName: "getState", timeoutInMs: this._retryOptions.timeoutInMs }));
            };
            const config = {
                operation: getSessionStateOperationPromise,
                connectionId: this._context.connectionId,
                operationType: core_amqp_1.RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            };
            return (0, core_amqp_1.retry)(config);
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
            operationType: core_amqp_1.RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return (0, core_amqp_1.retry)(config);
    }
    async receiveDeferredMessages(sequenceNumbers, options = {}) {
        this._throwIfReceiverOrConnectionClosed();
        (0, errors_js_1.throwTypeErrorIfParameterMissing)(this._context.connectionId, "sequenceNumbers", sequenceNumbers);
        (0, errors_js_1.throwTypeErrorIfParameterNotLong)(this._context.connectionId, "sequenceNumbers", sequenceNumbers);
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
            operationType: core_amqp_1.RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return (0, core_amqp_1.retry)(config);
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
            operationType: core_amqp_1.RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return (0, core_amqp_1.retry)(config);
    }
    async purgeMessages(options) {
        let deletedCount = await this.deleteMessages({
            maxMessageCount: receiver_js_1.MaxDeleteMessageCount,
            beforeEnqueueTime: options === null || options === void 0 ? void 0 : options.beforeEnqueueTime,
        });
        if (deletedCount === receiver_js_1.MaxDeleteMessageCount) {
            let batchCount = receiver_js_1.MaxDeleteMessageCount;
            while (batchCount === receiver_js_1.MaxDeleteMessageCount) {
                batchCount = await this.deleteMessages({
                    maxMessageCount: receiver_js_1.MaxDeleteMessageCount,
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
        (0, errors_js_1.throwTypeErrorIfParameterMissing)(this._context.connectionId, "maxMessageCount", maxMessageCount);
        (0, errors_js_1.throwTypeErrorIfParameterTypeMismatch)(this._context.connectionId, "maxMessageCount", maxMessageCount, "number");
        if (isNaN(maxMessageCount) || maxMessageCount < 1) {
            throw new TypeError(errors_js_1.InvalidMaxMessageCountError);
        }
        const receiveBatchOperationPromise = async () => {
            var _a;
            const receivedMessages = await this._messageSession.receiveMessages(maxMessageCount, (_a = options === null || options === void 0 ? void 0 : options.maxWaitTimeInMs) !== null && _a !== void 0 ? _a : core_amqp_1.Constants.defaultOperationTimeoutInMs, receiver_js_1.defaultMaxTimeAfterFirstMessageForBatchingMs, options !== null && options !== void 0 ? options : {});
            return receivedMessages;
        };
        const config = {
            operation: receiveBatchOperationPromise,
            connectionId: this._context.connectionId,
            operationType: core_amqp_1.RetryOperationType.receiveMessage,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return (0, core_amqp_1.retry)(config).catch((err) => {
            throw (0, serviceBusError_js_1.translateServiceBusError)(err);
        });
    }
    subscribe(handlers, options) {
        // TODO - receiverOptions for subscribe??
        (0, receiverCommon_js_1.assertValidMessageHandlers)(handlers);
        options = options !== null && options !== void 0 ? options : {};
        const processError = (0, receiverCommon_js_1.wrapProcessErrorHandler)(handlers);
        this._registerMessageHandler(async (message) => {
            return tracing_js_1.tracingClient.withSpan("SessionReceiver.process", options !== null && options !== void 0 ? options : {}, () => handlers.processMessage(message), (0, instrumentServiceBusMessage_js_1.toProcessingSpanOptions)(message, this, this._context.config, "process"));
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
        (0, errors_js_1.throwTypeErrorIfParameterMissing)(connId, "onMessage", onMessage);
        (0, errors_js_1.throwTypeErrorIfParameterMissing)(connId, "onError", onError);
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
        return (0, receiverCommon_js_1.getMessageIterator)(this, options);
    }
    async completeMessage(message) {
        this._throwIfReceiverOrConnectionClosed();
        (0, errors_js_1.throwErrorIfInvalidOperationOnMessage)(message, this.receiveMode, this._context.connectionId);
        const msgImpl = message;
        return (0, receiverCommon_js_1.completeMessage)(msgImpl, this._context, this.entityPath, this._retryOptions);
    }
    async abandonMessage(message, propertiesToModify) {
        this._throwIfReceiverOrConnectionClosed();
        (0, errors_js_1.throwErrorIfInvalidOperationOnMessage)(message, this.receiveMode, this._context.connectionId);
        const msgImpl = message;
        return (0, receiverCommon_js_1.abandonMessage)(msgImpl, this._context, this.entityPath, propertiesToModify, this._retryOptions);
    }
    async deferMessage(message, propertiesToModify) {
        this._throwIfReceiverOrConnectionClosed();
        (0, errors_js_1.throwErrorIfInvalidOperationOnMessage)(message, this.receiveMode, this._context.connectionId);
        const msgImpl = message;
        return (0, receiverCommon_js_1.deferMessage)(msgImpl, this._context, this.entityPath, propertiesToModify, this._retryOptions);
    }
    async deadLetterMessage(message, options) {
        this._throwIfReceiverOrConnectionClosed();
        (0, errors_js_1.throwErrorIfInvalidOperationOnMessage)(message, this.receiveMode, this._context.connectionId);
        const msgImpl = message;
        return (0, receiverCommon_js_1.deadLetterMessage)(msgImpl, this._context, this.entityPath, options, this._retryOptions);
    }
    async renewMessageLock() {
        throw new Error("Renewing message lock is an invalid operation when working with sessions.");
    }
    async close() {
        try {
            await this._messageSession.close();
        }
        catch (err) {
            log_js_1.receiverLogger.logError(err, "%s An error occurred while closing the SessionReceiver for session %s", this.logPrefix, this.sessionId);
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
exports.ServiceBusSessionReceiverImpl = ServiceBusSessionReceiverImpl;
//# sourceMappingURL=sessionReceiver.js.map