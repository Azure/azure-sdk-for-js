// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SubscriptionEventHandlers, ReceivedEventData, PartitionContext } from "../../src";

export class FakeSubscriptionEventHandlers implements SubscriptionEventHandlers {
  public events: Map<string, ReceivedEventData[]> = new Map();
  public errors: Error[] = [];

  async processEvents(events: ReceivedEventData[], context: PartitionContext) {
    for (const event of events) {
      let receivedEvents = this.events.get(context.partitionId);

      if (receivedEvents == null) {
        receivedEvents = [];
        this.events.set(context.partitionId, receivedEvents);
      }

      receivedEvents.push(event);
    }
  }

  async processError(err: Error, context: PartitionContext) {
    this.errors.push(err);
  }
}
