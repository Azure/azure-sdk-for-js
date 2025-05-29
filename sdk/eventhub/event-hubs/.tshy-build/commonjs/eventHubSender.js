"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHubSender = void 0;
exports.generateIdempotentLinkProperties = generateIdempotentLinkProperties;
exports.transformEventsForSend = transformEventsForSend;
const rhea_promise_1 = require("rhea-promise");
const core_amqp_1 = require("@azure/core-amqp");
const eventData_js_1 = require("./eventData.js");
const eventDataBatch_js_1 = require("./eventDataBatch.js");
const logger_js_1 = require("./logger.js");
const retries_js_1 = require("./util/retries.js");
const constants_js_1 = require("./util/constants.js");
const core_util_1 = require("@azure/core-util");
const error_js_1 = require("./util/error.js");
const withAuth_js_1 = require("./withAuth.js");
const utils_js_1 = require("./util/utils.js");
/**
 * Describes the EventHubSender that will send event data to EventHub.
 * @internal
 */
class EventHubSender {
    /**
     * Creates a new EventHubSender instance.
     * @param context - The connection context.
     * @param options - Options used to configure the EventHubSender.
     */
    constructor(context, senderId, { partitionId, enableIdempotentProducer, partitionPublishingOptions }) {
        /**
         * The unique lock name per connection that is used to acquire the
         * lock for establishing a sender link by an entity on that connection.
         */
        this.senderLock = (0, utils_js_1.getRandomName)("sender");
        /**
         * Indicates whether the link is in the process of connecting
         * (establishing) itself. Default value: `false`.
         */
        this.isConnecting = false;
        this.address = context.config.getSenderAddress(partitionId);
        this.name = this.address;
        this._id = senderId;
        this.audience = context.config.getSenderAudience(partitionId);
        this._context = context;
        this.partitionId = partitionId;
        this._isIdempotentProducer = enableIdempotentProducer;
        this._userProvidedPublishingOptions = partitionPublishingOptions;
        const logPrefix = (0, logger_js_1.createSenderLogPrefix)(this.name, this._context.connectionId);
        this.logger = (0, logger_js_1.createSimpleLogger)(logger_js_1.logger, logPrefix);
        this._onAmqpError = (eventContext) => {
            const senderError = eventContext.sender && eventContext.sender.error;
            this.logger.verbose("'sender_error' event occurred. The associated error is: %O", senderError);
            // TODO: Consider rejecting promise in trySendBatch() or createBatch()
        };
        this._onSessionError = (eventContext) => {
            const sessionError = eventContext.session && eventContext.session.error;
            this.logger.verbose("'session_error' event occurred. The associated error is: %O", sessionError);
            // TODO: Consider rejecting promise in trySendBatch() or createBatch()
        };
        this._onAmqpClose = async (eventContext) => {
            const sender = this._sender || eventContext.sender;
            this.logger.verbose("'sender_close' event occurred. Value for isItselfClosed on the receiver is: '%s' " +
                "Value for isConnecting on the session is: '%s'.", sender === null || sender === void 0 ? void 0 : sender.isItselfClosed().toString(), this.isConnecting);
            if (sender && !this.isConnecting) {
                // Call close to clean up timers & other resources
                await sender.close().catch((err) => {
                    this.logger.verbose("error when closing after 'sender_close' event: %O", err);
                });
            }
        };
        this._onSessionClose = async (eventContext) => {
            const sender = this._sender || eventContext.sender;
            this.logger.verbose("'session_close' event occurred. Value for isSessionItselfClosed on the session is: '%s' " +
                "Value for isConnecting on the session is: '%s'.", sender === null || sender === void 0 ? void 0 : sender.isSessionItselfClosed().toString(), this.isConnecting);
            if (sender && !this.isConnecting) {
                // Call close to clean up timers & other resources
                await sender.close().catch((err) => {
                    this.logger.verbose("error when closing after 'session_close' event: %O", err);
                });
            }
        };
    }
    /**
     * Deletes the sender from the context. Clears the token renewal timer. Closes the sender link.
     */
    async close() {
        var _a;
        try {
            if (this._sender) {
                this.logger.info("closing");
                const senderLink = this._sender;
                this._deleteFromCache();
                await senderLink.close();
                (_a = this.authLoop) === null || _a === void 0 ? void 0 : _a.stop();
                this.logger.verbose("closed.");
            }
        }
        catch (err) {
            const msg = `an error occurred while closing: ${err === null || err === void 0 ? void 0 : err.name}: ${err === null || err === void 0 ? void 0 : err.message}`;
            this.logger.warning(msg);
            (0, logger_js_1.logErrorStackTrace)(err);
            throw err;
        }
    }
    /**
     * Determines whether the AMQP sender link is open. If open then returns true else returns false.
     * @returns boolean
     */
    isOpen() {
        const result = Boolean(this._sender && this._sender.isOpen());
        this.logger.verbose("is open? -> %s", result);
        return result;
    }
    /**
     * Returns maximum message size on the AMQP sender link.
     * @param abortSignal - An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     * @returns Promise<number>
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    async getMaxMessageSize(options = {}) {
        const sender = await this._getLink(options);
        return sender.maxMessageSize;
    }
    /**
     * Get the information about the state of publishing for a partition as observed by the `EventHubSender`.
     * This data can always be read, but will only be populated with information relevant to the active features
     * for the producer client.
     */
    async getPartitionPublishingProperties(options = {}) {
        var _a, _b;
        if (this._localPublishingProperties) {
            // Send a copy of the properties so it can't be mutated downstream.
            return Object.assign({}, this._localPublishingProperties);
        }
        const properties = {
            isIdempotentPublishingEnabled: this._isIdempotentProducer,
            partitionId: (_a = this.partitionId) !== null && _a !== void 0 ? _a : "",
        };
        if (this._isIdempotentProducer) {
            this._sender = await this._getLink(options);
            // await this._createLinkIfNotOpen(options);
            if (!this._sender) {
                // createLinkIfNotOpen should throw if `this._sender` can't be created, but just in case it gets
                // deleted while setting up token refreshing, make sure it exists.
                throw new Error(`Failed to retrieve partition publishing properties for partition "${this.partitionId}".`);
            }
            const { [constants_js_1.idempotentProducerAmqpPropertyNames.epoch]: ownerLevel, [constants_js_1.idempotentProducerAmqpPropertyNames.producerId]: producerGroupId, [constants_js_1.idempotentProducerAmqpPropertyNames.producerSequenceNumber]: lastPublishedSequenceNumber, } = (_b = this._sender.properties) !== null && _b !== void 0 ? _b : {};
            properties.ownerLevel = parseInt(ownerLevel, 10);
            properties.producerGroupId = parseInt(producerGroupId, 10);
            properties.lastPublishedSequenceNumber = parseInt(lastPublishedSequenceNumber, 10);
        }
        this._localPublishingProperties = properties;
        // Send a copy of the properties so it can't be mutated downstream.
        return Object.assign({}, properties);
    }
    /**
     * Send a batch of EventData to the EventHub. The "message_annotations",
     * "application_properties" and "properties" of the first message will be set as that
     * of the envelope (batch message).
     * @param events -  An array of EventData objects to be sent in a Batch message.
     * @param options - Options to control the way the events are batched along with request options
     */
    async send(events, options) {
        try {
            this.logger.info("trying to send EventData[].");
            if (this._isIdempotentProducer && this._hasPendingSend) {
                throw new Error(`There can only be 1 "sendBatch" call in-flight per partition while "enableIdempotentRetries" is set to true.`);
            }
            const eventCount = (0, eventDataBatch_js_1.isEventDataBatch)(events) ? events.count : events.length;
            if (eventCount === 0) {
                this.logger.info(`no events were passed to sendBatch.`);
                return;
            }
            if (this._isIdempotentProducer) {
                this._hasPendingSend = true;
            }
            this.logger.info("sending encoded batch message.");
            await this._trySendBatch(events, options);
            if (this._isIdempotentProducer) {
                commitIdempotentSequenceNumbers(events);
                if (this._localPublishingProperties) {
                    const { lastPublishedSequenceNumber = 0 } = this._localPublishingProperties;
                    // Increment the lastPublishedSequenceNumber based on the number of events published.
                    this._localPublishingProperties.lastPublishedSequenceNumber =
                        lastPublishedSequenceNumber + eventCount;
                }
            }
            return;
        }
        catch (err) {
            rollbackIdempotentSequenceNumbers(events);
            this.logger.warning(`an error occurred while sending the batch message ${err === null || err === void 0 ? void 0 : err.name}: ${err === null || err === void 0 ? void 0 : err.message}`);
            (0, logger_js_1.logErrorStackTrace)(err);
            throw err;
        }
        finally {
            if (this._isIdempotentProducer) {
                this._hasPendingSend = false;
            }
        }
    }
    /**
     * @param sender - The rhea sender that contains the idempotent producer properties.
     */
    _populateLocalPublishingProperties(sender) {
        var _a, _b;
        const { [constants_js_1.idempotentProducerAmqpPropertyNames.epoch]: ownerLevel, [constants_js_1.idempotentProducerAmqpPropertyNames.producerId]: producerGroupId, [constants_js_1.idempotentProducerAmqpPropertyNames.producerSequenceNumber]: lastPublishedSequenceNumber, } = (_a = sender.properties) !== null && _a !== void 0 ? _a : {};
        this._localPublishingProperties = {
            isIdempotentPublishingEnabled: this._isIdempotentProducer,
            partitionId: (_b = this.partitionId) !== null && _b !== void 0 ? _b : "",
            lastPublishedSequenceNumber,
            ownerLevel,
            producerGroupId,
        };
    }
    _deleteFromCache() {
        this._sender = undefined;
        delete this._context.senders[this.name];
        this.logger.verbose("deleted from the client cache.");
    }
    _createSenderOptions() {
        const srOptions = {
            name: this.name,
            source: this._id,
            target: {
                address: this.address,
            },
            onError: this._onAmqpError,
            onClose: this._onAmqpClose,
            onSessionError: this._onSessionError,
            onSessionClose: this._onSessionClose,
        };
        srOptions.desired_capabilities = [constants_js_1.geoReplication];
        if (this._isIdempotentProducer) {
            srOptions.desired_capabilities.push(constants_js_1.idempotentProducerAmqpPropertyNames.capability);
            const idempotentProperties = generateIdempotentLinkProperties(this._userProvidedPublishingOptions, this._localPublishingProperties);
            srOptions.properties = idempotentProperties;
        }
        this.logger.verbose("being created with options: %O", srOptions);
        return srOptions;
    }
    /**
     * Tries to send the message to EventHub if there is enough credit to send them
     * and the circular buffer has available space to settle the message after sending them.
     *
     * We have implemented a synchronous send over here in the sense that we shall be waiting
     * for the message to be accepted or rejected and accordingly resolve or reject the promise.
     * @param rheaMessage - The message to be sent to EventHub.
     * @returns Promise<void>
     */
    async _trySendBatch(events, options = {}) {
        const abortSignal = options.abortSignal;
        const retryOptions = options.retryOptions || {};
        const timeoutInMs = (0, retries_js_1.getRetryAttemptTimeoutInMs)(retryOptions);
        retryOptions.timeoutInMs = timeoutInMs;
        const sendEventPromise = async () => {
            var _a, _b;
            const initStartTime = Date.now();
            // TODO: (jeremymeng) A or B
            // variant A:
            const sender = await this._getLink(options);
            // variant B
            // await this._createLinkIfNotOpen(options);
            const publishingProps = await this.getPartitionPublishingProperties(options);
            const timeTakenByInit = Date.now() - initStartTime;
            this.logger.verbose("credit: %d available: %d", sender.credit, sender.session.outgoing.available());
            let waitTimeForSendable = 1000;
            if (!sender.sendable() && timeoutInMs - timeTakenByInit > waitTimeForSendable) {
                this.logger.verbose("waiting for 1 second for sender to become sendable");
                await (0, core_amqp_1.delay)(waitTimeForSendable);
                this.logger.verbose("after waiting for a second, credit: %d available: %d", sender.credit, (_b = (_a = sender.session) === null || _a === void 0 ? void 0 : _a.outgoing) === null || _b === void 0 ? void 0 : _b.available());
            }
            else {
                waitTimeForSendable = 0;
            }
            if (!sender.sendable()) {
                // let us retry to send the message after some time.
                const msg = `cannot send the message right now. Please try later.`;
                this.logger.warning(msg);
                const amqpError = {
                    condition: core_amqp_1.ErrorNameConditionMapper.SenderBusyError,
                    description: msg,
                };
                throw (0, core_amqp_1.translate)(amqpError);
            }
            if (timeoutInMs <= timeTakenByInit + waitTimeForSendable) {
                const desc = `was not able to send the message right now, due ` + `to operation timeout.`;
                this.logger.warning(desc);
                const e = {
                    condition: core_amqp_1.ErrorNameConditionMapper.ServiceUnavailableError,
                    description: desc,
                };
                throw (0, core_amqp_1.translate)(e);
            }
            try {
                const encodedMessage = transformEventsForSend(events, publishingProps, options);
                const delivery = await sender.send(encodedMessage, {
                    format: 0x80013700,
                    timeoutInSeconds: (timeoutInMs - timeTakenByInit - waitTimeForSendable) / 1000,
                    abortSignal,
                });
                this.logger.info("sent message with delivery id: %d", delivery.id);
            }
            catch (err) {
                const error = err.innerError || err;
                const translatedError = (0, error_js_1.translateError)(error);
                throw translatedError;
            }
        };
        const config = {
            operation: sendEventPromise,
            connectionId: this._context.connectionId,
            operationType: core_amqp_1.RetryOperationType.sendMessage,
            abortSignal: abortSignal,
            retryOptions: retryOptions,
        };
        try {
            await (0, core_amqp_1.retry)(config);
        }
        catch (err) {
            const translatedError = (0, core_amqp_1.translate)(err);
            this.logger.warning("an error occurred while sending the message %s", `${translatedError === null || translatedError === void 0 ? void 0 : translatedError.name}: ${translatedError === null || translatedError === void 0 ? void 0 : translatedError.message}`);
            (0, logger_js_1.logErrorStackTrace)(translatedError);
            throw translatedError;
        }
    }
    async _getLink(options = {}) {
        if (this.isOpen() && this._sender) {
            return this._sender;
        }
        const retryOptions = options.retryOptions || {};
        const timeoutInMs = (0, retries_js_1.getRetryAttemptTimeoutInMs)(retryOptions);
        retryOptions.timeoutInMs = timeoutInMs;
        const senderOptions = this._createSenderOptions();
        const startTime = Date.now();
        const createLinkPromise = async () => {
            return core_amqp_1.defaultCancellableLock.acquire(this.senderLock, () => {
                const taskStartTime = Date.now();
                const taskTimeoutInMs = timeoutInMs - (taskStartTime - startTime);
                return this._init(Object.assign(Object.assign({}, senderOptions), { abortSignal: options.abortSignal, timeoutInMs: taskTimeoutInMs }));
            }, { abortSignal: options.abortSignal, timeoutInMs: timeoutInMs });
        };
        const config = {
            operation: createLinkPromise,
            connectionId: this._context.connectionId,
            operationType: core_amqp_1.RetryOperationType.senderLink,
            abortSignal: options.abortSignal,
            retryOptions: retryOptions,
        };
        try {
            return await (0, core_amqp_1.retry)(config);
        }
        catch (err) {
            const translatedError = (0, core_amqp_1.translate)(err);
            this.logger.warning("an error occurred while creating: %s", `${translatedError === null || translatedError === void 0 ? void 0 : translatedError.name}: ${translatedError === null || translatedError === void 0 ? void 0 : translatedError.message}`);
            (0, logger_js_1.logErrorStackTrace)(translatedError);
            throw translatedError;
        }
    }
    /**
     * Initializes the sender session on the connection.
     * Should only be called from _createLinkIfNotOpen
     */
    async _init(options) {
        const createSender = async () => {
            this.logger.verbose("trying to be created...");
            const sender = await this._context.connection.createAwaitableSender(options);
            this._sender = sender;
            this._populateLocalPublishingProperties(this._sender);
            this.isConnecting = false;
            this.logger.verbose("created with options: %O", options);
            // It is possible for someone to close the sender and then start it again.
            // Thus make sure that the sender is present in the client cache.
            if (!this._context.senders[this.name])
                this._context.senders[this.name] = this;
        };
        try {
            if (!this.isOpen() || !this._sender) {
                await this._context.readyToOpenLink();
                this.authLoop = await (0, withAuth_js_1.withAuth)(createSender, this._context, this.audience, options.timeoutInMs, this.logger, { abortSignal: options.abortSignal });
                // it is guaranteed to be defined at this point, otherwise, an error would
                // have been thrown.
                return this._sender;
            }
            else {
                this.logger.verbose("is open -> %s. Hence not reconnecting.", this.isOpen());
                return this._sender;
            }
        }
        catch (err) {
            const translatedError = (0, core_amqp_1.translate)(err);
            this.logger.warning("an error occurred while being created: %s", `${translatedError === null || translatedError === void 0 ? void 0 : translatedError.name}: ${translatedError === null || translatedError === void 0 ? void 0 : translatedError.message}`);
            (0, logger_js_1.logErrorStackTrace)(translatedError);
            throw translatedError;
        }
    }
    /**
     * Creates a new sender to the given event hub, and optionally to a given partition if it is
     * not present in the context or returns the one present in the context.
     * @hidden
     * @param options - Options used to configure the EventHubSender.
     */
    static create(context, senderId, options) {
        const ehSender = new EventHubSender(context, senderId, options);
        if (!context.senders[ehSender.name]) {
            context.senders[ehSender.name] = ehSender;
        }
        return context.senders[ehSender.name];
    }
}
exports.EventHubSender = EventHubSender;
/**
 * Generates the link properties for an indemopotent sender given
 * based on the user-provided and locally-cached publishing options.
 *
 * Note: The set of idempotent properties a user specifies at EventHubProducerClient instantiation-time
 * is slightly different than what the service returns and the EventHubSender keeps track of locally.
 *
 * The difference is that the user specifies the `startingSequenceNumber`, whereas the local options
 * (those returned by getPartitionPublishingProperties) specifies `lastPublishedSequenceNumber`.
 *
 * These _can_ be the same, but the user is technically free to set any `startingSequenceNumber` they want.
 * @internal
 */
