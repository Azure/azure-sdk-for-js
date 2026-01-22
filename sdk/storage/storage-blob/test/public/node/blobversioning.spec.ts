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
import { createBlobServiceClient } from "../../utils/node/clients.js";
import { getUniqueName, setURLParameter } from "../../utils/testHelpers.js";
import { bodyToString } from "../../utils/node/testHelpers.js";

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
    assert.isTrue(downloadToBufferRes.equals(Buffer.from(content)));
  });

  it("download a version to file", async function () {
    const downloadedFilePath = getUniqueName("downloadedtofile", { recorder });
    await blobClient.withVersion(uploadRes.versionId!).downloadToFile(downloadedFilePath);
    const downloadedFileContent = await fs.readFile(downloadedFilePath);
    assert.isTrue(downloadedFileContent.equals(Buffer.from(content)));
    await fs.unlink(downloadedFilePath);
  });

  it("promote a version: as the copy source", async () => {
    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    await blobVersionClient.getProperties();

    const versionURL = setURLParameter(blobClient.url, "versionid", uploadRes.versionId);
    const copyRes = await (await blobClient.beginCopyFromURL(versionURL)).pollUntilDone();
    assert.isDefined(copyRes.copyId);

    const listRes = (
      await containerClient
        .listBlobsFlat({
          includeVersions: true,
        })
        .byPage()
        .next()
    ).value;

    const blobItemsLength = listRes.segment.blobItems!.length;
    assert.equal(blobItemsLength, 3);
    assert.equal(listRes.segment.blobItems![blobItemsLength - 1].versionId, copyRes.versionId);
    assert.isTrue(listRes.segment.blobItems![blobItemsLength - 1].isCurrentVersion);

    const downloadRes = await blobClient.download();
    assert.deepStrictEqual(await bodyToString(downloadRes, content.length), content);
  });
});
