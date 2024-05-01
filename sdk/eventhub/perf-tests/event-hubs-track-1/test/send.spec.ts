// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getEnvVar,
  PerfOptionDictionary,
  PerfTest
} from "@azure/test-utils-perf";
import { EventHubClient, EventData } from "@azure/event-hubs";

import { config } from "dotenv";
config();

const connectionString = getEnvVar("EVENTHUB_CONNECTION_STRING");
const eventHubName = getEnvVar("EVENTHUB_NAME");

interface SendTestOptions {
  eventBodySize: number;
  numberOfEvents: number;
}

const client = EventHubClient.createFromConnectionString(connectionString, eventHubName);
export class SendTest extends PerfTest<SendTestOptions> {
  producer: EventHubClient;
  eventBatch: EventData[];
  public options: PerfOptionDictionary<SendTestOptions> = {
    eventBodySize: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    },
    numberOfEvents: {
      required: true,
      description: "Number of events per send",
      shortName: "num",
      longName: "numberOfEvents",
      defaultValue: 10
    }
  };

  constructor() {
    super();
    this.producer = client;
    const event = {
      body: Buffer.alloc(this.parsedOptions.eventBodySize.value!)
    };
    this.eventBatch = new Array(this.parsedOptions.numberOfEvents.value!).fill(event);
  }

  public async globalCleanup() {
    await this.producer.close();
  }

  async run(): Promise<void> {
    await this.producer.sendBatch(this.eventBatch);
  }
}
