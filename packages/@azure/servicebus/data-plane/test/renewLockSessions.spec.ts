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
  ServiceBusMessage,
  MessagingError,
  OnError
} from "../lib";
import { delay } from "rhea-promise";
import { testSessionId1, purge } from "./testUtils";

describe("Standard", function(): void {
  const SERVICEBUS_CONNECTION_STRING = check(
    process.env.SERVICEBUS_CONNECTION_STRING,
    "SERVICEBUS_CONNECTION_STRING"
  );
  const namespace = Namespace.createFromConnectionString(SERVICEBUS_CONNECTION_STRING);

  const STANDARD_QUEUE_SESSION =
    process.env.QUEUE_NAME_NO_PARTITION_SESSION || "unpartitioned-queue-sessions";
  describe("Unpartitioned Queue", function(): void {
    let senderClient: QueueClient;
    let receiverClient: QueueClient;

    describe("Tests - Lock Renewal for Sessions- Peeklock Mode", function(): void {
      beforeEach(async () => {
        senderClient = namespace.createQueueClient(STANDARD_QUEUE_SESSION);
        receiverClient = senderClient;
        await beforeEachTest(receiverClient);
      });

      after(async () => {
        await namespace.close();
      });

      afterEach(async () => {
        await senderClient.close();
        await receiverClient.close();
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
          maxSessionAutoRenewLockDurationInSeconds: 0,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31
        });
        // Service bus completes the message even when the session lock expires.
      });
    });
  });

  const STANDARD_QUEUE_PARTITION_SESSION =
    process.env.QUEUE_NAME_SESSION || "partitioned-queue-sessions";
  describe("Partitioned Queue", function(): void {
    let senderClient: QueueClient;
    let receiverClient: QueueClient;

    describe("Tests - Lock Renewal for Sessions- Peeklock Mode", function(): void {
      beforeEach(async () => {
        senderClient = namespace.createQueueClient(STANDARD_QUEUE_PARTITION_SESSION);
        receiverClient = senderClient;
        await beforeEachTest(receiverClient);
      });

      after(async () => {
        await namespace.close();
      });

      afterEach(async () => {
        await senderClient.close();
        await receiverClient.close();
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
          maxSessionAutoRenewLockDurationInSeconds: 0,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31
        });
        // Service bus completes the message even when the session lock expires.
      });
    });
  });

  const STANDARD_TOPIC_SESSION =
    process.env.TOPIC_NAME_NO_PARTITION_SESSION || "unpartitioned-topic-sessions";
  const STANDARD_SUBSCRIPTION_SESSION =
    process.env.SUBSCRIPTION_NAME_NO_PARTITION_SESSION ||
    "unpartitioned-topic-sessions-subscription";
  describe("Unpartitioned Topic/Subscription", function(): void {
    let senderClient: TopicClient;
    let receiverClient: SubscriptionClient;

    describe("Tests - Lock Renewal for Sessions- Peeklock Mode", function(): void {
      beforeEach(async () => {
        senderClient = namespace.createTopicClient(STANDARD_TOPIC_SESSION);
        receiverClient = namespace.createSubscriptionClient(
          STANDARD_TOPIC_SESSION,
          STANDARD_SUBSCRIPTION_SESSION
        );
        await beforeEachTest(receiverClient);
      });

      after(async () => {
        await namespace.close();
      });

      afterEach(async () => {
        await senderClient.close();
        await receiverClient.close();
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
          maxSessionAutoRenewLockDurationInSeconds: 0,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31
        });
        // Service bus completes the message even when the session lock expires.
      });
    });
  });

  const STANDARD_TOPIC_PARTITION_SESSION =
    process.env.TOPIC_NAME_SESSION || "partitioned-topic-sessions";
  const STANDARD_SUBSCRIPTION_PARTITION_SESSION =
    process.env.SUBSCRIPTION_NAME_SESSION || "partitioned-topic-sessions-subscription";
  describe("Partitioned Topic/Subscription", function(): void {
    let senderClient: TopicClient;
    let receiverClient: SubscriptionClient;

    describe("Tests - Lock Renewal for Sessions- Peeklock Mode", function(): void {
      beforeEach(async () => {
        senderClient = namespace.createTopicClient(STANDARD_TOPIC_PARTITION_SESSION);
        receiverClient = namespace.createSubscriptionClient(
          STANDARD_TOPIC_PARTITION_SESSION,
          STANDARD_SUBSCRIPTION_PARTITION_SESSION
        );
        await beforeEachTest(receiverClient);
      });

      after(async () => {
        await namespace.close();
      });

      afterEach(async () => {
        await senderClient.close();
        await receiverClient.close();
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
          maxSessionAutoRenewLockDurationInSeconds: 0,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31
        });
        // Complete fails as expected
      });
    });
  });
});

const lockDurationInMilliseconds = 30000;
// const maxSessionAutoRenewLockDurationInSeconds = 300;
let uncaughtErrorFromHandlers: Error | undefined;

const onError: OnError = (err: MessagingError | Error) => {
  uncaughtErrorFromHandlers = err;
};

let testMessage: any;
async function beforeEachTest(receiverClient: QueueClient | SubscriptionClient): Promise<void> {
  testMessage = {
    body: "hello1",
    messageId: `test message ${Math.random()}`,
    sessionId: testSessionId1
  };
  await purge(receiverClient, testSessionId1);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
}

/**
 * Test manual renewLock() using Batch Receiver, with autoLockRenewal disabled
 */
