"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidMessageHandlers = assertValidMessageHandlers;
exports.getMessageIterator = getMessageIterator;
exports.wrapProcessErrorHandler = wrapProcessErrorHandler;
exports.completeMessage = completeMessage;
exports.abandonMessage = abandonMessage;
exports.deferMessage = deferMessage;
exports.deadLetterMessage = deadLetterMessage;
exports.settleMessage = settleMessage;
exports.settleMessageOperation = settleMessageOperation;
exports.retryForever = retryForever;
const tslib_1 = require("tslib");
const log_js_1 = require("../log.js");
const serviceBusError_js_1 = require("../serviceBusError.js");
const serviceBusMessage_js_1 = require("../serviceBusMessage.js");
const core_amqp_1 = require("@azure/core-amqp");
const errors_js_1 = require("../util/errors.js");
const core_util_1 = require("@azure/core-util");
const tracing_js_1 = require("../diagnostics/tracing.js");
const instrumentServiceBusMessage_js_1 = require("../diagnostics/instrumentServiceBusMessage.js");
/**
 * @internal
 */
function assertValidMessageHandlers(handlers) {
    if (handlers &&
        handlers.processMessage instanceof Function &&
        handlers.processError instanceof Function) {
        return;
    }
    throw new TypeError('Invalid "MessageHandlers" provided.');
}
/**
 * @internal
 */
function getMessageIterator(receiver, options) {
    return tslib_1.__asyncGenerator(this, arguments, function* getMessageIterator_1() {
        while (true) {
            const messages = yield tslib_1.__await(receiver.receiveMessages(1, options));
            if (messages.length === 0) {
                continue;
            }
            yield yield tslib_1.__await(messages[0]);
        }
    });
}
/**
 * @internal
 */
function wrapProcessErrorHandler(handlers, loggerParam = log_js_1.receiverLogger) {
    return async (args) => {
        try {
            args.error = (0, serviceBusError_js_1.translateServiceBusError)(args.error);
            await handlers.processError(args);
        }
        catch (err) {
            loggerParam.logError(err, `An error was thrown from the user's processError handler`);
        }
    };
}
/**
 * @internal
 *
 */
function completeMessage(message, context, entityPath, retryOptions) {
    log_js_1.receiverLogger.verbose("[%s] Completing the message with id '%s'.", context.connectionId, message.messageId);
    const tracingContext = (0, instrumentServiceBusMessage_js_1.extractSpanContextFromServiceBusMessage)(message);
    const spanLinks = tracingContext ? [{ tracingContext }] : [];
    return tracing_js_1.tracingClient.withSpan("ServicebusReceiver.complete", {}, () => settleMessage(message, serviceBusMessage_js_1.DispositionType.complete, context, entityPath, {
        retryOptions,
    }), Object.assign({ spanLinks }, (0, tracing_js_1.toSpanOptions)({ entityPath, host: context.config.host }, "settle", "client")));
}
/**
 * @internal
 *
 */
function abandonMessage(message, context, entityPath, propertiesToModify, retryOptions) {
    log_js_1.receiverLogger.verbose("[%s] Abandoning the message with id '%s'.", context.connectionId, message.messageId);
    const tracingContext = (0, instrumentServiceBusMessage_js_1.extractSpanContextFromServiceBusMessage)(message);
    const spanLinks = tracingContext ? [{ tracingContext }] : [];
    return tracing_js_1.tracingClient.withSpan("ServicebusReceiver.abandon", {}, () => settleMessage(message, serviceBusMessage_js_1.DispositionType.abandon, context, entityPath, {
        propertiesToModify,
        retryOptions,
    }), Object.assign({ spanLinks }, (0, tracing_js_1.toSpanOptions)({ entityPath, host: context.config.host }, "settle", "client")));
}
/**
 * @internal
 *
 */
