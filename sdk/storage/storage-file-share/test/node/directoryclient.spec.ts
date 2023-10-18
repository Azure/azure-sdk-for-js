// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getAccountName, getBSU, recorderEnvSetup } from "../utils";
import {
  newPipeline,
  ShareDirectoryClient,
  StorageSharedKeyCredential,
  ShareClient,
  getFileServiceAccountAudience,
} from "../../src";
import { isLiveMode, record, Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { DefaultAzureCredential } from "@azure/identity";

describe("DirectoryClient Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.getUniqueName("dir");
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();
  });

  afterEach(async function () {
    await dirClient.delete();
    await shareClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async function (this: Context) {
    // Pipeline config doesn't support well for file OAuth, disable live test for now.
    // Should add this back after pipeline config is enabled.
    if (isLiveMode()) {
      this.skip();
    }
    const dirClientWithOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      new DefaultAzureCredential(),
      { fileRequestIntent: "backup" }
    );
    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Customized audience should work", async function (this: Context) {
    // Pipeline config doesn't support well for file OAuth, disable live test for now.
    // Should add this back after pipeline config is enabled.
    if (isLiveMode()) {
      this.skip();
    }
    const dirClientWithOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      new DefaultAzureCredential(),
      {
        audience: getFileServiceAccountAudience(getAccountName()),
        fileRequestIntent: "backup",
      }
    );
    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Bad audience should fail", async function (this: Context) {
    // Pipeline config doesn't support well for file OAuth, disable live test for now.
    // Should add this back after pipeline config is enabled.
    if (isLiveMode()) {
      this.skip();
    }
    const dirClientWithOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      new DefaultAzureCredential(),
      {
        audience: "https://badaudience.file.core.windows.net/.default",
        fileRequestIntent: "backup",
      }
    );
    try {
      await dirClientWithOAuthToken.exists();
      assert.fail("Should fail with 403");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 403);
    }
  });

  it("can be created with a url and a credential", async () => {
    const factories = (dirClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new ShareDirectoryClient(dirClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (dirClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new ShareDirectoryClient(dirClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (dirClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ShareDirectoryClient(dirClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });
});
