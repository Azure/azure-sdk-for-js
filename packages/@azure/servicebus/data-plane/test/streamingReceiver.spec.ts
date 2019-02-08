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
  testSimpleMessages,
  getSenderClient,
  getReceiverClient,
  ClientType,
  purge
} from "./testUtils";
import { Receiver } from "../lib/receiver";
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
let sender: Sender;
let receiver: Receiver;
let deadLetterClient: QueueClient | SubscriptionClient;
let errorWasThrown: boolean;
let unexpectedError: Error | undefined;
const maxDeliveryCount = 10;

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
  receiverClient = getReceiverClient(ns, receiverType);

  if (receiverClient instanceof QueueClient) {
    deadLetterClient = ns.createQueueClient(Namespace.getDeadLetterQueuePath(receiverClient.name));
  }

  if (receiverClient instanceof SubscriptionClient) {
    deadLetterClient = ns.createSubscriptionClient(
      Namespace.getDeadLetterTopicPath(senderClient.name, receiverClient.subscriptionName),
      receiverClient.subscriptionName
    );
  }

  await purge(receiverClient);
  await purge(deadLetterClient);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
  const peekedDeadMsgs = await deadLetterClient.peek();
  if (peekedDeadMsgs.length) {
    chai.assert.fail(
      `Please use an empty dead letter ${receiverEntityType} for integration testing`
    );
  }

  sender = senderClient.getSender();
  receiver = receiverClient.getReceiver();

  errorWasThrown = false;
  unexpectedError = undefined;
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("Streaming Receiver - Misc Tests", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAutoComplete(): Promise<void> {
    await sender.send(testSimpleMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      should.equal(msg.body, testSimpleMessages.body);
      should.equal(msg.messageId, testSimpleMessages.messageId);

      return Promise.resolve();
    }, unExpectedErrorHandler);

    for (let i = 0; i < 5; i++) {
      await delay(1000);
      if (receivedMsgs.length === 1) {
        break;
      }
    }

    await receiver.close();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("AutoComplete removes the message from Partitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testAutoComplete();
  });

  it("AutoComplete removes the message from Partitioned Subscription", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testAutoComplete();
  });

  it("AutoComplete removes the message from UnPartitioned Queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testAutoComplete();
  });

  it("AutoComplete removes the message from UnPartitioned Subscription", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testAutoComplete();
  });

  async function testManualComplete(): Promise<void> {
    await sender.send(testSimpleMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(msg.body, testSimpleMessages.body);
        should.equal(msg.messageId, testSimpleMessages.messageId);
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
    await receiver.close();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
  }

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testManualComplete();
  });

  it("Disabled autoComplete, no manual complete retains the message in Partitioned Subscription", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testManualComplete();
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testManualComplete();
  });

  it("Disabled autoComplete, no manual complete retains the message in UnPartitioned Subscription", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testManualComplete();
  });
});

describe("Streaming Receiver - Complete message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete(autoComplete: boolean): Promise<void> {
    await sender.send(testSimpleMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        should.equal(msg.body, testSimpleMessages.body);
        should.equal(msg.messageId, testSimpleMessages.messageId);
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

    await receiver.close();
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queue: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testComplete(false);
  });

  it("Partitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testComplete(false);
  });

  it("UnPartitioned Queue: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testComplete(false);
  });

  it("UnPartitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testComplete(false);
  });

  it("Partitioned Queue with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testComplete(true);
  });

  it("Partitioned Subscription with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testComplete(true);
  });

  it("UnPartitioned Queue with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testComplete(true);
  });

  it("UnPartitioned Subscription with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testComplete(true);
  });
});

describe("Streaming Receiver - Abandon message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleAbandons(): Promise<void> {
    await sender.send(testSimpleMessages);

    let checkDeliveryCount = 0;

    receiver.receive(
      (msg: ServiceBusMessage) => {
        should.equal(msg.deliveryCount, checkDeliveryCount);
        checkDeliveryCount++;
        return msg.abandon();
      },
      unExpectedErrorHandler,
      { autoComplete: false }
    );

    await delay(6000);

    await receiver.close();
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    should.equal(checkDeliveryCount, maxDeliveryCount);

    await testPeekMsgsLength(receiverClient, 0); // No messages in the queue

    const deadLetterMsgs = await deadLetterClient.getReceiver().receiveBatch(1);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].deliveryCount, maxDeliveryCount);
    should.equal(deadLetterMsgs[0].messageId, testSimpleMessages.messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testMultipleAbandons();
  });

  it("Partitioned Subscription: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testMultipleAbandons();
  });

  it("Unpartitioned Queue: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testMultipleAbandons();
  });

  it("Unpartitioned Subscription: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testMultipleAbandons();
  });
});

