"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const debugModule = require("debug");
const _1 = require(".");
const eventHubReceiver_1 = require("./eventHubReceiver");
const errors_1 = require("./errors");
const Constants = require("./util/constants");
const debug = debugModule("azure:event-hubs:receiverbatching");
/**
 * Describes the batching receiver where the user can receive a specified number of messages for a predefined time.
 * @class BatchingReceiver
 * @extends EventHubReceiver
 */
class BatchingReceiver extends eventHubReceiver_1.EventHubReceiver {
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
        super(context, partitionId, options);
    }
    /**
     * Receive a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
     * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
     *
     * @param {number} maxMessageCount                 The maximum message count. Must be a value greater than 0.
     * @param {number} [maxWaitTimeInSeconds]          The maximum wait time in seconds for which the Receiver should wait
     * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
     * @returns {Promise<EventData[]>} A promise that resolves with an array of EventData objects.
     */
    receive(maxMessageCount, maxWaitTimeInSeconds) {
        if (!maxMessageCount || (maxMessageCount && typeof maxMessageCount !== 'number')) {
            throw new Error("'maxMessageCount' is a required parameter of type number with a value greater than 0.");
        }
        if (maxWaitTimeInSeconds == undefined) {
            maxWaitTimeInSeconds = Constants.defaultOperationTimeoutInSeconds;
        }
        const eventDatas = [];
        let timeOver = false;
        return new Promise((resolve, reject) => {
            let onReceiveMessage;
            let onReceiveError;
            let waitTimer;
            let actionAfterWaitTimeout;
            // Final action to be performed after maxMessageCount is reached or the maxWaitTime is over.
            const finalAction = (timeOver, data) => {
                // Resetting the mode. Now anyone can call start() or receive() again.
                this._receiver.removeListener(Constants.receiverError, onReceiveError);
                this._receiver.removeListener(Constants.message, onReceiveMessage);
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
                return finalAction(timeOver);
            };
            // Action to be performed on the "message" event.
            onReceiveMessage = (context) => {
                const data = _1.EventData.fromAmqpMessage(context.message);
                if (eventDatas.length <= maxMessageCount) {
                    eventDatas.push(data);
                }
                if (eventDatas.length === maxMessageCount) {
                    finalAction(timeOver, data);
                }
            };
            // Action to be taken when an error is received.
            onReceiveError = (context) => {
                this._receiver.removeListener(Constants.receiverError, onReceiveError);
                this._receiver.removeListener(Constants.message, onReceiveMessage);
                const error = errors_1.translate(context.receiver.error);
                debug("[%s] Receiver '%s' received an error:\n%O", this._context.connectionId, this.name, error);
                if (waitTimer) {
                    clearTimeout(waitTimer);
                }
                reject(error);
            };
            const addCreditAndSetTimer = (reuse) => {
                debug("[%s] Receiver '%s', adding credit for receiving %d messages.", this._context.connectionId, this.name, maxMessageCount);
                this._receiver.add_credit(maxMessageCount);
                let msg = "[%s] Setting the wait timer for %d seconds for receiver '%s'.";
                if (reuse)
                    msg += " Receiver link already present, hence reusing it.";
                debug(msg, this._context.connectionId, maxWaitTimeInSeconds, this.name);
                waitTimer = setTimeout(actionAfterWaitTimeout, maxWaitTimeInSeconds * 1000);
            };
            if (!this._isOpen()) {
                debug("[%s] Receiver '%s', setting the prefetch count to 0.", this._context.connectionId, this.name);
                this.prefetchCount = 0;
                this._init(onReceiveMessage, onReceiveError).then(() => addCreditAndSetTimer()).catch(reject);
            }
            else {
                addCreditAndSetTimer(true);
                this._receiver.on(Constants.message, onReceiveMessage);
                this._receiver.on(Constants.receiverError, onReceiveError);
            }
        });
    }
    /**
     * Creates a batching receiver.
     * @static
     *
     * @param {ConnectionContext} context    The connection context.
     * @param {string | number} partitionId  The partitionId to receive events from.
     * @param {ReceiveOptions} [options]     Receive options.
     */
    static create(context, partitionId, options) {
        const bReceiver = new BatchingReceiver(context, partitionId, options);
        context.receivers[bReceiver.name] = bReceiver;
        return bReceiver;
    }
}
exports.BatchingReceiver = BatchingReceiver;
