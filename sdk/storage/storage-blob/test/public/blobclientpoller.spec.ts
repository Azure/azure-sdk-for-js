// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import type {
  BlobClient,
  BlockBlobClient,
  ContainerClient,
  BlobBeginCopyFromURLResponse,
} from "@azure/storage-blob";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "./utils/clients.js";
import { getUniqueName } from "./utils/utils.js";

export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

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

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
    destinationContainerName = getUniqueName("dest-container", { recorder });
    destinationContainerClient = blobServiceClient.getContainerClient(destinationContainerName);
    await destinationContainerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
    await destinationContainerClient.delete();
    await recorder.stop();
  });

  it("supports automatic polling via pollUntilDone", async () => {
    const newBlobClient = destinationContainerClient.getBlobClient(
      getUniqueName("copiedblob", { recorder }),
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
      "copySource does not match original source",
    );
  });

  it("supports manual polling via poll", async () => {
    const newBlobClient = destinationContainerClient.getBlobClient(
      getUniqueName("copiedblob", { recorder }),
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
      "copySource does not match original source",
    );
  });

  // These two tests finish synchronously
  it.skip("supports cancellation of the copy", async function () {
    const newBlobClient = destinationContainerClient.getBlobClient(
      getUniqueName("copiedblob", { recorder }),
    );

    // Create a larger source blob to increase the chance that the service performs
    // an asynchronous copy, giving cancellation time to take effect.
    const largeSrc = containerClient.getBlockBlobClient(getUniqueName("large-src", { recorder }));
    const payloadSize = isPlaybackMode() ? 1024 : 16 * 1024 * 1024; // 1KB in playback, 16MB live
    const payload = new Uint8Array(payloadSize);
    payload.fill(97); // 'a'
    await largeSrc.upload(payload, payload.length);

    const poller = await newBlobClient.beginCopyFromURL(largeSrc.url, testPollerProperties);

    await poller.cancelOperation();

    let cancelled = false;
    try {
      await poller.pollUntilDone();
    } catch (err: any) {
      if (err?.name === "PollerCancelledError") {
        cancelled = true;
      } else {
        throw err; // unexpected error
      }
    }

    // If not cancelled, accept a fast-success outcome (copy completed before cancel applied).
    if (!cancelled) {
      const res = await newBlobClient.getProperties();
      assert.isDefined(
        res.copyId,
        "Expected a completed copy when cancellation didn't apply in time",
      );
    }
  });

  it.skip("supports updating on progress events", async function () {
    const newBlobClient = destinationContainerClient.getBlobClient(
      getUniqueName("copiedblob", { recorder }),
    );
    let onProgressCalled = false;
    const poller = await newBlobClient.beginCopyFromURL(
      "https://azure.github.io/azure-sdk-for-js/index.html",
      {
        onProgress(_) {
          onProgressCalled = true;
        },
        ...testPollerProperties,
      },
    );
    await poller.pollUntilDone();
    assert.equal(onProgressCalled, true, "onProgress handler was not called.");
  });

  it("supports restoring poller state from another poller", async () => {
    const newBlobClient = destinationContainerClient.getBlobClient(
      getUniqueName("copiedblob", { recorder }),
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
