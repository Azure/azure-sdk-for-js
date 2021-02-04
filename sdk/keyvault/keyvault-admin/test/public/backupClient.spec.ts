// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";

import { KeyVaultBackupClient } from "../../src";
import { authenticate } from "../utils/authentication";
import { testPollerProperties } from "../utils/recorder";
import { getFolderName, getSasToken } from "../utils/common";
import { delay } from "@azure/core-http";
import { assert } from "chai";
import { KeyClient } from "@azure/keyvault-keys";

describe("KeyVaultBackupClient", () => {
  let client: KeyVaultBackupClient;
  let keyClient: KeyClient;

  let recorder: Recorder;
  let blobStorageUri: string;
  let blobSasToken: string;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.backupClient;
    keyClient = authentication.keyClient;
    recorder = authentication.recorder;
    const sasTokenData = getSasToken();
    blobStorageUri = sasTokenData.blobStorageUri;
    blobSasToken = sasTokenData.blobSasToken;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("beginBackup", function() {
    it("returns the correct backup result when successful", async function() {
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        blobSasToken,
        testPollerProperties
      );
      const backupResult = await backupPoller.pollUntilDone();
      assert.notExists(backupPoller.getOperationState().error);
      assert.exists(backupResult.backupFolderUri);
      assert.equal(backupResult.startTime, backupPoller.getOperationState().startTime);
      assert.equal(backupResult.endTime, backupPoller.getOperationState().endTime);
      assert.match(backupResult.backupFolderUri!, new RegExp(blobStorageUri));
    });

    // There is a service issue that prevents errors from showing up in the
    // error field. Pending until it's resolved. ADO 8750375
    it.skip("returns the correct backup result when fails to authenticate", async function() {
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        "invalid_sas_token",
        testPollerProperties
      );
      assert.isRejected(backupPoller.pollUntilDone());
    });
  });

  describe("beginRestore", function() {
    it("full restore completes successfully", async function() {
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        blobSasToken,
        testPollerProperties
      );
      const backupResult = await backupPoller.pollUntilDone();
      assert.exists(backupResult.backupFolderUri);
      const folderName = getFolderName(backupResult.backupFolderUri!);

      const restorePoller = await client.beginRestore(
        blobStorageUri,
        blobSasToken,
        folderName,
        testPollerProperties
      );
      const restoreResult = await restorePoller.pollUntilDone();
      const operationState = restorePoller.getOperationState();
      assert.equal(restoreResult.startTime, operationState.startTime);
      assert.equal(restoreResult.endTime, operationState.endTime);
      assert.equal(operationState.isCompleted, true);
      assert.notExists(operationState.error);
      // Restore is eventually consistent so while we work
      // through the retry operations adding a delay here allows
      // tests to pass the 5s polling delay.
      await delay(5000);
    });

    it("selectiveRestore completes successfully", async function() {
      // This test can only be run in playback mode because running a backup
      // or restore puts the instance in a bad state (tracked in IcM).
      if (!isPlaybackMode()) {
        this.skip();
      }
      const keyName = "rsa1";
      await keyClient.createRsaKey(keyName);
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        blobSasToken,
        testPollerProperties
      );
      const backupURI = await backupPoller.pollUntilDone();
      assert.exists(backupURI.backupFolderUri);
      const folderName = getFolderName(backupURI.backupFolderUri!);

      // Delete the key (purging it is required), then restore and ensure it's restored
      await (await keyClient.beginDeleteKey(keyName)).pollUntilDone();
      await keyClient.purgeDeletedKey(keyName);

      const selectiveRestorePoller = await client.beginSelectiveRestore(
        blobStorageUri,
        blobSasToken,
        folderName,
        keyName,
        testPollerProperties
      );
      await selectiveRestorePoller.pollUntilDone();
      const operationState = selectiveRestorePoller.getOperationState();
      assert.equal(operationState.isCompleted, true);

      await keyClient.getKey(keyName);
    });

    // There is a service issue that prevents errors from showing up in the
    // error field. Pending until it's resolved. ADO 8750375
    it.skip("contains an error when fails to authenticate", async function() {
      const restorePoller = await client.beginRestore(
        blobStorageUri,
        "bad_token",
        "bad_folder",
        testPollerProperties
      );
      await assert.isRejected(restorePoller.pollUntilDone());
    });
  });
});