function generateIdempotentLinkProperties(userProvidedPublishingOptions, localPublishingOptions) {
    let ownerLevel;
    let producerGroupId;
    let sequenceNumber;
    // Prefer local publishing options since this is the up-to-date state of the sender.
    // Only use user-provided publishing options the first time we create the link.
    if (localPublishingOptions) {
        ownerLevel = localPublishingOptions.ownerLevel;
        producerGroupId = localPublishingOptions.producerGroupId;
        sequenceNumber = localPublishingOptions.lastPublishedSequenceNumber;
    }
    else if (userProvidedPublishingOptions) {
        ownerLevel = userProvidedPublishingOptions.ownerLevel;
        producerGroupId = userProvidedPublishingOptions.producerGroupId;
        sequenceNumber = userProvidedPublishingOptions.startingSequenceNumber;
    }
    else {
        // If we don't have any properties at all, send an empty object.
        // This will cause the service to generate a new producer-id for our client.
        return {};
    }
    // The service requires that if ANY_ of these properties are defined,
    // they _ALL_ have to be defined.
    // If we don't have one of the required values, use `null` and the
    // service will provide it.
    const idempotentLinkProperties = {
        [constants_js_1.idempotentProducerAmqpPropertyNames.epoch]: (0, core_util_1.isDefined)(ownerLevel)
            ? rhea_promise_1.types.wrap_short(ownerLevel)
            : null,
        [constants_js_1.idempotentProducerAmqpPropertyNames.producerId]: (0, core_util_1.isDefined)(producerGroupId)
            ? rhea_promise_1.types.wrap_long(producerGroupId)
            : null,
        [constants_js_1.idempotentProducerAmqpPropertyNames.producerSequenceNumber]: (0, core_util_1.isDefined)(sequenceNumber)
            ? rhea_promise_1.types.wrap_int(sequenceNumber)
            : null,
    };
    return idempotentLinkProperties;
}
/**
 * Encodes a list or batch of events into a single binary message that can be sent to the service.
 *
 * Prior to encoding, any special properties not specified by the user, such as tracing or idempotent
 * properties, are assigned to the list or batch of events as needed.
 *
 * @internal
 * @param events - Events to transform for sending to the service.
 * @param publishingProps - Describes the current publishing state for the partition.
 * @param options - Options used to configure this function.
 */
