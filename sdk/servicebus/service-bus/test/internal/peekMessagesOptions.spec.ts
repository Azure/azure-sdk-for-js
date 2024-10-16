// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createServiceBusClientForTests,
  EntityName,
  getRandomTestClientTypeWithNoSessions,
  getRandomTestClientTypeWithSessions,
  ServiceBusClientForTests,
} from "../public/utils/testutils2.js";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";
import { expect } from "../public/utils/chai.js";
import { ServiceBusSender } from "../../src/sender.js";
import { ServiceBusReceiver } from "../../src/index.js";
import { TestClientType, TestMessage } from "../public/utils/testUtils.js";

const noSessionTestClientType = getRandomTestClientTypeWithNoSessions();
const withSessionTestClientType = getRandomTestClientTypeWithSessions();

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

  [noSessionTestClientType, withSessionTestClientType].forEach((testType) => {
    it(testType + ": peek messages", async () => {
      await beforeEachTest(testType);
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sender.sendMessages(testMessages);

      let peeked = await receiver.peekMessages(1, {
        omitMessageBody: true,
      });

      expect(peeked.length).to.equal(1);
      expect(peeked[0].body).toBeUndefined();

      const received = await receiver.receiveMessages(1);
      expect(received.length).toBe(1);
      await receiver.completeMessage(received[0]);

      peeked = await receiver.peekMessages(1, {
        omitMessageBody: true,
      });

      expect(peeked.length).to.equal(1);
    });
  });
});
