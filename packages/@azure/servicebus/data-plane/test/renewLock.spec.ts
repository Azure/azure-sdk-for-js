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
  generateUuid,
  TopicClient,
  SubscriptionClient,
  OnMessage,
  ServiceBusMessage,
  MessagingError,
  OnError
} from "../lib";
import { delay } from "rhea-promise";

// Template starts

/*
  .env variables used

  PREMIUM_SERVICEBUS_CONNECTION_STRING=
  PREMIUM_QUEUE=unpartitioned-queue
  PREMIUM_QUEUE_SESSION=unpartitioned-sessions-queue
  PREMIUM_TOPIC=unpartitioned-topic
  PREMIUM_TOPIC_SESSION=unpartitioned-sessions-topic
  PREMIUM_SUBSCRIPTION=unpartitioned-subscription
  PREMIUM_SUBSCRIPTION_SESSION=unpartitioned-sessions-subscription

  STANDARD_SERVICEBUS_CONNECTION_STRING=
  STANDARD_QUEUE_PARTITION=partitioned-queue
  STANDARD_QUEUE=unpartitioned-queue
  STANDARD_QUEUE_PARTITION_SESSION=partitioned-sessions-queue
  STANDARD_QUEUE_SESSION=unpartitioned-sessions-queue
  STANDARD_TOPIC_PARTITION=partitioned-topic
  STANDARD_TOPIC=unpartitioned-topic
  STANDARD_TOPIC_PARTITION_SESSION=partitioned-sessions-topic
  STANDARD_TOPIC_SESSION=unpartitioned-sessions-topic
  STANDARD_SUBSCRIPTION_PARTITION=partitioned-subscription
  STANDARD_SUBSCRIPTION=unpartitioned-subscription
  STANDARD_SUBSCRIPTION_PARTITION_SESSION=partitioned-sessions-subscription
  STANDARD_SUBSCRIPTION_SESSION=unpartitioned-sessions-subscription

  BASIC_SERVICEBUS_CONNECTION_STRING=
  BASIC_QUEUE_PARTITION=partitioned-queue
  BASIC_QUEUE=unpartitioned-queue

*/

describe("Premium", function(): void {
  const PREMIUM_SERVICEBUS_CONNECTION_STRING = check(
    process.env.PREMIUM_SERVICEBUS_CONNECTION_STRING,
    "PREMIUM_SERVICEBUS_CONNECTION_STRING"
  );
  const namespace = Namespace.createFromConnectionString(PREMIUM_SERVICEBUS_CONNECTION_STRING);

  const PREMIUM_QUEUE = check(process.env.PREMIUM_QUEUE, "PREMIUM_QUEUE");
  describe("Unpartitioned Queues", function(): void {
    const senderClient = namespace.createQueueClient(PREMIUM_QUEUE);
    const receiverClient = senderClient;

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        await beforeEachTest();
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

      it("Receive a msg using Streaming Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
        void
      > {
        await testStreamingReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
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

      it("Receive a msg using Streaming Receiver, lock will not expire until 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 299,
          willCompleteFail: false
        });
      }).timeout(450000);

      it("Receive a msg using Streaming Receiver, lock will expire sometime after 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 400,
          willCompleteFail: true
        });
      }).timeout(450000);

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

  const PREMIUM_TOPIC = check(process.env.PREMIUM_TOPIC, "PREMIUM_TOPIC");
  const PREMIUM_SUBSCRIPTION = check(process.env.PREMIUM_SUBSCRIPTION, "PREMIUM_SUBSCRIPTION");
  describe("Unpartitioned Topic/Subscription", function(): void {
    const senderClient = namespace.createTopicClient(PREMIUM_TOPIC);
    const receiverClient = namespace.createSubscriptionClient(PREMIUM_TOPIC, PREMIUM_SUBSCRIPTION);

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        await beforeEachTest();
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

      it("Receive a msg using Streaming Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
        void
      > {
        await testStreamingReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
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

      it("Receive a msg using Streaming Receiver, lock will not expire until 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 299,
          willCompleteFail: false
        });
      }).timeout(450000);

      it("Receive a msg using Streaming Receiver, lock will expire sometime after 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 400,
          willCompleteFail: true
        });
      }).timeout(450000);

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

