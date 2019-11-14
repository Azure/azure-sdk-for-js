// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  EventHubClientOptions,
  EventHubClient,
  GetPartitionPropertiesOptions,
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions
} from "./eventHubClient";
import { PartitionProcessor, Checkpoint } from "./partitionProcessor";
import { ReceivedEventData } from "./eventData";
import { InMemoryPartitionManager } from "./inMemoryPartitionManager";
import { EventProcessor, PartitionManager, CloseReason, PartitionContext } from "./eventProcessor";
import { GreedyPartitionLoadBalancer } from "./partitionLoadBalancer";
import { TokenCredential, Constants } from "@azure/core-amqp";
import * as log from "./log";

import { SubscriptionOptions, Subscription, SubscriptionEventHandlers } from "./eventHubConsumerClientModels";
import { isTokenCredential } from "@azure/core-amqp";
import { PartitionProperties, EventHubProperties } from "./managementClient";
import { EventPosition } from './eventPosition';

/**
 * Allows for configuring initialization of partition processors
 */
export interface SubscriptionPartitionInitializer {
  /**
   * Allows for setting the start position of a partition.
   * Default (if not called) is `EventPosition.earliest()`
   */
  setStartPosition(startPosition: EventPosition | "earliest" | "latest"): void;
}

/**
 * Allow for checkpointing
 */
export interface PartitionCheckpointer {
  /**
   * Updates the checkpoint using the event data.
   *
   * A checkpoint is meant to represent the last successfully processed event by the user from a particular
   * partition of a consumer group in an Event Hub instance.
   *
   * @param eventData The event that you want to update the checkpoint with.
   * @return Promise<void>
   */
  updateCheckpoint(eventData: ReceivedEventData): Promise<void>;
  /**
   * Updates the checkpoint using the given offset and sequence number.
   *
   * A checkpoint is meant to represent the last successfully processed event by the user from a particular
   * partition of a consumer group in an Event Hub instance.
   *
   * @param sequenceNumber The sequence number of the event that you want to update the checkpoint with.
   * @param offset The offset of the event that you want to update the checkpoint with.
   * @return  Promise<void>.
   */
  updateCheckpoint(sequenceNumber: number, offset: number): Promise<void>;
  /**
   * @internal
   * @ignore
   */
  updateCheckpoint(
    eventDataOrSequenceNumber: ReceivedEventData | number,
    offset?: number
  ): Promise<void>;
}

