// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isPlaybackMode, Recorder } from "@azure-tools/test-recorder";

import { KeyVaultBackupClient } from "../../src/index.js";
import { authenticate } from "./utils/authentication.js";
import { testPollerProperties } from "./utils/recorder.js";
import { getSasToken } from "./utils/common.js";
import { delay } from "@azure/core-util";
import { KeyClient } from "@azure/keyvault-keys";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

// TODO: https://github.com/Azure/azure-sdk-for-js/issues/30273
describe.skip("KeyVaultBackupClient", () => {
  let client: KeyVaultBackupClient;
  let keyClient: KeyClient;

  let recorder: Recorder;
  let blobStorageUri: string;
  let blobSasToken: string;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    client = authentication.backupClient;
    keyClient = authentication.keyClient;
    recorder = authentication.recorder;
    const sasTokenData = getSasToken();
    blobStorageUri = sasTokenData.blobStorageUri;
    blobSasToken = sasTokenData.blobSasToken;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  describe("beginBackup", function () {
    it("returns the correct backup result when successful", async function () {
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        blobSasToken,
        testPollerProperties,
      );
      await backupPoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginBackup(blobStorageUri, blobSasToken, {
        resumeFrom: backupPoller.toString(),
        ...testPollerProperties,
      });

      expect(resumedPoller.getOperationState().isStarted).toEqual(true); // without polling
      expect(resumedPoller.getOperationState().jobId).toEqual(
        backupPoller.getOperationState().jobId,
      );

      const backupResult = await backupPoller.pollUntilDone();
      expect(backupPoller.getOperationState().error).toBeUndefined();
      expect(backupResult.folderUri).toBeDefined();
      expect(backupResult.startTime).toEqual(backupPoller.getOperationState().startTime);
      expect(backupResult.endTime).toEqual(backupPoller.getOperationState().endTime);
      expect(backupResult.folderUri!).toMatch(new RegExp(blobStorageUri));
    });

    it("throws when polling errors", async function () {
      await expect(
        client.beginBackup(blobStorageUri, "invalid_sas_token", testPollerProperties),
      ).rejects.toThrow(/SAS token/);
    });
  });

  describe("beginRestore", function () {
    it("full restore completes successfully", async function () {
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        blobSasToken,
        testPollerProperties,
      );
      const backupResult = await backupPoller.pollUntilDone();
      expect(backupResult.folderUri).toBeDefined();

      const restorePoller = await client.beginRestore(
        backupResult.folderUri!,
        blobSasToken,
        testPollerProperties,
      );
      await restorePoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginRestore(backupResult.folderUri!, blobSasToken, {
        ...testPollerProperties,
        resumeFrom: restorePoller.toString(),
      });
      expect(resumedPoller.getOperationState().isStarted).toEqual(true); // without polling
      expect(resumedPoller.getOperationState().jobId).toEqual(
        restorePoller.getOperationState().jobId,
      );

      const restoreResult = await restorePoller.pollUntilDone();
      const operationState = restorePoller.getOperationState();
      expect(restoreResult.startTime).toEqual(operationState.startTime);
      expect(restoreResult.endTime).toEqual(operationState.endTime);
      expect(operationState.isCompleted).toEqual(true);
      expect(operationState.error).toBeUndefined();
      // Restore is eventually consistent so while we work
      // through the retry operations adding a delay here allows
      // tests to pass the 5s polling delay.
      if (!isPlaybackMode()) {
        await delay(5000);
      }
    });

    // This test can only be run in playback mode because running a backup
    // or restore puts the instance in a bad state (tracked in IcM).
    it.skipIf(!isPlaybackMode())("selectiveKeyRestore completes successfully", async function () {
      const keyName = "rsa1";
      await keyClient.createRsaKey(keyName);
      const backupPoller = await client.beginBackup(
        blobStorageUri,
        blobSasToken,
        testPollerProperties,
      );
      const backupURI = await backupPoller.pollUntilDone();
      expect(backupURI.folderUri).toBeDefined();

      // Delete the key (purging it is required), then restore and ensure it's restored
      await (await keyClient.beginDeleteKey(keyName, testPollerProperties)).pollUntilDone();
      await keyClient.purgeDeletedKey(keyName);

      const selectiveKeyRestorePoller = await client.beginSelectiveKeyRestore(
        keyName,
        backupURI.folderUri!,
        blobSasToken,
        testPollerProperties,
      );
      await selectiveKeyRestorePoller.poll();

      // A poller can be serialized and then resumed
      const resumedPoller = await client.beginSelectiveKeyRestore(
        keyName,
        blobStorageUri,
        blobSasToken,
        {
          ...testPollerProperties,
          resumeFrom: selectiveKeyRestorePoller.toString(),
        },
      );
      expect(resumedPoller.getOperationState().isStarted).toEqual(true); // without polling
      expect(resumedPoller.getOperationState().jobId).toEqual(
        selectiveKeyRestorePoller.getOperationState().jobId,
      );

      await selectiveKeyRestorePoller.pollUntilDone();
      const operationState = selectiveKeyRestorePoller.getOperationState();
      expect(operationState.isCompleted).toEqual(true);

      await keyClient.getKey(keyName);
    });

    it("throws when polling errors", async function () {
      await expect(
        client.beginRestore(blobStorageUri, "bad_token", testPollerProperties),
      ).rejects.toThrow(/SAS token is malformed/);
    });
  });
});
