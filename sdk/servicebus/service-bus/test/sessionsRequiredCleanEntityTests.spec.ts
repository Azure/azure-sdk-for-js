// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  getRandomTestClientTypeWithSessions
} from "./utils/testutils2";
import { ServiceBusSender } from "../src/sender";
import { ServiceBusMessage, ServiceBusSessionReceiver } from "../src";
import { TestMessage } from "./utils/testUtils";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";
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
  let receiver: ServiceBusSessionReceiver<ReceivedMessageWithLock>;

  let testClientType = getRandomTestClientTypeWithSessions();

  async function beforeEachNoSessionTest(): Promise<void> {
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

  async function afterEachTest(): Promise<void> {
    await serviceBusClient.test.afterEach();
    // special circumstance since we're destroying everything after each of these tests.
    await serviceBusClient.test.after();
  }

  describe("Peek session", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function eachTest(useSessionId: boolean) {
      await beforeEachNoSessionTest();
      await peekSession(useSessionId);
    }

    async function peekSession(useSessionId: boolean): Promise<void> {
      const testMessage = TestMessage.getSessionSample();
      await sender.sendMessages(testMessage);

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
        sessionId: useSessionId ? testMessage.sessionId! : undefined
      });

      // At this point AMQP receiver link has not been established.
      // peekMessages() will not establish the link if sessionId was provided
      const peekedMsgs = await receiver.peekMessages(1);
      should.equal(peekedMsgs.length, 1, "Unexpected number of messages browsed");
      should.equal(peekedMsgs[0].body, testMessage.body, "MessageBody is different than expected");
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

      await msgs[0].complete();
    }

    it(testClientType + " - Peek Session with sessionId", async function(): Promise<void> {
      await eachTest(true);
    });

    it(testClientType + " - Peek Session without sessionId", async function(): Promise<void> {
      await eachTest(false);
    });
  });

  describe(testClientType + ": SessionReceiver with no sessionId", function(): void {
    const testSessionId2 = "my-session2";

    afterEach(async () => {
      await afterEachTest();
    });

    const testMessagesWithDifferentSessionIds: ServiceBusMessage[] = [
      {
        body: "hello1",
        messageId: `test message ${Math.random()}`,
        sessionId: TestMessage.sessionId
      },
      {
        body: "hello2",
        messageId: `test message ${Math.random()}`,
        sessionId: testSessionId2
      }
    ];

    async function testComplete_batching(): Promise<void> {
      await sender.sendMessages(testMessagesWithDifferentSessionIds[0]);
      await sender.sendMessages(testMessagesWithDifferentSessionIds[1]);

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);
      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

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
      await msgs[0].complete();
      await receiver.close();

      // get the next available session ID rather than specifying one
      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames);

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
      await msgs[0].complete();
      await testPeekMsgsLength(receiver, 0);
    }

    it("complete() removes message from random session", async function(): Promise<void> {
      await beforeEachNoSessionTest();
      await testComplete_batching();
    });
  });

  describe(testClientType + ": SessionReceiver with empty string as sessionId", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    // Sending messages with different session id, so that we know for sure we pick the right one
    // and that Service Bus is not choosing a random one for us
    const testMessagesWithDifferentSessionIds: ServiceBusMessage[] = [
      {
        body: "hello1",
        messageId: `test message ${Math.random()}`,
        sessionId: TestMessage.sessionId
      },
      {
        body: "hello2",
        messageId: `test message ${Math.random()}`,
        sessionId: ""
      }
    ];

    async function testComplete_batching(): Promise<void> {
      await sender.sendMessages(testMessagesWithDifferentSessionIds[0]);
      await sender.sendMessages(testMessagesWithDifferentSessionIds[1]);

      const entityNames = serviceBusClient.test.getTestEntities(testClientType);

      // get the next available session ID rather than specifying one
      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
        sessionId: ""
      });

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
      await msgs[0].complete();

      const peekedMsgsInSession = await receiver.peekMessages(1);
      should.equal(peekedMsgsInSession.length, 0, "Unexpected number of messages peeked");

      await receiver.close();
    }

    it("complete() removes message from random session", async function(): Promise<void> {
      await beforeEachNoSessionTest();
      await testComplete_batching();
    });
  });
});
