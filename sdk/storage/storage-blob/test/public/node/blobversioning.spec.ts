// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs/promises";
import { Recorder } from "@azure-tools/test-recorder";
import type {
  ContainerClient,
  BlobServiceClient,
  BlobClient,
  BlockBlobClient,
  BlockBlobUploadResponse,
} from "@azure/storage-blob";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "./utils/clients.js";
import { bodyToString, getUniqueName } from "../utils/utils.js";

describe("Blob versioning", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let uploadRes: BlockBlobUploadResponse;
  let uploadRes2: BlockBlobUploadResponse;
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
    uploadRes = await blockBlobClient.upload(content, content.length);
    uploadRes2 = await blockBlobClient.upload("", 0);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });
  it("download a blob version", async () => {
    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    const downloadRes = await blobVersionClient.download();
    assert.deepStrictEqual(await bodyToString(downloadRes, content.length), content);
    assert.deepStrictEqual(downloadRes.versionId, uploadRes.versionId);

    const downloadRes2 = await blobClient.withVersion(uploadRes2.versionId!).download();
    assert.deepStrictEqual(await bodyToString(downloadRes2), "");
    assert.deepStrictEqual(downloadRes2.versionId, uploadRes2.versionId);

    const downloadToBufferRes = await blobVersionClient.downloadToBuffer();
    assert.ok(downloadToBufferRes.equals(Buffer.from(content)));
  });

  it("download a version to file", async function () {
    const downloadedFilePath = getUniqueName("downloadedtofile", { recorder });
    await blobClient.withVersion(uploadRes.versionId!).downloadToFile(downloadedFilePath);
    const downloadedFileContent = await fs.readFile(downloadedFilePath);
    assert.ok(downloadedFileContent.equals(Buffer.from(content)));
    await fs.unlink(downloadedFilePath);
  });
});
