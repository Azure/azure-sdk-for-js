"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rhea = require("rhea");
const debugModule = require("debug");
const uuid = require("uuid/v4");
const errors_1 = require("./errors");
const rpc = require("./rpc");
const rheaPromise = require("./rhea-promise");
const eventData_1 = require("./eventData");
const utils_1 = require("./util/utils");
const retry_1 = require("./retry");
const debug = debugModule("azure:event-hubs:sender");
/**
 * Instantiates a new sender from the AMQP `Sender`. Used by `EventHubClient`.
 *
 * @param {any} session - The amqp session on which the amqp sender link was created.
 * @param {any} sender - The amqp sender link.
 * @constructor
 */
class EventHubSender {
    /**
     * Creates a new EventHubSender instance.
     * @constructor
     * @param {EventHubClient} client The EventHub client.
     * @param {string|number} [partitionId] The EventHub partition id to which the sender
     * wants to send the event data.
     */
    constructor(context, partitionId, name) {
        this.senderLock = `sender-${uuid()}`;
        this._context = context;
        this.name = name || uuid();
        this.address = this._context.config.entityPath;
        this.partitionId = partitionId;
        if (this.partitionId !== null && this.partitionId !== undefined) {
            this.address += `/Partitions/${this.partitionId}`;
        }
        this.audience = `${this._context.config.endpoint}${this.address}`;
    }
    /**
     * Sends the given message, with the given options on this link
     *
     * @method send
     * @param {any} data Message to send.  Will be sent as UTF8-encoded JSON string.
     * @returns {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!data || (data && typeof data !== "object")) {
                    throw new Error("data is required and it must be of type object.");
                }
                if (!this._isOpen()) {
                    debug("Acquiring lock %s for initializing the session, sender and " +
                        "possibly the connection.", this.senderLock);
                    yield utils_1.defaultLock.acquire(this.senderLock, () => { return this._init(); });
                }
                const message = eventData_1.EventData.toAmqpMessage(data);
                return yield this._trySend(message);
            }
            catch (err) {
                debug("An error occurred while sending the message %O", err);
                throw err;
            }
        });
    }
    /**
     * Send a batch of EventData to the EventHub. The "message_annotations",
     * "application_properties" and "properties" of the first message will be set as that
     * of the envelope (batch message).
     * @param {Array<EventData>} datas  An array of EventData objects to be sent in a Batch message.
     * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    sendBatch(datas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!datas || (datas && !Array.isArray(datas))) {
                    throw new Error("data is required and it must be an Array.");
                }
                if (!this._isOpen()) {
                    debug("Acquiring lock %s for initializing the session, sender and " +
                        "possibly the connection.", this.senderLock);
                    yield utils_1.defaultLock.acquire(this.senderLock, () => { return this._init(); });
                }
                debug("[%s] Sender '%s', trying to send EventData[]: %O", this._context.connectionId, this.name, datas);
                const messages = [];
                // Convert EventData to AmqpMessage.
                for (let i = 0; i < datas.length; i++) {
                    const message = eventData_1.EventData.toAmqpMessage(datas[i]);
                    messages[i] = message;
                }
                // Encode every amqp message and then convert every encoded message to amqp data section
                const batchMessage = {
                    body: rhea.message.data_sections(messages.map(rhea.message.encode))
                };
                // Set message_annotations, application_properties and properties of the first message as
                // that of the envelope (batch message).
                if (messages[0].message_annotations) {
                    batchMessage.message_annotations = messages[0].message_annotations;
                }
                if (messages[0].application_properties) {
                    batchMessage.application_properties = messages[0].application_properties;
                }
                for (const prop of eventData_1.messageProperties) {
                    if (messages[0][prop]) {
                        batchMessage[prop] = messages[0][prop];
                    }
                }
                // Finally encode the envelope (batch message).
                const encodedBatchMessage = rhea.message.encode(batchMessage);
                debug("[%s]Sender '%s', sending encoded batch message.", this._context.connectionId, this.name, encodedBatchMessage);
                return yield this._trySend(encodedBatchMessage, undefined, 0x80013700);
            }
            catch (err) {
                debug("An error occurred while sending the batch message %O", err);
                throw err;
            }
        });
    }
    /**
     * "Unlink" this sender, closing the link and resolving when that operation is complete.
     * Leaves the underlying connection open.
     * @method close
     * @return {Promise<void>} Promise<void>
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._sender) {
                try {
                    yield rheaPromise.closeSender(this._sender);
                    delete this._context.senders[this.name];
                    debug("[%s] Deleted the sender '%s' from the client cache.", this._context.connectionId, this.name);
                    this._sender = undefined;
                    this._session = undefined;
                    clearTimeout(this._tokenRenewalTimer);
                    debug("[%s]Sender '%s' closed.", this._context.connectionId, this.name);
                }
                catch (err) {
                    debug("An error occurred while closing the sender %O", err);
                    throw err;
                }
            }
        });
    }
    _createSenderOptions() {
        const options = {
            name: this.name,
            target: {
                address: this.address
            }
        };
        debug("Creating sender with options: %O", options);
        return options;
    }
    /**
     * Tries to send the message to EventHub if there is enough credit to send them
     * and the circular buffer has available space to settle the message after sending them.
     *
     * We have implemented a synchronous send over here in the sense that we shall be waiting
     * for the message to be accepted or rejected and accordingly resolve or reject the promise.
     *
     * @param message The message to be sent to EventHub.
     * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    _trySend(message, tag, format) {
        const sendEventPromise = new Promise((resolve, reject) => {
            debug("[%s] Sender '%s', credit: %d available: %d", this._context.connectionId, this.name, this._sender.credit, this._sender.session.outgoing.available());
            if (this._sender.sendable()) {
                debug("[%s] Sender '%s', sending message: %O", this._context.connectionId, this.name, message);
                let onRejected;
                let onReleased;
                let onModified;
                let onAccepted;
                const removeListeners = () => {
                    this._sender.removeListener("rejected", onRejected);
                    this._sender.removeListener("accepted", onAccepted);
                    this._sender.removeListener("released", onReleased);
                    this._sender.removeListener("modified", onModified);
                };
                onAccepted = (context) => {
                    // Since we will be adding listener for accepted and rejected event every time
                    // we send a message, we need to remove listener for both the events.
                    // This will ensure duplicate listeners are not added for the same event.
                    removeListeners();
                    debug("[%s] Sender '%s', got event accepted.", this._context.connectionId, this.name);
                    resolve(context.delivery);
                };
                onRejected = (context) => {
                    removeListeners();
                    debug("[%s] Sender '%s', got event rejected.", this._context.connectionId, this.name);
                    reject(errors_1.translate(context.delivery.remote_state.error));
                };
                onReleased = (context) => {
                    removeListeners();
                    debug("[%s] Sender '%s', got event released.", this._context.connectionId, this.name);
                    let err;
                    if (context.delivery.remote_state.error) {
                        err = errors_1.translate(context.delivery.remote_state.error);
                    }
                    else {
                        err = new Error(`[${this._context.connectionId}] Sender '${this.name}', ` +
                            `received a release disposition. Hence we are rejecting the promise.`);
                    }
                    reject(err);
                };
                onModified = (context) => {
                    removeListeners();
                    debug("[%s] Sender '%s', got event modified.", this._context.connectionId, this.name);
                    let err;
                    if (context.delivery.remote_state.error) {
                        err = errors_1.translate(context.delivery.remote_state.error);
                    }
                    else {
                        err = new Error(`[${this._context.connectionId}] Sender "${this.name}", ` +
                            `received a modified disposition. Hence we are rejecting the promise.`);
                    }
                    reject(err);
                };
                this._sender.on("accepted", onAccepted);
                this._sender.on("rejected", onRejected);
                this._sender.on("modified", onModified);
                this._sender.on("released", onReleased);
                const delivery = this._sender.send(message, tag, format);
                debug("[%s] Sender '%s', sent message with delivery id: %d", this._context.connectionId, this.name, delivery.id);
            }
            else {
                const msg = `[${this._context.connectionId}] Sender "${this.name}", ` +
                    `cannot send the message right now. Please try later.`;
                debug(msg);
                reject(new Error(msg));
            }
        });
        return retry_1.retry(() => sendEventPromise);
    }
    /**
     * Determines whether the AMQP sender link is open. If open then returns true else returns false.
     * @private
     *
     * @return {boolean} boolean
     */
    _isOpen() {
        let result = false;
        if (this._session && this._sender) {
            if (this._sender.is_open && this._sender.is_open()) {
                result = true;
            }
        }
        return result;
    }
    /**
     * Initializes the sender session on the connection.
     * @returns {Promise<void>}
     */
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Acquire the lock and establish an amqp connection if it does not exist.
                if (!this._context.connection) {
                    debug("[%s] EH Sender '%s' establishing an AMQP connection.", this._context.connectionId, this.name);
                    yield utils_1.defaultLock.acquire(this._context.connectionLock, () => { return rpc.open(this._context); });
                }
                if (!this._session && !this._sender) {
                    yield this._negotiateClaim();
                    const onAmqpError = (context) => {
                        const senderError = errors_1.translate(context.sender.error);
                        // TODO: Should we retry before calling user's error method?
                        debug("[%s] An error occurred for sender '%s': %O.", this._context.connectionId, this.name, senderError);
                    };
                    this._session = yield rheaPromise.createSession(this._context.connection);
                    debug("[%s] Trying to create sender '%s'...", this._context.connectionId, this.name);
                    const options = this._createSenderOptions();
                    this._sender = yield rheaPromise.createSenderWithHandlers(this._session, onAmqpError, options);
                    debug("[%s] Promise to create the sender resolved. Created sender with name: %s", this._context.connectionId, this.name);
                    debug("[%s] Sender '%s' created with sender options: %O", this._context.connectionId, this.name, options);
                    // It is possible for someone to close the sender and then start it again.
                    // Thus make sure that the sender is present in the client cache.
                    if (!this._context.senders[this.address])
                        this._context.senders[this.address] = this;
                    yield this._ensureTokenRenewal();
                }
            }
            catch (err) {
                err = errors_1.translate(err);
                debug("[%s] An error occurred while creating the sender %s", this._context.connectionId, this.name, err);
                throw err;
            }
        });
    }
    /**
     * Negotiates the cbs claim for the EventHub Sender.
     * @private
     * @param {boolean} [setTokenRenewal] Set the token renewal timer. Default false.
     * @return {Promise<void>} Promise<void>
     */
    _negotiateClaim(setTokenRenewal) {
        return __awaiter(this, void 0, void 0, function* () {
            // Acquire the lock and establish a cbs session if it does not exist on the connection.
            // Although node.js is single threaded, we need a locking mechanism to ensure that a
            // race condition does not happen while creating a shared resource (in this case the
            // cbs session, since we want to have exactly 1 cbs session per connection).
            debug("[%s] Acquiring lock: '%s' for creating the cbs session while creating the sender: '%s'.", this._context.connectionId, this._context.cbsSession.cbsLock, this.name);
            yield utils_1.defaultLock.acquire(this._context.cbsSession.cbsLock, () => { return this._context.cbsSession.init(this._context.connection); });
            const tokenObject = yield this._context.tokenProvider.getToken(this.audience);
            debug("[%s] EH Sender: calling negotiateClaim for audience '%s'.", this._context.connectionId, this.audience);
            // Acquire the lock to negotiate the CBS claim.
            debug("[%s] Acquiring lock: '%s' for cbs auth for sender: '%s'.", this._context.connectionId, this._context.negotiateClaimLock, this.name);
            yield utils_1.defaultLock.acquire(this._context.negotiateClaimLock, () => {
                return this._context.cbsSession.negotiateClaim(this.audience, this._context.connection, tokenObject);
            });
            debug("[%s] Negotiated claim for sender '%s' with with partition: %s", this._context.connectionId, this.partitionId);
            if (setTokenRenewal) {
                yield this._ensureTokenRenewal();
            }
        });
    }
    /**
     * Ensures that the token is renewed within the predefined renewal margin.
     * @private
     * @returns {void}
     */
    _ensureTokenRenewal() {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenValidTimeInSeconds = this._context.tokenProvider.tokenValidTimeInSeconds;
            const tokenRenewalMarginInSeconds = this._context.tokenProvider.tokenRenewalMarginInSeconds;
            const nextRenewalTimeout = (tokenValidTimeInSeconds - tokenRenewalMarginInSeconds) * 1000;
            this._tokenRenewalTimer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this._negotiateClaim(true);
                }
                catch (err) {
                    // TODO: May be add some retries over here before emitting the error.
                    debug("[%s] Sender '%s', an error occurred while renewing the token: %O", this._context.connectionId, this.name, err);
                }
            }), nextRenewalTimeout);
            debug("[%s]Sender '%s', has next token renewal in %d seconds @(%s).", nextRenewalTimeout / 1000, new Date(Date.now() + nextRenewalTimeout).toString());
        });
    }
    /**
     * Creates a new sender to the given event hub, and optionally to a given partition if it is
     * not present in the context or returns the one present in the context.
     * @static
     * @param {(string|number)} [partitionId] Partition ID to which it will send event data.
     * @returns {Promise<EventHubSender>}
     */
    static create(context, partitionId) {
        if (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number") {
            throw new Error("'partitionId' must be of type: 'string' | 'number'.");
        }
        const ehSender = new EventHubSender(context, partitionId);
        if (!context.senders[ehSender.address]) {
            context.senders[ehSender.address] = ehSender;
        }
        return context.senders[ehSender.address];
    }
}
exports.EventHubSender = EventHubSender;
