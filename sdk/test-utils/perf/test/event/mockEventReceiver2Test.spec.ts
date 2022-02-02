// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary } from "../../src";
import { EventPerfTest } from "../../src/eventPerfTest";
import { MockEventReceiver2, Event } from "./mockEventReceiver2";

export class MockEventReceiver2Test extends EventPerfTest {
  public client: MockEventReceiver2;
  public options: PerfOptionDictionary = {};
  public subscriber: { close: () => Promise<void> } | undefined;

  constructor() {
    super();
    this.client = new MockEventReceiver2();
  }

  setup() {
    this.subscriber = this.client.subscribe(
      {
        processEvents: async (_events: Event[], _context: { partitionId: number }) => {
          for (const _event of _events) {
            await this.eventRaised();
            console.log(_event.body, _context.partitionId);
          }
        },
        processError: async (error: Error) => {
          await this.errorRaised(error);
        },
      },
      { raiseErrorAfterInSeconds: 10, partitions: 5, maxBatchSize: 10 }
    );
  }

  async cleanup() {
    this.subscriber && (await this.subscriber.close());
  }
}