describe("Standard", function(): void {
  const STANDARD_SERVICEBUS_CONNECTION_STRING = check(
    process.env.STANDARD_SERVICEBUS_CONNECTION_STRING,
    "STANDARD_SERVICEBUS_CONNECTION_STRING"
  );
  const namespace = Namespace.createFromConnectionString(STANDARD_SERVICEBUS_CONNECTION_STRING);

  const STANDARD_QUEUE = check(process.env.STANDARD_QUEUE, "STANDARD_QUEUE");
  describe("Unpartitioned Queues", function(): void {
    const senderClient = namespace.createQueueClient(STANDARD_QUEUE);
    const receiverClient = senderClient;

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        await beforeEachTest();
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

      it("Receive a msg using Streaming Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
        void
      > {
        await testStreamingReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
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

      it("Receive a msg using Streaming Receiver, lock will not expire until 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 299,
          willCompleteFail: false
        });
      }).timeout(450000);

      it("Receive a msg using Streaming Receiver, lock will expire sometime after 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 400,
          willCompleteFail: true
        });
      }).timeout(450000);

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

  const STANDARD_QUEUE_PARTITION = check(
    process.env.STANDARD_QUEUE_PARTITION,
    "STANDARD_QUEUE_PARTITION"
  );
  describe("Partitioned Queues", function(): void {
    const senderClient = namespace.createQueueClient(STANDARD_QUEUE_PARTITION);
    const receiverClient = senderClient;

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        await beforeEachTest();
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

      it("Receive a msg using Streaming Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
        void
      > {
        await testStreamingReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
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

      it("Receive a msg using Streaming Receiver, lock will not expire until 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 299,
          willCompleteFail: false
        });
      }).timeout(450000);

      it("Receive a msg using Streaming Receiver, lock will expire sometime after 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 400,
          willCompleteFail: true
        });
      }).timeout(450000);

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

  const STANDARD_TOPIC = check(process.env.STANDARD_TOPIC, "STANDARD_TOPIC");
  const STANDARD_SUBSCRIPTION = check(process.env.STANDARD_SUBSCRIPTION, "STANDARD_SUBSCRIPTION");
  describe("Unpartitioned Topic/Subscription", function(): void {
    const senderClient = namespace.createTopicClient(STANDARD_TOPIC);
    const receiverClient = namespace.createSubscriptionClient(
      STANDARD_TOPIC,
      STANDARD_SUBSCRIPTION
    );

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        await beforeEachTest();
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

      it("Receive a msg using Streaming Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
        void
      > {
        await testStreamingReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
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

      it("Receive a msg using Streaming Receiver, lock will not expire until 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 299,
          willCompleteFail: false
        });
      }).timeout(450000);

      it("Receive a msg using Streaming Receiver, lock will expire sometime after 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 400,
          willCompleteFail: true
        });
      }).timeout(450000);

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

  const STANDARD_TOPIC_PARTITION = check(
    process.env.STANDARD_TOPIC_PARTITION,
    "STANDARD_TOPIC_PARTITION"
  );
  const STANDARD_SUBSCRIPTION_PARTITION = check(
    process.env.STANDARD_SUBSCRIPTION_PARTITION,
    "STANDARD_SUBSCRIPTION_PARTITION"
  );
  describe("Partitioned Topic/Subscription", function(): void {
    const senderClient = namespace.createTopicClient(STANDARD_TOPIC_PARTITION);
    const receiverClient = namespace.createSubscriptionClient(
      STANDARD_TOPIC_PARTITION,
      STANDARD_SUBSCRIPTION_PARTITION
    );

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        await beforeEachTest();
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

      it("Receive a msg using Streaming Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
        void
      > {
        await testStreamingReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
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

      it("Receive a msg using Streaming Receiver, lock will not expire until 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 299,
          willCompleteFail: false
        });
      }).timeout(450000);

      it("Receive a msg using Streaming Receiver, lock will expire sometime after 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 400,
          willCompleteFail: true
        });
      }).timeout(450000);

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

