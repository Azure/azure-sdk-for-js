// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as assert from "assert";
import * as dotenv from "dotenv";

import { getBSU } from "./utils";
import { record, testPollerProperties } from "./utils/recorder";
import { env } from "./utils/testutils.common";
import {
  BlobClient,
  BlockBlobClient,
  ContainerClient,
  BlobBeginCopyFromURLResponse,
  PollerLike,
  PollOperationState
} from "../src";
dotenv.config({ path: "../.env" });

describe("BlobClient beginCopyFromURL Poller", () => {
  const blobServiceClient = getBSU();
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let destinationContainerClient: ContainerClient;
  let destinationContainerName: string;
  const content = "Hello World";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
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
    await containerClient.delete();
    await destinationContainerClient.delete();
    recorder.stop();
  });

  it("supports automatic polling via pollUntilDone", async () => {
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
    assert.deepStrictEqual(properties2.copySource, blobClient.url);
  });

  it("supports manual polling via poll", async () => {
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
    assert.deepStrictEqual(properties2.copySource, blobClient.url);
  });

  // These tests depend on the service not returning 'success' as soon as
  // the copy is initiated. Since this can't be guaranteed in the live tests,
  // these tests will only run with the unit tests with pre-recorded service responses.
  if (env.TEST_MODE === "playback") {
    it("supports cancellation of the copy", async () => {
      const newBlobClient = destinationContainerClient.getBlobClient(
        recorder.getUniqueName("copiedblob")
      );
      const poller = await newBlobClient.beginCopyFromURL(
        "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/README.md",
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

    it("supports updating on progress events", async () => {
      const newBlobClient = destinationContainerClient.getBlobClient(
        recorder.getUniqueName("copiedblob")
      );
      let onProgressCalled = false;
      const poller = await newBlobClient.beginCopyFromURL(
        "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/README.md",
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
  }

  it("supports restoring poller state from another poller", async () => {
    const newBlobClient = destinationContainerClient.getBlobClient(
      recorder.getUniqueName("copiedblob")
    );

    const poller1 = await newBlobClient.beginCopyFromURL(
      "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/README.md",
      testPollerProperties
    );

    poller1.stopPolling();

    const state = poller1.toString();

    const poller2 = await newBlobClient.beginCopyFromURL(
      "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/master/README.md",
      {
        resumeFrom: state,
        ...testPollerProperties
      }
    );
    const result = await poller2.pollUntilDone();
    assert.ok(result.copyId);
    assert.equal(result.copyStatus, "success", "Poller2 copy failed.");
  });
});
