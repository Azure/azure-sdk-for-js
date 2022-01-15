// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary } from "../../src";
import { EventPerfTest } from "../../src/eventPerfTest";
import { MockEventReceiver, Event } from "./mockEventReceiver";

interface MockEventReceiverOptions {}
type ProcessEventArgs = { event: Event };
type ProcessErrorArgs = { error: Error };

export class MockEventReceiverTest extends EventPerfTest<
  MockEventReceiverOptions,
  ProcessEventArgs,
  ProcessErrorArgs
> {
  public client: MockEventReceiver;
  public options: PerfOptionDictionary<MockEventReceiverOptions> = {};

  constructor() {
    super();
    this.client = new MockEventReceiver();
  }

  public async processEvent(_options: ProcessEventArgs) {
    await this.eventRaised();
  }

  public async processError(options: ProcessErrorArgs) {
    await this.errorRaised(options.error);
  }

  public subscribeCaller(): {
    close: () => Promise<void>;
  } {
    const closeHandler = this.client.subscribe(
      {
        processEvent: async (event: Event) => {
          await this.processEvent({ event: event });
        },
        processError: async (error: Error) => {
          await this.processError({ error });
        },
      },
      { raiseErrorAfterInSeconds: 10 }
    );
    return closeHandler;
  }
}
