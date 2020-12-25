// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  getEnvVar,
  PerfStressOptionDictionary,
  PerfStressTest
} from "@azure/test-utils-perfstress";
import { EventHubClient, EventData } from "@azure/event-hubs";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = getEnvVar("EVENTHUB_CONNECTION_STRING");
const eventHubName = getEnvVar("EVENTHUB_NAME");

interface SendTestOptions {
  eventBodySize: number;
  numberOfEvents: number;
}

export class SendTest extends PerfStressTest<SendTestOptions> {
  producer: EventHubClient;
  event: EventData;
  public options: PerfStressOptionDictionary<SendTestOptions> = {
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
    this.producer = EventHubClient.createFromConnectionString(connectionString, eventHubName);
    this.event = {
      body: Buffer.alloc(this.parsedOptions.eventBodySize.value!)
    };
  }

  public async globalCleanup() {
    await this.producer.close();
  }

  async runAsync(): Promise<void> {
    await this.producer.sendBatch(
      new Array(this.parsedOptions.numberOfEvents.value!).fill(this.event)
    );
  }
}
