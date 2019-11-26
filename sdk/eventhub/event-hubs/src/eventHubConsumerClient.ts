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
import * as log from "./log";

import {
  SubscribeOptions,
  Subscription,
  SubscriptionEventHandlers
} from "./eventHubConsumerClientModels";
import { isTokenCredential } from "@azure/core-amqp";
import { PartitionProperties, EventHubProperties } from "./managementClient";

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
 * @class
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

  /**
   * @property
   * The name of the default consumer group in the Event Hubs service.
   */
  static defaultConsumerGroupName: string = Constants.defaultConsumerGroup;

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
  constructor(
    private _consumerGroup: string,
    fullyQualifiedNamespaceOrConnectionString2: string,
    eventHubNameOrOptions3?: string | EventHubClientOptions,
    credentialOrOptions4?: TokenCredential | EventHubClientOptions,
    options5?: EventHubClientOptions
  ) {
    if (isTokenCredential(credentialOrOptions4)) {
      // #3
      log.consumerClient("Creating client with TokenCredential");

      this._eventHubClient = new EventHubClient(
        fullyQualifiedNamespaceOrConnectionString2,
        eventHubNameOrOptions3 as string,
        credentialOrOptions4,
        options5
      );
    } else if (typeof eventHubNameOrOptions3 === "string") {
      // #2
      log.consumerClient("Creating client with connection string and event hub name");

      this._eventHubClient = new EventHubClient(
        fullyQualifiedNamespaceOrConnectionString2,
        eventHubNameOrOptions3,
        credentialOrOptions4 as EventHubClientOptions
      );
    } else {
      // #1
      log.consumerClient("Creating client with connection string");

      this._eventHubClient = new EventHubClient(
        fullyQualifiedNamespaceOrConnectionString2,
        eventHubNameOrOptions3 as EventHubClientOptions
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
   * Use this overload if you want to read from all partitions and not coordinate with
   * other subscribers.
   *
   * @param handlers Handlers for the lifecycle of the subscription - initialization
   *                 per partition, receiving events, handling errors and the closing
   *                 of a subscription per partition.
   * @param options Options to handle additional events related to partitions (errors,
   *                opening, closing) as well as batch sizing.
   */
  subscribe(handlers: SubscriptionEventHandlers, options?: SubscribeOptions): Subscription; // #1
  /**
   * Subscribe to all messages from a subset of partitions.
   *
   * Use this overload if you want to read from a specific set of partitions and not coordinate with
   * other subscribers.
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
  /**
   * Subscribes to multiple partitions.
   *
   * Use this overload if you want to coordinate with other subscribers using a `CheckpointStore`
   *
   * @param checkpointStore A checkpoint store that manages ownership information and checkpoint details.
   * @param handlers Handlers for the lifecycle of the subscription - initialization
   *                 per partition, receiving events, handling errors and the closing
   *                 of a subscription per partition.
   * @param options Options to handle additional events related to partitions (errors,
   *                opening, closing) as well as batch sizing.
   */
  subscribe(
    checkpointStore: CheckpointStore,
    handlers: SubscriptionEventHandlers,
    options?: SubscribeOptions
  ): Subscription; // #3
  subscribe(
    handlersOrPartitionIdOrCheckpointStore1?: SubscriptionEventHandlers | string | CheckpointStore,
    optionsOrHandlers2?: SubscribeOptions | SubscriptionEventHandlers,
    possibleOptions3?: SubscribeOptions
  ): Subscription {
    let eventProcessor: EventProcessor;

    if (
      typeof handlersOrPartitionIdOrCheckpointStore1 === "string" &&
      isSubscriptionEventHandlers(optionsOrHandlers2)
    ) {
      // #2: subscribe overload (read from specific partition IDs), don't coordinate
      const subscribeOptions = possibleOptions3 as SubscribeOptions | undefined;
      const partitionId = handlersOrPartitionIdOrCheckpointStore1;

      log.consumerClient(`Subscribing to specific partition (${partitionId}), no coordination.`);

      const checkpointStore = new InMemoryCheckpointStore();

      eventProcessor = new EventProcessor(
        this._consumerGroup,
        this._eventHubClient,
        optionsOrHandlers2,
        checkpointStore,
        {
          ...defaultConsumerClientOptions,
          ...possibleOptions3,
          // this load balancer will just grab _all_ the partitions, not looking at ownership
          partitionLoadBalancer: new GreedyPartitionLoadBalancer([partitionId]),
          ownerLevel: getOwnerLevel(subscribeOptions, "noOwner")
        }
      );
    } else if (
      isCheckpointStore(handlersOrPartitionIdOrCheckpointStore1) &&
      isSubscriptionEventHandlers(optionsOrHandlers2)
    ) {
      // #3: subscribe overload (read from all partitions and coordinate using a partition manager)
      log.consumerClient("Subscribing to all partitions, coordinating using a partition manager.");
      const subscribeOptions = possibleOptions3 as SubscribeOptions | undefined;
      const checkpointStore = handlersOrPartitionIdOrCheckpointStore1;

      eventProcessor = new EventProcessor(
        this._consumerGroup,
        this._eventHubClient,
        optionsOrHandlers2,
        checkpointStore,
        {
          ...defaultConsumerClientOptions,
          ...possibleOptions3,
          ownerLevel: getOwnerLevel(subscribeOptions, 0)
        }
      );
    } else if (isSubscriptionEventHandlers(handlersOrPartitionIdOrCheckpointStore1)) {
      // #1: subscribe overload - read from all partitions, don't coordinate
      log.consumerClient("Subscribing to all partitions, don't coordinate.");
      const subscribeOptions = optionsOrHandlers2 as SubscribeOptions | undefined;
      const checkpointStore = new InMemoryCheckpointStore();

      eventProcessor = new EventProcessor(
        this._consumerGroup,
        this._eventHubClient,
        handlersOrPartitionIdOrCheckpointStore1,
        checkpointStore,
        {
          ...defaultConsumerClientOptions,
          ...(optionsOrHandlers2 as SubscribeOptions),
          ownerLevel: getOwnerLevel(subscribeOptions, "noOwner"),
          partitionLoadBalancer: new GreedyPartitionLoadBalancer()
        }
      );
    } else {
      throw new TypeError("Unhandled subscribe() overload");
    }

    eventProcessor.start();

    return {
      get isRunning() {
        return eventProcessor.isRunning();
      },
      close: () => eventProcessor.stop()
    };
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
  defaultOwnerLevel: number | "noOwner"
): number | undefined {
  if (options && options.ownerLevel) {
    return options.ownerLevel;
  }

  return typeof defaultOwnerLevel === "string" ? undefined : defaultOwnerLevel;
}
