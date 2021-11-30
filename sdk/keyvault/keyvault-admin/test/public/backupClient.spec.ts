// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";

import { KeyVaultBackupClient } from "../../src";
import { authenticate } from "../utils/authentication";
import { testPollerProperties } from "../utils/recorder";
import { getSasToken } from "../utils/common";
import { delay } from "@azure/core-util";
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
      await backupPoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginBackup(blobStorageUri, blobSasToken, {
        resumeFrom: backupPoller.toString(),
        ...testPollerProperties
      });

      assert.isTrue(resumedPoller.getOperationState().isStarted); // without polling
      assert.equal(resumedPoller.getOperationState().jobId, backupPoller.getOperationState().jobId);

      const backupResult = await backupPoller.pollUntilDone();
      assert.notExists(backupPoller.getOperationState().error);
      assert.exists(backupResult.folderUri);
      assert.equal(backupResult.startTime, backupPoller.getOperationState().startTime);
      assert.equal(backupResult.endTime, backupPoller.getOperationState().endTime);
      assert.match(backupResult.folderUri!, new RegExp(blobStorageUri));
    });

    it("throws when polling errors", async function() {
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        "invalid_sas_token",
        testPollerProperties
      );
      await assert.isRejected(backupPoller.pollUntilDone(), /SAS token/);
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
      assert.exists(backupResult.folderUri);

      const restorePoller = await client.beginRestore(
        backupResult.folderUri!,
        blobSasToken,
        testPollerProperties
      );
      await restorePoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginRestore(backupResult.folderUri!, blobSasToken, {
        ...testPollerProperties,
        resumeFrom: restorePoller.toString()
      });
      assert.isTrue(resumedPoller.getOperationState().isStarted); // without polling
      assert.equal(
        resumedPoller.getOperationState().jobId,
        restorePoller.getOperationState().jobId
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
      if (!isPlaybackMode()) {
        await delay(5000);
      }
    });

    it("selectiveKeyRestore completes successfully", async function() {
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
      assert.exists(backupURI.folderUri);

      // Delete the key (purging it is required), then restore and ensure it's restored
      await (await keyClient.beginDeleteKey(keyName, testPollerProperties)).pollUntilDone();
      await keyClient.purgeDeletedKey(keyName);

      const selectiveKeyRestorePoller = await client.beginSelectiveKeyRestore(
        keyName,
        backupURI.folderUri!,
        blobSasToken,
        testPollerProperties
      );
      await selectiveKeyRestorePoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginSelectiveKeyRestore(
        keyName,
        blobStorageUri,
        blobSasToken,
        {
          ...testPollerProperties,
          resumeFrom: selectiveKeyRestorePoller.toString()
        }
      );
      assert.isTrue(resumedPoller.getOperationState().isStarted); // without polling
      assert.equal(
        resumedPoller.getOperationState().jobId,
        selectiveKeyRestorePoller.getOperationState().jobId
      );

      await selectiveKeyRestorePoller.pollUntilDone();
      const operationState = selectiveKeyRestorePoller.getOperationState();
      assert.equal(operationState.isCompleted, true);

      await keyClient.getKey(keyName);
    });

    it("throws when polling errors", async function() {
      const restorePoller = await client.beginRestore(
        blobStorageUri,
        "bad_token",
        testPollerProperties
      );
      await assert.isRejected(restorePoller.pollUntilDone(), /SAS token is malformed/);
    });
  });
});