async function testBatchReceiverManualLockRenewalHappyCase(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  await senderClient.getSender().send(testMessage);

  const sessionClient = await receiverClient.getSessionReceiver({
    sessionId: testSessionId1,
    maxSessionAutoRenewLockDurationInSeconds: 0
  });
  const msgs = await sessionClient.receiveBatch(1);

  // Compute expected initial lock expiry time
  const expectedLockExpiryTimeUtc = new Date();
  expectedLockExpiryTimeUtc.setSeconds(
    expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
  );

  should.equal(Array.isArray(msgs), true);
  should.equal(msgs.length, 1);
  should.equal(msgs[0].body, testMessage.body);
  should.equal(msgs[0].messageId, testMessage.messageId);

  // Verify initial lock expiry time on the session
  assertTimestampsAreApproximatelyEqual(
    sessionClient.sessionLockedUntilUtc,
    expectedLockExpiryTimeUtc,
    "Initial"
  );

  await delay(5000);
  await sessionClient.renewLock();

  // Compute expected lock expiry time after renewing lock after 5 seconds
  expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

  // Verify lock expiry time after renewLock()
  assertTimestampsAreApproximatelyEqual(
    sessionClient.sessionLockedUntilUtc,
    expectedLockExpiryTimeUtc,
    "After renewlock()"
  );

  await msgs[0].complete();
}

/**
 * Test settling of message from Batch Receiver fails after session lock expires
 */
async function testBatchReceiverManualLockRenewalErrorOnLockExpiry(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  await senderClient.getSender().send(testMessage);

  let sessionClient = await receiverClient.getSessionReceiver({
    sessionId: testSessionId1,
    maxSessionAutoRenewLockDurationInSeconds: 0
  });
  const msgs = await sessionClient.receiveBatch(1);

  should.equal(Array.isArray(msgs), true);
  should.equal(msgs.length, 1, "Expected message length does not match");
  should.equal(msgs[0].body, testMessage.body);
  should.equal(msgs[0].messageId, testMessage.messageId);

  await delay(lockDurationInMilliseconds + 1000);

  let errorWasThrown: boolean = false;
  await msgs[0].complete().catch((err: any) => {
    should.equal(err.name, "Error");
    should.equal(!(err.message.search("Cannot find the receiver with name") + 1), false);
    errorWasThrown = true;
  });

  should.equal(errorWasThrown, true, "Error thrown flag must be true");

  // Clean up any left over messages
  sessionClient = await receiverClient.getSessionReceiver({ sessionId: testSessionId1 });
  const unprocessedMsgs = await sessionClient.receiveBatch(1);
  await unprocessedMsgs[0].complete();
}

/**
 * Test manual renewLock() using Streaming Receiver with autoLockRenewal disabled
 */
async function testStreamingReceiverManualLockRenewalHappyCase(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  let numOfMessagesReceived = 0;

  await senderClient.getSender().send(testMessage);
  const sessionClient = await receiverClient.getSessionReceiver({
    sessionId: testSessionId1,
    maxSessionAutoRenewLockDurationInSeconds: 0
  });

  const onSessionMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(brokeredMessage.body, testMessage.body);
      should.equal(brokeredMessage.messageId, testMessage.messageId);

      // Compute expected initial lock expiry time
      const expectedLockExpiryTimeUtc = new Date();
      expectedLockExpiryTimeUtc.setSeconds(
        expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
      );

      // Verify initial expiry time on session
      assertTimestampsAreApproximatelyEqual(
        sessionClient.sessionLockedUntilUtc,
        expectedLockExpiryTimeUtc,
        "Initial"
      );

      await delay(5000);
      await sessionClient.renewLock();

      // Compute expected lock expiry time after renewing lock after 5 seconds
      expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

      // Verify actual expiry time on session after renewal
      assertTimestampsAreApproximatelyEqual(
        sessionClient.sessionLockedUntilUtc,
        expectedLockExpiryTimeUtc,
        "After renewlock()"
      );

      await brokeredMessage.complete();
    }
  };

  await sessionClient.receive(onSessionMessage, onError, {
    autoComplete: false
  });
  await delay(10000);
  await sessionClient.close();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
  }

  should.equal(numOfMessagesReceived, 1);
}

interface AutoLockRenewalTestOptions {
  maxSessionAutoRenewLockDurationInSeconds: number | undefined;
  delayBeforeAttemptingToCompleteMessageInSeconds: number;
}

async function testAutoLockRenewalConfigBehavior(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient,
  options: AutoLockRenewalTestOptions
): Promise<void> {
  let numOfMessagesReceived = 0;

  await senderClient.getSender().send(testMessage);

  const sessionClient = await receiverClient.getSessionReceiver({
    sessionId: testSessionId1,
    maxSessionAutoRenewLockDurationInSeconds: options.maxSessionAutoRenewLockDurationInSeconds
  });
  await sessionClient.receive(
    async (brokeredMessage: ServiceBusMessage) => {
      if (numOfMessagesReceived < 1) {
        numOfMessagesReceived++;

        should.equal(brokeredMessage.body, testMessage.body);
        should.equal(brokeredMessage.messageId, testMessage.messageId);

        // Sleeping...
        await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000);

        let errorWasThrown: boolean = false;
        await brokeredMessage.complete().catch((err) => {
          errorWasThrown = true; // Service bus completes the message even when the session lock expires.
        });

        should.equal(errorWasThrown, false, "Error Thrown flag value mismatch");
      }
    },
    onError,
    {
      autoComplete: false
    }
  );
  await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000 + 4000);
  await sessionClient.close();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
  }

  should.equal(numOfMessagesReceived, 1, "Mismatch in number of messages received");
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