describe("Streaming Receiver - Defer message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDefer(autoComplete: boolean): Promise<void> {
    await sender.send(testSimpleMessages);
    let sequenceNum: any = 0;
    receiver.receive(
      (msg: ServiceBusMessage) => {
        sequenceNum = msg.sequenceNumber;
        return msg.defer();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );
    await delay(4000);
    await receiver.close();
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    receiver = receiverClient.getReceiver();
    const deferredMsgs = await receiver.receiveDeferredMessages([sequenceNum]);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }

    should.equal(deferredMsgs[0].body, testSimpleMessages.body);
    should.equal(deferredMsgs[0].messageId, testSimpleMessages.messageId);
    should.equal(deferredMsgs[0].deliveryCount, 1);

    await deferredMsgs[0].complete();
    await delay(10000);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: defer() moves message to deferred queue", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDefer(false);
  });

  it("Partitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDefer(false);
  });

  it("UnPartitioned Queue: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDefer(false);
  });

  it("UnPartitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDefer(false);
  });

  it("Partitioned Queue with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDefer(true);
  });

  it("Partitioned Subscription with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDefer(true);
  });

  it("UnPartitioned Queue with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDefer(true);
  });

  it("UnPartitioned Subscription with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDefer(true);
  });
});

describe("Streaming Receiver - Deadletter message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDeadletter(autoComplete: boolean): Promise<void> {
    await sender.send(testSimpleMessages);

    receiver.receive(
      (msg: ServiceBusMessage) => {
        return msg.deadLetter();
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    await delay(4000);
    await receiver.close();
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgs = await deadLetterClient.getReceiver().receiveBatch(1);
    should.equal(Array.isArray(deadLetterMsgs), true);
    should.equal(deadLetterMsgs.length, 1);
    should.equal(deadLetterMsgs[0].messageId, testSimpleMessages.messageId);

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDeadletter(false);
  });

  it("Partitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDeadletter(false);
  });

  it("UnPartitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDeadletter(false);
  });

  it("UnPartitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDeadletter(false);
  });

  it("Partitioned Queue with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testDeadletter(true);
  });

  it("Partitioned Subscription with autoComplete: deadLetter() moves message to deadletter", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testDeadletter(true);
  });

  it("UnPartitioned Queue with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testDeadletter(true);
  });

  it("UnPartitioned Subscription with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testDeadletter(true);
  });
});

describe("Streaming Receiver - Multiple Streaming Receivers", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleReceiveCalls(
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    receiver.receive((msg: ServiceBusMessage) => {
      return msg.complete();
    }, unExpectedErrorHandler);
    await delay(1000);
    try {
      receiver.receive(
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

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testMultipleReceiveCalls(receiverClient);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for Partitioned Subscription", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testMultipleReceiveCalls(receiverClient);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Queue", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testMultipleReceiveCalls(receiverClient);
  });

  it("Second Streaming Receiver call should fail if the first one is not stopped for UnPartitioned Subscription", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testMultipleReceiveCalls(receiverClient);
  });
});

describe("Streaming Receiver - Settle an already Settled message throws error", () => {
  afterEach(async () => {
    await afterEachTest();
  });

  const testError = (err: Error) => {
    should.equal(err.message, "This message has been already settled.");
    errorWasThrown = true;
  };

  async function testSettlement(operation: DispositionType): Promise<void> {
    await sender.send(testSimpleMessages);
    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.receive((msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    }, unExpectedErrorHandler);

    await delay(5000);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testSimpleMessages.body);
    should.equal(receivedMsgs[0].messageId, testSimpleMessages.messageId);

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

  it("Partitioned Queue: complete() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSettlement(DispositionType.complete);
  });

  it("Partitioned Subscription: complete() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Queue: complete() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Subscription: complete() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.complete);
  });

  it("Partitioned Queue: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSettlement(DispositionType.abandon);
  });

  it("Partitioned Subscription: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Queue: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Subscription: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.abandon);
  });

  it("Partitioned Queue: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSettlement(DispositionType.defer);
  });

  it("Partitioned Subscription: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Queue: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Subscription: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.defer);
  });

  it("Partitioned Queue: deadLetter() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSettlement(DispositionType.deadletter);
  });

  it("Partitioned Subscription: deadLetter() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSettlement(DispositionType.deadletter);
  });

  it("UnPartitioned Queue: deadLetter() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.deadletter);
  });

  it("UnPartitioned Subscription: deadLetter() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.deadletter);
  });
});
