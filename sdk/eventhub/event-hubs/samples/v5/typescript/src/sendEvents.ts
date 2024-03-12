// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to send events to an Event Hub.
 */

import { EventHubProducerClient, EventDataBatch } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Event Hubs entity name here
const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";

class App {
  private batchList: EventDataBatch[] = [];
  public eventHubProducerClient: EventHubProducerClient;
  private eventHubPublisherModel: {
    eventHubPartitonKeys: string[];
    eventHubUserProperties: Record<string, string>;
  };
  private totalPartitionKeys: number = 0;
  private numEventsSent: number = 0;
  constructor() {
    this.eventHubProducerClient = new EventHubProducerClient(connectionString, eventHubName);
    this.eventHubPublisherModel = {
      eventHubPartitonKeys: [],
      eventHubUserProperties: {},
    };
  }
  private async createBatches(): Promise<void> {
    this.batchList = [];
    console.info("Creating batches for differnt partitions...");
    if (!this.eventHubPublisherModel.eventHubPartitonKeys.length) {
      const eventHubProperties = await this.eventHubProducerClient.getEventHubProperties();
      console.info(`Creating batches for default azure eventHub partitions with total partition count: 
            ${eventHubProperties.partitionIds.length}`);
      this.eventHubPublisherModel.eventHubPartitonKeys = eventHubProperties.partitionIds;
    }
    this.totalPartitionKeys = this.eventHubPublisherModel.eventHubPartitonKeys.length;
    for (const partitionKey of this.eventHubPublisherModel.eventHubPartitonKeys) {
      const batch = await this.eventHubProducerClient.createBatch({ partitionKey });
      this.batchList.push(batch);
    }
    console.info(`Batch created successfully, batch count:  ${this.totalPartitionKeys}`);
  }

  public async addEventsToBatch(eventsToSend: unknown[]): Promise<void> {
    if (!eventsToSend?.length) {
      throw new Error("eventsToSend data could not be null or empty");
    }
    // Need to create batches everytime as azure eventHub sdk is not making it empty after sending batch data
    // and data will be persist even after sent to eventHub.
    await this.createBatches();
    this.numEventsSent = 0;
    // add events to our batch
    let eventCount = 0;
    console.info("Adding events to batches...");
    while (eventCount < eventsToSend.length) {
      // messages can fail to be added to the batch if they exceed the maximum size configured for
      // the EventHub.
      let id = Math.floor(Math.random() * this.totalPartitionKeys);
      // if any device's id is null or only string, lets keep its partition key to 1
      if (id === undefined || id === null || isNaN(id) || id < 1 || id > this.totalPartitionKeys) {
        id = 1;
      }
      const batch = this.batchList[id];
      const isAdded = batch.tryAdd({
        body: eventsToSend[eventCount],
        properties: this.eventHubPublisherModel.eventHubUserProperties,
      });
      if (isAdded) {
        ++eventCount;
        continue;
      }

      if (batch.count === 0) {
        // If we can't add it and the batch is empty that means the message we're trying to send
        // is too large, even when it would be the _only_ message in the batch.
        console.info(
          "Message was too large and can't be sent until it's made smaller. Skipping..."
        );
        ++eventCount;
        continue;
      }

      // Batch is full, this just signals a good spot to send our batch
      console.info(`Batch is full - sending ${batch.count} messages as a single batch.`);
      await this.eventHubProducerClient.sendBatch(batch);
      this.numEventsSent += batch.count;
      // and create a new one to house the next set of messages
      this.batchList[id] = await this.eventHubProducerClient.createBatch({
        partitionKey: this.eventHubPublisherModel.eventHubPartitonKeys[id],
      });
      ++eventCount;
    }
    console.info(
      `Events added to batches successfully, total events added:  ${eventsToSend.length}`
    );
  }
}

export async function main(): Promise<void> {
  console.log(`Running sendEvents sample`);

  const eventsToSend = new Array(5000000).fill({ body: "Hello, World!" });

  const timer = setInterval(() => {
    if (!global.gc) {
      throw new Error("global.gc not available");
    }
    global.gc();
    const mem = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
    console.log(`Memory usage ${mem} MB`);
  }, 1000);

  const app = new App();

  try {
    await app.addEventsToBatch(eventsToSend);
  } finally {
    clearInterval(timer);
    app.eventHubProducerClient.close();
  }

  console.log(`Exiting sendEvents sample`);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
