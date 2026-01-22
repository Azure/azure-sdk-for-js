// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import {
  type BlobServiceClient,
  type ContainerClient,
  type AppendBlobClient,
} from "@azure/storage-blob";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "../../utils/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { bodyToString } from "../../utils/browser/testHelpers.js";

describe("AppendBlobClient - browser", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let appendBlobClient: AppendBlobClient;
  let blobServiceClient: BlobServiceClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    appendBlobClient = containerClient.getAppendBlobClient(blobName);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("appendBlock", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    await appendBlobClient.appendBlock(content, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("appendBlock with progress report", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    await appendBlobClient.appendBlock(content, content.length, {
      onProgress: () => {
        /* empty */
      },
    });

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("appendBlockFromURL", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    await appendBlobClient.appendBlock(content, content.length);
    await appendBlobClient.appendBlockFromURL(blockBlobClient.url, 0, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length * 2), content + content);
    assert.equal(downloadResponse.contentLength, content.length * 2);
  });

  it("appendBlockFromURL - destination bearer token", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const tokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    const tokenAppendBlobClient = tokenBlobServiceClient
      .getContainerClient(containerName)
      .getAppendBlobClient(blobName);
    await tokenAppendBlobClient.appendBlockFromURL(blockBlobClient.url, 0, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });
});
