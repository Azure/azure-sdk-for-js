// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";

import { KeyVaultBackupClient } from "../../src/index.js";
import { authenticate } from "./utils/authentication.js";
import { testPollerProperties } from "./utils/recorder.js";
import { getSasToken } from "./utils/common.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { AbortError } from "@azure/abort-controller";

// TODO: https://github.com/Azure/azure-sdk-for-js/issues/30273
describe.skip("Aborting KeyVaultBackupClient's requests", () => {
  let client: KeyVaultBackupClient;
  let recorder: Recorder;
  let blobStorageUri: string;
  let blobSasToken: string;

  let generateFakeUUID: () => string;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    client = authentication.backupClient;
    recorder = authentication.recorder;
    generateFakeUUID = authentication.generateFakeUUID;

    const sasTokenData = getSasToken();
    blobStorageUri = sasTokenData.blobStorageUri;
    blobSasToken = sasTokenData.blobSasToken;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can abort beginBackup", async function () {
    const controller = new AbortController();
    controller.abort();

    await expect(
      client.beginBackup(blobStorageUri, blobSasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(AbortError);
  });

  it("can abort beginRestore", async function () {
    const backupURI = `${blobStorageUri}/${generateFakeUUID()}`;
    const controller = new AbortController();
    controller.abort();

    await expect(
      client.beginRestore(backupURI, blobSasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(AbortError);
  });

  it("can abort beginSelectiveKeyRestore", async function () {
    const backupURI = `${blobStorageUri}/${generateFakeUUID()}`;

    const controller = new AbortController();
    controller.abort();

    await expect(
      client.beginSelectiveKeyRestore("key-name", backupURI, blobSasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow(AbortError);
  });
});
