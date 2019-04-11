// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  ServiceBusClient,
  QueueClient,
  ServiceBusMessage,
  TopicClient,
  SubscriptionClient,
  delay
} from "../src";

import { DispositionType, ReceiveMode } from "../src/serviceBusMessage";

import {
  TestMessage,
  getSenderReceiverClients,
  ClientType,
  purge,
  checkWithTimeout
} from "./testUtils";
import { Sender } from "../src/sender";
import { SessionReceiver } from "../src/receiver";

async function testPeekMsgsLength(
  client: QueueClient | SubscriptionClient,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.peek(expectedPeekLength + 1);
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

let ns: ServiceBusClient;

let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;
let deadLetterClient: QueueClient | SubscriptionClient;
let sessionReceiver: SessionReceiver;
let sender: Sender;
let errorWasThrown: boolean;
let unexpectedError: Error | undefined;

function unExpectedErrorHandler(err: Error): void {
  if (err) {
    unexpectedError = err;
  }
}

async function beforeEachTest(
  senderType: ClientType,
  receiverType: ClientType,
  receiveMode?: ReceiveMode
): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = ServiceBusClient.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  const clients = await getSenderReceiverClients(ns, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  sender = senderClient.createSender();

  if (receiverClient instanceof QueueClient) {
    deadLetterClient = ns.createQueueClient(
      QueueClient.getDeadLetterQueuePath(receiverClient.entityPath)
    );
  }

  if (receiverClient instanceof SubscriptionClient) {
    deadLetterClient = ns.createSubscriptionClient(
      TopicClient.getDeadLetterTopicPath(senderClient.entityPath, receiverClient.subscriptionName),
      receiverClient.subscriptionName
    );
  }

  await purge(receiverClient, TestMessage.sessionId);
  await purge(deadLetterClient);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }

  if (!receiveMode) {
    receiveMode = ReceiveMode.peekLock;
  }
  sessionReceiver = <SessionReceiver>receiverClient.createReceiver(receiveMode, {
    sessionId: TestMessage.sessionId
  });

  errorWasThrown = false;
  unexpectedError = undefined;
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("Sessions Streaming - Misc Tests", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAutoComplete(): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.registerMessageHandler((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
      should.equal(msg.messageId, testMessage.messageId, "MessageId is different than expected");
      return Promise.resolve();
    }, unExpectedErrorHandler);

    const msgsCheck = await checkWithTimeout(
      () => receivedMsgs.length === 1 && receivedMsgs[0].delivery.remote_settled === true
    );
    should.equal(
      msgsCheck,
      true,
      receivedMsgs.length !== 1
        ? `Expected 1, received ${receivedMsgs.length} messages`
        : "Message didnt get auto-completed in time"
    );
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: AutoComplete removes the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testAutoComplete();
  });

  it("Partitioned Subscription: AutoComplete removes the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testAutoComplete();
  });

  it("UnPartitioned Queue: AutoComplete removes the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testAutoComplete();
  });

  it("UnPartitioned Subscription: AutoComplete removes the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testAutoComplete();
  });

  async function testManualComplete(): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.registerMessageHandler(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
        should.equal(msg.messageId, testMessage.messageId, "MessageId is different than expected");
        return Promise.resolve();
      },
      unExpectedErrorHandler,
      { autoComplete: false }
    );

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);

    await testPeekMsgsLength(receiverClient, 1);

    await receivedMsgs[0].complete();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testManualComplete();
  });

  it("Partitioned Subscription: Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testManualComplete();
  });

  it("UnPartitioned Queue: Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testManualComplete();
  });

  it("UnPartitioned Subscription: Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testManualComplete();
  });
});

describe("Sessions Streaming - Complete message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete(autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.registerMessageHandler(
      (msg: ServiceBusMessage) => {
        should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
        should.equal(msg.messageId, testMessage.messageId, "MessageId is different than expected");
        return msg.complete().then(() => {
          receivedMsgs.push(msg);
        });
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");

    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queue: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testComplete(false);
  });

  it("Partitioned Subscription: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testComplete(false);
  });

  it("UnPartitioned Queue: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testComplete(false);
  });

  it("UnPartitioned Subscription: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testComplete(false);
  });

  it("Partitioned Queue with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testComplete(true);
  });

  it("Partitioned Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testComplete(true);
  });

  it("UnPartitioned Queue with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testComplete(true);
  });

  it("UnPartitioned Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testComplete(true);
  });
});

