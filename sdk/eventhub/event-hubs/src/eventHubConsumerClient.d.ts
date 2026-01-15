import type { CheckpointStore } from "./eventProcessor.js";
import type { EventHubConsumerClientOptions, GetEventHubPropertiesOptions, GetPartitionIdsOptions, GetPartitionPropertiesOptions } from "./models/public.js";
import type { EventHubProperties, PartitionProperties } from "./managementClient.js";
import type { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import type { SubscribeOptions, Subscription, SubscriptionEventHandlers } from "./eventHubConsumerClientModels.js";
/**
 * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
 *
 * There are multiple ways to create an `EventHubConsumerClient`
 * - Use the connection string from the SAS policy created for your Event Hub instance.
 * - Use the connection string from the SAS policy created for your Event Hub namespace,
 * and the name of the Event Hub instance
 * - Use the full namespace like `<yournamespace>.servicebus.windows.net`, and a credentials object.
 *
 * Optionally, you can also pass:
 * - An options bag to configure the retry policy or proxy settings.
 * - A checkpoint store that is used by the client to read checkpoints to determine the position from where it should
 * resume receiving events when your application gets restarted. The checkpoint store is also used by the client
 * to load balance multiple instances of your application.
 */
export declare class EventHubConsumerClient {
    private _consumerGroup;
    /**
     * Describes the amqp connection context for the client.
     */
    private _context;
    /**
     * The options passed by the user when creating the EventHubClient instance.
     */
    private _clientOptions;
    private _partitionGate;
    /**
     * The Subscriptions that were spawned by calling `subscribe()`.
     * Subscriptions that have been stopped by the user will not
     * be present in this set.
     */
    private _subscriptions;
    /**
     * The name of the default consumer group in the Event Hubs service.
     */
    static defaultConsumerGroupName: string;
    private _checkpointStore;
    private _userChoseCheckpointStore;
    /**
     * Options for configuring load balancing.
     */
    private readonly _loadBalancingOptions;
    /**
     * @readonly
     * The name of the Event Hub instance for which this client is created.
     */
    get eventHubName(): string;
    /**
     * @readonly
     * The fully qualified namespace of the Event Hub instance for which this client is created.
     * This is likely to be similar to <yournamespace>.servicebus.windows.net.
     */
    get fullyQualifiedNamespace(): string;
    /**
     * The name used to identify this EventHubConsumerClient.
     * If not specified or empty, a random unique one will be generated.
     */
    readonly identifier: string;
    /**
     * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
     * Use the `options` parmeter to configure retry policy or proxy settings.
     * @param consumerGroup - The name of the consumer group from which you want to process events.
     * @param connectionString - The connection string to use for connecting to the Event Hub instance.
     * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
     * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
     * @param options - A set of options to apply when configuring the client.
     * - `retryOptions`   : Configures the retry policy for all the operations on the client.
     * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
     * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
     * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
     */
    constructor(consumerGroup: string, connectionString: string, options?: EventHubConsumerClientOptions);
    /**
     * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
     * Use the `options` parmeter to configure retry policy or proxy settings.
     * @param consumerGroup - The name of the consumer group from which you want to process events.
     * @param connectionString - The connection string to use for connecting to the Event Hub instance.
     * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
     * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
     * @param checkpointStore - A checkpoint store that is used by the client to read checkpoints to determine
     * the position from where it should resume receiving events when your application gets restarted.
     * It is also used by the client to load balance multiple instances of your application.
     * @param options - A set of options to apply when configuring the client.
     * - `retryOptions`   : Configures the retry policy for all the operations on the client.
     * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
     * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
     * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
     */
    constructor(consumerGroup: string, connectionString: string, checkpointStore: CheckpointStore, options?: EventHubConsumerClientOptions);
    /**
     * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
     * Use the `options` parmeter to configure retry policy or proxy settings.
     * @param consumerGroup - The name of the consumer group from which you want to process events.
     * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
     * It is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
     * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
     * @param eventHubName - The name of the specific Event Hub to connect the client to.
     * @param options - A set of options to apply when configuring the client.
     * - `retryOptions`   : Configures the retry policy for all the operations on the client.
     * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
     * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
     * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
     */
    constructor(consumerGroup: string, connectionString: string, eventHubName: string, options?: EventHubConsumerClientOptions);
    /**
     * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
     * Use the `options` parmeter to configure retry policy or proxy settings.
     * @param consumerGroup - The name of the consumer group from which you want to process events.
     * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
     * It is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
     * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
     * @param eventHubName - The name of the specific Event Hub to connect the client to.
     * @param checkpointStore - A checkpoint store that is used by the client to read checkpoints to determine
     * the position from where it should resume receiving events when your application gets restarted.
     * It is also used by the client to load balance multiple instances of your application.
     * @param options - A set of options to apply when configuring the client.
     * - `retryOptions`   : Configures the retry policy for all the operations on the client.
     * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
     * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
     * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
     */
    constructor(consumerGroup: string, connectionString: string, eventHubName: string, checkpointStore: CheckpointStore, options?: EventHubConsumerClientOptions);
    /**
     * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
     * Use the `options` parmeter to configure retry policy or proxy settings.
     * @param consumerGroup - The name of the consumer group from which you want to process events.
     * @param fullyQualifiedNamespace - The full namespace which is likely to be similar to
     * <yournamespace>.servicebus.windows.net
     * @param eventHubName - The name of the specific Event Hub to connect the client to.
     * @param credential - An credential object used by the client to get the token to authenticate the connection
     * with the Azure Event Hubs service.
     * See &commat;azure/identity for creating credentials that support AAD auth.
     * Use the `AzureNamedKeyCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessKeyName`
     * and `SharedAccessKey` without using a connection string. These fields map to the `name` and `key` field respectively
     * in `AzureNamedKeyCredential`.
     * Use the `AzureSASCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessSignature`
     * without using a connection string. This field maps to `signature` in `AzureSASCredential`.
     * @param options - A set of options to apply when configuring the client.
     * - `retryOptions`   : Configures the retry policy for all the operations on the client.
     * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
     * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
     * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
     */
    constructor(consumerGroup: string, fullyQualifiedNamespace: string, eventHubName: string, credential: TokenCredential | NamedKeyCredential | SASCredential, options?: EventHubConsumerClientOptions);
    /**
     * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
     * Use the `options` parmeter to configure retry policy or proxy settings.
     * @param consumerGroup - The name of the consumer group from which you want to process events.
     * @param fullyQualifiedNamespace - The full namespace which is likely to be similar to
     * <yournamespace>.servicebus.windows.net
     * @param eventHubName - The name of the specific Event Hub to connect the client to.
     * @param credential - An credential object used by the client to get the token to authenticate the connection
     * with the Azure Event Hubs service.
     * See &commat;azure/identity for creating credentials that support AAD auth.
     * Use the `AzureNamedKeyCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessKeyName`
     * and `SharedAccessKey` without using a connection string. These fields map to the `name` and `key` field respectively
     * in `AzureNamedKeyCredential`.
     * Use the `AzureSASCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessSignature`
     * without using a connection string. This field maps to `signature` in `AzureSASCredential`.
     * @param checkpointStore - A checkpoint store that is used by the client to read checkpoints to determine
     * the position from where it should resume receiving events when your application gets restarted.
     * It is also used by the client to load balance multiple instances of your application.
     * @param options - A set of options to apply when configuring the client.
     * - `retryOptions`   : Configures the retry policy for all the operations on the client.
     * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
     * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
     * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
     */
    constructor(consumerGroup: string, fullyQualifiedNamespace: string, eventHubName: string, credential: TokenCredential | NamedKeyCredential | SASCredential, checkpointStore: CheckpointStore, options?: EventHubConsumerClientOptions);
    /**
     * Closes the AMQP connection to the Event Hub instance,
     * returning a promise that will be resolved when disconnection is completed.
     * @returns Promise<void>
     * @throws Error if the underlying connection encounters an error while closing.
     */
    close(): Promise<void>;
    /**
     * Provides the id for each partition associated with the Event Hub.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with an Array of strings representing the id for
     * each partition associated with the Event Hub.
     * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getPartitionIds(options?: GetPartitionIdsOptions): Promise<Array<string>>;
    /**
     * Provides information about the state of the specified partition.
     * @param partitionId - The id of the partition for which information is required.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with information about the state of the partition .
     * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getPartitionProperties(partitionId: string, options?: GetPartitionPropertiesOptions): Promise<PartitionProperties>;
    /**
     * Provides the Event Hub runtime information.
     * @param options - The set of options to apply to the operation call.
     * @returns A promise that resolves with information about the Event Hub instance.
     * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getEventHubProperties(options?: GetEventHubPropertiesOptions): Promise<EventHubProperties>;
    /**
     * Subscribe to events from all partitions.
     *
     * If checkpoint store is provided to the `EventHubConsumerClient` and there are multiple
     * instances of your application, then each instance will subscribe to a subset of the
     * partitions such that the load is balanced amongst them.
     *
     * Call close() on the returned object to stop receiving events.
     *
     * Example usage:
     * ```ts snippet:EventHubConsumerClient_Subscribe
     * import { EventHubConsumerClient, earliestEventPosition } from "@azure/event-hubs";
     *
     * const client = new EventHubConsumerClient("my-consumer-group", "connectionString", "eventHubName");
     *
     * const subscription = client.subscribe(
     *   {
     *     processEvents: async (events, context) => {
     *       console.log("Received event count: ", events.length);
     *     },
     *     processError: async (err, context) => {
     *       console.log("Error: ", err);
     *     },
     *   },
     *   { startPosition: earliestEventPosition },
     * );
     * ```
     *
     * @param handlers - Handlers for the lifecycle of the subscription - subscription initialization
     *                 per partition, receiving events, handling errors and the closing
     *                 of a subscription per partition.
     * @param options - Configures the way events are received.
     * Most common are `maxBatchSize` and `maxWaitTimeInSeconds` that control the flow of
     * events to the handler provided to receive events as well as the start position. For example,
     * `{ maxBatchSize: 20, maxWaitTimeInSeconds: 120, startPosition: { sequenceNumber: 123 } }`
     */
    subscribe(handlers: SubscriptionEventHandlers, options?: SubscribeOptions): Subscription;
    /**
     * Subscribe to events from a single partition.
     * Call close() on the returned object to stop receiving events.
     *
     * Example usage:
     * ```ts snippet:EventHubConsumerClient_SubscribeSinglePartition
     * import { EventHubConsumerClient, earliestEventPosition } from "@azure/event-hubs";
     *
     * const client = new EventHubConsumerClient("my-consumer-group", "connectionString", "eventHubName");
     *
     * const partitionIds = await client.getPartitionIds();
     *
     * const subscription = client.subscribe(
     *   partitionIds[0],
     *   {
     *     processEvents: async (events, context) => {
     *       console.log("Received event count: ", events.length);
     *     },
     *     processError: async (err, context) => {
     *       console.log("Error: ", err);
     *     },
     *   },
     *   { startPosition: earliestEventPosition },
     * );
     * ```
     *
     * @param partitionId - The id of the partition to subscribe to.
     * @param handlers - Handlers for the lifecycle of the subscription - subscription initialization
     *                 of the partition, receiving events, handling errors and the closing
     *                 of a subscription to the partition.
     * @param options - Configures the way events are received.
     * Most common are `maxBatchSize` and `maxWaitTimeInSeconds` that control the flow of
     * events to the handler provided to receive events as well as the start position. For example,
     * `{ maxBatchSize: 20, maxWaitTimeInSeconds: 120, startPosition: { sequenceNumber: 123 } }`
     */
    subscribe(partitionId: string, handlers: SubscriptionEventHandlers, options?: SubscribeOptions): Subscription;
    /**
     * Gets the LoadBalancing strategy that should be used based on what the user provided.
     */
    private _getLoadBalancingStrategy;
    private createEventProcessorForAllPartitions;
    private createEventProcessorForSinglePartition;
    private _createEventProcessor;
}
/**
 * @internal
 */
export declare function isCheckpointStore(possible: CheckpointStore | any): possible is CheckpointStore;
//# sourceMappingURL=eventHubConsumerClient.d.ts.map