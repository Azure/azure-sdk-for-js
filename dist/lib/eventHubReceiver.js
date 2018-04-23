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
const rpc = require("./rpc");
const errors_1 = require("./errors");
const Constants = require("./util/constants");
const _1 = require(".");
const utils_1 = require("./util/utils");
const debug = debugModule("azure:event-hubs:receiver");
/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
 */
class EventHubReceiver {
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
        /**
         * @property {number} [prefetchCount] The number of messages that the receiver can fetch/receive initially. Defaults to 1000.
         */
        this.prefetchCount = Constants.defaultPrefetchCount;
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
        this._onAmqpMessage = (context) => {
            const evData = _1.EventData.fromAmqpMessage(context.message);
            if (this.receiverRuntimeMetricEnabled && evData) {
                this.runtimeInfo.lastSequenceNumber = evData.lastSequenceNumber;
                this.runtimeInfo.lastEnqueuedTimeUtc = evData.lastEnqueuedTime;
                this.runtimeInfo.lastEnqueuedOffset = evData.lastEnqueuedOffset;
                this.runtimeInfo.retrievalTime = evData.retrievalTime;
            }
            this._onMessage(evData);
        };
        this._onAmqpError = (context) => {
            const ehError = errors_1.translate(context.receiver.error);
            // TODO: Should we retry before calling user's error method?
            debug("[%s] An error occurred for Receiver '%s': %O.", this._context.connectionId, this.name, ehError);
            this._onError(ehError);
        };
    }
    /**
     * Closes the underlying AMQP receiver.
     * @param {boolean} [preserveInContext] Should the receiver be preserved in context. Default value false.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._receiver) {
                try {
                    // TODO: should I call _receiver.detach() or _receiver.close()?
                    // should I also call this._session.close() after closing the reciver
                    // or can I directly close the session which will take care of closing the receiver as well.
                    yield rheaPromise.closeReceiver(this._receiver);
                    // Resetting the mode.
                    debug("[%s] Deleted the receiver '%s' from the client cache.", this._context.connectionId, this.name);
                    this._receiver = undefined;
                    this._session = undefined;
                    clearTimeout(this._tokenRenewalTimer);
                    debug("[%s] Receiver '%s', has been closed.", this._context.connectionId, this.name);
                }
                catch (err) {
                    debug("An error occurred while closing the receiver %s %O", this.name, errors_1.translate(err));
                }
            }
        });
    }
    /**
     * Creates a new AMQP receiver under a new AMQP session.
     * @returns {Promise<void>}
     */
    _init(onAmqpMessage, onAmqpError) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Acquire the lock and establish an amqp connection if it does not exist.
                if (!this._context.connection) {
                    debug("[%s] EH Receiver '%s' establishing AMQP connection.", this._context.connectionId, this.name);
                    yield utils_1.defaultLock.acquire(this._context.connectionLock, () => { return rpc.open(this._context); });
                }
                if (!this._isOpen()) {
                    yield this._negotiateClaim();
                    if (!onAmqpMessage) {
                        onAmqpMessage = this._onAmqpMessage;
                    }
                    if (!onAmqpError) {
                        onAmqpError = this._onAmqpError;
                    }
                    this._session = yield rheaPromise.createSession(this._context.connection);
                    debug("[%s] Trying to create receiver '%s'...", this._context.connectionId, this.name);
                    const rcvrOptions = this._createReceiverOptions();
                    this._receiver = yield rheaPromise.createReceiverWithHandlers(this._session, onAmqpMessage, onAmqpError, rcvrOptions);
                    debug("Promise to create the receiver resolved. Created receiver with name: ", this.name);
                    debug("[%s] Receiver '%s' created with receiver options: %O", this._context.connectionId, this.name, rcvrOptions);
                    // It is possible for someone to close the receiver and then start it again.
                    // Thus make sure that the receiver is present in the client cache.
                    if (!this._context.receivers[this.name])
                        this._context.receivers[this.name] = this;
                    yield this._ensureTokenRenewal();
                }
            }
            catch (err) {
                err = errors_1.translate(err);
                debug("[%s] An error occured while creating the receiver '%s': %O", this._context.connectionId, this.name, err);
                throw err;
            }
        });
    }
    /**
     * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
     * @protected
     *
     * @return {boolean} boolean
     */
    _isOpen() {
        let result = false;
        if (this._session && this._receiver) {
            if (this._receiver.is_open && this._receiver.is_open()) {
                result = true;
            }
        }
        return result;
    }
    /**
     * Creates the options that need to be specified while creating an AMQP receiver link.
     * @private
     */
    _createReceiverOptions() {
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
        return rcvrOptions;
    }
    /**
     * Negotiates the cbs claim for the EventHubReceiver.
     * @private
     * @param {boolean} [setTokenRenewal] Set the token renewal timer. Default false.
     * @return {Promise<void>} Promise<void>
     */
    _negotiateClaim(setTokenRenewal) {
        return __awaiter(this, void 0, void 0, function* () {
            // Acquire the lock and establish a cbs session if it does not exist on the connection. Although node.js
            // is single threaded, we need a locking mechanism to ensure that a race condition does not happen while
            // creating a shared resource (in this case the cbs session, since we want to have exactly 1 cbs session
            // per connection).
            debug("Acquiring lock: '%s' for creating the cbs session while creating the receiver: ${this.name}.", this._context.connectionId, this._context.cbsSession.cbsLock, this.name);
            // Acquire the lock and establish a cbs session if it does not exist on the connection.
            yield utils_1.defaultLock.acquire(this._context.cbsSession.cbsLock, () => { return this._context.cbsSession.init(this._context.connection); });
            const tokenObject = yield this._context.tokenProvider.getToken(this.audience);
            debug("[%s] EH Receiver '%s': calling negotiateClaim for audience '%s'.", this._context.connectionId, this.audience);
            // Acquire the lock to negotiate the CBS claim.
            debug("[%s] Acquiring lock: '%s' for cbs auth for receiver: '%s'.", this._context.connectionId, this._context.negotiateClaimLock, this.name);
            yield utils_1.defaultLock.acquire(this._context.negotiateClaimLock, () => {
                return this._context.cbsSession.negotiateClaim(this.audience, this._context.connection, tokenObject);
            });
            debug("[%s] Negotiated claim for receiver '%s' with with partition '%s'", this._context.connectionId, this.name, this.partitionId);
            if (setTokenRenewal) {
                yield this._ensureTokenRenewal();
            }
        });
    }
    /**
     * Ensures that the token is renewed within the predefined renewal margin.
     * @private
     * @return {Promise<void>} Promise<void>
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
                    debug("[%s] Receiver '%s', an error occurred while renewing the token: %O", this._context.connectionId, this.name, errors_1.translate(err));
                }
            }), nextRenewalTimeout);
            debug("[%s]Receiver '%s', has next token renewal in %d seconds @(%s).", this._context.connectionId, this.name, nextRenewalTimeout / 1000, new Date(Date.now() + nextRenewalTimeout).toString());
        });
    }
}
exports.EventHubReceiver = EventHubReceiver;
//# sourceMappingURL=eventHubReceiver.js.map