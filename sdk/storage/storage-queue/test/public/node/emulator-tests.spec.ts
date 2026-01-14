// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueueClient, QueueServiceClient } from "../../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getStorageConnectionString } from "../../utils/injectables.js";
import { getUniqueName } from "../utils/utils.js";

function getConnectionString(mode?: "local"): string {
  const connStr = getStorageConnectionString();
  if (mode === "local" || !connStr) {
    return `UseDevelopmentStorage=true`;
  }
  return connStr;
}

describe.skip("Emulator Tests", () => {
  let queueServiceClient: QueueServiceClient;
  let queueName: string;
  let queueClient: QueueClient;
  const messageContent = "Hello World";
  const cs = getConnectionString("local");

  beforeEach(async () => {
    queueServiceClient = QueueServiceClient.fromConnectionString(cs);
    queueName = getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async () => {
    await queueClient.delete();
  });

  it("QueueClient can be created with a connection string", async () => {
    const newClient = new QueueClient(cs, queueName);
    assert.isDefined(newClient);

    const eResult = await newClient.sendMessage(messageContent);
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
  });

  it("QueueClient can update message with 64B encoded characters", async () => {
    const newClient = new QueueClient(cs, queueName);
    assert.isDefined(newClient);

    const eResult = await newClient.sendMessage(messageContent);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);

    const tempQueueClient = new QueueClient(cs, queueName);
    assert.isDefined(tempQueueClient);

    const buffer = Buffer.alloc(64); // 64B
    buffer.fill("a");
    buffer.write("aaaa", 0);
    const newMessage = buffer.toString();

    const uResult = await tempQueueClient.updateMessage(
      eResult.messageId,
      eResult.popReceipt,
      newMessage,
    );
    assert.isDefined(uResult.popReceipt);

    const pResult = await newClient.peekMessages();
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);
  });

  it("QueueClient getProperties with a connection string", async () => {
    const newClient = new QueueClient(cs, queueName);
    assert.isDefined(newClient);

    const result = await newClient.getProperties();

    assert.equal(newClient.name, queueName, "Queue name didn't match with the provided one.");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("QueueServiceClient can be created from a connection string", async () => {
    const newClient = QueueServiceClient.fromConnectionString(cs);
    assert.isDefined(newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
  });
});
