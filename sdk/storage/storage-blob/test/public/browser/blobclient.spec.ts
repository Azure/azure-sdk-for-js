// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type {
  BlockBlobClient,
  BlobServiceClient,
  ContainerClient,
  BlobClient,
} from "../../../src/index.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "../../utils/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { bodyToString } from "../../utils/browser/testHelpers.js";

describe("BlobClient - browser", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("download with with default parameters", async () => {
    const result = await blobClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    assert.exists(result.createdOn);
  });

  it("download with progress report", async () => {
    let downloadedBytes = 0;
    const result = await blobClient.download(0, undefined, {
      onProgress: (data) => {
        downloadedBytes = data.loadedBytes;
      },
    });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    assert.equal(downloadedBytes, content.length);
  });

  it("download should not have aborted error after download finishes", async () => {
    const aborter = new AbortController();
    const result = await blobClient.download(0, undefined, { abortSignal: aborter.signal });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("download all parameters set", async () => {
    // For browser scenario, please ensure CORS settings exposed headers: content-md5,x-ms-content-crc64
    // So JS can get contentCrc64 and contentMD5.
    const result1 = await blobClient.download(0, 1, {
      rangeGetContentCrc64: true,
    });
    assert.isDefined(result1.clientRequestId);
    // assert.ok(result1.contentCrc64!);
    assert.deepStrictEqual(await bodyToString(result1, 1), content[0]);
    assert.isDefined(result1.clientRequestId);

    const result2 = await blobClient.download(1, 1, {
      rangeGetContentMD5: true,
    });
    assert.isDefined(result2.clientRequestId);
    // assert.ok(result2.contentMD5!);

    let exceptionCaught = false;
    try {
      await blobClient.download(2, 1, {
        rangeGetContentMD5: true,
        rangeGetContentCrc64: true,
      });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      exceptionCaught = true;
    }
    assert.isTrue(exceptionCaught);
  });
});
