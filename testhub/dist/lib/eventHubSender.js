"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const rhea = require("rhea");
const debugModule = require("debug");
const errors = require("./errors");
const rheaPromise = require("./rhea-promise");
const Constants = require("./util/constants");
const events_1 = require("events");
const _1 = require(".");
const utils_1 = require("./util/utils");
const debug = debugModule("azure:event-hubs:sender");
/**
 * Instantiates a new sender from the AMQP `Sender`. Used by `EventHubClient`.
 *
 * @param {any} session - The amqp session on which the amqp sender link was created.
 * @param {any} sender - The amqp sender link.
 * @constructor
 */
class EventHubSender extends events_1.EventEmitter {
    /**
     * Creates a new EventHubSender instance.
     * @constructor
     * @param {EventHubClient} client The EventHub client.
     * @param {string|number} [partitionId] The EventHub partition id to which the sender wants to send the event data.
     */
    constructor(context, partitionId) {
        super();
        this._context = context;
        this.address = this._context.config.entityPath;
        this.partitionId = partitionId;
        if (this.partitionId !== null && this.partitionId !== undefined) {
            this.address += `/Partitions/${this.partitionId}`;
        }
        this.audience = `${this._context.config.endpoint}${this.address}`;
        const onError = (context) => {
            this.emit(Constants.error, errors.translate(context.sender.error));
        };
        this.on("newListener", (event) => {
            if (event === Constants.error) {
                if (this._session && this._sender) {
                    debug("Attaching an event handler for the 'sender_error' event on the underlying amqp sender: ", this.name);
                    this._sender.on(Constants.senderError, onError);
                }
            }
        });
        this.on("removeListener", (event) => {
            if (event === Constants.error) {
                if (this._session && this._sender) {
                    debug("Removing an event handler for the 'sender_error' event on the underlying amqp sender: ", this.name);
                    this._sender.removeListener(Constants.senderError, onError);
                }
            }
        });
    }
    /**
     * Initializes the sender session on the connection.
     * @returns {Promoise<void>}
     */
    async init() {
        try {
            // Acquire the lock and establish a cbs session if it does not exist on the connection. Although node.js
            // is single threaded, we need a locking mechanism to ensure that a race condition does not happen while
            // creating a shared resource (in this case the cbs session, since we want to have exactly 1 cbs session
            // per connection).
            debug(`Acquiring lock: ${this._context.cbsSession.cbsLock} for creating the cbs session while creating` +
                ` the sender.`);
            await utils_1.defaultLock.acquire(this._context.cbsSession.cbsLock, () => { return this._context.cbsSession.init(this._context.connection); });
            const tokenObject = await this._context.tokenProvider.getToken(this.audience);
            debug(`[${this._context.connectionId}] EH Sender: calling negotiateClaim for audience "${this.audience}".`);
            // Negotitate the CBS claim.
            await this._context.cbsSession.negotiateClaim(this.audience, this._context.connection, tokenObject);
            if (!this._session && !this._sender) {
                let senderError;
                this._session = await rheaPromise.createSession(this._context.connection);
                const handleSenderError = (context) => {
                    senderError = _1.Errors.translate(context.sender.error);
                    debug(`An error occurred while creating the sender "${this.name}" : `, senderError);
                };
                this._session.on(Constants.senderError, handleSenderError);
                let options = {
                    target: {
                        address: this.address
                    }
                };
                debug("Trying to create a sender...");
                this._sender = await rheaPromise.createSender(this._session, options);
                this.name = this._sender.name;
                debug("Promise to create the sender resolved. Created sender with name: ", this.name);
                if (senderError) {
                    // There are cases where the EH service sends an attach frame, which causes rhea to emit sender_open event
                    // thus resolving the promise to create a sender and moments later the service sends back a detach frame
                    // indicating that there was some error. Hence we check for senderError, even after the promise has resolved.
                    debug("throwing the senderError, ", senderError);
                    throw senderError;
                }
                this._session.removeListener(Constants.senderError, handleSenderError);
                debug(`[${this._context.connectionId}] Sender "${this.name}" created with sender options: \n${JSON.stringify(options, undefined, 2)}`);
            }
            debug(`[${this._context.connectionId}] Negotatited claim for sender "${this.name}" with with partition` +
                ` "${this.partitionId}"`);
            this._ensureTokenRenewal();
        }
        catch (err) {
            if (err.value || (err.constructor && err.constructor.name === "c"))
                err = _1.Errors.translate(err);
            debug("Will reject the promise to create the sender with error", err);
            return Promise.reject(err);
        }
    }
    /**
     * Sends the given message, with the given options on this link
     *
     * @method send
     * @param {any} data               Message to send.  Will be sent as UTF8-encoded JSON string.
     * @param {string} [partitionKey]  Partition key - sent as x-opt-partition-key, and will hash to a partitionId.
     * @returns {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    async send(data, partitionKey) {
        try {
            if (!data || (data && typeof data !== "object")) {
                throw new Error("data is required and it must be of type object.");
            }
            if (partitionKey && typeof partitionKey !== "string") {
                throw new Error("partitionKey must be of type string");
            }
            if (!this._session && !this._sender) {
                throw _1.Errors.translate({ condition: _1.Errors.ConditionStatusMapper[404], description: "The messaging entity underlying amqp sender could not be found." });
            }
            let message = _1.EventData.toAmqpMessage(data);
            if (partitionKey) {
                if (!message.message_annotations)
                    message.message_annotations = {};
                message.message_annotations[Constants.partitionKey] = partitionKey;
            }
            return await this._trySend(message);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Send a batch of EventData to the EventHub.
     * @param {Array<EventData>} datas  An array of EventData objects to be sent in a Batch message.
     * @param {string} [partitionKey]   Partition key - sent as x-opt-partition-key, and will hash to a partitionId.
     * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    async sendBatch(datas, partitionKey) {
        try {
            if (!datas || (datas && !Array.isArray(datas))) {
                throw new Error("data is required and it must be an Array.");
            }
            if (partitionKey && typeof partitionKey !== "string") {
                throw new Error("partitionKey must be of type string");
            }
            if (!this._session && !this._sender) {
                throw _1.Errors.translate({ condition: _1.Errors.ConditionStatusMapper[404], description: "The messaging entity underlying amqp sender could not be found." });
            }
            debug(`[${this._context.connectionId}] Sender "${this.name}", trying to send EventData[].`, datas);
            let messages = [];
            // Convert EventData to AmqpMessage.
            for (let i = 0; i < datas.length; i++) {
                let message = _1.EventData.toAmqpMessage(datas[i]);
                if (partitionKey) {
                    if (!message.message_annotations)
                        message.message_annotations = {};
                    message.message_annotations[Constants.partitionKey] = partitionKey;
                }
                messages[i] = message;
            }
            // Encode every amqp message and then convert every encoded message to amqp data section
            let batchMessage = {
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
            if (messages[0].properties) {
                batchMessage.properties = messages[0].properties;
            }
            // Finally encode the envelope (batch message).
            const encodedBatchMessage = rhea.message.encode(batchMessage);
            debug(`[${this._context.connectionId}] Sender "${this.name}", ` +
                `sending encoded batch message.`, encodedBatchMessage);
            return await this._trySend(encodedBatchMessage, undefined, 0x80013700);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * "Unlink" this sender, closing the link and resolving when that operation is complete.
     * Leaves the underlying connection/session open.
     * @method close
     * @return {Promise<void>} Promise<void>
     */
    async close() {
        if (this._sender) {
            try {
                await rheaPromise.closeSender(this._sender);
                this.removeAllListeners();
                delete this._context.senders[this.name];
                debug(`Deleted the sender "${this.name}" from the client cache.`);
                this._sender = undefined;
                this._session = undefined;
                clearTimeout(this._tokenRenewalTimer);
                debug(`[${this._context.connectionId}] Sender "${this.name}" closed.`);
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    }
    /**
     * Tries to send the message to EventHub if there is enough credit to send them
     * and the circular buffer has available space to settle the message after sending them.
     *
     * We have implemented a synchronous send over here. We shall be waiting for the message
     * to be accepted or rejected and accordingly resolve or reject the promise.
     *
     * @param message The message to be sent to EventHub.
     * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    _trySend(message, tag, format) {
        return new Promise((resolve, reject) => {
            debug(`[${this._context.connectionId}] Sender "${this.name}", credit: ${this._sender.credit}, ` +
                `available: ${this._sender.session.outgoing.available()}.`);
            if (this._sender.sendable()) {
                debug(`[${this._context.connectionId}] Sender "${this.name}", sending message: \n`, message);
                let onRejected;
                const onAccepted = (context) => {
                    // Since we will be adding listener for accepted and rejected event every time
                    // we send a message, we need to remove listener for both the events.
                    // This will ensure duplicate listeners are not added for the same event.
                    this._sender.removeListener("accepted", onAccepted);
                    this._sender.removeListener("rejected", onRejected);
                    debug(`[${this._context.connectionId}] Sender "${this.name}", got event accepted.`);
                    resolve(context.delivery);
                };
                onRejected = (context) => {
                    this._sender.removeListener("rejected", onRejected);
                    this._sender.removeListener("accepted", onAccepted);
                    debug(`[${this._context.connectionId}] Sender "${this.name}", got event accepted.`);
                    reject(errors.translate(context.delivery.remote_state.error));
                };
                this._sender.on("accepted", onAccepted);
                this._sender.on("rejected", onRejected);
                const delivery = this._sender.send(message, tag, format);
                debug(`[${this._context.connectionId}] Sender "${this.name}", sent message with delivery id: ${delivery.id}`);
            }
            else {
                // This case should technically not happen. rhea starts the sender credit with 1000 and the circular buffer with a size
                // of 2048. It refreshes the credit and replenishes the circular buffer capacity as it processes the message transfer.
                // In case we end up here, we shall retry sending the message after 5 seconds. This should be a reasonable time for the
                // sender to be sendable again.
                debug(`[${this._context.connectionId}] Sender "${this.name}", not enough capacity to send messages. Will retry in 5 seconds.`);
                setTimeout(() => {
                    debug(`[${this._context.connectionId}] Sender "${this.name}", timeout complete. Will try sending the message.`);
                    resolve(this._trySend(message, tag, format));
                }, 5000);
            }
        });
    }
    /**
     * Ensures that the token is renewed within the predfiend renewal margin.
     * @private
     * @returns {void}
     */
    _ensureTokenRenewal() {
        const tokenValidTimeInSeconds = this._context.tokenProvider.tokenValidTimeInSeconds;
        const tokenRenewalMarginInSeconds = this._context.tokenProvider.tokenRenewalMarginInSeconds;
        const nextRenewalTimeout = (tokenValidTimeInSeconds - tokenRenewalMarginInSeconds) * 1000;
        this._tokenRenewalTimer = setTimeout(async () => await this.init(), nextRenewalTimeout);
        debug(`[${this._context.connectionId}] Sender "${this.name}", has next token renewal in ` +
            `${nextRenewalTimeout / 1000} seconds @(${new Date(Date.now() + nextRenewalTimeout).toString()}).`);
    }
}
exports.EventHubSender = EventHubSender;
