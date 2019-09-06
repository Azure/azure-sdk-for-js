import { PartitionContext } from "./partitionContext";
import { CloseReason } from "./eventProcessor";
import { ReceivedEventData } from "./eventData";

/**
 * The `PartitionProcessor` is responsible for processing events received from Event Hubs when using `EventProcessor`
 *
 * The EventProcessor creates a new instance of the PartitionProcessor for each partition of the event hub it starts processing. When you extend the `PartitionProcessor` in order to customize it as you see fit,
 * - Override the `processEvents()` method to add the code to process the received events. This is also a good place to update the checkpoints using the `updateCheckpoint()` method
 * - Optionally override the `processError()` method to handle any error that might have occurred when processing the events.
 * - Optionally override the `initialize()` method to implement any set up related tasks you would want to carry out before starting to receive events from the partition
 * - Optionally override the `close()` method to implement any tear down or clean up tasks you would want to carry out.
 */
export class PartitionProcessor {
  /**
   * This method is called when the `EventProcessor` takes ownership of a new partition and before any
   * events are received.
   *
   * @param partitionContext An object that provides information specific to the partition being processed.
   *  Call the `updateCheckpoint` method to update and store the checkpoint for this partition.
   *  This object will have properties like the `partitionId`, `eventHubName` and `consumerGroupName`.
   * @return {Promise<void>}
   */
  async initialize(partitionContext: PartitionContext): Promise<void> {}

  /**
   * This method is called before the partition processor is closed by the EventProcessor.
   *
   * @param reason The reason for closing this partition processor.
   * @param partitionContext An object that provides information specific to the partition being processed.
   *  Call the `updateCheckpoint` method to update and store the checkpoint for this partition.
   *  This object will have properties like the `partitionId`, `eventHubName` and `consumerGroupName`.
   * @return {Promise<void>}
   */
  async close(reason: CloseReason, partitionContext: PartitionContext): Promise<void> {}

  /**
   * This method is called when new events are received.
   *
   * This is also a good place to update checkpoints as appropriate.
   *
   * @param events The received events to be processed.
   * @param partitionContext An object that provides information specific to the partition being processed.
   *  Call the `updateCheckpoint` method to update and store the checkpoint for this partition.
   *  This object will have properties like the `partitionId`, `eventHubName` and `consumerGroupName`.
   * @return {Promise<void>}
   */
  async processEvents(
    events: ReceivedEventData[],
    partitionContext: PartitionContext
  ): Promise<void> {
    console.log(JSON.stringify(events));
  }

  /**
   * This method is called when an error occurs while receiving events from Event Hubs.
   *
   * @param error The error to be processed.
   * @param partitionContext An object that provides information specific to the partition being processed.
   *  Call the `updateCheckpoint` method to update and store the checkpoint for this partition.
   *  This object will have properties like the `partitionId`, `eventHubName` and `consumerGroupName`.
   * @return {Promise<void>}
   */
  async processError(error: Error, partitionContext: PartitionContext): Promise<void> {}
}
