// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests that require SAS connection strings.
 * These are Node.js only because getSASConnectionStringFromEnvironment
 * uses account keys which are not supported in browser.
 *
 */

import {
  getBSU,
  getSASConnectionStringFromEnvironment,
  recorderEnvSetup,
  getUniqueName,
  configureBlobStorageClient,
  uriSanitizers,
} from "#test-utils";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type { ContainerClient, BlockBlobClient, BlobServiceClient } from "../../src/index.js";
import { BlobClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("BlobClient", () => {
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
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        uriSanitizers,
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-copy-source", "x-ms-encryption-key"] },
      },
      ["record", "playback"],
    );
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async () => {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  it.runIf(isLiveMode())("can be created with a sas connection string", async () => {
    const newClient = new BlobClient(
      getSASConnectionStringFromEnvironment(recorder),
      containerName,
      blobName,
    );
    configureBlobStorageClient(recorder, newClient);
    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  // Validation tests use a dummy connection string - they don't make HTTP calls
  const dummySasConnectionString =
    "BlobEndpoint=https://test.blob.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2030-01-01T00:00:00Z&sig=test";

  it("throws error if constructor containerName parameter is empty", async () => {
    assert.throws(
      () => new BlobClient(dummySasConnectionString, "", "blobName"),
      /Expecting non-empty strings for containerName and blobName parameters/,
    );
  });

  it("throws error if constructor blobName parameter is empty", async () => {
    assert.throws(
      () => new BlobClient(dummySasConnectionString, "containerName", ""),
      /Expecting non-empty strings for containerName and blobName parameters/,
    );
  });
});
