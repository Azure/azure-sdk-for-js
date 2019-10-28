import { EventHubClientOptions, EventHubClient } from "./eventHubClient";
import { PartitionProcessor } from "./partitionProcessor";
import { ReceivedEventData } from "./eventData";
import { InMemoryPartitionManager } from "./inMemoryPartitionManager";
import { EventProcessor, PartitionManager, CloseReason, PartitionContext } from "./eventProcessor";
import { GreedyPartitionLoadBalancer } from "./partitionLoadBalancer";

import {
  HostAndTokenCredential,
  EventHubConnectionString,
  SubscriptionOptions,
  Subscription
} from "./eventHubConsumerClientModels";

export type OnReceivedEvents = (
  receivedEvents: ReceivedEventData[],
  context: PartitionContext
) => Promise<void>;

export class EventHubConsumerClient {
  private _eventHubClient: EventHubClient;
  private _consumerGroupName: string;

  constructor(
    connectionInfo: EventHubConnectionString | HostAndTokenCredential,
    consumerGroupName: string,
    options?: EventHubClientOptions
  ) {
    this._eventHubClient = createEventHubClient(connectionInfo, options);
    this._consumerGroupName = consumerGroupName;
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
  subscribe(partitionIds: string[], onReceivedEvents: OnReceivedEvents, options?: SubscriptionOptions): Subscription;
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
        new InMemoryPartitionManager(),
        {
          ...optionsOrOnReceivedEvents as SubscriptionOptions,
          partitionLoadBalancer: new GreedyPartitionLoadBalancer()
        }
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
          ...possibleOptions,
          // this load balancer will just grab _all_ the partitions, not looking at ownership
          partitionLoadBalancer: new GreedyPartitionLoadBalancer(onReceivedEventsOrPartitionIdsOrPartitionManager as string[])
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
          ...possibleOptions,
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
export function createEventHubClient(
  connectionInfo: EventHubConnectionString | HostAndTokenCredential,
  options?: EventHubClientOptions
) {
  if (isHostAndTokenCredential(connectionInfo)) {
    return new EventHubClient(
      connectionInfo.host,
      connectionInfo.eventHubName,
      connectionInfo.credential,
      options
    );
  } else {
    if (connectionInfo.eventHubName) {
      return new EventHubClient(connectionInfo.connectionString, connectionInfo.eventHubName, options);
    } else {
      return new EventHubClient(connectionInfo.connectionString, options);
    }
  }
}

/**
 * @ignore
 */
export function isHostAndTokenCredential(
  connectionInfo: EventHubConnectionString | HostAndTokenCredential
): connectionInfo is HostAndTokenCredential {
  return !(connectionInfo as EventHubConnectionString).connectionString;
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
