// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as log from "./log";
import { EventProcessorOptions, PartitionProcessor } from "./eventProcessor";
import { PartitionContext } from "./partitionContext";
import { EventHubClient } from "./eventHubClient";
import { EventPosition } from "./eventPosition";
import { EventHubConsumer } from "./receiver";

export class PartitionPump {
  private _partitionContext: PartitionContext;
  private _eventHubClient: EventHubClient;
  private _partitionProcessor: PartitionProcessor;
  private _processorOptions: EventProcessorOptions;
  private _receiver: EventHubConsumer | undefined;
  private _isReceiving: boolean = false;

  constructor(
    eventHubClient: EventHubClient,
    partitionContext: PartitionContext,
    partitionProcessor: PartitionProcessor,
    options?: EventProcessorOptions
  ) {
    if (!options) options = {};
    this._eventHubClient = eventHubClient;
    this._partitionContext = partitionContext;
    this._partitionProcessor = partitionProcessor;
    this._processorOptions = options;
  }

  async start(partitionId: string): Promise<void> {
    if (typeof this._partitionProcessor.initialize !== "function") {
      throw new TypeError("'initialize' must be of type 'function'.");
    }
    if (this._partitionProcessor.initialize) {
      await this._partitionProcessor.initialize();
    }
    this._receiveEvents(partitionId);
    log.partitionPump("Successfully started the receiver.");
  }

  private async _receiveEvents(partitionId: string): Promise<void> {
    this._isReceiving = true;
    try {
      this._receiver = await this._eventHubClient.createConsumer(
        this._partitionContext.consumerGroupName,
        partitionId,
        this._processorOptions.initialEventPosition || EventPosition.earliest()
      );

      while (this._isReceiving) {
        const receivedEvents = await this._receiver.receiveBatch(
          this._processorOptions.maxBatchSize || 1,
          this._processorOptions.maxWaitTimeInSeconds
        );
        await this._partitionProcessor.processEvents(receivedEvents);
      }
    } catch (err) {
      this._isReceiving = false;
      try {
        if (this._receiver) {
          this._receiver.close();
        }
        await this._partitionProcessor.processError(err);
        log.error("An error occurred while receiving events.", err);
      } catch (err) {
        log.error("An error occurred while closing the receiver", err);
      }
    }
  }

  async stop(reason: string): Promise<void> {
    this._isReceiving = false;
    try {
      if (this._receiver) {
        this._receiver.close();
      }
      if (typeof this._partitionProcessor.close !== "function") {
        throw new TypeError("'close' must be of type 'function'.");
      }
      if (this._partitionProcessor.close) {
        await this._partitionProcessor.close(reason);
      }
    } catch (err) {
      log.error("An error occurred while closing the receiver.", err);
      throw err;
    }
  }
}
