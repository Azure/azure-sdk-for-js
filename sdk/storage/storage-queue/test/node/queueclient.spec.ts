// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getQSU, getConnectionStringFromEnvironment } from "../utils";
import { record, Recorder } from "@azure-tools/test-recorder";
import {
  getQueueServiceAccountAudience,
  newPipeline,
  QueueClient,
  QueueServiceClient,
  StorageSharedKeyCredential,
} from "../../src";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { SimpleTokenCredential, recorderEnvSetup } from "../utils/testutils.common";
import { Context } from "mocha";
import { DefaultAzureCredential } from "@azure/identity";

describe("QueueClient Node.js only", () => {
  let queueName: string;
  let queueServiceClient: QueueServiceClient;
  let queueClient: QueueClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    queueServiceClient = getQSU();
    queueName = recorder.getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async function () {
    await queueClient.delete();
    await recorder.stop();
  });

  it("QueueClient default audience should work", async () => {
    const queueClientWithOAuthToken = new QueueClient(
      queueClient.url,
      new DefaultAzureCredential()
    );
    const exist = await queueClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("QueueClient customized audience should work", async () => {
    const queueClientWithOAuthToken = new QueueClient(
      queueClient.url,
      new DefaultAzureCredential(),
      { audience: getQueueServiceAccountAudience(queueServiceClient.accountName) }
    );
    const exist = await queueClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("QueueClient Bearer token challenge should work", async () => {
    // Validate that bad audience should fail first.
    const authToken = await new DefaultAzureCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default"
    );
    const queueClientWithPlainOAuthToken = new QueueClient(
      queueClient.url,
      new SimpleTokenCredential(authToken.token)
    );

    try {
      await queueClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const queueClientWithOAuthToken = new QueueClient(
      queueClient.url,
      new DefaultAzureCredential(),
      {
        audience: "https://badaudience.blob.core.windows.net/.default",
      }
    );
    const exist = await queueClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("getAccessPolicy", async () => {
    const result = await queueClient.getAccessPolicy();
    assert.ok(result.requestId);
    assert.ok(result.clientRequestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("setAccessPolicy", async () => {
    const queueAcl = [
      {
        accessPolicy: {
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: "raup",
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    await queueClient.setAccessPolicy(queueAcl);
    const result = await queueClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, queueAcl);
  });

  it("setAccessPolicy should work when permissions, expiry and start undefined", async () => {
    const queueAcl = [
      {
        accessPolicy: {
          permissions: "raup",
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];
    await queueClient.setAccessPolicy(queueAcl);
    const result = await queueClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, queueAcl);

    const queueAclEmpty = [
      {
        accessPolicy: {},
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];
    await queueClient.setAccessPolicy(queueAclEmpty);
    const resultEmpty = await queueClient.getAccessPolicy();
    assert.deepEqual(resultEmpty.signedIdentifiers[0].accessPolicy, undefined);
  });

  it("can be created with a url and a credential", async () => {
    const factories = (queueClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new QueueClient(queueClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (queueClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new QueueClient(queueClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });

    const result = await newClient.getProperties();

    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (queueClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new QueueClient(queueClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a connection string and a queue name", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);

    const result = await newClient.getProperties();

    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a connection string and a queue name and an option bag", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName, {
      retryOptions: {
        maxTries: 5,
      },
    });

    const result = await newClient.getProperties();

    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = new QueueClient(
      `https://myaccount.queue.core.windows.net/` + queueName,
      tokenCredential
    );
    assertClientUsesTokenCredential(newClient);
  });
});
