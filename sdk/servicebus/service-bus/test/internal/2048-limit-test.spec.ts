// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusSender } from "../../src";
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
      maxAutoLockRenewalDurationInMs: 0
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
    let numberOfMessagesReceived = 0;
    while (numberOfMessagesReceived < numberOfMessagesToReceive) {
      numberOfMessagesReceived += (await receiver.receiveMessages(50, { maxWaitTimeInMs: 3000 }))
        .length;
    }
    chai.assert.equal(
      numberOfMessagesReceived,
      numberOfMessagesToReceive,
      "Unexpected number of messages received"
    );
  }

  describe("receiveAndDelete", () => {
    testClientTypes.forEach((clientType) => {
      it.only(
        clientType + ": would be able to receive more than 2048 messages",
        async function(): Promise<void> {
          await beforeEachTest(clientType, "receiveAndDelete");
          await sendMessages();
          await receiveMessages(numberOfMessagesToSend);
          await verifyMessageCount(0, entityName);
        }
      );
    });
  });

  describe("peekLock", () => {
    testClientTypes.forEach((clientType) => {
      it.only(
        clientType + ": can receive a max of 2048 messages when not being settled",
        async function(): Promise<void> {
          await beforeEachTest(clientType);
          await sendMessages();
          await receiveMessages(2047);
          await verifyMessageCount(numberOfMessagesToSend, entityName);

          // TODO:
          // - Close the client
          // - Receive all the messages again
          // - Settle the messages
          // - Delivery count should have been 1(or incremented) for 2048 of the messages
          // - Rest 952 messages should have zero delivery count
          // This makes sure there is no message loss
        }
      );

      it(
        clientType + ": can receive upto 2048 messages without message loss",
        async function(): Promise<void> {
          await beforeEachTest(clientType);
          await sendMessages();
          await receiveMessages(2047);
          await verifyMessageCount(numberOfMessagesToSend, entityName);
          // TODO:
          // receives in a loop would receive 2047 messages
          // new receive will return 0
          // settle one message
          // can receive one new message
          // new receive will return 0
          // settle all the messages
          // should be able to receive the rest of the messages
        }
      );
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
