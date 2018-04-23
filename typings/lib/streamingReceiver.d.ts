import { ReceiveOptions, OnMessage, OnError } from ".";
import { EventHubReceiver, ReceiverRuntimeInfo } from "./eventHubReceiver";
import { ConnectionContext } from "./connectionContext";
export declare class ReceiveHandler {
    /**
     * @property {string} name The Receiver handler name.
     * @readonly
     */
    readonly name: string;
    /**
     * @property {EventHubReceiver} _receiver  The underlying EventHubReceiver.
     * @private
     */
    private _receiver;
    /**
     * Creates an instance of the ReceiveHandler.
     * @constructor
     * @param {EventHubReceiver} receiver The underlying EventHubReceiver.
     */
    constructor(receiver: EventHubReceiver);
    /**
     * @property {ReceiverRuntimeInfo} runtimeInfo The receiver runtime info. This property will only
     * be enabled when `enableReceiverRuntimeMetric` option is set to true in the
     * `client.receiveOnMessage()` method.
     * @readonly
     */
    readonly runtimeInfo: ReceiverRuntimeInfo | undefined;
    /**
     * Stops the underlying EventHubReceiver from receiving more messages.
     * @return {Promise<void>} Promise<void>
     */
    stop(): Promise<void>;
}
/**
 * Describes the streaming receiver where the user can receive the message
 * by providing handler functions.
 * @class StreamingReceiver
 * @extends EventHubReceiver
 */
export declare class StreamingReceiver extends EventHubReceiver {
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
     * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
     *
     * @param {OnMessage} onMessage The message handler to receive event data objects.
     * @param {OnError} onError The error handler to receive an error that occurs while receivin messages.
     */
    receiveOnMessage(onMessage: OnMessage, onError: OnError): void;
    /**
     * Creates a streaming receiver.
     * @static
     *
     * @param {ConnectionContext} context    The connection context.
     * @param {string | number} partitionId  The partitionId to receive events from.
     * @param {ReceiveOptions} [options]     Receive options.
     */
    static create(context: ConnectionContext, partitionId: string | number, options?: ReceiveOptions): StreamingReceiver;
}