function transformEventsForSend(events, publishingProps, options = {}) {
    var _a;
    if ((0, eventDataBatch_js_1.isEventDataBatch)(events)) {
        return events._generateMessage(publishingProps);
    }
    else {
        const eventCount = events.length;
        // convert events to rhea messages
        const rheaMessages = [];
        const tracingProperties = (_a = options.tracingProperties) !== null && _a !== void 0 ? _a : [];
        for (let i = 0; i < eventCount; i++) {
            const originalEvent = events[i];
            const tracingProperty = tracingProperties[i];
            // Create a copy of the user's event so we can add the tracing property.
            const event = Object.assign(Object.assign({}, originalEvent), { properties: Object.assign(Object.assign({}, originalEvent.properties), tracingProperty) });
            const rheaMessage = (0, eventData_js_1.toRheaMessage)(event, options.partitionKey);
            // populate idempotent message annotations
            const { lastPublishedSequenceNumber = 0 } = publishingProps;
            const startingSequenceNumber = lastPublishedSequenceNumber + 1;
            const pendingPublishSequenceNumber = startingSequenceNumber + i;
            (0, eventData_js_1.populateIdempotentMessageAnnotations)(rheaMessage, Object.assign(Object.assign({}, publishingProps), { publishSequenceNumber: pendingPublishSequenceNumber }));
            if (publishingProps.isIdempotentPublishingEnabled) {
                // Set pending seq number on user's event.
                originalEvent[constants_js_1.PENDING_PUBLISH_SEQ_NUM_SYMBOL] =
                    pendingPublishSequenceNumber;
            }
            rheaMessages.push(rheaMessage);
        }
        // Encode every amqp message and then convert every encoded message to amqp data section
        const batchMessage = {
            body: rhea_promise_1.message.data_sections(rheaMessages.map(rhea_promise_1.message.encode)),
        };
        // Set message_annotations of the first message as
        // that of the envelope (batch message).
        if (rheaMessages[0].message_annotations) {
            batchMessage.message_annotations = Object.assign({}, rheaMessages[0].message_annotations);
        }
        // Finally encode the envelope (batch message).
        return rhea_promise_1.message.encode(batchMessage);
    }
}
/**
 * Commits the pending publish sequence number events.
 * EventDataBatch exposes this as `startingPublishSequenceNumber`,
 * EventData not in a batch exposes this as `publishedSequenceNumber`.
 */
function commitIdempotentSequenceNumbers(events) {
    if ((0, eventDataBatch_js_1.isEventDataBatch)(events)) {
        events._commitPublish();
    }
    else {
        // For each event, set the `publishedSequenceNumber` equal to the sequence number
        // we set when we attempted to send the events to the service.
        for (const event of events) {
            event._publishedSequenceNumber = event[constants_js_1.PENDING_PUBLISH_SEQ_NUM_SYMBOL];
            delete event[constants_js_1.PENDING_PUBLISH_SEQ_NUM_SYMBOL];
        }
    }
}
/**
 * Rolls back any pending publish sequence number in the events.
 */
function rollbackIdempotentSequenceNumbers(events) {
    if ((0, eventDataBatch_js_1.isEventDataBatch)(events)) {
        /* No action required. */
    }
    else {
        for (const event of events) {
            delete event[constants_js_1.PENDING_PUBLISH_SEQ_NUM_SYMBOL];
        }
    }
}
//# sourceMappingURL=eventHubSender.js.map