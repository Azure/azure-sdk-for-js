// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ServiceBusSender } from "@azure/service-bus";
import { delay } from "@azure/service-bus";
import { TestClientType } from "../public/utils/testUtils.js";
import type { ServiceBusReceiver } from "$internal/receivers/receiver.js";
import type { ServiceBusClientForTests, EntityName } from "../public/utils/testutils2.js";
import { createServiceBusClientForTests, testPeekMsgsLength } from "../public/utils/testutils2.js";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";
import { assert } from "../public/utils/chai.js";

const sessionTestClientTypes = [
  TestClientType.PartitionedQueueWithSessions,
  TestClientType.PartitionedSubscriptionWithSessions,
  TestClientType.UnpartitionedQueueWithSessions,
  TestClientType.UnpartitionedSubscriptionWithSessions,
];
const noSessionTestClientTypes = [
  TestClientType.PartitionedQueue,
  TestClientType.PartitionedSubscription,
  TestClientType.UnpartitionedQueue,
  TestClientType.UnpartitionedSubscription,
];

let serviceBusClient: ServiceBusClientForTests;
let entityNames: EntityName;
let sender: ServiceBusSender;
let receiver: ServiceBusReceiver;

async function beforeEachTest(
  entityType: TestClientType,
  receiveMode: "peekLock" | "receiveAndDelete" = "peekLock",
): Promise<void> {
  entityNames = await serviceBusClient.test.createTestEntities(entityType);
  if (receiveMode === "receiveAndDelete") {
    receiver = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityNames);
  } else {
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);
  }

  sender = serviceBusClient.test.addToCleanup(
    serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!),
  );
}

function afterEachTest(): Promise<void> {
  return serviceBusClient.test.afterEach();
}

describe.skip("Batch Receiver - batch delete messages", function (): void {
  beforeAll(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  afterAll(() => {
    return serviceBusClient.test.after();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  const getMessage = (): { body: string } => ({
    body: `${Date.now()}-${Math.random().toString()}`,
  });

  noSessionTestClientTypes.forEach((testClientType) => {
    it(testClientType + ": deleteMessages", async function (): Promise<void> {
      await beforeEachTest(testClientType);
      const receiver2 = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityNames);

      const numMessages = 3;
      const toSend = [];
      for (let i = 0; i < numMessages; i++) {
        toSend.push(getMessage());
      }
      await sender.sendMessages(toSend);

      await testPeekMsgsLength(receiver2, numMessages);

      // wait for things to be ready
      await delay(10 * 1000);
      await receiver2.deleteMessages({ maxMessageCount: numMessages });

      await testPeekMsgsLength(receiver2, 0);
    });

    it(testClientType + ": purgeMessages", async function (): Promise<void> {
      await beforeEachTest(testClientType);
      const receiver2 = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityNames);

      const numMessages = 5000;
      let i = 0;
      let batch = await sender.createMessageBatch();
      while (i < numMessages) {
        const message = getMessage();
        if (!batch.tryAddMessage(message)) {
          // Send the current batch as it is full and create a new one
          await sender.sendMessages(batch);
          batch = await sender.createMessageBatch();
        } else {
          i++;
        }
      }
      if (batch.count) {
        // Send the last batch
        await sender.sendMessages(batch);
      }

      // wait for things to be ready
      await delay(10 * 1000);
      await receiver2.purgeMessages();

      await testPeekMsgsLength(receiver2, 0);
    });
  });

  it(
    TestClientType.PartitionedQueue +
      ": deleteMessages with max message count of zero throws error",
    async function (): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue, "receiveAndDelete");

      const numMessages = 3;
      const toSend = [];
      for (let i = 0; i < numMessages; i++) {
        toSend.push(getMessage());
      }
      await sender.sendMessages(toSend);

      await testPeekMsgsLength(receiver, numMessages);

      try {
        await receiver.deleteMessages({ maxMessageCount: 0 });
        throw new Error("Test failure");
      } catch (err: any) {
        err.message.should.equal(
          "Error 0: TypeError: 'messageCount' must be a number greater than 0.",
        );
      }
    },
  );

  sessionTestClientTypes.forEach((testClientType) => {
    it(testClientType + ": deleteMessages (session)", async function (): Promise<void> {
      const randomSessionId = Math.random().toString();
      const names = await serviceBusClient.test.createTestEntities(testClientType);
      const sender2 = serviceBusClient.test.addToCleanup(
        serviceBusClient.createSender(names.queue ?? names.topic!),
      );

      const numMessages = 3;
      const toSend = [];
      for (let i = 0; i < numMessages; i++) {
        const testMessage = {
          ...getMessage(),
          sessionId: randomSessionId,
          timeToLive: 24 * 60 * 60 * 1000,
        };
        toSend.push(testMessage);
      }
      await sender2.sendMessages(toSend);

      const receiver2 = await serviceBusClient.test.createReceiveAndDeleteReceiver({
        ...names,
        sessionId: randomSessionId,
      });
      const peeked = await receiver2.peekMessages(numMessages + 10);
      assert.equal(peeked.length, numMessages);

      // wait for things to be ready
      await delay(10 * 1000);
      await receiver2.deleteMessages({ maxMessageCount: numMessages });

      await testPeekMsgsLength(receiver2, 0);
    });

    it(testClientType + ": purgeMessages (session)", async function (): Promise<void> {
      const randomSessionId = Math.random().toString();
      const names = await serviceBusClient.test.createTestEntities(testClientType);
      const sender2 = serviceBusClient.test.addToCleanup(
        serviceBusClient.createSender(names.queue ?? names.topic!),
      );

      const numMessages = 5000;
      let i = 0;
      let batch = await sender2.createMessageBatch();
      while (i < numMessages) {
        const message = {
          ...getMessage(),
          sessionId: randomSessionId,
          timeToLive: 24 * 60 * 60 * 1000,
        };
        if (!batch.tryAddMessage(message)) {
          // Send the current batch as it is full and create a new one
          await sender2.sendMessages(batch);
          batch = await sender2.createMessageBatch();
        } else {
          i++;
        }
      }
      if (batch.count) {
        // Send the last batch
        await sender2.sendMessages(batch);
      }

      // wait for things to be ready
      await delay(10 * 1000);
      const receiver2 = await serviceBusClient.test.createReceiveAndDeleteReceiver({
        ...names,
        sessionId: randomSessionId,
      });
      await receiver2.purgeMessages();

      await testPeekMsgsLength(receiver2, 0);
    });
  });
});
