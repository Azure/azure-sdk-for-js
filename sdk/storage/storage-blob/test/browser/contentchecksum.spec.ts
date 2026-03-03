// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import {
  base64encode,
  bodyToString,
  getBrowserFile,
  getBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils/index.js";
import type { ContainerClient, BlobClient } from "../../src/index.js";
import { StorageChecksumAlgorithm } from "../../src/models.js";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";

describe("ContentChecksumValidation with client config - CRC64", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let tempFile1: File;
  const tempFile1Length: number = 257 * 1024 * 1024 - 1;
  let tempFile2: File;
  const tempFile2Length: number = 1 * 1024 * 1024 - 1;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        uriSanitizers,
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-copy-source", "x-ms-encryption-key"] },
      },
      ["playback", "record"],
    );
    const blobServiceClient = getBSU(recorder, {
      uploadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
      downloadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
    });

    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    blobClient = containerClient.getBlobClient(blobName);
  });

  afterEach(async () => {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  beforeAll(async () => {
    if (isLiveMode()) {
      tempFile1 = getBrowserFile(getUniqueName("browserfile"), tempFile1Length);
      tempFile2 = getBrowserFile(getUniqueName("browserfile2"), tempFile2Length);
    }
  });

  it("upload a Blob with string", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadResult = await blockBlobClient.upload(new Blob([body]), body.length);
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");

    const result = await blobClient.download();
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.equal(await bodyToString(result, body.length), body);
  });

  it("upload a file", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadResult = await blockBlobClient.upload(tempFile2, tempFile2Length);
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");

    const downloadResponse = await blockBlobClient.download(0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await tempFile2.text();

    assert.equal(uploadedString, downloadedString);
  });

  it("upload should work with Blob, ArrayBuffer and ArrayBufferView", async () => {
    async function assertSameBlob(actualBlob: Blob | undefined, expectedBlob: Blob): Promise<void> {
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
    const blockBlobClient = blobClient.getBlockBlobClient();

    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    const blob = new Blob([arrayBuf], { type: "application/octet-stream" });
    const result1 = await blockBlobClient.upload(blob, 10);
    assert.deepEqual(result1.structuredBodyType, "XSM/1.0; properties=crc64");
    const downloadedBlob = await (await blockBlobClient.download()).blobBody;
    await assertSameBlob(downloadedBlob, blob);

    const result2 = await blockBlobClient.upload(arrayBuf, 10);
    assert.deepEqual(result2.structuredBodyType, "XSM/1.0; properties=crc64");
    const downloadedBlob1 = await (await blockBlobClient.download()).blobBody;
    await assertSameBlob(downloadedBlob1, blob);

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    const result3 = await blockBlobClient.upload(uint8ArrayPartial, 3);
    assert.deepEqual(result3.structuredBodyType, "XSM/1.0; properties=crc64");
    const downloadedBlob2 = await (await blockBlobClient.download()).blobBody!;
    await assertSameBlob(
      downloadedBlob2,
      new Blob([uint8ArrayPartial], { type: "application/octet-stream" }),
    );

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    const result4 = await blockBlobClient.upload(uint16Array, 4);
    assert.deepEqual(result4.structuredBodyType, "XSM/1.0; properties=crc64");
    const downloadedBlob3 = await (await blockBlobClient.download()).blobBody!;
    await assertSameBlob(
      downloadedBlob3,
      new Blob([uint16Array], { type: "application/octet-stream" }),
    );
  });

  it("uploadData should work with Blob, ArrayBuffer and ArrayBufferView", async () => {
    async function assertSameBlob(actualBlob: Blob | undefined, expectedBlob: Blob): Promise<void> {
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
    const blockBlobClient = blobClient.getBlockBlobClient();

    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    const blob = new Blob([arrayBuf], { type: "application/octet-stream" });
    const result1 = await blockBlobClient.uploadData(blob);
    assert.deepEqual(result1.structuredBodyType, "XSM/1.0; properties=crc64");
    const downloadedBlob = await (await blockBlobClient.download()).blobBody;
    await assertSameBlob(downloadedBlob, blob);

    const result2 = await blockBlobClient.uploadData(arrayBuf);
    assert.deepEqual(result2.structuredBodyType, "XSM/1.0; properties=crc64");
    const downloadedBlob1 = await (await blockBlobClient.download()).blobBody;
    await assertSameBlob(downloadedBlob1, blob);

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    const result3 = await blockBlobClient.uploadData(uint8ArrayPartial);
    assert.deepEqual(result3.structuredBodyType, "XSM/1.0; properties=crc64");
    const downloadedBlob2 = await (await blockBlobClient.download()).blobBody!;
    await assertSameBlob(
      downloadedBlob2,
      new Blob([uint8ArrayPartial], { type: "application/octet-stream" }),
    );

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    const result4 = await blockBlobClient.uploadData(uint16Array);
    assert.deepEqual(result4.structuredBodyType, "XSM/1.0; properties=crc64");
    const downloadedBlob3 = await (await blockBlobClient.download()).blobBody!;
    await assertSameBlob(
      downloadedBlob3,
      new Blob([uint16Array], { type: "application/octet-stream" }),
    );
  });

  it("stageBlock should work with Blob", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadResult = await blockBlobClient.stageBlock(
      base64encode("1"),
      tempFile1,
      tempFile1Length,
    );
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");
    await blockBlobClient.commitBlockList([base64encode("1")]);
    const downloadResponse = await blockBlobClient.download(0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await tempFile1.text();

    assert.equal(uploadedString, downloadedString);
  });

  it("stageBlock should work with Blob", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadResult = await blockBlobClient.stageBlock(
      base64encode("1"),
      tempFile1,
      tempFile1Length,
    );
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");
    await blockBlobClient.commitBlockList([base64encode("1")]);
    const downloadResponse = await blockBlobClient.download(0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await tempFile1.text();

    assert.equal(uploadedString, downloadedString);
  });

  it("appendBlock", async () => {
    const appendBlobName = recorder.variable("appendblob", getUniqueName("appendblob"));
    const appendBlobClient = containerClient.getAppendBlobClient(appendBlobName);
    await appendBlobClient.create();

    const content = "Hello World!";
    const uploadResult = await appendBlobClient.appendBlock(content, content.length);
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse), content);
  });

  it("uploadPages", async () => {
    const pageBlobName = recorder.variable("pageblob", getUniqueName("pageblob"));
    const pageBlobClient = containerClient.getPageBlobClient(pageBlobName);
    await pageBlobClient.create(1024);

    const result = await pageBlobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const uploadResult = await pageBlobClient.uploadPages("a".repeat(512), 0, 512);
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");
    const uploadResult2 = await pageBlobClient.uploadPages("b".repeat(512), 512, 512);
    assert.deepEqual(uploadResult2.structuredBodyType, "XSM/1.0; properties=crc64");

    const page1 = await pageBlobClient.download(0, 512);
    assert.deepEqual(page1.structuredBodyType, "XSM/1.0; properties=crc64");
    const page2 = await pageBlobClient.download(512, 512);
    assert.deepEqual(page1.structuredBodyType, "XSM/1.0; properties=crc64");

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });
});
