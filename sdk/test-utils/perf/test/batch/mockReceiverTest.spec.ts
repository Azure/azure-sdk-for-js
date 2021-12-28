// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BatchPerfTest, PerfOptionDictionary } from "../../src";

interface MockReceiverOptions {
  "max-count": number;
  "min-count": number;
}

export class MockReceiverTest extends BatchPerfTest<MockReceiverOptions> {
  public client: MockReceiver;
  public options: PerfOptionDictionary<MockReceiverOptions> = {
    "min-count": {
      required: true,
      description: "Required option",
      shortName: "min",
      longName: "minimum",
      defaultValue: 5
    },
    "max-count": {
      required: true,
      description: "Required option",
      shortName: "max",
      longName: "maximum",
      defaultValue: 50
    }
  };
  constructor() {
    super();
    this.client = new MockReceiver();
  }

  public runBatch(): Promise<number> {
    return this.client.receive(
      this.parsedOptions["min-count"].value,
      this.parsedOptions["max-count"].value
    );
  }
}

class MockReceiver {
  public async receive(minMessageCount: number, maxMessageCount: number) {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(this.getRandomInteger(minMessageCount, maxMessageCount));
      }, 5);
    });
  }

  private getRandomInteger(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
