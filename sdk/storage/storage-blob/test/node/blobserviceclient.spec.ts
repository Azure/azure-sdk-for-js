// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { BlobServiceClient, newPipeline, StorageSharedKeyCredential } from "../../src";
import {
  configureBlobStorageClient,
  getBSU,
  getConnectionStringFromEnvironment,
  recorderEnvSetup,
} from "../utils";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("BlobServiceClient Node.js only", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can be created with a url and a credential", async function () {
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