describe("Sessions Streaming - Abandon message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandon(autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);
    let abandonFlag = 0;
    sessionReceiver.registerMessageHandler(
      (msg: ServiceBusMessage) => {
        return msg.abandon().then(() => {
          abandonFlag = 1;
          if (sessionReceiver.isReceivingMessages()) {
            return sessionReceiver.close();
          }
          return Promise.resolve();
        });
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    const msgAbandonCheck = await checkWithTimeout(() => abandonFlag === 1);
    should.equal(msgAbandonCheck, true, "Abandoning the message results in a failure");

    if (sessionReceiver.isReceivingMessages()) {
      await sessionReceiver.close();
    }

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    sessionReceiver = <SessionReceiver>receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: TestMessage.sessionId
    });
    const receivedMsgs = await sessionReceiver.receiveMessages(1);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      receivedMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(receivedMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");
    await receivedMsgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queue: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testAbandon(false);
  });

  it("Partitioned Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testAbandon(false);
  });

  it("UnPartitioned Queue: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testAbandon(false);
  });

  it("UnPartitioned Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testAbandon(false);
  });

  it("Partitioned Queue with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testAbandon(true);
  });

  it("Partitioned Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testAbandon(true);
  });

  it("UnPartitioned Queue with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testAbandon(true);
  });

  it("UnPartitioned Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testAbandon(true);
  });
});

describe("Sessions Streaming - Defer message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDefer(autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    let sequenceNum: any = 0;
    sessionReceiver.registerMessageHandler(
      (msg: ServiceBusMessage) => {
        return msg.defer().then(() => {
          sequenceNum = msg.sequenceNumber;
        });
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    const sequenceNumCheck = await checkWithTimeout(() => sequenceNum !== 0);
    should.equal(
      sequenceNumCheck,
      true,
      "Either the message is not received or observed an unexpected SequenceNumber."
    );

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    const deferredMsg = await sessionReceiver.receiveDeferredMessage(sequenceNum);
    if (!deferredMsg) {
      throw "No message received for sequence number";
    }

    should.equal(deferredMsg.body, testMessage.body, "MessageBody is different than expected");
    should.equal(
      deferredMsg.messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(deferredMsg.deliveryCount, 1, "DeliveryCount is different than expected");

    await deferredMsg.complete();
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queue: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testDefer(false);
  });

  it("Partitioned Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testDefer(false);
  });

  it("UnPartitioned Queue: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testDefer(false);
  });

  it("UnPartitioned Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testDefer(false);
  });

  it("Partitioned Queue with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testDefer(true);
  });

  it("Partitioned Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testDefer(true);
  });

  it("UnPartitioned Queue with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testDefer(true);
  });

  it("UnPartitioned Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testDefer(true);
  });
});

describe("Sessions Streaming - Deadletter message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDeadletter(autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    let msgCount = 0;
    sessionReceiver.registerMessageHandler(
      (msg: ServiceBusMessage) => {
        return msg.deadLetter().then(() => {
          msgCount++;
        });
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    const msgsCheck = await checkWithTimeout(() => msgCount === 1);
    should.equal(msgsCheck, true, `Expected 1, received ${msgCount} messages`);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(msgCount, 1, "Unexpected number of messages");
    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterReceiver = deadLetterClient.createReceiver(ReceiveMode.peekLock);
    const deadLetterMsgs = await deadLetterReceiver.receiveMessages(1);
    should.equal(Array.isArray(deadLetterMsgs), true, "`ReceivedMessages` is not an array");
    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgs[0].complete();
    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testDeadletter(false);
  });

  it("Partitioned Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testDeadletter(false);
  });

  it("UnPartitioned Queue: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testDeadletter(false);
  });

  it("UnPartitioned Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testDeadletter(false);
  });

  it("Partitioned Queue with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testDeadletter(true);
  });

  it("Partitioned Subscription with autoComplete: deadLetter() moves message to deadletter(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testDeadletter(true);
  });

  it("UnPartitioned Queue with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testDeadletter(true);
  });

  it("UnPartitioned Subscription with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testDeadletter(true);
  });
});

