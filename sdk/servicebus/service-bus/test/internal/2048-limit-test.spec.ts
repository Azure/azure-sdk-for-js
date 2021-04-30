// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ProcessErrorArgs, ServiceBusReceivedMessage, ServiceBusSender } from "../../src";
import { checkWithTimeout, TestClientType, TestMessage } from "../public/utils/testUtils";
import { ServiceBusReceiver, ServiceBusReceiverImpl } from "../../src/receivers/receiver";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  EntityName,
  getRandomTestClientType
} from "../public/utils/testutils2";
import { verifyMessageCount } from "../public/utils/managementUtils";
import { ServiceBusSessionReceiverImpl } from "../../src/receivers/sessionReceiver";

chai.use(chaiAsPromised);

let serviceBusClient: ServiceBusClientForTests;
let entityName: EntityName;
let sender: ServiceBusSender;
let receiver: ServiceBusReceiver;
const retryOptions = { maxRetries: 3, retryDelayInMs: 10 };
const numberOfMessagesToSend = 3000;

const testClientTypes = [getRandomTestClientType()];

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

async function sendMessages(numberOfMessagesToSend: number) {
  let current = 0;
  const messageBodies = [];
  while (current < numberOfMessagesToSend) {
    const batch = await sender.createMessageBatch();
    let body = `message-${current}`;
    while (
      current < numberOfMessagesToSend &&
      batch.tryAddMessage(
        entityName.usesSessions ? { body, sessionId: TestMessage.sessionId } : { body }
      )
    ) {
      messageBodies.push(body);
      current++;
      body = `message-${current}`;
    }

    await sender.sendMessages(batch);
  }
  return messageBodies;
}

