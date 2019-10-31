// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { FullEventProcessorOptions, CloseReason } from "./eventProcessor";
import { EventHubClient } from "./eventHubClient";
import { EventPosition } from "./eventPosition";
import { PartitionProcessor } from "./partitionProcessor";
import { EventHubConsumer } from "./receiver";
import { AbortController } from "@azure/abort-controller";
import { MessagingError } from "@azure/core-amqp";

export class PartitionPump {
  private _eventHubClient: EventHubClient;
  private _partitionProcessor: PartitionProcessor;
  private _processorOptions: FullEventProcessorOptions;
  private _receiver: EventHubConsumer | undefined;
  private _initialEventPosition: EventPosition;
  private _isReceiving: boolean = false;
  private _abortController: AbortController;

  constructor(
    eventHubClient: EventHubClient,
    partitionProcessor: PartitionProcessor,
    initialEventPosition: EventPosition,
    options: FullEventProcessorOptions
  ) {
    this._eventHubClient = eventHubClient;
    this._partitionProcessor = partitionProcessor;
    this._initialEventPosition = initialEventPosition;
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
    } catch {
      // swallow the error from the user-defined code
    }
    this._receiveEvents(this._partitionProcessor.partitionId);
    log.partitionPump("Successfully started the receiver.");
  }

  private async _receiveEvents(partitionId: string): Promise<void> {
    this._receiver = this._eventHubClient.createConsumer(
      this._partitionProcessor.consumerGroupName,
      partitionId,
      this._initialEventPosition,
      {
        ownerLevel: 0,
        trackLastEnqueuedEventInfo: this._processorOptions.trackLastEnqueuedEventInfo
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
          this._processorOptions.trackLastEnqueuedEventInfo &&
          this._receiver.lastEnqueuedEventInfo
        ) {
          this._partitionProcessor.lastEnqueuedEventInfo = this._receiver.lastEnqueuedEventInfo;
        }
        // avoid calling user's processEvents handler if the pump was stopped while receiving events
        if (!this._isReceiving) {
          return;
        }
        await this._partitionProcessor.processEvents(receivedEvents);
      } catch (err) {
        // check if this pump is still receiving
        // it may not be if the EventProcessor was stopped during processEvents
        if (!this._isReceiving) {
          // no longer receiving, so close was called from somewhere else
          return;
        }

        // forward error to user's processError and swallow errors they may throw
        try {
          await this._partitionProcessor.processError(err);
        } catch (err) {
          log.error("An error was thrown by user's processError method: ", err);
        }

        // close the partition processor if a non-retryable error was encountered
        if (typeof err !== "object" || !(err as MessagingError).retryable) {
          try {
            // If the exception indicates that the partition was stolen (i.e some other consumer with same ownerlevel
            // started consuming the partition), update the closeReason
            if (err.name === "ReceiverDisconnectedError") {
              return await this.stop(CloseReason.OwnershipLost);
            }
            // this will close the pump and will break us out of the while loop
            return await this.stop(CloseReason.Shutdown);
          } catch (err) {
            log.error(
              `An error occurred while closing the receiver with reason ${CloseReason.Shutdown}: `,
              err
            );
          }
        }
      }
    }
  }

  async stop(reason: CloseReason): Promise<void> {
    this._isReceiving = false;
    try {
      if (this._receiver) {
        await this._receiver.close();
      }
      this._abortController.abort();
      await this._partitionProcessor.close(reason);
    } catch (err) {
      log.error("An error occurred while closing the receiver.", err);
      throw err;
    }
  }
}
