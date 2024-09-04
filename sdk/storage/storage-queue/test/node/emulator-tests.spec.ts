// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { Context } from "mocha";
import { QueueClient, QueueServiceClient } from "../../src";
import {
  getConnectionStringFromEnvironment,
  getQSU,
  getUniqueName,
  recorderEnvSetup,
} from "../utils";
import { Recorder, env } from "@azure-tools/test-recorder";

// Expected environment variables to run this test-suite
// STORAGE_CONNECTION_STRING=UseDevelopmentStorage=true
describe("Emulator Tests", () => {
  const messageContent = "Hello World";
  let queueName: string;
  let queueClient: QueueClient;
  let recorder: Recorder;
  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    if (!(env.STORAGE_CONNECTION_STRING ?? "").startsWith("UseDevelopmentStorage=true")) {
      this.skip();
    }
    const queueServiceClient = getQSU(recorder);
    queueName = getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async function () {
    if (queueClient) {
      await queueClient.delete();
    }
    await recorder.stop();
  });

  it("QueueClient can be created with a connection string and a queue name", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.sendMessage(messageContent);
    assert.ok(eResult.date);
    assert.ok(eResult.expiresOn);
    assert.ok(eResult.insertedOn);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);
  });

  it("QueueClient can update message with 64B encoded characters", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const eResult = await newClient.sendMessage(messageContent);
    assert.ok(eResult.messageId);
    assert.ok(eResult.popReceipt);

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
    assert.ok(uResult.popReceipt);

    const pResult = await newClient.peekMessages();
    assert.equal(pResult.peekedMessageItems.length, 1);
    assert.deepStrictEqual(pResult.peekedMessageItems[0].messageText, newMessage);
  });

  it("QueueClient can be created with a connection string and a queue name", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const result = await newClient.getProperties();

    assert.equal(newClient.name, queueName, "Queue name didn't match with the provided one.");
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("QueueServiceClient can be created from a connection string", async () => {
    const newClient = QueueServiceClient.fromConnectionString(getConnectionStringFromEnvironment());

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });
});
