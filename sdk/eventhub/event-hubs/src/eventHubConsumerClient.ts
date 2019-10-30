// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventHubClientOptions, EventHubClient, GetPartitionPropertiesOptions, GetPropertiesOptions } from "./eventHubClient";
import { PartitionProcessor } from "./partitionProcessor";
import { ReceivedEventData } from "./eventData";
import { InMemoryPartitionManager } from "./inMemoryPartitionManager";
import { EventProcessor, PartitionManager, CloseReason, PartitionContext, PartitionCheckpointer } from "./eventProcessor";
import { GreedyPartitionLoadBalancer } from "./partitionLoadBalancer";
import { TokenCredential, Constants } from "@azure/core-amqp";
import * as log from "./log";

import {
  SubscriptionOptions,
  Subscription
} from "./eventHubConsumerClientModels";
import { isTokenCredential } from '@azure/core-amqp';
import { PartitionProperties, EventHubProperties } from './managementClient';

export type OnReceivedEvents = (
  receivedEvents: ReceivedEventData[],
  context: PartitionContext,
  checkpointer: PartitionCheckpointer
) => Promise<void>;


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
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
   * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
   * @param options - A set of options to apply when configuring the client.
   * - `dataTransformer`: A set of `encode`/`decode` methods to be used to encode an event before sending to service
   * and to decode the event received from the service
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
   * over a WebSocket.
   * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
   * over a WebSocket.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(connectionString: string, options?: EventHubClientOptions); // #1
  /**
   * @constructor
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace;
   * it is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param options - A set of options to apply when configuring the client.
   * - `dataTransformer`: A set of `encode`/`decode` methods to be used to encode an event before sending to service
   * and to decode the event received from the service
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
   * over a WebSocket.
   * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
   * over a WebSocket.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(connectionString: string, eventHubName: string, options?: EventHubClientOptions);    // #2
  /**
   * @constructor
   * @param host - The fully qualified host name for the Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param credential - SharedKeyCredential object or your credential that implements the TokenCredential interface.
   * @param options - A set of options to apply when configuring the client.
   * - `dataTransformer`: A set of `encode`/`decode` methods to be used to encode an event before sending to service
   * and to decode the event received from the service
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
   * over a WebSocket.
   * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
   * over a WebSocket.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(
    host: string,
    eventHubName: string,
    credential: TokenCredential,
    options?: EventHubClientOptions
  );    // #3
  constructor(
    hostOrConnectionString1: string,
    eventHubNameOrOptions2?: string | EventHubClientOptions,
    credentialOrOptions3?: TokenCredential | EventHubClientOptions,
    options4?: EventHubClientOptions
  ) {
    if (isTokenCredential(credentialOrOptions3)) {
      // #3
      log.consumerClient("Creating client with TokenCredential");

      this._eventHubClient = new EventHubClient(
        hostOrConnectionString1,
        eventHubNameOrOptions2 as string,
        credentialOrOptions3,
        options4
      );
    } else if (typeof eventHubNameOrOptions2 === "string") {
      // #2
      log.consumerClient("Creating client with connection string and event hub name");

      this._eventHubClient = new EventHubClient(
        hostOrConnectionString1,
        eventHubNameOrOptions2,
        credentialOrOptions3 as EventHubClientOptions
      );
    } else {
      // #1
      log.consumerClient("Creating client with connection string");

      this._eventHubClient = new EventHubClient(hostOrConnectionString1, eventHubNameOrOptions2 as EventHubClientOptions);
    }
  }

  /**
   * Closes the AMQP connection to the Event Hub instance,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns Promise<void>
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  close() : Promise<void> {
    return this._eventHubClient.close();
  }

  /**
   * Provides an array of partitionIds.
   * @param [options] The set of options to apply to the operation call.
   * @returns A promise that resolves with an Array of strings.
   * @throws {Error} Thrown if the underlying connection has been closed, create a new EventHubClient.
   * @throws {AbortError} Thrown if the operation is cancelled via the abortSignal.
   */
  getPartitionIds(): Promise<string[]> {
    return this._eventHubClient.getPartitionIds();
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
  getProperties(options: GetPropertiesOptions = {}): Promise<EventHubProperties> {
    return this._eventHubClient.getProperties(options);  
  }

  /**
   * Subscribe to all messages from all available partitions.
   *
   * Use this overload if you want to read from all partitions and not coordinate with
   * other subscribers.
   *
   * @param consumerGroupName The name of the consumer group from which you want to process events.
   * @param onReceivedEvents Called when new events are received.
   * @param options Options to handle additional events related to partitions (errors, 
   *                opening, closing) as well as batch sizing.
   */
  subscribe(consumerGroupName: string, onReceivedEvents: OnReceivedEvents, options?: SubscriptionOptions): Subscription;   // #1
  /**
   * Subscribe to all messages from a subset of partitions.
   *
   * Use this overload if you want to read from a specific set of partitions and not coordinate with
   * other subscribers.
   *
   * @param consumerGroupName The name of the consumer group from which you want to process events.
   * @param onReceivedEvents Called when new events are received.
   * @param partitionIds An array of partition ids to subscribe to.
   * @param options Options to handle additional events related to partitions (errors, 
   *                opening, closing) as well as batch sizing.
   */  
  subscribe(consumerGroupName: string, onReceivedEvents: OnReceivedEvents, partitionIds: string[], options?: SubscriptionOptions): Subscription;   // #2
  /**
   * Subscribes to multiple partitions.
   *
   * Use this overload if you want to coordinate with other subscribers using a `PartitionManager`
   *
   * @param consumerGroupName The name of the consumer group from which you want to process events.
   * @param onReceivedEvents Called when new events are received.
   *                         This is also a good place to update checkpoints as appropriate.
   * @param partitionManager A partition manager that manages ownership information and checkpoint details.
   * @param options Options to handle additional events related to partitions (errors, 
   *                opening, closing) as well as batch sizing.
   */
  subscribe(
    consumerGroupName: string,
    onReceivedEvents: OnReceivedEvents,
    partitionManager: PartitionManager,
    options?: SubscriptionOptions
  ): Subscription;      // #3
  subscribe(
    consumerGroupName1: string,
    onReceivedEvents2: OnReceivedEvents,
    optionsOrPartitionIdsOrPartitionManager3: SubscriptionOptions | undefined | string[] | PartitionManager,
    possibleOptions4?: SubscriptionOptions
  ): Subscription {
    let eventProcessor: EventProcessor;

    if (Array.isArray(optionsOrPartitionIdsOrPartitionManager3)) {
      // #2: subscribe overload (read from specific partition IDs), don't coordinate
      const partitionIds = optionsOrPartitionIdsOrPartitionManager3;
      log.consumerClient(`Subscribing to specific partitions (${partitionIds.join(",")}), no coordination.`);

      const partitionManager = new InMemoryPartitionManager();

      const partitionProcessorType = createPartitionProcessorType(
        onReceivedEvents2,
        partitionManager,
        possibleOptions4        
      );

      eventProcessor = new EventProcessor(
        consumerGroupName1,
        this._eventHubClient,
        partitionProcessorType,
        partitionManager,
        {
          ...possibleOptions4,
          // this load balancer will just grab _all_ the partitions, not looking at ownership
          partitionLoadBalancer: new GreedyPartitionLoadBalancer(partitionIds)
        }
      );
    } else if (isPartitionManager(optionsOrPartitionIdsOrPartitionManager3)) {
      // #3: subscribe overload (read from all partitions and coordinate using a partition manager)
      log.consumerClient("Subscribing to all partitions, coordinating using a partition manager.");

      const partitionManager = optionsOrPartitionIdsOrPartitionManager3;

      const partitionProcessorType = createPartitionProcessorType(
        onReceivedEvents2,
        partitionManager,
        possibleOptions4
      );

      eventProcessor = new EventProcessor(
        consumerGroupName1,
        this._eventHubClient,
        partitionProcessorType,
        partitionManager,
        possibleOptions4
      );
    } else {
      // #1: subscribe overload - read from all partitions, don't coordinate
      log.consumerClient("Subscribing to all partitions, don't coordinate.");

      const partitionManager = new InMemoryPartitionManager();
      
      const partitionProcessorType = createPartitionProcessorType(
        onReceivedEvents2,
        partitionManager,
        optionsOrPartitionIdsOrPartitionManager3 as SubscriptionOptions
      );

      eventProcessor = new EventProcessor(
        consumerGroupName1,
        this._eventHubClient,
        partitionProcessorType,
        partitionManager,
        {
          ...optionsOrPartitionIdsOrPartitionManager3 as SubscriptionOptions,
          partitionLoadBalancer: new GreedyPartitionLoadBalancer()
        }
      );
    }

    eventProcessor.start();

    return {
      isRunning: () => eventProcessor.isRunning(),
      close: () => eventProcessor.stop()
    };
  }
}

