// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  Namespace,
  QueueClient,
  SendableMessageInfo,
  generateUuid,
  TopicClient,
  SubscriptionClient
} from "../lib";
import { delay } from "rhea-promise";

const testMessage: SendableMessageInfo = {
  body: "hello-world-1",
  messageId: generateUuid()
};

const lockDurationInMilliseconds = 30000;

describe("Lock Renewal in PeekLock mode", function(): void {
  let namespace: Namespace;
  let queueClient: QueueClient;
  let topicClient: TopicClient;
  let subscriptionClient: SubscriptionClient;

  beforeEach(async () => {
    // The tests in this file expect the env variables to contain the connection string and
    // the names of empty queue/topic/subscription that are to be tested

    if (!process.env.SERVICEBUS_CONNECTION_STRING) {
      throw new Error(
        "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
      );
    }
    if (!process.env.TOPIC_NAME) {
      throw new Error("Define TOPIC_NAME in your environment before running integration tests.");
    }
    if (!process.env.QUEUE_NAME) {
      throw new Error("Define QUEUE_NAME in your environment before running integration tests.");
    }
    if (!process.env.SUBSCRIPTION_NAME) {
      throw new Error(
        "Define SUBSCRIPTION_NAME in your environment before running integration tests."
      );
    }

    namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
    queueClient = namespace.createQueueClient(process.env.QUEUE_NAME);
    topicClient = namespace.createTopicClient(process.env.TOPIC_NAME);
    subscriptionClient = namespace.createSubscriptionClient(
      process.env.TOPIC_NAME,
      process.env.SUBSCRIPTION_NAME
    );

    const peekedQueueMsg = await queueClient.peek();
    if (peekedQueueMsg.length) {
      throw new Error("Please use an empty queue for integration testing");
    }

    const peekedSubscriptionMsg = await subscriptionClient.peek();
    if (peekedSubscriptionMsg.length) {
      throw new Error("Please use an empty Subscription for integration testing");
    }
  });

  afterEach(async () => {
    return namespace.close();
  });

  // Tests for Lock Renewal, see -  https://github.com/Azure/azure-service-bus-node/issues/103
  // Receive a msg using Batch Receiver, test renewLock()
  async function testLockRenewalHappyCase(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessage);

    const msgs = await receiverClient.receiveBatch(1);

    // Compute expected initial lock duration
    const expectedLockExpiryTimeUtc = new Date();
    expectedLockExpiryTimeUtc.setSeconds(
      expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
    );

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessage.body);
    should.equal(msgs[0].messageId, testMessage.messageId);

    // Verify actual lock duration is reset
    if (msgs[0].lockedUntilUtc) {
      should.equal(msgs[0].lockedUntilUtc >= expectedLockExpiryTimeUtc, true);
    }

    // Sleeping 10 seconds...
    await delay(10000);

    await receiverClient.renewLock(msgs[0]);

    // Compute expected lock duration after 10 seconds of sleep
    expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 10);

    // Verify actual lock duration is reset
    if (msgs[0].lockedUntilUtc) {
      should.equal(msgs[0].lockedUntilUtc >= expectedLockExpiryTimeUtc, true);
    }

    // Sleeping 5 more seconds...
    await delay(5000);

    await receiverClient.renewLock(msgs[0]);

    // Compute expected lock duration after 5 more seconds of sleep
    expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

    // Verify actual lock duration is reset
    if (msgs[0].lockedUntilUtc) {
      should.equal(msgs[0].lockedUntilUtc >= expectedLockExpiryTimeUtc, true);
    }

    await msgs[0].complete();
  }

  it("Queues - Receives a message using Batch Receiver renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testLockRenewalHappyCase(queueClient, queueClient);
  });

  it("TopicsSubs - Receives a message using Batch Receiver renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testLockRenewalHappyCase(topicClient, subscriptionClient);
  });

  // Receive a msg using Batch Receiver, wait until its lock expires, completing it now results in error
  async function testErrorOnLockExpiry(
    senderClient: QueueClient | TopicClient,
    receiverClient: QueueClient | SubscriptionClient
  ): Promise<void> {
    await senderClient.send(testMessage);

    const msgs = await receiverClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessage.body);
    should.equal(msgs[0].messageId, testMessage.messageId);

    // Sleeping 30 seconds...
    await delay(lockDurationInMilliseconds);

    let errorWasThrown: boolean = false;
    await msgs[0].complete().catch((err) => {
      should.equal(err.name, "MessageLockLostError");
      errorWasThrown = true;
    });

    should.equal(errorWasThrown, true);

    // Clean up any left over messages
    const unprocessedMsgs = await receiverClient.receiveBatch(1);
    await unprocessedMsgs[0].complete();
  }

  it("Queues - Receive a msg using Batch Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
    void
  > {
    await testErrorOnLockExpiry(queueClient, queueClient);
  });

  it("TopicsSubs - Receive a msg using Batch Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
    void
  > {
    await testErrorOnLockExpiry(topicClient, subscriptionClient);
  });
});
