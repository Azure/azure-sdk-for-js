// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  Namespace,
  QueueClient,
  SessionReceiver,
  ServiceBusMessage,
  TopicClient,
  SubscriptionClient,
  delay
} from "../lib";

import { DispositionType } from "../lib/serviceBusMessage";

import {
  testMessagesWithSessions,
  testSessionId,
  getSenderClient,
  getReceiverClient,
  ClientType,
  purge
} from "./testUtils";
import { Sender } from "../lib/sender";

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

let ns: Namespace;

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

async function beforeEachTest(senderType: ClientType, receiverType: ClientType): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  senderClient = getSenderClient(ns, senderType);
  sender = senderClient.getSender();

  receiverClient = getReceiverClient(ns, receiverType);

  if (receiverClient instanceof QueueClient) {
    deadLetterClient = ns.createQueueClient(
      Namespace.getDeadLetterQueuePathForQueue(receiverClient.name)
    );
  }

  if (receiverClient instanceof SubscriptionClient) {
    deadLetterClient = ns.createSubscriptionClient(
      Namespace.getDeadLetterSubcriptionPathForSubcription(
        senderClient.name,
        receiverClient.subscriptionName
      ),
      receiverClient.subscriptionName
    );
  }

  await purge(receiverClient, true, testSessionId);
  await purge(deadLetterClient);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }

  sessionReceiver = await receiverClient.getSessionReceiver({
    sessionId: testSessionId
  });

  errorWasThrown = false;
  unexpectedError = undefined;
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("Streaming Receiver Misc Tests(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAutoComplete(): Promise<void> {
    await sender.sendBatch(testMessagesWithSessions);
    await testPeekMsgsLength(receiverClient, testMessagesWithSessions.length);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(
        testMessagesWithSessions.some((x) => msg.body === x.body && msg.messageId === x.messageId),
        true,
        "Received Message doesn't match any of the test messages"
      );
      return Promise.resolve();
    }, unExpectedErrorHandler);

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === testMessagesWithSessions.length) {
        break;
      }
    }
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("AutoComplete removes the message from Partitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testAutoComplete();
  });

  it("AutoComplete removes the message from Partitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testAutoComplete();
  });

  it("AutoComplete removes the message from UnPartitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testAutoComplete();
  });

  it("AutoComplete removes the message from UnPartitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testAutoComplete();
  });

  async function testManualComplete(): Promise<void> {
    await sender.sendBatch(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(
          testMessagesWithSessions.some(
            (x) => msg.body === x.body && msg.messageId === x.messageId
          ),
          true,
          "Received Message doesnt match any of the test messages"
        );
        return Promise.resolve();
      },
      unExpectedErrorHandler,
      { autoComplete: false }
    );

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === testMessagesWithSessions.length) {
        break;
      }
    }

    await testPeekMsgsLength(receiverClient, 2);

    await receivedMsgs[0].complete();
    await receivedMsgs[1].complete();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
  }

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testManualComplete();
  });

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testManualComplete();
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testManualComplete();
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testManualComplete();
  });
});

describe("Complete message(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete(autoComplete: boolean): Promise<void> {
    await sender.sendBatch(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(
          testMessagesWithSessions.some(
            (x) => msg.body === x.body && msg.messageId === x.messageId
          ),
          true,
          "Received Message doesnt match any of the test messages"
        );
        return msg.complete();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === testMessagesWithSessions.length) {
        break;
      }
    }

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queues: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testComplete(false);
  });

  it("Partitioned Topics and Subscription: complete() removes message(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testComplete(false);
  });

  it("Partitioned Queues with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testComplete(true);
  });

  it("Partitioned Topics and Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription with autoComplete: complete() removes message(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testComplete(true);
  });
});

describe("Abandon message(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandon(autoComplete: boolean): Promise<void> {
    await sender.send(testMessagesWithSessions[0]);
    await sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        return msg.abandon().then(() => {
          return sessionReceiver.close();
        });
      },
      unExpectedErrorHandler,
      { maxAutoRenewDurationInSeconds: 0, autoComplete }
    );
    await delay(4000);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    sessionReceiver = await receiverClient.getSessionReceiver({
      sessionId: testSessionId
    });
    const receivedMsgs = await sessionReceiver.receiveBatch(1);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].messageId, testMessagesWithSessions[0].messageId);
    should.equal(receivedMsgs[0].deliveryCount, 1);
    await receivedMsgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queues: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testAbandon(false);
  });

  it("Partitioned Topics and Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testAbandon(false);
  });

  it("Partitioned Queues with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testAbandon(true);
  });

  it("Partitioned Topics and Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription with autoComplete: abandon() retains message with incremented deliveryCount(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testAbandon(true);
  });
});

