// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EventData,
  EventHubBufferedProducerClient,
  EventHubConsumerClient,
  OnSendEventsErrorContext,
  earliestEventPosition,
} from "@azure/event-hubs";
import { MessagingTestClient } from "./models";
import { delay } from "@azure-tools/test-recorder";

export function createEventHubsClient(
  eventHubsConnectionString: string,
  eventHubName: string
): MessagingTestClient<EventData> {
  let producer: EventHubBufferedProducerClient;
  let consumer: EventHubConsumerClient;
  return {
    async initialize() {
      producer = new EventHubBufferedProducerClient(eventHubsConnectionString, eventHubName, {
        onSendEventsErrorHandler: (ctx: OnSendEventsErrorContext) => {
          throw ctx.error;
        },
      });
      consumer = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        eventHubsConnectionString,
        eventHubName
      );
    },
    async send(message: EventData) {
      await producer.enqueueEvent(message);
    },
    async receive() {
      let firstEvent: EventData | undefined = undefined;
      const subscription = consumer.subscribe(
        {
          // The callback where you add your code to process incoming events
          processEvents: async (events: EventData[]) => {
            for (const event of events) {
              firstEvent = event;
              break;
            }
          },
          processError: async (err) => {
            this.cleanup();
            throw err;
          },
        },
        { startPosition: earliestEventPosition }
      );
      await delay(3000);
      await subscription.close();
      if (firstEvent !== undefined) {
        return firstEvent;
      } else {
        await this.cleanup();
        throw new Error(`no event received!`);
      }
    },
    async cleanup() {
      await producer.close();
      await consumer.close();
    },
  };
}
