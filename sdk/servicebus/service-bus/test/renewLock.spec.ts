// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { delay } from "rhea-promise";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";

describe("renew lock", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let senderClient: Sender;
  let receiverClient: Receiver<ReceivedMessageWithLock>;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiverClient = serviceBusClient.test.getPeekLockReceiver(entityNames);

    senderClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!)
    );
  }

  function afterEachTest(): Promise<void> {
    return serviceBusClient.test.afterEach();
  }

  describe("Unpartitioned Queue - Lock Renewal #RunInBrowser", function(): void {
    beforeEach(async () => {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
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
      await testAutoLockRenewalConfigBehavior(
        senderClient,
        receiverClient,
        {
          maxAutoRenewDurationInSeconds: 0,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          willCompleteFail: true
        },
        TestClientType.UnpartitionedQueue
      );
    });

    it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
      void
    > {
      await testAutoLockRenewalConfigBehavior(
        senderClient,
        receiverClient,
        {
          maxAutoRenewDurationInSeconds: 38,
          delayBeforeAttemptingToCompleteMessageInSeconds: 35,
          willCompleteFail: false
        },
        TestClientType.UnpartitionedQueue
      );
    });

    it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
      void
    > {
      await testAutoLockRenewalConfigBehavior(
        senderClient,
        receiverClient,
        {
          maxAutoRenewDurationInSeconds: 35,
          delayBeforeAttemptingToCompleteMessageInSeconds: 55,
          willCompleteFail: true
        },
        TestClientType.UnpartitionedQueue
      );
    }).timeout(95000);

    it("Streaming Receiver: No lock renewal when config value is less than lock duration", async function(): Promise<
      void
    > {
      await testAutoLockRenewalConfigBehavior(
        senderClient,
        receiverClient,
        {
          maxAutoRenewDurationInSeconds: 15,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          willCompleteFail: true
        },
        TestClientType.UnpartitionedQueue
      );
    });
  });

  describe("Partitioned Queue - Lock Renewal", function(): void {
    beforeEach(async () => {
      await beforeEachTest(TestClientType.PartitionedQueue);
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
      await testAutoLockRenewalConfigBehavior(
        senderClient,
        receiverClient,
        {
          maxAutoRenewDurationInSeconds: 0,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          willCompleteFail: true
        },
        TestClientType.PartitionedQueue
      );
    });
  });

  describe("Unpartitioned Subscription - Lock Renewal", function(): void {
    beforeEach(async () => {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
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
      await testAutoLockRenewalConfigBehavior(
        senderClient,
        receiverClient,
        {
          maxAutoRenewDurationInSeconds: 0,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          willCompleteFail: true
        },
        TestClientType.UnpartitionedSubscription
      );
    });
  });

  describe("Partitioned Subscription - Lock Renewal", function(): void {
    beforeEach(async () => {
      await beforeEachTest(TestClientType.PartitionedSubscription);
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
      await testAutoLockRenewalConfigBehavior(
        senderClient,
        receiverClient,
        {
          maxAutoRenewDurationInSeconds: 0,
          delayBeforeAttemptingToCompleteMessageInSeconds: 31,
          willCompleteFail: true
        },
        TestClientType.PartitionedSubscription
      );
    });
  });

  const lockDurationInMilliseconds = 30000;

  let uncaughtErrorFromHandlers: Error | undefined;

  async function processError(err: Error): Promise<void> {
    uncaughtErrorFromHandlers = err;
  }

  /**
   * Test renewLock() after receiving a message using Batch Receiver
   */
  async function testBatchReceiverManualLockRenewalHappyCase(
    senderClient: Sender,
    receiverClient: Receiver<ReceivedMessageWithLock>
  ): Promise<void> {
    const testMessage = TestMessage.getSample();
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

    // Verify initial lock expiry time on the message
    assertTimestampsAreApproximatelyEqual(
      msgs[0].lockedUntilUtc,
      expectedLockExpiryTimeUtc,
      "Initial"
    );

    await delay(5000);
    if (msgs[0].lockToken) {
      await msgs[0].renewLock();
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
    senderClient: Sender,
    receiverClient: Receiver<ReceivedMessageWithLock>
  ): Promise<void> {
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);

    const msgs = await receiverClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Expected message length does not match");
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

    // Sleeping 30 seconds...
    await delay(lockDurationInMilliseconds + 1000);

    let errorWasThrown: boolean = false;
    await msgs[0].complete().catch((err) => {
      should.equal(err.code, "MessageLockLostError", "Error code is different than expected");
      errorWasThrown = true;
    });

    should.equal(errorWasThrown, true, "Error thrown flag must be true");

    // Clean up any left over messages
    const unprocessedMsgsBatch = await receiverClient.receiveBatch(1);
    await unprocessedMsgsBatch[0].complete();
  }

  /**
   * Test renewLock() after receiving a message using Streaming Receiver with autoLockRenewal disabled
   */
  async function testStreamingReceiverManualLockRenewalHappyCase(
    senderClient: Sender,
    receiverClient: Receiver<ReceivedMessageWithLock>
  ): Promise<void> {
    let numOfMessagesReceived = 0;
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);

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
        await brokeredMessage.renewLock();

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
    }

    receiverClient.subscribe(
      { processMessage, processError },
      {
        autoComplete: false,
        maxMessageAutoRenewLockDurationInSeconds: 0
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
    maxAutoRenewDurationInSeconds: number | undefined;
    delayBeforeAttemptingToCompleteMessageInSeconds: number;
    willCompleteFail: boolean;
  }

  async function testAutoLockRenewalConfigBehavior(
    senderClient: Sender,
    receiverClient: Receiver<ReceivedMessageWithLock>,
    options: AutoLockRenewalTestOptions,
    entityType: TestClientType
  ): Promise<void> {
    let numOfMessagesReceived = 0;
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);

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

        // Sleeping...
        await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000);

        let errorWasThrown: boolean = false;
        await brokeredMessage.complete().catch((err) => {
          should.equal(err.code, "MessageLockLostError", "Error code is different than expected");
          errorWasThrown = true;
        });

        should.equal(errorWasThrown, options.willCompleteFail, "Error Thrown flag value mismatch");
      }
    }

    receiverClient.subscribe(
      { processMessage, processError },
      {
        autoComplete: false,
        maxMessageAutoRenewLockDurationInSeconds: options.maxAutoRenewDurationInSeconds
      }
    );
    await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000 + 10000);

    if (uncaughtErrorFromHandlers) {
      chai.assert.fail(uncaughtErrorFromHandlers.message);
    }

    should.equal(numOfMessagesReceived, 1, "Mismatch in number of messages received");

    if (options.willCompleteFail) {
      // Clean up any left over messages
      await receiverClient.close();

      receiverClient = serviceBusClient.test.getPeekLockReceiver(
        await serviceBusClient.test.createTestEntities(entityType)
      );

      const unprocessedMsgsBatch = await receiverClient.receiveBatch(1);
      if (unprocessedMsgsBatch.length) {
        await unprocessedMsgsBatch[0].complete();
      }
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
});