describe("Sessions Streaming - Multiple Receive Operations", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleReceiveCalls(): Promise<void> {
    let errorMessage;
    const expectedErrorMessage = `The receiver for session "${TestMessage.sessionId}" in "${
      receiverClient.entityPath
    }" is already receiving messages.`;
    sessionReceiver.registerMessageHandler((msg: ServiceBusMessage) => {
      return msg.complete();
    }, unExpectedErrorHandler);
    await delay(5000);
    try {
      sessionReceiver.registerMessageHandler((msg: ServiceBusMessage) => {
        return Promise.resolve();
      }, unExpectedErrorHandler);
    } catch (err) {
      errorMessage = err && err.message;
    }
    should.equal(
      errorMessage,
      expectedErrorMessage,
      "Unexpected error message for registerMessageHandler"
    );
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    errorMessage = "";
    try {
      await sessionReceiver.receiveMessages(1);
    } catch (err) {
      errorMessage = err && err.message;
    }
    should.equal(
      errorMessage,
      expectedErrorMessage,
      "Unexpected error message for receiveMessages"
    );
  }

  it("Partitioned Queue: Second receive operation should fail if the first streaming receiver is not stopped(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("Partitioned Subscription: Second receive operation should fail if the first streaming receiver is not stopped(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("UnPartitioned Queue: Second receive operation should fail if the first streaming receiver is not stopped(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("UnPartitioned Subscription: Second receive operation should fail if the first streaming receiver is not stopped(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testMultipleReceiveCalls();
  });
});

describe("Sessions Streaming - Settle an already Settled message throws error", () => {
  afterEach(async () => {
    await afterEachTest();
  });

  const testError = (err: Error) => {
    should.equal(
      err.message,
      "This message has been already settled.",
      "ErrorMessage is different than expected"
    );
    errorWasThrown = true;
  };

  async function testSettlement(operation: DispositionType): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.registerMessageHandler((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);

    const msgsCheck = await checkWithTimeout(
      () => receivedMsgs.length === 1 && receivedMsgs[0].delivery.remote_settled === true
    );
    should.equal(
      msgsCheck,
      true,
      receivedMsgs.length !== 1
        ? `Expected 1, received ${receivedMsgs.length} messages`
        : "Message didnt get auto-completed in time"
    );
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(
      receivedMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );

    await testPeekMsgsLength(receiverClient, 0);

    if (operation === DispositionType.complete) {
      await receivedMsgs[0].complete().catch((err) => testError(err));
    } else if (operation === DispositionType.abandon) {
      await receivedMsgs[0].abandon().catch((err) => testError(err));
    } else if (operation === DispositionType.deadletter) {
      await receivedMsgs[0].deadLetter().catch((err) => testError(err));
    } else if (operation === DispositionType.defer) {
      await receivedMsgs[0].defer().catch((err) => testError(err));
    }

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  }

  it("Partitioned Queue: complete() throws error(with sessions)", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.complete);
  });

  it("Partitioned Subscription: complete() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Queue: complete() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Subscription: complete() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.complete);
  });

  it("Partitioned Queue: abandon() throws error(with sessions)", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.abandon);
  });

  it("Partitioned Subscription: abandon() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Queue: abandon() throws error(with sessions)", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Subscription: abandon() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.abandon);
  });

  it("Partitioned Queue: defer() throws error(with sessions)", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.defer);
  });

  it("Partitioned Subscription: defer() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Queue: defer() throws error(with sessions)", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Subscription: defer() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.defer);
  });

  it("Partitioned Queue: deadLetter() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.deadletter);
  });

  it("Partitioned Subscription: deadLetter() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.deadletter);
  });

  it("UnPartitioned Queue: deadLetter() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.deadletter);
  });

  it("UnPartitioned Subscription: deadLetter() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.deadletter);
  });
});

