// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  delay,
  QueueClient,
  ServiceBusClient,
  ServiceBusMessage,
  SubscriptionClient,
  OnMessage,
  TopicClient
} from "../src";
import { SessionReceiver } from "../src/receiver";
import { Sender } from "../src/sender";
import { DispositionType, ReceiveMode } from "../src/serviceBusMessage";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import {
  checkWithTimeout,
  TestClientType,
  getSenderReceiverClients,
  purge,
  TestMessage,
  getServiceBusClient
} from "./utils/testUtils";
import { Receiver as RheaReceiver } from "rhea-promise";

const should = chai.should();
chai.use(chaiAsPromised);

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

let sbClient: ServiceBusClient;

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
  senderType: TestClientType,
  receiverType: TestClientType,
  receiveMode?: ReceiveMode
): Promise<void> {
  sbClient = getServiceBusClient();

  const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  sender = senderClient.createSender();

  if (receiverClient instanceof QueueClient) {
    deadLetterClient = sbClient.createQueueClient(
      QueueClient.getDeadLetterQueuePath(receiverClient.entityPath)
    );
  }

  if (receiverClient instanceof SubscriptionClient) {
    deadLetterClient = sbClient.createSubscriptionClient(
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
  await sbClient.close();
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testAutoComplete();
  });

  it("Partitioned Subscription: AutoComplete removes the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testAutoComplete();
  });

  it("UnPartitioned Queue: AutoComplete removes the message(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testAutoComplete();
  });

  it("UnPartitioned Subscription: AutoComplete removes the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testManualComplete();
  });

  it("Partitioned Subscription: Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testManualComplete();
  });

  it("UnPartitioned Queue: Disabled autoComplete, no manual complete retains the message(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testManualComplete();
  });

  it("UnPartitioned Subscription: Disabled autoComplete, no manual complete retains the message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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
      async (msg: ServiceBusMessage) => {
        should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
        should.equal(msg.messageId, testMessage.messageId, "MessageId is different than expected");
        await msg.complete();
        receivedMsgs.push(msg);
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testComplete(false);
  });

  it("Partitioned Subscription: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testComplete(false);
  });

  it("UnPartitioned Queue: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testComplete(false);
  });

  it("UnPartitioned Subscription: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await testComplete(false);
  });

  it("Partitioned Queue with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testComplete(true);
  });

  it("Partitioned Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testComplete(true);
  });

  it("UnPartitioned Queue with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testComplete(true);
  });

  it("UnPartitioned Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testAbandon(false);
  });

  it("Partitioned Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testAbandon(false);
  });

  it("UnPartitioned Queue: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testAbandon(false);
  });

  it("UnPartitioned Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await testAbandon(false);
  });

  it("Partitioned Queue with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testAbandon(true);
  });

  it("Partitioned Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testAbandon(true);
  });

  it("UnPartitioned Queue with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testAbandon(true);
  });

  it("UnPartitioned Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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
      async (msg: ServiceBusMessage) => {
        await msg.defer();
        sequenceNum = msg.sequenceNumber;
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testDefer(false);
  });

  it("Partitioned Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testDefer(false);
  });

  it("UnPartitioned Queue: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testDefer(false);
  });

  it("UnPartitioned Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await testDefer(false);
  });

  it("Partitioned Queue with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testDefer(true);
  });

  it("Partitioned Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testDefer(true);
  });

  it("UnPartitioned Queue with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testDefer(true);
  });

  it("UnPartitioned Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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
      async (msg: ServiceBusMessage) => {
        await msg.deadLetter();
        msgCount++;
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testDeadletter(false);
  });

  it("Partitioned Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testDeadletter(false);
  });

  it("UnPartitioned Queue: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testDeadletter(false);
  });

  it("UnPartitioned Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await testDeadletter(false);
  });

  it("Partitioned Queue with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testDeadletter(true);
  });

  it("Partitioned Subscription with autoComplete: deadLetter() moves message to deadletter(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testDeadletter(true);
  });

  it("UnPartitioned Queue with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testDeadletter(true);
  });

  it("UnPartitioned Subscription with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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
    const expectedErrorMessage = getAlreadyReceivingErrorMsg(
      receiverClient.entityPath,
      TestMessage.sessionId
    );
    sessionReceiver.registerMessageHandler((msg: ServiceBusMessage) => {
      return msg.complete();
    }, unExpectedErrorHandler);
    await delay(5000);
    try {
      sessionReceiver.registerMessageHandler(() => {
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

  it("UnPartitioned Queue: Second receive operation should fail if the first streaming receiver is not stopped(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testMultipleReceiveCalls();
  });
});

describe("Sessions Streaming - Settle an already Settled message throws error", () => {
  afterEach(async () => {
    await afterEachTest();
  });

  const testError = (err: Error, operation: DispositionType): void => {
    should.equal(
      err.message,
      `Failed to ${operation} the message as this message is already settled.`,
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
      await receivedMsgs[0].complete().catch((err) => testError(err, operation));
    } else if (operation === DispositionType.abandon) {
      await receivedMsgs[0].abandon().catch((err) => testError(err, operation));
    } else if (operation === DispositionType.deadletter) {
      await receivedMsgs[0].deadLetter().catch((err) => testError(err, operation));
    } else if (operation === DispositionType.defer) {
      await receivedMsgs[0].defer().catch((err) => testError(err, operation));
    }

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  }

  it("UnPartitioned Queue: complete() throws error(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Subscription: complete() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Queue: abandon() throws error(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Subscription: abandon() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Queue: defer() throws error(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Subscription: defer() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Queue: deadLetter() throws error(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.deadletter);
  });

  it("UnPartitioned Subscription: deadLetter() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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
      await msg.complete();
      receivedMsgs.push(msg);
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

  it("UnPartitioned Queue: onError handler is called for user error(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
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
        await msg.complete();
        settledMsgs.push(msg);
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
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Partitioned Queue: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Partitioned Queue: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Unpartitioned Queue: no maxConcurrentCalls passed(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Unpartitioned Queue: pass 1 for maxConcurrentCalls(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Unpartitioned Queue: pass 2 for maxConcurrentCalls(with sessions) #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testConcurrency();
  });

  it("Partitioned Subscription: no maxConcurrentCalls passed(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testConcurrency();
  });

  it("Partitioned Queue: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testConcurrency(1);
  });

  it("Partitioned Queue: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
    await testConcurrency(2);
  });

  it("Unpartitioned Subscription: no maxConcurrentCalls passed(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await testConcurrency();
  });

  it("Unpartitioned Subscription: pass 1 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
    await testConcurrency(1);
  });

  it("Unpartitioned Subscription: pass 2 for maxConcurrentCalls(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
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

    const onMessageHandler: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
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

  it("UnPartitioned Queue: Not receive messages after receiver is closed #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await testReceiveMessages();
  });

  it("UnPartitioned Queue: (Receive And Delete mode) Not receive messages after receiver is closed #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions,
      ReceiveMode.receiveAndDelete
    );
    await testReceiveMessages();
  });
});

