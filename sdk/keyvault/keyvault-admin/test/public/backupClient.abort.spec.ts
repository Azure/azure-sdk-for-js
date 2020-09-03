// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure/test-utils-recorder";
import { AbortController } from "@azure/abort-controller";

import { KeyVaultBackupClient } from "../../src";
import { authenticate } from "../utils/authentication";
import { testPollerProperties } from "../utils/recorder";
import { assertThrowsAbortError, getFolderName } from "../utils/common";

describe("Aborting KeyVaultBackupClient's requests", () => {
  let client: KeyVaultBackupClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.backupClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // The tests follow

  it("can abort beginBackup", async function() {
    const blobStorageUri = env.BLOB_STORAGE_URI;
    const sasToken = env.BLOB_STORAGE_SAS_TOKEN;

    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.beginBackup(blobStorageUri, sasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal
      });
    });
  });

  it("can abort beginRestore", async function() {
    const blobStorageUri = env.BLOB_STORAGE_URI;
    const sasToken = env.BLOB_STORAGE_SAS_TOKEN;
    const folderName = getFolderName(blobStorageUri);

    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.beginRestore(blobStorageUri, sasToken, folderName, {
        ...testPollerProperties,
        abortSignal: controller.signal
      });
    });
  });

  it("can abort beginSelectiveRestore", async function() {
    const blobStorageUri = env.BLOB_STORAGE_URI;
    const sasToken = env.BLOB_STORAGE_SAS_TOKEN;
    const folderName = getFolderName(blobStorageUri);

    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.beginSelectiveRestore("Key Name", blobStorageUri, sasToken, folderName, {
        ...testPollerProperties,
        abortSignal: controller.signal
      });
    });
  });
});
