// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { QueueServiceClient, StorageSharedKeyCredential } from "@azure/storage-queue";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_DefaultAzureCredential", async () => {
    const account = "<account>";
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // @ts-ignore
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      credential,
    );
  });

  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = "<connection string>";
    // @ts-preserve-whitespace
    // @ts-ignore
    const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
  });

  it("ReadmeSampleCreateClient_StorageSharedKeyCredential", async () => {
    // Enter your storage account name and shared key
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    // @ts-preserve-whitespace
    // @ts-ignore
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      sharedKeyCredential,
      {
        retryOptions: { maxTries: 4 }, // Retry options
        userAgentOptions: {
          userAgentPrefix: "BasicSample V10.0.0",
        }, // Customized telemetry string
      },
    );
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const account = "<account name>";
    const sas = "<service Shared Access Signature Token>";
    // @ts-ignore
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net?${sas}`,
    );
  });

  it("ReadmeSampleListQueues", async () => {
    const account = "<account>";
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    for await (const item of queueServiceClient.listQueues()) {
      console.log(`Queue${i++}: ${item.name}`);
    }
  });

  it("ReadmeSampleListQueues_Iterator", async () => {
    const account = "<account>";
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    const iterator = queueServiceClient.listQueues();
    let { done, value } = await iterator.next();
    while (!done) {
      console.log(`Queue${i++}: ${value.name}`);
      ({ done, value } = await iterator.next());
    }
  });

  it("ReadmeSampleListQueues_ByPage", async () => {
    const account = "<account>";
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    for await (const page of queueServiceClient.listQueues().byPage({ maxPageSize: 20 })) {
      for (const item of page.queueItems || []) {
        console.log(`Queue${i++}: ${item.name}`);
      }
    }
  });

  it("ReadmeSampleListQueues_Continuation", async () => {
    const account = "<account>";
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    let iterator = queueServiceClient.listQueues().byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // Prints 2 queues
    if (response.queueItems) {
      for (const item of response.queueItems) {
        console.log(`Queue${i++}: ${item.name}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    iterator = queueServiceClient
      .listQueues()
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // Prints 10 queues
    if (response.queueItems) {
      for (const item of response.queueItems) {
        console.log(`Queue${i++}: ${item.name}`);
      }
    }
  });

  it("ReadmeSampleCreateQueue", async () => {
    const account = "<account>";
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const queueName = "<valid queue name>";
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const createQueueResponse = await queueClient.create();
    console.log(
      `Created queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`,
    );
  });

  it("ReadmeSampleSendMessage", async () => {
    const account = "<account>";
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const queueName = "<valid queue name>";
    const queueClient = queueServiceClient.getQueueClient(queueName);
    // Send a message into the queue using the sendMessage method.
    const sendMessageResponse = await queueClient.sendMessage("Hello World!");
    console.log(
      `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`,
    );
  });

  it("ReadmeSamplePeekMessage", async () => {
    const account = "<account>";
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const queueName = "<valid queue name>";
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const peekMessagesResponse = await queueClient.peekMessages();
    console.log(`The peeked message is: ${peekMessagesResponse.peekedMessageItems[0].messageText}`);
  });

  it("ReadmeSampleReceiveMessage", async () => {
    const account = "<account>";
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const queueName = "<valid queue name>";
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const response = await queueClient.receiveMessages();
    if (response.receivedMessageItems.length === 1) {
      const receivedMessageItem = response.receivedMessageItems[0];
      console.log(`Processing & deleting message with content: ${receivedMessageItem.messageText}`);
      const deleteMessageResponse = await queueClient.deleteMessage(
        receivedMessageItem.messageId,
        receivedMessageItem.popReceipt,
      );
      console.log(
        `Delete message successfully, service assigned request Id: ${deleteMessageResponse.requestId}`,
      );
    }
  });

  it("ReadmeSampleDeleteQueue", async () => {
    const account = "<account>";
    const queueServiceClient = new QueueServiceClient(
      `https://${account}.queue.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const queueName = "<valid queue name>";
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const deleteQueueResponse = await queueClient.delete();
    console.log(
      `Deleted queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`,
    );
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
