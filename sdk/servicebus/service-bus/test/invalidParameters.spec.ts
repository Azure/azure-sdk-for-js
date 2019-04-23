// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import * as Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import { ServiceBusClient, QueueClient, SubscriptionClient, ReceiveMode } from "../src";

import { TestMessage, getSenderReceiverClients, TestClientType } from "./testUtils";

import { Receiver, SessionReceiver } from "../src/receiver";
import { Sender } from "../src/sender";

let ns: ServiceBusClient;

function createServiceBusClient(): void {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = ServiceBusClient.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
}

describe("Invalid parameters in QueueClient", function(): void {
  let queueClient: QueueClient;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    createServiceBusClient();
    const clients = await getSenderReceiverClients(
      ns,
      TestClientType.PartitionedQueue,
      TestClientType.PartitionedQueue
    );
    queueClient = <QueueClient>clients.receiverClient;
  });

  after(async () => {
    await ns.close();
  });

  it("Peek: Invalid maxMessageCount in QueueClient", async function(): Promise<void> {
    const peekedResults = await queueClient.peek(-100);
    should.equal(peekedResults.length, 0);
  });

  it("Peek: Wrong type maxMessageCount in QueueClient", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await queueClient.peek("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Invalid maxMessageCount in QueueClient", async function(): Promise<
    void
  > {
    const peekedResults = await queueClient.peekBySequenceNumber(Long.ZERO, -100);
    should.equal(peekedResults.length, 0);
  });

  it("PeekBySequenceNumber: Wrong type maxMessageCount in QueueClient", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await queueClient.peekBySequenceNumber(Long.ZERO, "somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Wrong type fromSequenceNumber in QueueClient", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await queueClient.peekBySequenceNumber("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "fromSequenceNumber" should be of type "Long"`
    );
  });

  it("PeekBySequenceNumber: Missing fromSequenceNumber in QueueClient", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await queueClient.peekBySequenceNumber(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "fromSequenceNumber"`);
  });
});

describe("Invalid parameters in SubscriptionClient", function(): void {
  let subscriptionClient: SubscriptionClient;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    createServiceBusClient();
    const clients = await getSenderReceiverClients(
      ns,
      TestClientType.PartitionedTopic,
      TestClientType.PartitionedSubscription
    );
    subscriptionClient = <SubscriptionClient>clients.receiverClient;
  });

  after(async () => {
    await ns.close();
  });

  it("Peek: Invalid maxMessageCount in SubscriptionClient", async function(): Promise<void> {
    const peekedResults = await subscriptionClient.peek(-100);
    should.equal(peekedResults.length, 0);
  });

  it("Peek: Wrong type maxMessageCount in SubscriptionClient", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.peek("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Invalid maxMessageCount in SubscriptionClient", async function(): Promise<
    void
  > {
    const peekedResults = await subscriptionClient.peekBySequenceNumber(Long.ZERO, -100);
    should.equal(peekedResults.length, 0);
  });

  it("PeekBySequenceNumber: Wrong type maxMessageCount in SubscriptionClient", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.peekBySequenceNumber(Long.ZERO, "somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Wrong type fromSequenceNumber in SubscriptionClient", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.peekBySequenceNumber("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "fromSequenceNumber" should be of type "Long"`
    );
  });

  it("PeekBySequenceNumber: Missing fromSequenceNumber in SubscriptionClient", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.peekBySequenceNumber(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "fromSequenceNumber"`);
  });

  it("AddRule: Missing ruleName", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.addRule(undefined as any, undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "ruleName"`);
  });

  it("AddRule: Empty string as ruleName", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.addRule("", false);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `Empty string not allowed in parameter "ruleName"`
    );
  });

  it("AddRule: Missing filter", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.addRule("myrule", undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "filter"`);
  });

  it("AddRule: Invalid filter", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.addRule("myrule", { random: "value" } as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "filter" should be either a boolean, string or implement the CorrelationFilter interface.`
    );
  });

  it("RemoveRule: Missing ruleName", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.removeRule(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "ruleName"`);
  });

  it("RemoveRule: Empty string as ruleName", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await subscriptionClient.removeRule("");
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `Empty string not allowed in parameter "ruleName"`
    );
  });

  it("Add and Remove Rule: Coerce RuleName into string", async function(): Promise<void> {
    // Clean up existing rules
    let rules = await subscriptionClient.getRules();
    await Promise.all(rules.map((rule) => subscriptionClient.removeRule(rule.name)));

    // Add rule with number as name
    await subscriptionClient.addRule(123 as any, true);
    rules = await subscriptionClient.getRules();
    should.equal(rules.some((rule) => rule.name === "123"), true, "Added rule not found");

    // Remove rule with number as name
    await subscriptionClient.removeRule(123 as any);
    rules = await subscriptionClient.getRules();
    should.equal(rules.some((rule) => rule.name === "123"), false, "Removed rule still found");

    // Add default rule so that other tests are not affected
    await subscriptionClient.addRule(subscriptionClient.defaultRuleName, true);
  });
});

describe("Invalid parameters in SessionReceiver", function(): void {
  let sessionReceiver: SessionReceiver;
  let receiverClient: QueueClient;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    createServiceBusClient();
    const clients = await getSenderReceiverClients(
      ns,
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions
    );

    const sender = clients.senderClient.createSender();
    await sender.send(TestMessage.getSessionSample());

    receiverClient = <QueueClient>clients.receiverClient;
    sessionReceiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
      sessionId: TestMessage.sessionId
    });
  });

  after(async () => {
    await ns.close();
  });

  it("SessionReceiver: Missing ReceiveMode", async function(): Promise<void> {
    await sessionReceiver.close();
    sessionReceiver = receiverClient.createReceiver(undefined as any, {
      sessionId: TestMessage.sessionId
    });
    should.equal(
      sessionReceiver.receiveMode,
      ReceiveMode.peekLock,
      "Default receiveMode not set when receiveMode not provided to constructor."
    );
  });

  it("SessionReceiver: Invalid ReceiveMode", async function(): Promise<void> {
    await sessionReceiver.close();
    sessionReceiver = receiverClient.createReceiver(123 as any, {
      sessionId: TestMessage.sessionId
    });
    should.equal(
      sessionReceiver.receiveMode,
      ReceiveMode.peekLock,
      "Default receiveMode not set when receiveMode not provided to constructor."
    );
  });

  it("Peek: Invalid maxMessageCount in SessionReceiver", async function(): Promise<void> {
    const peekedResults = await sessionReceiver.peek(-100);
    should.equal(peekedResults.length, 0);
  });

  it("Peek: Wrong type maxMessageCount in SessionReceiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.peek("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Invalid maxMessageCount in SessionReceiver", async function(): Promise<
    void
  > {
    const peekedResults = await sessionReceiver.peekBySequenceNumber(Long.ZERO, -100);
    should.equal(peekedResults.length, 0);
  });

  it("PeekBySequenceNumber: Wrong type maxMessageCount in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.peekBySequenceNumber(Long.ZERO, "somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "maxMessageCount" should be of type "number"`
    );
  });

  it("PeekBySequenceNumber: Wrong type sequenceNumber in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.peekBySequenceNumber("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "fromSequenceNumber" should be of type "Long"`
    );
  });

  it("PeekBySequenceNumber: Missing sequenceNumber in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.peekBySequenceNumber(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "fromSequenceNumber"`);
  });

  it("RegisterMessageHandler: Missing onMessage in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.registerMessageHandler(undefined as any, undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "onMessage"`);
  });

  it("RegisterMessageHandler: Wrong type for onMessage in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.registerMessageHandler("somestring" as any, "somethingelse" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter 'onMessage' must be of type 'function'.`
    );
  });

  it("RegisterMessageHandler: Missing onError in SessionReceiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.registerMessageHandler(
        async () => {
          /** */
        },
        undefined as any
      );
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "onError"`);
  });

  it("RegisterMessageHandler: Wrong type for onError in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.registerMessageHandler(
        async () => {
          /** */
        },
        "somethingelse" as any
      );
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter 'onError' must be of type 'function'.`
    );
  });

  it("ReceiveDeferredMessage: Wrong type sequenceNumber in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.receiveDeferredMessage("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumber" should be of type "Long"`
    );
  });

  it("ReceiveDeferredMessage: Missing sequenceNumber in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.receiveDeferredMessage(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumber"`);
  });

  it("ReceiveDeferredMessages: Wrong type sequenceNumbers in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.receiveDeferredMessages(["somestring"] as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumbers" should be an array of type "Long"`
    );
  });

  it("ReceiveDeferredMessages: Missing sequenceNumbers in SessionReceiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sessionReceiver.receiveDeferredMessages(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumbers"`);
  });
});

describe("Invalid parameters in Receiver", function(): void {
  let receiver: Receiver;
  let receiverClient: QueueClient;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    createServiceBusClient();
    const clients = await getSenderReceiverClients(
      ns,
      TestClientType.PartitionedQueue,
      TestClientType.PartitionedQueue
    );

    const sender = clients.senderClient.createSender();
    await sender.send(TestMessage.getSample());

    receiverClient = <QueueClient>clients.receiverClient;
    receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
  });

  after(async () => {
    await ns.close();
  });

  it("Receiver: Missing ReceiveMode", async function(): Promise<void> {
    await receiver.close();
    receiver = receiverClient.createReceiver(undefined as any);
    should.equal(
      receiver.receiveMode,
      ReceiveMode.peekLock,
      "Default receiveMode not set when receiveMode not provided to constructor."
    );
  });

  it("Receiver: Invalid ReceiveMode", async function(): Promise<void> {
    await receiver.close();
    receiver = receiverClient.createReceiver(123 as any);
    should.equal(
      receiver.receiveMode,
      ReceiveMode.peekLock,
      "Default receiveMode not set when receiveMode not provided to constructor."
    );
  });

  it("RegisterMessageHandler: Missing onMessage in Receiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await receiver.registerMessageHandler(undefined as any, undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "onMessage"`);
  });

  it("RegisterMessageHandler: Wrong type for onMessage in Receiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiver.registerMessageHandler("somestring" as any, "somethingelse" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter 'onMessage' must be of type 'function'.`
    );
  });

  it("RegisterMessageHandler: Missing onError in Receiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await receiver.registerMessageHandler(
        async () => {
          /** */
        },
        undefined as any
      );
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "onError"`);
  });

  it("RegisterMessageHandler: Wrong type for onError in Receiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await receiver.registerMessageHandler(
        async () => {
          /** */
        },
        "somethingelse" as any
      );
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter 'onError' must be of type 'function'.`
    );
  });

  it("ReceiveDeferredMessage: Wrong type sequenceNumber in Receiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiver.receiveDeferredMessage("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumber" should be of type "Long"`
    );
  });

  it("ReceiveDeferredMessage: Missing sequenceNumber in Receiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await receiver.receiveDeferredMessage(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumber"`);
  });

  it("ReceiveDeferredMessages: Wrong type sequenceNumbers in Receiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiver.receiveDeferredMessages(["somestring"] as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumbers" should be an array of type "Long"`
    );
  });

  it("ReceiveDeferredMessages: Missing sequenceNumbers in Receiver", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiver.receiveDeferredMessages(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumbers"`);
  });

  it("RenewMessageLock: Missing lockTokenOrMessage in Receiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await (<Receiver>receiver).renewMessageLock(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "lockTokenOrMessage"`);
  });

  it("RenewMessageLock: Invalid string lockToken in Receiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await (<Receiver>receiver).renewMessageLock("string-which-is-not-uuid");
    } catch (error) {
      caughtError = error;
    }
    should.equal(
      caughtError && caughtError.message,
      `Not a valid UUID string: string-which-is-not-uuid`
    );
  });

  it("RenewMessageLock: Invalid message lockToken in Receiver", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      const [receivedMsg] = await receiver.receiveMessages(1);
      if (!receivedMsg) {
        throw new Error("Message not received to renew lock on.");
      }
      (<any>receivedMsg).lockToken = "string-which-is-not-uuid";
      await (<Receiver>receiver).renewMessageLock(receivedMsg);
    } catch (error) {
      caughtError = error;
    }
    should.equal(
      caughtError && caughtError.message,
      `Not a valid UUID string: string-which-is-not-uuid`
    );
  });
});

