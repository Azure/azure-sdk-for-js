// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EventData,
  EventHubBufferedProducerClient,
  EventHubConsumerClient,
  MessagingError,
  OnSendEventsErrorContext,
  Subscription,
  latestEventPosition,
} from "@azure/event-hubs";
import { MessagingTestClient } from "./models";
import { delay } from "@azure-tools/test-recorder";

export function createEventHubsClient(
  eventHubsConnectionString: string,
  eventHubName: string
): MessagingTestClient<EventData> {
  let producer: EventHubBufferedProducerClient;
  let consumer: EventHubConsumerClient;
  let subscription: Subscription;
  const eventsBuffer: EventData[] = [];
  return {
    async initialize() {
      producer = new EventHubBufferedProducerClient(eventHubsConnectionString, eventHubName, {
        onSendEventsErrorHandler: (ctx: OnSendEventsErrorContext) => {
          this.cleanup();
          throw ctx.error;
        },
      });
      consumer = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        eventHubsConnectionString,
        eventHubName
      );
      subscription = consumer.subscribe(
        {
          processEvents: async (events: EventData[]) => {
            eventsBuffer.push(...events);
          },
          processError: async (err: Error | MessagingError) => {
            this.cleanup();
            throw err;
          },
        },
        { startPosition: latestEventPosition }
      );
    },
    async send(message: EventData) {
      await producer.enqueueEvent(message);
    },
    receive: async function* ({ eventCount = 1, waitIntervalInMs = 1000 } = {}) {
      let currEventCount = 0;
      try {
        while (currEventCount < eventCount) {
          await delay(waitIntervalInMs);
          const event = eventsBuffer.shift();
          if (event !== undefined) {
            yield event;
            ++currEventCount;
          }
        }
      } catch (error) {
        await this.cleanup();
        throw error;
      }
    },
    async cleanup() {
      await producer.close();
      await subscription.close();
      await consumer.close();
    },
  };
}
