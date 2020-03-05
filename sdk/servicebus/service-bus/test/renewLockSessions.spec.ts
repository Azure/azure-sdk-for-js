// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import {
  MessagingError,
  delay,
  SessionReceiver,
  ReceivedMessage,
  ContextWithSettlement
} from "../src";
import {
  purge,
  getSenderReceiverClients,
  TestClientType,
  TestMessage,
  isMessagingError
} from "./utils/testUtils";
import { Sender } from "../src/sender";

let senderClient: Sender;
let receiverClient: SessionReceiver<"peekLock">;
let maxSessionAutoRenewLockDurationInSeconds: number;
async function beforeEachTest(
  entityType: TestClientType,
  maxSessionAutoRenewLockDurationInSeconds: number
): Promise<void> {
  const clients = await getSenderReceiverClients(entityType, "peekLock", undefined, {
    maxSessionAutoRenewLockDurationInSeconds
  });
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient as SessionReceiver<"peekLock">;

  await purge(receiverClient);
  const peekedMsgs = await receiverClient.diagnostics.peek();
  const receiverEntityType = receiverClient.entityType;
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
}

async function afterEachTest(): Promise<void> {
  await senderClient.close();
  await receiverClient.close();
}

describe("Batch Receiver: renewLock() resets lock duration each time", function(): void {
  beforeEach(() => {
    maxSessionAutoRenewLockDurationInSeconds = 0;
  });

  it("Unpartitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Partitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Unpartitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedSubscriptionWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Partitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedSubscriptionWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });
});

describe("Batch Receiver: complete() after lock expiry with throws error", function(): void {
  beforeEach(() => {
    maxSessionAutoRenewLockDurationInSeconds = 0;
  });

  it("Unpartitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Partitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Unpartitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedSubscriptionWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });

  it("Partitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedSubscriptionWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testBatchReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
  });
});

describe("Streaming Receiver: renewLock() resets lock duration each time", function(): void {
  beforeEach(() => {
    maxSessionAutoRenewLockDurationInSeconds = 0;
  });

  it("Unpartitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Partitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Unpartitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedSubscriptionWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });

  it("Partitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedSubscriptionWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testStreamingReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });
});

describe("Streaming Receiver: complete() after lock expiry with auto-renewal disabled throws error", function(): void {
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
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, options);
  });

  it("Partitioned Queue With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      options.maxSessionAutoRenewLockDurationInSeconds
    );
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, options);
  });

  it("Unpartitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedSubscriptionWithSessions,
      options.maxSessionAutoRenewLockDurationInSeconds
    );
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, options);
  });

  it("Partitioned Subscription With Sessions - Lock Renewal for Sessions", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedSubscriptionWithSessions,
      options.maxSessionAutoRenewLockDurationInSeconds
    );
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, options);
  });
});

describe("Test AutoLockRenewalConfigBehavior - Unpartitioned Queue With Sessions", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  it("Streaming Receiver: lock will not expire until configured time", async function(): Promise<
    void
  > {
    maxSessionAutoRenewLockDurationInSeconds = 38;
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      maxSessionAutoRenewLockDurationInSeconds
    );
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
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
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
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
    await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
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
  receiverClient: SessionReceiver<"peekLock">
): Promise<void> {
  const testMessage = TestMessage.getSessionSample();
  await senderClient.send(testMessage);

  const batch = await receiverClient.receiveBatch(1);
  const msgs = batch.messages;

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

  await batch.context.complete(msgs[0]);
}

/**
 * Test settling of message from Batch Receiver fails after session lock expires
 */
async function testBatchReceiverManualLockRenewalErrorOnLockExpiry(
  senderClient: Sender,
  receiverClient: SessionReceiver<"peekLock">
): Promise<void> {
  const testMessage = TestMessage.getSessionSample();
  await senderClient.send(testMessage);

  const batch = await receiverClient.receiveBatch(1);
  const msgs = batch.messages;

  should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
  should.equal(msgs.length, 1, "Expected message length does not match");
  should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
  should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

  await delay(lockDurationInMilliseconds + 1000);

  let errorWasThrown: boolean = false;
  await batch.context.complete(msgs[0]).catch((err) => {
    should.equal(err.code, "SessionLockLostError", "Error code is different than expected");
    errorWasThrown = true;
  });

  should.equal(errorWasThrown, true, "Error thrown flag must be true");

  // Subsequent receivers for the same session should work as expected.
  const unprocessedMsgsBatch = await receiverClient.receiveBatch(1);
  should.equal(unprocessedMsgsBatch.messages[0].deliveryCount, 1, "Unexpected deliveryCount");
  await unprocessedMsgsBatch.context.complete(unprocessedMsgsBatch.messages[0]);
}

/**
 * Test manual renewLock() using Streaming Receiver with autoLockRenewal disabled
 */
async function testStreamingReceiverManualLockRenewalHappyCase(
  senderClient: Sender,
  receiverClient: SessionReceiver<"peekLock">
): Promise<void> {
  let numOfMessagesReceived = 0;
  const testMessage = TestMessage.getSessionSample();
  await senderClient.send(testMessage);

  async function processMessage(brokeredMessage: ReceivedMessage, context: ContextWithSettlement) {
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

      await context.complete(brokeredMessage);
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
  receiverClient: SessionReceiver<"peekLock">,
  options: AutoLockRenewalTestOptions
): Promise<void> {
  let numOfMessagesReceived = 0;
  const testMessage = TestMessage.getSessionSample();
  await senderClient.send(testMessage);

  let sessionLockLostErrorThrown = false;
  const messagesReceived: ReceivedMessage[] = [];
  let contextToSettle: ContextWithSettlement;

  async function processMessage(
    brokeredMessage: ReceivedMessage,
    context: ContextWithSettlement
  ): Promise<void> {
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
      contextToSettle = context;

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
  should.equal(
    sessionLockLostErrorThrown,
    options.expectSessionLockLostErrorToBeThrown,
    "SessionLockLostErrorThrown flag must match"
  );

  should.equal(messagesReceived.length, 1, "Mismatch in number of messages received");

  let errorWasThrown: boolean = false;
  await contextToSettle!.complete(messagesReceived[0]).catch((err) => {
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
