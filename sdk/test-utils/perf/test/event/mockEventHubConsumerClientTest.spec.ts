// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary } from "../../src";
import { EventPerfTest } from "../../src/eventPerfTest";
import { MockEventHubConsumerClient, Event, SubscribeOptions } from "./mockEventHubConsumerClient";

export class MockEventHubConsumerClientTest extends EventPerfTest<SubscribeOptions> {
  public client: MockEventHubConsumerClient;
  public options: PerfOptionDictionary<SubscribeOptions> = {
    partitions: {
      description: "The maximum number of partitions to receive from.",
      longName: "partitions",
      defaultValue: 10,
    },
    maxBatchSize: {
      description: "Max number of events a batch can have.",
      defaultValue: 10,
    },
    maxEventsPerSecond: {
      description: "Max rate to receive in events/sec",
      defaultValue: -1, // defaults to infinity
    },
    delayToRaiseErrorInSeconds: {
      description: "Raises error after the given duration - in seconds",
      defaultValue: -1, // defaults to no error being thrown
    },
  };
  public subscriber: { close: () => Promise<void> } | undefined;

  constructor() {
    super();
    this.client = new MockEventHubConsumerClient();
  }

  setup() {
    const { delayToRaiseErrorInSeconds, partitions, maxBatchSize, maxEventsPerSecond } =
      this.parsedOptions;
    this.subscriber = this.client.subscribe(
      {
        processEvents: async (_events: Event[], _context: { partitionId: number }) => {
          for (const _event of _events) this.eventRaised();
        },
        processError: async (error: Error) => {
          this.errorRaised(error);
        },
      },
      {
        delayToRaiseErrorInSeconds: delayToRaiseErrorInSeconds.value,
        partitions: partitions?.value,
        maxBatchSize: maxBatchSize.value,
        maxEventsPerSecond: maxEventsPerSecond.value,
      }
    );
  }

  async cleanup() {
    this.subscriber && (await this.subscriber.close());
  }
}
