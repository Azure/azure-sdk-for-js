"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingReceiver = void 0;
const messageReceiver_js_1 = require("./messageReceiver.js");
const receiverHelper_js_1 = require("./receiverHelper.js");
const errors_js_1 = require("../util/errors.js");
const core_amqp_1 = require("@azure/core-amqp");
const log_js_1 = require("../log.js");
const serviceBusMessage_js_1 = require("../serviceBusMessage.js");
const serviceBusError_js_1 = require("../serviceBusError.js");
const receiverCommon_js_1 = require("../receivers/receiverCommon.js");
const instrumentServiceBusMessage_js_1 = require("../diagnostics/instrumentServiceBusMessage.js");
const abort_controller_1 = require("@azure/abort-controller");
const tracing_js_1 = require("../diagnostics/tracing.js");
/**
 * @internal
 * Describes the streaming receiver where the user can receive the message
 * by providing handler functions.
 */
class StreamingReceiver extends messageReceiver_js_1.MessageReceiver {
    /**
     * Whether we are currently subscribed (or subscribing) for receiving messages.
     * (this is irrespective of receiver state, etc... - it's just a simple flag to prevent
     * multiple subscribe() calls from happening on this instance)
     */
    get isSubscribeActive() {
        return !this._receiverHelper.isSuspended();
    }
    /**
     * Instantiate a new Streaming receiver for receiving messages with handlers.
     *
     * @param identifier - the name used to identifier the receiver
     * @param connectionContext - The client entity context.
     * @param options - Options for how you'd like to connect.
     */
    constructor(identifier, connectionContext, entityPath, options) {
        super(identifier, connectionContext, entityPath, "streaming", options);
        /**
         * The maximum number of messages that should be
         * processed concurrently while in streaming mode. Once this limit has been reached, more
         * messages will not be received until the user's message handler has completed processing current message.
         * Default: 1
         */
        this.maxConcurrentCalls = 1;
        /**
         * Indicates whether the receiver is already actively
         * running `onDetached`.
         * This is expected to be true while the receiver attempts
         * to bring its link back up due to a retryable issue.
         */
        this._isDetaching = false;
        /**
         * The user's message handlers, wrapped so any thrown exceptions are properly logged
         * or forwarded to the user's processError handler.
         */
        this._messageHandlers = () => {
            throw new Error("messageHandlers are not set.");
        };
        /**
         * Used so we can stub out retry in tests.
         */
        this._retryForeverFn = receiverCommon_js_1.retryForever;
        if (typeof (options === null || options === void 0 ? void 0 : options.maxConcurrentCalls) === "number" && (options === null || options === void 0 ? void 0 : options.maxConcurrentCalls) > 0) {
            this.maxConcurrentCalls = options.maxConcurrentCalls;
        }
        this._retryOptions = (options === null || options === void 0 ? void 0 : options.retryOptions) || {};
        this._receiverHelper = new receiverHelper_js_1.ReceiverHelper(() => ({
            receiver: this.link,
            logPrefix: this.logPrefix,
        }));
        this._onAmqpClose = async (context) => {
            var _a;
            const receiverError = context.receiver && context.receiver.error;
            const receiver = this.link || context.receiver;
            log_js_1.receiverLogger.logError(receiverError, `${this.logPrefix} 'receiver_close' event occurred. The associated error is`);
            (_a = this._lockRenewer) === null || _a === void 0 ? void 0 : _a.stopAll(this);
            if (receiver && !receiver.isItselfClosed()) {
                await this.onDetached(receiverError);
            }
            else {
                log_js_1.receiverLogger.verbose("%s 'receiver_close' event occurred on the receiver '%s' with address '%s' " +
                    "because the sdk initiated it. Hence not calling detached from the _onAmqpClose" +
                    "() handler.", this.logPrefix, this.name, this.address);
            }
        };
        this._onSessionClose = async (context) => {
            var _a;
            const receiver = this.link || context.receiver;
            const sessionError = context.session && context.session.error;
            log_js_1.receiverLogger.logError(sessionError, `${this.logPrefix} 'session_close' event occurred. The associated error is`);
            (_a = this._lockRenewer) === null || _a === void 0 ? void 0 : _a.stopAll(this);
            if (receiver && !receiver.isSessionItselfClosed()) {
                await this.onDetached(sessionError);
            }
            else {
                log_js_1.receiverLogger.verbose("%s 'session_close' event occurred on the session of receiver '%s' with address " +
                    "'%s' because the sdk initiated it. Hence not calling detached from the _onSessionClose" +
                    "() handler.", this.logPrefix, this.name, this.address);
            }
        };
        this._onAmqpError = (context) => {
            const receiverError = context.receiver && context.receiver.error;
            if (receiverError) {
                const sbError = (0, serviceBusError_js_1.translateServiceBusError)(receiverError);
                log_js_1.receiverLogger.logError(sbError, `${this.logPrefix} 'receiver_error' event occurred. The associated error is`);
                this._messageHandlers().processError({
                    error: sbError,
                    errorSource: "receive",
                    entityPath: this.entityPath,
                    fullyQualifiedNamespace: this._context.config.host,
                    identifier,
                });
            }
        };
        this._onSessionError = (context) => {
            const sessionError = context.session && context.session.error;
            if (sessionError) {
                const sbError = (0, serviceBusError_js_1.translateServiceBusError)(sessionError);
                log_js_1.receiverLogger.logError(sbError, `${this.logPrefix} 'session_error' event occurred. The associated error is`);
                this._messageHandlers().processError({
                    error: sbError,
                    errorSource: "receive",
                    entityPath: this.entityPath,
                    fullyQualifiedNamespace: this._context.config.host,
                    identifier,
                });
            }
        };
        this._onAmqpMessage = async (context) => {
            var _a, _b, _c, _d;
            // If the receiver got closed in PeekLock mode, avoid processing the message as we
            // cannot settle the message.
            if (this.receiveMode === "peekLock" && (!this.link || !this.link.isOpen())) {
                log_js_1.receiverLogger.verbose("%s Not calling the user's message handler for the current message " +
                    "as the receiver is closed", this.logPrefix);
                return;
            }
            const bMessage = new serviceBusMessage_js_1.ServiceBusMessageImpl(context.message, context.delivery, true, this.receiveMode, (_a = options.skipParsingBodyAsJson) !== null && _a !== void 0 ? _a : false, (_b = options.skipConvertingDate) !== null && _b !== void 0 ? _b : false);
            (_c = this._lockRenewer) === null || _c === void 0 ? void 0 : _c.start(this, bMessage, (err) => {
                this._messageHandlers().processError({
                    error: err,
                    errorSource: "renewLock",
                    entityPath: this.entityPath,
                    fullyQualifiedNamespace: this._context.config.host,
                    identifier,
                });
            });
            try {
                await this._messageHandlers().processMessage(bMessage);
            }
            catch (err) {
                log_js_1.receiverLogger.logError(err, "%s An error occurred while running user's message handler for the message " +
                    "with id '%s' on the receiver '%s'", this.logPrefix, bMessage.messageId, this.name);
                // Do not want renewLock to happen unnecessarily, while abandoning the message. Hence,
                // doing this here. Otherwise, this should be done in finally.
                (_d = this._lockRenewer) === null || _d === void 0 ? void 0 : _d.stop(this, bMessage);
                const error = (0, serviceBusError_js_1.translateServiceBusError)(err);
                // Nothing much to do if user's message handler throws. Let us try abandoning the message.
                if (!bMessage.delivery.remote_settled &&
                    error.code !== core_amqp_1.ConditionErrorNameMapper["com.microsoft:message-lock-lost"] &&
                    this.receiveMode === "peekLock" &&
                    this.isOpen() // only try to abandon the messages if the connection is still open
                ) {
                    try {
                        log_js_1.receiverLogger.logError(error, "%s Abandoning the message with id '%s' on the receiver '%s' since " +
                            "an error occured: %O.", this.logPrefix, bMessage.messageId, this.name, error);
                        await (0, receiverCommon_js_1.abandonMessage)(bMessage, this._context, entityPath, undefined, this._retryOptions);
                    }
                    catch (abandonError) {
                        const translatedError = (0, serviceBusError_js_1.translateServiceBusError)(abandonError);
                        log_js_1.receiverLogger.logError(translatedError, "%s An error occurred while abandoning the message with id '%s' on the " +
                            "receiver '%s'", this.logPrefix, bMessage.messageId, this.name);
                        this._messageHandlers().processError({
                            error: translatedError,
                            errorSource: "abandon",
                            entityPath: this.entityPath,
                            fullyQualifiedNamespace: this._context.config.host,
                            identifier,
                        });
                    }
                }
                return;
            }
            finally {
                try {
                    this._receiverHelper.addCredit(1);
                }
                catch (err) {
                    // if we're aborting out of the receive operation we don't need to report it (the user already
                    // knows the link is being torn down or stopped)
                    if (err.name !== "AbortError") {
                        log_js_1.receiverLogger.logError(err, `[${this.logPrefix}] Failed to add credit after receiving message`);
                        await this._reportInternalError(err);
                    }
                }
            }
            // If we've made it this far, then user's message handler completed fine. Let us try
            // completing the message.
            if (this.autoComplete &&
                this.receiveMode === "peekLock" &&
                !bMessage.delivery.remote_settled) {
                try {
                    log_js_1.receiverLogger.verbose("%s Auto completing the message with id '%s' on " + "the receiver.", this.logPrefix, bMessage.messageId);
                    await (0, receiverCommon_js_1.completeMessage)(bMessage, this._context, entityPath, this._retryOptions);
                }
                catch (completeError) {
                    const translatedError = (0, serviceBusError_js_1.translateServiceBusError)(completeError);
                    log_js_1.receiverLogger.logError(translatedError, "%s An error occurred while completing the message with id '%s' on the " +
                        "receiver '%s'", this.logPrefix, bMessage.messageId, this.name);
                    this._messageHandlers().processError({
                        error: translatedError,
                        errorSource: "complete",
                        entityPath: this.entityPath,
                        fullyQualifiedNamespace: this._context.config.host,
                        identifier,
                    });
                }
            }
        };
    }
    _reportInternalError(error) {
        const messageHandlers = this._messageHandlers();
        if (messageHandlers.forwardInternalErrors) {
            const errorArgs = {
                error,
                entityPath: this.entityPath,
                errorSource: "internal",
                fullyQualifiedNamespace: this._context.config.host,
                identifier: this.identifier,
            };
            return messageHandlers.processError(errorArgs);
        }
        return Promise.resolve();
    }
    _getHandlers() {
        return {
            onMessage: (context) => this._onAmqpMessage(context).catch((err) => this._reportInternalError(err)),
            onClose: (context) => this._onAmqpClose(context).catch((err) => this._reportInternalError(err)),
            onSessionClose: (context) => this._onSessionClose(context).catch((err) => this._reportInternalError(err)),
            onError: this._onAmqpError,
            onSessionError: this._onSessionError,
        };
    }
    async stopReceivingMessages() {
        await this._receiverHelper.suspend();
        if (this._subscribeCallPromise) {
            await this._subscribeCallPromise;
        }
    }
    async close() {
        await this._receiverHelper.suspend();
        return super.close();
    }
    /**
     * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
     *
     * Any errors thrown by this function will also be sent to the messageHandlers.processError function
     * _and_ thrown, ultimately from this method.
     *
     * NOTE: This function retries _infinitely_ until success! It is completely up to the user to break
     * out of this retry cycle otherwise by:
     * 1. closing the receiver
     * 2. Calling `close` on the subscription instance they received when they initially called subscribe().
     * 3. aborting the abortSignal they passed in when calling subscribe (this also applies to initialization calls in onDetach)
     *
     * @param onMessage - The message handler to receive servicebus messages.
     * @param onError - The error handler to receive an error that occurs while receivin messages.
     */
    async subscribe(messageHandlers, subscribeOptions) {
        // these options and message handlers will be re-used if/when onDetach is called.
        this._subscribeOptions = subscribeOptions;
        this._setMessageHandlers(messageHandlers, subscribeOptions);
        let promiseResolve;
        this._subscribeCallPromise = new Promise((resolve) => {
            promiseResolve = resolve;
        });
        try {
            this._receiverHelper.resume();
            return await this._subscribeImpl("subscribe");
        }
        catch (err) {
            // callers aren't going to be in a good position to forward this error properly
            // so we do it here.
            await this._messageHandlers().processError({
                entityPath: this.entityPath,
                fullyQualifiedNamespace: this._context.config.host,
                errorSource: "receive",
                error: err,
                identifier: this.identifier,
            });
            throw err;
        }
        finally {
            promiseResolve === null || promiseResolve === void 0 ? void 0 : promiseResolve();
            this._subscribeCallPromise = undefined;
        }
    }
    /**
     * Wraps the individual message handlers with tracing and proper error handling
     * and assigns them to `this._messageHandlers`
     *
     * @param userHandlers - The user's message handlers
     * @param operationOptions - The subscribe(options)
     */
    _setMessageHandlers(userHandlers, operationOptions) {
        var _a;
        const messageHandlers = {
            processError: async (args) => {
                try {
                    args.error = (0, serviceBusError_js_1.translateServiceBusError)(args.error);
                    await userHandlers.processError(args);
                }
                catch (err) {
                    await this._reportInternalError(err);
                    log_js_1.receiverLogger.logError(err, `An error was thrown from the user's processError handler`);
                }
            },
            processMessage: async (message) => {
                try {
                    await tracing_js_1.tracingClient.withSpan("StreamReceiver.process", operationOptions !== null && operationOptions !== void 0 ? operationOptions : {}, () => userHandlers.processMessage(message), (0, instrumentServiceBusMessage_js_1.toProcessingSpanOptions)(message, this, this._context.config, "process"));
                }
                catch (err) {
                    this._messageHandlers().processError({
                        error: err,
                        errorSource: "processMessageCallback",
                        entityPath: this.entityPath,
                        fullyQualifiedNamespace: this._context.config.host,
                        identifier: this.identifier,
                    });
                    throw err;
                }
            },
            postInitialize: async () => {
                if (!userHandlers.postInitialize) {
                    return;
                }
                return userHandlers.postInitialize().catch((err) => this._messageHandlers().processError({
                    error: err,
                    errorSource: "processMessageCallback",
                    entityPath: this.entityPath,
                    fullyQualifiedNamespace: this._context.config.host,
                    identifier: this.identifier,
                }));
            },
            preInitialize: async () => {
                if (!userHandlers.preInitialize) {
                    return;
                }
                return userHandlers.preInitialize().catch((err) => this._messageHandlers().processError({
                    error: err,
                    errorSource: "processMessageCallback",
                    entityPath: this.entityPath,
                    fullyQualifiedNamespace: this._context.config.host,
                    identifier: this.identifier,
                }));
            },
            forwardInternalErrors: (_a = userHandlers.forwardInternalErrors) !== null && _a !== void 0 ? _a : false,
        };
        this._messageHandlers = () => messageHandlers;
    }
    /**
     * Subscribes using the already assigned `this._messageHandlers` and `this._subscribeOptions`
     *
     * @returns A promise that will resolve when a link is created and we successfully add credits to it.
     */
    async _subscribeImpl(caller) {
        var _a;
        try {
            // we don't expect to ever get an error from retryForever but bugs
            // do happen.
            return await this._retryForeverFn({
                retryConfig: {
                    connectionId: this._context.connection.id,
                    operationType: core_amqp_1.RetryOperationType.receiverLink,
                    abortSignal: (_a = this._subscribeOptions) === null || _a === void 0 ? void 0 : _a.abortSignal,
                    retryOptions: this._retryOptions,
                    operation: () => this._initAndAddCreditOperation(caller),
                },
                onError: (err) => this._messageHandlers().processError({
                    error: err,
                    errorSource: "receive",
                    entityPath: this.entityPath,
                    fullyQualifiedNamespace: this._context.config.host,
                    identifier: this.identifier,
                }),
                logPrefix: this.logPrefix,
                logger: log_js_1.receiverLogger,
            });
        }
        catch (err) {
            try {
                await this._receiverHelper.suspend();
            }
            catch (error) {
                log_js_1.receiverLogger.logError(error, `${this.logPrefix} receiver.suspend threw an error`);
            }
            throw err;
        }
    }
    /**
     * Initializes the link and adds credits. If any of these operations fail any created link will
     * be closed.
     *
     * @param caller - The caller which dictates whether or not we create a new name for our created link.
     * @param catchAndReportError - A function and reports an error but does not throw it.
     */
    async _initAndAddCreditOperation(caller) {
        var _a;
        if (this._receiverHelper.isSuspended()) {
            // user has suspended us while we were initializing
            // the connection. Abort this attempt - if they attempt
            // resubscribe we'll just reinitialize.
            // This checks should happen before throwErrorIfConnectionClosed(); otherwise
            // we won't be able to break out of the retry-for-ever loops when user suspend us.
            throw new abort_controller_1.AbortError("Receiver was suspended during initialization.");
        }
        (0, errors_js_1.throwErrorIfConnectionClosed)(this._context);
        await this._messageHandlers().preInitialize();
        if (this._receiverHelper.isSuspended()) {
            // Need to check again as user can suspend us in preInitialize()
            throw new abort_controller_1.AbortError("Receiver was suspended during initialization.");
        }
        await this._init(this._createReceiverOptions(caller === "detach", this._getHandlers()), (_a = this._subscribeOptions) === null || _a === void 0 ? void 0 : _a.abortSignal);
        try {
            await this._messageHandlers().postInitialize();
            this._receiverHelper.addCredit(this.maxConcurrentCalls);
        }
        catch (err) {
            try {
                await this.closeLink();
            }
            catch (error) {
                await this._messageHandlers().processError({
                    error,
                    errorSource: "receive",
                    entityPath: this.entityPath,
                    fullyQualifiedNamespace: this._context.config.host,
                    identifier: this.identifier,
                });
            }
            throw err;
        }
    }
    /**
     * Will reconnect the receiver link if necessary.
     * @param receiverError - The receiver error or connection error, if any.
     */
    async onDetached(receiverError) {
        try {
            log_js_1.receiverLogger.verbose(`${this.logPrefix} onDetached: reinitializing link.`);
            // User explicitly called `close` on the receiver, so link is already closed
            // and we can exit early.
            if (this.wasClosedPermanently) {
                log_js_1.receiverLogger.verbose(`${this.logPrefix} onDetached: link has been closed permanently, not reinitializing. `);
                return;
            }
            // Prevent multiple onDetached invocations from running concurrently.
            if (this._isDetaching) {
                // This can happen when the network connection goes down for some amount of time.
                // The first connection `disconnect` will trigger `onDetached` and attempt to retry
                // creating the connection/receiver link.
                // While those retry attempts fail (until the network connection comes back up),
                // we'll continue to see connection `disconnect` errors.
                // These should be ignored until the already running `onDetached` completes
                // its retry attempts or errors.
                log_js_1.receiverLogger.verbose(`${this.logPrefix} onDetached: Call to detached on streaming receiver '${this.name}' is already in progress.`);
                return;
            }
            this._isDetaching = true;
            const translatedError = receiverError
                ? (0, serviceBusError_js_1.translateServiceBusError)(receiverError)
                : receiverError;
            log_js_1.receiverLogger.logError(translatedError, `${this.logPrefix} onDetached: Reinitializing receiver because of error`);
            // Clears the token renewal timer. Closes the link and its session if they are open.
            // Removes the link and its session if they are present in rhea's cache.
            await this.closeLink();
        }
        catch (err) {
            log_js_1.receiverLogger.verbose(`${this.logPrefix} onDetached: Encountered an error when closing the previous link: `, err);
        }
        try {
            await this._subscribeImpl("detach");
        }
        finally {
            this._isDetaching = false;
        }
    }
    removeLinkFromContext() {
        delete this._context.messageReceivers[this.name];
    }
}
exports.StreamingReceiver = StreamingReceiver;
//# sourceMappingURL=streamingReceiver.js.map