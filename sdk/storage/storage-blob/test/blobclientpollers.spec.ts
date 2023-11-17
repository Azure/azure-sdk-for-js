// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { getBSU } from "./utils";
import { Recorder, isRecordMode, isPlaybackMode, isLiveMode } from "@azure-tools/test-recorder";
import {
  getUniqueName,
  recorderEnvSetupWithCopySource,
  testPollerProperties,
  uriSanitizers,
} from "./utils/testutils.common";
import { BlobClient, BlockBlobClient, ContainerClient, BlobBeginCopyFromURLResponse } from "../src";
import { Context } from "mocha";
import { isNode } from "@azure/test-utils";

describe("BlobClient beginCopyFromURL Poller", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let destinationContainerClient: ContainerClient;
  let destinationContainerName: string;
  const content = "Hello World";

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    // Copy source for all cases in this suite doesn't include any credential, it's save to keep x-ms-copy-source header.
    await recorder.start(recorderEnvSetupWithCopySource);
    await recorder.addSanitizers({ uriSanitizers }, ["playback", "record"]);
    const blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
    destinationContainerName = recorder.variable("dest-container", getUniqueName("dest-container"));
    destinationContainerClient = blobServiceClient.getContainerClient(destinationContainerName);
    await destinationContainerClient.create();
  });

  afterEach(async function (this: Context) {
    if (containerClient) {
      await containerClient.delete();
    }
    if (destinationContainerClient) {
      await destinationContainerClient.delete();
    }
    await recorder.stop();
  });

  it("supports automatic polling via pollUntilDone", async function () {
    if (!isNode && !isLiveMode()) {
      this.skip();
    }
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.variable("copiedblob", getUniqueName("copiedblob"))
    );

    // specify poller type to ensure types are properly exported
    const poller = await newBlobClient.beginCopyFromURL(blobClient.url, testPollerProperties);

    const result = await poller.pollUntilDone();
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    // A service feature is being rolling out which will sanitize the sig field
    // so we remove it before comparing urls.
    assert.ok(properties2.copySource, "Expecting valid 'properties2.copySource");

    const sanitizedActualUrl = new URL(properties2.copySource!);
    sanitizedActualUrl.searchParams.delete("sig");

    const sanitizedExpectedUrl = new URL(blobClient.url);
    sanitizedExpectedUrl.searchParams.delete("sig");

    assert.strictEqual(
      sanitizedActualUrl.toString(),
      sanitizedExpectedUrl.toString(),
      "copySource does not match original source"
    );
  });

  it("supports manual polling via poll", async function () {
    if (!isNode && !isLiveMode()) {
      this.skip();
    }
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.variable("copiedblob", getUniqueName("copiedblob"))
    );
    const poller = await newBlobClient.beginCopyFromURL(blobClient.url, testPollerProperties);
    let result: BlobBeginCopyFromURLResponse;
    do {
      await poller.poll();
      if (poller.isDone()) {
        result = await poller.getResult()!;
      }
    } while (!poller.isDone());

    assert.ok(result!);
    assert.ok(result!.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result!.copyId);

    // A service feature is being rolling out which will sanitize the sig field
    // so we remove it before comparing urls.
    assert.ok(properties2.copySource, "Expecting valid 'properties2.copySource");

    const sanitizedActualUrl = new URL(properties2.copySource!);
    sanitizedActualUrl.searchParams.delete("sig");

    const sanitizedExpectedUrl = new URL(blobClient.url);
    sanitizedExpectedUrl.searchParams.delete("sig");

    assert.strictEqual(
      sanitizedActualUrl.toString(),
      sanitizedExpectedUrl.toString(),
      "copySource does not match original source"
    );
  });

  it("supports cancellation of the copy", async function (this: Context) {
    if (!(isRecordMode() || isPlaybackMode())) {
      // Depends on the service not returning 'success' as soon as
      // the copy is initiated. Since this can't be guaranteed in the live tests,
      // these tests will only run with the unit tests with pre-recorded service responses.
      this.skip();
    }
    if (!isNode && !isLiveMode()) {
      this.skip();
    }

    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.variable("copiedblob", getUniqueName("copiedblob"))
    );
    const poller = await newBlobClient.beginCopyFromURL(
      "https://azure.github.io/azure-sdk-for-js/index.html",
      testPollerProperties
    );
    await poller.cancelOperation();
    try {
      await poller.pollUntilDone();
      throw new Error("Test failure");
    } catch (err: any) {
      assert.equal(err.name, "PollerCancelledError");
    }
  });

  it("supports updating on progress events", async function (this: Context) {
    if (!(isRecordMode() || isPlaybackMode())) {
      // Depends on the service not returning 'success' as soon as
      // the copy is initiated. Since this can't be guaranteed in the live tests,
      // these tests will only run with the unit tests with pre-recorded service responses.
      this.skip();
    }
    if (!isNode) {
      this.skip();
    }

    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.variable("copiedblob", getUniqueName("copiedblob"))
    );
    let onProgressCalled = false;
    const poller = await newBlobClient.beginCopyFromURL(
      "https://azure.github.io/azure-sdk-for-js/index.html",
      {
        onProgress(_) {
          onProgressCalled = true;
        },
        ...testPollerProperties,
      }
    );
    await poller.pollUntilDone();
    assert.equal(onProgressCalled, true, "onProgress handler was not called.");
  });

  it("supports restoring poller state from another poller", async function () {
    if (!isNode && !isLiveMode()) {
      this.skip();
    }

    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.variable("copiedblob", getUniqueName("copiedblob"))
    );

    const copySourceUrl = "https://azure.github.io/azure-sdk-for-js/index.html";

    const poller1 = await newBlobClient.beginCopyFromURL(copySourceUrl, testPollerProperties);

    poller1.stopPolling();

    const state = poller1.toString();

    const poller2 = await newBlobClient.beginCopyFromURL(copySourceUrl, {
      resumeFrom: state,
      ...testPollerProperties,
    });
    const result = await poller2.pollUntilDone();
    assert.ok(result.copyId);
    assert.equal(result.copyStatus, "success", "Poller2 copy failed.");
  });
});
