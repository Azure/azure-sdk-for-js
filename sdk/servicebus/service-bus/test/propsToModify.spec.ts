// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();

import {
  TestClientType,
  TestMessage,
  purge,
  getServiceBusClient,
  getSenderReceiverClients,
  isSessionfulEntity
} from "./utils/testUtils";
import {
  Receiver,
  ServiceBusClient,
  QueueClient,
  TopicClient,
  SubscriptionClient,
  SessionReceiver,
  Sender,
  ReceiveMode,
  ServiceBusMessage
} from "../src";

describe("dead lettering", () => {
  let sbClient: ServiceBusClient;

  let senderClient: QueueClient | TopicClient;
  let receiverClient: QueueClient | SubscriptionClient;
  let deadLetterClient: QueueClient | SubscriptionClient;
  let sender: Sender;
  let receiver: Receiver | SessionReceiver;
  let receivedMessage: ServiceBusMessage;

  async function beforeEachTest(senderType: TestClientType, receiverType: TestClientType) {
    const useSessions = isSessionfulEntity(receiverType);
    sbClient = getServiceBusClient();
    const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
    senderClient = clients.senderClient;
    receiverClient = clients.receiverClient;
    if (receiverClient instanceof QueueClient) {
      deadLetterClient = sbClient.createQueueClient(
        QueueClient.getDeadLetterQueuePath(receiverClient.entityPath)
      );
    }

    if (receiverClient instanceof SubscriptionClient) {
      deadLetterClient = sbClient.createSubscriptionClient(
        TopicClient.getDeadLetterTopicPath(
          senderClient.entityPath,
          receiverClient.subscriptionName
        ),
        receiverClient.subscriptionName
      );
    }

    await purge(receiverClient, useSessions ? TestMessage.sessionId : undefined);
    await purge(deadLetterClient);
    const peekedMsgs = await receiverClient.peek();
    const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
    if (peekedMsgs.length) {
      chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    }
    const peekedDeadMsgs = await deadLetterClient.peek();
    if (peekedDeadMsgs.length) {
      chai.assert.fail(
        `Please use an empty dead letter ${receiverEntityType} for integration testing`
      );
    }

    sender = senderClient.createSender();
    await sender.send({
      body: "message-body",
      sessionId: useSessions ? TestMessage.getSessionSample().sessionId : undefined
    });
    if (useSessions) {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
        sessionId: TestMessage.sessionId
      });
    } else {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
    }
    const receivedMessages = await receiver.receiveMessages(1, 1000);

    if (receivedMessages.length == 0) {
      throw new Error("No messages were received");
    }

    receivedMessage = receivedMessages[0];
  }

  afterEach(async () => {
    await sbClient.close();
  });

  // dead lettering a deferred message actually goes down a different code path
  // than dead lettering a message received any other way since it uses the
  // management link.
  it("dead lettering a deferred message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const deferredMessage = await receiver.receiveDeferredMessage(receivedMessage.sequenceNumber!);

    await deferredMessage!.deadLetter({
      deadLetterErrorDescription: "this is the dead letter error description (was deferred)",
      deadletterReason: "this is the dead letter reason (was deferred)",
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
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await receivedMessage.deadLetter({
      deadLetterErrorDescription: "this is the dead letter error description",
      deadletterReason: "this is the dead letter reason",
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
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const deferredMessage = await receiver.receiveDeferredMessage(receivedMessage.sequenceNumber!);

    await deferredMessage!.deadLetter({
      deadLetterErrorDescription: "this is the dead letter error description (was deferred)",
      deadletterReason: "this is the dead letter reason (was deferred)",
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
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await receivedMessage.deadLetter({
      deadLetterErrorDescription: "this is the dead letter error description",
      deadletterReason: "this is the dead letter reason",
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
    const deadLetterReceiver = await deadLetterClient.createReceiver(ReceiveMode.peekLock);
    const deadLetterMessages = await deadLetterReceiver.receiveMessages(1);
    should.exist(deadLetterMessages[0]);

    const reason = deadLetterMessages[0]!.userProperties!["DeadLetterReason"];
    const description = deadLetterMessages[0]!.userProperties!["DeadLetterErrorDescription"];
    const customProperty = deadLetterMessages[0]!.userProperties!["customProperty"];

    should.equal(reason, expected.reason);
    should.equal(description, expected.description);
    should.equal(customProperty, expected.customProperty);
  }
});

describe("abandoning", () => {
  let sbClient: ServiceBusClient;

  let senderClient: QueueClient | TopicClient;
  let receiverClient: QueueClient | SubscriptionClient;
  let sender: Sender;
  let receiver: Receiver | SessionReceiver;
  let receivedMessage: ServiceBusMessage;

  async function beforeEachTest(senderType: TestClientType, receiverType: TestClientType) {
    const useSessions = isSessionfulEntity(receiverType);
    sbClient = getServiceBusClient();
    const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
    senderClient = clients.senderClient;
    receiverClient = clients.receiverClient;

    await purge(receiverClient, useSessions ? TestMessage.sessionId : undefined);
    const peekedMsgs = await receiverClient.peek();
    const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
    if (peekedMsgs.length) {
      chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    }

    sender = senderClient.createSender();
    await sender.send({
      body: "message-body",
      sessionId: useSessions ? TestMessage.getSessionSample().sessionId : undefined
    });
    if (useSessions) {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
        sessionId: TestMessage.sessionId
      });
    } else {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
    }
    const receivedMessages = await receiver.receiveMessages(1, 1000);

    if (receivedMessages.length == 0) {
      throw new Error("No messages were received");
    }

    receivedMessage = receivedMessages[0];
  }

  afterEach(async () => {
    await sbClient.close();
  });

  it("abandoning a deferred message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const deferredMessage = await receiver.receiveDeferredMessage(receivedMessage.sequenceNumber!);

    await deferredMessage!.abandon({
      customProperty: "hello, setting this custom property"
    });

    const abandonedMessage = await receiver.receiveDeferredMessage(
      deferredMessage!.sequenceNumber!
    );
    await checkAbandonedMessage(abandonedMessage!, {
      customProperty: "hello, setting this custom property"
    });
  });

  it("abandoning a typical received message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await receivedMessage.abandon({
      customProperty: "hello, setting this custom property"
    });

    const abandonedMessage = (await receiver.receiveMessages(1))[0];
    await checkAbandonedMessage(abandonedMessage, {
      customProperty: "hello, setting this custom property"
    });
  });

  it("abandoning a deferred message - sessions", async () => {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const deferredMessage = await receiver.receiveDeferredMessage(receivedMessage.sequenceNumber!);

    await deferredMessage!.abandon({
      customProperty: "hello, setting this custom property"
    });

    const abandonedMessage = await receiver.receiveDeferredMessage(
      deferredMessage!.sequenceNumber!
    );
    await checkAbandonedMessage(abandonedMessage!, {
      customProperty: "hello, setting this custom property"
    });
  });

  it("abandoning a typical received message - sessions", async () => {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await receivedMessage.abandon({
      customProperty: "hello, setting this custom property"
    });

    const abandonedMessage = (await receiver.receiveMessages(1))[0];
    await checkAbandonedMessage(abandonedMessage, {
      customProperty: "hello, setting this custom property"
    });
  });

  async function checkAbandonedMessage(
    abandonedMessage: ServiceBusMessage,
    expected: { customProperty?: string }
  ) {
    should.exist(abandonedMessage);

    const customProperty = abandonedMessage.userProperties!["customProperty"];

    should.equal(customProperty, expected.customProperty);
  }
});

