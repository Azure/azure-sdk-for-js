// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TracingSpanOptions, TracingSpanLink } from "@azure/core-tracing";
import { logErrorStackTrace, logger } from "./log";
import { AbortController } from "@azure/abort-controller";
import { CloseReason } from "./models/public";
import { CommonEventProcessorOptions } from "./models/private";
import { ConnectionContext } from "./connectionContext";
import { EventHubConnectionConfig } from "./eventhubConnectionConfig";
import { EventHubReceiver } from "./eventHubReceiver";
import { EventPosition } from "./eventPosition";
import { MessagingError } from "@azure/core-amqp";
import { PartitionProcessor } from "./partitionProcessor";
import { ReceivedEventData } from "./eventData";
import { toSpanOptions, tracingClient } from "./diagnostics/tracing";
import { extractSpanContextFromEventData } from "./diagnostics/instrumentEventData";

/**
 * @internal
 */
export class PartitionPump {
  private _partitionProcessor: PartitionProcessor;
  private _processorOptions: CommonEventProcessorOptions;
  private _receiver: EventHubReceiver | undefined;
  private _isReceiving: boolean = false;
  private _isStopped: boolean = false;
  private _abortController: AbortController;
  constructor(
    private _context: ConnectionContext,
    partitionProcessor: PartitionProcessor,
    private readonly _startPosition: EventPosition,
    options: CommonEventProcessorOptions
  ) {
    this._partitionProcessor = partitionProcessor;
    this._processorOptions = options;
    this._abortController = new AbortController();
  }

  public get isReceiving(): boolean {
    return this._isReceiving;
  }

  async start(): Promise<void> {
    this._isReceiving = true;
    try {
      await this._partitionProcessor.initialize();
    } catch (err) {
      // swallow the error from the user-defined code
      this._partitionProcessor.processError(err);
    }

    // this is intentionally not await'd - the _receiveEvents loop will continue to
    // execute and can be stopped by calling .stop()
    this._receiveEvents(this._partitionProcessor.partitionId);
    logger.info(
      `Successfully started the receiver for partition "${this._partitionProcessor.partitionId}".`
    );
  }

  /**
   * Creates a new `EventHubReceiver` and replaces any existing receiver.
   * @param partitionId - The partition the receiver should read messages from.
   * @param lastSeenSequenceNumber - The sequence number to begin receiving messages from (exclusive).
   * If `-1`, then the PartitionPump's startPosition will be used instead.
   */
  private _setOrReplaceReceiver(
    partitionId: string,
    lastSeenSequenceNumber: number
  ): EventHubReceiver {
    // Determine what the new EventPosition should be.
    // If this PartitionPump has received events, we'll start from the last
    // seen sequenceNumber (exclusive).
    // Otherwise, use the `_startPosition`.
    const currentEventPosition: EventPosition =
      lastSeenSequenceNumber >= 0
        ? {
            sequenceNumber: lastSeenSequenceNumber,
            isInclusive: false,
          }
        : this._startPosition;

    // Set or replace the PartitionPump's receiver.
    this._receiver = new EventHubReceiver(
      this._context,
      this._partitionProcessor.consumerGroup,
      partitionId,
      currentEventPosition,
      {
        ownerLevel: this._processorOptions.ownerLevel,
        trackLastEnqueuedEventProperties: this._processorOptions.trackLastEnqueuedEventProperties,
        retryOptions: this._processorOptions.retryOptions,
        skipParsingBodyAsJson: this._processorOptions.skipParsingBodyAsJson,
      }
    );

    return this._receiver;
  }

