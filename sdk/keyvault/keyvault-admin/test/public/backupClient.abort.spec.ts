// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";

import type { KeyVaultBackupClient } from "../../src/index.js";
import { authenticate } from "./utils/authentication.js";
import { testPollerProperties } from "./utils/recorder.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { getEnvironmentVariable } from "./utils/common.js";

describe("Aborting KeyVaultBackupClient's requests", () => {
  let client: KeyVaultBackupClient;
  let recorder: Recorder;
  let blobStorageUri: string;

  let generateFakeUUID: () => string;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    client = authentication.backupClient;
    recorder = authentication.recorder;
    generateFakeUUID = authentication.generateFakeUUID;

    blobStorageUri = new URL(
      getEnvironmentVariable("BLOB_CONTAINER_NAME"),
      getEnvironmentVariable("BLOB_STORAGE_URI"),
    ).href;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can abort beginBackup", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      client.beginBackup(blobStorageUri, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(expect.objectContaining({ name: "AbortError" }));
  });

  it("can abort beginRestore", async () => {
    const backupURI = `${blobStorageUri}/${generateFakeUUID()}`;
    const controller = new AbortController();
    controller.abort();

    await expect(
      client.beginRestore(backupURI, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(expect.objectContaining({ name: "AbortError" }));
  });

  it("can abort beginSelectiveKeyRestore", async () => {
    const backupURI = `${blobStorageUri}/${generateFakeUUID()}`;

    const controller = new AbortController();
    controller.abort();

    await expect(
      client.beginSelectiveKeyRestore("key-name", backupURI, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(expect.objectContaining({ name: "AbortError" }));
  });
});