function deferMessage(message, context, entityPath, propertiesToModify, retryOptions) {
    log_js_1.receiverLogger.verbose("[%s] Deferring the message with id '%s'.", context.connectionId, message.messageId);
    const tracingContext = (0, instrumentServiceBusMessage_js_1.extractSpanContextFromServiceBusMessage)(message);
    const spanLinks = tracingContext ? [{ tracingContext }] : [];
    return tracing_js_1.tracingClient.withSpan("ServiceBusReceiver.defer", {}, () => settleMessage(message, serviceBusMessage_js_1.DispositionType.defer, context, entityPath, {
        retryOptions,
        propertiesToModify,
    }), Object.assign({ spanLinks }, (0, tracing_js_1.toSpanOptions)({ entityPath, host: context.config.host }, "settle", "client")));
}
/**
 * @internal
 *
 */
function deadLetterMessage(message, context, entityPath, propertiesToModify, retryOptions) {
    log_js_1.receiverLogger.verbose("[%s] Deadlettering the message with id '%s'.", context.connectionId, message.messageId);
    const actualPropertiesToModify = Object.assign({}, propertiesToModify);
    // these two fields are handled specially and don't need to be in here.
    delete actualPropertiesToModify.deadLetterErrorDescription;
    delete actualPropertiesToModify.deadLetterReason;
    const dispositionStatusOptions = {
        propertiesToModify: actualPropertiesToModify,
        deadLetterReason: propertiesToModify === null || propertiesToModify === void 0 ? void 0 : propertiesToModify.deadLetterReason,
        deadLetterDescription: propertiesToModify === null || propertiesToModify === void 0 ? void 0 : propertiesToModify.deadLetterErrorDescription,
        retryOptions,
    };
    const tracingContext = (0, instrumentServiceBusMessage_js_1.extractSpanContextFromServiceBusMessage)(message);
    const spanLinks = tracingContext ? [{ tracingContext }] : [];
    return tracing_js_1.tracingClient.withSpan("ServiceBusReceiver.deadLetter", {}, () => settleMessage(message, serviceBusMessage_js_1.DispositionType.deadletter, context, entityPath, dispositionStatusOptions), Object.assign({ spanLinks }, (0, tracing_js_1.toSpanOptions)({ entityPath, host: context.config.host }, "settle", "client")));
}
/**
 * @internal
 */
function settleMessage(message, operation, context, entityPath, options, _settleMessageOperation = settleMessageOperation) {
    return (0, core_amqp_1.retry)({
        connectionId: context.connectionId,
        operation: () => {
            return _settleMessageOperation(message, operation, context, entityPath, options);
        },
        operationType: core_amqp_1.RetryOperationType.messageSettlement,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        retryOptions: options === null || options === void 0 ? void 0 : options.retryOptions,
    });
}
/**
 * @internal
 *
 * NOTE: it's tempting to make this method non-async. However, doing so makes it too easy
 * to throw exceptions that will not be "catchable" by people chaining to the returned Promise
 * since we can throw exceptions outside of the Promise's scope.
 */
async function settleMessageOperation(message, operation, context, entityPath, options) {
    const isDeferredMessage = !message.delivery.link;
    const receiver = isDeferredMessage
        ? undefined
        : context.getReceiverFromCache(message.delivery.link.name, message.sessionId);
    const associatedLinkName = receiver === null || receiver === void 0 ? void 0 : receiver.name;
    let error;
    if (message.delivery.remote_settled) {
        error = new Error(errors_js_1.MessageAlreadySettled);
    }
    else if (!isDeferredMessage &&
        (!receiver || !receiver.isOpen()) &&
        (0, core_util_1.isDefined)(message.sessionId)) {
        error = (0, serviceBusError_js_1.translateServiceBusError)({
            description: `Failed to ${operation} the message as the AMQP link with which the message was ` +
                `received is no longer alive.`,
            condition: core_amqp_1.ErrorNameConditionMapper.SessionLockLostError,
        });
    }
    if (error) {
        log_js_1.receiverLogger.logError(error, "[%s] An error occurred when settling a message with id '%s'", context.connectionId, message.messageId);
        throw error;
    }
    // Message Settlement with managementLink
    // 1. If the received message is deferred as such messages can only be settled using managementLink
    // 2. If the associated receiver link is not available. This does not apply to messages from sessions as we need a lock on the session to do so.
    if (isDeferredMessage || ((!receiver || !receiver.isOpen()) && !(0, core_util_1.isDefined)(message.sessionId))) {
        return context
            .getManagementClient(entityPath)
            .updateDispositionStatus(message.lockToken, operation, Object.assign(Object.assign({}, options), { associatedLinkName, sessionId: message.sessionId }))
            .catch((err) => {
            throw (0, serviceBusError_js_1.translateServiceBusError)(err);
        });
    }
    return receiver.settleMessage(message, operation, options).catch((err) => {
        throw (0, serviceBusError_js_1.translateServiceBusError)(err);
    });
}
/**
 * Calculates delay between retries, in milliseconds.
 */
