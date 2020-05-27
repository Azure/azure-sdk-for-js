// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubClient } from "./impl/eventHubClient";
import {
  EventHubClientOptions,
  GetPartitionPropertiesOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions
} from "./models/public";
import { InMemoryCheckpointStore } from "./inMemoryCheckpointStore";
import { EventProcessor, CheckpointStore, FullEventProcessorOptions } from "./eventProcessor";
import { GreedyPartitionLoadBalancer } from "./partitionLoadBalancer";
import { TokenCredential, Constants } from "@azure/core-amqp";
import { logger } from "./log";

import {
  SubscribeOptions,
  Subscription,
  SubscriptionEventHandlers
} from "./eventHubConsumerClientModels";
import { isTokenCredential } from "@azure/core-amqp";
import { PartitionProperties, EventHubProperties } from "./managementClient";
import { PartitionGate } from "./impl/partitionGate";
import uuid from "uuid/v4";
import { validateEventPositions } from "./eventPosition";

/**
 * Describes the options that can be provided while creating the EventHubConsumerClient.
 */
export interface EventHubConsumerClientOptions extends EventHubClientOptions {
  /**
   * This setting allows the EventHubConsumerClient to create connections directly to
   * the Event Hubs partition node.
   * 
   * This results in a new connection being created for each partition the client is receiving
   * events from.
   * 
   * Note: Outbound ports to 104xx must be allowed by your firewall when enabling this setting.
   * Default: false
   */
  allowDirectPartitionConnections?: boolean;
}


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
  private _eventHubClient: EventHubClient;
  private _partitionGate = new PartitionGate();
  private _id = uuid();

  /**
   * @property
   * The name of the default consumer group in the Event Hubs service.
   */
  static defaultConsumerGroupName: string = Constants.defaultConsumerGroup;

  private _checkpointStore: CheckpointStore;
  private _userChoseCheckpointStore: boolean;

  /**
   * @property
   * @readonly
   * The name of the Event Hub instance for which this client is created.
   */
  get eventHubName(): string {
    return this._eventHubClient.eventHubName;
  }

  /**
   * @property
   * @readonly
   * The fully qualified namespace of the Event Hub instance for which this client is created.
   * This is likely to be similar to <yournamespace>.servicebus.windows.net.
   */
  get fullyQualifiedNamespace(): string {
    return this._eventHubClient.fullyQualifiedNamespace;
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

      let eventHubClientOptions: EventHubConsumerClientOptions | undefined;

      if (isCheckpointStore(checkpointStoreOrOptions5)) {
        // 3.1
        this._checkpointStore = checkpointStoreOrOptions5;
        this._userChoseCheckpointStore = true;
        eventHubClientOptions = options6;
      } else {
        this._checkpointStore = new InMemoryCheckpointStore();
        this._userChoseCheckpointStore = false;
        eventHubClientOptions = checkpointStoreOrOptions5;
      }

      this._eventHubClient = new EventHubClient(
        connectionStringOrFullyQualifiedNamespace2,
        checkpointStoreOrEventHubNameOrOptions3 as string,
        checkpointStoreOrCredentialOrOptions4,
        eventHubClientOptions
      );
    } else if (typeof checkpointStoreOrEventHubNameOrOptions3 === "string") {
      // #2 or 2.1
      logger.info("Creating EventHubConsumerClient with connection string and event hub name.");

      let eventHubClientOptions: EventHubConsumerClientOptions | undefined;

      if (isCheckpointStore(checkpointStoreOrCredentialOrOptions4)) {
        // 2.1
        this._checkpointStore = checkpointStoreOrCredentialOrOptions4;
        this._userChoseCheckpointStore = true;
        eventHubClientOptions = checkpointStoreOrOptions5 as
          | EventHubConsumerClientOptions
          | undefined;
      } else {
        // 2
        this._checkpointStore = new InMemoryCheckpointStore();
        this._userChoseCheckpointStore = false;
        eventHubClientOptions = checkpointStoreOrCredentialOrOptions4;
      }

      this._eventHubClient = new EventHubClient(
        connectionStringOrFullyQualifiedNamespace2,
        checkpointStoreOrEventHubNameOrOptions3,
        eventHubClientOptions as EventHubConsumerClientOptions
      );
    } else {
      // #1 or 1.1
      logger.info("Creating EventHubConsumerClient with connection string.");

      let eventHubClientOptions: EventHubConsumerClientOptions | undefined;

      if (isCheckpointStore(checkpointStoreOrEventHubNameOrOptions3)) {
        // 1.1
        this._checkpointStore = checkpointStoreOrEventHubNameOrOptions3;
        this._userChoseCheckpointStore = true;
        eventHubClientOptions = checkpointStoreOrCredentialOrOptions4 as
          | EventHubConsumerClientOptions
          | undefined;
      } else {
        // 1
        this._checkpointStore = new InMemoryCheckpointStore();
        this._userChoseCheckpointStore = false;
        eventHubClientOptions = checkpointStoreOrEventHubNameOrOptions3 as
          | EventHubConsumerClientOptions
          | undefined;
      }

      this._eventHubClient = new EventHubClient(
        connectionStringOrFullyQualifiedNamespace2,
        eventHubClientOptions
      );
    }
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws Error if the underlying connection encounters an error while closing.
   */
  close(): Promise<void> {
    return this._eventHubClient.close();
  }

  /**
   * Provides the id for each partition associated with the Event Hub.
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings representing the id for
   * each partition associated with the Event Hub.
   * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<string[]> {
    return this._eventHubClient.getPartitionIds(options);
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
    return this._eventHubClient.getPartitionProperties(partitionId, options);
  }

  /**
   * Provides the Event Hub runtime information.
   * @param options The set of options to apply to the operation call.
   * @returns A promise that resolves with information about the Event Hub instance.
   * @throws Error if the underlying connection has been closed, create a new EventHubConsumerClient.
   * @throws AbortError if the operation is cancelled via the abortSignal.
   */
  getEventHubProperties(options: GetEventHubPropertiesOptions = {}): Promise<EventHubProperties> {
    return this._eventHubClient.getProperties(options);
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
    } else if (
      typeof handlersOrPartitionId1 === "string" &&
      isSubscriptionEventHandlers(optionsOrHandlers2)
    ) {
      // #2: subscribe overload (read from specific partition IDs), don't coordinate
      const options = possibleOptions3 as SubscribeOptions | undefined;
      if (options && options.startPosition) {
        validateEventPositions(options.startPosition);
      }
      ({ targetedPartitionId, eventProcessor } = this.createEventProcessorForSinglePartition(
        handlersOrPartitionId1,
        optionsOrHandlers2,
        possibleOptions3
      ));
    } else {
      throw new TypeError("Unhandled subscribe() overload");
    }

    eventProcessor.start();

    return {
      get isRunning() {
        return eventProcessor.isRunning();
      },
      close: () => {
        this._partitionGate.remove(targetedPartitionId);
        return eventProcessor.stop();
      }
    };
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

    const eventProcessor = this._createEventProcessor(
      this._consumerGroup,
      this._eventHubClient,
      subscriptionEventHandlers,
      this._checkpointStore,
      {
        ...defaultConsumerClientOptions,
        ...(options as SubscribeOptions),
        ownerLevel: getOwnerLevel(options, this._userChoseCheckpointStore),
        processingTarget: this._userChoseCheckpointStore
          ? undefined
          : new GreedyPartitionLoadBalancer(),
        // make it so all the event processors process work with the same overarching owner ID
        // this allows the EventHubConsumer to unify all the work for any processors that it spawns
        ownerId: this._id
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
      this._consumerGroup,
      this._eventHubClient,
      eventHandlers,
      this._checkpointStore,
      {
        ...defaultConsumerClientOptions,
        ...options,
        processingTarget: partitionId,
        ownerLevel: getOwnerLevel(subscribeOptions, this._userChoseCheckpointStore)
      }
    );

    return { targetedPartitionId: partitionId, eventProcessor };
  }

  private _createEventProcessor(
    consumerGroup: string,
    eventHubClient: EventHubClient,
    subscriptionEventHandlers: SubscriptionEventHandlers,
    checkpointStore: CheckpointStore,
    options: FullEventProcessorOptions
  ) {
    return new EventProcessor(
      consumerGroup,
      eventHubClient,
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
