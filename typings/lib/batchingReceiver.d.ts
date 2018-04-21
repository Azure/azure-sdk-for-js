import { ReceiveOptions, EventData } from ".";
import { EventHubReceiver } from "./eventHubReceiver";
import { ConnectionContext } from "./connectionContext";
/**
 * Describes the batching receiver where the user can receive a specified number of messages for a predefined time.
 * @class BatchingReceiver
 * @extends EventHubReceiver
 */
export declare class BatchingReceiver extends EventHubReceiver {
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
    constructor(context: ConnectionContext, partitionId: string | number, options?: ReceiveOptions);
    /**
     * Receive a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
     * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
     *
     * @param {number} maxMessageCount                 The maximum message count. Must be a value greater than 0.
     * @param {number} [maxWaitTimeInSeconds]          The maximum wait time in seconds for which the Receiver should wait
     * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
     * @returns {Promise<EventData[]>} A promise that resolves with an array of EventData objects.
     */
    receive(maxMessageCount: number, maxWaitTimeInSeconds?: number): Promise<EventData[]>;
    /**
     * Creates a batching receiver.
     * @static
     *
     * @param {ConnectionContext} context    The connection context.
     * @param {string | number} partitionId  The partitionId to receive events from.
     * @param {ReceiveOptions} [options]     Receive options.
     */
    static create(context: ConnectionContext, partitionId: string | number, options?: ReceiveOptions): BatchingReceiver;
}
