// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests that require SAS connection strings.
 * These are Node.js only because getSASConnectionStringFromEnvironment
 * uses account keys which are not supported in browser.
 *
 */

import { BlobServiceClient } from "../../src/index.js";
import {
  configureBlobStorageClient,
  getSASConnectionStringFromEnvironment,
  recorderEnvSetup,
  uriSanitizers,
} from "#test-utils";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("BlobServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it.runIf(isLiveMode())("can be created from a sas connection string", async () => {
    const newClient = BlobServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(recorder),
    );
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
  });
});
