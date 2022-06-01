// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  getRandomTestClientTypeWithSessions,
} from "./utils/testutils2";
import { ServiceBusSender } from "../../src";
import { ServiceBusMessage, ServiceBusSessionReceiver } from "../../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
const should = chai.should();

// NOTE: these tests should be reworked, if possible. Since they need to be deterministic
// and only grab the "expected" next session you need to ensure the entity (queue, sub)
// is completely empty.
//
// I've moved these tests in here and re-create entites after each test - it'e expensive
// but it'll allow them to be reliable.
describe("sessions tests -  requires completely clean entity for each test", () => {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: ServiceBusSender;
  let receiver: ServiceBusSessionReceiver;
  const randomTestClientType = getRandomTestClientTypeWithSessions();

  async function beforeEachNoSessionTest(testClientType: TestClientType): Promise<void> {
    serviceBusClient = createServiceBusClientForTests();
    const entityNames = await serviceBusClient.test.createTestEntities(testClientType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );

    // Observation -
    // Peeking into an empty session-enabled queue would run into either of the following errors..
    // 1. OperationTimeoutError: Unable to create the amqp receiver 'unpartitioned-queue-sessions-794f89be-3282-8b48-8ae0-a8af43c3ce36'
    //    on amqp session 'local-1_remote-1_connection-2' due to operation timeout.
    // 2. MessagingError: Received an incorrect sessionId 'undefined' while creating the receiver 'unpartitioned-queue-sessions-86662b2b-acdc-1045-8ad4-fa3ab8807871'.

    // getSenderReceiverClients creates brand new queues/topic-subscriptions.
    // Hence, commenting the following code since there is no need to purge/peek into a freshly created entity

    // await purge(receiver);
    // const peekedMsgs = await receiver.peekMessages();
    // const receiverEntityType = receiver.entityType;
    // if (peekedMsgs.length) {
    //   chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    // }
  }

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
    // each test recreates the client on start so we need to clean the entire thing up after each test.
    await serviceBusClient.test.after();
  });

  // These tests really do need to run against both queues and subscriptions as they seem
  // to behave differently on occasion when it runs against subscriptions.
  //
  // Basically, this test can fail if there is a delay between the message being accepted into the
  // entity and it actually being available in the queue or subscription. If that happens, when we peek,
  // it'll end up peeking into an empty entity which just works out as a really fast call that returns
  // no messages.
  //
  // So to compensate for this (since speed isn't what we're testing) I just receiveMessages(1) prior to the
  // peek, which _does_ wait for messages to arrive before returning.
  [
    getRandomTestClientTypeWithSessions("queue"),
    getRandomTestClientTypeWithSessions("subscription"),
  ].forEach((testClientType) => {
    describe(testClientType + "Peek session", function (): void {
      async function peekSession(
        sessionReceiverType: "acceptsession" | "acceptnextsession" | ":hell"
      ): Promise<void> {
        const testMessage = TestMessage.getSessionSample();
        await sender.sendMessages(testMessage);

        const entityNames = serviceBusClient.test.getTestEntities(testClientType);

        if (sessionReceiverType === "acceptsession") {
          receiver = await serviceBusClient.test.acceptSessionWithPeekLock(
            entityNames,
            testMessage.sessionId!
          );
        } else if (sessionReceiverType === "acceptnextsession") {
          receiver = await serviceBusClient.test.acceptNextSessionWithPeekLock(entityNames);
        } else {
          should.fail(`Invalid session receiver type for test: ${sessionReceiverType}`);
        }

        await ensureMessageExists(receiver);

        const peekedMsgs = await receiver.peekMessages(1);

        should.equal(peekedMsgs.length, 1, "Unexpected number of messages browsed");
        should.equal(
          peekedMsgs[0].body,
          testMessage.body,
          "MessageBody is different than expected"
        );
        should.equal(
          peekedMsgs[0].messageId,
          testMessage.messageId,
          "MessageId is different than expected"
        );
        should.equal(
          peekedMsgs[0].sessionId,
          testMessage.sessionId,
          "SessionId is different than expected"
        );

        const msgs = await receiver.receiveMessages(1);
        should.equal(msgs.length, 1, "Unexpected number of messages received");
        should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
        should.equal(
          msgs[0].messageId,
          testMessage.messageId,
          "MessageId is different than expected"
        );
        should.equal(
          msgs[0].sessionId,
          testMessage.sessionId,
          "SessionId is different than expected"
        );

        await receiver.completeMessage(msgs[0]);
      }

      it("acceptSession(sessionId)", async function (): Promise<void> {
        await beforeEachNoSessionTest(testClientType);
        await peekSession("acceptsession");
      });

      it("acceptNextSession()", async function (): Promise<void> {
        await beforeEachNoSessionTest(testClientType);
        await peekSession("acceptnextsession");
      });
    });
  });

  describe(randomTestClientType + ": SessionReceiver with no sessionId", function (): void {
    const testSessionId2 = "my-session2";

    const testMessagesWithDifferentSessionIds: ServiceBusMessage[] = [
      {
        body: "hello1",
        messageId: `test message ${Math.random()}`,
        sessionId: TestMessage.sessionId,
      },
      {
        body: "hello2",
        messageId: `test message ${Math.random()}`,
        sessionId: testSessionId2,
      },
    ];

    async function testComplete_batching(): Promise<void> {
      await sender.sendMessages(testMessagesWithDifferentSessionIds[0]);
      await sender.sendMessages(testMessagesWithDifferentSessionIds[1]);

      const entityNames = serviceBusClient.test.getTestEntities(randomTestClientType);
      receiver = await serviceBusClient.test.acceptNextSessionWithPeekLock(entityNames);

      let msgs = await receiver.receiveMessages(2);

      should.equal(msgs.length, 1, "Unexpected number of messages received");
      should.equal(receiver.sessionId, msgs[0].sessionId, "Unexpected sessionId in receiver");
      should.equal(
        testMessagesWithDifferentSessionIds.some(
          (x) =>
            msgs[0].body === x.body &&
            msgs[0].messageId === x.messageId &&
            msgs[0].sessionId === x.sessionId
        ),
        true,
        "Received Message doesnt match any of the test messages"
      );
      await receiver.completeMessage(msgs[0]);
      await receiver.close();

      // get the next available session ID rather than specifying one
      receiver = await serviceBusClient.test.acceptNextSessionWithPeekLock(entityNames);

      msgs = await receiver.receiveMessages(2);

      should.equal(msgs.length, 1, "Unexpected number of messages received");
      should.equal(receiver.sessionId, msgs[0].sessionId, "Unexpected sessionId in receiver");
      should.equal(
        testMessagesWithDifferentSessionIds.some(
          (x) =>
            msgs[0].body === x.body &&
            msgs[0].messageId === x.messageId &&
            msgs[0].sessionId === x.sessionId
        ),
        true,
        "Received Message doesnt match any of the test messages"
      );
      await receiver.completeMessage(msgs[0]);
      await testPeekMsgsLength(receiver, 0);
    }

    it(
      randomTestClientType + ": complete() removes message from random session",
      async function (): Promise<void> {
        await beforeEachNoSessionTest(randomTestClientType);
        await testComplete_batching();
      }
    );
  });

  describe.skip(
    randomTestClientType + ": SessionReceiver with empty string as sessionId",
    function (): void {
      // Sending messages with different session id, so that we know for sure we pick the right one
      // and that Service Bus is not choosing a random one for us
      const testMessagesWithDifferentSessionIds: ServiceBusMessage[] = [
        {
          body: "hello1",
          messageId: `test message ${Math.random()}`,
          sessionId: TestMessage.sessionId,
        },
        {
          body: "hello2",
          messageId: `test message ${Math.random()}`,
          sessionId: "",
        },
      ];

      async function testComplete_batching(): Promise<void> {
        await sender.sendMessages(testMessagesWithDifferentSessionIds[0]);
        await sender.sendMessages(testMessagesWithDifferentSessionIds[1]);

        const entityNames = serviceBusClient.test.getTestEntities(randomTestClientType);

        // get the next available session ID rather than specifying one
        receiver = await serviceBusClient.test.acceptSessionWithPeekLock(entityNames, "");

        const msgs = await receiver.receiveMessages(2);

        should.equal(msgs.length, 1, "Unexpected number of messages received");

        should.equal(receiver.sessionId, "", "Unexpected sessionId in receiver");
        should.equal(
          testMessagesWithDifferentSessionIds[1].body === msgs[0].body &&
            testMessagesWithDifferentSessionIds[1].messageId === msgs[0].messageId &&
            testMessagesWithDifferentSessionIds[1].sessionId === msgs[0].sessionId,
          true,
          "Received Message doesnt match expected test message"
        );
        await receiver.completeMessage(msgs[0]);

        const peekedMsgsInSession = await receiver.peekMessages(1);
        should.equal(peekedMsgsInSession.length, 0, "Unexpected number of messages peeked");

        await receiver.close();
      }

      it("complete() removes message from random session", async function (): Promise<void> {
        await beforeEachNoSessionTest(randomTestClientType);
        await testComplete_batching();
      });
    }
  );
});

/**
 * A simple workaround to ensure that a message is actually available, prior to peeking.
 *
 * Without this it's possible to be too fast, and attempt to peek (with a sequence number) and
 * get no messages, which isn't an error or obvious.
 *
 * This behavior only manifests with subscriptions. Queues won't even let you create a receiver
 * when a session does not have any messages.
 */
async function ensureMessageExists(receiver: ServiceBusSessionReceiver): Promise<void> {
  const messages = await receiver.receiveMessages(1);
  should.equal(messages.length, 1, "Should receive a single message");

  // put it right back.
  await receiver.abandonMessage(messages[0]);
}
