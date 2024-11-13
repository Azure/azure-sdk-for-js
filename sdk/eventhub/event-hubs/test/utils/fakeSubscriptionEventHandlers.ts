// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PartitionContext,
  ReceivedEventData,
  SubscriptionEventHandlers,
} from "../../src/index.js";

export class FakeSubscriptionEventHandlers implements SubscriptionEventHandlers {
  public events: Map<string, ReceivedEventData[]> = new Map();
  public errors: Error[] = [];

  async processEvents(events: ReceivedEventData[], context: PartitionContext): Promise<void> {
    for (const event of events) {
      let receivedEvents = this.events.get(context.partitionId);

      if (receivedEvents == null) {
        receivedEvents = [];
        this.events.set(context.partitionId, receivedEvents);
      }

      receivedEvents.push(event);
    }
  }

  async processError(err: Error): Promise<void> {
    this.errors.push(err);
  }
}
