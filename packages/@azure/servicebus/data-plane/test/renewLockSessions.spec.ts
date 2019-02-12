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
  OnError,
  delay
} from "../lib";
import {
  testMessagesWithSessions,
  testSessionId1,
  purge,
  getSenderReceiverClients,
  ClientType
} from "./testUtils";

let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;

describe("Standard", function(): void {
  const SERVICEBUS_CONNECTION_STRING = check(
    process.env.SERVICEBUS_CONNECTION_STRING,
    "SERVICEBUS_CONNECTION_STRING"
  );
  const namespace = Namespace.createFromConnectionString(SERVICEBUS_CONNECTION_STRING);

  after(async () => {
    await namespace.close();
  });

  describe("Unpartitioned Queue", function(): void {
    describe("Tests - Lock Renewal for Sessions - Peeklock Mode", function(): void {
      beforeEach(async () => {
        const clients = await getSenderReceiverClients(
          namespace,
          ClientType.UnpartitionedQueueWithSessions,
          ClientType.UnpartitionedQueueWithSessions
        );
        senderClient = clients.senderClient;
        receiverClient = clients.receiverClient;
        await beforeEachTest(receiverClient);
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
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          expectSessionLockLostErrorToBeThrown: true
        });
      });

      it("Receive a msg using Streaming Receiver, lock will not expire until configured time", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 38,
          delayBeforeAttemptingToCompleteMessageInSeconds: 35,
          expectSessionLockLostErrorToBeThrown: false
        });
      });

      it("Receive a msg using Streaming Receiver, lock will expire sometime after the configured time", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 35,
          delayBeforeAttemptingToCompleteMessageInSeconds: 80,
          expectSessionLockLostErrorToBeThrown: true
        });
      }).timeout(95000);

      it("Receive a msg using Streaming Receiver, lock renewal does not take place when config value is less than lock duration", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 15,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          expectSessionLockLostErrorToBeThrown: true
        });
      });
    });
  });

  describe("Partitioned Queue", function(): void {
    describe("Tests - Lock Renewal for Sessions - Peeklock Mode", function(): void {
      beforeEach(async () => {
        const clients = await getSenderReceiverClients(
          namespace,
          ClientType.PartitionedQueueWithSessions,
          ClientType.PartitionedQueueWithSessions
        );
        senderClient = clients.senderClient;
        receiverClient = clients.receiverClient;
        await beforeEachTest(receiverClient);
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
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          expectSessionLockLostErrorToBeThrown: true
        });
      });

      it("Receive a msg using Streaming Receiver, lock will not expire until configured time", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 38,
          delayBeforeAttemptingToCompleteMessageInSeconds: 35,
          expectSessionLockLostErrorToBeThrown: false
        });
      });

      it("Receive a msg using Streaming Receiver, lock will expire sometime after the configured time", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 35,
          delayBeforeAttemptingToCompleteMessageInSeconds: 80,
          expectSessionLockLostErrorToBeThrown: true
        });
      }).timeout(95000);

      it("Receive a msg using Streaming Receiver, lock renewal does not take place when config value is less than lock duration", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 15,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          expectSessionLockLostErrorToBeThrown: true
        });
      });
    });
  });

  describe("Unpartitioned Topic/Subscription", function(): void {
    describe("Tests - Lock Renewal for Sessions - Peeklock Mode", function(): void {
      beforeEach(async () => {
        const clients = await getSenderReceiverClients(
          namespace,
          ClientType.UnpartitionedTopicWithSessions,
          ClientType.UnpartitionedSubscriptionWithSessions
        );
        senderClient = clients.senderClient;
        receiverClient = clients.receiverClient;
        await beforeEachTest(receiverClient);
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
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          expectSessionLockLostErrorToBeThrown: true
        });
      });

      it("Receive a msg using Streaming Receiver, lock will not expire until configured time", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 38,
          delayBeforeAttemptingToCompleteMessageInSeconds: 35,
          expectSessionLockLostErrorToBeThrown: false
        });
      });

      it("Receive a msg using Streaming Receiver, lock will expire sometime after the configured time", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 35,
          delayBeforeAttemptingToCompleteMessageInSeconds: 80,
          expectSessionLockLostErrorToBeThrown: true
        });
      }).timeout(95000);

      it("Receive a msg using Streaming Receiver, lock renewal does not take place when config value is less than lock duration", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 15,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          expectSessionLockLostErrorToBeThrown: true
        });
      });
    });
  });

  describe("Partitioned Topic/Subscription", function(): void {
    describe("Tests - Lock Renewal for Sessions - Peeklock Mode", function(): void {
      beforeEach(async () => {
        const clients = await getSenderReceiverClients(
          namespace,
          ClientType.PartitionedTopicWithSessions,
          ClientType.PartitionedSubscriptionWithSessions
        );
        senderClient = clients.senderClient;
        receiverClient = clients.receiverClient;
        await beforeEachTest(receiverClient);
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
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          expectSessionLockLostErrorToBeThrown: true
        });
      });

      it("Receive a msg using Streaming Receiver, lock will not expire until configured time", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 38,
          delayBeforeAttemptingToCompleteMessageInSeconds: 35,
          expectSessionLockLostErrorToBeThrown: false
        });
      });

      it("Receive a msg using Streaming Receiver, lock will expire sometime after the configured time", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 35,
          delayBeforeAttemptingToCompleteMessageInSeconds: 80,
          expectSessionLockLostErrorToBeThrown: true
        });
      }).timeout(95000);

      it("Receive a msg using Streaming Receiver, lock renewal does not take place when config value is less than lock duration", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxSessionAutoRenewLockDurationInSeconds: 15,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          expectSessionLockLostErrorToBeThrown: true
        });
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

