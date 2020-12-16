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
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusReceiver,
  ServiceBusSender
} from "@azure/service-bus";
import { useEffect, useRef } from "react";
import { getEnvironmentVariable } from "../utils";

const useServiceBus: (
  messageCallback: (message: ServiceBusMessage) => void
) => [(message: ServiceBusMessage) => Promise<void>] = (messageCallback) => {
  const sender = useRef<ServiceBusSender>();
  const receiver = useRef<ServiceBusReceiver>();
  const client = useRef<ServiceBusClient>();

  const processMessage = async (message: ServiceBusMessage) => {
    console.log("[ServiceBus]: Received Message", message);
    messageCallback(message);
  };

  const sendMessage = async (message: ServiceBusMessage) => {
    console.log("[ServiceBus]: Sending Message", message);
    await sender.current?.sendMessages(message);
  };

  const processError = async (args: unknown) => {
    console.log("[ServiceBus]: Received Error", args);
  };

  useEffect(() => {
    if (!client.current) {
      const namespace = getEnvironmentVariable("REACT_APP_SERVICE_BUS_NAMESPACE");
      const queue = getEnvironmentVariable("REACT_APP_SERVICE_BUS_QUEUE"); //todo: this changed, so change the env file accordingly

      const client = new ServiceBusClient(namespace, credential);

      receiver.current = client.createReceiver(queue);

      receiver.current.subscribe({
        processMessage,
        processError
      });

      sender.current = client.createSender(queue);
    }

    return () => {
      receiver.current?.close();
      sender.current?.close();
    };
  }, []);

  return [sendMessage];
};

export { useServiceBus };