describe("Basic", function(): void {
  const BASIC_SERVICEBUS_CONNECTION_STRING = check(
    process.env.BASIC_SERVICEBUS_CONNECTION_STRING,
    "BASIC_SERVICEBUS_CONNECTION_STRING"
  );
  const namespace = Namespace.createFromConnectionString(BASIC_SERVICEBUS_CONNECTION_STRING);

  const BASIC_QUEUE = check(process.env.BASIC_QUEUE, "BASIC_QUEUE");
  describe("Unpartitioned Queues", function(): void {
    const senderClient = namespace.createQueueClient(BASIC_QUEUE);
    const receiverClient = senderClient;

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        await beforeEachTest();
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

      it("Receive a msg using Streaming Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
        void
      > {
        await testStreamingReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
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

      it("Receive a msg using Streaming Receiver, lock will not expire until 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 299,
          willCompleteFail: false
        });
      }).timeout(450000);

      it("Receive a msg using Streaming Receiver, lock will expire sometime after 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 400,
          willCompleteFail: true
        });
      }).timeout(450000);

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

  const BASIC_QUEUE_PARTITION = check(process.env.BASIC_QUEUE_PARTITION, "BASIC_QUEUE_PARTITION");
  describe("Partitioned Queues", function(): void {
    const senderClient = namespace.createQueueClient(BASIC_QUEUE_PARTITION);
    const receiverClient = senderClient;

    describe("Tests - Lock Renewal - Peeklock Mode", function(): void {
      beforeEach(async () => {
        await beforeEachTest();
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

      it("Receive a msg using Streaming Receiver, wait until its lock expires, completing it now results in error", async function(): Promise<
        void
      > {
        await testStreamingReceiverManualLockRenewalErrorOnLockExpiry(senderClient, receiverClient);
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

      it("Receive a msg using Streaming Receiver, lock will not expire until 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 299,
          willCompleteFail: false
        });
      }).timeout(450000);

      it("Receive a msg using Streaming Receiver, lock will expire sometime after 300 seconds when config value is undefined", async function(): Promise<
        void
      > {
        await testAutoLockRenewalConfigBehavior(senderClient, receiverClient, {
          maxAutoRenewDurationInSeconds: undefined,
          delayBeforeAttemptingToCompleteMessageInSeconds: 400,
          willCompleteFail: true
        });
      }).timeout(450000);

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

const lockDurationInMilliseconds = 30000;

let uncaughtErrorFromHandlers: Error | undefined;

const onError: OnError = (err: MessagingError | Error) => {
  uncaughtErrorFromHandlers = err;
};

let testMessage: any;

async function beforeEachTest(): Promise<void> {
  testMessage = {
    body: `hello-world-1 : ${generateUuid()}`,
    messageId: generateUuid()
  };
}

// Tests for Lock Renewal
// See -  https://github.com/Azure/azure-service-bus-node/issues/103
// Receive a msg using Batch Receiver, test renewLock()
async function testBatchReceiverManualLockRenewalHappyCase(
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
  assertTimestampsAreApproximatelyEqual(
    msgs[0].lockedUntilUtc,
    expectedLockExpiryTimeUtc,
    "Initial"
  );

  // Sleeping 10 seconds...
  await delay(10000);

  await receiverClient.renewLock(msgs[0]);

  // Compute expected lock duration after 10 seconds of sleep
  expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 10);

  // Verify actual lock duration is reset
  assertTimestampsAreApproximatelyEqual(
    msgs[0].lockedUntilUtc,
    expectedLockExpiryTimeUtc,
    "After first renewal"
  );

  // Sleeping 5 more seconds...
  await delay(5000);

  await receiverClient.renewLock(msgs[0]);

  // Compute expected lock duration after 5 more seconds of sleep
  expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

  // Verify actual lock duration is reset
  assertTimestampsAreApproximatelyEqual(
    msgs[0].lockedUntilUtc,
    expectedLockExpiryTimeUtc,
    "After second renewal"
  );

  await msgs[0].complete();
}

// Receive a msg using Batch Receiver, wait until its lock expires, completing it now results in error
async function testBatchReceiverManualLockRenewalErrorOnLockExpiry(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  await senderClient.send(testMessage);

  const msgs = await receiverClient.receiveBatch(1);

  should.equal(Array.isArray(msgs), true);
  should.equal(msgs.length, 1, "Expected message length does not match");
  should.equal(msgs[0].body, testMessage.body);
  should.equal(msgs[0].messageId, testMessage.messageId);

  // Sleeping 30 seconds...
  await delay(lockDurationInMilliseconds + 1000);

  let errorWasThrown: boolean = false;
  await msgs[0].complete().catch((err) => {
    should.equal(err.name, "MessageLockLostError");
    errorWasThrown = true;
  });

  should.equal(errorWasThrown, true, "Error thrown flag must be true");

  // Clean up any left over messages
  const unprocessedMsgs = await receiverClient.receiveBatch(1);
  await unprocessedMsgs[0].complete();
}

// Tests for Lock Renewal, see -  https://github.com/Azure/azure-service-bus-node/issues/103
// Receive a msg using Batch Receiver, test renewLock()
async function testStreamingReceiverManualLockRenewalHappyCase(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  let numOfMessagesReceived = 0;

  await senderClient.send(testMessage);

  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(brokeredMessage.body, testMessage.body);
      should.equal(brokeredMessage.messageId, testMessage.messageId);

      // Compute expected initial lock duration
      const expectedLockExpiryTimeUtc = new Date();
      expectedLockExpiryTimeUtc.setSeconds(
        expectedLockExpiryTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
      );

      // Verify actual lock duration is reset
      assertTimestampsAreApproximatelyEqual(
        brokeredMessage.lockedUntilUtc,
        expectedLockExpiryTimeUtc,
        "Initial"
      );

      // Sleeping 10 seconds...
      await delay(10000);

      await receiverClient.renewLock(brokeredMessage);

      // Compute expected lock duration after 10 seconds of sleep
      expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 10);

      // Verify actual lock duration is reset
      assertTimestampsAreApproximatelyEqual(
        brokeredMessage.lockedUntilUtc,
        expectedLockExpiryTimeUtc,
        "After first renewal"
      );

      // Sleeping 5 more seconds...
      await delay(5000);

      await receiverClient.renewLock(brokeredMessage);

      // Compute expected lock duration after 5 more seconds of sleep
      expectedLockExpiryTimeUtc.setSeconds(expectedLockExpiryTimeUtc.getSeconds() + 5);

      // Verify actual lock duration is reset
      assertTimestampsAreApproximatelyEqual(
        brokeredMessage.lockedUntilUtc,
        expectedLockExpiryTimeUtc,
        "After second renewal"
      );

      await brokeredMessage.complete();
    }
  };

  const receiveListener = receiverClient.receive(onMessage, onError, {
    autoComplete: false,
    maxAutoRenewDurationInSeconds: 0
  });
  await delay(40000);
  await receiveListener.stop();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
  }

  should.equal(numOfMessagesReceived, 1);
}

