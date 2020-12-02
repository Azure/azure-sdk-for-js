// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

import { EventData, EventDataBatch, EventHubProducerClient } from "@azure/event-hubs";

const BatchSendNumber = 100;
type Task = {
  event: EventData;
  callback: () => void;
};
export class EventProducer {
  private producerClient: EventHubProducerClient;
  private awaitableBatch: Promise<EventDataBatch>;
  private count: number;
  private lastBatchCreatedTime: number;
  private tasks: Task[];
  private isSending: boolean;

  constructor(
    eventHubConnectString: string,
    eventHubName: string,
    private batchSendNumber: number,
    private sendBatchTimeIntervalSeconds: number
  ) {
    this.producerClient = new EventHubProducerClient(eventHubConnectString, eventHubName);
    this.count = 0;
    this.lastBatchCreatedTime = Date.now();
    this.tasks = [];
    this.isSending = false;
    this.awaitableBatch = this.producerClient.createBatch();
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
    const eventData = this.constructEventData(requestId, payload);
    let callback: () => void;
    const promise = new Promise((resolve) => (callback = resolve));
    this.tasks.push({ event: eventData, callback });
    await this.sendBatchLoop();
    await promise;
  }

  private async sendBatchLoop(): Promise<void> {
    if (this.isSending) {
      return;
    }
    this.isSending = true;
    while (this.tasks.length > 0) {
      let batch = await this.getOrCreateBatch();
      const tasks: Task[] = [];
      this.awaitableBatch = undefined;
      while (this.tasks.length > 0 && batch.count < BatchSendNumber) {
        const task = this.tasks[0];
        if (batch.tryAdd(task.event)) {
          tasks.push(task);
          this.tasks.shift();
        } else {
          break;
        }
      }
      await this.sendBatch(batch);
      for (const it of tasks) {
        it.callback();
      }
    }
    this.awaitableBatch = this.producerClient.createBatch();
    this.isSending = false;
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

  public stop() {
    this.producerClient.close();
  }
}
