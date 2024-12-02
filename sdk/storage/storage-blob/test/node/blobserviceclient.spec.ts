// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";

import {
  configureBlobStorageClient,
  getBSU,
  getConnectionStringFromEnvironment,
  recorderEnvSetup,
  SimpleTokenCredential,
} from "../utils";
import type { StorageSharedKeyCredential } from "../../src";
import { BlobServiceClient, getBlobServiceAccountAudience, newPipeline } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import type { Context } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";

describe("BlobServiceClient Node.js only", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    const serviceClient = getBSU(recorder);
    const blobServiceClientWithOAuthToken = new BlobServiceClient(
      serviceClient.url,
      createTestCredential(),
    );
    configureBlobStorageClient(recorder, blobServiceClientWithOAuthToken);
    await blobServiceClientWithOAuthToken.getProperties();
  });

  it("Customized audience should work", async () => {
    const serviceClient = getBSU(recorder);
    const blobServiceClientWithOAuthToken = new BlobServiceClient(
      serviceClient.url,
      createTestCredential(),
      {
        audience: [getBlobServiceAccountAudience(serviceClient.accountName)],
      },
    );
    configureBlobStorageClient(recorder, blobServiceClientWithOAuthToken);
    await blobServiceClientWithOAuthToken.getProperties();
  });

  it("Bearer token challenge should work", async () => {
    const serviceClient = getBSU(recorder);

    // To validate that bad audience should fail.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const blobServiceClientWithPlainOAuthToken = new BlobServiceClient(
      serviceClient.url,
      new SimpleTokenCredential(authToken!.token),
    );
    configureBlobStorageClient(recorder, blobServiceClientWithPlainOAuthToken);

    try {
      await blobServiceClientWithPlainOAuthToken.getProperties();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }
    const blobServiceClientWithOAuthToken = new BlobServiceClient(
      serviceClient.url,
      createTestCredential(),
      {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      },
    );
    configureBlobStorageClient(recorder, blobServiceClientWithOAuthToken);
    await blobServiceClientWithOAuthToken.getProperties();
  });

  it("can be created with a url and a credential", async () => {
    const serviceClient = getBSU(recorder);
    const credential = (serviceClient as any).credential as StorageSharedKeyCredential;
    const newClient = new BlobServiceClient(serviceClient.url, credential);
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a credential and an option bag", async function () {
    const serviceClient = getBSU(recorder);
    const credential = (serviceClient as any).credential as StorageSharedKeyCredential;
    const newClient = new BlobServiceClient(serviceClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a pipeline", async function () {
    const serviceClient = getBSU(recorder);
    const credential = (serviceClient as any).credential as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new BlobServiceClient(serviceClient.url, pipeline);
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created from a connection string", async function () {
    const newClient = BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can be created from a connection string and an option bag", async function () {
    const newClient = BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment(), {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });
});
