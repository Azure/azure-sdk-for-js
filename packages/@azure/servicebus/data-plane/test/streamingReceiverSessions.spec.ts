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
  ServiceBusMessage,
  TopicClient,
  SubscriptionClient,
  delay
} from "../lib";

import { DispositionType } from "../lib/serviceBusMessage";

import {
  testMessagesWithSessions,
  testSessionId1,
  getSenderReceiverClients,
  ClientType,
  purge
} from "./testUtils";
import { Sender } from "../lib/sender";
import { SessionReceiver } from "../lib/receiver";

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

  const clients = await getSenderReceiverClients(ns, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  sender = senderClient.getSender();

  if (receiverClient instanceof QueueClient) {
    deadLetterClient = ns.createQueueClient(Namespace.getDeadLetterQueuePath(receiverClient.name));
  }

  if (receiverClient instanceof SubscriptionClient) {
    deadLetterClient = ns.createSubscriptionClient(
      Namespace.getDeadLetterTopicPath(senderClient.name, receiverClient.subscriptionName),
      receiverClient.subscriptionName
    );
  }

  await purge(receiverClient, testSessionId1);
  await purge(deadLetterClient);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }

  sessionReceiver = await receiverClient.getSessionReceiver({
    sessionId: testSessionId1
  });

  errorWasThrown = false;
  unexpectedError = undefined;
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("Streaming Receiver - Misc Tests(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAutoComplete(): Promise<void> {
    await sender.send(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(msg.body, testMessagesWithSessions.body);
      should.equal(msg.messageId, testMessagesWithSessions.messageId);
      return Promise.resolve();
    }, unExpectedErrorHandler);

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === 1) {
        break;
      }
    }
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("AutoComplete removes the message from Partitioned Queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testAutoComplete();
  });

  it("AutoComplete removes the message from Partitioned Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testAutoComplete();
  });

  it("AutoComplete removes the message from UnPartitioned Queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testAutoComplete();
  });

  it("AutoComplete removes the message from UnPartitioned Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testAutoComplete();
  });

  async function testManualComplete(): Promise<void> {
    await sender.send(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(msg.body, testMessagesWithSessions.body);
        should.equal(msg.messageId, testMessagesWithSessions.messageId);
        return Promise.resolve();
      },
      unExpectedErrorHandler,
      { autoComplete: false }
    );

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === 1) {
        break;
      }
    }

    await testPeekMsgsLength(receiverClient, 1);

    await receivedMsgs[0].complete();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
  }

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testManualComplete();
  });

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testManualComplete();
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testManualComplete();
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testManualComplete();
  });
});

describe("Streaming Receiver - Complete message(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete(autoComplete: boolean): Promise<void> {
    await sender.send(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(msg.body, testMessagesWithSessions.body);
        should.equal(msg.messageId, testMessagesWithSessions.messageId);
        return msg.complete();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === 1) {
        break;
      }
    }

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

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

describe("Streaming Receiver - Abandon message(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAbandon(autoComplete: boolean): Promise<void> {
    await sender.send(testMessagesWithSessions);

    await sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        return msg.abandon().then(() => {
          if (sessionReceiver.isOpen()) {
            return sessionReceiver.close();
          }
          return Promise.resolve();
        });
      },
      unExpectedErrorHandler,
      { autoComplete }
    );
    await delay(4000);

    if (sessionReceiver.isOpen()) {
      await sessionReceiver.close();
    }

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    sessionReceiver = await receiverClient.getSessionReceiver({
      sessionId: testSessionId1
    });
    const receivedMsgs = await sessionReceiver.receiveBatch(1);
    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].messageId, testMessagesWithSessions.messageId);
    should.equal(receivedMsgs[0].deliveryCount, 1);
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

describe("Streaming Receiver - Defer message(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDefer(autoComplete: boolean): Promise<void> {
    await sender.send(testMessagesWithSessions);

    let sequenceNum: any = 0;
    await sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        sequenceNum = msg.sequenceNumber;
        return msg.defer();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    await delay(4000);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    const deferredMsg = await sessionReceiver.receiveDeferredMessage(sequenceNum);
    if (!deferredMsg) {
      throw "No message received for sequence number";
    }

    should.equal(deferredMsg.body, testMessagesWithSessions.body);
    should.equal(deferredMsg.messageId, testMessagesWithSessions.messageId);
    should.equal(deferredMsg.deliveryCount, 1);

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

describe("Streaming Receiver - Deadletter message(with sessions)", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDeadletter(autoComplete: boolean): Promise<void> {
    await sender.send(testMessagesWithSessions);

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

    const deadLetterMsgs = await deadLetterClient.getReceiver().receiveBatch(1);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].messageId, testMessagesWithSessions.messageId);

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

describe("Streaming Receiver - Multiple Streaming Receivers(with sessions)", function(): void {
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

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Queue(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Subscription(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions
    );
    await testMultipleReceiveCalls();
  });
});

describe("Streaming Receiver - Settle an already Settled message throws error(with sessions)", () => {
  afterEach(async () => {
    await afterEachTest();
  });

  const testError = (err: Error) => {
    should.equal(err.message, "This message has been already settled.");
    errorWasThrown = true;
  };

  async function testSettlement(operation: DispositionType): Promise<void> {
    await sender.send(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);

    await delay(5000);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessagesWithSessions.body);
    should.equal(receivedMsgs[0].messageId, testMessagesWithSessions.messageId);

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
