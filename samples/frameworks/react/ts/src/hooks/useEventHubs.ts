/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how to create a React hook integrating
  with Azure Event Hubs. 

  For more information on Azure Event Hubs please see 
  https://www.npmjs.com/package/@azure/event-hubs
*/

import { useEffect, useRef } from "react";
import {
  EventData,
  EventHubConsumerClient,
  EventHubProducerClient,
  SubscriptionEventHandlers
} from "@azure/event-hubs";
import { credential, getEnvironmentVariable } from "../utils";

type Hook = (
  callBack: (EventData: EventData) => Promise<void>
) => (event: EventData) => Promise<void>;

/**
 * The EventHubs hook accepts a callback function and returns a function
 * that allows you to publish events to EventHubs.
 * @param callback The function to be called for every EventHubs message
 */
const useEventHubs: Hook = (callback) => {
  // Keep a reference on our consumer and producer EventHubs
  // clients in order to lazy-load them as needed.
  const consumer = useRef<EventHubConsumerClient>();
  const producer = useRef<EventHubProducerClient>();

  /**
   * Publish an event to an EventHubs instance using the
   * settings defined in environment variables.
   * @param event The event to publish to EventHubs.
   */
  const publishEvent = async (event: EventData) => {
    if (!producer.current) {
      throw new Error("[EventHubs]: Producer never initialized!");
    }
    console.log("[EventHubs]: Publishing Event", event);
    await producer.current.sendBatch([event]);
  };

  // Define various handlers for processing events and errors
  // For simplicity we just pass each event to the consumer
  // client of this hook.
  const consumerHandlers: SubscriptionEventHandlers = {
    processEvents: async (events) => {
      for (const event of events) {
        console.log("[EventHubs]: Received Event", event);
        await callback(event);
      }
    },
    processError: async (err) => {
      console.log("[EventHubs]: Received Error", err);
    }
  };

  useEffect(() => {
    const namespace = getEnvironmentVariable("REACT_APP_EVENT_HUBS_NAMESPACE");
    const eventHubsName = getEnvironmentVariable("REACT_APP_EVENT_HUBS_NAME");

    if (!consumer.current) {
      // Create a new consumer using the default consumer group.
      // For more information about consumer groups please refer to
      // https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features#consumer-groups
      consumer.current = new EventHubConsumerClient(
        "$Default",
        namespace,
        eventHubsName,
        credential
      );

      // Alternatively you may decide to ignore any events that
      // occurred before the consumer subscribed using `latestEventPosition`.
      // In this sample, since we want to ensure we are synchronized to all other
      // consumers we can start at the latest event position, but use the `isInclusive`
      // flag to receive the last event that was posted to the server.
      consumer.current.subscribe(consumerHandlers, {
        startPosition: { isInclusive: true, offset: "@latest" }
      });
    }

    if (!producer.current) {
      producer.current = new EventHubProducerClient(namespace, eventHubsName, credential);
    }

    // Close the connections to EventHubs when this hook is
    // cleaned up.
    return () => {
      producer.current?.close();
      consumer.current?.close();
    };
  }, []);

  return publishEvent;
};

export { useEventHubs };
