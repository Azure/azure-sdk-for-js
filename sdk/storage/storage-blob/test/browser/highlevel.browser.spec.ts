// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { AbortController } from "@azure/abort-controller";
import {
  arrayBufferEqual,
  blobToArrayBuffer,
  blobToString,
  bodyToString,
  getBrowserFile,
  getBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils/index.browser";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { ContainerClient, BlobClient, BlockBlobClient, BlobServiceClient } from "../../src";
import { Context } from "mocha";

describe("Highlevel", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let tempFile1: File;
  const tempFile1Length: number = 257 * 1024 * 1024 - 1;
  let tempFile2: File;
  const tempFile2Length: number = 1 * 1024 * 1024 - 1;

  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["playback", "record"]);
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async function (this: Context) {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  before(async function (this: Context) {
    if (isLiveMode()) {
      tempFile1 = getBrowserFile(getUniqueName("browserfile"), tempFile1Length);
      tempFile2 = getBrowserFile(getUniqueName("browserfile2"), tempFile2Length);
    }
  });

  it("uploadBrowserDataToBlockBlob should abort when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    const aborter = AbortController.timeout(1);

    try {
      await blockBlobClient.uploadBrowserData(tempFile1, {
        abortSignal: aborter,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadBrowserDataToBlockBlob should abort when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    const aborter = AbortController.timeout(1);

    try {
      await blockBlobClient.uploadBrowserData(tempFile2, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        concurrency: 2,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadBrowserDataToBlockBlob should update progress when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    let eventTriggered = false;
    const aborter = new AbortController();

    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
    try {
      await blockBlobClient.uploadBrowserData(tempFile1, {
        abortSignal: aborter.signal,
        blockSize: 4 * 1024 * 1024,
        concurrency: 2,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
      });
    } catch (err: any) {}
    assert.ok(eventTriggered);
  });

  it("uploadBrowserDataToBlockBlob should update progress when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    let eventTriggered = false;
    const aborter = new AbortController();

    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
    try {
      await blockBlobClient.uploadBrowserData(tempFile2, {
        abortSignal: aborter.signal,
        blockSize: 4 * 1024 * 1024,
        concurrency: 2,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
      });
    } catch (err: any) {}
    assert.isTrue(eventTriggered);
  });

  it("uploadBrowserDataToBlockBlob should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    await blockBlobClient.uploadBrowserData(tempFile2, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 2,
    });

    const downloadResponse = await blockBlobClient.download(0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await blobToString(tempFile2);

    assert.equal(uploadedString, downloadedString);
  });

  it("uploadBrowserDataToBlockBlob should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES and configured maxSingleShotSize", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    await blockBlobClient.uploadBrowserData(tempFile2, {
      blockSize: 512 * 1024,
      maxSingleShotSize: 0,
    });

    const downloadResponse = await blockBlobClient.download(0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await blobToString(tempFile2);

    assert.equal(uploadedString, downloadedString);
  });

  it("uploadBrowserDataToBlockBlob should work with tags", async function () {
    if (!isLiveMode()) {
      this.skip();
    }

    const tags = {
      tag1: "val1",
      tag2: "val2",
    };

    await blockBlobClient.uploadBrowserData(tempFile2, {
      blockSize: 512 * 1024,
      maxSingleShotSize: 0,
      tags,
    });

    const response = await blockBlobClient.getTags();
    assert.deepStrictEqual(response.tags, tags);
  });

  it("uploadBrowserDataToBlockBlob should success when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    await blockBlobClient.uploadBrowserData(tempFile1, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 2,
    });

    const downloadResponse = await blockBlobClient.download(0);
    const buf1 = await blobToArrayBuffer(await downloadResponse.blobBody!);
    const buf2 = await blobToArrayBuffer(tempFile1);

    assert.ok(arrayBufferEqual(buf1, buf2));
  });

  it("set tier while upload", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    // single upload
    await blockBlobClient.uploadBrowserData(tempFile2, {
      tier: "Hot",
      maxSingleShotSize: 256 * 1024 * 1024,
    });
    assert.equal((await blockBlobClient.getProperties()).accessTier, "Hot");

    await blockBlobClient.uploadBrowserData(tempFile2, {
      tier: "Cool",
      maxSingleShotSize: 256 * 1024,
    });
    assert.equal((await blockBlobClient.getProperties()).accessTier, "Cool");
  });

  it("uploadData should work with Blob, ArrayBuffer and ArrayBufferView", async function () {
    async function assertSameBlob(actualBlob: Blob | undefined, expectedBlob: Blob) {
      if (!actualBlob) {
        throw new Error("actualBlob is undefined");
      }
      assert.equal(actualBlob.size, expectedBlob.size);
      const actualData = new Uint8Array(await actualBlob.arrayBuffer());
      const expectedData = new Uint8Array(await expectedBlob.arrayBuffer());

      const actualValues = Array.from(actualData.values());
      const expectedValues = Array.from(expectedData.values());

      assert.deepStrictEqual(actualValues, expectedValues);
    }

    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    const blob = new Blob([arrayBuf], { type: "application/octet-stream" });
    await blockBlobClient.uploadData(blob);
    const downloadedBlob = await (await blockBlobClient.download()).blobBody;
    await assertSameBlob(downloadedBlob, blob);

    await blockBlobClient.uploadData(arrayBuf);
    const downloadedBlob1 = await (await blockBlobClient.download()).blobBody;
    await assertSameBlob(downloadedBlob1, blob);

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    await blockBlobClient.uploadData(uint8ArrayPartial);
    const downloadedBlob2 = await (await blockBlobClient.download()).blobBody!;
    await assertSameBlob(
      downloadedBlob2,
      new Blob([uint8ArrayPartial], { type: "application/octet-stream" })
    );

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    await blockBlobClient.uploadData(uint16Array);
    const downloadedBlob3 = await (await blockBlobClient.download()).blobBody!;
    await assertSameBlob(
      downloadedBlob3,
      new Blob([uint16Array], { type: "application/octet-stream" })
    );
  });
});
