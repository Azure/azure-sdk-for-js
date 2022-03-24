// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BatchPerfTest, PerfOptionDictionary } from "../../src";

interface MockReceiverOptions {
  "max-message-count": number;
  "min-message-count": number;
}

export class MockReceiverTest extends BatchPerfTest<MockReceiverOptions> {
  public client: MockReceiver;
  private minMessageCount: number;
  private maxMessageCount: number;

  public options: PerfOptionDictionary<MockReceiverOptions> = {
    "min-message-count": {
      required: true,
      description: "Required option",
      shortName: "min",
      longName: "min-message-count",
      defaultValue: 0,
    },
    "max-message-count": {
      required: true,
      description: "Required option",
      shortName: "max",
      longName: "max-message-count",
      defaultValue: 10,
    },
  };
  constructor() {
    super();
    this.client = new MockReceiver();
    this.minMessageCount = this.parsedOptions["min-message-count"].value;
    this.maxMessageCount = this.parsedOptions["max-message-count"].value;
  }

  public runBatch(): Promise<number> {
    return this.client.receive(this.minMessageCount, this.maxMessageCount);
  }
}

class MockReceiver {
  public async receive(minMessageCount: number, maxMessageCount: number) {
    return Promise.resolve(this.getRandomInteger(minMessageCount, maxMessageCount));
  }

  private getRandomInteger(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