const defaultConsumerClientOptions : Required<Pick<SubscriptionOptions, 'maxBatchSize' | 'maxWaitTimeInSeconds'>> = {
  maxBatchSize: 10,
  maxWaitTimeInSeconds: 10
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
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace.
   * It is expected that the shared key properties and the Event Hub path are contained in this connection string.
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name'.
   * @param options - A set of options to apply when configuring the client.
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
   * over a WebSocket.
   * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
   * over a WebSocket.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(consumerGroup: string, connectionString: string, options?: EventHubClientOptions); // #1
  /**
   * @constructor
   * @param connectionString - The connection string to use for connecting to the Event Hubs namespace;
   * it is expected that the shared key properties are contained in this connection string, but not the Event Hub path,
   * e.g. 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;'.
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param options - A set of options to apply when configuring the client.
   * - `userAgent`      : A string to append to the built in user agent string that is passed as a connection property
   * to the service.
   * - `websocket`      : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
   * over a WebSocket.
   * - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
   * over a WebSocket.
   * - `retryOptions`   : The retry options for all the operations on the client/producer/consumer.
   * A simple usage can be `{ "maxRetries": 4 }`.
   */
  constructor(connectionString: string, eventHubName: string, options?: EventHubClientOptions); // #2
  /**
   * @constructor
   * @param fullyQualifiedNamespace - The fully qualified host name for the Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param eventHubName - The path of the specific Event Hub to connect the client to.
   * @param credential - SharedKeyCredential object or your credential that implements the TokenCredential interface.
   * @param options - A set of options to apply when configuring the client.
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
    fullyQualifiedNamespace: string,
    eventHubName: string,
    credential: TokenCredential,
    options?: EventHubClientOptions
  ); // #3
  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    eventHubNameOrOptions2?: string | EventHubClientOptions,
    credentialOrOptions3?: TokenCredential | EventHubClientOptions,
    options4?: EventHubClientOptions
  ) {
    if (isTokenCredential(credentialOrOptions3)) {
      // #3
      log.consumerClient("Creating client with TokenCredential");

      this._eventHubClient = new EventHubClient(
        fullyQualifiedNamespaceOrConnectionString1,
        eventHubNameOrOptions2 as string,
        credentialOrOptions3,
        options4
      );
    } else if (typeof eventHubNameOrOptions2 === "string") {
      // #2
      log.consumerClient("Creating client with connection string and event hub name");

      this._eventHubClient = new EventHubClient(
        fullyQualifiedNamespaceOrConnectionString1,
        eventHubNameOrOptions2,
        credentialOrOptions3 as EventHubClientOptions
      );
    } else {
      // #1
      log.consumerClient("Creating client with connection string");

      this._eventHubClient = new EventHubClient(
        fullyQualifiedNamespaceOrConnectionString1,
        eventHubNameOrOptions2 as EventHubClientOptions
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
  getPartitionIds(option: GetPartitionIdsOptions = {}): Promise<string[]> {
    return this._eventHubClient.getPartitionIds(option);
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
  subscribe(
    handlers:  SubscriptionEventHandlers,
    options?: SubscriptionOptions
  ): Subscription; // #1
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
    handlers:  SubscriptionEventHandlers,
    options?: SubscriptionOptions
  ): Subscription; // #2
  /**
   * Subscribes to multiple partitions.
   *
   * Use this overload if you want to coordinate with other subscribers using a `PartitionManager`
   *
   * @param partitionManager A partition manager that manages ownership information and checkpoint details.
   * @param handlers Handlers for the lifecycle of the subscription - initialization 
   *                 per partition, receiving events, handling errors and the closing 
   *                 of a subscription per partition.
   * @param options Options to handle additional events related to partitions (errors,
   *                opening, closing) as well as batch sizing.
   */
  subscribe(
    partitionManager: PartitionManager,
    handlers:  SubscriptionEventHandlers,
    options?: SubscriptionOptions
  ): Subscription; // #3
  subscribe(
    handlersOrPartitionIdOrPartitionManager1?:
      | SubscriptionEventHandlers
      | string
      | PartitionManager,
    optionsOrHandlers2?: SubscriptionOptions | SubscriptionEventHandlers,
    possibleOptions3?: SubscriptionOptions
  ): Subscription {
    let eventProcessor: EventProcessor;

    if (typeof handlersOrPartitionIdOrPartitionManager1 === "string" && isSubscriptionEventHandlers(optionsOrHandlers2)) {
      // #2: subscribe overload (read from specific partition IDs), don't coordinate
      const partitionId = handlersOrPartitionIdOrPartitionManager1;
      
      log.consumerClient(
        `Subscribing to specific partition (${partitionId}), no coordination.`
      );

      const partitionManager = new InMemoryPartitionManager();

      const partitionProcessorType = createPartitionProcessorType(
        partitionManager,
        optionsOrHandlers2
      );

      eventProcessor = new EventProcessor(
        this._consumerGroup,
        this._eventHubClient,
        partitionProcessorType,
        partitionManager,
        {
          ...defaultConsumerClientOptions,
          ...possibleOptions3,
          // this load balancer will just grab _all_ the partitions, not looking at ownership
          partitionLoadBalancer: new GreedyPartitionLoadBalancer([partitionId])
        }
      );
    } else if (isPartitionManager(handlersOrPartitionIdOrPartitionManager1) && isSubscriptionEventHandlers(optionsOrHandlers2)) {
      // #3: subscribe overload (read from all partitions and coordinate using a partition manager)
      log.consumerClient("Subscribing to all partitions, coordinating using a partition manager.");

      const partitionManager = handlersOrPartitionIdOrPartitionManager1;

      const partitionProcessorType = createPartitionProcessorType(
        partitionManager,
        optionsOrHandlers2
      );

      eventProcessor = new EventProcessor(
        this._consumerGroup,
        this._eventHubClient,
        partitionProcessorType,
        partitionManager,
        { ...defaultConsumerClientOptions, ...possibleOptions3 }
      );
    } if (isSubscriptionEventHandlers(handlersOrPartitionIdOrPartitionManager1)) {
      // #1: subscribe overload - read from all partitions, don't coordinate
      log.consumerClient("Subscribing to all partitions, don't coordinate.");

      const partitionManager = new InMemoryPartitionManager();

      const partitionProcessorType = createPartitionProcessorType(
        partitionManager,
        handlersOrPartitionIdOrPartitionManager1
      );

      eventProcessor = new EventProcessor(
        this._consumerGroup,
        this._eventHubClient,
        partitionProcessorType,
        partitionManager,
        {
          ...defaultConsumerClientOptions,
          ...(optionsOrHandlers2 as SubscriptionOptions),
          partitionLoadBalancer: new GreedyPartitionLoadBalancer()
        }
      );
    } else {
      throw new TypeError("Unhandled subscribe() overload");
    }

    eventProcessor.start();

    return {
      get isRunning() { return eventProcessor.isRunning() },
      close: () => eventProcessor.stop()
    };
  }
}

