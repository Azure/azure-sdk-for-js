/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how to create a React hook integrating
  with Azure Service Bus. 

  For more information on Azure Service Bus please see 
  https://www.npmjs.com/package/@azure/service-bus
*/

import { credential } from "../utils/auth";
import {
  MessageHandlers,
  ProcessErrorArgs,
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusReceiver,
  ServiceBusSender
} from "@azure/service-bus";
import { useEffect, useRef } from "react";
import { getEnvironmentVariable } from "../utils";

type Hook = (
  callback: (message: ServiceBusMessage) => void
) => [(message: ServiceBusMessage) => Promise<void>];

const useServiceBus: Hook = (callback) => {
  // Keep a reference on our sender and receiver ServiceBus
  // clients in order to lazy-load them as needed.
  const sender = useRef<ServiceBusSender>();
  const receiver = useRef<ServiceBusReceiver>();

  /**
   * Send a message via ServiceBus using the settings
   * defined in environment variables.
   * @param message  The message to send.
   */
  const sendMessage = async (message: ServiceBusMessage) => {
    console.log("[ServiceBus]: Sending Message", message);
    await sender.current?.sendMessages(message);
  };

  // Define various handlers for processing messages and errors.
  // For simplicity we just pass each event to the consumer client
  // of this hook.
  const consumerHandlers: MessageHandlers = {
    processMessage: async (message: ServiceBusMessage) => {
      console.log("[ServiceBus]: Received Message", message);
      callback(message);
    },

    processError: async (err: ProcessErrorArgs) => {
      console.log("[ServiceBus]: Received Error", err);
    }
  };

  useEffect(() => {
    const namespace = getEnvironmentVariable("REACT_APP_SERVICE_BUS_NAMESPACE");
    const queue = getEnvironmentVariable("REACT_APP_SERVICE_BUS_QUEUE");

    const client = new ServiceBusClient(namespace, credential);

    if (!receiver.current) {
      // Create a new receiver and start receiving messages from ServiceBus.
      receiver.current = client.createReceiver(queue);
      receiver.current.subscribe(consumerHandlers);
    }

    if (!sender.current) {
      sender.current = client.createSender(queue);
    }

    // Close the connections to EventHubs when this hook is
    // cleaned up.
    return () => {
      receiver.current?.close();
      sender.current?.close();
    };
  }, []);

  return [sendMessage];
};

export { useServiceBus };
