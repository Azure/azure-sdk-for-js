import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { QueueURL } from "../src/QueueURL";
import { MessagesURL } from "../src/MessagesURL";
import { MessageIdURL } from "../src/MessageIdURL";
import { getQSU } from "./utils";
import { record, delay } from "./utils/recorder";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("MessageIdURL", () => {
  const serviceURL = getQSU();
  let queueName: string;
  let queueURL: QueueURL;
  const messageContent = "Hello World";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    queueName = recorder.getUniqueName("queue");
    queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    await queueURL.create(Aborter.none);
  });

  afterEach(async () => {
    await queueURL.delete(Aborter.none);
    recorder.stop();
  });

  it("update and delete empty message with default parameters", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);
    let eResult = await messagesURL.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = "";
    let messageIdURL = MessageIdURL.fromMessagesURL(messagesURL, eResult.messageId);
    let uResult = await messageIdURL.update(Aborter.none, eResult.popReceipt, 0, newMessage);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesURL.peek(Aborter.none);
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);

    let dResult = await messageIdURL.delete(Aborter.none, uResult.popReceipt!);
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);

    pResult = await messagesURL.peek(Aborter.none);
    assert.equal(pResult.peekedMessageItems.length, 0);
  });

  it("update and delete message with all parameters", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);
    let eResult = await messagesURL.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = "New Message";
    let messageIdURL = MessageIdURL.fromMessagesURL(messagesURL, eResult.messageId);
    let uResult = await messageIdURL.update(Aborter.none, eResult.popReceipt, 10, newMessage);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesURL.peek(Aborter.none);
    assert.equal(pResult.peekedMessageItems.length, 0);

    await delay(11 * 1000); // Sleep 11 seconds, and wait the message to be visible again

    let pResult2 = await messagesURL.peek(Aborter.none);
    assert.equal(pResult2.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult2.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message with 64KB characters size which is computed after encoding", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);
    let eResult = await messagesURL.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = new Array(64 * 1024 + 1).join("a");
    let messageIdURL = MessageIdURL.fromMessagesURL(messagesURL, eResult.messageId);
    let uResult = await messageIdURL.update(Aborter.none, eResult.popReceipt, 0, newMessage);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesURL.peek(Aborter.none);
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message negative with 65537B (64KB+1B) characters size which is computed after encoding", async () => {
    let messagesURL = MessagesURL.fromQueueURL(queueURL);
    let eResult = await messagesURL.enqueue(Aborter.none, messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = new Array(64 * 1024 + 2).join("a");

    let messageIdURL = MessageIdURL.fromMessagesURL(messagesURL, eResult.messageId);

    let error;
    try {
      await messageIdURL.update(Aborter.none, eResult.popReceipt, 0, newMessage);
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
    let messagesURL = MessagesURL.fromQueueURL(queueURL);
    let eResult = await messagesURL.enqueue(Aborter.none, messageContent);

    let messageIdURL = MessageIdURL.fromMessagesURL(messagesURL, eResult.messageId);

    let error;
    try {
      await messageIdURL.delete(Aborter.none, "invalid");
    } catch (err) {
      error = err;
    }
    assert.ok(error);
  });
});
