// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);

import { delay } from "rhea-promise";
import { purge, getSenderReceiverClients, TestClientType, TestMessage } from "./testUtils";

// @ts-ignore
let ns: ServiceBusClient;
// @ts-ignore
let senderClient: QueueClient | TopicClient;
// @ts-ignore
let receiverClient: QueueClient | SubscriptionClient;

async function beforeEachTest(
  senderType: TestClientType,
  receiverType: TestClientType
): Promise<void> {
  // @ts-ignore
  const ServiceBusClient = Azure.Messaging.ServiceBus.ServiceBusClient;

  // @ts-ignore
  ns = ServiceBusClient.createFromConnectionString(window.__env__["SERVICEBUS_CONNECTION_STRING"]);
  const clients = await getSenderReceiverClients(ns, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  await purge(receiverClient);
  const peekedMsgs = await receiverClient.peek();

  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty entity for integration testing`);
  }
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("(In Browser) Unpartitioned Queue - Lock Renewal", function(): void {
  beforeEach(async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Batch Receiver: renewLock() resets lock duration each time.", async function(): Promise<
    void
  > {
    await testBatchReceiverManualLockRenewalHappyCase(senderClient, receiverClient);
  });
});

const lockDurationInMilliseconds = 30000;

/**
 * Test renewLock() after receiving a message using Batch Receiver
 */
async function testBatchReceiverManualLockRenewalHappyCase(
  // @ts-ignore
  senderClient: QueueClient | TopicClient,
  // @ts-ignore
  receiverClient: QueueClient | SubscriptionClient
): Promise<void> {
  const testMessage = TestMessage.getSample();
  await senderClient.createSender().send(testMessage);

  // @ts-ignore
  const receiver = receiverClient.createReceiver(Azure.Messaging.ServiceBus.ReceiveMode.peekLock);
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
    await receiver.renewMessageLock(msgs[0].lockToken);
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
