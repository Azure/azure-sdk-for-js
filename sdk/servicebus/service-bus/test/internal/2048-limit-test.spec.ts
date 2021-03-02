// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusReceivedMessage, ServiceBusSender } from "../../src";
import { TestClientType, TestMessage } from "../public/utils/testUtils";
import { ServiceBusReceiver } from "../../src/receivers/receiver";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  EntityName
} from "../public/utils/testutils2";
import { verifyMessageCount } from "../public/utils/managementUtils";

chai.use(chaiAsPromised);

let serviceBusClient: ServiceBusClientForTests;
let entityName: EntityName;
let sender: ServiceBusSender;
let receiver: ServiceBusReceiver;

const testClientTypes = [
  TestClientType.PartitionedQueue,
  TestClientType.PartitionedQueueWithSessions,
  TestClientType.UnpartitionedQueue,
  TestClientType.UnpartitionedQueueWithSessions
];

async function beforeEachTest(
  entityType: TestClientType,
  receiveMode: "peekLock" | "receiveAndDelete" = "peekLock"
): Promise<void> {
  entityName = await serviceBusClient.test.createTestEntities(entityType);
  if (receiveMode === "receiveAndDelete") {
    receiver = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityName);
  } else {
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityName, {
      // maxAutoLockRenewalDurationInMs: 0
    });
  }

  sender = serviceBusClient.test.addToCleanup(
    serviceBusClient.createSender(entityName.queue ?? entityName.topic!)
  );
}

function afterEachTest(): Promise<void> {
  return serviceBusClient.test.afterEach();
}

describe("2048 scenarios - receiveBatch in a loop", function(): void {
  const numberOfMessagesToSend = 3000;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function sendMessages() {
    let current = 0;
    while (current < numberOfMessagesToSend) {
      const batch = await sender.createMessageBatch();
      while (
        batch.tryAddMessage(
          entityName.usesSessions
            ? { body: `message-${current}`, sessionId: TestMessage.sessionId }
            : { body: `message-${current}` }
        ) &&
        current++ &&
        current < numberOfMessagesToSend
      );
      await sender.sendMessages(batch);
    }
  }

  async function receiveMessages(numberOfMessagesToReceive: number) {
    let messages: ServiceBusReceivedMessage[] = [];
    while (messages.length < numberOfMessagesToReceive) {
      messages = messages.concat(await receiver.receiveMessages(50, { maxWaitTimeInMs: 3000 }));
    }
    chai.assert.equal(
      messages.length,
      numberOfMessagesToReceive,
      "Unexpected number of messages received"
    );
    return messages;
  }

  describe("receiveAndDelete", () => {
    testClientTypes.forEach((clientType) => {
      it(
        clientType + ": would be able to receive more than 2047 messages",
        async function(): Promise<void> {
          await beforeEachTest(clientType, "receiveAndDelete");
          await sendMessages();
          await receiveMessages(numberOfMessagesToSend);
          await verifyMessageCount(0, entityName);
        }
      );
    });
  });

  describe("peekLock: can receive a max of 2047 messages when not being settled", () => {
    testClientTypes.forEach((clientType) => {
      it(
        clientType +
          ": deliveryCount will be incremented for 2047 messages if closed the receiver and received again",
        async function(): Promise<void> {
          await beforeEachTest(clientType);
          await sendMessages();
          await receiveMessages(2047);
          await verifyMessageCount(numberOfMessagesToSend, entityName);
          await serviceBusClient.close();
          serviceBusClient = createServiceBusClientForTests();
          await verifyMessageCount(numberOfMessagesToSend, entityName);
          receiver = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityName);
          const messages = await receiveMessages(numberOfMessagesToSend);
          if (!entityName.usesSessions) {
            // Delivery count isn't incremented for sessionful messages.
            // TODO: Log an issue, check with the service team?
            const delCount = new Array(10).fill(0, 0, 10);
            for (const message of messages) {
              if (message.deliveryCount) {
                delCount[message.deliveryCount]++;
              }
            }
            chai.assert.equal(
              delCount[1],
              2047,
              "Unexpected number of messages have deliveryCount = 1"
            );
          }
          await verifyMessageCount(0, entityName);
        }
      ).timeout(200000);

      it(
        clientType + ": new messageBatch returns zero after 2047 messages",
        async function(): Promise<void> {
          await beforeEachTest(clientType);
          await sendMessages();
          const firstBatch = await receiveMessages(2047);
          await verifyMessageCount(numberOfMessagesToSend, entityName);
          const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 4000 });
          chai.assert.equal(messages.length, 0, "Unexpected number of messages received");
          await verifyMessageCount(numberOfMessagesToSend, entityName);
          await Promise.all(firstBatch.map((msg) => receiver.completeMessage(msg)));
          const leftOver = await receiveMessages(numberOfMessagesToSend - 2047);
          chai.assert.equal(
            leftOver.length,
            numberOfMessagesToSend - 2047,
            "Unexpected leftover number of messages received"
          );
        }
      ).timeout(200000);
    });
  });
});

describe("2048 scenarios - subscribe", function(): void {
  testClientTypes.forEach((clientType) => {
    it(clientType + ": would be able to receive more than 2048 messages", async function(): Promise<
      void
    > {
      // subscribe - receiveAndDelete
    });
    it(clientType + ": would be able to receive more than 2048 messages", async function(): Promise<
      void
    > {
      // subscribe - peekLock
    });
  });
});