describe("Sessions Streaming - User Error", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testUserError(): Promise<void> {
    const testMessage = TestMessage.getSessionSample();
    await sender.send(testMessage);
    const errorMessage = "Will we see this error message?";

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.registerMessageHandler(async (msg: ServiceBusMessage) => {
      await msg.complete().then(() => {
        receivedMsgs.push(msg);
      });
      throw new Error(errorMessage);
    }, unExpectedErrorHandler);

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);

    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages.`);
    await sessionReceiver.close();

    should.equal(
      unexpectedError && unexpectedError.message,
      errorMessage,
      "User error did not surface."
    );
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
  }

  it("Partitioned Queue: onError handler is called for user error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testUserError();
  });

  it("Partitioned Subscription: onError handler is called for user error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testUserError();
  });

  it("UnPartitioned Queue: onError handler is called for user error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testUserError();
  });

  it("UnPartitioned Subscription: onError handler is called for user error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testUserError();
  });
});

describe("Sessions Streaming - maxConcurrentCalls", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testConcurrency(maxConcurrentCalls?: number): Promise<void> {
    if (
      typeof maxConcurrentCalls === "number" &&
      (maxConcurrentCalls < 1 || maxConcurrentCalls > 2)
    ) {
      chai.assert.fail(
        "Sorry, the tests here only support cases when maxConcurrentCalls is set to 1 or 2"
      );
    }

    const testMessages = [TestMessage.getSessionSample(), TestMessage.getSessionSample()];
    await sender.sendBatch(testMessages);

    const settledMsgs: ServiceBusMessage[] = [];
    const receivedMsgs: ServiceBusMessage[] = [];

    sessionReceiver.registerMessageHandler(
      async (msg: ServiceBusMessage) => {
        if (receivedMsgs.length === 1) {
          if ((!maxConcurrentCalls || maxConcurrentCalls === 1) && settledMsgs.length === 0) {
            throw new Error(
              "onMessage for the second message should not have been called before the first message got settled"
            );
          }
        } else {
          if (maxConcurrentCalls === 2 && settledMsgs.length !== 0) {
            throw new Error(
              "onMessage for the second message should have been called before the first message got settled"
            );
          }
        }

        receivedMsgs.push(msg);
        await delay(2000);
        await msg.complete().then(() => {
          settledMsgs.push(msg);
        });
      },
      unExpectedErrorHandler,
      maxConcurrentCalls ? { maxConcurrentCalls } : {}
    );

    await checkWithTimeout(() => settledMsgs.length === 2);
    await sessionReceiver.close();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(settledMsgs.length, 2, `Expected 2, received ${settledMsgs.length} messages.`);
  }

  it("Partitioned Queue: no maxConcurrentCalls passed(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Partitioned Queue: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Partitioned Queue: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Unpartitioned Queue: no maxConcurrentCalls passed(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Unpartitioned Queue: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Unpartitioned Queue: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Partitioned Subscription: no maxConcurrentCalls passed(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testConcurrency();
  });

  it("Partitioned Queue: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testConcurrency(1);
  });

  it("Partitioned Queue: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testConcurrency(2);
  });

  it("Unpartitioned Subscription: no maxConcurrentCalls passed(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testConcurrency();
  });

  it("Unpartitioned Queue: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testConcurrency(1);
  });

  it("Unpartitioned Queue: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testConcurrency(2);
  });
});

describe("Sessions Streaming - Not receive messages after receiver is closed", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testReceiveMessages(): Promise<void> {
    const totalNumOfMessages = 5;
    let num = 1;
    const messages = [];
    while (num <= totalNumOfMessages) {
      const message = {
        messageId: num,
        body: "test",
        label: `${num}`,
        sessionId: TestMessage.sessionId,
        partitionKey: "dummy" // Ensures all messages go to same parition to make peek work reliably
      };
      num++;
      messages.push(message);
    }
    await sender.sendBatch(messages);

    const receivedMsgs: ServiceBusMessage[] = [];

    const onMessageHandler = async (brokeredMessage: ServiceBusMessage) => {
      receivedMsgs.push(brokeredMessage);
      await brokeredMessage.complete();
    };

    sessionReceiver.registerMessageHandler(onMessageHandler, unExpectedErrorHandler, {
      autoComplete: false
    });
    await sessionReceiver.close();

    await delay(5000);
    should.equal(
      receivedMsgs.length,
      0,
      `Expected 0 messages, but received ${receivedMsgs.length}`
    );
    await testPeekMsgsLength(receiverClient, totalNumOfMessages);
  }

  it("Partitioned Queue: Not receive messages after receiver is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testReceiveMessages();
  });

  it("Partitioned Subscription: Not receive messages after receiver is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testReceiveMessages();
  });

  it("UnPartitioned Queue: Not receive messages after receiver is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testReceiveMessages();
  });

  it("UnPartitioned Subscription: Not receive messages after receiver is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testReceiveMessages();
  });

  it("Partitioned Queue: (Receive And Delete mode) Not receive messages after receiver is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      ReceiveMode.receiveAndDelete
    );
    await testReceiveMessages();
  });

  it("Partitioned Subscription: (Receive And Delete mode) Not receive messages after receiver is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      ReceiveMode.receiveAndDelete
    );
    await testReceiveMessages();
  });

  it("UnPartitioned Queue: (Receive And Delete mode) Not receive messages after receiver is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      ReceiveMode.receiveAndDelete
    );
    await testReceiveMessages();
  });

  it("UnPartitioned Subscription: (Receive And Delete mode) Not receive messages after receiver is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      ReceiveMode.receiveAndDelete
    );
    await testReceiveMessages();
  });
});
