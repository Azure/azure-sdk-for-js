// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();

import { createServiceBusClientForTests } from "./utils/testutils2";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ServiceBusReceivedMessage, ServiceBusReceiver } from "../../src";

describe("dead lettering", () => {
  let serviceBusClient: ReturnType<typeof createServiceBusClientForTests>;
  let deadLetterReceiver: ServiceBusReceiver;
  let receiver: ServiceBusReceiver;
  let receivedMessage: ServiceBusReceivedMessage;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(testClientType: TestClientType): Promise<void> {
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
      sessionId: entityNames.usesSessions ? TestMessage.getSessionSample().sessionId : undefined,
    });

    deadLetterReceiver = serviceBusClient.test.addToCleanup(
      // receiveAndDelete since I don't care about further settlement after it's been dead lettered!
      serviceBusClient.createReceiver(entityNames.queue, {
        receiveMode: "receiveAndDelete",
        subQueueType: "deadLetter",
      })
    );

    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);

    const receivedMessages = await receiver.receiveMessages(1);

    if (receivedMessages.length === 0) {
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
    await receiver.deferMessage(receivedMessage);

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await receiver.deadLetterMessage(deferredMessage, {
      deadLetterErrorDescription: "this is the dead letter error description (was deferred)",
      deadLetterReason: "this is the dead letter reason (was deferred)",
      customProperty: "hello, setting this custom property",
    });

    // now from the dead letter queue....
    await checkDeadLetteredMessage({
      reason: "this is the dead letter reason (was deferred)",
      description: "this is the dead letter error description (was deferred)",
      customProperty: "hello, setting this custom property",
    });
  });

  it("dead lettering a typical received message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await receiver.deadLetterMessage(receivedMessage, {
      deadLetterErrorDescription: "this is the dead letter error description",
      deadLetterReason: "this is the dead letter reason",
      customProperty: "hello, setting this custom property",
    });

    // now from the dead letter queue....
    await checkDeadLetteredMessage({
      reason: "this is the dead letter reason",
      description: "this is the dead letter error description",
      customProperty: "hello, setting this custom property",
    });
  });

  // dead lettering a deferred message actually goes down a different code path
  // than dead lettering a message received any other way since it uses the
  // management link.
  it("dead lettering a deferred message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    // defer this message so we can pick it up via the management API
    await receiver.deferMessage(receivedMessage);

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await receiver.deadLetterMessage(deferredMessage, {
      deadLetterErrorDescription: "this is the dead letter error description (was deferred)",
      deadLetterReason: "this is the dead letter reason (was deferred)",
      customProperty: "hello, setting this custom property",
    });

    // now from the dead letter queue....
    await checkDeadLetteredMessage({
      reason: "this is the dead letter reason (was deferred)",
      description: "this is the dead letter error description (was deferred)",
      customProperty: "hello, setting this custom property",
    });
  });

  it("dead lettering a typical received message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await receiver.deadLetterMessage(receivedMessage, {
      deadLetterErrorDescription: "this is the dead letter error description",
      deadLetterReason: "this is the dead letter reason",
      customProperty: "hello, setting this custom property",
    });

    // now from the dead letter queue....
    await checkDeadLetteredMessage({
      reason: "this is the dead letter reason",
      description: "this is the dead letter error description",
      customProperty: "hello, setting this custom property",
    });
  });

  async function checkDeadLetteredMessage(expected: {
    reason: string;
    description: string;
    customProperty?: string;
  }): Promise<void> {
    const deadLetterMessages = await deadLetterReceiver.receiveMessages(1);
    should.exist(deadLetterMessages[0]);

    const reason = deadLetterMessages[0].deadLetterReason;
    const description = deadLetterMessages[0].deadLetterErrorDescription;
    const customProperty = deadLetterMessages[0]!.applicationProperties!["customProperty"];

    should.equal(reason, expected.reason);
    should.equal(description, expected.description);
    should.equal(customProperty, expected.customProperty);
  }
});

