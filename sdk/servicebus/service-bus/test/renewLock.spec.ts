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
  TopicClient,
  SubscriptionClient,
  OnMessage,
  ServiceBusMessage,
  MessagingError,
  OnError,
  ReceiveMode
} from "../src";
import { delay } from "rhea-promise";
import { purge, getSenderReceiverClients, TestClientType, TestMessage } from "./testUtils";

let ns: ServiceBusClient;
let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;

async function beforeEachTest(senderType: TestClientType, receiverType: TestClientType): Promise<void> {
  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = ServiceBusClient.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
  const clients = await getSenderReceiverClients(ns, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  await purge(receiverClient);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("Unpartitioned Queue - Lock Renewal", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Batch Receiver: renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Batch Receiver: complete() after lock expiry with throws error", async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Streaming Receiver: renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Streaming Receiver: complete() after lock expiry with auto-renewal disabled throws error", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
  });

  it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      willCompleteFail: false
    });
  });

  it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 35,
      delayBeforeAttemptingToCompleteMessageInSeconds: 55,
      willCompleteFail: true
    });
  }).timeout(90000);

  it("Streaming Receiver: No lock renewal when config value is less than lock duration", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 15,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
  });
});

describe("Partitioned Queue - Lock Renewal", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Batch Receiver: renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Batch Receiver: complete() after lock expiry with throws error", async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Streaming Receiver: renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Streaming Receiver: complete() after lock expiry with auto-renewal disabled throws error", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
    // Complete fails as expected
  });

  it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      willCompleteFail: false
    });
  });

  it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 35,
      delayBeforeAttemptingToCompleteMessageInSeconds: 55,
      willCompleteFail: true
    });
  }).timeout(90000);

  it("Streaming Receiver: No lock renewal when config value is less than lock duration", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 15,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
  });
});

describe("Unpartitioned Subscription - Lock Renewal", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.UnpartitionedTopic, TestClientType.UnpartitionedSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Batch Receiver: renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Batch Receiver: complete() after lock expiry with throws error", async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Streaming Receiver: renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Streaming Receiver: complete() after lock expiry with auto-renewal disabled throws error", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
    // Complete fails as expected
  });

  it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      willCompleteFail: false
    });
  });

  it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 35,
      delayBeforeAttemptingToCompleteMessageInSeconds: 55,
      willCompleteFail: true
    });
  }).timeout(90000);

  it("Streaming Receiver: No lock renewal when config value is less than lock duration", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 15,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
  });
});

describe("Partitioned Subscription - Lock Renewal", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Batch Receiver: renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Batch Receiver: complete() after lock expiry with throws error", async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Streaming Receiver: renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Streaming Receiver: complete() after lock expiry with auto-renewal disabled throws error", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
    // Complete fails as expected
  });

  it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      willCompleteFail: false
    });
  });

  it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 35,
      delayBeforeAttemptingToCompleteMessageInSeconds: 55,
      willCompleteFail: true
    });
  }).timeout(90000);

  it("Streaming Receiver: No lock renewal when config value is less than lock duration", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 15,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
  });
});

const lockDurationInMilliseconds = 30000;

let uncaughtErrorFromHandlers: Error | undefined;

const onError: OnError = (err: MessagingError | Error) => {
  uncaughtErrorFromHandlers = err;
};

/**
 * Test renewLock() after receiving a message using Batch Receiver
 */
async function testBatchReceiverManualLockRenewalHappyCase(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  const testMessage = TestMessage.getSample();
  await senderClient.createSender().send(testMessage);

  const receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
  const msgs = await receiver.receiveMessages(1);

  // Compute expected initial lock expiry time
  const expectedLockExpiryTimeUtc = new Date();
  expectedLockExpiryTimeUtc.setSeconds(
    expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
  );

  should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
  should.equal(msgs.length, 1, "Unexpected number of messages");
  should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
  should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

  // Verify initial lock expiry time on the message
  assertTimestampsAreApproximatelyEqual(
    msgs[0].lockedUntilUtc,
    expectedLockExpiryTimeUtc,
    "Initial"
  );

  await delay(5000);
  if (msgs[0].lockToken) {
    await receiver.renewMessageLock(msgs[0].lockToken);
  }

  // Compute expected lock expiry time after renewing lock after 5 seconds
  expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

  // Verify lock expiry time after renewLock()
  assertTimestampsAreApproximatelyEqual(
    msgs[0].lockedUntilUtc,
    expectedLockExpiryTimeUtc,
    "After renewlock()"
  );

  await msgs[0].complete();
}

/**
 * Test settling of message from Batch Receiver fails after message lock expires
 */
