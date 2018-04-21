import { Delivery } from "./rhea-promise";
import { ApplicationTokenCredentials, DeviceTokenCredentials, UserTokenCredentials, MSITokenCredentials } from "ms-rest-azure";
import { ConnectionConfig, OnMessage, OnError, EventData } from ".";
import { TokenProvider } from "./auth/token";
import { EventHubPartitionRuntimeInformation, EventHubRuntimeInformation } from "./managementClient";
import { EventPosition } from "./eventPosition";
import { ReceiveHandler } from "./streamingReceiver";
export interface ReceiveOptions {
    /**
     * @property {string} [name] The name of the receiver. If not provided then we will set a GUID by default.
     */
    name?: string;
    /**
     * @property {object} [eventPosition] The starting event position at which to start receiving messages.
     * This is used to filter messages for the EventHub Receiver.
     */
    eventPosition?: EventPosition;
    /**
     * @property {string} [consumerGroup] The consumer group to which the receiver wants to connect to.
     * If not provided then it will be connected to "$default" consumer group.
     */
    consumerGroup?: string;
    /**
     * @property {number} [prefetchCount] The upper limit of events this receiver will actively receive
     * regardless of whether a receive operation is pending. Defaults to 1000.
     */
    prefetchCount?: number;
    /**
     * @property {number} [epoch] The epoch value that this receiver is currently using for partition ownership.
     */
    epoch?: number;
    /**
     * @property {string} [identifier] The receiver identifier that uniqely identifies the receiver.
     */
    identifier?: string;
    /**
     * @property {boolean} [enableReceiverRuntimeMetric] A value indicating whether the runtime metric of a receiver is enabled.
     */
    enableReceiverRuntimeMetric?: boolean;
}
/**
 * @class EventHubClient
 * Describes the EventHub client.
 */
export declare class EventHubClient {
    /**
     * @property {string} [connectionId] The amqp connection id that uniquely identifies the connection within a process.
     */
    connectionId?: string;
    /**
     * @property {ConnectionContext} _context Describes the amqp connection context for the eventhub client.
     * @private
     */
    private _context;
    /**
     * Instantiate a client pointing to the Event Hub given by this configuration.
     *
     * @constructor
     * @param {ConnectionConfig} config - The connection configuration to create the EventHub Client.
     * @param {TokenProvider} [tokenProvider] - The token provider that provides the token for authentication.
     * Default value: SasTokenProvider.
     */
    constructor(config: ConnectionConfig, tokenProvider?: TokenProvider);
    /**
     * Closes the AMQP connection to the Event Hub for this client,
     * returning a promise that will be resolved when disconnection is completed.
     * @method close
     * @returns {Promise<any>}
     */
    close(): Promise<any>;
    /**
     * Sends the given message to the EventHub.
     *
     * @method send
     * @param {any} data                    Message to send.  Will be sent as UTF8-encoded JSON string.
     * @param {string|number} [partitionId] Partition ID to which the event data needs to be sent. This should only be specified
     * if you intend to send the event to a specific partition. When not specified EventHub will store the messages in a round-robin
     * fashion amongst the different partitions in the EventHub.
     *
     * @returns {Promise<Delivery>} Promise<rheaPromise.Delivery>
     */
    send(data: EventData, partitionId?: string | number): Promise<Delivery>;
    /**
     * Send a batch of EventData to the EventHub. The "message_annotations", "application_properties" and "properties"
     * of the first message will be set as that of the envelope (batch message).
     *
     * @method sendBatch
     * @param {Array<EventData>} datas  An array of EventData objects to be sent in a Batch message.
     * @param {string|number} [partitionId] Partition ID to which the event data needs to be sent. This should only be specified
     * if you intend to send the event to a specific partition. When not specified EventHub will store the messages in a round-robin
     * fashion amongst the different partitions in the EventHub.
     *
     * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    sendBatch(datas: EventData[], partitionId?: string | number): Promise<Delivery>;
    /**
     * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session. Messages will be passed to
     * the provided onMessage handler and error will be passes to the provided onError handler.
     *
     * @param {string|number} partitionId                        Partition ID from which to receive.
     * @param {OnMessage} onMessage                              The message handler to receive event data objects.
     * @param {OnError} onError                                  The error handler to receive an error that occurs
     * while receiving messages.
     * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
     * @param {string} [name]                                    The name of the receiver. If not provided
     * then we will set a GUID by default.
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
     *
     * @returns {ReceiveHandler} ReceiveHandler - An object that provides a mechanism to stop receiving more messages.
     */
    receiveOnMessage(partitionId: string | number, onMessage: OnMessage, onError: OnError, options?: ReceiveOptions): ReceiveHandler;
    /**
     * Receives a batch of EventData objects from an EventHub partition for a given count and a given max wait time in seconds, whichever
     * happens first. This method can be used directly after creating the receiver object and **MUST NOT** be used along with the `start()` method.
     *
     * @param {string|number} partitionId                        Partition ID from which to receive.
     * @param {number} maxMessageCount                           The maximum message count. Must be a value greater than 0.
     * @param {number} [maxWaitTimeInSeconds]                    The maximum wait time in seconds for which the Receiver should wait
     * to receiver the said amount of messages. If not provided, it defaults to 60 seconds.
     * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
     * @param {string} [name]                                    The name of the receiver. If not provided
     * then we will set a GUID by default.
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
     *
     * @returns {Promise<EventData[]>} A promise that resolves with an array of EventData objects.
     */
    receiveBatch(partitionId: string | number, maxMessageCount: number, maxWaitTimeInSeconds?: number, options?: ReceiveOptions): Promise<EventData[]>;
    /**
     * Provides the eventhub runtime information.
     * @method getHubRuntimeInformation
     * @returns {Promise<EventHubRuntimeInformation>}
     */
    getHubRuntimeInformation(): Promise<EventHubRuntimeInformation>;
    /**
     * Provides an array of partitionIds.
     * @method getPartitionIds
     * @returns {Promise<Array<string>>}
     */
    getPartitionIds(): Promise<Array<string>>;
    /**
     * Provides information about the specified partition.
     * @method getPartitionInformation
     * @param {(string|number)} partitionId Partition ID for which partition information is required.
     */
    getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation>;
    /**
     * Creates an EventHub Client from connection string.
     * @method createFromConnectionString
     * @param {string} connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
     * @param {string} [path] - EventHub path of the form 'my-event-hub-name'
     * @param {TokenProvider} [tokenProvider] - An instance of the token provider that provides the token for authentication. Default value: SasTokenProvider.
     * @returns {EventHubClient} - An instance of the eventhub client.
     */
    static createFromConnectionString(connectionString: string, path?: string, tokenProvider?: TokenProvider): EventHubClient;
    /**
     * Creates an EventHub Client from AADTokenCredentials.
     * @method
     * @param {string} host - Fully qualified domain name for Event Hubs. Most likely, {yournamespace}.servicebus.windows.net
     * @param {string} entityPath - EventHub path of the form 'my-event-hub-name'
     * @param {TokenCredentials} credentials - The AAD Token credentials. It can be one of the following: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.
     */
    static createFromAadTokenCredentials(host: string, entityPath: string, credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials): EventHubClient;
}
