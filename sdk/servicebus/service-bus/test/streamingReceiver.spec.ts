// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  delay,
  QueueClient,
  ReceiveMode,
  ServiceBusClient,
  ServiceBusMessage,
  SubscriptionClient,
  TopicClient,
  OnMessage
} from "../src";
import { Receiver } from "../src/receiver";
import { Sender } from "../src/sender";
import { DispositionType } from "../src/serviceBusMessage";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import {
  checkWithTimeout,
  TestClientType,
  getSenderReceiverClients,
  purge,
  TestMessage,
  getServiceBusClient
} from "./utils/testUtils";
import { SasTokenProvider, TokenInfo, parseConnectionString, translate } from "@azure/amqp-common";
import { getEnvVars, EnvVarNames } from "./utils/envVarUtils";
import { StreamingReceiver } from "../src/core/streamingReceiver";
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

async function beforeEachTest(
  senderType: TestClientType,
  receiverType: TestClientType,
  receiveMode?: ReceiveMode
): Promise<void> {
  sbClient = getServiceBusClient();
  const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

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

  sender = senderClient.createSender();

  if (!receiveMode) {
    receiveMode = ReceiveMode.peekLock;
  }
  receiver = receiverClient.createReceiver(receiveMode);

  errorWasThrown = false;
  unexpectedError = undefined;
}

async function afterEachTest(): Promise<void> {
  await sbClient.close();
}

describe("Streaming - Misc Tests", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAutoComplete(): Promise<void> {
    const testMessage = TestMessage.getSample();
    await sender.send(testMessage);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.registerMessageHandler((msg: ServiceBusMessage) => {
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
    await receiver.close();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: AutoComplete removes the message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testAutoComplete();
  });

  it("Partitioned Subscription: AutoComplete removes the message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testAutoComplete();
  });

  it("UnPartitioned Queue: AutoComplete removes the message #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testAutoComplete();
  });

  it("UnPartitioned Subscription: AutoComplete removes the message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testAutoComplete();
  });

  async function testManualComplete(): Promise<void> {
    const testMessage = TestMessage.getSample();
    await sender.send(testMessage);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.registerMessageHandler(
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
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");

    await receivedMsgs[0].complete();
    await receiver.close();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Disabled autoComplete, no manual complete retains the message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testManualComplete();
  });

  it("Partitioned Subscription: Disabled autoComplete, no manual complete retains the message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testManualComplete();
  });

  it("UnPartitioned Queue: Disabled autoComplete, no manual complete retains the message #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testManualComplete();
  });

  it("UnPartitioned Subscription: Disabled autoComplete, no manual complete retains the message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testManualComplete();
  });

  it("onDetached should forward error messages if it fails to retry", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    let streamingReceiver: StreamingReceiver | undefined;
    try {
      let actualError: Error | undefined;
      streamingReceiver = await StreamingReceiver.create((receiver as any)._context, {
        receiveMode: ReceiveMode.peekLock
      });

      streamingReceiver.receive(
        async () => {},
        (err) => {
          actualError = err;
        }
      );

      // overwrite _init to throw a non-retryable error.
      // this will be called by onDetached
      (streamingReceiver as any)._init = async () => {
        const error = new Error("Expected test error!");
        // prevent retry from translating error.
        (error as any).translated = true;
        throw error;
      };

      // call detached directly
      await streamingReceiver.onDetached();

      should.equal(
        actualError!.message,
        "Expected test error!",
        "Did not see the expected error in user-provided error handler."
      );
    } finally {
      if (streamingReceiver) {
        await streamingReceiver.close();
      }
    }
  });
});

describe("Streaming - Complete message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete(autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSample();
    await sender.send(testMessage);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.registerMessageHandler(
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
    await receiver.close();
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queue: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testComplete(false);
  });

  it("Partitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testComplete(false);
  });

  it("UnPartitioned Queue: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testComplete(false);
  });

  it("UnPartitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testComplete(false);
  });

  it("Partitioned Queue with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testComplete(true);
  });

  it("Partitioned Subscription with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testComplete(true);
  });

  it("UnPartitioned Queue with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testComplete(true);
  });

  it("UnPartitioned Subscription with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testComplete(true);
  });
});

