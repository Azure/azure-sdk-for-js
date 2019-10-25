import { TokenCredential } from '@azure/identity';
import { EventHubClientOptions, EventHubClient } from './eventHubClient';
import { PartitionProcessor } from './partitionProcessor';
import { ReceivedEventData } from './eventData';
import { InMemoryPartitionManager } from './inMemoryPartitionManager';
import { EventProcessor, PartitionManager } from './eventProcessor';
import { MessagingError } from '@azure/core-amqp';

interface HostAndCredential {
  host: string,
  credential: TokenCredential;
  eventHubName: string;
}

interface EventHubConnectionString {
  connectionString: string;
  eventHubName?: string;
}

export class PartitionishProcessor {
  async processEvents(events: ReceivedEventData[]): Promise<void> { }
  async processError(error: Error): Promise<void> { }
}

export interface ReceiveHandlerIsh {
  stop(): Promise<void>;
  isReceiverOpen(): boolean;

  // TODO: why is this a property and not just a plain old field?
  consumerGroup(): string;
}

export class EventHubConsumerClientFacade {
  private _eventHubClient: EventHubClient;

  constructor(
    connectionInfo: EventHubConnectionString | HostAndCredential,
    private consumerGroupName: string,
    options?: EventHubClientOptions) {
    // create the client
    this._eventHubClient = EventHubConsumerClientFacade.createEventHubClient(connectionInfo, options);
  }

  private static createEventHubClient(
    connectionInfo: EventHubConnectionString | HostAndCredential,
    options?: EventHubClientOptions) {
    if (EventHubConsumerClientFacade.isHostAndCredential(connectionInfo)) {
      return new EventHubClient(connectionInfo.host, connectionInfo.eventHubName, connectionInfo.credential, options);
    }
    else {
      if (connectionInfo.eventHubName) {
        return new EventHubClient(connectionInfo.connectionString, connectionInfo.eventHubName, options);
      }
      else {
        return new EventHubClient(connectionInfo.connectionString, options);
      }
    }
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
  subscribe(
    onReceivedEvents: (receivedEvents: ReceivedEventData[]) => Promise<void>, 
    onError: (error: MessagingError | Error) => Promise<void>) : ReceiveHandlerIsh {
    
    class DefaultPartitionProcessor extends PartitionProcessor {
      async processEvents(events: ReceivedEventData[]): Promise<void> {
        await onReceivedEvents(events);
      }

      // TODO: need to include `PartitionContext` information so they know which 
      // partition actually had an issue
      async processError(error: Error): Promise<void> { 
        await onError(error);
      }
    }

    const eventProcessor = new EventProcessor(this.consumerGroupName, this._eventHubClient, DefaultPartitionProcessor, new InMemoryPartitionManager());
    eventProcessor.start();

    return {
      isReceiverOpen: () => eventProcessor.isRunning(),
      stop: () => eventProcessor.stop(),
      consumerGroup: () => this.consumerGroupName
    };
  }

  /**
   * Subscribes to multiple partitions.
   * 
   * Use this overload if you want to read from a subset of partitions and not coordinate with
   * other subscribers.
   * 
   * @param partitionIds The partitions IDs to subscribe to
   */
  subscribe2(partitionIds: string[],
    onReceivedEvents: (receivedEvents: ReceivedEventData[]) => Promise<void>, 
    onError: (error: MessagingError | Error) => Promise<void>): ReceiveHandlerIsh {
    
    class DefaultPartitionProcessor extends PartitionProcessor {
      async processEvents(events: ReceivedEventData[]): Promise<void> {
        await onReceivedEvents(events);
      }

      async processError(error: Error): Promise<void> { 
        onError(error);
      }
    }
    
    const eventProcessor = new EventProcessor(this.consumerGroupName, this._eventHubClient, DefaultPartitionProcessor, new InMemoryPartitionManager());
    eventProcessor.start();

    return {
      isReceiverOpen: () => eventProcessor.isRunning(),
      stop: () => eventProcessor.stop(),
      consumerGroup: () => this.consumerGroupName
    };
  }

 /**
   * Subscribes to multiple partitions and coordinate with other members of a 
   * consumer group.
   *
   * @param partitionIds The partitions IDs to subscribe to
   */
  subscribe3(partitionManager: PartitionManager = new InMemoryPartitionManager(),
    onReceivedEvents: (receivedEvents: ReceivedEventData[]) => Promise<void>, 
    onError: (error: MessagingError | Error) => Promise<void>): ReceiveHandlerIsh {
    
    class DefaultPartitionProcessor extends PartitionProcessor {
      async processEvents(events: ReceivedEventData[]): Promise<void> {
        await onReceivedEvents(events);
      }

      async processError(error: Error): Promise<void> { 
        onError(error);
      }
    }
    
    const eventProcessor = new EventProcessor(this.consumerGroupName, this._eventHubClient, DefaultPartitionProcessor, partitionManager);
    eventProcessor.start();

    return {
      isReceiverOpen: () => eventProcessor.isRunning(),
      stop: () => eventProcessor.stop(),
      consumerGroup: () => this.consumerGroupName
    };
  }

  private static isHostAndCredential(connectionInfo: EventHubConnectionString | HostAndCredential): connectionInfo is HostAndCredential {
    return typeof (connectionInfo) !== "string";
  }
}