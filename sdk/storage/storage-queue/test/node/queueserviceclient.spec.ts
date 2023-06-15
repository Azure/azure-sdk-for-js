// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getQSU, getConnectionStringFromEnvironment } from "../utils";
import { record, Recorder } from "@azure-tools/test-recorder";
import { QueueServiceClient } from "../../src/QueueServiceClient";
import { newPipeline } from "../../src";
import { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { recorderEnvSetup } from "../utils/testutils.common";
import { Context } from "mocha";

describe("QueueServiceClient Node.js only", () => {
  let recorder: Recorder;

  beforeEach(function (this: Context) {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const queueServiceClient = getQSU();
    const credential = queueServiceClient["credential"];
    const newClient = new QueueServiceClient(queueServiceClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const queueServiceClient = getQSU();
    const credential = queueServiceClient["credential"];
    const newClient = new QueueServiceClient(queueServiceClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a pipeline", async () => {
    const queueServiceClient = getQSU();
    const credential = queueServiceClient["credential"];
    const pipeline = newPipeline(credential);
    const newClient = new QueueServiceClient(queueServiceClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created from a connection string", async () => {
    const newClient = QueueServiceClient.fromConnectionString(getConnectionStringFromEnvironment());

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = new QueueServiceClient(
      "https://accountname.queue.core.windows.net",
      tokenCredential
    );
    assertClientUsesTokenCredential(newClient);
  });
});
