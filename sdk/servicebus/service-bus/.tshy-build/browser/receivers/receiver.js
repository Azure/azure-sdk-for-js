// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getAlreadyReceivingErrorMsg, getReceiverClosedErrorMsg, InvalidMaxMessageCountError, throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing, throwTypeErrorIfParameterNotLong, throwErrorIfInvalidOperationOnMessage, throwTypeErrorIfParameterTypeMismatch, } from "../util/errors.js";
import { StreamingReceiver } from "../core/streamingReceiver.js";
import { BatchingReceiver } from "../core/batchingReceiver.js";
import { abandonMessage, assertValidMessageHandlers, completeMessage, deadLetterMessage, deferMessage, getMessageIterator, } from "./receiverCommon.js";
import { Constants, RetryOperationType, retry } from "@azure/core-amqp";
import { LockRenewer } from "../core/autoLockRenewer.js";
import { receiverLogger as logger } from "../log.js";
import { translateServiceBusError } from "../serviceBusError.js";
import { ensureValidIdentifier } from "../util/utils.js";
import { toSpanOptions, tracingClient } from "../diagnostics/tracing.js";
import { extractSpanContextFromServiceBusMessage } from "../diagnostics/instrumentServiceBusMessage.js";
/**
 * The default time to wait for messages _after_ the first message
 * has been received.
 *
 * This timeout only applies to receiveMessages()
 *
 * @internal
 */
export const defaultMaxTimeAfterFirstMessageForBatchingMs = 1000;
/**
 * The maximum number of messages to delete in a single batch.  This cap is established and enforced by the service.
 * @internal
 */
export const MaxDeleteMessageCount = 4000;
/**
 * @internal
 */
export class ServiceBusReceiverImpl {
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
        throwErrorIfConnectionClosed(_context);
        this._retryOptions = retryOptions;
        this._lockRenewer = LockRenewer.create(this._context, maxAutoRenewLockDurationInMs, receiveMode);
        this.identifier = ensureValidIdentifier(this.entityPath, identifier);
    }
    _throwIfAlreadyReceiving() {
        if (this._isReceivingMessages()) {
            const errorMessage = getAlreadyReceivingErrorMsg(this.entityPath);
            const error = new Error(errorMessage);
            logger.logError(error, `${this.logPrefix} is already receiving`);
            throw error;
        }
    }
    _throwIfReceiverOrConnectionClosed() {
        throwErrorIfConnectionClosed(this._context);
        if (this.isClosed) {
            const errorMessage = getReceiverClosedErrorMsg(this.entityPath);
            const error = new Error(errorMessage);
            logger.logError(error, `${this.logPrefix} is closed`);
            throw error;
        }
    }
    get isClosed() {
        return this._isClosed || this._context.wasConnectionCloseCalled;
    }
    async receiveMessages(maxMessageCount, options) {
        this._throwIfReceiverOrConnectionClosed();
        this._throwIfAlreadyReceiving();
        throwTypeErrorIfParameterMissing(this._context.connectionId, "maxMessageCount", maxMessageCount);
        throwTypeErrorIfParameterTypeMismatch(this._context.connectionId, "maxMessageCount", maxMessageCount, "number");
        if (isNaN(maxMessageCount) || maxMessageCount < 1) {
            throw new TypeError(InvalidMaxMessageCountError);
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
            const receivedMessages = await this._batchingReceiver.receive(maxMessageCount, (_a = options === null || options === void 0 ? void 0 : options.maxWaitTimeInMs) !== null && _a !== void 0 ? _a : Constants.defaultOperationTimeoutInMs, defaultMaxTimeAfterFirstMessageForBatchingMs, options !== null && options !== void 0 ? options : {});
            return receivedMessages;
        };
        const config = {
            connectionHost: this._context.config.host,
            connectionId: this._context.connectionId,
            operation: receiveMessages,
            operationType: RetryOperationType.receiveMessage,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            retryOptions: this._retryOptions,
        };
        return retry(config).catch((err) => {
            throw translateServiceBusError(err);
        });
    }
    getMessageIterator(options) {
        return getMessageIterator(this, options);
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
                .receiveDeferredMessages(deferredSequenceNumbers, this.receiveMode, undefined, Object.assign(Object.assign({}, options), { associatedLinkName: this._getAssociatedReceiverName(), requestName: "receiveDeferredMessages", timeoutInMs: this._retryOptions.timeoutInMs, skipParsingBodyAsJson: this.skipParsingBodyAsJson, skipConvertingDate: this.skipConvertingDate }));
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
                .deleteMessages(options.maxMessageCount, options === null || options === void 0 ? void 0 : options.beforeEnqueueTime, undefined, Object.assign(Object.assign({}, options), { associatedLinkName: this._getAssociatedReceiverName(), requestName: "deleteMessages", timeoutInMs: this._retryOptions.timeoutInMs }));
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
        logger.verbose(`${this.logPrefix} receiver '${this.identifier}' deleted ${deletedCount} messages.`);
        if (deletedCount === MaxDeleteMessageCount) {
            let batchCount = MaxDeleteMessageCount;
            while (batchCount === MaxDeleteMessageCount) {
                batchCount = await this.deleteMessages({
                    maxMessageCount: MaxDeleteMessageCount,
                    beforeEnqueueTime: options === null || options === void 0 ? void 0 : options.beforeEnqueueTime,
                });
                logger.verbose(`${this.logPrefix} receiver '${this.identifier}' deleted ${batchCount} messages.`);
                deletedCount += batchCount;
            }
        }
        logger.verbose(`${this.logPrefix} receiver '${this.identifier}' purged ${deletedCount} messages.`);
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
            operationType: RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return retry(config);
    }
    subscribe(handlers, options) {
        var _a, _b;
        assertValidMessageHandlers(handlers);
        throwErrorIfConnectionClosed(this._context);
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
            (_b = this._streamingReceiver) !== null && _b !== void 0 ? _b : new StreamingReceiver(this.identifier, this._context, this.entityPath, Object.assign(Object.assign({}, options), { receiveMode: this.receiveMode, retryOptions: this._retryOptions, lockRenewer: this._lockRenewer, skipParsingBodyAsJson: this.skipParsingBodyAsJson, skipConvertingDate: this.skipConvertingDate }));
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
    async renewMessageLock(message) {
        this._throwIfReceiverOrConnectionClosed();
        throwErrorIfInvalidOperationOnMessage(message, this.receiveMode, this._context.connectionId);
        const tracingContext = extractSpanContextFromServiceBusMessage(message);
        const spanLinks = tracingContext ? [{ tracingContext }] : [];
        return tracingClient.withSpan("ServiceBusReceiver.renewMessageLock", {}, () => {
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
        }, Object.assign({ spanLinks }, toSpanOptions({ entityPath: this.entityPath, host: this._context.config.host }, "receive", "client")));
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
            logger.logError(err, `${this.logPrefix} An error occurred while closing the Receiver`);
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
        const receiver = BatchingReceiver.create(this.identifier, context, entityPath, options);
        logger.verbose(`[${this.logPrefix}] receiver '${receiver.name}' created, with maxConcurrentCalls set to ${options.maxConcurrentCalls}.`);
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
//# sourceMappingURL=receiver.js.map