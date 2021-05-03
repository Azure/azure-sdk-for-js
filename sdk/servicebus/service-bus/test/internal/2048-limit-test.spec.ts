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
  getRandomTestClientTypeWithNoSessions,
  getRandomTestClientTypeWithSessions
} from "../public/utils/testutils2";
import { verifyMessageCount } from "../public/utils/managementUtils";
import { ServiceBusSessionReceiverImpl } from "../../src/receivers/sessionReceiver";
import { MinimalReceiver } from "../../src/core/batchingReceiver";
import { InternalMessageHandlers } from "../../src/models";

chai.use(chaiAsPromised);

let serviceBusClient: ServiceBusClientForTests;
let entityName: EntityName;
let sender: ServiceBusSender;
let receiver: ServiceBusReceiver;
const retryOptions = { maxRetries: 1, retryDelayInMs: 10 };
const bufferCapacityToSet = 20;
const numberOfMessagesToSend = bufferCapacityToSet * 1.5;
const getTestClientTypes = () => [
  getRandomTestClientTypeWithNoSessions(),
  getRandomTestClientTypeWithSessions()
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

  reduceBufferCapacity(receiver, bufferCapacityToSet);
}

async function sendMessages(numberOfMessagesToSend: number) {
  let current = 0;
  const messageBodies = [];
  while (current < numberOfMessagesToSend) {
    const batch = await sender.createMessageBatch();
    let body = `message-${current}`;
    while (
      current < numberOfMessagesToSend &&
      batch.tryAddMessage({
        body,
        timeToLive: 10000,
        sessionId: entityName.usesSessions ? TestMessage.sessionId : undefined
      })
    ) {
      messageBodies.push(body);
      current++;
      body = `message-${current}`;
    }

    await sender.sendMessages(batch);
  }
  return messageBodies;
}

function setIncomingCapacityOnLink(link: MinimalReceiver | undefined, newCapacity: number) {
  if (link && link.session.incoming.deliveries.capacity > 0) {
    link.session.incoming.deliveries.capacity = newCapacity;
  }
}

function reduceBufferCapacity(receiver: ServiceBusReceiver, newCapacity: number) {
  if (entityName.usesSessions) {
    const receiverTemp = receiver as ServiceBusSessionReceiverImpl;
    const link = receiverTemp["_messageSession"]["link"];
    return setIncomingCapacityOnLink(link, newCapacity);
  }

  const receiverTemp = receiver as ServiceBusReceiverImpl;
  if (receiverTemp["_streamingReceiver"]) {
    const link = receiverTemp["_streamingReceiver"]["link"];
    return setIncomingCapacityOnLink(link, newCapacity);
  }

  const createBatchingReceiver = receiverTemp["_createBatchingReceiver"];
  (receiver as ServiceBusReceiverImpl)["_createBatchingReceiver"] = function(...args: any) {
    const batchingReceiver = createBatchingReceiver.apply(this, args);
    const _getCurrentReceiver = batchingReceiver["_batchingReceiverLite"]["_getCurrentReceiver"];
    batchingReceiver["_batchingReceiverLite"]["_getCurrentReceiver"] = async function(
      ...newArgs: any
    ) {
      const link = await _getCurrentReceiver.apply(this, newArgs);
      setIncomingCapacityOnLink(link, newCapacity);
      return link;
    };
    return batchingReceiver;
  };
}