describe("Sessions streaming - close() respects an in progress init()", () => {
  afterEach(() => {
    return afterEachTest();
  });

  it("close() while init() is happening", async () => {
    sbClient = getServiceBusClient();

    const { receiverClient, senderClient } = await getSenderReceiverClients(
      sbClient,
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue
    );

    // force the link open - doesn't affect our tests below but it does
    // let me mock out the proper method that I need to prove things are working
    await senderClient.createSender().send({
      body: "hello",
      sessionId: TestMessage.sessionId
    });

    const receiver = receiverClient.createReceiver(ReceiveMode.receiveAndDelete, {
      sessionId: TestMessage.sessionId
    });

    const origReceiverFn = sbClient["_context"].connection["createReceiver"];

    let closePromise: Promise<void> | undefined;
    let createdReceiver: RheaReceiver | undefined;

    sbClient["_context"].connection["createReceiver"] = async (options) => {
      // the call stack at this point is basically this:
      // init()
      //    lock acquired
      //       createReceiver()
      //          -- us --
      //
      // So we're inside of the "locked" area. close() will be blocked since it will
      // attempt to acquire the same lock.
      closePromise = receiver.close();

      const result = await Promise.race([
        closePromise,
        delay(2000, "delay_should_win_because_close_is_blocked")
      ]);

      if (result !== "delay_should_win_because_close_is_blocked") {
        throw new Error(
          "FATAL ERROR - test is incorrect because close() was supposed to be blocked but somehow completed"
        );
      }

      createdReceiver = await origReceiverFn.apply(sbClient["_context"].connection, [options]);
      return createdReceiver;
    };

    // the sessionreceiver uses the same internal (for initialization) as `receiveMessages`
    // does so I'm just using that for this test since it doesn't require us to coordinate connection
    // start, etc...
    await receiver.receiveMessages(1).catch(() => {});

    // now the close should complete.
    await closePromise;

    // now that we've properly serialized the two calls the receiver that we created will get properly closed.
    createdReceiver!.isClosed().should.be.true;
  });
});