// Receive a msg using Batch Receiver, wait until its lock expires, completing it now results in error
async function testStreamingReceiverManualLockRenewalErrorOnLockExpiry(
  senderClient: QueueClient | TopicClient,
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  let numOfMessagesReceived = 0;

  await senderClient.send(testMessage);

  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(brokeredMessage.body, testMessage.body);
      should.equal(brokeredMessage.messageId, testMessage.messageId);

      // Sleeping 30 seconds...
      await delay(lockDurationInMilliseconds + 1000);

      let errorWasThrown: boolean = false;
      await brokeredMessage.complete().catch(() => {
        // should.equal(err.name, "MessageLockLostError");
        errorWasThrown = true;
      });

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    }
  };

  const receiveListener = receiverClient.receive(onMessage, onError, {
    autoComplete: false,
    maxAutoRenewDurationInSeconds: 0
  });
  await delay(lockDurationInMilliseconds + 5000);
  await receiveListener.stop();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
  }

  should.equal(numOfMessagesReceived, 1);

  // Clean up any left over messages
  const unprocessedMsgs = await receiverClient.receiveBatch(1);
  await unprocessedMsgs[0].complete();
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

  await senderClient.send(testMessage);

  const onMessage: OnMessage = async (brokeredMessage: ServiceBusMessage) => {
    if (numOfMessagesReceived < 1) {
      numOfMessagesReceived++;

      should.equal(brokeredMessage.body, testMessage.body);
      should.equal(brokeredMessage.messageId, testMessage.messageId);

      // Compute expected initial lock duration
      const initialTimeUtc = new Date();
      const expectedLockExpiryTimeUtc = new Date();

      expectedLockExpiryTimeUtc.setSeconds(
        initialTimeUtc.getSeconds() + lockDurationInMilliseconds / 1000
      );

      // Verify actual lock duration is reset
      assertTimestampsAreApproximatelyEqual(
        brokeredMessage.lockedUntilUtc,
        expectedLockExpiryTimeUtc,
        "Initial"
      );

      // Sleeping...
      await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000);

      let errorWasThrown: boolean = false;
      await brokeredMessage.complete().catch((err) => {
        should.equal(err.name, "MessageLockLostError");
        errorWasThrown = true;
      });

      should.equal(errorWasThrown, options.willCompleteFail, "Error Thrown flag value mismatch");
    }
  };

  const receiveListener = receiverClient.receive(onMessage, onError, {
    autoComplete: false,
    maxAutoRenewDurationInSeconds: options.maxAutoRenewDurationInSeconds
  });
  await delay(options.delayBeforeAttemptingToCompleteMessageInSeconds * 1000 + 10000);
  await receiveListener.stop();

  if (uncaughtErrorFromHandlers) {
    chai.assert.fail(uncaughtErrorFromHandlers.message);
  }

  should.equal(numOfMessagesReceived, 1, "Mismatch in number of messages received");

  if (options.willCompleteFail) {
    // Clean up any left over messages
    const unprocessedMsgs = await receiverClient.receiveBatch(1);
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
      Math.pow((actualTimeInUTC.valueOf() - expectedTimeInUTC.valueOf()) / 1000, 2) < 4, // Within +/- 2 seconds
      true,
      `${label}: Actual time ${actualTimeInUTC} must be approximately equal to ${expectedTimeInUTC}`
    );
  }
}
