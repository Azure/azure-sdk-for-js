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
        {
          ...possibleOptions
        }
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
