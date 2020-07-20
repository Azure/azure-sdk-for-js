// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { delay } from "rhea-promise";
import { TestMessage } from "./utils/testUtils";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  getRandomTestClientTypeWithNoSessions
} from "./utils/testutils2";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";

describe("Message Lock Renewal", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock>;

  const testClientType = getRandomTestClientTypeWithNoSessions();

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  beforeEach(async () => {
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);
    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  });

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
  });

  it(
    testClientType + ": Batch Receiver: renewLock() resets lock duration each time.",
    async function(): Promise<void> {
      await testBatchReceiverManualLockRenewalHappyCase(sender, receiver);
    }
  );

  it(
    testClientType + ": Batch Receiver: complete() after lock expiry with throws error",
    async function(): Promise<void> {
      await testBatchReceiverManualLockRenewalErrorOnLockExpiry(sender, receiver);
    }
  );

  it(
    testClientType + ": Streaming Receiver: renewLock() resets lock duration each time.",
    async function(): Promise<void> {
      await testStreamingReceiverManualLockRenewalHappyCase(sender, receiver);
    }
  );

  it(
    testClientType +
      ": Streaming Receiver: complete() after lock expiry with auto-renewal disabled throws error",
    async function(): Promise<void> {
      await testAutoLockRenewalConfigBehavior(sender, receiver, {
        maxAutoRenewDurationInMs: 0,
        delayBeforeAttemptingToCompleteMessageInSeconds: 31,
        willCompleteFail: true
      });
    }
  );

  it(
    testClientType + ": Streaming Receiver: lock will not expire until configured time",
    async function(): Promise<void> {
      await testAutoLockRenewalConfigBehavior(sender, receiver, {
        maxAutoRenewDurationInMs: 38 * 1000,
        delayBeforeAttemptingToCompleteMessageInSeconds: 35,
        willCompleteFail: false
      });
    }
  );

  it(
    testClientType + ": Streaming Receiver: lock expires sometime after configured time",
    async function(): Promise<void> {
      await testAutoLockRenewalConfigBehavior(sender, receiver, {
        maxAutoRenewDurationInMs: 35 * 1000,
        delayBeforeAttemptingToCompleteMessageInSeconds: 55,
        willCompleteFail: true
      });
    }
  ).timeout(95000 + 30000);

  it(
    testClientType +
      ": Streaming Receiver: No lock renewal when config value is less than lock duration",
    async function(): Promise<void> {
      await testAutoLockRenewalConfigBehavior(sender, receiver, {
        maxAutoRenewDurationInMs: 15 * 1000,
        delayBeforeAttemptingToCompleteMessageInSeconds: 31,
        willCompleteFail: true
      });
    }
  );

  const lockDurationInMilliseconds = 30000;

  let uncaughtErrorFromHandlers: Error | undefined;

  async function processError(err: Error): Promise<void> {
    uncaughtErrorFromHandlers = err;
  }

  /**
   * Test renewLock() after receiving a message using Batch Receiver
   */
  async function testBatchReceiverManualLockRenewalHappyCase(
    sender: Sender,
    receiver: Receiver<ReceivedMessageWithLock>
  ): Promise<void> {
    const testMessage = TestMessage.getSample();
    await sender.sendMessages(testMessage);

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
    sender: Sender,
    receiver: Receiver<ReceivedMessageWithLock>
  ): Promise<void> {
    const testMessage = TestMessage.getSample();
    await sender.sendMessages(testMessage);

    const msgs = await receiver.receiveMessages(1);

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
    const unprocessedMsgsBatch = await receiver.receiveMessages(1);
    await unprocessedMsgsBatch[0].complete();
  }

  /**
   * Test renewLock() after receiving a message using Streaming Receiver with autoLockRenewal disabled
   */
  async function testStreamingReceiverManualLockRenewalHappyCase(
    sender: Sender,
    receiver: Receiver<ReceivedMessageWithLock>
  ): Promise<void> {
    let numOfMessagesReceived = 0;
    const testMessage = TestMessage.getSample();
    await sender.sendMessages(testMessage);

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

    receiver.subscribe(
      { processMessage, processError },
      {
        autoComplete: false,
        maxMessageAutoRenewLockDurationInMs: 0
      }
    );
    await delay(10000);
    await receiver.close();

    if (uncaughtErrorFromHandlers) {
      chai.assert.fail(uncaughtErrorFromHandlers.message);
    }

    should.equal(numOfMessagesReceived, 1, "Unexpected number of messages");
  }

  interface AutoLockRenewalTestOptions {
    maxAutoRenewDurationInMs: number | undefined;
    delayBeforeAttemptingToCompleteMessageInSeconds: number;
    willCompleteFail: boolean;
  }

  async function testAutoLockRenewalConfigBehavior(
    sender: Sender,
    receiver: Receiver<ReceivedMessageWithLock>,
    options: AutoLockRenewalTestOptions
  ): Promise<void> {
    let numOfMessagesReceived = 0;
    const testMessage = TestMessage.getSample();
    await sender.sendMessages(testMessage);

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

    receiver.subscribe(
      { processMessage, processError },
      {
        autoComplete: false,
        maxMessageAutoRenewLockDurationInMs: options.maxAutoRenewDurationInMs
      }
    );
    await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000 + 10000);

    if (uncaughtErrorFromHandlers) {
      chai.assert.fail(uncaughtErrorFromHandlers.message);
    }

    should.equal(numOfMessagesReceived, 1, "Mismatch in number of messages received");

    if (options.willCompleteFail) {
      // Clean up any left over messages
      await receiver.close();

      receiver = await serviceBusClient.test.getPeekLockReceiver(
        await serviceBusClient.test.createTestEntities(testClientType)
      );

      const unprocessedMsgsBatch = await receiver.receiveMessages(1);
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
        Math.pow((actualTimeInUTC.valueOf() - expectedTimeInUTC.valueOf()) / 1000, 2) < 9, // Within +/- 3 seconds
        true,
        `${label}: Actual time ${actualTimeInUTC} must be approximately equal to ${expectedTimeInUTC}`
      );
    }
  }
});
