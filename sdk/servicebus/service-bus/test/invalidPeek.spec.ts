// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
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

  if (useSessions) {
    // Sending a message in case of sessions to ensure we are able to get a session receiver
    sender = senderClient.createSender();
    await sender.send(TestMessage.getSessionSample());
    receiver = receiverClient.createReceiver(ReceiveMode.receiveAndDelete, {
      sessionId: TestMessage.sessionId
    });
  } else {
    receiver = receiverClient.createReceiver(ReceiveMode.receiveAndDelete);
  }
}

afterEach(async () => {
  await ns.close();
});

describe("Test invalid parameters in peek", function(): void {
  async function testInValidMaxMessageCountValue(useSessionReceiver?: boolean): Promise<void> {
    const inputValue = -100;
    let peekedMessagesLength = -1;
    let unexpectedErrorMessage = "";

    if (useSessionReceiver) {
      const sessionReceiver = <SessionReceiver>receiver;
      peekedMessagesLength = (await sessionReceiver.peek(inputValue)).length;
      unexpectedErrorMessage =
        "Unexpected number of peeked messages with invalid value for maxMessageCount on sessionReceiver";
    } else {
      peekedMessagesLength = (await receiverClient.peek(inputValue)).length;
      unexpectedErrorMessage =
        "Unexpected number of peeked messages with invalid value for maxMessageCount on client";
    }

    should.equal(peekedMessagesLength, 0, unexpectedErrorMessage);
  }

  async function testInValidMaxMessageCountType(useSessionReceiver?: boolean): Promise<void> {
    const inputValue: any = "invalidMe";
    let error: Error | undefined;
    let unexpectedErrorMessage = "";

    try {
      if (useSessionReceiver) {
        unexpectedErrorMessage =
          "Expected error not found when invalid type for maxMessageCount on sessionReceiver";
        const sessionReceiver = <SessionReceiver>receiver;
        await sessionReceiver.peek(inputValue);
      } else {
        unexpectedErrorMessage =
          "Expected error not found when invalid type for maxMessageCount on sessionReceiver";
        await receiverClient.peek(inputValue);
      }
    } catch (err) {
      error = err;
    }
    should.equal(error && error.name, "TypeError", unexpectedErrorMessage);
    should.equal(
      error && error.message,
      `The parameter "maxMessageCount" should be of type "number"`,
      unexpectedErrorMessage
    );
  }

  it("Queue: Test invalid maxMessageCount in peek", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testInValidMaxMessageCountValue();
    await testInValidMaxMessageCountType();
  });

  it("Subscription: Test invalid maxMessageCount in peek", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testInValidMaxMessageCountValue();
    await testInValidMaxMessageCountType();
  });

  it("Queue with sessions: Test invalid maxMessageCount in peek", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testInValidMaxMessageCountValue();
    await testInValidMaxMessageCountType();
    await testInValidMaxMessageCountValue(true);
    await testInValidMaxMessageCountType(true);
  });

  it("Subscription with sessions: Test invalid maxMessageCount in peek", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testInValidMaxMessageCountValue();
    await testInValidMaxMessageCountType();
    await testInValidMaxMessageCountValue(true);
    await testInValidMaxMessageCountType(true);
  });

  async function testInValidSequenceNumberType(useSessionReceiver?: boolean): Promise<void> {
    const inputValue: any = "invalidMe";
    let error: Error | undefined;
    let unexpectedErrorMessage = "";

    try {
      if (useSessionReceiver) {
        unexpectedErrorMessage =
          "Expected error not found when invalid type for fromSequenceNumber on sessionReceiver";
        const sessionReceiver = <SessionReceiver>receiver;
        await sessionReceiver.peekBySequenceNumber(inputValue);
      } else {
        unexpectedErrorMessage =
          "Expected error not found when invalid type for fromSequenceNumber on sessionReceiver";
        await receiverClient.peekBySequenceNumber(inputValue);
      }
    } catch (err) {
      error = err;
    }
    should.equal(error && error.name, "TypeError", unexpectedErrorMessage);
    should.equal(
      error && error.message,
      `The parameter "fromSequenceNumber" should be of type "Long"`,
      unexpectedErrorMessage
    );
  }

  it("Queue: Test invalid fromSequenceNumber in peekBySequenceNumber", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue);
    await testInValidSequenceNumberType();
  });

  it("Subscription: Test invalid fromSequenceNumber in peekBySequenceNumber", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedTopic, TestClientType.PartitionedSubscription);
    await testInValidSequenceNumberType();
  });

  it("Queue with sessions: Test invalid fromSequenceNumber in peekBySequenceNumber", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedQueueWithSessions,
      TestClientType.PartitionedQueueWithSessions,
      true
    );
    await testInValidSequenceNumberType();
    await testInValidSequenceNumberType(true);
  });

  it("Subscription with sessions: Test invalid fromSequenceNumber in peekBySequenceNumber", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.PartitionedTopicWithSessions,
      TestClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testInValidSequenceNumberType();
    await testInValidSequenceNumberType(true);
  });
});
