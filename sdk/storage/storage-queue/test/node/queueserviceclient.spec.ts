// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getQSU,
  getConnectionStringFromEnvironment,
  recorderEnvSetup,
  configureStorageClient,
} from "../utils/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { QueueServiceClient } from "../../src/QueueServiceClient.js";
import { newPipeline } from "../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../utils/assert.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("QueueServiceClient Node.js only", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const queueServiceClient = getQSU(recorder);
    const credential = queueServiceClient["credential"];
    const newClient = new QueueServiceClient(queueServiceClient.url, credential);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const queueServiceClient = getQSU(recorder);
    const credential = queueServiceClient["credential"];
    const newClient = new QueueServiceClient(queueServiceClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
  });

  it("can be created with a url and a pipeline", async () => {
    const queueServiceClient = getQSU(recorder);
    const credential = queueServiceClient["credential"];
    const pipeline = newPipeline(credential);
    const newClient = new QueueServiceClient(queueServiceClient.url, pipeline);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
  });

  it("can be created from a connection string", async () => {
    const newClient = QueueServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
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
      tokenCredential,
    );
    configureStorageClient(recorder, newClient);
    assertClientUsesTokenCredential(newClient);
  });
});
