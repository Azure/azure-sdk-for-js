// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";

import { KeyVaultBackupClient } from "../../src";
import { authenticate } from "../utils/authentication";
import { testPollerProperties } from "../utils/recorder";
import { getFolderName, getSasToken } from "../utils/common";
import { delay } from "@azure/core-http";

describe("KeyVaultBackupClient", () => {
  let client: KeyVaultBackupClient;

  let recorder: Recorder;
  let blobStorageUri: string;
  let blobSasToken: string;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.backupClient;
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
      assert.match(backupResult, new RegExp(blobStorageUri));
    });

    it("returns the correct backup result when fails to authenticate", async function() {
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        "invalid_sas_token",
        testPollerProperties
      );
      const backupResult = await backupPoller.pollUntilDone();
      assert.notExists(backupResult);
      const operationState = backupPoller.getOperationState();
      assert.isDefined(operationState.error);
      assert.isNotEmpty(operationState.error?.message);
    });
  });

  describe("beginRestore", function() {
    it("full restore completes successfully", async function() {
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        blobSasToken,
        testPollerProperties
      );
      const backupURI = await backupPoller.pollUntilDone();
      const folderName = getFolderName(backupURI);

      const restorePoller = await client.beginRestore(
        blobStorageUri,
        blobSasToken,
        folderName,
        testPollerProperties
      );
      await restorePoller.pollUntilDone();
      const operationState = restorePoller.getOperationState();
      assert.equal(operationState.isCompleted, true);
      assert.notExists(operationState.error);
      // Restore is eventually consistent so while we work
      // through the retry operations adding a delay here allows
      // tests to pass the 5s polling delay.
      await delay(5000);
    });

    it.skip("selectiveRestore completes successfully", async function() {
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        blobSasToken,
        testPollerProperties
      );
      const backupURI = await backupPoller.pollUntilDone();
      const folderName = getFolderName(backupURI);

      const keyName = "rsa-1";
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
      assert.notExists(operationState.error);
    });

    it("contains an error when fails to authenticate", async function() {
      const restorePoller = await client.beginRestore(
        blobStorageUri,
        "bad_token",
        "bad_folder",
        testPollerProperties
      );
      await restorePoller.pollUntilDone();
      const operationState = restorePoller.getOperationState();
      assert.equal(operationState.isCompleted, true);
      assert.isNotEmpty(operationState.error?.message);
    });
  });
});
