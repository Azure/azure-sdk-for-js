import { TokenCredential } from '@azure/identity';
import { EventHubClientOptions, EventHubClient } from './eventHubClient';
import { PartitionProcessor } from './partitionProcessor';
import { ReceivedEventData } from './eventData';
import { InMemoryPartitionManager } from './inMemoryPartitionManager';
import { EventProcessor, PartitionManager, PartitionOwnership } from './eventProcessor';
import { EventPosition } from './eventPosition';
import { EventHubConsumer } from './receiver';
import { AbortSignalLike } from '../../../core/core-http/es/lib/coreHttp';

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

export interface EventProcessorOptions2 extends EventHubClientOptions {
  /**
   * The max size of the batch of events passed each time to user code for processing.
   */
  maxBatchSize?: number;
  /**
   * The maximum amount of time to wait to build up the requested message count before
   * passing the data to user code for processing. If not provided, it defaults to 60 seconds.
   */
  maxWaitTimeInSeconds?: number;
  /**
   * @property
   * Indicates whether or not the consumer should request information on the last enqueued event on its
   * associated partition, and track that information as events are received.

   * When information about the partition's last enqueued event is being tracked, each event received 
   * from the Event Hubs service will carry metadata about the partition that it otherwise would not. This results in a small amount of
   * additional network bandwidth consumption that is generally a favorable trade-off when considered
   * against periodically making requests for partition properties using the Event Hub client.
   */
  trackLastEnqueuedEventInfo?: boolean;
}

class SingleInMemoryPartitionManager extends InMemoryPartitionManager {
  private partitionsToOwn: Set<string>;

  constructor(partitionsToOwnArray: number[]) {
    super();
    this.partitionsToOwn = new Set<string>(partitionsToOwnArray.map(p => p.toString()));    
  }

  async claimOwnership(partitionOwnership: PartitionOwnership[]): Promise<PartitionOwnership[]> {
    return partitionOwnership.filter(po => this.partitionsToOwn.has(po.partitionId));
  }
}

export class EventHubConsumerClientFacade {
  private _consumersMap : Map<string,EventHubConsumer>;
  private _eventHubClient: EventHubClient;

  constructor(
    connectionInfo: EventHubConnectionString | HostAndCredential,
    private consumerGroupName: string,
    private partitionProcessorClass: typeof PartitionishProcessor,
    options?: EventHubClientOptions) {
    // create the client
    this._eventHubClient = EventHubConsumerClientFacade.createEventHubClient(connectionInfo, options);
    this._consumersMap = new Map();
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

  receiveAll(checkpointManager: PartitionManager = new InMemoryPartitionManager()) : ReceiveHandlerIsh {
    const cls = new this.partitionProcessorClass();

    class DefaultPartitionProcessor extends PartitionProcessor {
      async processEvents(events: ReceivedEventData[]): Promise<void> {
        await cls.processEvents(events);
      }

      async processError(error: Error): Promise<void> { 
        await cls.processError(error);
      }
    }
    
    // TODO: where should they pass this?
    const inMemoryPartitionManager = new InMemoryPartitionManager();

    const eventProcessor = new EventProcessor(this.consumerGroupName, this._eventHubClient, DefaultPartitionProcessor, inMemoryPartitionManager);
    eventProcessor.start();

    return {
      isReceiverOpen: () => eventProcessor.isRunning(),
      stop: () => eventProcessor.stop(),
      consumerGroup: () => this.consumerGroupName
    };
  }

  receiveFromPartition(partitionId: number[]) : ReceiveHandlerIsh {
    const cls = new this.partitionProcessorClass();

    class DefaultPartitionProcessor extends PartitionProcessor {
      async processEvents(events: ReceivedEventData[]): Promise<void> {
        await cls.processEvents(events);
      }

      async processError(error: Error): Promise<void> { 
        await cls.processError(error);
      }
    }
    
    const eventProcessor = new EventProcessor(this.consumerGroupName, this._eventHubClient, DefaultPartitionProcessor, new SingleInMemoryPartitionManager(partitionId));
    eventProcessor.start();

    return {
      // TODO: how do you tell the event processor is stil running>
      isReceiverOpen: () => eventProcessor.isRunning(),
      stop: () => eventProcessor.stop(),
      consumerGroup: () => this.consumerGroupName
    };
  }

  async receiveBatch(partitionId: number, maxMessageCount: number,
    maxWaitTimeInSeconds: number = 60,
    abortSignal?: AbortSignalLike
  ) : Promise<ReceivedEventData[]> {
    let consumer = this._consumersMap.get(partitionId.toString());
    
    if (!consumer) {
      consumer = this._eventHubClient.createConsumer(
        this.consumerGroupName,
        partitionId.toString(),
        EventPosition.latest()
      );
      this._consumersMap.set(partitionId.toString(), consumer);
    }

    return consumer.receiveBatch(maxMessageCount, maxWaitTimeInSeconds, abortSignal);
  }

  private static isHostAndCredential(connectionInfo: EventHubConnectionString | HostAndCredential): connectionInfo is HostAndCredential {
    return typeof (connectionInfo) !== "string";
  }
}