describe("Streaming - Abandon message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleAbandons(): Promise<void> {
    const testMessage = TestMessage.getSample();
    await sender.send(testMessage);

    let checkDeliveryCount = 0;

    receiver.registerMessageHandler(
      async (msg: ServiceBusMessage) => {
        should.equal(
          msg.deliveryCount,
          checkDeliveryCount,
          "DeliveryCount is different than expected"
        );
        await msg.abandon();
        checkDeliveryCount++;
      },
      unExpectedErrorHandler,
      { autoComplete: false }
    );

    const deliveryCountFlag = await checkWithTimeout(() => checkDeliveryCount === maxDeliveryCount);
    should.equal(deliveryCountFlag, true, "DeliveryCount is different than expected");

    await receiver.close();
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0); // No messages in the queue

    const deadLetterReceiver = deadLetterClient.createReceiver(ReceiveMode.peekLock);
    const deadLetterMsgs = await deadLetterReceiver.receiveMessages(1);
    should.equal(Array.isArray(deadLetterMsgs), true, "`ReceivedMessages` is not an array");
    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].deliveryCount,
      maxDeliveryCount,
      "DeliveryCount is different than expected"
    );
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgs[0].complete();

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testMultipleAbandons();
  });

  it("Partitioned Subscription: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testMultipleAbandons();
  });

  it("Unpartitioned Queue: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testMultipleAbandons();
  });

  it("Unpartitioned Subscription: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testMultipleAbandons();
  });
});

describe("Streaming - Defer message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDefer(autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSample();
    await sender.send(testMessage);
    let sequenceNum: any = 0;
    receiver.registerMessageHandler(
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

    await receiver.close();
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
    const deferredMsgs = await receiver.receiveDeferredMessages([sequenceNum]);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }

    should.equal(deferredMsgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(
      deferredMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(deferredMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");

    await deferredMsgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: defer() moves message to deferred queue", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDefer(false);
  });

  it("Partitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDefer(false);
  });

  it("UnPartitioned Queue: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDefer(false);
  });

  it("UnPartitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDefer(false);
  });

  it("Partitioned Queue with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDefer(true);
  });

  it("Partitioned Subscription with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDefer(true);
  });

  it("UnPartitioned Queue with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDefer(true);
  });

  it("UnPartitioned Subscription with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDefer(true);
  });
});

describe("Streaming - Deadletter message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDeadletter(autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSample();
    await sender.send(testMessage);

    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.registerMessageHandler(
      async (msg: ServiceBusMessage) => {
        await msg.deadLetter();
        receivedMsgs.push(msg);
      },
      unExpectedErrorHandler,
      { autoComplete }
    );

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);

    await receiver.close();
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");

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

  it("Partitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDeadletter(false);
  });

  it("Partitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDeadletter(false);
  });

  it("UnPartitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDeadletter(false);
  });

  it("UnPartitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDeadletter(false);
  });

  it("Partitioned Queue with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testDeadletter(true);
  });

  it("Partitioned Subscription with autoComplete: deadLetter() moves message to deadletter", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testDeadletter(true);
  });

  it("UnPartitioned Queue with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testDeadletter(true);
  });

  it("UnPartitioned Subscription with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testDeadletter(true);
  });
});

describe("Streaming - Multiple Receiver Operations", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleReceiveCalls(): Promise<void> {
    let errorMessage;
    const expectedErrorMessage = getAlreadyReceivingErrorMsg(receiverClient.entityPath);
    receiver.registerMessageHandler((msg: ServiceBusMessage) => {
      return msg.complete();
    }, unExpectedErrorHandler);
    await delay(5000);
    try {
      receiver.registerMessageHandler(() => {
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
      await receiver.receiveMessages(1);
    } catch (err) {
      errorMessage = err && err.message;
    }
    should.equal(
      errorMessage,
      expectedErrorMessage,
      "Unexpected error message for receiveMessages"
    );
  }

  it("UnPartitioned Queue: Second receive operation should fail if the first streaming receiver is not stopped #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testMultipleReceiveCalls();
  });
});

describe("Streaming - Settle an already Settled message throws error", () => {
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
    const testMessage = TestMessage.getSample();
    await sender.send(testMessage);
    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.registerMessageHandler((msg: ServiceBusMessage) => {
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

  it("UnPartitioned Queue: complete() throws error #RunInBrowser", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Subscription: complete() throws error", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Queue: abandon() throws error #RunInBrowser", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Subscription: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Queue: defer() throws error #RunInBrowser", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Subscription: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Queue: deadLetter() throws error #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.deadletter);
  });

  it("UnPartitioned Subscription: deadLetter() throws error", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testSettlement(DispositionType.deadletter);
  });
});