describe("Defer message(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDefer(autoComplete: boolean): Promise<void> {
    await sender.sendBatch(testMessagesWithSessions);

    let seq0: any = 0;
    let seq1: any = 0;
    await sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        if (msg.messageId === testMessagesWithSessions[0].messageId) {
          seq0 = msg.sequenceNumber;
        } else if (msg.messageId === testMessagesWithSessions[1].messageId) {
          seq1 = msg.sequenceNumber;
        }
        return msg.defer();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    await delay(4000);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    const deferredMsg0 = await sessionReceiver.receiveDeferredMessage(seq0);
    const deferredMsg1 = await sessionReceiver.receiveDeferredMessage(seq1);
    if (!deferredMsg0) {
      throw "No message received for sequence number";
    }
    if (!deferredMsg1) {
      throw "No message received for sequence number";
    }
    should.equal(deferredMsg0.body, testMessagesWithSessions[0].body);
    should.equal(deferredMsg0.messageId, testMessagesWithSessions[0].messageId);
    should.equal(deferredMsg0.deliveryCount, 1);

    should.equal(deferredMsg1.body, testMessagesWithSessions[1].body);
    should.equal(deferredMsg1.messageId, testMessagesWithSessions[1].messageId);
    should.equal(deferredMsg1.deliveryCount, 1);

    await deferredMsg0.complete();
    await deferredMsg1.complete();

    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queues: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testDefer(false);
  });

  it("Partitioned Topics and Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testDefer(false);
  });

  it("Partitioned Queues with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testDefer(true);
  });

  it("Partitioned Topics and Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription with autoComplete: defer() moves message to deferred queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testDefer(true);
  });
});

describe("Deadletter message(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDeadletter(autoComplete: boolean): Promise<void> {
    await sender.sendBatch(testMessagesWithSessions);
    await testPeekMsgsLength(receiverClient, 2);
    await sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        return msg.deadLetter();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    await delay(4000);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadLetterClient.getReceiver().receiveBatch(2);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, testMessagesWithSessions.length);
    should.equal(
      testMessagesWithSessions.some((x) => deadLetterMsgs[0].messageId === x.messageId),
      true
    );
    should.equal(
      testMessagesWithSessions.some((x) => deadLetterMsgs[1].messageId === x.messageId),
      true
    );

    await deadLetterMsgs[0].complete();
    await deadLetterMsgs[1].complete();

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

  it("Partitioned Topics and Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
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

  it("Partitioned Topics and Subscription with autoComplete: deadLetter() moves message to deadletter(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription with autoComplete: deadLetter() moves message to deadletter queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testDeadletter(true);
  });
});

describe("Multiple Streaming Receivers(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleReceiveCalls(): Promise<void> {
    await sessionReceiver.receive((msg: ServiceBusMessage) => {
      return msg.complete();
    }, unExpectedErrorHandler);
    await delay(5000);
    try {
      await sessionReceiver.receive(
        (msg: ServiceBusMessage) => {
          return Promise.resolve();
        },
        (err: Error) => {
          should.exist(err);
        }
      );
    } catch (err) {
      errorWasThrown = true;
      should.equal(!err.message.search("has already been created for the Subscription"), false);
    }
    should.equal(errorWasThrown, true);
  }

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Queues(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Topics and Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testMultipleReceiveCalls();
  });
});

describe("Settle an already Settled message throws error(with sessions)", () => {
  afterEach(async () => {
    await afterEachTest();
  });

  const testError = (err: Error) => {
    should.equal(err.message, "This message has been already settled.");
    errorWasThrown = true;
  };

  async function testSettlement(operation: DispositionType): Promise<void> {
    await sender.send(testMessagesWithSessions[0]);
    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);

    await delay(5000);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessagesWithSessions[0].body);
    should.equal(receivedMsgs[0].messageId, testMessagesWithSessions[0].messageId);

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

    should.equal(errorWasThrown, true);
  }

  it("Partitioned Queues: complete() throws error(with sessions)", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.complete);
  });

  it("Partitioned Topics and Subscription: complete() throws error(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription: complete() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.complete);
  });

  it("Partitioned Queues: abandon() throws error(with sessions)", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.abandon);
  });

  it("Partitioned Topics and Subscription: abandon() throws error(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription: abandon() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.abandon);
  });

  it("Partitioned Queues: defer() throws error(with sessions)", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.defer);
  });

  it("Partitioned Topics and Subscription: defer() throws error(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription: defer() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.defer);
  });

  it("Partitioned Queues: deadLetter() throws error(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testSettlement(DispositionType.deadletter);
  });

  it("Partitioned Topics and Subscription: deadLetter()(with sessions)", async function(): Promise<
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

  it("UnPartitioned Topics and Subscription: deadLetter()(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testSettlement(DispositionType.deadletter);
  });
});
