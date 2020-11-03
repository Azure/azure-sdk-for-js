import { EventData, EventDataBatch, EventHubProducerClient } from "@azure/event-hubs";
import AsyncLock from "async-lock";
import { v4 as uuid } from "uuid";

export class EventProducer {
  private producerClient: EventHubProducerClient;
  private batch: EventDataBatch;
  private count: number;
  private lock: AsyncLock;
  private lockKey: string;
  private lastBatchCreatedTime: number;

  constructor(
    eventHubConnectString: string,
    eventHubName: string,
    private batchSendNumber: number,
    private sendBatchTimeIntervalSeconds: number
  ) {
    this.producerClient = new EventHubProducerClient(eventHubConnectString, eventHubName);
    this.count = 0;
    this.lock = new AsyncLock();
    this.lockKey = `createBatch-${uuid()}`;
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
    if (this.batch === undefined) {
      this.batch = await this.lock.acquire(this.lockKey, () => {
        if (this.batch === undefined) {
          console.log(`Acquire lock ${this.lockKey} and create a new batch`);
          this.lastBatchCreatedTime = Date.now();
          return this.producerClient.createBatch();
        } else {
          console.log(
            `Acquire lock ${this.lockKey} and skip create. this.batch count: ${this.batch.count}`
          );
          return this.batch;
        }
      });
    }
    const isAdded = this.batch.tryAdd(this.constructEventData(requestId, payload));

    if (!isAdded || this.batch.count >= this.batchSendNumber) {
      const curBatch = this.batch;
      this.batch = undefined;
      await this.sendBatch(curBatch);
      if (!isAdded) {
        console.log(`Up to batch size limit, add event failed. requestId: ${requestId}`);
      }
    }
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
        if (this.batch !== undefined) {
          const curBatch = this.batch;
          this.batch = undefined;
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