  private async _receiveEvents(partitionId: string): Promise<void> {
    let lastSeenSequenceNumber = -1;
    let receiver = this._setOrReplaceReceiver(partitionId, lastSeenSequenceNumber);

    while (this._isReceiving) {
      try {
        // Check if the receiver was closed so we can recreate it.
        if (receiver.isClosed) {
          receiver = this._setOrReplaceReceiver(partitionId, lastSeenSequenceNumber);
        }

        const receivedEvents = await receiver.receiveBatch(
          this._processorOptions.maxBatchSize,
          this._processorOptions.maxWaitTimeInSeconds,
          this._abortController.signal
        );

        if (
          this._processorOptions.trackLastEnqueuedEventProperties &&
          receiver.lastEnqueuedEventProperties
        ) {
          this._partitionProcessor.lastEnqueuedEventProperties =
            receiver.lastEnqueuedEventProperties;
        }
        // avoid calling user's processEvents handler if the pump was stopped while receiving events
        if (!this._isReceiving) {
          return;
        }

        if (receivedEvents.length) {
          lastSeenSequenceNumber = receivedEvents[receivedEvents.length - 1].sequenceNumber;
        }

        await tracingClient.withSpan(
          "PartitionPump.process",
          {},
          () => this._partitionProcessor.processEvents(receivedEvents),
          toProcessingSpanOptions(receivedEvents, this._context.config)
        );
      } catch (err) {
        // check if this pump is still receiving
        // it may not be if the EventProcessor was stopped during processEvents
        if (!this._isReceiving) {
          // no longer receiving, so close was called from somewhere else
          return;
        }

        logger.warning(
          `An error was thrown while receiving or processing events on partition "${this._partitionProcessor.partitionId}"`
        );
        logErrorStackTrace(err);
        // forward error to user's processError and swallow errors they may throw
        try {
          await this._partitionProcessor.processError(err);
        } catch (errorFromUser) {
          // Using verbose over warning because this error is swallowed.
          logger.verbose("An error was thrown by user's processError method: ", errorFromUser);
        }

        // close the partition processor if a non-retryable error was encountered
        if (typeof err !== "object" || !(err as MessagingError).retryable) {
          try {
            // If the exception indicates that the partition was stolen (i.e some other consumer with same ownerlevel
            // started consuming the partition), update the closeReason
            if (err.code === "ReceiverDisconnectedError") {
              return await this.stop(CloseReason.OwnershipLost);
            }
            // this will close the pump and will break us out of the while loop
            return await this.stop(CloseReason.Shutdown);
          } catch (errorFromStop) {
            // Using verbose over warning because this error is swallowed.
            logger.verbose(
              `An error occurred while closing the receiver with reason ${CloseReason.Shutdown}: `,
              errorFromStop
            );
          }
        }
      }
    }
  }

  async stop(reason: CloseReason): Promise<void> {
    if (this._isStopped) {
      return;
    }
    this._isStopped = true;
    this._isReceiving = false;
    try {
      // Trigger the cancellation before closing the receiver,
      // otherwise the receiver will remove the listener on the abortSignal
      // before it has a chance to be emitted.
      this._abortController.abort();

      if (this._receiver) {
        await this._receiver.close();
      }
      await this._partitionProcessor.close(reason);
    } catch (err) {
      logger.warning(`An error occurred while closing the receiver: ${err?.name}: ${err?.message}`);
      logErrorStackTrace(err);
      this._partitionProcessor.processError(err);
      throw err;
    }
  }
}

/**
 * @internal
 */
export function toProcessingSpanOptions(
  receivedEvents: ReceivedEventData[],
  eventHubProperties: Pick<EventHubConnectionConfig, "entityPath" | "host">
): TracingSpanOptions {
  const spanLinks: TracingSpanLink[] = [];
  for (const receivedEvent of receivedEvents) {
    const tracingContext = extractSpanContextFromEventData(receivedEvent);
    if (tracingContext) {
      spanLinks.push({
        tracingContext,
        attributes: {
          enqueuedTime: receivedEvent.enqueuedTimeUtc.getTime(),
        },
      });
    }
  }
  return {
    spanLinks,
    spanKind: "consumer",
    ...toSpanOptions(eventHubProperties),
  };
}
