// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import {
  SimpleTokenCredential,
  configureStorageClient,
  getAccountName,
  getBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils";
import type { StorageSharedKeyCredential, ShareClient } from "../../src";
import { newPipeline, ShareDirectoryClient, getFileServiceAccountAudience } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import type { Context } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";

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

  it("Default audience should work", async () => {
    const dirClientWithOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      createTestCredential(),
      { fileRequestIntent: "backup" },
    );
    configureStorageClient(recorder, dirClientWithOAuthToken);

    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Customized audience should work", async () => {
    const dirClientWithOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      createTestCredential(),
      {
        audience: getFileServiceAccountAudience(getAccountName()),
        fileRequestIntent: "backup",
      },
    );
    configureStorageClient(recorder, dirClientWithOAuthToken);

    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Bad audience should work", async () => {
    const token = await createTestCredential().getToken(
      "https://badaudience.file.core.windows.net/.default",
    );
    const dirClientWithSimpleOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      new SimpleTokenCredential(token!.token, new Date(token!.expiresOnTimestamp)),
      {
        fileRequestIntent: "backup",
      },
    );
    configureStorageClient(recorder, dirClientWithSimpleOAuthToken);

    try {
      await dirClientWithSimpleOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const dirClientWithOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      createTestCredential(),
      {
        audience: "https://badaudience.file.core.windows.net/.default",
        fileRequestIntent: "backup",
      },
    );
    configureStorageClient(recorder, dirClientWithOAuthToken);

    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
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
