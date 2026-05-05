// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getQSU, getSASConnectionStringFromEnvironment, uriSanitizers } from "#test-utils";
import { QueueClient } from "../../src/QueueClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { extractConnectionStringParts } from "../../src/utils/utils.common.js";
import { getUniqueName, recorderEnvSetup } from "#test-utils";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("QueueClient messageId methods", () => {
  let queueName: string;
  let queueClient: QueueClient;

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

  it("verify messageID and queueName passed to the client", async () => {
    const newClient = new QueueClient(
      extractConnectionStringParts(getSASConnectionStringFromEnvironment(recorder)).url +
        "/" +
        queueName,
    );
    assert.equal(newClient.name, queueName, "Queue name is not the same as the one provided.");
  });
});
