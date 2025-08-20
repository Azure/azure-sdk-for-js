// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusReceiver, ServiceBusSender } from "@azure/service-bus";
import type { EntityName, ServiceBusClientForTests } from "./utils/testutils2.js";
import { createServiceBusClientForTests } from "./utils/testutils2.js";
import { TestClientType, TestMessage } from "./utils/testUtils.js";
import { expect } from "./utils/chai.js";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

let serviceBusClient: ServiceBusClientForTests;
let entityNames: EntityName;
let sender: ServiceBusSender;
let receiveAndDeleteReceiver: ServiceBusReceiver;

async function beforeEachTest(entityType: TestClientType): Promise<void> {
  entityNames = await serviceBusClient.test.createTestEntities(entityType);
  receiveAndDeleteReceiver =
    await serviceBusClient.test.createReceiveAndDeleteReceiver(entityNames);

  sender = serviceBusClient.test.addToCleanup(
    serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!),
  );
}

function afterEachTest(): Promise<void> {
  return serviceBusClient.test.afterEach();
}
describe("PeekMessagesOptions.omitMessageBody", () => {
  beforeAll(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  afterAll(() => {
    return serviceBusClient.test.after();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  [
    TestClientType.UnpartitionedQueue,
    TestClientType.UnpartitionedSubscription,
    // Service issue feature doesn't work for PartitionedQueue and PartitionedSubscription
    // TestClientType.PartitionedQueue,
    // TestClientType.PartitionedSubscription,
    TestClientType.UnpartitionedQueueWithSessions,
    TestClientType.UnpartitionedSubscriptionWithSessions,
    TestClientType.PartitionedQueueWithSessions,
    TestClientType.PartitionedSubscriptionWithSessions,
  ].forEach((testType) => {
    it(testType + ": peek messages", async () => {
      await beforeEachTest(testType);
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sender.sendMessages(testMessages);

      const peeked = await receiveAndDeleteReceiver.peekMessages(1, {
        omitMessageBody: true,
      });

      expect(peeked.length).to.equal(1);
      expect(peeked[0].body).toBeUndefined();

      const received = await receiveAndDeleteReceiver.receiveMessages(1);
      expect(received.length).toBe(1);
    });
  });
});
