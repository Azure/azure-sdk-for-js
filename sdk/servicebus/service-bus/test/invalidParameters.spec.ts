// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import * as Long from "long";
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
  ReceiveMode
} from "../src";

import { TestMessage, getSenderReceiverClients, TestClientType } from "./testUtils";

import { Receiver, SessionReceiver } from "../src/receiver";
import { Sender } from "../src/sender";

let ns: ServiceBusClient;

let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;
let sender: Sender;
let receiver: Receiver | SessionReceiver;

async function beforeEachTest(
  senderType: TestClientType,
  receiverType: TestClientType,
  useSessions?: boolean
): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = ServiceBusClient.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  const clients = await getSenderReceiverClients(ns, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;
  sender = senderClient.createSender();

  if (useSessions) {
    // Sending a message in case of sessions to ensure we are able to get a session receiver
    await sender.send(TestMessage.getSessionSample());
    receiver = receiverClient.createReceiver(ReceiveMode.receiveAndDelete, {
      sessionId: TestMessage.sessionId
    });
  } else {
    receiver = receiverClient.createReceiver(ReceiveMode.receiveAndDelete);
  }
}

describe("Invalid parameters in QueueClient", function(): void {
  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
  });

  after(async () => {
    await ns.close();
  });

  it("Peek: Invalid maxMessageCount in QueueClient", async function(): Promise<void> {
    const peekedResults = await receiverClient.peek(-100);
    should.equal(peekedResults.length, 0);
  });

  it("Peek: Wrong type maxMessageCount in QueueClient", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await receiverClient.peek("somestring" as any);
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
    const peekedResults = await receiverClient.peekBySequenceNumber(Long.ZERO, -100);
    should.equal(peekedResults.length, 0);
  });

  it("PeekBySequenceNumber: Wrong type maxMessageCount in QueueClient", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.peekBySequenceNumber(Long.ZERO, "somestring" as any);
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
      await receiverClient.peekBySequenceNumber("somestring" as any);
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
      await receiverClient.peekBySequenceNumber(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "fromSequenceNumber"`);
  });
});

describe("Invalid parameters in SubscriptionClient", function(): void {
  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
  });

  after(async () => {
    await ns.close();
  });

  it("Peek: Invalid maxMessageCount in SubscriptionClient", async function(): Promise<void> {
    const peekedResults = await receiverClient.peek(-100);
    should.equal(peekedResults.length, 0);
  });

  it("Peek: Wrong type maxMessageCount in SubscriptionClient", async function(): Promise<void> {
    let caughtError: Error | undefined;
    try {
      await receiverClient.peek("somestring" as any);
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
    const peekedResults = await receiverClient.peekBySequenceNumber(Long.ZERO, -100);
    should.equal(peekedResults.length, 0);
  });

  it("PeekBySequenceNumber: Wrong type maxMessageCount in SubscriptionClient", async function(): Promise<
    void
  > {
    let caughtError: Error | undefined;
    try {
      await receiverClient.peekBySequenceNumber(Long.ZERO, "somestring" as any);
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
      await receiverClient.peekBySequenceNumber("somestring" as any);
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
      await receiverClient.peekBySequenceNumber(undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "fromSequenceNumber"`);
  });
});

describe("Invalid parameters in SessionReceiver", function(): void {
  let sessionReceiver: SessionReceiver;

  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    sessionReceiver = <SessionReceiver>receiver;
  });

  after(async () => {
    await ns.close();
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
  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
  });

  after(async () => {
    await ns.close();
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
});

describe("Invalid parameters in Sender", function(): void {
  // Since, the below tests never actually make use of any AMQP links, there is no need to create
  // new sender/receiver clients before each test. Doing it once for each describe block.
  before(async () => {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
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