describe("abandoning", () => {
  let serviceBusClient: ReturnType<typeof createServiceBusClientForTests>;
  let receiver: ServiceBusReceiver;
  let receivedMessage: ServiceBusReceivedMessage;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(testClientType: TestClientType): Promise<void> {
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
      sessionId: entityNames.usesSessions ? TestMessage.getSessionSample().sessionId : undefined,
    });

    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);

    const receivedMessages = await receiver.receiveMessages(1);

    if (receivedMessages.length === 0) {
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
    await receiver.deferMessage(receivedMessage);

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await receiver.abandonMessage(deferredMessage, {
      customProperty: "hello, setting this custom property",
    });

    const [abandonedMessage] = await receiver.receiveDeferredMessages(
      deferredMessage!.sequenceNumber!
    );
    await checkAbandonedMessage(abandonedMessage!, {
      customProperty: "hello, setting this custom property",
    });
  });

  it("abandoning a typical received message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await receiver.abandonMessage(receivedMessage, {
      customProperty: "hello, setting this custom property",
    });

    const abandonedMessage = (await receiver.receiveMessages(1))[0];
    await checkAbandonedMessage(abandonedMessage, {
      customProperty: "hello, setting this custom property",
    });
  });

  it("abandoning a deferred message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    // defer this message so we can pick it up via the management API
    await receiver.deferMessage(receivedMessage);

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await receiver.abandonMessage(deferredMessage, {
      customProperty: "hello, setting this custom property",
    });

    const [abandonedMessage] = await receiver.receiveDeferredMessages(
      deferredMessage!.sequenceNumber!
    );
    await checkAbandonedMessage(abandonedMessage!, {
      customProperty: "hello, setting this custom property",
    });
  });

  it("abandoning a typical received message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await receiver.abandonMessage(receivedMessage, {
      customProperty: "hello, setting this custom property",
    });

    const abandonedMessage = (await receiver.receiveMessages(1))[0];
    await checkAbandonedMessage(abandonedMessage, {
      customProperty: "hello, setting this custom property",
    });
  });

  async function checkAbandonedMessage(
    abandonedMessage: ServiceBusReceivedMessage,
    expected: { customProperty?: string }
  ): Promise<void> {
    should.exist(abandonedMessage);

    const customProperty = abandonedMessage.applicationProperties!["customProperty"];

    should.equal(customProperty, expected.customProperty);
  }
});

describe("deferring", () => {
  let serviceBusClient: ReturnType<typeof createServiceBusClientForTests>;
  let receiver: ServiceBusReceiver;
  let receivedMessage: ServiceBusReceivedMessage;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(async () => {
    await serviceBusClient.test.after();
  });

  async function beforeEachTest(testClientType: TestClientType): Promise<void> {
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
      sessionId: entityNames.usesSessions ? TestMessage.getSessionSample().sessionId : undefined,
    });

    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);

    const receivedMessages = await receiver.receiveMessages(1);

    if (receivedMessages.length === 0) {
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
    await receiver.deferMessage(receivedMessage);

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await receiver.deferMessage(deferredMessage!, {
      customProperty: "hello, setting this custom property",
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property",
    });
  });

  it("deferring a typical received message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await receiver.deferMessage(receivedMessage, {
      customProperty: "hello, setting this custom property",
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property",
    });
  });

  it("deferring a deferred message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    // defer this message so we can pick it up via the management API
    await receiver.deferMessage(receivedMessage);

    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    await receiver.deferMessage(deferredMessage, {
      customProperty: "hello, setting this custom property",
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property",
    });
  });

  it("deferring a typical received message - sessions", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await receiver.deferMessage(receivedMessage, {
      customProperty: "hello, setting this custom property",
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property",
    });
  });

  async function checkDeferredMessage(expected: { customProperty?: string }): Promise<void> {
    const [deferredMessage] = await receiver.receiveDeferredMessages(
      receivedMessage.sequenceNumber!
    );

    should.exist(deferredMessage);

    const customProperty = deferredMessage!.applicationProperties!["customProperty"];

    should.equal(customProperty, expected.customProperty);
  }
});
