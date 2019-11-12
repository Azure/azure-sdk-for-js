// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  EventHubClientOptions,
  EventHubClient,
  GetPartitionPropertiesOptions,
  GetPropertiesOptions,
  GetPartitionIdsOptions
} from "./eventHubClient";
import { PartitionProcessor, Checkpoint } from "./partitionProcessor";
import { ReceivedEventData } from "./eventData";
import { InMemoryPartitionManager } from "./inMemoryPartitionManager";
import { EventProcessor, PartitionManager, CloseReason, PartitionContext, EventProcessorBatchOptions } from "./eventProcessor";
import { GreedyPartitionLoadBalancer } from "./partitionLoadBalancer";
import { TokenCredential, Constants } from "@azure/core-amqp";
import * as log from "./log";

import { SubscriptionOptions, Subscription, SubscriptionEventHandlers } from "./eventHubConsumerClientModels";
import { isTokenCredential } from "@azure/core-amqp";
import { PartitionProperties, EventHubProperties } from "./managementClient";

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

const defaultConsumerClientOptions : Required<EventProcessorBatchOptions> = {
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
  constructor(connectionString: string, eventHubName: string, options?: EventHubClientOptions); // #2
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
  ); // #3
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

      this._eventHubClient = new EventHubClient(
        hostOrConnectionString1,
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
   * @param options Options to handle additional events related to partitions (errors,
   *                opening, closing) as well as batch sizing.
   */
  subscribe(
    consumerGroupName: string,
    options: SubscriptionOptions
  ): Subscription; // #1
  /**
   * Subscribe to all messages from a subset of partitions.
   *
   * Use this overload if you want to read from a specific set of partitions and not coordinate with
   * other subscribers.
   *
   * @param consumerGroupName The name of the consumer group from which you want to process events.
   * @param partitionId A partition id to subscribe to.
   * @param options Options to handle additional events related to partitions (errors,
   *                opening, closing) as well as batch sizing.
   */

  subscribe(
    consumerGroupName: string,
    partitionId: string,
    options: SubscriptionOptions
  ): Subscription; // #2
  /**
   * Subscribes to multiple partitions.
   *
   * Use this overload if you want to coordinate with other subscribers using a `PartitionManager`
   *
   * @param consumerGroupName The name of the consumer group from which you want to process events.
   *                         This is also a good place to update checkpoints as appropriate.
   * @param partitionManager A partition manager that manages ownership information and checkpoint details.
   * @param options Options to handle additional events related to partitions (errors,
   *                opening, closing) as well as batch sizing.
   */
  subscribe(
    consumerGroupName: string,
    partitionManager: PartitionManager,
    options: SubscriptionOptions
  ): Subscription; // #3
  subscribe(
    consumerGroupName1: string, 
    optionsOrPartitionIdOrPartitionManager2:
      | SubscriptionOptions
      | string
      | PartitionManager,
    possibleOptions3?: SubscriptionOptions
  ): Subscription {
    let eventProcessor: EventProcessor;

    if (typeof optionsOrPartitionIdOrPartitionManager2 === "string") {
      // #2: subscribe overload (read from specific partition IDs), don't coordinate
      if (possibleOptions3 == null) {
        throw new TypeError("SubscriptionOptions is not defined");
      }
      
      const partitionId = optionsOrPartitionIdOrPartitionManager2;
      log.consumerClient(
        `Subscribing to specific partition (${partitionId}), no coordination.`
      );

      const partitionManager = new InMemoryPartitionManager();

      const partitionProcessorType = createPartitionProcessorType(
        partitionManager,
        possibleOptions3
      );

      eventProcessor = new EventProcessor(
        consumerGroupName1,
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
    } else if (isPartitionManager(optionsOrPartitionIdOrPartitionManager2)) {
      // #3: subscribe overload (read from all partitions and coordinate using a partition manager)
      log.consumerClient("Subscribing to all partitions, coordinating using a partition manager.");

      if (possibleOptions3 == null) {
        throw new TypeError("SubscriptionOptions is not defined");
      }

      const partitionManager = optionsOrPartitionIdOrPartitionManager2;

      const partitionProcessorType = createPartitionProcessorType(
        partitionManager,
        possibleOptions3
      );

      eventProcessor = new EventProcessor(
        consumerGroupName1,
        this._eventHubClient,
        partitionProcessorType,
        partitionManager,
        { ...defaultConsumerClientOptions, ...possibleOptions3 }
      );
    } else if (isSubscriptionOptions(optionsOrPartitionIdOrPartitionManager2)) {
      // #1: subscribe overload - read from all partitions, don't coordinate
      log.consumerClient("Subscribing to all partitions, don't coordinate.");

      const partitionManager = new InMemoryPartitionManager();

      const partitionProcessorType = createPartitionProcessorType(
        partitionManager,
        optionsOrPartitionIdOrPartitionManager2
      );

      eventProcessor = new EventProcessor(
        consumerGroupName1,
        this._eventHubClient,
        partitionProcessorType,
        partitionManager,
        {
          ...defaultConsumerClientOptions,
          ...(optionsOrPartitionIdOrPartitionManager2 as SubscriptionOptions),
          partitionLoadBalancer: new GreedyPartitionLoadBalancer()
        }
      );
    } else {
      throw new TypeError("Unhandled subscribe() overload");
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
  partitionManager: PartitionManager,
  options: SubscriptionEventHandlers
): typeof PartitionProcessor {
  class DefaultPartitionProcessor extends PartitionProcessor {
    private _partitionCheckpointer?: SimplePartitionCheckpointer;

    async processEvents(events: ReceivedEventData[]): Promise<void> {
      await options.processEvents(
        events,
        this._partitionCheckpointer!
      );
    }

    async processError(error: Error): Promise<void> {
      if (options.processError) {
        await options.processError(error, {
          partitionId: this.partitionId,
          consumerGroupName: this.consumerGroupName,
          eventHubName: this.eventHubName,
          fullyQualifiedNamespace: this.fullyQualifiedNamespace
        });
      }
    }

    async initialize() {
      this._partitionCheckpointer = new SimplePartitionCheckpointer(partitionManager, this, this.eventHubName, this.consumerGroupName, this.partitionId, this.fullyQualifiedNamespace);

      if (options.processInitialize) {
        await options.processInitialize({
          partitionId: this.partitionId,
          consumerGroupName: this.consumerGroupName,
          eventHubName: this.eventHubName,
          fullyQualifiedNamespace: this.fullyQualifiedNamespace
        });
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
  possible: SubscriptionOptions | string | PartitionManager
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
function isSubscriptionOptions(possible: SubscriptionOptions | string | PartitionManager) : possible is SubscriptionOptions{
  return typeof (possible as SubscriptionOptions).processEvents === "function";
}

class SimplePartitionCheckpointer implements PartitionCheckpointer, PartitionContext {
  private _eTag: string = "";

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
      ownerId: this._processor.eventProcessorId!,
      partitionId: this._processor.partitionId!,
      sequenceNumber:
        typeof eventDataOrSequenceNumber === "number"
          ? eventDataOrSequenceNumber
          : eventDataOrSequenceNumber.sequenceNumber,
      offset:
        typeof offset === "number"
          ? offset
          : (eventDataOrSequenceNumber as ReceivedEventData).offset,
      eTag: this._eTag
    };

    this._eTag = await this._manager.updateCheckpoint(checkpoint);
  }
}