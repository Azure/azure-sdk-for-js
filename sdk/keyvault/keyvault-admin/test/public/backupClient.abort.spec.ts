// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";

import { KeyVaultBackupClient } from "../../src";
import { authenticate } from "../utils/authentication";
import { testPollerProperties } from "../utils/recorder";
import { assertThrowsAbortError, getSasToken } from "../utils/common";

describe("Aborting KeyVaultBackupClient's requests", () => {
  let client: KeyVaultBackupClient;
  let recorder: Recorder;
  let blobStorageUri: string;
  let blobSasToken: string;

  let generateFakeUUID: () => string;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.backupClient;
    recorder = authentication.recorder;
    generateFakeUUID = authentication.generateFakeUUID;

    const sasTokenData = getSasToken();
    blobStorageUri = sasTokenData.blobStorageUri;
    blobSasToken = sasTokenData.blobSasToken;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("can abort beginBackup", async function() {
    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.beginBackup(blobStorageUri, blobSasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal
      });
    });
  });

  it("can abort beginRestore", async function() {
    const backupURI = `${blobStorageUri}/${generateFakeUUID()}`;
    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.beginRestore(backupURI, blobSasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal
      });
    });
  });

  it("can abort beginSelectiveKeyRestore", async function() {
    const backupURI = `${blobStorageUri}/${generateFakeUUID()}`;

    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.beginSelectiveKeyRestore("key-name", backupURI, blobSasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal
      });
    });
  });
});
