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
const rheaPromise = require("./rhea-promise");
const errors = require("./errors");
const Constants = require("./util/constants");
const events_1 = require("events");
const _1 = require(".");
const utils_1 = require("./util/utils");
const debug = debugModule("azure:event-hubs:receiver");
/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
 */
class EventHubReceiver extends events_1.EventEmitter {
    /**
     * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
     *
     * @constructor
     * @param {EventHubClient} client                            The EventHub client.
     * @param {string} partitionId                               Partition ID from which to receive.
     * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
     * @param {string} [options.consumerGroup]                   Consumer group from which to receive.
     * @param {number} [options.prefetchCount]                   The upper limit of events this receiver will
     * actively receive regardless of whether a receive operation is pending.
     * @param {boolean} [options.enableReceiverRuntimeMetric]    Provides the approximate receiver runtime information
     * for a logical partition of an Event Hub if the value is true. Default false.
     * @param {number} [options.epoch]                           The epoch value that this receiver is currently
     * using for partition ownership. A value of undefined means this receiver is not an epoch-based receiver.
     * @param {EventPosition} [options.eventPosition]            The position of EventData in the EventHub parition from
     * where the receiver should start receiving. Only one of offset, sequenceNumber, enqueuedTime, customFilter can be specified.
     * `EventPosition.withCustomFilter()` should be used if you want more fine-grained control of the filtering.
     * See https://github.com/Azure/amqpnetlite/wiki/Azure%20Service%20Bus%20Event%20Hubs for details.
     */
    constructor(context, partitionId, options) {
        super();
        /**
         * @property {number} [prefetchCount] The number of messages that the receiver can fetch/receive initially. Defaults to 500.
         */
        this.prefetchCount = 500;
        /**
         * @property {boolean} receiverRuntimeMetricEnabled Indicates whether receiver runtime metric is enabled. Default: false.
         */
        this.receiverRuntimeMetricEnabled = false;
        if (!options)
            options = {};
        this._context = context;
        this.name = options.name || uuid();
        this.partitionId = partitionId;
        this.consumerGroup = options.consumerGroup ? options.consumerGroup : Constants.defaultConsumerGroup;
        this.address = `${this._context.config.entityPath}/ConsumerGroups/${this.consumerGroup}/Partitions/${this.partitionId}`;
        this.audience = `${this._context.config.endpoint}${this.address}`;
        this.prefetchCount = options.prefetchCount !== undefined && options.prefetchCount !== null ? options.prefetchCount : Constants.defaultPrefetchCount;
        this.epoch = options.epoch;
        this.identifier = options.identifier;
        this.options = options;
        this.receiverRuntimeMetricEnabled = options.enableReceiverRuntimeMetric || false;
        this.runtimeInfo = {
            partitionId: `${partitionId}`
        };
        const onMessage = (context) => {
            const evData = _1.EventData.fromAmqpMessage(context.message);
            this.emit(Constants.message, evData);
        };
        const onError = (context) => __awaiter(this, void 0, void 0, function* () {
            this.emit(Constants.error, errors.translate(context.receiver.error));
            // Since the receiver received an error the link has been closed. So calling
            // this.close() will ensure that the receiver has been removed from the context.
            yield this.close();
        });
        this.on("newListener", (event) => {
            if (event === Constants.message) {
                if (this._session && this._receiver) {
                    debug("Attaching an event handler for the 'message' event on the underlying amqp receiver: ", this.name);
                    this._receiver.on(Constants.message, onMessage);
                }
            }
            if (event === Constants.error) {
                if (this._session && this._receiver) {
                    debug("Attaching an event handler for the 'receiver_error' event on the underlying amqp receiver: ", this.name);
                    this._receiver.on(Constants.receiverError, onError);
                }
            }
        });
        this.on("removeListener", (event) => {
            if (event === Constants.message) {
                if (this._session && this._receiver) {
                    debug("Removing an event handler for the 'message' event on the underlying amqp receiver: ", this.name);
                    this._receiver.removeListener(Constants.message, onMessage);
                }
            }
            if (event === Constants.error) {
                if (this._session && this._receiver) {
                    debug("Removing an event handler for the 'receiver_error' event on the underlying amqp receiver: ", this.name);
                    this._receiver.removeListener(Constants.receiverError, onError);
                }
            }
        });
    }
    /**
     * Creates a new AMQP receiver under a new AMQP session.
     * @returns {Promoise<void>}
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Acquire the lock and establish a cbs session if it does not exist on the connection.
                yield utils_1.defaultLock.acquire(this._context.cbsSession.cbsLock, () => { return this._context.cbsSession.init(this._context.connection); });
                const tokenObject = yield this._context.tokenProvider.getToken(this.audience);
                debug(`[${this._context.connectionId}] EH Receiver: calling negotiateClaim for audience "${this.audience}"`);
                // Negotiate the CBS claim.
                yield this._context.cbsSession.negotiateClaim(this.audience, this._context.connection, tokenObject);
                if (!this._session && !this._receiver) {
                    let receiverError;
                    const rcvrOptions = {
                        name: this.name,
                        autoaccept: true,
                        source: {
                            address: this.address
                        },
                        credit_window: this.prefetchCount,
                    };
                    if (this.epoch !== undefined && this.epoch !== null) {
                        if (!rcvrOptions.properties)
                            rcvrOptions.properties = {};
                        rcvrOptions.properties[Constants.attachEpoch] = rhea.types.wrap_long(this.epoch);
                    }
                    if (this.identifier) {
                        if (!rcvrOptions.properties)
                            rcvrOptions.properties = {};
                        rcvrOptions.properties[Constants.receiverIdentifierName] = this.identifier;
                    }
                    if (this.receiverRuntimeMetricEnabled) {
                        rcvrOptions.desired_capabilities = Constants.enableReceiverRuntimeMetricName;
                    }
                    if (this.options && this.options.eventPosition) {
                        // Set filter on the receiver if event position is specified.
                        const filterClause = this.options.eventPosition.getExpression();
                        if (filterClause) {
                            rcvrOptions.source.filter = {
                                "apache.org:selector-filter:string": rhea.types.wrap_described(filterClause, 0x468C00000004)
                            };
                        }
                    }
                    this._session = yield rheaPromise.createSession(this._context.connection);
                    const handleReceiverError = (context) => {
                        receiverError = errors.translate(context.receiver.error);
                        debug(`An error occurred while creating the receiver "${this.name}" : `, receiverError);
                    };
                    this._session.on(Constants.receiverError, handleReceiverError);
                    debug("Trying to create a receiver...");
                    this._receiver = yield rheaPromise.createReceiver(this._session, rcvrOptions);
                    debug("Promise to create the receiver resolved. Created receiver with name: ", this.name);
                    if (receiverError) {
                        // There are cases where the EH service sends an attach frame, which causes rhea to emit receiver_open event
                        // thus resolving the promise to create a receiver and moments later the service sends back a detach frame
                        // indicating that there was some error. Hence we check for receiverError, even after the promise has resolved.
                        debug("throwing the receiverError, ", receiverError);
                        throw receiverError;
                    }
                    this._session.removeListener(Constants.receiverError, handleReceiverError);
                    debug(`[${this._context.connectionId}] Receiver "${this.name}" created with receiver options: \n${JSON.stringify(rcvrOptions, undefined, 2)}`);
                }
                debug(`[${this._context.connectionId}] Negotatited claim for receiver "${this.name}" with with partition "${this.partitionId}"`);
                this._ensureTokenRenewal();
            }
            catch (err) {
                if (err.value || (err.constructor && err.constructor.name === "c"))
                    err = _1.Errors.translate(err);
                debug("Will reject the promise to create the receiver with error: %O", err);
                throw (err);
            }
        });
    }
    /**
     * Receive a batch of EventDatas from an EventHub partition for a given count and a given max wait time in seconds, whichever
     * happens first.
     *
     * @param {number} maxMessageCount                         The maximum message count. Must be a value greater than 0.
     * @param {number} [maxWaitTimeInSeconds]          The maximum wait time in seconds for which the Receiver should wait
     * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
     * @returns {Promise<EventData[]>} A promise that resolves with an array of EventData objects.
     */
    receive(maxMessageCount, maxWaitTimeInSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!maxMessageCount || (maxMessageCount && typeof maxMessageCount !== 'number')) {
                throw new Error("'maxMessageCount' is a required parameter of type number with a value greater than 0.");
            }
            if (maxWaitTimeInSeconds == undefined) {
                maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
            }
            if (!this._session || !this._receiver) {
                throw _1.Errors.translate({ condition: _1.Errors.ConditionStatusMapper[404], description: "The messaging entity underlying amqp receiver could not be found." });
            }
            const eventDatas = [];
            let timeOver = false;
            return new Promise((resolve, reject) => {
                let onReceiveMessage;
                let waitTimer;
                let actionAfterWaitTimeout;
                // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
                const finalAction = (timeOver, data) => {
                    // Remove the listener to avoid receiving duplicate messages.
                    this.removeListener(Constants.message, onReceiveMessage);
                    if (!data) {
                        data = eventDatas.length ? eventDatas[eventDatas.length - 1] : undefined;
                    }
                    if (!timeOver) {
                        clearTimeout(waitTimer);
                    }
                    if (this.receiverRuntimeMetricEnabled && data) {
                        this.runtimeInfo.lastSequenceNumber = data.lastSequenceNumber;
                        this.runtimeInfo.lastEnqueuedTimeUtc = data.lastEnqueuedTime;
                        this.runtimeInfo.lastEnqueuedOffset = data.lastEnqueuedOffset;
                        this.runtimeInfo.retrievalTime = data.retrievalTime;
                    }
                    resolve(eventDatas);
                };
                // Action to be performed after the max wait time is over.
                actionAfterWaitTimeout = () => {
                    timeOver = true;
                    finalAction(timeOver);
                };
                // Action to be performed on the "message" event.
                onReceiveMessage = (data) => {
                    if (eventDatas.length <= maxMessageCount) {
                        eventDatas.push(data);
                    }
                    if (eventDatas.length === maxMessageCount) {
                        finalAction(timeOver, data);
                    }
                };
                waitTimer = setTimeout(actionAfterWaitTimeout, maxWaitTimeInSeconds * 1000);
                // Action to be taken when an error is received.
                const onReceiveError = (error) => {
                    debug(`[${this._context.connectionId}] Receiver "${this.name}" received an error: \n ${JSON.stringify(error, undefined, 2)}`);
                    this.removeListener(Constants.error, onReceiveError);
                    this.removeListener(Constants.message, onReceiveMessage);
                    if (waitTimer) {
                        clearTimeout(waitTimer);
                    }
                    reject(error);
                };
                this.on(Constants.message, onReceiveMessage);
            });
        });
    }
    /**
     * Closes the underlying AMQP receiver.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._receiver) {
                try {
                    // TODO: should I call _receiver.detach() or _receiver.close()?
                    // should I also call this._session.close() after closing the reciver
                    // or can I directly close the session which will take care of closing the receiver as well.
                    yield rheaPromise.closeReceiver(this._receiver);
                    this.removeAllListeners();
                    delete this._context.receivers[this.name];
                    debug(`Deleted the receiver "${this.name}" from the client cache.`);
                    this._receiver = undefined;
                    this._session = undefined;
                    clearTimeout(this._tokenRenewalTimer);
                    debug(`[${this._context.connectionId}] Receiver "${this.name}" has been closed.`);
                }
                catch (err) {
                    debug("An error occurred while closing the receiver %O", err);
                    throw err;
                }
            }
        });
    }
    /**
     * Ensures that the token is renewed within the predfiend renewal margin.
     */
    _ensureTokenRenewal() {
        const tokenValidTimeInSeconds = this._context.tokenProvider.tokenValidTimeInSeconds;
        const tokenRenewalMarginInSeconds = this._context.tokenProvider.tokenRenewalMarginInSeconds;
        const nextRenewalTimeout = (tokenValidTimeInSeconds - tokenRenewalMarginInSeconds) * 1000;
        this._tokenRenewalTimer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.init();
            }
            catch (err) {
                // TODO: May be add some retries over here before emitting the error.
                debug(`[${this._context.connectionId}] Receiver "${this.name}", an error occurred while renewing the token:\n${JSON.stringify(err)}.`);
                this.emit(Constants.error, errors.translate(err));
            }
        }), nextRenewalTimeout);
        debug(`[${this._context.connectionId}] Receiver "${this.name}", has next token renewal in ${nextRenewalTimeout / 1000} seconds ` +
            `@(${new Date(Date.now() + nextRenewalTimeout).toString()}).`);
    }
}
exports.EventHubReceiver = EventHubReceiver;
//# sourceMappingURL=eventHubReceiver.js.map