describe("Invalid parameters in Sender", function(): void {
  let sender: Sender;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    createServiceBusClient();
    const clients = await getSenderReceiverClients(
      ns,
      TestClientType.PartitionedQueue,
      TestClientType.PartitionedQueue
    );

    sender = clients.senderClient.createSender();
  });

  after(async () => {
    await ns.close();
  });

  it("ScheduledMessage: Missing date in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.scheduleMessage(undefined as any, undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "scheduledEnqueueTimeUtc"`);
  });

  it("ScheduledMessage: Missing message in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.scheduleMessage(new Date(), undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "message"`);
  });

  it("ScheduledMessages: Missing date in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.scheduleMessages(undefined as any, undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "scheduledEnqueueTimeUtc"`);
  });

  it("ScheduledMessages: Missing messages in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.scheduleMessages(new Date(), undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "messages"`);
  });

  it("CancelScheduledMessage: Wrong type sequenceNumber in Sender", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sender.cancelScheduledMessage("somestring" as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumber" should be of type "Long"`
    );
  });

  it("CancelScheduledMessage: Missing sequenceNumber in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.cancelScheduledMessage(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumber"`);
  });

  it("CancelScheduledMessages: Wrong type sequenceNumbers in Sender", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await sender.cancelScheduledMessages(["somestring"] as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(
      caughtError && caughtError.message,
      `The parameter "sequenceNumbers" should be an array of type "Long"`
    );
  });

  it("CancelScheduledMessages: Missing sequenceNumbers in Sender", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await sender.cancelScheduledMessages(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumbers"`);
  });
});
