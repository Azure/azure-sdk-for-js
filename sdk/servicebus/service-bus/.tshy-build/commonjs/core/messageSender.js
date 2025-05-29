"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSender = void 0;
const log_js_1 = require("../log.js");
const rhea_promise_1 = require("rhea-promise");
const core_amqp_1 = require("@azure/core-amqp");
const serviceBusMessage_js_1 = require("../serviceBusMessage.js");
const linkEntity_js_1 = require("./linkEntity.js");
const utils_js_1 = require("../util/utils.js");
const errors_js_1 = require("../util/errors.js");
const serviceBusMessageBatch_js_1 = require("../serviceBusMessageBatch.js");
const serviceBusError_js_1 = require("../serviceBusError.js");
const core_util_1 = require("@azure/core-util");
const dataTransformer_js_1 = require("../dataTransformer.js");
/**
 * @internal
 * Describes the MessageSender that will send messages to ServiceBus.
 */
class MessageSender extends linkEntity_js_1.LinkEntity {
    constructor(identifier, connectionContext, entityPath, retryOptions) {
        super(entityPath, entityPath, connectionContext, "sender", log_js_1.senderLogger, {
            address: entityPath,
            audience: `${connectionContext.config.endpoint}${entityPath}`,
        });
        this.identifier = identifier;
        this._retryOptions = retryOptions;
        this._onAmqpError = (context) => {
            const senderError = context.sender && context.sender.error;
            log_js_1.senderLogger.logError(senderError, "%s 'sender_error' event occurred on the sender '%s' with address '%s'. " +
                "The associated error", this.logPrefix, this.name, this.address);
            // TODO: Consider rejecting promise in trySendBatch() or createBatch()
        };
        this._onSessionError = (context) => {
            const sessionError = context.session && context.session.error;
            log_js_1.senderLogger.logError(sessionError, "%s 'session_error' event occurred on the session of sender '%s' with address '%s'. " +
                "The associated error", this.logPrefix, this.name, this.address);
            // TODO: Consider rejecting promise in trySendBatch() or createBatch()
        };
        this._onAmqpClose = async (context) => {
            const senderError = context.sender && context.sender.error;
            log_js_1.senderLogger.logError(senderError, `${this.logPrefix} 'sender_close' event occurred. The associated error is`);
            await this.onDetached().catch((err) => {
                log_js_1.senderLogger.logError(err, `${this.logPrefix} error when closing sender after 'sender_close' event`);
            });
        };
        this._onSessionClose = async (context) => {
            const sessionError = context.session && context.session.error;
            log_js_1.senderLogger.logError(sessionError, `${this.logPrefix} 'session_close' event occurred. The associated error is`);
            await this.onDetached().catch((err) => {
                log_js_1.senderLogger.logError(err, `${this.logPrefix} error when closing sender after 'session_close' event`);
            });
        };
    }
    _createSenderOptions(newName) {
        if (newName)
            this.name = (0, utils_js_1.getUniqueName)(this.baseName);
        const srOptions = {
            name: this.name,
            target: {
                address: this.address,
            },
            source: this.identifier,
            onError: this._onAmqpError,
            onClose: this._onAmqpClose,
            onSessionError: this._onSessionError,
            onSessionClose: this._onSessionClose,
        };
        log_js_1.senderLogger.verbose(`${this.logPrefix} Creating sender with options: %O`, srOptions);
        return srOptions;
    }
    /**
     * Tries to send the message to ServiceBus if there is enough credit to send them
     * and the circular buffer has available space to settle the message after sending them.
     *
     * We have implemented a synchronous send over here in the sense that we shall be waiting
     * for the message to be accepted or rejected and accordingly resolve or reject the promise.
     *
     * @param encodedMessage - The encoded message to be sent to ServiceBus.
     * @param sendBatch - Boolean indicating whether the encoded message represents a batch of messages or not
     */
    _trySend(encodedMessage, sendBatch, options) {
        const abortSignal = options === null || options === void 0 ? void 0 : options.abortSignal;
        const timeoutInMs = !(0, core_util_1.isDefined)(this._retryOptions.timeoutInMs)
            ? core_amqp_1.Constants.defaultOperationTimeoutInMs
            : this._retryOptions.timeoutInMs;
        const sendEventPromise = async () => {
            var _a, _b, _c, _d, _e, _f, _g;
            const initStartTime = Date.now();
            if (!this.isOpen()) {
                try {
                    await (0, utils_js_1.waitForTimeoutOrAbortOrResolve)({
                        actionFn: () => this.open(undefined, options === null || options === void 0 ? void 0 : options.abortSignal),
                        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
                        timeoutMs: timeoutInMs,
                        timeoutMessage: `[${this._context.connectionId}] Sender "${this.name}" ` +
                            `with address "${this.address}", was not able to send the message right now, due ` +
                            `to operation timeout.`,
                    });
                }
                catch (err) {
                    const translatedError = (0, serviceBusError_js_1.translateServiceBusError)(err);
                    log_js_1.senderLogger.logError(translatedError, "%s An error occurred while creating the sender", this.logPrefix, this.name);
                    throw translatedError;
                }
            }
            const timeTakenByInit = Date.now() - initStartTime;
            log_js_1.senderLogger.verbose("%s Sender '%s', credit: %d available: %d", this.logPrefix, this.name, (_a = this.link) === null || _a === void 0 ? void 0 : _a.credit, (_d = (_c = (_b = this.link) === null || _b === void 0 ? void 0 : _b.session) === null || _c === void 0 ? void 0 : _c.outgoing) === null || _d === void 0 ? void 0 : _d.available());
            const waitingTime = await (0, utils_js_1.waitForSendable)(log_js_1.senderLogger, this.logPrefix, this.name, timeoutInMs - timeTakenByInit, this.link, (_g = (_f = (_e = this.link) === null || _e === void 0 ? void 0 : _e.session) === null || _f === void 0 ? void 0 : _f.outgoing) === null || _g === void 0 ? void 0 : _g.available());
            if (timeoutInMs <= timeTakenByInit + waitingTime) {
                const desc = `${this.logPrefix} Sender "${this.name}" ` +
                    `with address "${this.address}", was not able to send the message right now, due ` +
                    `to operation timeout.`;
                log_js_1.senderLogger.warning(desc);
                const e = {
                    condition: core_amqp_1.ErrorNameConditionMapper.ServiceUnavailableError,
                    description: desc,
                };
                throw (0, serviceBusError_js_1.translateServiceBusError)(e);
            }
            if (!this.link) {
                const msg = `[${this.logPrefix}] Cannot send the message. Link is not ready.`;
                log_js_1.senderLogger.warning(msg);
                const amqpError = {
                    condition: core_amqp_1.ErrorNameConditionMapper.SenderNotReadyError,
                    description: msg,
                };
                throw (0, serviceBusError_js_1.translateServiceBusError)(amqpError);
            }
            try {
                const delivery = await this.link.send(encodedMessage, {
                    format: sendBatch ? 0x80013700 : 0,
                    timeoutInSeconds: (timeoutInMs - timeTakenByInit - waitingTime) / 1000,
                    abortSignal,
                });
                log_js_1.senderLogger.verbose("%s Sender '%s', sent message with delivery id: %d", this.logPrefix, this.name, delivery.id);
            }
            catch (error) {
                const translatedError = (0, serviceBusError_js_1.translateServiceBusError)(error.innerError || error);
                log_js_1.senderLogger.logError(translatedError, `${this.logPrefix} An error occurred while sending the message`);
                throw translatedError;
            }
        };
        const config = {
            operation: sendEventPromise,
            connectionId: this._context.connectionId,
            operationType: core_amqp_1.RetryOperationType.sendMessage,
            retryOptions: this._retryOptions,
            abortSignal: abortSignal,
        };
        return (0, core_amqp_1.retry)(config);
    }
    createRheaLink(options) {
        return this._context.connection.createAwaitableSender(options);
    }
    /**
     * Initializes the sender session on the connection.
     */
    async open(options, abortSignal) {
        try {
            if (!options) {
                options = this._createSenderOptions();
            }
            await this.initLink(options, abortSignal);
        }
        catch (err) {
            const translatedError = (0, serviceBusError_js_1.translateServiceBusError)(err);
            log_js_1.senderLogger.logError(translatedError, `${this.logPrefix} An error occurred while creating the sender`);
            // Fix the unhelpful error messages for the OperationTimeoutError that comes from `rhea-promise`.
            if (translatedError.code === "OperationTimeoutError") {
                translatedError.message =
                    "Failed to create a sender within allocated time and retry attempts.";
            }
            throw translatedError;
        }
    }
    /**
     * Closes the rhea link.
     * To be called when connection is disconnected, onAmqpClose and onSessionClose events.
     */
    async onDetached() {
        // Clears the token renewal timer. Closes the link and its session if they are open.
        // Removes the link and its session if they are present in rhea's cache.
        await this.closeLink();
    }
    /**
     * Determines whether the AMQP sender link is open. If open then returns true else returns false.
     */
    isOpen() {
        const result = this.link == null ? false : this.link.isOpen();
        log_js_1.senderLogger.verbose("%s Sender '%s' with address '%s' is open? -> %s", this.logPrefix, this.name, this.address, result);
        return result;
    }
    /**
     * Sends the given message, with the given options on this link
     *
     * @param data - Message to send. Will be sent as UTF8-encoded JSON string.
     */
    async send(data, options) {
        (0, errors_js_1.throwErrorIfConnectionClosed)(this._context);
        try {
            const amqpMessage = (0, serviceBusMessage_js_1.toRheaMessage)(data, dataTransformer_js_1.defaultDataTransformer);
            // TODO: this body of logic is really similar to what's in sendMessages. Unify what we can.
            const encodedMessage = rhea_promise_1.message.encode(amqpMessage);
            log_js_1.senderLogger.verbose("%s Sender '%s', trying to send message: %O", this.logPrefix, this.name, data);
            return await this._trySend(encodedMessage, false, options);
        }
        catch (err) {
            log_js_1.senderLogger.logError(err, "%s An error occurred while sending the message: %O\nError", this.logPrefix, data);
            throw err;
        }
    }
    /**
     * Returns maximum message size on the AMQP sender link.
     *
     * Options to configure the `createBatch` method on the `Sender`.
     * - `maxSizeInBytes`: The upper limit for the size of batch.
     *
     * Example usage:
     * ```ts snippet:ignore
     * {
     *     retryOptions: { maxRetries: 5; timeoutInMs: 10 }
     * }
     * ```
     */
    async getMaxMessageSize(options = {}) {
        const retryOptions = options.retryOptions || {};
        if (this.isOpen()) {
            return this.link.maxMessageSize;
        }
        const config = {
            operation: async () => {
                await this.open(undefined, options === null || options === void 0 ? void 0 : options.abortSignal);
                if (this.link) {
                    return this.link.maxMessageSize;
                }
                throw new serviceBusError_js_1.ServiceBusError("Link failed to initialize, cannot get max message size.", "GeneralError");
            },
            connectionId: this._context.connectionId,
            operationType: core_amqp_1.RetryOperationType.senderLink,
            retryOptions: retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return (0, core_amqp_1.retry)(config);
    }
    async createBatch(options) {
        (0, errors_js_1.throwErrorIfConnectionClosed)(this._context);
        let maxMessageSize = await this.getMaxMessageSize({
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        });
        if (options === null || options === void 0 ? void 0 : options.maxSizeInBytes) {
            if (options.maxSizeInBytes > maxMessageSize) {
                const error = new Error(`Max message size (${options.maxSizeInBytes} bytes) is greater than maximum message size (${maxMessageSize} bytes) on the AMQP sender link.`);
                throw error;
            }
            maxMessageSize = options.maxSizeInBytes;
        }
        return new serviceBusMessageBatch_js_1.ServiceBusMessageBatchImpl(this._context, maxMessageSize);
    }
    async sendBatch(batchMessage, options) {
        (0, errors_js_1.throwErrorIfConnectionClosed)(this._context);
        try {
            log_js_1.senderLogger.verbose("%s Sender '%s', sending encoded batch message.", this.logPrefix, this.name, batchMessage);
            return await this._trySend(batchMessage._generateMessage(), true, options);
        }
        catch (err) {
            log_js_1.senderLogger.logError(err, "%s Sender '%s': An error occurred while sending the messages: %O\nError", this.logPrefix, this.name, batchMessage);
            throw err;
        }
    }
    static create(identifier, context, entityPath, retryOptions) {
        (0, errors_js_1.throwErrorIfConnectionClosed)(context);
        const sbSender = new MessageSender(identifier, context, entityPath, retryOptions);
        context.senders[sbSender.name] = sbSender;
        return sbSender;
    }
    removeLinkFromContext() {
        delete this._context.senders[this.name];
    }
}
exports.MessageSender = MessageSender;
//# sourceMappingURL=messageSender.js.map