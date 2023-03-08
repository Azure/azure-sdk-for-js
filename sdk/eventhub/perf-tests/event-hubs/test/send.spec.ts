// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getEnvVar, PerfOptionDictionary, BatchPerfTest } from "@azure/test-utils-perf";
import { EventHubProducerClient, EventData } from "@azure/event-hubs";
import { createMockServer, MockHubOptions, setMockHubEnvVars } from "./utils";
// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

interface SendTestOptions extends MockHubOptions {
  eventBodySize: number;
  numberOfEvents: number;
}

let service: ReturnType<typeof createMockServer>;

export class SendTest extends BatchPerfTest<SendTestOptions> {
  producer: EventHubProducerClient;
  eventBatch: EventData[];
  public options: PerfOptionDictionary<SendTestOptions> = {
    eventBodySize: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "event-size",
      defaultValue: 1024,
    },
    numberOfEvents: {
      required: true,
      description: "Number of events per send",
      shortName: "num",
      longName: "batch-size",
      defaultValue: 10,
    },
    useMockHub: {
      required: true,
      description: "Should the test use mock-hub instead of live service",
      shortName: "mock",
      longName: "mock-hub",
      defaultValue: false,
    },
  };

  constructor() {
    super();
    if (this.parsedOptions.useMockHub.value) setMockHubEnvVars();
    const connectionString = getEnvVar("EVENTHUB_CONNECTION_STRING");
    const eventHubName = getEnvVar("EVENTHUB_NAME");
    this.producer = new EventHubProducerClient(connectionString, eventHubName);
    const event = {
      body: Buffer.alloc(this.parsedOptions.eventBodySize.value),
    };
    this.eventBatch = new Array(this.parsedOptions.numberOfEvents.value).fill(event);
  }

  public async globalSetup() {
    if (this.parsedOptions.useMockHub.value) {
      service = createMockServer();
      await service.start();
    }
  }

  public async globalCleanup(): Promise<void> {
    await this.producer.close();
    if (this.parsedOptions.useMockHub.value) {
      return service.stop();
    }
  }

  async runBatch(): Promise<number> {
    await this.producer.sendBatch(this.eventBatch);
    return this.eventBatch.length;
  }
}
