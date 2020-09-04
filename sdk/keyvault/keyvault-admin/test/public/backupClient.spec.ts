// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { env, Recorder } from "@azure/test-utils-recorder";
import { KeyClient } from "@azure/keyvault-keys";

import { KeyVaultBackupClient } from "../../src";
import { authenticate } from "../utils/authentication";
import { testPollerProperties } from "../utils/recorder";
import { formatName, getFolderName } from "../utils/common";

describe("KeyVaultBackupClient", () => {
  let client: KeyVaultBackupClient;
  let keyClient: KeyClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.backupClient;
    keyClient = authentication.keyClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // The tests follow

  it("beginBackup", async function() {
    const blobStorageUri = env.BLOB_STORAGE_URI;
    const sasToken = env.BLOB_STORAGE_SAS_TOKEN;
    const backupPoller = await client.beginBackup(blobStorageUri, sasToken, testPollerProperties);
    const backupURI = await backupPoller.pollUntilDone();
    assert.ok(!!backupURI.match(blobStorageUri));
  });

  it("beginBackup, then beginRestore", async function() {
    const blobStorageUri = env.BLOB_STORAGE_URI;
    const sasToken = env.BLOB_STORAGE_SAS_TOKEN;
    const backupPoller = await client.beginBackup(blobStorageUri, sasToken, testPollerProperties);
    const backupURI = await backupPoller.pollUntilDone();
    assert.ok(!!backupURI.match(blobStorageUri));

    const folderName = getFolderName(blobStorageUri);
    const restorePoller = await client.beginRestore(
      blobStorageUri,
      sasToken,
      folderName,
      testPollerProperties
    );
    await restorePoller.pollUntilDone();
  });

  it("beginBackup, then beginSelectiveRestore", async function() {
    const keyName = formatName(this!.test!.title);
    const key = await keyClient.createRsaKey(keyName);
    assert.equal(key.name, keyName, "Unexpected key name in result from createRsaKey().");

    const blobStorageUri = env.BLOB_STORAGE_URI;
    const sasToken = env.BLOB_STORAGE_SAS_TOKEN;
    const backupPoller = await client.beginBackup(blobStorageUri, sasToken, testPollerProperties);
    const backupURI = await backupPoller.pollUntilDone();
    assert.ok(!!backupURI.match(blobStorageUri));

    const folderName = getFolderName(blobStorageUri);
    const selectiveRestorePoller = await client.beginSelectiveRestore(
      blobStorageUri,
      sasToken,
      folderName,
      key.name,
      testPollerProperties
    );
    await selectiveRestorePoller.pollUntilDone();

    const deleteKeyPoller = await keyClient.beginDeleteKey(keyName);
    await deleteKeyPoller.pollUntilDone();
    await keyClient.purgeDeletedKey(keyName);
  });
});