async function testBatchReceiverManualLockRenewalErrorOnLockExpiry(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  const testMessage = TestMessage.getSample();
  await senderClient.createSender().send(testMessage);

  const receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
  const msgs = await receiver.receiveMessages(1);

  should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
  should.equal(msgs.length, 1, "Expected message length does not match");
  should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
  should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

  // Sleeping 30 seconds...
  await delay(lockDurationInMilliseconds + 1000);

  let errorWasThrown: boolean = false;
  await msgs[0].complete().catch((err) => {
    should.equal(err.name, "MessageLockLostError", "ErrorName is different than expected");
    errorWasThrown = true;
  });

  should.equal(errorWasThrown, true, "Error thrown flag must be true");

  // Clean up any left over messages
  const unprocessedMsgs = await receiver.receiveMessages(1);
  await unprocessedMsgs[0].complete();
}

/**
 * Test renewLock() after receiving a message using Streaming Receiver with autoLockRenewal disabled
 */
async function testStreamingReceiverManualLockRenewalHappyCase(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  let numOfMessagesReceived = 0;
  const testMessage = TestMessage.getSample();
  await senderClient.createSender().send(testMessage);
  const receiver = receiverClient.createReceiver(ReceiveMode.peekLock);

  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(
        brokeredMessage.body,
        testMessage.body,
        "MessageBody is different than expected"
      );
      should.equal(
        brokeredMessage.messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      // Compute expected initial lock expiry time
      const expectedLockExpiryTimeUtc = new Date();
      expectedLockExpiryTimeUtc.setSeconds(
        expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
      );

      // Verify initial expiry time on message
      assertTimestampsAreApproximatelyEqual(
        brokeredMessage.lockedUntilUtc,
        expectedLockExpiryTimeUtc,
        "Initial"
      );

      await delay(5000);
      await receiver.renewMessageLock(brokeredMessage);

      // Compute expected lock expiry time after renewing lock after 5 seconds
      expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

      // Verify actual expiry time on session after first renewal
      assertTimestampsAreApproximatelyEqual(
        brokeredMessage.lockedUntilUtc,
        expectedLockExpiryTimeUtc,
        "After renewlock"
      );

      await brokeredMessage.complete();
    }
  };

  receiver.registerMessageHandler(onMessage, onError, {
    autoComplete: false,
    maxMessageAutoRenewLockDurationInSeconds: 0
  });
  await delay(10000);
  await receiver.close();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
  }

  should.equal(numOfMessagesReceived, 1, "Unexpected number of messages");
}

interface AutoLockRenewalTestOptions {
  maxAutoRenewDurationInSeconds: number | undefined;
  delayBeforeAttemptingToCompleteMessageInSeconds: number;
  willCompleteFail: boolean;
}

async function testAutoLockRenewalConfigBehavior(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient,
  options: AutoLockRenewalTestOptions
): Promise<void> {
  let numOfMessagesReceived = 0;
  const testMessage = TestMessage.getSample();
  await senderClient.createSender().send(testMessage);
  const receiver = receiverClient.createReceiver(ReceiveMode.peekLock);

  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(
        brokeredMessage.body,
        testMessage.body,
        "MessageBody is different than expected"
      );
      should.equal(
        brokeredMessage.messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      // Sleeping...
      await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000);

      let errorWasThrown: boolean = false;
      await brokeredMessage.complete().catch((err) => {
        should.equal(err.name, "MessageLockLostError", "ErrorName is different than expected");
        errorWasThrown = true;
      });

      should.equal(errorWasThrown, options.willCompleteFail, "Error Thrown flag value mismatch");
    }
  };

  receiver.registerMessageHandler(onMessage, onError, {
    autoComplete: false,
    maxMessageAutoRenewLockDurationInSeconds: options.maxAutoRenewDurationInSeconds
  });
  await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000 + 10000);
  await receiver.close();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
  }

  should.equal(numOfMessagesReceived, 1, "Mismatch in number of messages received");

  if (options.willCompleteFail) {
    // Clean up any left over messages
    const newReceiver = receiverClient.createReceiver(ReceiveMode.peekLock);
    const unprocessedMsgs = await newReceiver.receiveMessages(1);
    await unprocessedMsgs[0].complete();
  }
}

function assertTimestampsAreApproximatelyEqual(
  actualTimeInUTC: Date | undefined,
  expectedTimeInUTC: Date,
  label: string
): void {
  if (actualTimeInUTC) {
    should.equal(
      Math.pow((actualTimeInUTC.valueOf() - expectedTimeInUTC.valueOf()) / 1000, 2) < 100, // Within +/- 10 seconds
      true,
      `${label}: Actual time ${actualTimeInUTC} must be approximately equal to ${expectedTimeInUTC}`
    );
  }
}
