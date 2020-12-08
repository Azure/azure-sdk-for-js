// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

import { EventData, EventDataBatch, EventHubProducerClient } from "@azure/event-hubs";

export class EventProducer {
  private producerClient: EventHubProducerClient;
  private awaitableBatch: Promise<EventDataBatch>;
  private count: number;
  private lastBatchCreatedTime: number;

  constructor(
    eventHubConnectString: string,
    eventHubName: string,
    private batchSendNumber: number,
    private sendBatchTimeIntervalSeconds: number
  ) {
    this.producerClient = new EventHubProducerClient(eventHubConnectString, eventHubName);
    this.count = 0;
    this.lastBatchCreatedTime = Date.now();
  }

  private constructEventData(requestId: string, payload: any): EventData {
    return {
      properties: {
        request_id: requestId
      },
      body: payload
    };
  }

  public async send(requestId: string, payload: any) {
    const batch = await this.getOrCreateBatch();
    const eventData = this.constructEventData(requestId, payload)
    const isAdded = batch.tryAdd(eventData);

    if (!isAdded || batch.count >= this.batchSendNumber) {
      this.awaitableBatch = undefined;
      await this.sendBatch(batch);
      if (!isAdded) {
        const batch = await this.getOrCreateBatch();
        if (!batch.tryAdd(eventData)) {
          console.log(`Up to batch size limit, add event failed. requestId: ${requestId}`);
        }
      }
    }
  }

  private async getOrCreateBatch(): Promise<EventDataBatch> {
    // Check if there is an existing promise for a batch.
    if (this.awaitableBatch) {
      return this.awaitableBatch;
    }

    console.log(`Creating a new batch.`);
    this.lastBatchCreatedTime = Date.now();
    this.awaitableBatch = this.producerClient.createBatch();
    return this.awaitableBatch;
  }

  private async sendBatch(curBatch: EventDataBatch) {
    try {
      await this.producerClient.sendBatch(curBatch);
      this.count += curBatch.count;
      console.info(`Ingest event. total count: ${this.count}, batch count: ${curBatch.count}`);
    } catch (err) {
      console.error(`send Batch error: ${err}`);
    }
  }

  public timeScan() {
    setInterval(async () => {
      if (Date.now() - this.lastBatchCreatedTime >= this.sendBatchTimeIntervalSeconds * 1000) {
        if (this.awaitableBatch !== undefined) {
          const curBatch = await this.awaitableBatch;
          this.awaitableBatch = undefined;
          console.log(`time trigger send batch. count: ${curBatch.count}`);
          await this.sendBatch(curBatch);
        }
      }
    }, this.sendBatchTimeIntervalSeconds * 1000);
  }

  public stop() {
    this.producerClient.close();
  }
}
