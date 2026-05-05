// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getQSU, getSASConnectionStringFromEnvironment } from "#test-utils";
import { QueueClient } from "../../src/QueueClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { extractConnectionStringParts } from "../../src/utils/utils.common.js";
import {
  configureStorageClient,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils/testutils.common.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("QueueClient message methods", () => {
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

  it("can be created with a sas connection string and a queue name", async () => {
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(recorder), queueName);
    configureStorageClient(recorder, newClient);
    const eResult = await newClient.sendMessage(messageContent);
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
  });

  it("can be created with a sas connection string and a queue name and an option bag", async () => {
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(recorder), queueName, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);

    const eResult = await newClient.sendMessage(messageContent);
    assert.isDefined(eResult.date);
    assert.isDefined(eResult.expiresOn);
    assert.isDefined(eResult.insertedOn);
    assert.isDefined(eResult.messageId);
    assert.isDefined(eResult.popReceipt);
  });

  it("throws error if constructor queueName parameter is empty", async () => {
    try {
      new QueueClient(getSASConnectionStringFromEnvironment(recorder), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for queueName parameter",
        error.message,
        "Error message is different than expected.",
      );
    }
  });

  it("verify queueName passed to the client", async () => {
    const newClient = new QueueClient(
      extractConnectionStringParts(getSASConnectionStringFromEnvironment(recorder)).url +
        "/" +
        queueName +
        "/messages/",
    );
    configureStorageClient(recorder, newClient);
    assert.equal(newClient.name, queueName, "Queue name is not the same as the one provided.");
  });
});
