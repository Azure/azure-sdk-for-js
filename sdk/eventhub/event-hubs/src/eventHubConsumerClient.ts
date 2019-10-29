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
   * @param onMessage
   * @param onError
   */
  /**
   * Subscribes to multiple partitions.
   *
   * Use this overload if you want to read from a subset of partitions and not coordinate with
   * other subscribers.
   *
   * @param partitionIds The partitions IDs to subscribe to
   */
  subscribe(onReceivedEvents: OnReceivedEvents, options?: SubscriptionOptions): Subscription;
  subscribe(
    partitionIds: string[],
    onReceivedEvents: OnReceivedEvents,
    options?: SubscriptionOptions
  ): Subscription;
  subscribe(
    partitionManager: PartitionManager,
    onReceivedEvents: OnReceivedEvents,
    options?: SubscriptionOptions
  ): Subscription;
  subscribe(
    onReceivedEventsOrPartitionIdsOrPartitionManager:
      | OnReceivedEvents
      | string[]
      | PartitionManager,
    optionsOrOnReceivedEvents: OnReceivedEvents | SubscriptionOptions | undefined,
    possibleOptions?: SubscriptionOptions
  ): Subscription {
    let eventProcessor: EventProcessor;

    if (typeof onReceivedEventsOrPartitionIdsOrPartitionManager === "function") {
      // 1st constructor - read from all partitions, don't coordinate
      const partitionProcessorType = createPartitionProcessorType(
        onReceivedEventsOrPartitionIdsOrPartitionManager as OnReceivedEvents,
        optionsOrOnReceivedEvents as SubscriptionOptions
      );

      eventProcessor = new EventProcessor(
        this._consumerGroupName,
        this._eventHubClient,
        partitionProcessorType,
        new InMemoryPartitionManager()
      );
    } else if (Array.isArray(onReceivedEventsOrPartitionIdsOrPartitionManager)) {
      // 2nd constructor (read from specific partition IDs), don't coordinate
      const partitionProcessorType = createPartitionProcessorType(
        optionsOrOnReceivedEvents as OnReceivedEvents,
        possibleOptions
      );

      eventProcessor = new EventProcessor(
        this._consumerGroupName,
        this._eventHubClient,
        partitionProcessorType,
        new InMemoryPartitionManager(),
        {
          // this load balancer will just grab _all_ the partitions, not looking at ownership
          partitionLoadBalancer: new GreedyPartitionLoadBalancer(
            onReceivedEventsOrPartitionIdsOrPartitionManager as string[]
          )
        }
      );
    } else if (typeof onReceivedEventsOrPartitionIdsOrPartitionManager === "object") {
      // 3rd constructor (read from all partitions and coordinate using a partition manager
      const partitionProcessorType = createPartitionProcessorType(
        optionsOrOnReceivedEvents as OnReceivedEvents,
        possibleOptions
      );

      eventProcessor = new EventProcessor(
        this._consumerGroupName,
        this._eventHubClient,
        partitionProcessorType,
        onReceivedEventsOrPartitionIdsOrPartitionManager as PartitionManager,
        {
          partitionLoadBalancer: new GreedyPartitionLoadBalancer()
        }
      );
    } else {
      throw new Error("Unhandled constructor overload");
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
    constructor() {
      super();
    }

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
        options.onInitialize({
          partitionId: this.partitionId,
          consumerGroupName: this.consumerGroupName,
          eventHubName: this.eventHubName
        });
      }
    }

    async close(reason: CloseReason) {
      if (options.onClose) {
        options.onClose(reason, {
          partitionId: this.partitionId,
          consumerGroupName: this.consumerGroupName,
          eventHubName: this.eventHubName
        });
      }
    }
  }

  return DefaultPartitionProcessor;
}
