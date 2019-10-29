import { EventHubClientOptions, EventHubClient } from "./eventHubClient";
import { PartitionProcessor } from "./partitionProcessor";
import { ReceivedEventData } from "./eventData";
import { InMemoryPartitionManager } from "./inMemoryPartitionManager";
import { EventProcessor, PartitionManager, CloseReason, PartitionContext } from "./eventProcessor";
import { GreedyPartitionLoadBalancer } from "./partitionLoadBalancer";
import { TokenCredential } from "@azure/identity";

import {
  SubscriptionOptions,
  Subscription
} from "./eventHubConsumerClientModels";
import { isTokenCredential } from "../../../core/core-auth/types/core-auth";

export type OnReceivedEvents = (
  receivedEvents: ReceivedEventData[],
  context: PartitionContext
) => Promise<void>;

export class EventHubConsumerClient {
  private _eventHubClient: EventHubClient;
  private _consumerGroupName: string;

  /**
   * @constructor
   * @param consumerGroupName The name of the consumer group from which you want to process events.
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
  constructor(consumerGroupName: string, connectionString: string, options?: EventHubClientOptions);
  /**
   * @constructor
   * @param consumerGroupName The name of the consumer group from which you want to process events.
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
  constructor(consumerGroupName: string, connectionString: string, eventHubName: string, options?: EventHubClientOptions);
  /**
   * @constructor
   * @param consumerGroupName The name of the consumer group from which you want to process events.
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
    consumerGroupName: string,
    host: string,
    eventHubName: string,
    credential: TokenCredential,
    options?: EventHubClientOptions
  );
  constructor(
    consumerGroupName: string,
    hostOrConnectionString: string,
    eventHubNameOrOptions?: string | EventHubClientOptions,
    credentialOrOptions?: TokenCredential | EventHubClientOptions,
    options?: EventHubClientOptions
  ) {

    this._consumerGroupName = consumerGroupName;

    if (isTokenCredential(credentialOrOptions)) {
      // #3
      this._eventHubClient = new EventHubClient(
        hostOrConnectionString,
        eventHubNameOrOptions as string,
        credentialOrOptions as TokenCredential,
        options
      );
    } else if (typeof eventHubNameOrOptions === "string") {
      // #2
      this._eventHubClient = new EventHubClient(
        hostOrConnectionString,
        eventHubNameOrOptions as string,
        credentialOrOptions as EventHubClientOptions
      );
    } else {
      // #1
      this._eventHubClient = new EventHubClient(hostOrConnectionString, options);
    }
  }

  close() {
    this._eventHubClient.close();
  }

  getPartitionIds(): Promise<string[]> {
    return this._eventHubClient.getPartitionIds();
  }

  /**
   * Subscribe to all messages from all available partitions.
   *
   * Use this overload if you want to read from all partitions and not coordinate with
   * other subscribers.
   *
   * @param onReceivedEvents Called when new events are received.
   * @param options Options to handle additional events related to partitions (errors, 
   *                opening, closing) as well as batch sizing.
   */
  subscribe(onReceivedEvents: OnReceivedEvents, options?: SubscriptionOptions): Subscription;
  /**
   * Subscribe to all messages from a subset of partitions.
   *
   * Use this overload if you want to read from a specific set of partitions and not coordinate with
   * other subscribers.
   *
   * @param onReceivedEvents Called when new events are received.
   * @param partitionIds An array of partition ids to subscribe to.
   * @param options Options to handle additional events related to partitions (errors, 
   *                opening, closing) as well as batch sizing.
   */  
  subscribe(onReceivedEvents: OnReceivedEvents, partitionIds: string[], options?: SubscriptionOptions): Subscription;
  /**
   * Subscribes to multiple partitions.
   *
   * Use this overload if you want to coordinate with other subscribers using a `PartitionManager`
   *
   * @param onReceivedEvents Called when new events are received.
   *                         This is also a good place to update checkpoints as appropriate.
   * @param partitionManager A partition manager that manages ownership information and checkpoint details.
   * @param options Options to handle additional events related to partitions (errors, 
   *                opening, closing) as well as batch sizing.
   */
  subscribe(
    onReceivedEvents: OnReceivedEvents,
    partitionManager: PartitionManager,
    options?: SubscriptionOptions
  ): Subscription;
  subscribe(
    onReceivedEvents: OnReceivedEvents,
    optionsOrPartitionIdsOrPartitionManager: SubscriptionOptions | undefined | string[] | PartitionManager,
    possibleOptions?: SubscriptionOptions
  ): Subscription {
    let eventProcessor: EventProcessor;

    if (Array.isArray(optionsOrPartitionIdsOrPartitionManager)) {
      // 2nd subscribe overload (read from specific partition IDs), don't coordinate
      const partitionProcessorType = createPartitionProcessorType(
        onReceivedEvents,
        possibleOptions
      );

      eventProcessor = new EventProcessor(
        this._consumerGroupName,
        this._eventHubClient,
        partitionProcessorType,
        new InMemoryPartitionManager(),
        {
          ...possibleOptions,
          // this load balancer will just grab _all_ the partitions, not looking at ownership
          partitionLoadBalancer: new GreedyPartitionLoadBalancer(optionsOrPartitionIdsOrPartitionManager as string[])
        }
      );
    } else if (isPartitionManager(optionsOrPartitionIdsOrPartitionManager)) {
      // 3rd subscribe overload (read from all partitions and coordinate using a partition manager)
      const partitionProcessorType = createPartitionProcessorType(
        onReceivedEvents,
        possibleOptions
      );

      eventProcessor = new EventProcessor(
        this._consumerGroupName,
        this._eventHubClient,
        partitionProcessorType,
        optionsOrPartitionIdsOrPartitionManager as PartitionManager,
        possibleOptions
      );
    } else {
      // 1st subscribe overload - read from all partitions, don't coordinate
      const partitionProcessorType = createPartitionProcessorType(
        onReceivedEvents,
        optionsOrPartitionIdsOrPartitionManager as SubscriptionOptions
      );

      eventProcessor = new EventProcessor(
        this._consumerGroupName,
        this._eventHubClient,
        partitionProcessorType,
        new InMemoryPartitionManager(),
        {
          ...optionsOrPartitionIdsOrPartitionManager as SubscriptionOptions,
          partitionLoadBalancer: new GreedyPartitionLoadBalancer()
        }
      );
    }

    eventProcessor.start();

    return {
      isReceiverOpen: () => eventProcessor.isRunning(),
      stop: () => eventProcessor.stop(),
      consumerGroup: () => this._consumerGroupName
    };
  }
}

/**
 * @ignore
 */
export function createPartitionProcessorType(
  onReceivedEvents: (
    receivedEvents: ReceivedEventData[],
    context: PartitionContext
  ) => Promise<void>,
  options: SubscriptionOptions = {}
): typeof PartitionProcessor {
  class DefaultPartitionProcessor extends PartitionProcessor {
    async processEvents(events: ReceivedEventData[]): Promise<void> {
      await onReceivedEvents(events, {
        partitionId: this.partitionId,
        consumerGroupName: this.consumerGroupName,
        eventHubName: this.eventHubName
      });
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

function isPartitionManager(possible: SubscriptionOptions | undefined | string[] | PartitionManager): possible is PartitionManager {
  const partitionManager = possible as PartitionManager;
    
  return partitionManager.claimOwnership != null
    && partitionManager.listOwnership != null
    && partitionManager.updateCheckpoint != null;
}
