"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBusSenderImpl = void 0;
exports.isServiceBusMessageBatch = isServiceBusMessageBatch;
const messageSender_js_1 = require("./core/messageSender.js");
const errors_js_1 = require("./util/errors.js");
const core_amqp_1 = require("@azure/core-amqp");
const log_js_1 = require("./log.js");
const tracing_js_1 = require("./diagnostics/tracing.js");
const utils_js_1 = require("./util/utils.js");
const serviceBusError_js_1 = require("./serviceBusError.js");
const instrumentServiceBusMessage_js_1 = require("./diagnostics/instrumentServiceBusMessage.js");
/**
 * @internal
 */
class ServiceBusSenderImpl {
    get logPrefix() {
        return `[${this._context.connectionId}|sender:${this.entityPath}]`;
    }
    /**
     * @internal
     * @throws Error if the underlying connection is closed.
     */
    constructor(_context, _entityPath, retryOptions = {}, identifier) {
        this._context = _context;
        this._entityPath = _entityPath;
        /**
         * Denotes if close() was called on this sender
         */
        this._isClosed = false;
        (0, errors_js_1.throwErrorIfConnectionClosed)(_context);
        this.entityPath = _entityPath;
        this.identifier = (0, utils_js_1.ensureValidIdentifier)(this.entityPath, identifier);
        this._sender = messageSender_js_1.MessageSender.create(this.identifier, this._context, _entityPath, retryOptions);
        this._retryOptions = retryOptions;
    }
    _throwIfSenderOrConnectionClosed() {
        (0, errors_js_1.throwErrorIfConnectionClosed)(this._context);
        if (this.isClosed) {
            const errorMessage = (0, errors_js_1.getSenderClosedErrorMsg)(this._entityPath);
            const error = new Error(errorMessage);
            log_js_1.senderLogger.logError(error, `[${this._context.connectionId}] is closed`);
            throw error;
        }
    }
    get isClosed() {
        return this._isClosed || this._context.wasConnectionCloseCalled;
    }
    async sendMessages(messages, options) {
        this._throwIfSenderOrConnectionClosed();
        (0, errors_js_1.throwTypeErrorIfParameterMissing)(this._context.connectionId, "messages", messages);
        if (!isServiceBusMessageBatch(messages) && !Array.isArray(messages)) {
            // Case 1: Single message
            (0, errors_js_1.throwIfNotValidServiceBusMessage)(messages, errors_js_1.errorInvalidMessageTypeSingleOrArray);
            const originalMessage = messages;
            const { message, spanContext } = (0, instrumentServiceBusMessage_js_1.instrumentMessage)(originalMessage, options !== null && options !== void 0 ? options : {}, this.entityPath, this._context.config.host, "publish");
            const spanLinks = spanContext ? [{ tracingContext: spanContext }] : [];
            return tracing_js_1.tracingClient.withSpan("ServiceBusSender.send", options !== null && options !== void 0 ? options : {}, (updatedOptions) => this._sender.send(message, updatedOptions), Object.assign({ spanLinks }, (0, tracing_js_1.toSpanOptions)({ entityPath: this.entityPath, host: this._context.config.host }, "publish", "client")));
        }
        let batch;
        if (isServiceBusMessageBatch(messages)) {
            // Case 2: Batch message
            batch = messages;
        }
        else {
            // Case 3: Array of messages
            batch = await this.createMessageBatch(options);
            for (const message of messages) {
                (0, errors_js_1.throwIfNotValidServiceBusMessage)(message, errors_js_1.errorInvalidMessageTypeSingleOrArray);
                if (!batch.tryAddMessage(message, options)) {
                    // this is too big - throw an error
                    throw new serviceBusError_js_1.ServiceBusError("Messages were too big to fit in a single batch. Remove some messages and try again or create your own batch using createBatch(), which gives more fine-grained control.", "MessageSizeExceeded");
                }
            }
        }
        const spanLinks = batch._messageSpanContexts.map((tracingContext) => {
            return {
                tracingContext,
            };
        });
        return tracing_js_1.tracingClient.withSpan("ServiceBusSender.send", options !== null && options !== void 0 ? options : {}, (updatedOptions) => this._sender.sendBatch(batch, updatedOptions), Object.assign({ spanLinks }, (0, tracing_js_1.toSpanOptions)({ entityPath: this.entityPath, host: this._context.config.host }, "publish", "client")));
    }
    async createMessageBatch(options) {
        this._throwIfSenderOrConnectionClosed();
        return this._sender.createBatch(options);
    }
    async scheduleMessages(messages, scheduledEnqueueTimeUtc, options = {}) {
        this._throwIfSenderOrConnectionClosed();
        (0, errors_js_1.throwTypeErrorIfParameterMissing)(this._context.connectionId, "scheduledEnqueueTimeUtc", scheduledEnqueueTimeUtc);
        (0, errors_js_1.throwTypeErrorIfNotInstanceOfParameterType)(this._context.connectionId, "scheduledEnqueueTimeUtc", scheduledEnqueueTimeUtc, Date);
        (0, errors_js_1.throwTypeErrorIfParameterMissing)(this._context.connectionId, "messages", messages);
        const messagesToSchedule = Array.isArray(messages) ? messages : [messages];
        for (const message of messagesToSchedule) {
            (0, errors_js_1.throwIfNotValidServiceBusMessage)(message, errors_js_1.errorInvalidMessageTypeSingleOrArray);
        }
        const scheduleMessageOperationPromise = async () => {
            return this._context
                .getManagementClient(this._entityPath)
                .scheduleMessages(scheduledEnqueueTimeUtc, messagesToSchedule, Object.assign(Object.assign({}, options), { associatedLinkName: this._sender.name, requestName: "scheduleMessages", timeoutInMs: this._retryOptions.timeoutInMs }));
        };
        const config = {
            operation: scheduleMessageOperationPromise,
            connectionId: this._context.connectionId,
            operationType: core_amqp_1.RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return (0, core_amqp_1.retry)(config);
    }
    async cancelScheduledMessages(sequenceNumbers, options = {}) {
        this._throwIfSenderOrConnectionClosed();
        (0, errors_js_1.throwTypeErrorIfParameterMissing)(this._context.connectionId, "sequenceNumbers", sequenceNumbers);
        (0, errors_js_1.throwTypeErrorIfParameterNotLong)(this._context.connectionId, "sequenceNumbers", sequenceNumbers);
        const sequenceNumbersToCancel = Array.isArray(sequenceNumbers)
            ? sequenceNumbers
            : [sequenceNumbers];
        const cancelSchedulesMessagesOperationPromise = async () => {
            return this._context
                .getManagementClient(this._entityPath)
                .cancelScheduledMessages(sequenceNumbersToCancel, Object.assign(Object.assign({}, options), { associatedLinkName: this._sender.name, requestName: "cancelScheduledMessages", timeoutInMs: this._retryOptions.timeoutInMs }));
        };
        const config = {
            operation: cancelSchedulesMessagesOperationPromise,
            connectionId: this._context.connectionId,
            operationType: core_amqp_1.RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return (0, core_amqp_1.retry)(config);
    }
    // async open(options?: OperationOptionsBase): Promise<void> {
    //   this._throwIfSenderOrConnectionClosed();
    //   const config: RetryConfig<void> = {
    //     // TODO: Pass tracing options too
    //     operation: () => this._sender.open(undefined, options?.abortSignal),
    //     connectionId: this._context.connectionId,
    //     operationType: RetryOperationType.senderLink,
    //     retryOptions: this._retryOptions,
    //     abortSignal: options?.abortSignal
    //   };
    //   return retry<void>(config);
    // }
    async close() {
        try {
            this._isClosed = true;
            await this._sender.close();
        }
        catch (err) {
            log_js_1.senderLogger.logError(err, `${this.logPrefix} An error occurred while closing the Sender`);
            throw err;
        }
    }
}
exports.ServiceBusSenderImpl = ServiceBusSenderImpl;
/**
 * @internal
 */
function isServiceBusMessageBatch(messageBatchOrAnything) {
    if (messageBatchOrAnything == null) {
        return false;
    }
    const possibleBatch = messageBatchOrAnything;
    return (typeof possibleBatch.tryAddMessage === "function" &&
        typeof possibleBatch.maxSizeInBytes === "number" &&
        typeof possibleBatch.sizeInBytes === "number");
}
//# sourceMappingURL=sender.js.map