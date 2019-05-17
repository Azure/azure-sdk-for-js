import * as assert from "assert";

import { Aborter } from "@azure/core-aborter";
import { QueueClient } from "../src/QueueClient";
import { MessagesClient } from "../src/MessagesClient";
import { MessageIdClient } from "../src/MessageIdClient";
import { getQSU, getUniqueName, sleep } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("MessageIdClient", () => {
  const queueServiceClient = getQSU();
  let queueName = getUniqueName("queue");
  let queueClient = QueueClient.fromQueueServiceClient(queueServiceClient, queueName);
  const messageContent = "Hello World";

  beforeEach(async () => {
    queueName = getUniqueName("queue");
    queueClient = QueueClient.fromQueueServiceClient(queueServiceClient, queueName);
    await queueClient.create(Aborter.none);
  });

  afterEach(async () => {
    await queueClient.delete(Aborter.none);
  });

  it("update and delete empty message with default parameters", async () => {
    let messagesClient = MessagesClient.fromQueueClient(queueClient);
    let eResult = await messagesClient.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = "";
    let messageIdClient = MessageIdClient.fromMessagesClient(messagesClient, eResult.messageId);
    let uResult = await messageIdClient.update(Aborter.none, eResult.popReceipt, 0, newMessage);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesClient.peek(Aborter.none);
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);

    let dResult = await messageIdClient.delete(Aborter.none, uResult.popReceipt!);
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);

    pResult = await messagesClient.peek(Aborter.none);
    assert.equal(pResult.peekedMessageItems.length, 0);
  });

  it("update and delete message with all parameters", async () => {
    let messagesClient = MessagesClient.fromQueueClient(queueClient);
    let eResult = await messagesClient.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = "New Message";
    let messageIdClient = MessageIdClient.fromMessagesClient(messagesClient, eResult.messageId);
    let uResult = await messageIdClient.update(Aborter.none, eResult.popReceipt, 10, newMessage);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesClient.peek(Aborter.none);
    assert.equal(pResult.peekedMessageItems.length, 0);

    await sleep(11 * 1000); // Sleep 11 seconds, and wait the message to be visible again

    let pResult2 = await messagesClient.peek(Aborter.none);
    assert.equal(pResult2.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult2.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message with 64KB characters size which is computed after encoding", async () => {
    let messagesClient = MessagesClient.fromQueueClient(queueClient);
    let eResult = await messagesClient.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = new Array(64 * 1024 + 1).join("a");
    let messageIdClient = MessageIdClient.fromMessagesClient(messagesClient, eResult.messageId);
    let uResult = await messageIdClient.update(Aborter.none, eResult.popReceipt, 0, newMessage);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesClient.peek(Aborter.none);
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message negative with 65537B (64KB+1B) characters size which is computed after encoding", async () => {
    let messagesClient = MessagesClient.fromQueueClient(queueClient);
    let eResult = await messagesClient.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = new Array(64 * 1024 + 2).join("a");

    let messageIdClient = MessageIdClient.fromMessagesClient(messagesClient, eResult.messageId);

    let error;
    try {
      await messageIdClient.update(Aborter.none, eResult.popReceipt, 0, newMessage);
    } catch (err) {
      error = err;
    }
    assert.ok(error);
    assert.ok(
      error.message.includes(
        "The request body is too large and exceeds the maximum permissible limit."
      )
    );
  });

  it("delete message negative", async () => {
    let messagesClient = MessagesClient.fromQueueClient(queueClient);
    let eResult = await messagesClient.enqueue(Aborter.none, messageContent);

    let messageIdClient = MessageIdClient.fromMessagesClient(messagesClient, eResult.messageId);

    let error;
    try {
      await messageIdClient.delete(Aborter.none, "invalid");
    } catch (err) {
      error = err;
    }
    assert.ok(error);
  });
});
