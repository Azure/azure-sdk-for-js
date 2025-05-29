"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBusReceiverImpl = exports.MaxDeleteMessageCount = exports.defaultMaxTimeAfterFirstMessageForBatchingMs = void 0;
const errors_js_1 = require("../util/errors.js");
const streamingReceiver_js_1 = require("../core/streamingReceiver.js");
const batchingReceiver_js_1 = require("../core/batchingReceiver.js");
const receiverCommon_js_1 = require("./receiverCommon.js");
const core_amqp_1 = require("@azure/core-amqp");
const autoLockRenewer_js_1 = require("../core/autoLockRenewer.js");
const log_js_1 = require("../log.js");
const serviceBusError_js_1 = require("../serviceBusError.js");
const utils_js_1 = require("../util/utils.js");
const tracing_js_1 = require("../diagnostics/tracing.js");
const instrumentServiceBusMessage_js_1 = require("../diagnostics/instrumentServiceBusMessage.js");
/**
 * The default time to wait for messages _after_ the first message
 * has been received.
 *
 * This timeout only applies to receiveMessages()
 *
 * @internal
 */
exports.defaultMaxTimeAfterFirstMessageForBatchingMs = 1000;
/**
 * The maximum number of messages to delete in a single batch.  This cap is established and enforced by the service.
 * @internal
 */
exports.MaxDeleteMessageCount = 4000;
/**
 * @internal
 */
