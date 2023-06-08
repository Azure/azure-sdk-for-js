// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  configureStorageClient,
  getBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils";
import {
  newPipeline,
  ShareDirectoryClient,
  StorageSharedKeyCredential,
  ShareClient,
} from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("DirectoryClient Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    const serviceClient = getBSU(recorder);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir"));
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();
  });

  afterEach(async function () {
    await dirClient.delete();
    await shareClient.delete();
    await recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const credential = dirClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareDirectoryClient(dirClient.url, credential);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const credential = dirClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareDirectoryClient(dirClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const credential = dirClient["credential"] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ShareDirectoryClient(dirClient.url, pipeline);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });
});
