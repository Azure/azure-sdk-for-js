import * as assert from "assert";
import { getQSU, getSASConnectionStringFromEnvironment } from "./utils";
import { QueueClient } from "../src/QueueClient";
import { record, delay } from "./utils/recorder";
import * as dotenv from "dotenv";
import { MessageIdClient } from "../src";
dotenv.config({ path: "../.env" });

describe("MessageIdClient", () => {
  const queueServiceClient = getQSU();
  let queueName: string;
  let queueClient: QueueClient;
  const messageContent = "Hello World";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    queueName = recorder.getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async function() {
    await queueClient.delete();
    recorder.stop();
  });

  it("update and delete empty message with default parameters", async () => {
    let messagesClient = queueClient.getMessagesClient();
    let eResult = await messagesClient.enqueue(messageContent);
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
    let messageIdClient = messagesClient.getMessageIdClient(eResult.messageId);
    let uResult = await messageIdClient.update(eResult.popReceipt, newMessage);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesClient.peek();
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);

    let dResult = await messageIdClient.delete(uResult.popReceipt!);
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);

    pResult = await messagesClient.peek();
    assert.equal(pResult.peekedMessageItems.length, 0);
  });

  it("update and delete message with all parameters", async () => {
    let messagesClient = queueClient.getMessagesClient();
    let eResult = await messagesClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = "New Message";
    let messageIdClient = messagesClient.getMessageIdClient(eResult.messageId);
    let uResult = await messageIdClient.update(eResult.popReceipt, newMessage, 10);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesClient.peek();
    assert.equal(pResult.peekedMessageItems.length, 0);

    await delay(11 * 1000); // Sleep 11 seconds, and wait the message to be visible again

    let pResult2 = await messagesClient.peek();
    assert.equal(pResult2.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult2.peekedMessageItems[0].messageText, newMessage);
  });

  it("update and delete message with all parameters - test sas connection string MessageIdClient constructor", async () => {
    let messagesClient = queueClient.getMessagesClient();
    let eResult = await messagesClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = "New Message";
    let messageIdClient = new MessageIdClient(
      getSASConnectionStringFromEnvironment(),
      queueName,
      eResult.messageId
    );
    let uResult = await messageIdClient.update(eResult.popReceipt, newMessage, 10);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesClient.peek();
    assert.equal(pResult.peekedMessageItems.length, 0);

    await delay(11 * 1000); // Sleep 11 seconds, and wait the message to be visible again

    let pResult2 = await messagesClient.peek();
    assert.equal(pResult2.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult2.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message with 64KB characters size which is computed after encoding", async () => {
    let messagesClient = queueClient.getMessagesClient();
    let eResult = await messagesClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = new Array(64 * 1024 + 1).join("a");
    let messageIdClient = messagesClient.getMessageIdClient(eResult.messageId);
    let uResult = await messageIdClient.update(eResult.popReceipt, newMessage);
    assert.ok(uResult.version);
    assert.ok(uResult.timeNextVisible);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    let pResult = await messagesClient.peek();
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message negative with 65537B (64KB+1B) characters size which is computed after encoding", async () => {
    let messagesClient = queueClient.getMessagesClient();
    let eResult = await messagesClient.enqueue(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expirationTime);
    assert.ok(eResult.insertionTime);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.timeNextVisible);
    assert.ok(eResult.version);

    let newMessage = new Array(64 * 1024 + 2).join("a");

    let messageIdClient = messagesClient.getMessageIdClient(eResult.messageId);

    let error;
    try {
      await messageIdClient.update(eResult.popReceipt, newMessage);
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
    let messagesClient = queueClient.getMessagesClient();
    let eResult = await messagesClient.enqueue(messageContent);

    let messageIdClient = messagesClient.getMessageIdClient(eResult.messageId);

    let error;
    try {
      await messageIdClient.delete("invalid");
    } catch (err) {
      error = err;
    }
    assert.ok(error);
  });
});