function calculateDelay(attemptCount, retryDelayInMs, maxRetryDelayInMs, mode) {
    if (mode === core_amqp_1.RetryMode.Exponential) {
        const boundedRandDelta = retryDelayInMs * 0.8 +
            Math.floor(Math.random() * (retryDelayInMs * 1.2 - retryDelayInMs * 0.8));
        const incrementDelta = boundedRandDelta * (Math.pow(2, attemptCount) - 1);
        return Math.min(incrementDelta, maxRetryDelayInMs);
    }
    return retryDelayInMs;
}
/**
 * Retry infinitely until success, reporting in between retry attempts.
 *
 * This function will only stop retrying if:
 * - args.retryConfig.operation resolves successfully
 * - args.retryConfig.operation rejects with an `AbortError`
 *
 * @internal
 */
async function retryForever(args, retryFn = core_amqp_1.retry) {
    let numRetryCycles = 0;
    const config = args.retryConfig;
    if (!config.retryOptions) {
        config.retryOptions = {};
    }
    // eslint-disable-next-line eqeqeq
    if (config.retryOptions.retryDelayInMs == undefined || config.retryOptions.retryDelayInMs < 0) {
        config.retryOptions.retryDelayInMs = core_amqp_1.Constants.defaultDelayBetweenOperationRetriesInMs;
    }
    if (
    // eslint-disable-next-line eqeqeq
    config.retryOptions.maxRetryDelayInMs == undefined ||
        config.retryOptions.maxRetryDelayInMs < 0) {
        config.retryOptions.maxRetryDelayInMs = core_amqp_1.Constants.defaultMaxDelayForExponentialRetryInMs;
    }
    if (!config.retryOptions.mode) {
        config.retryOptions.mode = core_amqp_1.RetryMode.Fixed;
    }
    // The retries are broken up into cycles, giving the user some control over how often
    // we actually attempt to retry.
    while (true) {
        ++numRetryCycles;
        try {
            return await retryFn(args.retryConfig);
        }
        catch (err) {
            // if the user aborts the operation we're immediately done.
            // AbortError is also thrown by linkEntity.init() if the connection has been
            // permanently closed.
            if (err.name === "AbortError") {
                log_js_1.logger.warning(`${args.logPrefix} AbortError caught, ending retries.`);
                throw err;
            }
            // we only report the error here - this avoids spamming the user with too many
            // redundant reports of errors while still providing them incremental status on failures.
            try {
                args.onError(err);
            }
            catch (error) {
                log_js_1.logger.error("args.onerror has thrown", error);
            }
            args.logger.logError(err, `${args.logPrefix} Error thrown in retry cycle ${numRetryCycles}, restarting retry cycle with retry options`, args.retryConfig);
            const delayInMs = calculateDelay(numRetryCycles, config.retryOptions.retryDelayInMs, config.retryOptions.maxRetryDelayInMs, config.retryOptions.mode);
            log_js_1.logger.verbose("[%s] Sleeping for %d milliseconds for '%s'.", config.connectionId, delayInMs, config.operationType);
            await (0, core_util_1.delay)(delayInMs, {
                abortSignal: config.abortSignal,
                abortErrorMsg: "Retry cycle has been cancelled by the user.",
            });
            continue;
        }
    }
}
//# sourceMappingURL=receiverCommon.js.map