// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { MessagingError, ServiceBusMessage, delay } from "../src";
import { TestClientType, TestMessage, isMessagingError } from "./utils/testUtils";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  getRandomTestClientTypeWithSessions
} from "./utils/testutils2";
import { ServiceBusSender } from "../src/sender";
import { ServiceBusSessionReceiver } from "../src/receivers/sessionReceiver";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";

describe("Session Lock Renewal", () => {
  let sender: ServiceBusSender;
  let receiver: ServiceBusSessionReceiver<ReceivedMessageWithLock>;
  let sessionId: string;

  let serviceBusClient: ServiceBusClientForTests;

  const testClientType = getRandomTestClientTypeWithSessions();

  before(async () => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(maxAutoRenewLockDurationInMs: number): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    sessionId = Date.now().toString();

    receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
      sessionId,
      maxAutoRenewLockDurationInMs
    });

    // Observation -
    // Peeking into an empty session-enabled queue would run into either of the following errors..
    // 1. OperationTimeoutError: Unable to create the amqp receiver 'unpartitioned-queue-sessions-794f89be-3282-8b48-8ae0-a8af43c3ce36'
    //    on amqp session 'local-1_remote-1_connection-2' due to operation timeout.
    // 2. MessagingError: Received an incorrect sessionId 'undefined' while creating the receiver 'unpartitioned-queue-sessions-86662b2b-acdc-1045-8ad4-fa3ab8807871'.

    // getSenderReceiverClients creates brand new queues/topic-subscriptions.
    // Hence, commenting the following code since there is no need to purge/peek into a freshly created entity

    // await purge(receiver);
    // const peekedMsgs = await receiver.peekMessages();
    // const receiverEntityType = receiver.entityType;
    // if (peekedMsgs.length) {
    //   chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    // }
  }

  afterEach(() => {
    return serviceBusClient.test.afterEach();
  });

  it(
    testClientType + ": Batch Receiver: renewLock() resets lock duration each time",
    async function(): Promise<void> {
      await beforeEachTest(0);
      await testBatchReceiverManualLockRenewalHappyCase(sender, receiver);
    }
  );

  it(
    testClientType + ": Batch Receiver: complete() after lock expiry with throws error",
    async function(): Promise<void> {
      await beforeEachTest(0);
      await testBatchReceiverManualLockRenewalErrorOnLockExpiry(testClientType, sender, receiver);
    }
  );

  it(
    testClientType + ": Streaming Receiver: renewLock() resets lock duration each time",
    async function(): Promise<void> {
      await beforeEachTest(0);
      await testStreamingReceiverManualLockRenewalHappyCase(sender, receiver);
    }
  );

  it(
    testClientType +
      ": Streaming Receiver: complete() after lock expiry with auto-renewal disabled throws error",
    async function(): Promise<void> {
      const options: AutoLockRenewalTestOptions = {
        maxAutoRenewLockDurationInMs: 0,
        delayBeforeAttemptingToCompleteMessageInSeconds: 31,
        expectSessionLockLostErrorToBeThrown: true
      };

      await beforeEachTest(options.maxAutoRenewLockDurationInMs);
      await testAutoLockRenewalConfigBehavior(sender, receiver, options);
    }
  );

  it(
    testClientType + ": Streaming Receiver: lock will not expire until configured time",
    async function(): Promise<void> {
      const options: AutoLockRenewalTestOptions = {
        maxAutoRenewLockDurationInMs: 38 * 1000,
        delayBeforeAttemptingToCompleteMessageInSeconds: 35,
        expectSessionLockLostErrorToBeThrown: false
      };

      await beforeEachTest(options.maxAutoRenewLockDurationInMs);
      await testAutoLockRenewalConfigBehavior(sender, receiver, options);
    }
  );

  const lockDurationInMilliseconds = 30000;
  // const maxAutoRenewLockDurationInMs = 300*1000;
  let uncaughtErrorFromHandlers: Error | undefined;

  async function processError(err: MessagingError | Error) {
    uncaughtErrorFromHandlers = err;
  }

  /**
   * Test manual renewLock() using Batch Receiver, with autoLockRenewal disabled
   */
  async function testBatchReceiverManualLockRenewalHappyCase(
    sender: ServiceBusSender,
    receiver: ServiceBusSessionReceiver<ReceivedMessageWithLock>
  ): Promise<void> {
    const testMessage = getTestMessage();
    testMessage.body = `testBatchReceiverManualLockRenewalHappyCase-${Date.now().toString()}`;
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

    // Verify initial lock expiry time on the session
    assertTimestampsAreApproximatelyEqual(
      receiver.sessionLockedUntilUtc,
      expectedLockExpiryTimeUtc,
      "Initial"
    );

    await delay(5000);
    await receiver.renewSessionLock();

    // Compute expected lock expiry time after renewing lock after 5 seconds
    expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

    // Verify lock expiry time after renewLock()
    assertTimestampsAreApproximatelyEqual(
      receiver.sessionLockedUntilUtc,
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
    sender: ServiceBusSender,
    receiver: ServiceBusSessionReceiver<ReceivedMessageWithLock>
  ): Promise<void> {
    const testMessage = getTestMessage();
    testMessage.body = `testBatchReceiverManualLockRenewalErrorOnLockExpiry-${Date.now().toString()}`;
    await sender.sendMessages(testMessage);

    const msgs = await receiver.receiveMessages(1);

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
    receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

    const unprocessedMsgsBatch = await receiver.receiveMessages(1);
    should.equal(unprocessedMsgsBatch[0].deliveryCount, 1, "Unexpected deliveryCount");
    await unprocessedMsgsBatch[0].complete();
  }

  /**
   * Test manual renewLock() using Streaming Receiver with autoLockRenewal disabled
   */
  async function testStreamingReceiverManualLockRenewalHappyCase(
    sender: ServiceBusSender,
    receiver: ServiceBusSessionReceiver<ReceivedMessageWithLock>
  ): Promise<void> {
    let numOfMessagesReceived = 0;
    const testMessage = getTestMessage();
    testMessage.body = `testStreamingReceiverManualLockRenewalHappyCase-${Date.now().toString()}`;
    await sender.sendMessages(testMessage);

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
          receiver.sessionLockedUntilUtc,
          expectedLockExpiryTimeUtc,
          "Initial"
        );

        await delay(5000);
        await receiver.renewSessionLock();

        // Compute expected lock expiry time after renewing lock after 5 seconds
        expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

        // Verify actual expiry time on session after renewal
        assertTimestampsAreApproximatelyEqual(
          receiver.sessionLockedUntilUtc,
          expectedLockExpiryTimeUtc,
          "After renewlock()"
        );

        await brokeredMessage.complete();
      }
    }

    receiver.subscribe(
      { processMessage, processError },
      {
        autoComplete: false
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
    maxAutoRenewLockDurationInMs: number;
    delayBeforeAttemptingToCompleteMessageInSeconds: number;
    expectSessionLockLostErrorToBeThrown: boolean;
  }

  async function testAutoLockRenewalConfigBehavior(
    sender: ServiceBusSender,
    receiver: ServiceBusSessionReceiver<ReceivedMessageWithLock>,
    options: AutoLockRenewalTestOptions
  ): Promise<void> {
    let numOfMessagesReceived = 0;
    const testMessage = getTestMessage();
    testMessage.body = `testAutoLockRenewalConfigBehavior-${Date.now().toString()}`;
    await sender.sendMessages(testMessage);

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

    receiver.subscribe(
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

    await receiver.close();

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
    baseMessage.partitionKey = sessionId;
    return baseMessage;
  }
});
