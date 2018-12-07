// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  Namespace,
  QueueClient,
  SendableMessageInfo,
  generateUuid,
  ServiceBusMessage
} from "../lib";

describe("Errors when send/receive to/from Queue/Topic/Subscription", function() {
  let namespace: Namespace;
  let queueClient: QueueClient;

  beforeEach(async () => {
    if (!process.env.SERVICEBUS_CONNECTION_STRING) {
      throw new Error(
        "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
      );
    }
    if (!process.env.TOPIC_NAME) {
      throw new Error("Define TOPIC_NAME in your environment before running integration tests.");
    }
    if (!process.env.QUEUE_NAME) {
      throw new Error("Define QUEUE_NAME in your environment before running integration tests.");
    }

    namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
    queueClient = namespace.createQueueClient(process.env.QUEUE_NAME);

    const peekedMsg = await queueClient.peek();
    if (peekedMsg.length) {
      throw new Error("Please use an empty queue for integration testing");
    }
  });

  afterEach(() => {
    return namespace.close();
  });

  it("Simple send and recieveBatch", async function() {
    const testMessage: SendableMessageInfo = {
      body: "hello",
      messageId: `test message ${generateUuid}`
    };

    await queueClient.send(testMessage);
    const msgs = await queueClient.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessage.body);
    should.equal(msgs[0].messageId, testMessage.messageId);

    await msgs[0].complete();
  });

  it("Simple sendBatch and multiple recieveBatch", async function() {
    const testMessages: SendableMessageInfo[] = [
      {
        body: "hello1",
        messageId: `test message ${generateUuid}`
      },
      {
        body: "hello2",
        messageId: `test message ${generateUuid}`
      }
    ];

    await queueClient.sendBatch(testMessages);
    const msgs1 = await queueClient.receiveBatch(1);
    const msgs2 = await queueClient.receiveBatch(1);

    should.equal(Array.isArray(msgs1), true);
    should.equal(msgs1.length, 1);
    should.equal(msgs1[0].body, testMessages[0].body);
    should.equal(msgs1[0].messageId, testMessages[0].messageId);

    should.equal(Array.isArray(msgs2), true);
    should.equal(msgs2.length, 1);
    should.equal(msgs2[0].body, testMessages[1].body);
    should.equal(msgs2[0].messageId, testMessages[1].messageId);

    await msgs1[0].complete();
    await msgs2[0].complete();
  });

  it("Streaming Receiver", async function() {
    const testMessages: SendableMessageInfo[] = [
      {
        body: "hello1",
        messageId: `test message ${generateUuid}`
      },
      {
        body: "hello2",
        messageId: `test message ${generateUuid}`
      }
    ];

    await queueClient.sendBatch(testMessages);

    const receivedMsgs: ServiceBusMessage[] = [];
    const onMessage = (msg: ServiceBusMessage) => {
      receivedMsgs.push(msg);
      return Promise.resolve();
    };
    const onError = (err: Error) => {
      should.not.exist(err);
    };
    const receiveListener = queueClient.receive(onMessage, onError);

    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        should.equal(receivedMsgs.length, 2);
        should.equal(receivedMsgs[0].body, testMessages[0].body);
        should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
        should.equal(receivedMsgs[1].body, testMessages[1].body);
        should.equal(receivedMsgs[1].messageId, testMessages[1].messageId);

        return receiveListener.stop().then(() => resolve());
      }, 1000);
    });

    return timeoutPromise;
  });
});