class ServiceBusReceiverImpl {
    get logPrefix() {
        return `[${this._context.connectionId}|receiver:${this.entityPath}]`;
    }
    /**
     * @throws Error if the underlying connection is closed.
     */
    constructor(_context, entityPath, receiveMode, maxAutoRenewLockDurationInMs, skipParsingBodyAsJson, skipConvertingDate = false, retryOptions = {}, identifier) {
        this._context = _context;
        this.entityPath = entityPath;
        this.receiveMode = receiveMode;
        this.skipParsingBodyAsJson = skipParsingBodyAsJson;
        this.skipConvertingDate = skipConvertingDate;
        /**
         * Denotes if close() was called on this receiver
         */
        this._isClosed = false;
        (0, errors_js_1.throwErrorIfConnectionClosed)(_context);
        this._retryOptions = retryOptions;
        this._lockRenewer = autoLockRenewer_js_1.LockRenewer.create(this._context, maxAutoRenewLockDurationInMs, receiveMode);
        this.identifier = (0, utils_js_1.ensureValidIdentifier)(this.entityPath, identifier);
    }
    _throwIfAlreadyReceiving() {
        if (this._isReceivingMessages()) {
            const errorMessage = (0, errors_js_1.getAlreadyReceivingErrorMsg)(this.entityPath);
            const error = new Error(errorMessage);
            log_js_1.receiverLogger.logError(error, `${this.logPrefix} is already receiving`);
            throw error;
        }
    }
    _throwIfReceiverOrConnectionClosed() {
        (0, errors_js_1.throwErrorIfConnectionClosed)(this._context);
        if (this.isClosed) {
            const errorMessage = (0, errors_js_1.getReceiverClosedErrorMsg)(this.entityPath);
            const error = new Error(errorMessage);
            log_js_1.receiverLogger.logError(error, `${this.logPrefix} is closed`);
            throw error;
        }
    }
    get isClosed() {
        return this._isClosed || this._context.wasConnectionCloseCalled;
    }
    async receiveMessages(maxMessageCount, options) {
        this._throwIfReceiverOrConnectionClosed();
        this._throwIfAlreadyReceiving();
        (0, errors_js_1.throwTypeErrorIfParameterMissing)(this._context.connectionId, "maxMessageCount", maxMessageCount);
        (0, errors_js_1.throwTypeErrorIfParameterTypeMismatch)(this._context.connectionId, "maxMessageCount", maxMessageCount, "number");
        if (isNaN(maxMessageCount) || maxMessageCount < 1) {
            throw new TypeError(errors_js_1.InvalidMaxMessageCountError);
        }
        const receiveMessages = async () => {
            var _a;
            if (!this._batchingReceiver || !this._context.messageReceivers[this._batchingReceiver.name]) {
                const receiveOptions = {
                    maxConcurrentCalls: 0,
                    receiveMode: this.receiveMode,
                    lockRenewer: this._lockRenewer,
                    skipParsingBodyAsJson: this.skipParsingBodyAsJson,
                    skipConvertingDate: this.skipConvertingDate,
                };
                this._batchingReceiver = this._createBatchingReceiver(this._context, this.entityPath, receiveOptions);
            }
            const receivedMessages = await this._batchingReceiver.receive(maxMessageCount, (_a = options === null || options === void 0 ? void 0 : options.maxWaitTimeInMs) !== null && _a !== void 0 ? _a : core_amqp_1.Constants.defaultOperationTimeoutInMs, exports.defaultMaxTimeAfterFirstMessageForBatchingMs, options !== null && options !== void 0 ? options : {});
            return receivedMessages;
        };
        const config = {
            connectionHost: this._context.config.host,
            connectionId: this._context.connectionId,
            operation: receiveMessages,
            operationType: core_amqp_1.RetryOperationType.receiveMessage,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            retryOptions: this._retryOptions,
        };
        return (0, core_amqp_1.retry)(config).catch((err) => {
            throw (0, serviceBusError_js_1.translateServiceBusError)(err);
        });
    }
    getMessageIterator(options) {
        return (0, receiverCommon_js_1.getMessageIterator)(this, options);
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
                .receiveDeferredMessages(deferredSequenceNumbers, this.receiveMode, undefined, Object.assign(Object.assign({}, options), { associatedLinkName: this._getAssociatedReceiverName(), requestName: "receiveDeferredMessages", timeoutInMs: this._retryOptions.timeoutInMs, skipParsingBodyAsJson: this.skipParsingBodyAsJson, skipConvertingDate: this.skipConvertingDate }));
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
                .deleteMessages(options.maxMessageCount, options === null || options === void 0 ? void 0 : options.beforeEnqueueTime, undefined, Object.assign(Object.assign({}, options), { associatedLinkName: this._getAssociatedReceiverName(), requestName: "deleteMessages", timeoutInMs: this._retryOptions.timeoutInMs }));
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
            maxMessageCount: exports.MaxDeleteMessageCount,
            beforeEnqueueTime: options === null || options === void 0 ? void 0 : options.beforeEnqueueTime,
        });
        log_js_1.receiverLogger.verbose(`${this.logPrefix} receiver '${this.identifier}' deleted ${deletedCount} messages.`);
        if (deletedCount === exports.MaxDeleteMessageCount) {
            let batchCount = exports.MaxDeleteMessageCount;
            while (batchCount === exports.MaxDeleteMessageCount) {
                batchCount = await this.deleteMessages({
                    maxMessageCount: exports.MaxDeleteMessageCount,
                    beforeEnqueueTime: options === null || options === void 0 ? void 0 : options.beforeEnqueueTime,
                });
                log_js_1.receiverLogger.verbose(`${this.logPrefix} receiver '${this.identifier}' deleted ${batchCount} messages.`);
                deletedCount += batchCount;
            }
        }
        log_js_1.receiverLogger.verbose(`${this.logPrefix} receiver '${this.identifier}' purged ${deletedCount} messages.`);
        return deletedCount;
    }
    // ManagementClient methods # Begin
    async peekMessages(maxMessageCount, options = {}) {
        var _a;
        this._throwIfReceiverOrConnectionClosed();
        const managementRequestOptions = Object.assign(Object.assign({}, options), { associatedLinkName: this._getAssociatedReceiverName(), requestName: "peekMessages", timeoutInMs: (_a = this._retryOptions) === null || _a === void 0 ? void 0 : _a.timeoutInMs, skipParsingBodyAsJson: this.skipParsingBodyAsJson, skipConvertingDate: this.skipConvertingDate });
        // omitMessageBody is available at runtime, but only exported in experimental subpath
        const { fromSequenceNumber, omitMessageBody } = options;
        const peekOperationPromise = async () => {
            if (fromSequenceNumber !== undefined) {
                return this._context
                    .getManagementClient(this.entityPath)
                    .peekBySequenceNumber(fromSequenceNumber, maxMessageCount, undefined, omitMessageBody, managementRequestOptions);
            }
            else {
                return this._context
                    .getManagementClient(this.entityPath)
                    .peek(maxMessageCount, omitMessageBody, managementRequestOptions);
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
    subscribe(handlers, options) {
        var _a, _b;
        (0, receiverCommon_js_1.assertValidMessageHandlers)(handlers);
        (0, errors_js_1.throwErrorIfConnectionClosed)(this._context);
        this._throwIfReceiverOrConnectionClosed();
        this._throwIfAlreadyReceiving();
        options = Object.assign(Object.assign({}, (options !== null && options !== void 0 ? options : {})), { autoCompleteMessages: (_a = options === null || options === void 0 ? void 0 : options.autoCompleteMessages) !== null && _a !== void 0 ? _a : true });
        // When the user "stops" a streaming receiver (via the returned instance from 'subscribe' we just suspend
        // it, leaving the link open). This allows users to stop the flow of messages but still be able to settle messages
        // since the link itself hasn't been shut down.
        //
        // Users can, if they want, restart their subscription (since we've got a link already established).
        // So you'll have an instance here if the user has done:
        // 1. const subscription = receiver.subscribe()
        // 2. subscription.stop()
        // 3. receiver.subscribe()
        this._streamingReceiver =
            (_b = this._streamingReceiver) !== null && _b !== void 0 ? _b : new streamingReceiver_js_1.StreamingReceiver(this.identifier, this._context, this.entityPath, Object.assign(Object.assign({}, options), { receiveMode: this.receiveMode, retryOptions: this._retryOptions, lockRenewer: this._lockRenewer, skipParsingBodyAsJson: this.skipParsingBodyAsJson, skipConvertingDate: this.skipConvertingDate }));
        // this ensures that if the outer service bus client is closed that  this receiver is cleaned up.
        // this mostly affects us if we're in the middle of init() - the connection (and receiver) are not yet
        // open but we do need to close the receiver to exit the init() loop.
        this._context.messageReceivers[this._streamingReceiver.name] = this._streamingReceiver;
        this._streamingReceiver.subscribe(handlers, options).catch((_) => {
            // (the error will already have been reported to the user)
            if (this._streamingReceiver) {
                delete this._context.messageReceivers[this._streamingReceiver.name];
            }
        });
        return {
            close: async () => {
                var _a;
                return (_a = this._streamingReceiver) === null || _a === void 0 ? void 0 : _a.stopReceivingMessages();
            },
        };
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
    async renewMessageLock(message) {
        this._throwIfReceiverOrConnectionClosed();
        (0, errors_js_1.throwErrorIfInvalidOperationOnMessage)(message, this.receiveMode, this._context.connectionId);
        const tracingContext = (0, instrumentServiceBusMessage_js_1.extractSpanContextFromServiceBusMessage)(message);
        const spanLinks = tracingContext ? [{ tracingContext }] : [];
        return tracing_js_1.tracingClient.withSpan("ServiceBusReceiver.renewMessageLock", {}, () => {
            const msgImpl = message;
            let associatedLinkName;
            if (msgImpl.delivery.link) {
                const associatedReceiver = this._context.getReceiverFromCache(msgImpl.delivery.link.name);
                associatedLinkName = associatedReceiver === null || associatedReceiver === void 0 ? void 0 : associatedReceiver.name;
            }
            return this._context
                .getManagementClient(this.entityPath)
                .renewLock(message.lockToken, { associatedLinkName })
                .then((lockedUntil) => {
                message.lockedUntilUtc = lockedUntil;
                return lockedUntil;
            });
        }, Object.assign({ spanLinks }, (0, tracing_js_1.toSpanOptions)({ entityPath: this.entityPath, host: this._context.config.host }, "receive", "client")));
    }
    async close() {
        try {
            this._isClosed = true;
            if (this._context.connection && this._context.connection.isOpen()) {
                // Close the streaming receiver.
                if (this._streamingReceiver) {
                    await this._streamingReceiver.close();
                }
                // Close the batching receiver.
                if (this._batchingReceiver) {
                    await this._batchingReceiver.close();
                }
            }
        }
        catch (err) {
            log_js_1.receiverLogger.logError(err, `${this.logPrefix} An error occurred while closing the Receiver`);
            throw err;
        }
    }
    /**
     * Indicates whether the receiver is currently receiving messages or not.
     * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
     */
    _isReceivingMessages() {
        if (this._streamingReceiver &&
            this._streamingReceiver.isOpen() &&
            this._streamingReceiver.isSubscribeActive) {
            return true;
        }
        if (this._batchingReceiver &&
            this._batchingReceiver.isOpen() &&
            this._batchingReceiver.isReceivingMessages) {
            return true;
        }
        return false;
    }
    _createBatchingReceiver(context, entityPath, options) {
        const receiver = batchingReceiver_js_1.BatchingReceiver.create(this.identifier, context, entityPath, options);
        log_js_1.receiverLogger.verbose(`[${this.logPrefix}] receiver '${receiver.name}' created, with maxConcurrentCalls set to ${options.maxConcurrentCalls}.`);
        return receiver;
    }
    /**
     * Helper function to retrieve any active receiver name, regardless of streaming or
     * batching if it exists. This is used for optimization on the service side
     */
    _getAssociatedReceiverName() {
        if (this._streamingReceiver && this._streamingReceiver.isOpen()) {
            return this._streamingReceiver.name;
        }
        if (this._batchingReceiver &&
            this._batchingReceiver.isOpen() &&
            this._batchingReceiver.isReceivingMessages) {
            return this._batchingReceiver.name;
        }
        return;
    }
}
exports.ServiceBusReceiverImpl = ServiceBusReceiverImpl;
//# sourceMappingURL=receiver.js.map