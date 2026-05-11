// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests that require SAS connection strings.
 * These are Node.js only because getSASConnectionStringFromEnvironment
 * uses account keys which are not supported in browser.
 *
 */

import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import {
  bodyToString,
  configureBlobStorageClient,
  getBSU,
  getSASConnectionStringFromEnvironment,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "#test-utils";
import type { ContainerClient } from "../../src/index.js";
import { BlockBlobClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("BlockBlobClient", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;

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
    const blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
  });

  afterEach(async () => {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  it.runIf(isLiveMode())("can be created with a sas connection string", async () => {
    const newClient = new BlockBlobClient(
      getSASConnectionStringFromEnvironment(recorder),
      containerName,
      blobName,
    );
    configureBlobStorageClient(recorder, newClient);

    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  // Validation tests use a dummy connection string - they don't make HTTP calls
  const dummySasConnectionString =
    "BlobEndpoint=https://test.blob.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2030-01-01T00:00:00Z&sig=test";

  it("throws error if constructor containerName parameter is empty", async () => {
    assert.throws(
      () => new BlockBlobClient(dummySasConnectionString, "", "blobName"),
      /Expecting non-empty strings for containerName and blobName parameters/,
    );
  });

  it("throws error if constructor blobName parameter is empty", async () => {
    assert.throws(
      () => new BlockBlobClient(dummySasConnectionString, "containerName", ""),
      /Expecting non-empty strings for containerName and blobName parameters/,
    );
  });
});
