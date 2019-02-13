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
  TopicClient,
  SubscriptionClient,
  OnMessage,
  ServiceBusMessage,
  MessagingError,
  OnError
} from "../lib";
import { delay } from "rhea-promise";
import { testSimpleMessages, purge, getSenderReceiverClients, ClientType } from "./testUtils";

let ns: Namespace;
let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;

async function beforeEachTest(senderType: ClientType, receiverType: ClientType): Promise<void> {
  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
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

describe("Unpartitioned Queue - Lock Renewal Tests - Peeklock Mode", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it(`renewLock() with Batch Receiver resets lock duration each time.`, async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it(`Receive a msg using Batch Receiver, wait until its lock expires, completing it now results in error`, async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Receives a message using Streaming Receiver renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Receive a msg using Streaming Receiver, lock expires after 30 sec when auto renewal is disabled", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
    // Complete fails as expected
  });

  it("Receive a msg using Streaming Receiver, lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      willCompleteFail: false
    });
  });

  it("Receive a msg using Streaming Receiver, lock will expire sometime after the configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 35,
      delayBeforeAttemptingToCompleteMessageInSeconds: 55,
      willCompleteFail: true
    });
  }).timeout(90000);

  it("Receive a msg using Streaming Receiver, lock renewal does not take place when config value is less than lock duration", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 15,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
  });
});

describe("Partitioned Queue - Lock Renewal Tests - Peeklock Mode", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it(`renewLock() with Batch Receiver resets lock duration each time.`, async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it(`Receive a msg using Batch Receiver, wait until its lock expires, completing it now results in error`, async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Receives a message using Streaming Receiver renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Receive a msg using Streaming Receiver, lock expires after 30 sec when auto renewal is disabled", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
    // Complete fails as expected
  });

  it("Receive a msg using Streaming Receiver, lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      willCompleteFail: false
    });
  });

  it("Receive a msg using Streaming Receiver, lock will expire sometime after the configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 35,
      delayBeforeAttemptingToCompleteMessageInSeconds: 55,
      willCompleteFail: true
    });
  }).timeout(90000);

  it("Receive a msg using Streaming Receiver, lock renewal does not take place when config value is less than lock duration", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 15,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
  });
});

describe("Unpartitioned Topic/Subscription - Lock Renewal Tests - Peeklock Mode", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it(`renewLock() with Batch Receiver resets lock duration each time.`, async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it(`Receive a msg using Batch Receiver, wait until its lock expires, completing it now results in error`, async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Receives a message using Streaming Receiver renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Receive a msg using Streaming Receiver, lock expires after 30 sec when auto renewal is disabled", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
    // Complete fails as expected
  });

  it("Receive a msg using Streaming Receiver, lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      willCompleteFail: false
    });
  });

  it("Receive a msg using Streaming Receiver, lock will expire sometime after the configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 35,
      delayBeforeAttemptingToCompleteMessageInSeconds: 55,
      willCompleteFail: true
    });
  }).timeout(90000);

  it("Receive a msg using Streaming Receiver, lock renewal does not take place when config value is less than lock duration", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 15,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
  });
});

describe("Partitioned Topic/Subscription - Lock Renewal Tests - Peeklock Mode", function(): void {
  beforeEach(async () => {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it(`renewLock() with Batch Receiver resets lock duration each time.`, async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it(`Receive a msg using Batch Receiver, wait until its lock expires, completing it now results in error`, async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Receives a message using Streaming Receiver renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Receive a msg using Streaming Receiver, lock expires after 30 sec when auto renewal is disabled", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      willCompleteFail: true
    });
    // Complete fails as expected
  });

  it("Receive a msg using Streaming Receiver, lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      willCompleteFail: false
    });
  });

  it("Receive a msg using Streaming Receiver, lock will expire sometime after the configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxAutoRenewDurationInSeconds: 35,
      delayBeforeAttemptingToCompleteMessageInSeconds: 55,
      willCompleteFail: true
    });
  }).timeout(90000);

  it("Receive a msg using Streaming Receiver, lock renewal does not take place when config value is less than lock duration", async function(): Promise<
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
  await senderClient.getSender().send(testSimpleMessages);

  const receiver = receiverClient.getReceiver();
  const msgs = await receiver.receiveBatch(1);

  // Compute expected initial lock expiry time
  const expectedLockExpiryTimeUtc = new Date();
  expectedLockExpiryTimeUtc.setSeconds(
    expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
  );

  should.equal(Array.isArray(msgs), true);
  should.equal(msgs.length, 1);
  should.equal(msgs[0].body, testSimpleMessages.body);
  should.equal(msgs[0].messageId, testSimpleMessages.messageId);

  // Verify initial lock expiry time on the message
  assertTimestampsAreApproximatelyEqual(
    msgs[0].lockedUntilUtc,
    expectedLockExpiryTimeUtc,
    "Initial"
  );

  await delay(5000);
  await receiver.renewLock(msgs[0]);

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
  await senderClient.getSender().send(testSimpleMessages);

  const receiver = receiverClient.getReceiver();
  const msgs = await receiver.receiveBatch(1);

  should.equal(Array.isArray(msgs), true);
  should.equal(msgs.length, 1, "Expected message length does not match");
  should.equal(msgs[0].body, testSimpleMessages.body);
  should.equal(msgs[0].messageId, testSimpleMessages.messageId);

  // Sleeping 30 seconds...
  await delay(lockDurationInMilliseconds + 1000);

  let errorWasThrown: boolean = false;
  await msgs[0].complete().catch((err) => {
    should.equal(err.name, "MessageLockLostError");
    errorWasThrown = true;
  });

  should.equal(errorWasThrown, true, "Error thrown flag must be true");

  // Clean up any left over messages
  const unprocessedMsgs = await receiver.receiveBatch(1);
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

  await senderClient.getSender().send(testSimpleMessages);
  const receiver = receiverClient.getReceiver();

  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(brokeredMessage.body, testSimpleMessages.body);
      should.equal(brokeredMessage.messageId, testSimpleMessages.messageId);

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
      await receiver.renewLock(brokeredMessage);

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

  receiver.receive(onMessage, onError, {
    autoComplete: false,
    maxMessageAutoRenewLockDurationInSeconds: 0
  });
  await delay(10000);
  await receiver.close();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
  }

  should.equal(numOfMessagesReceived, 1);
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

  await senderClient.getSender().send(testSimpleMessages);
  const receiver = receiverClient.getReceiver();

  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(brokeredMessage.body, testSimpleMessages.body);
      should.equal(brokeredMessage.messageId, testSimpleMessages.messageId);

      // Sleeping...
      await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000);

      let errorWasThrown: boolean = false;
      await brokeredMessage.complete().catch((err) => {
        should.equal(err.name, "MessageLockLostError");
        errorWasThrown = true;
      });

      should.equal(errorWasThrown, options.willCompleteFail, "Error Thrown flag value mismatch");
    }
  };

  receiver.receive(onMessage, onError, {
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
    const unprocessedMsgs = await receiver.receiveBatch(1);
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