describe("Streaming - User Error", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testUserError(): Promise<void> {
    await sender.send(TestMessage.getSample());
    const errorMessage = "Will we see this error message?";

    const receivedMsgs: ServiceBusMessage[] = [];
    receiver.registerMessageHandler(async (msg: ServiceBusMessage) => {
      await msg.complete();
      receivedMsgs.push(msg);
      throw new Error(errorMessage);
    }, unExpectedErrorHandler);

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);

    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages.`);
    should.equal(
      !!(receiverClient as any)._context.streamingReceiver,
      true,
      "Expected streaming receiver not to be cached."
    );

    await receiver.close();

    should.equal(
      unexpectedError && unexpectedError.message,
      errorMessage,
      "User error did not surface."
    );
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
  }

  it("UnPartitioned Queue: onError handler is called for user error #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testUserError();
  });
});

describe("Streaming - Failed init should not cache recevier", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  class TestTokenProvider extends SasTokenProvider {
    private firstCall = true;
    static errorMessage = "This is a faulty token provider.";
    constructor(connectionObject: {
      Endpoint: string;
      SharedAccessKeyName: string;
      SharedAccessKey: string;
    }) {
      super(
        connectionObject.Endpoint,
        connectionObject.SharedAccessKeyName,
        connectionObject.SharedAccessKey
      );
    }

    async getToken(audience: string): Promise<TokenInfo> {
      if (this.firstCall) {
        this.firstCall = false;
        throw new Error(TestTokenProvider.errorMessage);
      }
      return super.getToken(audience);
    }
  }

  it("UnPartitioned Queue: Receiver is not cached when not initialized #RunInBrowser", async function(): Promise<
    void
  > {
    const env = getEnvVars();

    // Send a message using service bus client created with connection string
    sbClient = getServiceBusClient();
    let clients = await getSenderReceiverClients(
      sbClient,
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue
    );
    sender = clients.senderClient.createSender();
    await sender.send(TestMessage.getSample());
    await sbClient.close();

    // Receive using service bus client created with faulty token provider
    const connectionObject: {
      Endpoint: string;
      SharedAccessKeyName: string;
      SharedAccessKey: string;
    } = parseConnectionString(env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]);
    const tokenProvider = new TestTokenProvider(connectionObject);
    sbClient = ServiceBusClient.createFromTokenProvider(
      connectionObject.Endpoint.substr(5),
      tokenProvider
    );
    clients = await getSenderReceiverClients(
      sbClient,
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue
    );
    receiver = clients.receiverClient.createReceiver(ReceiveMode.peekLock);

    let actualError: Error;
    receiver.registerMessageHandler(
      async (msg: ServiceBusMessage) => {
        throw new Error("No messages should have been received with faulty token provider");
      },
      (err) => {
        actualError = err;
      }
    );

    // Check for expected error and that receiver was not cached
    const errCheck = await checkWithTimeout(() => !!actualError === true);
    should.equal(errCheck, true, "Expected error to be thrown, but no error found.");
    should.equal(
      actualError!.message,
      TestTokenProvider.errorMessage,
      "Expected error from token provider, but unexpected error found."
    );
    should.equal(
      !!(clients.receiverClient as any)._context.streamingReceiver,
      false,
      "Expected Streaming receiver to not be cached"
    );

    await receiver.close();
  });
});

describe("Streaming - maxConcurrentCalls", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testConcurrency(maxConcurrentCalls?: number): Promise<void> {
    const testMessages = [TestMessage.getSample(), TestMessage.getSample()];
    await sender.sendBatch(testMessages);

    const settledMsgs: ServiceBusMessage[] = [];
    const receivedMsgs: ServiceBusMessage[] = [];

    receiver.registerMessageHandler(
      async (msg: ServiceBusMessage) => {
        if (receivedMsgs.length === 1) {
          if ((!maxConcurrentCalls || maxConcurrentCalls === 1) && settledMsgs.length === 0) {
            throw new Error(
              "onMessage for the second message should not have been called before the first message got settled"
            );
          }
        } else {
          if (maxConcurrentCalls && maxConcurrentCalls > 1 && settledMsgs.length !== 0) {
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
    await receiver.close();

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(settledMsgs.length, 2, `Expected 2, received ${settledMsgs.length} messages.`);
  }

  it("Partitioned Queue: no maxConcurrentCalls passed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testConcurrency();
  });

  it("Partitioned Queue: pass 1 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testConcurrency(1);
  });

  it("Partitioned Queue: pass 2 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testConcurrency(2);
  });

  it("Unpartitioned Queue: no maxConcurrentCalls passed #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testConcurrency();
  });

  it("Unpartitioned Queue: pass 1 for maxConcurrentCalls #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testConcurrency(1);
  });

  it("Unpartitioned Queue: pass 2 for maxConcurrentCalls #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testConcurrency(2);
  });

  it("Partitioned Subscription: no maxConcurrentCalls passed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testConcurrency();
  });

  it("Partitioned Queue: pass 1 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testConcurrency(1);
  });

  it("Partitioned Queue: pass 2 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testConcurrency(2);
  });

  it("Unpartitioned Subscription: no maxConcurrentCalls passed", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testConcurrency();
  });

  it("Unpartitioned Subscription: pass 1 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testConcurrency(1);
  });

  it("Unpartitioned Subscription: pass 2 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await testConcurrency(2);
  });
});

describe("Streaming - Not receive messages after receiver is closed", function(): void {
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

    receiver.registerMessageHandler(onMessageHandler, unExpectedErrorHandler, {
      autoComplete: false
    });
    await receiver.close();

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
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await testReceiveMessages();
  });

  it("UnPartitioned Queue: (Receive And Delete mode) Not receive messages after receiver is closed #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue,
      ReceiveMode.receiveAndDelete
    );
    await testReceiveMessages();
  });
});

describe("Streaming - onDetached", function(): void {
  afterEach(() => {
    return afterEachTest();
  });

  it("doesn't call user's error handler on non-retryable errors", async function(): Promise<void> {
    /**
     * If onDetached is called with a non-retryable error, it is assumed that
     * the onSessionError or onAmqpError has already called the user's
     * error handler.
     */
    // Create the sender and receiver.
    await beforeEachTest(
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue,
      ReceiveMode.receiveAndDelete
    );
    // Send a message so we can be sure when the receiver is open and active.
    await sender.send(TestMessage.getSample());
    const receivedErrors: any[] = [];

    let receiverIsActiveResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    // Start the receiver.
    receiver.registerMessageHandler(
      async () => {
        // Since we've received a message, mark the receiver as active.
        receiverIsActiveResolver();
      },
      (err) => {
        receivedErrors.push(err);
      }
    );

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    // Simulate onDetached being called with a non-retryable error.
    const nonRetryableError = translate(new Error(`I break systems.`));
    nonRetryableError.retryable = false;
    await receiver["_context"].streamingReceiver!.onDetached(nonRetryableError);

    receivedErrors.length.should.equal(0, "Unexpected number of errors received.");
  });

  it("does call user's error handler on non-retryable errors due to disconnect", async function(): Promise<
    void
  > {
    // Create the sender and receiver.
    await beforeEachTest(
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue,
      ReceiveMode.receiveAndDelete
    );
    // Send a message so we can be sure when the receiver is open and active.
    await sender.send(TestMessage.getSample());
    const receivedErrors: any[] = [];

    let receiverIsActiveResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    // Start the receiver.
    receiver.registerMessageHandler(
      async () => {
        // Since we've received a message, mark the receiver as active.
        receiverIsActiveResolver();
      },
      (err) => {
        receivedErrors.push(err);
      }
    );

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    // Simulate onDetached being called with a non-retryable error.
    const nonRetryableError = translate(new Error(`I break systems.`));
    nonRetryableError.retryable = false;
    await receiver["_context"].streamingReceiver!.onDetached(nonRetryableError, true);

    receivedErrors.length.should.equal(1, "Unexpected number of errors received.");
  });

  it("doesn't call user's error handler multiple times (disconnect)", async function(): Promise<
    void
  > {
    // Create the sender and receiver.
    await beforeEachTest(
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue,
      ReceiveMode.receiveAndDelete
    );
    // Send a message so we can be sure when the receiver is open and active.
    await sender.send(TestMessage.getSample());
    const receivedErrors: any[] = [];

    let receiverIsActiveResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    // Start the receiver.
    receiver.registerMessageHandler(
      async () => {
        // Since we've received a message, mark the receiver as active.
        receiverIsActiveResolver();
      },
      (err) => {
        receivedErrors.push(err);
      }
    );

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    // Simulate onDetached being called multiple times with non-retryable errors.
    const nonRetryableError = translate(new Error(`I break systems.`));
    nonRetryableError.retryable = false;
    await Promise.all([
      receiver["_context"].streamingReceiver!.onDetached(nonRetryableError, true),
      receiver["_context"].streamingReceiver!.onDetached(nonRetryableError, true)
    ]);

    receivedErrors.length.should.equal(1, "Unexpected number of errors received.");
  });

  it("doesn't call user's error handler multiple times (retryable)", async function(): Promise<
    void
  > {
    // Create the sender and receiver.
    await beforeEachTest(
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue,
      ReceiveMode.receiveAndDelete
    );
    // Send a message so we can be sure when the receiver is open and active.
    await sender.send(TestMessage.getSample());
    const receivedErrors: any[] = [];

    let receiverIsActiveResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    // Start the receiver.
    receiver.registerMessageHandler(
      async () => {
        // Since we've received a message, mark the receiver as active.
        receiverIsActiveResolver();
      },
      (err) => {
        receivedErrors.push(err);
      }
    );

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    // Simulate onDetached being called multiple times with non-retryable and then retryable errors.
    const nonRetryableError = translate(new Error(`I break systems.`));
    nonRetryableError.retryable = false;
    const retryableError = new Error("I temporarily break systems.");
    (retryableError as any).retryable = true;
    await Promise.all([
      receiver["_context"].streamingReceiver!.onDetached(nonRetryableError, true),
      receiver["_context"].streamingReceiver!.onDetached(retryableError)
    ]);

    receivedErrors.length.should.equal(1, "Unexpected number of errors received.");
  });
});

describe("Streaming - disconnects", function(): void {
  afterEach(async () => {
    return afterEachTest();
  });

  it("can receive and settle messages after a disconnect", async function(): Promise<void> {
    /**
     * If onDetached is called with a non-retryable error, it is assumed that
     * the onSessionError or onAmqpError has already called the user's
     * error handler.
     */
    // Create the sender and receiver.
    sbClient = getServiceBusClient();
    const { receiverClient, senderClient } = await getSenderReceiverClients(
      sbClient,
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue
    );
    const receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
    const sender = senderClient.createSender();
    // Send a message so we can be sure when the receiver is open and active.
    await sender.send(TestMessage.getSample());
    const receivedErrors: any[] = [];
    let settledMessageCount = 0;

    let messageHandlerCount = 0;
    let receiverIsActiveResolver: Function;
    let receiverSecondMessageResolver: Function;
    const receiverIsActive = new Promise((resolve) => {
      receiverIsActiveResolver = resolve;
    });
    const receiverSecondMessage = new Promise((resolve) => {
      receiverSecondMessageResolver = resolve;
    });

    // Start the receiver.
    receiver.registerMessageHandler(
      async (message) => {
        messageHandlerCount++;
        try {
          await message.complete();
          settledMessageCount++;
        } catch (err) {
          receivedErrors.push(err);
        }
        if (messageHandlerCount === 1) {
          // Since we've received a message, mark the receiver as active.
          receiverIsActiveResolver();
        } else {
          // Mark the second message resolver!
          receiverSecondMessageResolver();
        }
      },
      (err) => {
        receivedErrors.push(err);
      }
    );

    // Wait until we're sure the receiver is open and receiving messages.
    await receiverIsActive;

    settledMessageCount.should.equal(1, "Unexpected number of settled messages.");
    receivedErrors.length.should.equal(0, "Encountered an unexpected number of errors.");

    const connectionContext = receiver["_context"].namespace;
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function(...args) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    receiver["_context"].namespace.connection["_connection"].idle();

    // Allow rhea to clear internal setTimeouts (since we're triggering idle manually).
    // Otherwise, it will get into a bad internal state with uncaught exceptions.
    await delay(2000);
    // send a second message to trigger the message handler again.
    await sender.send(TestMessage.getSample());

    // wait for the 2nd message to be received.
    await receiverSecondMessage;
    settledMessageCount.should.equal(2, "Unexpected number of settled messages.");
    receivedErrors.length.should.equal(0, "Encountered an unexpected number of errors.");
    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });
});

describe("Streaming - close() respects an in progress init()", () => {
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
    await senderClient.createSender().open();

    const receiver = receiverClient.createReceiver(ReceiveMode.receiveAndDelete);

    const origReceiverFn = sbClient["_context"].connection["createReceiver"];

    let closePromise: Promise<void> | undefined;
    let createdReceiver: RheaReceiver | undefined;

    const createReceiverPromise = new Promise((resolve) => {
      sbClient["_context"].connection["createReceiver"] = async (options) => {
        resolve();

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
          console.log(`result = ${result}`);
          throw new Error(
            "FATAL ERROR - test is incorrect because close() was supposed to be blocked but somehow completed"
          );
        }

        createdReceiver = await origReceiverFn.call(sbClient["_context"].connection, options);
        return createdReceiver;
      };
    });

    receiver.registerMessageHandler(
      async () => {},
      () => {}
    );

    // we already do a good cut-off here if they close before the initialization even happens
    // this test makes sure that if they call close() while we're mid-init that the created
    // receiver is properly tracked and closed.
    await createReceiverPromise;

    // now the close should complete.
    await closePromise;

    // now that we've properly serialized the two calls the receiver that we created will get properly closed.
    createdReceiver!.isClosed().should.be.true;
  });
});
