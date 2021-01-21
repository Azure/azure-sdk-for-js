// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { env, Recorder } from "@azure/test-utils-recorder";

import { KeyVaultBackupClient } from "../../src";
import { authenticate } from "../utils/authentication";
import { testPollerProperties } from "../utils/recorder";
import { getFolderName } from "../utils/common";

describe("KeyVaultBackupClient", () => {
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

  it.skip("beginBackup", async function() {
    const blobStorageUri = `https://${env.BLOB_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/backup`;
    const sasToken = env.BLOB_STORAGE_SAS_TOKEN;
    console.log("blobStorageUri", blobStorageUri);
    console.log("sasToken", sasToken);
    const backupPoller = await client.beginBackup(blobStorageUri, sasToken, testPollerProperties);
    const backupResult = await backupPoller.pollUntilDone();
    assert.equal(backupResult, blobStorageUri);
  });

  it.skip("beginBackup, then beginRestore", async function() {
    const blobStorageUri = env.BLOB_STORAGE_URI;
    const sasToken = env.BLOB_STORAGE_SAS_TOKEN;
    const backupPoller = await client.beginBackup(blobStorageUri, sasToken, testPollerProperties);
    const backupURI = await backupPoller.pollUntilDone();
    assert.ok(!!backupURI.match(blobStorageUri));

    const folderName = getFolderName(backupURI);
    const restorePoller = await client.beginRestore(
      blobStorageUri,
      sasToken,
      folderName,
      testPollerProperties
    );
    await restorePoller.pollUntilDone();
    const operationState = restorePoller.getOperationState();
    assert.equal(operationState.isCompleted, true);
    assert.equal(operationState.error, undefined);
  });

  it.skip("beginBackup, then beginSelectiveRestore", async function() {
    const keyName = "rsa-1";

    const blobStorageUri = env.BLOB_STORAGE_URI;
    const sasToken = env.BLOB_STORAGE_SAS_TOKEN;
    const backupPoller = await client.beginBackup(blobStorageUri, sasToken, testPollerProperties);
    const backupURI = await backupPoller.pollUntilDone();
    assert.ok(!!backupURI.match(blobStorageUri));

    const folderName = getFolderName(backupURI);
    const selectiveRestorePoller = await client.beginSelectiveRestore(
      blobStorageUri,
      sasToken,
      folderName,
      keyName,
      testPollerProperties
    );
    await selectiveRestorePoller.pollUntilDone();
    const operationState = selectiveRestorePoller.getOperationState();
    assert.equal(operationState.isCompleted, true);
    assert.equal(operationState.error, undefined);
  });
});
