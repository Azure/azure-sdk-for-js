// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as assert from "assert";
import * as dotenv from "dotenv";

import { getBSU } from "./utils";
import { record, Recorder, isRecordMode, isPlaybackMode } from "@azure/test-utils-recorder";
import { recorderEnvSetup, testPollerProperties } from "./utils/testutils.common";
import {
  BlobClient,
  BlockBlobClient,
  ContainerClient,
  BlobBeginCopyFromURLResponse,
  PollerLike,
  PollOperationState
} from "../src";
import { URLBuilder, URLQuery } from "@azure/core-http";
dotenv.config();

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

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
    destinationContainerName = recorder.getUniqueName("dest-container");
    destinationContainerClient = blobServiceClient.getContainerClient(destinationContainerName);
    await destinationContainerClient.create();
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await containerClient.delete();
      await destinationContainerClient.delete();
      await recorder.stop();
    }
  });

  it("supports automatic polling via pollUntilDone", async () => {
    recorder.skip("browser");
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.getUniqueName("copiedblob")
    );

    // specify poller type to ensure types are properly exported
    const poller: PollerLike<
      PollOperationState<BlobBeginCopyFromURLResponse>,
      BlobBeginCopyFromURLResponse
    > = await newBlobClient.beginCopyFromURL(blobClient.url, testPollerProperties);

    const result = await poller.pollUntilDone();
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);

    // A service feature is being rolling out which will sanitize the sig field
    // so we remove it before comparing urls.
    assert.ok(properties2.copySource, "Expecting valid 'properties2.copySource");

    const sanitizedActualUrl = URLBuilder.parse(properties2.copySource!);
    const sanitizedQuery = URLQuery.parse(sanitizedActualUrl.getQuery()!);
    sanitizedQuery.set("sig", undefined);
    sanitizedActualUrl.setQuery(sanitizedQuery.toString());

    const sanitizedExpectedUrl = URLBuilder.parse(blobClient.url);
    const sanitizedQuery2 = URLQuery.parse(sanitizedActualUrl.getQuery()!);
    sanitizedQuery2.set("sig", undefined);
    sanitizedExpectedUrl.setQuery(sanitizedQuery.toString());

    assert.strictEqual(
      sanitizedActualUrl.toString(),
      sanitizedExpectedUrl.toString(),
      "copySource does not match original source"
    );
  });

  it("supports manual polling via poll", async () => {
    recorder.skip("browser");
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.getUniqueName("copiedblob")
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

    const sanitizedActualUrl = URLBuilder.parse(properties2.copySource!);
    const sanitizedQuery = URLQuery.parse(sanitizedActualUrl.getQuery()!);
    sanitizedQuery.set("sig", undefined);
    sanitizedActualUrl.setQuery(sanitizedQuery.toString());

    const sanitizedExpectedUrl = URLBuilder.parse(blobClient.url);
    const sanitizedQuery2 = URLQuery.parse(sanitizedActualUrl.getQuery()!);
    sanitizedQuery2.set("sig", undefined);
    sanitizedExpectedUrl.setQuery(sanitizedQuery.toString());

    assert.strictEqual(
      sanitizedActualUrl.toString(),
      sanitizedExpectedUrl.toString(),
      "copySource does not match original source"
    );
  });

  it("supports cancellation of the copy", async function() {
    if (!(isRecordMode() || isPlaybackMode())) {
      // Depends on the service not returning 'success' as soon as
      // the copy is initiated. Since this can't be guaranteed in the live tests,
      // these tests will only run with the unit tests with pre-recorded service responses.
      this.skip();
    }
    recorder.skip("browser");
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.getUniqueName("copiedblob")
    );
    const poller = await newBlobClient.beginCopyFromURL(
      "https://azure.github.io/azure-sdk-for-js/index.html",
      testPollerProperties
    );
    await poller.cancelOperation();
    try {
      await poller.pollUntilDone();
      throw new Error("Test failure");
    } catch (err) {
      assert.equal(err.name, "PollerCancelledError");
    }
  });

  it("supports updating on progress events", async function() {
    if (!(isRecordMode() || isPlaybackMode())) {
      // Depends on the service not returning 'success' as soon as
      // the copy is initiated. Since this can't be guaranteed in the live tests,
      // these tests will only run with the unit tests with pre-recorded service responses.
      this.skip();
    }
    recorder.skip("browser");
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.getUniqueName("copiedblob")
    );
    let onProgressCalled = false;
    const poller = await newBlobClient.beginCopyFromURL(
      "https://azure.github.io/azure-sdk-for-js/index.html",
      {
        onProgress(_) {
          onProgressCalled = true;
        },
        ...testPollerProperties
      }
    );
    await poller.pollUntilDone();
    assert.equal(onProgressCalled, true, "onProgress handler was not called.");
  });

  it("supports restoring poller state from another poller", async () => {
    recorder.skip("browser");
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.getUniqueName("copiedblob")
    );

    const copySourceUrl = "https://azure.github.io/azure-sdk-for-js/index.html";

    const poller1 = await newBlobClient.beginCopyFromURL(copySourceUrl, testPollerProperties);

    poller1.stopPolling();

    const state = poller1.toString();

    const poller2 = await newBlobClient.beginCopyFromURL(copySourceUrl, {
      resumeFrom: state,
      ...testPollerProperties
    });
    const result = await poller2.pollUntilDone();
    assert.ok(result.copyId);
    assert.equal(result.copyStatus, "success", "Poller2 copy failed.");
  });
});
