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
  ServiceBusMessage,
  MessagingError,
  OnError,
  delay,
  ReceiveMode,
  SessionReceiver
} from "../src";
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

  await purge(receiverClient, TestMessage.sessionId);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("Unpartitioned Queue - Lock Renewal for Sessions", function(): void {
  beforeEach(async () => {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
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
      maxSessionAutoRenewLockDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      expectSessionLockLostErrorToBeThrown: true
    });
  });

  it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxSessionAutoRenewLockDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      expectSessionLockLostErrorToBeThrown: false
    });
  });

  it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
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

describe("Partitioned Queue - Lock Renewal for Sessions", function(): void {
  beforeEach(async () => {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );
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
      maxSessionAutoRenewLockDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      expectSessionLockLostErrorToBeThrown: true
    });
  });

  it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxSessionAutoRenewLockDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      expectSessionLockLostErrorToBeThrown: false
    });
  });

  it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
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

describe("Unpartitioned Subscription - Lock Renewal for Sessions", function(): void {
  beforeEach(async () => {
    await beforeEachTest(
      TestClientType.UnpartitionedTopicWithSessions,
      TestClientType.UnpartitionedSubscriptionWithSessions
    );
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
      maxSessionAutoRenewLockDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      expectSessionLockLostErrorToBeThrown: true
    });
  });

  it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxSessionAutoRenewLockDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      expectSessionLockLostErrorToBeThrown: false
    });
  });

  it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
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

describe("Partitioned Subscription - Lock Renewal for Sessions", function(): void {
  beforeEach(async () => {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions
    );
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
      maxSessionAutoRenewLockDurationInSeconds: 0,
      delayBeforeAttemptingToCompleteMessageInSeconds: 31,
      expectSessionLockLostErrorToBeThrown: true
    });
  });

  it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
    void
  > {
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
      maxSessionAutoRenewLockDurationInSeconds: 38,
      delayBeforeAttemptingToCompleteMessageInSeconds: 35,
      expectSessionLockLostErrorToBeThrown: false
    });
  });

  it("Streaming Receiver: lock expires sometime after configured time", async function(): Promise<
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

const lockDurationInMilliseconds = 30000;
// const maxSessionAutoRenewLockDurationInSeconds = 300;
let uncaughtErrorFromHandlers: Error | undefined;

const onError: OnError = (err: MessagingError | Error) => {
  uncaughtErrorFromHandlers = err;
};

/**
 * Test manual renewLock() using Batch Receiver, with autoLockRenewal disabled
 */
async function testBatchReceiverManualLockRenewalHappyCase(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  const testMessage = TestMessage.getSessionSample();
  await senderClient.createSender().send(testMessage);

  const sessionClient = <SessionReceiver>receiverClient.createReceiver(ReceiveMode.peekLock, {
    sessionId: TestMessage.sessionId,
    maxSessionAutoRenewLockDurationInSeconds: 0
  });
  const msgs = await sessionClient.receiveMessages(1);

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
    sessionClient.sessionLockedUntilUtc,
    expectedLockExpiryTimeUtc,
    "Initial"
  );

  await delay(5000);
  await sessionClient.renewSessionLock();

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
  const testMessage = TestMessage.getSessionSample();
  await senderClient.createSender().send(testMessage);

  let sessionClient = receiverClient.createReceiver(ReceiveMode.peekLock, {
    sessionId: TestMessage.sessionId,
    maxSessionAutoRenewLockDurationInSeconds: 0
  });
  const msgs = await sessionClient.receiveMessages(1);

  should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
  should.equal(msgs.length, 1, "Expected message length does not match");
  should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
  should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

  await delay(lockDurationInMilliseconds + 1000);

  let errorWasThrown: boolean = false;
  await msgs[0].complete().catch((err) => {
    should.equal(err.name, "SessionLockLostError", "ErrorName is different than expected");
    errorWasThrown = true;
  });

  should.equal(errorWasThrown, true, "Error thrown flag must be true");

  // Subsequent receivers for the same session should work as expected.
  sessionClient = receiverClient.createReceiver(ReceiveMode.peekLock, {
    sessionId: undefined
  });
  const unprocessedMsgs = await sessionClient.receiveMessages(1);
  should.equal(unprocessedMsgs[0].deliveryCount, 1, "Unexpected deliveryCount");
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
  const testMessage = TestMessage.getSessionSample();
  await senderClient.createSender().send(testMessage);
  const sessionClient = <SessionReceiver>receiverClient.createReceiver(ReceiveMode.peekLock, {
    sessionId: TestMessage.sessionId,
    maxSessionAutoRenewLockDurationInSeconds: 0
  });

  const onSessionMessage = async (brokeredMessage: ServiceBusMessage) => {
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
        sessionClient.sessionLockedUntilUtc,
        expectedLockExpiryTimeUtc,
        "Initial"
      );

      await delay(5000);
      await sessionClient.renewSessionLock();

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

  await sessionClient.registerMessageHandler(onSessionMessage, onError, {
    autoComplete: false
  });
  await delay(10000);
  await sessionClient.close();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
  }

  should.equal(numOfMessagesReceived, 1, "Unexpected number of messages");
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
  const testMessage = TestMessage.getSessionSample();
  await senderClient.createSender().send(testMessage);

  const sessionClient = receiverClient.createReceiver(ReceiveMode.peekLock, {
    sessionId: TestMessage.sessionId,
    maxSessionAutoRenewLockDurationInSeconds: options.maxSessionAutoRenewLockDurationInSeconds
  });

  let sessionLockLostErrorThrown = false;
  const messagesReceived: ServiceBusMessage[] = [];
  await sessionClient.registerMessageHandler(
    async (brokeredMessage: ServiceBusMessage) => {
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
    should.equal(err.name, "SessionLockLostError", "ErrorName is different than expected");
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
