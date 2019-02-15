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
  purge,
  checkWithTimeout
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

describe("Sessions Streaming - Misc Tests", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAutoComplete(): Promise<void> {
    await sender.send(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(
        msg.body,
        testMessagesWithSessions.body,
        "MessageBody is different than expected"
      );
      should.equal(
        msg.messageId,
        testMessagesWithSessions.messageId,
        "MessageId is different than expected"
      );
      return Promise.resolve();
    }, unExpectedErrorHandler);

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, "Could not receive the messages in expected time.");

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
    await sender.send(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(
          msg.body,
          testMessagesWithSessions.body,
          "MessageBody is different than expected"
        );
        should.equal(
          msg.messageId,
          testMessagesWithSessions.messageId,
          "MessageId is different than expected"
        );
        return Promise.resolve();
      },
      unExpectedErrorHandler,
      { autoComplete: false }
    );

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, "Could not receive the messages in expected time.");

    await testPeekMsgsLength(receiverClient, 1);

    await receivedMsgs[0].complete();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
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
    await sender.send(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(
          msg.body,
          testMessagesWithSessions.body,
          "MessageBody is different than expected"
        );
        should.equal(
          msg.messageId,
          testMessagesWithSessions.messageId,
          "MessageId is different than expected"
        );
        return msg.complete();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, "Could not receive the messages in expected time.");

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
    await sender.send(testMessagesWithSessions);
    let abandonFlag = 0;
    await sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        return msg.abandon().then(() => {
          abandonFlag = 1;
          if (sessionReceiver.isOpen()) {
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

    if (sessionReceiver.isOpen()) {
      await sessionReceiver.close();
    }

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    sessionReceiver = await receiverClient.getSessionReceiver({
      sessionId: testSessionId1
    });
    const receivedMsgs = await sessionReceiver.receiveBatch(1);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      receivedMsgs[0].messageId,
      testMessagesWithSessions.messageId,
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

    should.equal(
      deferredMsg.body,
      testMessagesWithSessions.body,
      "MessageBody is different than expected"
    );
    should.equal(
      deferredMsg.messageId,
      testMessagesWithSessions.messageId,
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
    await sender.send(testMessagesWithSessions);

    let msgCount = 0;
    await sessionReceiver.receive(
      (msg: ServiceBusMessage) => {
        msgCount++;
        return msg.deadLetter();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    const msgsCheck = await checkWithTimeout(() => msgCount === 1);
    should.equal(msgsCheck, true, "Could not receive the messages in expected time.");

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(msgCount, 1, "Unexpected number of messages");
    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadLetterClient.getReceiver().receiveBatch(1);
    should.equal(Array.isArray(deadLetterMsgs), true, "`ReceivedMessages` is not an array");
    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessagesWithSessions.messageId,
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

describe("Sessions Streaming - Multiple Streaming Receivers", function(): void {
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
      should.equal(
        !err.message.search("has already been created for the Subscription"),
        false,
        "ErrorMessage is different than expected"
      );
    }
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  }

  it("Partitioned Queue: Second Streaming Receiver call should fail if the first one is not stopped(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("Partitioned Subscription: Second Streaming Receiver call should fail if the first one is not stopped(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("UnPartitioned Queue: Second Streaming Receiver call should fail if the first one is not stopped(with sessions)", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions
    );
    await testMultipleReceiveCalls();
  });

  it("UnPartitioned Subscription: Second Streaming Receiver call should fail if the first one is not stopped(with sessions)", async function(): Promise<
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
    await sender.send(testMessagesWithSessions);

    const receivedMsgs: ServiceBusMessage[] = [];
    sessionReceiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, "Could not receive the messages in expected time.");
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      receivedMsgs[0].body,
      testMessagesWithSessions.body,
      "MessageBody is different than expected"
    );
    should.equal(
      receivedMsgs[0].messageId,
      testMessagesWithSessions.messageId,
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
