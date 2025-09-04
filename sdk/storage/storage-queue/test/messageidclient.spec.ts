// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getQSU, getSASConnectionStringFromEnvironment, uriSanitizers } from "./utils/index.js";
import { QueueClient } from "../src/QueueClient.js";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { extractConnectionStringParts } from "../src/utils/utils.common.js";
import { getUniqueName, recorderEnvSetup } from "./utils/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("QueueClient messageId methods", () => {
  let queueName: string;
  let queueClient: QueueClient;
  const messageContent = "Hello World";

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const queueServiceClient = getQSU(recorder);
    queueName = recorder.variable("queue", getUniqueName("queue"));
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async () => {
    await queueClient.delete();
    await recorder.stop();
  });

  it("update and delete empty message with default parameters", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    const newMessage = "";
    const uResult = await queueClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      newMessage,
    );
    assert.ok(uResult.version);
    assert.ok(uResult.nextVisibleOn);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(eResult.clientRequestId);
    assert.ok(uResult.popReceipt);

    let pResult = await queueClient.peekMessages();
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);

    const dResult = await queueClient.deleteMessage(eResult.messageId, uResult.popReceipt!);
    assert.ok(dResult.date);
    assert.ok(dResult.requestId);
    assert.ok(dResult.version);

    pResult = await queueClient.peekMessages();
    assert.equal(pResult.peekedMessageItems.length, 0);
  });

  it("update and delete message with all parameters", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    const newMessage = "New Message";
    const uResult = await queueClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      newMessage,
      10,
    );
    assert.ok(uResult.version);
    assert.ok(uResult.nextVisibleOn);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    const pResult = await queueClient.peekMessages();
    assert.equal(pResult.peekedMessageItems.length, 0);

    await delay(11 * 1000); // Sleep 11 seconds, and wait the message to be visible again

    const pResult2 = await queueClient.peekMessages();
    assert.equal(pResult2.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult2.peekedMessageItems[0].messageText, newMessage);
  });

  it("update and delete message with all parameters - test sas connection string MessageIdClient constructor", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    const newMessage = "New Message";
    const uResult = await queueClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      newMessage,
      10,
    );
    assert.ok(uResult.version);
    assert.ok(uResult.nextVisibleOn);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    const pResult = await queueClient.peekMessages();
    assert.equal(pResult.peekedMessageItems.length, 0);

    await delay(11 * 1000); // Sleep 11 seconds, and wait the message to be visible again

    const pResult2 = await queueClient.peekMessages();
    assert.equal(pResult2.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult2.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message with 64KB characters size which is computed after encoding", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    const newMessage = new Array(64 * 1024 + 1).join("a");
    const uResult = await queueClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      newMessage,
    );
    assert.ok(uResult.version);
    assert.ok(uResult.nextVisibleOn);
    assert.ok(uResult.date);
    assert.ok(uResult.requestId);
    assert.ok(uResult.popReceipt);

    const pResult = await queueClient.peekMessages();
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);
  });

  it("update message negative with 65537B (64KB+1B) characters size which is computed after encoding", async () => {
    const eResult = await queueClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
    assert.ok(eResult.requestId);
    assert.ok(eResult.nextVisibleOn);
    assert.ok(eResult.version);

    const newMessage = new Array(64 * 1024 + 2).join("a");

    let error;
    try {
      await queueClient.updateMessage(eResult.messageId, eResult.popReceipt, newMessage);
    } catch (err: any) {
      error = err;
    }
    assert.ok(error);
    assert.ok(
      error.message.includes(
        "The request body is too large and exceeds the maximum permissible limit.",
      ),
    );
  });

  it("delete message negative", async () => {
    const eResult = await queueClient.sendMessage(messageContent);

    let error;
    try {
      await queueClient.deleteMessage(eResult.messageId, "invalid");
    } catch (err: any) {
      error = err;
    }
    assert.ok(error);
  });

  it("verify messageID and queueName passed to the client", async () => {
    const newClient = new QueueClient(
      extractConnectionStringParts(getSASConnectionStringFromEnvironment(recorder)).url +
        "/" +
        queueName,
    );
    assert.equal(newClient.name, queueName, "Queue name is not the same as the one provided.");
  });

  it("update visibility timeout only preserve content", async () => {
    const message = "foo";
    const enqueueRes = await queueClient.sendMessage(message, { visibilityTimeout: 10 });
    await queueClient.updateMessage(enqueueRes.messageId, enqueueRes.popReceipt);
    const receiveMessage = (await queueClient.receiveMessages()).receivedMessageItems[0];
    assert.equal(enqueueRes.messageId, receiveMessage.messageId);
    assert.equal(message, receiveMessage.messageText);
  });
});
