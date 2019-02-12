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

// Template starts

// describe("Premium", function(): void {
//   const PREMIUM_SERVICEBUS_CONNECTION_STRING = check(
//     process.env.PREMIUM_SERVICEBUS_CONNECTION_STRING,
//     "PREMIUM_SERVICEBUS_CONNECTION_STRING"
//   );
//   const namespace = Namespace.createFromConnectionString(PREMIUM_SERVICEBUS_CONNECTION_STRING);

//   const PREMIUM_QUEUE = check(process.env.PREMIUM_QUEUE, "PREMIUM_QUEUE");
//   describe("Unpartitioned Queue", function(): void {
//     const senderClient = namespace.createQueueClient(PREMIUM_QUEUE);
//     const receiverClient = senderClient;

//     // Copy paste tests applicable for Unpartitioned Queue in Premium pricing here from the Standard section
//   });

//   const PREMIUM_TOPIC = check(process.env.PREMIUM_TOPIC, "PREMIUM_TOPIC");
//   const PREMIUM_SUBSCRIPTION = check(process.env.PREMIUM_SUBSCRIPTION, "PREMIUM_SUBSCRIPTION");
//   describe("Unpartitioned Topic/Subscription", function(): void {
//     const senderClient = namespace.createTopicClient(PREMIUM_TOPIC);
//     const receiverClient = namespace.createSubscriptionClient(PREMIUM_TOPIC, PREMIUM_SUBSCRIPTION);

//     // Copy paste tests applicable for Unpartitioned Topic/Subscription Premium pricing here from the Standard section
//   });
// });

describe("Standard", function(): void {
  const SERVICEBUS_CONNECTION_STRING = check(
    process.env.SERVICEBUS_CONNECTION_STRING,
    "SERVICEBUS_CONNECTION_STRING"
  );
  const namespace = Namespace.createFromConnectionString(SERVICEBUS_CONNECTION_STRING);

  describe("Unpartitioned Queue", function(): void {
    let senderClient: QueueClient;
    let receiverClient: QueueClient;

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        const clients = await getSenderReceiverClients(
          namespace,
          ClientType.UnpartitionedQueue,
          ClientType.UnpartitionedQueue
        );
        senderClient = clients.senderClient as QueueClient;
        receiverClient = clients.receiverClient as QueueClient;
        await beforeEachTest(receiverClient);
      });

      afterEach(async () => {
        await namespace.close();
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
  });

  describe("Partitioned Queue", function(): void {
    let senderClient: QueueClient;
    let receiverClient: QueueClient;

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        const clients = await getSenderReceiverClients(
          namespace,
          ClientType.PartitionedQueue,
          ClientType.PartitionedQueue
        );
        senderClient = clients.senderClient as QueueClient;
        receiverClient = clients.receiverClient as QueueClient;
        await beforeEachTest(receiverClient);
      });

      afterEach(async () => {
        await namespace.close();
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
  });

  describe("Unpartitioned Topic/Subscription", function(): void {
    let senderClient: TopicClient;
    let receiverClient: SubscriptionClient;

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        const clients = await getSenderReceiverClients(
          namespace,
          ClientType.UnpartitionedTopic,
          ClientType.UnpartitionedSubscription
        );
        senderClient = clients.senderClient as TopicClient;
        receiverClient = clients.receiverClient as SubscriptionClient;
        await beforeEachTest(receiverClient);
      });

      afterEach(async () => {
        await namespace.close();
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
  });

  describe("Partitioned Topic/Subscription", function(): void {
    let senderClient: TopicClient;
    let receiverClient: SubscriptionClient;

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        const clients = await getSenderReceiverClients(
          namespace,
          ClientType.PartitionedTopic,
          ClientType.PartitionedSubscription
        );
        senderClient = clients.senderClient as TopicClient;
        receiverClient = clients.receiverClient as SubscriptionClient;
        await beforeEachTest(receiverClient);
      });

      afterEach(async () => {
        await namespace.close();
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
  });
});

// describe("Basic", function(): void {
//   const BASIC_SERVICEBUS_CONNECTION_STRING = check(
//     process.env.BASIC_SERVICEBUS_CONNECTION_STRING,
//     "BASIC_SERVICEBUS_CONNECTION_STRING"
//   );
//   const namespace = Namespace.createFromConnectionString(BASIC_SERVICEBUS_CONNECTION_STRING);

//   const BASIC_QUEUE = check(process.env.BASIC_QUEUE, "BASIC_QUEUE");
//   describe("Unpartitioned Queue", function(): void {
//     const senderClient = namespace.createQueueClient(BASIC_QUEUE);
//     const receiverClient = senderClient;

//     // Copy paste tests applicable for Unpartitioned Queue in Basic pricing here from the Standard section
//   });

//   const BASIC_QUEUE_PARTITION = check(process.env.BASIC_QUEUE_PARTITION, "BASIC_QUEUE_PARTITION");
//   describe("Partitioned Queue", function(): void {
//     const senderClient = namespace.createQueueClient(BASIC_QUEUE_PARTITION);
//     const receiverClient = senderClient;

//     // Copy paste tests applicable for Partitioned Queue in Premium pricing here from the Standard section
//   });
// });

const lockDurationInMilliseconds = 30000;

let uncaughtErrorFromHandlers: Error | undefined;

const onError: OnError = (err: MessagingError | Error) => {
  uncaughtErrorFromHandlers = err;
};

async function beforeEachTest(receiverClient: QueueClient | SubscriptionClient): Promise<void> {
  await purge(receiverClient);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
}

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

  should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
  should.equal(msgs.length, 1, "Unexpected number of messages");
  should.equal(msgs[0].body, testSimpleMessages.body, "MessageBody is different than expected");
  should.equal(
    msgs[0].messageId,
    testSimpleMessages.messageId,
    "MessageId is different than expected"
  );

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

  should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
  should.equal(msgs.length, 1, "Expected message length does not match");
  should.equal(msgs[0].body, testSimpleMessages.body, "MessageBody is different than expected");
  should.equal(
    msgs[0].messageId,
    testSimpleMessages.messageId,
    "MessageId is different than expected"
  );

  // Sleeping 30 seconds...
  await delay(lockDurationInMilliseconds + 1000);

  let errorWasThrown: boolean = false;
  await msgs[0].complete().catch((err) => {
    should.equal(err.name, "MessageLockLostError", "ErrorName is different than expected");
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

      should.equal(
        brokeredMessage.body,
        testSimpleMessages.body,
        "MessageBody is different than expected"
      );
      should.equal(
        brokeredMessage.messageId,
        testSimpleMessages.messageId,
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

  await senderClient.getSender().send(testSimpleMessages);
  const receiver = receiverClient.getReceiver();

  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(
        brokeredMessage.body,
        testSimpleMessages.body,
        "MessageBody is different than expected"
      );
      should.equal(
        brokeredMessage.messageId,
        testSimpleMessages.messageId,
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

// Helper functions
function check(str: string | undefined, label: string): string {
  if (!str || str.trim() === "") {
    throw new Error(`"${label}" cannot be null or empty`);
  }
  return str;
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
