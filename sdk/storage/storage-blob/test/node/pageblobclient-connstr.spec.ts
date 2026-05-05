// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests that require SAS connection strings.
 * These are Node.js only because getSASConnectionStringFromEnvironment
 * uses account keys which are not supported in browser.
 *
 */

import {
  bodyToString,
  configureBlobStorageClient,
  getBSU,
  getSASConnectionStringFromEnvironment,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "#test-utils";
import type { ContainerClient, BlobServiceClient } from "../../src/index.js";
import { PageBlobClient } from "../../src/index.js";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("PageBlobClient", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it.runIf(isLiveMode())("can be created with a sas connection string", async () => {
    const newClient = new PageBlobClient(
      getSASConnectionStringFromEnvironment(recorder),
      containerName,
      blobName,
    );
    configureBlobStorageClient(recorder, newClient);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  // Validation tests use a dummy connection string - they don't make HTTP calls
  const dummySasConnectionString =
    "BlobEndpoint=https://test.blob.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2030-01-01T00:00:00Z&sig=test";

  it("throws error if constructor containerName parameter is empty", async () => {
    assert.throws(
      () => new PageBlobClient(dummySasConnectionString, "", "blobName"),
      /Expecting non-empty strings for containerName and blobName parameters/,
    );
  });

  it("throws error if constructor blobName parameter is empty", async () => {
    assert.throws(
      () => new PageBlobClient(dummySasConnectionString, "containerName", ""),
      /Expecting non-empty strings for containerName and blobName parameters/,
    );
  });
});
