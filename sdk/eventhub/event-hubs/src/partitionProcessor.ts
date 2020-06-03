// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CheckpointStore } from "./eventProcessor";
import { CloseReason } from "./models/public";
import { ReceivedEventData } from "./eventData";
import { LastEnqueuedEventProperties } from "./eventHubReceiver";
import {
  BasicPartitionProperties,
  PartitionContext,
  SubscriptionEventHandlers
} from "./eventHubConsumerClientModels";
import { logger } from "./log";

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
export interface Checkpoint {
  /**
   * @property The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   */
  fullyQualifiedNamespace: string;
  /**
   * @property The event hub name
   */
  eventHubName: string;
  /**
   * @property The consumer group name
   */
  consumerGroup: string;
  /**
   * @property The identifier of the Event Hub partition
   */
  partitionId: string;
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
 * @internal
 * @ignore
 */
export class PartitionProcessor implements PartitionContext {
  private _lastEnqueuedEventProperties?: LastEnqueuedEventProperties;

  constructor(
    private _eventHandlers: SubscriptionEventHandlers,
    private _checkpointStore: CheckpointStore,
    private _context: BasicPartitionProperties & {
      eventProcessorId: string;
    }
  ) {}

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
  public get consumerGroup() {
    return this._context.consumerGroup!;
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
   * @return {Promise<EventPosition>}
   */
  async initialize(): Promise<void> {
    if (this._eventHandlers.processInitialize) {
      await this._eventHandlers.processInitialize(this);
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
  async processEvents(events: ReceivedEventData[]): Promise<void> {
    await this._eventHandlers.processEvents(events, this);
  }

  /**
   * This method is called when an error occurs while receiving events from Event Hubs.
   *
   * @param error The error to be processed.
   * @return {Promise<void>}
   */
  async processError(error: Error): Promise<void> {
    if (this._eventHandlers.processError) {
      try {
        await this._eventHandlers.processError(error, this);
      } catch (err) {
        logger.verbose(`Error thrown from user's processError handler : ${err}`);
      }
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
  public async updateCheckpoint(eventData: ReceivedEventData): Promise<void> {
    const checkpoint: Checkpoint = {
      fullyQualifiedNamespace: this._context.fullyQualifiedNamespace,
      eventHubName: this._context.eventHubName,
      consumerGroup: this._context.consumerGroup,
      partitionId: this._context.partitionId,
      sequenceNumber: eventData.sequenceNumber,
      offset: eventData.offset
    };

    await this._checkpointStore!.updateCheckpoint(checkpoint);
  }
}
