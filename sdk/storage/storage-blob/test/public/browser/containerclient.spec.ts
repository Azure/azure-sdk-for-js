// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobServiceClient, ContainerClient } from "../../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "../../utils/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { bodyToString } from "../../utils/browser/testHelpers.js";
import { isRestError } from "@azure/core-rest-pipeline";

describe("ContainerClient - browser", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let recorder: Recorder;
  let blobServiceClient: BlobServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("uploadBlockBlob and deleteBlob", async () => {
    const body = getUniqueName("randomstring", { recorder });
    const options = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentType: "blobContentType",
      metadata: {
        keya: "vala",
        keyb: "valb",
      },
    };
    const blobName = getUniqueName("blob", { recorder });
    const { blockBlobClient } = await containerClient.uploadBlockBlob(blobName, body, body.length, {
      blobHTTPHeaders: options,
      metadata: options.metadata,
    });
    const result = await blockBlobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);

    await containerClient.deleteBlob(blobName);
    try {
      await blockBlobClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      if (!isRestError(error)) {
        throw error;
      }
      assert.equal(error.statusCode, 404);
    }
  });
});
