// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary } from "../../src";
import { EventPerfTest } from "../../src/eventPerfTest";
import { MockEventReceiver, Event } from "./mockEventReceiver";

interface MockEventReceiverOptions { }

export class MockEventReceiverTest extends EventPerfTest<
  MockEventReceiverOptions
> {
  public client: MockEventReceiver;
  public options: PerfOptionDictionary<MockEventReceiverOptions> = {};

  constructor() {
    super();
    this.client = new MockEventReceiver();
  }

  public subscribeCaller(): {
    close: () => Promise<void>;
  } {
    const closeHandler = this.client.subscribe(
      {
        processEvent: async (_event: Event) => {
          // { event: event }
          await this.eventRaised();
        },
        processError: async (error: Error) => {
          await this.errorRaised(error);
        },
      },
      { raiseErrorAfterInSeconds: 10 }
    );
    return closeHandler;
  }
}
