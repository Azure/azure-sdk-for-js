import { CloseReason, PartitionManager, PartitionContext } from "./eventProcessor";
import { ReceivedEventData } from "./eventData";
import { LastEnqueuedEventProperties } from "./eventHubReceiver";
import { SubscriptionEventHandlers, SubscriptionPartitionContext } from './eventHubConsumerClientModels';
import { PartitionCheckpointer, EventPosition } from '.';
import { SubscriptionPartitionInitializer } from './eventHubConsumerClient';

/**
 * A checkpoint is meant to represent the last successfully processed event by the user from a particular
 * partition of a consumer group in an Event Hub instance.
 *
 * When the `updateCheckpoint()` method on the `PartitionProcessor` class is called by the user, a
 * `Checkpoint` is created internally. It is then stored in the storage solution implemented by the
 * `CheckpointManager` chosen by the user when creating an `EventProcessor`.
 *
 * Users are never expected to interact with `Checkpoint` directly. This interface exists to support the
 * internal workings of `EventProcessor` and `CheckpointManager`.
 **/
export interface Checkpoint extends PartitionContext {
  /**
   * @property The sequence number of the event
   */
  sequenceNumber: number;
  /**
   * @property The offset of the event.
   */
  offset: number;
}

/**
 * The `PartitionProcessor` is responsible for processing events received from Event Hubs when using `EventProcessor`
 *
 * The EventProcessor creates a new instance of the PartitionProcessor for each partition of the event hub it starts processing. When you extend the `PartitionProcessor` in order to customize it as you see fit,
 * - Override the `processEvents()` method to add the code to process the received events. This is also a good place to update the checkpoints using the `updateCheckpoint()` method
 * - Optionally override the `processError()` method to handle any error that might have occurred when processing the events.
 * - Optionally override the `initialize()` method to implement any set up related tasks you would want to carry out before starting to receive events from the partition
 * - Optionally override the `close()` method to implement any tear down or clean up tasks you would want to carry out.
 */
export class PartitionProcessor implements PartitionCheckpointer, SubscriptionPartitionContext {
  private _lastEnqueuedEventProperties?: LastEnqueuedEventProperties;

  constructor(
    private _eventHandlers: SubscriptionEventHandlers,
    private _partitionManager: PartitionManager,
    private _context: PartitionContext & {
    eventProcessorId: string
  }) {
  }

  /**
   * @property Information on the last enqueued event in the partition that is being processed.
   * This property is updated by the `EventProcessor` if the `trackLastEnqueuedEventProperties` option is set to true
   * when creating an instance of EventProcessor
   * @readonly
   */
  public get lastEnqueuedEventProperties(): LastEnqueuedEventProperties {
    return this._lastEnqueuedEventProperties!;
  }

  /**
   * @property Information on the last enqueued event in the partition that is being processed.
   * This property is updated by the `EventProcessor` if the `trackLastEnqueuedEventProperties` option is set to true
   * when creating an instance of EventProcessor
   */
  public set lastEnqueuedEventProperties(properties: LastEnqueuedEventProperties) {
    this._lastEnqueuedEventProperties = properties;
  }

  /**
   * @property The fully qualified namespace from where the current partition is being processed. It is set by the `EventProcessor`
   * @readonly
   */
  public get fullyQualifiedNamespace() {
    return this._context.fullyQualifiedNamespace;
  }

  /**
   * @property The name of the consumer group from where the current partition is being processed. It is set by the `EventProcessor`
   * @readonly
   */
  public get consumerGroupName() {
    return this._context.consumerGroupName!;
  }

  /**
   * @property The name of the event hub to which the current partition belongs. It is set by the `EventProcessor`
   * @readonly
   */
  public get eventHubName() {
    return this._context.eventHubName;
  }

  /**
   * @property The identifier of the Event Hub partition that is being processed. It is set by the `EventProcessor`
   * @readonly
   */
  public get partitionId() {
    return this._context.partitionId;
  }

  /**
   * @property The unique identifier of the `EventProcessor` that has spawned the current instance of `PartitionProcessor`. This is set by the `EventProcessor`
   */
  public get eventProcessorId() {
    return this._context.eventProcessorId;
  }

  /**
   * This method is called when the `EventProcessor` takes ownership of a new partition and before any
   * events are received.
   *
   * @return {Promise<void>}
   */
  async initialize(partitionInitializer: SubscriptionPartitionInitializer): Promise<void> {
    if (this._eventHandlers.processInitialize) {
      await this._eventHandlers.processInitialize({
        consumerGroupName: this.consumerGroupName,
        eventHubName: this.eventHubName,
        fullyQualifiedNamespace: this.fullyQualifiedNamespace,
        lastEnqueuedEventProperties: this.lastEnqueuedEventProperties,
        partitionId: this.partitionId,
        setStartPosition: (startPosition: EventPosition | "earliest" | "latest") => {
          partitionInitializer.setStartPosition(startPosition);
        },
        updateCheckpoint: this.updateCheckpoint
      });
    }
  }

  /**
   * This method is called before the partition processor is closed by the EventProcessor.
   *
   * @param reason The reason for closing this partition processor.
   * @return {Promise<void>}
   */
  async close(reason: CloseReason): Promise<void> {
    if (this._eventHandlers.processClose) {
      await this._eventHandlers.processClose(reason, this);
    }
  }

  /**
   * This method is called when new events are received.
   *
   * This is also a good place to update checkpoints as appropriate.
   *
   * @param event The received events to be processed.
   * @return {Promise<void>}
   */
  async processEvent(event: ReceivedEventData): Promise<void> {
    await this._eventHandlers.processEvent(event, this);
  }

  /**
   * This method is called when an error occurs while receiving events from Event Hubs.
   *
   * @param error The error to be processed.
   * @return {Promise<void>}
   */
  async processError(error: Error): Promise<void> {
    if (this._eventHandlers.processError) {
      await this._eventHandlers.processError(error, this);
    }
  }

  /**
   * Updates the checkpoint using the event data.
   *
   * A checkpoint is meant to represent the last successfully processed event by the user from a particular
   * partition of a consumer group in an Event Hub instance.
   *
   * @param eventData The event that you want to update the checkpoint with.
   * @return Promise<void>
   */
  public async updateCheckpoint(eventData: ReceivedEventData): Promise<void>;
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

  // TODO: this means I can also get rid of my Simple Checkpointer adapter since this code is hosted in partition processor
  public async updateCheckpoint(sequenceNumber: number, offset: number): Promise<void>;
  public async updateCheckpoint(
    eventDataOrSequenceNumber: ReceivedEventData | number,
    offset?: number
  ): Promise<void> {
    
    
    console.log(`updating checkpointing with ${this._context}`);


    
    const checkpoint: Checkpoint = {
      fullyQualifiedNamespace: this._context.fullyQualifiedNamespace,
      eventHubName: this._context.eventHubName,
      consumerGroupName: this._context.consumerGroupName,
      partitionId: this._context.partitionId,
      sequenceNumber:
        typeof eventDataOrSequenceNumber === "number"
          ? eventDataOrSequenceNumber
          : eventDataOrSequenceNumber.sequenceNumber,
      offset:
        typeof offset === "number"
          ? offset
          : (eventDataOrSequenceNumber as ReceivedEventData).offset,
      // TODO: this doesn't seem quite right...
      // eTag: this._eTag
    };

    // TODO: bring this back in the right way...
    // this._eTag = await this._partitionManager!.updateCheckpoint(checkpoint);
    await this._partitionManager!.updateCheckpoint(checkpoint);
  }
}
