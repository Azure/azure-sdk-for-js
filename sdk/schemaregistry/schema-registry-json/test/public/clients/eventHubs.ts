// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EventData,
  EventHubBufferedProducerClient,
  EventHubConsumerClient,
  MessagingError,
  OnSendEventsErrorContext,
  Subscription,
  earliestEventPosition,
  latestEventPosition,
  EventHubConsumerClientOptions,
} from "@azure/event-hubs";
import { MessagingTestClient } from "./models";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";

export function createEventHubsClient(settings: {
  eventHubHostName: string;
  eventHubName: string;
  alreadyEnqueued: boolean;
  recorder?: Recorder;
}): MessagingTestClient<EventData> {
  const { alreadyEnqueued, eventHubName, eventHubHostName, recorder } = settings;
  let producer: EventHubBufferedProducerClient;
  let consumer: EventHubConsumerClient;
  let subscription: Subscription;
  let initialized = false;
  const eventsBuffer: EventData[] = [];
  const credential = createTestCredential();
  return {
    isInitialized() {
      return initialized;
    },
    async initialize({ skipParsingBodyAsJson } = {}) {
      const clientOptions = {
        onSendEventsErrorHandler: (ctx: OnSendEventsErrorContext) => {
          this.cleanup();
          throw ctx.error;
        },
      };
      producer = new EventHubBufferedProducerClient(
        eventHubHostName,
        eventHubName,
        credential,
        recorder?.configureClientOptions(clientOptions) ?? clientOptions,
      );
      consumer = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        eventHubHostName,
        eventHubName,
        credential,
        recorder?.configureClientOptions<EventHubConsumerClientOptions>({}) ?? undefined,
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
        {
          startPosition: alreadyEnqueued ? earliestEventPosition : latestEventPosition,
          skipParsingBodyAsJson,
        },
      );
      initialized = true;
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
      } catch (error: any) {
        await this.cleanup();
        throw error;
      }
    },
    async cleanup() {
      await producer.close();
      await subscription.close();
      await consumer.close();
      initialized = false;
    },
  };
}
