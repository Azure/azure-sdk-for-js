"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchingReceiverLite = exports.BatchingReceiver = void 0;
exports.getRemainingWaitTimeInMsFn = getRemainingWaitTimeInMsFn;
const log_js_1 = require("../log.js");
const rhea_promise_1 = require("rhea-promise");
const serviceBusMessage_js_1 = require("../serviceBusMessage.js");
const messageReceiver_js_1 = require("./messageReceiver.js");
const errors_js_1 = require("../util/errors.js");
const utils_js_1 = require("../util/utils.js");
const constants_js_1 = require("../util/constants.js");
const instrumentServiceBusMessage_js_1 = require("../diagnostics/instrumentServiceBusMessage.js");
const serviceBusError_js_1 = require("../serviceBusError.js");
const tracing_js_1 = require("../diagnostics/tracing.js");
/**
 * Describes the batching receiver where the user can receive a specified number of messages for
 * a predefined time.
 * @internal
 */
class BatchingReceiver extends messageReceiver_js_1.MessageReceiver {
    /**
     * Instantiate a new BatchingReceiver.
     *
     * @param identifier - name to identify this receiver.
     * @param connectionContext - The client entity context.
     * @param options - Options for how you'd like to connect.
     */
    constructor(identifier, connectionContext, entityPath, options) {
        var _a, _b;
        super(identifier, connectionContext, entityPath, "batching", options);
        this._batchingReceiverLite = new BatchingReceiverLite(connectionContext, entityPath, async (abortSignal) => {
            let lastError;
            const rcvrOptions = this._createReceiverOptions(false, {
                onError: (context) => {
                    var _a;
                    lastError = (_a = context === null || context === void 0 ? void 0 : context.receiver) === null || _a === void 0 ? void 0 : _a.error;
                },
                onSessionError: (context) => {
                    var _a;
                    lastError = (_a = context === null || context === void 0 ? void 0 : context.session) === null || _a === void 0 ? void 0 : _a.error;
                },
                onClose: async () => {
                    /** Nothing to do here - the next call will just fail so they'll get an appropriate error from somewhere else. */
                },
                onSessionClose: async () => {
                    /** Nothing to do here - the next call will just fail so they'll get an appropriate error from somewhere else. */
                },
                onMessage: async () => {
                    /** Nothing to do here -  we don't add credits initially so we don't need to worry about handling any messages.*/
                },
            });
            await this._init(rcvrOptions, abortSignal);
            if (lastError != null) {
                throw lastError;
            }
            return this.link;
        }, this.receiveMode, (_a = options.skipParsingBodyAsJson) !== null && _a !== void 0 ? _a : false, (_b = options.skipConvertingDate) !== null && _b !== void 0 ? _b : false);
    }
    get isReceivingMessages() {
        return this._batchingReceiverLite.isReceivingMessages;
    }
    /**
     * To be called when connection is disconnected to gracefully close ongoing receive request.
     * @param connectionError - The connection error if any.
     */
    async onDetached(connectionError) {
        await this.closeLink();
        if (connectionError == null) {
            connectionError = new Error("Unknown error occurred on the AMQP connection while receiving messages.");
        }
        this._batchingReceiverLite.terminate(connectionError);
    }
    /**
     * Receives a batch of messages from a ServiceBus Queue/Topic.
     * @param maxMessageCount - The maximum number of messages to receive.
     * In Peeklock mode, this number is capped at 2047 due to constraints of the underlying buffer.
     * @param maxWaitTimeInMs - The total wait time in milliseconds until which the receiver will attempt to receive specified number of messages.
     * @param maxTimeAfterFirstMessageInMs - The total amount of time to wait after the first message
     * has been received. Defaults to 1 second.
     * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
     * @returns A promise that resolves with an array of Message objects.
     */
    async receive(maxMessageCount, maxWaitTimeInMs, maxTimeAfterFirstMessageInMs, options) {
        (0, errors_js_1.throwErrorIfConnectionClosed)(this._context);
        try {
            const messages = await this._batchingReceiverLite.receiveMessages(Object.assign({ maxMessageCount,
                maxWaitTimeInMs,
                maxTimeAfterFirstMessageInMs }, options));
            if (this._lockRenewer) {
                for (const message of messages) {
                    this._lockRenewer.start(this, message, (_error) => {
                        // the auto lock renewer already logs this in a detailed way. So this hook is mainly here
                        // to potentially forward the error to the user (which we're not doing yet)
                    });
                }
            }
            return messages;
        }
        catch (error) {
            log_js_1.receiverLogger.logError(error, "[%s] Rejecting receiveMessages()", this.logPrefix);
            throw error;
        }
    }
    static create(clientId, context, entityPath, options) {
        (0, errors_js_1.throwErrorIfConnectionClosed)(context);
        const bReceiver = new BatchingReceiver(clientId, context, entityPath, options);
        context.messageReceivers[bReceiver.name] = bReceiver;
        return bReceiver;
    }
    removeLinkFromContext() {
        delete this._context.messageReceivers[this.name];
    }
}
exports.BatchingReceiver = BatchingReceiver;
/**
 * Gets a function that returns the smaller of the two timeouts,
 * taking into account elapsed time from when getRemainingWaitTimeInMsFn
 * was called.
 *
 * @param maxWaitTimeInMs - Maximum time to wait for the first message
 * @param maxTimeAfterFirstMessageInMs - Maximum time to wait after the first message before completing the receive.
 *
 * @internal
 */
