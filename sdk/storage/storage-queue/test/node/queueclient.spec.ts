// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  getQSU,
  getConnectionStringFromEnvironment,
  getUniqueName,
  recorderEnvSetup,
  configureStorageClient,
  SimpleTokenCredential,
} from "../utils";
import { Recorder } from "@azure-tools/test-recorder";
import {
  getQueueServiceAccountAudience,
  newPipeline,
  QueueClient,
  QueueServiceClient,
} from "../../src";
import { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { Context } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";

describe("QueueClient Node.js only", () => {
  let queueName: string;
  let queueServiceClient: QueueServiceClient;
  let queueClient: QueueClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    queueServiceClient = getQSU(recorder);
    queueName = recorder.variable("queue", getUniqueName("queue"));
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async function () {
    await queueClient.delete();
    await recorder.stop();
  });

  it("QueueClient default audience should work", async () => {
    const queueClientWithOAuthToken = new QueueClient(queueClient.url, createTestCredential());

    configureStorageClient(recorder, queueClientWithOAuthToken);
    const exist = await queueClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("QueueClient customized audience should work", async () => {
    const queueClientWithOAuthToken = new QueueClient(queueClient.url, createTestCredential(), {
      audience: getQueueServiceAccountAudience(queueServiceClient.accountName),
    });

    configureStorageClient(recorder, queueClientWithOAuthToken);
    const exist = await queueClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("QueueClient Bearer token challenge should work", async () => {
    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const queueClientWithPlainOAuthToken = new QueueClient(
      queueClient.url,
      new SimpleTokenCredential(authToken!.token),
    );

    configureStorageClient(recorder, queueClientWithPlainOAuthToken);

    try {
      await queueClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const queueClientWithOAuthToken = new QueueClient(queueClient.url, createTestCredential(), {
      audience: "https://badaudience.blob.core.windows.net/.default",
    });
    configureStorageClient(recorder, queueClientWithOAuthToken);
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
    const credential = queueClient["credential"];
    const newClient = new QueueClient(queueClient.url, credential);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const credential = queueClient["credential"];
    const newClient = new QueueClient(queueClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const credential = queueClient["credential"];
    const pipeline = newPipeline(credential);
    const newClient = new QueueClient(queueClient.url, pipeline);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a connection string and a queue name", async () => {
    const newClient = new QueueClient(getConnectionStringFromEnvironment(), queueName);
    configureStorageClient(recorder, newClient);

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
    configureStorageClient(recorder, newClient);

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
      tokenCredential,
    );
    configureStorageClient(recorder, newClient);
    assertClientUsesTokenCredential(newClient);
  });
});
