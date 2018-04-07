/// <reference types="node" />
import { EventEmitter } from "events";
import { ReceiveOptions, EventData } from ".";
import { ConnectionContext } from "./eventHubClient";
/**
 * Represents the approximate receiver runtime information for a logical partition of an Event Hub.
 * @interface ReceiverRuntimeInfo
 */
export interface ReceiverRuntimeInfo {
    /**
     * @property {string} partitionId The parition identifier.
     */
    paritionId: string;
    /**
     * @property {number} lastSequenceNumber The logical sequence number of the event.
     */
    lastSequenceNumber?: number;
    /**
     * @property {Date} lastEnqueuedTimeUtc The enqueued time of the last event.
     */
    lastEnqueuedTimeUtc?: Date;
    /**
     * @property {string} lastEnqueuedOffset The offset of the last enqueued event.
     */
    lastEnqueuedOffset?: string;
    /**
     * @property {Date} retrievalTime The enqueued time of the last event.
     */
    retrievalTime?: Date;
}
/**
 * Describes the event handler signtaure for the "message" event.
 */
export interface OnMessage {
    (event: "message", handler: (eventData: EventData) => void): void;
}
/**
 * Describes the EventHubReceiver that will receive event data from EventHub.
 * @class EventHubReceiver
 */
export declare class EventHubReceiver extends EventEmitter {
    /**
     * @property {string} [name] The unique EventHub Receiver name (mostly a guid).
     */
    name?: string;
    /**
     * @property {string} address The EventHub Receiver address in the following format:
     * - "<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"
     */
    address: string;
    /**
     * @property {string} audience The EventHub Receiver token audience in the following format:
     * - "sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"
     */
    audience: string;
    /**
     * @property {string} consumerGroup The EventHub consumer group from which the receiver will receive messages. (Default: "default").
     */
    consumerGroup: string;
    /**
     * @property {string | number} partitionId The EentHub partitionId from which the receiver will receive messages.
     */
    partitionId: string | number;
    /**
     * @property {ReceiverRuntimeInfo} runtimeInfo The receiver runtime info.
     */
    runtimeInfo: ReceiverRuntimeInfo;
    /**
     * @property {number} [epoch] The Receiver epoch.
     */
    epoch?: number;
    /**
     * @property {string} [identifier] The Receiver identifier
     */
    identifier?: string;
    /**
     * @property {ReceiveOptions} [options] Optional properties that can be set while creating the EventHubReceiver.
     */
    options?: ReceiveOptions;
    /**
     * @property {number} [prefetchCount] The number of messages that the receiver can fetch/receive initially. Defaults to 500.
     */
    prefetchCount?: number;
    /**
     * @property {boolean} receiverRuntimeMetricEnabled Indicates whether receiver runtime metric is enabled. Default: false.
     */
    receiverRuntimeMetricEnabled: boolean;
    /**
     * @property {ConnectionContext} _context Provides relevant information about the amqp connection, cbs and $management sessions,
     * token provider, sender and receivers.
     * @private
     */
    private _context;
    /**
     * @property {any} [_receiver] The AMQP receiver link.
     * @private
     */
    private _receiver?;
    /**
     * @property {any} [_session] The AMQP receiver session.
     * @private
     */
    private _session?;
    /**
     * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when the EventHub Sender is due for token renewal.
     * @private
     */
    private _tokenRenewalTimer?;
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
     * Creates a new AMQP receiver under a new AMQP session.
     * @returns {Promoise<void>}
     */
    init(): Promise<void>;
    /**
     * Receive a batch of EventDatas from an EventHub partition for a given count and a given max wait time in seconds, whichever
     * happens first.
     *
     * @param {number} maxMessageCount                         The maximum message count. Must be a value greater than 0.
     * @param {number} [maxWaitTimeInSeconds]          The maximum wait time in seconds for which the Receiver should wait
     * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
     * @returns {Promise<EventData[]>} A promise that resolves with an array of EventData objects.
     */
    receive(maxMessageCount: number, maxWaitTimeInSeconds?: number): Promise<EventData[]>;
    /**
     * Closes the underlying AMQP receiver.
     */
    close(): Promise<void>;
    /**
     * Ensures that the token is renewed within the predfiend renewal margin.
     */
    private _ensureTokenRenewal();
}
