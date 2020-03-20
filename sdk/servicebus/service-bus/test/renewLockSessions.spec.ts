// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { MessagingError, delay, ServiceBusMessage } from "../src";
import { TestClientType, TestMessage, isMessagingError } from "./utils/testUtils";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { Sender } from "../src/sender";
import { SessionReceiver } from "../src/receivers/sessionReceiver";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";

describe("renew lock sessions", () => {
  let sender: Sender;
  let receiver: SessionReceiver<ReceivedMessageWithLock>;
  let maxSessionAutoRenewLockDurationInSeconds: number;
  let sessionId: string;

  let serviceBusClient: ServiceBusClientForTests;

  before(async () => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(
    entityType: TestClientType,
    maxSessionAutoRenewLockDurationInSeconds: number
  ): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!)
    );

    sessionId = Date.now().toString();

    receiver = serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
      sessionId,
      maxSessionAutoRenewLockDurationInSeconds
    });

    // Observation -
    // Peeking into an empty session-enabled queue would run into either of the following errors..
    // 1. OperationTimeoutError: Unable to create the amqp receiver 'unpartitioned-queue-sessions-794f89be-3282-8b48-8ae0-a8af43c3ce36'
    //    on amqp session 'local-1_remote-1_connection-2' due to operation timeout.
    // 2. MessagingError: Received an incorrect sessionId 'undefined' while creating the receiver 'unpartitioned-queue-sessions-86662b2b-acdc-1045-8ad4-fa3ab8807871'.

    // getSenderReceiverClients creates brand new queues/topic-subscriptions.
    // Hence, commenting the following code since there is no need to purge/peek into a freshly created entity

    // await purge(receiverClient);
    // const peekedMsgs = await receiverClient.diagnostics.peek();
    // const receiverEntityType = receiverClient.entityType;
    // if (peekedMsgs.length) {
    //   chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    // }
  }

  describe("Batch Receiver: renewLock() resets lock duration each time", function(): void {
    beforeEach(() => {
      maxSessionAutoRenewLockDurationInSeconds = 0;
    });

    afterEach(() => {
      return serviceBusClient.test.afterEach();
    });

    it("Unpartitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testBatchReceiverManualLockRenewalHappyCase(sender, receiver);
    });

    it("Partitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedQueueWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testBatchReceiverManualLockRenewalHappyCase(sender, receiver);
    });

    it("Unpartitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedSubscriptionWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testBatchReceiverManualLockRenewalHappyCase(sender, receiver);
    });

    it("Partitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedSubscriptionWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testBatchReceiverManualLockRenewalHappyCase(sender, receiver);
    });
  });

  describe("Batch Receiver: complete() after lock expiry with throws error", function(): void {
    beforeEach(() => {
      maxSessionAutoRenewLockDurationInSeconds = 0;
    });

    afterEach(() => {
      return serviceBusClient.test.afterEach();
    });

    it("Unpartitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testBatchReceiverManualLockRenewalErrorOnLockExpiry(
        TestClientType.UnpartitionedQueueWithSessions,
        sender,
        receiver
      );
    });

    it("Partitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedQueueWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testBatchReceiverManualLockRenewalErrorOnLockExpiry(
        TestClientType.PartitionedQueueWithSessions,
        sender,
        receiver
      );
    });

    it("Unpartitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedSubscriptionWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testBatchReceiverManualLockRenewalErrorOnLockExpiry(
        TestClientType.UnpartitionedSubscriptionWithSessions,
        sender,
        receiver
      );
    });

    it("Partitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedSubscriptionWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testBatchReceiverManualLockRenewalErrorOnLockExpiry(
        TestClientType.PartitionedSubscriptionWithSessions,
        sender,
        receiver
      );
    });
  });

  describe("Streaming Receiver: renewLock() resets lock duration each time", function(): void {
    beforeEach(() => {
      maxSessionAutoRenewLockDurationInSeconds = 0;
    });

    afterEach(() => {
      return serviceBusClient.test.afterEach();
    });

    it("Unpartitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testStreamingReceiverManualLockRenewalHappyCase(sender, receiver);
    });

    it("Partitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedQueueWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testStreamingReceiverManualLockRenewalHappyCase(sender, receiver);
    });

    it("Unpartitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedSubscriptionWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testStreamingReceiverManualLockRenewalHappyCase(sender, receiver);
    });

    it("Partitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedSubscriptionWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testStreamingReceiverManualLockRenewalHappyCase(sender, receiver);
    });
  });

  describe("Streaming Receiver: complete() after lock expiry with auto-renewal disabled throws error", function(): void {
    afterEach(() => {
      return serviceBusClient.test.afterEach();
    });

    const options: AutoLockRenewalTestOptions = {
      maxSessionAutoRenewLockDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      expectSessionLockLostErrorToBeThrown: true
    };

    it("Unpartitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        options.maxSessionAutoRenewLockDurationInSeconds
      );
      await testAutoLockRenewalConfigBehavior(sender, receiver, options);
    });

    it("Partitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedQueueWithSessions,
        options.maxSessionAutoRenewLockDurationInSeconds
      );
      await testAutoLockRenewalConfigBehavior(sender, receiver, options);
    });

    it("Unpartitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedSubscriptionWithSessions,
        options.maxSessionAutoRenewLockDurationInSeconds
      );
      await testAutoLockRenewalConfigBehavior(sender, receiver, options);
    });

    it("Partitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedSubscriptionWithSessions,
        options.maxSessionAutoRenewLockDurationInSeconds
      );
      await testAutoLockRenewalConfigBehavior(sender, receiver, options);
    });
  });

  describe("Test AutoLockRenewalConfigBehavior - Unpartitioned Queue With Sessions", function(): void {
    afterEach(() => {
      return serviceBusClient.test.afterEach();
    });

    it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
      void
    > {
      maxSessionAutoRenewLockDurationInSeconds = 38;
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testAutoLockRenewalConfigBehavior(sender, receiver, {
        maxSessionAutoRenewLockDurationInSeconds,
        delayBeforeAttemptingToCompleteMessageInSeconds: 35,
        expectSessionLockLostErrorToBeThrown: false
      });
    });

    it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
      void
    > {
      maxSessionAutoRenewLockDurationInSeconds = 35;
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testAutoLockRenewalConfigBehavior(sender, receiver, {
        maxSessionAutoRenewLockDurationInSeconds,
        delayBeforeAttemptingToCompleteMessageInSeconds: 80,
        expectSessionLockLostErrorToBeThrown: true
      });
    }).timeout(95000);

    it("Receive a msg using Streaming Receiver, lock renewal does not take place when config value is less than lock duration", async function(): Promise<
      void
    > {
      maxSessionAutoRenewLockDurationInSeconds = 15;
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        maxSessionAutoRenewLockDurationInSeconds
      );
      await testAutoLockRenewalConfigBehavior(sender, receiver, {
        maxSessionAutoRenewLockDurationInSeconds,
        delayBeforeAttemptingToCompleteMessageInSeconds: 31,
        expectSessionLockLostErrorToBeThrown: true
      });
    });
  });

  const lockDurationInMilliseconds = 30000;
  // const maxSessionAutoRenewLockDurationInSeconds = 300;
  let uncaughtErrorFromHandlers: Error | undefined;

  async function processError(err: MessagingError | Error) {
    uncaughtErrorFromHandlers = err;
  }

  /**
   * Test manual renewLock() using Batch Receiver, with autoLockRenewal disabled
   */
  async function testBatchReceiverManualLockRenewalHappyCase(
    senderClient: Sender,
    receiverClient: SessionReceiver<ReceivedMessageWithLock>
  ): Promise<void> {
    const testMessage = getTestMessage();
    testMessage.body = `testBatchReceiverManualLockRenewalHappyCase-${Date.now().toString()}`;
    await senderClient.send(testMessage);

    const msgs = await receiverClient.receiveBatch(1);

    // Compute expected initial lock expiry time
    const expectedLockExpiryTimeUtc = new Date();
    expectedLockExpiryTimeUtc.setSeconds(
      expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
    );

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

    // Verify initial lock expiry time on the session
    assertTimestampsAreApproximatelyEqual(
      receiverClient.sessionLockedUntilUtc,
      expectedLockExpiryTimeUtc,
      "Initial"
    );

    await delay(5000);
    await receiverClient.renewSessionLock();

    // Compute expected lock expiry time after renewing lock after 5 seconds
    expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

    // Verify lock expiry time after renewLock()
    assertTimestampsAreApproximatelyEqual(
      receiverClient.sessionLockedUntilUtc,
      expectedLockExpiryTimeUtc,
      "After renewlock()"
    );

    await msgs[0].complete();
  }

  /**
   * Test settling of message from Batch Receiver fails after session lock expires
   */
  async function testBatchReceiverManualLockRenewalErrorOnLockExpiry(
    entityType: TestClientType,
    senderClient: Sender,
    receiver: SessionReceiver<ReceivedMessageWithLock>
  ): Promise<void> {
    const testMessage = getTestMessage();
    testMessage.body = `testBatchReceiverManualLockRenewalErrorOnLockExpiry-${Date.now().toString()}`;
    await senderClient.send(testMessage);

    const msgs = await receiver.receiveBatch(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Expected message length does not match");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

    await delay(lockDurationInMilliseconds + 1000);

    let errorWasThrown: boolean = false;
    await msgs[0].complete().catch((err) => {
      should.equal(err.code, "SessionLockLostError", "Error code is different than expected");
      errorWasThrown = true;
    });

    should.equal(errorWasThrown, true, "Error thrown flag must be true");

    // Clean up the messages.
    await receiver.close();

    const entityNames = serviceBusClient.test.getTestEntities(entityType);
    receiver = serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

    const unprocessedMsgsBatch = await receiver.receiveBatch(1);
    should.equal(unprocessedMsgsBatch[0].deliveryCount, 1, "Unexpected deliveryCount");
    await unprocessedMsgsBatch[0].complete();
  }

  /**
   * Test manual renewLock() using Streaming Receiver with autoLockRenewal disabled
   */
  async function testStreamingReceiverManualLockRenewalHappyCase(
    senderClient: Sender,
    receiverClient: SessionReceiver<ReceivedMessageWithLock>
  ): Promise<void> {
    let numOfMessagesReceived = 0;
    const testMessage = getTestMessage();
    testMessage.body = `testStreamingReceiverManualLockRenewalHappyCase-${Date.now().toString()}`;
    await senderClient.send(testMessage);

    async function processMessage(brokeredMessage: ReceivedMessageWithLock) {
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

        // Verify initial expiry time on session
        assertTimestampsAreApproximatelyEqual(
          receiverClient.sessionLockedUntilUtc,
          expectedLockExpiryTimeUtc,
          "Initial"
        );

        await delay(5000);
        await receiverClient.renewSessionLock();

        // Compute expected lock expiry time after renewing lock after 5 seconds
        expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

        // Verify actual expiry time on session after renewal
        assertTimestampsAreApproximatelyEqual(
          receiverClient.sessionLockedUntilUtc,
          expectedLockExpiryTimeUtc,
          "After renewlock()"
        );

        await brokeredMessage.complete();
      }
    }

    receiverClient.subscribe(
      { processMessage, processError },
      {
        autoComplete: false
      }
    );
    await delay(10000);
    await receiverClient.close();

    if (uncaughtErrorFromHandlers) {
      chai.assert.fail(uncaughtErrorFromHandlers.message);
    }

    should.equal(numOfMessagesReceived, 1, "Unexpected number of messages");
  }

  interface AutoLockRenewalTestOptions {
    maxSessionAutoRenewLockDurationInSeconds: number;
    delayBeforeAttemptingToCompleteMessageInSeconds: number;
    expectSessionLockLostErrorToBeThrown: boolean;
  }

  async function testAutoLockRenewalConfigBehavior(
    senderClient: Sender,
    receiverClient: SessionReceiver<ReceivedMessageWithLock>,
    options: AutoLockRenewalTestOptions
  ): Promise<void> {
    let numOfMessagesReceived = 0;
    const testMessage = getTestMessage();
    testMessage.body = `testAutoLockRenewalConfigBehavior-${Date.now().toString()}`;
    await senderClient.send(testMessage);

    let sessionLockLostErrorThrown = false;
    const messagesReceived: ReceivedMessageWithLock[] = [];

    async function processMessage(brokeredMessage: ReceivedMessageWithLock): Promise<void> {
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

        messagesReceived.push(brokeredMessage);

        // Sleeping...
        await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000);
      }
    }

    receiverClient.subscribe(
      {
        processMessage,
        async processError(err: MessagingError | Error) {
          if (isMessagingError(err) && err.code === "SessionLockLostError") {
            sessionLockLostErrorThrown = true;
          } else {
            uncaughtErrorFromHandlers = err;
          }
        }
      },
      {
        autoComplete: false
      }
    );

    await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000 + 2000);

    should.not.exist(uncaughtErrorFromHandlers?.message);
    should.equal(
      sessionLockLostErrorThrown,
      options.expectSessionLockLostErrorToBeThrown,
      "SessionLockLostErrorThrown flag must match"
    );

    should.equal(messagesReceived.length, 1, "Mismatch in number of messages received");

    let errorWasThrown: boolean = false;
    await messagesReceived[0].complete().catch((err) => {
      should.equal(err.code, "SessionLockLostError", "Error code is different than expected");
      errorWasThrown = true;
    });

    should.equal(
      errorWasThrown,
      options.expectSessionLockLostErrorToBeThrown,
      "Error Thrown flag value mismatch"
    );

    await receiverClient.close();

    if (uncaughtErrorFromHandlers) {
      chai.assert.fail(uncaughtErrorFromHandlers.message);
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

  function getTestMessage(): ServiceBusMessage {
    const baseMessage = TestMessage.getSessionSample();
    baseMessage.sessionId = sessionId;
    return baseMessage;
  }
});
