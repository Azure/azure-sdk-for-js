// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncGenerator, __await } from "tslib";
import { logger, receiverLogger } from "../log.js";
import { translateServiceBusError } from "../serviceBusError.js";
import { DispositionType } from "../serviceBusMessage.js";
import { Constants, ErrorNameConditionMapper, retry, RetryMode, RetryOperationType, } from "@azure/core-amqp";
import { MessageAlreadySettled } from "../util/errors.js";
import { delay, isDefined } from "@azure/core-util";
import { toSpanOptions, tracingClient } from "../diagnostics/tracing.js";
import { extractSpanContextFromServiceBusMessage } from "../diagnostics/instrumentServiceBusMessage.js";
/**
 * @internal
 */
export function assertValidMessageHandlers(handlers) {
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
export function getMessageIterator(receiver, options) {
    return __asyncGenerator(this, arguments, function* getMessageIterator_1() {
        while (true) {
            const messages = yield __await(receiver.receiveMessages(1, options));
            if (messages.length === 0) {
                continue;
            }
            yield yield __await(messages[0]);
        }
    });
}
/**
 * @internal
 */
export function wrapProcessErrorHandler(handlers, loggerParam = receiverLogger) {
    return async (args) => {
        try {
            args.error = translateServiceBusError(args.error);
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
export function completeMessage(message, context, entityPath, retryOptions) {
    receiverLogger.verbose("[%s] Completing the message with id '%s'.", context.connectionId, message.messageId);
    const tracingContext = extractSpanContextFromServiceBusMessage(message);
    const spanLinks = tracingContext ? [{ tracingContext }] : [];
    return tracingClient.withSpan("ServicebusReceiver.complete", {}, () => settleMessage(message, DispositionType.complete, context, entityPath, {
        retryOptions,
    }), Object.assign({ spanLinks }, toSpanOptions({ entityPath, host: context.config.host }, "settle", "client")));
}
/**
 * @internal
 *
 */
export function abandonMessage(message, context, entityPath, propertiesToModify, retryOptions) {
    receiverLogger.verbose("[%s] Abandoning the message with id '%s'.", context.connectionId, message.messageId);
    const tracingContext = extractSpanContextFromServiceBusMessage(message);
    const spanLinks = tracingContext ? [{ tracingContext }] : [];
    return tracingClient.withSpan("ServicebusReceiver.abandon", {}, () => settleMessage(message, DispositionType.abandon, context, entityPath, {
        propertiesToModify,
        retryOptions,
    }), Object.assign({ spanLinks }, toSpanOptions({ entityPath, host: context.config.host }, "settle", "client")));
}
/**
 * @internal
 *
 */
export function deferMessage(message, context, entityPath, propertiesToModify, retryOptions) {
    receiverLogger.verbose("[%s] Deferring the message with id '%s'.", context.connectionId, message.messageId);
    const tracingContext = extractSpanContextFromServiceBusMessage(message);
    const spanLinks = tracingContext ? [{ tracingContext }] : [];
    return tracingClient.withSpan("ServiceBusReceiver.defer", {}, () => settleMessage(message, DispositionType.defer, context, entityPath, {
        retryOptions,
        propertiesToModify,
    }), Object.assign({ spanLinks }, toSpanOptions({ entityPath, host: context.config.host }, "settle", "client")));
}
/**
 * @internal
 *
 */
export function deadLetterMessage(message, context, entityPath, propertiesToModify, retryOptions) {
    receiverLogger.verbose("[%s] Deadlettering the message with id '%s'.", context.connectionId, message.messageId);
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
    const tracingContext = extractSpanContextFromServiceBusMessage(message);
    const spanLinks = tracingContext ? [{ tracingContext }] : [];
    return tracingClient.withSpan("ServiceBusReceiver.deadLetter", {}, () => settleMessage(message, DispositionType.deadletter, context, entityPath, dispositionStatusOptions), Object.assign({ spanLinks }, toSpanOptions({ entityPath, host: context.config.host }, "settle", "client")));
}
/**
 * @internal
 */
export function settleMessage(message, operation, context, entityPath, options, _settleMessageOperation = settleMessageOperation) {
    return retry({
        connectionId: context.connectionId,
        operation: () => {
            return _settleMessageOperation(message, operation, context, entityPath, options);
        },
        operationType: RetryOperationType.messageSettlement,
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
export async function settleMessageOperation(message, operation, context, entityPath, options) {
    const isDeferredMessage = !message.delivery.link;
    const receiver = isDeferredMessage
        ? undefined
        : context.getReceiverFromCache(message.delivery.link.name, message.sessionId);
    const associatedLinkName = receiver === null || receiver === void 0 ? void 0 : receiver.name;
    let error;
    if (message.delivery.remote_settled) {
        error = new Error(MessageAlreadySettled);
    }
    else if (!isDeferredMessage &&
        (!receiver || !receiver.isOpen()) &&
        isDefined(message.sessionId)) {
        error = translateServiceBusError({
            description: `Failed to ${operation} the message as the AMQP link with which the message was ` +
                `received is no longer alive.`,
            condition: ErrorNameConditionMapper.SessionLockLostError,
        });
    }
    if (error) {
        receiverLogger.logError(error, "[%s] An error occurred when settling a message with id '%s'", context.connectionId, message.messageId);
        throw error;
    }
    // Message Settlement with managementLink
    // 1. If the received message is deferred as such messages can only be settled using managementLink
    // 2. If the associated receiver link is not available. This does not apply to messages from sessions as we need a lock on the session to do so.
    if (isDeferredMessage || ((!receiver || !receiver.isOpen()) && !isDefined(message.sessionId))) {
        return context
            .getManagementClient(entityPath)
            .updateDispositionStatus(message.lockToken, operation, Object.assign(Object.assign({}, options), { associatedLinkName, sessionId: message.sessionId }))
            .catch((err) => {
            throw translateServiceBusError(err);
        });
    }
    return receiver.settleMessage(message, operation, options).catch((err) => {
        throw translateServiceBusError(err);
    });
}
/**
 * Calculates delay between retries, in milliseconds.
 */
function calculateDelay(attemptCount, retryDelayInMs, maxRetryDelayInMs, mode) {
    if (mode === RetryMode.Exponential) {
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
export async function retryForever(args, retryFn = retry) {
    let numRetryCycles = 0;
    const config = args.retryConfig;
    if (!config.retryOptions) {
        config.retryOptions = {};
    }
    // eslint-disable-next-line eqeqeq
    if (config.retryOptions.retryDelayInMs == undefined || config.retryOptions.retryDelayInMs < 0) {
        config.retryOptions.retryDelayInMs = Constants.defaultDelayBetweenOperationRetriesInMs;
    }
    if (
    // eslint-disable-next-line eqeqeq
    config.retryOptions.maxRetryDelayInMs == undefined ||
        config.retryOptions.maxRetryDelayInMs < 0) {
        config.retryOptions.maxRetryDelayInMs = Constants.defaultMaxDelayForExponentialRetryInMs;
    }
    if (!config.retryOptions.mode) {
        config.retryOptions.mode = RetryMode.Fixed;
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
                logger.warning(`${args.logPrefix} AbortError caught, ending retries.`);
                throw err;
            }
            // we only report the error here - this avoids spamming the user with too many
            // redundant reports of errors while still providing them incremental status on failures.
            try {
                args.onError(err);
            }
            catch (error) {
                logger.error("args.onerror has thrown", error);
            }
            args.logger.logError(err, `${args.logPrefix} Error thrown in retry cycle ${numRetryCycles}, restarting retry cycle with retry options`, args.retryConfig);
            const delayInMs = calculateDelay(numRetryCycles, config.retryOptions.retryDelayInMs, config.retryOptions.maxRetryDelayInMs, config.retryOptions.mode);
            logger.verbose("[%s] Sleeping for %d milliseconds for '%s'.", config.connectionId, delayInMs, config.operationType);
            await delay(delayInMs, {
                abortSignal: config.abortSignal,
                abortErrorMsg: "Retry cycle has been cancelled by the user.",
            });
            continue;
        }
    }
}
//# sourceMappingURL=receiverCommon.js.map