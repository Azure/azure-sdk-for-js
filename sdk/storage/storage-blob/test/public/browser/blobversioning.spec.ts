// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type {
  ContainerClient,
  BlobServiceClient,
  BlobClient,
  BlockBlobClient,
} from "../../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "../utils/clients.js";
import { getUniqueName } from "../utils/utils.js";

describe("Blob versioning - browser", () => {
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

  it("uploadBrowserData should return versionId", async () => {
    const uploadBrowserDataRes = await blockBlobClient.uploadData(new Blob([content]));
    assert.isDefined(uploadBrowserDataRes.versionId);
  });
});