/**
 * @ignore
 */
export function createPartitionProcessorType(
  onReceivedEvents: OnReceivedEvents,
  partitionManager: PartitionManager,
  options: SubscriptionOptions = {}
): typeof PartitionProcessor {
  class DefaultPartitionProcessor extends PartitionProcessor {
    async processEvents(events: ReceivedEventData[]): Promise<void> {
      await onReceivedEvents(events, {
        partitionId: this.partitionId,
        consumerGroupName: this.consumerGroupName,
        eventHubName: this.eventHubName
      }, partitionManager);
    }

    async processError(error: Error): Promise<void> {
      if (options.onError) {
        await options.onError(error, {
          partitionId: this.partitionId,
          consumerGroupName: this.consumerGroupName,
          eventHubName: this.eventHubName
        });
      }
    }

    async initialize() {
      if (options.onInitialize) {
        await options.onInitialize({
          partitionId: this.partitionId,
          consumerGroupName: this.consumerGroupName,
          eventHubName: this.eventHubName
        });
      }
    }

    async close(reason: CloseReason) {
      if (options.onClose) {
        await options.onClose(reason, {
          partitionId: this.partitionId,
          consumerGroupName: this.consumerGroupName,
          eventHubName: this.eventHubName
        });
      }
    }
  }

  return DefaultPartitionProcessor;
}

/**
 * @internal
 * @ignore
 */
export function isPartitionManager(possible: SubscriptionOptions | undefined | string[] | PartitionManager): possible is PartitionManager {

  if (!possible) {
    return false;
  }

  const partitionManager = possible as PartitionManager;

  return typeof partitionManager.claimOwnership === "function"
    && typeof partitionManager.listOwnership === "function"
    && typeof partitionManager.updateCheckpoint === "function";
}