/**
 * @ignore
 */
export function createPartitionProcessorType(
  partitionManager: PartitionManager,
  options: SubscriptionEventHandlers
): typeof PartitionProcessor {
  class DefaultPartitionProcessor extends PartitionProcessor {
    private _partitionCheckpointer?: SimplePartitionCheckpointer;

    async processEvent(event: ReceivedEventData): Promise<void> {
      await options.processEvent(
        event,
        this._partitionCheckpointer!
      );
    }

    async processError(error: Error): Promise<void> {
      if (options.processError) {
        await options.processError(error, this._partitionCheckpointer!);
      }
    }

    async initialize() {
      this._partitionCheckpointer = new SimplePartitionCheckpointer(partitionManager, this, this.eventHubName, this.consumerGroupName, this.partitionId, this.fullyQualifiedNamespace);

      if (options.processInitialize) {
        await options.processInitialize(this._partitionCheckpointer);
      }
    }

    async close(reason: CloseReason) {
      if (options.processClose) {
        await options.processClose(reason, this._partitionCheckpointer!);
      }
    }
  }

  return DefaultPartitionProcessor;
}

/**
 * @internal
 * @ignore
 */
export function isPartitionManager(
  possible: PartitionManager | any
): possible is PartitionManager {
  if (!possible) {
    return false;
  }

  const partitionManager = possible as PartitionManager;

  return (
    typeof partitionManager.claimOwnership === "function" &&
    typeof partitionManager.listOwnership === "function" &&
    typeof partitionManager.updateCheckpoint === "function"
  );
}

/**
 * @internal
 * @ignore
 */
function isSubscriptionEventHandlers(possible: any | SubscriptionEventHandlers): possible is SubscriptionEventHandlers {
  return typeof (possible as SubscriptionEventHandlers).processEvent === "function";
}

class SimplePartitionCheckpointer implements PartitionCheckpointer, PartitionContext, SubscriptionPartitionInitializer {
  // private _eTag: string = "";

  constructor(private _manager: PartitionManager, private _processor: PartitionProcessor, public eventHubName: string, public consumerGroupName: string, public partitionId: string, public fullyQualifiedNamespace: string) {   }

  async updateCheckpoint(
    eventData: ReceivedEventData
  ): Promise<void>;
  async updateCheckpoint(
    sequenceNumber: number,
    offset: number
  ): Promise<void>;
  async updateCheckpoint(
    eventDataOrSequenceNumber: ReceivedEventData | number,
    offset?: number
  ): Promise<void> {
    const checkpoint: Checkpoint = {
      fullyQualifiedNamespace: this._processor.fullyQualifiedNamespace!,
      eventHubName: this._processor.eventHubName!,
      consumerGroupName: this._processor.consumerGroupName!,
      partitionId: this._processor.partitionId!,
      sequenceNumber:
        typeof eventDataOrSequenceNumber === "number"
          ? eventDataOrSequenceNumber
          : eventDataOrSequenceNumber.sequenceNumber,
      offset:
        typeof offset === "number"
          ? offset
          : (eventDataOrSequenceNumber as ReceivedEventData).offset,
      // TODO: doesn't seem right...
      // eTag: this._eTag
    };

    // this._eTag = await this._manager.updateCheckpoint(checkpoint);
    await this._manager.updateCheckpoint(checkpoint);
  }

  setStartPosition(startPosition: EventPosition | "earliest" | "latest"): void {
    // TODO: fill in once I remove this class entirely
  } 
}