// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logErrorStackTrace, logger } from "./log";
import { CommonEventProcessorOptions } from "./models/private";
import { CloseReason } from "./models/public";
import { EventPosition } from "./eventPosition";
import { PartitionProcessor } from "./partitionProcessor";
import { EventHubReceiver } from "./eventHubReceiver";
import { AbortController } from "@azure/abort-controller";
import { MessagingError } from "@azure/core-amqp";
import { OperationOptions, getParentSpan } from "./util/operationOptions";
import { getTracer } from "@azure/core-tracing";
import { CanonicalCode, Link, Span, SpanKind } from "@opentelemetry/api";
import { extractSpanContextFromEventData } from "./diagnostics/instrumentEventData";
import { ReceivedEventData } from "./eventData";
import { ConnectionContext } from "./connectionContext";

/**
 * @ignore
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

  private async _receiveEvents(partitionId: string): Promise<void> {
    this._receiver = new EventHubReceiver(
      this._context,
      this._partitionProcessor.consumerGroup,
      partitionId,
      this._startPosition,
      {
        ownerLevel: this._processorOptions.ownerLevel,
        trackLastEnqueuedEventProperties: this._processorOptions.trackLastEnqueuedEventProperties,
        retryOptions: this._processorOptions.retryOptions
      }
    );

    while (this._isReceiving) {
      try {
        const receivedEvents = await this._receiver.receiveBatch(
          this._processorOptions.maxBatchSize,
          this._processorOptions.maxWaitTimeInSeconds,
          this._abortController.signal
        );

        if (
          this._processorOptions.trackLastEnqueuedEventProperties &&
          this._receiver.lastEnqueuedEventProperties
        ) {
          this._partitionProcessor.lastEnqueuedEventProperties = this._receiver.lastEnqueuedEventProperties;
        }
        // avoid calling user's processEvents handler if the pump was stopped while receiving events
        if (!this._isReceiving) {
          return;
        }

        const span = createProcessingSpan(
          receivedEvents,
          {
            eventHubName: this._context.config.entityPath,
            endpoint: this._context.config.endpoint
          },
          this._processorOptions
        );

        await trace(() => this._partitionProcessor.processEvents(receivedEvents), span);
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
        } catch (err) {
          // Using verbose over warning because this error is swallowed.
          logger.verbose("An error was thrown by user's processError method: ", err);
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
          } catch (err) {
            // Using verbose over warning because this error is swallowed.
            logger.verbose(
              `An error occurred while closing the receiver with reason ${CloseReason.Shutdown}: `,
              err
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
 * @ignore
 */
export function createProcessingSpan(
  receivedEvents: ReceivedEventData[],
  eventHubProperties: { eventHubName: string; endpoint: string },
  options?: OperationOptions
): Span {
  const links: Link[] = [];

  for (const receivedEvent of receivedEvents) {
    const spanContext = extractSpanContextFromEventData(receivedEvent);

    if (spanContext == null) {
      continue;
    }

    links.push({
      context: spanContext,
      attributes: {
        enqueuedTime: receivedEvent.enqueuedTimeUtc.getTime()
      }
    });
  }

  const span = getTracer().startSpan("Azure.EventHubs.process", {
    kind: SpanKind.CONSUMER,
    links,
    parent: getParentSpan(options?.tracingOptions)
  });

  span.setAttributes({
    "az.namespace": "Microsoft.EventHub",
    "message_bus.destination": eventHubProperties.eventHubName,
    "peer.address": eventHubProperties.endpoint
  });

  return span;
}

/**
 * @ignore
 * @internal
 */
export async function trace(fn: () => Promise<void>, span: Span): Promise<void> {
  try {
    await fn();
    span.setStatus({ code: CanonicalCode.OK });
  } catch (err) {
    span.setStatus({
      code: CanonicalCode.UNKNOWN,
      message: err.message
    });
    throw err;
  } finally {
    span.end();
  }
}
