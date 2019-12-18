// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  EventHubClientOptions,
  EventHubClient,
  GetPartitionPropertiesOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions
} from "./impl/eventHubClient";
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
 * The `EventHubConsumerClient` is the main point of interaction for consuming events in Azure Event Hubs service.
 *
 * There are multiple ways to create an `EventHubConsumerClient`
 * - Use the connection string from the SAS policy created for your Event Hub instance.
 * - Use the connection string from the SAS policy created for your Event Hub namespace,
 * and the name of the Event Hub instance
 * - Use the fully qualified domain name of your Event Hub namespace like `<yournamespace>.servicebus.windows.net`,
 * and a credentials object.
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
   * @constructor
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
   * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
   * @param options - A set of options to apply when configuring the client.
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   * - `webSocketOptions`: Options for the websocket implementation used for AMQP.
   */
  constructor(consumerGroup: string, connectionString: string, options?: EventHubClientOptions); // #1
  /**
   * @constructor
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
   * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
   * @param checkpointStore An instance of `CheckpointStore`. See &commat;azure/eventhubs-checkpointstore-blob for a
   *  production-ready implementation.
   * @param options - A set of options to apply when configuring the client.
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   * - `webSocketOptions`: Options for the websocket implementation used for AMQP.
   */
  constructor(
    consumerGroup: string,
    connectionString: string,
    checkpointStore: CheckpointStore,
    options?: EventHubClientOptions
  ); // #1.1
  /**
   * @constructor
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace;
   * it is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param options - A set of options to apply when configuring the client.
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `webSocketOptions`: Options for the websocket implementation used for AMQP.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(
    consumerGroup: string,
    connectionString: string,
    eventHubName: string,
    options?: EventHubClientOptions
  ); // #2
  /**
   * @constructor
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace;
   * it is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param checkpointStore An instance of `CheckpointStore`. See &commat;azure/eventhubs-checkpointstore-blob for a
   *  production-ready implementation.
   * @param options - A set of options to apply when configuring the client.
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `webSocketOptions`: Options for the websocket implementation used for AMQP.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(
    consumerGroup: string,
    connectionString: string,
    eventHubName: string,
    checkpointStore: CheckpointStore,
    options?: EventHubClientOptions
  ); // #2.1
  /**
   * @constructor
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param fullyQualifiedNamespace - The fully qualified host name for the Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param credential - SharedKeyCredential object or your credential that implements the TokenCredential interface.
   * @param options - A set of options to apply when configuring the client.
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `webSocketOptions`: Options for the websocket implementation used for AMQP.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(
    consumerGroup: string,
    fullyQualifiedNamespace: string,
    eventHubName: string,
    credential: TokenCredential,
    options?: EventHubClientOptions
  ); // #3
  /**
   * @constructor
   * @param consumerGroup The name of the consumer group from which you want to process events.
   * @param fullyQualifiedNamespace - The fully qualified host name for the Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param credential - SharedKeyCredential object or your credential that implements the TokenCredential interface.
   * @param checkpointStore An instance of `CheckpointStore`. See &commat;azure/eventhubs-checkpointstore-blob for a
   *  production-ready implementation.
   * @param options - A set of options to apply when configuring the client.
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `webSocketOptions`: Options for the websocket implementation used for AMQP.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(
    consumerGroup: string,
    fullyQualifiedNamespace: string,
    eventHubName: string,
    credential: TokenCredential,
    checkpointStore: CheckpointStore,
    options?: EventHubClientOptions
  ); // #3.1
  constructor(
    private _consumerGroup: string,
    connectionStringOrFullyQualifiedNamespace2: string,
    checkpointStoreOrEventHubNameOrOptions3?: CheckpointStore | EventHubClientOptions | string,
    checkpointStoreOrCredentialOrOptions4?:
      | CheckpointStore
      | EventHubClientOptions
      | TokenCredential,
    checkpointStoreOrOptions5?: CheckpointStore | EventHubClientOptions,
    options6?: EventHubClientOptions
  ) {
    if (isTokenCredential(checkpointStoreOrCredentialOrOptions4)) {
      // #3 or 3.1
      logger.info("Creating EventHubConsumerClient with TokenCredential.");

      let eventHubClientOptions: EventHubClientOptions | undefined;

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

      let eventHubClientOptions: EventHubClientOptions | undefined;

      if (isCheckpointStore(checkpointStoreOrCredentialOrOptions4)) {
        // 2.1
        this._checkpointStore = checkpointStoreOrCredentialOrOptions4;
        this._userChoseCheckpointStore = true;
        eventHubClientOptions = checkpointStoreOrOptions5 as EventHubClientOptions | undefined;
      } else {
        // 2
        this._checkpointStore = new InMemoryCheckpointStore();
        this._userChoseCheckpointStore = false;
        eventHubClientOptions = checkpointStoreOrCredentialOrOptions4;
      }

      this._eventHubClient = new EventHubClient(
        connectionStringOrFullyQualifiedNamespace2,
        checkpointStoreOrEventHubNameOrOptions3,
        eventHubClientOptions as EventHubClientOptions
      );
    } else {
      // #1 or 1.1
      logger.info("Creating EventHubConsumerClient with connection string.");

      let eventHubClientOptions: EventHubClientOptions | undefined;

      if (isCheckpointStore(checkpointStoreOrEventHubNameOrOptions3)) {
        // 1.1
        this._checkpointStore = checkpointStoreOrEventHubNameOrOptions3;
        this._userChoseCheckpointStore = true;
        eventHubClientOptions = checkpointStoreOrCredentialOrOptions4 as
          | EventHubClientOptions
          | undefined;
      } else {
        // 1
        this._checkpointStore = new InMemoryCheckpointStore();
        this._userChoseCheckpointStore = false;
        eventHubClientOptions = checkpointStoreOrEventHubNameOrOptions3 as
          | EventHubClientOptions
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
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  close(): Promise<void> {
    return this._eventHubClient.close();
  }

  /**
   * Provides an array of partitionIds.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  getPartitionIds(options: GetPartitionIdsOptions = {}): Promise<string[]> {
    return this._eventHubClient.getPartitionIds(options);
  }

  /**
   * Provides information about the specified partition.
   * @param partitionId Partition ID for which partition information is required.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resoloves with PartitionProperties.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  getPartitionProperties(
    partitionId: string,
    options: GetPartitionPropertiesOptions = {}
  ): Promise<PartitionProperties> {
    return this._eventHubClient.getPartitionProperties(partitionId, options);
  }

  /**
   * Provides the Event Hub runtime information.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resolves with EventHubProperties.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  getEventHubProperties(options: GetEventHubPropertiesOptions = {}): Promise<EventHubProperties> {
    return this._eventHubClient.getProperties(options);
  }

  /**
   * Subscribe to all messages from all available partitions.
   *
   * @param handlers Handlers for the lifecycle of the subscription - initialization
   *                 per partition, receiving events, handling errors and the closing
   *                 of a subscription per partition.
   * @param options Options to handle additional events related to partitions (errors,
   *                opening, closing) as well as batch sizing.
   */
  subscribe(handlers: SubscriptionEventHandlers, options?: SubscribeOptions): Subscription; // #1
  /**
   * Subscribe to all messages from a single partition.
   *
   * @param partitionId A partition id to subscribe to.
   * @param handlers Handlers for the lifecycle of the subscription - initialization
   *                 per partition, receiving events, handling errors and the closing
   *                 of a subscription per partition.
   * @param options Options to handle additional events related to partitions (errors,
   *                opening, closing) as well as batch sizing.
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
      ({ targetedPartitionId, eventProcessor } = this.createEventProcessorForAllPartitions(
        handlersOrPartitionId1,
        optionsOrHandlers2 as SubscribeOptions | undefined
      ));
    } else if (
      typeof handlersOrPartitionId1 === "string" &&
      isSubscriptionEventHandlers(optionsOrHandlers2)
    ) {
      // #2: subscribe overload (read from specific partition IDs), don't coordinate
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
        partitionLoadBalancer: this._userChoseCheckpointStore
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
        // this load balancer will just grab _all_ the partitions, not looking at ownership
        partitionLoadBalancer: new GreedyPartitionLoadBalancer([partitionId]),
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
