// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MessageSender } from "./core/messageSender.js";
import { errorInvalidMessageTypeSingleOrArray, getSenderClosedErrorMsg, throwErrorIfConnectionClosed, throwIfNotValidServiceBusMessage, throwTypeErrorIfNotInstanceOfParameterType, throwTypeErrorIfParameterMissing, throwTypeErrorIfParameterNotLong, } from "./util/errors.js";
import { RetryOperationType, retry } from "@azure/core-amqp";
import { senderLogger as logger } from "./log.js";
import { toSpanOptions, tracingClient } from "./diagnostics/tracing.js";
import { ensureValidIdentifier } from "./util/utils.js";
import { ServiceBusError } from "./serviceBusError.js";
import { instrumentMessage } from "./diagnostics/instrumentServiceBusMessage.js";
/**
 * @internal
 */
export class ServiceBusSenderImpl {
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
        throwErrorIfConnectionClosed(_context);
        this.entityPath = _entityPath;
        this.identifier = ensureValidIdentifier(this.entityPath, identifier);
        this._sender = MessageSender.create(this.identifier, this._context, _entityPath, retryOptions);
        this._retryOptions = retryOptions;
    }
    _throwIfSenderOrConnectionClosed() {
        throwErrorIfConnectionClosed(this._context);
        if (this.isClosed) {
            const errorMessage = getSenderClosedErrorMsg(this._entityPath);
            const error = new Error(errorMessage);
            logger.logError(error, `[${this._context.connectionId}] is closed`);
            throw error;
        }
    }
    get isClosed() {
        return this._isClosed || this._context.wasConnectionCloseCalled;
    }
    async sendMessages(messages, options) {
        this._throwIfSenderOrConnectionClosed();
        throwTypeErrorIfParameterMissing(this._context.connectionId, "messages", messages);
        if (!isServiceBusMessageBatch(messages) && !Array.isArray(messages)) {
            // Case 1: Single message
            throwIfNotValidServiceBusMessage(messages, errorInvalidMessageTypeSingleOrArray);
            const originalMessage = messages;
            const { message, spanContext } = instrumentMessage(originalMessage, options !== null && options !== void 0 ? options : {}, this.entityPath, this._context.config.host, "publish");
            const spanLinks = spanContext ? [{ tracingContext: spanContext }] : [];
            return tracingClient.withSpan("ServiceBusSender.send", options !== null && options !== void 0 ? options : {}, (updatedOptions) => this._sender.send(message, updatedOptions), Object.assign({ spanLinks }, toSpanOptions({ entityPath: this.entityPath, host: this._context.config.host }, "publish", "client")));
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
                throwIfNotValidServiceBusMessage(message, errorInvalidMessageTypeSingleOrArray);
                if (!batch.tryAddMessage(message, options)) {
                    // this is too big - throw an error
                    throw new ServiceBusError("Messages were too big to fit in a single batch. Remove some messages and try again or create your own batch using createBatch(), which gives more fine-grained control.", "MessageSizeExceeded");
                }
            }
        }
        const spanLinks = batch._messageSpanContexts.map((tracingContext) => {
            return {
                tracingContext,
            };
        });
        return tracingClient.withSpan("ServiceBusSender.send", options !== null && options !== void 0 ? options : {}, (updatedOptions) => this._sender.sendBatch(batch, updatedOptions), Object.assign({ spanLinks }, toSpanOptions({ entityPath: this.entityPath, host: this._context.config.host }, "publish", "client")));
    }
    async createMessageBatch(options) {
        this._throwIfSenderOrConnectionClosed();
        return this._sender.createBatch(options);
    }
    async scheduleMessages(messages, scheduledEnqueueTimeUtc, options = {}) {
        this._throwIfSenderOrConnectionClosed();
        throwTypeErrorIfParameterMissing(this._context.connectionId, "scheduledEnqueueTimeUtc", scheduledEnqueueTimeUtc);
        throwTypeErrorIfNotInstanceOfParameterType(this._context.connectionId, "scheduledEnqueueTimeUtc", scheduledEnqueueTimeUtc, Date);
        throwTypeErrorIfParameterMissing(this._context.connectionId, "messages", messages);
        const messagesToSchedule = Array.isArray(messages) ? messages : [messages];
        for (const message of messagesToSchedule) {
            throwIfNotValidServiceBusMessage(message, errorInvalidMessageTypeSingleOrArray);
        }
        const scheduleMessageOperationPromise = async () => {
            return this._context
                .getManagementClient(this._entityPath)
                .scheduleMessages(scheduledEnqueueTimeUtc, messagesToSchedule, Object.assign(Object.assign({}, options), { associatedLinkName: this._sender.name, requestName: "scheduleMessages", timeoutInMs: this._retryOptions.timeoutInMs }));
        };
        const config = {
            operation: scheduleMessageOperationPromise,
            connectionId: this._context.connectionId,
            operationType: RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return retry(config);
    }
    async cancelScheduledMessages(sequenceNumbers, options = {}) {
        this._throwIfSenderOrConnectionClosed();
        throwTypeErrorIfParameterMissing(this._context.connectionId, "sequenceNumbers", sequenceNumbers);
        throwTypeErrorIfParameterNotLong(this._context.connectionId, "sequenceNumbers", sequenceNumbers);
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
            operationType: RetryOperationType.management,
            retryOptions: this._retryOptions,
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        };
        return retry(config);
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
            logger.logError(err, `${this.logPrefix} An error occurred while closing the Sender`);
            throw err;
        }
    }
}
/**
 * @internal
 */
export function isServiceBusMessageBatch(messageBatchOrAnything) {
    if (messageBatchOrAnything == null) {
        return false;
    }
    const possibleBatch = messageBatchOrAnything;
    return (typeof possibleBatch.tryAddMessage === "function" &&
        typeof possibleBatch.maxSizeInBytes === "number" &&
        typeof possibleBatch.sizeInBytes === "number");
}
//# sourceMappingURL=sender.js.map