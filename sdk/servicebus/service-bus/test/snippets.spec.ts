// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusAdministrationClient, ServiceBusClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const serviceBusClient = new ServiceBusClient("<connectionString>");
  });

  it("ReadmeSampleCreateClient_AAD", async () => {
    const fullyQualifiedNamespace = "<name-of-service-bus-namespace>.servicebus.windows.net";
    const credential = new DefaultAzureCredential();
    const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
  });

  it("ReadmeSampleSendMessage", async () => {
    const fullyQualifiedNamespace = "<name-of-service-bus-namespace>.servicebus.windows.net";
    const credential = new DefaultAzureCredential();
    const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
    // @ts-preserve-whitespace
    const sender = serviceBusClient.createSender("my-queue");
    // @ts-preserve-whitespace
    const messages = [
      { body: "Albert Einstein" },
      { body: "Werner Heisenberg" },
      { body: "Marie Curie" },
      { body: "Steven Hawking" },
      { body: "Isaac Newton" },
      { body: "Niels Bohr" },
      { body: "Michael Faraday" },
      { body: "Galileo Galilei" },
      { body: "Johannes Kepler" },
      { body: "Nikolaus Kopernikus" },
    ];
    // @ts-preserve-whitespace
    // sending a single message
    await sender.sendMessages(messages[0]);
    // @ts-preserve-whitespace
    // sending multiple messages in a single call
    // this will fail if the messages cannot fit in a batch
    await sender.sendMessages(messages);
    // @ts-preserve-whitespace
    // Sends multiple messages using one or more ServiceBusMessageBatch objects as required
    let batch = await sender.createMessageBatch();
    // @ts-preserve-whitespace
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (!batch.tryAddMessage(message)) {
        // Send the current batch as it is full and create a new one
        await sender.sendMessages(batch);
        batch = await sender.createMessageBatch();
        // @ts-preserve-whitespace
        if (!batch.tryAddMessage(messages[i])) {
          throw new Error("Message too big to fit in a batch");
        }
      }
    }
    // Send the batch
    await sender.sendMessages(batch);
  });

  it("ReadmeSampleReceiveMessage", async () => {
    const fullyQualifiedNamespace = "<name-of-service-bus-namespace>.servicebus.windows.net";
    const credential = new DefaultAzureCredential();
    const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
    // @ts-preserve-whitespace
    const receiver = serviceBusClient.createReceiver("my-queue");
  });

  it("ReadmeSampleReceiveMessage_ReceiveMessages", async () => {
    const fullyQualifiedNamespace = "<name-of-service-bus-namespace>.servicebus.windows.net";
    const credential = new DefaultAzureCredential();
    const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
    // @ts-preserve-whitespace
    const receiver = serviceBusClient.createReceiver("my-queue");
    // @ts-preserve-whitespace
    const myMessages = await receiver.receiveMessages(10);
  });

  it("ReadmeSampleReceiveMessage_Subscribe", async () => {
    const fullyQualifiedNamespace = "<name-of-service-bus-namespace>.servicebus.windows.net";
    const credential = new DefaultAzureCredential();
    const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
    // @ts-preserve-whitespace
    const receiver = serviceBusClient.createReceiver("my-queue");
    // @ts-preserve-whitespace
    const myMessageHandler = async (message) => {
      // your code here
      console.log(`message.body: ${message.body}`);
    };
    const myErrorHandler = async (args) => {
      console.log(
        `Error occurred with ${args.entityPath} within ${args.fullyQualifiedNamespace}: `,
        args.error,
      );
    };
    receiver.subscribe({
      processMessage: myMessageHandler,
      processError: myErrorHandler,
    });
  });

  it("ReadmeSampleReceiveMessage_AsyncIterator", async () => {
    const fullyQualifiedNamespace = "<name-of-service-bus-namespace>.servicebus.windows.net";
    const credential = new DefaultAzureCredential();
    const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
    // @ts-preserve-whitespace
    const receiver = serviceBusClient.createReceiver("my-queue");
    // @ts-preserve-whitespace
    for await (const message of receiver.getMessageIterator()) {
      // your code here
    }
  });

  it("ReadmeSampleDeadLetterQueue", async () => {
    const fullyQualifiedNamespace = "<name-of-service-bus-namespace>.servicebus.windows.net";
    const credential = new DefaultAzureCredential();
    const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
    // @ts-preserve-whitespace
    // To receive from a queue's dead letter sub-queue
    const deadLetterReceiverForQueue = serviceBusClient.createReceiver("queue", {
      subQueueType: "deadLetter",
    });
    // @ts-preserve-whitespace
    // To receive from a subscription's dead letter sub-queue
    const deadLetterReceiverForSubscription = serviceBusClient.createReceiver(
      "topic",
      "subscription",
      {
        subQueueType: "deadLetter",
      },
    );
    // @ts-preserve-whitespace
    // Dead letter receivers work like any other receiver connected to a queue
    // ex:
    const messages = await deadLetterReceiverForQueue.receiveMessages(5);
    // @ts-preserve-whitespace
    for (const message of messages) {
      console.log(`Dead lettered message: ${message.body}`);
    }
  });

  it("ReadmeSampleSendMessage_Session", async () => {
    const fullyQualifiedNamespace = "<name-of-service-bus-namespace>.servicebus.windows.net";
    const credential = new DefaultAzureCredential();
    const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
    // @ts-preserve-whitespace
    const sender = serviceBusClient.createSender("my-session-queue");
    await sender.sendMessages({
      body: "my-message-body",
      sessionId: "my-session",
    });
  });

  it("ReadmeSampleAdministrationClient", async () => {
    const queueName = "my-session-queue";
    // @ts-preserve-whitespace
    // Get the connection string from the portal
    // OR
    // use the token credential overload, provide the host name of your Service Bus instance and the AAD credentials from the @azure/identity library
    const serviceBusAdministrationClient = new ServiceBusAdministrationClient("<connectionString>");
    // @ts-preserve-whitespace
    // Similarly, you can create topics and subscriptions as well.
    const createQueueResponse = await serviceBusAdministrationClient.createQueue(queueName);
    console.log("Created queue with name - ", createQueueResponse.name);
    // @ts-preserve-whitespace
    const queueRuntimeProperties =
      await serviceBusAdministrationClient.getQueueRuntimeProperties(queueName);
    console.log(`Number of messages in the queue = ${queueRuntimeProperties.totalMessageCount}`);
    // @ts-preserve-whitespace
    await serviceBusAdministrationClient.deleteQueue(queueName);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
