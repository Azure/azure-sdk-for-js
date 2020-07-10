// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionContext, createConnectionContext } from "./connectionContext";
import {
  EventHubConsumerClientOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  LoadBalancingOptions
} from "./models/public";
import { InMemoryCheckpointStore } from "./inMemoryCheckpointStore";
import { CheckpointStore, EventProcessor, FullEventProcessorOptions } from "./eventProcessor";
import { Constants, TokenCredential } from "@azure/core-amqp";
import { logger } from "./log";

import {
  SubscribeOptions,
  Subscription,
  SubscriptionEventHandlers
} from "./eventHubConsumerClientModels";
import { isTokenCredential } from "@azure/core-amqp";
import { EventHubProperties, PartitionProperties } from "./managementClient";
import { PartitionGate } from "./impl/partitionGate";
import { v4 as uuid } from "uuid";
import { validateEventPositions } from "./eventPosition";
import { LoadBalancingStrategy } from "./loadBalancerStrategies/loadBalancingStrategy";
import { UnbalancedLoadBalancingStrategy } from "./loadBalancerStrategies/unbalancedStrategy";
import { GreedyLoadBalancingStrategy } from "./loadBalancerStrategies/greedyStrategy";
import { BalancedLoadBalancingStrategy } from "./loadBalancerStrategies/balancedStrategy";

const defaultConsumerClientOptions: Required<Pick<
  FullEventProcessorOptions,
  "maxWaitTimeInSeconds" | "maxBatchSize"
>> = {
  // to support our current "process single event only" workflow we'll also purposefully
  // only request a single event at a time.
  maxBatchSize: 1,
  maxWaitTimeInSeconds: 60
};

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
export class EventHubConsumerClient {
  /**
   * Describes the amqp connection context for the client.
   */
  private _context: ConnectionContext;
  /**
   * The options passed by the user when creating the EventHubClient instance.
   */
  private _clientOptions: EventHubConsumerClientOptions;
  private _partitionGate = new PartitionGate();
  private _id = uuid();

  /**
   * The Subscriptions that were spawned by calling `subscribe()`.
   * Subscriptions that have been stopped by the user will not
   * be present in this set.
   */
  private _subscriptions = new Set<Subscription>();

  /**
   * @property
   * The name of the default consumer group in the Event Hubs service.
   */
  static defaultConsumerGroupName: string = Constants.defaultConsumerGroup;

  private _checkpointStore: CheckpointStore;
  private _userChoseCheckpointStore: boolean;

  /**
   * Options for configuring load balancing.
   */
  private readonly _loadBalancingOptions: Required<LoadBalancingOptions>;

  /**
   * @property
   * @readonly
   * The name of the Event Hub instance for which this client is created.
   */
  get eventHubName(): string {
    return this._context.config.entityPath;
  }

  /**
   * @property
   * @readonly
   * The fully qualified namespace of the Event Hub instance for which this client is created.
   * This is likely to be similar to <yournamespace>.servicebus.windows.net.
   */
  get fullyQualifiedNamespace(): string {
    return this._context.config.host;
  }

