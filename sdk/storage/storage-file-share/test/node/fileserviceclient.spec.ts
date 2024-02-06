// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  configureStorageClient,
  getBSU,
  getConnectionStringFromEnvironment,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils";
import { ShareServiceClient, newPipeline, StorageSharedKeyCredential } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("FileServiceClient Node.js only", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const serviceClient = getBSU(recorder);
    const credential = serviceClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareServiceClient(serviceClient.url, credential);
    configureStorageClient(recorder, newClient);
    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const serviceClient = getBSU(recorder);
    const credential = serviceClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareServiceClient(serviceClient.url, credential, {
      retryOptions: { maxTries: 5 },
    });
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a pipeline", async () => {
    const serviceClient = getBSU(recorder);
    const credential = serviceClient["credential"] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ShareServiceClient(serviceClient.url, pipeline);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created from a connection string", async () => {
    const newClient = ShareServiceClient.fromConnectionString(getConnectionStringFromEnvironment());
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can be created from a connection string and an option bag", async () => {
    const newClient = ShareServiceClient.fromConnectionString(
      getConnectionStringFromEnvironment(),
      {
        retryOptions: {
          maxTries: 5,
        },
      }
    );

    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });
});