async function beforeEachTest(receiverClient: QueueClient | SubscriptionClient): Promise<void> {
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
  await senderClient.getSender().send(testMessagesWithSessions);

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
  should.equal(msgs[0].body, testMessagesWithSessions.body);
  should.equal(msgs[0].messageId, testMessagesWithSessions.messageId);

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
  await senderClient.getSender().send(testMessagesWithSessions);

  let sessionClient = await receiverClient.getSessionReceiver({
    sessionId: testSessionId1,
    maxSessionAutoRenewLockDurationInSeconds: 0
  });
  const msgs = await sessionClient.receiveBatch(1);

  should.equal(Array.isArray(msgs), true);
  should.equal(msgs.length, 1, "Expected message length does not match");
  should.equal(msgs[0].body, testMessagesWithSessions.body);
  should.equal(msgs[0].messageId, testMessagesWithSessions.messageId);

  await delay(lockDurationInMilliseconds + 1000);

  let errorWasThrown: boolean = false;
  await msgs[0].complete().catch((err) => {
    should.equal(err.name, "SessionLockLostError");
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

  await senderClient.getSender().send(testMessagesWithSessions);
  const sessionClient = await receiverClient.getSessionReceiver({
    sessionId: testSessionId1,
    maxSessionAutoRenewLockDurationInSeconds: 0
  });

  const onSessionMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(brokeredMessage.body, testMessagesWithSessions.body);
      should.equal(brokeredMessage.messageId, testMessagesWithSessions.messageId);

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
  expectSessionLockLostErrorToBeThrown: boolean;
}

async function testAutoLockRenewalConfigBehavior(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient,
  options: AutoLockRenewalTestOptions
): Promise<void> {
  let numOfMessagesReceived = 0;

  await senderClient.getSender().send(testMessagesWithSessions);

  const sessionClient = await receiverClient.getSessionReceiver({
    sessionId: testSessionId1,
    maxSessionAutoRenewLockDurationInSeconds: options.maxSessionAutoRenewLockDurationInSeconds
  });

  let sessionLockLostErrorThrown = false;
  const messagesReceived: ServiceBusMessage[] = [];
  await sessionClient.receive(
    async (brokeredMessage: ServiceBusMessage) => {
      if (numOfMessagesReceived < 1) {
        numOfMessagesReceived++;

        should.equal(brokeredMessage.body, testMessagesWithSessions.body);
        should.equal(brokeredMessage.messageId, testMessagesWithSessions.messageId);

        messagesReceived.push(brokeredMessage);

        // Sleeping...
        await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000);
      }
    },
    (err: MessagingError | Error) => {
      if (err.name === "SessionLockLostError") {
        sessionLockLostErrorThrown = true;
      } else {
        onError(err);
      }
    },
    {
      autoComplete: false
    }
  );
  await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000 + 2000);
  should.equal(
    sessionLockLostErrorThrown,
    options.expectSessionLockLostErrorToBeThrown,
    "SessionLockLostErrorThrown flag must match"
  );

  should.equal(messagesReceived.length, 1, "Mismatch in number of messages received");

  let errorWasThrown: boolean = false;
  await messagesReceived[0].complete().catch((err) => {
    should.equal(err.name, "SessionLockLostError");
    errorWasThrown = true;
  });

  should.equal(
    errorWasThrown,
    options.expectSessionLockLostErrorToBeThrown,
    "Error Thrown flag value mismatch"
  );

  await sessionClient.close();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
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
