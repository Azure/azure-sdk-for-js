// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { QueueClient, QueueServiceClient } from "../../src/index.js";
import {
  getConnectionStringFromEnvironment,
  getQSU,
  getUniqueName,
  recorderEnvSetup,
} from "../utils/index.js";
import { Recorder, env } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

// Expected environment variables to run this test-suite
// STORAGE_CONNECTION_STRING=UseDevelopmentStorage=true
describe("Emulator Tests", () => {
  const messageContent = "Hello World";
  let queueName: string;
  let queueClient: QueueClient;
  let recorder: Recorder;
  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    if (!(env.STORAGE_CONNECTION_STRING ?? "").startsWith("UseDevelopmentStorage=true")) {
      ctx.skip();
    }
    const queueServiceClient = getQSU(recorder);
    queueName = getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async () => {
    if (queueClient) {
      await queueClient.delete();
    }
    await recorder.stop();
  });

  it("QueueClient can be created with a connection string and a queue name", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.sendMessage(messageContent);
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
  });

  it("QueueClient can update message with 64B encoded characters", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.sendMessage(messageContent);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);

    const tempQueueClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

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

  it("QueueClient can be created with a connection string and a queue name", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const result = await newClient.getProperties();

    assert.equal(newClient.name, queueName, "Queue name didn't match with the provided one.");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("QueueServiceClient can be created from a connection string", async () => {
    const newClient = QueueServiceClient.fromConnectionString(getConnectionStringFromEnvironment());

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
  });
});