describe("deferring", () => {
  let sbClient: ServiceBusClient;

  let senderClient: QueueClient | TopicClient;
  let receiverClient: QueueClient | SubscriptionClient;
  let sender: Sender;
  let receiver: Receiver | SessionReceiver;
  let receivedMessage: ServiceBusMessage;

  async function beforeEachTest(senderType: TestClientType, receiverType: TestClientType) {
    const useSessions = isSessionfulEntity(receiverType);
    sbClient = getServiceBusClient();
    const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
    senderClient = clients.senderClient;
    receiverClient = clients.receiverClient;

    await purge(receiverClient, useSessions ? TestMessage.sessionId : undefined);
    const peekedMsgs = await receiverClient.peek();
    const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
    if (peekedMsgs.length) {
      chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    }

    sender = senderClient.createSender();
    await sender.send({
      body: "message-body",
      sessionId: useSessions ? TestMessage.getSessionSample().sessionId : undefined
    });
    if (useSessions) {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
        sessionId: TestMessage.sessionId
      });
    } else {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
    }
    const receivedMessages = await receiver.receiveMessages(1, 1000);

    if (receivedMessages.length == 0) {
      throw new Error("No messages were received");
    }

    receivedMessage = receivedMessages[0];
  }

  afterEach(async () => {
    await sbClient.close();
  });

  it("deferring a deferred message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const deferredMessage = await receiver.receiveDeferredMessage(receivedMessage.sequenceNumber!);

    await deferredMessage!.defer({
      customProperty: "hello, setting this custom property"
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property"
    });
  });

  it("deferring a typical received message", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await receivedMessage.defer({
      customProperty: "hello, setting this custom property"
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property"
    });
  });

  it("deferring a deferred message - sessions", async () => {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    // defer this message so we can pick it up via the management API
    await receivedMessage.defer();

    const deferredMessage = await receiver.receiveDeferredMessage(receivedMessage.sequenceNumber!);

    await deferredMessage!.defer({
      customProperty: "hello, setting this custom property"
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property"
    });
  });

  it("deferring a typical received message - sessions", async () => {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await receivedMessage.defer({
      customProperty: "hello, setting this custom property"
    });

    await checkDeferredMessage({
      customProperty: "hello, setting this custom property"
    });
  });

  async function checkDeferredMessage(expected: { customProperty?: string }) {
    const deferredMessage = await receiver.receiveDeferredMessage(receivedMessage.sequenceNumber!);

    should.exist(deferredMessage);

    const customProperty = deferredMessage!.userProperties!["customProperty"];

    should.equal(customProperty, expected.customProperty);
  }
});
