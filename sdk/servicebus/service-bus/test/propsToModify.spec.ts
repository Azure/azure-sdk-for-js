// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();

import { createServiceBusClientForTests } from "./utils/testutils2";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ReceivedMessage, ReceivedMessageWithLock, Receiver } from "../src";

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

  async function beforeEachTest(testClientType: TestClientType) {
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    if (entityNames.queue == null) {
      throw new Error("Specifically asked for a queue");
    }

    // send a test message with the body being the title of the test (for something unique)
    const sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue)
    );

    await sender.sendMessages({
      body: "message-body",
      sessionId: entityNames.usesSessions ? TestMessage.getSessionSample().sessionId : undefined
    });

    deadLetterReceiver = serviceBusClient.test.addToCleanup(
      // receiveAndDelete since I don't care about further settlement after it's been dead lettered!
      serviceBusClient.createDeadLetterReceiver(entityNames.queue, "receiveAndDelete")
    );

    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    const receivedMessages = await receiver.receiveMessages(1);

    if (receivedMessages.length == 0) {
      throw new Error("No messages were received");
    }

    receivedMessage = receivedMessages[0];
  }

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
  });

  // dead lettering a deferred message actually goes down a different code path
  // than dead lettering a message received any other way since it uses the
  // management link.
  it("dead lettering a deferred message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

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
    await beforeEachTest(TestClientType.UnpartitionedQueue);
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

  // dead lettering a deferred message actually goes down a different code path
  // than dead lettering a message received any other way since it uses the
  // management link.
  it("dead lettering a deferred message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

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

  it("dead lettering a typical received message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
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
    const deadLetterMessages = await deadLetterReceiver.receiveMessages(1);
    should.exist(deadLetterMessages[0]);

    const reason = deadLetterMessages[0].deadLetterReason;
    const description = deadLetterMessages[0].deadLetterErrorDescription;
    const customProperty = deadLetterMessages[0]!.properties!["customProperty"];

    should.equal(reason, expected.reason);
    should.equal(description, expected.description);
    should.equal(customProperty, expected.customProperty);
  }
});

describe("abandoning", () => {
  let serviceBusClient: ReturnType<typeof createServiceBusClientForTests>;
  let receiver: Receiver<ReceivedMessageWithLock>;
  let receivedMessage: ReceivedMessageWithLock;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(testClientType: TestClientType) {
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    if (entityNames.queue == null) {
      throw new Error("Specifically asked for a queue");
    }

    // send a test message with the body being the title of the test (for something unique)
    const sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue)
    );

    await sender.sendMessages({
      body: "message-body",
      sessionId: entityNames.usesSessions ? TestMessage.getSessionSample().sessionId : undefined
    });

    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    const receivedMessages = await receiver.receiveMessages(1);

    if (receivedMessages.length == 0) {
      throw new Error("No messages were received");
    }

    receivedMessage = receivedMessages[0];
  }

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
  });

  it("abandoning a deferred message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await deferredMessage!.abandon({
      customProperty: "hello, setting this custom property"
    });

    const [abandonedMessage] = await receiver.receiveDeferredMessages(
      deferredMessage!.sequenceNumber!
    );
    await checkAbandonedMessage(abandonedMessage!, {
      customProperty: "hello, setting this custom property"
    });
  });

  it("abandoning a typical received message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await receivedMessage.abandon({
      customProperty: "hello, setting this custom property"
    });

    const abandonedMessage = (await receiver.receiveMessages(1))[0];
    await checkAbandonedMessage(abandonedMessage, {
      customProperty: "hello, setting this custom property"
    });
  });

  it("abandoning a deferred message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await deferredMessage!.abandon({
      customProperty: "hello, setting this custom property"
    });

    const [abandonedMessage] = await receiver.receiveDeferredMessages(
      deferredMessage!.sequenceNumber!
    );
    await checkAbandonedMessage(abandonedMessage!, {
      customProperty: "hello, setting this custom property"
    });
  });

  it("abandoning a typical received message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await receivedMessage.abandon({
      customProperty: "hello, setting this custom property"
    });

    const abandonedMessage = (await receiver.receiveMessages(1))[0];
    await checkAbandonedMessage(abandonedMessage, {
      customProperty: "hello, setting this custom property"
    });
  });

  async function checkAbandonedMessage(
    abandonedMessage: ReceivedMessageWithLock,
    expected: { customProperty?: string }
  ) {
    should.exist(abandonedMessage);

    const customProperty = abandonedMessage.properties!["customProperty"];

    should.equal(customProperty, expected.customProperty);
  }
});

describe("deferring", () => {
  let serviceBusClient: ReturnType<typeof createServiceBusClientForTests>;
  let receiver: Receiver<ReceivedMessageWithLock>;
  let receivedMessage: ReceivedMessageWithLock;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(testClientType: TestClientType) {
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    if (entityNames.queue == null) {
      throw new Error("Specifically asked for a queue");
    }

    // send a test message with the body being the title of the test (for something unique)
    const sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue)
    );

    await sender.sendMessages({
      body: "message-body",
      sessionId: entityNames.usesSessions ? TestMessage.getSessionSample().sessionId : undefined
    });

    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    const receivedMessages = await receiver.receiveMessages(1);

    if (receivedMessages.length == 0) {
      throw new Error("No messages were received");
    }

    receivedMessage = receivedMessages[0];
  }

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
  });

  it("deferring a deferred message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await deferredMessage!.defer({
      customProperty: "hello, setting this custom property"
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property"
    });
  });

  it("deferring a typical received message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await receivedMessage.defer({
      customProperty: "hello, setting this custom property"
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property"
    });
  });

  it("deferring a deferred message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await deferredMessage!.defer({
      customProperty: "hello, setting this custom property"
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property"
    });
  });

  it("deferring a typical received message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await receivedMessage.defer({
      customProperty: "hello, setting this custom property"
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property"
    });
  });

  async function checkDeferredMessage(expected: { customProperty?: string }) {
    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    should.exist(deferredMessage);

    const customProperty = deferredMessage!.properties!["customProperty"];

    should.equal(customProperty, expected.customProperty);
  }
});