function getRemainingWaitTimeInMsFn(maxWaitTimeInMs, maxTimeAfterFirstMessageInMs) {
    const startTimeMs = Date.now();
    return () => {
        const remainingTimeMs = maxWaitTimeInMs - (Date.now() - startTimeMs);
        if (remainingTimeMs < 0) {
            return 0;
        }
        return Math.min(remainingTimeMs, maxTimeAfterFirstMessageInMs);
    };
}
/**
 * The internals of a batching receiver minus anything that would require us to hold onto a client entity context
 * or a receiver on a permanent basis.
 *
 * Usable with both session and non-session receivers.
 *
 * @internal
 */
class BatchingReceiverLite {
    constructor(_connectionContext, entityPath, _getCurrentReceiver, _receiveMode, _skipParsingBodyAsJson, _skipConvertingDate) {
        this._connectionContext = _connectionContext;
        this.entityPath = entityPath;
        this._getCurrentReceiver = _getCurrentReceiver;
        this._receiveMode = _receiveMode;
        // testing hook
        this._drainTimeoutInMs = constants_js_1.receiveDrainTimeoutInMs;
        this._createServiceBusMessage = (context) => {
            return new serviceBusMessage_js_1.ServiceBusMessageImpl(context.message, context.delivery, true, this._receiveMode, _skipParsingBodyAsJson, _skipConvertingDate);
        };
        this._getRemainingWaitTimeInMsFn = (maxWaitTimeInMs, maxTimeAfterFirstMessageInMs) => getRemainingWaitTimeInMsFn(maxWaitTimeInMs, maxTimeAfterFirstMessageInMs);
        this.isReceivingMessages = false;
    }
    /**
     * Receives a set of messages,
     *
     * @internal
     * @hidden
     */
    async receiveMessages(args) {
        try {
            this.isReceivingMessages = true;
            const receiver = await this._getCurrentReceiver(args.abortSignal);
            if (receiver == null) {
                // (was somehow closed in between the init() and the return)
                throw new serviceBusError_js_1.ServiceBusError("Link closed before receiving messages.", "GeneralError");
            }
            const messages = await new Promise((resolve, reject) => this._receiveMessagesImpl(receiver, args, resolve, reject));
            return tracing_js_1.tracingClient.withSpan("BatchingReceiverLite.process", args, () => messages, (0, instrumentServiceBusMessage_js_1.toProcessingSpanOptions)(messages, this, this._connectionContext.config, "process"));
        }
        finally {
            this._closeHandler = undefined;
            this.isReceivingMessages = false;
        }
    }
    /**
     * Closes the receiver (optionally with an error), cancelling any current operations.
     *
     * @param connectionError - An optional error (rhea doesn't always deliver one for certain disconnection events)
     */
    terminate(connectionError) {
        if (this._closeHandler) {
            this._closeHandler(connectionError);
            this._closeHandler = undefined;
        }
    }
    async tryDrainReceiver(receiver, loggingPrefix, remainingWaitTimeInMs, abortSignal) {
        if (!receiver.isOpen() || receiver.credit <= 0) {
            return;
        }
        let drainTimedout = false;
        let drainTimer;
        const timeToWaitInMs = Math.max(this._drainTimeoutInMs, remainingWaitTimeInMs);
        const drainPromise = new Promise((resolve) => {
            function drainListener() {
                log_js_1.receiverLogger.verbose(`${loggingPrefix} Receiver has been drained.`);
                clearTimeout(drainTimer);
                resolve();
            }
            function removeListeners() {
                abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.removeEventListener("abort", onAbort);
                receiver.removeListener(rhea_promise_1.ReceiverEvents.receiverDrained, drainListener);
            }
            function onAbort() {
                removeListeners();
                clearTimeout(drainTimer);
                resolve();
            }
            drainTimer = setTimeout(() => {
                drainTimedout = true;
                removeListeners();
                resolve();
            }, timeToWaitInMs);
            receiver.once(rhea_promise_1.ReceiverEvents.receiverDrained, drainListener);
            abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.addEventListener("abort", onAbort);
        });
        receiver.drainCredit();
        log_js_1.receiverLogger.verbose(`${loggingPrefix} Draining leftover credits(${receiver.credit}), waiting for event_drained event, or timing out after ${timeToWaitInMs} milliseconds...`);
        await drainPromise;
        if (drainTimedout) {
            log_js_1.receiverLogger.warning(`${loggingPrefix} Time out after ${timeToWaitInMs} milliseconds when draining credits. Closing receiver...`);
            // Close the receiver link since we have not received the receiver drain event
            // to prevent out-of-sync state between local and remote
            await receiver.close();
        }
        // Turn off draining.
        receiver.drain = false;
    }
    _receiveMessagesImpl(receiver, args, origResolve, origReject) {
        const getRemainingWaitTimeInMs = this._getRemainingWaitTimeInMsFn(args.maxWaitTimeInMs, args.maxTimeAfterFirstMessageInMs);
        const brokeredMessages = [];
        const loggingPrefix = `[${receiver.connection.id}|r:${receiver.name}]`;
        let totalWaitTimer;
        // eslint-disable-next-line prefer-const
        let cleanupBeforeResolveOrReject;
        const rejectAfterCleanup = (err) => {
            cleanupBeforeResolveOrReject();
            origReject(err);
        };
        const resolveImmediately = (result) => {
            cleanupBeforeResolveOrReject();
            origResolve(result);
        };
        const resolveAfterPendingMessageCallbacks = (result) => {
            // NOTE: through rhea-promise, most of our event handlers are made asynchronous by calling setTimeout(emit).
            // However, a small set (*error and drain) execute immediately. This can lead to a situation where the logical
            // ordering of events is correct but the execution order is incorrect because the events are not all getting
            // put into the task queue the same way.
            // setTimeout() ensures that we resolve _after_ any already-queued onMessage handlers that may
            // be waiting in the task queue.
            setTimeout(() => {
                cleanupBeforeResolveOrReject();
                origResolve(result);
            });
        };
        const onError = (context) => {
            var _a, _b, _c;
            const eventType = ((_a = context.session) === null || _a === void 0 ? void 0 : _a.error) != null ? "session_error" : "receiver_error";
            let error = ((_b = context.session) === null || _b === void 0 ? void 0 : _b.error) || ((_c = context.receiver) === null || _c === void 0 ? void 0 : _c.error);
            if (error) {
                error = (0, serviceBusError_js_1.translateServiceBusError)(error);
                log_js_1.receiverLogger.logError(error, `${loggingPrefix} '${eventType}' event occurred. Received an error`);
            }
            else {
                error = new serviceBusError_js_1.ServiceBusError("An error occurred while receiving messages.", "GeneralError");
            }
            rejectAfterCleanup(error);
        };
        this._closeHandler = (error) => {
            if (
            // no error, just closing. Go ahead and return what we have.
            error == null ||
                // Return the collected messages if in ReceiveAndDelete mode because otherwise they are lost forever
                (this._receiveMode === "receiveAndDelete" && brokeredMessages.length)) {
                log_js_1.receiverLogger.verbose(`${loggingPrefix} Closing. Resolving with ${brokeredMessages.length} messages.`);
                return resolveAfterPendingMessageCallbacks(brokeredMessages);
            }
            rejectAfterCleanup((0, serviceBusError_js_1.translateServiceBusError)(error));
        };
        let abortSignalCleanupFunction = undefined;
        // Final action to be performed after
        // - maxMessageCount is reached or
        // - maxWaitTime is passed or
        // - newMessageWaitTimeoutInSeconds is passed since the last message was received
        this._finalAction = async () => {
            if (receiver.drain) {
                // If a drain is already in process then we should let it complete. Some messages might still be in flight, but they will
                // arrive before the drain completes.
                log_js_1.receiverLogger.verbose(`${loggingPrefix} Already draining.`);
                return;
            }
            const remainingWaitTimeInMs = getRemainingWaitTimeInMs();
            await this.tryDrainReceiver(receiver, loggingPrefix, remainingWaitTimeInMs, args.abortSignal);
            log_js_1.receiverLogger.verbose(`${loggingPrefix} Resolving receiveMessages() with ${brokeredMessages.length} messages.`);
            resolveImmediately(brokeredMessages);
        };
        // Action to be performed on the "message" event.
        const onReceiveMessage = async (context) => {
            // TODO: this appears to be aggravating a bug that we need to look into more deeply.
            // The same timeout+drain sequence should work fine for receiveAndDelete but it appears
            // to cause problems.
            if (this._receiveMode === "peekLock") {
                if (brokeredMessages.length === 0) {
                    // We'll now remove the old timer (which was the overall `maxWaitTimeMs` timer)
                    // and replace it with another timer that is a (probably) much shorter interval.
                    //
                    // This allows the user to get access to received messages earlier and also gives us
                    // a chance to have fewer messages internally that could get lost if the user's
                    // app crashes.
                    if (totalWaitTimer)
                        clearTimeout(totalWaitTimer);
                    const remainingWaitTimeInMs = getRemainingWaitTimeInMs();
                    totalWaitTimer = setTimeout(() => {
                        log_js_1.receiverLogger.verbose(`${loggingPrefix} Batching, waited for ${remainingWaitTimeInMs} milliseconds after receiving the first message.`);
                        this._finalAction();
                    }, remainingWaitTimeInMs);
                }
            }
            try {
                const data = this._createServiceBusMessage(context);
                brokeredMessages.push(data);
                // NOTE: we used to actually "lose" any extra messages. At this point I've fixed the areas that were causing us to receive
                // extra messages but if this bug arises in some other way it's better to return the message than it would be to let it be
                // silently dropped on the floor.
                if (brokeredMessages.length > args.maxMessageCount) {
                    log_js_1.receiverLogger.warning(`More messages arrived than expected: ${args.maxMessageCount} vs ${brokeredMessages.length}`);
                }
            }
            catch (err) {
                const errObj = err instanceof Error ? err : new Error(JSON.stringify(err));
                log_js_1.receiverLogger.logError(err, `${loggingPrefix} Received an error while converting AmqpMessage to ServiceBusMessage`);
                rejectAfterCleanup(errObj);
            }
            if (brokeredMessages.length >= args.maxMessageCount) {
                this._finalAction();
            }
        };
        const onClose = async (context) => {
            var _a, _b, _c;
            const type = ((_a = context.session) === null || _a === void 0 ? void 0 : _a.error) != null ? "session_closed" : "receiver_closed";
            const error = ((_b = context.session) === null || _b === void 0 ? void 0 : _b.error) || ((_c = context.receiver) === null || _c === void 0 ? void 0 : _c.error);
            if (error) {
                log_js_1.receiverLogger.logError(error, `${loggingPrefix} '${type}' event occurred. The associated error`);
            }
        };
        cleanupBeforeResolveOrReject = () => {
            if (receiver != null) {
                receiver.removeListener(rhea_promise_1.ReceiverEvents.receiverError, onError);
                receiver.removeListener(rhea_promise_1.ReceiverEvents.message, onReceiveMessage);
                receiver.session.removeListener(rhea_promise_1.SessionEvents.sessionError, onError);
                receiver.removeListener(rhea_promise_1.ReceiverEvents.receiverClose, onClose);
                receiver.session.removeListener(rhea_promise_1.SessionEvents.sessionClose, onClose);
            }
            if (totalWaitTimer) {
                clearTimeout(totalWaitTimer);
            }
            if (abortSignalCleanupFunction) {
                abortSignalCleanupFunction();
            }
            abortSignalCleanupFunction = undefined;
        };
        abortSignalCleanupFunction = (0, utils_js_1.checkAndRegisterWithAbortSignal)((err) => {
            if (receiver.drain) {
                // If a drain is already in process and we cancel, the link state may be out of sync
                // with remote. Reset the link so that we will have fresh start.
                receiver.close();
            }
            rejectAfterCleanup(err);
        }, args.abortSignal);
        // By adding credit here, we let the service know that at max we can handle `maxMessageCount`
        // number of messages concurrently. We will return the user an array of messages that can
        // be of size upto maxMessageCount. Then the user needs to accordingly dispose
        // (complete/abandon/defer/deadletter) the messages from the array.
        const creditToAdd = args.maxMessageCount - receiver.credit;
        log_js_1.receiverLogger.verbose(`${loggingPrefix} Ensure enough credit for receiving ${args.maxMessageCount} messages. Current: ${receiver.credit}.  To add: ${creditToAdd}.`);
        if (creditToAdd > 0) {
            receiver.addCredit(creditToAdd);
        }
        log_js_1.receiverLogger.verbose(`${loggingPrefix} Setting the wait timer for ${args.maxWaitTimeInMs} milliseconds.`);
        totalWaitTimer = setTimeout(() => {
            log_js_1.receiverLogger.verbose(`${loggingPrefix} Batching, waited for max wait time ${args.maxWaitTimeInMs} milliseconds.`);
            this._finalAction();
        }, args.maxWaitTimeInMs);
        receiver.on(rhea_promise_1.ReceiverEvents.message, onReceiveMessage);
        receiver.on(rhea_promise_1.ReceiverEvents.receiverError, onError);
        receiver.on(rhea_promise_1.ReceiverEvents.receiverClose, onClose);
        receiver.session.on(rhea_promise_1.SessionEvents.sessionError, onError);
        receiver.session.on(rhea_promise_1.SessionEvents.sessionClose, onClose);
    }
}
exports.BatchingReceiverLite = BatchingReceiverLite;
//# sourceMappingURL=batchingReceiver.js.map