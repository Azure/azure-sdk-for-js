// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();

import { createServiceBusClientForTests } from "./utils/testutils2";
import { TestClientType } from "./utils/testUtils";
import { Receiver, ReceivedMessage, ReceivedMessageWithLock } from "../src";

describe("dead lettering", () => {
  let serviceBusClient: ReturnType<typeof createServiceBusClientForTests>;
  let deadLetterReceiver: Receiver<ReceivedMessage>;
  let receiver: Receiver<ReceivedMessageWithLock>;
  let receivedMessage: ReceivedMessageWithLock;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  beforeEach(async function() {
    const entityNames = await serviceBusClient.test.createTestEntities(
      TestClientType.UnpartitionedQueue
    );

    if (entityNames.queue == null) {
      throw new Error("Specifically asked for a queue");
    }

    // send a test message with the body being the title of the test (for something unique)
    const sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue)
    );

    await sender.send({
      body: this.currentTest?.title
    });

    deadLetterReceiver = serviceBusClient.test.addToCleanup(
      // receiveAndDelete since I don't care about further settlement after it's been dead lettered!
      serviceBusClient.createDeadLetterReceiver(entityNames.queue, "receiveAndDelete")
    );

    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    const receivedMessages = await receiver.receiveBatch(1, {
      maxWaitTimeInMs: 1000
    });

    if (receivedMessages.length == 0) {
      throw new Error("No messages were received");
    }

    receivedMessage = receivedMessages[0];
  });

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
  });

  // dead lettering a deferred message actually goes down a different code path
  // than dead lettering a message received any other way since it uses the
  // management link.
  it("dead lettering a deferred message", async () => {
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const deferredMessage = await receiver.receiveDeferredMessage(receivedMessage.sequenceNumber!);

    await deferredMessage!.deadLetter({
      deadLetterErrorDescription: "this is the dead letter error description (was deferred)",
      deadLetterReason: "this is the dead letter reason (was deferred)",
      customProperty: "hello, setting this custom property"
    });

    // now from the dead letter queue....
    await checkDeadLetteredMessage({
      reason: "this is the dead letter reason (was deferred)",
      description: "this is the dead letter error description (was deferred)",
      customProperty: "hello, setting this custom property"
    });
  });

  it("dead lettering a typical received message", async () => {
    await receivedMessage.deadLetter({
      deadLetterErrorDescription: "this is the dead letter error description",
      deadLetterReason: "this is the dead letter reason",
      customProperty: "hello, setting this custom property"
    });

    // now from the dead letter queue....
    await checkDeadLetteredMessage({
      reason: "this is the dead letter reason",
      description: "this is the dead letter error description",
      customProperty: "hello, setting this custom property"
    });
  });

  async function checkDeadLetteredMessage(expected: {
    reason: string;
    description: string;
    customProperty?: string;
  }) {
    const deadLetterMessages = await deadLetterReceiver.receiveBatch(1);
    should.exist(deadLetterMessages[0]);

    const reason = deadLetterMessages[0]!.userProperties!["DeadLetterReason"];
    const description = deadLetterMessages[0]!.userProperties!["DeadLetterErrorDescription"];
    const customProperty = deadLetterMessages[0]!.userProperties!["customProperty"];

    should.equal(reason, expected.reason);
    should.equal(description, expected.description);
    should.equal(customProperty, expected.customProperty);
  }
});
