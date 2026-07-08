// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getQSU,
  getConnectionStringFromEnvironment,
  createAndStartRecorder,
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
    recorder = await createAndStartRecorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("IPv6 Test", async () => {
    const accountName = "storageaccount";

    let queueServiceURL = `https://${accountName}-ipv6.queue.core.windows.net/`;
    let queueServiceClient = new QueueServiceClient(queueServiceURL);
    assert.deepEqual(queueServiceClient.accountName, accountName);

    queueServiceURL = `https://${accountName}-secondary-ipv6.queue.core.windows.net/`;
    queueServiceClient = new QueueServiceClient(queueServiceURL);
    assert.deepEqual(queueServiceClient.accountName, accountName);

    queueServiceURL = `https://${accountName}-secondary-dualstack.queue.core.windows.net/`;
    queueServiceClient = new QueueServiceClient(queueServiceURL);
    assert.deepEqual(queueServiceClient.accountName, accountName);

    queueServiceURL = `https://${accountName}-dualstack.queue.windows.net/`;
    queueServiceClient = new QueueServiceClient(queueServiceURL);
    assert.deepEqual(queueServiceClient.accountName, accountName);

    queueServiceURL = `https://${accountName}-secondary.queue.windows.net/`;
    queueServiceClient = new QueueServiceClient(queueServiceURL);
    assert.deepEqual(queueServiceClient.accountName, accountName);

    queueServiceURL = `https://${accountName}-something.queue.windows.net/`;
    queueServiceClient = new QueueServiceClient(queueServiceURL);
    assert.deepEqual(queueServiceClient.accountName, accountName + "-something");
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