describe("2048 scenarios - receiveBatch in a loop", function(): void {
  before(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions
    });
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  async function receiveMessages(numberOfMessagesToReceive: number) {
    let messages: ServiceBusReceivedMessage[] = [];
    while (messages.length < numberOfMessagesToReceive) {
      messages = messages.concat(await receiver.receiveMessages(50));
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
          await sendMessages(numberOfMessagesToSend);
          await receiveMessages(numberOfMessagesToSend);
          await verifyMessageCount(0, entityName);
        }
      ).timeout(300000);
    });
  });

  describe("peekLock: can receive a max of 2047 messages when not being settled", () => {
    testClientTypes.forEach((clientType) => {
      it(
        clientType +
          ": deliveryCount will be incremented for 2047 messages if closed the receiver and received again",
        async function(): Promise<void> {
          await beforeEachTest(clientType);
          await sendMessages(numberOfMessagesToSend);
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

      function mockBachingReceive(receiver: ServiceBusReceiver, receiveCalled: { count: number }) {
        if (entityName.usesSessions) {
          const sessionReceiverTemp = receiver as ServiceBusSessionReceiverImpl;
          if (sessionReceiverTemp["_messageSession"]) {
            const tempFunc =
              sessionReceiverTemp["_messageSession"]["_batchingReceiverLite"].receiveMessages;
            sessionReceiverTemp["_messageSession"][
              "_batchingReceiverLite"
            ].receiveMessages = function(...args: any) {
              receiveCalled.count++;
              return tempFunc.apply(this, args);
            };
          }
        } else {
          const receiverTemp = receiver as ServiceBusReceiverImpl;
          if (receiverTemp["_batchingReceiver"]) {
            const tempFunc =
              receiverTemp["_batchingReceiver"]["_batchingReceiverLite"].receiveMessages;
            receiverTemp["_batchingReceiver"]["_batchingReceiverLite"].receiveMessages = function(
              ...args: any
            ) {
              receiveCalled.count++;
              return tempFunc.apply(this, args);
            };
          }
        }
      }

      it(
        clientType + ": new messageBatch returns zero after 2047 messages",
        async function(): Promise<void> {
          await beforeEachTest(clientType);
          await sendMessages(numberOfMessagesToSend);
          const firstBatch = await receiveMessages(2047);
          await verifyMessageCount(numberOfMessagesToSend, entityName);

          const receiveCalled = { count: 0 };
          mockBachingReceive(receiver, receiveCalled);
          chai.assert.equal(
            (await receiver.receiveMessages(1, { maxWaitTimeInMs: 2000 })).length,
            0,
            "Should have received 0 messages!"
          );
          chai.assert.equal(
            receiveCalled.count,
            retryOptions.maxRetries + 1,
            "Unexpected number of times receive called"
          );
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
  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  afterEach(async () => {
    await afterEachTest();
  });

  describe("receiveAndDelete", () => {
    testClientTypes.forEach((clientType) => {
      it(
        clientType + ": would be able to receive more than 2048 messages",
        async function(): Promise<void> {
          await beforeEachTest(clientType, "receiveAndDelete");
          await sendMessages(numberOfMessagesToSend);
          let numberOfMessagesReceived = 0;
          receiver.subscribe(
            {
              async processMessage(_msg: ServiceBusReceivedMessage) {
                numberOfMessagesReceived++;
              },
              async processError() {}
            },
            { maxConcurrentCalls: 2000 }
          );
          chai.assert.equal(
            await checkWithTimeout(
              () => numberOfMessagesReceived === numberOfMessagesToSend,
              1000,
              100000
            ),
            true,
            `Could not receive the messages in expected time. RECEIVED=${numberOfMessagesReceived}, SENT=${numberOfMessagesToSend}`
          );
          await verifyMessageCount(0, entityName);
          await receiver.close();
        }
      );
    });
  });

  describe("peekLock", () => {
    testClientTypes.forEach((clientType) => {
      it(clientType + ": receives more than 2048 messages once settled", async function(): Promise<
        void
      > {
        // subscribe - peekLock
        // - send
        // - receive 2048 messages
        // - do not settle them
        // - wait for 10 seconds
        // - make sure no new messages were received
        // - settle one message
        // - wait for 30 seconds
        // - we should receive one new message by now
        // - settle all the messages
        // - rest would have been received
        // - settle all of them
        // - verifyMessageCount
        await beforeEachTest(clientType);
        let sentBodies = await sendMessages(numberOfMessagesToSend);
        const receivedBodies: any[] = [];
        let numberOfMessagesReceived = 0;
        let received2047 = false;
        const firstBatch: ServiceBusReceivedMessage[] = [];
        const secondBatch: ServiceBusReceivedMessage[] = [];
        receiver.subscribe(
          {
            async processMessage(msg: ServiceBusReceivedMessage) {
              numberOfMessagesReceived++;
              receivedBodies.push(msg.body);
              if (!received2047) {
                firstBatch.push(msg);
              } else {
                secondBatch.push(msg);
              }
            },
            async processError(_args: ProcessErrorArgs) {
              // if (
              //   ((args.error as ServiceBusError).code as InternalServiceBusErrorCode) ===
              //   "UnsettledMessagesLimitExceeded"
              // ) {
              //   unsettledMessagesLimitErrorSeen = true;
              // }
            }
          },
          {
            maxConcurrentCalls: 2000,
            autoCompleteMessages: false
          }
        );
        received2047 = await checkWithTimeout(
          () => numberOfMessagesReceived === 2047,
          1000,
          100000
        );
        chai.assert.equal(
          numberOfMessagesReceived,
          2047,
          "Unexpected - messages were not settled, so new messages should not have been received"
        );
        // chai.assert.equal(
        //   unsettledMessagesLimitErrorSeen,
        //   true,
        //   "UnsettledMessagesLimitExceeded should have been observed in the processError callback"
        // );
        await receiver.completeMessage(firstBatch.shift()!); // settle the first message
        chai.assert.equal(
          await checkWithTimeout(() => numberOfMessagesReceived >= 2048, 1000, 30000),
          true,
          "Unexpected - one message was settled, count should have been 2048"
        );
        await Promise.all(firstBatch.map((msg) => receiver.completeMessage(msg)));
        chai.assert.equal(
          await checkWithTimeout(
            () => {
              sentBodies = sentBodies.filter((sentBody) => !receivedBodies.includes(sentBody));
              return sentBodies.length === 0;
            },
            1000,
            100000
          ),
          true,
          "Unexpected - all the sent messages should have been received"
        );
        await Promise.all(secondBatch.map((msg) => receiver.completeMessage(msg)));
        await verifyMessageCount(0, entityName);
        await receiver.close();
      }).timeout(200000);
    });
  });
});
