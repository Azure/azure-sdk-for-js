// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests that require SAS connection strings.
 * These are Node.js only because getSASConnectionStringFromEnvironment
 * uses account keys which are not supported in browser.
 *
 */

import {
  configureBlobStorageClient,
  getBSU,
  getSASConnectionStringFromEnvironment,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "#test-utils";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type { BlobServiceClient } from "../../src/index.js";
import { ContainerClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("ContainerClient", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        uriSanitizers,
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-copy-source", "x-ms-copy-source-authorization"],
        },
      },
      ["record", "playback"],
    );
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it.runIf(isLiveMode())("can be created with a sas connection string", async () => {
    const newClient = new ContainerClient(
      getSASConnectionStringFromEnvironment(recorder),
      containerName,
    );
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
  });

  it.runIf(isLiveMode())(
    "can be created with a sas connection string and a container name and an option bag",
    async () => {
      const newClient = new ContainerClient(
        getSASConnectionStringFromEnvironment(recorder),
        containerName,
        {
          retryOptions: {
            maxTries: 5,
          },
        },
      );
      configureBlobStorageClient(recorder, newClient);

      const result = await newClient.getProperties();

      assert.isAbove(result.etag!.length, 0);
      assert.isDefined(result.lastModified);
      assert.isUndefined(result.leaseDuration);
      assert.equal(result.leaseState, "available");
      assert.equal(result.leaseStatus, "unlocked");
      assert.isDefined(result.requestId);
      assert.isDefined(result.version);
      assert.isDefined(result.date);
      assert.isUndefined(result.blobPublicAccess);
    },
  );

  // Validation tests use a dummy connection string - they don't make HTTP calls
  const dummySasConnectionString =
    "BlobEndpoint=https://test.blob.core.windows.net/;SharedAccessSignature=sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2030-01-01T00:00:00Z&sig=test";

  it("throws error if constructor containerName parameter is empty", async () => {
    assert.throws(
      () => new ContainerClient(dummySasConnectionString, ""),
      /Expecting non-empty strings for containerName parameter/,
    );
  });
});