describe("2048 scenarios - receiveBatch in a loop", function(): void {
  beforeEach(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions
    });
  });

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
    return serviceBusClient.test.after();
  });

  async function receiveMessages(numberOfMessagesToReceive: number) {
    let messages: ServiceBusReceivedMessage[] = [];
    while (messages.length < numberOfMessagesToReceive) {
      messages = messages.concat(await receiver.receiveMessages(50, { maxWaitTimeInMs: 5000 }));
    }
    chai.assert.equal(
      messages.length,
      numberOfMessagesToReceive,
      "Unexpected number of messages received"
    );
    return messages;
  }

  describe("receiveAndDelete", () => {
    getTestClientTypes().forEach((clientType) => {
      it(
        clientType + ": would be able to receive more than bufferCapacity messages",
        async function(): Promise<void> {
          await beforeEachTest(clientType, "receiveAndDelete");
          await sendMessages(numberOfMessagesToSend);
          await receiveMessages(numberOfMessagesToSend);
          await verifyMessageCount(0, entityName);
        }
      );
    });
  });

  describe("peekLock: can receive a max of (bufferCapacity-1) messages when not being settled", () => {
    getTestClientTypes().forEach((clientType) => {
      it(
        clientType +
          ": deliveryCount will be incremented for (bufferCapacity-1) messages if closed the receiver and received again",
        async function(): Promise<void> {
          await beforeEachTest(clientType);
          await sendMessages(numberOfMessagesToSend);
          await Promise.all(
            (await receiveMessages(bufferCapacityToSet - 1)).map((msg) =>
              receiver.abandonMessage(msg)
            )
          );
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
              bufferCapacityToSet - 1,
              "Unexpected number of messages have deliveryCount = 1"
            );
          }
          await verifyMessageCount(0, entityName);
        }
      );

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
        clientType + ": new messageBatch returns zero after (bufferCapacity-1) messages",
        async function(): Promise<void> {
          await beforeEachTest(clientType);
          await sendMessages(numberOfMessagesToSend);
          const firstBatch = await receiveMessages(bufferCapacityToSet - 1);
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
          const leftOver = await receiveMessages(
            numberOfMessagesToSend - (bufferCapacityToSet - 1)
          );
          chai.assert.equal(
            leftOver.length,
            numberOfMessagesToSend - (bufferCapacityToSet - 1),
            "Unexpected leftover number of messages received"
          );
        }
      );
    });
  });
});

describe("2048 scenarios - subscribe", function(): void {
  beforeEach(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions
    });
  });

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
    await serviceBusClient.test.after();
  });

  describe("receiveAndDelete", () => {
    getTestClientTypes().forEach((clientType) => {
      it(
        clientType + ": would be able to receive more than bufferCapacity messages",
        async function(): Promise<void> {
          await beforeEachTest(clientType, "receiveAndDelete");
          await sendMessages(numberOfMessagesToSend);
          let numberOfMessagesReceived = 0;
          receiver.subscribe(
            {
              async processMessage(_msg: ServiceBusReceivedMessage) {
                numberOfMessagesReceived++;
              },
              async processError() {},
              async processInitialize() {
                reduceBufferCapacity(receiver, bufferCapacityToSet); // Used for non-sessions only, sessions being mocked at beforeEachTest
              }
            } as InternalMessageHandlers,
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
    getTestClientTypes().forEach((clientType) => {
      it(
        clientType + ": receives more than bufferCapacity messages once settled",
        async function(): Promise<void> {
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
          let reachedBufferCapacity = false;
          const firstBatch: ServiceBusReceivedMessage[] = [];
          const secondBatch: ServiceBusReceivedMessage[] = [];
          receiver.subscribe(
            {
              async processMessage(msg: ServiceBusReceivedMessage) {
                numberOfMessagesReceived++;
                receivedBodies.push(msg.body);
                if (!reachedBufferCapacity) {
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
              },
              async processInitialize() {
                reduceBufferCapacity(receiver, bufferCapacityToSet); // Used for non-sessions only, sessions being mocked at beforeEachTest
              }
            } as InternalMessageHandlers,
            {
              maxConcurrentCalls: 2000,
              autoCompleteMessages: false
            }
          );
          reachedBufferCapacity = await checkWithTimeout(
            () => numberOfMessagesReceived === bufferCapacityToSet - 1,
            1000,
            100000
          );
          chai.assert.equal(
            numberOfMessagesReceived,
            bufferCapacityToSet - 1,
            "Unexpected - messages were not settled, so new messages should not have been received"
          );
          // chai.assert.equal(
          //   unsettledMessagesLimitErrorSeen,
          //   true,
          //   "UnsettledMessagesLimitExceeded should have been observed in the processError callback"
          // );
          await receiver.completeMessage(firstBatch.shift()!); // settle the first message
          chai.assert.equal(
            await checkWithTimeout(
              () => numberOfMessagesReceived >= bufferCapacityToSet,
              1000,
              30000
            ),
            true,
            `Unexpected - one message was settled, count should have been bufferCapacityToSet: ${bufferCapacityToSet}`
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
        }
      );
    });
  });
});