  /**
   * @constructor
   * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param connectionString - The connection string to use for connecting to the Event Hub instance.
   * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
   */
  constructor(
    consumerGroup: string,
    connectionString: string,
    options?: EventHubConsumerClientOptions
  ); // #1
  /**
   * @constructor
   * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param connectionString - The connection string to use for connecting to the Event Hub instance.
   * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
   * @param checkpointStore A checkpoint store that is used by the client to read checkpoints to determine
   * the position from where it should resume receiving events when your application gets restarted.
   * It is also used by the client to load balance multiple instances of your application.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
   */
  constructor(
    consumerGroup: string,
    connectionString: string,
    checkpointStore: CheckpointStore,
    options?: EventHubConsumerClientOptions
  ); // #1.1
  /**
   * @constructor
   * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param consumerGroup The name of the consumer group from which you want to process events.
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
  constructor(
    consumerGroup: string,
    connectionString: string,
    eventHubName: string,
    options?: EventHubConsumerClientOptions
  ); // #2
  /**
   * @constructor
   * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
   * It is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
   * @param eventHubName - The name of the specific Event Hub to connect the client to.
   * @param checkpointStore A checkpoint store that is used by the client to read checkpoints to determine
   * the position from where it should resume receiving events when your application gets restarted.
   * It is also used by the client to load balance multiple instances of your application.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
   */
  constructor(
    consumerGroup: string,
    connectionString: string,
    eventHubName: string,
    checkpointStore: CheckpointStore,
    options?: EventHubConsumerClientOptions
  ); // #2.1
  /**
   * @constructor
   * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param fullyQualifiedNamespace - The full namespace which is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param eventHubName - The name of the specific Event Hub to connect the client to.
   * @param credential - An credential object used by the client to get the token to authenticate the connection
   * with the Azure Event Hubs service. See &commat;azure/identity for creating the credentials.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
   */
  constructor(
    consumerGroup: string,
    fullyQualifiedNamespace: string,
    eventHubName: string,
    credential: TokenCredential,
    options?: EventHubConsumerClientOptions
  ); // #3
  /**
   * @constructor
   * The `EventHubConsumerClient` class is used to consume events from an Event Hub.
   * Use the `options` parmeter to configure retry policy or proxy settings.
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param fullyQualifiedNamespace - The full namespace which is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param eventHubName - The name of the specific Event Hub to connect the client to.
   * @param credential - An credential object used by the client to get the token to authenticate the connection
   * with the Azure Event Hubs service. See &commat;azure/identity for creating the credentials.
   * @param checkpointStore A checkpoint store that is used by the client to read checkpoints to determine
   * the position from where it should resume receiving events when your application gets restarted.
   * It is also used by the client to load balance multiple instances of your application.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   * - `userAgent`      : A string to append to the built in user agent string that is passed to the service.
   */
  constructor(
    consumerGroup: string,
    fullyQualifiedNamespace: string,
    eventHubName: string,
    credential: TokenCredential,
    checkpointStore: CheckpointStore,
    options?: EventHubConsumerClientOptions
  ); // #3.1
  constructor(
    private _consumerGroup: string,
    connectionStringOrFullyQualifiedNamespace2: string,
    checkpointStoreOrEventHubNameOrOptions3?:
      | CheckpointStore
      | EventHubConsumerClientOptions
      | string,
    checkpointStoreOrCredentialOrOptions4?:
      | CheckpointStore
      | EventHubConsumerClientOptions
      | TokenCredential,
    checkpointStoreOrOptions5?: CheckpointStore | EventHubConsumerClientOptions,
    options6?: EventHubConsumerClientOptions
  ) {
    if (isTokenCredential(checkpointStoreOrCredentialOrOptions4)) {
      // #3 or 3.1
      logger.info("Creating EventHubConsumerClient with TokenCredential.");

      if (isCheckpointStore(checkpointStoreOrOptions5)) {
        // 3.1
        this._checkpointStore = checkpointStoreOrOptions5;
        this._userChoseCheckpointStore = true;
        this._clientOptions = options6 || {};
      } else {
        this._checkpointStore = new InMemoryCheckpointStore();
        this._userChoseCheckpointStore = false;
        this._clientOptions = checkpointStoreOrOptions5 || {};
      }

      this._context = createConnectionContext(
        connectionStringOrFullyQualifiedNamespace2,
        checkpointStoreOrEventHubNameOrOptions3 as string,
        checkpointStoreOrCredentialOrOptions4,
        this._clientOptions
      );
    } else if (typeof checkpointStoreOrEventHubNameOrOptions3 === "string") {
      // #2 or 2.1
      logger.info("Creating EventHubConsumerClient with connection string and event hub name.");

      if (isCheckpointStore(checkpointStoreOrCredentialOrOptions4)) {
        // 2.1
        this._checkpointStore = checkpointStoreOrCredentialOrOptions4;
        this._userChoseCheckpointStore = true;
        this._clientOptions = (checkpointStoreOrOptions5 as EventHubConsumerClientOptions) || {};
      } else {
        // 2
        this._checkpointStore = new InMemoryCheckpointStore();
        this._userChoseCheckpointStore = false;
        this._clientOptions = checkpointStoreOrCredentialOrOptions4 || {};
      }

      this._context = createConnectionContext(
        connectionStringOrFullyQualifiedNamespace2,
        checkpointStoreOrEventHubNameOrOptions3,
        this._clientOptions
      );
    } else {
      // #1 or 1.1
      logger.info("Creating EventHubConsumerClient with connection string.");

      if (isCheckpointStore(checkpointStoreOrEventHubNameOrOptions3)) {
        // 1.1
        this._checkpointStore = checkpointStoreOrEventHubNameOrOptions3;
        this._userChoseCheckpointStore = true;
        this._clientOptions =
          (checkpointStoreOrCredentialOrOptions4 as EventHubConsumerClientOptions) || {};
      } else {
        // 1
        this._checkpointStore = new InMemoryCheckpointStore();
        this._userChoseCheckpointStore = false;
        this._clientOptions =
          (checkpointStoreOrEventHubNameOrOptions3 as EventHubConsumerClientOptions) || {};
      }

      this._context = createConnectionContext(
        connectionStringOrFullyQualifiedNamespace2,
        this._clientOptions
      );
    }
    this._loadBalancingOptions = {
      // default options
      strategy: "balanced",
      updateIntervalInMs: 10000,
      partitionOwnershipExpirationIntervalInMs: 60000,
      // options supplied by user
      ...this._clientOptions?.loadBalancingOptions
    };
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws Error if the underlying connection encounters an error while closing.
   */
  async close(): Promise<void> {
    // Stop all the actively running subscriptions.
    const activeSubscriptions = Array.from(this._subscriptions);
    await Promise.all(
      activeSubscriptions.map((subscription) => {
        return subscription.close();
      })
    );
    // Close the connection via the connection context.
    return this._context.close();
  }

  /**
   * Provides the id for each partition associated with the Event Hub.
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings representing the id for
   * each partition associated with the Event Hub.
   * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<Array<string>> {
    return this._context
      .managementSession!.getEventHubProperties({
        ...options,
        retryOptions: this._clientOptions.retryOptions
      })
      .then((eventHubProperties) => {
        return eventHubProperties.partitionIds;
      });
  }

  /**
   * Provides information about the state of the specified partition.
   * @param partitionId The id of the partition for which information is required.
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the state of the partition .
   * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getPartitionProperties(
    partitionId: string,
    options: GetPartitionPropertiesOptions = {}
  ): Promise<PartitionProperties> {
    return this._context.managementSession!.getPartitionProperties(partitionId, {
      ...options,
      retryOptions: this._clientOptions.retryOptions
    });
  }

  /**
   * Provides the Event Hub runtime information.
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the Event Hub instance.
   * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getEventHubProperties(options: GetEventHubPropertiesOptions = {}): Promise<EventHubProperties> {
    return this._context.managementSession!.getEventHubProperties({
      ...options,
      retryOptions: this._clientOptions.retryOptions
    });
  }

  /**
   * Subscribe to events from all partitions.
   *
   * If checkpoint store is provided to the `EventHubConsumerClient` and there are multiple
   * instances of your application, then each instance will subscribe to a subset of the
   * partitions such that the load is balanced amongst them.
   *
   * Call close() on the returned object to stop receiving events.
   *
   * @param handlers Handlers for the lifecycle of the subscription - subscription initialization
   *                 per partition, receiving events, handling errors and the closing
   *                 of a subscription per partition.
   * @param options Configures the way events are received.
   * Most common are `maxBatchSize` and `maxWaitTimeInSeconds` that control the flow of
   * events to the handler provided to receive events as well as the start position. For example,
   * `{ maxBatchSize: 20, maxWaitTimeInSeconds: 120, startPosition: { sequenceNumber: 123 } }
   */
  subscribe(handlers: SubscriptionEventHandlers, options?: SubscribeOptions): Subscription; // #1
  /**
   * Subscribe to events from a single partition.
   * Call close() on the returned object to stop receiving events.
   *
   * @param partitionId The id of the partition to subscribe to.
   * @param handlers Handlers for the lifecycle of the subscription - subscription initialization
   *                 of the partition, receiving events, handling errors and the closing
   *                 of a subscription to the partition.
   * @param options Configures the way events are received.
   * Most common are `maxBatchSize` and `maxWaitTimeInSeconds` that control the flow of
   * events to the handler provided to receive events as well as the start position. For example,
   * `{ maxBatchSize: 20, maxWaitTimeInSeconds: 120, startPosition: { sequenceNumber: 123 } }
   */

  subscribe(
    partitionId: string,
    handlers: SubscriptionEventHandlers,
    options?: SubscribeOptions
  ): Subscription; // #2
  subscribe(
    handlersOrPartitionId1?: SubscriptionEventHandlers | string,
    optionsOrHandlers2?: SubscribeOptions | SubscriptionEventHandlers,
    possibleOptions3?: SubscribeOptions
  ): Subscription {
    let eventProcessor: EventProcessor;
    let targetedPartitionId: string;

    if (isSubscriptionEventHandlers(handlersOrPartitionId1)) {
      // #1: subscribe overload - read from all partitions
      const options = optionsOrHandlers2 as SubscribeOptions | undefined;
      if (options && options.startPosition) {
        validateEventPositions(options.startPosition);
      }
      ({ targetedPartitionId, eventProcessor } = this.createEventProcessorForAllPartitions(
        handlersOrPartitionId1,
        options
      ));
    } else if (isSubscriptionEventHandlers(optionsOrHandlers2)) {
      // #2: subscribe overload (read from specific partition IDs), don't coordinate
      const options = possibleOptions3 as SubscribeOptions | undefined;
      if (options && options.startPosition) {
        validateEventPositions(options.startPosition);
      }
      ({ targetedPartitionId, eventProcessor } = this.createEventProcessorForSinglePartition(
        // cast to string as downstream code expects partitionId to be string, but JS users could have given us anything.
        // we don't validate the user input and instead rely on service throwing errors if any
        String(handlersOrPartitionId1),
        optionsOrHandlers2,
        possibleOptions3
      ));
    } else {
      throw new TypeError("Unhandled subscribe() overload");
    }

    eventProcessor.start();

    const subscription = {
      get isRunning() {
        return eventProcessor.isRunning();
      },
      close: () => {
        this._partitionGate.remove(targetedPartitionId);
        this._subscriptions.delete(subscription);
        return eventProcessor.stop();
      }
    };
    this._subscriptions.add(subscription);
    return subscription;
  }

  /**
   * Gets the LoadBalancing strategy that should be used based on what the user provided.
   */
  private _getLoadBalancingStrategy(): LoadBalancingStrategy {
    if (!this._userChoseCheckpointStore) {
      // The default behavior when a checkpointstore isn't provided
      // is to always grab all the partitions.
      return new UnbalancedLoadBalancingStrategy();
    }

    const partitionOwnershipExpirationIntervalInMs = this._loadBalancingOptions
      .partitionOwnershipExpirationIntervalInMs;
    if (this._loadBalancingOptions?.strategy === "greedy") {
      return new GreedyLoadBalancingStrategy(partitionOwnershipExpirationIntervalInMs);
    }

    // The default behavior when a checkpointstore is provided is
    // to grab one partition at a time.
    return new BalancedLoadBalancingStrategy(partitionOwnershipExpirationIntervalInMs);
  }

  private createEventProcessorForAllPartitions(
    subscriptionEventHandlers: SubscriptionEventHandlers,
    options?: SubscribeOptions
  ) {
    this._partitionGate.add("all");

    if (this._userChoseCheckpointStore) {
      logger.verbose(
        "EventHubConsumerClient subscribing to all partitions, using a checkpoint store."
      );
    } else {
      logger.verbose("EventHubConsumerClient subscribing to all partitions, no checkpoint store.");
    }

    const loadBalancingStrategy = this._getLoadBalancingStrategy();
    const eventProcessor = this._createEventProcessor(
      this._context,
      subscriptionEventHandlers,
      this._checkpointStore,
      {
        ...defaultConsumerClientOptions,
        ...(options as SubscribeOptions),
        ownerLevel: getOwnerLevel(options, this._userChoseCheckpointStore),
        // make it so all the event processors process work with the same overarching owner ID
        // this allows the EventHubConsumer to unify all the work for any processors that it spawns
        ownerId: this._id,
        retryOptions: this._clientOptions.retryOptions,
        loadBalancingStrategy,
        loopIntervalInMs: this._loadBalancingOptions.updateIntervalInMs
      }
    );

    return { targetedPartitionId: "all", eventProcessor };
  }

  private createEventProcessorForSinglePartition(
    partitionId: string,
    eventHandlers: SubscriptionEventHandlers,
    options?: SubscribeOptions
  ) {
    this._partitionGate.add(partitionId);

    const subscribeOptions = options as SubscribeOptions | undefined;

    if (this._userChoseCheckpointStore) {
      logger.verbose(
        `EventHubConsumerClient subscribing to specific partition (${partitionId}), using a checkpoint store.`
      );
    } else {
      logger.verbose(
        `EventHubConsumerClient subscribing to specific partition (${partitionId}), no checkpoint store.`
      );
    }

    const eventProcessor = this._createEventProcessor(
      this._context,
      eventHandlers,
      this._checkpointStore,
      {
        ...defaultConsumerClientOptions,
        ...options,
        processingTarget: partitionId,
        ownerLevel: getOwnerLevel(subscribeOptions, this._userChoseCheckpointStore),
        retryOptions: this._clientOptions.retryOptions,
        loadBalancingStrategy: new UnbalancedLoadBalancingStrategy(),
        loopIntervalInMs: this._loadBalancingOptions.updateIntervalInMs ?? 10000
      }
    );

    return { targetedPartitionId: partitionId, eventProcessor };
  }

  private _createEventProcessor(
    connectionContext: ConnectionContext,
    subscriptionEventHandlers: SubscriptionEventHandlers,
    checkpointStore: CheckpointStore,
    options: FullEventProcessorOptions
  ) {
    return new EventProcessor(
      this._consumerGroup,
      connectionContext,
      subscriptionEventHandlers,
      checkpointStore,
      options
    );
  }
}

/**
 * @internal
 * @ignore
 */
export function isCheckpointStore(possible: CheckpointStore | any): possible is CheckpointStore {
  if (!possible) {
    return false;
  }

  const checkpointStore = possible as CheckpointStore;

  return (
    typeof checkpointStore.claimOwnership === "function" &&
    typeof checkpointStore.listCheckpoints === "function" &&
    typeof checkpointStore.listOwnership === "function" &&
    typeof checkpointStore.updateCheckpoint === "function"
  );
}

/**
 * @internal
 * @ignore
 */
function isSubscriptionEventHandlers(
  possible: any | SubscriptionEventHandlers
): possible is SubscriptionEventHandlers {
  return typeof (possible as SubscriptionEventHandlers).processEvents === "function";
}

function getOwnerLevel(
  options: SubscribeOptions | undefined,
  userChoseCheckpointStore: boolean
): number | undefined {
  if (options && options.ownerLevel) {
    return options.ownerLevel;
  }

  if (userChoseCheckpointStore) {
    return 0;
  } else {
    return undefined;
  }
}
